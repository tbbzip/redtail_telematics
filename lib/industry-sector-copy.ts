import {
	Alert02Icon,
	CarSignalIcon,
	ChartAnalysisIcon,
	FileChartColumnIcon,
	GpsSignal01Icon,
	MapsLocation01Icon,
	Route03Icon,
	ShieldKeyIcon,
	Wrench01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

import type { IndustryFaq, IndustrySolution } from "@/lib/industry-pages";
import { section179Benefit } from "@/lib/tax-benefits";

export type IndustrySectorCopy = {
	label: string;
	description: string;
	solutions: IndustrySolution[];
	faqs: IndustryFaq[];
};

function solution(title: string, description: string, icon: IconSvgElement): IndustrySolution {
	return { title, description, icon };
}

function faq(question: string, answer: string): IndustryFaq {
	return { question, answer };
}

const section179Solution: IndustrySolution = {
	title: section179Benefit.title,
	description: section179Benefit.description,
	icon: FileChartColumnIcon,
	href: section179Benefit.guidanceHref,
	linkLabel: section179Benefit.guidanceLabel,
};

function sector({ label, fleet, description, solutions, faqs }: {
	label: string;
	fleet: string;
	description: string;
	solutions: IndustrySolution[];
	faqs: IndustryFaq[];
}): IndustrySectorCopy {
	return {
		label,
		description,
		solutions,
		faqs: [
			...faqs,
			faq(`How do we set up telematics for our ${fleet}?`, "Share your vehicles, assets, required data, and installation plans with Redtail. Our team can confirm compatible professional-fit or self-fit devices and the setup that fits your deployment."),
			faq(`How do we access telematics data for our ${fleet}?`, "Use the Redtail web portal or Fleet App to review vehicle locations, journey history, driving behaviour, and reports included in your setup. Access and available data depend on your deployment."),
			faq("What support is available for setup and ongoing use?", "Redtail can help with device selection, installation, platform setup, and ongoing questions. Contact our team to confirm the support arrangements for your fleet."),
		],
	};
}

// Restored from the previous site's data/features.ts and data/faqs.ts.
// The team's current product guidance takes precedence over older claims.
const sectorCopy: Record<string, IndustrySectorCopy> = {
	construction: sector({
		label: "Construction",
		fleet: "construction vehicles and equipment",
		description: "Keep sight of vehicles and equipment across job sites, review operator behaviour, and plan maintenance around the needs of your projects.",
		solutions: [
			solution("Operator Behaviour Monitoring", "Monitor driving behaviours such as speed, harsh braking, and rapid acceleration. Use alerts and reports to support safer operation of your construction fleet.", CarSignalIcon),
			solution("GPS Vehicle & Equipment Tracking", "Monitor the location of construction vehicles and equipment. Review movement across job sites and investigate unexpected use.", GpsSignal01Icon),
			solution("Crash Reconstruction", "Review available speed, braking, impact, and journey data after a collision to support incident documentation and insurance conversations.", FileChartColumnIcon),
			solution("Vehicle & Equipment Maintenance", "Keep track of fleet maintenance and plan service so vehicles and equipment are ready for the next job.", Wrench01Icon),
			solution("Job Site Geofencing", "Set virtual boundaries around job sites and receive alerts when vehicles or equipment enter or leave designated areas.", MapsLocation01Icon),
			solution("Stolen Vehicle & Equipment Tracking", "Use location reporting and unexpected-movement alerts to help investigate missing assets and share useful information with the appropriate authorities.", ShieldKeyIcon),
			solution("Insurance & Incident Records", "Bring driving, vehicle-use, and incident records to your insurer. Coverage and premium decisions remain with the insurer.", ChartAnalysisIcon),
			solution("Odometer & Mileage Records", "Keep odometer and journey records to support business mileage and tax recordkeeping across your construction fleet.", FileChartColumnIcon),
			section179Solution,
		],
		faqs: [
			faq("What is telematics and how does it benefit my construction business?", "Telematics connects vehicle and equipment location, usage, and driving data with tools your team can review. It gives construction businesses more visibility across job sites and helps with asset use, operator safety, and maintenance planning."),
			faq("How can telematics help reduce operational costs in construction?", "Review equipment use, journeys, and idling to identify unnecessary activity and improve allocation between job sites. Fleet maintenance records also help your team plan service. Results depend on the actions your business takes."),
			faq("Can telematics improve the security of my construction equipment?", "Location tracking, unexpected-movement alerts, and job site geofences help teams investigate unauthorised use or missing equipment. Telematics supports your security process; it does not guarantee prevention or recovery."),
			faq("How does telematics improve job site efficiency?", "Vehicle and equipment location and usage records help you see where assets are being used, review idle time, and coordinate resources between sites."),
			faq("What data can I track for construction equipment?", "Available data may include location, journeys, mileage, driving events, and vehicle or device battery levels. Redtail can confirm the information available for the devices and equipment in your fleet."),
			faq("How can telematics help with construction fleet maintenance?", "Use fleet usage and maintenance records to keep track of service needs for your vehicles and equipment. Discuss the maintenance information you need with Redtail."),
		],
	}),
	"field-services": sector({
		label: "Field Services",
		fleet: "field service vehicles",
		description: "Connect vehicle locations, job site visits, driving behaviour, and maintenance records with the day-to-day needs of your field service teams.",
		solutions: [
			solution("Driver Safety Monitoring", "Review speeding, harsh braking, and rapid acceleration. Use alerts and safety reports to support driver feedback across your field service fleet.", CarSignalIcon),
			solution("Job Site Visit History", "Review vehicle visits, stops, and journey history to understand activity at customer sites and support operational follow-up.", Route03Icon),
			solution("Vehicle Location Tracking", "Track vehicle locations, journeys, and stops so your team has clearer visibility when coordinating service visits.", GpsSignal01Icon),
			solution("Fleet Maintenance Management", "Keep track of vehicle maintenance and service records to support the vehicles your teams rely on every day.", Wrench01Icon),
			solution("Trip Preparation & Journey Review", "Review completed journeys and use them as a reference when preparing upcoming trips to customer sites.", Route03Icon),
			solution("Geofencing Alerts", "Create geofences around customer sites and service areas. Receive alerts when vehicles enter or leave those locations.", MapsLocation01Icon),
			solution("Operational Efficiency Insights", "Review idling and vehicle use to identify unnecessary activity and opportunities to improve fleet efficiency.", ChartAnalysisIcon),
			solution("Odometer & Mileage Records", "Keep odometer and journey records to support business mileage and tax recordkeeping for service travel.", FileChartColumnIcon),
			section179Solution,
			solution("Detailed Performance Reports", "Use journey and driving behaviour reports to review fleet activity, identify patterns, and inform operational decisions.", FileChartColumnIcon),
		],
		faqs: [
			faq("What is telematics, and how does it benefit my field service business?", "Telematics brings together vehicle locations, usage, and driving behaviour. Field service teams can use this information to review activity at customer sites, manage vehicle use, and plan maintenance."),
			faq("How can telematics help reduce operational costs in field services?", "Review journeys, idling, and vehicle usage to identify unnecessary activity. Mileage and maintenance records help your team make informed service and operating decisions."),
			faq("Can telematics improve the security of my field service vehicles?", "Location reporting, unexpected-movement alerts, and geofences around service areas can help your team investigate unauthorised vehicle use and missing vehicles."),
			faq("How does telematics improve efficiency in field service operations?", "Use vehicle locations and journey history to coordinate resources and review customer-site visits. Completed journeys can provide a useful reference when preparing upcoming trips."),
			faq("What data can I track in my field service fleet?", "Review vehicle locations, journeys, mileage, idling, and driving events such as speeding or harsh braking. The available information depends on the device and vehicle setup."),
			faq("How can telematics help with field service vehicle maintenance?", "Bring vehicle use and maintenance records together so your team can keep track of service and plan maintenance across the fleet."),
		],
	}),
	"food-and-beverage": sector({
		label: "Food & Beverage",
		fleet: "food and beverage fleet",
		description: "Review delivery journeys, vehicle locations, driver behaviour, and maintenance to support reliable food and beverage distribution.",
		solutions: [
			solution("Operational Insights", "Review fleet activity and delivery journeys to understand how vehicles are being used and where your team can improve operations.", ChartAnalysisIcon),
			solution("Real-Time Vehicle Tracking", "See vehicle locations, journeys, and stops to support visibility across delivery operations.", GpsSignal01Icon),
			solution("Trip Log & Maintenance Tracking", "Keep journey and maintenance records together to help plan service for your delivery vehicles.", Wrench01Icon),
			solution("Trip Preparation & Journey Review", "Use previous delivery journeys as a reference when preparing upcoming trips and reviewing vehicle use.", Route03Icon),
			solution("Geofencing Alerts", "Create geofences around warehouses, loading areas, and delivery locations. Receive alerts when a vehicle enters or leaves those areas.", MapsLocation01Icon),
			solution("Driver Efficiency Insights", "Review driver behaviour and idling to identify opportunities for safer driving and more efficient vehicle use.", CarSignalIcon),
			solution("Vehicle Usage Monitoring", "Understand journey distance, stops, and activity across the delivery fleet to support allocation and operating decisions.", ChartAnalysisIcon),
			solution("Odometer & Mileage Records", "Keep odometer and journey records to support business mileage and tax recordkeeping for your delivery fleet.", FileChartColumnIcon),
			section179Solution,
			solution("Detailed Performance Reports", "Use journey, idling, and driver behaviour reports to review delivery activity and inform business decisions.", FileChartColumnIcon),
		],
		faqs: [
			faq("How does telematics benefit my food and beverage fleet?", "Vehicle location, journey history, and driving behaviour give your team more visibility into delivery operations. This information helps you review vehicle use, maintenance, and delivery activity."),
			faq("How does telematics improve delivery efficiency?", "Review completed journeys, stops, and idling to understand delivery activity and identify unnecessary vehicle use. Previous journeys can help with preparation for upcoming trips."),
			faq("How can Redtail help with delivery vehicle maintenance?", "Keep track of maintenance and service records for your delivery vehicles. Fleet usage information helps your team plan maintenance around operational needs."),
			faq("How does geofencing benefit my food and beverage operations?", "Create virtual boundaries around warehouses, loading areas, or delivery locations and receive alerts when vehicles enter or leave them."),
			faq("Can telematics support fleet efficiency initiatives?", "Review idling, driving behaviour, and vehicle use to identify opportunities for improvement. Your team can compare activity before and after operational changes."),
			faq("What data can I track for food and beverage deliveries?", "Available data includes vehicle locations, journey history, mileage, and driving events. Redtail can confirm the data and reports available for your fleet setup."),
		],
	}),
	government: sector({
		label: "Government",
		fleet: "government fleet",
		description: "Use vehicle location, journey records, driver behaviour, and fleet reporting to support accountable public fleet operations.",
		solutions: [
			solution("Real-Time Vehicle Tracking", "Review vehicle locations, journeys, and stops to improve visibility across public service fleets.", GpsSignal01Icon),
			solution("Fleet Data & Access", "Discuss user access, data handling, and integration requirements with Redtail so the deployment fits your agency's needs.", ShieldKeyIcon),
			solution("Fleet Efficiency Insights", "Review fleet usage and driving patterns to support resource allocation and informed operational decisions.", ChartAnalysisIcon),
			solution("Trip Preparation & Journey Review", "Review completed journeys and use them as a reference when preparing upcoming public service trips.", Route03Icon),
			solution("Operational Reporting", "Bring vehicle activity and driving records into reports for internal review and fleet accountability.", FileChartColumnIcon),
			solution("Geofencing & Alerts", "Create boundaries around authorised locations and sensitive areas, with alerts when vehicles enter or leave designated zones.", MapsLocation01Icon),
			solution("Odometer & Journey Records", "Keep mileage and journey records to support vehicle-use review and accountable fleet recordkeeping.", FileChartColumnIcon),
			solution("Idling & Vehicle Use", "Review idle time and vehicle usage to inform your agency's efficiency and sustainability initiatives.", CarSignalIcon),
			solution("Maintenance & Utilisation", "Use fleet activity and maintenance records to plan service and review how vehicles are allocated across public operations.", Wrench01Icon),
		],
		faqs: [
			faq("How can telematics improve operational efficiency in government fleets?", "Vehicle locations, journey history, and driver behaviour give fleet teams evidence for resource allocation and operating decisions. Maintenance records help teams keep track of service across the fleet."),
			faq("How does telematics support government sustainability goals?", "Review idling and vehicle use to identify unnecessary activity and inform fleet efficiency initiatives. Operational decisions and their outcomes remain with your agency."),
			faq("What security arrangements are available for government fleet data?", "Discuss your agency's data handling, user access, and integration requirements with Redtail. The team can explain the arrangements available for the proposed deployment."),
			faq("How can telematics support government fleet recordkeeping?", "Journey, mileage, driving behaviour, and operational reports can provide evidence for internal reviews. Confirm the required records and reporting scope with Redtail and your agency."),
			faq("What is geofencing, and how does it benefit government fleets?", "Geofencing creates virtual boundaries around locations such as authorised zones or sensitive sites. Entry and exit alerts help teams review vehicle movements."),
			faq("Can telematics improve driver safety within government fleets?", "Review speeding, harsh braking, and other driving events. Alerts and reports can support driver feedback and training within your agency."),
		],
	}),
	education: sector({
		label: "Education",
		fleet: "school and campus fleet",
		description: "Support school and campus transport with vehicle visibility, driving behaviour, journey records, and maintenance information.",
		solutions: [
			solution("Driver Safety Monitoring", "Review speeding, harsh braking, and idling across school buses and campus vehicles. Use alerts and reports to support safer driving practices.", CarSignalIcon),
			solution("Real-Time Vehicle Tracking", "See school bus and campus vehicle locations and review their journeys to support transport visibility for authorised fleet teams.", GpsSignal01Icon),
			solution("Trip Preparation & Journey Review", "Review completed journeys and use them as a reference when preparing upcoming school and campus trips.", Route03Icon),
			solution("Stop & Journey History", "Review recorded vehicle stops and journey history to understand transport activity and support operational accountability.", Route03Icon),
			solution("Geofencing Alerts", "Create geofences around campuses, depots, and restricted areas. Receive alerts when vehicles enter or leave designated zones.", MapsLocation01Icon),
			solution("Fleet Maintenance", "Keep track of maintenance and service records to support the vehicles used for school and campus transport.", Wrench01Icon),
			solution("Fleet Response Visibility", "Give authorised fleet teams location and movement context when responding to transport issues or changes in vehicle availability.", Alert02Icon),
			solution("Driver Performance Reports", "Use driving event reports to identify patterns and support feedback and training for school and campus drivers.", FileChartColumnIcon),
			solution("Odometer & Mileage Records", "Keep mileage and journey records to understand fleet usage and support school or campus transport recordkeeping.", FileChartColumnIcon),
		],
		faqs: [
			faq("How does telematics improve student safety in school transportation?", "Driving behaviour records and alerts help administrators review speeding, harsh braking, and idling. This information can support driver feedback and safer transport practices."),
			faq("Can telematics help track school bus locations in real time?", "Authorised fleet teams can review reported bus locations and journey history to understand vehicle movement and transport activity."),
			faq("How can journey records help with school transport preparation?", "Review the routes taken and stops recorded on previous journeys. Teams can use those journeys as a reference when preparing upcoming trips."),
			faq("Can we review vehicle stops with telematics?", "Recorded vehicle stops and journeys help you review where buses and campus vehicles have travelled and support transport activity reviews."),
			faq("How does telematics support maintenance for school buses?", "Keep vehicle usage and maintenance records together to help teams plan service across the school fleet. Discuss the maintenance information you need with Redtail."),
			faq("What is geofencing, and how does it benefit school fleets?", "Set virtual boundaries around campuses, depots, or restricted areas. Entry and exit alerts help authorised teams review vehicle movements."),
			faq("How can telematics data improve driver performance?", "Review driving events such as speeding, idling, and harsh braking, then use performance reports to support driver feedback and training."),
		],
	}),
	utilities: sector({
		label: "Utilities",
		fleet: "utility fleet",
		description: "Keep sight of crews and vehicles in the field, review off-hours activity, and support maintenance and safe fleet operation.",
		solutions: [
			solution("Real-Time Vehicle Tracking", "Review vehicle locations, journeys, and stops to support visibility and coordination across utility service operations.", GpsSignal01Icon),
			solution("Driver Safety Monitoring", "Review speeding, harsh braking, and rapid acceleration. Alerts and safety reports can support driver feedback across your utility fleet.", CarSignalIcon),
			solution("Trip Preparation & Journey Review", "Use completed journeys as a reference when preparing upcoming trips to service sites.", Route03Icon),
			solution("Fleet Maintenance", "Keep track of fleet maintenance and service records to support the vehicles your crews depend on.", Wrench01Icon),
			solution("Incident Records", "Review journey and driving event information to support incident documentation and operational follow-up.", FileChartColumnIcon),
			solution("Off-Hours Alerts & Usage Reports", "Review vehicle activity outside normal operating hours and use configurable alerts to help investigate unexpected use.", Alert02Icon),
			solution("Geofencing & Restricted Zone Alerts", "Create geofences around service sites or sensitive areas and receive alerts when vehicles enter or leave those locations.", MapsLocation01Icon),
			solution("Odometer & Mileage Records", "Keep odometer and journey records to support business mileage and tax recordkeeping for your utility fleet.", FileChartColumnIcon),
			section179Solution,
			solution("Comprehensive Performance Reports", "Review driving behaviour, journeys, idling, and off-hours activity to inform fleet management decisions.", ChartAnalysisIcon),
		],
		faqs: [
			faq("How does telematics benefit utility fleet operations?", "Vehicle locations, journey history, and driving behaviour provide more visibility into field operations. Utility teams can use this information to coordinate resources and review fleet activity."),
			faq("Can telematics monitor vehicle activity during off-hours?", "Review vehicle activity and configure alerts for unexpected use outside normal operating hours. This information helps your team investigate how vehicles are being used."),
			faq("How does telematics improve driver safety in utility fleets?", "Driving events such as speeding, harsh braking, and rapid acceleration help managers identify patterns. Alerts and reports can support driver feedback and training."),
			faq("How can journey history help utility service teams?", "Review completed journeys and stops to understand travel to service sites. Those journeys can serve as a reference when preparing upcoming trips."),
			faq("How does telematics help with vehicle maintenance in utility fleets?", "Keep track of fleet maintenance and use vehicle activity records to support service planning for your utility vehicles."),
			faq("Can telematics support fleet efficiency goals?", "Review idling and vehicle use to identify unnecessary activity and opportunities for operational improvement."),
			faq("How can geofencing enhance visibility for utility fleets?", "Create boundaries around job sites and sensitive areas. Alerts when vehicles enter or leave those zones help teams review location activity."),
		],
	}),
	"passenger-transit": sector({
		label: "Passenger Transit",
		fleet: "passenger transit fleet",
		description: "Support reliable transit operations with vehicle locations, journey history, driver safety, maintenance, and fleet usage reports.",
		solutions: [
			solution("Real-Time Vehicle Tracking", "Review transit vehicle locations and movement to support visibility across your service operation.", GpsSignal01Icon),
			solution("Passenger Safety Monitoring", "Review driver behaviours such as speeding, harsh braking, and rapid acceleration. Use alerts and reports to support safer transit driving practices.", CarSignalIcon),
			solution("Trip Preparation & Journey Review", "Use completed journeys as a reference for upcoming trips and review the routes vehicles have taken.", Route03Icon),
			solution("Stop & Journey History", "Review recorded stops and journey history to understand activity around transit stations and service locations.", Route03Icon),
			solution("Fleet Maintenance", "Keep track of vehicle maintenance and service records to support day-to-day transit operations.", Wrench01Icon),
			solution("Geofencing for Restricted Zones", "Create geofences around depots, transit stations, and restricted areas. Receive alerts when vehicles enter or leave designated zones.", MapsLocation01Icon),
			solution("Fleet Utilisation Insights", "Review vehicle usage and journey activity to inform resource allocation across your transit fleet.", ChartAnalysisIcon),
			solution("Odometer & Mileage Records", "Keep mileage and journey records to support vehicle-use reviews and fleet recordkeeping.", FileChartColumnIcon),
			solution("Performance & Efficiency Reports", "Review journeys, idling, and driver behaviour through reports that support operational decisions and driver feedback.", FileChartColumnIcon),
		],
		faqs: [
			faq("How does telematics improve safety in passenger transit?", "Review speeding, harsh braking, and rapid acceleration through driving event records and alerts. Transit operators can use this information to support driver feedback and safer driving practices."),
			faq("Can telematics provide real-time tracking for transit vehicles?", "Authorised teams can review reported vehicle locations and movement to understand fleet activity across transit operations."),
			faq("How can journey history help transit operations?", "Review routes taken and stops recorded on previous journeys. These records help teams understand service activity and prepare for upcoming trips."),
			faq("How does telematics help with vehicle maintenance in transit fleets?", "Keep track of vehicle maintenance and service records so your team can plan maintenance across the transit fleet."),
			faq("What is geofencing, and how is it useful for passenger transit fleets?", "Create virtual boundaries around transit stations, depots, or restricted zones. Entry and exit alerts help your team review vehicle movements around those locations."),
			faq("What reports are available for transit operations?", "Review vehicle journeys, mileage, idling, and driver behaviour. Redtail can confirm the reports available for your deployment and the operating questions they can help answer."),
		],
	}),
	"transportation-and-logistics": sector({
		label: "Transportation & Logistics",
		fleet: "logistics fleet",
		description: "Bring vehicle location, driver behaviour, delivery journeys, and maintenance records into clearer view across transport operations.",
		solutions: [
			solution("Driver Behaviour Monitoring", "Review speeding, harsh braking, and rapid acceleration. Use alerts and reports to support driver feedback across the logistics fleet.", CarSignalIcon),
			solution("Real-Time Vehicle Tracking", "Review vehicle locations, journeys, and stops to support visibility across transport and delivery operations.", GpsSignal01Icon),
			solution("Fleet Maintenance", "Keep track of vehicle maintenance and service records to support the vehicles used for transport and delivery.", Wrench01Icon),
			solution("Geofencing Alerts", "Create geofences around warehouses, delivery hubs, and restricted zones. Receive alerts when vehicles enter or leave those locations.", MapsLocation01Icon),
			solution("Operational Insights", "Review journey activity, idling, and vehicle use to identify patterns and opportunities for operating improvements.", ChartAnalysisIcon),
			solution("Fleet Coordination", "Give authorised fleet teams access to vehicle locations and journey records through web and mobile tools, whether at a desk or in the field.", GpsSignal01Icon),
			solution("Safety & Fleet Activity Reports", "Use driving behaviour and vehicle activity reports to support driver feedback and internal operational reviews.", FileChartColumnIcon),
			solution("Odometer & Mileage Records", "Keep odometer and journey records to support business mileage and tax recordkeeping for your transport fleet.", FileChartColumnIcon),
			section179Solution,
			solution("Trip Preparation & Journey Review", "Use completed journeys as a reference when preparing upcoming transport and delivery trips.", Route03Icon),
		],
		faqs: [
			faq("How does telematics improve delivery visibility in logistics?", "Vehicle tracking, journey history, and driving behaviour provide context for delivery operations. Teams can review fleet movement and completed journeys to inform day-to-day decisions."),
			faq("Can telematics help monitor driver behaviour?", "Review driving events such as speeding, harsh braking, and rapid acceleration. Alerts and reports help managers identify patterns and support driver feedback."),
			faq("How can journey records help with trip preparation?", "Review previous journeys, including routes taken and stops made. Teams can use those journeys as a reference when preparing upcoming trips."),
			faq("What is the benefit of real-time vehicle tracking in logistics?", "Reported locations and movement give fleet teams more visibility into where vehicles are, helping them investigate changes and coordinate operational follow-up."),
			faq("Can telematics help manage vehicle maintenance?", "Keep fleet maintenance and service records together with vehicle usage information to support maintenance planning."),
			faq("How does geofencing help logistics teams?", "Create boundaries around warehouses, delivery hubs, or restricted locations. Entry and exit alerts help your team review vehicle activity at those sites."),
			faq("What information can support fleet efficiency reviews?", "Review idling, mileage, journeys, and driving behaviour to identify unnecessary activity and compare the effects of operating changes."),
		],
	}),
	"emergency-vehicles": sector({
		label: "Emergency Vehicles",
		fleet: "emergency fleet",
		description: "Connect emergency vehicle locations, driving events, journey history, and incident records with the needs of fleet and response teams.",
		solutions: [
			solution("Real-Time Location Tracking", "Review emergency vehicle locations and movement to support situational awareness and coordination across your fleet.", GpsSignal01Icon),
			solution("Driver Behaviour Monitoring", "Review speeding, harsh braking, and rapid acceleration. Use alerts and reports to support driving reviews and training.", CarSignalIcon),
			solution("Crash & Incident Records", "Use available crash and journey data to support incident documentation and investigation after an event.", Alert02Icon),
			solution("Journey History & Route Review", "Review routes taken, recorded stops, and incident locations to support investigations and fleet performance reviews.", Route03Icon),
			solution("Geofencing for Restricted Zones", "Create geofences around sensitive or restricted areas and receive alerts when vehicles enter or leave those zones.", MapsLocation01Icon),
			solution("Performance & Incident Reports", "Bring journey, driving behaviour, and incident records together to support operational reviews and informed fleet decisions.", FileChartColumnIcon),
			solution("Odometer & Mileage Records", "Keep mileage and journey records to support fleet usage reviews and accountable recordkeeping.", FileChartColumnIcon),
			solution("Fleet Maintenance", "Keep track of vehicle maintenance and service records to support the vehicles used in your emergency operations.", Wrench01Icon),
			solution("Fleet Coordination Support", "Give authorised fleet teams location and journey context through web and mobile tools to support day-to-day coordination.", ChartAnalysisIcon),
		],
		faqs: [
			faq("How does telematics support emergency personnel safety?", "Review driver behaviours such as speeding, harsh braking, and rapid acceleration. Driving event records and alerts provide context for feedback, training, and operational reviews."),
			faq("Can telematics help with incident management and crash investigations?", "Available speed, braking, impact, and journey records can support incident documentation and investigation. Recorded data complements the wider evidence gathered after an event."),
			faq("Can telematics track emergency vehicle locations?", "Authorised teams can review reported vehicle locations and movement to support fleet visibility and coordination."),
			faq("What is journey history, and how does it assist in investigations?", "Journey history records routes taken, stops made, and associated events. This context helps your team review activity around an incident and understand fleet movements."),
			faq("How does geofencing support emergency operations?", "Create virtual boundaries around sensitive or restricted areas. Entry and exit alerts help teams review vehicle movements around those locations."),
			faq("Can telematics assist with maintenance for emergency fleets?", "Keep track of fleet maintenance and service records so your team can plan maintenance for emergency vehicles."),
			faq("What reports are available for emergency fleets?", "Review journeys, vehicle usage, driving behaviour, and available incident data. Confirm the reporting scope with Redtail for your proposed deployment."),
		],
	}),
};

export function getIndustrySectorCopy(slug: string) {
	return sectorCopy[slug];
}
