"use client";

import { ArrowUpRightIcon, MessageSquareIcon, StarIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const testimonials = [
	{
		content:
			"Redtail helped us scale with flexible pricing, strong support, and measurable fuel savings as our fleet expanded.",
		company: "UCI Constructions",
		name: "Vince Zamora",
		role: "Fleet Manager",
	},
	{
		content:
			"Our long partnership continues to deliver profitable UBI operations, strong support, and constant innovation from device to incident insight.",
		company: "Admiral",
		name: "Paul Taylor",
		role: "Head of Telematics",
	},
	{
		content:
			"Redtail proved early that its technology could support usage-based insurance and evolve into broader fleet and connected vehicle programs.",
		company: "BT Enterprises",
		name: "Colin Shillito",
		role: "Head of Business Development",
	},
	{
		content:
			"The hardware, device management, and data services combine into a best-in-class telematics stack with strong technical support behind it.",
		company: "MyDrive Solutions",
		name: "David Kirby",
		role: "COO",
	},
	{
		content:
			"Redtail tracking gave us the visibility to recover a stolen truck quickly. The platform works exceptionally well for stolen vehicle tracking.",
		company: "Stringer Transports",
		name: "Bobby Stringer",
		role: "Owner",
	},
	{
		content:
			"The savings were immediate. Redtail gave us precise vehicle visibility, exposed misuse fast, and was simple to install and operate.",
		company: "AlphaStream Technologies",
		name: "Bryan Weaver",
		role: "Director",
	},
	{
		content:
			"Our pay-by-mile insurance model depends on reliable real-time mileage, and Redtail has been a flexible partner in delivering that foundation.",
		company: "By Miles",
		name: "Maddy Howlett",
		role: "CEO",
	},
	{
		content:
			"After 15 years in a demanding construction environment, Redtail devices and services have delivered outstanding reliability and support.",
		company: "J.M. Thompson Company",
		name: "Marty Thompson",
		role: "Customer",
	},
	{
		content:
			"Redtail has improved the efficiency, accountability, and security of our fleet operations with exceptional support and a complete platform.",
		company: "Illinois Attorney General's Office",
		name: "Kimberly Brauer",
		role: "Fleet operations",
	},
];

const stats = [
	{
		label: "Happy Client",
		value: "100+",
	},
	{
		label: "Revenue Added",
		value: "$250m",
	},
	{
		label: "Average Rating",
		value: "4.8",
	},
];

function getInitials(name: string) {
	return name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.slice(0, 2);
}

function TestimonialCard({
	testimonial,
}: {
	testimonial: (typeof testimonials)[number];
}) {
	return (
		<div className="h-full rounded-2xl border border-black/10 bg-white shadow-[0_18px_50px_rgba(1,1,1,0.1)]">
			<div className="flex items-center gap-3 border-b border-black/10 p-5 sm:p-6">
				<div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-rb-black text-xs font-semibold text-white">
					{getInitials(testimonial.name)}
				</div>
				<div className="min-w-0">
					<p className="truncate text-sm font-semibold text-rb-black sm:text-base">
						{testimonial.name}
					</p>
					<p className="truncate text-xs text-rb-black/58">
						{testimonial.role} at{" "}
						<span className="font-medium text-rb-black">
							{testimonial.company}
						</span>
					</p>
				</div>
			</div>
			<div className="p-5 sm:p-6">
				<div className="flex gap-1 text-rb-red">
					{Array.from({ length: 5 }).map((_, index) => (
						<StarIcon className="size-5 fill-current" key={index} />
					))}
				</div>
				<p className="mt-6 text-base leading-7 text-rb-black/62 sm:text-lg sm:leading-8">
					{testimonial.content}
				</p>
			</div>
		</div>
	);
}

export function TestimonialsSection() {
	const shouldReduceMotion = useReducedMotion();
	const [step, setStep] = useState(0);
	const frontIndex = Math.floor(step / 2) % testimonials.length;
	const backIndex = (frontIndex + 1) % testimonials.length;
	const isFlipped = step % 2 === 1;
	const deckShifted = step % 2 === 1;

	useEffect(() => {
		if (shouldReduceMotion) {
			return;
		}

		const interval = window.setInterval(() => {
			setStep((currentStep) => currentStep + 1);
		}, 4200);

		return () => window.clearInterval(interval);
	}, [shouldReduceMotion]);

	return (
		<section className="border-y border-black/10 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
					<div>
						<p className="inline-flex rounded-sm border border-black/12 px-2 py-1 text-xs font-medium text-rb-black">
							Testimonials
						</p>
						<div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:gap-12">
							<h2 className="text-3xl font-semibold tracking-tight text-rb-black sm:text-4xl lg:text-5xl">
								Trusted by clients around the globe.
							</h2>
							<p className="text-lg leading-8 text-rb-black/58 lg:pt-1">
								Redtail partners with fleets, insurers, OEMs, and connected
								vehicle teams that rely on accurate data to improve operations
								and scale telematics programs.
							</p>
						</div>

						<p className="mt-14 text-center text-lg leading-8 text-rb-black/58 sm:text-xl lg:text-left">
							Customer results across fleet visibility, UBI, theft recovery, and
							operational efficiency.
						</p>

						<div className="mt-8 grid grid-cols-3 divide-x divide-black/12">
							{stats.map((stat) => (
								<div className="px-3 text-center first:pl-0 last:pr-0" key={stat.label}>
									<p className="text-2xl font-semibold text-rb-black sm:text-3xl">
										{stat.value}
									</p>
									<p className="mt-2 text-xs text-rb-black/52 sm:text-sm">
										{stat.label}
									</p>
								</div>
							))}
						</div>

						<div className="mt-8 border-y border-black/10 py-8">
							<div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
								<Button
									asChild
									className="border-black/10 bg-white text-rb-black shadow-sm hover:border-rb-red/30 hover:bg-white hover:text-rb-red"
									size="lg"
									variant="outline"
								>
									<Link href="/contact-us">
										Let&apos;s talk
										<MessageSquareIcon className="size-4" />
									</Link>
								</Button>
								<Button
									asChild
									className="border-rb-black bg-rb-black text-white hover:border-rb-red hover:bg-rb-red"
									size="lg"
								>
									<Link href="/platform-and-apps">
										Get Started
										<span className="flex size-5 items-center justify-center rounded-md bg-white text-rb-black">
											<ArrowUpRightIcon className="size-3.5" />
										</span>
									</Link>
								</Button>
							</div>
						</div>
					</div>

					<div className="relative mx-auto w-full max-w-xl pt-10 lg:pt-16">
						<motion.div
							aria-hidden="true"
							animate={
								shouldReduceMotion
									? { opacity: 0.7 }
									: {
											opacity: deckShifted ? 0.56 : 0.72,
											rotate: deckShifted ? -1.8 : -0.4,
											scale: deckShifted ? 0.96 : 1,
											x: deckShifted ? -8 : 0,
											y: deckShifted ? 13 : 0,
										}
							}
							className="absolute top-2 left-[11%] h-56 w-[78%] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
							transition={{
								delay: 0.04,
								duration: 0.72,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							<div className="h-full bg-linear-to-b from-rb-red/[0.035] to-transparent" />
						</motion.div>
						<motion.div
							aria-hidden="true"
							animate={
								shouldReduceMotion
									? { opacity: 0.85 }
									: {
											opacity: deckShifted ? 0.82 : 0.68,
											rotate: deckShifted ? 0.8 : -1.2,
											scale: deckShifted ? 1 : 0.98,
											x: deckShifted ? 7 : 0,
											y: deckShifted ? -5 : 0,
										}
							}
							className="absolute top-7 left-[6%] h-56 w-[88%] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
							transition={{
								delay: 0.14,
								duration: 0.72,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							<div className="h-full bg-linear-to-b from-black/[0.025] to-transparent" />
						</motion.div>
						<motion.button
							animate={
								shouldReduceMotion
									? { y: 0 }
									: { y: deckShifted ? -2 : 0 }
							}
							aria-label="Show next testimonial"
							className="relative block h-[19rem] w-full cursor-pointer [perspective:1200px] sm:h-[20rem]"
							onClick={() => setStep((currentStep) => currentStep + 1)}
							transition={{
								delay: 0.2,
								duration: 0.65,
								ease: [0.22, 1, 0.36, 1],
							}}
							type="button"
						>
							<motion.div
								animate={shouldReduceMotion ? { rotateY: 0 } : { rotateY: isFlipped ? 180 : 0 }}
								className="relative h-full w-full"
								style={{ transformStyle: "preserve-3d" }}
								transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
							>
								<div
									className="absolute inset-0"
									style={{ backfaceVisibility: "hidden" }}
								>
									<TestimonialCard testimonial={testimonials[frontIndex]} />
								</div>
								<div
									className="absolute inset-0"
									style={{
										backfaceVisibility: "hidden",
										transform: "rotateY(180deg)",
									}}
								>
									<TestimonialCard testimonial={testimonials[backIndex]} />
								</div>
							</motion.div>
						</motion.button>
					</div>
				</div>
			</div>
		</section>
	);
}
