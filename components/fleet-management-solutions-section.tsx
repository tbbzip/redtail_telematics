import Image from "next/image";
import Link from "next/link";
import {
	AccidentIcon,
	ArrowRight01Icon,
	CarSignalIcon,
	ChartAnalysisIcon,
	FileChartColumnIcon,
	MapsLocation01Icon,
	MoneyBag02Icon,
	Route03Icon,
	ShieldIcon,
	Wrench01Icon,
} from "@hugeicons/core-free-icons";
import { type IconSvgElement } from "@hugeicons/react";

import { HugeIcon } from "@/components/huge-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FleetCapability = {
	title: string;
	description: string;
	category: string;
	icon: IconSvgElement;
};

type FleetMoment = {
	eyebrow: string;
	title: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
	metric: string;
	metricLabel: string;
	items: FleetCapability[];
};

const fleetMoments = [
	{
		eyebrow: "Visibility & Control",
		title: "Know where every vehicle is, and what needs attention.",
		description:
			"Start with the core operating view: live location, movement history, virtual boundaries, and alerts when something changes.",
		imageSrc: "/carousel/fleet.jpg",
		imageAlt: "Commercial fleet vehicles staged for daily operations",
		metric: "Live GPS",
		metricLabel: "Real-time vehicle visibility",
		items: [
			{
				title: "Vehicle Tracking",
				description:
					"Monitor your fleet in real-time with accurate GPS tracking. Get instant updates on vehicle locations, routes, and stops to enhance fleet visibility and ensure timely deliveries.",
				category: "Locate",
				icon: MapsLocation01Icon,
			},
			{
				title: "Geofencing",
				description:
					"Set up virtual boundaries (geofences) to monitor vehicle entry and exit in specific areas. Receive instant alerts when vehicles enter or leave designated zones, enhancing security and compliance.",
				category: "Control",
				icon: Route03Icon,
			},
			{
				title: "Stolen Vehicle Tracking",
				description:
					"Increase the chances of recovering stolen vehicles with real-time GPS tracking. Receive instant alerts if a vehicle is moved without authorization and provide law enforcement with precise location data to facilitate quick and efficient tracking.",
				category: "Recover",
				icon: ShieldIcon,
			},
		],
	},
	{
		eyebrow: "Safety & Incident Intelligence",
		title: "Turn driver behavior and collision data into faster decisions.",
		description:
			"Use telematics signals to coach safer driving, spot risk patterns, and understand what happened when an incident occurs.",
		imageSrc: "/carousel/svr.jpg",
		imageAlt: "Vehicle at night with location tracking signals",
		metric: "Alerts",
		metricLabel: "Unsafe events and incident context",
		items: [
			{
				title: "Driver Behavior Monitoring",
				description:
					"Improve driver safety and performance by tracking driving behaviors such as speed, harsh braking, and rapid acceleration. Receive alerts for unsafe driving practices and generate detailed behavior reports.",
				category: "Coach",
				icon: CarSignalIcon,
			},
			{
				title: "Crash Reconstruction",
				description:
					"Accurately reconstruct vehicle collisions with detailed data from GPS tracking and onboard sensors. Analyze factors such as speed, braking patterns, and impact points to understand the events leading up to and during a crash.",
				category: "Analyze",
				icon: AccidentIcon,
			},
		],
	},
	{
		eyebrow: "Uptime & Cost Optimization",
		title: "Keep vehicles working while controlling operating costs.",
		description:
			"Maintenance planning and insurance conversations become easier when they are tied back to real vehicle activity and measurable fleet usage.",
		imageSrc: "/carousel/fleet-web.jpg",
		imageAlt: "Fleet vehicles connected by telematics signals",
		metric: "Cost control",
		metricLabel: "Maintenance and insurance review",
		items: [
			{
				title: "Maintenance Scheduling",
				description:
					"Keep your fleet in top condition with automated maintenance reminders and scheduling. Track vehicle health and schedule maintenance based on mileage, engine hours, or specific time intervals.",
				category: "Maintain",
				icon: Wrench01Icon,
			},
			{
				title: "Insurance Readiness",
				description:
					"Use telematics-backed safety and security information when reviewing coverage, claims history, and fleet risk with your insurance provider.",
				category: "Review",
				icon: MoneyBag02Icon,
			},
		],
	},
	{
		eyebrow: "Reporting & Decisions",
		title: "Make the data useful for managers, operators, and finance teams.",
		description:
			"Close the loop with reporting that helps teams compare performance, identify trends, and choose the next operating improvement.",
		imageSrc: "/carousel/fleet.jpg",
		imageAlt: "Fleet vehicles prepared for daily dispatch",
		metric: "Reports",
		metricLabel: "Fleet analytics and decisions",
		items: [
			{
				title: "Comprehensive Reporting",
				description:
					"Gain insights into your fleet performance with detailed reports and analytics. Customize reports to track key metrics, identify trends, and make data-driven decisions to improve fleet efficiency and reduce costs.",
				category: "Improve",
				icon: FileChartColumnIcon,
			},
		],
	},
] satisfies FleetMoment[];

function CapabilityRow({
	capability,
	featured = false,
}: {
	capability: FleetCapability;
	featured?: boolean;
}) {
	return (
		<article
			className={cn(
				"group grid gap-4 border-t py-5 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr]",
				featured ? "border-white/12" : "border-black/10"
			)}
		>
			<div
				className={cn(
					"flex size-12 items-center justify-center rounded-xl transition-colors",
					featured
						? "bg-white/10 text-white group-hover:bg-rb-red"
						: "bg-rb-peach text-rb-red group-hover:bg-rb-red group-hover:text-white"
				)}
			>
				<HugeIcon icon={capability.icon} size={22} />
			</div>
			<div className="min-w-0">
				<div className="flex flex-wrap items-center gap-3">
					<Badge
						className={cn(
							featured && "border-white/18 bg-white/8 text-white"
						)}
						variant={featured ? "outline" : "secondary"}
					>
						{capability.category}
					</Badge>
					<h3
						className={cn(
							"text-xl font-semibold leading-tight",
							featured ? "text-white" : "text-rb-black"
						)}
					>
						{capability.title}
					</h3>
				</div>
				<p
					className={cn(
						"mt-3 text-sm leading-6 sm:text-base sm:leading-7",
						featured ? "text-white/64" : "text-rb-black/58"
					)}
				>
					{capability.description}
				</p>
			</div>
		</article>
	);
}

function MomentImage({
	imageAlt,
	imageSrc,
	metric,
	metricLabel,
}: Pick<FleetMoment, "imageAlt" | "imageSrc" | "metric" | "metricLabel">) {
	return (
		<div className="relative min-h-[18rem] overflow-hidden rounded-2xl bg-rb-black shadow-[0_24px_70px_rgba(1,1,1,0.14)] ring-1 ring-black/10 sm:min-h-[24rem] lg:min-h-full">
			<Image
				alt={imageAlt}
				className="object-cover transition duration-500 hover:scale-[1.025]"
				fill
				sizes="(max-width: 1024px) 100vw, 42vw"
				src={imageSrc}
			/>
			<div className="absolute inset-0 bg-linear-to-t from-rb-black/78 via-rb-black/18 to-transparent" />
			<div className="absolute right-5 bottom-5 left-5">
				<div className="inline-flex rounded-xl border border-white/16 bg-white/12 px-4 py-3 text-white shadow-[0_18px_46px_rgba(1,1,1,0.24)] backdrop-blur-md">
					<div>
						<p className="text-lg font-semibold leading-none">{metric}</p>
						<p className="mt-2 text-xs leading-5 text-white/62">
							{metricLabel}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function MomentBand({
	index,
	moment,
}: {
	index: number;
	moment: FleetMoment;
}) {
	const featured = index === 0;
	const reversed = index % 2 === 1;

	return (
		<section
			className={cn(
				"grid overflow-hidden rounded-3xl border shadow-[0_24px_80px_rgba(1,1,1,0.07)] lg:grid-cols-2",
				featured
					? "border-rb-black bg-rb-black text-white"
					: "border-black/10 bg-white text-rb-black"
			)}
		>
			<div className={cn("p-5 sm:p-7 lg:p-8", reversed && "lg:order-2")}>
				<div className="flex items-center gap-4">
					<span
						className={cn(
							"text-xs font-semibold tracking-[0.24em] uppercase",
							featured ? "text-rb-red" : "text-rb-red"
						)}
					>
						{String(index + 1).padStart(2, "0")}
					</span>
					<div
						className={cn(
							"h-px flex-1",
							featured ? "bg-white/14" : "bg-black/10"
						)}
					/>
					<Badge
						className={cn(
							featured && "border-white/18 bg-white/8 text-white"
						)}
						variant={featured ? "outline" : "secondary"}
					>
						{moment.eyebrow}
					</Badge>
				</div>
				<h3
					className={cn(
						"mt-8 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl",
						featured ? "text-white" : "text-rb-black"
					)}
				>
					{moment.title}
				</h3>
				<p
					className={cn(
						"mt-4 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8",
						featured ? "text-white/62" : "text-rb-black/58"
					)}
				>
					{moment.description}
				</p>

				<div className="mt-8">
					{moment.items.map((capability) => (
						<CapabilityRow
							capability={capability}
							featured={featured}
							key={capability.title}
						/>
					))}
				</div>
			</div>

			<div className={cn("p-3 sm:p-4", reversed && "lg:order-1")}>
				<MomentImage
					imageAlt={moment.imageAlt}
					imageSrc={moment.imageSrc}
					metric={moment.metric}
					metricLabel={moment.metricLabel}
				/>
			</div>
		</section>
	);
}

export function FleetManagementSolutionsSection() {
	return (
		<section
			className="relative scroll-mt-24 overflow-hidden border-b border-black/10 bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:scroll-mt-28 lg:px-8 lg:py-24"
			id="fleet-solutions"
		>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rb-red/45 to-transparent"
			/>
			<div className="mx-auto max-w-7xl">
				<header className="grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
					<div>
						<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
							Fleet capabilities
						</p>
						<h2 className="mt-4 text-[2.25rem] font-semibold leading-tight tracking-tight text-rb-black sm:text-5xl">
							Fleet Management Solutions
						</h2>
					</div>
					<p className="max-w-3xl text-base leading-7 text-rb-black/60 sm:text-lg sm:leading-8 lg:justify-self-end">
						Everything your team needs to track, protect, maintain, and optimize
						your fleet from a single telematics foundation.
					</p>
				</header>

				<div className="mt-10 grid gap-5 sm:mt-14 lg:gap-7">
					{fleetMoments.map((moment, index) => (
						<MomentBand index={index} key={moment.eyebrow} moment={moment} />
					))}
				</div>

				<div className="mt-7 rounded-3xl border border-black/10 bg-white p-5 shadow-[0_18px_50px_rgba(1,1,1,0.05)] sm:p-7">
					<div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
						<div className="flex items-start gap-4">
							<span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-rb-red text-white">
								<HugeIcon icon={ChartAnalysisIcon} size={22} />
							</span>
							<div>
								<h3 className="text-xl font-semibold leading-tight text-rb-black sm:text-2xl">
									Want to see which tools fit your fleet?
								</h3>
								<p className="mt-2 max-w-2xl text-sm leading-6 text-rb-black/58 sm:text-base sm:leading-7">
									Talk with Redtail about the vehicle types, routes, alerts, and
									reports that matter most to your operations.
								</p>
							</div>
						</div>
						<div className="flex flex-col gap-3 sm:flex-row">
							<Button asChild size="lg">
								<Link href="/contact-us">
									Talk to our team
									<HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
								</Link>
							</Button>
							<Button asChild size="lg" variant="outline">
								<Link href="/platform-and-apps">Explore platform</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
