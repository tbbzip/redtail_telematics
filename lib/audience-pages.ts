export type AudiencePageContent = {
	path: string;
	metadata: { title: string; description: string };
	hero: {
		eyebrow: string;
		title: string;
		subhead: string;
		description: string;
		imageSrc: string;
		imageAlt: string;
		imagePosition?: string;
		proof: { label: string; detail: string }[];
	};
	overview: {
		title: string;
		description: string;
		imageSrc: string;
		imageAlt: string;
		imageCaption: string;
		productScreenshot?: boolean;
		capabilities: { title: string; description: string }[];
	};
	process: {
		title: string;
		description: string;
		steps: { title: string; description: string }[];
	};
	faqs: { question: string; answer: string }[];
	relatedLinks: { title: string; description: string; href: string }[];
	cta: { title: string; description: string };
};

// Source: tbbzip/redtail_web at 47acfca3438a5e67a7a07e43c5ed7d21c8e0b58d.
// OEM: app/industries/auto-oem/page.tsx, components/solutions/OEMSolutions.tsx,
// data/faqs.ts (telematicsProductionFaqs).
// SVT: components/solutions/SVRHero.tsx, components/solutions/ProcessSection.tsx,
// data/faqs.ts (stolenVehicleRecoveryFaqs).
// Copy is curated against the October 2026 team review: no generic diagnostics,
// unverified shipment counts, recovery guarantees, or exact support commitments.
export const autoOemPage: AudiencePageContent = {
	path: "/industries/auto-oem",
	metadata: {
		title: "Connected Vehicle OEM Telematics | Redtail Telematics",
		description:
			"OEM telematics from project definition to commercial rollout. Explore standard and custom devices, line fit and aftermarket programs, APIs, portals and mobile apps.",
	},
	hero: {
		eyebrow: "Auto OEM",
		title: "Connected Vehicle - OEM Telematics Solutions",
		subhead: "Next-generation connected vehicle intelligence.",
		description:
			"With over three decades of industry expertise, Redtail partners with OEMs to deliver cutting-edge telematics solutions designed for the connected vehicle era.",
		imageSrc: "/audiences/oem-engineering.jpg",
		imageAlt: "Redtail engineers reviewing a device design and the telematics portal",
		imagePosition: "62% center",
		proof: [
			{ label: "Standard & custom", detail: "Devices shaped around the program" },
			{ label: "Line fit & aftermarket", detail: "Deployment options for OEMs" },
			{ label: "APIs, portals & apps", detail: "Access to raw and analyzed data" },
		],
	},
	overview: {
		title: "Solutions for OEMs",
		description:
			"Redtail’s experience collaborating with OEMs supports connected vehicle programs from the first definition to full commercial rollout. We have worked with manufacturers including Mercedes-Benz and Jaguar Land Rover to put telematics data to work.",
		imageSrc: "/platform-screenshots/current/fleet-map.jpg",
		imageAlt: "Current Redtail fleet map with status filters, vehicle visibility and replay controls",
		imageCaption:
			"Current Redtail web portal. OEM interfaces and data access are tailored to the agreed integration.",
		productScreenshot: true,
		capabilities: [
			{
				title: "Our expertise",
				description:
					"Work with Redtail from project definition through rollout. Standard and custom offerings support the devices, data collection and deployment model your program needs.",
			},
			{
				title: "Accessible solutions",
				description:
					"Access raw and analyzed data through APIs, desktop interfaces or mobile apps. Shape the reporting and integration around your existing systems.",
			},
			{
				title: "Trial programs",
				description:
					"Define a trial around your requirements, then use prototypes, field testing and a pilot to assess the solution before commercial rollout.",
			},
		],
	},
	process: {
		title: "From definition to deployment",
		description:
			"A connected vehicle program brings hardware, data and integration together. Redtail works with your team through the stages needed for your deployment.",
		steps: [
			{ title: "Project definition", description: "Agree the operating needs, data requirements and integration scope." },
			{ title: "Feasibility", description: "Assess the proposed technology and deployment approach." },
			{ title: "Prototyping", description: "Develop and evaluate a solution against the agreed requirements." },
			{ title: "Field testing", description: "Review device and data performance in the intended vehicle environment." },
			{ title: "Pilot deployment", description: "Test the complete program with a defined group of vehicles." },
			{ title: "Commercial rollout", description: "Move from the pilot to the agreed production and deployment scope." },
		],
	},
	faqs: [
		{
			question: "What types of telematics solutions does Redtail offer for OEMs?",
			answer: "Redtail offers standard and custom telematics solutions for OEM programs, with line fit and aftermarket deployment options for vehicles and equipment. The device and installation approach are selected around the program’s requirements.",
		},
		{
			question: "How can I access data from Redtail’s telematics solutions?",
			answer: "Data can be accessed through APIs, desktop interfaces and mobile apps. Redtail works with your team to define the raw and analyzed data needed for your existing systems and customer experience.",
		},
		{
			question: "What are the key benefits of telematics for an OEM program?",
			answer: "Location, vehicle use, journey history and driving behavior can give an OEM useful context about how connected vehicles are operated. The available data and reporting are defined around the devices, vehicles and scope of the program.",
		},
		{
			question: "Can Redtail’s solutions be customized to meet specific OEM needs?",
			answer: "Yes. Redtail works with OEMs from project definition through deployment to tailor data collection, reporting and integration. Standard and custom device options can be considered as part of that work.",
		},
		{
			question: "What types of data can I expect to receive?",
			answer: "Location, usage patterns, journeys and driving behavior are examples of telematics data that can be included. Available fields depend on the selected device, vehicle compatibility and agreed integration. Redtail will confirm the data set for your program.",
		},
		{
			question: "What is the process for deploying telematics in OEM vehicles?",
			answer: "The process can include project definition, feasibility analysis, prototyping, field testing, a pilot deployment and commercial rollout. Redtail works with your team to set the stages and acceptance requirements for the program.",
		},
		{
			question: "How does Redtail support the maintenance and updates of telematics systems?",
			answer: "Redtail supports OEM programs with system maintenance, updates and troubleshooting through the product lifecycle. The responsibilities and support arrangements are agreed as part of the program.",
		},
		{
			question: "Can telematics help with vehicle security?",
			answer: "Tracking, unexpected movement alerts and geofencing can support a vehicle security workflow. Redtail will confirm which capabilities and alert arrangements fit the proposed devices and program.",
		},
		{
			question: "What customer support is available for an OEM program?",
			answer: "Redtail can assist with setup, maintenance and troubleshooting. Discuss your rollout, operating regions and support needs with the team so the scope and contact arrangements can be agreed.",
		},
	],
	relatedLinks: [
		{ title: "Our technology", description: "Explore the engineering, connectivity and data behind Redtail solutions.", href: "/our-technology" },
		{ title: "Platform & apps", description: "See how portals and mobile apps turn device data into usable views.", href: "/platform-and-apps" },
		{ title: "Devices", description: "Compare hardware and installation options for connected vehicles.", href: "/solutions/devices" },
	],
	cta: {
		title: "Define your connected vehicle program",
		description: "Share your vehicles, data requirements and integration goals with Redtail to discuss a suitable trial and deployment approach.",
	},
};

export const stolenVehicleTrackingPage: AudiencePageContent = {
	path: "/solutions/stolen-vehicle-tracking",
	metadata: {
		title: "Stolen Vehicle Tracking | Redtail Telematics",
		description:
			"Stolen vehicle tracking technology from Redtail. Explore VHF expertise, custom device engineering, manufacture and supply for line fit and aftermarket tracking programs.",
	},
	hero: {
		eyebrow: "Stolen vehicle tracking",
		title: "Stolen Vehicle Tracking",
		subhead: "Leveraging decades of experience and advanced VHF technology for effective stolen vehicle tracking.",
		description:
			"Since 1993, Redtail has developed stolen vehicle tracking technology for line fit and aftermarket programs. We work with customers to shape devices, data and support around their tracking requirements.",
		imageSrc: "/audiences/stolen-vehicle-tracking.jpg",
		imageAlt: "A vehicle theft scenario photographed for Redtail’s stolen vehicle tracking page",
		imagePosition: "68% center",
		proof: [
			{ label: "VHF expertise", detail: "Technology for specialist tracking programs" },
			{ label: "Customer collaboration", detail: "Requirements through device development" },
			{ label: "Line fit & aftermarket", detail: "Program-specific deployment options" },
		],
	},
	overview: {
		title: "Tracking technology shaped around your program",
		description:
			"Redtail brings experience in stolen vehicle tracking and VHF technology to customer programs. From the first device requirements to manufacture and supply, our engineering team works with you to develop the right approach.",
		imageSrc: "/audiences/oem-engineering.jpg",
		imageAlt: "Redtail engineers examining hardware design alongside the telematics portal",
		imageCaption: "Device design and telematics engineering at Redtail.",
		capabilities: [
			{
				title: "Specialist tracking technology",
				description: "Discuss VHF and GPS requirements as part of the tracking program. Devices, reception arrangements and deployment conditions determine the approach.",
			},
			{
				title: "Custom device development",
				description: "Collaborate on requirements, hardware and firmware, then evaluate prototypes and testing before the device moves into production.",
			},
			{
				title: "Production and supply",
				description: "Bring manufacturing, procurement and distribution into the program plan, with Redtail supporting the path from finished device to deployment.",
			},
		],
	},
	process: {
		title: "Our process",
		description: "A customer-led development process connects tracking requirements with engineering, manufacturing and delivery.",
		steps: [
			{ title: "Design", description: "Work with the customer to define a device that meets the specific requirements of the stolen vehicle tracking program." },
			{ title: "Development", description: "Bring hardware and firmware together through prototyping, testing and the applicable type approval process." },
			{ title: "Manufacture", description: "Work with a Contract Electronics Manufacturer to produce finished devices against the agreed requirements." },
			{ title: "Supply chain", description: "Coordinate procurement, distribution and fulfillment for the program’s deployment regions." },
		],
	},
	faqs: [
		{
			question: "What is Redtail’s experience with stolen vehicle tracking?",
			answer: "Redtail’s stolen vehicle tracking experience dates to 1993 and includes line fit and aftermarket programs. The team brings VHF expertise and device engineering to customer-specific tracking requirements.",
		},
		{
			question: "How does Redtail’s stolen vehicle tracking technology work?",
			answer: "Redtail develops tracking devices and can work with VHF and GPS requirements as part of a specialist program. The technology, receiving arrangements and data integration are selected for the customer’s deployment and response workflow.",
		},
		{
			question: "What is VHF technology, and why is it used for stolen vehicle tracking?",
			answer: "VHF stands for Very High Frequency. It is a radio technology used in specialist vehicle tracking programs. The suitability of VHF depends on the device, reception infrastructure and operating environment; Redtail can discuss these requirements with your team.",
		},
		{
			question: "Can Redtail’s stolen vehicle tracking solutions be customized?",
			answer: "Yes. Redtail collaborates with customers to define requirements, evaluate prototypes and work through testing and applicable type approvals. The solution is shaped around the needs of the tracking program.",
		},
		{
			question: "What is the process of developing a tracking device with Redtail?",
			answer: "Development includes concept and device design, hardware and firmware engineering, prototyping, testing and the required approval work. The stages and acceptance requirements are agreed with the customer before production.",
		},
		{
			question: "How are the tracking devices manufactured?",
			answer: "Redtail works with a Contract Electronics Manufacturer to produce finished devices. Manufacturing requirements, quality checks and production plans are set around the agreed program.",
		},
		{
			question: "What support is available for a stolen vehicle tracking program?",
			answer: "Redtail can support device maintenance, software updates and troubleshooting. Support responsibilities and contact arrangements are agreed for the customer’s program and operating needs.",
		},
		{
			question: "How does Redtail manage supply chain and distribution?",
			answer: "Redtail coordinates procurement, distribution and fulfillment for tracking products. Delivery regions, production volumes and schedules are agreed as part of the program plan.",
		},
	],
	relatedLinks: [
		{ title: "Our technology", description: "Explore Redtail’s engineering and communications expertise.", href: "/our-technology" },
		{ title: "Auto OEM", description: "Review connected vehicle programs for line fit and aftermarket deployments.", href: "/industries/auto-oem" },
		{ title: "Devices", description: "Explore the wider range of Redtail telematics hardware.", href: "/solutions/devices" },
	],
	cta: {
		title: "Discuss your tracking program",
		description: "Tell Redtail about your deployment regions, device requirements and tracking workflow to define the right engineering and support scope.",
	},
};
