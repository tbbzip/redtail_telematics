import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { NextRequest } from "next/server";

import { POST } from "@/app/api/leads/route";

const endpoint = "https://www.redtailtelematics.com/api/leads";
const siteverifyEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const turnstileSecret = "turnstile-test-secret";
const verifiedResult = {
	action: "get_started",
	hostname: "www.redtailtelematics.com",
	success: true,
};
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
	turnstileToken: "turnstile-test-token",
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

function mockFetch(
	verification: Record<string, unknown> = verifiedResult,
	delivery = new Response(null, { status: 202 }),
) {
	return vi
		.fn()
		.mockResolvedValueOnce(
			new Response(JSON.stringify(verification), {
				headers: { "Content-Type": "application/json" },
				status: 200,
			}),
		)
		.mockResolvedValueOnce(delivery);
}

function fetchUrl(value: unknown) {
	return value instanceof Request ? value.url : String(value);
}

function siteverifyValue(body: BodyInit | null | undefined, name: string) {
	if (body instanceof URLSearchParams || body instanceof FormData) {
		return body.get(name);
	}

	if (typeof body === "string") {
		try {
			return (JSON.parse(body) as Record<string, unknown>)[name];
		} catch {
			return new URLSearchParams(body).get(name);
		}
	}

	return undefined;
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
		vi.stubEnv("TURNSTILE_SECRET", turnstileSecret);
		vi.stubEnv("TURNSTILE_HOSTNAMES", "www.redtailtelematics.com");
		vi.stubGlobal("fetch", mockFetch());
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

	it("returns field errors without calling Turnstile or the webhook", async () => {
		const response = await POST(request("{}"));
		const result = await response.json();

		expect(response.status).toBe(422);
		expect(result.code).toBe("VALIDATION_FAILED");
		expect(fetch).not.toHaveBeenCalled();
	});

	it("rejects a missing Turnstile token before verification or delivery", async () => {
		const payload = { ...validPayload };
		Reflect.deleteProperty(payload, "turnstileToken");
		const response = await POST(request(JSON.stringify(payload)));
		const result = await response.json();

		expect(response.status).toBe(422);
		expect(result.code).toBe("VALIDATION_FAILED");
		expect(result.fields).toHaveProperty("turnstileToken");
		expect(fetch).not.toHaveBeenCalled();
	});

	it("accepts a honeypot submission without verification or delivery", async () => {
		const response = await POST(
			request(JSON.stringify({ ...validPayload, website: "spam.example" })),
		);

		expect(response.status).toBe(202);
		expect(fetch).not.toHaveBeenCalled();
	});

	it("verifies Turnstile before delivering a valid submission without forwarding its token", async () => {
		const response = await POST(request(JSON.stringify(validPayload)));
		const result = await response.json();
		const calls = vi.mocked(fetch).mock.calls;
		const [verifyTarget, verifyOptions] = calls[0] as [URL | Request | string, RequestInit];
		const [deliveryTarget, deliveryOptions] = calls[1] as [URL | Request | string, RequestInit];

		expect(response.status).toBe(202);
		expect(result.requestId).toBe(validPayload.submissionId);
		expect(fetch).toHaveBeenCalledTimes(2);
		expect(fetchUrl(verifyTarget)).toBe(siteverifyEndpoint);
		expect(verifyOptions.method).toBe("POST");
		expect(siteverifyValue(verifyOptions.body, "secret")).toBe(turnstileSecret);
		expect(siteverifyValue(verifyOptions.body, "response")).toBe(validPayload.turnstileToken);
		expect(fetchUrl(deliveryTarget)).toBe("https://hooks.example.com/redtail");
		const delivered = JSON.parse(String(deliveryOptions.body)) as {
			lead: Record<string, unknown>;
			requestId: string;
		};
		expect(delivered.requestId).toBe(validPayload.submissionId);
		expect(delivered.lead).not.toHaveProperty("turnstileToken");
		expect(String(deliveryOptions.body)).not.toContain(validPayload.turnstileToken);
	});

	it("accepts the footer form only with its own Turnstile action", async () => {
		vi.stubGlobal("fetch", mockFetch({ ...verifiedResult, action: "footer_demo" }));

		const response = await POST(
			request(JSON.stringify({ ...validPayload, source: "footer-demo" })),
		);

		expect(response.status).toBe(202);
		expect(fetch).toHaveBeenCalledTimes(2);
	});

	it.each([
		["missing secret", "TURNSTILE_SECRET"],
		["missing hostnames", "TURNSTILE_HOSTNAMES"],
	] as const)("fails closed for %s", async (_, setting) => {
		vi.stubEnv(setting, "");

		const response = await POST(request(JSON.stringify(validPayload)));

		expect(response.status).toBe(503);
		expect(await response.json()).toMatchObject({
			code: "TURNSTILE_NOT_CONFIGURED",
			ok: false,
		});
		expect(fetch).not.toHaveBeenCalled();
	});

	it.each([
		["rejected challenge", { ...verifiedResult, success: false }],
		["wrong action", { ...verifiedResult, action: "footer_demo" }],
		["wrong hostname", { ...verifiedResult, hostname: "evil.example" }],
		["missing action", { hostname: verifiedResult.hostname, success: true }],
		["missing hostname", { action: verifiedResult.action, success: true }],
	])("rejects a %s without delivery", async (_, verification) => {
		vi.stubGlobal("fetch", mockFetch(verification));

		const response = await POST(request(JSON.stringify(validPayload)));
		const body = await response.json();

		expect(response.status).toBe(403);
		expect(body).toMatchObject({ code: "TURNSTILE_FAILED", ok: false });
		expect(fetch).toHaveBeenCalledOnce();
	});

	it("returns an unavailable error when Cloudflare cannot be reached", async () => {
		vi.stubGlobal("fetch", vi.fn().mockRejectedValueOnce(new Error("private network detail")));

		const response = await POST(request(JSON.stringify(validPayload)));
		const body = await response.json();

		expect(response.status).toBe(503);
		expect(body).toMatchObject({ code: "TURNSTILE_UNAVAILABLE", ok: false });
		expect(JSON.stringify(body)).not.toContain("private network detail");
		expect(fetch).toHaveBeenCalledOnce();
	});

	it("accepts a valid submission only after SendGrid returns 202", async () => {
		configureSendGrid();

		const response = await POST(request(JSON.stringify(validPayload)));
		const result = await response.json();
		const [url] = vi.mocked(fetch).mock.calls[1] as [URL, RequestInit];

		expect(response.status).toBe(202);
		expect(result.requestId).toBe(validPayload.submissionId);
		expect(fetch).toHaveBeenCalledTimes(2);
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
		expect(fetch).toHaveBeenCalledOnce();
		expect(fetchUrl(vi.mocked(fetch).mock.calls[0][0])).toBe(siteverifyEndpoint);
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
		expect(fetch).toHaveBeenCalledOnce();
		expect(fetchUrl(vi.mocked(fetch).mock.calls[0][0])).toBe(siteverifyEndpoint);
	});

	it("maps an upstream webhook failure without exposing provider details", async () => {
		vi.stubGlobal(
			"fetch",
			mockFetch(verifiedResult, new Response("private provider detail", { status: 503 })),
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
			mockFetch(verifiedResult, new Response("private provider detail", { status: 401 })),
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
			validPayload.turnstileToken,
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
