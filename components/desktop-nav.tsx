import Link from "next/link";
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
	industryLinks,
	primaryCtaLink,
	resourceLinks,
	solutionFeaturedLinks,
	solutionLinks,
	topLevelLink,
} from "@/components/nav-links";
import { LinkItem } from "@/components/sheard";

export function DesktopNav({ overlay = false }: { overlay?: boolean }) {
	const overlayTextClass = overlay
		? "text-white/88 hover:text-white focus-visible:text-white data-popup-open:text-white data-open:text-white after:bg-white/75"
		: "";

	return (
		<NavigationMenu className="hidden md:flex">
			<NavigationMenuList>
				<NavigationMenuItem className="bg-transparent">
					<NavigationMenuTrigger
						className={cn("bg-transparent", overlayTextClass)}
					>
						Solutions
					</NavigationMenuTrigger>
					<NavigationMenuContent className="bg-muted/50 p-1 pr-1.5 dark:bg-background">
						<div className="grid w-[46rem] grid-cols-[1.4fr_0.8fr] gap-3">
							<div className="rounded-2xl border bg-popover p-2 shadow">
								<div className="grid grid-cols-2 gap-2">
									{solutionLinks.map((item, i) => (
										<NavigationMenuLink asChild key={`solution-${item.label}-${i}`}>
											<LinkItem {...item} />
										</NavigationMenuLink>
									))}
								</div>
							</div>
							<div className="rounded-2xl border bg-background/80 p-3">
								<p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
									Featured
								</p>
								<div className="mt-2 space-y-1">
									{solutionFeaturedLinks.map((item, i) => (
										<NavigationMenuLink asChild key={`featured-${item.label}-${i}`}>
											<Link
												className="justify-between rounded-2xl px-3 py-2"
												href={item.href}
											>
												<span>{item.label}</span>
												{item.icon}
											</Link>
										</NavigationMenuLink>
									))}
								</div>
								<div className="mt-4 rounded-2xl border bg-muted/40 px-3 py-3 text-sm text-muted-foreground">
									<div>Already using the platform?</div>
									<Link
										className="mt-2 inline-flex font-medium text-foreground hover:underline"
										href={primaryCtaLink.href}
									>
										{primaryCtaLink.label}
									</Link>
								</div>
							</div>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger
						className={cn("bg-transparent", overlayTextClass)}
					>
						Explore
					</NavigationMenuTrigger>
					<NavigationMenuContent className="bg-muted/50 p-1 pr-1.5 pb-1.5 dark:bg-background">
						<div className="grid w-[58rem] grid-cols-[1.45fr_0.9fr] gap-3">
							<div className="rounded-2xl border bg-popover p-2 shadow">
								<p className="px-2 pb-2 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
									Industries
								</p>
								<div className="grid grid-cols-2 gap-2">
									{industryLinks.map((item, i) => (
										<NavigationMenuLink asChild key={`industry-${item.label}-${i}`}>
											<LinkItem {...item} />
										</NavigationMenuLink>
									))}
								</div>
							</div>
							<div className="rounded-2xl border bg-background/80 p-3">
								<div>
									<p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
										Resources
									</p>
									<div className="mt-2 space-y-1">
										{resourceLinks.map((item, i) => (
											<NavigationMenuLink asChild key={`resource-${item.label}-${i}`}>
												<Link
													className="justify-between rounded-2xl px-3 py-2"
													href={item.href}
												>
													<span>{item.label}</span>
													{item.icon}
												</Link>
											</NavigationMenuLink>
										))}
									</div>
								</div>
								<div className="mt-4 border-t pt-4">
									<p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
										Company
									</p>
									<div className="mt-2 space-y-1">
										{companyLinks.map((item, i) => (
											<NavigationMenuLink asChild key={`company-${item.label}-${i}`}>
												<Link
													className="justify-between rounded-2xl px-3 py-2"
													href={item.href}
												>
													<span>{item.label}</span>
													{item.icon}
												</Link>
											</NavigationMenuLink>
										))}
									</div>
								</div>
							</div>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuLink asChild className="px-4">
					<Link
						className={cn(
							"relative inline-flex h-9 items-center px-2 py-2 text-sm font-medium text-foreground/72 transition-colors hover:text-rb-red focus-visible:text-rb-red focus-visible:outline-none after:absolute after:right-2 after:bottom-1 after:left-2 after:h-px after:origin-left after:scale-x-0 after:bg-rb-red/70 after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100",
							overlay &&
								"text-white/88 hover:text-white focus-visible:text-white after:bg-white/75"
						)}
						href={topLevelLink.href}
					>
						{topLevelLink.label}
					</Link>
				</NavigationMenuLink>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
