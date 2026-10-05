import type { SanityImageSource } from "@sanity/image-url";

import { type ResourceIndexItem } from "@/lib/resource-index";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import {
	ALL_CASE_STUDIES_QUERY,
	ALL_EVENTS_QUERY,
	ALL_GUIDES_QUERY,
} from "@/sanity/lib/queries";

type SanityCaseStudy = {
	_id: string;
	authorName?: string | null;
	category?: string | null;
	excerpt?: string | null;
	mainImage?: SanityImageSource | null;
	publishedAt?: string | null;
	slug?: string | null;
	title?: string | null;
};

type SanityGuide = {
	_id: string;
	description?: string | null;
	mainImage?: SanityImageSource | null;
	pdfUrl?: string | null;
	publishedAt?: string | null;
	slug?: string | null;
	title?: string | null;
};

type SanityEvent = {
	_id: string;
	eventType?: string | null;
	excerpt?: string | null;
	location?: string | null;
	mainImage?: SanityImageSource | null;
	organizer?: string | null;
	publishedAt?: string | null;
	registrationUrl?: string | null;
	slug?: string | null;
	title?: string | null;
};

function getImageUrl(source: SanityImageSource | null | undefined) {
	if (!source) {
		return undefined;
	}

	return urlForImage(source).width(1200).fit("max").url();
}

function formatEventType(value?: string | null) {
	if (!value) {
		return "Event";
	}

	return value
		.split(/[-_\s]+/)
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

function toCaseStudyItem(item: SanityCaseStudy): ResourceIndexItem | null {
	if (!item.title || !item.slug || !item.publishedAt) {
		return null;
	}

	return {
		category: item.category || "Case Study",
		resourceType: "Case Study",
		excerpt:
			item.excerpt ||
			"See how Redtail telematics helps organizations improve visibility, reliability, and operational confidence.",
		actionLabel: "Read story",
		href: `/resources/case-studies/${item.slug}`,
		image: getImageUrl(item.mainImage),
		imageAlt: item.title,
		publishedAt: item.publishedAt,
		secondaryMeta: item.authorName || "Customer story",
		secondaryMetaIcon: item.authorName ? "author" : "story",
		slug: item.slug,
		title: item.title,
	};
}

function toGuideItem(item: SanityGuide): ResourceIndexItem | null {
	if (!item.title || !item.pdfUrl || !item.publishedAt) {
		return null;
	}

	return {
		actionLabel: "Download PDF",
		category: "Guide",
		resourceType: "Guide",
		excerpt:
			item.description ||
			"Download a practical Redtail guide for telematics planning, deployment, and operational improvement.",
		href: item.pdfUrl,
		image: getImageUrl(item.mainImage),
		imageAlt: item.title,
		imageFit: "contain",
		publishedAt: item.publishedAt,
		secondaryMeta: "PDF guide",
		secondaryMetaIcon: "file",
		slug: item.slug || item._id,
		title: item.title,
	};
}

function toEventItem(item: SanityEvent): ResourceIndexItem | null {
	if (!item.title || !item.slug || !item.publishedAt) {
		return null;
	}

	return {
		category: formatEventType(item.eventType),
		resourceType: "Event",
		excerpt:
			item.excerpt ||
			"Join Redtail for telematics conversations, product insight, and practical guidance for connected fleet programs.",
		actionLabel: "View event",
		href: `/resources/events/${item.slug}`,
		image: getImageUrl(item.mainImage),
		imageAlt: item.title,
		publishedAt: item.publishedAt,
		secondaryMeta: item.location || item.organizer || "Redtail event",
		secondaryMetaIcon: item.location ? "location" : "author",
		slug: item.slug,
		title: item.title,
	};
}

function sortEvents(items: ResourceIndexItem[]) {
	const now = Date.now();

	return [...items].sort((a, b) => {
		const aTime = new Date(a.publishedAt).getTime();
		const bTime = new Date(b.publishedAt).getTime();
		const aUpcoming = aTime >= now;
		const bUpcoming = bTime >= now;

		if (aUpcoming !== bUpcoming) {
			return aUpcoming ? -1 : 1;
		}

		return aUpcoming ? aTime - bTime : bTime - aTime;
	});
}

export async function getAllCaseStudies(): Promise<ResourceIndexItem[]> {
	try {
		const items = await client.fetch<SanityCaseStudy[]>(ALL_CASE_STUDIES_QUERY);

		return items
			.map(toCaseStudyItem)
			.filter((item): item is ResourceIndexItem => Boolean(item));
	} catch (error) {
		console.error("[Sanity] Failed to fetch the case-study index.");
		throw error;
	}
}

export async function getAllGuides(): Promise<ResourceIndexItem[]> {
	try {
		const items = await client.fetch<SanityGuide[]>(ALL_GUIDES_QUERY);

		return items
			.map(toGuideItem)
			.filter((item): item is ResourceIndexItem => Boolean(item));
	} catch (error) {
		console.error("[Sanity] Failed to fetch the guide index.");
		throw error;
	}
}

export async function getAllEvents(): Promise<ResourceIndexItem[]> {
	try {
		const items = await client.fetch<SanityEvent[]>(ALL_EVENTS_QUERY);
		const mappedItems = items
			.map(toEventItem)
			.filter((item): item is ResourceIndexItem => Boolean(item));

		return sortEvents(mappedItems);
	} catch (error) {
		console.error("[Sanity] Failed to fetch the event index.");
		throw error;
	}
}
