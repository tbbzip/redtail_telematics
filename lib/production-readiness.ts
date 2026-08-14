import "server-only";

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
