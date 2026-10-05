import Image from "next/image";

import { EditorialHero } from "@/components/editorial-hero";

function PartnerVisual() {
	return (
		<div className="relative pb-10 sm:pb-16">
			<figure className="mr-8 overflow-hidden rounded-lg border border-white/20 bg-[#111a24] shadow-[0_30px_80px_#0004] sm:mr-12">
				<div className="relative aspect-[1.15] sm:aspect-[1.4]">
					<Image
						alt="Technician working inside a vehicle during installation"
						className="object-cover object-center"
						fill
						loading="eager"
						sizes="(min-width: 1024px) 570px, 84vw"
						src="/platform-screenshots/installer-workflow.png"
					/>
				</div>
				<figcaption className="px-5 py-5">
					<p className="text-[10px] font-semibold tracking-[0.16em] text-[#ff777b] uppercase">Easy to resell</p>
					<p className="mt-2 max-w-[62%] text-sm leading-6 text-white/72">Affordable products, partner-ready tools, and app workflows for fleet customers.</p>
				</figcaption>
			</figure>
			<figure className="absolute right-0 bottom-0 w-[34%] overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_18px_45px_#0005]">
				<div className="relative aspect-square">
					<Image
						alt="Redtail VAM Hub telematics device"
						className="object-contain p-3 sm:p-4"
						fill
						loading="eager"
						sizes="(min-width: 1024px) 220px, 30vw"
						src="/devices/vam-hub.png"
					/>
				</div>
				<figcaption className="border-t border-black/10 px-3 py-3 text-[9px] font-semibold tracking-[0.12em] text-rb-red uppercase sm:text-[10px]">Redtail VAM family</figcaption>
			</figure>
		</div>
	);
}

export function ResellerProgramHero() {
	return (
		<EditorialHero
			description="Telematics resellers are a major part of our distribution strategy, providing revenue and profit opportunities with proven fleet management solutions."
			eyebrow="Reseller Program"
			primaryCta={{ href: "/contact-us", label: "Become a Reseller" }}
			proof={[
				{ label: "Devices", detail: "professional and self-fit options" },
				{ label: "Apps", detail: "Android and iOS workflows" },
				{ label: "Support", detail: "pricing, leads, and marketing" },
			]}
			secondaryCta={{ href: "/our-technology", label: "Our Technology" }}
			subhead="Offer proven fleet management solutions"
			title="Partner with Redtail Telematics"
			visual={<PartnerVisual />}
		/>
	);
}
