import Image from "next/image";
import Link from "next/link";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import { EditorialHero } from "@/components/editorial-hero";
import { HugeIcon } from "@/components/huge-icon";
import { ProductScreenshot } from "@/components/product-visual";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import type { AudiencePageContent } from "@/lib/audience-pages";

export function AudiencePage({ page }: { page: AudiencePageContent }) {
	return (
		<main className="flex-1 overflow-x-clip bg-[#fcfbf9]">
			<EditorialHero
				{...page.hero}
				primaryCta={{ href: "/contact-us", label: "Schedule a Demo" }}
				secondaryCta={{ href: "/our-technology", label: "Our Technology" }}
			/>

			<section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
				<div className="mx-auto max-w-7xl">
					<div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
						<div>
							<p className="text-xs font-semibold tracking-[0.24em] text-rb-red uppercase">Working with Redtail</p>
							<h2 className="mt-4 text-3xl leading-tight font-semibold tracking-[-0.025em] sm:text-5xl">{page.overview.title}</h2>
							<p className="mt-6 text-lg leading-8 text-rb-black/65">{page.overview.description}</p>
						</div>
						{page.overview.productScreenshot ? (
							<ProductScreenshot
								src={page.overview.imageSrc}
								alt={page.overview.imageAlt}
								label="Redtail fleet portal"
								caption={page.overview.imageCaption}
								aspectRatio={1380 / 763}
							/>
						) : (
							<figure className="overflow-hidden rounded-lg border border-rb-black/10 bg-white">
								<div className="relative aspect-[1.5]">
									<Image src={page.overview.imageSrc} alt={page.overview.imageAlt} fill className="object-cover" sizes="(min-width: 1024px) 600px, 92vw" />
								</div>
								<figcaption className="border-t border-rb-black/10 px-5 py-4 text-sm text-rb-black/60">{page.overview.imageCaption}</figcaption>
							</figure>
						)}
					</div>
					<div className="mt-14 grid border-t border-rb-black/15 md:grid-cols-3">
						{page.overview.capabilities.map((capability) => (
							<article key={capability.title} className="border-b border-rb-black/15 py-7 md:border-b-0 md:pr-8 md:not-first:border-l md:not-first:pl-8">
								<h3 className="text-2xl font-semibold tracking-[-0.02em]">{capability.title}</h3>
								<p className="mt-4 text-base leading-7 text-rb-black/65">{capability.description}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="bg-[#0b1118] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24">
				<div className="mx-auto max-w-7xl">
					<header className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
						<div>
							<p className="text-xs font-semibold tracking-[0.24em] text-rb-blue uppercase">Program delivery</p>
							<h2 className="mt-4 text-3xl leading-tight font-semibold tracking-[-0.025em] sm:text-5xl">{page.process.title}</h2>
						</div>
						<p className="text-lg leading-8 text-white/65">{page.process.description}</p>
					</header>
					<div className="mt-12 grid gap-x-12 sm:grid-cols-2">
						{page.process.steps.map((step) => (
							<article key={step.title} className="border-t border-white/20 py-7">
								<h3 className="text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
								<p className="mt-3 max-w-xl text-base leading-7 text-white/65">{step.description}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
				<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.55fr_1fr] lg:gap-16">
					<header>
						<p className="text-xs font-semibold tracking-[0.24em] text-rb-red uppercase">Your questions</p>
						<h2 className="mt-4 text-3xl leading-tight font-semibold tracking-[-0.025em] sm:text-5xl">Frequently asked questions</h2>
					</header>
					<Accordion type="single" collapsible className="rounded-none border-x-0 border-rb-black/15">
						{page.faqs.map((faq) => (
							<AccordionItem key={faq.question} value={faq.question} className="border-rb-black/15">
								<AccordionTrigger className="px-0 py-6 text-base font-semibold focus-visible:ring-2 focus-visible:ring-rb-red focus-visible:ring-offset-4">{faq.question}</AccordionTrigger>
								<AccordionContent className="pb-6 text-base leading-7 text-rb-black/65">{faq.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>

			<section className="border-t border-rb-black/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<h2 className="text-3xl font-semibold tracking-[-0.025em]">Explore Redtail</h2>
					<div className="mt-8 grid gap-6 md:grid-cols-3">
						{page.relatedLinks.map((link) => (
							<Link key={link.href} href={link.href} className="group border-t border-rb-black/20 py-6 transition-colors hover:border-rb-red focus-visible:outline-2 focus-visible:outline-rb-red focus-visible:outline-offset-4">
								<h3 className="flex items-center justify-between gap-3 text-xl font-semibold">{link.title}<HugeIcon icon={ArrowRight01Icon} size={20} className="text-rb-red transition-transform group-hover:translate-x-1" /></h3>
								<p className="mt-3 text-base leading-7 text-rb-black/65">{link.description}</p>
							</Link>
						))}
					</div>
					<div className="mt-12 border-t border-rb-black/15 pt-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
						<div className="max-w-3xl">
							<h2 className="text-3xl leading-tight font-semibold tracking-[-0.025em] sm:text-4xl">{page.cta.title}</h2>
							<p className="mt-4 text-lg leading-8 text-rb-black/65">{page.cta.description}</p>
						</div>
						<Link href="/contact-us" className="mt-7 inline-flex shrink-0 items-center gap-5 rounded-md bg-rb-red px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-rb-black focus-visible:outline-2 focus-visible:outline-rb-red focus-visible:outline-offset-4 lg:mt-0">Schedule a Demo<HugeIcon icon={ArrowRight01Icon} size={20} /></Link>
					</div>
				</div>
			</section>
		</main>
	);
}
