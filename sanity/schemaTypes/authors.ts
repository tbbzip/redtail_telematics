import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const authors = defineType({
	name: "authors",
	icon: UserIcon,
	type: "document",
	title: "Authors",
	fields: [
		defineField({
			name: "name",
			type: "string",
			title: "Name",
			validation: (Rule) =>
				Rule.required()
					.min(3)
					.max(40)
					.warning("Name should be between 3 and 40 characters"),
		}),
		defineField({
			name: "bio",
			type: "text",
			title: "Biography",
			description: "A short bio of the author",
		}),
		defineField({
			name: "image",
			type: "image",
			title: "Image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "social",
			type: "object",
			title: "Social Media",
			fields: [
				defineField({
					name: "linkedin",
					type: "url",
					title: "LinkedIn",
				}),
				defineField({
					name: "x",
					type: "url",
					title: "X (formerly Twitter)",
				}),
			],
		}),
	],
});

export default authors;
