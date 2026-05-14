"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDown01Icon, MessageQuestionIcon } from "@hugeicons/core-free-icons";

import { HugeIcon } from "@/components/huge-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FaqItem = {
	question: string;
	answer: string;
};

const faqItems: FaqItem[] = [
	{
		question: "What is the first step to registering with Redtail Telematics?",
		answer:
			"To begin, purchase a GPS tracking product from an authorized reseller or directly from Redtail. Install it in your vehicle and use the Redtail Installer App to verify connectivity.",
	},
	{
		question: "How do I activate my device and service plan?",
		answer:
			"Select a service plan, follow the activation instructions sent via email, and use the login information from Redtail to get started immediately.",
	},
	{
		question: "How do I start monitoring my fleet?",
		answer:
			"Download the RT Fleet app or access it through the website to monitor real-time data and manage your fleet effectively.",
	},
	{
		question:
			"How can I become an authorized reseller of Redtail Telematics products?",
		answer:
			"To apply, complete the reseller form on our website. For immediate inquiries, email sales@redtailtelematics.com or call +1 866 711 4880.",
	},
	{
		question: "What payment methods does Redtail Telematics accept?",
		answer:
			"Redtail Telematics accepts major credit and debit cards to facilitate convenient payment.",
	},
	{
		question: "Can Redtail Telematics help me save on my insurance costs?",
		answer:
			"Yes, telematics technology can lead to insurance discounts as many providers reward safer driving habits monitored by telematics data.",
	},
	{
		question: "What are your customer support hours?",
		answer:
			"Our support team is available Monday to Friday, 9:00 AM to 6:00 PM. For urgent issues outside these hours, email support@redtailtelematics.com.",
	},
	{
		question: "Can I track my fleet in real-time with Redtail Telematics?",
		answer:
			"Yes, real-time tracking is available through the RT Fleet app and web dashboard, allowing you to monitor locations and make timely decisions.",
	},
	{
		question:
			"What is the process to update my Redtail Telematics service plan?",
		answer:
			"Log into your Redtail account, navigate to the Service Plans section, and select a plan. For assistance, our support team is available to help.",
	},
];

export function FleetManagementFaqSection() {
	const [openQuestion, setOpenQuestion] = useState(0);

	return (
		<section
			className="border-b border-black/10 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
			id="faq"
		>
			<div className="mx-auto max-w-7xl">
				<header className="max-w-3xl">
					<p className="text-xs font-semibold tracking-[0.24em] text-rb-red uppercase">
						FAQ
					</p>
					<h2 className="mt-4 text-[2rem] font-semibold leading-tight tracking-tight text-rb-black sm:text-4xl lg:text-5xl">
						Common questions, clear answers
					</h2>
					<p className="mt-4 max-w-2xl text-base leading-7 text-rb-black/58 sm:text-lg">
						Everything you need to know about the platform, installation, and
						support.
					</p>
				</header>

				<div className="mt-9 grid gap-7 lg:mt-16 lg:grid-cols-[1fr_23rem] lg:items-start xl:grid-cols-[1fr_25rem]">
					<div className="overflow-hidden rounded-xl border border-black/12 bg-white">
						{faqItems.map((item, index) => {
							const isOpen = openQuestion === index;

							return (
								<div
									className="border-b border-black/10 last:border-b-0"
									key={item.question}
								>
									<button
										aria-expanded={isOpen}
										className={cn(
											"group flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition sm:px-6",
											isOpen
												? "bg-white shadow-[inset_0_0_0_2px_rgba(1,1,1,0.16)]"
												: "hover:bg-black/[0.02]"
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
							Talk to our team about devices, activation, fleet monitoring,
							service plans, and support.
						</p>
						<Button
							asChild
							className="mt-6 w-full border-rb-black bg-rb-black text-white hover:border-rb-red hover:bg-rb-red"
							size="lg"
						>
							<Link href="/contact-us">Talk to our team</Link>
						</Button>
					</aside>
				</div>
			</div>
		</section>
	);
}
