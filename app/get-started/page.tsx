import type { Metadata } from "next";

import { GetStartedFlow } from "@/components/get-started-flow";

export const metadata: Metadata = {
	title: "Get Started | Redtail Telematics",
	description:
		"Tell Redtail Telematics about your industry, fleet size, and contact details so our team can route your request to the right specialist.",
	alternates: {
		canonical: "https://www.redtailtelematics.com/get-started",
	},
	openGraph: {
		title: "Get Started | Redtail Telematics",
		description:
			"Start a Redtail Telematics conversation with a focused contact flow for fleets, insurers, and connected vehicle programs.",
		url: "https://www.redtailtelematics.com/get-started",
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
		title: "Get Started | Redtail Telematics",
		description:
			"Start a Redtail Telematics conversation with a focused contact flow.",
		images: ["https://www.redtailtelematics.com/og-image.webp"],
	},
};

export default function GetStartedPage() {
	return <GetStartedFlow />;
}
