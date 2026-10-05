import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
	Alert02Icon,
	AppStoreIcon,
	ArrowRight01Icon,
	CarSignalIcon,
	CheckmarkCircle02Icon,
	DashboardSquare03Icon,
	FileChartColumnIcon,
	GpsSignal01Icon,
	MapsLocation01Icon,
	PlayStoreIcon,
	Route03Icon,
	ShieldKeyIcon,
	SmartPhone01Icon,
	Wrench01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

import { HugeIcon } from "@/components/huge-icon";
import { Button } from "@/components/ui/button";
import { section179Benefit } from "@/lib/tax-benefits";
import { cn } from "@/lib/utils";

type Detail = { title: string; description: string };

const capabilities = [
	["#fleet-visibility", "Fleet & journeys", "Status, maps and route replay", MapsLocation01Icon],
	["#driver-behaviour", "Driving behaviour", "Event patterns by place and time", CarSignalIcon],
	["#alerts-proof", "Alerts & geofences", "Interests, history and channels", Alert02Icon],
	["#maintenance-proof", "Maintenance", "Keep vehicles ready for work", Wrench01Icon],
	["#reports-proof", "Reports & mileage", "Trip, driving and odometer records", FileChartColumnIcon],
	["#location-intelligence", "Location intelligence", "Predicted location and map context", GpsSignal01Icon],
	["#circuit-intelligence", "Circuit intelligence", "Sessions, laps and comparison", Route03Icon],
	["#mobile-apps", "Mobile access", "Fleet and installer apps", SmartPhone01Icon],
] satisfies [string, string, string, IconSvgElement][];

const fleetAppDetails = [
	"See fleet positions and vehicle direction",
	"Follow recent trails and open past journeys",
	"Filter vehicles by driving, idling or engine-off status",
	"Review vehicles by name, activity or last update",
	"Focus on one vehicle without returning to the office",
	"Arm location monitoring and receive movement alerts",
	"View and set vehicle mileage",
	"Review vehicle and device battery status",
];

const installerAppDetails = [
	"Fit Redtail devices using the appropriate installation guidance",
	"Prepare vehicles for device setup and activation",
	"Confirm fitting requirements with Redtail support",
];

const proofItems = [
	["Journey visibility", "Current and historical context"],
	["Email · SMS · Push", "Configurable alert channels"],
	["Fleet reporting", "Trips, driving events and mileage"],
	["Web · iOS · Android", "Portal and field access"],
] satisfies [string, string][];

const supportingControls = [
	["Fleet structure", "Organise visibility around fleets and organisations.", DashboardSquare03Icon],
	["User access", "Align account access with the people using the platform.", ShieldKeyIcon],
	["Focused apps", "Give fleet teams and installers purpose-built entry points.", SmartPhone01Icon],
] satisfies [string, string, IconSvgElement][];

type HeadingProps = {
	eyebrow: string;
	title: string;
	description: string;
	dark?: boolean;
	center?: boolean;
};

function Heading({ eyebrow, title, description, dark = false, center = false }: HeadingProps) {
	return (
		<header className={cn("max-w-3xl", center && "mx-auto text-center")}>
			<p
				className={cn(
					"text-xs font-semibold tracking-[0.26em] uppercase",
					dark ? "text-[#ff7377]" : "text-rb-red",
				)}
			>
				{eyebrow}
			</p>
			<h2
				className={cn(
					"mt-4 text-[2.35rem] leading-[1.08] font-semibold text-balance sm:text-5xl",
					dark ? "text-white" : "text-rb-black",
				)}
			>
				{title}
			</h2>
			<p
				className={cn(
					"mt-5 text-base leading-7 sm:text-lg sm:leading-8",
					dark ? "text-white/68" : "text-rb-black/62",
				)}
			>
				{description}
			</p>
		</header>
	);
}

function DetailGrid({
	items,
	dark = false,
	className,
}: {
	items: Detail[];
	dark?: boolean;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"grid border-y",
				dark ? "border-white/14" : "border-black/10",
				items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3",
				className,
			)}
		>
			{items.map((item) => (
				<div
					className={cn(
						"border-b py-5 last:border-b-0 sm:border-r sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0",
						dark ? "border-white/14" : "border-black/10",
					)}
					key={item.title}
				>
					<h3 className={cn("text-base font-semibold", dark ? "text-white" : "text-rb-black")}>
						{item.title}
					</h3>
					<p className={cn("mt-2 text-sm leading-6", dark ? "text-white/58" : "text-rb-black/58")}>
						{item.description}
					</p>
				</div>
			))}
		</div>
	);
}

function ProductCanvas({
	src,
	alt,
	caption,
	className,
	mediaClassName,
	imageClassName,
	sizes = "(max-width: 1280px) 100vw, 1100px",
	loading = "lazy",
}: {
	src: string;
	alt: string;
	caption: string;
	className?: string;
	mediaClassName?: string;
	imageClassName?: string;
	sizes?: string;
	loading?: "eager" | "lazy";
}) {
	return (
		<figure
			className={cn(
				"overflow-hidden rounded-2xl border border-black/10 bg-white p-3 shadow-[0_28px_80px_rgba(1,1,1,0.11)] sm:p-4",
				className,
			)}
		>
			<div className={cn("relative overflow-hidden rounded-xl bg-[#f5f4f2]", mediaClassName)}>
				<Image
					alt={alt}
					className={cn("object-contain", imageClassName)}
					fill
					loading={loading}
					sizes={sizes}
					src={src}
				/>
			</div>
			<figcaption className="grid gap-2 px-1 pt-3 text-xs leading-5 text-rb-black/60">
				<span>{caption}</span>
				<a
					aria-label={`View full image: ${alt}`}
					className="inline-flex shrink-0 items-center gap-1 font-semibold text-rb-red hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rb-red"
					href={src}
					rel="noreferrer"
					target="_blank"
				>
					View full image
					<HugeIcon className="-rotate-45" icon={ArrowRight01Icon} size={14} />
				</a>
			</figcaption>
		</figure>
	);
}

function PlatformHero() {
	return (
		<section className="relative isolate overflow-hidden bg-[#0b1118] text-white">
			<div className="relative mx-auto max-w-7xl px-5 pt-30 pb-10 sm:px-8 sm:pt-34 sm:pb-14 lg:px-10">
				<div className="mx-auto max-w-5xl text-center">
					<p className="text-xs font-semibold tracking-[0.28em] text-white/74 uppercase">
						Redtail platform + mobile apps
					</p>
					<h1 className="mt-6 text-[2.65rem] leading-[1.08] font-semibold tracking-[-0.045em] text-balance text-white sm:text-6xl lg:text-[4.75rem]">
						<span>See every journey.</span>{" "}
						<span className="block text-[#ff5459]">Understand every signal.</span>
					</h1>
					<p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-white/78 sm:text-xl sm:leading-8">
						See where vehicles are, understand how they are being driven, and act on
						alerts, maintenance and fleet performance from one connected platform.
					</p>
					<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
						<Button asChild className="w-full sm:w-auto" size="lg">
							<Link href="/contact-us">
								Book a platform demo
								<HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
							</Link>
						</Button>
						<Button
							asChild
							className="w-full border-white bg-white text-rb-black hover:border-white hover:bg-white/88 hover:text-rb-black sm:w-auto"
							size="lg"
							variant="outline"
						>
							<Link href="#capabilities">Explore capabilities</Link>
						</Button>
					</div>
				</div>

				<figure className="relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-lg border border-white/22 bg-white shadow-[0_34px_120px_rgba(0,0,0,0.55)] sm:mt-12">
					<div className="flex h-10 items-center gap-2 border-b border-black/8 bg-[#f5f4f2] px-4">
						<p className="text-[10px] font-semibold tracking-[0.16em] text-rb-black/62 uppercase">
							Redtail fleet portal
						</p>
					</div>
					<div className="relative aspect-[1380/763] bg-white">
						<Image
							alt="Current Redtail fleet map with vehicle status filters, map controls and journey replay controls"
							className="object-contain"
							fill
							loading="eager"
							sizes="(max-width: 1280px) 94vw, 1150px"
							src="/platform-screenshots/current/fleet-map.jpg"
						/>
					</div>
					<figcaption className="flex flex-col gap-1 border-t border-black/8 px-4 py-3 text-xs leading-5 text-rb-black/60 sm:flex-row sm:items-center sm:justify-between">
						<span>Vehicle visibility, status filters and replay controls.</span>
						<span className="font-semibold">Redtail web portal</span>
					</figcaption>
				</figure>
			</div>
		</section>
	);
}

function PlatformIndex() {
	return (
		<>
			<section aria-label="Platform proof" className="border-b border-black/10 bg-white px-4 sm:px-6 lg:px-8">
				<div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-black/10 sm:grid-cols-4 sm:divide-y-0">
					{proofItems.map(([title, description]) => (
						<div className="px-4 py-6 sm:px-6" key={title}>
							<p className="text-sm font-semibold text-rb-black sm:text-base">{title}</p>
							<p className="mt-1 text-xs leading-5 text-rb-black/60">{description}</p>
						</div>
					))}
				</div>
			</section>

			<section
				className="scroll-mt-24 bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
				id="capabilities"
			>
				<div className="mx-auto max-w-7xl">
					<Heading
						center
						description="Live GPS, driver monitoring, reports and alerts bring vehicle intelligence into one Redtail platform. Explore the capabilities that support your fleet's everyday work."
						eyebrow="Inside Redtail"
						title="Everything you need to keep vehicles moving"
					/>
					<nav aria-label="Platform capabilities" className="mt-12 grid border-y border-black/10 sm:grid-cols-2 lg:grid-cols-4">
						{capabilities.map(([href, label, description, icon]) => (
							<Link
								className="group flex items-start gap-4 border-b border-black/10 px-3 py-6 transition-colors hover:bg-white sm:px-5 lg:border-r"
								href={href}
								key={label}
							>
								<span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-rb-black text-white transition-colors group-hover:bg-rb-red">
									<HugeIcon icon={icon} size={19} />
								</span>
								<span>
									<span className="block text-base font-semibold text-rb-black">{label}</span>
									<span className="mt-1 block text-sm leading-5 text-rb-black/54">{description}</span>
								</span>
							</Link>
						))}
					</nav>
				</div>
			</section>
		</>
	);
}

function Story({
	id,
	eyebrow,
	title,
	description,
	details,
	dark = false,
	reverse = false,
	className,
	children,
}: {
	id: string;
	eyebrow: string;
	title: string;
	description: string;
	details: Detail[];
	dark?: boolean;
	reverse?: boolean;
	className?: string;
	children: ReactNode;
}) {
	return (
		<section className={cn("scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24", className)} id={id}>
			<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16">
				<div className={cn(reverse && "lg:order-2")}>
					<Heading dark={dark} description={description} eyebrow={eyebrow} title={title} />
					<DetailGrid className="mt-8" dark={dark} items={details} />
				</div>
				<div className={cn(reverse && "lg:order-1")}>{children}</div>
			</div>
		</section>
	);
}

function FleetAndJourneyStory() {
	return (
		<Story
			className="border-y border-black/10 bg-white"
			description="View vehicle positions and activity, then replay past journeys to understand speed, stops and driving events. Use that journey history when preparing upcoming trips."
			details={[
				{ title: "Fleet status", description: "Find vehicles and filter active, engine-off or offline states." },
				{ title: "Journey replay", description: "Review route, distance, duration, speed, stops and idle time." },
				{ title: "Trip preparation", description: "Use previous journeys as a reference for upcoming trips." },
			]}
			eyebrow="Fleet visibility + journeys"
			id="fleet-visibility"
			title="Know where vehicles are—and what happened along the way"
		>
			<div className="relative pb-12 sm:pb-16">
				<ProductCanvas
					alt="Redtail journey view showing a mapped route and journey summary"
					caption="Journey replay connects the map to the evidence behind each trip."
					imageClassName="object-contain"
					loading="eager"
					mediaClassName="aspect-[2.26]"
					sizes="(max-width: 1024px) 100vw, 760px"
					src="/platform-screenshots/journey-showcase.jpg"
				/>
				<figure className="mt-4 ml-auto w-44 overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-[0_24px_70px_rgba(1,1,1,0.22)] sm:absolute sm:-bottom-2 sm:left-8 sm:mt-0 sm:w-48">
					<div className="relative aspect-[0.82] overflow-hidden rounded-xl">
						<Image
							alt="Redtail fleet map controls for device status, vehicles and geofences"
							className="object-cover"
							fill
							sizes="192px"
							src="/platform-screenshots/fleet-map-controls.jpg"
						/>
					</div>
				</figure>
			</div>
			<p className="mt-5 text-sm leading-6 text-rb-black/65">
				<strong className="font-semibold text-rb-black">Remote-disable options.</strong>{" "}
				Discuss availability and operating safeguards with Redtail for your proposed deployment.
				Vehicle compatibility and deployment testing must be confirmed before use.
			</p>
		</Story>
	);
}

function DrivingBehaviourStory() {
	return (
		<Story
			className="bg-[#f4f1ed]"
			description="Understand how vehicles are driven so you can support driver coaching, improve efficiency and review risk. See where driving events happen and how patterns change over time."
			details={[
				{ title: "Choose the signal", description: "Filter the behaviour types that matter to the review." },
				{ title: "Locate the pattern", description: "See where selected events concentrate." },
				{ title: "Understand timing", description: "Compare activity by day and hour." },
			]}
			eyebrow="Driving behaviour"
			id="driver-behaviour"
			reverse
			title="See the patterns behind driving events"
		>
			<ProductCanvas
				alt="Redtail driving behaviour analysis with behaviour filters, geographic heatmap and time-of-day activity"
				caption="Driving behaviour analysis groups event types with location and time patterns."
				imageClassName="object-contain"
				mediaClassName="aspect-[1126/1033]"
				src="/platform-screenshots/current/driving-behaviour.jpg"
			/>
		</Story>
	);
}

function AlertsStory() {
	return (
		<Story
			className="border-y border-black/10 bg-white"
			description="Choose what deserves attention, organise alert interests around the job to be done, then decide who is notified and how."
			details={[
				{ title: "Organised interests", description: "Group alerts around fleet needs." },
				{ title: "Delivery controls", description: "Configure email, SMS or push notifications." },
				{ title: "History", description: "Return to alert history and filter events." },
			]}
			eyebrow="Alerts + notifications"
			id="alerts-proof"
			title="Turn fleet signals into the right next action"
		>
			<div className="grid gap-4">
				<ProductCanvas
					alt="Redtail notification controls offering email, SMS and push notification channels"
					caption="Email, SMS and push delivery controls."
					mediaClassName="aspect-[1126/223]"
					src="/platform-screenshots/current/alert-channels.jpg"
				/>
			</div>
		</Story>
	);
}

function MaintenanceStory() {
	return (
		<Story
			className="relative isolate overflow-hidden bg-rb-black text-white"
			dark
			description="Keep vehicle maintenance visible alongside everyday fleet activity. Help your team plan servicing and keep vehicles ready for work."
			details={[
				{ title: "Vehicle maintenance", description: "Keep routine servicing in view." },
				{ title: "Fleet readiness", description: "Coordinate maintenance with vehicle availability." },
				{ title: "Battery status", description: "Review vehicle and device battery status alongside fleet activity." },
			]}
			eyebrow="Maintenance"
			id="maintenance-proof"
			reverse
			title="Keep maintenance part of everyday fleet management"
		>
			<div className="grid gap-4">
				<ProductCanvas
					alt="Current Redtail Vehicle Maintenance page with upcoming and history views and a maintenance calendar"
					caption="Upcoming maintenance, history and calendar views in the Redtail portal."
					imageClassName="object-contain"
					mediaClassName="aspect-[1338/483]"
					src="/platform-screenshots/current/maintenance-calendar.jpg"
				/>
				<ProductCanvas
					alt="Established Redtail Fleet App showing vehicle and device battery states beside recent journeys"
					caption="Vehicle and device battery states in the established Fleet App."
					mediaClassName="aspect-[1.498]"
					src="/platform-screenshots/fleet-battery-journeys-legacy.png"
				/>
			</div>
		</Story>
	);
}

function ReportsStory() {
	return (
		<Story
			className="border-b border-black/10 bg-white"
			description="Use trip history, driving events and alert summaries to review fleet performance. Odometer and journey records help your team organise business mileage and support tax recordkeeping."
			details={[
				{ title: "Trip history", description: "Review journeys, distance and vehicle use." },
				{ title: "Driving and alerts", description: "Review speed, braking, acceleration and recorded events." },
				{ title: "Odometer records", description: "Keep mileage information for business reporting and tax records." },
			]}
			eyebrow="Reporting + mileage"
			id="reports-proof"
			title="Reporting that reflects how your fleet operates"
		>
			<div className="grid gap-4">
				<ProductCanvas
					alt="Current Redtail journey activity calendar with distance and duration views, PDF and CSV export controls and selected-period totals"
					caption="Review journey activity, distance and duration for a selected period."
					imageClassName="object-contain"
					mediaClassName="aspect-[1126/345]"
					sizes="(max-width: 1024px) 100vw, 720px"
					src="/platform-screenshots/current/journey-activity.jpg"
				/>
				<ProductCanvas
					alt="Current Redtail odometer panel showing the mileage reading, projected mileage and how journey distances update the odometer"
					caption="Odometer estimates use the last entered reading plus recorded journey distances."
					imageClassName="object-contain"
					mediaClassName="aspect-[1126/295]"
					sizes="(max-width: 1024px) 100vw, 720px"
					src="/platform-screenshots/current/odometer.jpg"
				/>
				<div className="border-l-2 border-rb-red pl-5">
					<h3 className="text-base font-semibold text-rb-black">Hours of Service</h3>
					<p className="mt-2 text-sm leading-6 text-rb-black/62">
						Journey timing and vehicle-use records add context to Hours of Service
						reviews. Discuss the driver records, reporting and integrations required
						for your operation with Redtail.
					</p>
					<Link className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-rb-red hover:underline" href="/contact-us">
					Discuss HOS requirements
						<HugeIcon icon={ArrowRight01Icon} size={16} />
					</Link>
				</div>
				<div className="border-l-2 border-rb-red pl-5">
					<h3 className="text-base font-semibold text-rb-black">{section179Benefit.title}</h3>
					<p className="mt-2 text-sm leading-6 text-rb-black/62">{section179Benefit.description}</p>
					<a className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-rb-red hover:underline" href={section179Benefit.guidanceHref} rel="noreferrer" target="_blank">
						{section179Benefit.guidanceLabel}
						<HugeIcon className="-rotate-45" icon={ArrowRight01Icon} size={16} />
					</a>
				</div>
			</div>
		</Story>
	);
}

function LocationIntelligenceStory() {
	return (
		<Story
			className="bg-[#eef7fa]"
			description="Use reported and predicted positions to review vehicle location, then explore the journeys and driving events associated with that place. Map views add context when your team reviews activity or prepares an upcoming trip."
			details={[
				{ title: "Predicted location", description: "Distinguish reported positions from predicted positions during a location review." },
				{ title: "Satellite view", description: "Use an aerial view to understand where vehicles and assets are." },
				{ title: "Map overlays", description: "Add geographic context to vehicle movement and geofence reviews." },
			]}
			eyebrow="Location intelligence"
			id="location-intelligence"
			reverse
			title="Understand location in context"
		>
			<div className="grid gap-4 sm:grid-cols-2">
				<ProductCanvas
					alt="Current Redtail Location Prediction panel showing confidence by day of week and hour, based on historical vehicle-location patterns"
					caption="Location prediction uses historical patterns, with confidence shown by day and hour."
					className="sm:col-span-2"
					mediaClassName="aspect-[1126/424]"
					sizes="(max-width: 1024px) 100vw, 720px"
					src="/platform-screenshots/current/location-prediction.jpg"
				/>
				<ProductCanvas
					alt="Established Redtail Fleet App artwork showing a satellite map with vehicle locations, event markers and activity filters"
					caption="Fleet App satellite view with vehicle locations and activity filters."
					imageClassName="object-cover object-center"
					mediaClassName="aspect-[0.52]"
					sizes="(max-width: 640px) 290vw, (max-width: 1024px) 145vw, 600px"
					src="/platform-screenshots/fleet-satellite-app.png"
				/>
				<ProductCanvas
					alt="Established Redtail Fleet App artwork showing a geofence boundary and entry and exit alert controls on a satellite map"
					caption="Fleet App geofence boundaries and entry/exit alert controls."
					imageClassName="object-cover object-center"
					mediaClassName="aspect-[0.52]"
					sizes="(max-width: 640px) 290vw, (max-width: 1024px) 145vw, 600px"
					src="/platform-screenshots/fleet-geofence-app.png"
				/>
				<Link className="inline-flex items-center gap-2 text-sm font-semibold text-rb-red hover:underline sm:col-span-2" href="/contact-us">
					See location intelligence in a demo
					<HugeIcon icon={ArrowRight01Icon} size={16} />
				</Link>
			</div>
		</Story>
	);
}

function CircuitStory() {
	return (
		<Story
			className="bg-[#171515] text-white"
			dark
			description="For performance and circuit workflows, Redtail provides a dedicated venue and session workspace without mixing specialist analysis into everyday fleet operations."
			details={[
				{ title: "Venue directory", description: "Review sessions, vehicles, laps, layouts and activity." },
				{ title: "Lap replay", description: "Open a circuit map and replay a session." },
				{ title: "Comparison", description: "Choose laps for corner-by-corner review." },
			]}
			eyebrow="Specialist capability"
			id="circuit-intelligence"
			title="Move from circuit history into lap replay"
		>
			<div className="grid gap-4 sm:grid-cols-[1.25fr_0.75fr]">
				<ProductCanvas
					alt="Redtail circuit directory listing venues with fastest lap, sessions, vehicles, laps, layout and recent activity"
					caption="Venue-level session and lap context."
					imageClassName="object-contain"
					mediaClassName="aspect-[1324/500]"
					src="/platform-screenshots/current/circuit-directory.jpg"
				/>
				<ProductCanvas
					alt="Redtail circuit lap replay map showing a circuit layout"
					caption="Circuit map for replay or comparison."
					imageClassName="object-contain"
					mediaClassName="aspect-[1.307]"
					src="/platform-screenshots/circuit-map.jpg"
				/>
				<p className="text-xs leading-5 text-white/52 sm:col-span-2">
					Circuit lap times shown by the portal are GPS-derived and approximate.
				</p>
			</div>
		</Story>
	);
}

function StoreButtons({
	appStoreHref,
	googlePlayHref,
	dark = false,
}: {
	appStoreHref: string;
	googlePlayHref: string;
	dark?: boolean;
}) {
	return (
		<div className="mt-7 flex flex-col gap-3 sm:flex-row">
			<Button asChild className="w-full sm:w-auto" size="lg">
				<a href={appStoreHref} rel="noreferrer" target="_blank">
					<HugeIcon data-icon="inline-start" icon={AppStoreIcon} />
					App Store
				</a>
			</Button>
			<Button
				asChild
				className={cn(
					"w-full sm:w-auto",
					dark
						? "border-white/28 bg-white/8 text-white hover:border-white/48 hover:bg-white/14 hover:text-white"
						: "border-rb-black bg-white text-rb-black hover:border-rb-red hover:bg-rb-peach/45 hover:text-rb-red",
				)}
				size="lg"
				variant="outline"
			>
				<a href={googlePlayHref} rel="noreferrer" target="_blank">
					<HugeIcon data-icon="inline-start" icon={PlayStoreIcon} />
					Google Play
				</a>
			</Button>
		</div>
	);
}

function AppDetailList({ items, dark = false }: { items: string[]; dark?: boolean }) {
	return (
		<ul className={cn("mt-7 border-y", dark ? "border-white/14" : "border-black/10")}>
			{items.map((item) => (
				<li
					className={cn(
						"flex items-start gap-3 border-b py-3 last:border-b-0",
						dark ? "border-white/14" : "border-black/10",
					)}
					key={item}
				>
					<HugeIcon
						className={cn("mt-0.5 shrink-0", dark ? "text-[#ff7377]" : "text-rb-red")}
						icon={CheckmarkCircle02Icon}
						size={18}
					/>
					<span className={cn("text-sm leading-6", dark ? "text-white/68" : "text-rb-black/64")}>
						{item}
					</span>
				</li>
			))}
		</ul>
	);
}

function MobileAppsSection() {
	return (
		<section
			className="scroll-mt-24 overflow-hidden border-b border-black/10 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
			id="mobile-apps"
		>
			<div className="mx-auto max-w-7xl">
				<Heading
					center
					description="The web platform carries the full fleet workspace. Redtail Fleet and Redtail Installer provide focused mobile tools for managers and field installers."
					eyebrow="Mobile apps"
					title="Take the right Redtail view into the field"
				/>

				<div className="mt-12 grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-center lg:gap-14">
					<div>
						<p className="text-xs font-semibold tracking-[0.2em] text-rb-red uppercase">For fleet teams</p>
						<h3 className="mt-3 text-3xl font-semibold text-rb-black sm:text-4xl">
							The Redtail Fleet App keeps the map close
						</h3>
						<p className="mt-5 text-base leading-7 text-rb-black/62">
							Review fleet position and status, follow recent trails, focus on one
							vehicle and move into past journeys from the Redtail Fleet App.
						</p>
						<AppDetailList items={fleetAppDetails} />
						<StoreButtons
							appStoreHref="https://apps.apple.com/app/id1375435783"
							googlePlayHref="https://play.google.com/store/apps/details?id=com.redtailtelematics.rtfleet"
						/>
					</div>

					<figure className="overflow-hidden rounded-3xl border border-black/10 bg-[#eef7fa] p-3 shadow-[0_30px_90px_rgba(1,1,1,0.12)] sm:p-6">
						<div className="relative aspect-[1.5]">
							<Image
								alt="Redtail portal on a laptop beside the established Redtail Fleet App map interface on a phone"
								className="object-contain"
								fill
								loading="eager"
								sizes="(max-width: 1024px) 100vw, 760px"
								src="/platform-screenshots/redtail_lap-mob.png"
							/>
						</div>
						<figcaption className="px-2 pt-2 text-xs leading-5 text-rb-black/60">
							The Redtail Fleet App shown beside the web portal.
						</figcaption>
					</figure>
				</div>

				<div className="mt-12 overflow-hidden rounded-3xl bg-rb-black text-white shadow-[0_30px_90px_rgba(1,1,1,0.2)]">
					<div className="grid lg:grid-cols-[1.05fr_0.95fr]">
						<figure className="relative min-h-80 overflow-hidden lg:min-h-[32rem]">
							<Image
								alt="A vehicle installer working inside a car"
								className="object-cover"
								fill
								sizes="(max-width: 1024px) 100vw, 55vw"
								src="/platform-screenshots/installer-workflow.png"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-rb-black/68 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-rb-black/38" />
							<figcaption className="absolute right-5 bottom-5 left-5 text-xs text-white/74">
								A focused installation workflow for Redtail VAM devices.
							</figcaption>
						</figure>
						<div className="p-6 sm:p-8 lg:p-10">
							<p className="text-xs font-semibold tracking-[0.2em] text-[#ff7377] uppercase">For installers</p>
							<h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Redtail Installer App</h3>
							<p className="mt-5 text-base leading-7 text-white/64">
								Support professional fitting and setup of Redtail devices with the
								Redtail Installer App. Confirm vehicle compatibility and installation
								requirements with our team before deployment.
							</p>
							<AppDetailList dark items={installerAppDetails} />
							<StoreButtons
								appStoreHref="https://apps.apple.com/app/id1439172050"
								dark
								googlePlayHref="https://play.google.com/store/apps/details?id=com.redtailtelematics.rtcheck"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function AccessAndCtaSection() {
	return (
		<>
			<section className="bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
				<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-14">
					<Heading
						description="Redtail also includes fleet and organisation controls, user access configuration and activity history so product context stays with the teams that need it."
						eyebrow="Access + oversight"
						title="Keep the right information with the right teams"
					/>
					<div className="grid border-y border-black/10 sm:grid-cols-3">
						{supportingControls.map(([title, body, icon]) => (
							<div
								className="border-b border-black/10 py-6 last:border-b-0 sm:border-r sm:border-b-0 sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
								key={title}
							>
								<HugeIcon className="text-rb-red" icon={icon} size={24} />
								<h3 className="mt-4 text-lg font-semibold text-rb-black">{title}</h3>
								<p className="mt-2 text-sm leading-6 text-rb-black/60">{body}</p>
							</div>
						))}
					</div>
					<p className="text-sm leading-7 text-rb-black/65 lg:col-span-2">
						Redtail&apos;s Quality Management System is ISO 9001 certified, and its
						Information Security Management System is ISO 27001 certified.
						These systems support the quality of our products and services and
						the protection of customer information.
					</p>
				</div>
			</section>

			<section className="bg-[#fcfbf9] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
				<div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-rb-red px-6 py-10 text-white shadow-[0_30px_90px_rgba(207,19,23,0.24)] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
					<div
						aria-hidden="true"
						className="absolute inset-0 opacity-20 [background-image:linear-gradient(120deg,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(30deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:34px_34px,54px_54px]"
					/>
					<div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
						<div className="max-w-3xl">
							<p className="text-xs font-semibold tracking-[0.24em] text-white/72 uppercase">
								See Redtail with your own fleet questions
							</p>
							<h2 className="mt-4 text-3xl leading-tight font-semibold text-white sm:text-5xl">
								Bring your next fleet decision to a live demo.
							</h2>
							<p className="mt-4 max-w-2xl text-base leading-7 text-white/76">
								Walk through fleet status, journeys, behaviour, alerts, maintenance,
								reports, location intelligence and mobile access with your operating model in mind.
							</p>
						</div>
						<div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
							<Button
								asChild
								className="border-white bg-white text-rb-red hover:border-rb-black hover:bg-rb-black hover:text-white"
								size="lg"
							>
								<Link href="/contact-us">
									Book a platform demo
									<HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
								</Link>
							</Button>
							<Button
								asChild
								className="border-white/52 bg-transparent text-white hover:border-white hover:bg-white/12 hover:text-white"
								size="lg"
								variant="outline"
							>
								<Link href="/solutions/fleet-management">Explore fleet management</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export function PlatformAndAppsSections() {
	return (
		<>
			<PlatformHero />
			<PlatformIndex />
			<FleetAndJourneyStory />
			<DrivingBehaviourStory />
			<AlertsStory />
			<MaintenanceStory />
			<ReportsStory />
			<LocationIntelligenceStory />
			<CircuitStory />
			<MobileAppsSection />
			<AccessAndCtaSection />
		</>
	);
}
