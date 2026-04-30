"use client";

import {
	ArrowDown01Icon,
	ArrowRight01Icon,
	Call02Icon,
	Cancel01Icon,
	Menu01Icon,
} from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { HugeIcon } from "@/components/huge-icon";
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
import { Button } from "@/components/ui/button";
import { Portal } from "@/components/ui/portal";
import { cn } from "@/lib/utils";
import { type LinkItemType } from "@/components/sheard";

type MobileSection = {
	id: string;
	label: string;
	items: LinkItemType[];
	matchers: readonly string[];
};

const mobileTextActionClassName =
	"relative inline-flex h-9 items-center justify-center gap-1.5 px-1 text-sm font-medium text-rb-black/68 transition-colors after:absolute after:right-1 after:bottom-1 after:left-1 after:h-px after:origin-left after:scale-x-0 after:bg-rb-red after:transition-transform after:duration-300 after:ease-out hover:text-rb-red hover:after:scale-x-100 focus-visible:text-rb-red focus-visible:after:scale-x-100 focus-visible:outline-none";

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

function MobileMenuLink({
	active,
	index,
	item,
	onClick,
}: {
	active: boolean;
	index: number;
	item: LinkItemType;
	onClick: () => void;
}) {
	return (
		<motion.div
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -6 }}
			initial={{ opacity: 0, x: -8 }}
			transition={{
				delay: index * 0.035,
				duration: 0.22,
				ease: [0.22, 1, 0.36, 1],
			}}
		>
			<Link
				className={cn(
					"group/mobile-link relative flex items-center gap-3 rounded-xl px-2.5 py-3 text-rb-black transition-colors hover:text-rb-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rb-red/30",
					active && "text-rb-red"
				)}
				href={item.href}
				onClick={onClick}
			>
				<span
					aria-hidden="true"
					className={cn(
						"absolute top-3 bottom-3 left-0 w-0.5 rounded-full bg-rb-red opacity-0 transition-opacity",
						active && "opacity-100"
					)}
				/>
				<span
					className={cn(
						"flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-rb-black/58 shadow-sm ring-1 ring-black/8 transition-colors group-hover/mobile-link:text-rb-red",
						active && "text-rb-red ring-rb-red/22"
					)}
				>
					{item.icon}
				</span>
				<span className="min-w-0 flex-1">
					<span className="block text-[15px] font-semibold leading-5">
						{item.label}
					</span>
					{item.description ? (
						<span className="mt-0.5 line-clamp-1 block text-xs text-rb-black/48">
							{item.description}
						</span>
					) : null}
				</span>
			</Link>
		</motion.div>
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

	React.useEffect(() => {
		if (!open) return;

		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = originalOverflow;
		};
	}, [open]);

	return (
		<div className="lg:hidden">
			<Button
				aria-controls="mobile-menu"
				aria-expanded={open}
				aria-label="Toggle menu"
				className={cn(
					"lg:hidden",
					open && "border-rb-red/35 bg-white text-rb-red hover:bg-white",
					overlay &&
						!open &&
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
					<HugeIcon icon={Cancel01Icon} />
				</div>
				<div
					className={cn(
						"absolute transition-all",
						open ? "scale-0 opacity-0" : "scale-100 opacity-100"
					)}
				>
					<HugeIcon icon={Menu01Icon} />
				</div>
			</Button>
			{open && (
				<Portal className="top-14 z-[45] bg-[#fcfbf9]">
					<div
						className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#fcfbf9] data-[slot=open]:animate-in data-[slot=open]:fade-in-0 data-[slot=open]:slide-in-from-top-2 data-[slot=open]:duration-200"
						data-slot={open ? "open" : "closed"}
						id="mobile-menu"
					>
						<div className="flex-1 overflow-y-auto px-5 pt-4 pb-8">
							<div className="mx-auto w-full max-w-md">
								<div className="border-b border-black/10 pb-5">
									<p className="text-[11px] font-semibold tracking-[0.24em] text-rb-red uppercase">
										Redtail navigation
									</p>
									<p className="mt-2 max-w-xs text-sm leading-6 text-rb-black/58">
										Find telematics solutions, industries, resources, and
										company information.
									</p>
								</div>

								<div className="divide-y divide-black/10">
									{sections.map((section) => {
										const expanded = expandedSection === section.id;
										const sectionActive = pathnameMatchesAny(
											pathname,
											section.matchers
										);

										return (
											<div key={section.id}>
												<button
													aria-controls={`mobile-section-${section.id}`}
													aria-expanded={expanded}
													className={cn(
														"flex w-full items-center justify-between py-4 text-left text-base font-semibold transition-colors",
														sectionActive
															? "text-rb-red"
															: "text-rb-black/88"
													)}
													onClick={() =>
														setExpandedSection((current) =>
															current === section.id ? null : section.id
														)
													}
													type="button"
												>
													<span>{section.label}</span>
													<HugeIcon
														className={cn(
															"size-4 transition-transform duration-200",
															expanded && "rotate-180"
														)}
														icon={ArrowDown01Icon}
														size={16}
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
																duration: 0.24,
																ease: [0.22, 1, 0.36, 1],
															}}
														>
															<div className="grid gap-0.5 pb-4">
																{section.items.map((link, index) => (
																	<MobileMenuLink
																		active={pathname === link.href}
																		index={index}
																		item={link}
																		key={`${section.id}-${link.href}`}
																		onClick={handleClose}
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

						<div className="border-t border-black/10 bg-[#fcfbf9]/98 px-5 py-4 shadow-[0_-18px_50px_rgba(1,1,1,0.06)]">
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
										<HugeIcon className="size-4" icon={Call02Icon} size={16} />
										{primaryCtaLink.label}
									</Link>
								</div>
								<Button asChild className="w-full">
									<Link href={getStartedCtaLink.href} onClick={handleClose}>
										{getStartedCtaLink.label}
										<HugeIcon icon={ArrowRight01Icon} />
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
