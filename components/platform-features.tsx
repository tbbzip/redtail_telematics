import Image from "next/image";
import Link from "next/link";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import { HugeIcon } from "@/components/huge-icon";

const featureCards = [
	{
		label: "Journey visibility",
		title: "Fleet movement, in context.",
		description: "Review a vehicle’s route alongside distance, journey time, stops, and events.",
		image: "/platform-screenshots/journey-showcase.jpg",
		alt: "Redtail Journey Showcase with a mapped vehicle route, journey summary, and event details",
		caption: "Journey Showcase · route replay and trip evidence",
		href: "/platform-and-apps#fleet-visibility",
	},
	{
		label: "Driving behaviour",
		title: "Behaviour you can investigate.",
		description: "Filter driving events and see where and when they occur before deciding what to do next.",
		image: "/platform-screenshots/current/driving-behaviour.jpg",
		alt: "Current Redtail driving behaviour analysis with event filters, a regional geographic heatmap and a day/hour activity matrix",
		caption: "Current web portal · driving events by location and time",
		aspectRatio: 1126 / 1033,
		href: "/platform-and-apps#driver-behaviour",
	},
	{
		label: "Reporting + mileage",
		title: "Make more of every journey.",
		description: "Use trip history and odometer records to review vehicle use and support business mileage and tax recordkeeping.",
		image: "/platform-screenshots/current/odometer.jpg",
		alt: "Current Redtail odometer panel with calculated mileage, predicted mileage and a control to set an odometer reading",
		caption: "Current web portal · calculated odometer and mileage projections",
		aspectRatio: 1126 / 295,
		href: "/platform-and-apps#reports-proof",
	},
];

function FeatureVisual({ feature }: { feature: (typeof featureCards)[number] }) {
	return (
		<figure className="overflow-hidden border-y border-black/10 bg-[#f0f3f5]">
			<div className="relative" style={{ aspectRatio: feature.aspectRatio ?? 1.55 }}>
				<Image
					alt={feature.alt}
					className="object-contain"
					fill
					loading={feature.image.endsWith("journey-showcase.jpg") ? "eager" : "lazy"}
					sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 400px"
					src={feature.image}
				/>
			</div>
			<figcaption className="border-t border-black/8 bg-white px-5 py-3 text-[11px] leading-5 text-rb-black/60">
				{feature.caption}
			</figcaption>
		</figure>
	);
}

export function PlatformFeatures() {
	return (
		<section className="border-b border-black/10 bg-[#f5f6f7] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
			<div className="mx-auto max-w-[83rem]">
				<header className="grid gap-6 lg:grid-cols-[1.1fr_0.8fr] lg:items-end lg:gap-20">
					<div>
						<p className="text-[11px] font-semibold tracking-[0.2em] text-rb-red uppercase">The connected platform</p>
						<h2 className="mt-5 max-w-3xl text-[2.2rem] leading-[1.1] font-semibold tracking-[-0.035em] text-rb-black sm:text-5xl lg:text-[3.5rem]">
							From the vehicle.<br />To the decision.
						</h2>
					</div>
					<p className="max-w-xl text-base leading-7 text-rb-black/65 sm:text-lg sm:leading-8">
						Redtail connects the hardware that captures vehicle signals with the tools your teams use to understand journeys, review risk, and manage deployments.
					</p>
				</header>

				<div className="mt-12 grid overflow-hidden rounded-lg border border-black/12 bg-white lg:mt-16 lg:grid-cols-[0.72fr_1.28fr]">
					<figure className="flex flex-col border-b border-black/10 bg-[#e9edf0] lg:border-r lg:border-b-0">
						<div className="flex items-center gap-3 px-6 pt-6 text-[11px] font-semibold tracking-[0.18em] uppercase sm:px-8 sm:pt-8">
							<span className="text-rb-black/65">Capture at the vehicle</span>
						</div>
						<div className="relative min-h-64 flex-1 sm:min-h-80">
							<Image alt="Redtail VAM-HDR telematics hardware" className="object-contain p-8 sm:p-12" fill sizes="(max-width: 1023px) 90vw, 450px" src="/devices/vam-hdr.png" />
						</div>
						<figcaption className="px-6 pb-6 sm:px-8 sm:pb-8">
							<p className="text-lg font-semibold tracking-tight text-rb-black">Purpose-built telematics hardware.</p>
							<p className="mt-2 max-w-sm text-sm leading-6 text-rb-black/60">Professional and self-fit device options for different vehicles and deployment needs.</p>
						</figcaption>
					</figure>
					<figure className="flex flex-col">
						<div className="flex items-center gap-3 px-6 pt-6 text-[11px] font-semibold tracking-[0.18em] uppercase sm:px-8 sm:pt-8">
							<span className="text-rb-black/65">Understand online. Act on the move.</span>
						</div>
						<div className="relative aspect-[1.6] sm:aspect-[1.9]">
							<Image alt="Redtail portal journey view on a laptop and the Redtail Fleet App displaying vehicle locations on a phone" className="object-contain p-4 sm:p-6" fill sizes="(max-width: 1023px) 90vw, 780px" src="/platform-screenshots/redtail_lap-mob.png" />
						</div>
						<figcaption className="mt-auto grid gap-5 border-t border-black/10 px-6 py-6 sm:grid-cols-2 sm:px-8 sm:py-8">
							<div><p className="text-lg font-semibold tracking-tight text-rb-black">The web platform.</p><p className="mt-2 text-sm leading-6 text-rb-black/60">Bring journey history, alerts, reports, and device information into one place.</p></div>
							<div><p className="text-lg font-semibold tracking-tight text-rb-black">The Fleet App.</p><p className="mt-2 text-sm leading-6 text-rb-black/60">Keep vehicle locations and fleet activity close when work takes you away from a desk.</p></div>
						</figcaption>
					</figure>
				</div>

				<div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
					{featureCards.map((feature) => (
						<article className="flex flex-col overflow-hidden rounded-lg border border-black/12 bg-white" key={feature.title}>
							<div className="px-5 pt-6 pb-5 sm:px-6"><p className="text-[10px] font-semibold tracking-[0.18em] text-rb-red uppercase">{feature.label}</p><h3 className="mt-3 text-2xl leading-tight font-semibold tracking-[-0.025em] text-rb-black">{feature.title}</h3></div>
							<FeatureVisual feature={feature} />
							<div className="flex flex-1 flex-col px-5 py-5 sm:px-6"><p className="text-sm leading-6 text-rb-black/65">{feature.description}</p><Link className="mt-5 inline-flex items-center gap-3 text-sm font-semibold text-rb-red hover:underline" href={feature.href}>Explore this capability<HugeIcon icon={ArrowRight01Icon} size={17} /></Link></div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
