import type { Metadata } from "next";

import { CareersPageSections } from "@/components/careers-page";
import { getActiveCareerVacancies } from "@/sanity/lib/careers";

export const revalidate = 60;

export const metadata: Metadata = {
	title: "Careers at Redtail Telematics",
	description:
		"Join Redtail Telematics and be part of a dynamic team tackling cutting-edge engineering challenges. We offer a collaborative environment, opportunities for professional growth, and a culture that values innovation, work-life balance, and employee well-being.",
	keywords: [
		"Redtail Telematics Careers",
		"Telematics Jobs",
		"Engineering Careers",
		"Fleet Management Jobs",
		"Tech Careers",
		"Join Redtail Telematics",
		"Telematics Engineering",
		"Innovative Tech Jobs",
		"Professional Growth",
		"Work-Life Balance",
		"Tech Company Jobs",
		"Telematics Careers",
		"Engineering Opportunities",
		"Redtail Jobs",
		"Career Development",
		"Technology Careers",
		"Telematics Solutions Jobs",
		"Engineering Teams",
		"Dynamic Work Environment",
		"Employee Well-being",
	],
	alternates: {
		canonical: "https://www.redtailtelematics.com/careers",
	},
	openGraph: {
		title: "Careers at Redtail Telematics | Join Our Team",
		description:
			"Explore career opportunities at Redtail Telematics. Join a team of innovative engineers and professionals dedicated to advancing fleet management and telematics solutions. Discover how you can grow and thrive with us.",
		url: "https://www.redtailtelematics.com/careers",
		locale: "en_US",
		images: [
			{
				url: "https://www.redtailtelematics.com/og-image.webp",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		site: "@RedtailTele",
		title: "Careers at Redtail Telematics | Join Our Team",
		description:
			"Looking to make an impact in the telematics industry? Redtail Telematics offers exciting career opportunities, a supportive work environment, and avenues for professional growth. Apply today and be part of our innovative team.",
		images: ["https://www.redtailtelematics.com/og-image.webp"],
	},
	referrer: "origin-when-cross-origin",
	creator: "Redtail Telematics",
	publisher: "Redtail Telematics",
	authors: [{ name: "The Branding Bull Digital Marketing Agency" }],
	generator: "Developed by The Branding Bull Digital Marketing Agency",
	icons: {
		icon: "/favicon.ico",
	},
};

export default async function CareersPage() {
	const jobs = await getActiveCareerVacancies();

	return (
		<main className="flex-1 overflow-x-clip bg-background">
			<CareersPageSections jobs={jobs} />
		</main>
	);
}
