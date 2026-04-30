import {
	BookIcon,
	CalendarIcon,
	CaseIcon,
	ClockIcon,
	DocumentTextIcon,
	ImageIcon,
	TagIcon,
	UserIcon,
	WarningOutlineIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

import { apiVersion } from "./env";

const newestFirst = [{ field: "publishedAt", direction: "desc" }] as const;
const recentlyUpdated = [{ field: "_updatedAt", direction: "desc" }] as const;

export const structure: StructureResolver = (S) =>
	S.list()
		.title("Redtail Content")
		.items([
			S.listItem()
				.title("Posts")
				.icon(BookIcon)
				.child(
					S.list()
						.title("Posts")
						.items([
							S.listItem()
								.title("All posts")
								.icon(BookIcon)
								.child(
									S.documentList()
										.id("all-posts")
										.title("All posts")
										.schemaType("post")
										.apiVersion(apiVersion)
										.filter('_type == "post"')
										.defaultOrdering([...newestFirst]),
								),
							S.listItem()
								.title("Blog articles")
								.icon(DocumentTextIcon)
								.child(
									S.documentList()
										.id("blog-articles")
										.title("Blog articles")
										.schemaType("post")
										.apiVersion(apiVersion)
										.filter('_type == "post" && postType == "blogArticle"')
										.defaultOrdering([...newestFirst]),
								),
							S.listItem()
								.title("Case studies")
								.icon(CaseIcon)
								.child(
									S.documentList()
										.id("case-studies")
										.title("Case studies")
										.schemaType("post")
										.apiVersion(apiVersion)
										.filter('_type == "post" && postType == "caseStudy"')
										.defaultOrdering([...newestFirst]),
								),
							S.divider(),
							S.listItem()
								.title("Drafts")
								.icon(ClockIcon)
								.child(
									S.documentList()
										.id("post-drafts")
										.title("Draft posts")
										.schemaType("post")
										.apiVersion(apiVersion)
										.filter('_type == "post" && _id in path("drafts.**")')
										.defaultOrdering([...recentlyUpdated]),
								),
							S.listItem()
								.title("Scheduled")
								.icon(CalendarIcon)
								.child(
									S.documentList()
										.id("scheduled-posts")
										.title("Scheduled posts")
										.schemaType("post")
										.apiVersion(apiVersion)
										.filter(
											'_type == "post" && defined(publishedAt) && dateTime(publishedAt) > dateTime(now())',
										)
										.defaultOrdering([{ field: "publishedAt", direction: "asc" }]),
								),
							S.listItem()
								.title("Missing SEO")
								.icon(WarningOutlineIcon)
								.child(
									S.documentList()
										.id("posts-missing-seo")
										.title("Posts missing SEO")
										.schemaType("post")
										.apiVersion(apiVersion)
										.filter(
											'_type == "post" && (!defined(seo.slug.current) || !defined(seo.metaTitle) || !defined(seo.metaDescription) || !defined(seo.excerpt))',
										)
										.defaultOrdering([...recentlyUpdated]),
								),
							S.listItem()
								.title("Missing image")
								.icon(ImageIcon)
								.child(
									S.documentList()
										.id("posts-missing-image")
										.title("Posts missing image")
										.schemaType("post")
										.apiVersion(apiVersion)
										.filter('_type == "post" && !defined(blogImage.asset._ref)')
										.defaultOrdering([...recentlyUpdated]),
								),
						]),
				),
			S.divider(),
			S.documentTypeListItem("event").title("Events").icon(CalendarIcon),
			S.documentTypeListItem("guide").title("Guides").icon(DocumentTextIcon),
			S.documentTypeListItem("authors").title("Authors").icon(UserIcon),
			S.documentTypeListItem("category").title("Categories").icon(TagIcon),
		]);
