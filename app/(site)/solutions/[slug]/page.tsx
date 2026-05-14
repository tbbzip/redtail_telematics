import { MarketingPage } from "@/app/_components/marketing-page";
import { DevicesPageSections } from "@/components/devices-page";
import { FleetManagementFaqSection } from "@/components/fleet-management-faq";
import { FleetManagementHero } from "@/components/fleet-management-hero";
import { FleetManagementSolutionsSection } from "@/components/fleet-management-solutions-section";
import { ResellerProgramFaqSection } from "@/components/reseller-program-faq";
import { ResellerProgramHero } from "@/components/reseller-program-hero";
import { ResellerProgramPartnerSection } from "@/components/reseller-program-partner-section";
import { UsageBasedInsuranceFaqSection } from "@/components/usage-based-insurance-faq";
import { UsageBasedInsuranceHero } from "@/components/usage-based-insurance-hero";
import { UsageBasedInsuranceSolutionSection } from "@/components/usage-based-insurance-solution";
import { UsageBasedInsuranceValueChainSection } from "@/components/usage-based-insurance-value-chain";
import { WhiteLabelHero } from "@/components/white-label-hero";
import { WhiteLabelOfferingSection } from "@/components/white-label-offering-section";
import { WhiteLabelTestimonialsSection } from "@/components/white-label-testimonials";
import {
	getRouteEntriesByPrefix,
	getRouteEntry,
	primaryCtaLink,
	secondaryCtaLink,
} from "@/components/nav-links";
import { notFound } from "next/navigation";

export function generateStaticParams() {
	return getRouteEntriesByPrefix("/solutions/").map((entry) => ({
		slug: entry.href.split("/").at(-1) ?? "",
	}));
}

export default async function SolutionPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const entry = getRouteEntry(`/solutions/${slug}`);

	if (!entry) {
		notFound();
	}

	if (slug === "usage-based-insurance") {
		return (
			<main className="flex-1 overflow-x-clip bg-background">
				<UsageBasedInsuranceHero />
				<UsageBasedInsuranceSolutionSection />
				<UsageBasedInsuranceValueChainSection />
				<UsageBasedInsuranceFaqSection />
			</main>
		);
	}

	if (slug === "fleet-management") {
		return (
			<main className="flex-1 overflow-x-clip bg-background">
				<FleetManagementHero />
				<FleetManagementSolutionsSection />
				<FleetManagementFaqSection />
			</main>
		);
	}

	if (slug === "reseller-program") {
		return (
			<main className="flex-1 overflow-x-clip bg-background">
				<ResellerProgramHero />
				<ResellerProgramPartnerSection />
				<ResellerProgramFaqSection />
			</main>
		);
	}

	if (slug === "white-label") {
		return (
			<main className="flex-1 overflow-x-clip bg-background">
				<WhiteLabelHero />
				<WhiteLabelOfferingSection />
				<WhiteLabelTestimonialsSection />
			</main>
		);
	}

	if (slug === "devices") {
		return (
			<main className="flex-1 overflow-x-clip bg-background">
				<DevicesPageSections />
			</main>
		);
	}

	return (
		<MarketingPage
			description={`Use this page to build out the ${entry.label} story with sector-specific benefits, platform workflows, and proof points.`}
			eyebrow={entry.section}
			primaryCta={primaryCtaLink}
			secondaryCta={secondaryCtaLink}
			title={entry.label}
		/>
	);
}
