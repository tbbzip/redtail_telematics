import "server-only";

import { normalizeGoogleTagManagerId } from "@/lib/analytics";
import { assertLeadDeliveryConfiguration } from "@/lib/leads/deliver";

function hasValue(name: string) {
	return Boolean(process.env[name]?.trim());
}

function hasValidSiteUrl() {
	const value = process.env.SITE_URL?.trim();

	if (!value) {
		return false;
	}

	try {
		const url = new URL(value);
		return (
			url.protocol === "https:" &&
			!url.username &&
			!url.password &&
			!url.search &&
			!url.hash &&
			(url.pathname === "/" || url.pathname === "")
		);
	} catch {
		return false;
	}
}

export function getProductionReadiness() {
	const failures: string[] = [];
	const configuredGtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() || "";
	const normalizedGtmId = normalizeGoogleTagManagerId(configuredGtmId);
	const vercelEnvironment = process.env.VERCEL_ENV?.trim().toLowerCase();
	const requiresGtm =
		vercelEnvironment === "production" ||
		(!vercelEnvironment && process.env.NODE_ENV === "production");

	if (!hasValidSiteUrl()) {
		failures.push("site-url");
	}

	for (const name of [
		"NEXT_PUBLIC_SANITY_API_VERSION",
		"NEXT_PUBLIC_SANITY_DATASET",
		"NEXT_PUBLIC_SANITY_PROJECT_ID",
	]) {
		if (!hasValue(name)) {
			failures.push("cms");
			break;
		}
	}

	if (
		(requiresGtm && !normalizedGtmId) ||
		(configuredGtmId && !normalizedGtmId)
	) {
		failures.push("analytics");
	}

	if ((process.env.LEAD_RATE_LIMIT_HASH_SECRET?.trim().length ?? 0) < 32) {
		failures.push("rate-limit-secret");
	}

	try {
		assertLeadDeliveryConfiguration();
	} catch {
		failures.push("lead-delivery");
	}

	return {
		failures,
		ready: failures.length === 0,
	};
}
