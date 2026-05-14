import type { Metadata } from "next";

import { PlatformAndAppsPageSections } from "@/components/platform-and-apps-page";

export const metadata: Metadata = {
	title: "Platform and Apps",
	description:
		"Discover Redtail Telematics' innovative platform and applications designed to drive vehicle intelligence. Tailored to your data needs, our solutions offer real-time tracking, geofencing, asset management, and comprehensive reporting to enhance fleet efficiency and security.",
	keywords: [
		"Vehicle Intelligence Platform",
		"Telematics Applications",
		"Real-Time Vehicle Tracking",
		"Geofencing Solutions",
		"Asset Management",
		"Fleet Efficiency",
		"Telematics Reporting",
		"Redtail Telematics",
		"Satellite View Tracking",
		"Smart Map Overlays",
		"Custom Reporting",
		"Trip History Analysis",
		"Driver Behavior Monitoring",
		"Emergency Vehicle Tracking",
		"Installer App",
		"Fleet Management App",
		"ISO 9001 Certified",
		"ISO 27001 Certified",
		"Fleet Security",
		"Telematics Integration",
		"Fleet Analytics",
	],
	alternates: {
		canonical: "https://www.redtailtelematics.com/platform-and-apps",
	},
	openGraph: {
		title: "Platform and Apps | Redtail Telematics",
		description:
			"Explore Redtail Telematics' cutting-edge platform and applications tailored to your data needs. Benefit from satellite view tracking, smart map overlays, geofencing, real-time vehicle tracking, asset management, and custom reporting to optimize your fleet operations.",
		url: "https://www.redtailtelematics.com/platform-and-apps",
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
		title: "Platform and Apps | Redtail Telematics",
		description:
			"Unlock vehicle intelligence with Redtail Telematics' innovative platform and apps. From real-time tracking and geofencing to asset management and custom reporting, our solutions are designed to meet your fleet's unique data needs.",
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

export default function PlatformAndAppsPage() {
	return (
		<main className="flex-1 overflow-x-clip bg-background">
			<PlatformAndAppsPageSections />
		</main>
	);
}
