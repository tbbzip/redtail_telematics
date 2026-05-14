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

export type IndustryPageContent = {
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
	};
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
		imageSrc: "/navigation/featured-industries.png",
		imageAlt: "Car rental fleet management dashboard placeholder",
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

const industryPages = new Map([[carRentalPage.slug, carRentalPage]]);

export function getIndustryPage(slug: string) {
	return industryPages.get(slug);
}
