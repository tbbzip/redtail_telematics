import Image from "next/image";
import Link from "next/link";
import {
	AmbulanceIcon,
	ArrowRight01Icon,
	ArrowUpRight01Icon,
	CarTimeIcon,
	ChartLineData02Icon,
	CheckmarkCircle02Icon,
	ConstructionIcon,
	CourtHouseIcon,
	CpuSettingsIcon,
	DeliveryTruck01Icon,
	DeviceAccessIcon,
	Download01Icon,
	ElectricTower01Icon,
	Factory01Icon,
	FileDownloadIcon,
	Route03Icon,
	SchoolBusIcon,
	ShieldKeyIcon,
	ToolboxIcon,
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

const deviceSlides = [
	{
		name: "VAM-HUB",
		image: "/devices/vam-hub.png",
		href: "#vam-hub",
	},
	{
		name: "VAM-OBD",
		image: "/devices/obd.png",
		href: "#vam-obd",
	},
	{
		name: "VAM-HDR",
		image: "/devices/vam-hdr.png",
		href: "#vam-hdr",
	},
	{
		name: "VAM-Rugged",
		image: "/devices/rugged.png",
		href: "#vam-rugged",
	},
	{
		name: "VAM-HD (Plug & Play)",
		image: "/devices/vam-hd.png",
		href: "#vam-hd",
	},
];

const quickValueItems = [
	{
		title: "HD Data in Seconds",
		description: "Up to 1 kHz impact sampling and 350+ OTA settings.",
		icon: ChartLineData02Icon,
	},
	{
		title: "Tamper-Proof Designs",
		description: "IP67 rugged enclosures and covert installs keep data secure.",
		icon: ShieldKeyIcon,
	},
	{
		title: "6 Form Factors",
		description: "Hard-wired, battery, OBD, BLE tag - pick the ideal install.",
		icon: DeviceAccessIcon,
	},
] satisfies {
	title: string;
	description: string;
	icon: IconSvgElement;
}[];

const trustedLogos = [
	{
		src: "/clients/ford.svg",
		alt: "Ford",
		width: 118,
		height: 36,
	},
	{
		src: "/clients/admiral.svg",
		alt: "Admiral",
		width: 136,
		height: 36,
	},
	{
		src: "/clients/jaguar.svg",
		alt: "Jaguar",
		width: 88,
		height: 36,
	},
	{
		src: "/clients/lojack.svg",
		alt: "Lo-Jack",
		width: 124,
		height: 36,
	},
	{
		src: "/clients/lr.svg",
		alt: "Land Rover",
		width: 118,
		height: 36,
	},
	{
		src: "/clients/fujitsu.svg",
		alt: "Fujitsu",
		width: 128,
		height: 36,
	},
];

const deviceLineup = [
	{
		name: "VAM-HUB",
		id: "vam-hub",
		tagline: "Pro-install black-box for insurance & fleets",
		image: "/devices/vam-hub.png",
		alt: "VAM-HUB",
		description:
			"Flagship HD recorder with advanced IMU. Hard-wired install and fully OTA-configurable - ideal for high-volume deployments.",
		highlights: ["9-axis IMU @1 kHz", "AES-256 tamper seal", "Dual-CAN / J1939"],
		toneClass: "from-rb-peach/70",
	},
	{
		name: "VAM-HDR",
		id: "vam-hdr",
		tagline: "Self-install or pro-fit with rechargeable battery",
		image: "/devices/vam-hdr.png",
		alt: "VAM-HDR",
		description:
			"Quick-fit form factor with integrated Li-ion pack - perfect for mixed fleets needing both portable and permanent options.",
		highlights: ["LTE Cat-M / NB-IoT", "6-month battery", "Tool-less install"],
		toneClass: "from-rb-light-blue/85",
	},
	{
		name: "VAM-Rugged",
		id: "vam-rugged",
		tagline: "IP67 dual-power for harsh sites & assets",
		image: "/devices/rugged.png",
		alt: "VAM-Rugged",
		description:
			"Solar-augmented, fully-potted electronics survive extremes of dust, moisture, and vibration on heavy equipment and containers.",
		highlights: [
			"IP67, -40 degrees C to 85 degrees C",
			"Solar + backup cell",
			"Mag-mount or bracket",
		],
		toneClass: "from-rb-light-green/85",
	},
	{
		name: "VAM-OBD",
		id: "vam-obd",
		tagline: "Plug-and-go for UBI & consumer",
		image: "/devices/obd.png",
		alt: "VAM-OBD",
		description:
			"True plug-and-drive install in under 60 seconds. Reads VIN, DTCs, and high-res accelerometer data - perfect for UBI.",
		highlights: ["OBD-II + J1962", "VIN & DTC pull", "Eco/idle scoring"],
		toneClass: "from-rb-peach/60",
	},
	{
		name: "Bluetooth Tag",
		id: "bluetooth-tag",
		tagline: "Driver ID & remote IoT sensor",
		image: "/devices/bluetooth.png",
		alt: "Bluetooth Tag",
		description:
			"Tiny BLE beacon pairs with any VAM device to add driver ID and sensor data (temperature, door, tilt) with no wiring required.",
		highlights: ["Multi-year coin cell", "iBeacon / Eddystone", "100 m line-of-sight"],
		toneClass: "from-rb-light-blue/80",
	},
];

const useCases = [
	{
		title: "Government",
		description: "We help governments track fleets & assets.",
		href: "/industries/government",
		icon: CourtHouseIcon,
	},
	{
		title: "Car Rental",
		description: "Track mileage, damage & overdue returns.",
		href: "/industries/car-rental",
		icon: CarTimeIcon,
	},
	{
		title: "Construction",
		description: "Rugged trackers for assets in harsh sites.",
		href: "/industries/construction",
		icon: ConstructionIcon,
	},
	{
		title: "Logistics",
		description: "Live ETAs & cold-chain compliance.",
		href: "/industries/transportation-and-logistics",
		icon: DeliveryTruck01Icon,
	},
	{
		title: "Field Services",
		description: "Route optimisation & proof-of-service.",
		href: "/industries/field-services",
		icon: ToolboxIcon,
	},
	{
		title: "Emergency Vehicles",
		description: "High-priority dispatch & driver safety.",
		href: "/industries/emergency-vehicles",
		icon: AmbulanceIcon,
	},
	{
		title: "Passenger Transit",
		description: "Improve on-time arrivals & capacity use.",
		href: "/industries/passenger-transit",
		icon: SchoolBusIcon,
	},
	{
		title: "Utilities",
		description: "Grid-safe work-zone alerts & crew audit.",
		href: "/industries/utilities",
		icon: ElectricTower01Icon,
	},
] satisfies {
	title: string;
	description: string;
	href: string;
	icon: IconSvgElement;
}[];

const differentiators = [
	{
		value: "30 + yrs",
		label: "Engineering experience across automotive & aerospace.",
		icon: Factory01Icon,
	},
	{
		value: "Technology",
		label: "Vibration-profiling, self-orientation & anti-jamming tech.",
		icon: CpuSettingsIcon,
	},
	{
		value: "End-to-End",
		label: "Control of supply-chain from PCB layout to app delivery.",
		icon: Route03Icon,
	},
] satisfies {
	value: string;
	label: string;
	icon: IconSvgElement;
}[];

const specRows = [
	{
		model: "VAM-HUB",
		install: "Pro",
		power: "Vehicle + backup",
		gpsRate: "1 Hz",
		accelGyro: "10 Hz / 5 Hz",
		battery: "1.3 Ah",
	},
	{
		model: "VAM-HDR",
		install: "Pro / DIY",
		power: "Rechargeable",
		gpsRate: "1 Hz",
		accelGyro: "10 Hz / 5 Hz",
		battery: "2.2 Ah",
	},
	{
		model: "VAM-Rugged",
		install: "Pro",
		power: "Dual (3.9 Ah)",
		gpsRate: "1 Hz",
		accelGyro: "10 Hz / 5 Hz",
		battery: "3.9 Ah",
	},
	{
		model: "VAM-OBD",
		install: "DIY",
		power: "Vehicle + 0.3 Ah",
		gpsRate: "1 Hz",
		accelGyro: "10 Hz / 5 Hz",
		battery: "0.3 Ah",
	},
];

const results = [
	{
		name: "Global Logistics Client",
		quote: "30 % maintenance savings across a 2,500-vehicle fleet.",
	},
	{
		name: "Leading Insurtech Partner",
		quote: "50 % faster claim resolution using HD driver data.",
	},
	{
		name: "UK Construction Group",
		quote: "Downtime cut by 28 % on heavy-plant equipment.",
	},
];

function DeviceSlideCard({
	device,
	index,
}: {
	device: (typeof deviceSlides)[number];
	index: number;
}) {
	const featured = index === 0;

	return (
		<Link
			className={cn(
				"group relative flex min-h-[18rem] min-w-[16.5rem] flex-col justify-between overflow-hidden rounded-2xl border border-white/14 bg-white/[0.075] p-4 text-white shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-rb-red/55 hover:bg-white/[0.11] sm:min-w-[18rem]",
				featured && "border-rb-red/44 bg-rb-red/12"
			)}
			href={device.href}
		>
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-[11px] font-semibold tracking-[0.2em] text-white/44 uppercase">
						Device {String(index + 1).padStart(2, "0")}
					</p>
					<h3 className="mt-2 text-xl font-semibold leading-tight text-white">
						{device.name}
					</h3>
				</div>
				<span className="rounded-full border border-white/14 px-3 py-1 text-xs font-semibold text-white/68">
					See Specs
				</span>
			</div>

			<div className="relative mx-auto mt-5 aspect-square w-full max-w-[13rem]">
				<Image
					alt={device.name}
					className="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)] transition duration-300 group-hover:scale-105"
					fill
					sizes="220px"
					src={device.image}
				/>
			</div>
		</Link>
	);
}

function QuickValueStrip() {
	return (
		<div className="relative border-y border-white/10 bg-white/[0.045] backdrop-blur-md">
			<div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_1fr_1fr_18rem] lg:px-8">
				{quickValueItems.map((item) => (
					<div className="flex gap-3" key={item.title}>
						<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rb-red text-white">
							<HugeIcon icon={item.icon} />
						</div>
						<div>
							<p className="text-sm font-semibold text-white">{item.title}</p>
							<p className="mt-1 text-xs leading-5 text-white/56">
								{item.description}
							</p>
						</div>
					</div>
				))}
				<p className="border-t border-white/10 pt-4 text-xs leading-5 text-white/58 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-5">
					All models include GSM/GPRS, GNSS & Glonass with anti-jamming tech.
				</p>
			</div>
		</div>
	);
}

function TrustedByStrip() {
	return (
		<div className="relative bg-rb-black px-4 py-6 sm:px-6 lg:px-8">
			<div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[18rem_1fr] lg:items-center">
				<p className="text-xs font-semibold tracking-[0.24em] text-white/54 uppercase">
					Trusted by industry leaders
				</p>
				<div className="mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] overflow-hidden">
					<InfiniteSlider gap={46} speed={24} speedOnHover={13}>
						{trustedLogos.map((logo) => (
							<div
								className="flex min-w-[124px] items-center justify-center"
								key={logo.alt}
							>
								<Image
									alt={logo.alt}
									className="h-5 w-auto object-contain opacity-62 brightness-0 invert transition duration-300 hover:opacity-95 sm:h-6"
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

export function DeviceHeroSection() {
	return (
		<section className="relative isolate overflow-hidden rounded-b-3xl bg-rb-black text-white">
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(207,19,23,0.24),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(255,255,255,0.12),transparent_24%),linear-gradient(135deg,#010101,#161514_54%,#010101)]"
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 opacity-34 [background-image:linear-gradient(120deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(30deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:36px_36px,58px_58px]"
			/>

			<div className="relative mx-auto grid min-h-[86svh] max-w-7xl gap-10 px-4 pt-24 pb-10 sm:px-6 sm:pt-32 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:px-8 lg:pt-28">
				<div className="max-w-2xl">
					<div className="inline-flex items-center gap-3">
						<span className="flex size-10 items-center justify-center rounded-md bg-rb-red text-white shadow-[0_16px_34px_rgba(207,19,23,0.32)]">
							<HugeIcon icon={DeviceAccessIcon} />
						</span>
						<p className="text-xs font-semibold tracking-[0.28em] text-white/78 uppercase">
							Devices
						</p>
					</div>

					<h1 className="mt-7 max-w-3xl text-[2.6rem] leading-[1.02] font-semibold tracking-tight text-balance text-white sm:text-5xl sm:leading-tight lg:text-[3.6rem]">
						World-Class Telematics, Tailored to Your Fleet.
					</h1>

					<p className="mt-5 max-w-2xl text-sm leading-6 text-white/72 sm:text-lg sm:leading-8">
						From covert installs to plug-and-play OBD, the Redtail VAM family
						captures high-definition driver and vehicle data in any environment.
					</p>

					<p className="mt-5 text-sm font-semibold tracking-[0.18em] text-white/54 uppercase">
						5 million+ devices deployed worldwide
					</p>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Button asChild className="w-full sm:w-auto" size="lg">
							<Link href="/contact-us">
								Book a Demo
								<HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
							</Link>
						</Button>
						<Button
							asChild
							className="w-full border-white/32 bg-white/8 text-white hover:border-white/48 hover:bg-white/14 hover:text-white sm:w-auto"
							size="lg"
							variant="outline"
						>
							<Link href="#technical-specs">
								<HugeIcon data-icon="inline-start" icon={Download01Icon} />
								Download Datasheet
							</Link>
						</Button>
					</div>

					<div className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-white/18 border-y border-white/16 py-4 sm:py-5">
						<div className="pr-3 sm:pr-4">
							<p className="text-lg font-semibold text-white sm:text-2xl">
								1 kHz
							</p>
							<p className="mt-2 text-[11px] leading-4 text-white/52 sm:text-xs">
								impact sampling
							</p>
						</div>
						<div className="px-3 sm:px-4">
							<p className="text-lg font-semibold text-white sm:text-2xl">
								350+
							</p>
							<p className="mt-2 text-[11px] leading-4 text-white/52 sm:text-xs">
								OTA settings
							</p>
						</div>
						<div className="pl-3 sm:pl-4">
							<p className="text-lg font-semibold text-white sm:text-2xl">
								6
							</p>
							<p className="mt-2 text-[11px] leading-4 text-white/52 sm:text-xs">
								form factors
							</p>
						</div>
					</div>
				</div>

				<div className="min-w-0">
					<div className="mb-4 flex items-center justify-between gap-4">
						<p className="text-xs font-semibold tracking-[0.22em] text-white/52 uppercase">
							Device family
						</p>
						<div className="hidden items-center gap-2 text-xs text-white/48 sm:flex">
							<span className="size-2 rounded-full bg-rb-red" />
							Scroll lineup
						</div>
					</div>
					<div className="mask-[linear-gradient(to_right,black_0%,black_82%,transparent)] overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
						<div className="flex gap-4">
							{deviceSlides.map((device, index) => (
								<DeviceSlideCard
									device={device}
									index={index}
									key={device.name}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			<QuickValueStrip />
			<TrustedByStrip />
		</section>
	);
}

function DeviceLineupCard({
	device,
	index,
}: {
	device: (typeof deviceLineup)[number];
	index: number;
}) {
	const featured = index === 0;

	return (
		<Card
			className={cn(
				"relative isolate border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0 transition duration-300 hover:-translate-y-1 hover:border-rb-red/28 hover:shadow-[0_24px_70px_rgba(1,1,1,0.1)]",
				featured && "lg:col-span-2"
			)}
			id={device.id}
		>
			<div
				aria-hidden="true"
				className={cn(
					"absolute inset-x-0 top-0 h-28 bg-linear-to-b to-transparent",
					device.toneClass
				)}
			/>
			<CardHeader className="relative gap-5 px-6 pt-6 sm:px-7 sm:pt-7">
				<div className="flex items-start justify-between gap-4">
					<div
						className={cn(
							"flex size-12 items-center justify-center rounded-xl text-white shadow-[0_16px_34px_rgba(207,19,23,0.18)]",
							featured ? "bg-rb-red" : "bg-rb-black"
						)}
					>
						<HugeIcon icon={DeviceAccessIcon} size={22} />
					</div>
					<Badge
						className="border-black/10 bg-white/70 text-rb-black/54 backdrop-blur-sm"
						variant="outline"
					>
						{String(index + 1).padStart(2, "0")}
					</Badge>
				</div>
				<div className="grid gap-5 sm:grid-cols-[1fr_9rem] sm:items-end">
					<div>
						<Badge
							className={cn(
								"mb-4",
								featured ? "bg-rb-red text-white" : "bg-rb-black text-white"
							)}
						>
							{device.tagline}
						</Badge>
						<CardTitle className="text-2xl font-semibold leading-tight text-rb-black sm:text-3xl">
							{device.name}
						</CardTitle>
					</div>
					<div className="relative aspect-square w-32 justify-self-start sm:w-36 sm:justify-self-end">
						<Image
							alt={device.alt}
							className="object-contain drop-shadow-[0_18px_28px_rgba(1,1,1,0.12)]"
							fill
							sizes="144px"
							src={device.image}
						/>
					</div>
				</div>
			</CardHeader>
			<CardContent className="relative px-6 pb-6 sm:px-7 sm:pb-7">
				<CardDescription className="text-sm leading-6 text-rb-black/58 sm:text-base sm:leading-7">
					{device.description}
				</CardDescription>
				<div className="mt-5 grid gap-2">
					{device.highlights.map((highlight) => (
						<div className="flex items-start gap-3" key={highlight}>
							<span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-rb-red/40 text-rb-red">
								<HugeIcon icon={CheckmarkCircle02Icon} size={13} />
							</span>
							<p className="text-sm leading-6 text-rb-black/64">{highlight}</p>
						</div>
					))}
				</div>
				<Link
					className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rb-red transition hover:text-rb-black"
					href="#technical-specs"
				>
					View Specs
					<HugeIcon icon={ArrowRight01Icon} size={15} />
				</Link>
			</CardContent>
		</Card>
	);
}

export function DeviceLineupSection() {
	return (
		<section
			className="border-b border-black/10 bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
			id="device-lineup"
		>
			<div className="mx-auto max-w-7xl">
				<header className="grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
					<div>
						<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
							Device Lineup
						</p>
						<h2 className="mt-4 text-[2.35rem] font-semibold leading-tight tracking-tight text-rb-black sm:text-5xl">
							Choose Your Perfect Fit
						</h2>
					</div>
					<p className="max-w-3xl text-base leading-7 text-rb-black/60 sm:text-lg sm:leading-8 lg:justify-self-end">
						From hard-wired black boxes to OBD and BLE accessories, the VAM
						family is structured around different install needs, operating
						environments, and customer programs.
					</p>
				</header>

				<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{deviceLineup.map((device, index) => (
						<DeviceLineupCard
							device={device}
							index={index}
							key={device.name}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

export function UseCaseSpotlightSection() {
	return (
		<section className="border-b border-black/10 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<header className="max-w-3xl">
					<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
						Use Cases
					</p>
					<h2 className="mt-4 text-[2.35rem] font-semibold leading-tight tracking-tight text-rb-black sm:text-5xl">
						Where Our Devices Shine
					</h2>
				</header>

				<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{useCases.map((useCase) => (
						<Link
							className="group rounded-2xl border border-black/10 bg-white p-5 shadow-[0_18px_50px_rgba(1,1,1,0.05)] transition duration-300 hover:-translate-y-1 hover:border-rb-red/30 hover:shadow-[0_24px_70px_rgba(1,1,1,0.09)]"
							href={useCase.href}
							key={useCase.title}
						>
							<div className="flex size-12 items-center justify-center rounded-xl bg-rb-black text-white transition group-hover:bg-rb-red">
								<HugeIcon icon={useCase.icon} size={22} />
							</div>
							<h3 className="mt-5 text-xl font-semibold text-rb-black">
								{useCase.title}
							</h3>
							<p className="mt-3 text-sm leading-6 text-rb-black/58">
								{useCase.description}
							</p>
							<div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-rb-red">
								Learn more
								<HugeIcon icon={ArrowUpRight01Icon} size={15} />
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}

export function WhyRedtailSection() {
	return (
		<section className="relative overflow-hidden bg-rb-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rb-red/70 to-transparent"
			/>
			<div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
				<div>
					<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
						Why Redtail
					</p>
					<h2 className="mt-4 max-w-2xl text-[2.35rem] font-semibold leading-tight tracking-tight text-white sm:text-5xl">
						Built by Engineers, Trusted Worldwide
					</h2>
					<p className="mt-5 max-w-2xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
						REDTAIL draws on decades of design engineering consultancy in
						diverse industries from automotive to healthcare, F1 to Defence to
						build quality hardware currently protecting more than 2 M+ drivers.
					</p>

					<div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
						{differentiators.map((item) => (
							<div
								className="rounded-2xl border border-white/10 bg-white/[0.045] p-5"
								key={item.value}
							>
								<div className="flex size-11 items-center justify-center rounded-xl bg-rb-red text-white">
									<HugeIcon icon={item.icon} size={20} />
								</div>
								<p className="mt-4 text-lg font-semibold text-white">
									{item.value}
								</p>
								<p className="mt-2 text-sm leading-6 text-white/58">
									{item.label}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
					<div className="relative aspect-[1.2] min-h-[22rem]">
						<Image
							alt="Redtail production line with engineers calibrating devices"
							className="object-cover"
							fill
							sizes="(min-width: 1024px) 48vw, 100vw"
							src="/carousel/oem-web.jpg"
						/>
						<div className="absolute inset-0 bg-linear-to-t from-rb-black/78 via-rb-black/18 to-transparent" />
						<div className="absolute right-5 bottom-5 left-5 rounded-2xl border border-white/14 bg-rb-black/76 p-5 backdrop-blur-md">
							<p className="text-sm font-semibold text-white">
								Need a custom variant?
							</p>
							<p className="mt-2 text-sm leading-6 text-white/62">
								Talk to Engineering.
							</p>
							<Button asChild className="mt-5" size="lg">
								<Link href="/contact-us">
									Start the Conversation
									<HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function SpecsTable() {
	return (
		<div className="overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-[0_18px_50px_rgba(1,1,1,0.06)]">
			<table className="w-full min-w-[46rem] border-collapse text-left text-sm">
				<thead className="bg-rb-black text-white">
					<tr>
						<th className="px-5 py-4 font-semibold">Model</th>
						<th className="px-5 py-4 font-semibold">Install</th>
						<th className="px-5 py-4 font-semibold">Power</th>
						<th className="px-5 py-4 font-semibold">GPS Rate</th>
						<th className="px-5 py-4 font-semibold">Accel / Gyro</th>
						<th className="px-5 py-4 font-semibold">Battery</th>
					</tr>
				</thead>
				<tbody>
					{specRows.map((row) => (
						<tr className="border-t border-black/10" key={row.model}>
							<td className="px-5 py-4 font-semibold text-rb-black">
								{row.model}
							</td>
							<td className="px-5 py-4 text-rb-black/62">{row.install}</td>
							<td className="px-5 py-4 text-rb-black/62">{row.power}</td>
							<td className="px-5 py-4 text-rb-black/62">{row.gpsRate}</td>
							<td className="px-5 py-4 text-rb-black/62">{row.accelGyro}</td>
							<td className="px-5 py-4 text-rb-black/62">{row.battery}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function SpecsSnapshotSection() {
	return (
		<section
			className="border-b border-black/10 bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
			id="technical-specs"
		>
			<div className="mx-auto max-w-7xl">
				<header className="grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-end">
					<div>
						<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
							Technical Specs
						</p>
						<h2 className="mt-4 text-[2.35rem] font-semibold leading-tight tracking-tight text-rb-black sm:text-5xl">
							Technical Specs, At a Glance
						</h2>
					</div>
					<div className="flex flex-col gap-3 sm:flex-row lg:justify-self-end">
						<Button asChild className="w-full sm:w-auto" size="lg">
							<Link href="/contact-us">
								Download Full Spec Sheet
								<HugeIcon data-icon="inline-end" icon={FileDownloadIcon} />
							</Link>
						</Button>
						<Button
							asChild
							className="w-full border-rb-black bg-white text-rb-black hover:border-rb-red hover:bg-rb-peach/45 hover:text-rb-red sm:w-auto"
							size="lg"
							variant="outline"
						>
							<Link href="#device-lineup">See full comparison</Link>
						</Button>
					</div>
				</header>

				<div className="mt-10">
					<SpecsTable />
				</div>

				<div className="mt-12 grid gap-4 lg:grid-cols-3">
					{results.map((result) => (
						<Card
							className="border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0"
							key={result.name}
						>
							<CardHeader className="px-6 pt-6">
								<Badge className="w-fit bg-rb-black text-white">Results</Badge>
								<CardTitle className="mt-4 text-xl font-semibold text-rb-black">
									{result.name}
								</CardTitle>
							</CardHeader>
							<CardContent className="px-6 pb-6">
								<p className="text-lg leading-8 text-rb-black/64">
									&quot;{result.quote}&quot;
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

export function DevicesPageSections() {
	return (
		<>
			<DeviceHeroSection />
			<DeviceLineupSection />
			<UseCaseSpotlightSection />
			<WhyRedtailSection />
			<SpecsSnapshotSection />
		</>
	);
}
