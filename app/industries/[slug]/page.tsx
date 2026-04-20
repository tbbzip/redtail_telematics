import { MarketingPage } from "@/app/_components/marketing-page";
import {
	getRouteEntriesByPrefix,
	getRouteEntry,
	primaryCtaLink,
	secondaryCtaLink,
} from "@/components/nav-links";
import { notFound } from "next/navigation";

export function generateStaticParams() {
	return getRouteEntriesByPrefix("/industries/").map((entry) => ({
		slug: entry.href.split("/").at(-1) ?? "",
	}));
}

export default async function IndustryPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const entry = getRouteEntry(`/industries/${slug}`);

	if (!entry) {
		notFound();
	}

	return (
		<MarketingPage
			description={`Use this page to tailor Redtail's messaging, capabilities, and ROI stories to ${entry.label.toLowerCase()} buyers and operators.`}
			eyebrow={entry.section}
			primaryCta={primaryCtaLink}
			secondaryCta={secondaryCtaLink}
			title={entry.label}
		/>
	);
}
