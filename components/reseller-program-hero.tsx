import Image from "next/image";
import Link from "next/link";
import {
	ArrowRight01Icon,
	BriefcaseDollarIcon,
	DeviceAccessIcon,
	DiscountTag02Icon,
	MarketingIcon,
	PackageDeliveredIcon,
	PlayIcon,
	StoreVerified02Icon,
} from "@hugeicons/core-free-icons";

import { HugeIcon } from "@/components/huge-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const heroStats = [
	{
		value: "Devices",
		label: "professional and self-fit options",
	},
	{
		value: "Apps",
		label: "Android and iOS workflows",
	},
	{
		value: "Support",
		label: "pricing, leads, and marketing",
	},
];

const partnerSteps = [
	{
		label: "Portfolio",
		value: "World-class devices",
		icon: DeviceAccessIcon,
	},
	{
		label: "Commercials",
		value: "Volume pricing",
		icon: DiscountTag02Icon,
	},
	{
		label: "Growth",
		value: "Marketing support",
		icon: MarketingIcon,
	},
];

function PartnerProgramPanel() {
	return (
		<div className="relative mx-auto hidden h-[38rem] w-full max-w-[34rem] lg:block">
			<div className="absolute inset-x-0 top-16 overflow-hidden rounded-2xl border border-white/18 bg-white text-rb-black shadow-[0_34px_120px_rgba(0,0,0,0.42)]">
				<div className="flex h-9 items-center gap-2 border-b border-black/10 bg-black/34 px-4">
					<span className="size-2.5 rounded-full bg-white/42" />
					<span className="size-2.5 rounded-full bg-white/42" />
					<span className="size-2.5 rounded-full bg-white/42" />
				</div>
				<div className="p-5">
					<div className="flex items-start justify-between gap-4">
						<div>
							<p className="text-xs font-medium text-rb-black/42">
								Partner Portal / Reseller Program
							</p>
							<h2 className="mt-2 text-2xl font-semibold leading-tight text-rb-black">
								Reseller growth kit
							</h2>
						</div>
						<Badge className="bg-rb-red text-white">Ready</Badge>
					</div>

					<div className="mt-6 rounded-2xl border border-black/10 bg-[#f7f6f4] p-4">
						<div className="flex items-center gap-3">
							<div className="flex size-11 items-center justify-center rounded-full bg-rb-black text-white">
								<HugeIcon icon={BriefcaseDollarIcon} />
							</div>
							<div>
								<p className="text-xs font-semibold text-rb-black/46">
									Opportunity pipeline
								</p>
								<p className="text-3xl font-semibold leading-none text-rb-black">
									+32%
								</p>
							</div>
						</div>
						<div className="mt-4 h-2 overflow-hidden rounded-full bg-black/8">
							<div className="h-full w-[72%] rounded-full bg-rb-red" />
						</div>
					</div>

					<div className="mt-5 grid gap-3">
						{partnerSteps.map((step) => (
							<div
								className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-4 shadow-sm"
								key={step.label}
							>
								<div className="flex size-10 items-center justify-center rounded-xl bg-rb-peach text-rb-red">
									<HugeIcon icon={step.icon} />
								</div>
								<div className="min-w-0 flex-1">
									<p className="text-[11px] font-semibold tracking-[0.14em] text-rb-black/42 uppercase">
										{step.label}
									</p>
									<p className="mt-1 text-sm font-semibold text-rb-black">
										{step.value}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="absolute right-0 bottom-16 w-72 rounded-2xl border border-white/18 bg-rb-black/72 p-4 text-white shadow-[0_20px_55px_rgba(0,0,0,0.34)] backdrop-blur-xl">
				<div className="flex items-center gap-3">
					<div className="flex size-11 items-center justify-center rounded-full bg-rb-red">
						<HugeIcon icon={PackageDeliveredIcon} />
					</div>
					<div>
						<p className="text-sm font-semibold">Easy to resell</p>
						<p className="mt-1 text-xs leading-5 text-white/62">
							Affordable products, partner-ready tools, and app workflows for
							fleet customers.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export function ResellerProgramHero() {
	return (
		<section className="relative isolate min-h-[100svh] overflow-hidden rounded-b-3xl bg-rb-black text-white">
			<Image
				alt="Reseller program background"
				className="object-cover object-center opacity-76"
				fill
				priority
				sizes="100vw"
				src="/carousel/resellers-web.jpg"
			/>
			<div className="absolute inset-0 bg-black/50" />
			<div className="absolute inset-0 bg-linear-to-r from-black/88 via-black/66 to-black/24" />
			<div className="absolute inset-0 bg-linear-to-t from-black/42 via-transparent to-black/18" />

			<div className="relative mx-auto grid min-h-[100svh] w-full max-w-7xl items-start gap-10 px-4 pt-24 pb-12 sm:px-6 sm:pt-32 sm:pb-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:pt-24 lg:pb-20">
				<div className="max-w-2xl">
					<div className="inline-flex items-center gap-3">
						<span className="flex size-10 items-center justify-center rounded-md bg-rb-red text-white shadow-[0_16px_34px_rgba(207,19,23,0.32)]">
							<HugeIcon icon={StoreVerified02Icon} />
						</span>
						<p className="text-xs font-semibold tracking-[0.28em] text-white/78 uppercase">
							Reseller Program
						</p>
					</div>

					<h1 className="mt-7 max-w-3xl text-[2.9rem] leading-[1.02] font-semibold tracking-tight text-balance text-white sm:text-6xl lg:text-[4.15rem]">
						Partner with Redtail Telematics
					</h1>

					<p className="mt-5 max-w-xl text-xl leading-8 font-semibold text-white sm:text-2xl">
						Offer proven fleet management solutions
					</p>

					<p className="mt-5 max-w-2xl text-sm leading-6 text-white/72 sm:text-lg sm:leading-8">
						Telematics resellers are a major part of our distribution strategy,
						providing revenue and profit opportunities with proven fleet
						management solutions.
					</p>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Button asChild className="w-full sm:w-auto" size="lg">
							<Link href="/contact-us">
								Become a Reseller
								<HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
							</Link>
						</Button>
						<Button
							asChild
							className="w-full border-white/32 bg-white/8 text-white hover:border-white/48 hover:bg-white/14 hover:text-white sm:w-auto"
							size="lg"
							variant="outline"
						>
							<Link href="/our-technology">
								<HugeIcon data-icon="inline-start" icon={PlayIcon} />
								Our Technology
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
				</div>

				<PartnerProgramPanel />
			</div>
		</section>
	);
}
