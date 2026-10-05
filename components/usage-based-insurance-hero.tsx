import Image from "next/image";

import { EditorialHero } from "@/components/editorial-hero";
import { ProductScreenshot } from "@/components/product-visual";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const insuranceBrandLogos = [
	{
		src: "/clients/acorn.svg",
		alt: "Acorn Insurance",
		width: 126,
		height: 36,
	},
	{
		src: "/clients/admiral.svg",
		alt: "Admiral",
		width: 136,
		height: 36,
	},
	{
		src: "/clients/axa.svg",
		alt: "AXA",
		width: 84,
		height: 36,
	},
	{
		src: "/clients/by-miles.svg",
		alt: "By Miles",
		width: 126,
		height: 36,
	},
	{
		src: "/clients/concirrus.svg",
		alt: "Concirrus",
		width: 136,
		height: 36,
	},
	{
		src: "/clients/direct-line.svg",
		alt: "Direct Line",
		width: 136,
		height: 36,
	},
	{
		src: "/clients/ingenie.svg",
		alt: "Ingenie",
		width: 124,
		height: 36,
	},
	{
		src: "/clients/koba.svg",
		alt: "KOBA",
		width: 112,
		height: 36,
	},
	{
		src: "/clients/unigarant.svg",
		alt: "Unigarant",
		width: 132,
		height: 36,
	},
];

function InsuranceLogoStrip() {
	return (
		<div className="border-b border-black/10 bg-white px-4 py-6 text-rb-black sm:px-6 lg:px-8">
			<div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[18rem_1fr] lg:items-center">
				<p className="text-xs font-semibold tracking-[0.2em] text-rb-black/55 uppercase">
					Trusted by leading insurance brands
				</p>
				<div className="mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] overflow-hidden">
					<InfiniteSlider gap={46} speed={24} speedOnHover={13}>
						{insuranceBrandLogos.map((logo) => (
							<div className="flex min-w-[124px] items-center justify-center" key={logo.alt}>
								<Image alt={logo.alt} className="h-5 w-auto object-contain opacity-75 transition duration-300 hover:opacity-100 sm:h-6" height={logo.height} src={logo.src} unoptimized width={logo.width} />
							</div>
						))}
					</InfiniteSlider>
				</div>
			</div>
		</div>
	);
}

function InsuranceVisual() {
	return (
		<div>
			<ProductScreenshot
				aspectRatio={1126 / 1033}
				alt="Current Redtail driving behaviour analysis with event filters, a regional geographic heatmap and a day/hour activity matrix"
				caption="Driving events by location and time in the current Redtail web portal."
				eager
				label="Driving behaviour / current web portal"
				src="/platform-screenshots/current/driving-behaviour.jpg"
			/>
			<div className="mt-4 hidden border-l-2 border-rb-red py-1 pl-4 lg:block">
				<p className="text-sm font-semibold text-white">Claims evidence packet</p>
				<p className="mt-1 text-sm leading-6 text-white/72">Crash reconstruction, impact context, and event history prepared for review.</p>
			</div>
		</div>
	);
}

export function UsageBasedInsuranceHero() {
	return (
		<>
			<EditorialHero
				description="Redtail has been providing custom telematics solutions to insurers of all sizes for over a decade. From advanced driver scoring and incident classification to crash reconstruction and lift charts, Redtail enables insurers to deliver value-driven policies backed by accurate, timely data."
				eyebrow="Usage-based insurance"
				primaryCta={{ href: "/contact-us", label: "Schedule a Demo" }}
				proof={[
					{ label: "1kHz", detail: "high-impact event data" },
					{ label: "30B+", detail: "miles analyzed" },
					{ label: "ISO", detail: "9001 and 27001 systems" },
				]}
				secondaryCta={{ href: "/platform-and-apps", label: "Learn More" }}
				title={<><span className="sr-only">Usage-Based Insurance Solutions</span><span aria-hidden="true">Insurance telematics in one place</span></>}
				visual={<InsuranceVisual />}
			>
				<div className="mt-6 border-l-2 border-rb-red pl-4 lg:hidden">
					<p className="text-sm font-semibold text-white">Insurance data ready</p>
					<p className="mt-1 text-sm leading-6 text-white/62">Scoring, FNOL, crash insight, and API delivery</p>
				</div>
			</EditorialHero>
			<InsuranceLogoStrip />
		</>
	);
}
