import "server-only";

import {
	LEAD_CONSENT_NOTICE_TEXT,
	LEAD_CONSENT_NOTICE_VERSION,
	LEAD_PRIVACY_POLICY_URL,
} from "./consent";
import type { DeliverableLead } from "./schema";

const DEFAULT_TIMEOUT_MS = 8_000;
const DEFAULT_EMAIL_FROM_NAME = "Redtail Telematics Website";
const EMAIL_LOGO_URL =
	"https://www.redtailtelematics.com/logo-white-og.png";
const SENDGRID_API_URL = new URL("https://api.sendgrid.com/v3/mail/send");
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

function truncateText(value: string, maxLength: number) {
	const characters = [...value];

	if (characters.length <= maxLength) {
		return value;
	}

	return `${characters.slice(0, maxLength - 1).join("").trimEnd()}…`;
}

function formatFleetSize(fleetSize: DeliverableLead["fleetSize"]) {
	if (fleetSize === "1000+") {
		return "1,000+ vehicles";
	}

	return `${fleetSize.replace("-", "–")} vehicles`;
}

function formatIndustry(industry: NonNullable<DeliverableLead["industry"]>) {
	const labels: Record<NonNullable<DeliverableLead["industry"]>, string> = {
		construction: "Construction",
		"field-services": "Field services",
		government: "Government",
		insurance: "Insurance",
		logistics: "Logistics",
		other: "Other",
	};

	return labels[industry];
}

function formatLeadSource(source: DeliverableLead["source"]) {
	return source === "get-started" ? "Get Started flow" : "Homepage demo form";
}

function formatTimestamp(value: string) {
	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return `${new Intl.DateTimeFormat("en-GB", {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "UTC",
	}).format(date)} UTC`;
}

type EmailRow = {
	href?: string;
	label: string;
	value: string;
};

function createHtmlRows(rows: EmailRow[]) {
	return rows
		.map(({ href, label, value }) => {
			const renderedValue = href
				? `<a href="${escapeHtml(href)}" style="color:#a81218;text-decoration:underline;text-underline-offset:2px">${escapeHtml(value)}</a>`
				: escapeHtml(value);

			return `<tr><td style="width:34%;padding:11px 12px 11px 0;border-bottom:1px solid #e7e5e4;color:#6b7280;font-size:12px;font-weight:700;letter-spacing:.04em;line-height:1.45;text-transform:uppercase;vertical-align:top">${escapeHtml(label)}</td><td style="padding:11px 0;border-bottom:1px solid #e7e5e4;color:#111827;font-size:14px;font-weight:500;line-height:1.55;vertical-align:top;word-break:break-word">${renderedValue}</td></tr>`;
		})
		.join("");
}

function createHtmlSection(title: string, rows: EmailRow[]) {
	if (rows.length === 0) {
		return "";
	}

	return `<tr><td style="padding:0 32px 28px"><h2 style="margin:0 0 8px;color:#111827;font-size:16px;line-height:1.35">${escapeHtml(title)}</h2><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">${createHtmlRows(rows)}</table></td></tr>`;
}

function createTextSection(title: string, rows: EmailRow[]) {
	if (rows.length === 0) {
		return "";
	}

	return `${title.toUpperCase()}\n${rows
		.map(({ label, value }) => `${label}: ${value}`)
		.join("\n")}`;
}

function createEmailContent(envelope: LeadEnvelope) {
	const { attribution, ...lead } = envelope.lead;
	const fullName = normalizeEmailBodyValue(
		`${lead.firstName} ${lead.lastName}`,
	);
	const company = normalizeEmailBodyValue(lead.company);
	const email = normalizeEmailBodyValue(lead.email);
	const phone = normalizeEmailBodyValue(lead.phone);
	const fleetSize = formatFleetSize(lead.fleetSize);
	const source = formatLeadSource(lead.source);
	const industry = lead.industry ? formatIndustry(lead.industry) : undefined;
	const submitted = formatTimestamp(envelope.submittedAt);
	const subject = `New Redtail lead: ${truncateText(company, 64)} — ${fleetSize}`;
	const preheader = `${fullName} from ${company} submitted the ${source} for ${fleetSize}.`;
	const dialablePhone = `${phone.startsWith("+") ? "+" : ""}${phone.replace(/\D/g, "")}`;
	const contactRows: EmailRow[] = [
		{ label: "Name", value: fullName },
		{ label: "Company", value: company },
		{ href: `mailto:${email}`, label: "Company email", value: email },
		{ href: `tel:${dialablePhone}`, label: "Phone", value: phone },
		{ label: "Fleet size", value: fleetSize },
		...(industry ? [{ label: "Industry", value: industry }] : []),
		{ label: "Form", value: `${source} (${lead.source})` },
	];
	const attributionRows: EmailRow[] = [];

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
			attributionRows.push({
				label,
				value: normalizeEmailBodyValue(value),
			});
		}
	}

	const auditRows: EmailRow[] = [
		{ label: "Submitted", value: envelope.submittedAt },
		{ label: "Request ID", value: envelope.requestId },
		{ label: "Consent to contact", value: "Yes" },
		{ label: "Consent captured", value: envelope.consent.capturedAt },
		{ label: "Consent method", value: envelope.consent.method },
		{ label: "Consent version", value: envelope.consent.noticeVersion },
		{ label: "Consent notice", value: envelope.consent.noticeText },
		{
			href: envelope.consent.privacyPolicyUrl,
			label: "Privacy policy",
			value: envelope.consent.privacyPolicyUrl,
		},
	].map((row) => ({
		...row,
		value: normalizeEmailBodyValue(row.value),
	}));
	const text = [
		[
			"NEW REDTAIL WEBSITE LEAD",
			`${fullName} from ${company} submitted the ${source}.`,
			`Received: ${submitted}`,
		].join("\n"),
		["FOLLOW UP", `Email: ${email}`, `Phone: ${phone}`].join("\n"),
		createTextSection("Lead details", contactRows),
		createTextSection("Campaign attribution", attributionRows),
		createTextSection("Consent and audit", auditRows),
		"This is an automated notification from the Redtail Telematics website.",
	]
		.filter(Boolean)
		.join("\n\n");
	const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>${escapeHtml(subject)}</title></head><body style="margin:0;padding:0;background-color:#f3f2ef;color:#111827;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%"><div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all">${escapeHtml(preheader)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#f3f2ef"><tr><td align="center" style="padding:32px 12px"><table role="presentation" width="680" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:680px;border-collapse:separate;background-color:#ffffff;border:1px solid #e7e5e4;border-radius:16px;box-shadow:0 12px 36px rgba(17,24,39,.08);overflow:hidden"><tr><td style="height:6px;background-color:#cf1317;font-size:0;line-height:0">&nbsp;</td></tr><tr><td style="padding:28px 32px 30px;background-color:#010101"><img src="${EMAIL_LOGO_URL}" width="168" height="51" alt="Redtail Telematics" style="display:block;width:168px;height:auto;border:0"><p style="margin:26px 0 8px;color:#f87171;font-size:11px;font-weight:700;letter-spacing:.14em;line-height:1.4;text-transform:uppercase">New website lead</p><h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.2">${escapeHtml(fullName)} from ${escapeHtml(company)}</h1><p style="margin:12px 0 0;color:#d1d5db;font-size:15px;line-height:1.6">${escapeHtml(source)} &nbsp;&bull;&nbsp; ${escapeHtml(fleetSize)}${industry ? ` &nbsp;&bull;&nbsp; ${escapeHtml(industry)}` : ""}</p></td></tr><tr><td style="padding:28px 32px 20px"><p style="margin:0 0 18px;color:#374151;font-size:15px;line-height:1.65">A new enquiry is ready for follow-up. It was received <strong style="color:#111827">${escapeHtml(submitted)}</strong>.</p><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-radius:8px;background-color:#cf1317"><a href="mailto:${escapeHtml(email)}" style="display:inline-block;padding:12px 18px;color:#ffffff;font-size:14px;font-weight:700;line-height:1;text-decoration:none">Email lead</a></td><td style="width:10px">&nbsp;</td><td style="border:1px solid #d6d3d1;border-radius:8px;background-color:#ffffff"><a href="tel:${escapeHtml(dialablePhone)}" style="display:inline-block;padding:11px 18px;color:#111827;font-size:14px;font-weight:700;line-height:1;text-decoration:none">Call lead</a></td></tr></table></td></tr>${createHtmlSection("Lead details", contactRows)}${createHtmlSection("Campaign attribution", attributionRows)}${createHtmlSection("Consent and audit", auditRows)}<tr><td style="padding:18px 32px;background-color:#f7f6f4;border-top:1px solid #e7e5e4"><p style="margin:0;color:#78716c;font-size:12px;line-height:1.55">Automated notification from the Redtail Telematics website. Request ID: ${escapeHtml(envelope.requestId)}</p></td></tr></table></td></tr></table></body></html>`;

	return { html, subject, text };
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
			reply_to: {
				email: envelope.lead.email,
				name: normalizeEmailBodyValue(
					`${envelope.lead.firstName} ${envelope.lead.lastName}`,
				),
			},
			personalizations: configuration.recipients.map((email) => ({
				custom_args: {
					request_id: envelope.requestId,
				},
				to: [{ email }],
			})),
			subject: content.subject,
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
