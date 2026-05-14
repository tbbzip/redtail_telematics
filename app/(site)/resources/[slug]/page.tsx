import type { Metadata } from "next";
import { BlogIndexPageSections } from "@/components/blog-index-page";
import { ResourceIndexPageSections } from "@/components/resource-index-page";
import {
	getRouteEntriesByPrefix,
	getRouteEntry,
} from "@/components/nav-links";
import { type ResourceIndexConfig } from "@/lib/resource-index";
import { getAllBlogPosts } from "@/sanity/lib/blog-posts";
import {
	getAllCaseStudies,
	getAllEvents,
	getAllGuides,
} from "@/sanity/lib/resources";
import { notFound } from "next/navigation";

type ResourcePageProps = {
	params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export function generateStaticParams() {
	return getRouteEntriesByPrefix("/resources/").map((entry) => ({
		slug: entry.href.split("/").at(-1) ?? "",
	}));
}

const resourceMetadata = {
	blog: {
		title: "Blog | Redtail Telematics",
		description:
			"Read Redtail Telematics insights on fleet operations, telematics data, insurance programs, connected vehicles, and operational intelligence.",
	},
	"case-studies": {
		title: "Case Studies | Redtail Telematics",
		description:
			"Explore Redtail Telematics case studies and customer stories across fleet management, insurance telematics, devices, and connected operations.",
	},
	guides: {
		title: "Guides | Redtail Telematics",
		description:
			"Download Redtail Telematics guides for fleet visibility, device deployment, telematics planning, and operational intelligence.",
	},
	events: {
		title: "Events | Redtail Telematics",
		description:
			"Find Redtail Telematics events, webinars, conferences, and sessions for fleet, insurance, and connected vehicle teams.",
	},
} satisfies Record<string, Pick<Metadata, "description" | "title">>;

const resourceConfigs = {
	"case-studies": {
		description:
			"See how Redtail customers and partners use telematics data, devices, and apps to improve operations.",
		emptyDescription:
			"Adjust the category or search term to find another customer story.",
		emptyTitle: "No case studies found",
		eyebrow: "Resources",
		paginationLabel: "Case studies",
		searchPlaceholder: "Search by customer story, category, or topic",
		title: "Case Studies",
	},
	guides: {
		description:
			"Download practical resources for planning, deploying, and improving telematics programs.",
		emptyDescription: "Adjust the search term to find another guide.",
		emptyTitle: "No guides found",
		eyebrow: "Resources",
		paginationLabel: "Guides",
		searchPlaceholder: "Search by guide title, topic, or description",
		title: "Guides",
	},
	events: {
		description:
			"Browse Redtail webinars, conferences, and events for fleet, insurance, and connected vehicle teams.",
		emptyDescription:
			"Adjust the event type or search term to find another event.",
		emptyTitle: "No events found",
		eyebrow: "Resources",
		paginationLabel: "Events",
		searchPlaceholder: "Search by event, type, location, or topic",
		title: "Events",
	},
} satisfies Record<string, ResourceIndexConfig>;

export async function generateMetadata({
	params,
}: ResourcePageProps): Promise<Metadata> {
	const { slug } = await params;
	const entry = getRouteEntry(`/resources/${slug}`);

	if (!entry) {
		notFound();
	}

	const metadata = resourceMetadata[slug as keyof typeof resourceMetadata];

	if (metadata) {
		const canonical = `https://www.redtailtelematics.com/resources/${slug}`;

		return {
			...metadata,
			alternates: {
				canonical,
			},
			openGraph: {
				title: metadata.title as string,
				description: metadata.description as string,
				url: canonical,
				locale: "en_US",
				images: [
					{
						url: "https://www.redtailtelematics.com/og-image.webp",
					},
				],
				type: "website",
			},
			twitter: {
				card: "summary_large_image",
				site: "@RedtailTele",
				title: metadata.title as string,
				description: metadata.description as string,
				images: ["https://www.redtailtelematics.com/og-image.webp"],
			},
		};
	}

	return {
		title: `${entry.label} | Redtail Telematics`,
		description: `Explore Redtail Telematics ${entry.label.toLowerCase()} resources.`,
	};
}

export default async function ResourcePage({ params }: ResourcePageProps) {
	const { slug } = await params;
	const entry = getRouteEntry(`/resources/${slug}`);

	if (!entry) {
		notFound();
	}

	if (slug === "blog") {
		const posts = await getAllBlogPosts();

		return (
			<main className="flex-1 overflow-x-clip bg-background">
				<BlogIndexPageSections posts={posts} />
			</main>
		);
	}

	if (slug === "case-studies") {
		const items = await getAllCaseStudies();

		return (
			<main className="flex-1 overflow-x-clip bg-background">
				<ResourceIndexPageSections
					config={resourceConfigs["case-studies"]}
					items={items}
				/>
			</main>
		);
	}

	if (slug === "guides") {
		const items = await getAllGuides();

		return (
			<main className="flex-1 overflow-x-clip bg-background">
				<ResourceIndexPageSections config={resourceConfigs.guides} items={items} />
			</main>
		);
	}

	if (slug === "events") {
		const items = await getAllEvents();

		return (
			<main className="flex-1 overflow-x-clip bg-background">
				<ResourceIndexPageSections config={resourceConfigs.events} items={items} />
			</main>
		);
	}

	notFound();
}
