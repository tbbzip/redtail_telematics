import type { MetadataRoute } from "next";

import { getAllBlogPosts } from "@/sanity/lib/blog-posts";
import {
	getAllCaseStudies,
	getAllEvents,
} from "@/sanity/lib/resources";

const siteUrl = "https://www.redtailtelematics.com";

const staticPaths = [
	"/",
	"/about-us",
	"/careers",
	"/careers/life-at-redtail",
	"/contact-us",
	"/cookie-policy",
	"/get-started",
	"/our-technology",
	"/platform-and-apps",
	"/privacy-policy",
	"/resources/blog",
	"/resources/case-studies",
	"/resources/events",
	"/resources/guides",
	"/solutions/devices",
	"/solutions/fleet-management",
	"/solutions/reseller-program",
	"/solutions/usage-based-insurance",
	"/solutions/white-label",
	"/terms-and-conditions",
	"/industries/car-rental",
	"/industries/construction",
	"/industries/education",
	"/industries/emergency-vehicles",
	"/industries/field-services",
	"/industries/food-and-beverage",
	"/industries/government",
	"/industries/passenger-transit",
	"/industries/transportation-and-logistics",
	"/industries/utilities",
] as const;

function validDate(value: string) {
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? undefined : date;
}

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [blogPosts, caseStudies, events] = await Promise.all([
		getAllBlogPosts(),
		getAllCaseStudies(),
		getAllEvents(),
	]);

	const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
		changeFrequency: path === "/" ? "weekly" : "monthly",
		priority: path === "/" ? 1 : 0.7,
		url: `${siteUrl}${path}`,
	}));
	const contentEntries: MetadataRoute.Sitemap = [
		...blogPosts.map((post) => ({
			changeFrequency: "monthly" as const,
			lastModified: validDate(post.publishedAt),
			priority: 0.7,
			url: `${siteUrl}/resources/blog/${post.slug}`,
		})),
		...caseStudies.map((post) => ({
			changeFrequency: "monthly" as const,
			lastModified: validDate(post.publishedAt),
			priority: 0.7,
			url: `${siteUrl}/resources/case-studies/${post.slug}`,
		})),
		...events.map((event) => ({
			changeFrequency: "weekly" as const,
			lastModified: validDate(event.publishedAt),
			priority: 0.6,
			url: `${siteUrl}/resources/events/${event.slug}`,
		})),
	];

	return [...staticEntries, ...contentEntries];
}
