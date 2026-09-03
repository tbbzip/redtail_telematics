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
import { cn } from "@/lib/utils";

type Detail = { title: string; description: string };

const capabilities = [
	["#fleet-visibility", "Fleet & journeys", "Status, maps and route replay", MapsLocation01Icon],
	["#driver-behaviour", "Driving behaviour", "Event patterns by place and time", CarSignalIcon],
	["#alerts-proof", "Alerts & geofences", "Interests, history and channels", Alert02Icon],
	["#maintenance-proof", "Maintenance", "Planning, tasks and due states", Wrench01Icon],
	["#reports-proof", "Reports", "Templates, schedules and history", FileChartColumnIcon],
	["#device-health", "Device health", "Power, connectivity and activity", GpsSignal01Icon],
	["#circuit-intelligence", "Circuit intelligence", "Sessions, laps and comparison", Route03Icon],
	["#mobile-apps", "Mobile access", "Fleet and installer apps", SmartPhone01Icon],
] satisfies [string, string, string, IconSvgElement][];

const fleetAppDetails = [
	"See fleet positions and vehicle direction",
	"Follow recent trails and open past journeys",
	"Filter vehicles by driving, idling or engine-off status",
	"Focus on one vehicle without returning to the office",
];

const installerAppDetails = [
	"Check whether a Redtail device is communicating",
	"Record and review installation details",
	"Review activity for managed installers",
];

const proofItems = [
	["Journey visibility", "Current and historical context"],
	["Email · SMS · Push", "Configurable alert channels"],
	["32 report templates", "Scheduled or on-demand"],
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
			<figcaption className="px-1 pt-3 text-xs leading-5 text-rb-black/60">{caption}</figcaption>
		</figure>
	);
}

function PlatformHero() {
	return (
		<section className="relative isolate overflow-hidden bg-rb-black text-white">
			<Image
				alt=""
				aria-hidden="true"
				className="object-cover object-[center_68%] opacity-[0.58] sm:object-[center_62%]"
				fill
				priority
				sizes="100vw"
				src="/carousel/fleet.jpg"
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,1,1,0.74)_0%,rgba(1,1,1,0.62)_43%,rgba(1,1,1,0.94)_100%)]"
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(207,19,23,0.36),transparent_28%),radial-gradient(circle_at_84%_72%,rgba(61,187,211,0.16),transparent_25%)]"
			/>

			<div className="relative mx-auto max-w-7xl px-4 pt-28 pb-10 sm:px-6 sm:pt-36 sm:pb-14 lg:px-8">
				<div className="mx-auto max-w-5xl text-center">
					<p className="text-xs font-semibold tracking-[0.28em] text-white/74 uppercase">
						Redtail platform + mobile apps
					</p>
					<h1 className="mt-6 text-[3rem] leading-[0.98] font-semibold text-balance text-white sm:text-6xl lg:text-[4.75rem]">
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

				<figure className="relative mx-auto mt-10 max-w-6xl overflow-hidden rounded-2xl border border-white/22 bg-white shadow-[0_34px_120px_rgba(0,0,0,0.55)] sm:mt-12">
					<div className="flex h-10 items-center gap-2 border-b border-black/8 bg-[#f5f4f2] px-4">
						<span className="size-2.5 rounded-full bg-rb-red/78" />
						<span className="size-2.5 rounded-full bg-rb-orange/42" />
						<span className="size-2.5 rounded-full bg-rb-green/42" />
						<p className="ml-3 text-[10px] font-semibold tracking-[0.16em] text-rb-black/62 uppercase">
							Journey Showcase
						</p>
					</div>
					<div className="relative aspect-[1.15] bg-[#d8eef4] sm:aspect-[1.82] lg:aspect-[2.26]">
						<Image
							alt="Redtail Journey Showcase displaying a mapped route with distance, duration, speed, idle time and event details"
							className="object-cover object-left"
							fill
							loading="eager"
							sizes="(max-width: 1280px) 94vw, 1150px"
							src="/platform-screenshots/journey-showcase.jpg"
						/>
					</div>
					<figcaption className="flex flex-col gap-1 border-t border-black/8 px-4 py-3 text-xs leading-5 text-rb-black/60 sm:flex-row sm:items-center sm:justify-between">
						<span>Route, speed, stops, idle time and events in one connected view.</span>
						<span className="font-semibold">Redtail portal interface</span>
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
						description="Move directly into the part of Redtail that answers the question in front of your team. Each capability has its own product view and purpose."
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
			description="Move from the current fleet picture into the journey that explains it. Status filters, vehicle focus and geofence controls stay close to route replay and event detail."
			details={[
				{ title: "Fleet status", description: "Find vehicles and filter active, engine-off or offline states." },
				{ title: "Journey replay", description: "Review route, distance, duration, speed, stops and idle time." },
				{ title: "Map controls", description: "Focus vehicle layers and work with geofence controls." },
			]}
			eyebrow="Fleet visibility + journeys"
			id="fleet-visibility"
			title="Know where vehicles are—and what happened along the way"
		>
			<div className="relative pb-12 sm:pb-16">
				<ProductCanvas
					alt="Redtail journey view showing a mapped route and journey summary"
					caption="Journey replay connects the map to the evidence behind each trip."
					imageClassName="object-cover object-left sm:object-contain"
					loading="eager"
					mediaClassName="aspect-[1.2] sm:aspect-[2.26]"
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
		</Story>
	);
}

function DrivingBehaviourStory() {
	return (
		<Story
			className="bg-[#f4f1ed]"
			description="Select the behaviours you want to understand, see where events cluster and compare when they occur. The result is a pattern your team can investigate, not an isolated alert."
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
				imageClassName="object-cover object-left sm:object-contain"
				mediaClassName="aspect-[1.05] sm:aspect-[1.68]"
				src="/platform-screenshots/driving-behaviour.jpg"
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
					alt="Redtail alert interests grouped by misuse, comfort, efficiency, maintenance, compliance and device health"
					caption="Alert interests grouped around common fleet needs."
					imageClassName="object-cover object-left sm:object-contain"
					mediaClassName="aspect-[3.15] sm:aspect-[6.74]"
					src="/platform-screenshots/alert-categories.jpg"
				/>
				<ProductCanvas
					alt="Redtail notification controls offering email, SMS and push notification channels"
					caption="Email, SMS and push delivery controls."
					mediaClassName="aspect-[3.08]"
					src="/platform-screenshots/alert-channels.jpg"
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
			description="Bring planned work, due states, calendar context, task presets, vehicles and recipients into one maintenance workspace."
			details={[
				{ title: "See the workload", description: "Review planned, due, booked, overdue and on-hold states." },
				{ title: "Use the calendar", description: "See upcoming maintenance in schedule context." },
				{ title: "Create the task", description: "Select a preset, vehicle, interval and recipient." },
			]}
			eyebrow="Maintenance"
			id="maintenance-proof"
			reverse
			title="Plan the work before it becomes overdue"
		>
			<div className="grid gap-4">
				<ProductCanvas
					alt="Redtail fleet maintenance status and planning calendar"
					caption="Maintenance status and calendar planning."
					imageClassName="object-cover object-left sm:object-contain"
					mediaClassName="aspect-[1.86] sm:aspect-[3.728]"
					src="/platform-screenshots/maintenance-planning.jpg"
				/>
				<ProductCanvas
					alt="Redtail add planned maintenance dialog with preset, vehicle, interval and recipient fields"
					caption="Planned maintenance setup with presets and recipients."
					mediaClassName="aspect-[1.95]"
					src="/platform-screenshots/maintenance-task.jpg"
				/>
			</div>
		</Story>
	);
}

function ReportsStory() {
	return (
		<Story
			className="border-b border-black/10 bg-white"
			description="Run reports when you need them or schedule them for your team. The catalog spans vehicle health, driving behaviour, usage, devices and user management."
			details={[
				{ title: "Choose a template", description: "Start with one of 32 report templates." },
				{ title: "Run or schedule", description: "Use on-demand setup or create a schedule." },
			]}
			eyebrow="32 report templates"
			id="reports-proof"
			title="A ready-to-run catalog for common fleet questions"
		>
			<ProductCanvas
				alt="Redtail report catalog listing templates, categories, descriptions and scheduled or on-demand setup actions"
				caption="32 report templates with scheduled and on-demand setup actions."
				imageClassName="object-cover object-left sm:object-contain"
				mediaClassName="aspect-[1.2] sm:aspect-[2.52]"
				sizes="(max-width: 1024px) 100vw, 720px"
				src="/platform-screenshots/report-catalog.jpg"
			/>
		</Story>
	);
}

function DeviceHealthStory() {
	return (
		<Story
			className="bg-[#eef7fa]"
			description="Device state is easier to trust when teams can see activity over time. The timeline brings faults, SIM state, power, first fix and heartbeat into the same review."
			details={[
				{ title: "Connectivity", description: "Review SIM and heartbeat state over time." },
				{ title: "Power", description: "See whether the device remained vehicle-powered." },
				{ title: "Activity", description: "Connect device activity and idling to the timeline." },
			]}
			eyebrow="Device health"
			id="device-health"
			reverse
			title="See the signal behind the vehicle connection"
		>
			<ProductCanvas
				alt="Redtail device activity timeline showing faults, SIM, activity, power, first fix and heartbeat"
				caption="A time-based view of connectivity, activity and vehicle power."
				imageClassName="object-cover object-left sm:object-contain"
				mediaClassName="aspect-[2.2] sm:aspect-[4.66]"
				src="/platform-screenshots/device-timeline.jpg"
			/>
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
					imageClassName="object-cover object-top"
					mediaClassName="aspect-[1.12] sm:aspect-[1.35]"
					src="/platform-screenshots/circuit-directory.jpg"
				/>
				<ProductCanvas
					alt="Redtail circuit lap replay map showing a circuit layout"
					caption="Circuit map for replay or comparison."
					imageClassName="object-cover"
					mediaClassName="aspect-[1.12] sm:aspect-[0.81]"
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
								Support device installation with communication checks, recorded
								installation details and an overview of managed installer activity.
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
								reports, device health and mobile access with your operating model in mind.
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
			<DeviceHealthStory />
			<CircuitStory />
			<MobileAppsSection />
			<AccessAndCtaSection />
		</>
	);
}
