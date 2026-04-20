import { MediaHero } from "@/components/media-hero";

type MarketingPageProps = {
	eyebrow: string;
	title: string;
	description: string;
	primaryCta?: {
		label: string;
		href: string;
	};
	secondaryCta?: {
		label: string;
		href: string;
	};
};

export function MarketingPage({
	eyebrow,
	title,
	description,
	primaryCta,
	secondaryCta,
}: MarketingPageProps) {
	return (
		<main className="flex-1 bg-background">
			<MediaHero
				description={description}
				eyebrow={eyebrow}
				imageAlt="Redtail building exterior"
				imageSrc="/careers-building.jpg"
				primaryCta={primaryCta}
				secondaryCta={secondaryCta}
				title={title}
			/>
		</main>
	);
}
