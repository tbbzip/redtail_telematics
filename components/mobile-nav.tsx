"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Portal } from "@/components/ui/portal";
import { Button } from "@/components/ui/button";
import {
	companyLinks,
	companyMatchers,
	getStartedCtaLink,
	industryLinks,
	industryMatchers,
	pathnameMatchesAny,
	primaryCtaLink,
	resourceLinks,
	resourceMatchers,
	secondaryCtaLink,
	solutionFeaturedLinks,
	solutionLinks,
	solutionMatchers,
} from "@/components/nav-links";
import { LinkItem } from "@/components/sheard";
import {
	ArrowRightIcon,
	ChevronDownIcon,
	MenuIcon,
	PhoneIcon,
	XIcon,
} from "lucide-react";

type MobileSection = {
	id: string;
	label: string;
	items: React.ComponentProps<typeof LinkItem>[];
	matchers: readonly string[];
};

const mobileTextActionClassName =
	"relative inline-flex h-9 items-center justify-center gap-1.5 px-1 text-sm font-medium text-foreground/72 transition-colors after:absolute after:right-1 after:bottom-1 after:left-1 after:h-px after:origin-left after:scale-x-0 after:bg-rb-red after:transition-transform after:duration-300 after:ease-out hover:text-rb-red hover:after:scale-x-100 focus-visible:text-rb-red focus-visible:after:scale-x-100 focus-visible:outline-none";

const sections: MobileSection[] = [
	{
		id: "solutions",
		label: "Solutions",
		items: [...solutionLinks, ...solutionFeaturedLinks],
		matchers: solutionMatchers,
	},
	{
		id: "industries",
		label: "Industries",
		items: industryLinks,
		matchers: industryMatchers,
	},
	{
		id: "resources",
		label: "Resources",
		items: resourceLinks,
		matchers: resourceMatchers,
	},
	{
		id: "company",
		label: "Company",
		items: companyLinks,
		matchers: companyMatchers,
	},
];

function getActiveSection(pathname: string | null) {
	return (
		sections.find((section) => pathnameMatchesAny(pathname, section.matchers))
			?.id ?? null
	);
}

export function MobileNav({
	onOpenChange,
	overlay = false,
}: {
	onOpenChange?: (open: boolean) => void;
	overlay?: boolean;
}) {
	const pathname = usePathname();
	const [open, setOpen] = React.useState(false);
	const activeSection = React.useMemo(() => getActiveSection(pathname), [pathname]);
	const [expandedSection, setExpandedSection] = React.useState<string | null>(
		activeSection
	);

	const handleClose = React.useCallback(() => setOpen(false), []);

	React.useEffect(() => {
		onOpenChange?.(open);
	}, [onOpenChange, open]);

	React.useEffect(() => {
		setOpen(false);
	}, [pathname]);

	React.useEffect(() => {
		if (activeSection) {
			setExpandedSection(activeSection);
		}
	}, [activeSection]);

	return (
		<div className="lg:hidden">
			<Button
				aria-controls="mobile-menu"
				aria-expanded={open}
				aria-label="Toggle menu"
				className={cn(
					"lg:hidden",
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
					<div
						className={cn(
							"flex size-full flex-col overflow-hidden bg-background",
							"data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in"
						)}
						data-slot={open ? "open" : "closed"}
					>
						<div className="flex-1 overflow-y-auto px-4 pt-4 pb-8">
							<div className="mx-auto w-full max-w-md">
								<div className="divide-y divide-border/70">
									{sections.map((section, index) => {
										const expanded = expandedSection === section.id;
										const sectionActive = pathnameMatchesAny(
											pathname,
											section.matchers
										);

										return (
											<div
												className={cn(
													index === 0 && "border-t border-border/70"
												)}
												key={section.id}
											>
												<button
													aria-controls={`mobile-section-${section.id}`}
													aria-expanded={expanded}
													className={cn(
														"flex w-full items-center justify-between px-1 py-4 text-left text-base font-medium transition-colors",
														sectionActive
															? "text-rb-red"
															: "text-foreground/86"
													)}
													onClick={() =>
														setExpandedSection((current) =>
															current === section.id ? null : section.id
														)
													}
													type="button"
												>
													<span>{section.label}</span>
													<ChevronDownIcon
														className={cn(
															"size-4 transition-transform duration-200",
															expanded && "rotate-180"
														)}
													/>
												</button>
												<AnimatePresence initial={false}>
													{expanded ? (
														<motion.div
															animate={{ height: "auto", opacity: 1 }}
															className="overflow-hidden"
															exit={{ height: 0, opacity: 0 }}
															id={`mobile-section-${section.id}`}
															initial={{ height: 0, opacity: 0 }}
															transition={{
																duration: 0.22,
																ease: [0.22, 1, 0.36, 1],
															}}
														>
															<div className="grid gap-1 pb-4">
																{section.items.map((link) => (
																	<LinkItem
																		active={pathname === link.href}
																		className="px-2 py-2.5"
																		key={`${section.id}-${link.href}`}
																		onClick={handleClose}
																		{...link}
																	/>
																))}
															</div>
														</motion.div>
													) : null}
												</AnimatePresence>
											</div>
										);
									})}
								</div>
							</div>
						</div>
						<div className="border-t border-border/70 bg-background px-4 py-4">
							<div className="mx-auto grid w-full max-w-md gap-3">
								<div className="grid grid-cols-2 gap-2">
									<Link
										className={mobileTextActionClassName}
										href={secondaryCtaLink.href}
										onClick={handleClose}
									>
										{secondaryCtaLink.label}
									</Link>
									<Link
										className={mobileTextActionClassName}
										href={primaryCtaLink.href}
										onClick={handleClose}
									>
										<PhoneIcon className="size-4" />
										{primaryCtaLink.label}
									</Link>
								</div>
								<Button asChild className="w-full">
									<Link href={getStartedCtaLink.href} onClick={handleClose}>
										{getStartedCtaLink.label}
										<ArrowRightIcon />
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</Portal>
			)}
		</div>
	);
}
