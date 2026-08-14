import {
	Alert02Icon,
	BellDotIcon,
	CarSignalIcon,
	ChartAnalysisIcon,
	DashboardSquare03Icon,
	FileChartColumnIcon,
	GpsSignal01Icon,
	MapsLocation01Icon,
	Route03Icon,
	ShieldKeyIcon,
	Wrench01Icon,
} from "@hugeicons/core-free-icons";
import { type IconSvgElement } from "@hugeicons/react";

export type IndustrySolution = {
	title: string;
	description: string;
	icon: IconSvgElement;
};

export type IndustryOutcome = {
	title: string;
	description: string;
	icon: IconSvgElement;
};

export type IndustryWorkflowStep = {
	label: string;
	title: string;
	description: string;
	icon: IconSvgElement;
};

export type IndustryFaq = {
	question: string;
	answer: string;
};

export type IndustryLogo = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

export type IndustryHeroContent = {
	slug: string;
	metadata: {
		title: string;
		description: string;
		openGraphTitle: string;
		openGraphDescription: string;
		twitterTitle: string;
		twitterDescription: string;
		canonical: string;
	};
	hero: {
		eyebrow: string;
		title: string;
		description: string;
		primaryCta: string;
		primaryCtaHref: string;
		secondaryCta: string;
		secondaryCtaHref: string;
		supportingText: string;
		chips: string[];
		mediaLabel: string;
		imageSrc: string;
		imageAlt: string;
		imagePosition?: string;
	};
};

export type IndustryPageContent = IndustryHeroContent & {
	logos: IndustryLogo[];
	outcomes: IndustryOutcome[];
	solutions: IndustrySolution[];
	workflow: IndustryWorkflowStep[];
	faqs: IndustryFaq[];
};

const carRentalPage: IndustryPageContent = {
	slug: "car-rental",
	metadata: {
		title: "Car Rental Industry Solutions | Redtail Telematics",
		description:
			"Streamline your car rental operations with Redtail Telematics' industry-specific solutions. Benefit from real-time vehicle tracking, efficient fleet management, and enhanced driver safety tailored to the unique needs of the car rental sector.",
		openGraphTitle: "Car Rental Industry Solutions | Redtail Telematics",
		openGraphDescription:
			"Optimize your car rental fleet with Redtail Telematics' specialized industry solutions. Gain real-time tracking, improve driver safety, and manage your fleet efficiently to meet the high demands of the car rental sector.",
		twitterTitle: "Car Rental Industry Solutions | Redtail Telematics",
		twitterDescription:
			"Enhance your car rental operations with Redtail Telematics' industry-focused solutions. Utilize real-time tracking, driver safety features, and comprehensive fleet management to ensure efficiency and customer satisfaction in the car rental sector.",
		canonical: "https://www.redtailtelematics.com/industries/car-rental",
	},
	hero: {
		eyebrow: "Industries / Car Rental",
		title: "Car Rental Fleets Telematic Solutions By Redtail",
		description:
			"Maximize Fleet Efficiency, Reduce Costs, and Enhance Customer Experience",
		primaryCta: "Get Started",
		primaryCtaHref: "/get-started",
		secondaryCta: "Talk to our team",
		secondaryCtaHref: "/contact-us",
		supportingText: "Tell us about your fleet",
		chips: [
			"Real-time vehicle location",
			"Driver behavior alerts",
			"Crash and claims insight",
		],
		mediaLabel: "Car rental fleet management video",
		imageSrc: "/industries/hero-rental.webp",
		imageAlt: "Rows of rental vehicles ready for dispatch",
		imagePosition: "center",
	},
	logos: [
		{ src: "/clients/ford.svg", alt: "Ford", width: 118, height: 36 },
		{ src: "/clients/jaguar.svg", alt: "Jaguar", width: 88, height: 36 },
		{ src: "/clients/lr.svg", alt: "Land Rover", width: 118, height: 36 },
		{ src: "/clients/toyota.svg", alt: "Toyota", width: 120, height: 36 },
		{ src: "/clients/lojack.svg", alt: "Lo-Jack", width: 124, height: 36 },
	],
	outcomes: [
		{
			title: "Protect rental assets",
			description:
				"Use location data, movement alerts, and geofences to keep better control of vehicles across branches, returns, and off-lot movement.",
			icon: ShieldKeyIcon,
		},
		{
			title: "Improve fleet availability",
			description:
				"Understand mileage, usage, maintenance needs, and vehicle status so teams can keep more cars ready for rental.",
			icon: DashboardSquare03Icon,
		},
		{
			title: "Resolve incidents faster",
			description:
				"Use crash data and driving context to support claims, reduce disputes, and make better decisions after an event.",
			icon: ChartAnalysisIcon,
		},
	],
	solutions: [
		{
			title: "Driver Behavior Monitoring",
			description:
				"Review available driving signals such as speed, harsh braking, and rapid acceleration. Configurable alerts can help operations teams identify events that warrant follow-up.",
			icon: CarSignalIcon,
		},
		{
			title: "GPS Vehicle Tracking",
			description:
				"Review reported vehicle locations and recent movement to support branch visibility, return workflows, and investigation of unexpected use.",
			icon: GpsSignal01Icon,
		},
		{
			title: "Crash Reconstruction",
			description:
				"Use available speed, braking, impact, and trip data to support incident review and claims workflows. Recorded data complements, but does not replace, a formal investigation.",
			icon: FileChartColumnIcon,
		},
		{
			title: "Automated Maintenance Scheduling",
			description:
				"Use available mileage, diagnostic, and usage data to support maintenance reminders. Service decisions remain subject to manufacturer guidance and qualified inspection.",
			icon: Wrench01Icon,
		},
		{
			title: "Geofencing",
			description:
				"Define virtual boundaries around your rental locations to monitor vehicle entry and exit. Receive instant alerts if a vehicle leaves designated areas, ensuring compliance with rental agreements and enhancing security.",
			icon: MapsLocation01Icon,
		},
		{
			title: "Stolen Vehicle Tracking",
			description:
				"Use location reporting and unexpected-movement alerts to support a theft-response workflow. Availability of data and recovery outcomes depend on the incident, device, network, and authorities.",
			icon: ShieldKeyIcon,
		},
		{
			title: "Insurance and Claims Context",
			description:
				"Share relevant vehicle, trip, and incident records with authorised claims or insurance teams. Coverage, eligibility, and premium decisions remain with the insurer.",
			icon: ChartAnalysisIcon,
		},
		{
			title: "Operational Reporting",
			description:
				"Bring vehicle activity, exceptions, maintenance inputs, and device records into reports that can be reviewed by the appropriate operational teams.",
			icon: FileChartColumnIcon,
		},
		{
			title: "High-Speed Alerts",
			description:
				"Configure speed-event alerts to surface activity for operational review. Alert timing depends on the device, connectivity, and configured reporting behavior.",
			icon: BellDotIcon,
		},
	],
	workflow: [
		{
			label: "Locate",
			title: "Know where each rental vehicle is",
			description:
				"Keep branch teams aligned with live GPS context, recent movement, and vehicle availability data.",
			icon: GpsSignal01Icon,
		},
		{
			label: "Protect",
			title: "Spot misuse before it becomes expensive",
			description:
				"Use behavior monitoring, high-speed alerts, and geofencing to flag risk while vehicles are away from your lot.",
			icon: Alert02Icon,
		},
		{
			label: "Maintain",
			title: "Keep vehicles ready for the next renter",
			description:
				"Use mileage, diagnostics, and usage patterns to schedule service before avoidable downtime affects availability.",
			icon: Wrench01Icon,
		},
		{
			label: "Resolve",
			title: "Support claims with clearer evidence",
			description:
				"Crash reconstruction and trip data help teams understand what happened and respond with confidence.",
			icon: Route03Icon,
		},
	],
	faqs: [
		{
			question: "What is telematics and how does it benefit my car rental business?",
			answer:
				"Telematics combines vehicle devices, connectivity, and software to report data such as location, mileage, driving events, and supported diagnostics. Rental teams can use that information as an input to fleet availability, maintenance, incident, and vehicle-use workflows.",
		},
		{
			question: "How can telematics help reduce my operational costs?",
			answer:
				"Telematics can help teams identify unusual use, review mileage and supported diagnostics, and plan operational follow-up. Actual cost outcomes depend on fleet practices, implementation, and the actions taken from the data.",
		},
		{
			question: "How do I set up telematics devices in my rental fleet?",
			answer:
				"Device choice and installation depend on the vehicle, required data, and deployment model. Redtail can confirm compatibility and whether professional-fit or self-fit hardware is appropriate before activation in the platform.",
		},
		{
			question: "Can telematics improve my fleet's security?",
			answer:
				"Telematics can add reported location, unexpected-movement alerts, and geofence events to an existing fleet-security process. It does not prevent theft or guarantee recovery, and results depend on device, network, operational response, and law-enforcement factors.",
		},
		{
			question: "How does telematics enhance the customer experience for car rentals?",
			answer:
				"Vehicle status, mileage, location, and supported diagnostic data can give branch teams more context for availability, returns, and service follow-up. The customer experience depends on how each rental operator integrates that data into its processes.",
		},
		{
			question: "What type of data can I track with telematics?",
			answer:
				"Depending on the selected device, vehicle, connectivity, and integration, available data may include reported location, mileage, speed events, harsh braking, acceleration, trip history, and supported vehicle diagnostics. Compatibility should be confirmed for the proposed deployment.",
		},
		{
			question: "Can telematics help reduce insurance premiums for my rental fleet?",
			answer:
				"Telematics can provide driving, vehicle-use, and incident context that an insurer may choose to review. It does not guarantee eligibility, a discount, or a premium reduction; those decisions remain entirely with the insurer.",
		},
		{
			question: "How do I access telematics data for my rental vehicles?",
			answer:
				"Authorised users can access the views included in their deployment through the configured web portal or mobile app. Available location, vehicle, behavior, and report data depends on the device and service configuration.",
		},
		{
			question: "How can telematics help with maintenance scheduling?",
			answer:
				"Available mileage, engine-hour, diagnostic, and usage data can support maintenance reminders and planning. It does not replace manufacturer schedules, inspections, technician judgement, or required maintenance records.",
		},
		{
			question: "What kind of customer support is available for telematics setup and maintenance?",
			answer:
				"Setup, maintenance, and troubleshooting responsibilities and response arrangements are defined for each deployment. Contact Redtail to confirm the support scope and escalation route proposed for your programme.",
		},
	],
};

function createIndustryHeroPage({
	slug,
	label,
	title,
	description,
	imageSrc,
	imageAlt,
	chips,
	imagePosition = "center",
}: {
	slug: string;
	label: string;
	title: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
	chips: string[];
	imagePosition?: string;
}): IndustryHeroContent {
	return {
		slug,
		metadata: {
			title: `${label} Industry Solutions | Redtail Telematics`,
			description,
			openGraphTitle: `${label} Industry Solutions | Redtail Telematics`,
			openGraphDescription: description,
			twitterTitle: `${label} Industry Solutions | Redtail Telematics`,
			twitterDescription: description,
			canonical: `https://www.redtailtelematics.com/industries/${slug}`,
		},
		hero: {
			eyebrow: `Industries / ${label}`,
			title,
			description,
			primaryCta: "Get Started",
			primaryCtaHref: "/get-started",
			secondaryCta: "Talk to our team",
			secondaryCtaHref: "/contact-us",
			supportingText: "Tell us about your fleet",
			chips,
			mediaLabel: `${label} fleet telematics hero image`,
			imageSrc,
			imageAlt,
			imagePosition,
		},
	};
}

const industryHeroPages = [
	carRentalPage,
	createIndustryHeroPage({
		slug: "construction",
		label: "Construction",
		title: "Telematics Solutions for Construction Fleets by Redtail",
		description:
			"Customised for the Construction Environment: Maximize Equipment Uptime, Enhance Job Site Security, and Optimize Fleet Performance",
		imageSrc: "/industries/hero-construction.webp",
		imageAlt: "Construction truck being loaded by an excavator",
		chips: ["Asset visibility", "Jobsite alerts", "Equipment utilization"],
		imagePosition: "center",
	}),
	createIndustryHeroPage({
		slug: "education",
		label: "Education",
		title: "Education Fleet Solutions by Redtail Telematics",
		description:
			"Enhance Safety, Improve Efficiency, and Ensure Accountability for School and Campus Fleets",
		imageSrc: "/industries/hero-education.webp",
		imageAlt: "School buses lined up for student transportation",
		chips: ["Route visibility", "Student transport", "Driver safety"],
		imagePosition: "center",
	}),
	createIndustryHeroPage({
		slug: "emergency-vehicles",
		label: "Emergency Vehicles",
		title: "Emergency Vehicles Fleet Solutions by Redtail Telematics",
		description:
			"Enhance Officer Safety, Improve Response Times, and Maintain Secure Fleet Operations",
		imageSrc: "/industries/hero-emergency.webp",
		imageAlt: "Ambulances lined up outside a response facility",
		chips: ["Response visibility", "Fleet readiness", "Incident context"],
		imagePosition: "center",
	}),
	createIndustryHeroPage({
		slug: "field-services",
		label: "Field Services",
		title: "Field Service Fleet Solutions by Redtail Telematics",
		description:
			"Enhance Efficiency, Ensure Safety, and Boost Productivity for Your Field Service Fleet",
		imageSrc: "/industries/hero-field.webp",
		imageAlt: "Service trucks staged for field operations",
		chips: ["Crew visibility", "Route context", "Service uptime"],
		imagePosition: "center",
	}),
	createIndustryHeroPage({
		slug: "food-and-beverage",
		label: "Food & Beverage",
		title: "Food & Beverage Fleet Solutions by Redtail Telematics",
		description: "Maintain Quality, Ensure Compliance, and Optimize Delivery Efficiency",
		imageSrc: "/industries/hero-food.webp",
		imageAlt: "Delivery trucks moving along a roadway",
		chips: ["Delivery visibility", "Route performance", "Fleet reliability"],
		imagePosition: "center",
	}),
	createIndustryHeroPage({
		slug: "government",
		label: "Government",
		title: "Government Fleet Solutions by Redtail Telematics",
		description:
			"Enhance Efficiency, Ensure Compliance, and Promote Sustainability in Public Fleet Operations",
		imageSrc: "/navigation/featured-industries.png",
		imageAlt: "Redtail telematics industry solutions overview",
		chips: ["Public fleet visibility", "Compliance support", "Operational efficiency"],
		imagePosition: "center",
	}),
	createIndustryHeroPage({
		slug: "transportation-and-logistics",
		label: "Logistics",
		title: "Transportation & Logistics Fleet Solutions by Redtail Telematics",
		description:
			"Maximize Fleet Efficiency, Ensure Timely Deliveries, and Reduce Operational Costs with Our Advanced Telematics Solutions",
		imageSrc: "/industries/hero-logistics.webp",
		imageAlt: "Logistics trucks traveling on a highway",
		chips: ["Live ETAs", "Route visibility", "Driver performance"],
		imagePosition: "center",
	}),
	createIndustryHeroPage({
		slug: "passenger-transit",
		label: "Passenger Transit",
		title: "Passenger Transit Fleet Solutions by Redtail Telematics",
		description:
			"Improve Passenger Safety, Enhance Efficiency, and Ensure Reliable Service with Our Transit Solutions",
		imageSrc: "/industries/hero-passenger.webp",
		imageAlt: "Passenger bus being cleaned and prepared for service",
		chips: ["Service reliability", "Vehicle health", "Route operations"],
		imagePosition: "center",
	}),
	createIndustryHeroPage({
		slug: "utilities",
		label: "Utilities",
		title: "Utilities Fleet Solutions by Redtail Telematics",
		description:
			"Enhance Operational Efficiency, Ensure Safety, and Maximize Uptime for Your Utility Fleet",
		imageSrc: "/industries/hero-utility.webp",
		imageAlt: "Utility cart used for site operations",
		chips: ["Asset tracking", "Crew visibility", "Field response"],
		imagePosition: "center",
	}),
];

const industryPages = new Map([[carRentalPage.slug, carRentalPage]]);
const industryHeroPageMap = new Map(
	industryHeroPages.map((page) => [page.slug, page])
);

export function getIndustryPage(slug: string) {
	return industryPages.get(slug);
}

export function getIndustryHeroPage(slug: string) {
	return industryHeroPageMap.get(slug);
}
