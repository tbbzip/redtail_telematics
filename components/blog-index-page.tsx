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
