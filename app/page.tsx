import { CardsCarousel } from "@/components/cards-carousel";
import { HeroSection } from "@/components/hero";
import { LogosSection } from "@/components/logos-section";
import { PlatformFeatures } from "@/components/platform-features";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function Home() {
	return (
		<main className="flex-1 bg-background">
			<HeroSection />
			<LogosSection />
			<PlatformFeatures />
			<CardsCarousel />
			<TestimonialsSection />
		</main>
	);
}
