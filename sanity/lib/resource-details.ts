import type { SanityImageSource } from "@sanity/image-url";
import { cache } from "react";

import {
	type PortableNode,
	type ResourceDetail,
} from "@/lib/resource-detail";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import {
	EVENT_DETAIL_QUERY,
	EVENT_SLUGS_QUERY,
	RESOURCE_POST_DETAIL_QUERY,
	RESOURCE_POST_SLUGS_QUERY,
} from "@/sanity/lib/queries";

type SlugResult = {
	slug?: string | null;
};

type SanityPostDetail = {
	_id: string;
	authorImage?: SanityImageSource | null;
	authorName?: string | null;
	category?: string | null;
	content?: PortableNode[] | null;
	description?: string | null;
	image?: SanityImageSource | null;
	publishedAt?: string | null;
	slug?: string | null;
	title?: string | null;
};

type SanityEventDetail = {
	_id: string;
	category?: string | null;
	content?: PortableNode[] | null;
	descriptionText?: string | null;
	endDate?: string | null;
	image?: SanityImageSource | null;
	location?: string | null;
	organizer?: string | null;
	publishedAt?: string | null;
	registrationUrl?: string | null;
	slug?: string | null;
	startDate?: string | null;
	title?: string | null;
};

type PostResourceType = "blogArticle" | "caseStudy";

const postResourceConfig = {
	blogArticle: {
		listingHref: "/resources/blog",
		listingLabel: "Blog",
		resourceLabel: "Blog",
	},
	caseStudy: {
		listingHref: "/resources/case-studies",
		listingLabel: "Case Studies",
		resourceLabel: "Case Study",
	},
} satisfies Record<
	PostResourceType,
	Pick<ResourceDetail, "listingHref" | "listingLabel" | "resourceLabel">
>;

function formatCategory(value?: string | null) {
	if (!value) {
		return "Event";
	}

	return value
		.split(/[-_\s]+/)
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

function getImageUrl(source?: SanityImageSource | null) {
	if (!source) {
		return undefined;
	}

	return urlForImage(source).width(1400).height(840).fit("crop").url();
}

function getAuthorImageUrl(source?: SanityImageSource | null) {
	if (!source) {
		return undefined;
	}

	return urlForImage(source).width(160).height(160).fit("crop").url();
}

function getTextFromNode(node: PortableNode) {
	if (node._type !== "block") {
		return "";
	}

	return (node.children || [])
		.map((child) => child.text || "")
		.join(" ")
		.trim();
}

function calculateReadTime(content: PortableNode[]) {
	const words = content
		.map(getTextFromNode)
		.join(" ")
		.split(/\s+/)
		.filter(Boolean).length;

	return `${Math.max(1, Math.ceil(words / 210))} min read`;
}

function toPostDetail(
	post: SanityPostDetail | null,
	postType: PostResourceType,
): ResourceDetail | null {
	if (!post?.title || !post.slug) {
		return null;
	}

	const config = postResourceConfig[postType];
	const content = post.content || [];

	return {
		...config,
		authorImage: getAuthorImageUrl(post.authorImage),
		authorName: post.authorName || "Redtail Telematics",
		canonicalPath: `${config.listingHref}/${post.slug}`,
		category: post.category || config.resourceLabel,
		content,
		description:
			post.description ||
			"Read Redtail insight on telematics, connected vehicles, and operational intelligence.",
		image: getImageUrl(post.image),
		imageAlt: post.title,
		publishedAt: post.publishedAt || new Date().toISOString(),
		readTime: calculateReadTime(content),
		slug: post.slug,
		title: post.title,
	};
}

function toEventDetail(event: SanityEventDetail | null): ResourceDetail | null {
	if (!event?.title || !event.slug) {
		return null;
	}

	const content = event.content || [];

	return {
		canonicalPath: `/resources/events/${event.slug}`,
		category: formatCategory(event.category),
		content,
		description:
			event.descriptionText ||
			"Join Redtail for telematics conversations, product insight, and practical guidance.",
		eventDetails: {
			endDate: event.endDate || undefined,
			location: event.location || undefined,
			organizer: event.organizer || undefined,
			registrationUrl: event.registrationUrl || undefined,
			startDate: event.startDate || event.publishedAt || undefined,
		},
		image: getImageUrl(event.image),
		imageAlt: event.title,
		listingHref: "/resources/events",
		listingLabel: "Events",
		publishedAt: event.publishedAt || new Date().toISOString(),
		resourceLabel: "Event",
		slug: event.slug,
		title: event.title,
	};
}

export async function getPostDetailSlugs(postType: PostResourceType) {
	const slugs = await client.fetch<SlugResult[]>(RESOURCE_POST_SLUGS_QUERY, {
		postType,
	});

	return slugs
		.map((item) => item.slug)
		.filter((slug): slug is string => Boolean(slug));
}

export const getResourcePostDetail = cache(
	async (slug: string, postType: PostResourceType) => {
		const post = await client.fetch<SanityPostDetail | null>(
			RESOURCE_POST_DETAIL_QUERY,
			{ postType, slug },
		);

		return toPostDetail(post, postType);
	},
);

export async function getEventDetailSlugs() {
	const slugs = await client.fetch<SlugResult[]>(EVENT_SLUGS_QUERY);

	return slugs
		.map((item) => item.slug)
		.filter((slug): slug is string => Boolean(slug));
}

export const getEventDetail = cache(async (slug: string) => {
	const event = await client.fetch<SanityEventDetail | null>(EVENT_DETAIL_QUERY, {
		slug,
	});

	return toEventDetail(event);
});
