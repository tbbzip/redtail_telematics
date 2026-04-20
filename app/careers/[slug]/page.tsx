import { MarketingPage } from "@/app/_components/marketing-page";
import {
	getRouteEntriesByPrefix,
	getRouteEntry,
	primaryCtaLink,
	secondaryCtaLink,
} from "@/components/nav-links";
import { notFound } from "next/navigation";

export function generateStaticParams() {
	return getRouteEntriesByPrefix("/careers/").map((entry) => ({
		slug: entry.href.split("/").at(-1) ?? "",
	}));
}

export default async function CareersDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const entry = getRouteEntry(`/careers/${slug}`);

	if (!entry) {
		notFound();
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
