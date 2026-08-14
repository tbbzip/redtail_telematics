import { describe, expect, it } from "vitest";

import {
	fleetSizeValues,
	industryValues,
	leadSubmissionSchema,
} from "../../lib/leads/schema";

const validFooterLead = {
	company: "Redtail Test Fleet",
	consent: true,
	consentNoticeVersion: "lead-contact-consent-v1",
	email: "fleet@example.com",
	firstName: "Ada",
	fleetSize: "10-49",
	lastName: "Lovelace",
	phone: "+44 20 7946 0958",
	source: "footer-demo",
} as const;

const validGetStartedLead = {
	...validFooterLead,
	industry: "logistics",
	source: "get-started",
} as const;

function issuesFor(input: unknown) {
	const result = leadSubmissionSchema.safeParse(input);

	expect(result.success).toBe(false);

	if (result.success) {
		throw new Error("Expected lead submission validation to fail.");
	}

	return result.error.issues;
}

function expectFieldIssue(input: unknown, field: string, message?: string) {
	const expectedIssue = message
		? expect.objectContaining({ message, path: [field] })
		: expect.objectContaining({ path: [field] });

	expect(issuesFor(input)).toEqual(expect.arrayContaining([expectedIssue]));
}

describe("leadSubmissionSchema", () => {
	it("normalizes text and email fields and defaults the honeypot", () => {
		const result = leadSubmissionSchema.parse({
			...validFooterLead,
			company: "  Redtail Test Fleet  ",
			email: "  FLEET@EXAMPLE.COM  ",
			firstName: "  Ada  ",
			lastName: "  Lovelace  ",
			phone: "  +44 20 7946 0958  ",
		});

		expect(result).toEqual({
			...validFooterLead,
			website: "",
		});
	});

	it.each(fleetSizeValues)("accepts fleet size %s", (fleetSize) => {
		expect(
			leadSubmissionSchema.safeParse({ ...validFooterLead, fleetSize }).success,
		).toBe(true);
	});

	it.each(industryValues)("accepts get-started industry %s", (industry) => {
		expect(
			leadSubmissionSchema.safeParse({ ...validGetStartedLead, industry }).success,
		).toBe(true);
	});

	it("requires industry for get-started but not for the footer form", () => {
		const withoutIndustry = { ...validGetStartedLead };
		Reflect.deleteProperty(withoutIndustry, "industry");

		expectFieldIssue(
			withoutIndustry,
			"industry",
			"Select a valid industry.",
		);
		expect(leadSubmissionSchema.safeParse(validFooterLead).success).toBe(true);
	});

	it.each([
		["company", "Company name is required."],
		["firstName", "First name is required."],
		["lastName", "Last name is required."],
	] as const)("rejects a blank %s", (field, message) => {
		expectFieldIssue({ ...validFooterLead, [field]: "   " }, field, message);
	});

	it("requires explicit consent", () => {
		expectFieldIssue(
			{ ...validFooterLead, consent: false },
			"consent",
			"Consent to be contacted is required.",
		);
	});

	it("accepts a strict, privacy-bounded attribution object", () => {
		const result = leadSubmissionSchema.parse({
			...validFooterLead,
			attribution: {
				landingPath: "/get-started",
				referrerOrigin: "https://www.linkedin.com",
				utmCampaign: "fleet-reset",
				utmMedium: "paid-social",
				utmSource: "linkedin",
			},
		});

		expect(result.attribution).toMatchObject({
			landingPath: "/get-started",
			referrerOrigin: "https://www.linkedin.com",
			utmSource: "linkedin",
		});
	});

	it.each([
		{ landingPath: "https://evil.example/path" },
		{ landingPath: "//evil.example/path" },
		{ landingPath: "/get-started?email=private@example.com" },
		{ landingPath: "/get-started#private" },
		{ referrerOrigin: "https://www.linkedin.com/private/path" },
		{ utmCampaign: "fleet\u0000reset" },
		{ utmSource: "x".repeat(201) },
		{},
	])("rejects unsafe attribution %#", (attribution) => {
		expect(
			leadSubmissionSchema.safeParse({ ...validFooterLead, attribution }).success,
		).toBe(false);
	});

	it.each([
		["email", "not-an-email", "Enter a valid company email."],
		["phone", "12-ab", "Enter a valid phone number."],
		["fleetSize", "5000+", "Select a valid fleet size."],
		["industry", "retail", undefined],
		["source", "campaign-popup", undefined],
	] as const)("rejects an invalid %s", (field, value, message) => {
		expectFieldIssue(
			{ ...validGetStartedLead, [field]: value },
			field,
			message,
		);
	});

	it.each([
		["company", "Acme\nBcc: victim@example.com"],
		["firstName", "Ada\rLovelace"],
		["lastName", "Love\u0000lace"],
		["phone", "+44 20\t7946 0958"],
	] as const)("rejects control characters in %s", (field, value) => {
		expectFieldIssue({ ...validFooterLead, [field]: value }, field);
	});

	it.each([
		["company", "x".repeat(161), "Company name is too long."],
		["firstName", "x".repeat(81), "First name is too long."],
		["lastName", "x".repeat(81), "Last name is too long."],
		["phone", "1".repeat(31), "Phone number is too long."],
		["website", "x".repeat(201), undefined],
	] as const)("enforces the maximum length for %s", (field, value, message) => {
		expectFieldIssue(
			{ ...validFooterLead, [field]: value },
			field,
			message,
		);
	});

	it("rejects email addresses longer than 254 characters", () => {
		expectFieldIssue(
			{
				...validFooterLead,
				email: `${"a".repeat(243)}@example.com`,
			},
			"email",
		);
	});

	it("accepts a populated honeypot for silent handling by the API route", () => {
		const result = leadSubmissionSchema.parse({
			...validFooterLead,
			website: "https://bot.invalid",
		});

		expect(result.website).toBe("https://bot.invalid");
	});

	it("rejects unrecognized payload fields", () => {
		const issues = issuesFor({
			...validFooterLead,
			admin: true,
		});

		expect(issues).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					code: "unrecognized_keys",
					keys: ["admin"],
				}),
			]),
		);
	});
});
