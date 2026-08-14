import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("lead rate-limit fallback", () => {
	beforeEach(() => {
		vi.resetModules();
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2026-08-13T12:00:00Z"));
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("fails closed at capacity without evicting an exhausted quota", async () => {
		const { checkLeadRateLimit } = await import("@/lib/leads/rate-limit");
		const identifier = "198.51.100.250";

		for (let attempt = 0; attempt < 8; attempt += 1) {
			expect(checkLeadRateLimit(identifier).allowed).toBe(true);
		}

		for (let index = 0; index < 1_999; index += 1) {
			checkLeadRateLimit(`203.0.113.${index}`);
		}

		const newClient = checkLeadRateLimit("192.0.2.1");
		expect(newClient).toEqual({
			allowed: false,
			limit: 8,
			remaining: 0,
			retryAfterSeconds: 600,
		});
		expect(checkLeadRateLimit(identifier).allowed).toBe(false);
		expect(checkLeadRateLimit(identifier).allowed).toBe(false);
	});

	it("resets a client quota after the fixed window expires", async () => {
		const { checkLeadRateLimit } = await import("@/lib/leads/rate-limit");
		const identifier = "198.51.100.5";

		for (let attempt = 0; attempt < 8; attempt += 1) {
			expect(checkLeadRateLimit(identifier).allowed).toBe(true);
		}

		expect(checkLeadRateLimit(identifier)).toMatchObject({
			allowed: false,
			retryAfterSeconds: 600,
		});
		vi.advanceTimersByTime(10 * 60 * 1000 + 1);

		expect(checkLeadRateLimit(identifier)).toEqual({
			allowed: true,
			limit: 8,
			remaining: 7,
			retryAfterSeconds: 0,
		});
	});
});
