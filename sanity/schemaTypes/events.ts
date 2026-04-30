import { CalendarIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const events = defineType({
	name: "event",
	icon: CalendarIcon,
	type: "document",
	title: "Events",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Event Title",
			description: "Enter the event name. This should be catchy and descriptive.",
			validation: (Rule) =>
				Rule.required()
					.min(10)
					.max(80)
					.warning("Title should be between 10 and 80 characters"),
		}),
		defineField({
			name: "eventType",
			type: "string",
			title: "Event Type",
			description: "Select the type of event.",
			options: {
				list: [
					{ title: "Conference", value: "conference" },
					{ title: "Webinar", value: "webinar" },
					{ title: "Workshop", value: "workshop" },
					{ title: "Meetup", value: "meetup" },
				],
				layout: "radio",
			},
			validation: (Rule) =>
				Rule.required().warning("An event type must be selected"),
		}),
		defineField({
			name: "location",
			type: "string",
			title: "Location",
			description: 'Enter the event location, venue, city, or "Online".',
			validation: (Rule) => Rule.required().warning("Location is required"),
		}),
		defineField({
			name: "startDate",
			type: "datetime",
			title: "Start Date & Time",
			description: "Select the start date and time for the event.",
			validation: (Rule) => Rule.required().warning("Start date is required"),
		}),
		defineField({
			name: "endDate",
			type: "datetime",
			title: "End Date & Time",
			description: "Select the end date and time for the event, if applicable.",
		}),
		defineField({
			name: "eventImage",
			type: "image",
			title: "Event Image",
			description:
				"This image will be the main visual representation for the event and will be used in event lists and previews.",
			options: { hotspot: true },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "organizer",
			type: "string",
			title: "Organizer",
			description: "Enter the organizer of the event.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			type: "array",
			title: "Event Description",
			of: [
				defineArrayMember({ type: "block" }),
				defineArrayMember({ type: "image" }),
			],
			description: "Detailed information about the event.",
			validation: (Rule) =>
				Rule.required()
					.min(1)
					.warning("Event description should not be empty"),
		}),
		defineField({
			name: "registrationUrl",
			type: "url",
			title: "Registration URL",
			description: "Link to the event registration or more information page.",
			validation: (Rule) =>
				Rule.uri({
					allowRelative: true,
					scheme: ["http", "https"],
				}).warning("Please enter a valid URL"),
		}),
		defineField({
			name: "seo",
			type: "object",
			title: "SEO & Metadata",
			description: "Fields related to SEO and social sharing data for the event.",
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
						"A brief description of the event for search engines (150-160 characters).",
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
					description: "Keywords relevant to the event for SEO purposes.",
					options: {
						layout: "tags",
					},
				}),
				defineField({
					name: "slug",
					type: "slug",
					title: "Slug",
					description:
						"URL-friendly version of the event title. Lowercase and hyphen-separated.",
					options: { source: "title", maxLength: 96 },
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "excerpt",
					type: "string",
					title: "Excerpt",
					description:
						"Short description of the event. Appears in summaries, search results, and social shares.",
					validation: (Rule) =>
						Rule.max(160).warning("Excerpts should not exceed 160 characters"),
				}),
				defineField({
					name: "metaImage",
					type: "image",
					title: "Meta Image (for social sharing)",
					description:
						"An image to represent this event on social media and search engines. If left empty, the event image will be used.",
					options: { hotspot: true },
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			organizer: "organizer",
			media: "eventImage",
			eventType: "eventType",
			location: "location",
		},
		prepare(selection) {
			const { title, organizer, media, eventType, location } = selection;
			const typeLabel =
				typeof eventType === "string"
					? eventType.charAt(0).toUpperCase() + eventType.slice(1)
					: "Event";

			return {
				title,
				subtitle: `${typeLabel} in ${location || "TBD"} organized by ${organizer || "Redtail"}`,
				media,
			};
		},
	},
});

export default events;
