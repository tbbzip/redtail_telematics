import { MediaHero } from "@/components/media-hero";
import { topLevelLink } from "@/components/nav-links";

export function HeroSection() {
	return (
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
	);
}
