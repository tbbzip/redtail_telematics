import Image from "next/image";
import Link from "next/link";
import {
	ArrowRight01Icon,
	ArrowUp01Icon,
	Calendar03Icon,
	Clock01Icon,
	Home01Icon,
	Location01Icon,
	UserIcon,
} from "@hugeicons/core-free-icons";
import { SiFacebook, SiX } from "@icons-pack/react-simple-icons";
import type { ReactNode } from "react";

import { HugeIcon } from "@/components/huge-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	type PortableBlock,
	type PortableImage,
	type PortableMarkDef,
	type PortableNode,
	type PortableSpan,
	type ResourceDetail,
} from "@/lib/resource-detail";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

type TocItem = {
	id: string;
	level: 2 | 3;
	title: string;
};

function LinkedinGlyph() {
	return (
		<svg aria-hidden="true" className="size-4 fill-current" viewBox="0 0 24 24">
			<path d="M6.9 8.3a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8Zm-1.7 2h3.4V20H5.2v-9.7Zm5.3 0h3.3v1.3h.1c.5-.9 1.7-1.8 3.4-1.8 3.6 0 4.3 2.1 4.3 5V20h-3.5v-4.6c0-1.1 0-2.6-1.7-2.6s-2 1.2-2 2.5V20h-3.5v-9.7Z" />
		</svg>
	);
}

function getInitials(name: string) {
	return name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part.charAt(0).toUpperCase())
		.join("");
}

function formatDate(value: string) {
	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return "Recent";
	}

	return new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(date);
}

function formatEventDate(start?: string, end?: string) {
	if (!start) {
		return "Date to be announced";
	}

	const startDate = new Date(start);

	if (Number.isNaN(startDate.getTime())) {
		return "Date to be announced";
	}

	if (!end) {
		return new Intl.DateTimeFormat("en", {
			dateStyle: "medium",
			timeStyle: "short",
		}).format(startDate);
	}

	const endDate = new Date(end);

	if (Number.isNaN(endDate.getTime())) {
		return new Intl.DateTimeFormat("en", {
			dateStyle: "medium",
			timeStyle: "short",
		}).format(startDate);
	}

	return `${new Intl.DateTimeFormat("en", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(startDate)} - ${new Intl.DateTimeFormat("en", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(endDate)}`;
}

function getBlockText(block: PortableBlock) {
	return (block.children || [])
		.map((child) => child.text || "")
		.join("")
		.trim();
}

function slugify(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

function getBlockId(block: PortableBlock, index: number) {
	return slugify(getBlockText(block)) || `section-${index + 1}`;
}

function getTocItems(content: PortableNode[]) {
	return content.reduce<TocItem[]>((items, node, index) => {
		if (node._type !== "block") {
			return items;
		}

		if (node.style !== "h2" && node.style !== "h3") {
			return items;
		}

		const title = getBlockText(node);

		if (!title) {
			return items;
		}

		items.push({
			id: getBlockId(node, index),
			level: node.style === "h2" ? 2 : 3,
			title,
		});

		return items;
	}, []);
}

function getMarkDef(markDefs: PortableMarkDef[] | undefined, mark: string) {
	return markDefs?.find((definition) => definition._key === mark);
}

function renderSpan(
	child: PortableSpan,
	index: number,
	markDefs: PortableMarkDef[] | undefined,
) {
	const marks = child.marks || [];
	const content = marks.reduce<ReactNode>((node, mark) => {
		if (mark === "strong") {
			return <strong>{node}</strong>;
		}

		if (mark === "em") {
			return <em>{node}</em>;
		}

		if (mark === "code") {
			return (
				<code className="rounded-md bg-rb-black/[0.06] px-1.5 py-0.5 text-[0.9em] text-rb-black">
					{node}
				</code>
			);
		}

		const markDef = getMarkDef(markDefs, mark);

		if (markDef?._type === "link" && markDef.href) {
			const isExternal = /^https?:\/\//.test(markDef.href);

			return (
				<a
					className="font-medium text-rb-red underline decoration-rb-red/25 underline-offset-4 transition hover:decoration-rb-red"
					href={markDef.href}
					rel={isExternal ? "noreferrer" : undefined}
					target={isExternal ? "_blank" : undefined}
				>
					{node}
				</a>
			);
		}

		return node;
	}, child.text || "");

	return <span key={child._key || index}>{content}</span>;
}

function renderBlockChildren(block: PortableBlock) {
	return (block.children || []).map((child, index) =>
		renderSpan(child, index, block.markDefs),
	);
}

function PortableImageBlock({ node }: { node: PortableImage }) {
	if (!node.asset) {
		return null;
	}

	const src = urlForImage(node as unknown as SanityImageSource)
		.width(1400)
		.fit("max")
		.url();

	return (
		<figure className="my-12">
			<div className="relative aspect-[1.35] overflow-hidden rounded-2xl border border-black/10 bg-[#f6f4f1] sm:aspect-[1.66]">
				<Image
					alt={node.alt || "Redtail resource image"}
					className="object-contain p-3 sm:p-5"
					fill
					sizes="(max-width: 1024px) 100vw, 880px"
					src={src}
				/>
			</div>
			{node.caption ? (
				<figcaption className="mt-3 text-sm leading-6 text-rb-black/44">
					{node.caption}
				</figcaption>
			) : null}
		</figure>
	);
}

function renderList(
	items: PortableBlock[],
	key: string,
	type: "bullet" | "number",
) {
	const ListTag = type === "number" ? "ol" : "ul";

	return (
		<ListTag
			className={cn(
				"my-8 flex flex-col gap-3 pl-7 text-xl leading-9 text-rb-black/64",
				type === "number" ? "list-decimal" : "list-disc",
			)}
			key={key}
		>
			{items.map((item, index) => (
				<li key={item._key || index}>{renderBlockChildren(item)}</li>
			))}
		</ListTag>
	);
}

function renderBlock(node: PortableBlock, index: number) {
	const children = renderBlockChildren(node);

	if (node.style === "h2") {
		return (
			<h2
				className="mt-16 scroll-mt-28 text-3xl leading-tight font-semibold text-rb-black sm:text-4xl"
				id={getBlockId(node, index)}
				key={node._key || index}
			>
				{children}
			</h2>
		);
	}

	if (node.style === "h3") {
		return (
			<h3
				className="mt-11 scroll-mt-28 text-2xl leading-tight font-semibold text-rb-black sm:text-3xl"
				id={getBlockId(node, index)}
				key={node._key || index}
			>
				{children}
			</h3>
		);
	}

	if (node.style === "blockquote") {
		return (
			<blockquote
				className="my-10 border-l-4 border-rb-red pl-6 text-2xl leading-10 font-medium text-rb-black"
				key={node._key || index}
			>
				{children}
			</blockquote>
		);
	}

	return (
		<p
			className="mt-7 text-xl leading-9 text-rb-black/62 sm:text-[1.42rem] sm:leading-[1.75]"
			key={node._key || index}
		>
			{children}
		</p>
	);
}

function PortableContent({ content }: { content: PortableNode[] }) {
	const rendered: ReactNode[] = [];
	let index = 0;

	while (index < content.length) {
		const node = content[index];

		if (node._type === "block" && node.listItem) {
			const listType = node.listItem;
			const listItems: PortableBlock[] = [];

			while (
				index < content.length &&
				content[index]._type === "block" &&
				(content[index] as PortableBlock).listItem === listType
			) {
				listItems.push(content[index] as PortableBlock);
				index += 1;
			}

			rendered.push(renderList(listItems, listItems[0]?._key || `list-${index}`, listType));
			continue;
		}

		if (node._type === "image") {
			rendered.push(<PortableImageBlock key={node._key || index} node={node} />);
		}

		if (node._type === "block") {
			rendered.push(renderBlock(node, index));
		}

		index += 1;
	}

	if (!rendered.length) {
		return (
			<p className="mt-7 text-xl leading-9 text-rb-black/62 sm:text-[1.42rem] sm:leading-[1.75]">
				More details will be added soon.
			</p>
		);
	}

	return rendered;
}

function ShareLinks({
	label = "Share this article",
	title,
	url,
}: {
	label?: string;
	title: string;
	url: string;
}) {
	const encodedUrl = encodeURIComponent(url);
	const encodedTitle = encodeURIComponent(title);
	const links = [
		{
			href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
			icon: <SiFacebook size={16} title="Facebook" />,
			label: "Share on Facebook",
		},
		{
			href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
			icon: <SiX size={16} title="X" />,
			label: "Share on X",
		},
		{
			href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
			icon: <LinkedinGlyph />,
			label: "Share on LinkedIn",
		},
	];

	return (
		<div className="border-t border-black/10 pt-8">
			<p className="max-w-20 text-xl leading-6 font-semibold text-rb-black">
				{label}
			</p>
			<div className="mt-5 flex items-center gap-3">
				{links.map((link) => (
					<a
						aria-label={link.label}
						className="flex size-11 items-center justify-center rounded-full border border-black/10 bg-white text-rb-black/70 transition hover:border-rb-red/35 hover:text-rb-red"
						href={link.href}
						key={link.label}
						rel="noreferrer"
						target="_blank"
					>
						{link.icon}
					</a>
				))}
			</div>
		</div>
	);
}

function DetailSidebar({
	detail,
	toc,
	url,
}: {
	detail: ResourceDetail;
	toc: TocItem[];
	url: string;
}) {
	return (
		<aside className="hidden lg:block">
			<div className="sticky top-28 flex flex-col gap-8">
				{detail.eventDetails ? (
					<div className="rounded-2xl border border-black/10 bg-[#fcfbf9] p-6">
						<p className="text-xl font-semibold text-rb-black">Event details</p>
						<dl className="mt-5 flex flex-col gap-4 text-sm leading-6">
							<div>
								<dt className="font-semibold text-rb-black">Date</dt>
								<dd className="mt-1 text-rb-black/60">
									{formatEventDate(
										detail.eventDetails.startDate,
										detail.eventDetails.endDate,
									)}
								</dd>
							</div>
							{detail.eventDetails.location ? (
								<div>
									<dt className="font-semibold text-rb-black">Location</dt>
									<dd className="mt-1 text-rb-black/60">
										{detail.eventDetails.location}
									</dd>
								</div>
							) : null}
							{detail.eventDetails.organizer ? (
								<div>
									<dt className="font-semibold text-rb-black">Organizer</dt>
									<dd className="mt-1 text-rb-black/60">
										{detail.eventDetails.organizer}
									</dd>
								</div>
							) : null}
						</dl>
						{detail.eventDetails.registrationUrl ? (
							<Button asChild className="mt-6 w-full">
								<a
									href={detail.eventDetails.registrationUrl}
									rel="noreferrer"
									target="_blank"
								>
									Register
								</a>
							</Button>
						) : null}
					</div>
				) : null}

				{toc.length ? (
					<nav aria-label="On this page">
						<p className="text-2xl font-semibold text-rb-black">On this page</p>
						<div className="mt-6 flex flex-col gap-4">
							{toc.map((item) => (
								<a
									className={cn(
										"text-base leading-6 text-rb-black/54 transition hover:text-rb-red",
										item.level === 2 && "font-medium text-rb-black",
										item.level === 3 && "pl-3",
									)}
									href={`#${item.id}`}
									key={item.id}
								>
									{item.title}
								</a>
							))}
						</div>
					</nav>
				) : null}

				<ShareLinks
					label={detail.eventDetails ? "Share this event" : "Share this article"}
					title={detail.title}
					url={url}
				/>

				<Button asChild className="w-fit" variant="outline">
					<a href="#top">
						<HugeIcon data-icon="inline-start" icon={ArrowUp01Icon} />
						Back to top
					</a>
				</Button>
			</div>
		</aside>
	);
}

function DetailMeta({ detail }: { detail: ResourceDetail }) {
	if (detail.eventDetails) {
		return (
			<div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-lg text-rb-black/58">
				<Badge className="border-black/10 bg-white text-rb-black" variant="outline">
					{detail.category}
				</Badge>
				<span className="inline-flex items-center gap-2">
					<HugeIcon icon={Calendar03Icon} size={21} />
					{formatDate(detail.publishedAt)}
				</span>
				{detail.eventDetails.location ? (
					<span className="inline-flex items-center gap-2">
						<HugeIcon icon={Location01Icon} size={21} />
						{detail.eventDetails.location}
					</span>
				) : null}
			</div>
		);
	}

	const authorName = detail.authorName || "Redtail Telematics";

	return (
		<div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4 text-lg text-rb-black/58">
			<div className="flex items-center gap-3">
				<Avatar className="size-11 bg-rb-peach text-rb-red after:border-black/8">
					{detail.authorImage ? (
						<AvatarImage alt={authorName} src={detail.authorImage} />
					) : null}
					<AvatarFallback className="bg-rb-peach font-semibold text-rb-red">
						{getInitials(authorName) || <HugeIcon icon={UserIcon} />}
					</AvatarFallback>
				</Avatar>
				<span>
					<strong className="font-semibold text-rb-black">{authorName}</strong>{" "}
					on {formatDate(detail.publishedAt)}
				</span>
			</div>
			{detail.readTime ? (
				<span className="inline-flex items-center gap-2">
					<HugeIcon icon={Clock01Icon} size={22} />
					{detail.readTime}
				</span>
			) : null}
		</div>
	);
}

export function ResourceDetailPage({ detail }: { detail: ResourceDetail }) {
	const toc = getTocItems(detail.content);
	const canonicalUrl = `https://www.redtailtelematics.com${detail.canonicalPath}`;

	return (
		<main className="flex-1 overflow-x-clip bg-white" id="top">
			<section className="px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<nav
						aria-label="Breadcrumb"
						className="flex items-center gap-3 text-base font-medium text-rb-black/48"
					>
						<Link
							aria-label="Home"
							className="transition hover:text-rb-red"
							href="/"
						>
							<HugeIcon icon={Home01Icon} size={22} />
						</Link>
						<HugeIcon icon={ArrowRight01Icon} size={18} />
						<Link className="transition hover:text-rb-red" href="/resources/blog">
							Resources
						</Link>
						<HugeIcon icon={ArrowRight01Icon} size={18} />
						<Link
							className="text-rb-black transition hover:text-rb-red"
							href={detail.listingHref}
						>
							{detail.listingLabel}
						</Link>
					</nav>

					<header className="mt-12 max-w-6xl">
						<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
							{detail.resourceLabel}
						</p>
						<h1 className="mt-5 max-w-6xl text-[3.35rem] leading-[0.98] font-semibold tracking-[-0.02em] text-rb-black sm:text-7xl lg:text-[5.6rem]">
							{detail.title}
						</h1>
						<DetailMeta detail={detail} />
					</header>

					<div className="mt-14 border-t border-black/10" />

					<div className="grid gap-12 pt-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
						<article className="max-w-4xl">
							<PortableContent content={detail.content} />

							<div className="mt-16 border-t border-black/10 pt-8 lg:hidden">
								<ShareLinks
									label={
										detail.eventDetails ? "Share this event" : "Share this article"
									}
									title={detail.title}
									url={canonicalUrl}
								/>
							</div>
						</article>

						<DetailSidebar detail={detail} toc={toc} url={canonicalUrl} />
					</div>
				</div>
			</section>
		</main>
	);
}
