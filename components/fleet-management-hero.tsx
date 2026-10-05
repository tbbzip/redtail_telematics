import Image from "next/image";
import { Call02Icon } from "@hugeicons/core-free-icons";

import { EditorialHero } from "@/components/editorial-hero";
import { HugeIcon } from "@/components/huge-icon";
import { ProductScreenshot } from "@/components/product-visual";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

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

function FleetLogoStrip() {
	return (
		<div className="border-b border-black/10 bg-white px-4 py-6 text-rb-black sm:px-6 lg:px-8">
			<div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[16rem_1fr] lg:items-center">
				<p className="text-xs font-semibold tracking-[0.2em] text-rb-black/55 uppercase">
					Trusted by leading brands
				</p>
				<div className="mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] overflow-hidden">
					<InfiniteSlider gap={46} speed={24} speedOnHover={13}>
						{fleetBrandLogos.map((logo) => (
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

function FleetVisual() {
	return (
		<div>
			<ProductScreenshot
				aspectRatio={1380 / 763}
				alt="Current Redtail fleet map with vehicle status filters, map controls and journey replay controls"
				caption="Fleet visibility and replay controls in the Redtail web portal"
				eager
				label="Redtail fleet portal"
				src="/platform-screenshots/current/fleet-map.jpg"
			/>
			<div className="mt-4 hidden border-l-2 border-rb-red py-1 pl-4 lg:block">
				<p className="text-sm font-semibold text-white">Fleet visibility packet</p>
				<p className="mt-1 text-sm leading-6 text-white/72">
					Vehicle location, driver behavior, geofence activity, and maintenance context prepared for operations teams.
				</p>
			</div>
		</div>
	);
}

export function FleetManagementHero() {
	return (
		<>
			<EditorialHero
				description="See vehicle locations, review driver behavior, and plan maintenance from one fleet platform. Talk with Redtail about your vehicles, routes, and operational needs."
				eyebrow="Built for Business Fleets"
				primaryCta={{ href: "#footer-demo-form", label: "Request a Fleet Demo" }}
				proof={[
					{ label: "Live GPS", detail: "real-time vehicle visibility" },
					{ label: "Alerts", detail: "driver and security events" },
					{ label: "Reports", detail: "fleet activity and reporting" },
				]}
				secondaryCta={{ href: "#fleet-solutions", label: "See fleet capabilities" }}
				title="GPS Tracking and Telematics for Business Fleets"
				visual={<FleetVisual />}
			>
				<div className="mt-6 flex flex-col gap-2 text-sm leading-6 text-white/62">
					<p>Tell us about your company and fleet size to start the conversation.</p>
					<a className="inline-flex min-h-11 w-fit items-center gap-2 font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline" href="tel:+18667114880">
						<HugeIcon icon={Call02Icon} size={15} />
						Call Sales (866) 711-4880
					</a>
				</div>
				<div className="mt-6 border-l-2 border-rb-red pl-4 lg:hidden">
					<p className="text-sm font-semibold text-white">Fleet data ready</p>
					<p className="mt-1 text-sm leading-6 text-white/62">Tracking, alerts, reporting, and mobile access in one place</p>
				</div>
			</EditorialHero>
			<FleetLogoStrip />
		</>
	);
}
