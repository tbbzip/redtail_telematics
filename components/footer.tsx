import Image from "next/image";
import Link from "next/link";
import {
	SiAppstore,
	SiFacebook,
	SiGoogleplay,
	SiInstagram,
	SiX,
} from "@icons-pack/react-simple-icons";
import {
	companyLinks,
	primaryCtaLink,
	resourceLinks,
	solutionFeaturedLinks,
	solutionLinks,
} from "@/components/nav-links";

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

const mobileDownloads = [
	{
		prefix: "Get it on",
		label: "Google Play",
		href: "https://play.google.com/store/apps/details?id=com.redtailtelematics.rtfleet",
		icon: <SiGoogleplay size={18} title="Google Play" />,
	},
	{
		prefix: "Download on the",
		label: "App Store",
		href: "https://apps.apple.com/app/redtail-fleet-app",
		icon: <SiAppstore size={18} title="App Store" />,
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

const footerSections = [
	{
		title: "Solutions",
		links: [...solutionFeaturedLinks, ...solutionLinks],
	},
	{
		title: "Resources",
		links: resourceLinks,
	},
	{
		title: "Company",
		links: [...companyLinks, primaryCtaLink],
	},
];

const contactDetails = [
	{ label: "UK", value: "+44 1799 533300", href: "tel:+441799533300" },
	{ label: "US", value: "+1 619-546-9061", href: "tel:+16195469061" },
	{
		label: "Email",
		value: "sales@redtailtelematics.com",
		href: "mailto:sales@redtailtelematics.com",
	},
];

const offices = [
	{
		title: "UK HQ",
		lines: [
			"Plextek Building, London Road, Great Chesterford, Essex, CB10 1NY UK",
		],
	},
	{
		title: "San Diego",
		lines: ["1420 Kettner Blvd Suite 100, San Diego, CA 92101 USA"],
	},
	{
		title: "Las Vegas",
		lines: ["2300 W Sahara Ave #800, Las Vegas, NV 89102 USA"],
	},
];

export function Footer() {
	return (
		<footer className="mt-auto border-t border-black/10 bg-rb-black text-white">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
				<div className="grid gap-10 border-b border-white/12 pb-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1.35fr]">
					<div className="max-w-sm">
						<Link className="inline-flex" href="/">
							<Image
								alt="Redtail"
								className="h-9 w-auto"
								height={52}
								priority
								src="/logo-white.svg"
								width={176}
							/>
						</Link>
						<p className="mt-5 max-w-xs text-sm leading-7 text-white/72">
							Connected vehicle intelligence for fleets, insurers, and OEM
							programs.
						</p>
						<div className="mt-6 flex flex-wrap gap-3 text-sm">
							<Link
								className="inline-flex items-center border border-white/18 px-4 py-2 font-medium text-white transition-colors hover:border-rb-red hover:text-rb-red"
								href="/contact-us"
							>
								Contact Us
							</Link>
							<Link
								className="inline-flex items-center bg-rb-red px-4 py-2 font-medium text-white transition-colors hover:bg-[#a81218]"
								href={primaryCtaLink.href}
							>
								{primaryCtaLink.label}
							</Link>
						</div>
					</div>

					{footerSections.map((section) => (
						<div key={section.title}>
							<h3 className="text-xs font-semibold tracking-[0.22em] text-white/52 uppercase">
								{section.title}
							</h3>
							<ul className="mt-4 space-y-3 text-sm text-white/70">
								{section.links.map((link) => (
									<li key={`${section.title}-${link.href}`}>
										<Link
											className="transition-colors hover:text-rb-red"
											href={link.href}
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="grid gap-10 py-10 lg:grid-cols-[0.85fr_1.15fr]">
					<div>
						<h3 className="text-xs font-semibold tracking-[0.22em] text-white/52 uppercase">
							Contact
						</h3>
						<ul className="mt-4 space-y-3 text-sm text-white/74">
							{contactDetails.map((item) => (
								<li key={item.label} className="flex flex-col gap-1">
									<span className="text-[11px] font-semibold tracking-[0.18em] text-white/44 uppercase">
										{item.label}
									</span>
									<a
										className="transition-colors hover:text-rb-red"
										href={item.href}
									>
										{item.value}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-xs font-semibold tracking-[0.22em] text-white/52 uppercase">
							Locations
						</h3>
						<div className="mt-4 grid gap-4 md:grid-cols-3">
							{offices.map((office) => (
								<div
									className="border border-white/12 bg-white/[0.03] px-4 py-4"
									key={office.title}
								>
									<h4 className="text-sm font-semibold text-white">
										{office.title}
									</h4>
									<div className="mt-3 space-y-2 text-sm leading-6 text-white/70">
										{office.lines.map((line) => (
											<p key={`${office.title}-${line}`}>{line}</p>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="border-t border-white/12 pt-6">
					<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
						<div className="flex flex-wrap items-center gap-3">
							{socialLinks.map((social) =>
								social.href ? (
									<a
										aria-label={social.label}
										className="inline-flex size-11 items-center justify-center rounded-md border border-white/16 text-white transition-colors hover:border-rb-red hover:text-rb-red"
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
										className="inline-flex size-11 items-center justify-center rounded-md border border-white/16 text-white/80"
										key={social.label}
										role="img"
									>
										{social.icon}
									</span>
								)
							)}
						</div>

						<div className="flex flex-wrap gap-3 lg:justify-end">
							{mobileDownloads.map((download) => (
								<a
									className="inline-flex min-w-[188px] items-center gap-3 rounded-md bg-white px-4 py-3 text-rb-black transition-transform duration-150 hover:-translate-y-0.5"
									href={download.href}
									key={download.label}
									rel="noreferrer"
									target="_blank"
								>
									<div className="flex size-9 items-center justify-center rounded-md bg-rb-black text-white">
										{download.icon}
									</div>
									<div className="flex flex-col">
										<span className="text-[10px] font-semibold tracking-[0.18em] text-rb-black/56 uppercase">
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

					<div className="mt-6 border-t border-white/12 pt-5 text-sm text-white/48">
						<p>&copy; {new Date().getFullYear()} Redtail Telematics. All rights reserved.</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
