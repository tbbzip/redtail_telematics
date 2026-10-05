"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowDown01Icon, MessageQuestionIcon } from "@hugeicons/core-free-icons";

import { HugeIcon } from "@/components/huge-icon";
import { Button } from "@/components/ui/button";
import { section179Benefit } from "@/lib/tax-benefits";
import { cn } from "@/lib/utils";

type FaqItem = {
	question: string;
	answer: string;
	guidance?: { href: string; label: string };
};

const faqItems: FaqItem[] = [
	{
		question: "How do I request a demo for my business fleet?",
		answer:
			"Use the fleet demo form to share your contact details, company name, and fleet size. This gives the Redtail team context for a conversation about your vehicles and operational needs.",
	},
	{
		question: "What can our operations team review with Redtail?",
		answer:
			"Redtail supports real-time vehicle tracking, geofence alerts, driver behavior monitoring, maintenance reminders, and fleet reporting. Discuss the locations, events, and reports your team needs to make daily decisions.",
	},
	{
		question: "Can our managers use both web and mobile apps?",
		answer:
			"Yes. Fleet information is available through the RT Fleet app and web dashboard, including real-time vehicle locations and fleet activity.",
	},
	{
		question: "How can Redtail help with vehicle maintenance?",
		answer:
			"Redtail helps teams keep track of vehicle maintenance and plan service using fleet usage and maintenance records. Talk with Redtail about the setup your fleet needs and the maintenance information your team wants to review.",
	},
	{
		question: "How should we discuss devices and installation?",
		answer:
			"Share your vehicle types, fleet size, and rollout plans with the sales team. Redtail can discuss device and installation options for your requirements before you choose a setup.",
	},
	{
		question: "Can Redtail support Hours of Service (HOS) workflows?",
		answer:
			"Journey timing, stops, mileage, and vehicle-use records provide context for Hours of Service reviews. Share the driver records, reports, and integrations your operation needs with Redtail so our team can confirm the appropriate deployment and reporting scope.",
	},
	{
		question: section179Benefit.question,
		answer: section179Benefit.answer,
		guidance: { href: section179Benefit.guidanceHref, label: section179Benefit.guidanceLabel },
	},
	{
		question: "What should we bring to the fleet conversation?",
		answer:
			"Your vehicle mix, routes, fleet size, and current operational priorities are a useful starting point. Bring questions about visibility, driver behavior, alerts, maintenance, and reporting so the team can focus on what matters to your business.",
	},
];

export function FleetManagementFaqSection() {
	const faqId = useId();
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
						Questions from fleet teams
					</h2>
					<p className="mt-4 max-w-2xl text-base leading-7 text-rb-black/58 sm:text-lg">
						Start with the platform capabilities and rollout questions that
						matter to your business.
					</p>
				</header>

				<div className="mt-9 grid gap-7 lg:mt-16 lg:grid-cols-[1fr_23rem] lg:items-start xl:grid-cols-[1fr_25rem]">
					<div className="overflow-hidden rounded-xl border border-black/12 bg-white">
						{faqItems.map((item, index) => {
							const isOpen = openQuestion === index;
							const questionId = `${faqId}-question-${index}`;
							const answerId = `${faqId}-answer-${index}`;

							return (
								<div
									className="border-b border-black/10 last:border-b-0"
									key={item.question}
								>
									<button
										aria-controls={answerId}
										aria-expanded={isOpen}
										id={questionId}
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
										aria-hidden={!isOpen}
										aria-labelledby={questionId}
										className={cn(
											"grid transition-all duration-300 ease-out",
											isOpen
												? "grid-rows-[1fr] opacity-100"
												: "grid-rows-[0fr] opacity-0"
										)}
										id={answerId}
										role="region"
									>
										<div className="overflow-hidden">
											<p className="px-5 pb-5 text-sm leading-7 text-rb-black/58 sm:px-6 sm:text-base">
												{item.answer}
											</p>
											{item.guidance && isOpen ? (
												<a className="mx-5 mb-5 inline-block text-sm font-semibold text-rb-red hover:underline sm:mx-6" href={item.guidance.href} rel="noreferrer" target="_blank">
													{item.guidance.label}
												</a>
											) : null}
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
							Talk through your fleet needs
						</h3>
						<p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-rb-black/58">
							Bring your vehicle types, fleet size, and operational priorities
							to the conversation.
						</p>
						<Button
							asChild
							className="mt-6 w-full border-rb-black bg-rb-black text-white hover:border-rb-red hover:bg-rb-red"
							size="lg"
						>
							<Link href="#footer-demo-form">Request a Fleet Demo</Link>
						</Button>
					</aside>
				</div>
			</div>
		</section>
	);
}
