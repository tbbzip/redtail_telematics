"use client";

import {
	ArrowRight01Icon,
	CpuIcon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import { HugeIcon } from "@/components/huge-icon";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
	companyLinks,
	companyMatchers,
	industryLinks,
	industryMatchers,
	pathnameMatchesAny,
	platformMatchers,
	resourceLinks,
	resourceMatchers,
	solutionFeaturedLinks,
	solutionLinks,
	solutionMatchers,
	topLevelLink,
} from "@/components/nav-links";
import { type LinkItemType } from "@/components/sheard";
import { cn } from "@/lib/utils";

const itemLinkClassName = "p-0 hover:bg-transparent focus:bg-transparent";
const promoLinkClassName =
	"p-0 !text-white hover:!bg-rb-black hover:!text-white focus:!bg-rb-black focus:!text-white in-data-[slot=navigation-menu-content]:hover:!bg-rb-black in-data-[slot=navigation-menu-content]:focus:!bg-rb-black";
const sectionTitleClassName =
	"mb-4 text-xs font-semibold tracking-[0.22em] text-rb-black/48 uppercase";

const fullSolutionLinks: LinkItemType[] = [
	...solutionLinks,
	...solutionFeaturedLinks,
	{
		label: topLevelLink.label,
		href: topLevelLink.href,
		icon: <HugeIcon className="size-[19px]" icon={CpuIcon} size={19} />,
	},
];

function getTriggerClass(active: boolean, overlay: boolean) {
	return cn(
		"bg-transparent",
		overlay &&
			"text-white/92 hover:text-white focus-visible:text-white data-popup-open:text-white data-open:text-white after:bg-white/75",
		active &&
			(overlay
				? "text-white after:scale-x-100"
				: "text-rb-red after:scale-x-100")
	);
}

function MegaMenuLink({
	active,
	item,
	showDescription = true,
}: {
	active: boolean;
	item: LinkItemType;
	showDescription?: boolean;
}) {
	return (
		<NavigationMenuLink asChild className={itemLinkClassName}>
			<Link
				className={cn(
					"group/mega-link flex min-h-18 items-start gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 hover:bg-rb-peach/28 hover:text-rb-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rb-red/30",
					active && "bg-rb-peach/36 text-rb-red"
				)}
				href={item.href}
			>
				<span
					className={cn(
						"flex size-10 shrink-0 items-center justify-center rounded-xl bg-rb-peach/55 text-rb-black transition-colors group-hover/mega-link:bg-rb-red group-hover/mega-link:text-white",
						active && "bg-rb-red text-white"
					)}
				>
					{item.icon}
				</span>
				<span className="min-w-0">
					<span className="block text-base font-semibold leading-5 text-rb-black transition-colors group-hover/mega-link:text-rb-red">
						{item.label}
					</span>
					{showDescription && item.description ? (
						<span className="mt-1 block max-w-[17rem] text-sm leading-5 text-rb-black/56">
							{item.description}
						</span>
					) : null}
				</span>
			</Link>
		</NavigationMenuLink>
	);
}

function PromoCard({
	ctaLabel,
	description,
	href,
	imageAlt,
	imageContain = false,
	imageSrc,
	title,
}: {
	ctaLabel: string;
	description: string;
	href: string;
	imageAlt: string;
	imageContain?: boolean;
	imageSrc: string;
	title: string;
}) {
	return (
		<NavigationMenuLink asChild className={promoLinkClassName}>
			<Link
				className="group/promo flex h-full min-h-[26rem] flex-col overflow-hidden rounded-[1.35rem] bg-rb-black p-5 !text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-transform duration-300 hover:!bg-rb-black hover:!text-white focus:!bg-rb-black focus:!text-white focus-visible:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rb-red/40"
				href={href}
			>
				<div className="relative h-40 overflow-hidden rounded-[1rem] bg-white/7 ring-1 ring-white/10">
					<Image
						alt={imageAlt}
						className={cn(
							imageContain ? "object-contain p-4" : "object-cover",
							"transition duration-500 group-hover/promo:scale-[1.03]"
						)}
						fill
						sizes="280px"
						src={imageSrc}
					/>
					<div className="absolute inset-0 bg-linear-to-t from-rb-black/28 to-transparent" />
				</div>
				<div className="mt-7 flex flex-1 flex-col">
					<p className="text-[11px] font-semibold tracking-[0.24em] text-rb-red uppercase group-hover/promo:text-rb-red">
						Featured
					</p>
					<h3 className="mt-3 text-2xl font-semibold leading-tight text-white group-hover/promo:text-white">
						{title}
					</h3>
					<p className="mt-4 text-sm leading-6 text-white/64 group-hover/promo:text-white/64">
						{description}
					</p>
					<span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-white group-hover/promo:text-white">
						{ctaLabel}
						<HugeIcon
							className="size-4 text-white transition-transform duration-300 group-hover/promo:translate-x-1"
							icon={ArrowRight01Icon}
							size={16}
						/>
					</span>
				</div>
			</Link>
		</NavigationMenuLink>
	);
}

function MegaMenuShell({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"max-w-[calc(100vw-2rem)] overflow-hidden rounded-[1.65rem] border border-black/10 bg-[#fcfbf9] p-6 text-rb-black shadow-[0_32px_110px_rgba(1,1,1,0.22)]",
				className
			)}
		>
			{children}
		</div>
	);
}

export function DesktopNav({ overlay = false }: { overlay?: boolean }) {
	const pathname = usePathname();
	const solutionsActive = pathnameMatchesAny(pathname, solutionMatchers);
	const industriesActive = pathnameMatchesAny(pathname, industryMatchers);
	const resourcesActive = pathnameMatchesAny(pathname, resourceMatchers);
	const companyActive = pathnameMatchesAny(pathname, companyMatchers);
	const platformActive = pathnameMatchesAny(pathname, platformMatchers);

	return (
		<NavigationMenu className="hidden lg:flex" viewport={false}>
			<NavigationMenuList className="gap-0.5">
				<NavigationMenuItem>
					<NavigationMenuTrigger
						className={getTriggerClass(solutionsActive, overlay)}
					>
						Solutions
					</NavigationMenuTrigger>
					<NavigationMenuContent className="!fixed !top-14 !left-1/2 !w-auto !-translate-x-1/2 !rounded-[1.65rem] !bg-transparent !p-0 !shadow-none !ring-0">
						<MegaMenuShell className="w-[62rem]">
							<div className="grid gap-7 lg:grid-cols-[1fr_18rem]">
								<div>
									<p className={sectionTitleClassName}>Solutions</p>
									<div className="grid grid-cols-2 gap-2">
										{fullSolutionLinks.map((item) => (
											<MegaMenuLink
												active={pathname === item.href}
												item={item}
												key={item.href}
											/>
										))}
									</div>
								</div>

								<PromoCard
									ctaLabel="Request a demo"
									description="Review live fleet activity on web and mobile with one platform for operations teams."
									href="/contact-us"
									imageAlt="Redtail web and mobile platform views"
									imageContain
									imageSrc="/platform-screenshots/redtail_lap-mob.png"
									title="See Redtail in action"
								/>
							</div>
						</MegaMenuShell>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger
						className={getTriggerClass(industriesActive, overlay)}
					>
						Industries
					</NavigationMenuTrigger>
					<NavigationMenuContent className="!fixed !top-14 !left-1/2 !w-auto !-translate-x-1/2 !rounded-[1.65rem] !bg-transparent !p-0 !shadow-none !ring-0">
						<MegaMenuShell className="w-[64rem]">
							<div className="grid gap-7 lg:grid-cols-[1fr_20rem]">
								<div>
									<p className={sectionTitleClassName}>By industry</p>
									<div className="grid grid-cols-2 gap-x-7 gap-y-2">
										{industryLinks.map((item) => (
											<MegaMenuLink
												active={pathname === item.href}
												item={item}
												key={item.href}
												showDescription={false}
											/>
										))}
									</div>
								</div>

								<PromoCard
									ctaLabel="Talk to an expert"
									description="Match Redtail telematics to the teams, vehicles, and workflows you operate every day."
									href="/contact-us"
									imageAlt="Fleet operations vehicle"
									imageSrc="/carousel/fleet.jpg"
									title="Built for real operating teams"
								/>
							</div>
						</MegaMenuShell>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuLink asChild className="px-1">
					<Link
						className={cn(
							"relative inline-flex h-9 items-center px-3 py-2 text-[15px] font-semibold text-foreground/80 transition-colors hover:text-rb-red focus-visible:text-rb-red focus-visible:outline-none after:absolute after:right-3 after:bottom-1 after:left-3 after:h-px after:origin-left after:scale-x-0 after:bg-rb-red/70 after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100",
							overlay &&
								"text-white/92 hover:text-white focus-visible:text-white after:bg-white/75",
							platformActive &&
								(overlay
									? "text-white after:scale-x-100"
									: "text-rb-red after:scale-x-100")
						)}
						href={topLevelLink.href}
					>
						{topLevelLink.label}
					</Link>
				</NavigationMenuLink>

				<NavigationMenuItem>
					<NavigationMenuTrigger
						className={getTriggerClass(resourcesActive, overlay)}
					>
						Resources
					</NavigationMenuTrigger>
					<NavigationMenuContent className="!fixed !top-14 !left-1/2 !w-auto !-translate-x-1/2 !rounded-[1.65rem] !bg-transparent !p-0 !shadow-none !ring-0">
						<MegaMenuShell className="w-[48rem]">
							<div className="grid gap-7 lg:grid-cols-[1fr_18rem]">
								<div>
									<p className={sectionTitleClassName}>Resources</p>
									<div className="grid gap-2">
										{resourceLinks.map((item) => (
											<MegaMenuLink
												active={pathname === item.href}
												item={item}
												key={item.href}
											/>
										))}
									</div>
								</div>

								<PromoCard
									ctaLabel="Explore resources"
									description="Read fleet insights, customer stories, guides, and Redtail updates for modern telematics programs."
									href="/resources/blog"
									imageAlt="Redtail fleet resources"
									imageSrc="/carousel/fleet-web.jpg"
									title="Learn from real deployments"
								/>
							</div>
						</MegaMenuShell>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger
						className={getTriggerClass(companyActive, overlay)}
					>
						Company
					</NavigationMenuTrigger>
					<NavigationMenuContent className="!fixed !top-14 !left-1/2 !w-auto !-translate-x-1/2 !rounded-[1.65rem] !bg-transparent !p-0 !shadow-none !ring-0">
						<MegaMenuShell className="w-[50rem]">
							<div className="grid gap-7 lg:grid-cols-[1fr_18rem]">
								<div>
									<p className={sectionTitleClassName}>Company</p>
									<div className="grid gap-2">
										{companyLinks.map((item) => (
											<MegaMenuLink
												active={pathname === item.href}
												item={item}
												key={item.href}
												showDescription={false}
											/>
										))}
									</div>
								</div>

								<PromoCard
									ctaLabel="Contact Redtail"
									description="Connect with our UK and US teams for sales, support, partnerships, and product conversations."
									href="/contact-us"
									imageAlt="Redtail headquarters"
									imageSrc="/about/redtail_telematics_hq.jpg"
									title="Built by telematics specialists"
								/>
							</div>
						</MegaMenuShell>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
