import { ArrowRight01Icon, News01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";

import { HugeIcon } from "@/components/huge-icon";
import { type BlogPost } from "@/lib/blog-posts";
import { cn } from "@/lib/utils";
import { getLatestBlogPosts } from "@/sanity/lib/blog-posts";

function formatPostDate(value: string) {
	return new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(new Date(value));
}

function FeaturedPost({ post }: { post: BlogPost }) {
	return (
		<Link className="group block" href={post.href}>
			<article>
				<div className="relative flex aspect-[1.45] overflow-hidden rounded-2xl bg-linear-to-br from-white via-rb-peach/30 to-rb-red/12 ring-1 ring-black/8 sm:rounded-[1.35rem]">
					<Image
						alt=""
						className={cn(
							"transition duration-500 group-hover:scale-[1.025]",
							post.imageFit === "contain" ? "object-contain p-8" : "object-cover"
						)}
						fill
						priority={false}
						sizes="(max-width: 1024px) 100vw, 52vw"
						src={post.image}
					/>
					<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-rb-black/8 to-transparent" />
				</div>

				<div className="mt-8">
					<p className="text-xs font-semibold tracking-[0.24em] text-rb-red uppercase">
						{post.category}
					</p>
					<h3 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-rb-black transition-colors group-hover:text-rb-red sm:text-4xl">
						{post.title}
					</h3>
					<p className="mt-4 max-w-2xl text-base leading-7 text-rb-black/62 sm:text-lg sm:leading-8">
						{post.excerpt}
					</p>
					<div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-rb-black transition-colors group-hover:text-rb-red">
						Read article
						<HugeIcon
							className="size-4 transition-transform duration-300 group-hover:translate-x-1"
							icon={ArrowRight01Icon}
							size={16}
						/>
					</div>
				</div>
			</article>
		</Link>
	);
}

function CompactPost({ post }: { post: BlogPost }) {
	return (
		<Link className="group grid gap-5 sm:grid-cols-[13.5rem_1fr]" href={post.href}>
			<div className="relative aspect-[1.75] overflow-hidden rounded-xl bg-rb-black ring-1 ring-black/8 sm:aspect-auto sm:min-h-36">
				<Image
					alt=""
					className={cn(
						"transition duration-500 group-hover:scale-[1.03]",
						post.imageFit === "contain" ? "object-contain p-5" : "object-cover"
					)}
					fill
					sizes="(max-width: 640px) 100vw, 216px"
					src={post.image}
				/>
				<div className="absolute inset-0 bg-linear-to-t from-rb-black/20 to-transparent" />
			</div>

			<article className="flex min-w-0 flex-col justify-center border-b border-black/10 pb-7 sm:pb-0">
				<p className="text-xs font-semibold tracking-[0.22em] text-rb-black/48 uppercase">
					{post.category}
				</p>
				<h3 className="mt-3 text-xl font-semibold leading-tight text-rb-black transition-colors group-hover:text-rb-red sm:text-2xl">
					{post.title}
				</h3>
				<p className="mt-3 line-clamp-2 text-sm leading-6 text-rb-black/58">
					{post.excerpt}
				</p>
				<p className="mt-4 text-xs font-medium text-rb-black/44">
					{formatPostDate(post.publishedAt)} · {post.readTime}
				</p>
			</article>
		</Link>
	);
}

export async function LatestBlogSection() {
	const posts = await getLatestBlogPosts(4);
	const [featuredPost, ...compactPosts] = posts;

	if (!featuredPost) {
		return null;
	}

	return (
		<section className="relative overflow-hidden border-b border-black/10 bg-[#fcfbf9] py-16 sm:py-20 lg:flex lg:min-h-[calc(100svh-4rem)] lg:items-center lg:py-24">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
				<header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-rb-red uppercase">
							<HugeIcon className="size-4" icon={News01Icon} size={16} />
							Insights
						</p>
						<h2 className="mt-4 max-w-3xl text-[2.35rem] font-semibold leading-[0.98] tracking-tight text-rb-black sm:text-5xl lg:text-6xl">
							Discover what&apos;s new with Redtail.
						</h2>
					</div>

					<Link
						className="inline-flex h-14 w-fit items-center justify-center gap-2 rounded-full border border-rb-black/80 px-7 text-sm font-semibold text-rb-black transition hover:-translate-y-0.5 hover:border-rb-red hover:text-rb-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rb-red/35"
						href="/resources/blog"
					>
						View all resources
						<HugeIcon className="size-4" icon={ArrowRight01Icon} size={16} />
					</Link>
				</header>

				<div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 xl:gap-14">
					<FeaturedPost post={featuredPost} />

					<div className="grid gap-7">
						{compactPosts.map((post) => (
							<CompactPost key={post.slug} post={post} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
