import {
	hasAttributionEmail,
	LEAD_ATTRIBUTION_LIMITS,
	LEAD_ATTRIBUTION_TEXT_PATTERN,
	LEAD_CLICK_ID_FIELDS,
	LEAD_CLICK_ID_PATTERN,
	LEAD_LANDING_PATH_PATTERN,
	LEAD_UTM_FIELDS,
} from "./attribution-fields";

export type LeadAttribution = {
	gclid?: string;
	gbraid?: string;
	landingPath?: string;
	referrerOrigin?: string;
	utmCampaign?: string;
	utmContent?: string;
	utmMedium?: string;
	utmSource?: string;
	utmTerm?: string;
	wbraid?: string;
};

export const LEAD_ATTRIBUTION_SESSION_KEY = "redtail:lead-attribution:v1";
export const LEAD_ATTRIBUTION_TTL_MS = 30 * 60 * 1000;

type AttributionStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;
type AttributionContext = {
	attribution: LeadAttribution;
	capturedAt: number;
	expiredCampaignFingerprint?: string;
	origin: string;
	version: 1;
};

const campaignFields = [
	...LEAD_CLICK_ID_FIELDS,
	...LEAD_UTM_FIELDS.map(([, field]) => field),
];
const allowedFields = new Set([
	"landingPath",
	"referrerOrigin",
	...campaignFields,
]);

function isHttpOrigin(value: string) {
	try {
		const url = new URL(value);
		return ["http:", "https:"].includes(url.protocol) && value === url.origin;
	} catch {
		return false;
	}
}

function campaignFingerprint(attribution: LeadAttribution) {
	const clickField = LEAD_CLICK_ID_FIELDS.find((field) => attribution[field]);
	const campaign = clickField
		? `${clickField}:${attribution[clickField]}`
		: LEAD_UTM_FIELDS.map(([, field]) => `${field}:${attribution[field] || ""}`).join("|");
	if (!campaignFields.some((field) => attribution[field])) {
		return undefined;
	}
	// A tab-local stale-URL marker, not an authentication or analytics identifier.
	// It lets us erase raw expired values without renewing the same old paid URL.
	const hashes = [0x811c9dc5, 0x9e3779b9].map((seed) => {
		let hash = seed;
		for (let index = 0; index < campaign.length; index += 1) {
			hash = Math.imul(hash ^ campaign.charCodeAt(index), 0x01000193);
		}
		return (hash >>> 0).toString(16).padStart(8, "0");
	});
	return hashes.join("");
}

function cleanValue(value: string | null, maxLength: number) {
	if (!value) {
		return undefined;
	}

	const cleaned = value
		.replace(/[\u0000-\u001f\u007f]/g, " ")
		.replace(/\s+/g, " ")
		.trim();

	return cleaned && !hasAttributionEmail(cleaned)
		? cleaned.slice(0, maxLength).trim()
		: undefined;
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

	if (
		page.pathname.length > LEAD_ATTRIBUTION_LIMITS.landingPath ||
		!LEAD_LANDING_PATH_PATTERN.test(page.pathname) ||
		hasAttributionEmail(page.pathname)
	) {
		return undefined;
	}

	const attribution: LeadAttribution = { landingPath: page.pathname };

	for (const [queryName, fieldName] of LEAD_UTM_FIELDS) {
		const value = cleanValue(
			page.searchParams.get(queryName),
			LEAD_ATTRIBUTION_LIMITS.utm,
		);

		if (value) {
			attribution[fieldName] = value;
		}
	}

	for (const field of LEAD_CLICK_ID_FIELDS) {
		const value = page.searchParams.get(field);
		// An opaque click identifier must be preserved exactly, never truncated.
		if (
			value &&
			value.length <= LEAD_ATTRIBUTION_LIMITS.clickId &&
			LEAD_CLICK_ID_PATTERN.test(value)
		) {
			attribution[field] = value;
		}
	}

	if (referrer) {
		try {
			const referrerUrl = new URL(referrer);

			if (
				["http:", "https:"].includes(referrerUrl.protocol) &&
				referrerUrl.origin !== page.origin &&
				referrerUrl.origin.length <= LEAD_ATTRIBUTION_LIMITS.referrerOrigin
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
 * Retain only an allowlisted attribution context for this tab, for a fixed
 * 30 minutes. New valid campaign/click entries replace, never merge with, old
 * context. Direct/internal navigation and repeated capture do not renew it.
 * Storage is optional: a blocked browser store leaves an in-memory SPA fallback.
 */
export function createLeadAttributionSession(
	storage?: AttributionStorage,
	now: () => number = Date.now,
) {
	let context: AttributionContext | undefined;

	function removeStoredContext() {
		try {
			storage?.removeItem(LEAD_ATTRIBUTION_SESSION_KEY);
		} catch {
			// Attribution must not prevent a lead submission in private browsers.
		}
	}

	function isValidContext(value: unknown, origin: string, timestamp: number): value is AttributionContext {
		if (!value || typeof value !== "object" || Array.isArray(value)) {
			return false;
		}
		const candidate = value as AttributionContext;
		if (
			Object.keys(candidate).some((key) => !["attribution", "capturedAt", "expiredCampaignFingerprint", "origin", "version"].includes(key)) ||
			candidate.version !== 1 ||
			candidate.origin !== origin ||
			!isHttpOrigin(candidate.origin) ||
			!Number.isSafeInteger(candidate.capturedAt) ||
			candidate.capturedAt < 0 ||
			candidate.capturedAt > timestamp ||
			(candidate.expiredCampaignFingerprint !== undefined &&
				(typeof candidate.expiredCampaignFingerprint !== "string" ||
					!/^[a-f0-9]{16}$/.test(candidate.expiredCampaignFingerprint)))
		) {
			return false;
		}
		const attribution = candidate.attribution;
		if (!attribution || typeof attribution !== "object" || Array.isArray(attribution)) {
			return false;
		}
		if (!attribution.landingPath || Object.keys(attribution).some((key) => !allowedFields.has(key))) {
			return false;
		}
		if (candidate.expiredCampaignFingerprint && Object.keys(attribution).some((key) => key !== "landingPath")) {
			return false;
		}
		return Object.entries(attribution).every(([key, field]) => {
			if (typeof field !== "string" || !field || hasAttributionEmail(field)) {
				return false;
			}
			if (key === "landingPath") {
				return field.length <= LEAD_ATTRIBUTION_LIMITS.landingPath && LEAD_LANDING_PATH_PATTERN.test(field);
			}
			if (key === "referrerOrigin") {
				return field.length <= LEAD_ATTRIBUTION_LIMITS.referrerOrigin && isHttpOrigin(field);
			}
			if (LEAD_CLICK_ID_FIELDS.some((clickField) => clickField === key)) {
				return field.length <= LEAD_ATTRIBUTION_LIMITS.clickId && LEAD_CLICK_ID_PATTERN.test(field);
			}
			return field.length <= LEAD_ATTRIBUTION_LIMITS.utm && field === field.trim() && LEAD_ATTRIBUTION_TEXT_PATTERN.test(field);
		});
	}

	function saveContext() {
		try {
			storage?.setItem(LEAD_ATTRIBUTION_SESSION_KEY, JSON.stringify(context));
		} catch {
			// Retain this page context in memory without blocking the form.
		}
	}

	return {
		capture(pageUrl: string, referrer = ""): LeadAttribution | undefined {
			const current = deriveLeadAttribution(pageUrl, referrer);
			if (!current) {
				return undefined;
			}
			const origin = new URL(pageUrl).origin;
			const timestamp = now();
			if (!context) {
				try {
					const stored = storage?.getItem(LEAD_ATTRIBUTION_SESSION_KEY);
					if (stored) {
						const parsed: unknown = stored.length <= 7000 ? JSON.parse(stored) : null;
						if (isValidContext(parsed, origin, timestamp)) {
							context = parsed;
						} else {
							removeStoredContext();
						}
					}
				} catch {
					removeStoredContext();
				}
			}
			if (context && !isValidContext(context, origin, timestamp)) {
				context = undefined;
				removeStoredContext();
			}
			if (context && timestamp - context.capturedAt >= LEAD_ATTRIBUTION_TTL_MS) {
				if (!context.expiredCampaignFingerprint) {
					context = {
						...context,
						attribution: { landingPath: context.attribution.landingPath },
						expiredCampaignFingerprint: campaignFingerprint(context.attribution),
					};
					saveContext();
				}
				const incomingFingerprint = campaignFingerprint(current);
				if (!incomingFingerprint || incomingFingerprint === context.expiredCampaignFingerprint) {
					return {
						landingPath: current.landingPath,
						...(current.referrerOrigin ? { referrerOrigin: current.referrerOrigin } : {}),
					};
				}
				context = undefined;
			}

			const incomingClickFields = LEAD_CLICK_ID_FIELDS.filter((field) => current[field]);
			const isNewCampaign = incomingClickFields.length > 0
				? incomingClickFields.some((field) => current[field] !== context?.attribution[field])
				: LEAD_UTM_FIELDS.some(([, field]) => current[field] && current[field] !== context?.attribution[field]);
			if (!context || isNewCampaign) {
				context = { attribution: current, capturedAt: timestamp, origin, version: 1 };
				saveContext();
			}
			return { ...context.attribution };
		},
	};
}

let browserSession: ReturnType<typeof createLeadAttributionSession> | undefined;

/** Called on page entry and by forms; never publishes attribution to dataLayer. */
export function captureLeadAttribution() {
	if (typeof window === "undefined") {
		return undefined;
	}
	if (!browserSession) {
		let storage: AttributionStorage | undefined;
		try {
			storage = window.sessionStorage;
		} catch {
			// Security settings can make even accessing sessionStorage throw.
		}
		browserSession = createLeadAttributionSession(storage);
	}
	return browserSession.capture(window.location.href, document.referrer);
}
