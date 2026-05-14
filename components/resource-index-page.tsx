"use client";

import Image from "next/image";
import {
	ArrowRight01Icon,
	BookOpenTextIcon,
	Calendar03Icon,
	DocumentAttachmentIcon,
	Download01Icon,
	FileChartColumnIcon,
	Location01Icon,
	News01Icon,
	Search01Icon,
	UserIcon,
} from "@hugeicons/core-free-icons";
import { useMemo, useState } from "react";

import { HugeIcon } from "@/components/huge-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	type ResourceIndexConfig,
	type ResourceIndexItem,
} from "@/lib/resource-index";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 9;

function formatResourceDate(value: string) {
	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return "Recent";
	}

	return new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(date);
}

function getCategories(items: ResourceIndexItem[]) {
	return [
		"All",
		...Array.from(new Set(items.map((item) => item.category))).sort((a, b) =>
			a.localeCompare(b),
		),
	];
}

function getCategoryCount(items: ResourceIndexItem[], category: string) {
	if (category === "All") {
		return items.length;
	}

	return items.filter((item) => item.category === category).length;
}

function filterItems(
	items: ResourceIndexItem[],
	category: string,
	query: string,
) {
	const normalizedQuery = query.trim().toLowerCase();

	return items.filter((item) => {
		const matchesCategory = category === "All" || item.category === category;

		if (!normalizedQuery) {
			return matchesCategory;
		}

		const searchableText = [
			item.title,
			item.excerpt,
			item.category,
			item.secondaryMeta,
		]
			.filter(Boolean)
			.join(" ")
			.toLowerCase();

		return matchesCategory && searchableText.includes(normalizedQuery);
	});
}

function getPaginationItems(currentPage: number, totalPages: number) {
	if (totalPages <= 5) {
		return Array.from({ length: totalPages }, (_, index) => index + 1);
	}

	if (currentPage <= 3) {
		return [1, 2, 3, 4, totalPages];
	}

	if (currentPage >= totalPages - 2) {
		return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
	}

	return [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
}

function ResourceCard({ item }: { item: ResourceIndexItem }) {
	const hasDownloadAction = item.actionLabel?.toLowerCase().includes("download");
	const isExternalAction = item.href ? /^https?:\/\//.test(item.href) : false;
	const secondaryIcon =
		item.secondaryMetaIcon === "author"
			? UserIcon
			: item.secondaryMetaIcon === "file"
				? DocumentAttachmentIcon
				: item.secondaryMetaIcon === "story"
					? FileChartColumnIcon
					: item.secondaryMetaIcon === "location"
						? Location01Icon
						: BookOpenTextIcon;

	return (
		<Card
			className="group overflow-hidden border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0 transition duration-300 hover:-translate-y-1 hover:border-rb-red/28 hover:shadow-[0_24px_70px_rgba(1,1,1,0.1)]"
			id={item.slug}
		>
			<CardHeader className="gap-5 px-6 pt-6 sm:px-7 sm:pt-7">
				<div className="relative aspect-[1.48] overflow-hidden rounded-xl bg-rb-black">
					<Image
						alt={item.imageAlt || item.title}
						className={cn(
							"transition duration-500 group-hover:scale-[1.03]",
							item.imageFit === "contain" ? "object-contain p-6" : "object-cover",
						)}
						fill
						sizes="(max-width: 768px) 100vw, 420px"
						src={item.image}
					/>
					<div className="absolute inset-0 bg-linear-to-t from-rb-black/18 to-transparent" />
				</div>
				<div className="flex items-center justify-between gap-3">
					<Badge className="border-black/10 bg-white text-rb-black/58" variant="outline">
						{item.category}
					</Badge>
					<span className="inline-flex items-center gap-2 text-xs font-medium text-rb-black/42">
						<HugeIcon icon={Calendar03Icon} size={14} />
						{formatResourceDate(item.publishedAt)}
					</span>
				</div>
				<div>
					<CardTitle className="line-clamp-2 text-2xl leading-tight font-semibold text-rb-black">
						{item.title}
					</CardTitle>
					<CardDescription className="mt-3 line-clamp-3 text-base leading-7 text-rb-black/58">
						{item.excerpt}
					</CardDescription>
				</div>
			</CardHeader>
			<CardFooter className="flex items-center justify-between gap-4 px-6 pb-6 sm:px-7 sm:pb-7">
				<p className="inline-flex min-w-0 items-center gap-2 text-xs font-medium text-rb-black/44">
					{item.secondaryMeta ? (
						<>
							<HugeIcon icon={secondaryIcon} size={14} />
							<span className="truncate">{item.secondaryMeta}</span>
						</>
					) : (
						<>
							<HugeIcon icon={BookOpenTextIcon} size={14} />
							<span>Redtail resource</span>
						</>
					)}
				</p>
				{item.href && item.actionLabel ? (
					<Button asChild size="sm" variant="outline">
						<a
							href={item.href}
							rel={isExternalAction ? "noreferrer" : undefined}
							target={isExternalAction ? "_blank" : undefined}
						>
							{hasDownloadAction ? (
								<HugeIcon data-icon="inline-start" icon={Download01Icon} />
							) : (
								<HugeIcon data-icon="inline-start" icon={ArrowRight01Icon} />
							)}
							{item.actionLabel}
						</a>
					</Button>
				) : null}
			</CardFooter>
		</Card>
	);
}

function EmptyState({
	config,
}: {
	config: Pick<ResourceIndexConfig, "emptyDescription" | "emptyTitle">;
}) {
	return (
		<Card className="border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0">
			<CardHeader className="gap-4 px-6 py-8 text-center sm:px-8 sm:py-10">
				<div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-rb-red text-white">
					<HugeIcon icon={News01Icon} size={22} />
				</div>
				<CardTitle className="text-2xl font-semibold text-rb-black">
					{config.emptyTitle}
				</CardTitle>
				<CardDescription className="mx-auto max-w-xl text-base leading-7 text-rb-black/58">
					{config.emptyDescription}
				</CardDescription>
			</CardHeader>
		</Card>
	);
}

function ResourcePagination({
	currentPage,
	label,
	onPageChange,
	totalPages,
}: {
	currentPage: number;
	label: string;
	onPageChange: (page: number) => void;
	totalPages: number;
}) {
	if (totalPages <= 1) {
		return null;
	}

	const pageItems = getPaginationItems(currentPage, totalPages);

	return (
		<nav
			aria-label={`${label} pagination`}
			className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
		>
			<p className="text-sm font-medium text-rb-black/50">
				Page {currentPage} of {totalPages}
			</p>
			<div className="flex flex-wrap items-center gap-2">
				<Button
					disabled={currentPage === 1}
					onClick={() => onPageChange(currentPage - 1)}
					variant="outline"
				>
					Previous
				</Button>
				{pageItems.map((page, index) => {
					const previous = pageItems[index - 1];
					const showGap = previous && page - previous > 1;

					return (
						<div className="flex items-center gap-2" key={page}>
							{showGap ? (
								<span className="px-1 text-sm font-medium text-rb-black/34">...</span>
							) : null}
							<Button
								aria-current={page === currentPage ? "page" : undefined}
								className={
									page === currentPage
										? "border-rb-black bg-rb-black text-white hover:bg-rb-red"
										: ""
								}
								onClick={() => onPageChange(page)}
								variant={page === currentPage ? "default" : "outline"}
							>
								{page}
							</Button>
						</div>
					);
				})}
				<Button
					disabled={currentPage === totalPages}
					onClick={() => onPageChange(currentPage + 1)}
					variant="outline"
				>
					Next
				</Button>
			</div>
		</nav>
	);
}

export function ResourceIndexPageSections({
	config,
	items,
}: {
	config: ResourceIndexConfig;
	items: ResourceIndexItem[];
}) {
	const categories = useMemo(() => getCategories(items), [items]);
	const [activeCategory, setActiveCategory] = useState("All");
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const filteredItems = useMemo(
		() => filterItems(items, activeCategory, query),
		[activeCategory, items, query],
	);
	const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
	const currentPage = Math.min(page, totalPages);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedItems = filteredItems.slice(
		startIndex,
		startIndex + ITEMS_PER_PAGE,
	);

	function updateCategory(category: string) {
		setActiveCategory(category);
		setPage(1);
	}

	function updateQuery(value: string) {
		setQuery(value);
		setPage(1);
	}

	return (
		<section className="border-b border-black/10 bg-[#fcfbf9] px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:px-8 lg:pb-24">
			<div className="mx-auto max-w-7xl">
				<header className="grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
					<div>
						<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
							{config.eyebrow}
						</p>
						<h1 className="mt-4 text-[2.35rem] leading-tight font-semibold text-rb-black sm:text-5xl">
							{config.title}
						</h1>
					</div>
					<p className="max-w-3xl text-base leading-7 text-rb-black/60 sm:text-lg sm:leading-8 lg:justify-self-end">
						{config.description}
					</p>
				</header>

				<div className="mt-10 rounded-[1.35rem] border border-black/10 bg-white p-2 shadow-[0_18px_50px_rgba(1,1,1,0.06)]">
					<div className="grid gap-2 lg:grid-cols-[minmax(13rem,17rem)_1fr] lg:items-center">
						<label className="relative">
							<span className="sr-only">Category</span>
							<select
								className="h-12 w-full appearance-none rounded-2xl border border-black/10 bg-[#fcfbf9] px-4 pr-10 text-sm font-semibold text-rb-black outline-none transition hover:border-black/18 focus:border-rb-red focus:ring-3 focus:ring-rb-red/15"
								onChange={(event) => updateCategory(event.target.value)}
								value={activeCategory}
							>
								{categories.map((category) => (
									<option key={category} value={category}>
										{category} ({getCategoryCount(items, category)})
									</option>
								))}
							</select>
							<span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs text-rb-black/42">
								Filter
							</span>
						</label>

						<label className="relative">
							<span className="sr-only">Search</span>
							<div className="relative">
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4 text-rb-black/38">
									<HugeIcon icon={Search01Icon} size={16} />
									<span className="sr-only">Search</span>
								</div>
								<Input
									className="h-12 rounded-2xl border-black/10 bg-[#fcfbf9] pr-4 pl-11 text-rb-black placeholder:text-rb-black/38 hover:border-black/18 focus-visible:border-rb-red focus-visible:ring-rb-red/15"
									onChange={(event) => updateQuery(event.target.value)}
									placeholder={config.searchPlaceholder}
									type="search"
									value={query}
								/>
							</div>
						</label>
					</div>
				</div>

				<div className="mt-8">
					{paginatedItems.length ? (
						<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
							{paginatedItems.map((item) => (
								<ResourceCard item={item} key={item.slug} />
							))}
						</div>
					) : (
						<EmptyState config={config} />
					)}
				</div>

				<ResourcePagination
					currentPage={currentPage}
					label={config.paginationLabel}
					onPageChange={setPage}
					totalPages={totalPages}
				/>
			</div>
		</section>
	);
}
