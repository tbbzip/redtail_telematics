import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import {
	assertLeadDeliveryConfiguration,
	deliverLead,
	LeadDeliveryError,
} from "@/lib/leads/deliver";
import type { DeliverableLead } from "@/lib/leads/schema";

const lead: DeliverableLead = {
	attribution: {
		landingPath: "/get-started",
		referrerOrigin: "https://www.linkedin.com",
		utmCampaign: "fleet-reset",
		utmContent: "hero-cta",
		utmMedium: "paid-social",
		utmSource: "linkedin",
		utmTerm: "fleet telematics",
	},
	company: "Acme Fleet",
	consent: true,
	email: "ops@example.com",
	firstName: "Ada",
	fleetSize: "10-49",
	industry: "logistics",
	lastName: "Lovelace",
	phone: "+1 555 123 4567",
	source: "get-started",
};

const requestId = "018f47d2-a798-7c2e-b4d0-4f6d66b8f778";
const sendGridKey = `SG.${"x".repeat(60)}`;

function configureWebhook() {
	vi.stubEnv("LEAD_DELIVERY_PROVIDER", "webhook");
	vi.stubEnv("LEAD_WEBHOOK_URL", "https://hooks.example.com/redtail");
	vi.stubEnv("LEAD_WEBHOOK_ALLOWED_HOSTS", "hooks.example.com");
	vi.stubEnv("LEAD_WEBHOOK_BEARER_TOKEN", "test-token");
}

function configureSendGrid() {
	vi.stubEnv("LEAD_DELIVERY_PROVIDER", "sendgrid");
	vi.stubEnv("VERCEL_ENV", "production");
	vi.stubEnv("SENDGRID_API_KEY", sendGridKey);
	vi.stubEnv(
		"LEAD_EMAIL_RECIPIENTS",
		"sales@redtailtelematics.com, aldo@thebrandingbull.com, sales@redtailtelematics.com",
	);
	vi.stubEnv("LEAD_EMAIL_FROM", "no-reply@redtailtelematics.com");
	vi.stubEnv("LEAD_EMAIL_FROM_NAME", "");
}

function getSendGridPayload(fetchMock: ReturnType<typeof vi.fn>) {
	const [url, init] = fetchMock.mock.calls[0] as [URL, RequestInit];
	return {
		headers: new Headers(init.headers),
		init,
		payload: JSON.parse(String(init.body)),
		url,
	};
}

describe("deliverLead", () => {
	beforeEach(() => {
		configureWebhook();
	});

	afterEach(() => {
		vi.unstubAllEnvs();
		vi.unstubAllGlobals();
	});

	it("sends an idempotent, versioned webhook submission without redirecting", async () => {
		const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 202 }));
		vi.stubGlobal("fetch", fetchMock);

		await deliverLead(lead, requestId);

		expect(fetchMock).toHaveBeenCalledOnce();
		const [url, init] = fetchMock.mock.calls[0] as [URL, RequestInit];
		const headers = new Headers(init.headers);
		const payload = JSON.parse(String(init.body));

		expect(url.toString()).toBe("https://hooks.example.com/redtail");
		expect(init.redirect).toBe("error");
		expect(headers.get("authorization")).toBe("Bearer test-token");
		expect(headers.get("idempotency-key")).toBe(requestId);
		expect(payload.lead).toEqual(lead);
		expect(payload.consent).toMatchObject({
			method: "form-submit",
			noticeText:
				"By submitting this form, you agree to be contacted by Redtail Telematics about your request and acknowledge our Privacy Policy.",
			noticeVersion: "lead-contact-consent-v1",
		});
	});

	it("preserves the production SendGrid sender, recipients, and subject", async () => {
		configureSendGrid();
		const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 202 }));
		vi.stubGlobal("fetch", fetchMock);

		await deliverLead(lead, requestId);

		expect(fetchMock).toHaveBeenCalledOnce();
		const { headers, init, payload, url } = getSendGridPayload(fetchMock);
		const plainText = payload.content.find(
			(entry: { type: string }) => entry.type === "text/plain",
		).value;
		const html = payload.content.find(
			(entry: { type: string }) => entry.type === "text/html",
		).value;

		expect(url.toString()).toBe("https://api.sendgrid.com/v3/mail/send");
		expect(init).toMatchObject({ method: "POST", redirect: "error" });
		expect(headers.get("authorization")).toBe(`Bearer ${sendGridKey}`);
		expect(payload).toMatchObject({
			categories: ["website-lead"],
			from: {
				email: "no-reply@redtailtelematics.com",
				name: "Redtail Telematics Website",
			},
			reply_to: {
				email: "ops@example.com",
				name: "Ada Lovelace",
			},
			subject: "New Redtail lead: Acme Fleet — 10–49 vehicles",
		});
		expect(payload.personalizations).toEqual([
			{
				custom_args: { request_id: requestId },
				to: [{ email: "sales@redtailtelematics.com" }],
			},
			{
				custom_args: { request_id: requestId },
				to: [{ email: "aldo@thebrandingbull.com" }],
			},
		]);
		expect(plainText).toContain(`Request ID: ${requestId}`);
		for (const expectedValue of [
			"Ada Lovelace",
			"Acme Fleet",
			"ops@example.com",
			"+1 555 123 4567",
			"10–49 vehicles",
			"Logistics",
			"Get Started flow (get-started)",
			"/get-started",
			"https://www.linkedin.com",
			"linkedin",
			"paid-social",
			"fleet-reset",
			"fleet telematics",
			"hero-cta",
			"Consent to contact",
			"Yes",
			"Consent method",
			"form-submit",
			"Consent version",
			"lead-contact-consent-v1",
			"By submitting this form, you agree to be contacted by Redtail Telematics",
			"https://www.redtailtelematics.com/privacy-policy",
		]) {
			expect(plainText).toContain(expectedValue);
			expect(html).toContain(expectedValue);
		}
		expect(plainText).toMatch(
			/Submitted: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/,
		);
		expect(plainText).toMatch(
			/Consent captured: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/,
		);
		expect(html).toContain(
			'src="https://www.redtailtelematics.com/logo-white-og.png"',
		);
		expect(html).toContain('href="mailto:ops@example.com"');
		expect(html).toContain('href="tel:+15551234567"');
		expect(html).toContain("Campaign attribution");
		expect(html).toContain("Consent and audit");
		expect(String(init.body)).not.toContain(sendGridKey);
		expect(String(init.body)).not.toContain("test-token");
	});

	it("escapes HTML and flattens control characters in email body values", async () => {
		configureSendGrid();
		const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 202 }));
		vi.stubGlobal("fetch", fetchMock);

		await deliverLead(
			{
				...lead,
				company: "<script>alert('x')</script>\n& Co",
				firstName: "Ada\r\nBcc: victim@example.com",
			},
			requestId,
		);

		const { payload } = getSendGridPayload(fetchMock);
		const html = payload.content.find(
			(entry: { type: string }) => entry.type === "text/html",
		).value;
		const text = payload.content.find(
			(entry: { type: string }) => entry.type === "text/plain",
		).value;

		expect(html).not.toContain("<script>alert");
		expect(html).toContain(
			"&lt;script&gt;alert(&#39;x&#39;)&lt;/script&gt; &amp; Co",
		);
		expect(text).toContain(
			"Name: Ada Bcc: victim@example.com Lovelace",
		);
		expect(text).not.toContain("\nBcc:");
		expect(payload.subject).not.toMatch(/[\r\n]/);
		expect(payload.reply_to).toEqual({
			email: "ops@example.com",
			name: "Ada Bcc: victim@example.com Lovelace",
		});
	});

	it("keeps the dynamic subject concise for long company names", async () => {
		configureSendGrid();
		const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 202 }));
		vi.stubGlobal("fetch", fetchMock);

		await deliverLead(
			{
				...lead,
				company: "A".repeat(90),
			},
			requestId,
		);

		const { payload } = getSendGridPayload(fetchMock);

		expect(payload.subject).toMatch(
			/^New Redtail lead: A+… — 10–49 vehicles$/,
		);
		expect(payload.subject).not.toMatch(/[\r\n]/);
		expect([...payload.subject].length).toBeLessThanOrEqual(110);
	});

	it("flattens attempted subject header injection before rendering", async () => {
		configureSendGrid();
		const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 202 }));
		vi.stubGlobal("fetch", fetchMock);

		await deliverLead(
			{
				...lead,
				company: "Acme\r\nBcc: victim@example.com",
			},
			requestId,
		);

		const { payload } = getSendGridPayload(fetchMock);

		expect(payload.subject).toBe(
			"New Redtail lead: Acme Bcc: victim@example.com — 10–49 vehicles",
		);
		expect(payload.subject).not.toMatch(/[\r\n]/);
	});

	it("omits the attribution section cleanly when no attribution was captured", async () => {
		configureSendGrid();
		const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 202 }));
		vi.stubGlobal("fetch", fetchMock);

		await deliverLead(
			{
				...lead,
				attribution: undefined,
				industry: undefined,
				source: "footer-demo",
			},
			requestId,
		);

		const { payload } = getSendGridPayload(fetchMock);
		const html = payload.content.find(
			(entry: { type: string }) => entry.type === "text/html",
		).value;
		const text = payload.content.find(
			(entry: { type: string }) => entry.type === "text/plain",
		).value;

		expect(html).not.toContain("Campaign attribution");
		expect(text).not.toContain("CAMPAIGN ATTRIBUTION");
		expect(html).toContain("Homepage demo form (footer-demo)");
		expect(html).not.toContain("Industry</td>");
	});

	it("uses only the explicitly selected provider when both are configured", async () => {
		configureSendGrid();
		const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 202 }));
		vi.stubGlobal("fetch", fetchMock);

		await deliverLead(lead, requestId);
		expect(fetchMock).toHaveBeenCalledOnce();
		expect(String(fetchMock.mock.calls[0][0])).toBe(
			"https://api.sendgrid.com/v3/mail/send",
		);

		configureWebhook();
		await deliverLead(lead, requestId);
		expect(String(fetchMock.mock.calls[1][0])).toBe(
			"https://hooks.example.com/redtail",
		);
	});

	it("keeps the non-production webhook default for backwards compatibility", async () => {
		configureSendGrid();
		vi.stubEnv("LEAD_DELIVERY_PROVIDER", "");
		const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 202 }));
		vi.stubGlobal("fetch", fetchMock);

		await deliverLead(lead, requestId);

		expect(fetchMock).toHaveBeenCalledOnce();
		expect(String(fetchMock.mock.calls[0][0])).toBe(
			"https://hooks.example.com/redtail",
		);
	});

	it("requires explicit provider selection in production", async () => {
		vi.stubEnv("NODE_ENV", "production");
		vi.stubEnv("LEAD_DELIVERY_PROVIDER", "");
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);

		expect(() => assertLeadDeliveryConfiguration()).toThrow(
			"LEAD_DELIVERY_PROVIDER must be configured in production.",
		);
		await expect(deliverLead(lead, requestId)).rejects.toMatchObject({
			code: "DELIVERY_NOT_CONFIGURED",
		});
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("does not fall back to a configured webhook when SendGrid is incomplete", async () => {
		vi.stubEnv("LEAD_DELIVERY_PROVIDER", "sendgrid");
		vi.stubEnv("SENDGRID_API_KEY", "");
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);

		await expect(deliverLead(lead, requestId)).rejects.toMatchObject({
			code: "DELIVERY_NOT_CONFIGURED",
		});
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it.each(["", "development", "preview"])(
		"blocks protected recipients when VERCEL_ENV is %j",
		async (vercelEnvironment) => {
			configureSendGrid();
			vi.stubEnv("VERCEL_ENV", vercelEnvironment);
			const fetchMock = vi.fn();
			vi.stubGlobal("fetch", fetchMock);

			await expect(deliverLead(lead, requestId)).rejects.toMatchObject({
				code: "DELIVERY_NOT_CONFIGURED",
				message:
					"Protected lead recipients can be used only in Vercel Production.",
			});
			expect(fetchMock).not.toHaveBeenCalled();
		},
	);

	it("allows only isolated recipients in Vercel Preview", async () => {
		configureSendGrid();
		vi.stubEnv("VERCEL_ENV", "preview");
		vi.stubEnv("LEAD_EMAIL_RECIPIENTS", "redtail-preview@example.com");
		const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 202 }));
		vi.stubGlobal("fetch", fetchMock);

		await deliverLead(lead, requestId);

		const { payload } = getSendGridPayload(fetchMock);
		expect(payload.personalizations).toEqual([
			{
				custom_args: { request_id: requestId },
				to: [{ email: "redtail-preview@example.com" }],
			},
		]);
	});

	it.each([
		"sales@redtailtelematics.com",
		"aldo@thebrandingbull.com",
		"sales@redtailtelematics.com,other@example.com",
		"sales@redtailtelematics.com,aldo@thebrandingbull.com,other@example.com",
	])(
		"rejects an incomplete or unapproved Vercel Production recipient set: %s",
		async (recipients) => {
			configureSendGrid();
			vi.stubEnv("LEAD_EMAIL_RECIPIENTS", recipients);
			const fetchMock = vi.fn();
			vi.stubGlobal("fetch", fetchMock);

			await expect(deliverLead(lead, requestId)).rejects.toMatchObject({
				code: "DELIVERY_NOT_CONFIGURED",
				message: "Vercel Production requires the approved lead recipient set.",
			});
			expect(fetchMock).not.toHaveBeenCalled();
		},
	);

	it("fails closed when the webhook host is not explicitly allowed", async () => {
		vi.stubEnv("LEAD_WEBHOOK_ALLOWED_HOSTS", "other.example.com");
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);

		await expect(deliverLead(lead, crypto.randomUUID())).rejects.toMatchObject({
			code: "DELIVERY_NOT_CONFIGURED",
		});
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it.each([
		"http://hooks.example.com/redtail",
		"https://user:secret@hooks.example.com/redtail",
		"https://hooks.example.com:8443/redtail",
		"https://hooks.example.com/redtail#fragment",
	])("rejects unsafe production webhook URL %s", async (url) => {
		vi.stubEnv("LEAD_WEBHOOK_URL", url);

		await expect(deliverLead(lead, crypto.randomUUID())).rejects.toBeInstanceOf(
			LeadDeliveryError,
		);
	});

	it.each([
		["SENDGRID_API_KEY", "not-an-sg-key-with-enough-length"],
		["SENDGRID_API_KEY", "SG.short"],
		["LEAD_EMAIL_FROM", ""],
		["LEAD_EMAIL_FROM", "not-an-email"],
		["LEAD_EMAIL_FROM_NAME", "bad\nname"],
		["LEAD_EMAIL_RECIPIENTS", ""],
		["LEAD_EMAIL_RECIPIENTS", "sales@example.com,not-an-email"],
	] as const)("rejects unsafe SendGrid configuration in %s", async (name, value) => {
		configureSendGrid();
		vi.stubEnv(name, value);
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);

		await expect(deliverLead(lead, requestId)).rejects.toMatchObject({
			code: "DELIVERY_NOT_CONFIGURED",
		});
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("rejects an unknown delivery provider", () => {
		vi.stubEnv("LEAD_DELIVERY_PROVIDER", "smtp");

		expect(() => assertLeadDeliveryConfiguration()).toThrow(
			"LEAD_DELIVERY_PROVIDER must be either sendgrid or webhook.",
		);
	});

	it("maps a rejected webhook response to a delivery failure", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(new Response("private detail", { status: 503 })),
		);

		await expect(deliverLead(lead, requestId)).rejects.toMatchObject({
			code: "DELIVERY_FAILED",
		});
	});

	it.each([200, 400, 401, 403, 429, 500, 503])(
		"accepts only SendGrid 202 and safely maps HTTP %s",
		async (status) => {
			configureSendGrid();
			vi.stubGlobal(
				"fetch",
				vi.fn().mockResolvedValue(
					new Response("private provider detail", { status }),
				),
			);

			await expect(deliverLead(lead, requestId)).rejects.toMatchObject({
				code: "DELIVERY_FAILED",
			});
		},
	);

	it.each([new Error("private network detail"), new DOMException("timed out")])(
		"maps provider transport failures to a generic error",
		async (providerError) => {
			configureSendGrid();
			vi.stubGlobal("fetch", vi.fn().mockRejectedValue(providerError));

			await expect(deliverLead(lead, requestId)).rejects.toMatchObject({
				code: "DELIVERY_FAILED",
				message: "Lead delivery request failed.",
			});
		},
	);
});
