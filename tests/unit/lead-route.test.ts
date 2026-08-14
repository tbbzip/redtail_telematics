import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { NextRequest } from "next/server";

import { POST } from "@/app/api/leads/route";

const endpoint = "https://www.redtailtelematics.com/api/leads";
const validPayload = {
	attribution: {
		landingPath: "/get-started",
		referrerOrigin: "https://www.linkedin.com",
		utmCampaign: "fleet-reset",
		utmSource: "linkedin",
	},
	company: "Acme Fleet",
	consent: true,
	consentNoticeVersion: "lead-contact-consent-v1",
	email: "ops@example.com",
	firstName: "Ada",
	fleetSize: "10-49",
	industry: "logistics",
	lastName: "Lovelace",
	phone: "+1 555 123 4567",
	source: "get-started",
	submissionId: "018f47d2-a798-7c2e-b4d0-4f6d66b8f778",
	website: "",
};

let ipCounter = 1;

function configureSendGrid() {
	vi.stubEnv("LEAD_DELIVERY_PROVIDER", "sendgrid");
	vi.stubEnv("VERCEL_ENV", "preview");
	vi.stubEnv("SENDGRID_API_KEY", `SG.${"x".repeat(60)}`);
	vi.stubEnv("LEAD_EMAIL_FROM", "no-reply@redtailtelematics.com");
	vi.stubEnv("LEAD_EMAIL_FROM_NAME", "Redtail Telematics Website");
	vi.stubEnv("LEAD_EMAIL_RECIPIENTS", "preview@example.com");
}

function request(
	body: string,
	options: { contentType?: string; ip?: string; origin?: string | null } = {},
) {
	const headers = new Headers({
		"content-type": options.contentType ?? "application/json",
		"x-forwarded-for": options.ip ?? `203.0.113.${ipCounter++}`,
	});

	if (options.origin !== null) {
		headers.set(
			"origin",
			options.origin ?? "https://www.redtailtelematics.com",
		);
	}

	return new NextRequest(endpoint, { body, headers, method: "POST" });
}

describe("POST /api/leads", () => {
	beforeEach(() => {
		vi.stubEnv("SITE_URL", "https://www.redtailtelematics.com");
		vi.stubEnv("LEAD_DELIVERY_PROVIDER", "webhook");
		vi.stubEnv("LEAD_WEBHOOK_URL", "https://hooks.example.com/redtail");
		vi.stubEnv("LEAD_WEBHOOK_ALLOWED_HOSTS", "hooks.example.com");
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(new Response(null, { status: 202 })),
		);
	});

	afterEach(() => {
		vi.unstubAllEnvs();
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it("requires an allowed browser origin", async () => {
		const missing = await POST(request(JSON.stringify(validPayload), { origin: null }));
		const wrong = await POST(
			request(JSON.stringify(validPayload), { origin: "https://evil.example" }),
		);

		expect(missing.status).toBe(403);
		expect(wrong.status).toBe(403);
	});

	it("rejects unsupported media types and malformed JSON", async () => {
		const mediaType = await POST(request("{}", { contentType: "text/plain" }));
		const malformed = await POST(request("{"));

		expect(mediaType.status).toBe(415);
		expect(malformed.status).toBe(400);
	});

	it("stops an oversized streamed request", async () => {
		const response = await POST(request("x".repeat(16_385)));

		expect(response.status).toBe(413);
	});

	it("returns field errors without calling the webhook", async () => {
		const response = await POST(request("{}"));
		const result = await response.json();

		expect(response.status).toBe(422);
		expect(result.code).toBe("VALIDATION_FAILED");
		expect(fetch).not.toHaveBeenCalled();
	});

	it("accepts a honeypot submission without delivering it", async () => {
		const response = await POST(
			request(JSON.stringify({ ...validPayload, website: "spam.example" })),
		);

		expect(response.status).toBe(202);
		expect(fetch).not.toHaveBeenCalled();
	});

	it("delivers a valid submission with its stable request ID", async () => {
		const response = await POST(request(JSON.stringify(validPayload)));
		const result = await response.json();

		expect(response.status).toBe(202);
		expect(result.requestId).toBe(validPayload.submissionId);
		expect(fetch).toHaveBeenCalledOnce();
	});

	it("accepts a valid submission only after SendGrid returns 202", async () => {
		configureSendGrid();

		const response = await POST(request(JSON.stringify(validPayload)));
		const result = await response.json();
		const [url] = vi.mocked(fetch).mock.calls[0] as [URL, RequestInit];

		expect(response.status).toBe(202);
		expect(result.requestId).toBe(validPayload.submissionId);
		expect(url.toString()).toBe("https://api.sendgrid.com/v3/mail/send");
	});

	it.each([
		["missing", undefined],
		["outdated", "lead-contact-consent-v0"],
	])("rejects a %s consent notice before delivery", async (_, version) => {
		const payload = { ...validPayload, consentNoticeVersion: version };

		if (version === undefined) {
			delete payload.consentNoticeVersion;
		}

		const response = await POST(request(JSON.stringify(payload)));
		const result = await response.json();

		expect(response.status).toBe(409);
		expect(result).toMatchObject({
			code: "CONSENT_NOTICE_STALE",
			ok: false,
			requestId: validPayload.submissionId,
		});
		expect(fetch).not.toHaveBeenCalled();
	});

	it("returns a retryable failure when delivery is not configured", async () => {
		vi.stubEnv("LEAD_WEBHOOK_URL", "");

		const response = await POST(request(JSON.stringify(validPayload)));
		const result = await response.json();

		expect(response.status).toBe(503);
		expect(result).toMatchObject({
			code: "DELIVERY_NOT_CONFIGURED",
			ok: false,
			requestId: validPayload.submissionId,
		});
		expect(fetch).not.toHaveBeenCalled();
	});

	it("does not fall back to the webhook when selected SendGrid is incomplete", async () => {
		configureSendGrid();
		vi.stubEnv("SENDGRID_API_KEY", "");

		const response = await POST(request(JSON.stringify(validPayload)));
		const result = await response.json();

		expect(response.status).toBe(503);
		expect(result).toMatchObject({
			code: "DELIVERY_NOT_CONFIGURED",
			ok: false,
			requestId: validPayload.submissionId,
		});
		expect(fetch).not.toHaveBeenCalled();
	});

	it("maps an upstream webhook failure without exposing provider details", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(new Response("private provider detail", { status: 503 })),
		);

		const response = await POST(request(JSON.stringify(validPayload)));
		const result = await response.json();

		expect(response.status).toBe(502);
		expect(result).toMatchObject({
			code: "DELIVERY_FAILED",
			ok: false,
			requestId: validPayload.submissionId,
		});
		expect(JSON.stringify(result)).not.toContain("private provider detail");
	});

	it("maps a SendGrid rejection without exposing provider details or lead PII", async () => {
		configureSendGrid();
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(
				new Response("private provider detail", { status: 401 }),
			),
		);
		const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});

		const response = await POST(request(JSON.stringify(validPayload)));
		const result = await response.json();
		const serializedResult = JSON.stringify(result);
		const serializedLog = JSON.stringify(errorLog.mock.calls);

		expect(response.status).toBe(502);
		expect(result).toMatchObject({
			code: "DELIVERY_FAILED",
			ok: false,
			requestId: validPayload.submissionId,
		});
		for (const privateValue of [
			"private provider detail",
			validPayload.firstName,
			validPayload.lastName,
			validPayload.email,
			validPayload.phone,
			validPayload.company,
		]) {
			expect(serializedResult).not.toContain(privateValue);
			expect(serializedLog).not.toContain(privateValue);
		}
		expect(errorLog).toHaveBeenCalledWith("Lead delivery failed", {
			code: "DELIVERY_FAILED",
			requestId: validPayload.submissionId,
		});
	});

	it("limits repeated requests before delivery work", async () => {
		const ip = "198.51.100.200";
		const statuses: number[] = [];

		for (let attempt = 0; attempt < 9; attempt += 1) {
			statuses.push((await POST(request("{}", { ip }))).status);
		}

		expect(statuses.at(-1)).toBe(429);
	});
});
