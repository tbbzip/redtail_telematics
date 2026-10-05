import Image from "next/image";

import { EditorialHero } from "@/components/editorial-hero";

function WhiteLabelVisual() {
	return (
		<figure className="overflow-hidden rounded-lg border border-white/20 bg-white text-[#141b24] shadow-[0_30px_80px_#0004]">
			<div className="flex items-center justify-between gap-4 border-b border-black/10 px-5 py-4 text-[10px] font-semibold tracking-[0.14em] uppercase">
				<span className="text-[#56616e]">Current Redtail web portal</span>
				<span className="text-rb-red">Redtail platform</span>
			</div>
			<div className="relative aspect-[1380/763] bg-white">
				<Image
					alt="Current Redtail fleet map with status filters, vehicle visibility and replay controls"
					className="object-contain"
					fill
					loading="eager"
					sizes="(min-width: 1024px) 620px, 92vw"
					src="/platform-screenshots/current/fleet-map.jpg"
				/>
			</div>
			<figcaption className="border-t border-black/10 px-5 py-5">
				<p className="text-xs font-semibold tracking-[0.12em] text-rb-red uppercase">Launch under your label</p>
				<p className="mt-2 text-sm leading-6 text-[#56616e]">Current Redtail web portal: fleet status, vehicle visibility and journey replay.</p>
			</figcaption>
		</figure>
	);
}

export function WhiteLabelHero() {
	return (
		<EditorialHero
			description="Redtail Telematics provides devices and flexible, scalable technology so you can deliver a robust customized experience to your customers, all powered by your rebranded platform and apps."
			eyebrow="White Label Solutions"
			primaryCta={{ href: "/contact-us", label: "Get a quote" }}
			proof={[
				{ label: "Devices", detail: "hardware foundation" },
				{ label: "Apps", detail: "B2B and B2C branded workflows" },
				{ label: "Data", detail: "dashboards, reports, and APIs" },
			]}
			secondaryCta={{ href: "/platform-and-apps", label: "Learn More" }}
			subhead="Empower your brand with Redtail telematics technology"
			title={<><span className="sr-only">White-Labeling Solutions</span><span aria-hidden="true">Launch telematics under your brand</span></>}
			visual={<WhiteLabelVisual />}
		>
			<div className="mt-6 border-l-2 border-rb-red pl-4 lg:hidden">
				<p className="text-sm font-semibold text-white">Brand-ready foundation</p>
				<p className="mt-1 text-sm leading-6 text-white/62">Devices, portals, app workflows, analytics, and support</p>
			</div>
		</EditorialHero>
	);
}
