// Legacy topic: redtail_web/data/features.ts at 47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d.
// Eligibility wording checked against IRS Publications 946 and Form 4562 instructions.
// Section 179 concerns qualifying purchased equipment; mileage records are a separate benefit.
export const section179Benefit = {
	title: "Tax Benefit — Section 179",
	description:
		"U.S. businesses may be able to deduct qualifying purchased GPS or telematics hardware under Section 179 in the year it is placed in service. Business-use rules and applicable limits apply; ask your tax adviser to confirm eligibility.",
	question: "Can GPS tracking hardware qualify for a Section 179 tax deduction?",
	answer:
		"Section 179 may allow a U.S. business to deduct the cost of qualifying purchased GPS or telematics hardware in the year it is placed in service. Eligibility depends on the equipment, business use, and applicable deduction and business-income limits. Ask your tax adviser to confirm whether your purchase qualifies and how much you can deduct.",
	guidanceHref: "https://www.irs.gov/publications/p946",
	guidanceLabel: "Read IRS Section 179 guidance",
} as const;
