import Image from "next/image";
import Link from "next/link";
import { ArrowRight01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";

import { HugeIcon } from "@/components/huge-icon";
import { EditorialHero } from "@/components/editorial-hero";
import { ProductScreenshot } from "@/components/product-visual";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
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
import {
	getIndustrySectorCopy,
	type IndustrySectorCopy,
} from "@/lib/industry-sector-copy";
import { cn } from "@/lib/utils";

type IndustryPageProps = {
	page: IndustryPageContent;
};

type IndustryHeroPageProps = {
	page: IndustryHeroContent;
};

const sharedIndustryCapabilities = [
	{
		description:
			"Review location, alerts, trip history, maintenance, and reporting capabilities for connected fleet operations.",
		href: "/solutions/fleet-management",
		title: "Fleet management",
	},
	{
		description:
			"Compare professional-fit and self-fit hardware options for different vehicles, assets, and deployment models.",
		href: "/solutions/devices",
		title: "Devices",
	},
	{
		description:
			"See how web portals and mobile apps bring device data, operational views, and installation workflows together.",
		href: "/platform-and-apps",
		title: "Platform and apps",
	},
] as const;

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

function IndustryHero({ page }: IndustryHeroPageProps) {
	const government = page.slug === "government";
	return (
		<EditorialHero
			eyebrow={page.hero.eyebrow}
			title={page.hero.title}
			description={page.hero.description}
			imageSrc={government ? undefined : page.hero.imageSrc}
			imageAlt={page.hero.imageAlt}
			imagePosition={page.hero.imagePosition}
			primaryCta={{ href: page.hero.primaryCtaHref, label: page.hero.primaryCta }}
			secondaryCta={{ href: page.hero.secondaryCtaHref, label: page.hero.secondaryCta }}
			proof={page.hero.chips.map((label) => ({ label }))}
			visual={government ? <ProductScreenshot src="/platform-screenshots/journey-showcase.jpg" alt="Redtail journey replay with location, trip history, and recorded events" label="Redtail platform" caption="Journey Showcase" eager aspectRatio={2.26} /> : undefined}
		>
			<p className="mt-5 text-sm text-white/65">{page.hero.supportingText}</p>
			<div className="mt-8 border-l border-white/25 pl-4 text-xs leading-6 text-white/65">
				<p className="font-medium text-white/90">Industry fleet</p>
				<p>Connected by Redtail telematics</p>
			</div>
		</EditorialHero>
	);
}

function IndustryOverviewSections({ page }: IndustryHeroPageProps) {
	return (
		<>
			<section className="border-b border-rb-black/10 bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
				<div className="mx-auto max-w-7xl">
					<SectionIntro
						description="Start with the operating questions that matter to your team, then choose the devices, data, and workflows that fit your vehicles and assets."
						eyebrow="Operational fit"
						title="Connect industry priorities to the telematics stack"
					/>

					<div className="mt-10 grid gap-4 md:grid-cols-3">
						{page.hero.chips.map((priority) => (
							<div
								className="flex items-start gap-3 rounded-xl border border-rb-black/10 bg-white p-5 shadow-sm"
								key={priority}
							>
								<HugeIcon
									className="mt-0.5 shrink-0 text-rb-red"
									icon={CheckmarkCircle02Icon}
									size={20}
								/>
								<div>
									<p className="font-semibold text-rb-black">{priority}</p>
									<p className="mt-2 text-sm leading-6 text-rb-black/58">
										Discuss the required data, response workflow, and deployment
										constraints with the Redtail team.
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
				<div className="mx-auto max-w-7xl">
					<div className="mx-auto max-w-3xl text-center">
						<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
							Explore Redtail
						</p>
						<h2 className="mt-4 text-[2.35rem] leading-tight font-semibold tracking-[-0.02em] text-rb-black sm:text-5xl">
							Build from devices to daily operations
						</h2>
						<p className="mt-5 text-base leading-7 text-rb-black/62 sm:text-lg sm:leading-8">
							Review the existing product areas, then contact Redtail to confirm
							technical compatibility and the scope of a proposed deployment.
						</p>
					</div>

					<div className="mt-10 grid gap-5 md:grid-cols-3">
						{sharedIndustryCapabilities.map((capability) => (
							<Card
								className="border-rb-black/10 bg-[#fcfbf9] py-0 shadow-sm"
								key={capability.href}
							>
								<CardHeader className="px-6 pt-6">
									<CardTitle className="text-2xl text-rb-black">
										{capability.title}
									</CardTitle>
									<CardDescription className="text-base leading-7 text-rb-black/60">
										{capability.description}
									</CardDescription>
								</CardHeader>
								<CardContent className="px-6 pb-6">
									<Link
										className="inline-flex items-center gap-2 text-sm font-semibold text-rb-red transition hover:gap-3 hover:text-rb-black"
										href={capability.href}
									>
										Explore {capability.title.toLowerCase()}
										<HugeIcon icon={ArrowRight01Icon} size={17} />
									</Link>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className="bg-[#fcfbf9] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
				<div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-rb-black px-6 py-10 text-center text-white sm:px-10 sm:py-14">
					<p className="text-xs font-semibold tracking-[0.26em] text-rb-blue uppercase">
						Next step
					</p>
					<h2 className="mx-auto mt-4 max-w-3xl text-3xl leading-tight font-semibold sm:text-5xl">
						Confirm the right fit for your operation
					</h2>
					<p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/68">
						Share your fleet, assets, operating priorities, and integration
						requirements so the Redtail team can recommend an appropriate scope.
					</p>
					<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
						<Button asChild size="lg">
							<Link href={page.hero.primaryCtaHref}>{page.hero.primaryCta}</Link>
						</Button>
						<Button
							asChild
							className="border-white/30 bg-white/8 text-white hover:bg-white hover:text-rb-black"
							size="lg"
							variant="outline"
						>
							<Link href={page.hero.secondaryCtaHref}>
								{page.hero.secondaryCta}
							</Link>
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}

function IndustrySectorSolutions({ sector }: { sector: IndustrySectorCopy }) {
	return (
		<section className="border-b border-rb-black/10 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-[88rem] rounded-[1.35rem] border border-rb-black/10 bg-[#fdfcfb] px-5 py-12 shadow-[0_18px_70px_rgba(1,1,1,0.055)] sm:px-8 sm:py-16 lg:px-10 lg:py-20">
				<div className="mx-auto max-w-4xl text-center">
					<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">Solutions</p>
					<h2 className="mt-4 text-[2.35rem] leading-[1.02] font-semibold tracking-[-0.03em] text-rb-black sm:text-5xl lg:text-6xl">
						Our Solutions for {sector.label} Fleets
					</h2>
					<p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-rb-black/58 sm:text-lg sm:leading-8">{sector.description}</p>
				</div>
				<div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
					{sector.solutions.map((solution) => (
						<article className="group rounded-2xl border border-transparent p-5 transition duration-300 hover:-translate-y-1 hover:border-rb-black/10 hover:bg-white hover:shadow-[0_18px_55px_rgba(1,1,1,0.08)]" key={solution.title}>
							<div className="flex size-14 items-center justify-center rounded-xl border border-rb-red/18 bg-white text-rb-red shadow-[0_10px_28px_rgba(1,1,1,0.08)]">
								<HugeIcon icon={solution.icon} size={24} />
							</div>
							<h3 className="mt-7 text-2xl leading-tight font-semibold tracking-[-0.015em] text-rb-black">{solution.title}</h3>
							<p className="mt-4 text-base leading-7 text-rb-black/58">{solution.description}</p>
							<Link className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-rb-red transition hover:gap-3 hover:text-rb-black" href={solution.href ?? "/platform-and-apps"}>
								{solution.linkLabel ?? "Learn more"}
								<HugeIcon icon={ArrowRight01Icon} size={17} />
							</Link>
						</article>
					))}
				</div>
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
							<div
								className="relative max-w-full"
								style={{ width: logo.width, height: logo.height }}
							>
								<Image
									alt={logo.alt}
									className={logo.src === "/clients/toyota.svg" ? "object-cover" : "object-contain"}
									fill
									sizes={`${logo.width}px`}
									src={logo.src}
								/>
							</div>
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
						Connect location, driving behaviour, incident data, and maintenance
						to the decisions your rental teams make every day.
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
							</div>
							<p className="mt-4 text-base leading-7 text-rb-black/58">
								{solution.description}
							</p>
							<Link
								className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-rb-red transition hover:gap-3 hover:text-rb-black"
								href={solution.href ?? "/platform-and-apps"}
							>
								{solution.linkLabel ?? "Learn more"}
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
					description="Connect vehicle data to every stage of rental operations, from preparing a vehicle for hire to reviewing returns and resolving incidents."
					eyebrow="Operating model"
					inverted
					title="Built around the rental vehicle lifecycle"
				/>
				<div className="mt-12 grid gap-4 lg:grid-cols-4">
					{page.workflow.map((step) => (
						<div
							className="rounded-xl border border-white/12 bg-white/6 p-6 backdrop-blur-sm"
							key={step.title}
						>
							<div className="flex items-center justify-between gap-4">
								<div className="flex size-12 items-center justify-center rounded-lg bg-white text-rb-black">
									<HugeIcon icon={step.icon} size={22} />
								</div>
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
				<div className="space-y-5">
					<ProductScreenshot
						src="/platform-screenshots/journey-showcase.jpg"
						alt="Actual Redtail Journey Showcase with a mapped route, speed, stops, and events"
						label="Vehicle movement"
						caption="Journey replay connects vehicle movement with the data behind the trip."
						aspectRatio={2.26}
					/>
					<ProductScreenshot
						src="/platform-screenshots/current/maintenance-calendar.jpg"
						alt="Current Redtail vehicle maintenance calendar with upcoming and history tabs"
						label="Fleet maintenance"
						caption="Review vehicle maintenance in the current Redtail web portal."
						aspectRatio={1338 / 483}
					/>
				</div>
			</div>
		</section>
	);
}

function RentalCircuitSection() {
	return (
		<section className="scroll-mt-24 border-b border-rb-black/10 bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24" id="rental-circuit-driving">
			<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
				<div>
					<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">Rental vehicle use</p>
					<h2 className="mt-4 text-[2.25rem] leading-tight font-semibold tracking-[-0.02em] text-rb-black sm:text-5xl">Review circuit driving</h2>
					<p className="mt-5 text-base leading-7 text-rb-black/64 sm:text-lg sm:leading-8">Redtail&apos;s circuit workspace brings venue, session, vehicle, and lap records together. Rental teams can use this context to investigate track use and review the evidence behind a vehicle&apos;s activity.</p>
					<Link className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-rb-red hover:underline" href="/platform-and-apps#circuit-intelligence">
						Explore circuit analysis
						<HugeIcon icon={ArrowRight01Icon} size={17} />
					</Link>
				</div>
				<div className="grid gap-4 sm:grid-cols-[1.35fr_1fr]">
					<ProductScreenshot src="/platform-screenshots/current/circuit-directory.jpg" alt="Current Redtail circuit directory with venue, session, vehicle and lap records" label="Circuit sessions" caption="Venue and vehicle activity in the current Redtail web portal." aspectRatio={1324 / 500} />
					<ProductScreenshot src="/platform-screenshots/circuit-map.jpg" alt="Actual Redtail circuit map used for lap replay and comparison" label="Circuit map" caption="Lap replay and comparison in the Redtail portal." aspectRatio={1.307} />
					<p className="text-xs leading-5 text-rb-black/58 sm:col-span-2">Available analysis depends on the device and service setup. Circuit lap times are GPS-derived and approximate.</p>
				</div>
			</div>
		</section>
	);
}

function IndustryFaqSection({ page }: { page: Pick<IndustryPageContent, "faqs"> }) {
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
			<RentalCircuitSection />
			<WorkflowSection page={page} />
			<PlatformFitSection />
			<IndustryFaqSection page={page} />
			<IndustryCta page={page} />
		</main>
	);
}

export function IndustryHeroOnlyPage({ page }: IndustryHeroPageProps) {
	const sector = getIndustrySectorCopy(page.slug);
	return (
		<main className="bg-white">
			<IndustryHero page={page} />
			{sector ? <><IndustrySectorSolutions sector={sector} /><IndustryFaqSection page={sector} /></> : null}
			<IndustryOverviewSections page={page} />
		</main>
	);
}
