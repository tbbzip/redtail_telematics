import {
	BookIcon,
	CaseIcon,
	CheckmarkCircleIcon,
	ClockIcon,
	WarningOutlineIcon,
} from "@sanity/icons";
import type { DocumentBadgeComponent, SanityDocument } from "sanity";

type PostDocument = SanityDocument & {
	blogImage?: {
		asset?: {
			_ref?: string;
		};
	};
	postType?: string;
	publishedAt?: string;
	seo?: {
		excerpt?: string;
		metaDescription?: string;
		metaTitle?: string;
		slug?: {
			current?: string;
		};
	};
};

function getDocument(props: Parameters<DocumentBadgeComponent>[0]) {
	return (props.draft || props.version || props.published) as PostDocument | null;
}

function hasCompleteSeo(document: PostDocument) {
	return Boolean(
		document.seo?.slug?.current &&
			document.seo?.metaTitle &&
			document.seo?.metaDescription &&
			document.seo?.excerpt,
	);
}

export const postTypeBadge: DocumentBadgeComponent = (props) => {
	if (props.type !== "post") {
		return null;
	}

	const document = getDocument(props);

	if (!document) {
		return null;
	}

	if (!document.postType) {
		return {
			color: "warning",
			icon: WarningOutlineIcon,
			label: "No Type",
			title: "This post is missing its post type.",
		};
	}

	if (document.postType === "caseStudy") {
		return {
			color: "primary",
			icon: CaseIcon,
			label: "Case Study",
			title: "This post is categorized as a case study.",
		};
	}

	return {
		color: "primary",
		icon: BookIcon,
		label: "Blog Article",
		title: "This post is categorized as a blog article.",
	};
};

export const publishHealthBadge: DocumentBadgeComponent = (props) => {
	if (props.type !== "post") {
		return null;
	}

	const document = getDocument(props);

	if (!document?.publishedAt) {
		return {
			color: "warning",
			icon: ClockIcon,
			label: "No Date",
			title: "This post is missing a publish date.",
		};
	}

	const publishTime = new Date(document.publishedAt).getTime();

	if (Number.isNaN(publishTime)) {
		return {
			color: "warning",
			icon: ClockIcon,
			label: "Bad Date",
			title: "This post has an invalid publish date.",
		};
	}

	const isScheduled = publishTime > Date.now();

	return {
		color: isScheduled ? "warning" : "success",
		icon: isScheduled ? ClockIcon : CheckmarkCircleIcon,
		label: isScheduled ? "Scheduled" : "Dated",
		title: isScheduled
			? "This post has a future publish date."
			: "This post has a publish date.",
	};
};

export const editorialHealthBadge: DocumentBadgeComponent = (props) => {
	if (props.type !== "post") {
		return null;
	}

	const document = getDocument(props);

	if (!document) {
		return null;
	}

	if (!document.blogImage?.asset?._ref) {
		return {
			color: "warning",
			icon: WarningOutlineIcon,
			label: "Image",
			title: "This post is missing its main image.",
		};
	}

	if (!hasCompleteSeo(document)) {
		return {
			color: "warning",
			icon: WarningOutlineIcon,
			label: "SEO",
			title: "This post is missing one or more SEO fields.",
		};
	}

	return {
		color: "success",
		icon: CheckmarkCircleIcon,
		label: "Ready",
		title: "This post has core editorial fields complete.",
	};
};

export const postDocumentBadges = [
	postTypeBadge,
	publishHealthBadge,
	editorialHealthBadge,
];
