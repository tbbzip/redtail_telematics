import Image from "next/image";
import Link from "next/link";
import {
	ArrowRight01Icon,
	BrushIcon,
	CustomizeIcon,
	DashboardSquare03Icon,
	Layers02Icon,
	PlayIcon,
	Rocket01Icon,
	SmartPhone01Icon,
} from "@hugeicons/core-free-icons";

import { HugeIcon } from "@/components/huge-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const heroStats = [
	{
		value: "Devices",
		label: "hardware foundation",
	},
	{
		value: "Apps",
		label: "B2B and B2C branded workflows",
	},
	{
		value: "Data",
		label: "dashboards, reports, and APIs",
	},
];

const previewRows = [
	{
		label: "Brand system",
		value: "Logos, colours, portal UI",
		icon: BrushIcon,
	},
	{
		label: "Customer apps",
		value: "Android and iOS ready",
		icon: SmartPhone01Icon,
	},
	{
		label: "Platform data",
		value: "Reports and dashboards",
		icon: DashboardSquare03Icon,
	},
];

function WhiteLabelPreview() {
	return (
		<div className="relative mx-auto hidden h-[40rem] w-full max-w-[36rem] lg:block">
			<div className="absolute inset-x-0 top-12 overflow-hidden rounded-2xl border border-white/18 bg-white text-rb-black shadow-[0_34px_120px_rgba(0,0,0,0.42)]">
				<div className="flex h-9 items-center gap-2 border-b border-black/10 bg-black/34 px-4">
					<span className="size-2.5 rounded-full bg-white/42" />
					<span className="size-2.5 rounded-full bg-white/42" />
					<span className="size-2.5 rounded-full bg-white/42" />
				</div>

				<div className="grid min-h-[31rem] grid-cols-[1fr_12rem]">
					<section className="p-5">
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="text-xs font-medium text-rb-black/42">
									Brand Portal / White Label
								</p>
								<h2 className="mt-2 text-2xl font-semibold leading-tight text-rb-black">
									Customer telematics suite
								</h2>
							</div>
							<Badge className="bg-rb-red text-white">Live</Badge>
						</div>

						<div className="mt-6 rounded-2xl border border-black/10 bg-[#f7f6f4] p-4">
							<div className="flex items-center gap-3">
								<div className="flex size-12 items-center justify-center rounded-xl bg-rb-black text-lg font-semibold text-white">
									YL
								</div>
								<div>
									<p className="text-xs font-semibold tracking-[0.14em] text-rb-black/42 uppercase">
										Your label
									</p>
									<p className="mt-1 text-sm font-semibold text-rb-black">
										Powered by Redtail technology
									</p>
								</div>
							</div>

							<div className="mt-5 grid grid-cols-4 gap-2">
								<span className="h-9 rounded-lg bg-rb-red" />
								<span className="h-9 rounded-lg bg-rb-black" />
								<span className="h-9 rounded-lg bg-rb-light-blue" />
								<span className="h-9 rounded-lg bg-rb-light-green" />
							</div>
						</div>

						<div className="mt-5 grid gap-3">
							{previewRows.map((row) => (
								<div
									className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-4 shadow-sm"
									key={row.label}
								>
									<div className="flex size-10 items-center justify-center rounded-xl bg-rb-peach text-rb-red">
										<HugeIcon icon={row.icon} />
									</div>
									<div className="min-w-0 flex-1">
										<p className="text-[11px] font-semibold tracking-[0.14em] text-rb-black/42 uppercase">
											{row.label}
										</p>
										<p className="mt-1 text-sm font-semibold text-rb-black">
											{row.value}
										</p>
									</div>
								</div>
							))}
						</div>
					</section>

					<section className="border-l border-black/10 bg-rb-black p-4 text-white">
						<div className="mx-auto h-full max-w-[10rem] rounded-[1.6rem] border border-white/14 bg-white/[0.06] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
							<div className="h-full rounded-[1.25rem] bg-white p-3 text-rb-black">
								<div className="mx-auto h-1 w-10 rounded-full bg-black/18" />
								<div className="mt-5 flex items-center gap-2">
									<div className="flex size-8 items-center justify-center rounded-lg bg-rb-red text-xs font-semibold text-white">
										YL
									</div>
									<div>
										<p className="text-[10px] font-semibold text-rb-black">
											Your App
										</p>
										<p className="mt-0.5 text-[9px] text-rb-black/42">
											Fleet ready
										</p>
									</div>
								</div>
								<div className="mt-6 grid gap-2">
									<div className="h-16 rounded-xl bg-rb-peach" />
									<div className="h-10 rounded-xl bg-rb-light-blue" />
									<div className="h-10 rounded-xl bg-rb-light-green" />
									<div className="mt-2 h-8 rounded-lg bg-rb-black" />
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>

			<div className="absolute right-3 bottom-10 flex w-72 items-start gap-3 rounded-2xl border border-white/18 bg-rb-black/72 p-4 text-white shadow-[0_20px_55px_rgba(0,0,0,0.34)] backdrop-blur-xl">
				<div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-rb-red">
					<HugeIcon icon={Rocket01Icon} />
				</div>
				<div>
					<p className="text-sm font-semibold">Launch under your label</p>
					<p className="mt-1 text-xs leading-5 text-white/62">
						Devices, portals, analytics, and app experiences configured around
						your customer promise.
					</p>
				</div>
			</div>
		</div>
	);
}

export function WhiteLabelHero() {
	return (
		<section className="relative isolate min-h-[100svh] overflow-hidden rounded-b-3xl bg-rb-black text-white">
			<Image
				alt="White-labeling solutions background"
				className="object-cover object-center opacity-76"
				fill
				priority
				sizes="100vw"
				src="/carousel/white-label-web.jpg"
			/>
			<div className="absolute inset-0 bg-black/52" />
			<div className="absolute inset-0 bg-linear-to-r from-black/88 via-black/64 to-black/22" />
			<div className="absolute inset-0 bg-linear-to-t from-black/42 via-transparent to-black/18" />

			<div className="relative mx-auto grid min-h-[100svh] w-full max-w-7xl items-start gap-10 px-4 pt-24 pb-12 sm:px-6 sm:pt-32 sm:pb-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:pt-24 lg:pb-20">
				<div className="max-w-2xl">
					<div className="inline-flex items-center gap-3">
						<span className="flex size-10 items-center justify-center rounded-md bg-rb-red text-white shadow-[0_16px_34px_rgba(207,19,23,0.32)]">
							<HugeIcon icon={Layers02Icon} />
						</span>
						<p className="text-xs font-semibold tracking-[0.28em] text-white/78 uppercase">
							White Label Solutions
						</p>
					</div>

					<h1 className="sr-only">White-Labeling Solutions</h1>

					<p className="mt-7 max-w-3xl text-[2.65rem] leading-[1.02] font-semibold tracking-tight text-balance text-white sm:text-5xl sm:leading-tight lg:text-[3.55rem]">
						Launch telematics under your brand
					</p>

					<p className="mt-5 max-w-xl text-xl leading-8 font-semibold text-white sm:text-2xl">
						Empower your brand with Redtail telematics technology
					</p>

					<p className="mt-5 max-w-2xl text-sm leading-6 text-white/72 sm:text-lg sm:leading-8">
						Redtail Telematics provides devices and flexible, scalable
						technology so you can deliver a robust customized experience to
						your customers, all powered by your rebranded platform and apps.
					</p>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Button asChild className="w-full sm:w-auto" size="lg">
							<Link href="/contact-us">
								Get a quote
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
								<HugeIcon data-icon="inline-start" icon={PlayIcon} />
								Learn More
							</Link>
						</Button>
					</div>

					<div className="mt-7 grid max-w-xl grid-cols-3 divide-x divide-white/18 border-y border-white/16 py-4 sm:mt-9 sm:py-5">
						{heroStats.map((stat) => (
							<div className="px-3 first:pl-0 last:pr-0 sm:px-4" key={stat.label}>
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
								<HugeIcon icon={CustomizeIcon} />
							</div>
							<div>
								<p className="text-sm font-semibold">Brand-ready foundation</p>
								<p className="mt-1 text-xs text-white/58">
									Devices, portals, app workflows, analytics, and support
								</p>
							</div>
						</div>
					</div>
				</div>

				<WhiteLabelPreview />
			</div>
		</section>
	);
}
