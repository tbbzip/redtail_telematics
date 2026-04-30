"use client";

import {
	ArrowUpRight01Icon,
	Message01Icon,
	StarIcon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";

import Stack from "@/components/Stack";
import { HugeIcon } from "@/components/huge-icon";
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
		label: "Devices shipped",
		value: "6M+",
	},
	{
		label: "Miles tracked",
		value: "30B+",
	},
	{
		label: "Years in telematics",
		value: "30+",
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
						<HugeIcon
							className="size-5 fill-current"
							icon={StarIcon}
							key={index}
							size={20}
							strokeWidth={2.15}
						/>
					))}
				</div>
				<p className="mt-6 text-base leading-7 text-rb-black/62 sm:text-lg sm:leading-8">
					{testimonial.content}
				</p>
			</div>
		</div>
	);
}

const testimonialCards = testimonials.map((testimonial) => (
	<TestimonialCard key={testimonial.name} testimonial={testimonial} />
));

export function TestimonialsSection() {
	return (
		<section className="border-y border-black/10 bg-white px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
					<div>
						<div className="grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:gap-12">
							<h2 className="text-[2rem] font-semibold leading-tight tracking-tight text-rb-black sm:text-4xl lg:text-5xl">
								Trusted by clients around the globe.
							</h2>
							<p className="text-base leading-7 text-rb-black/58 sm:text-lg sm:leading-8 lg:pt-1">
								Redtail partners with fleets, insurers, OEMs, and connected
								vehicle teams that rely on accurate data to improve operations
								and scale telematics programs.
							</p>
						</div>

						<p className="mt-8 text-center text-base leading-7 text-rb-black/58 sm:mt-14 sm:text-xl sm:leading-8 lg:text-left">
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

						<div className="mt-8 border-y border-black/10 py-6 sm:py-8">
							<div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
								<Button
									asChild
									className="border-black/10 bg-white text-rb-black shadow-sm hover:border-rb-red/30 hover:bg-white hover:text-rb-red"
									size="lg"
									variant="outline"
								>
									<Link href="/contact-us">
										Let&apos;s talk
										<HugeIcon className="size-4" icon={Message01Icon} size={16} />
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
											<HugeIcon
												className="size-3.5"
												icon={ArrowUpRight01Icon}
												size={14}
											/>
										</span>
									</Link>
								</Button>
							</div>
						</div>
					</div>

					<div className="relative mx-auto h-[20rem] w-full max-w-xl pt-6 sm:h-[21rem] lg:pt-16">
						<div className="h-[19rem] sm:h-[20rem]">
							<Stack
								animationConfig={{ stiffness: 240, damping: 24 }}
								autoplay
								autoplayDelay={3800}
								cards={testimonialCards}
								mobileClickOnly
								offsetX={12}
								offsetY={-12}
								pauseOnHover
								rotationStep={2.4}
								scaleStep={0.05}
								sendToBackOnClick
								sensitivity={160}
								visibleDepth={3}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
