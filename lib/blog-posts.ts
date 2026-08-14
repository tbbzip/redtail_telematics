export type BlogPost = {
	authorName?: string;
	category: string;
	excerpt: string;
	href: string;
	image: string;
	imageAlt?: string;
	imageFit?: "cover" | "contain";
	publishedAt: string;
	readTime: string;
	slug: string;
	title: string;
};
