import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
	Alert02Icon,
	AndroidIcon,
	AppStoreIcon,
	ArrowRight01Icon,
	ArrowUpRight01Icon,
	BellDotIcon,
	CarSignalIcon,
	CheckmarkCircle02Icon,
	ComputerChartUpIcon,
	DashboardSquare03Icon,
	DeliveryTruck01Icon,
	FileChartColumnIcon,
	GpsSignal01Icon,
	MapPinIcon,
	MapsLocation01Icon,
	PlayStoreIcon,
	Route03Icon,
	ShieldKeyIcon,
	SmartPhone01Icon,
	StarIcon,
	Wrench01Icon,
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
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

const trustedLogos = [
	{ src: "/clients/ford.svg", alt: "Ford", width: 118, height: 36 },
	{ src: "/clients/admiral.svg", alt: "Admiral", width: 136, height: 36 },
	{ src: "/clients/jaguar.svg", alt: "Jaguar", width: 88, height: 36 },
	{ src: "/clients/lojack.svg", alt: "Lo-Jack", width: 124, height: 36 },
	{ src: "/clients/lr.svg", alt: "Land Rover", width: 118, height: 36 },
	{ src: "/clients/fujitsu.svg", alt: "Fujitsu", width: 128, height: 36 },
];

const valueChips = [
	"Real-time fleet visibility",
	"Apps tuned for installers + managers",
	"Satellite + street-level context",
];

const outcomes = [
	{
		title: "Instant fleet visibility",
		description:
			"See every vehicle, asset, and driver in a single live view with context that updates in seconds.",
		tags: ["Live map + status", "Trip replay", "Geofence alerts"],
		icon: MapsLocation01Icon,
	},
	{
		title: "Safer driving habits",
		description:
			"Identify risky behavior early and support coaching with clear, shareable evidence.",
		tags: ["Driver scorecards", "Harsh event alerts", "Speed trends"],
		icon: ShieldKeyIcon,
	},
	{
		title: "Health + uptime confidence",
		description:
			"Monitor device health and maintenance signals to keep your fleet available and reliable.",
		tags: ["Install quality checks", "Offline device alerts", "Maintenance reminders"],
		icon: Wrench01Icon,
	},
	{
		title: "Faster operational decisions",
		description:
			"Bring reporting, alerts, and insights together so every team sees the same data.",
		tags: ["Custom reporting", "Export-ready data", "Role-based views"],
		icon: ComputerChartUpIcon,
	},
] satisfies {
	title: string;
	description: string;
	tags: string[];
	icon: IconSvgElement;
}[];

const platformFeatures = [
	{
		title: "Trip Replay - Live Map",
		description: "Scrub any journey to audit speed, stops and driver events.",
		icon: Route03Icon,
		visual: "map",
		bullets: [
			"Journey replay with speed & heading",
			"Speed, accel & brake heat-map",
			"High-speed & harsh-event flags",
			"Idle hot-spots",
			"Shareable trip",
		],
	},
	{
		title: "OBD Plug or Hardwired",
		description: "Connect your device and stream your data in seconds.",
		icon: GpsSignal01Icon,
		visual: "device",
		bullets: [
			"Redtail Installer App",
			"Intelligent power management - saves battery",
			"Insurance & regulatory compliant",
			"Supports latest 4G networks",
			"Warranty included",
		],
	},
	{
		title: "Live Fleet Status",
		description: "Know who's moving, idling or offline at a glance.",
		icon: DashboardSquare03Icon,
		visual: "status",
		bullets: [
			"Colour-coded status tiles",
			"Last-seen, speed & heading",
			"Maintenance info",
			"Battery indicators",
			"Fleet-wide utilisation KPIs",
			"Sort & filter by tag/group",
		],
	},
	{
		title: "Smart Geofencing",
		description: "Draw, copy or resize zones - in the office or on mobile.",
		icon: MapPinIcon,
		visual: "geofence",
		bullets: [
			"Polygon, radius & route zones",
			"Schedule-based enter/exit alerts",
			"Chain actions - SMS, email",
			"Live map with satellite view",
			"Geofence mapping tool",
		],
	},
] satisfies {
	title: string;
	description: string;
	icon: IconSvgElement;
	visual: "map" | "device" | "status" | "geofence";
	bullets: string[];
}[];

const trackingCards = [
	{
		title: "Track Driver Behavior",
		tag: "Drivers & safety",
		description:
			"Understand how every vehicle is driven so you can reduce risk, support coaching and cut avoidable fuel spend.",
		chips: ["Harsh events", "Speeding trends", "Coaching insights"],
		button: "Explore behaviour tracking",
		counter: "01 / 03",
		icon: CarSignalIcon,
	},
	{
		title: "Asset Management",
		tag: "Vehicles & equipment",
		description:
			"Keep tabs on installs, health and utilisation across vans, plant and specialist equipment in one place.",
		chips: ["Install quality", "Battery health", "Offline devices"],
		button: "Discover asset visibility",
		counter: "02 / 03",
		icon: DeliveryTruck01Icon,
	},
	{
		title: "Geofencing & Alerts",
		tag: "Sites & routes",
		description:
			"Draw zones around depots, customer sites and routes. Trigger alerts on movement that matters to your operations.",
		chips: ["Depot zones", "Route geofences", "Real-time alerts"],
		button: "See geofencing options",
		counter: "03 / 03",
		icon: Alert02Icon,
	},
] satisfies {
	title: string;
	tag: string;
	description: string;
	chips: string[];
	button: string;
	counter: string;
	icon: IconSvgElement;
}[];

const reportingCards = [
	{
		title: "Trip Replay Analysis",
		label: "Trip replay analysis",
		context: "Per-trip - Per-driver - Per-fleet",
		description:
			"Analyse detailed trip data for every vehicle in your fleet. Identify driver trends, optimise routes, and uncover opportunities to boost efficiency while trimming operational costs.",
		chips: ["Route & stop breakdowns", "Driver trend analysis", "Export-ready reports"],
		icon: Route03Icon,
	},
	{
		title: "Real-Time Speeding & Driving Alerts",
		label: "Real-time risk",
		description:
			"Proactively monitor vehicle speed and harsh driving events in real time. Reduce accident risk, enhance driver safety, and lower insurance premiums.",
		chips: ["Harsh events", "Speeding bands", "Live alerts"],
		icon: BellDotIcon,
	},
	{
		title: "Comprehensive Alert Summary",
		label: "Critical events",
		description:
			"Access a unified dashboard of critical notifications - braking patterns, acceleration alerts, incident notices, and crash assessments in one place.",
		chips: ["All alerts in one place", "Crash & incident view"],
		icon: FileChartColumnIcon,
	},
] satisfies {
	title: string;
	label: string;
	context?: string;
	description: string;
	chips: string[];
	icon: IconSvgElement;
}[];

const fleetAppBullets = [
	"Live fleet view with vehicle heading",
	"Trace recent routes with interactive trails",
	"Colour-coded activity statuses (driving, idling, off)",
	"Filter vehicles by activity",
];

const installerAppBullets = [
	"Step-by-step installation guides",
	"Device diagnostics and testing tools",
	"Instant device activation and setup",
	"Real-time support and troubleshooting",
];

function HeroProductVisual() {
	return (
		<div className="relative min-h-[34rem] lg:min-h-[42rem]">
			<div className="absolute inset-x-0 top-8 overflow-hidden rounded-2xl border border-white/18 bg-white text-rb-black shadow-[0_34px_120px_rgba(0,0,0,0.42)] lg:left-0 lg:right-auto lg:w-[48rem] xl:w-[55rem]">
				<div className="flex h-9 items-center gap-2 border-b border-black/10 bg-black/34 px-4">
					<span className="size-2.5 rounded-full bg-white/42" />
					<span className="size-2.5 rounded-full bg-white/42" />
					<span className="size-2.5 rounded-full bg-white/42" />
				</div>
				<div className="relative aspect-[1.5] bg-[#eef1ed]">
					<Image
						alt="Redtail platform interface"
						className="object-cover object-left-top"
						fill
						priority
						sizes="(min-width: 1024px) 55vw, 100vw"
						src="/platform-screenshots/redtail_lap-mob.png"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-rb-black/30 via-transparent to-transparent" />
					<div className="absolute left-5 bottom-5 rounded-2xl border border-white/18 bg-rb-black/76 px-5 py-4 text-white backdrop-blur-xl">
						<p className="text-xs font-semibold tracking-[0.18em] text-white/46 uppercase">
							Know where your fleet is
						</p>
						<p className="mt-2 text-lg font-semibold">24/7/365 Live Tracking</p>
					</div>
				</div>
			</div>

			<Card className="absolute right-0 top-0 hidden w-56 border-white/16 bg-rb-black/74 py-0 text-white shadow-[0_20px_70px_rgba(0,0,0,0.34)] ring-0 backdrop-blur-xl lg:block">
				<CardHeader className="px-5 pt-5">
					<div className="flex items-center justify-between">
						<div className="flex size-10 items-center justify-center rounded-xl bg-rb-red text-white">
							<HugeIcon icon={StarIcon} />
						</div>
						<Badge className="bg-white/10 text-white" variant="secondary">
							App rating
						</Badge>
					</div>
					<CardTitle className="mt-4 text-3xl font-semibold text-white">
						5.0
					</CardTitle>
					<CardDescription className="text-white/58">
						on iOS & Android
					</CardDescription>
				</CardHeader>
			</Card>

			<Card className="absolute right-0 bottom-12 hidden w-64 border-white/16 bg-white py-0 text-rb-black shadow-[0_24px_80px_rgba(0,0,0,0.32)] ring-0 lg:block">
				<CardHeader className="px-5 pt-5">
					<div className="flex items-center gap-3">
						<div className="flex size-10 items-center justify-center rounded-xl bg-rb-black text-white">
							<HugeIcon icon={SmartPhone01Icon} />
						</div>
						<div>
							<CardTitle className="text-sm font-semibold text-rb-black">
								Deploy everywhere
							</CardTitle>
							<CardDescription>Web + Mobile Apps</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="px-5 pb-5">
					<div className="grid grid-cols-3 gap-2">
						{["Web", "iOS", "Android"].map((label) => (
							<div
								className="rounded-xl border border-black/10 bg-[#f7f6f4] px-2 py-2 text-center text-xs font-semibold text-rb-black/62"
								key={label}
							>
								{label}
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function HeroTrustedStrip() {
	return (
		<div className="relative border-t border-white/12 bg-rb-black/46 px-4 py-5 backdrop-blur-md sm:px-6 lg:px-8">
			<div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[18rem_1fr] lg:items-center">
				<div>
					<p className="text-xs font-semibold tracking-[0.24em] text-white/54 uppercase">
						Trusted across fleets worldwide
					</p>
					<p className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-rb-red uppercase">
						5B+ MILES TRACKED - OEM-GRADE TELEMATICS
					</p>
				</div>
				<div className="mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] overflow-hidden">
					<InfiniteSlider gap={46} speed={24} speedOnHover={13}>
						{trustedLogos.map((logo) => (
							<div
								className="flex min-w-[124px] items-center justify-center"
								key={logo.alt}
							>
								<Image
									alt={logo.alt}
									className="h-5 w-auto object-contain opacity-64 brightness-0 invert transition duration-300 hover:opacity-95 sm:h-6"
									height={logo.height}
									src={logo.src}
									unoptimized
									width={logo.width}
								/>
							</div>
						))}
					</InfiniteSlider>
				</div>
			</div>
		</div>
	);
}

export function PlatformHeroSection() {
	return (
		<section className="relative isolate overflow-hidden rounded-b-3xl bg-rb-black text-white">
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-[radial-gradient(circle_at_22%_16%,rgba(207,19,23,0.24),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.12),transparent_24%),linear-gradient(135deg,#010101,#161514_54%,#010101)]"
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 opacity-34 [background-image:linear-gradient(120deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(30deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:36px_36px,58px_58px]"
			/>

			<div className="relative mx-auto grid min-h-[90svh] max-w-7xl gap-10 px-4 pt-24 pb-12 sm:px-6 sm:pt-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:pt-28">
				<div className="max-w-2xl">
					<div className="inline-flex items-center gap-3">
						<span className="flex size-10 items-center justify-center rounded-md bg-rb-red text-white shadow-[0_16px_34px_rgba(207,19,23,0.32)]">
							<HugeIcon icon={DashboardSquare03Icon} />
						</span>
						<p className="text-xs font-semibold tracking-[0.28em] text-white/78 uppercase">
							Platform + Apps
						</p>
					</div>

					<h1 className="mt-7 max-w-3xl text-[2.6rem] leading-[1.02] font-semibold text-balance text-white sm:text-5xl sm:leading-tight lg:text-[3.6rem]">
						Optimize Your Fleet and Driver Performance
					</h1>

					<p className="mt-5 max-w-2xl text-sm leading-6 text-white/72 sm:text-lg sm:leading-8">
						Fleet telematics solutions to manage and protect your most valuable
						assets in motion your people, your equipment, and your reputation.
						Built for operators, installers, and analysts who need trustworthy
						data at speed.
					</p>

					<div className="mt-6 flex flex-wrap gap-2">
						{valueChips.map((chip) => (
							<Badge
								className="border-white/16 bg-white/8 px-3 py-1.5 text-white/72"
								key={chip}
								variant="outline"
							>
								{chip}
							</Badge>
						))}
					</div>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Button asChild className="w-full sm:w-auto" size="lg">
							<Link href="/contact-us">
								Book a demo
								<HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
							</Link>
						</Button>
						<Button
							asChild
							className="w-full border-white/32 bg-white/8 text-white hover:border-white/48 hover:bg-white/14 hover:text-white sm:w-auto"
							size="lg"
							variant="outline"
						>
							<Link href="/contact-us">
								Get pricing
								<HugeIcon data-icon="inline-end" icon={ArrowUpRight01Icon} />
							</Link>
						</Button>
					</div>

					<div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
						<div className="rounded-2xl border border-white/14 bg-white/8 p-4 backdrop-blur-md">
							<p className="text-sm font-semibold text-white">Visibility</p>
							<p className="mt-2 text-xs leading-5 text-white/58">
								Trip replay, geofences, alerts, reports
							</p>
						</div>
						<div className="rounded-2xl border border-white/14 bg-white/8 p-4 backdrop-blur-md">
							<p className="text-sm font-semibold text-white">Reliability</p>
							<p className="mt-2 text-xs leading-5 text-white/58">
								ISO 9001 & 27001 aligned practices
							</p>
						</div>
					</div>

					<p className="mt-8 text-xs font-semibold tracking-[0.18em] text-white/42 uppercase">
						Scroll to explore the platform
					</p>
				</div>

				<HeroProductVisual />
			</div>

			<HeroTrustedStrip />
		</section>
	);
}

function OutcomeCard({
	outcome,
	index,
}: {
	outcome: (typeof outcomes)[number];
	index: number;
}) {
	const featured = index === 0;

	return (
		<Card className="relative isolate border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0 transition duration-300 hover:-translate-y-1 hover:border-rb-red/28 hover:shadow-[0_24px_70px_rgba(1,1,1,0.1)]">
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-rb-peach/65 to-transparent"
			/>
			<CardHeader className="relative gap-5 px-6 pt-6">
				<div className="flex items-start justify-between gap-4">
					<div
						className={cn(
							"flex size-12 items-center justify-center rounded-xl text-white",
							featured ? "bg-rb-red" : "bg-rb-black"
						)}
					>
						<HugeIcon icon={outcome.icon} size={22} />
					</div>
					<Badge className="border-black/10 bg-white/70 text-rb-black/54" variant="outline">
						{String(index + 1).padStart(2, "0")}
					</Badge>
				</div>
				<CardTitle className="text-xl font-semibold leading-tight text-rb-black sm:text-2xl">
					{outcome.title}
				</CardTitle>
				<CardDescription className="text-sm leading-6 text-rb-black/58 sm:text-base sm:leading-7">
					{outcome.description}
				</CardDescription>
			</CardHeader>
			<CardContent className="relative px-6 pb-6">
				<div className="flex flex-wrap gap-2">
					{outcome.tags.map((tag) => (
						<Badge
							className="border-black/10 bg-white text-rb-black/58"
							key={tag}
							variant="outline"
						>
							{tag}
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

export function PlatformOutcomesSection() {
	return (
		<section className="border-b border-black/10 bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<header className="grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
					<div>
						<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
							Outcomes
						</p>
						<p className="mt-3 text-sm font-semibold text-rb-black/48">
							Visibility - Safety - Uptime
						</p>
						<h2 className="mt-4 text-[2.35rem] font-semibold leading-tight text-rb-black sm:text-5xl">
							Outcomes teams rely on every day
						</h2>
					</div>
					<div className="max-w-3xl lg:justify-self-end">
						<p className="text-base leading-7 text-rb-black/60 sm:text-lg sm:leading-8">
							Redtail ties live location, driver behavior, device health, and
							analytics into one operational picture so you act faster with
							confidence.
						</p>
						<Button asChild className="mt-6" size="lg">
							<Link href="#platform-modules">
								Explore platform modules
								<HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
							</Link>
						</Button>
					</div>
				</header>

				<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{outcomes.map((outcome, index) => (
						<OutcomeCard
							index={index}
							key={outcome.title}
							outcome={outcome}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

function FeatureVisual({ type }: { type: (typeof platformFeatures)[number]["visual"] }) {
	if (type === "device") {
		return (
			<div className="relative min-h-52 overflow-hidden rounded-2xl bg-rb-black p-5 text-white">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(207,19,23,0.28),transparent_30%)]" />
				<div className="relative grid gap-3">
					{["Scan device", "Power check", "Network ready", "Warranty included"].map((label, index) => (
						<div
							className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.055] p-3"
							key={label}
						>
							<div className="flex size-8 items-center justify-center rounded-lg bg-rb-red text-white">
								{index + 1}
							</div>
							<p className="text-sm font-semibold text-white/82">{label}</p>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (type === "status") {
		return (
			<div className="relative min-h-52 overflow-hidden rounded-2xl bg-[#f7f6f4] p-5">
				<div className="grid grid-cols-2 gap-3">
					{[
						["Driving", "42", "bg-rb-red"],
						["Idling", "08", "bg-rb-black"],
						["Offline", "03", "bg-rb-light-blue"],
						["Service", "11", "bg-rb-light-green"],
					].map(([label, value, color]) => (
						<div className="rounded-xl border border-black/10 bg-white p-4" key={label}>
							<p className="text-xs font-semibold text-rb-black/48">{label}</p>
							<p className="mt-2 text-3xl font-semibold text-rb-black">{value}</p>
							<span className={cn("mt-4 block h-2 rounded-full", color)} />
						</div>
					))}
				</div>
			</div>
		);
	}

	if (type === "geofence") {
		return (
			<div className="relative min-h-52 overflow-hidden rounded-2xl bg-[#6f8067]">
				<div className="absolute inset-0 opacity-40 [background-image:linear-gradient(120deg,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(30deg,rgba(1,1,1,0.12)_1px,transparent_1px)] [background-size:34px_34px,46px_46px]" />
				<div className="absolute left-8 top-8 h-28 w-52 rounded-[2rem] border-2 border-rb-red/80 bg-rb-red/12" />
				<div className="absolute right-8 bottom-8 rounded-2xl border border-white/18 bg-rb-black/68 px-4 py-3 text-white backdrop-blur-md">
					<p className="text-xs font-semibold">Depot zone</p>
					<p className="mt-1 text-[11px] text-white/62">Enter/exit alert active</p>
				</div>
				<div className="absolute left-24 top-20 flex size-10 items-center justify-center rounded-full border-3 border-white bg-rb-red text-white">
					<HugeIcon icon={MapPinIcon} />
				</div>
			</div>
		);
	}

	return (
		<div className="relative min-h-52 overflow-hidden rounded-2xl bg-[#6f8067]">
			<div className="absolute inset-0 opacity-45 [background-image:linear-gradient(120deg,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(30deg,rgba(1,1,1,0.12)_1px,transparent_1px)] [background-size:34px_34px,46px_46px]" />
			<span className="absolute top-[28%] left-[-8%] h-8 w-[116%] rotate-[13deg] border-y border-white/35 bg-white/34" />
			<span className="absolute right-[-12%] bottom-[28%] h-9 w-[92%] -rotate-[11deg] border-y border-white/35 bg-white/30" />
			<span className="absolute top-[55%] left-[16%] h-2 w-[58%] -rotate-[11deg] rounded-full border border-rb-red/40 bg-rb-red/75" />
			<div className="absolute right-[24%] bottom-[31%] flex size-12 items-center justify-center rounded-full border-3 border-white bg-rb-red text-white shadow-[0_18px_42px_rgba(207,19,23,0.42)]">
				<HugeIcon icon={GpsSignal01Icon} />
			</div>
			<div className="absolute left-5 top-5 rounded-2xl border border-white/18 bg-rb-black/68 px-4 py-3 text-white backdrop-blur-md">
				<p className="text-xs font-semibold">Trip replay</p>
				<p className="mt-1 text-[11px] text-white/62">Speed, stops and events</p>
			</div>
		</div>
	);
}

function PlatformFeatureCard({
	feature,
	index,
}: {
	feature: (typeof platformFeatures)[number];
	index: number;
}) {
	return (
		<Card className="border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0">
			<CardHeader className="gap-5 px-6 pt-6 sm:px-7 sm:pt-7">
				<div className="flex items-start justify-between gap-4">
					<div className="flex size-12 items-center justify-center rounded-xl bg-rb-black text-white">
						<HugeIcon icon={feature.icon} size={22} />
					</div>
					<Badge className="border-black/10 bg-white text-rb-black/54" variant="outline">
						{String(index + 1).padStart(2, "0")}
					</Badge>
				</div>
				<div>
					<CardTitle className="text-2xl font-semibold leading-tight text-rb-black">
						{feature.title}
					</CardTitle>
					<CardDescription className="mt-3 text-base leading-7 text-rb-black/58">
						{feature.description}
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="px-6 pb-6 sm:px-7 sm:pb-7">
				<FeatureVisual type={feature.visual} />
				<div className="mt-5 grid gap-2">
					{feature.bullets.map((bullet) => (
						<div className="flex items-start gap-3" key={bullet}>
							<span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-rb-red/40 text-rb-red">
								<HugeIcon icon={CheckmarkCircle02Icon} size={13} />
							</span>
							<p className="text-sm leading-6 text-rb-black/64">{bullet}</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

export function FeaturesSectionRedtail() {
	return (
		<section
			className="border-b border-black/10 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
			id="platform-modules"
		>
			<div className="mx-auto max-w-7xl">
				<header className="grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-end">
					<div>
						<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
							Redtail Telematics Features
						</p>
						<h2 className="mt-4 text-[2.35rem] font-semibold leading-tight text-rb-black sm:text-5xl">
							Essentials every modern fleet needs
						</h2>
					</div>
					<div className="max-w-3xl lg:justify-self-end">
						<p className="text-base leading-7 text-rb-black/60 sm:text-lg sm:leading-8">
							Live GPS, Driver Monitoring, Reports and Alerts - all in a unified
							Redtail Platform.
						</p>
						<div className="mt-5 rounded-2xl border border-black/10 bg-[#fcfbf9] p-4">
							<Badge className="bg-rb-red text-white">Feature spotlight</Badge>
							<p className="mt-3 text-sm leading-6 text-rb-black/62">
								Optimised for installers, managers and analysts - so everyone in
								the fleet sees the same, trustworthy picture.
							</p>
						</div>
					</div>
				</header>

				<div className="mt-10 grid gap-4 lg:grid-cols-2">
					{platformFeatures.map((feature, index) => (
						<PlatformFeatureCard
							feature={feature}
							index={index}
							key={feature.title}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

export function TrackingFeaturesSection() {
	return (
		<section className="relative overflow-hidden bg-rb-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rb-red/70 to-transparent"
			/>
			<div className="relative mx-auto max-w-7xl">
				<header className="grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-end">
					<div>
						<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
							Tracking
						</p>
						<p className="mt-3 text-sm font-semibold text-white/46">
							Drivers - Assets - Sites
						</p>
						<h2 className="mt-4 max-w-3xl text-[2.35rem] font-semibold leading-tight text-white sm:text-5xl">
							Track everything that moves, not just the vehicles
						</h2>
					</div>
					<p className="max-w-3xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8 lg:justify-self-end">
						Bring driver behaviour, asset health and site activity into one
						live picture, so your operations team can act in minutes, not days.
					</p>
				</header>

				<div className="mt-10 grid gap-4 lg:grid-cols-3">
					{trackingCards.map((card) => (
						<Card
							className="border-white/10 bg-white/[0.045] py-0 text-white shadow-none ring-0 transition duration-300 hover:-translate-y-1 hover:border-rb-red/44 hover:bg-white/[0.07]"
							key={card.title}
						>
							<CardHeader className="gap-5 px-6 pt-6">
								<div className="flex items-start justify-between gap-4">
									<div className="flex size-12 items-center justify-center rounded-xl bg-rb-red text-white">
										<HugeIcon icon={card.icon} size={22} />
									</div>
									<span className="text-xs font-semibold text-white/34">
										{card.counter}
									</span>
								</div>
								<div>
									<Badge className="mb-4 bg-white/10 text-white" variant="secondary">
										{card.tag}
									</Badge>
									<CardTitle className="text-2xl font-semibold leading-tight text-white">
										{card.title}
									</CardTitle>
								</div>
								<CardDescription className="text-sm leading-6 text-white/62 sm:text-base sm:leading-7">
									{card.description}
								</CardDescription>
							</CardHeader>
							<CardContent className="px-6 pb-6">
								<div className="flex flex-wrap gap-2">
									{card.chips.map((chip) => (
										<Badge
											className="border-white/10 bg-white/[0.04] text-white/64"
											key={chip}
											variant="outline"
										>
											{chip}
										</Badge>
									))}
								</div>
								<Link
									className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rb-red transition hover:text-white"
									href="#reporting"
								>
									{card.button}
									<HugeIcon icon={ArrowRight01Icon} size={15} />
								</Link>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

export function CustomReportingShowcase() {
	return (
		<section
			className="border-b border-black/10 bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
			id="reporting"
		>
			<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
				<aside className="lg:sticky lg:top-24 lg:self-start">
					<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
						Reporting & Analytics
					</p>
					<p className="mt-3 text-sm font-semibold text-rb-black/48">
						Trip - Speed - Alerts
					</p>
					<h2 className="mt-4 text-[2.35rem] font-semibold leading-tight text-rb-black sm:text-5xl">
						Custom Reporting & Analytics
					</h2>
					<p className="mt-5 text-base leading-7 text-rb-black/60 sm:text-lg sm:leading-8">
						Dive deep into fleet performance. Uncover actionable insights, spot
						trends and seize cost-saving opportunities with reporting that
						mirrors how your fleet actually operates.
					</p>
					<Button asChild className="mt-8" size="lg">
						<Link href="/contact-us">
							Book a live demo
							<HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
						</Link>
					</Button>
				</aside>

				<div className="grid gap-4">
					{reportingCards.map((card, index) => (
						<Card
							className="border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0"
							key={card.title}
						>
							<CardHeader className="gap-5 px-6 pt-6 sm:px-7 sm:pt-7">
								<div className="flex items-start justify-between gap-4">
									<div className="flex size-12 items-center justify-center rounded-xl bg-rb-black text-white">
										<HugeIcon icon={card.icon} size={22} />
									</div>
									<Badge className="bg-rb-red text-white">
										{card.label}
									</Badge>
								</div>
								<div>
									<CardTitle className="text-2xl font-semibold leading-tight text-rb-black">
										{card.title}
									</CardTitle>
									{card.context ? (
										<CardDescription className="mt-2 text-xs font-semibold tracking-[0.16em] text-rb-black/42 uppercase">
											{card.context}
										</CardDescription>
									) : null}
								</div>
								<CardDescription className="text-base leading-7 text-rb-black/58">
									{card.description}
								</CardDescription>
							</CardHeader>
							<CardContent className="px-6 pb-6 sm:px-7 sm:pb-7">
								<div className="flex flex-wrap gap-2">
									{card.chips.map((chip) => (
										<Badge
											className="border-black/10 bg-white text-rb-black/58"
											key={chip}
											variant="outline"
										>
											{chip}
										</Badge>
									))}
								</div>
								<div className="mt-5 h-2 overflow-hidden rounded-full bg-black/8">
									<div
										className="h-full rounded-full bg-rb-red"
										style={{ width: `${86 - index * 12}%` }}
									/>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

function PhoneFrame({
	children,
	label,
}: {
	children: ReactNode;
	label: string;
}) {
	return (
		<div className="mx-auto w-full max-w-[16rem] rounded-[2rem] border border-black/10 bg-rb-black p-3 shadow-[0_24px_70px_rgba(1,1,1,0.18)]">
			<div className="rounded-[1.55rem] bg-white p-3">
				<div className="mx-auto h-1 w-10 rounded-full bg-black/18" />
				<div className="mt-4">{children}</div>
				<p className="mt-4 text-center text-[10px] font-semibold tracking-[0.16em] text-rb-black/36 uppercase">
					{label}
				</p>
			</div>
		</div>
	);
}

function FleetAppPreview() {
	return (
		<PhoneFrame label="Redtail Fleet App interface">
			<div className="relative aspect-[0.76] overflow-hidden rounded-[1.2rem] bg-[#6f8067]">
				<div className="absolute inset-0 opacity-45 [background-image:linear-gradient(120deg,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(30deg,rgba(1,1,1,0.12)_1px,transparent_1px)] [background-size:22px_22px,30px_30px]" />
				<div className="absolute left-3 top-3 right-3 rounded-xl border border-white/18 bg-rb-black/64 p-3 text-white backdrop-blur-md">
					<p className="text-xs font-semibold">Live fleet</p>
					<p className="mt-1 text-[10px] text-white/58">42 vehicles online</p>
				</div>
				<div className="absolute right-10 bottom-20 flex size-10 items-center justify-center rounded-full border-3 border-white bg-rb-red text-white">
					<HugeIcon icon={MapPinIcon} />
				</div>
				<div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-2">
					{["Drive", "Idle", "Off"].map((item) => (
						<div
							className="rounded-lg border border-white/18 bg-white/16 py-2 text-center text-[10px] font-semibold text-white backdrop-blur-md"
							key={item}
						>
							{item}
						</div>
					))}
				</div>
			</div>
		</PhoneFrame>
	);
}

function InstallerAppPreview() {
	return (
		<PhoneFrame label="Redtail Installer App interface">
			<div className="aspect-[0.76] rounded-[1.2rem] bg-[#f7f6f4] p-4">
				<div className="flex items-center gap-3">
					<div className="flex size-10 items-center justify-center rounded-xl bg-rb-red text-white">
						<HugeIcon icon={Wrench01Icon} />
					</div>
					<div>
						<p className="text-sm font-semibold text-rb-black">Install check</p>
						<p className="mt-1 text-[10px] text-rb-black/48">VAM device setup</p>
					</div>
				</div>
				<div className="mt-5 grid gap-3">
					{["Power verified", "GPS locked", "Network active", "Activation ready"].map((item) => (
						<div
							className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-3"
							key={item}
						>
							<span className="flex size-5 items-center justify-center rounded-full bg-rb-red text-white">
								<HugeIcon icon={CheckmarkCircle02Icon} size={12} />
							</span>
							<p className="text-xs font-semibold text-rb-black/68">{item}</p>
						</div>
					))}
				</div>
			</div>
		</PhoneFrame>
	);
}

function StoreButtons() {
	return (
		<div className="mt-6 flex flex-col gap-3 sm:flex-row">
			<Button asChild className="w-full sm:w-auto" size="lg">
				<a href="https://apps.apple.com/app/redtail-fleet-app">
					<HugeIcon data-icon="inline-start" icon={AppStoreIcon} />
					App Store
				</a>
			</Button>
			<Button
				asChild
				className="w-full border-rb-black bg-white text-rb-black hover:border-rb-red hover:bg-rb-peach/45 hover:text-rb-red sm:w-auto"
				size="lg"
				variant="outline"
			>
				<a href="https://play.google.com/store/apps/details?id=com.redtailtelematics.rtfleet">
					<HugeIcon data-icon="inline-start" icon={PlayStoreIcon} />
					Google Play
				</a>
			</Button>
		</div>
	);
}

export function MobileAppsSection() {
	return (
		<section className="border-b border-black/10 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<header className="grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
					<div>
						<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
							Mobile apps
						</p>
						<p className="mt-3 text-sm font-semibold text-rb-black/48">
							iOS & Android
						</p>
						<h2 className="mt-4 text-[2.35rem] font-semibold leading-tight text-rb-black sm:text-5xl">
							Apps for every role in the fleet
						</h2>
					</div>
					<p className="max-w-3xl text-base leading-7 text-rb-black/60 sm:text-lg sm:leading-8 lg:justify-self-end">
						One platform, two focused apps - giving managers and installers
						exactly what they need, wherever they are.
					</p>
				</header>

				<div className="mt-10 grid gap-5 lg:grid-cols-2">
					<Card className="border-black/10 bg-[#fcfbf9] py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0">
						<CardHeader className="gap-5 px-6 pt-6 sm:px-7 sm:pt-7">
							<div className="flex items-start justify-between gap-4">
								<div className="flex items-center gap-3">
									<div className="flex size-12 items-center justify-center rounded-xl bg-rb-red text-white">
										<HugeIcon icon={SmartPhone01Icon} />
									</div>
									<div>
										<CardTitle className="text-2xl font-semibold text-rb-black">
											Redtail Fleet App
										</CardTitle>
										<CardDescription>For fleet managers & dispatch</CardDescription>
									</div>
								</div>
								<Badge className="bg-rb-black text-white">On the go</Badge>
							</div>
						</CardHeader>
						<CardContent className="grid gap-7 px-6 pb-6 sm:px-7 sm:pb-7 md:grid-cols-[0.9fr_1.1fr] md:items-center">
							<FleetAppPreview />
							<div>
								<p className="text-base leading-7 text-rb-black/62">
									Manage your entire fleet on the go. See live locations, status
									and recent journeys from your phone - and act on issues in
									minutes, not days.
								</p>
								<div className="mt-5 grid gap-2">
									{fleetAppBullets.map((bullet) => (
										<div className="flex items-start gap-3" key={bullet}>
											<span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-rb-red/40 text-rb-red">
												<HugeIcon icon={CheckmarkCircle02Icon} size={13} />
											</span>
											<p className="text-sm leading-6 text-rb-black/64">{bullet}</p>
										</div>
									))}
								</div>
								<StoreButtons />
							</div>
						</CardContent>
					</Card>

					<Card className="border-black/10 bg-[#fcfbf9] py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0">
						<CardHeader className="gap-5 px-6 pt-6 sm:px-7 sm:pt-7">
							<div className="flex items-start justify-between gap-4">
								<div className="flex items-center gap-3">
									<div className="flex size-12 items-center justify-center rounded-xl bg-rb-black text-white">
										<HugeIcon icon={AndroidIcon} />
									</div>
									<div>
										<CardTitle className="text-2xl font-semibold text-rb-black">
											Redtail Installer App
										</CardTitle>
										<CardDescription>For installers & technicians</CardDescription>
									</div>
								</div>
								<Badge className="bg-rb-black text-white">On the go</Badge>
							</div>
						</CardHeader>
						<CardContent className="grid gap-7 px-6 pb-6 sm:px-7 sm:pb-7 md:grid-cols-[0.9fr_1.1fr] md:items-center">
							<InstallerAppPreview />
							<div>
								<p className="text-base leading-7 text-rb-black/62">
									Streamline device installs with guided workflows, on-device
									diagnostics and instant activation - so every install leaves the
									yard verified.
								</p>
								<div className="mt-5 grid gap-2">
									{installerAppBullets.map((bullet) => (
										<div className="flex items-start gap-3" key={bullet}>
											<span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-rb-red/40 text-rb-red">
												<HugeIcon icon={CheckmarkCircle02Icon} size={13} />
											</span>
											<p className="text-sm leading-6 text-rb-black/64">{bullet}</p>
										</div>
									))}
								</div>
								<StoreButtons />
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}

export function PlatformAndAppsPageSections() {
	return (
		<>
			<PlatformHeroSection />
			<PlatformOutcomesSection />
			<FeaturesSectionRedtail />
			<TrackingFeaturesSection />
			<CustomReportingShowcase />
			<MobileAppsSection />
		</>
	);
}
