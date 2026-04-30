"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ArrowRight01Icon, Call02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { HugeIcon } from "@/components/huge-icon";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "@/components/desktop-nav";
import { MobileNav } from "@/components/mobile-nav";
import {
	getStartedCtaLink,
	primaryCtaLink,
	secondaryCtaLink,
} from "@/components/nav-links";
import { usesOverlayHeader } from "@/lib/overlay-header-routes";

const textActionClassName =
	"relative inline-flex h-9 items-center gap-1.5 px-1 text-sm font-medium text-foreground/72 transition-colors hover:text-rb-red focus-visible:text-rb-red focus-visible:outline-none after:absolute after:right-1 after:bottom-1 after:left-1 after:h-px after:origin-left after:scale-x-0 after:bg-rb-red after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100";

export function Header() {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
	const scrolled = useScroll(24, 12);
	const overlayRoute = usesOverlayHeader(pathname);
	const overlay = overlayRoute && !scrolled && !mobileMenuOpen;

	return (
		<header
			className={cn(
				"top-0 z-50 w-full border-b transition-colors duration-300",
				overlayRoute ? "fixed inset-x-0" : "sticky",
				mobileMenuOpen
					? "border-border bg-background"
					: overlay
					? "border-transparent bg-transparent"
					: "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/70"
			)}
		>
			<nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
				<div className="flex items-center gap-6">
					<Link
						className="px-2 py-1.5 transition-opacity hover:opacity-90"
						href="/"
					>
						<Image
							alt="Redtail"
							className="h-7 w-auto sm:h-8"
							height={48}
							priority
							src={overlay ? "/logo-white.svg" : "/logo.svg"}
							width={160}
						/>
					</Link>
					<DesktopNav overlay={overlay} />
				</div>
				<div className="hidden items-center gap-3 lg:flex">
					<Link
						className={cn(
							textActionClassName,
							overlay &&
								"text-white/84 hover:text-white focus-visible:text-white after:bg-white"
						)}
						href={secondaryCtaLink.href}
					>
						{secondaryCtaLink.label}
					</Link>
					<Link
						className={cn(
							textActionClassName,
							overlay &&
								"text-white/84 hover:text-white focus-visible:text-white after:bg-white"
						)}
						href={primaryCtaLink.href}
					>
						<HugeIcon className="size-4" icon={Call02Icon} size={16} />
						{primaryCtaLink.label}
					</Link>
					<Button
						asChild
						className={cn(
							overlay &&
								"border-white bg-white text-rb-black hover:border-white hover:bg-white/90 hover:text-rb-black"
						)}
						size="sm"
					>
						<Link href={getStartedCtaLink.href}>
							{getStartedCtaLink.label}
							<HugeIcon icon={ArrowRight01Icon} />
						</Link>
					</Button>
				</div>
				<MobileNav onOpenChange={setMobileMenuOpen} overlay={overlay} />
			</nav>
		</header>
	);
}
