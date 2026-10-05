import Image from "next/image";
import {
	Analytics01Icon,
	CellularNetworkIcon,
	Database02Icon,
	DeviceAccessIcon,
	SmartPhone01Icon,
} from "@hugeicons/core-free-icons";
import { type IconSvgElement } from "@hugeicons/react";

import { EditorialHero } from "@/components/editorial-hero";
import { HugeIcon } from "@/components/huge-icon";
import { cn } from "@/lib/utils";

const technologySolutions = [
	{
		title: "Devices",
		alt: "Redtail VAM-HUB telematics device",
		description: "Vehicle sensors and configurable firmware in professional and self-fit formats, selected around the needs of your deployment.",
		icon: DeviceAccessIcon,
		image: "/devices/vam-hub.png",
		caption: "VAM-HUB · Redtail telematics hardware",
		variant: "device",
	},
	{
		title: "Connectivity",
		alt: "Current Redtail fleet map with status filters, vehicle visibility and replay controls",
		description: "Network provider relationships and API access support the transfer of vehicle data, connecting Redtail hardware with the web and mobile tools your team uses.",
		icon: CellularNetworkIcon,
		image: "/platform-screenshots/current/fleet-map.jpg",
		caption: "Current Redtail web portal · fleet status and vehicle visibility",
		variant: "connectivity",
	},
	{
		title: "DataWarehouse",
		alt: "Redtail platform Journey Showcase showing a route and journey evidence",
		description: "Journey and event data provide the foundation for detailed analysis. Ask our team about DataWarehouse access and the datasets available for your program.",
		icon: Database02Icon,
		image: "/platform-screenshots/journey-showcase.jpg",
		caption: "Journey evidence shown in the Redtail platform",
		variant: "warehouse",
	},
	{
		title: "Data Analytics",
		alt: "Current Redtail driving behaviour analysis with event filters, a regional geographic heatmap and a day/hour activity matrix",
		description: "Explore driver and vehicle activity through event filters, geographic patterns, and reports that help your team investigate the evidence.",
		icon: Analytics01Icon,
		image: "/platform-screenshots/current/driving-behaviour.jpg",
		caption: "Current web portal · driving events by location and time",
		variant: "analytics",
	},
	{
		title: "Apps",
		alt: "Current Redtail fleet map with status filters, vehicle visibility and replay controls",
		description: "Web and mobile experiences give businesses and consumers access to useful telematics information, with white-label options for partner programs.",
		icon: SmartPhone01Icon,
		image: "/platform-screenshots/current/fleet-map.jpg",
		caption: "Current Redtail web portal · fleet visibility and journey replay",
		variant: "apps",
	},
] satisfies {
	title: string;
	alt: string;
	description: string;
	icon: IconSvgElement;
	image: string;
	caption: string;
	variant: "device" | "connectivity" | "warehouse" | "analytics" | "apps";
}[];

function HeroVisual() {
	return (
		<figure className="overflow-hidden rounded-lg border border-white/15 bg-[#e9edf0] shadow-[0_30px_80px_#0004]">
			<div className="relative aspect-[1.35] sm:aspect-[1.5]">
				<Image
					alt="A technician working inside a vehicle during a telematics installation"
					className="object-cover object-center"
					fill
					loading="eager"
					sizes="(max-width: 1023px) 90vw, 630px"
					src="/platform-screenshots/installer-workflow.png"
				/>
			</div>
			<figcaption className="grid gap-3 bg-white px-5 py-5 text-rb-black sm:grid-cols-[1fr_auto] sm:items-center">
				<div><p className="text-[10px] font-semibold tracking-[0.18em] text-rb-red uppercase">Vehicle installation</p><p className="mt-2 text-sm leading-6">Redtail telematics hardware</p></div>
				<div className="relative hidden h-20 w-24 sm:block"><Image alt="Redtail VAM-HDR device" className="object-contain" fill sizes="96px" src="/devices/vam-hdr.png" /></div>
			</figcaption>
		</figure>
	);
}

export function OurTechnologyHero() {
	return (
		<EditorialHero
			eyebrow="Our Technology"
			title="Our Technology"
			description="Redtail Telematics has access to over 100 qualified experts in IoT and communications technology in the UK and US, as well as an experienced manufacturing and engineering team on the ground in Malaysia."
			visual={<HeroVisual />}
			proof={[
				{ label: "100+", detail: "qualified experts" },
				{ label: "UK + US", detail: "IoT and communications" },
				{ label: "Malaysia", detail: "manufacturing engineering" },
			]}
		/>
	);
}

export function TechnologyIntroductionSection() {
	return (
		<section className="border-b border-black/10 bg-[#f5f6f7] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
			<div className="mx-auto grid max-w-[83rem] gap-7 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
				<div><p className="text-[11px] font-semibold tracking-[0.2em] text-rb-red uppercase">Built as one system</p><h2 className="mt-5 text-3xl leading-[1.12] font-semibold tracking-[-0.035em] text-rb-black sm:text-4xl lg:text-5xl">Expertise at every connection.</h2></div>
				<p className="max-w-2xl text-lg leading-8 text-rb-black/65 sm:text-xl sm:leading-9">Redtail brings device engineering and communications expertise together with the platform tools teams need to understand vehicle activity. Each part supports the next, from installation through everyday use.</p>
			</div>
		</section>
	);
}

function SolutionMedia({ solution }: { solution: (typeof technologySolutions)[number] }) {
	return (
		<figure className="overflow-hidden border-y border-black/10 bg-[#edf0f3]">
			<div className={cn("relative", solution.variant === "connectivity" || solution.variant === "apps" ? "aspect-[1380/763]" : solution.variant === "analytics" ? "aspect-[1126/1033]" : solution.variant === "device" ? "aspect-[1.85]" : "aspect-[1.75]")}>
				<Image
					alt={solution.alt}
					className={cn("object-contain", solution.variant === "device" ? "p-5 sm:p-7" : "")}
					fill
					sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 630px"
					src={solution.image}
				/>
			</div>
			<figcaption className="border-t border-black/8 bg-white px-5 py-3 text-[11px] leading-5 text-rb-black/60 sm:px-6">{solution.caption}</figcaption>
		</figure>
	);
}

export function TechnologySolutionsSection() {
	return (
		<section className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28" id="technology-solutions">
			<div className="mx-auto max-w-[83rem]">
				<header className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20">
					<div><p className="text-[11px] font-semibold tracking-[0.2em] text-rb-red uppercase">The technology stack</p><h2 className="mt-5 max-w-2xl text-[2.2rem] leading-[1.1] font-semibold tracking-[-0.035em] text-rb-black sm:text-5xl">A clear path from signals to decisions.</h2></div>
					<p className="max-w-xl text-base leading-7 text-rb-black/65 sm:text-lg sm:leading-8">See the hardware and platform views behind the Redtail system, then discuss the device, data, and application requirements of your program.</p>
				</header>
				<div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
					{technologySolutions.map((solution, index) => (
						<article className={cn("flex flex-col overflow-hidden rounded-lg border border-black/12 bg-white", index === 0 ? "lg:col-span-2" : "")} key={solution.title}>
							<div className="px-5 py-6 sm:px-6"><h3 className="text-2xl leading-tight font-semibold tracking-tight text-rb-black">{solution.title}</h3></div>
							<SolutionMedia solution={solution} />
							<div className="flex items-start gap-3 px-5 py-6 sm:px-6"><HugeIcon className="mt-1 shrink-0 text-rb-red" icon={solution.icon} size={18} /><p className="text-sm leading-6 text-rb-black/65">{solution.description}</p></div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

export function OurTechnologyPageSections() {
	return <><OurTechnologyHero /><TechnologyIntroductionSection /><TechnologySolutionsSection /></>;
}
