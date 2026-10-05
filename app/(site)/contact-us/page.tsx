import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
	ArrowRight01Icon,
	BookOpenTextIcon,
	Call02Icon,
	ChatUserIcon,
	CustomerSupportIcon,
	Mail01Icon,
	ShieldUserIcon,
} from "@hugeicons/core-free-icons";

import { HugeIcon } from "@/components/huge-icon";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Contact Us | Redtail Telematics",
	description:
		"Contact Redtail Telematics for sales, support, partnerships, technical help, and office locations in the UK and United States.",
	alternates: {
		canonical: "https://www.redtailtelematics.com/contact-us",
	},
	openGraph: {
		title: "Contact Us | Redtail Telematics",
		description:
			"Find Redtail Telematics contact details, office locations, and the right team for fleet, insurance, device, and data questions.",
		url: "https://www.redtailtelematics.com/contact-us",
		locale: "en_US",
		images: [
			{
				url: "https://www.redtailtelematics.com/opengraph-image",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		site: "@RedtailTele",
		title: "Contact Us | Redtail Telematics",
		description:
			"Find Redtail Telematics contact details, office locations, and the right team for your request.",
		images: ["https://www.redtailtelematics.com/opengraph-image"],
	},
};

const contactCards = [
	{
		title: "Sales",
		description:
			"Talk through fleet management, usage-based insurance, white-label programs, devices, and rollout plans.",
		icon: ChatUserIcon,
		links: [
			{
				label: "Schedule a demo",
				href: "#footer-demo-form",
				primary: true,
			},
			{
				label: "sales@redtailtelematics.com",
				href: "mailto:sales@redtailtelematics.com",
				icon: Mail01Icon,
			},
			{
				label: "+1 866 711 4880",
				href: "tel:+18667114880",
				icon: Call02Icon,
			},
		],
	},
	{
		title: "Support",
		description:
			"Get routed to the right team for device, platform, installation, or program support.",
		icon: CustomerSupportIcon,
		links: [
			{
				label: "Call US support",
				href: "tel:+16195469061",
				primary: true,
			},
			{
				label: "+1 619-546-9061",
				href: "tel:+16195469061",
				icon: Call02Icon,
			},
			{
				label: "+44 1799 533300",
				href: "tel:+441799533300",
				icon: Call02Icon,
			},
		],
	},
	{
		title: "Technical Help",
		description:
			"Ask about data, integrations, telematics hardware, compliance documentation, or deployment requirements.",
		icon: BookOpenTextIcon,
		links: [
			{
				label: "Talk to a specialist",
				href: "#footer-demo-form",
				primary: true,
			},
			{
				label: "Request compliance help",
				href: "mailto:sales@redtailtelematics.com?subject=Compliance%20documentation%20request",
				icon: ShieldUserIcon,
			},
			{
				label: "Email technical request",
				href: "mailto:sales@redtailtelematics.com?subject=Technical%20question",
				icon: Mail01Icon,
			},
		],
	},
];

const secondaryContacts = [
	{
		title: "Press & media",
		description:
			"Reach out for company background, telematics expertise, awards, and media inquiries.",
		label: "Email media request",
		href: "mailto:sales@redtailtelematics.com?subject=Press%20and%20media%20request",
	},
	{
		title: "Resellers & partners",
		description:
			"Interested in becoming a reseller or exploring a telematics partnership?",
		label: "Email partner team",
		href: "mailto:sales@redtailtelematics.com?subject=Reseller%20program%20inquiry",
	},
	{
		title: "General",
		description:
			"Not sure who to contact? Send us a note and we will route you to the right team.",
		label: "Contact Redtail",
		href: "#footer-demo-form",
	},
];

const offices = [
	{
		label: "UK headquarters",
		title: "Great Chesterford, United Kingdom",
		address:
			"Plextek Building, London Road, Great Chesterford, Essex, CB10 1NY, UK",
		phone: "+44 1799 533300",
		phoneHref: "tel:+441799533300",
		email: "sales@redtailtelematics.com",
		emailHref: "mailto:sales@redtailtelematics.com",
		image: "/about/redtail_telematics_hq.jpg",
		imageAlt: "Redtail Telematics UK headquarters",
		mapHref: "https://www.google.com/maps/search/?api=1&query=Plextek+Building+London+Road+Great+Chesterford+Essex+CB10+1NY+UK",
	},
	{
		label: "United States office",
		title: "San Diego, California",
		address: "1420 Kettner Blvd Suite 100, San Diego, CA 92101, United States",
		phone: "+1 619-546-9061",
		phoneHref: "tel:+16195469061",
		email: "sales@redtailtelematics.com",
		emailHref: "mailto:sales@redtailtelematics.com",
		imageAlt: "Redtail Telematics San Diego office",
		mapHref: "https://www.google.com/maps/search/?api=1&query=1420+Kettner+Blvd+Suite+100+San+Diego+CA+92101+United+States",
	},
];

function ContactLink({
	href,
	icon,
	label,
	primary = false,
}: {
	href: string;
	icon?: typeof Mail01Icon;
	label: string;
	primary?: boolean;
}) {
	return (
		<Link
			className={
				primary
					? "inline-flex items-center gap-2 text-sm font-semibold text-rb-red transition hover:text-[#a81218]"
					: "inline-flex min-w-0 items-center gap-2 text-sm text-rb-black/68 underline decoration-black/18 underline-offset-4 transition hover:text-rb-red hover:decoration-rb-red"
			}
			href={href}
		>
			{icon ? (
				<HugeIcon className="text-rb-red" icon={icon} size={15} />
			) : null}
			<span className="break-words [overflow-wrap:anywhere]">{label}</span>
			{primary ? (
				<HugeIcon className="text-rb-red" icon={ArrowRight01Icon} size={15} />
			) : null}
		</Link>
	);
}

function OfficeVisual({ office }: { office: (typeof offices)[number] }) {
	if (office.image) {
		return (
			<figure className="relative aspect-[1.68] overflow-hidden rounded-lg bg-rb-black">
				<Image alt={office.imageAlt} className="object-cover" fill sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 600px" src={office.image} />
			</figure>
		);
	}

	return (
		<div className="flex min-h-72 flex-col justify-between rounded-lg bg-[#121c28] p-7 text-white sm:aspect-[1.68] sm:p-9">
			<p className="text-[10px] font-semibold tracking-[0.2em] text-white/65 uppercase">United States office</p>
			<div className="mt-6"><p className="text-4xl leading-tight font-semibold tracking-[-0.035em] sm:text-5xl">San Diego.</p><address className="mt-4 text-sm leading-6 text-white/75 not-italic">1420 Kettner Blvd, Suite 100<br />San Diego, CA 92101</address></div>
			<a className="mt-6 inline-flex min-h-11 w-fit items-center gap-3 border-b border-white/35 text-sm font-semibold hover:border-white" href={office.mapHref} rel="noopener noreferrer" target="_blank">View this address on Google Maps<HugeIcon icon={ArrowRight01Icon} size={17} /></a>
		</div>
	);
}

export default function ContactUsPage() {
	return (
		<main className="flex-1 bg-white">
			<section className="border-b border-black/10 bg-[#f4f5f6] px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24 lg:px-12 lg:pt-40">
				<div className="mx-auto max-w-[83rem]">
					<header className="grid gap-8 border-b border-black/15 pb-10 sm:pb-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
						<div><p className="text-[11px] font-semibold tracking-[0.2em] text-rb-red uppercase">Contact Redtail</p><h1 className="mt-6 max-w-3xl text-[2.8rem] leading-[1.04] font-semibold tracking-[-0.04em] text-rb-black sm:text-6xl lg:text-[4.5rem]">We&apos;re here to help</h1></div>
						<div><p className="max-w-lg text-lg leading-8 text-rb-black/65">Find the right Redtail team for sales, support, technical questions, partnerships, or office details.</p></div>
					</header>

					<div className="mt-12 grid gap-5 lg:grid-cols-3">
						{contactCards.map((card) => (
							<Card
								className="rounded-lg border-black/12 bg-white shadow-none ring-0"
								key={card.title}
							>
								<CardHeader className="gap-4 px-6 pt-7">
									<div className="flex size-10 items-center justify-center rounded-md border border-black/10 text-rb-red">
										<HugeIcon icon={card.icon} size={23} />
									</div>
									<div>
										<CardTitle className="text-2xl font-semibold text-rb-black">
											{card.title}
										</CardTitle>
										<CardDescription className="mt-3 min-h-15 text-sm leading-6 text-rb-black/62">
											{card.description}
										</CardDescription>
									</div>
								</CardHeader>
								<CardContent className="px-6 pb-7">
									<div className="border-t border-black/10 pt-4">
										<div className="flex flex-col gap-3">
											{card.links.map((link) => (
												<ContactLink
													href={link.href}
													icon={link.icon}
													key={link.label}
													label={link.label}
													primary={link.primary}
												/>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>

					<div className="mt-10 grid gap-6 md:grid-cols-3">
						{secondaryContacts.map((contact) => (
							<div className="border-t border-black/10 pt-6" key={contact.title}>
								<h2 className="text-base font-semibold text-rb-black">
									{contact.title}
								</h2>
								<p className="mt-3 text-sm leading-6 text-rb-black/62">
									{contact.description}
								</p>
								<div className="mt-4">
									<ContactLink
										href={contact.href}
										label={contact.label}
										primary
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
				<div className="mx-auto max-w-[83rem]">
					<header className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20">
						<div><p className="text-[11px] font-semibold tracking-[0.2em] text-rb-red uppercase">Our offices</p><h2 className="mt-5 text-4xl leading-[1.1] font-semibold tracking-[-0.035em] text-rb-black sm:text-5xl">Connected across the Atlantic.</h2></div>
						<p className="max-w-lg text-base leading-7 text-rb-black/65 sm:text-lg sm:leading-8">Contact our UK headquarters or United States office for help with your deployment, devices, and platform.</p>
					</header>

					<div className="mt-10 grid gap-8 lg:grid-cols-2">
						{offices.map((office) => (
							<article key={office.title}>
								<OfficeVisual office={office} />
								<p className="mt-5 text-sm font-semibold text-rb-black/52">
									{office.label}
								</p>
								<h3 className="mt-2 text-2xl font-semibold text-rb-black">
									{office.title}
								</h3>
								<p className="mt-4 max-w-md text-sm leading-6 text-rb-black/62">
									{office.address}
								</p>
								<div className="mt-5 flex flex-col gap-2">
									<ContactLink
										href={office.phoneHref}
										icon={Call02Icon}
										label={office.phone}
									/>
									<ContactLink
										href={office.emailHref}
										icon={Mail01Icon}
										label={office.email}
									/>
									{office.image ? <a className="mt-2 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-rb-red hover:underline" href={office.mapHref} rel="noopener noreferrer" target="_blank">View this address on Google Maps<HugeIcon icon={ArrowRight01Icon} size={16} /></a> : null}
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
				<div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-rb-black px-6 py-14 text-center text-white sm:px-10 sm:py-16">
					<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
						Get in touch
					</p>
					<h2 className="mx-auto mt-4 max-w-3xl text-4xl leading-tight font-semibold tracking-[-0.01em] sm:text-5xl">
						Ready to talk telematics?
					</h2>
					<p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
						Use the form below to tell us about your fleet, insurance program,
						device needs, or partnership goals.
					</p>
					<Button
						asChild
						className="mt-8 border-white bg-white text-rb-black hover:border-white hover:bg-white/90 hover:text-rb-black"
					>
						<Link href="#footer-demo-form">
							Go to contact form
							<HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
						</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}
