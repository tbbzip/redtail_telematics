import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResourceDetailPage } from "@/components/resource-detail-page";
import {
	getPostDetailSlugs,
	getResourcePostDetail,
} from "@/sanity/lib/resource-details";

type BlogDetailPageProps = {
	params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
	try {
		const slugs = await getPostDetailSlugs("blogArticle");

		return slugs.map((slug) => ({ slug }));
	} catch (error) {
		console.error("[Sanity] Failed to generate blog detail routes.");
		throw error;
	}
}

export async function generateMetadata({
	params,
}: BlogDetailPageProps): Promise<Metadata> {
	const { slug } = await params;
	const detail = await getResourcePostDetail(slug, "blogArticle");

	if (!detail) {
		notFound();
	}

	const canonical = `https://www.redtailtelematics.com${detail.canonicalPath}`;
	const metadataDescription = detail.metaDescription || detail.description;
	const metadataTitle = detail.metaTitle || detail.title;

	return {
		title: detail.metaTitle || `${detail.title} | Redtail Telematics`,
		description: metadataDescription,
		alternates: {
			canonical,
		},
		openGraph: {
			title: metadataTitle,
			description: metadataDescription,
			url: canonical,
			locale: "en_US",
			images: [
				{
					url: detail.image || "https://www.redtailtelematics.com/opengraph-image",
				},
			],
			type: "article",
			publishedTime: detail.publishedAt,
			authors: detail.authorName ? [detail.authorName] : undefined,
		},
		twitter: {
			card: "summary_large_image",
			site: "@RedtailTele",
			title: metadataTitle,
			description: metadataDescription,
			images: [detail.image || "https://www.redtailtelematics.com/opengraph-image"],
		},
	};
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
	const { slug } = await params;
	const detail = await getResourcePostDetail(slug, "blogArticle");

	if (!detail) {
		notFound();
	}

	return <ResourceDetailPage detail={detail} />;
}
