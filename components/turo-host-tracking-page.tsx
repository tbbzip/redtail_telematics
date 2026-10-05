import Image from "next/image";
import Link from "next/link";
import {
	ArrowRight01Icon,
	CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

import { FooterDemoForm } from "@/components/footer-demo-form";
import { EditorialHero } from "@/components/editorial-hero";
import { HugeIcon } from "@/components/huge-icon";

const tintProviderUrl =
	"https://support.tint.ai/turo/gps-telematics-options-for-off-trip-insurance-coverage";
const tintTermsUrl =
	"https://support.tint.ai/turo/off-trip-insurance-program-terms-conditions";

const hostTopics = [
	"Vehicle locations and recent journeys",
	"Driving activity, alerts, and geofencing",
	"Device fit, installation, and service options",
];

const connectionSteps = [
	{
		title: "Install and activate the right device",
		text: "Confirm the device and installation method for your vehicle. Professional installation must be arranged independently when required.",
	},
	{
		title: "Complete the provider connection",
		text: "Connect your Redtail device and vehicle details, then check the connection status in your Tint portal.",
	},
	{
		title: "Authorize data sharing with Tint",
		text: "Complete Tint’s required consent and connection steps. A device purchase or an active Redtail account alone does not establish insurance eligibility.",
	},
];

export function TuroHostTrackingPage() {
	return (
		<main className="flex-1 overflow-x-clip bg-background">
			<EditorialHero
				eyebrow="For Turo Host Businesses"
				title="GPS Tracking for Turo Hosts"
				description="See where your vehicles are and review their journeys with Redtail. Talk with our team about tracking for your host business, device compatibility, and connecting Redtail devices to Tint."
				primaryCta={{ href: "#footer-demo-form", label: "Request host guidance" }}
				secondaryCta={{ href: "tel:+18667114880", label: "Call Sales: +1 866 711 4880" }}
				visual={
					<figure className="overflow-hidden rounded-lg border border-white/20 bg-[#e8ebef] shadow-[0_30px_80px_#0004]">
						<div className="relative aspect-[1.25] sm:aspect-[1.4]">
							<Image alt="Rental vehicles parked in a fleet" src="/industries/hero-rental.webp" fill preload className="object-cover" sizes="(min-width: 1024px) 620px, 92vw" />
						</div>
						<figcaption className="flex items-center gap-5 border-t border-black/10 px-5 py-5 text-[#141b24]">
							<div className="relative h-20 w-28 shrink-0"><Image alt="Redtail VAM-HDR GPS tracking device" src="/devices/vam-hdr.png" fill className="object-contain" sizes="112px" /></div>
							<p className="text-sm font-semibold">Redtail VAM-HDR</p>
						</figcaption>
					</figure>
				}
			>
				<p className="mt-7 max-w-xl border-l-2 border-[#f04449] pl-4 text-sm leading-6 text-white/75">
					Tint lists Redtail as an approved GPS provider. {" "}
					<a className="font-semibold text-white underline underline-offset-4" href={tintProviderUrl} rel="noopener noreferrer" target="_blank">View Tint’s provider list</a>
				</p>
			</EditorialHero>

			<section
				aria-labelledby="turo-host-request-heading"
				className="border-b border-black/10 bg-[#f4f3ef] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
			>
				<h2 className="sr-only" id="turo-host-request-heading">Request guidance for your Turo host business</h2>
				<div className="mx-auto grid max-w-7xl grid-cols-1 gap-9 lg:grid-cols-[1fr_28rem] lg:items-start lg:gap-20">
					<div className="min-w-0 lg:col-start-2 lg:row-start-1">
						<FooterDemoForm
							buttonLabel="Request host guidance"
							successMessage="Thanks. Your host guidance request was received and our team will be in touch."
							title="Request host guidance"
						/>
					</div>
					<div className="min-w-0 max-w-2xl lg:col-start-1 lg:row-start-1">
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-rb-red">
							Your Vehicles, Your Setup
						</p>
						<h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-rb-black sm:text-4xl lg:text-5xl" id="turo-host-guidance-heading">
							Find the right tracking setup for your host business.
						</h2>
						<p className="mt-5 max-w-xl text-base leading-7 text-rb-black/65 sm:text-lg sm:leading-8">
							Tell us about the vehicles you manage. We can discuss device
							options, installation, pricing, and the Redtail connection process
							for Tint’s telematics program.
						</p>
						<ul className="mt-7 grid gap-4 text-sm leading-6 text-rb-black/75 sm:text-base">
							{hostTopics.map((topic) => (
								<li className="flex items-start gap-3" key={topic}>
									<HugeIcon className="mt-0.5 size-5 shrink-0 text-rb-red" icon={CheckmarkCircle02Icon} size={20} />
									<span>{topic}</span>
								</li>
							))}
						</ul>
						<p className="mt-7 max-w-xl text-sm leading-6 text-rb-black/60">
							For Company name, enter your business or host name. Choose the
							fleet size that matches the vehicles you manage, including 1–9
							for a smaller host business.
						</p>
						<div className="mt-8 border-t border-black/12 pt-6">
							<p className="text-sm leading-6 text-rb-black/62">
								Ready to choose a device? Review the current product options
								and service terms in Redtail’s store.
							</p>
							<a className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-rb-red underline-offset-4 hover:underline" href="https://secure.redtailtelematics.com/tint-insurance/" rel="noopener noreferrer" target="_blank">
								View Tint / Turo device options
								<HugeIcon icon={ArrowRight01Icon} size={16} />
							</a>
						</div>
					</div>
				</div>
			</section>

			<section aria-labelledby="tint-connection-heading" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
				<div className="mx-auto max-w-7xl">
					<div className="max-w-3xl">
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-rb-red">Using Redtail with Tint</p>
						<h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-rb-black sm:text-4xl" id="tint-connection-heading">
							Tracking and insurance have separate setup requirements.
						</h2>
						<p className="mt-5 text-base leading-7 text-rb-black/65">
							Redtail provides the GPS devices and telematics service. Tint
							administers its off-trip insurance program and determines
							eligibility and coverage under its current terms.
						</p>
					</div>
					<ul className="mt-9 grid gap-7 border-t border-black/12 pt-7 lg:grid-cols-3 lg:gap-10">
						{connectionSteps.map((step) => (
							<li key={step.title}>
								<h3 className="text-xl font-semibold leading-7 text-rb-black">{step.title}</h3>
								<p className="mt-3 text-sm leading-7 text-rb-black/62">{step.text}</p>
							</li>
						))}
					</ul>
					<div className="mt-9 max-w-3xl border-l-2 border-rb-red pl-5">
						<p className="text-sm leading-7 text-rb-black/65">
							Tint’s current program requires at least three active vehicles
							on Turo and excludes vehicles registered or located in New York
							or Kentucky. These are Tint’s insurance conditions; purchasing
							a Redtail device does not guarantee coverage.
						</p>
						<a className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-rb-red underline-offset-4 hover:underline" href={tintTermsUrl} rel="noopener noreferrer" target="_blank">Review Tint’s current program terms</a>
					</div>
					<Link className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-rb-black underline-offset-4 hover:text-rb-red hover:underline" href="/resources/blog/redtail-tint-turo">
						Read about Redtail, Tint, and Turo
						<HugeIcon icon={ArrowRight01Icon} size={16} />
					</Link>
				</div>
			</section>
		</main>
	);
}
