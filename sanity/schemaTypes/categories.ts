import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const categories = defineType({
	name: "category",
	icon: TagIcon,
	type: "document",
	title: "Categories",
	fields: [
		defineField({
			name: "name",
			type: "string",
			title: "Category Name",
			description: "Name of the category, for example Technology or Telematics.",
			validation: (Rule) =>
				Rule.required()
					.min(3)
					.max(50)
					.warning("Category name should be between 3 and 50 characters"),
		}),
	],
});

export default categories;
