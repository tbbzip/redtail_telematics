export type LeadAttribution = {
	landingPath?: string;
	referrerOrigin?: string;
	utmCampaign?: string;
	utmContent?: string;
	utmMedium?: string;
	utmSource?: string;
	utmTerm?: string;
};

const utmFields = [
	["utm_campaign", "utmCampaign"],
	["utm_content", "utmContent"],
	["utm_medium", "utmMedium"],
	["utm_source", "utmSource"],
	["utm_term", "utmTerm"],
] as const;

function cleanValue(value: string | null, maxLength: number) {
	if (!value) {
		return undefined;
	}

	const cleaned = value
		.replace(/[\u0000-\u001f\u007f]/g, " ")
		.replace(/\s+/g, " ")
		.trim();

	return cleaned ? cleaned.slice(0, maxLength) : undefined;
}

export function deriveLeadAttribution(
	pageUrl: string,
	referrer = "",
): LeadAttribution | undefined {
	let page: URL;

	try {
		page = new URL(pageUrl);
	} catch {
		return undefined;
	}

	if (!["http:", "https:"].includes(page.protocol)) {
		return undefined;
	}

	const attribution: LeadAttribution = {
		landingPath: cleanValue(page.pathname, 500),
	};

	for (const [queryName, fieldName] of utmFields) {
		const value = cleanValue(page.searchParams.get(queryName), 200);

		if (value) {
			attribution[fieldName] = value;
		}
	}

	if (referrer) {
		try {
			const referrerUrl = new URL(referrer);

			if (
				["http:", "https:"].includes(referrerUrl.protocol) &&
				referrerUrl.origin !== page.origin
			) {
				attribution.referrerOrigin = referrerUrl.origin;
			}
		} catch {
			// Malformed browser referrers are ignored rather than sent to the CRM.
		}
	}

	return attribution.landingPath ? attribution : undefined;
}

/**
 * Capture only the current page context at submission time. This deliberately
 * avoids cookies, persistent browser storage, click IDs, and arbitrary query
 * parameters.
 */
export function captureLeadAttribution() {
	if (typeof window === "undefined") {
		return undefined;
	}

	return deriveLeadAttribution(
		window.location.href,
		document.referrer,
	);
}
