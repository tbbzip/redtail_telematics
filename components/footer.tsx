import Image from "next/image";
import Link from "next/link";
import {
	Call02Icon,
	CheckmarkCircle02Icon,
	Location01Icon,
	Mail01Icon,
} from "@hugeicons/core-free-icons";
import {
	SiAppstore,
	SiFacebook,
	SiGoogleplay,
	SiInstagram,
	SiX,
} from "@icons-pack/react-simple-icons";

import {
	companyLinks,
	getStartedCtaLink,
	resourceLinks,
	solutionFeaturedLinks,
	solutionLinks,
	topLevelLink,
} from "@/components/nav-links";
import { FooterDemoForm } from "@/components/footer-demo-form";
import { HugeIcon } from "@/components/huge-icon";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

function LinkedinGlyph() {
	return (
		<svg
			aria-hidden="true"
			className="size-4 fill-current"
			viewBox="0 0 24 24"
		>
			<path d="M6.9 8.3a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8Zm-1.7 2h3.4V20H5.2v-9.7Zm5.3 0h3.3v1.3h.1c.5-.9 1.7-1.8 3.4-1.8 3.6 0 4.3 2.1 4.3 5V20h-3.5v-4.6c0-1.1 0-2.6-1.7-2.6s-2 1.2-2 2.5V20h-3.5v-9.7Z" />
		</svg>
	);
}

const trustedLogos = [
	{ src: "/clients/t-mobile.svg", alt: "T-Mobile" },
	{ src: "/clients/concirrus.svg", alt: "Concirrus" },
	{ src: "/clients/jaguar.svg", alt: "Jaguar" },
	{ src: "/clients/lojack.svg", alt: "LoJack" },
	{ src: "/clients/fujitsu.svg", alt: "Fujitsu" },
	{ src: "/clients/admiral.svg", alt: "Admiral" },
];

const mobileDownloads = [
	{
		prefix: "Download on the",
		label: "App Store",
		href: "https://apps.apple.com/app/redtail-fleet-app",
		icon: <SiAppstore size={24} title="App Store" />,
	},
	{
		prefix: "Get it on",
		label: "Google Play",
		href: "https://play.google.com/store/apps/details?id=com.redtailtelematics.rtfleet",
		icon: <SiGoogleplay size={24} title="Google Play" />,
	},
];

const socialLinks = [
	{
		label: "Facebook",
		icon: <SiFacebook size={16} title="Facebook" />,
	},
	{
		label: "Instagram",
		icon: <SiInstagram size={16} title="Instagram" />,
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/company/redtail-telematics",
		icon: <LinkedinGlyph />,
	},
	{
		label: "X",
		icon: <SiX size={16} title="X" />,
	},
];

const exploreLinks = [
	topLevelLink,
	...solutionFeaturedLinks,
	...solutionLinks.slice(0, 3),
	...resourceLinks.slice(0, 2),
];

const companyFooterLinks = [
	...companyLinks.filter((link) =>
		["About Us", "Our Technology", "Careers", "Contact Us"].includes(link.label)
	),
	getStartedCtaLink,
];

const legalLinks = [
	{ label: "Privacy Policy", href: "/privacy-policy" },
	{ label: "Terms", href: "/terms-and-conditions" },
	{ label: "Cookie Policy", href: "/cookie-policy" },
];

type CertificationBadge = {
	src: string;
	alt: string;
	label: string;
	href?: string;
};

const certificationBadges: CertificationBadge[] = [
	{
		src: "/certifications/nqa_iso9001.jpg",
		alt: "ISO 9001 certification",
		label: "ISO 9001",
		href: "https://www.nqa.com/en-us/certification/standards/iso-9001",
	},
	{
		src: "/certifications/nqa_iso27001.jpg",
		alt: "ISO 27001 certification",
		label: "ISO 27001",
		href: "https://www.nqa.com/en-us/certification/standards/iso-27001",
	},
	{
		src: "/certifications/award-badge.png",
		alt: "Best Telematics Provider award",
		label: "Best Telematics Provider",
	},
];

const demoBenefits = [
	"Real-time vehicle and asset visibility",
	"Driver risk, incident insight, and operational alerts",
	"Device health and deployment support as programs scale",
];

const contactDetails = [
	{
		label: "UK",
		value: "+44 1799 533300",
		href: "tel:+441799533300",
		icon: Call02Icon,
	},
	{
		label: "US",
		value: "+1 619-546-9061",
		href: "tel:+16195469061",
		icon: Call02Icon,
	},
	{
		label: "Sales",
		value: "sales@redtailtelematics.com",
		href: "mailto:sales@redtailtelematics.com",
		icon: Mail01Icon,
	},
];

const officeLocations = [
	{
		label: "UK HQ",
		address:
			"Plextek Building, London Road, Great Chesterford, Essex, CB10 1NY UK",
	},
	{
		label: "San Diego",
		address: "1420 Kettner Blvd Suite 100, San Diego, CA 92101 USA",
	},
	{
		label: "Las Vegas",
		address: "2300 W Sahara Ave #800, Las Vegas, NV 89102 USA",
	},
];

function CertificationBadgeCard({ badge }: { badge: CertificationBadge }) {
	const className =
		"group inline-flex h-14 items-center justify-center opacity-80 transition duration-300 hover:-translate-y-0.5 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rb-red/50 focus-visible:ring-offset-4 focus-visible:ring-offset-rb-black";

	const content = (
		<>
			<Image
				alt={badge.alt}
				className="h-20 w-auto max-w-44 object-contain transition duration-300"
				height={80}
				src={badge.src}
				width={176}
			/>
			<span className="sr-only">{badge.label}</span>
		</>
	);

	if (badge.href) {
		return (
			<a
				className={className}
				href={badge.href}
				rel="noreferrer"
				target="_blank"
			>
				{content}
			</a>
		);
	}

	return <div className={className}>{content}</div>;
}

export function Footer() {
	return (
		<footer className="relative mt-auto overflow-hidden bg-rb-black text-white rounded-t-4xl">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rb-red/80 to-transparent"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute top-0 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-white/[0.045] blur-3xl"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-rb-red/12 blur-3xl"
			/>
			<div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
					<section
						aria-labelledby="footer-demo-heading"
						className="grid gap-10 border-b border-white/10 pb-14 sm:pb-16 lg:grid-cols-[1fr_28rem] lg:items-start lg:gap-20 lg:pb-20"
					>
						<div className="max-w-2xl">
							<p className="text-xs font-semibold tracking-[0.28em] text-rb-red uppercase">
								Connect with Redtail
							</p>
							<h2
								className="mt-5 max-w-xl text-[2.15rem] leading-tight font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.25rem]"
								id="footer-demo-heading"
							>
								Ready to see Redtail in action?
							</h2>
							<p className="mt-5 max-w-xl text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
								Schedule a demo with our team to see how Redtail supports
								fleets, insurers, OEMs, and partner programs with reliable
								telematics data.
							</p>

							<ul className="mt-8 grid gap-4 text-sm text-white/78">
								{demoBenefits.map((benefit) => (
									<li className="flex items-start gap-3" key={benefit}>
										<span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-rb-red/55 text-rb-red">
											<HugeIcon
												className="size-3.5"
												icon={CheckmarkCircle02Icon}
												size={14}
												strokeWidth={2.2}
											/>
										</span>
										<span>{benefit}</span>
									</li>
								))}
							</ul>

							<div className="mt-10 border-t border-white/10 pt-8">
								<h3 className="text-sm font-semibold tracking-[0.2em] text-white/48 uppercase">
									Contact
								</h3>
								<div className="mt-5 grid gap-3 sm:grid-cols-3">
									{contactDetails.map((detail) => (
										<a
											className="group rounded-lg border border-white/10 bg-white/[0.035] p-4 transition hover:-translate-y-0.5 hover:border-rb-red/40 hover:bg-white/[0.06]"
											href={detail.href}
											key={`${detail.label}-${detail.value}`}
										>
											<div className="flex items-center gap-2 text-xs font-semibold text-white/46">
												<HugeIcon
													className="size-4 text-rb-red"
													icon={detail.icon}
													size={16}
												/>
												{detail.label}
											</div>
											<p className="mt-2 text-sm font-semibold text-white transition-colors group-hover:text-rb-red">
												{detail.value}
											</p>
										</a>
									))}
								</div>
							</div>

							<div className="mt-8">
								<h3 className="text-sm font-semibold tracking-[0.2em] text-white/48 uppercase">
									Locations
								</h3>
								<div className="mt-5 grid gap-4 lg:grid-cols-3">
									{officeLocations.map((office) => (
										<div
											className="border-l border-rb-red/60 pl-4"
											key={office.label}
										>
											<div className="flex items-center gap-2 text-sm font-semibold text-white">
												<HugeIcon
													className="size-4 text-rb-red"
													icon={Location01Icon}
													size={16}
												/>
												{office.label}
											</div>
											<p className="mt-2 text-sm leading-6 text-white/58">
												{office.address}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>

						<FooterDemoForm />
					</section>

					<div className="mx-auto mt-14 max-w-3xl sm:mt-16 lg:mt-20">
						<div className="relative overflow-hidden">
							<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-rb-black to-transparent" />
							<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-rb-black to-transparent" />
							<InfiniteSlider gap={36} speed={18} speedOnHover={9}>
								{trustedLogos.map((logo) => (
									<div
										className="flex min-w-[118px] items-center justify-center"
										key={logo.src}
									>
										<Image
											alt={logo.alt}
											className="h-6 w-auto object-contain opacity-45 grayscale brightness-0 invert transition duration-300 hover:opacity-90"
											height={36}
											src={logo.src}
											width={118}
										/>
									</div>
								))}
							</InfiniteSlider>
						</div>
						<p className="mt-8 text-center text-sm leading-7 text-white/72 sm:text-base">
							Trusted by fleets, insurers, OEMs, and connected-vehicle partners
							worldwide.
						</p>
					</div>

					<div className="mt-16 grid gap-10 lg:grid-cols-[1.35fr_0.8fr_0.75fr_0.95fr] lg:gap-14">
						<div>
							<Link className="inline-flex" href="/">
								<Image
									alt="Redtail"
									className="h-10 w-auto"
									height={52}
									priority
									src="/logo-white.svg"
									width={176}
								/>
							</Link>
							<p className="mt-5 max-w-sm text-sm leading-7 text-white/68">
								Connected vehicle intelligence for fleets, insurers, OEMs, and
								partner programs that need reliable data from device to
								platform.
							</p>
							<div className="mt-7 flex flex-wrap items-center gap-3">
								{socialLinks.map((social) =>
									social.href ? (
										<a
											aria-label={social.label}
											className="inline-flex size-10 items-center justify-center rounded-md border border-white/12 text-white/82 transition hover:-translate-y-0.5 hover:border-rb-red/45 hover:text-rb-red"
											href={social.href}
											key={social.label}
											rel="noreferrer"
											target="_blank"
										>
											{social.icon}
										</a>
									) : (
										<span
											aria-label={`${social.label} link coming soon`}
											className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 text-white/36"
											key={social.label}
											role="img"
										>
											{social.icon}
										</span>
									)
								)}
							</div>
						</div>

						<nav aria-label="Explore links">
							<h3 className="text-base font-semibold text-white">Explore</h3>
							<ul className="mt-5 space-y-3 text-sm text-white/66">
								{exploreLinks.map((link) => (
									<li key={link.href}>
										<Link
											className="transition-colors hover:text-rb-red"
											href={link.href}
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</nav>

						<nav aria-label="Company links">
							<h3 className="text-base font-semibold text-white">Company</h3>
							<ul className="mt-5 space-y-3 text-sm text-white/66">
								{companyFooterLinks.map((link) => (
									<li key={link.href}>
										<Link
											className="transition-colors hover:text-rb-red"
											href={link.href}
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</nav>

						<div>
							<h3 className="text-base font-semibold text-white">Download App</h3>
							<div className="mt-6 grid gap-3">
								{mobileDownloads.map((download) => (
									<a
										className="group inline-flex min-w-[200px] items-center gap-4 rounded-lg border border-white/14 bg-white/[0.035] px-4 py-3 text-white shadow-[0_18px_40px_rgba(207,19,23,0.08)] transition hover:-translate-y-0.5 hover:border-rb-red/45 hover:bg-white/[0.07]"
										href={download.href}
										key={download.label}
										rel="noreferrer"
										target="_blank"
									>
										<div className="text-white transition-colors group-hover:text-rb-red">
											{download.icon}
										</div>
										<div className="flex flex-col">
											<span className="text-[10px] font-medium text-white/68">
												{download.prefix}
											</span>
											<span className="text-lg leading-none font-semibold">
												{download.label}
											</span>
										</div>
									</a>
								))}
							</div>
						</div>
					</div>

					<div className="mt-12 border-t border-white/10 pt-6">
						<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
							<div
								aria-label="Certifications and recognitions"
								className="flex flex-wrap items-center gap-x-6 gap-y-4"
							>
								{certificationBadges.map((badge) => (
									<CertificationBadgeCard badge={badge} key={badge.src} />
								))}
							</div>

							<nav
								aria-label="Legal links"
								className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/48"
							>
								{legalLinks.map((link) => (
									<Link
										className="transition-colors hover:text-rb-red"
										href={link.href}
										key={link.href}
									>
										{link.label}
									</Link>
								))}
							</nav>
						</div>
						<p className="mt-6 text-sm text-white/40">
							&copy; {new Date().getFullYear()} Redtail Telematics. All rights
							reserved.
						</p>
					</div>
			</div>
		</footer>
	);
}
