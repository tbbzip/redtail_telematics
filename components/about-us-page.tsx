import Image from "next/image";
import Link from "next/link";
import {
	AiInnovation01Icon,
	ArrowRight01Icon,
	ArrowUpRight01Icon,
	Building02Icon,
	Call02Icon,
	CheckmarkCircle02Icon,
	ComputerChartUpIcon,
	CustomerService02Icon,
	Database02Icon,
	DeviceAccessIcon,
	Location01Icon,
	ShieldKeyIcon,
} from "@hugeicons/core-free-icons";
import { type IconSvgElement } from "@hugeicons/react";

import { HugeIcon } from "@/components/huge-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const heroStats = [
	{
		value: "6M+",
		label: "Devices delivered worldwide",
	},
	{
		value: "30B+",
		label: "Miles processed and analyzed",
	},
	{
		value: "30+ years",
		label: "Telematics expertise",
	},
];

const whatWeDo = [
	{
		title: "Devices and hardware",
		description:
			"OEM-grade devices engineered for reliability with install quality and health monitoring.",
		icon: DeviceAccessIcon,
	},
	{
		title: "Data platform and analytics",
		description:
			"Actionable intelligence from data capture, analytics, and dashboards built for operations.",
		icon: Database02Icon,
	},
	{
		title: "Apps and integrations",
		description:
			"Web and mobile experiences plus flexible integrations that fit your workflow.",
		icon: ComputerChartUpIcon,
	},
	{
		title: "Safety and risk services",
		description:
			"Risk assessment, crash insight, and compliance tools designed to protect teams.",
		icon: ShieldKeyIcon,
	},
] satisfies {
	title: string;
	description: string;
	icon: IconSvgElement;
}[];

const values = [
	{
		title: "Innovation",
		description:
			"We push telematics forward with new ideas, better data, and practical outcomes.",
		icon: AiInnovation01Icon,
	},
	{
		title: "Quality",
		description:
			"From devices to data, we build dependable systems that scale with confidence.",
		icon: CheckmarkCircle02Icon,
	},
	{
		title: "Customer focus",
		description:
			"We listen closely and build solutions that directly improve your business.",
		icon: CustomerService02Icon,
	},
	{
		title: "Integrity",
		description:
			"We operate with transparency, accountability, and security at every level.",
		icon: ShieldKeyIcon,
	},
] satisfies {
	title: string;
	description: string;
	icon: IconSvgElement;
}[];

const offices = [
	{
		title: "UK HQ",
		address:
			"Plextek Building, London Road, Great Chesterford, Essex, CB10 1NY, UK",
		phone: "+44 1799 533300",
		phoneHref: "tel:+441799533300",
		mapHref:
			"https://www.google.com/maps/search/?api=1&query=Plextek+Building+London+Road+Great+Chesterford+Essex+CB10+1NY+UK",
	},
	{
		title: "San Diego",
		address: "1420 Kettner Blvd Suite 100, San Diego, CA 92101, United States",
		phone: "+1 619-546-9061",
		phoneHref: "tel:+16195469061",
		mapHref:
			"https://www.google.com/maps/search/?api=1&query=1420+Kettner+Blvd+Suite+100+San+Diego+CA+92101+United+States",
	},
];

function SectionHeading({
	eyebrow,
	title,
	intro,
	invert = false,
}: {
	eyebrow: string;
	title: string;
	intro?: string;
	invert?: boolean;
}) {
	return (
		<header className="max-w-3xl">
			<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
				{eyebrow}
			</p>
			<h2
				className={
					invert
						? "mt-4 text-[2.35rem] font-semibold leading-tight text-white sm:text-5xl"
						: "mt-4 text-[2.35rem] font-semibold leading-tight text-rb-black sm:text-5xl"
				}
			>
				{title}
			</h2>
			{intro ? (
				<p
					className={
						invert
							? "mt-5 text-base leading-7 text-white/62 sm:text-lg sm:leading-8"
							: "mt-5 text-base leading-7 text-rb-black/60 sm:text-lg sm:leading-8"
					}
				>
					{intro}
				</p>
			) : null}
		</header>
	);
}

export function AboutUsHero() {
	return (
		<section className="relative isolate min-h-[94svh] overflow-hidden rounded-b-3xl bg-rb-black text-white">
			<Image
				alt="Redtail Telematics headquarters"
				className="object-cover object-center"
				fill
				priority
				sizes="100vw"
				src="/about/redtail_telematics_hq.jpg"
			/>
			<div className="absolute inset-0 bg-black/58" />
			<div className="absolute inset-0 bg-linear-to-r from-black/88 via-black/66 to-black/24" />
			<div className="absolute inset-0 bg-linear-to-t from-black/56 via-transparent to-black/24" />

			<div className="relative mx-auto grid min-h-[94svh] max-w-7xl gap-10 px-4 pt-24 pb-12 sm:px-6 sm:pt-32 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:pt-28">
				<div className="max-w-3xl">
					<div className="inline-flex items-center gap-3">
						<span className="flex size-10 items-center justify-center rounded-md bg-rb-red text-white shadow-[0_16px_34px_rgba(207,19,23,0.32)]">
							<HugeIcon icon={Building02Icon} />
						</span>
						<p className="text-xs font-semibold tracking-[0.28em] text-white/78 uppercase">
							About Redtail
						</p>
					</div>

					<h1 className="mt-7 max-w-3xl text-[2.6rem] leading-[1.02] font-semibold text-balance text-white sm:text-5xl sm:leading-tight lg:text-[3.65rem]">
						Telematics built on quality, insight, and 30+ years of engineering
					</h1>

					<p className="mt-5 max-w-2xl text-sm leading-6 text-white/72 sm:text-lg sm:leading-8">
						REDTAIL delivers full-stack telematics solutions that connect fleets
						to real-time data, safer operations, and measurable ROI.
					</p>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Button asChild className="w-full sm:w-auto" size="lg">
							<Link href="/contact-us">
								Talk to our team
								<HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
							</Link>
						</Button>
						<Button
							asChild
							className="w-full border-white/32 bg-white/8 text-white hover:border-white/48 hover:bg-white/14 hover:text-white sm:w-auto"
							size="lg"
							variant="outline"
						>
							<Link href="/platform-and-apps">
								Explore the platform
								<HugeIcon data-icon="inline-end" icon={ArrowUpRight01Icon} />
							</Link>
						</Button>
					</div>
				</div>

				<div className="grid gap-3 self-end lg:max-w-lg lg:justify-self-end">
					{heroStats.map((stat) => (
						<div
							className="rounded-2xl border border-white/14 bg-white/9 p-5 backdrop-blur-md"
							key={stat.label}
						>
							<p className="text-4xl font-semibold leading-none text-white">
								{stat.value}
							</p>
							<p className="mt-2 text-sm leading-6 text-white/60">
								{stat.label}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export function AboutStorySection() {
	return (
		<section className="border-b border-black/10 bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
				<div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-[0_24px_70px_rgba(1,1,1,0.08)]">
					<div className="relative aspect-[1.28] overflow-hidden rounded-xl bg-rb-black">
						<Image
							alt="Redtail telematics team and technology"
							className="object-cover"
							fill
							sizes="(max-width: 1024px) 100vw, 560px"
							src="/navigation/featured-company.png"
						/>
						<div className="absolute inset-0 bg-linear-to-t from-black/58 via-transparent to-transparent" />
						<div className="absolute right-5 bottom-5 left-5 rounded-2xl border border-white/16 bg-rb-black/72 p-5 text-white backdrop-blur-md">
							<p className="text-xs font-semibold tracking-[0.2em] text-rb-red uppercase">
								Cambridge Technology Cluster
							</p>
							<p className="mt-2 text-lg font-semibold">
								Device, app, data, and decision-making quality in one stack
							</p>
						</div>
					</div>
				</div>

				<div>
					<SectionHeading
						eyebrow="Our story"
						title="Built in Cambridge. Trusted worldwide."
					/>
					<div className="mt-7 flex flex-col gap-5 text-base leading-7 text-rb-black/64 sm:text-lg sm:leading-8">
						<p>
							Born in the Cambridge Technology Cluster, for over 30 years
							companies have relied on us to innovate in stolen vehicle tracking,
							usage-based insurance, and fleet management.
						</p>
						<p>
							Our customer relationships are fueled by listening, responsiveness,
							and a relentless focus on delivering solutions that make a
							measurable difference to your business.
						</p>
						<p>
							We have a quality DNA that informs every layer of our stack, from
							device to app, data to decision-making.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export function WhatWeDoSection() {
	return (
		<section className="border-b border-black/10 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
					<SectionHeading
						eyebrow="What we do"
						intro="Devices, data, and apps designed together for faster deployments, clearer insights, and more confident decisions."
						title="A full-stack telematics partner"
					/>
				</div>

				<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{whatWeDo.map((item, index) => (
						<Card
							className="relative isolate border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0 transition duration-300 hover:-translate-y-1 hover:border-rb-red/28 hover:shadow-[0_24px_70px_rgba(1,1,1,0.1)]"
							key={item.title}
						>
							<div
								aria-hidden="true"
								className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-rb-peach/65 to-transparent"
							/>
							<CardHeader className="relative gap-5 px-6 pt-6">
								<div className="flex items-start justify-between gap-4">
									<div className="flex size-12 items-center justify-center rounded-xl bg-rb-black text-white">
										<HugeIcon icon={item.icon} size={22} />
									</div>
									<Badge
										className="border-black/10 bg-white/70 text-rb-black/54"
										variant="outline"
									>
										{String(index + 1).padStart(2, "0")}
									</Badge>
								</div>
								<CardTitle className="text-xl font-semibold leading-tight text-rb-black">
									{item.title}
								</CardTitle>
								<CardDescription className="text-sm leading-6 text-rb-black/58 sm:text-base sm:leading-7">
									{item.description}
								</CardDescription>
							</CardHeader>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

export function ValuesSection() {
	return (
		<section className="relative overflow-hidden bg-rb-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(207,19,23,0.24),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.1),transparent_24%)]"
			/>
			<div className="relative mx-auto max-w-7xl">
				<div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
					<SectionHeading
						eyebrow="Our values"
						invert
						title="The principles behind every deployment"
					/>

					<div className="grid gap-4 sm:grid-cols-2">
						{values.map((value) => (
							<Card
								className="border-white/10 bg-white/[0.045] py-0 text-white shadow-none ring-0"
								key={value.title}
							>
								<CardHeader className="gap-5 px-6 pt-6">
									<div className="flex size-12 items-center justify-center rounded-xl bg-rb-red text-white">
										<HugeIcon icon={value.icon} size={22} />
									</div>
									<CardTitle className="text-2xl font-semibold text-white">
										{value.title}
									</CardTitle>
									<CardDescription className="text-sm leading-6 text-white/62 sm:text-base sm:leading-7">
										{value.description}
									</CardDescription>
								</CardHeader>
							</Card>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export function GlobalPresenceSection() {
	return (
		<section className="border-b border-black/10 bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
					<SectionHeading
						eyebrow="Global presence"
						intro="We support fleets worldwide with teams in key regions to ensure faster responses and localized expertise."
						title="Teams based where our customers operate"
					/>
				</div>

				<div className="mt-10 grid gap-5 lg:grid-cols-2">
					{offices.map((office) => (
						<Card
							className="relative overflow-hidden border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0"
							key={office.title}
						>
							<div
								aria-hidden="true"
								className="absolute inset-0 opacity-[0.11] [background-image:linear-gradient(120deg,rgba(1,1,1,0.34)_1px,transparent_1px),linear-gradient(30deg,rgba(207,19,23,0.34)_1px,transparent_1px)] [background-size:34px_34px,48px_48px]"
							/>
							<CardHeader className="relative gap-5 px-6 pt-6 sm:px-7 sm:pt-7">
								<div className="flex items-start justify-between gap-4">
									<div className="flex size-12 items-center justify-center rounded-xl bg-rb-red text-white">
										<HugeIcon icon={Location01Icon} size={22} />
									</div>
									<Badge className="bg-rb-black text-white">Redtail</Badge>
								</div>
								<CardTitle className="text-3xl font-semibold text-rb-black">
									{office.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="relative px-6 pb-6 sm:px-7 sm:pb-7">
								<div className="grid gap-4 text-sm leading-6 text-rb-black/64 sm:text-base sm:leading-7">
									<div className="flex items-start gap-3">
										<HugeIcon
											className="mt-1 shrink-0 text-rb-red"
											icon={Location01Icon}
											size={18}
										/>
										<p>{office.address}</p>
									</div>
									<div className="flex items-start gap-3">
										<HugeIcon
											className="mt-1 shrink-0 text-rb-red"
											icon={Call02Icon}
											size={18}
										/>
										<a
											className="font-semibold text-rb-black transition-colors hover:text-rb-red"
											href={office.phoneHref}
										>
											{office.phone}
										</a>
									</div>
								</div>
								<a
									className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-rb-red transition-colors hover:text-rb-black"
									href={office.mapHref}
									rel="noreferrer"
									target="_blank"
								>
									View on map
									<HugeIcon icon={ArrowUpRight01Icon} size={15} />
								</a>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

export function AboutUsPageSections() {
	return (
		<>
			<AboutUsHero />
			<AboutStorySection />
			<WhatWeDoSection />
			<ValuesSection />
			<GlobalPresenceSection />
		</>
	);
}
