import type { Metadata } from "next";

import { PlatformAndAppsPageSections } from "@/components/platform-and-apps-page";
import {
	defaultSocialImage,
	defaultSocialImageAlt,
} from "@/lib/site-metadata";

export const metadata: Metadata = {
	title: "Fleet Telematics Platform & Mobile Apps | Redtail",
	description:
		"Explore Redtail's fleet telematics platform for fleet status, journey replay, driving behaviour, alerts, device health, maintenance, reports, circuit session analysis, and focused mobile apps.",
	keywords: [
		"Fleet Telematics Platform",
		"Fleet Tracking and Status",
		"Journey Replay",
		"Driving Behaviour Analysis",
		"Fleet Alerts and Geofences",
		"Fleet Maintenance Planning",
		"Telematics Device Diagnostics",
		"Fleet Report Templates",
		"Circuit Lap Replay",
		"Fleet Management App",
		"Telematics Installer App",
		"Redtail Telematics",
	],
	alternates: {
		canonical: "https://www.redtailtelematics.com/platform-and-apps",
	},
	openGraph: {
		title: "Fleet Telematics Platform & Mobile Apps | Redtail",
		description:
			"See fleet status, journey replay, driving behaviour, alerts, device health, maintenance, reports, circuit session analysis, and Redtail's focused mobile apps.",
		url: "https://www.redtailtelematics.com/platform-and-apps",
		locale: "en_US",
		images: [defaultSocialImage],
		siteName: "Redtail Telematics",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		site: "@RedtailTele",
		title: "Fleet Telematics Platform & Mobile Apps | Redtail",
		description:
			"See fleet status, journey replay, driving behaviour, alerts, device health, maintenance, reports, circuit session analysis, and Redtail's focused mobile apps.",
		images: [
			{
				alt: defaultSocialImageAlt,
				url: defaultSocialImage.url,
			},
		],
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
