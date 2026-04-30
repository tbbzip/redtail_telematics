export type BlogPost = {
	category: string;
	excerpt: string;
	href: string;
	image: string;
	imageFit?: "cover" | "contain";
	publishedAt: string;
	readTime: string;
	slug: string;
	title: string;
};

export const mockBlogPosts: BlogPost[] = [
	{
		category: "Platform insight",
		excerpt:
			"How live vehicle data, mobile access, and exception workflows help fleet teams move from visibility to action.",
		href: "/resources/blog",
		image: "/platform-screenshots/redtail_lap-mob.png",
		imageFit: "contain",
		publishedAt: "2026-04-18",
		readTime: "5 min read",
		slug: "turning-fleet-data-into-operational-action",
		title: "Turning fleet data into operational action",
	},
	{
		category: "Fleet safety",
		excerpt:
			"Use driver behaviour, incident context, and exception trends to improve coaching and reduce avoidable risk.",
		href: "/resources/blog",
		image: "/carousel/fleet-web.jpg",
		publishedAt: "2026-04-12",
		readTime: "4 min read",
		slug: "building-safer-fleet-programs",
		title: "Building safer fleet programs with telematics",
	},
	{
		category: "Insurance telematics",
		excerpt:
			"Why usage-based insurance programs need reliable devices, verified journey data, and flexible APIs.",
		href: "/resources/blog",
		image: "/carousel/insurance-web.jpg",
		publishedAt: "2026-04-04",
		readTime: "6 min read",
		slug: "what-insurers-need-from-telematics-data",
		title: "What insurers need from telematics data",
	},
	{
		category: "Deployment health",
		excerpt:
			"How installation checks and device health monitoring keep telematics programs reliable as they scale.",
		href: "/resources/blog",
		image: "/carousel/resellers-web.jpg",
		publishedAt: "2026-03-28",
		readTime: "3 min read",
		slug: "keeping-device-deployments-healthy",
		title: "Keeping device deployments healthy after installation",
	},
];

export function getMockLatestBlogPosts(limit = 4) {
	return [...mockBlogPosts]
		.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
		)
		.slice(0, limit);
}
