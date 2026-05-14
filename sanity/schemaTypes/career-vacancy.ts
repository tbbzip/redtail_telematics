import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const careerVacancy = defineType({
	name: "careerVacancy",
	title: "Career Vacancy",
	type: "document",
	icon: CaseIcon,
	initialValue: {
		active: true,
		type: "Full-time",
	},
	fields: [
		defineField({
			name: "title",
			title: "Job Title",
			type: "string",
			validation: (Rule) => Rule.required().max(100),
		}),
		defineField({
			name: "active",
			title: "Show on Careers Page",
			type: "boolean",
			description: "Turn this off to hide the vacancy without deleting it.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "department",
			title: "Department",
			type: "string",
			validation: (Rule) => Rule.max(80),
		}),
		defineField({
			name: "location",
			title: "Location",
			type: "string",
			validation: (Rule) => Rule.max(80),
		}),
		defineField({
			name: "type",
			title: "Job Type",
			type: "string",
			options: {
				layout: "radio",
				list: [
					{ title: "Full-time", value: "Full-time" },
					{ title: "Part-time", value: "Part-time" },
					{ title: "Contract", value: "Contract" },
					{ title: "Internship", value: "Internship" },
				],
			},
		}),
		defineField({
			name: "summary",
			title: "Card Description",
			type: "text",
			rows: 4,
			description: "A short description shown on the Careers page card.",
			validation: (Rule) => Rule.required().max(360),
		}),
	],
	preview: {
		select: {
			active: "active",
			location: "location",
			title: "title",
			type: "type",
		},
		prepare(selection) {
			return {
				title: selection.title || "Untitled vacancy",
				subtitle: [
					selection.active ? "Active" : "Hidden",
					selection.location,
					selection.type,
				]
					.filter(Boolean)
					.join(" - "),
			};
		},
	},
});

export default careerVacancy;
