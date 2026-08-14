import { CardsCarousel } from "@/components/cards-carousel";
import FadeContent from "@/components/FadeContent";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero";
import { LatestBlogSection } from "@/components/latest-blog-section";
import { LogosSection } from "@/components/logos-section";
import { PlatformFeatures } from "@/components/platform-features";
import { TestimonialsSection } from "@/components/testimonials-section";
import { defaultSocialImage } from "@/lib/site-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Connected Vehicle Intelligence | Redtail Telematics",
	description:
		"Redtail Telematics connects vehicle, driver, and operational data for fleets, insurers, resellers, and connected mobility programs.",
	alternates: { canonical: "/" },
	openGraph: {
		title: "Connected Vehicle Intelligence | Redtail Telematics",
		description:
			"Connected vehicle technology and telematics programs for fleets, insurers, resellers, and mobility partners.",
		images: [defaultSocialImage],
		url: "/",
	},
};

export const revalidate = 60;

export default function Home() {
	return (
		<main className="flex-1 overflow-x-clip bg-background">
			<FadeContent duration={700} threshold={0.02}>
				<HeroSection />
			</FadeContent>
			<FadeContent delay={90} duration={650} threshold={0.14} yOffset={14}>
				<LogosSection />
			</FadeContent>
			<FadeContent delay={110} duration={700} threshold={0.16} yOffset={22}>
				<PlatformFeatures />
			</FadeContent>
			<FadeContent delay={110} duration={700} threshold={0.16} yOffset={22}>
				<CardsCarousel />
			</FadeContent>
			<FadeContent delay={110} duration={700} threshold={0.16} yOffset={22}>
				<TestimonialsSection />
			</FadeContent>
			<FadeContent delay={110} duration={700} threshold={0.16} yOffset={22}>
				<FaqSection />
			</FadeContent>
			<FadeContent delay={110} duration={700} threshold={0.16} yOffset={22}>
				<LatestBlogSection />
			</FadeContent>
		</main>
	);
}
