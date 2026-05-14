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
	} catch {
		return [];
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
			type: "article",
			publishedTime: detail.publishedAt,
			authors: detail.authorName ? [detail.authorName] : undefined,
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

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
	const { slug } = await params;
	const detail = await getResourcePostDetail(slug, "blogArticle");

	if (!detail) {
		notFound();
	}

	return <ResourceDetailPage detail={detail} />;
}
