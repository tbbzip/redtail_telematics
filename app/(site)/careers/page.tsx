import { MarketingPage } from "@/app/_components/marketing-page";
import { primaryCtaLink, secondaryCtaLink } from "@/components/nav-links";

export default function CareersPage() {
	return (
		<MarketingPage
			description="Use this page to introduce hiring, culture, open roles, and the broader career path across Redtail teams."
			eyebrow="Company"
			primaryCta={primaryCtaLink}
			secondaryCta={secondaryCtaLink}
			title="Redtail Careers"
		/>
	);
}
