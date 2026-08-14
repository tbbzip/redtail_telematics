import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
	IndustryHeroOnlyPage,
	IndustryPage as IndustryLandingPage,
} from "@/components/industry-page";
import {
	getRouteEntriesByPrefix,
	getRouteEntry,
} from "@/components/nav-links";
import { getIndustryHeroPage, getIndustryPage } from "@/lib/industry-pages";

export function generateStaticParams() {
	return getRouteEntriesByPrefix("/industries/").map((entry) => ({
		slug: entry.href.split("/").at(-1) ?? "",
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const page = getIndustryHeroPage(slug);

	if (page) {
		return {
			title: page.metadata.title,
			description: page.metadata.description,
			alternates: {
				canonical: page.metadata.canonical,
			},
			openGraph: {
				title: page.metadata.openGraphTitle,
				description: page.metadata.openGraphDescription,
				url: page.metadata.canonical,
				locale: "en_US",
				images: [
					{
						url: "https://www.redtailtelematics.com/opengraph-image",
					},
				],
				type: "website",
			},
			twitter: {
				card: "summary_large_image",
				site: "@RedtailTele",
				title: page.metadata.twitterTitle,
				description: page.metadata.twitterDescription,
				images: ["https://www.redtailtelematics.com/opengraph-image"],
			},
		};
	}

	const entry = getRouteEntry(`/industries/${slug}`);

	if (!entry) {
		return {};
	}

	return {
		title: `${entry.label} | Redtail Telematics`,
		description: `Explore Redtail Telematics solutions for ${entry.label.toLowerCase()} fleets and operations.`,
		alternates: {
			canonical: `https://www.redtailtelematics.com${entry.href}`,
		},
	};
}

export default async function IndustryPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const entry = getRouteEntry(`/industries/${slug}`);
	const page = getIndustryPage(slug);
	const heroPage = getIndustryHeroPage(slug);

	if (!entry) {
		notFound();
	}

	if (page) {
		return <IndustryLandingPage page={page} />;
	}

	if (heroPage) {
		return <IndustryHeroOnlyPage page={heroPage} />;
	}

	notFound();
}
