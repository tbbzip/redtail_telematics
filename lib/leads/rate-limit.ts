import { createHmac, randomBytes } from "node:crypto";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;
const MAX_ENTRIES = 2_000;
const fallbackHashSecret = randomBytes(32);

type RateLimitEntry = {
	count: number;
	resetAt: number;
};

const entries = new Map<string, RateLimitEntry>();

function pruneExpiredEntries(now: number) {
	for (const [key, entry] of entries) {
		if (entry.resetAt <= now) {
			entries.delete(key);
		}
	}
}

function getCapacityRetryAfterSeconds(now: number) {
	let earliestResetAt = now + WINDOW_MS;

	for (const entry of entries.values()) {
		earliestResetAt = Math.min(earliestResetAt, entry.resetAt);
	}

	return Math.max(1, Math.ceil((earliestResetAt - now) / 1000));
}

export function checkLeadRateLimit(identifier: string) {
	const now = Date.now();
	const key = createHmac(
		"sha256",
		process.env.LEAD_RATE_LIMIT_HASH_SECRET || fallbackHashSecret,
	)
		.update(identifier)
		.digest("hex");

	pruneExpiredEntries(now);
	const current = entries.get(key);

	if (!current) {
		if (entries.size >= MAX_ENTRIES) {
			return {
				allowed: false,
				limit: MAX_REQUESTS,
				remaining: 0,
				retryAfterSeconds: getCapacityRetryAfterSeconds(now),
			};
		}

		entries.set(key, { count: 1, resetAt: now + WINDOW_MS });
		return {
			allowed: true,
			limit: MAX_REQUESTS,
			remaining: MAX_REQUESTS - 1,
			retryAfterSeconds: 0,
		};
	}

	if (current.count >= MAX_REQUESTS) {
		return {
			allowed: false,
			limit: MAX_REQUESTS,
			remaining: 0,
			retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
		};
	}

	current.count += 1;
	return {
		allowed: true,
		limit: MAX_REQUESTS,
		remaining: Math.max(0, MAX_REQUESTS - current.count),
		retryAfterSeconds: 0,
	};
}
