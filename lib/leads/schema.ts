import { z } from "zod";

import {
	hasAttributionEmail,
	LEAD_ATTRIBUTION_LIMITS,
	LEAD_ATTRIBUTION_TEXT_PATTERN,
	LEAD_CLICK_ID_PATTERN,
	LEAD_LANDING_PATH_PATTERN,
} from "./attribution-fields";

export const industryValues = [
	"logistics",
	"construction",
	"government",
	"field-services",
	"insurance",
	"other",
] as const;

export const fleetSizeValues = [
	"1-9",
	"10-49",
	"50-174",
	"175-999",
	"1000+",
] as const;

const trimmedRequired = (label: string, maxLength: number) =>
	z
		.string()
		.trim()
		.min(1, `${label} is required.`)
		.max(maxLength, `${label} is too long.`)
		.regex(
			/^[^\u0000-\u001f\u007f]+$/,
			`${label} contains invalid characters.`,
		);

const optionalAttributionValue = z
	.string()
	.trim()
	.min(1)
	.max(LEAD_ATTRIBUTION_LIMITS.utm)
	.regex(LEAD_ATTRIBUTION_TEXT_PATTERN, "Attribution contains invalid characters.")
	.refine((value) => !hasAttributionEmail(value), "Attribution cannot contain contact details.")
	.optional();

const optionalClickId = z
	.string()
	.min(1)
	.max(LEAD_ATTRIBUTION_LIMITS.clickId)
	.regex(LEAD_CLICK_ID_PATTERN, "Click identifier contains invalid characters.")
	.optional();

export const leadAttributionSchema = z
	.strictObject({
		gclid: optionalClickId,
		gbraid: optionalClickId,
		landingPath: z
			.string()
			.trim()
			.min(1)
			.max(LEAD_ATTRIBUTION_LIMITS.landingPath)
			.regex(
				LEAD_LANDING_PATH_PATTERN,
				"Landing path must be a relative site path without a query or fragment.",
			)
			.refine((value) => !hasAttributionEmail(value), "Landing path cannot contain contact details.")
			.optional(),
		referrerOrigin: z
			.url()
			.max(LEAD_ATTRIBUTION_LIMITS.referrerOrigin)
			.refine((value) => {
				const url = new URL(value);
				return ["http:", "https:"].includes(url.protocol) && value === url.origin;
			}, "Referrer must be an HTTP origin without a path.")
			.optional(),
		utmCampaign: optionalAttributionValue,
		utmContent: optionalAttributionValue,
		utmMedium: optionalAttributionValue,
		utmSource: optionalAttributionValue,
		utmTerm: optionalAttributionValue,
		wbraid: optionalClickId,
	})
	.refine((value) => Object.values(value).some(Boolean), {
		message: "Attribution must contain at least one value.",
	});

export const leadSubmissionSchema = z
	.strictObject({
		attribution: leadAttributionSchema.optional(),
		company: trimmedRequired("Company name", 160),
		consent: z.literal(true, {
			error: "Consent to be contacted is required.",
		}),
		consentNoticeVersion: z.string().trim().min(1).max(100).optional(),
		email: z
			.string()
			.trim()
			.toLowerCase()
			.pipe(z.email("Enter a valid company email."))
			.pipe(z.string().max(254, "Email address is too long.")),
		firstName: trimmedRequired("First name", 80),
		fleetSize: z.enum(fleetSizeValues, {
			error: "Select a valid fleet size.",
		}),
		industry: z.enum(industryValues).optional(),
		lastName: trimmedRequired("Last name", 80),
		phone: z
			.string()
			.trim()
			.min(7, "Enter a valid phone number.")
			.max(30, "Phone number is too long.")
			.regex(
				/^[^\u0000-\u001f\u007f]+$/,
				"Phone number contains invalid characters.",
			)
			.refine(
				(value) => value.replace(/\D/g, "").length >= 7,
				"Enter a valid phone number.",
			),
		source: z.enum(["footer-demo", "get-started"]),
		submissionId: z.uuid("Submission ID must be a UUID.").optional(),
		turnstileToken: z.string().trim().min(1).max(2048),
		website: z.string().max(200).optional().default(""),
	})
	.superRefine((lead, context) => {
		if (lead.source === "get-started" && !lead.industry) {
			context.addIssue({
				code: "custom",
				message: "Select a valid industry.",
				path: ["industry"],
			});
		}
	});

export type LeadSubmission = z.output<typeof leadSubmissionSchema>;
export type DeliverableLead = Omit<
	LeadSubmission,
	"consentNoticeVersion" | "submissionId" | "turnstileToken" | "website"
>;
