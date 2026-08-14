import { afterEach, describe, expect, it, vi } from "vitest";

import {
	captureLeadAttribution,
	deriveLeadAttribution,
} from "@/lib/leads/attribution";

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("deriveLeadAttribution", () => {
	it("captures bounded campaign values, the landing path, and external origin", () => {
		expect(
			deriveLeadAttribution(
				"https://www.redtailtelematics.com/get-started?utm_source=LinkedIn&utm_medium=paid%20social&utm_campaign=Fleet%20Reset&utm_content=video-a&utm_term=fleet%20tracking",
				"https://www.linkedin.com/feed/update/123?member=private",
			),
		).toEqual({
			landingPath: "/get-started",
			referrerOrigin: "https://www.linkedin.com",
			utmCampaign: "Fleet Reset",
			utmContent: "video-a",
			utmMedium: "paid social",
			utmSource: "LinkedIn",
			utmTerm: "fleet tracking",
		});
	});

	it("does not disclose the arbitrary query string or internal referrer path", () => {
		const attribution = deriveLeadAttribution(
			"https://www.redtailtelematics.com/get-started?email=private%40example.com",
			"https://www.redtailtelematics.com/pricing?account=private",
		);

		expect(attribution).toEqual({ landingPath: "/get-started" });
		expect(JSON.stringify(attribution)).not.toContain("private");
	});

	it("ignores malformed and non-HTTP URLs", () => {
		expect(deriveLeadAttribution("not a URL")).toBeUndefined();
		expect(deriveLeadAttribution("javascript:alert(1)")).toBeUndefined();
	});

	it("ignores malformed and non-HTTP referrers", () => {
		expect(
			deriveLeadAttribution(
				"https://www.redtailtelematics.com/get-started",
				"not a URL",
			),
		).toEqual({ landingPath: "/get-started" });
		expect(
			deriveLeadAttribution(
				"https://www.redtailtelematics.com/get-started",
				"javascript:alert(1)",
			),
		).toEqual({ landingPath: "/get-started" });
	});

	it("normalizes and bounds UTM values", () => {
		const attribution = deriveLeadAttribution(
			`https://www.redtailtelematics.com/?utm_source=${encodeURIComponent(` paid\n${"x".repeat(220)} `)}`,
		);

		expect(attribution?.utmSource).toHaveLength(200);
		expect(attribution?.utmSource).not.toContain("\n");
	});
});

describe("captureLeadAttribution", () => {
	it("returns no attribution during server rendering", () => {
		expect(captureLeadAttribution()).toBeUndefined();
	});

	it("reads only the current browser URL and referrer", () => {
		vi.stubGlobal("window", {
			location: {
				href: "https://www.redtailtelematics.com/get-started?utm_source=linkedin&email=private%40example.com",
			},
		});
		vi.stubGlobal("document", {
			referrer: "https://www.linkedin.com/feed/member/private",
		});

		const attribution = captureLeadAttribution();

		expect(attribution).toEqual({
			landingPath: "/get-started",
			referrerOrigin: "https://www.linkedin.com",
			utmSource: "linkedin",
		});
		expect(JSON.stringify(attribution)).not.toContain("private@example.com");
	});
});
