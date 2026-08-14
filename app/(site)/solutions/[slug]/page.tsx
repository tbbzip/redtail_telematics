import type { Metadata } from "next";
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
} from "@/components/nav-links";
import { defaultSocialImage } from "@/lib/site-metadata";
import { notFound } from "next/navigation";

const solutionDescriptions: Record<string, string> = {
	"usage-based-insurance":
		"Telematics data and connected vehicle technology for usage-based insurance programs, driver insight, and policyholder engagement.",
	"fleet-management":
		"Fleet visibility, vehicle tracking, maintenance insight, alerts, and connected workflows from Redtail Telematics.",
	"reseller-program":
		"A partner-ready telematics platform, devices, apps, and operational support for resellers building recurring customer programs.",
	"white-label":
		"Launch a branded telematics experience with configurable web and mobile applications, devices, data, and program support.",
	devices:
		"Explore Redtail telematics devices, technical specifications, installation options, and connected vehicle capabilities.",
};

export function generateStaticParams() {
	return getRouteEntriesByPrefix("/solutions/").map((entry) => ({
		slug: entry.href.split("/").at(-1) ?? "",
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const entry = getRouteEntry(`/solutions/${slug}`);

	if (!entry) {
		return {};
	}

	const title = `${entry.label} | Redtail Telematics`;
	const description =
		solutionDescriptions[slug] ||
		`Explore Redtail Telematics ${entry.label.toLowerCase()} capabilities and connected vehicle workflows.`;
	const canonical = `/solutions/${slug}`;

	return {
		title,
		description,
		alternates: { canonical },
		openGraph: {
			title,
			description,
			images: [defaultSocialImage],
			url: canonical,
		},
		twitter: { title, description, images: [defaultSocialImage] },
	};
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

	notFound();
}
