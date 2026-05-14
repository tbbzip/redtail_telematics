import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResourceDetailPage } from "@/components/resource-detail-page";
import {
	getEventDetail,
	getEventDetailSlugs,
} from "@/sanity/lib/resource-details";

type EventDetailPageProps = {
	params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
	try {
		const slugs = await getEventDetailSlugs();

		return slugs.map((slug) => ({ slug }));
	} catch {
		return [];
	}
}

export async function generateMetadata({
	params,
}: EventDetailPageProps): Promise<Metadata> {
	const { slug } = await params;
	const detail = await getEventDetail(slug);

	if (!detail) {
		notFound();
	}

	const canonical = `https://www.redtailtelematics.com${detail.canonicalPath}`;

	return {
		title: `${detail.title} | Redtail Telematics`,
		description: detail.description,
		alternates: {
			canonical,
		},
		openGraph: {
			title: detail.title,
			description: detail.description,
			url: canonical,
			locale: "en_US",
			images: [
				{
					url: detail.image || "https://www.redtailtelematics.com/og-image.webp",
				},
			],
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			site: "@RedtailTele",
			title: detail.title,
			description: detail.description,
			images: [detail.image || "https://www.redtailtelematics.com/og-image.webp"],
		},
	};
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
	const { slug } = await params;
	const detail = await getEventDetail(slug);

	if (!detail) {
		notFound();
	}

	return <ResourceDetailPage detail={detail} />;
}
