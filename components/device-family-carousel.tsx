"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type DeviceSlide = {
	name: string;
	image: string;
	href: string;
};

const carouselOptions = {
	align: "start" as const,
	containScroll: "trimSnaps" as const,
	breakpoints: {
		"(prefers-reduced-motion: reduce)": { duration: 0 },
	},
};

const controlClassName =
	"static size-11 shrink-0 translate-y-0 border-white/32 bg-white/8 text-white hover:border-white/48 hover:bg-white/14 hover:text-white disabled:opacity-35";

export function DeviceFamilyCarousel({
	devices,
}: {
	devices: readonly DeviceSlide[];
}) {
	const [api, setApi] = useState<CarouselApi>();
	const instructionsId = useId();

	return (
		<Carousel
			aria-describedby={instructionsId}
			aria-label="Device family"
			className="min-w-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
			onKeyDown={(event) => {
				if (event.key === "Home") {
					event.preventDefault();
					api?.scrollTo(0);
				} else if (event.key === "End") {
					event.preventDefault();
					if (api) api.scrollTo(api.scrollSnapList().length - 1);
				}
			}}
			opts={carouselOptions}
			setApi={setApi}
			tabIndex={0}
		>
			<div className="mb-3 flex items-center justify-between gap-4">
				<div>
					<p className="text-xs font-semibold tracking-[0.22em] text-white/52 uppercase">
						Device family
					</p>
					<p className="mt-2 text-xs text-white/60">
						Swipe, drag or use the arrows
					</p>
				</div>
				<div className="flex items-center gap-2">
					<CarouselPrevious
						aria-label="Previous devices"
						className={controlClassName}
					/>
					<CarouselNext
						aria-label="Next devices"
						className={controlClassName}
					/>
				</div>
			</div>
			<p className="sr-only" id={instructionsId}>
				Use the left and right arrow keys to browse devices. Home shows the
				first device and End shows the last device.
			</p>
			<CarouselContent className="pt-1 pb-4 [touch-action:pan-y_pinch-zoom]">
				{devices.map((device, index) => (
					<CarouselItem
						aria-label={`${index + 1} of ${devices.length}`}
						className="basis-[17.5rem] sm:basis-[19rem]"
						key={device.name}
					>
						<Link
							aria-label={`${device.name} specifications`}
							className={cn(
								"group relative flex h-full min-h-[18rem] flex-col justify-between overflow-hidden rounded-2xl border border-white/14 bg-white/[0.075] p-4 text-white shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-md transition duration-300 hover:border-rb-red/55 hover:bg-white/[0.11] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset focus-visible:outline-none motion-safe:hover:-translate-y-1 motion-reduce:transition-none",
								index === 0 && "border-rb-red/44 bg-rb-red/12"
							)}
							draggable={false}
							href={device.href}
						>
							<div className="flex items-start justify-between gap-4">
								<div>
									<p className="text-[11px] font-semibold tracking-[0.2em] text-white/44 uppercase">
										Device {String(index + 1).padStart(2, "0")}
									</p>
									<h3 className="mt-2 text-xl font-semibold leading-tight text-white">
										{device.name}
									</h3>
								</div>
								<span className="rounded-full border border-white/14 px-3 py-1 text-xs font-semibold text-white/68">
									See Specs
								</span>
							</div>
							<div className="relative mx-auto mt-5 aspect-square w-full max-w-[13rem]">
								<Image
									alt={device.name}
									className="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)] transition duration-300 motion-safe:group-hover:scale-105 motion-reduce:transition-none"
									draggable={false}
									fill
									sizes="220px"
									src={device.image}
								/>
							</div>
						</Link>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
