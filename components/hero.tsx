import Image from "next/image";
import {
	LayoutDashboardIcon,
	ShieldIcon,
	WrenchIcon,
} from "lucide-react";
import { LogoCloud } from "@/components/logo-cloud";
import { Badge } from "@/components/ui/badge";
import { topLevelLink } from "@/components/nav-links";
import { MediaHero } from "@/components/media-hero";

const heroCapabilities = [
	{
		icon: LayoutDashboardIcon,
		title: "Live fleet visibility",
		description:
			"Real-time map, journeys, and asset status in one view.",
	},
	{
		icon: ShieldIcon,
		title: "Driver risk and incident insight",
		description:
			"Behaviour events and incident context built for operational action.",
	},
	{
		icon: WrenchIcon,
		title: "Install quality and asset health",
		description:
			"Device health and install checks across every deployment.",
	},
];

const heroScreenshot = {
	src: "/platform-screenshots/redtail_lap-mob.png",
	width: 1200,
	height: 800,
	alt: "Redtail Telematics platform showing web and mobile fleet visibility views",
};

export function HeroSection() {
	return (
		<section className="border-b bg-background">
			<MediaHero
				description="See every vehicle and asset in real time, act on driver safety insights, and keep installations healthy with a platform trusted worldwide."
				eyebrow="Telematics Platform"
				imageAlt="Redtail building exterior"
				imageSrc="/careers-building.jpg"
				primaryCta={{ href: "/contact-us", label: "Book a demo" }}
				priority
				secondaryCta={{ href: topLevelLink.href, label: "Explore the platform" }}
				title="Complete telematics for fleets, insurers, and OEMs"
			/>

			<div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
				<div className="border-y border-black/10 lg:grid lg:grid-cols-3">
					{heroCapabilities.map((capability) => (
						<div
							className="border-b border-black/10 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0"
							key={capability.title}
						>
							<div className="flex gap-4 px-0 py-6 lg:items-start lg:px-6 lg:first:pl-0 lg:last:pr-0">
								<div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-black/10 bg-white text-rb-red">
									<capability.icon />
								</div>
								<div className="flex flex-col gap-2">
									<h2 className="text-base leading-6 font-semibold text-rb-black">
										{capability.title}
									</h2>
									<p className="max-w-sm text-sm leading-6 text-foreground/72">
										{capability.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mt-10 border-t border-black/10 pt-7">
					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
							<div className="max-w-2xl">
								<p className="text-[11px] font-semibold tracking-[0.22em] text-rb-red uppercase">
									Platform in use
								</p>
								<h2 className="mt-3 text-2xl leading-tight font-semibold text-rb-black sm:text-3xl">
									One product across desktop and mobile.
								</h2>
								<p className="mt-3 max-w-2xl text-sm leading-6 text-foreground/72 sm:text-[15px]">
									Review live fleet activity on the web and keep teams connected
									in the field with the mobile app.
								</p>
							</div>
							<div className="flex flex-wrap gap-2">
								<Badge variant="outline">Web dashboard</Badge>
								<Badge variant="outline">Mobile app</Badge>
								<Badge variant="outline">Journey detail</Badge>
							</div>
						</div>

						<div className="-mx-4 overflow-hidden border-y border-black/10 bg-[#f5f5f2] sm:mx-0 sm:rounded-[1.75rem] sm:border">
							<div className="px-2 pt-4 sm:px-8 sm:pt-6">
								<Image
									alt={heroScreenshot.alt}
									className="h-auto w-full drop-shadow-[0_24px_38px_rgba(1,1,1,0.14)]"
									height={heroScreenshot.height}
									preload
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1120px"
									src={heroScreenshot.src}
									width={heroScreenshot.width}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="border-t border-black/10">
				<div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
					<p className="text-xs font-semibold tracking-[0.28em] text-muted-foreground uppercase">
						Trusted by leading teams
					</p>
					<LogoCloud />
				</div>
			</div>
		</section>
	);
}
