import { afterEach, describe, expect, it, vi } from "vitest";

import {
	captureLeadAttribution,
	createLeadAttributionSession,
	deriveLeadAttribution,
	LEAD_ATTRIBUTION_SESSION_KEY,
	LEAD_ATTRIBUTION_TTL_MS,
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

	it("keeps truncated campaign values valid when the bound falls on a space", () => {
		const session = createLeadAttributionSession();
		const value = `${"x".repeat(199)} extra`;
		const original = session.capture(`https://www.redtailtelematics.com/?utm_source=${encodeURIComponent(value)}`);
		expect(original?.utmSource).toBe("x".repeat(199));
		expect(session.capture("https://www.redtailtelematics.com/contact-us")).toEqual(original);
	});

	it("captures only the three allowlisted, unchanged Google click identifiers", () => {
		expect(deriveLeadAttribution(
			"https://www.redtailtelematics.com/solutions/fleet-management?gclid=Paid_Click-123&gbraid=App_Click-123&wbraid=Web_Click-123&msclkid=ignored&email=private%40example.com&account=private#secret",
		)).toEqual({
			gclid: "Paid_Click-123",
			gbraid: "App_Click-123",
			landingPath: "/solutions/fleet-management",
			wbraid: "Web_Click-123",
		});
	});

	it.each(["", " space ", "bad/identifier", "email@example.com", "bad\nidentifier", "x".repeat(513)])(
		"discards malformed or oversized click identifiers %# rather than truncating them",
		(value) => {
			const query = new URLSearchParams({ gclid: value, gbraid: value, wbraid: value });
			expect(deriveLeadAttribution(`https://www.redtailtelematics.com/contact-us?${query}`))
				.toEqual({ landingPath: "/contact-us" });
		},
	);

	it("discards obvious contact details even when put in an allowlisted campaign field", () => {
		expect(deriveLeadAttribution(
			"https://www.redtailtelematics.com/?utm_source=private%2540example.com&utm_campaign=fleet",
		)).toEqual({ landingPath: "/", utmCampaign: "fleet" });
		expect(deriveLeadAttribution("https://www.redtailtelematics.com/private%40example.com")).toBeUndefined();
	});
});

function memoryStorage() {
	const values = new Map<string, string>();
	return {
		values,
		storage: {
			getItem: (key: string) => values.get(key) ?? null,
			removeItem: (key: string) => { values.delete(key); },
			setItem: (key: string, value: string) => { values.set(key, value); },
		},
	};
}

describe("attribution session", () => {
	const origin = "https://www.redtailtelematics.com";
	const paidEntry = `${origin}/solutions/fleet-management?gclid=Original_Click-123&utm_source=google&utm_medium=cpc&utm_campaign=fleet&email=private%40example.com`;

	it("keeps the original paid landing, UTMs, and click ID through SPA and full navigation", () => {
		const { storage, values } = memoryStorage();
		let timestamp = 1000;
		const session = createLeadAttributionSession(storage, () => timestamp);
		const original = session.capture(paidEntry, "https://www.google.com/search?q=private");
		timestamp += 500;
		expect(session.capture(`${origin}/contact-us?account=private`)).toEqual(original);
		const afterFullNavigation = createLeadAttributionSession(storage, () => timestamp);
		expect(afterFullNavigation.capture(`${origin}/get-started`, `${origin}/contact-us`)).toEqual(original);
		expect(original).toMatchObject({
			landingPath: "/solutions/fleet-management",
			gclid: "Original_Click-123",
			utmSource: "google",
			referrerOrigin: "https://www.google.com",
		});
		const stored = values.get(LEAD_ATTRIBUTION_SESSION_KEY)!;
		expect(stored).not.toContain("private");
		expect(stored).not.toContain("email");
		expect(stored).not.toContain("search?q");
		expect(JSON.parse(stored).capturedAt).toBe(1000);
	});

	it("replaces a different paid click without inheriting the old campaign's values", () => {
		const { storage } = memoryStorage();
		const session = createLeadAttributionSession(storage, () => 1000);
		session.capture(paidEntry);
		expect(session.capture(`${origin}/get-started?wbraid=New_Click-456&utm_campaign=new`)).toEqual({
			landingPath: "/get-started",
			utmCampaign: "new",
			wbraid: "New_Click-456",
		});
	});

	it("retains the landing and timestamp when the same click is repeated on an internal page", () => {
		const { storage, values } = memoryStorage();
		let timestamp = 1000;
		const session = createLeadAttributionSession(storage, () => timestamp);
		const original = session.capture(paidEntry);
		timestamp += 1000;
		expect(session.capture(`${origin}/contact-us?gclid=Original_Click-123`)).toEqual(original);
		expect(JSON.parse(values.get(LEAD_ATTRIBUTION_SESSION_KEY)!).capturedAt).toBe(1000);
	});

	it("replaces a distinct UTM campaign while retaining the original direct landing otherwise", () => {
		const session = createLeadAttributionSession();
		expect(session.capture(`${origin}/about-us`)).toEqual({ landingPath: "/about-us" });
		expect(session.capture(`${origin}/contact-us`)).toEqual({ landingPath: "/about-us" });
		expect(session.capture(`${origin}/get-started?utm_source=linkedin&utm_campaign=new`)).toEqual({
			landingPath: "/get-started", utmCampaign: "new", utmSource: "linkedin",
		});
	});

	it("expires raw context without renewing the same paid URL on later reloads", () => {
		const { storage, values } = memoryStorage();
		let timestamp = 1000;
		const session = createLeadAttributionSession(storage, () => timestamp);
		session.capture(paidEntry);
		timestamp += LEAD_ATTRIBUTION_TTL_MS;
		expect(session.capture(paidEntry)).toEqual({ landingPath: "/solutions/fleet-management" });
		const expired = JSON.parse(values.get(LEAD_ATTRIBUTION_SESSION_KEY)!);
		expect(expired.capturedAt).toBe(1000);
		expect(expired.attribution).toEqual({ landingPath: "/solutions/fleet-management" });
		expect(JSON.stringify(expired)).not.toContain("Original_Click");
		expect(JSON.stringify(expired)).not.toContain("utmSource");
		timestamp += 1000;
		const reloaded = createLeadAttributionSession(storage, () => timestamp);
		expect(reloaded.capture(paidEntry)).toEqual({ landingPath: "/solutions/fleet-management" });
		expect(reloaded.capture(`${origin}/contact-us`)).toEqual({ landingPath: "/contact-us" });
		expect(reloaded.capture(`${origin}/contact-us?gclid=New_Click-456`)).toEqual({
			landingPath: "/contact-us", gclid: "New_Click-456",
		});
		expect(JSON.parse(values.get(LEAD_ATTRIBUTION_SESSION_KEY)!).capturedAt).toBe(timestamp);
	});

	it.each([
		"not json",
		JSON.stringify({ version: 99, capturedAt: 1000, origin, attribution: { landingPath: "/old" } }),
		JSON.stringify({ version: 1, capturedAt: 1000, origin: "https://other.example", attribution: { landingPath: "/old" } }),
		JSON.stringify({ version: 1, capturedAt: 2000, origin, attribution: { landingPath: "/old" } }),
		JSON.stringify({ version: 1, capturedAt: 1000, origin, attribution: { landingPath: "/old?email=private@example.com" } }),
		JSON.stringify({ version: 1, capturedAt: 1000, origin, attribution: { landingPath: "/old", referrerOrigin: "https://other.example/private" } }),
		JSON.stringify({ version: 1, capturedAt: 1000, origin, attribution: { landingPath: "/old", email: "private@example.com" } }),
		JSON.stringify({ version: 1, capturedAt: 1000, origin, attribution: { landingPath: "/old", gclid: "bad/identifier" } }),
		JSON.stringify({ version: 1, capturedAt: 1000, origin, attribution: { landingPath: "/old", utmSource: "x".repeat(201) } }),
		JSON.stringify({ version: 1, capturedAt: 1000, origin, attribution: { landingPath: "/old", utmSource: "private@example.com" } }),
	])("discards malformed, future, cross-origin, or unsafe stored context %#", (stored) => {
		const { storage, values } = memoryStorage();
		values.set(LEAD_ATTRIBUTION_SESSION_KEY, stored);
		const session = createLeadAttributionSession(storage, () => 1000);
		expect(session.capture(`${origin}/contact-us`)).toEqual({ landingPath: "/contact-us" });
		expect(values.get(LEAD_ATTRIBUTION_SESSION_KEY)).not.toContain("private");
	});

	it("continues through SPA navigation when all browser storage operations throw", () => {
		const blocked = () => { throw new Error("Storage disabled"); };
		const session = createLeadAttributionSession({ getItem: blocked, setItem: blocked, removeItem: blocked });
		const original = session.capture(paidEntry);
		expect(session.capture(`${origin}/contact-us`)).toEqual(original);
	});

	it("does not replace a valid paid context with malformed click parameters", () => {
		const session = createLeadAttributionSession();
		const original = session.capture(paidEntry);
		expect(session.capture(`${origin}/contact-us?gclid=bad%2Fidentifier`)).toEqual(original);
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
