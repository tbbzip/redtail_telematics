import Image from "next/image";
import { QuoteUpIcon, StarIcon } from "@hugeicons/core-free-icons";

import { HugeIcon } from "@/components/huge-icon";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const testimonials = [
	{
		name: "Paul Taylor",
		title: "Head of Telematics at Admiral",
		company: "Admiral",
		quote:
			"Our ten-year partnership with Redtail Telematics remains highly productive and collaborative. From device to Crash Portal and incident classification, Redtail continues to offer us a one-stop-shop for advanced telematics solutions.",
		featured: true,
	},
	{
		name: "Vince Zamora",
		title: "Fleet Manager at UCI Constructions",
		company: "UCI Constructions",
		quote:
			"Redtail customer service and technical support have been great, and the pricing flexibility of the service plans helped us achieve fuel savings as our fleet expanded.",
	},
	{
		name: "Colin Shillito",
		title: "Head of Business Development at BT Enterprises",
		company: "BT Enterprises",
		quote:
			"Redtail products and services have proved insightful and robust, evolving with markets as diverse as vehicle tracking, fleet management, and connected vehicle monetisation.",
	},
	{
		name: "David Kirby",
		title: "COO at MyDrive Solutions",
		company: "MyDrive Solutions",
		quote:
			"The Redtail hardware combines sensitivity, accuracy, and commercial performance in a small outline, with excellent technical documentation and support.",
	},
	{
		name: "Bobby Stringer",
		title: "Owner at Stringer Transports",
		company: "Stringer Transports",
		quote:
			"The Redtail GPS tracking works really well for stolen vehicle tracking. We could track the truck route and stops around Oklahoma City and recover it quickly.",
	},
	{
		name: "Bryan Weaver",
		title: "Director of AlphaStream Technologies",
		company: "AlphaStream Technologies",
		quote:
			"I saved enough in the first week to pay for the tracker and service. It is user-friendly, easy to install, and precise enough to show both addresses at a job site.",
	},
	{
		name: "Maddy Howlett",
		title: "CEO of By Miles",
		company: "By Miles",
		quote:
			"By Miles' pay-by-mile car insurance would not be possible without real-time mileage measurement. Redtail provides a simple, flexible, and timely solution.",
	},
	{
		name: "Marty Thompson",
		title: "J.M. Thompson Company",
		company: "J.M. Thompson Company",
		quote:
			"We have used Redtail devices, back-end services, and apps for 15 years on our construction fleet, and they have achieved astonishing reliability.",
	},
	{
		name: "Kimberly Brauer",
		title: "Illinois Attorney General's Office",
		company: "Illinois Attorney General's Office",
		quote:
			"Redtail GPS tracking devices enhance the efficiency, accountability, and security of our fleet operations, with exceptional support for our specific needs.",
	},
];

const trustedBrandLogos = [
	{
		src: "/clients/t-mobile.svg",
		alt: "T-Mobile",
		width: 144,
		height: 36,
	},
	{
		src: "/clients/ford.svg",
		alt: "Ford",
		width: 118,
		height: 36,
	},
	{
		src: "/clients/jaguar.svg",
		alt: "Jaguar",
		width: 88,
		height: 36,
	},
	{
		src: "/clients/lr.svg",
		alt: "Land Rover",
		width: 118,
		height: 36,
	},
	{
		src: "/clients/fujitsu.svg",
		alt: "Fujitsu",
		width: 128,
		height: 36,
	},
	{
		src: "/clients/admiral.svg",
		alt: "Admiral",
		width: 136,
		height: 36,
	},
	{
		src: "/clients/tracker.svg",
		alt: "Tracker",
		width: 124,
		height: 36,
	},
	{
		src: "/clients/calamp-vector-logo.svg",
		alt: "CalAmp",
		width: 132,
		height: 36,
	},
	{
		src: "/clients/by-miles.svg",
		alt: "By Miles",
		width: 126,
		height: 36,
	},
	{
		src: "/clients/JMT-logo.png",
		alt: "JM Thompson Company",
		width: 132,
		height: 36,
	},
	{
		src: "/clients/agi.svg",
		alt: "Illinois Attorney General's Office",
		width: 64,
		height: 36,
	},
];

function getInitials(name: string) {
	return name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.slice(0, 2);
}

function StarRating() {
	return (
		<div className="flex gap-1 text-rb-red">
			{Array.from({ length: 5 }).map((_, index) => (
				<HugeIcon
					className="size-4 fill-current"
					icon={StarIcon}
					key={index}
					size={16}
					strokeWidth={2.15}
				/>
			))}
		</div>
	);
}

function TestimonialCard({
	testimonial,
}: {
	testimonial: (typeof testimonials)[number];
}) {
	return (
		<Card className="border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0">
			<CardHeader className="gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
				<div className="flex items-center gap-3">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-rb-black text-xs font-semibold text-white">
						{getInitials(testimonial.name)}
					</div>
					<div className="min-w-0">
						<CardTitle className="truncate text-base font-semibold text-rb-black">
							{testimonial.name}
						</CardTitle>
						<CardDescription className="truncate text-xs text-rb-black/54">
							{testimonial.title}
						</CardDescription>
					</div>
				</div>
				<StarRating />
			</CardHeader>
			<CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
				<p className="text-sm leading-6 text-rb-black/62">
					&quot;{testimonial.quote}&quot;
				</p>
			</CardContent>
		</Card>
	);
}

function LogoStrip() {
	return (
		<div className="mt-12 border-y border-black/10 py-6">
			<div className="grid gap-5 lg:grid-cols-[15rem_1fr] lg:items-center">
				<p className="text-xs font-semibold tracking-[0.24em] text-rb-black/42 uppercase">
					Trusted by leading brands
				</p>
				<div className="mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] overflow-hidden">
					<InfiniteSlider gap={46} speed={24} speedOnHover={13}>
						{trustedBrandLogos.map((logo) => (
							<div
								className="flex min-w-[124px] items-center justify-center"
								key={logo.alt}
							>
								<Image
									alt={logo.alt}
									className="h-6 w-auto object-contain opacity-58 grayscale transition duration-300 hover:opacity-95"
									height={logo.height}
									src={logo.src}
									unoptimized
									width={logo.width}
								/>
							</div>
						))}
					</InfiniteSlider>
				</div>
			</div>
		</div>
	);
}

export function WhiteLabelTestimonialsSection() {
	const featuredTestimonial =
		testimonials.find((testimonial) => testimonial.featured) ?? testimonials[0];
	const supportingTestimonials = testimonials.filter(
		(testimonial) => testimonial.name !== featuredTestimonial.name
	);

	return (
		<section className="border-b border-black/10 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<header className="grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
					<div>
						<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
							Testimonials
						</p>
						<h2 className="mt-4 text-[2.35rem] font-semibold leading-tight tracking-tight text-rb-black sm:text-5xl">
							Proof from teams who rely on Redtail
						</h2>
					</div>
					<p className="max-w-3xl text-base leading-7 text-rb-black/60 sm:text-lg sm:leading-8 lg:justify-self-end">
						From UBI innovators to fleet operators, customers choose Redtail for
						accuracy, reliability, and support that keeps operations moving.
					</p>
				</header>

				<div className="mt-10 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
					<Card className="border-black/10 bg-rb-black py-0 text-white shadow-[0_24px_70px_rgba(1,1,1,0.16)] ring-0">
						<CardHeader className="px-6 pt-6 sm:px-7 sm:pt-7">
							<div className="flex items-start justify-between gap-4">
								<div className="flex size-12 items-center justify-center rounded-xl bg-rb-red text-white">
									<HugeIcon icon={QuoteUpIcon} size={22} />
								</div>
								<Badge className="bg-white/10 text-white" variant="secondary">
									Featured
								</Badge>
							</div>
							<CardTitle className="mt-5 text-2xl font-semibold leading-tight text-white sm:text-3xl">
								{featuredTestimonial.company}
							</CardTitle>
							<CardDescription className="text-sm text-white/50">
								{featuredTestimonial.name} - {featuredTestimonial.title}
							</CardDescription>
						</CardHeader>
						<CardContent className="px-6 pb-6 sm:px-7 sm:pb-7">
							<StarRating />
							<p className="mt-6 text-base leading-8 text-white/72 sm:text-lg sm:leading-9">
								&quot;{featuredTestimonial.quote}&quot;
							</p>
						</CardContent>
					</Card>

					<div className="grid gap-4 sm:grid-cols-2">
						{supportingTestimonials.map((testimonial) => (
							<TestimonialCard
								key={testimonial.name}
								testimonial={testimonial}
							/>
						))}
					</div>
				</div>

				<LogoStrip />
			</div>
		</section>
	);
}
