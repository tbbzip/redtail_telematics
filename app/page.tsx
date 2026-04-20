import { AboutSection } from "@/components/about-section";
import { HeroSection } from "@/components/hero";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function Home() {
	return (
		<main className="flex-1 bg-background">
			<HeroSection />
			<AboutSection />
			<TestimonialsSection />
		</main>
	);
}
