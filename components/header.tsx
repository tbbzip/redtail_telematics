"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "@/components/desktop-nav";
import { MobileNav } from "@/components/mobile-nav";
import { primaryCtaLink, secondaryCtaLink } from "@/components/nav-links";
import { usesOverlayHeader } from "@/lib/overlay-header-routes";

export function Header() {
	const pathname = usePathname();
	const scrolled = useScroll(24, 12);
	const overlayRoute = usesOverlayHeader(pathname);
	const overlay = overlayRoute && !scrolled;

	return (
		<header
			className={cn(
				"top-0 z-50 w-full border-b transition-colors duration-300",
				overlayRoute ? "fixed inset-x-0" : "sticky",
				overlay
					? "border-transparent bg-transparent"
					: "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/70"
			)}
		>
			<nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
				<div className="flex items-center gap-5">
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
				<div className="hidden items-center gap-2 md:flex">
					<Button
						asChild
						className={cn(
							overlay &&
								"border-white/20 bg-white/8 text-white hover:border-white/34 hover:bg-white/14 hover:text-white"
						)}
						variant="outline"
					>
						<Link href={secondaryCtaLink.href}>{secondaryCtaLink.label}</Link>
					</Button>
					<Button
						asChild
						className={cn(overlay && "shadow-lg shadow-black/20")}
					>
						<Link href={primaryCtaLink.href}>{primaryCtaLink.label}</Link>
					</Button>
				</div>
				<MobileNav overlay={overlay} />
			</nav>
		</header>
	);
}
