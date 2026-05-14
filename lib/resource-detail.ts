import type { SanityImageSource } from "@sanity/image-url";

export type PortableMarkDef = {
	_key?: string;
	_type?: string;
	href?: string;
};

export type PortableSpan = {
	_key?: string;
	_type?: "span";
	marks?: string[];
	text?: string;
};

export type PortableBlock = {
	_key?: string;
	_type: "block";
	children?: PortableSpan[];
	level?: number;
	listItem?: "bullet" | "number";
	markDefs?: PortableMarkDef[];
	style?: string;
};

export type PortableImage = {
	_key?: string;
	_type: "image";
	alt?: string;
	asset?: SanityImageSource;
	caption?: string;
};

export type PortableNode = PortableBlock | PortableImage;

export type ResourceDetail = {
	authorImage?: string;
	authorName?: string;
	canonicalPath: string;
	category: string;
	content: PortableNode[];
	description: string;
	eventDetails?: {
		endDate?: string;
		location?: string;
		organizer?: string;
		registrationUrl?: string;
		startDate?: string;
	};
	image?: string;
	imageAlt?: string;
	listingHref: string;
	listingLabel: string;
	publishedAt: string;
	readTime?: string;
	resourceLabel: string;
	slug: string;
	title: string;
};
