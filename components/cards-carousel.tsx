"use client";

import { Card, Carousel } from "@/components/ui/apple-cards-carousel";

export function CardsCarousel() {
	const cards = data.map((card, index) => (
		<Card card={card} index={index} key={card.src} layout />
	));

	return (
		<section className="relative overflow-hidden border-b border-black/10 bg-white py-14 sm:py-20 lg:py-24">
			<div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-white via-rb-light-blue/8 to-white" />
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
				<header className="mx-auto max-w-3xl text-center">
					<h2 className="text-3xl font-semibold tracking-tight text-balance text-rb-black sm:text-4xl lg:text-5xl">
						Why teams choose Redtail Telematics
					</h2>
					<p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
						Explore the solutions powering fleets, insurers, OEMs, and partners
						worldwide, built for real-time insight, operational clarity, and
						measurable ROI.
					</p>
				</header>
			</div>

			<div className="mt-6 sm:mt-8">
				<Carousel items={cards} />
			</div>
		</section>
	);
}

function FleetContent() {
	return (
		<div className="p-5 text-rb-black/72 sm:p-8 md:p-10">
			<h2 className="mb-4 text-2xl font-bold text-rb-black md:text-4xl">
				Fleet Management
			</h2>
			<p className="font-sans text-base leading-7 md:text-xl md:leading-8">
				Redtail Telematics Vehicle Asset Management (VAM) products provide
				certainty that vehicles are being driven well, running efficiently, and
				are where they are supposed to be. It gives fleet managers greater
				visibility and information to extract further performance from their
				fleet, which in turn reduces costs.
			</p>

			<h3 className="mt-8 border-t border-black/10 pt-6 text-xl font-semibold text-rb-red md:text-2xl">
				Features
			</h3>
			<ul className="mt-2 list-disc pl-5 text-base leading-7 md:text-lg">
				<li>
					<strong>Multi-use:</strong> Whether industrial, emergency, or
					distribution, we have the device and flexibility of platform to manage
					performance of assets and people.
				</li>
				<li>
					<strong>Data Capture:</strong> Driver behaviors, vehicle tracking,
					engine status, battery health - valuable data informing your fleet
					management decisions.
				</li>
				<li>
					<strong>Crash Portal:</strong> Easy-to-use portals including
					high-impact events in near real-time on laptop, tablet, or mobile.
				</li>
				<li>
					<strong>Save Money:</strong> Efficiencies in driver and vehicle
					performance will deliver savings inside three months.
				</li>
			</ul>

			<h3 className="mt-8 border-t border-black/10 pt-6 text-xl font-semibold text-rb-red md:text-2xl">
				Redtail&apos;s Fleet Management System (FMS)
			</h3>
			<p className="mt-2 text-base leading-7 md:text-lg">
				Redtail&apos;s FMS provides the precise location of a vehicle by
				tracking and locating vehicles in real-time. Notifications with detailed
				locations can arrive via email, viewed online, or on Android and iOS
				devices.
			</p>
			<p className="mt-2 text-base leading-7 md:text-lg">
				Identifying a vehicle&apos;s exact location helps fleet managers:
			</p>
			<ul className="mt-2 list-disc pl-5 text-base leading-7 md:text-lg">
				<li>Provide real-time traffic support.</li>
				<li>
					Improve customer service by sending the nearest vehicle to fulfill an
					assigned task.
				</li>
				<li>
					Get organized by customizing maps with points of interest, customer
					addresses, and frequently visited locations.
				</li>
			</ul>
			<p className="mt-2 text-base leading-7 md:text-lg">
				Recording routine maintenance and monitoring battery voltage protects
				against unnecessary maintenance and repair costs by:
			</p>
			<ul className="mt-2 list-disc pl-5 text-base leading-7 md:text-lg">
				<li>
					Knowing each time a vehicle&apos;s ignition is on or off to determine
					mileage, after-hour usage, idling, and more.
				</li>
				<li>
					Ensuring proper vehicle battery health and sending alerts if voltage
					drops too low.
				</li>
				<li>
					Assessing driver behavior: heavy braking, acceleration, incident
					notification, and crash assessment.
				</li>
			</ul>
		</div>
	);
}

function ResellersContent() {
	return (
		<div className="p-5 text-rb-black/72 sm:p-8 md:p-10">
			<h2 className="mb-4 text-2xl font-bold text-rb-black md:text-4xl">
				Resellers
			</h2>
			<p className="font-sans text-base leading-7 md:text-xl md:leading-8">
				Telematics resellers are a major part of our distribution strategy,
				providing revenue and profit opportunities with proven fleet management
				solutions.
			</p>
			<p className="mt-2 text-base leading-7 md:text-lg">
				For your fleets and their managers, we offer a range of both
				professional and self-fit devices. These quality devices provide
				valuable data to our fleet management portals, enabling asset
				management, reporting, and crash reconstruction. In addition, we have
				app-based tools for device installation and fleet management.
			</p>

			<h3 className="mt-8 border-t border-black/10 pt-6 text-xl font-semibold text-rb-red md:text-2xl">
				Benefits
			</h3>
			<ul className="mt-2 list-disc pl-5 text-base leading-7 md:text-lg">
				<li>
					<strong>Simple to Use:</strong> World-class devices, adaptable
					portals, and intuitive apps.
				</li>
				<li>
					<strong>GPS Technology:</strong> Track and manage your valued assets
					and people.
				</li>
				<li>
					<strong>App to Track:</strong> The mobile workforce has access to all
					necessary data wherever they are.
				</li>
				<li>
					<strong>Save Money:</strong> Efficiencies in driver and vehicle
					performance will deliver savings inside three months.
				</li>
			</ul>

			<h3 className="mt-8 border-t border-black/10 pt-6 text-xl font-semibold text-rb-red md:text-2xl">
				Redtail Telematics - A Perfect Partner
			</h3>
			<p className="mt-2 text-base leading-7 md:text-lg">
				Redtail Telematics offers extensive experience in automotive electronics.
				For aftermarket telematics resellers, here are just some of the benefits
				of working with Redtail:
			</p>
			<ul className="mt-2 list-disc pl-5 text-base leading-7 md:text-lg">
				<li>
					<strong>World-Class Brands:</strong> Enhance your product portfolio.
				</li>
				<li>
					<strong>Volume Pricing:</strong> Offers great volume discount deals.
				</li>
				<li>
					<strong>Access to Leads:</strong> Territory leads provided to help
					partners grow.
				</li>
				<li>
					<strong>Marketing Support:</strong> Presentations, brochures, POP
					displays, training, and rebranding.
				</li>
			</ul>
			<p className="mt-2 text-base leading-7 md:text-lg">
				Email{" "}
				<a className="text-rb-red" href="mailto:sales@redtailtelematics.com">
					sales@redtailtelematics.com
				</a>{" "}
				if you&apos;re interested in joining Redtail&apos;s telematics resellers
				program.
			</p>
		</div>
	);
}

function IoTContent() {
	return (
		<div className="p-5 text-rb-black/72 sm:p-8 md:p-10">
			<h2 className="mb-4 text-2xl font-bold text-rb-black md:text-4xl">
				Internet of Things (IoT)
			</h2>
			<p className="font-sans text-base leading-7 md:text-xl md:leading-8">
				Redtail Telematics IoT platform is the backbone of the Redtail System.
				Imaginative use of quality sensors and signals, arranged and connected
				to deliver valuable data about assets (things, people) to owners and
				managers, is in our DNA.
			</p>
			<p className="mt-2 text-base leading-7 md:text-lg">
				Our applications are industrial, making us an active IoT exemplar,
				functioning at scale with very high reliability. We are capturing,
				recording, analyzing, learning, displaying, creating reports, and
				alerting on the assets we monitor.
			</p>

			<h3 className="mt-8 border-t border-black/10 pt-6 text-xl font-semibold text-rb-red md:text-2xl">
				Applications
			</h3>
			<ul className="mt-2 list-disc pl-5 text-base leading-7 md:text-lg">
				<li>
					<strong>Container Tracking:</strong> Retain secure sight of the
					location and status of valued cargo.
				</li>
				<li>
					<strong>Equipment Status Evaluation:</strong> Track readiness for
					usage.
				</li>
				<li>
					<strong>Industrial Equipment Management:</strong> Monitor health,
					usage, and remote activation.
				</li>
				<li>
					<strong>Plant Usage Monitoring:</strong> Manage rental periods and
					life cycles.
				</li>
				<li>
					<strong>Battery Health Monitoring:</strong> Monitor batteries and
					alert owners before it&apos;s too late.
				</li>
				<li>
					<strong>Railway Maintenance Management:</strong> Measure stress to
					sustain service.
				</li>
			</ul>

			<h3 className="mt-8 border-t border-black/10 pt-6 text-xl font-semibold text-rb-red md:text-2xl">
				Redtail IoT Solution
			</h3>
			<p className="mt-2 text-base leading-7 md:text-lg">
				The Redtail IoT Solution offers complete SaaS capability, adding
				connectivity to your enterprise systems:
			</p>
			<ul className="mt-2 list-disc pl-5 text-base leading-7 md:text-lg">
				<li>Third-party sensors integration</li>
				<li>Own data collectors and sensors</li>
				<li>Complex data analytics</li>
				<li>Real-time status monitoring and metering</li>
				<li>Email and SMS alerts</li>
				<li>Device management</li>
				<li>Custom apps</li>
				<li>High-reliability system with over 100,000 devices</li>
				<li>Global airtime management</li>
				<li>Billing</li>
			</ul>
		</div>
	);
}

function OEMContent() {
	return (
		<div className="p-5 text-rb-black/72 sm:p-8 md:p-10">
			<h2 className="mb-4 text-2xl font-bold text-rb-black md:text-4xl">
				Original Equipment Manufacturers (OEMs)
			</h2>
			<p className="font-sans text-base leading-7 md:text-xl md:leading-8">
				Redtail&apos;s expertise in working collaboratively to answer
				challenging questions directs our efforts in working with OEMs to
				fulfill the potential of the connected vehicle.
			</p>
			<p className="mt-2 text-base leading-7 md:text-lg">
				From line-fit vehicle tracking with Mercedes-Benz through golf-cart
				battery health with Columbia Vehicle to pothole detection with Jaguar
				Land Rover and Synaptiv, we have disrupted and enabled for thirty years.
			</p>
			<p className="mt-2 text-base leading-7 md:text-lg">
				Redtail is working with OEMs of all sizes from small and medium
				enterprises to Tier-1s and have both standard and custom solutions for
				on-line and aftermarket fits. From project definition through
				feasibility, prototyping, and field testing through to pilot deployment
				and full commercial roll-out, we use all our know-how to deliver the best
				results.
			</p>
			<p className="mt-2 text-base leading-7 md:text-lg">
				Our solutions can be accessed via APIs, desktop UIs, or apps. Data can
				be raw or analyzed, and trial programs can be highly customized.
			</p>
		</div>
	);
}

function InsuranceContent() {
	return (
		<div className="p-5 text-rb-black/72 sm:p-8 md:p-10">
			<h2 className="mb-4 text-2xl font-bold text-rb-black md:text-4xl">
				Insurance Telematics
			</h2>
			<p className="font-sans text-base leading-7 md:text-xl md:leading-8">
				Redtail has been providing custom telematics solutions to insurers of
				all sizes for a decade, and the technology for Stolen Vehicle Tracking
				for two decades more.
			</p>

			<h3 className="mt-8 border-t border-black/10 pt-6 text-xl font-semibold text-rb-red md:text-2xl">
				Benefits
			</h3>
			<ul className="mt-2 list-disc pl-5 text-base leading-7 md:text-lg">
				<li>
					<strong>Tailored Solutions:</strong> Each motor insurer is different,
					and we work with you to create relevant solutions to your business
					needs.
				</li>
				<li>
					<strong>Better Data:</strong> Through APIs, we provide more immediate
					and accurate driver scoring and incident data, enabling policyholder
					engagement, management, and retention.
				</li>
				<li>
					<strong>Crash Data:</strong> Our crash portal digitally recreates
					incidents in detail, providing evidence such as speed of impact or
					acceleration, making processing of claims easier and reducing fraud.
				</li>
				<li>
					<strong>Valuable Data:</strong> Our driver feedback informs risk and
					premium; our crash portal informs claims efficiency and veracity; our
					telematics deliver ROI to your business.
				</li>
			</ul>

			<h3 className="mt-8 border-t border-black/10 pt-6 text-xl font-semibold text-rb-red md:text-2xl">
				Comprehensive Solutions
			</h3>
			<p className="mt-2 text-base leading-7 md:text-lg">
				We are unique among providers in the breadth and depth of our solution,
				and in controlling the quality deliverables of every element in the value
				chain:
			</p>
			<ul className="mt-2 list-disc pl-5 text-base leading-7 md:text-lg">
				<li>We specify and manufacture the device and create its firmware.</li>
				<li>
					We source SIM/airtime and aggregate charging across the entire fleet
					to give you the best price per MB.
				</li>
				<li>
					Our Data Warehouse organizes verified journey and event data for each
					device.
				</li>
				<li>Data is available to you by API in raw or managed form.</li>
				<li>
					Our data scientists provide insight into driver behaviors and scoring
					from billions of miles of analysis.
				</li>
				<li>Data can also be accessed through our customer portals.</li>
				<li>
					Our white-label B2B and B2C apps enable communication with ops managers
					and consumers in smart and relevant ways.
				</li>
				<li>We work with your IT to ensure the smoothest possible integration.</li>
				<li>
					Our support starts at the UBI product design phase and continues
					seamlessly through to helping with claims.
				</li>
			</ul>
		</div>
	);
}

function SVRContent() {
	return (
		<div className="p-5 text-rb-black/72 sm:p-8 md:p-10">
			<h2 className="mb-4 text-2xl font-bold text-rb-black md:text-4xl">
				Stolen Vehicle Tracking
			</h2>
			<p className="font-sans text-base leading-7 md:text-xl md:leading-8">
				Since 1993, we have shipped more than 6 million tracking devices into
				line-fit and aftermarket vehicles for stolen vehicle tracking.
			</p>
			<p className="mt-2 text-base leading-7 md:text-lg">
				In 1993, Tracker Network and their then-parent LoJack prompted our expert
				response to the need to monitor and locate vehicles to assist with stolen
				vehicle tracking. This world-class VHF technology (device, firmware, and
				GPS chip) continues to evolve, enabling unparalleled success in stolen
				vehicle tracking.
			</p>

			<h3 className="mt-8 border-t border-black/10 pt-6 text-xl font-semibold text-rb-red md:text-2xl">
				Our Expertise
			</h3>
			<ul className="mt-2 list-disc pl-5 text-base leading-7 md:text-lg">
				<li>
					<strong>Design:</strong> Partnering with the customer to bring ideas to
					reality.
				</li>
				<li>
					<strong>Development:</strong> Use multi-disciplined expertise across
					firmware, hardware, and testing from concept to full type approval.
				</li>
				<li>
					<strong>Manufacture:</strong> Long-term partnership with a Contract
					Electronics Manufacturer (CEM) to deliver cost-effective and timely
					finished products.
				</li>
				<li>
					<strong>Supply Chain:</strong> Managing procurement and distribution
					for worldwide fulfillment.
				</li>
			</ul>
		</div>
	);
}

function WhiteLabelContent() {
	return (
		<div className="p-5 text-rb-black/72 sm:p-8 md:p-10">
			<h2 className="mb-4 text-2xl font-bold text-rb-black md:text-4xl">
				White Label Solutions
			</h2>
			<p className="font-sans text-base leading-7 md:text-xl md:leading-8">
				For more than a decade, Redtail Telematics has been delivering robust
				telematics offerings that can be fully rebranded to meet your company
				identity and market needs.
			</p>
			<p className="mt-2 text-base leading-7 md:text-lg">
				Whether you serve insurers, fleet operators, or automotive OEMs, our
				flexible platform is designed to seamlessly integrate with your brand.
				From device design and firmware development to supply chain management,
				we ensure that you can launch a comprehensive telematics solution under
				your own label, backed by our proven technology and expertise.
			</p>

			<h3 className="mt-8 border-t border-black/10 pt-6 text-xl font-semibold text-rb-red md:text-2xl">
				Our Expertise
			</h3>
			<ul className="mt-2 list-disc pl-5 text-base leading-7 md:text-lg">
				<li>
					<strong>Design:</strong> We collaborate with you to create hardware,
					firmware, and user experiences that reflect your brand identity.
				</li>
				<li>
					<strong>Development:</strong> Our multidisciplinary teams handle
					everything from concept to rigorous testing, ensuring seamless
					integration and performance that meets your quality standards.
				</li>
				<li>
					<strong>Manufacture:</strong> Long-standing partnerships with trusted
					Contract Electronics Manufacturers allow us to provide cost-effective,
					high-quality devices tailored to your brand specifications.
				</li>
				<li>
					<strong>Supply Chain:</strong> We manage global procurement,
					distribution, and fulfillment, so you can focus on building your
					business while we handle logistics.
				</li>
			</ul>
		</div>
	);
}

const data = [
	{
		category: "Fleet Management",
		content: <FleetContent />,
		src: "/carousel/fleet-web.jpg",
		summary:
			"Real-time visibility and driver insights that keep fleets efficient, safe, and accountable.",
		title: "Providing Flexible Solutions for Fleet Managers",
	},
	{
		category: "Insurance Telematics",
		content: <InsuranceContent />,
		src: "/carousel/insurance-web.jpg",
		summary:
			"Usage-based insurance data, crash insights, and APIs that improve pricing and claims efficiency.",
		title: "Custom Telematics Solutions for Insurers",
	},
	{
		category: "Internet of Things (IoT)",
		content: <IoTContent />,
		src: "/carousel/iot-web.jpg",
		summary:
			"Industrial IoT telemetry that connects sensors, assets, and analytics at scale.",
		title: "Redtail's IoT Platform",
	},
	{
		category: "Original Equipment Manufacturers (OEMs)",
		content: <OEMContent />,
		src: "/carousel/oem-web.jpg",
		summary:
			"Custom telematics for OEMs from concept through pilot and commercial rollout.",
		title: "Collaborative Expertise for OEMs",
	},
	{
		category: "Resellers",
		content: <ResellersContent />,
		src: "/carousel/resellers-web.jpg",
		summary:
			"Partner-ready hardware, portals, and apps to grow reseller revenue and retention.",
		title: "Partner with Redtail Telematics",
	},
	{
		category: "Stolen Vehicle Tracking",
		content: <SVRContent />,
		src: "/carousel/svr-web.jpg",
		summary:
			"Proven tracking technology with decades of recovery expertise and reliable deployments.",
		title: "Unparalleled Success in Vehicle Tracking",
	},
	{
		category: "White Labeling Solutions",
		content: <WhiteLabelContent />,
		src: "/carousel/white-label-web.jpg",
		summary:
			"Launch a branded telematics offering backed by Redtail platform, devices, and support.",
		title: "Unmatched Growth with Rebranded Telematics",
	},
];
