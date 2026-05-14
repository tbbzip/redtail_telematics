import type { SanityImageSource } from "@sanity/image-url";

import {
	type BlogPost,
	getMockLatestBlogPosts,
} from "@/lib/blog-posts";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import {
	ALL_BLOG_POSTS_QUERY,
	LATEST_BLOG_POSTS_QUERY,
} from "@/sanity/lib/queries";

type SanityBlogPost = {
	_id: string;
	authorName?: string | null;
	category?: string | null;
	excerpt?: string | null;
	mainImage?: SanityImageSource | null;
	publishedAt?: string | null;
	readTime?: string | null;
	slug?: string | null;
	title?: string | null;
};

const fallbackImages = [
	"/carousel/fleet-web.jpg",
	"/carousel/insurance-web.jpg",
	"/carousel/resellers-web.jpg",
	"/carousel/iot-web.jpg",
];

function toBlogPost(post: SanityBlogPost, index: number): BlogPost | null {
	if (!post.title) {
		return null;
	}

	const image = post.mainImage
		? urlForImage(post.mainImage).width(1200).height(760).fit("crop").url()
		: fallbackImages[index % fallbackImages.length];

	return {
		authorName: post.authorName || undefined,
		category: post.category || "Blog",
		excerpt:
			post.excerpt ||
			"Read the latest Redtail perspective on telematics, fleet operations, and connected vehicle programs.",
		href: "/resources/blog",
		image,
		imageAlt: post.title,
		publishedAt: post.publishedAt || new Date().toISOString(),
		readTime: post.readTime || "4 min read",
		slug: post.slug || post._id,
		title: post.title,
	};
}

export async function getLatestBlogPosts(limit = 4): Promise<BlogPost[]> {
	try {
		const posts = await client.fetch<SanityBlogPost[]>(LATEST_BLOG_POSTS_QUERY);
		const mappedPosts = posts
			.map((post, index) => toBlogPost(post, index))
			.filter((post): post is BlogPost => Boolean(post))
			.slice(0, limit);

		return mappedPosts.length ? mappedPosts : getMockLatestBlogPosts(limit);
	} catch {
		return getMockLatestBlogPosts(limit);
	}
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
	try {
		const posts = await client.fetch<SanityBlogPost[]>(ALL_BLOG_POSTS_QUERY);

		return posts
			.map((post, index) => toBlogPost(post, index))
			.filter((post): post is BlogPost => Boolean(post));
	} catch {
		return [];
	}
}
