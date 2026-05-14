import type { Metadata } from "next";

import { OurTechnologyPageSections } from "@/components/our-technology-page";

export const metadata: Metadata = {
	title: "Our Technology",
	description:
		"Redtail Telematics leverages over 100 experts in IoT and communications technology across the UK, US, and Malaysia to deliver unparalleled telematics solutions.",
	keywords: [
		"Redtail Telematics",
		"Telematics Technology",
		"IoT Experts",
		"Communications Technology",
		"Fleet Telematics",
		"Data Analytics",
		"Device Connectivity",
		"Data Warehouse",
		"Telematics Apps",
	],
	alternates: {
		canonical: "https://www.redtailtelematics.com/our-technology",
	},
	openGraph: {
		title: "Our Technology | Redtail Telematics",
		description:
			"Discover how Redtail Telematics utilizes cutting-edge technology and expert teams to provide superior telematics solutions for your fleet management needs.",
		url: "https://www.redtailtelematics.com/our-technology",
		type: "website",
		images: [
			{
				url: "https://www.redtailtelematics.com/og-image.webp",
				alt: "Our Technology | Redtail Telematics",
				width: 1200,
				height: 630,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@RedtailTele",
		title: "Our Technology | Redtail Telematics",
		description:
			"Explore the advanced technology and expert teams behind Redtail Telematics' innovative telematics solutions.",
		images: ["https://www.redtailtelematics.com/og-image.webp"],
	},
};

export default function OurTechnologyPage() {
	return (
		<main className="flex-1 overflow-x-clip bg-background">
			<OurTechnologyPageSections />
		</main>
	);
}
