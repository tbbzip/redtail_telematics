import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { GET, HEAD } from "@/app/api/health/route";
import { getProductionReadiness } from "@/lib/production-readiness";

function configureReadyEnvironment(provider: "sendgrid" | "webhook" = "webhook") {
	vi.stubEnv("SITE_URL", "https://www.redtailtelematics.com");
	vi.stubEnv("NEXT_PUBLIC_SANITY_API_VERSION", "2026-04-01");
	vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
	vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "bulruaoh");
	vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NJBD87XB");
	vi.stubEnv("LEAD_RATE_LIMIT_HASH_SECRET", "x".repeat(32));
	vi.stubEnv("LEAD_DELIVERY_PROVIDER", provider);

	if (provider === "webhook") {
		vi.stubEnv("LEAD_WEBHOOK_URL", "https://hooks.example.com/redtail");
		vi.stubEnv("LEAD_WEBHOOK_ALLOWED_HOSTS", "hooks.example.com");
	} else {
		vi.stubEnv("VERCEL_ENV", "production");
		vi.stubEnv("LEAD_WEBHOOK_URL", "");
		vi.stubEnv("LEAD_WEBHOOK_ALLOWED_HOSTS", "");
		vi.stubEnv("SENDGRID_API_KEY", `SG.${"x".repeat(60)}`);
		vi.stubEnv("LEAD_EMAIL_FROM", "no-reply@redtailtelematics.com");
		vi.stubEnv("LEAD_EMAIL_FROM_NAME", "Redtail Telematics Website");
		vi.stubEnv(
			"LEAD_EMAIL_RECIPIENTS",
			"sales@redtailtelematics.com,aldo@thebrandingbull.com",
		);
	}
}

describe("production readiness", () => {
	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it("reports ready only when canonical, CMS, rate-limit, and delivery config pass", async () => {
		configureReadyEnvironment();

		expect(getProductionReadiness()).toEqual({ failures: [], ready: true });
		const response = GET();

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ status: "ready" });
		expect(response.headers.get("cache-control")).toBe("no-store");
		expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow");
		expect(HEAD().status).toBe(200);
	});

	it("accepts the existing SendGrid production delivery path", async () => {
		configureReadyEnvironment("sendgrid");

		expect(getProductionReadiness()).toEqual({ failures: [], ready: true });
		expect(GET().status).toBe(200);
	});

	it.each([
		["SENDGRID_API_KEY", ""],
		["SENDGRID_API_KEY", "not-a-sendgrid-key"],
		["LEAD_EMAIL_FROM", ""],
		["LEAD_EMAIL_RECIPIENTS", ""],
	] as const)("fails readiness for invalid SendGrid setting %s", (name, value) => {
		configureReadyEnvironment("sendgrid");
		vi.stubEnv(name, value);

		expect(getProductionReadiness()).toEqual({
			failures: ["lead-delivery"],
			ready: false,
		});
		expect(GET().status).toBe(503);
	});

	it("requires explicit provider selection in production", () => {
		configureReadyEnvironment();
		vi.stubEnv("NODE_ENV", "production");
		vi.stubEnv("LEAD_DELIVERY_PROVIDER", "");

		expect(getProductionReadiness()).toEqual({
			failures: ["lead-delivery"],
			ready: false,
		});
	});

	it("fails readiness when the Vercel Production GTM container is absent or invalid", () => {
		configureReadyEnvironment();
		vi.stubEnv("VERCEL_ENV", "production");
		vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");

		expect(getProductionReadiness()).toEqual({
			failures: ["analytics"],
			ready: false,
		});

		vi.stubEnv("NEXT_PUBLIC_GTM_ID", "G-ABC123");
		expect(getProductionReadiness()).toEqual({
			failures: ["analytics"],
			ready: false,
		});
	});

	it("allows Preview to omit GTM but rejects a malformed configured value", () => {
		configureReadyEnvironment();
		vi.stubEnv("VERCEL_ENV", "preview");
		vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");

		expect(getProductionReadiness()).toEqual({ failures: [], ready: true });

		vi.stubEnv("NEXT_PUBLIC_GTM_ID", "G-ABC123");
		expect(getProductionReadiness()).toEqual({
			failures: ["analytics"],
			ready: false,
		});

		vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-PREVIEW1");
		expect(getProductionReadiness()).toEqual({ failures: [], ready: true });
	});

	it("requires GTM for a non-Vercel production runtime", () => {
		configureReadyEnvironment();
		vi.stubEnv("VERCEL_ENV", "");
		vi.stubEnv("NODE_ENV", "production");
		vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");

		expect(getProductionReadiness()).toEqual({
			failures: ["analytics"],
			ready: false,
		});
	});

	it("fails closed when Preview is configured with a production recipient", () => {
		configureReadyEnvironment("sendgrid");
		vi.stubEnv("VERCEL_ENV", "preview");

		expect(getProductionReadiness()).toEqual({
			failures: ["lead-delivery"],
			ready: false,
		});

		vi.stubEnv("LEAD_EMAIL_RECIPIENTS", "redtail-preview@example.com");
		expect(getProductionReadiness()).toEqual({ failures: [], ready: true });
	});

	it.each([
		"sales@redtailtelematics.com",
		"aldo@thebrandingbull.com",
		"sales@redtailtelematics.com,other@example.com",
		"sales@redtailtelematics.com,aldo@thebrandingbull.com,other@example.com",
	])(
		"fails readiness for an unapproved Production recipient set: %s",
		(recipients) => {
			configureReadyEnvironment("sendgrid");
			vi.stubEnv("LEAD_EMAIL_RECIPIENTS", recipients);

			expect(getProductionReadiness()).toEqual({
				failures: ["lead-delivery"],
				ready: false,
			});
		},
	);

	it("validates only the selected provider and never falls back", () => {
		configureReadyEnvironment("webhook");
		vi.stubEnv("SENDGRID_API_KEY", "invalid");
		vi.stubEnv("LEAD_EMAIL_FROM", "invalid");
		vi.stubEnv("LEAD_EMAIL_RECIPIENTS", "invalid");

		expect(getProductionReadiness()).toEqual({ failures: [], ready: true });

		vi.stubEnv("LEAD_DELIVERY_PROVIDER", "sendgrid");
		expect(getProductionReadiness()).toEqual({
			failures: ["lead-delivery"],
			ready: false,
		});
	});

	it("fails closed without leaking which runtime setting is absent", async () => {
		vi.stubEnv("NODE_ENV", "production");
		vi.stubEnv("VERCEL_ENV", "");
		vi.stubEnv("SITE_URL", "http://localhost:3000/path?debug=1");
		vi.stubEnv("NEXT_PUBLIC_SANITY_API_VERSION", "");
		vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "");
		vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "");
		vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
		vi.stubEnv("LEAD_RATE_LIMIT_HASH_SECRET", "short");
		vi.stubEnv("LEAD_WEBHOOK_URL", "");
		vi.stubEnv("LEAD_WEBHOOK_ALLOWED_HOSTS", "");

		const readiness = getProductionReadiness();
		expect(readiness.ready).toBe(false);
		expect(readiness.failures).toEqual([
			"site-url",
			"cms",
			"analytics",
			"rate-limit-secret",
			"lead-delivery",
		]);

		const response = GET();
		const body = await response.text();
		expect(response.status).toBe(503);
		expect(body).toBe('{"status":"not_ready"}');
		expect(body).not.toContain("LEAD_WEBHOOK_URL");
		expect(HEAD().status).toBe(503);
	});
});
