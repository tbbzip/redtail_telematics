import { MarketingPage } from "@/app/_components/marketing-page";
import {
	getRouteEntriesByPrefix,
	getRouteEntry,
	primaryCtaLink,
	secondaryCtaLink,
} from "@/components/nav-links";
import { notFound } from "next/navigation";

export function generateStaticParams() {
	return getRouteEntriesByPrefix("/solutions/").map((entry) => ({
		slug: entry.href.split("/").at(-1) ?? "",
	}));
}

export default async function SolutionPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const entry = getRouteEntry(`/solutions/${slug}`);

	if (!entry) {
		notFound();
	}

	return (
		<MarketingPage
			description={`Use this page to build out the ${entry.label} story with sector-specific benefits, platform workflows, and proof points.`}
			eyebrow={entry.section}
			primaryCta={primaryCtaLink}
			secondaryCta={secondaryCtaLink}
			title={entry.label}
		/>
	);
}
