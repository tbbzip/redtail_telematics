import { MarketingPage } from "@/app/_components/marketing-page";
import {
	getRouteEntriesByPrefix,
	getRouteEntry,
	primaryCtaLink,
	secondaryCtaLink,
} from "@/components/nav-links";
import { notFound } from "next/navigation";

export function generateStaticParams() {
	return getRouteEntriesByPrefix("/resources/").map((entry) => ({
		slug: entry.href.split("/").at(-1) ?? "",
	}));
}

export default async function ResourcePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const entry = getRouteEntry(`/resources/${slug}`);

	if (!entry) {
		notFound();
	}

	return (
		<MarketingPage
			description={`Use this page to publish ${entry.label.toLowerCase()} content and connect it back to the product narrative.`}
			eyebrow={entry.section}
			primaryCta={primaryCtaLink}
			secondaryCta={secondaryCtaLink}
			title={entry.label}
		/>
	);
}
