"use client";

import { ArrowDown01Icon, MessageQuestionIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useState } from "react";

import { HugeIcon } from "@/components/huge-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FaqItem = {
	question: string;
	answer: string;
};

const faqItems: FaqItem[] = [
	{
		question: "What is telematics, and how can it benefit my business?",
		answer:
			"Telematics refers to the integration of telecommunications and informatics to provide real-time data on the performance, location, and status of vehicles and assets. Redtail Telematics offers advanced telematics solutions that empower businesses to optimize fleet operations, reduce operational costs, enhance driver safety, and improve overall efficiency.",
	},
	{
		question: "Can my telematics solution be customized to suit my fleet?",
		answer:
			"Yes. We understand that every fleet has unique operational requirements, which is why our telematics solutions are highly customizable. Our team can tailor features such as data reporting, integration with existing software, and specialized analytics to match your specific needs. Whether you have a small local fleet or a large multi-regional operation, we work closely with you to ensure the solution meets your performance, efficiency, and budget goals. Additional customization may involve added costs, but our flexible approach ensures that you only pay for the features you truly need.",
	},
	{
		question: "How can Redtail Telematics help reduce operational costs?",
		answer:
			"Redtail Telematics provides comprehensive data on vehicle performance, driver behavior, and best practices. By analyzing this data, you can identify inefficiencies, schedule proactive maintenance to prevent costly breakdowns, optimize routes to reduce fuel usage, and encourage safer driving habits - all of which contribute to lowering your operational expenses.",
	},
	{
		question: "How do I set up Redtail Telematics devices on my fleet vehicles?",
		answer:
			"Setting up Redtail Telematics devices is straightforward. Our devices are designed for easy installation, either through a plug-and-play mechanism or professional installation for more advanced systems. Once installed, you'll activate the devices via our user-friendly platform, and you'll start receiving real-time data immediately.",
	},
	{
		question: "Can Redtail Telematics improve the security of my vehicles and assets?",
		answer:
			"Absolutely. Our telematics solutions offer real-time GPS tracking and geofencing capabilities. You can monitor the exact location of your vehicles and assets, receive instant alerts for unauthorized movements, and quickly recover stolen property. Geofencing allows you to set virtual boundaries, triggering alerts if assets move outside designated areas.",
	},
	{
		question: "How does Redtail Telematics enhance fleet efficiency?",
		answer:
			"By providing real-time insights into vehicle locations, driver behaviors, and route efficiencies, Redtail Telematics helps you make informed decisions to optimize your fleet operations. You can reduce idle times, improve dispatching, optimize routes, and enhance communication between drivers and management, leading to increased productivity and efficiency.",
	},
	{
		question: "What type of data can I track with Redtail Telematics solutions?",
		answer:
			"Our solutions enable you to track a wide range of data, including real-time vehicle location, speed, engine diagnostics, driver behavior such as harsh braking or acceleration, and more. This data is critical for managing fleet performance, scheduling maintenance, and improving safety protocols.",
	},
	{
		question: "Can using Redtail Telematics help reduce my insurance premiums?",
		answer:
			"Yes, many insurance providers offer discounts for fleets equipped with telematics systems. By demonstrating improved driver behavior, enhanced vehicle security, and reduced risk of accidents through our telematics data, you may qualify for lower insurance premiums.",
	},
	{
		question: "How do I access the telematics data provided by Redtail?",
		answer:
			"You can access your telematics data through our intuitive web-based dashboard or mobile app. These platforms provide real-time updates, customizable reports, and alerts, allowing you to monitor and manage your fleet from anywhere at any time.",
	},
	{
		question: "How can Redtail Telematics assist with maintenance scheduling?",
		answer:
			"Our telematics devices monitor engine health and vehicle performance indicators in real-time. By analyzing this data, you can schedule maintenance proactively based on actual vehicle condition rather than just time or mileage intervals, preventing unexpected breakdowns, reducing downtime, and extending the lifespan of your assets.",
	},
	{
		question: "What kind of customer support does Redtail Telematics offer?",
		answer:
			"Redtail Telematics is dedicated to providing exceptional customer support. Our experienced team is available to assist you with device installation, platform setup, training, and any technical issues you may encounter. Support is available via phone and email during regular business hours, with additional resources accessible through our online help center.",
	},
];

export function FaqSection() {
	const [openQuestion, setOpenQuestion] = useState(0);

	return (
		<section className="border-y border-black/10 bg-white px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<header className="max-w-3xl">
					<p className="text-xs font-semibold uppercase tracking-[0.24em] text-rb-red">
						FAQ
					</p>
					<h2 className="mt-4 text-[2rem] font-semibold leading-tight tracking-tight text-rb-black sm:text-4xl lg:text-5xl">
						Common Questions You Might Have
					</h2>
					<p className="mt-4 max-w-2xl text-base leading-7 text-rb-black/58 sm:text-lg">
						Quick answers about Redtail telematics, fleet operations, device
						deployment, data access, and support.
					</p>
				</header>

				<div className="mt-9 grid gap-7 lg:mt-16 lg:grid-cols-[1fr_23rem] lg:items-start xl:grid-cols-[1fr_25rem]">
					<div className="overflow-hidden rounded-xl border border-black/12 bg-white">
						{faqItems.map((item, index) => {
							const isOpen = openQuestion === index;

							return (
								<div className="border-b border-black/10 last:border-b-0" key={item.question}>
									<button
										aria-expanded={isOpen}
										className={cn(
											"group flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition sm:px-6",
											isOpen ? "bg-white shadow-[inset_0_0_0_2px_rgba(1,1,1,0.16)]" : "hover:bg-black/[0.02]"
										)}
										onClick={() => setOpenQuestion(isOpen ? -1 : index)}
										type="button"
									>
										<span className="text-sm font-semibold leading-6 text-rb-black sm:text-base">
											{item.question}
										</span>
										<HugeIcon
											className={cn(
												"size-4 shrink-0 text-rb-black/55 transition duration-200",
												isOpen && "rotate-180 text-rb-red"
											)}
											icon={ArrowDown01Icon}
											size={16}
										/>
									</button>
									<div
										className={cn(
											"grid transition-all duration-300 ease-out",
											isOpen
												? "grid-rows-[1fr] opacity-100"
												: "grid-rows-[0fr] opacity-0"
										)}
									>
										<div className="overflow-hidden">
											<p className="px-5 pb-5 text-sm leading-7 text-rb-black/58 sm:px-6 sm:text-base">
												{item.answer}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<aside className="rounded-xl border border-rb-black bg-white p-6 text-center lg:sticky lg:top-28">
						<div className="mx-auto flex size-16 items-center justify-center text-rb-black">
							<HugeIcon
								className="size-14"
								icon={MessageQuestionIcon}
								size={56}
								strokeWidth={2.05}
							/>
						</div>
						<h3 className="mt-5 text-lg font-semibold text-rb-black">
							Still have questions?
						</h3>
						<p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-rb-black/58">
							Our team can help you choose the right telematics program for your
							fleet, partners, or deployment model.
						</p>
						<Button
							asChild
							className="mt-6 w-full border-rb-black bg-rb-black text-white hover:border-rb-red hover:bg-rb-red"
							size="lg"
						>
							<Link href="/contact-us">Contact Support Team</Link>
						</Button>
					</aside>
				</div>
			</div>
		</section>
	);
}
