import { MarketingPage } from "@/app/_components/marketing-page";
import { primaryCtaLink, secondaryCtaLink } from "@/components/nav-links";

export default function OurTechnologyPage() {
	return (
		<MarketingPage
			description="Use this page to explain hardware, data capture, integrations, and the architecture behind the Redtail telematics platform."
			eyebrow="Company"
			primaryCta={primaryCtaLink}
			secondaryCta={secondaryCtaLink}
			title="Our Technology"
		/>
	);
}
