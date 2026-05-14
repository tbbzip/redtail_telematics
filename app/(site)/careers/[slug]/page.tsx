import type { Metadata } from "next";
import { MarketingPage } from "@/app/_components/marketing-page";
import { LifeAtRedtailPageSections } from "@/components/life-at-redtail-page";
import {
	getRouteEntriesByPrefix,
	getRouteEntry,
	primaryCtaLink,
	secondaryCtaLink,
} from "@/components/nav-links";
import { notFound } from "next/navigation";

type CareersDetailPageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return getRouteEntriesByPrefix("/careers/").map((entry) => ({
		slug: entry.href.split("/").at(-1) ?? "",
	}));
}

export async function generateMetadata({
	params,
}: CareersDetailPageProps): Promise<Metadata> {
	const { slug } = await params;
	const entry = getRouteEntry(`/careers/${slug}`);

	if (!entry) {
		notFound();
	}

	if (slug === "life-at-redtail") {
		return {
			title: "Life at Redtail | Redtail Telematics",
			description:
				"Learn about life at Redtail Telematics, from engineering culture and wellbeing to professional development and growth opportunities.",
			alternates: {
				canonical: "https://www.redtailtelematics.com/careers/life-at-redtail",
			},
			openGraph: {
				title: "Life at Redtail | Redtail Telematics",
				description:
					"Explore Redtail's engineering culture, professional development, wellbeing, and team life.",
				url: "https://www.redtailtelematics.com/careers/life-at-redtail",
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
				title: "Life at Redtail | Redtail Telematics",
				description:
					"Explore Redtail's engineering culture, professional development, wellbeing, and team life.",
				images: ["https://www.redtailtelematics.com/og-image.webp"],
			},
		};
	}

	return {
		title: `${entry.label} | Redtail Telematics`,
		description: `Learn more about ${entry.label.toLowerCase()} at Redtail Telematics.`,
	};
}

export default async function CareersDetailPage({
	params,
}: CareersDetailPageProps) {
	const { slug } = await params;
	const entry = getRouteEntry(`/careers/${slug}`);

	if (!entry) {
		notFound();
	}

	if (slug === "life-at-redtail") {
		return (
			<main className="flex-1 overflow-x-clip bg-background">
				<LifeAtRedtailPageSections />
			</main>
		);
	}

	return (
		<MarketingPage
			description={`Use this page to expand on ${entry.label.toLowerCase()} and support recruiting content with voice, culture, and open-role context.`}
			eyebrow={entry.section}
			primaryCta={primaryCtaLink}
			secondaryCta={secondaryCtaLink}
			title={entry.label}
		/>
	);
}
