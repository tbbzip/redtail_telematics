import { MarketingPage } from "@/app/_components/marketing-page";
import { primaryCtaLink, secondaryCtaLink } from "@/components/nav-links";

export default function PlatformAndAppsPage() {
	return (
		<MarketingPage
			description="Use this page to present the Redtail platform, dashboards, operator workflows, and mobile apps as a connected operating system for vehicle intelligence."
			eyebrow="Platform"
			primaryCta={primaryCtaLink}
			secondaryCta={secondaryCtaLink}
			title="Platform & Apps"
		/>
	);
}
