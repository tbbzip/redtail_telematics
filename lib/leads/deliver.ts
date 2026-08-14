import "server-only";

import {
	LEAD_CONSENT_NOTICE_TEXT,
	LEAD_CONSENT_NOTICE_VERSION,
	LEAD_PRIVACY_POLICY_URL,
} from "./consent";
import type { DeliverableLead } from "./schema";

const DEFAULT_TIMEOUT_MS = 8_000;
const DEFAULT_EMAIL_FROM_NAME = "Redtail Telematics Website";
const SENDGRID_API_URL = new URL("https://api.sendgrid.com/v3/mail/send");
const SENDGRID_SUBJECT = "How can I help you? - Redtail follow up";
const PRODUCTION_EMAIL_RECIPIENTS = new Set([
	"aldo@thebrandingbull.com",
	"sales@redtailtelematics.com",
]);

type DeliveryProvider = "sendgrid" | "webhook";

type LeadEnvelope = {
	consent: {
		capturedAt: string;
		method: "form-submit";
		noticeText: string;
		noticeVersion: string;
		privacyPolicyUrl: string;
	};
	lead: DeliverableLead;
	requestId: string;
	submittedAt: string;
};

export class LeadDeliveryError extends Error {
	constructor(
		public readonly code: "DELIVERY_FAILED" | "DELIVERY_NOT_CONFIGURED",
		message: string,
	) {
		super(message);
		this.name = "LeadDeliveryError";
	}
}

function configurationError(message: string) {
	return new LeadDeliveryError("DELIVERY_NOT_CONFIGURED", message);
}

function getTimeoutMs() {
	const value = Number(
		process.env.LEAD_DELIVERY_TIMEOUT_MS ||
			process.env.LEAD_WEBHOOK_TIMEOUT_MS,
	);

	if (!Number.isFinite(value) || value < 1_000 || value > 30_000) {
		return DEFAULT_TIMEOUT_MS;
	}

	return value;
}

function isEmail(value: string) {
	return (
		value.length <= 254 &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) &&
		!/[\u0000-\u001f\u007f]/.test(value)
	);
}

function getDeliveryProvider(): DeliveryProvider {
	const configured = process.env.LEAD_DELIVERY_PROVIDER?.trim().toLowerCase();

	if (!configured) {
		if (process.env.NODE_ENV === "production") {
			throw configurationError(
				"LEAD_DELIVERY_PROVIDER must be configured in production.",
			);
		}

		return "webhook";
	}

	if (configured === "sendgrid" || configured === "webhook") {
		return configured;
	}

	throw configurationError(
		"LEAD_DELIVERY_PROVIDER must be either sendgrid or webhook.",
	);
}

function getWebhookUrl() {
	const configuredUrl = process.env.LEAD_WEBHOOK_URL;

	if (!configuredUrl) {
		throw configurationError("LEAD_WEBHOOK_URL is not configured.");
	}

	try {
		const url = new URL(configuredUrl);
		const isDevelopmentLocalhost =
			process.env.NODE_ENV === "development" &&
			url.protocol === "http:" &&
			["127.0.0.1", "localhost"].includes(url.hostname);
		const allowedHosts = new Set(
			(process.env.LEAD_WEBHOOK_ALLOWED_HOSTS || "")
				.split(",")
				.map((host) => host.trim().toLowerCase())
				.filter(Boolean),
		);

		if (url.protocol !== "https:" && !isDevelopmentLocalhost) {
			throw new Error("Webhook URLs must use HTTPS.");
		}

		if (url.username || url.password || url.hash) {
			throw new Error("Webhook URLs cannot contain credentials or fragments.");
		}

		if (!isDevelopmentLocalhost && url.port && url.port !== "443") {
			throw new Error("Webhook URLs must use the standard HTTPS port.");
		}

		if (!isDevelopmentLocalhost && !allowedHosts.has(url.hostname.toLowerCase())) {
			throw new Error("Webhook hostname is not in LEAD_WEBHOOK_ALLOWED_HOSTS.");
		}

		return url;
	} catch (error) {
		throw configurationError(
			error instanceof Error ? error.message : "LEAD_WEBHOOK_URL is invalid.",
		);
	}
}

function getSendGridConfiguration() {
	const apiKey = process.env.SENDGRID_API_KEY?.trim();

	if (!apiKey?.startsWith("SG.") || apiKey.length < 20 || /\s/.test(apiKey)) {
		throw configurationError("SENDGRID_API_KEY is not configured correctly.");
	}

	const fromEmail = process.env.LEAD_EMAIL_FROM?.trim().toLowerCase() || "";
	const fromName =
		process.env.LEAD_EMAIL_FROM_NAME?.trim() || DEFAULT_EMAIL_FROM_NAME;
	const recipients = [
		...new Set(
			(process.env.LEAD_EMAIL_RECIPIENTS || "")
				.split(",")
				.map((email) => email.trim().toLowerCase())
				.filter(Boolean),
		),
	];

	if (!isEmail(fromEmail)) {
		throw configurationError("LEAD_EMAIL_FROM is not a valid email address.");
	}

	if (
		!fromName ||
		fromName.length > 100 ||
		/[\u0000-\u001f\u007f]/.test(fromName)
	) {
		throw configurationError("LEAD_EMAIL_FROM_NAME is invalid.");
	}

	if (
		recipients.length === 0 ||
		recipients.length > 10 ||
		recipients.some((email) => !isEmail(email))
	) {
		throw configurationError("LEAD_EMAIL_RECIPIENTS is invalid.");
	}

	const vercelEnvironment = process.env.VERCEL_ENV?.trim().toLowerCase();
	const hasExactProductionRecipientSet =
		recipients.length === PRODUCTION_EMAIL_RECIPIENTS.size &&
		recipients.every((email) => PRODUCTION_EMAIL_RECIPIENTS.has(email));

	if (
		vercelEnvironment !== "production" &&
		recipients.some((email) => PRODUCTION_EMAIL_RECIPIENTS.has(email))
	) {
		throw configurationError(
			"Protected lead recipients can be used only in Vercel Production.",
		);
	}

	if (vercelEnvironment === "production" && !hasExactProductionRecipientSet) {
		throw configurationError(
			"Vercel Production requires the approved lead recipient set.",
		);
	}

	return { apiKey, fromEmail, fromName, recipients };
}

function createLeadEnvelope(
	lead: DeliverableLead,
	requestId: string,
): LeadEnvelope {
	const submittedAt = new Date().toISOString();

	return {
		consent: {
			capturedAt: submittedAt,
			method: "form-submit",
			noticeText: LEAD_CONSENT_NOTICE_TEXT,
			noticeVersion: LEAD_CONSENT_NOTICE_VERSION,
			privacyPolicyUrl: LEAD_PRIVACY_POLICY_URL,
		},
		lead,
		requestId,
		submittedAt,
	};
}

function escapeHtml(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

function normalizeEmailBodyValue(value: string) {
	return value
		.replace(/[\u0000-\u001f\u007f]+/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

function createEmailContent(envelope: LeadEnvelope) {
	const { attribution, ...lead } = envelope.lead;
	const rows: Array<[string, string]> = [
		["Request ID", envelope.requestId],
		["Submitted", envelope.submittedAt],
		["Form", lead.source],
		["First name", lead.firstName],
		["Last name", lead.lastName],
		["Company", lead.company],
		["Company email", lead.email],
		["Phone", lead.phone],
		["Fleet size", lead.fleetSize],
	];

	if (lead.industry) {
		rows.push(["Industry", lead.industry]);
	}

	for (const [label, value] of [
		["Landing path", attribution?.landingPath],
		["External referrer", attribution?.referrerOrigin],
		["UTM source", attribution?.utmSource],
		["UTM medium", attribution?.utmMedium],
		["UTM campaign", attribution?.utmCampaign],
		["UTM term", attribution?.utmTerm],
		["UTM content", attribution?.utmContent],
	] as const) {
		if (value) {
			rows.push([label, value]);
		}
	}

	rows.push(
		["Consent captured", envelope.consent.capturedAt],
		["Consent version", envelope.consent.noticeVersion],
		["Consent notice", envelope.consent.noticeText],
		["Privacy policy", envelope.consent.privacyPolicyUrl],
	);

	const safeRows = rows.map(
		([label, value]) => [label, normalizeEmailBodyValue(value)] as const,
	);
	const text = safeRows
		.map(([label, value]) => `${label}: ${value}`)
		.join("\n");
	const htmlRows = safeRows
		.map(
			([label, value]) =>
				`<tr><th align="left" style="padding:8px;border-bottom:1px solid #ddd;vertical-align:top">${escapeHtml(label)}</th><td style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(value)}</td></tr>`,
		)
		.join("");
	const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#1f2937"><h1 style="font-size:22px">New Redtail website lead</h1><table style="border-collapse:collapse;width:100%;max-width:720px">${htmlRows}</table></body></html>`;

	return { html, text };
}

async function deliverToWebhook(envelope: LeadEnvelope) {
	const headers = new Headers({
		"Content-Type": "application/json",
		"Idempotency-Key": envelope.requestId,
		"User-Agent": "Redtail-Website/1.0",
		"X-Redtail-Request-Id": envelope.requestId,
	});
	const bearerToken = process.env.LEAD_WEBHOOK_BEARER_TOKEN;

	if (bearerToken) {
		headers.set("Authorization", `Bearer ${bearerToken}`);
	}

	const response = await fetch(getWebhookUrl(), {
		body: JSON.stringify(envelope),
		cache: "no-store",
		headers,
		method: "POST",
		redirect: "error",
		signal: AbortSignal.timeout(getTimeoutMs()),
	});

	if (!response.ok) {
		throw new LeadDeliveryError(
			"DELIVERY_FAILED",
			`Lead webhook returned HTTP ${response.status}.`,
		);
	}
}

async function deliverToSendGrid(envelope: LeadEnvelope) {
	const configuration = getSendGridConfiguration();
	const content = createEmailContent(envelope);
	const response = await fetch(SENDGRID_API_URL, {
		body: JSON.stringify({
			categories: ["website-lead"],
			content: [
				{ type: "text/plain", value: content.text },
				{ type: "text/html", value: content.html },
			],
			from: {
				email: configuration.fromEmail,
				name: configuration.fromName,
			},
			personalizations: configuration.recipients.map((email) => ({
				custom_args: {
					request_id: envelope.requestId,
				},
				to: [{ email }],
			})),
			subject: SENDGRID_SUBJECT,
		}),
		cache: "no-store",
		headers: {
			Authorization: `Bearer ${configuration.apiKey}`,
			"Content-Type": "application/json",
			"User-Agent": "Redtail-Website/1.0",
		},
		method: "POST",
		redirect: "error",
		signal: AbortSignal.timeout(getTimeoutMs()),
	});

	if (response.status !== 202) {
		throw new LeadDeliveryError(
			"DELIVERY_FAILED",
			`SendGrid returned HTTP ${response.status}.`,
		);
	}
}

export function assertLeadDeliveryConfiguration() {
	const provider = getDeliveryProvider();

	if (provider === "webhook") {
		getWebhookUrl();
		return;
	}

	getSendGridConfiguration();
}

export async function deliverLead(lead: DeliverableLead, requestId: string) {
	const envelope = createLeadEnvelope(lead, requestId);

	try {
		if (getDeliveryProvider() === "webhook") {
			await deliverToWebhook(envelope);
		} else {
			await deliverToSendGrid(envelope);
		}
	} catch (error) {
		if (error instanceof LeadDeliveryError) {
			throw error;
		}

		throw new LeadDeliveryError(
			"DELIVERY_FAILED",
			"Lead delivery request failed.",
		);
	}
}
