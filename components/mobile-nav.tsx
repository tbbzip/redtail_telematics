import Link from "next/link";
import { cn } from "@/lib/utils";
import React from "react";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { Button } from "@/components/ui/button";
import {
	companyLinks,
	industryLinks,
	primaryCtaLink,
	resourceLinks,
	secondaryCtaLink,
	solutionFeaturedLinks,
	solutionLinks,
	topLevelLink,
} from "@/components/nav-links";
import { LinkItem } from "@/components/sheard";
import { XIcon, MenuIcon } from "lucide-react";

export function MobileNav({ overlay = false }: { overlay?: boolean }) {
	const [open, setOpen] = React.useState(false);

	const handleClose = React.useCallback(() => setOpen(false), []);

	return (
		<div className="md:hidden">
			<Button
				aria-controls="mobile-menu"
				aria-expanded={open}
				aria-label="Toggle menu"
				className={cn(
					"md:hidden",
					overlay &&
						"border-white/20 bg-white/8 text-white hover:border-white/34 hover:bg-white/14 hover:text-white"
				)}
				onClick={() => setOpen(!open)}
				size="icon"
				variant="outline"
			>
				<div
					className={cn(
						"transition-all",
						open ? "scale-100 opacity-100" : "scale-0 opacity-0"
					)}
				>
					<XIcon />
				</div>
				<div
					className={cn(
						"absolute transition-all",
						open ? "scale-0 opacity-0" : "scale-100 opacity-100"
					)}
				>
					<MenuIcon />
				</div>
			</Button>
			{open && (
				<Portal className="top-14">
					<PortalBackdrop />
					<div
						className={cn(
							"size-full overflow-y-auto p-4",
							"data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in"
						)}
						data-slot={open ? "open" : "closed"}
					>
						<div className="flex w-full flex-col gap-y-5">
							<Link
								className="rounded-2xl border bg-background px-4 py-3 text-sm font-medium"
								href={topLevelLink.href}
								onClick={handleClose}
							>
								{topLevelLink.label}
							</Link>
							<div className="flex flex-col gap-y-2">
								<span className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
									Solutions
								</span>
								{[...solutionLinks, ...solutionFeaturedLinks].map((link) => (
									<LinkItem
										className="rounded-2xl p-2 active:bg-muted dark:active:bg-muted/50"
										key={`solution-${link.label}`}
										onClick={handleClose}
										{...link}
									/>
								))}
							</div>
							<div className="flex flex-col gap-y-2">
								<span className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
									Industries
								</span>
								{industryLinks.map((link) => (
									<LinkItem
										className="rounded-2xl p-2 active:bg-muted dark:active:bg-muted/50"
										key={`industry-${link.label}`}
										onClick={handleClose}
										{...link}
									/>
								))}
							</div>
							<div className="flex flex-col gap-y-2">
								<span className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
									Resources
								</span>
								{resourceLinks.map((link) => (
									<LinkItem
										className="rounded-2xl p-2 active:bg-muted dark:active:bg-muted/50"
										key={`resource-${link.label}`}
										onClick={handleClose}
										{...link}
									/>
								))}
							</div>
							<div className="flex flex-col gap-y-2">
								<span className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
									Company
								</span>
								{companyLinks.map((link) => (
									<LinkItem
										className="rounded-2xl p-2 active:bg-muted dark:active:bg-muted/50"
										key={`company-${link.label}`}
										onClick={handleClose}
										{...link}
									/>
								))}
							</div>
						</div>
						<div className="mt-5 flex flex-col gap-2">
							<Button asChild className="w-full" variant="outline">
								<Link href={secondaryCtaLink.href} onClick={handleClose}>
									{secondaryCtaLink.label}
								</Link>
							</Button>
							<Button asChild className="w-full">
								<Link href={primaryCtaLink.href} onClick={handleClose}>
									{primaryCtaLink.label}
								</Link>
							</Button>
						</div>
					</div>
				</Portal>
			)}
		</div>
	);
}
