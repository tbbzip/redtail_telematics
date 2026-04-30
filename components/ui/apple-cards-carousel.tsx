"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import type { ImageProps } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import {
	ArrowLeft01Icon,
	ArrowRight01Icon,
	Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "motion/react";

import { HugeIcon } from "@/components/huge-icon";
import { Button } from "@/components/ui/button";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";

interface CarouselProps {
	items: React.ReactElement[];
	initialScroll?: number;
}

type CardType = {
	src: string;
	title: string;
	category: string;
	content: React.ReactNode;
	summary?: string;
	ctaHref?: string;
	ctaLabel?: string;
};

export const CarouselContext = createContext<{
	onCardClose: (index: number) => void;
	currentIndex: number;
}>({
	onCardClose: () => {},
	currentIndex: 0,
});

export function Carousel({ items, initialScroll = 0 }: CarouselProps) {
	const carouselRef = useRef<HTMLDivElement>(null);
	const rafRef = useRef<number | null>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);

	const getAlignmentOffset = useCallback(() => {
		if (typeof window === "undefined") return 40;
		if (window.innerWidth < 640) return 16;
		if (window.innerWidth < 768) return 24;
		return 40;
	}, []);

	const updateCurrentIndex = useCallback(() => {
		const container = carouselRef.current;

		if (!container) return;

		const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);

		if (container.scrollLeft <= 2) {
			setCurrentIndex(0);
			return;
		}

		if (container.scrollLeft >= maxScroll - 2) {
			setCurrentIndex(items.length - 1);
			return;
		}

		const cards = Array.from(
			container.querySelectorAll<HTMLElement>("[data-carousel-card]")
		);

		if (!cards.length) return;

		const containerRect = container.getBoundingClientRect();
		const targetLeft = containerRect.left + getAlignmentOffset();
		let closestIndex = 0;
		let closestDistance = Number.POSITIVE_INFINITY;

		cards.forEach((card, index) => {
			const cardRect = card.getBoundingClientRect();
			const distance = Math.abs(cardRect.left - targetLeft);

			if (distance < closestDistance) {
				closestDistance = distance;
				closestIndex = index;
			}
		});

		setCurrentIndex(closestIndex);
	}, [getAlignmentOffset, items.length]);

	const updateScrollState = useCallback(() => {
		if (!carouselRef.current) return;
		if (rafRef.current) cancelAnimationFrame(rafRef.current);

		rafRef.current = window.requestAnimationFrame(() => {
			const container = carouselRef.current;

			if (!container) return;

			const { scrollLeft, scrollWidth, clientWidth } = container;
			const maxScroll = Math.max(0, scrollWidth - clientWidth);

			setCanScrollLeft(scrollLeft > 2);
			setCanScrollRight(scrollLeft < maxScroll - 2);
			updateCurrentIndex();
		});
	}, [updateCurrentIndex]);

	useEffect(() => {
		if (carouselRef.current) {
			carouselRef.current.scrollLeft = initialScroll;
			updateScrollState();
		}

		window.addEventListener("resize", updateScrollState);

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			window.removeEventListener("resize", updateScrollState);
		};
	}, [initialScroll, updateScrollState]);

	const scrollToCard = useCallback((index: number) => {
		const container = carouselRef.current;

		if (!container) return;

		const cards = Array.from(
			container.querySelectorAll<HTMLElement>("[data-carousel-card]")
		);
		const card = cards[index];

		if (!card) return;

		const containerRect = container.getBoundingClientRect();
		const cardRect = card.getBoundingClientRect();
		const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
		const left =
			cardRect.left -
			containerRect.left +
			container.scrollLeft -
			getAlignmentOffset();

		container.scrollTo({
			behavior: "smooth",
			left: Math.max(0, Math.min(left, maxScroll)),
		});
		setCurrentIndex(index);
	}, [getAlignmentOffset]);

	const scrollLeft = () => {
		scrollToCard(Math.max(currentIndex - 1, 0));
	};

	const scrollRight = () => {
		scrollToCard(Math.min(currentIndex + 1, items.length - 1));
	};

	const handleCardClose = (index: number) => {
		scrollToCard(index);
	};

	return (
		<CarouselContext.Provider
			value={{ currentIndex, onCardClose: handleCardClose }}
		>
			<div className="relative w-full">
				<div
					className="carousel-scroll flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth py-7 [scrollbar-width:none] sm:py-10 md:py-16 [&::-webkit-scrollbar]:hidden"
					onScroll={updateScrollState}
					ref={carouselRef}
				>
					<div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-12 bg-linear-to-r from-white to-transparent sm:block" />
					<div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-12 bg-linear-to-l from-white to-transparent sm:block" />
					<div className="mx-auto flex flex-row justify-start gap-4 px-4 sm:gap-5 sm:px-6 md:gap-6 md:px-10">
						{items.map((item, index) => (
							<motion.div
								animate={{
									opacity: 1,
									transition: {
										delay: 0.08 * index,
										duration: 0.5,
										ease: "easeOut",
									},
									y: 0,
								}}
								className="snap-center last:pr-6 md:last:pr-16"
								data-carousel-card
								initial={{
									opacity: 0,
									y: 20,
								}}
								key={`card-${index}`}
							>
								{item}
							</motion.div>
						))}
					</div>
				</div>

				<div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
					<div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
						{items.map((_, index) => (
							<button
								aria-label={`Go to card ${index + 1}`}
								className={cn(
									"h-1.5 shrink-0 rounded-full transition-all",
									index === currentIndex ? "w-8 bg-rb-red" : "w-3 bg-gray-200"
								)}
								key={`dot-${index}`}
								onClick={() => scrollToCard(index)}
								type="button"
							/>
						))}
					</div>
					<div className="flex shrink-0 items-center gap-2">
						<button
							aria-label="Scroll left"
							className="relative z-40 flex size-9 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 disabled:opacity-50 sm:size-10"
							disabled={!canScrollLeft}
							onClick={scrollLeft}
							type="button"
						>
							<HugeIcon
								className="size-5 text-gray-500"
								icon={ArrowLeft01Icon}
								size={20}
							/>
						</button>

						<button
							aria-label="Scroll right"
							className="relative z-40 flex size-9 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 disabled:opacity-50 sm:size-10"
							disabled={!canScrollRight}
							onClick={scrollRight}
							type="button"
						>
							<HugeIcon
								className="size-5 text-gray-500"
								icon={ArrowRight01Icon}
								size={20}
							/>
						</button>
					</div>
				</div>
			</div>
		</CarouselContext.Provider>
	);
}

export function Card({
	card,
	index,
	layout = false,
}: {
	card: CardType;
	index: number;
	layout?: boolean;
}) {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const { onCardClose } = useContext(CarouselContext);

	const handleClose = useCallback(() => {
		setOpen(false);
		onCardClose(index);
	}, [index, onCardClose]);

	const handleOpen = useCallback(() => {
		setOpen(true);
	}, []);

	useOutsideClick(containerRef, handleClose);

	useEffect(() => {
		const originalOverflow = document.body.style.overflow;

		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				handleClose();
			}
		}

		if (open) {
			document.body.style.overflow = "hidden";
			window.addEventListener("keydown", onKeyDown);
		}

		return () => {
			document.body.style.overflow = originalOverflow;
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [open, handleClose]);

	return (
		<>
			{typeof document !== "undefined"
				? createPortal(
						<AnimatePresence>
							{open ? (
								<div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/5 px-2 py-3 sm:px-0 sm:py-0">
									<motion.div
										animate={{ opacity: 1 }}
										className="fixed inset-0 size-full bg-black/70 backdrop-blur-xl"
										exit={{ opacity: 0 }}
										initial={{ opacity: 0 }}
										onClick={handleClose}
									/>
									<motion.div
										className="relative z-[60] mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-[#f7f5f2] font-sans shadow-[0_30px_90px_rgba(0,0,0,0.5)] sm:my-10 sm:w-[calc(100%-2rem)] sm:rounded-2xl"
										layoutId={layout ? `card-${card.title}` : undefined}
										ref={containerRef}
									>
										<button
											aria-label="Close"
											className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-lg bg-white text-rb-black shadow-sm transition hover:bg-rb-red hover:text-white sm:top-4 sm:right-4"
											onClick={handleClose}
											type="button"
										>
											<HugeIcon className="size-5" icon={Cancel01Icon} size={20} />
										</button>
										<div className="relative h-60 w-full sm:h-72 md:h-[22rem]">
											<BlurImage
												alt={card.title}
												className="object-cover"
												fill
												sizes="(max-width: 768px) 100vw, 900px"
												src={card.src}
											/>
											<div className="absolute inset-0 bg-linear-to-t from-black/88 via-black/44 to-black/10" />
											<div className="absolute right-5 bottom-5 left-5 sm:right-6 sm:bottom-6 sm:left-6">
												<motion.p
													className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.24em] text-white/78 uppercase"
													layoutId={
														layout ? `category-${card.title}` : undefined
													}
												>
													<span
														aria-hidden="true"
														className="h-px w-8 bg-rb-red"
													/>
													{card.category}
												</motion.p>
												<motion.p
													className="mt-4 max-w-3xl text-2xl leading-tight font-semibold text-white sm:text-3xl md:text-5xl"
													layoutId={layout ? `title-${card.title}` : undefined}
												>
													{card.title}
												</motion.p>
												{card.summary ? (
													<p className="mt-3 line-clamp-3 max-w-2xl text-sm leading-6 text-white/78 sm:line-clamp-none md:text-base">
														{card.summary}
													</p>
												) : null}
											</div>
										</div>
										<div className="border-t border-black/10 bg-[#f7f5f2] text-rb-black">
											<div className="mx-auto max-w-4xl [&_a]:font-semibold [&_a]:text-rb-red [&_a]:underline-offset-4 [&_a:hover]:underline [&_h2]:!text-rb-black [&_h3]:!text-rb-red [&_li]:pl-1 [&_li]:marker:text-rb-red [&_li+li]:mt-2 [&_strong]:font-semibold [&_strong]:text-rb-black">
												{card.content}
											</div>
											<div className="border-t border-black/10 bg-rb-black px-5 py-6 text-white sm:px-8 md:px-10">
												<div className="mx-auto flex max-w-4xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
													<div>
														<p className="text-[11px] font-semibold tracking-[0.24em] text-rb-red uppercase">
															Next step
														</p>
														<p className="mt-2 max-w-xl text-xl leading-snug font-semibold sm:text-2xl">
															See how Redtail can support this program in your
															operation.
														</p>
													</div>
													<Button
														asChild
														className="group w-full shadow-[0_14px_32px_rgba(220,17,26,0.25)] sm:w-auto"
														size="lg"
													>
														<Link
															href={card.ctaHref ?? "/contact-us"}
															onClick={handleClose}
														>
															{card.ctaLabel ?? "Request a demo"}
															<HugeIcon
																className="size-4 transition-transform duration-300 group-hover:translate-x-1"
																icon={ArrowRight01Icon}
																size={16}
															/>
														</Link>
													</Button>
												</div>
											</div>
										</div>
									</motion.div>
								</div>
							) : null}
						</AnimatePresence>,
						document.body
					)
				: null}

			<motion.button
				className="group relative flex h-[28rem] w-[82vw] max-w-[20rem] flex-col items-start justify-end overflow-hidden rounded-[1.25rem] border border-black/10 bg-neutral-900 shadow-[0_22px_70px_rgba(15,23,42,0.24)] sm:w-[20rem] md:h-[32rem] md:w-[22rem]"
				layoutId={layout ? `card-${card.title}` : undefined}
				onClick={handleOpen}
				transition={{ duration: 0.25, ease: "easeOut" }}
				type="button"
				whileHover={{ y: -6 }}
			>
				<div className="absolute inset-0 z-20 bg-linear-to-b from-black/28 via-black/20 to-black/88" />
				<div className="absolute inset-x-0 bottom-0 z-20 h-2/3 bg-linear-to-t from-black via-black/65 to-transparent" />
				<div className="relative z-30 flex h-full flex-col justify-between p-5 text-left sm:p-6">
					<motion.span
						className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.26em] text-white/82 uppercase"
						layoutId={layout ? `category-${card.title}` : undefined}
					>
						<span aria-hidden="true" className="h-px w-8 bg-rb-red" />
						{card.category}
					</motion.span>
					<div>
						<motion.h3
							className="text-xl leading-tight font-semibold text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)] md:text-2xl"
							layoutId={layout ? `title-${card.title}` : undefined}
						>
							{card.title}
						</motion.h3>
						{card.summary ? (
							<p className="mt-3 line-clamp-3 text-sm leading-6 text-white/86 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
								{card.summary}
							</p>
						) : null}
					</div>
					<div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/88 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
						<span className="relative after:absolute after:right-0 after:-bottom-1 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-rb-red after:transition-transform after:duration-300 group-hover:after:scale-x-100">
							Explore
						</span>
						<HugeIcon
							className="size-4 transition-transform duration-300 group-hover:translate-x-1"
							icon={ArrowRight01Icon}
							size={16}
						/>
					</div>
				</div>
				<BlurImage
					alt={card.title}
					className="absolute inset-0 z-10 object-cover transition duration-500 group-hover:scale-[1.03]"
					fill
					sizes="(max-width: 640px) 82vw, (max-width: 768px) 20rem, 22rem"
					src={card.src}
				/>
			</motion.button>
		</>
	);
}

export function BlurImage({ src, className, alt, ...rest }: ImageProps) {
	const [isLoading, setLoading] = useState(true);
	const [imageSrc, setImageSrc] = useState(src);

	return (
		<Image
			alt={alt || "Image"}
			className={cn(
				"transition duration-300",
				isLoading ? "blur-sm" : "blur-0",
				className
			)}
			onError={() => setImageSrc("/careers-building.jpg")}
			onLoad={() => setLoading(false)}
			src={imageSrc}
			{...rest}
		/>
	);
}
