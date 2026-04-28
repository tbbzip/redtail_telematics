"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
import { LinkItem, type LinkItemType } from "@/components/sheard";

const itemLinkClassName = "p-0 hover:bg-transparent focus:bg-transparent";
const solutionMenuLinks = [...solutionLinks, ...solutionFeaturedLinks];
const sectionTitleClassName =
	"mb-3 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase";

function CompactMenuLink({
	active,
	item,
}: {
	active: boolean;
	item: LinkItemType;
}) {
	return (
		<Link
			className={cn(
				"group/compact-link flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-foreground/82 transition-all duration-200 hover:translate-x-0.5 hover:text-rb-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rb-red/30",
				active && "text-rb-red"
			)}
			href={item.href}
		>
			<span
				className={cn(
					"flex size-7 shrink-0 items-center justify-center text-foreground/58 transition-colors group-hover/compact-link:text-rb-red",
					active && "text-rb-red",
					"[&_svg:not([class*='size-'])]:size-3.5"
				)}
			>
				{item.icon}
			</span>
			<span>{item.label}</span>
		</Link>
	);
}

function getTriggerClass(active: boolean, overlay: boolean) {
	return cn(
		"bg-transparent",
		overlay &&
			"text-white/88 hover:text-white focus-visible:text-white data-popup-open:text-white data-open:text-white after:bg-white/75",
		active &&
			(overlay
				? "text-white after:scale-x-100"
				: "text-rb-red after:scale-x-100")
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
					<NavigationMenuContent className="p-2.5">
						<div className="w-[20rem] p-2">
							<p className={sectionTitleClassName}>Solutions</p>
							<div className="grid gap-1.5">
								{solutionMenuLinks.map((item) => (
									<NavigationMenuLink
										asChild
										className={itemLinkClassName}
										key={item.href}
									>
										<LinkItem
											active={pathname === item.href}
											minimal
											{...item}
										/>
									</NavigationMenuLink>
								))}
							</div>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger
						className={getTriggerClass(industriesActive, overlay)}
					>
						Industries
					</NavigationMenuTrigger>
					<NavigationMenuContent className="p-2.5">
						<div className="w-[34rem] p-2">
							<p className={sectionTitleClassName}>Industries</p>
							<div className="grid grid-cols-2 gap-1.5">
								{industryLinks.map((item) => (
									<NavigationMenuLink
										asChild
										className={itemLinkClassName}
										key={item.href}
									>
										<LinkItem
											active={pathname === item.href}
											minimal
											{...item}
										/>
									</NavigationMenuLink>
								))}
							</div>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuLink asChild className="px-1">
					<Link
						className={cn(
							"relative inline-flex h-9 items-center px-3 py-2 text-sm font-medium text-foreground/72 transition-colors hover:text-rb-red focus-visible:text-rb-red focus-visible:outline-none after:absolute after:right-3 after:bottom-1 after:left-3 after:h-px after:origin-left after:scale-x-0 after:bg-rb-red/70 after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100",
							overlay &&
								"text-white/88 hover:text-white focus-visible:text-white after:bg-white/75",
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
					<NavigationMenuContent className="p-2.5">
						<div className="w-[18rem] p-2">
							<p className={sectionTitleClassName}>Resources</p>
							<div className="grid gap-1.5">
								{resourceLinks.map((item) => (
									<NavigationMenuLink
										asChild
										className={itemLinkClassName}
										key={item.href}
									>
										<CompactMenuLink
											active={pathname === item.href}
											item={item}
										/>
									</NavigationMenuLink>
								))}
							</div>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger
						className={getTriggerClass(companyActive, overlay)}
					>
						Company
					</NavigationMenuTrigger>
					<NavigationMenuContent className="p-2.5">
						<div className="w-[19rem] p-2">
							<p className={sectionTitleClassName}>Company</p>
							<div className="grid gap-1.5">
								{companyLinks.map((item) => (
									<NavigationMenuLink
										asChild
										className={itemLinkClassName}
										key={item.href}
									>
										<CompactMenuLink
											active={pathname === item.href}
											item={item}
										/>
									</NavigationMenuLink>
								))}
							</div>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
