import { CardsCarousel } from "@/components/cards-carousel";
import FadeContent from "@/components/FadeContent";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero";
import { LatestBlogSection } from "@/components/latest-blog-section";
import { LogosSection } from "@/components/logos-section";
import { PlatformFeatures } from "@/components/platform-features";
import { TestimonialsSection } from "@/components/testimonials-section";

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
