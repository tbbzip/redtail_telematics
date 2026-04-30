import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const guides = defineType({
	name: "guide",
	type: "document",
	title: "Guides",
	icon: DocumentTextIcon,
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			validation: (Rule) => Rule.required().min(5).max(80),
		}),
		defineField({
			name: "description",
			type: "text",
			title: "Description",
			validation: (Rule) => Rule.max(200),
		}),
		defineField({
			name: "pdfFile",
			type: "file",
			title: "PDF File",
			description: "Upload the PDF guide here.",
			options: {
				accept: ".pdf",
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "thumbnail",
			type: "image",
			title: "Thumbnail Image",
			description: "An image to represent the guide.",
			options: { hotspot: true },
		}),
		defineField({
			name: "publishedAt",
			type: "datetime",
			title: "Published at",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "seo",
			type: "object",
			title: "SEO & Metadata",
			fields: [
				defineField({
					name: "slug",
					type: "slug",
					title: "Slug",
					options: { source: "title", maxLength: 96 },
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			media: "thumbnail",
		},
	},
});

export default guides;
