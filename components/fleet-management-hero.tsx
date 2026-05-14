import Image from "next/image";
import Link from "next/link";
import {
	Alert02Icon,
	ArrowRight01Icon,
	Calendar03Icon,
	Call02Icon,
	CarSignalIcon,
	DeliveryTruckIcon,
	MapsLocation01Icon,
	PlayIcon,
	Route03Icon,
	SmartPhone01Icon,
	Wrench01Icon,
} from "@hugeicons/core-free-icons";
import { type IconSvgElement } from "@hugeicons/react";

import { HugeIcon } from "@/components/huge-icon";
import { Button } from "@/components/ui/button";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const heroStats = [
	{
		value: "Live GPS",
		label: "real-time vehicle visibility",
	},
	{
		value: "Alerts",
		label: "driver and security events",
	},
	{
		value: "Reports",
		label: "fleet analytics and ROI insight",
	},
];

const fleetSignals = [
	{
		label: "Driver behavior",
		value: "Harsh brake",
		detail: "Coachable event",
		icon: CarSignalIcon,
	},
	{
		label: "Geofence",
		value: "Depot exit",
		detail: "Authorized route",
		icon: Alert02Icon,
	},
	{
		label: "Maintenance",
		value: "Oil service",
		detail: "Due in 180 mi",
		icon: Wrench01Icon,
	},
] satisfies {
	label: string;
	value: string;
	detail: string;
	icon: IconSvgElement;
}[];

const fleetBrandLogos = [
	{
		src: "/clients/t-mobile.svg",
		alt: "T-Mobile",
		width: 144,
		height: 36,
	},
	{
		src: "/clients/ford.svg",
		alt: "Ford",
		width: 118,
		height: 36,
	},
	{
		src: "/clients/jaguar.svg",
		alt: "Jaguar",
		width: 88,
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
	{
		src: "/clients/admiral.svg",
		alt: "Admiral",
		width: 136,
		height: 36,
	},
	{
		src: "/clients/tracker.svg",
		alt: "Tracker",
		width: 124,
		height: 36,
	},
	{
		src: "/clients/calamp-vector-logo.svg",
		alt: "CalAmp",
		width: 132,
		height: 36,
	},
	{
		src: "/clients/by-miles.svg",
		alt: "By Miles",
		width: 126,
		height: 36,
	},
	{
		src: "/clients/JMT-logo.png",
		alt: "J.M. Thompson Company",
		width: 132,
		height: 36,
	},
];

function SidebarDot({ active = false }: { active?: boolean }) {
	return (
		<span
			className={
				active
					? "block size-2.5 rounded-full bg-rb-red shadow-[0_0_18px_rgba(207,19,23,0.65)]"
					: "block size-2 rounded-full bg-white/28"
			}
		/>
	);
}

function MapPin({
	className,
	label,
}: {
	className: string;
	label: string;
}) {
	return (
		<div
			className={`absolute z-20 flex size-10 items-center justify-center rounded-full border-3 border-white bg-rb-red text-[10px] font-semibold text-white shadow-[0_18px_42px_rgba(207,19,23,0.42)] ${className}`}
		>
			{label}
		</div>
	);
}

function FleetInterface() {
	return (
		<div className="absolute top-14 left-4 w-[48rem] overflow-hidden rounded-2xl border border-white/22 bg-white text-rb-black shadow-[0_34px_120px_rgba(0,0,0,0.42)] ring-1 ring-black/8 xl:left-8 xl:w-[58rem]">
			<div className="flex h-9 items-center gap-2 border-b border-black/10 bg-black/38 px-4">
				<span className="size-2.5 rounded-full bg-white/42" />
				<span className="size-2.5 rounded-full bg-white/42" />
				<span className="size-2.5 rounded-full bg-white/42" />
			</div>

			<div className="grid min-h-[31rem] grid-cols-[3rem_1fr] bg-white">
				<aside className="flex flex-col items-center gap-6 bg-rb-black py-6">
					<span className="text-lg font-bold text-white">R</span>
					<SidebarDot active />
					<SidebarDot />
					<SidebarDot />
					<SidebarDot />
					<SidebarDot />
					<div className="mt-auto flex flex-col items-center gap-4">
						<SidebarDot />
						<SidebarDot />
					</div>
				</aside>

				<div className="grid grid-rows-[4rem_1fr]">
					<header className="flex items-center justify-between border-b border-black/10 px-5">
						<div>
							<p className="text-xs font-medium text-rb-black/42">
								Fleet View / San Diego / RT-FLT-204
							</p>
							<p className="mt-1 text-sm font-semibold text-rb-black">
								Live fleet command center
							</p>
						</div>
						<div className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-rb-black/62">
							24 vehicles online
						</div>
					</header>

					<div className="grid grid-cols-[17rem_1fr]">
						<section className="border-r border-black/10 bg-white p-5">
							<p className="text-xs font-semibold text-rb-black">Fleet Now</p>
							<p className="mt-4 text-sm leading-6 text-rb-black/60">
								21 active routes · 3 idle vehicles · 2 events need review
							</p>

							<div className="mt-5 rounded-xl border border-black/10 bg-[#f7f6f4] p-4">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-full bg-rb-black text-white">
										<HugeIcon icon={MapsLocation01Icon} />
									</div>
									<div>
										<p className="text-xs font-semibold text-rb-black/46">
											On-time routes
										</p>
										<p className="text-2xl font-semibold leading-none text-rb-black">
											94%
										</p>
									</div>
								</div>
								<div className="mt-4 h-2 overflow-hidden rounded-full bg-black/8">
									<div className="h-full w-[82%] rounded-full bg-rb-red" />
								</div>
							</div>

							<div className="mt-5 flex flex-col gap-3">
								{fleetSignals.map((signal) => (
									<div
										className="rounded-xl border border-black/10 bg-white p-3 shadow-sm"
										key={signal.label}
									>
										<div className="flex items-center justify-between gap-3">
											<div className="flex min-w-0 items-center gap-2">
												<span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-rb-peach text-rb-red">
													<HugeIcon icon={signal.icon} size={15} />
												</span>
												<p className="truncate text-[11px] font-semibold tracking-[0.13em] text-rb-black/42 uppercase">
													{signal.label}
												</p>
											</div>
											<p className="text-sm font-semibold text-rb-red">
												{signal.value}
											</p>
										</div>
										<p className="mt-2 text-xs text-rb-black/52">
											{signal.detail}
										</p>
									</div>
								))}
							</div>
						</section>

						<section className="relative overflow-hidden bg-[#586b56]">
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.2),transparent_18%),radial-gradient(circle_at_80%_72%,rgba(1,1,1,0.24),transparent_24%),linear-gradient(135deg,#4d624f,#7f9970_48%,#2f452d)]" />
							<div className="absolute inset-0 opacity-45 [background-image:linear-gradient(120deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(30deg,rgba(1,1,1,0.1)_1px,transparent_1px)] [background-size:34px_34px,46px_46px]" />
							<span className="absolute top-[18%] left-[-10%] h-9 w-[118%] rotate-[18deg] border-y border-white/35 bg-white/36 shadow-[0_1px_0_rgba(0,0,0,0.16)_inset]" />
							<span className="absolute right-[-16%] bottom-[22%] h-10 w-[92%] -rotate-[11deg] border-y border-white/35 bg-white/34 shadow-[0_1px_0_rgba(0,0,0,0.16)_inset]" />
							<span className="absolute top-[6%] right-[23%] h-[105%] w-8 rotate-[4deg] border-x border-white/32 bg-white/28" />
							<span className="absolute top-[55%] left-[12%] h-2 w-[62%] -rotate-[11deg] rounded-full border border-rb-red/40 bg-rb-red/75 shadow-[0_0_26px_rgba(207,19,23,0.34)]" />
							<MapPin className="right-[18%] bottom-[28%]" label="42" />
							<MapPin className="top-[22%] left-[26%] bg-rb-black" label="18" />
							<MapPin className="top-[48%] left-[48%]" label="7" />
							<div className="absolute right-5 top-5 rounded-xl border border-white/22 bg-rb-black/62 px-4 py-3 text-white shadow-[0_16px_38px_rgba(0,0,0,0.24)] backdrop-blur-md">
								<div className="flex items-center gap-2">
									<span className="size-2 rounded-full bg-rb-red" />
									<p className="text-xs font-semibold">Vehicle 42 live</p>
								</div>
								<p className="mt-2 text-[11px] text-white/62">
									Delivering at 38 mph · route ETA 14 min
								</p>
							</div>
							<div className="absolute right-5 bottom-5 grid w-52 gap-2 rounded-xl border border-white/18 bg-white/14 p-3 text-white backdrop-blur-xl">
								<div className="flex items-center justify-between text-xs">
									<span className="text-white/62">Fuel trend</span>
									<span className="font-semibold">Improving</span>
								</div>
								<div className="flex items-center justify-between text-xs">
									<span className="text-white/62">Next service</span>
									<span className="font-semibold">180 mi</span>
								</div>
								<div className="flex items-center justify-between text-xs">
									<span className="text-white/62">Reports</span>
									<span className="font-semibold">Ready</span>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}

function FleetLogoStrip() {
	return (
		<div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/12 bg-rb-black/34 px-4 py-5 backdrop-blur-md sm:px-6 lg:px-8">
			<div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[16rem_1fr] lg:items-center">
				<p className="text-xs font-semibold tracking-[0.24em] text-white/54 uppercase">
					Trusted by leading brands
				</p>
				<div className="mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] overflow-hidden">
					<InfiniteSlider gap={46} speed={24} speedOnHover={13}>
						{fleetBrandLogos.map((logo) => (
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

export function FleetManagementHero() {
	return (
		<section
			aria-label="Fleet management hero"
			className="relative isolate min-h-[100svh] overflow-hidden rounded-b-3xl bg-rb-black text-white"
		>
			<Image
				alt="Fleet vehicles managed through Redtail telematics"
				className="object-cover object-center opacity-78"
				fill
				priority
				sizes="100vw"
				src="/carousel/fleet-web.jpg"
			/>
			<div className="absolute inset-0 bg-black/50" />
			<div className="absolute inset-0 bg-linear-to-r from-black/88 via-black/62 to-black/20" />
			<div className="absolute inset-0 bg-linear-to-t from-black/44 via-transparent to-black/18" />

			<div className="relative mx-auto grid min-h-[100svh] w-full max-w-7xl items-start gap-10 px-4 pt-24 pb-48 sm:px-6 sm:pt-32 sm:pb-44 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:pt-24 lg:pb-40">
				<div className="max-w-2xl">
					<div className="inline-flex items-center gap-3">
						<span className="flex size-10 items-center justify-center rounded-md bg-rb-red text-white shadow-[0_16px_34px_rgba(207,19,23,0.32)]">
							<HugeIcon icon={Route03Icon} />
						</span>
						<p className="text-xs font-semibold tracking-[0.28em] text-white/78 uppercase">
							Fleet Intelligence, Reimagined
						</p>
					</div>

					<h1 className="mt-7 max-w-xl text-[2.5rem] leading-[1.02] font-semibold text-balance text-white sm:text-5xl sm:leading-tight lg:text-[3.35rem]">
						Optimize Your Fleet with Redtail Telematics
					</h1>

					<p className="mt-5 max-w-2xl text-sm leading-6 text-white/72 sm:text-lg sm:leading-8">
						Real-time GPS tracking, driver behavior insights, and data-driven
						tools that enhance safety, efficiency, and operational intelligence.
					</p>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Button asChild className="w-full sm:w-auto" size="lg">
							<Link href="/contact-us">
								Start Your Free Trial
								<HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
							</Link>
						</Button>
						<Button
							asChild
							className="w-full border-white/32 bg-white/8 text-white hover:border-white/48 hover:bg-white/14 hover:text-white sm:w-auto"
							size="lg"
							variant="outline"
						>
							<Link href="#fleet-solutions">
								<HugeIcon data-icon="inline-start" icon={PlayIcon} />
								Explore Solutions
							</Link>
						</Button>
					</div>

					<p className="mt-3 text-sm font-medium text-white/56">
						No credit card required
					</p>

					<div className="mt-6 flex flex-wrap gap-2">
						<Link
							className="inline-flex h-9 items-center gap-2 rounded-md border border-white/16 bg-white/8 px-3 text-xs font-semibold text-white/78 transition hover:border-white/32 hover:bg-white/13 hover:text-white"
							href="/contact-us#demo"
						>
							<HugeIcon icon={Calendar03Icon} size={15} />
							Schedule a Demo
						</Link>
						<Link
							className="inline-flex h-9 items-center gap-2 rounded-md border border-white/16 bg-white/8 px-3 text-xs font-semibold text-white/78 transition hover:border-white/32 hover:bg-white/13 hover:text-white"
							href="/platform-and-apps"
						>
							<HugeIcon icon={SmartPhone01Icon} size={15} />
							Download RT Fleet App
						</Link>
						<a
							className="inline-flex h-9 items-center gap-2 rounded-md border border-white/16 bg-white/8 px-3 text-xs font-semibold text-white/78 transition hover:border-white/32 hover:bg-white/13 hover:text-white"
							href="tel:+16195469061"
						>
							<HugeIcon icon={Call02Icon} size={15} />
							Call (619) 546-9061
						</a>
					</div>

					<div className="mt-7 grid max-w-xl grid-cols-3 divide-x divide-white/18 border-y border-white/16 py-4 sm:mt-9 sm:py-5">
						{heroStats.map((stat) => (
							<div
								className="px-3 first:pl-0 last:pr-0 sm:px-4"
								key={stat.label}
							>
								<p className="text-lg font-semibold text-white sm:text-2xl">
									{stat.value}
								</p>
								<p className="mt-2 text-[11px] leading-4 text-white/52 sm:text-xs">
									{stat.label}
								</p>
							</div>
						))}
					</div>

					<div className="mt-7 grid gap-3 rounded-2xl border border-white/14 bg-white/8 p-4 backdrop-blur-md lg:hidden">
						<div className="flex items-center gap-3">
							<div className="flex size-10 items-center justify-center rounded-full bg-rb-red text-white">
								<HugeIcon icon={DeliveryTruckIcon} />
							</div>
							<div>
								<p className="text-sm font-semibold">Fleet data ready</p>
								<p className="mt-1 text-xs text-white/58">
									Tracking, alerts, reporting, and mobile access in one place
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="relative hidden h-[42rem] lg:block">
					<FleetInterface />
					<div className="absolute right-3 bottom-18 flex w-72 items-start gap-3 rounded-2xl border border-white/18 bg-rb-black/72 p-4 text-white shadow-[0_20px_55px_rgba(0,0,0,0.34)] backdrop-blur-xl xl:right-0">
						<div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-rb-red">
							<HugeIcon icon={DeliveryTruckIcon} />
						</div>
						<div>
							<p className="text-sm font-semibold">Fleet visibility packet</p>
							<p className="mt-1 text-xs leading-5 text-white/62">
								Vehicle location, driver behavior, geofence activity, and
								maintenance context prepared for operations teams.
							</p>
						</div>
					</div>
				</div>
			</div>
			<FleetLogoStrip />
		</section>
	);
}
