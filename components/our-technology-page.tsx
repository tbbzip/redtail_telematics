import Image from "next/image";
import {
	Analytics01Icon,
	CellularNetworkIcon,
	Database02Icon,
	DeviceAccessIcon,
	Factory01Icon,
	SmartPhone01Icon,
} from "@hugeicons/core-free-icons";
import { type IconSvgElement } from "@hugeicons/react";

import { HugeIcon } from "@/components/huge-icon";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const technologySolutions = [
	{
		title: "Devices",
		alt: "Devices",
		description:
			"6 million delivered into the automotive market and counting, quality sensors and signals, and bespoke firmware in professional and self-fit formats.",
		icon: DeviceAccessIcon,
		image: "/devices/vam-hub.png",
		variant: "device",
	},
	{
		title: "Connectivity",
		alt: "Connectivity",
		description:
			"Our network provider relationships and API access enable provision of timely and cost-effective data.",
		icon: CellularNetworkIcon,
		variant: "connectivity",
	},
	{
		title: "DataWarehouse",
		alt: "DataWarehouse",
		description:
			"Find out how DataWarehouse enables a level of detail in crash reconstruction not seen elsewhere in the market.",
		icon: Database02Icon,
		variant: "warehouse",
	},
	{
		title: "Data Analytics",
		alt: "Data Analytics",
		description:
			"Hardware and connectivity generate and deliver highly accurate and substantial data on both driver and vehicle performance.",
		icon: Analytics01Icon,
		variant: "analytics",
	},
	{
		title: "Apps",
		alt: "Apps",
		description:
			"Redtail has created white-label apps for use by both businesses and consumers.",
		icon: SmartPhone01Icon,
		image: "/platform-screenshots/redtail_lap-mob.png",
		variant: "apps",
	},
] satisfies {
	title: string;
	alt: string;
	description: string;
	icon: IconSvgElement;
	image?: string;
	variant: "device" | "connectivity" | "warehouse" | "analytics" | "apps";
}[];

function HeroVisual() {
	return (
		<div
			aria-label="Our Technology"
			className="relative min-h-[30rem] overflow-hidden rounded-2xl border border-white/14 bg-white/[0.055] p-5 shadow-[0_34px_120px_rgba(0,0,0,0.34)] backdrop-blur-md"
			role="img"
		>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(207,19,23,0.34),transparent_28%),radial-gradient(circle_at_82%_30%,rgba(255,255,255,0.12),transparent_24%)]" />
			<div className="relative grid h-full min-h-[28rem] grid-rows-[1fr_auto] gap-4">
				<div className="grid gap-4 sm:grid-cols-[0.95fr_1.05fr]">
					<div className="rounded-2xl border border-white/12 bg-rb-black/58 p-5">
						<div className="flex items-center justify-between gap-4">
							<Badge className="bg-rb-red text-white">IoT + data</Badge>
							<div className="flex gap-1.5">
								<span className="size-2 rounded-full bg-white/28" />
								<span className="size-2 rounded-full bg-white/28" />
								<span className="size-2 rounded-full bg-rb-red" />
							</div>
						</div>
						<div className="mt-12 grid gap-3">
							{["Devices", "Connectivity", "DataWarehouse", "Apps"].map(
								(label, index) => (
									<div
										className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.055] p-3"
										key={label}
									>
										<div
											className={cn(
												"size-2.5 rounded-full",
												index === 0 ? "bg-rb-red" : "bg-white/34"
											)}
										/>
										<p className="text-sm font-semibold text-white/76">
											{label}
										</p>
									</div>
								)
							)}
						</div>
					</div>

					<div className="relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.07] p-5">
						<div className="absolute inset-0 opacity-35 [background-image:linear-gradient(120deg,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(30deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px,48px_48px]" />
						<div className="relative mt-8 flex justify-center">
							<div className="relative flex size-44 items-center justify-center rounded-full border border-white/14 bg-rb-black/54">
								<div className="absolute size-64 rounded-full border border-white/10" />
								<div className="absolute size-80 rounded-full border border-white/8" />
								<div className="flex size-24 items-center justify-center rounded-2xl bg-rb-red text-white shadow-[0_20px_60px_rgba(207,19,23,0.42)]">
									<HugeIcon icon={DeviceAccessIcon} size={40} />
								</div>
							</div>
						</div>
						<div className="relative mt-10 grid grid-cols-3 gap-2">
							{["UK", "US", "MY"].map((label) => (
								<div
									className="rounded-xl border border-white/10 bg-rb-black/54 px-3 py-4 text-center"
									key={label}
								>
									<p className="text-sm font-semibold text-white">{label}</p>
									<p className="mt-1 text-[10px] text-white/44">expertise</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="grid gap-3 rounded-2xl border border-white/12 bg-rb-black/62 p-4 sm:grid-cols-3">
					{[
						["100+", "qualified experts"],
						["UK + US", "IoT and communications"],
						["Malaysia", "manufacturing engineering"],
					].map(([value, label]) => (
						<div key={value}>
							<p className="text-2xl font-semibold text-white">{value}</p>
							<p className="mt-1 text-xs leading-5 text-white/50">{label}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export function OurTechnologyHero() {
	return (
		<section className="relative isolate overflow-hidden rounded-b-3xl bg-rb-black px-4 pt-24 pb-14 text-white sm:px-6 sm:pt-32 sm:pb-18 lg:px-8 lg:pt-28">
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(207,19,23,0.26),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(255,255,255,0.12),transparent_24%),linear-gradient(135deg,#010101,#171514_56%,#010101)]"
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 opacity-30 [background-image:linear-gradient(120deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(30deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:36px_36px,58px_58px]"
			/>

			<div className="relative mx-auto grid max-w-7xl gap-10 lg:min-h-[42rem] lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
				<div className="max-w-3xl">
					<div className="inline-flex items-center gap-3">
						<span className="flex size-10 items-center justify-center rounded-md bg-rb-red text-white shadow-[0_16px_34px_rgba(207,19,23,0.32)]">
							<HugeIcon icon={Factory01Icon} />
						</span>
						<p className="text-xs font-semibold tracking-[0.28em] text-white/78 uppercase">
							Our Technology
						</p>
					</div>

					<h1 className="mt-7 max-w-3xl text-[2.75rem] leading-[1.02] font-semibold text-balance text-white sm:text-6xl sm:leading-tight">
						Our Technology
					</h1>

					<p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
						Redtail Telematics has access to over 100 qualified experts in IoT
						and communications technology in the UK and US, as well as an
						experienced manufacturing and engineering team on the ground in
						Malaysia.
					</p>
				</div>

				<HeroVisual />
			</div>
		</section>
	);
}

export function TechnologyIntroductionSection() {
	return (
		<section className="border-b border-black/10 bg-[#fcfbf9] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
			<div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
				<div>
					<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
						Introduction
					</p>
					<h2 className="mt-4 text-[2.15rem] font-semibold leading-tight text-rb-black sm:text-5xl">
						Expertise behind every telematics solution
					</h2>
				</div>
				<div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(1,1,1,0.06)] sm:p-8">
					<p className="text-xl leading-8 text-rb-black/68 sm:text-2xl sm:leading-10">
						This gives Redtail unparalleled access to some of the foremost
						thinking experts when building telematics solutions.
					</p>
				</div>
			</div>
		</section>
	);
}

function SolutionMedia({
	alt,
	icon,
	image,
	variant,
}: {
	alt: string;
	icon: IconSvgElement;
	image?: string;
	variant: (typeof technologySolutions)[number]["variant"];
}) {
	if (image) {
		return (
			<div
				aria-label={alt}
				className="relative flex aspect-[1.35] items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-[#f7f6f4] p-6"
				role="img"
			>
				<Image
					alt={alt}
					className={cn(
						"object-contain",
						variant === "apps" ? "object-cover object-left-top" : ""
					)}
					fill
					sizes="(max-width: 768px) 100vw, 420px"
					src={image}
				/>
				<div className="absolute inset-0 bg-linear-to-t from-rb-black/14 via-transparent to-transparent" />
			</div>
		);
	}

	return (
		<div
			aria-label={alt}
			className="relative aspect-[1.35] overflow-hidden rounded-2xl border border-black/10 bg-[#f7f6f4]"
			role="img"
		>
			<div className="absolute inset-0 opacity-65 [background-image:linear-gradient(120deg,rgba(1,1,1,0.08)_1px,transparent_1px),linear-gradient(30deg,rgba(207,19,23,0.12)_1px,transparent_1px)] [background-size:28px_28px,44px_44px]" />
			<div className="absolute inset-6 rounded-2xl border border-black/10 bg-white/72" />
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="relative flex size-28 items-center justify-center rounded-2xl bg-rb-black text-white shadow-[0_18px_50px_rgba(1,1,1,0.18)]">
					<HugeIcon icon={icon} size={42} />
				</div>
			</div>
			{variant === "connectivity" ? (
				<div className="absolute right-8 bottom-8 left-8 flex justify-between">
					{[0, 1, 2, 3].map((item) => (
						<span
							className={cn(
								"rounded-full bg-rb-red",
								item === 0 ? "size-2" : item === 1 ? "size-3" : "size-4"
							)}
							key={item}
						/>
					))}
				</div>
			) : null}
			{variant === "analytics" ? (
				<div className="absolute right-8 bottom-8 left-8 flex items-end gap-2">
					{["h-8", "h-14", "h-10", "h-20", "h-16"].map((height) => (
						<span className={cn("flex-1 rounded-t-lg bg-rb-red", height)} key={height} />
					))}
				</div>
			) : null}
		</div>
	);
}

export function TechnologySolutionsSection() {
	return (
		<section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<header className="grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
					<div>
						<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
							Technology solutions
						</p>
						<h2 className="mt-4 text-[2.35rem] font-semibold leading-tight text-rb-black sm:text-5xl">
							The building blocks behind Redtail telematics
						</h2>
					</div>
					<p className="max-w-3xl text-base leading-7 text-rb-black/60 sm:text-lg sm:leading-8 lg:justify-self-end">
						Hardware, connectivity, data, analytics, and apps work together to
						turn vehicle signals into useful operational intelligence.
					</p>
				</header>

				<div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
					{technologySolutions.map((solution, index) => (
						<Card
							className={cn(
								"border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0 transition duration-300 hover:-translate-y-1 hover:border-rb-red/28 hover:shadow-[0_24px_70px_rgba(1,1,1,0.1)]",
								index === 0 ? "lg:col-span-2" : ""
							)}
							key={solution.title}
						>
							<CardHeader className="gap-5 px-6 pt-6 sm:px-7 sm:pt-7">
								<div className="flex items-start justify-between gap-4">
									<div className="flex size-12 items-center justify-center rounded-xl bg-rb-black text-white">
										<HugeIcon icon={solution.icon} size={22} />
									</div>
									<Badge className="border-black/10 bg-white text-rb-black/54" variant="outline">
										{String(index + 1).padStart(2, "0")}
									</Badge>
								</div>
								<div>
									<CardTitle className="text-2xl font-semibold leading-tight text-rb-black">
										{solution.title}
									</CardTitle>
									<CardDescription className="mt-3 text-base leading-7 text-rb-black/58">
										{solution.description}
									</CardDescription>
								</div>
							</CardHeader>
							<CardContent className="px-6 pb-6 sm:px-7 sm:pb-7">
								<SolutionMedia
									alt={solution.alt}
									icon={solution.icon}
									image={solution.image}
									variant={solution.variant}
								/>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

export function OurTechnologyPageSections() {
	return (
		<>
			<OurTechnologyHero />
			<TechnologyIntroductionSection />
			<TechnologySolutionsSection />
		</>
	);
}
