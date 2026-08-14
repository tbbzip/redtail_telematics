import { ResourceIndexPageSections } from "@/components/resource-index-page";
import { type BlogPost } from "@/lib/blog-posts";

export function BlogIndexPageSections({ posts }: { posts: BlogPost[] }) {
	return (
		<ResourceIndexPageSections
			config={{
				description:
					"Browse Redtail thinking across fleet performance, risk, devices, data, and operational intelligence.",
				emptyDescription:
					"Adjust the category or search term to find another Redtail resource.",
				emptyTitle: "No articles found",
				eyebrow: "Resources",
				paginationLabel: "Blog",
				searchPlaceholder: "Search by title, category, author, or topic",
				sourceEmptyDescription:
					"New Redtail articles will appear here when they are published.",
				sourceEmptyTitle: "No articles are currently published",
				title: "Blog",
			}}
			items={posts.map((post) => ({
				...post,
				actionLabel: "Read article",
				href: `/resources/blog/${post.slug}`,
				secondaryMeta: post.authorName || post.readTime,
				secondaryMetaIcon: post.authorName ? "author" : "file",
			}))}
		/>
	);
}
