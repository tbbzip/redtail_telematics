import type { Metadata } from "next";

import { AboutUsPageSections } from "@/components/about-us-page";

export const metadata: Metadata = {
	title: "About Us | Redtail Telematics",
	description:
		"Learn about Redtail Telematics, a leader in fleet management and telematics solutions. Discover our mission, values, and commitment to enhancing fleet efficiency, safety, and sustainability for businesses across various industries.",
	keywords: [
		"About Redtail Telematics",
		"Redtail Telematics Company",
		"Fleet Management Experts",
		"Telematics Solutions Provider",
		"Fleet Efficiency",
		"Fleet Safety",
		"Sustainable Fleet Management",
		"Company Mission",
		"Redtail Telematics Values",
		"Fleet Technology",
		"Fleet Optimization",
		"Telematics Innovation",
		"Fleet Compliance",
		"Company History",
		"Redtail Telematics Team",
		"Fleet Data Analytics",
		"Customer-Centric Telematics",
		"Fleet Management Services",
		"Redtail Telematics Solutions",
		"Industry-Leading Telematics",
		"Fleet Sustainability",
	],
	alternates: {
		canonical: "https://www.redtailtelematics.com/about-us",
	},
	openGraph: {
		title: "About Us | Redtail Telematics",
		description:
			"Discover Redtail Telematics' journey as a leading provider of fleet management and telematics solutions. Our mission is to empower businesses with real-time data and innovative technologies to enhance fleet performance, safety, and sustainability.",
		url: "https://www.redtailtelematics.com/about-us",
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
		title: "About Us | Redtail Telematics",
		description:
			"Get to know Redtail Telematics, your trusted partner in fleet management and telematics solutions. Explore our mission, values, and dedication to driving fleet efficiency, safety, and sustainability through cutting-edge technology.",
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

export default function AboutUsPage() {
	return (
		<main className="flex-1 overflow-x-clip bg-background">
			<AboutUsPageSections />
		</main>
	);
}
