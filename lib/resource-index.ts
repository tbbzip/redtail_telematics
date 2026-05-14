export type ResourceIndexItem = {
	actionLabel?: string;
	category: string;
	excerpt: string;
	href?: string;
	image: string;
	imageAlt?: string;
	imageFit?: "cover" | "contain";
	publishedAt: string;
	secondaryMeta?: string;
	secondaryMetaIcon?: "author" | "file" | "location" | "story";
	slug: string;
	title: string;
};

export type ResourceIndexConfig = {
	description: string;
	emptyDescription: string;
	emptyTitle: string;
	eyebrow: string;
	paginationLabel: string;
	searchPlaceholder: string;
	title: string;
};
