import Image from "next/image";
import Link from "next/link";
import { ArrowRight01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";

import { HugeIcon } from "@/components/huge-icon";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type IndustryHeroContent,
	type IndustryPageContent,
} from "@/lib/industry-pages";
import { cn } from "@/lib/utils";

type IndustryPageProps = {
	page: IndustryPageContent;
};

type IndustryHeroPageProps = {
	page: IndustryHeroContent;
};

function SectionIntro({
	eyebrow,
	title,
	description,
	inverted = false,
}: {
	eyebrow: string;
	title: string;
	description: string;
	inverted?: boolean;
}) {
	return (
		<header className="grid gap-5 lg:grid-cols-[0.7fr_1fr] lg:items-end">
			<div>
				<p
					className={cn(
						"text-xs font-semibold tracking-[0.26em] uppercase",
						inverted ? "text-rb-blue" : "text-rb-red"
					)}
				>
					{eyebrow}
				</p>
				<h2
					className={cn(
						"mt-4 text-[2.25rem] leading-tight font-semibold tracking-[-0.02em] sm:text-5xl",
						inverted ? "text-white" : "text-rb-black"
					)}
				>
					{title}
				</h2>
			</div>
			<p
				className={cn(
					"max-w-3xl text-base leading-7 sm:text-lg sm:leading-8 lg:justify-self-end",
					inverted ? "text-white/64" : "text-rb-black/62"
				)}
			>
				{description}
			</p>
		</header>
	);
}

function HeroVisual({ page }: { page: IndustryHeroContent }) {
	return (
		<div
			aria-label={page.hero.mediaLabel}
			className="group relative min-h-[24rem] overflow-hidden rounded-2xl border border-white/12 bg-white/8 shadow-[0_34px_120px_rgba(0,0,0,0.42)] sm:min-h-[30rem] lg:min-h-[35rem]"
			role="img"
		>
			<Image
				alt={page.hero.imageAlt}
				className="object-cover transition duration-700 group-hover:scale-[1.025]"
				fill
				priority
				sizes="(min-width: 1024px) 48vw, 100vw"
				src={page.hero.imageSrc}
				style={{ objectPosition: page.hero.imagePosition ?? "center" }}
			/>
			<div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(1,1,1,0.48),rgba(1,1,1,0.06)_45%,rgba(1,1,1,0.56)),radial-gradient(circle_at_18%_18%,rgba(207,19,23,0.28),transparent_34%)]" />
			<div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-rb-black/82 to-transparent" />

			<div className="absolute top-5 left-5 rounded-lg border border-white/12 bg-rb-black/48 px-4 py-3 text-white shadow-2xl backdrop-blur-md sm:top-6 sm:left-6">
				<p className="text-xs font-semibold tracking-[0.22em] text-white/58 uppercase">
					Industry fleet
				</p>
				<p className="mt-1 text-sm font-semibold">
					Connected by Redtail telematics
				</p>
			</div>

			<div className="absolute right-5 bottom-5 left-5 grid gap-3 sm:grid-cols-3">
				{page.hero.chips.map((chip) => (
					<div
						className="rounded-lg border border-white/12 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-md"
						key={chip}
					>
						{chip}
					</div>
				))}
			</div>
		</div>
	);
}

function IndustryHero({ page }: IndustryHeroPageProps) {
	return (
		<section className="relative overflow-hidden bg-rb-black px-4 pt-28 pb-14 text-white sm:px-6 sm:pt-32 sm:pb-18 lg:px-8">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(207,19,23,0.22),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(61,187,211,0.2),transparent_30%)]" />
			<div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-center">
				<div>
					<Badge className="bg-white/10 text-white ring-1 ring-white/14">
						{page.hero.eyebrow}
					</Badge>
					<h1 className="mt-6 text-[2.85rem] leading-[0.98] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-7xl">
						{page.hero.title}
					</h1>
					<p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl sm:leading-9">
						{page.hero.description}
					</p>
					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Button asChild className="rounded-md" size="lg">
							<Link href={page.hero.primaryCtaHref}>
								{page.hero.primaryCta}
								<HugeIcon icon={ArrowRight01Icon} data-icon="inline-end" />
							</Link>
						</Button>
						<Button
							asChild
							className="rounded-md border-white/28 bg-white/8 text-white hover:bg-white hover:text-rb-black"
							size="lg"
							variant="outline"
						>
							<Link href={page.hero.secondaryCtaHref}>
								{page.hero.secondaryCta}
							</Link>
						</Button>
					</div>
					<p className="mt-4 text-sm text-white/52">{page.hero.supportingText}</p>
				</div>
				<HeroVisual page={page} />
			</div>
		</section>
	);
}

function TrustedLogos({ page }: IndustryPageProps) {
	return (
		<section className="border-b border-rb-black/10 bg-white px-4 py-8 sm:px-6 lg:px-8">
			<div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
				<p className="max-w-xs text-sm font-semibold tracking-[0.16em] text-rb-black/48 uppercase">
					Trusted across automotive and fleet programs
				</p>
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-5 lg:min-w-[44rem]">
					{page.logos.map((logo) => (
						<div
							className="flex h-16 items-center justify-center rounded-lg border border-rb-black/10 bg-white px-4 shadow-sm"
							key={logo.alt}
						>
							<Image
								alt={logo.alt}
								height={logo.height}
								src={logo.src}
								width={logo.width}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function OutcomesSection({ page }: IndustryPageProps) {
	return (
		<section className="border-b border-rb-black/10 bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<SectionIntro
					description="Car rental teams need fast answers: where vehicles are, how they are being used, whether they are ready for the next rental, and what happened when something goes wrong."
					eyebrow="Modern rental operations"
					title="Visibility from checkout to return"
				/>
				<div className="mt-10 grid gap-4 md:grid-cols-3">
					{page.outcomes.map((outcome) => (
						<Card
							className="rounded-xl border-rb-black/10 bg-white py-0 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
							key={outcome.title}
						>
							<CardHeader className="px-6 pt-6">
								<div className="flex size-12 items-center justify-center rounded-lg bg-rb-black text-white">
									<HugeIcon icon={outcome.icon} size={22} />
								</div>
								<CardTitle className="text-xl leading-tight font-semibold text-rb-black">
									{outcome.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="px-6 pb-6">
								<CardDescription className="text-sm leading-6 text-rb-black/60">
									{outcome.description}
								</CardDescription>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

function SolutionsSection({ page }: IndustryPageProps) {
	return (
		<section className="border-b border-rb-black/10 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-[88rem] rounded-[1.35rem] border border-rb-black/10 bg-[#fdfcfb] px-5 py-12 shadow-[0_18px_70px_rgba(1,1,1,0.055)] sm:px-8 sm:py-16 lg:px-10 lg:py-20">
				<div className="mx-auto max-w-4xl text-center">
					<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
						Solutions
					</p>
					<h2 className="mt-4 text-[2.35rem] leading-[1.02] font-semibold tracking-[-0.03em] text-rb-black sm:text-5xl lg:text-6xl">
						Our Solutions for Car Rental Industry
					</h2>
					<p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-rb-black/58 sm:text-lg sm:leading-8">
						The core capabilities rental operators need are grouped into
						clear, scan-friendly cards so the page feels useful rather than
						copy-heavy.
					</p>
				</div>

				<div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
					{page.solutions.map((solution, index) => (
						<article
							className={cn(
								"group relative rounded-2xl border border-transparent p-5 transition duration-300 hover:-translate-y-1 hover:border-rb-black/10 hover:bg-white hover:shadow-[0_18px_55px_rgba(1,1,1,0.08)]",
								index < 3 && "lg:-mt-2"
							)}
							key={solution.title}
						>
							<div
								className={cn(
									"flex size-14 items-center justify-center rounded-xl border bg-white shadow-[0_10px_28px_rgba(1,1,1,0.08)] transition duration-300 group-hover:scale-105 group-hover:border-rb-red/24 group-hover:text-rb-red",
									index % 3 === 0 && "border-rb-red/18 text-rb-red",
									index % 3 === 1 && "border-rb-black/10 text-rb-black",
									index % 3 === 2 && "border-rb-blue/20 text-rb-blue"
								)}
							>
								<HugeIcon icon={solution.icon} size={24} />
							</div>
							<div className="mt-7 flex items-start justify-between gap-4">
								<h3 className="text-2xl leading-tight font-semibold tracking-[-0.015em] text-rb-black">
									{solution.title}
								</h3>
								<span className="shrink-0 text-xs font-semibold tracking-[0.18em] text-rb-black/24">
									{String(index + 1).padStart(2, "0")}
								</span>
							</div>
							<p className="mt-4 text-base leading-7 text-rb-black/58">
								{solution.description}
							</p>
							<Link
								className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-rb-red transition hover:gap-3 hover:text-rb-black"
								href="/platform-and-apps"
							>
								Learn more
								<HugeIcon icon={ArrowRight01Icon} size={17} />
							</Link>
						</article>
					))}
				</div>

				<div className="mt-12 rounded-2xl border border-rb-black/10 bg-white p-5 sm:p-6 lg:mt-16">
					<div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
						<div>
							<p className="text-xs font-semibold tracking-[0.22em] text-rb-red uppercase">
								Operational fit
							</p>
							<p className="mt-2 text-2xl leading-tight font-semibold text-rb-black">
								Turn rental vehicle data into branch-ready decisions
							</p>
						</div>
						<div className="grid gap-3 sm:grid-cols-3">
							{["Locate", "Protect", "Resolve"].map((item) => (
								<div
									className="rounded-xl border border-rb-black/10 bg-[#fcfbf9] px-4 py-3"
									key={item}
								>
									<p className="text-sm font-semibold text-rb-black">{item}</p>
									<p className="mt-1 text-xs leading-5 text-rb-black/52">
										Faster answers for daily rental operations
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function WorkflowSection({ page }: IndustryPageProps) {
	return (
		<section className="bg-rb-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<SectionIntro
					description="A rental fleet is constantly moving. This structure turns the product story into an operational flow that makes sense to branch teams, fleet managers, claims teams, and executives."
					eyebrow="Operating model"
					inverted
					title="Built around the rental vehicle lifecycle"
				/>
				<div className="mt-12 grid gap-4 lg:grid-cols-4">
					{page.workflow.map((step, index) => (
						<div
							className="rounded-xl border border-white/12 bg-white/6 p-6 backdrop-blur-sm"
							key={step.title}
						>
							<div className="flex items-center justify-between gap-4">
								<div className="flex size-12 items-center justify-center rounded-lg bg-white text-rb-black">
									<HugeIcon icon={step.icon} size={22} />
								</div>
								<span className="text-xs font-semibold text-white/42">
									{String(index + 1).padStart(2, "0")}
								</span>
							</div>
							<p className="mt-6 text-xs font-semibold tracking-[0.22em] text-rb-blue uppercase">
								{step.label}
							</p>
							<h3 className="mt-3 text-xl leading-tight font-semibold">
								{step.title}
							</h3>
							<p className="mt-4 text-sm leading-6 text-white/62">
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function PlatformFitSection() {
	const bullets = [
		"Monitor location, activity, and exceptions from one dashboard",
		"Share useful data with branch, operations, and claims teams",
		"Support professional or self-fit hardware deployments",
		"Use mobile apps for faster field access and install workflows",
	];

	return (
		<section className="border-b border-rb-black/10 bg-rb-light-blue px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1fr] lg:items-center">
				<div>
					<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
						Platform fit
					</p>
					<h2 className="mt-4 text-[2.25rem] leading-tight font-semibold tracking-[-0.02em] text-rb-black sm:text-5xl">
						A connected view for every rental team
					</h2>
					<p className="mt-5 text-base leading-7 text-rb-black/64 sm:text-lg sm:leading-8">
						Redtail brings devices, data, alerts, and apps together so rental
						operators can understand vehicle movement, condition, and risk
						without stitching tools together manually.
					</p>
					<div className="mt-8 grid gap-3 sm:grid-cols-2">
						{bullets.map((bullet) => (
							<div className="flex items-start gap-3" key={bullet}>
								<HugeIcon
									className="mt-0.5 text-rb-red"
									icon={CheckmarkCircle02Icon}
									size={18}
								/>
								<p className="text-sm leading-6 text-rb-black/66">{bullet}</p>
							</div>
						))}
					</div>
				</div>
				<div className="relative min-h-[28rem] overflow-hidden rounded-2xl bg-rb-black p-5 text-white shadow-[0_24px_80px_rgba(1,1,1,0.18)]">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(207,19,23,0.28),transparent_28%),radial-gradient(circle_at_78%_72%,rgba(61,187,211,0.24),transparent_30%)]" />
					<div className="relative rounded-xl border border-white/12 bg-white/8 p-5">
						<p className="text-xs font-semibold tracking-[0.22em] text-white/46 uppercase">
							Rental fleet snapshot
						</p>
						<div className="mt-5 grid gap-3 sm:grid-cols-3">
							{["Available", "In rental", "Exceptions"].map((label, index) => (
								<div className="rounded-lg bg-white p-4 text-rb-black" key={label}>
									<p className="text-xs text-rb-black/48">{label}</p>
									<p className="mt-2 text-2xl font-semibold">
										{["128", "342", "7"][index]}
									</p>
								</div>
							))}
						</div>
						<div className="mt-5 flex flex-col gap-3">
							{[
								"High-speed alert reviewed",
								"Vehicle returned outside branch geofence",
								"Maintenance triggered by mileage",
							].map((item) => (
								<div
									className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/8 px-4 py-3"
									key={item}
								>
									<span className="text-sm text-white/72">{item}</span>
									<span className="size-2 rounded-full bg-rb-green" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function IndustryFaqSection({ page }: IndustryPageProps) {
	return (
		<section className="border-b border-rb-black/10 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.74fr_1fr] lg:items-start">
				<div className="lg:sticky lg:top-28">
					<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
						FAQ
					</p>
					<h2 className="mt-4 text-[2.25rem] leading-tight font-semibold tracking-[-0.02em] text-rb-black sm:text-5xl">
						Commonly Asked Questions
					</h2>
					<p className="mt-5 max-w-md text-base leading-7 text-rb-black/62">
						Everything you need to know about the platform, installation, and
						support.
					</p>
					<Button asChild className="mt-7 rounded-md" size="lg">
						<Link href="/contact-us">
							Talk to our team
							<HugeIcon icon={ArrowRight01Icon} data-icon="inline-end" />
						</Link>
					</Button>
				</div>
				<Accordion
					className="rounded-xl border-rb-black/10 bg-white shadow-sm"
					defaultValue="item-0"
					type="single"
					collapsible
				>
					{page.faqs.map((faq, index) => (
						<AccordionItem key={faq.question} value={`item-${index}`}>
							<AccordionTrigger className="px-5 py-5 text-base font-semibold text-rb-black hover:no-underline sm:px-6">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="px-5 text-sm leading-7 text-rb-black/62 sm:px-6 sm:text-base">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}

function IndustryCta({ page }: IndustryPageProps) {
	return (
		<section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
			<div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-rb-red px-6 py-10 text-center text-white shadow-[0_24px_80px_rgba(207,19,23,0.2)] sm:px-10">
				<p className="text-xs font-semibold tracking-[0.26em] text-white/70 uppercase">
					Next step
				</p>
				<h2 className="mx-auto mt-4 max-w-3xl text-3xl leading-tight font-semibold tracking-[-0.02em] sm:text-5xl">
					Build a better-connected rental fleet with Redtail
				</h2>
				<p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/78">
					Start with the vehicle data you need most, then scale into alerts,
					maintenance, crash insight, and fleet-wide reporting.
				</p>
				<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
					<Button
						asChild
						className="rounded-md border-white bg-white text-rb-red hover:border-rb-black hover:bg-rb-black hover:text-white"
						size="lg"
					>
						<Link href={page.hero.primaryCtaHref}>{page.hero.primaryCta}</Link>
					</Button>
					<Button
						asChild
						className="rounded-md border-white/35 bg-transparent text-white hover:bg-white hover:text-rb-red"
						size="lg"
						variant="outline"
					>
						<Link href={page.hero.secondaryCtaHref}>Contact sales</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}

export function IndustryPage({ page }: IndustryPageProps) {
	return (
		<main className="bg-white">
			<IndustryHero page={page} />
			<TrustedLogos page={page} />
			<OutcomesSection page={page} />
			<SolutionsSection page={page} />
			<WorkflowSection page={page} />
			<PlatformFitSection />
			<IndustryFaqSection page={page} />
			<IndustryCta page={page} />
		</main>
	);
}

export function IndustryHeroOnlyPage({ page }: IndustryHeroPageProps) {
	return (
		<main className="bg-white">
			<IndustryHero page={page} />
		</main>
	);
}
