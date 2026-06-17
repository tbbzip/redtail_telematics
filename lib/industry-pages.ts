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
		title: "Car Rental Industry Solutions",
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
		primaryCta: "Start Your Free Trial",
		primaryCtaHref: "/get-started",
		secondaryCta: "Talk to our team",
		secondaryCtaHref: "/contact-us",
		supportingText: "No credit card required",
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
				"Enhance the safety of your rental fleet by monitoring renter driving behavior. Track key metrics like speed, harsh braking, and rapid acceleration to ensure that vehicles are driven responsibly. Receive alerts for unsafe driving to prevent potential damage or accidents.",
			icon: CarSignalIcon,
		},
		{
			title: "GPS Vehicle Tracking",
			description:
				"Keep track of your rental vehicles with GPS tracking. Know the exact location of each vehicle at all times, ensuring timely returns and preventing unauthorized use. Improve customer service by providing accurate vehicle availability information.",
			icon: GpsSignal01Icon,
		},
		{
			title: "Crash Reconstruction",
			description:
				"Accurately analyze collisions involving your rental vehicles with comprehensive crash data. Reconstruct accidents using detailed information on speed, braking, and impact points, helping to resolve claims and reduce liability risks.",
			icon: FileChartColumnIcon,
		},
		{
			title: "Automated Maintenance Scheduling",
			description:
				"Extend the life of your rental fleet with automated maintenance scheduling. Track vehicle health and schedule maintenance based on usage, ensuring that vehicles are well-maintained and minimizing unexpected downtime.",
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
				"Safeguard your rental fleet from theft with tracking and alerts for unauthorized movement. Improve the chances of recovering stolen vehicles quickly and efficiently, reducing potential losses.",
			icon: ShieldKeyIcon,
		},
		{
			title: "Insurance Premium Reduction",
			description:
				"Reduce your insurance costs by demonstrating enhanced vehicle security and driver monitoring. Telematics data can help lower premiums by showing insurers that your fleet is equipped with GPS tracking and driver behavior monitoring.",
			icon: ChartAnalysisIcon,
		},
		{
			title: "Tax Benefit",
			description:
				"Utilize Section 179 deductions to offset GPS tracking investments, saving your business up to 35%. Take advantage of this tax-saving opportunity to make your fleet management solutions even more cost-effective.",
			icon: FileChartColumnIcon,
		},
		{
			title: "High-Speed Alerts",
			description:
				"Receive instant alerts when a rental vehicle exceeds safe speed limits. High-speed alerts help protect your fleet by encouraging renters to drive responsibly, reducing the risk of accidents and minimizing wear and tear on your vehicles.",
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
				"Telematics refers to the use of GPS and onboard diagnostics to monitor vehicle location, speed, driving behavior, and more. For a car rental business, telematics provides real-time insights into fleet performance, vehicle health, and driver behavior, allowing you to optimize vehicle usage, reduce maintenance costs, and enhance customer safety.",
		},
		{
			question: "How can telematics help reduce my operational costs?",
			answer:
				"Telematics can help reduce costs by providing real-time data on vehicle health and driving habits, which helps identify issues early and reduce wear and tear. It also allows you to ensure proper vehicle usage, and prevent unauthorized vehicle use, all contributing to lower operational expenses.",
		},
		{
			question: "How do I set up telematics devices in my rental fleet?",
			answer:
				"To set up telematics devices in your rental fleet, you need to purchase compatible GPS tracking devices. Install the devices in your vehicles by following the provided instructions. Once installed, use the telematics platform or app to activate and monitor each vehicle in your fleet.",
		},
		{
			question: "Can telematics improve my fleet's security?",
			answer:
				"Yes, telematics can significantly improve fleet security. With real-time tracking, you can monitor the location of your vehicles at all times, receive alerts for unauthorized use, and recover stolen vehicles more quickly. Geofencing can also be used to define areas where vehicles are allowed, triggering alerts if they exit the defined zones.",
		},
		{
			question: "How does telematics enhance the customer experience for car rentals?",
			answer:
				"Telematics enhances the customer experience by ensuring vehicles are well-maintained and safe. You can also offer customers added features such as GPS navigation, roadside assistance, and real-time updates on vehicle condition. Additionally, telematics can streamline the check-in and check-out process by ensuring vehicle status is up to date, making rentals quicker and more efficient.",
		},
		{
			question: "What type of data can I track with telematics?",
			answer:
				"Telematics allows you to track a wide range of data, including real-time vehicle location, mileage, driving behavior (speeding, harsh braking, etc.), and vehicle health diagnostics. This data is invaluable for managing your rental fleet efficiently and ensuring your vehicles are in optimal condition.",
		},
		{
			question: "Can telematics help reduce insurance premiums for my rental fleet?",
			answer:
				"Yes, many insurance providers offer discounts for fleets that utilize telematics, as it promotes safer driving and reduces risk. By monitoring driver behavior and providing data on vehicle usage, you can demonstrate that your fleet is well-managed, potentially leading to lower insurance premiums.",
		},
		{
			question: "How do I access telematics data for my rental vehicles?",
			answer:
				"Accessing telematics data is simple. You can log into the telematics platform via a web dashboard or mobile app. From there, you can view real-time data on vehicle location, performance, and driver behavior, as well as access reports for analysis and decision-making.",
		},
		{
			question: "How can telematics help with maintenance scheduling?",
			answer:
				"Telematics provides real-time data on vehicle health, including engine diagnostics, mileage, and usage patterns. With this information, you can schedule maintenance proactively, preventing breakdowns and reducing downtime, ensuring that your vehicles are always ready for rental.",
		},
		{
			question: "What kind of customer support is available for telematics setup and maintenance?",
			answer:
				"Our customer support team is available to assist you with the setup, maintenance, and troubleshooting of your telematics devices. Support is provided from Monday to Friday, 9:00 AM to 6:00 PM, and for urgent issues, you can contact us via email or phone for prompt assistance.",
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
			primaryCta: "Start Your Free Trial",
			primaryCtaHref: "/get-started",
			secondaryCta: "Talk to our team",
			secondaryCtaHref: "/contact-us",
			supportingText: "No credit card required",
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
