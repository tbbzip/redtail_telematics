export const LEAD_ATTRIBUTION_LIMITS = {
	clickId: 512,
	landingPath: 500,
	referrerOrigin: 2048,
	utm: 200,
} as const;

export const LEAD_CLICK_ID_PATTERN = /^[A-Za-z0-9_-]+$/;
export const LEAD_LANDING_PATH_PATTERN = /^\/(?!\/)[^?#\u0000-\u001f\u007f]*$/;
export const LEAD_ATTRIBUTION_TEXT_PATTERN = /^[^\u0000-\u001f\u007f]+$/;

export const LEAD_UTM_FIELDS = [
	["utm_campaign", "utmCampaign"],
	["utm_content", "utmContent"],
	["utm_medium", "utmMedium"],
	["utm_source", "utmSource"],
	["utm_term", "utmTerm"],
] as const;

export const LEAD_CLICK_ID_FIELDS = ["gclid", "gbraid", "wbraid"] as const;

// Campaign fields are contextual metadata, not a place for contact details.
export function hasAttributionEmail(value: string) {
	let decoded = value;

	for (let attempt = 0; attempt < 3; attempt += 1) {
		if (decoded.includes("@")) {
			return true;
		}

		try {
			const next = decodeURIComponent(decoded);
			if (next === decoded) {
				break;
			}
			decoded = next;
		} catch {
			break;
		}
	}

	return false;
}
