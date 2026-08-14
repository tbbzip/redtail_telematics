import { z } from "zod";

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
	.max(200)
	.regex(/^[^\u0000-\u001f\u007f]+$/, "Attribution contains invalid characters.")
	.optional();

export const leadAttributionSchema = z
	.strictObject({
		landingPath: z
			.string()
			.trim()
			.min(1)
			.max(500)
			.regex(
				/^\/(?!\/)[^?#\u0000-\u001f\u007f]*$/,
				"Landing path must be a relative site path without a query or fragment.",
			)
			.optional(),
		referrerOrigin: z
			.url()
			.max(2048)
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
	"consentNoticeVersion" | "submissionId" | "website"
>;
