import { BookIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const postTypeLabels: Record<string, string> = {
	blogArticle: "Blog Article",
	caseStudy: "Case Study",
};

function formatPostType(value?: string) {
	if (!value) {
		return "Post";
	}

	return postTypeLabels[value] || value;
}

function formatPreviewDate(value?: string) {
	if (!value) {
		return "No publish date";
	}

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return "Invalid date";
	}

	return new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(date);
}

function getPublishStatus(id?: string, publishedAt?: string) {
	if (id?.startsWith("drafts.")) {
		return "Draft";
	}

	if (!publishedAt) {
		return "Missing date";
	}

	return new Date(publishedAt).getTime() > Date.now() ? "Scheduled" : "Published";
}

const posts = defineType({
	name: "post",
	icon: BookIcon,
	type: "document",
	title: "Posts",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description: "Catchy and descriptive titles work best.",
			validation: (Rule) =>
				Rule.required()
					.min(10)
					.max(80)
					.warning("Title should be between 10 and 80 characters"),
		}),
		defineField({
			name: "postType",
			type: "string",
			title: "Post Type",
			description: "Select the type of post.",
			options: {
				list: [
					{ title: "Blog Article", value: "blogArticle" },
					{ title: "Case Study", value: "caseStudy" },
				],
				layout: "radio",
			},
			validation: (Rule) =>
				Rule.required().warning("A post type must be selected"),
		}),
		defineField({
			name: "category",
			type: "reference",
			title: "Category",
			description: "Select a category for this post.",
			to: [{ type: "category" }],
			validation: (Rule) =>
				Rule.required().warning("A category must be selected"),
		}),
		defineField({
			name: "blogImage",
			type: "image",
			title: "Blog Image",
			description:
				"This image will be the main visual representation for the blog post and will be used in post lists and previews.",
			options: { hotspot: true },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "author",
			type: "reference",
			title: "Author",
			to: [{ type: "authors" }],
			description: "Select the author of this post.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "publishedAt",
			type: "datetime",
			title: "Published at",
			description:
				"Set the publish date for this post. If left empty, the post will be marked as unpublished.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "content",
			type: "array",
			title: "Content",
			of: [
				defineArrayMember({ type: "block" }),
				defineArrayMember({ type: "image" }),
			],
			description:
				"Main content of the blog post. Add text, images, or other media.",
			validation: (Rule) =>
				Rule.required().min(1).warning("Content should not be empty"),
		}),
		defineField({
			name: "seo",
			type: "object",
			title: "SEO & Metadata",
			description: "Fields related to SEO and social sharing data.",
			fields: [
				defineField({
					name: "metaTitle",
					type: "string",
					title: "Meta Title",
					description: "Optimized title for search engines (70 characters or less).",
					validation: (Rule) =>
						Rule.max(70).warning("Meta title should not exceed 70 characters"),
				}),
				defineField({
					name: "metaDescription",
					type: "text",
					title: "Meta Description",
					description:
						"A brief description of the post for search engines (150-160 characters).",
					validation: (Rule) =>
						Rule.max(160).warning(
							"Meta description should not exceed 160 characters",
						),
				}),
				defineField({
					name: "keywords",
					type: "array",
					title: "Keywords",
					of: [defineArrayMember({ type: "string" })],
					description:
						"Keywords relevant to the content of the post for SEO purposes.",
					options: {
						layout: "tags",
					},
				}),
				defineField({
					name: "slug",
					type: "slug",
					title: "Slug",
					description:
						"URL-friendly version of the title. Lowercase and hyphen-separated.",
					options: { source: "title", maxLength: 96 },
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "excerpt",
					type: "string",
					title: "Excerpt",
					description:
						"Short description of the post. Appears in summaries, search results, and social shares.",
					validation: (Rule) =>
						Rule.max(160).warning("Excerpts should not exceed 160 characters"),
				}),
				defineField({
					name: "metaImage",
					type: "image",
					title: "Meta Image (for social sharing)",
					description:
						"An image to represent this post on social media and search engines. If left empty, the blog image will be used.",
					options: { hotspot: true },
				}),
			],
		}),
	],
	orderings: [
		{
			title: "Publish date, newest first",
			name: "publishedAtDesc",
			by: [{ field: "publishedAt", direction: "desc" }],
		},
		{
			title: "Publish date, oldest first",
			name: "publishedAtAsc",
			by: [{ field: "publishedAt", direction: "asc" }],
		},
		{
			title: "Title A-Z",
			name: "titleAsc",
			by: [{ field: "title", direction: "asc" }],
		},
	],
	preview: {
		select: {
			id: "_id",
			author: "author.name",
			blogImage: "blogImage",
			category: "category.name",
			metaImage: "seo.metaImage",
			publishedAt: "publishedAt",
			postType: "postType",
			title: "title",
		},
		prepare(selection) {
			const {
				id,
				author,
				blogImage,
				category,
				metaImage,
				publishedAt,
				postType,
				title,
			} = selection;
			const subtitle = [
				formatPostType(postType),
				category || "Uncategorized",
				author || "No author",
				formatPreviewDate(publishedAt),
				getPublishStatus(id, publishedAt),
			].join(" • ");

			return {
				media: metaImage || blogImage,
				subtitle,
				title: title || "Untitled post",
			};
		},
	},
});

export default posts;
