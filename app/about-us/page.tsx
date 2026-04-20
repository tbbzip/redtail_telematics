import { MarketingPage } from "@/app/_components/marketing-page";
import { primaryCtaLink, secondaryCtaLink } from "@/components/nav-links";

export default function AboutUsPage() {
	return (
		<MarketingPage
			description="Use this page to explain Redtail's story, market position, team, and why the company is building connected vehicle tools for complex fleet operations."
			eyebrow="Company"
			primaryCta={primaryCtaLink}
			secondaryCta={secondaryCtaLink}
			title="About Us"
		/>
	);
}
