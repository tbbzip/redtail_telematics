"use client";

import { ArrowDown01Icon, MessageQuestionIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useState } from "react";

import { HugeIcon } from "@/components/huge-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const faqItems = [
	{
		question: "How can I become a reseller for Redtail Telematics?",
		answer:
			"To become a reseller, please email us at sales@redtailtelematics.com or call +1 866 711 4880. We'll provide you with all the necessary information and guide you through the onboarding process.",
	},
	{
		question: "What benefits do I get as a Redtail Telematics reseller?",
		answer:
			"As a reseller, you gain access to world-class brands to enhance your product portfolio, enjoy volume pricing discounts, receive territory leads to help grow your business, and benefit from comprehensive marketing support.",
	},
	{
		question: "What products are available for resellers?",
		answer:
			"Redtail Telematics offers a range of both professional and self-fit devices, including Fleet Management Solutions (FMS) and Click-to-Locate products, suitable for B2B customers and consumers alike.",
	},
	{
		question: "Do you provide marketing support for resellers?",
		answer:
			"Yes, we offer extensive marketing support including presentations, brochures, point-of-purchase displays, training, and assistance with rebranding to help you effectively promote our products.",
	},
	{
		question: "Can I get volume pricing discounts?",
		answer:
			"Absolutely! We offer attractive volume discount deals to our resellers, allowing you to maximize your profit margins as you grow your business.",
	},
	{
		question: "What kind of devices does Redtail Telematics offer?",
		answer:
			"We provide world-class devices that are simple to use, including professional and self-fit options. Our devices work with Android and iOS smartphones and can be installed covertly in vehicles.",
	},
	{
		question: "How does Redtail Telematics support its resellers?",
		answer:
			"We support our resellers through marketing assistance, access to territory leads, volume pricing discounts, and by providing high-quality products and services that are easy to resell.",
	},
	{
		question: "What markets does Redtail Telematics serve?",
		answer:
			"Redtail Telematics serves a global market, providing telematics solutions for fleet management, stolen vehicle tracking, and more, offering resellers opportunities in various industries.",
	},
	{
		question: "What is the process to join the Reseller Program?",
		answer:
			"Simply contact us via email at sales@redtailtelematics.com or call +1 866 711 4880. We'll guide you through the onboarding process and provide all the necessary information.",
	},
	{
		question: "How can I contact Redtail Telematics to become a reseller?",
		answer:
			"You can reach us by emailing sales@redtailtelematics.com or calling +1 866 711 4880. We look forward to discussing partnership opportunities with you.",
	},
];

export function ResellerProgramFaqSection() {
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
						Commonly Asked Questions
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
							Talk to our team about reseller onboarding, volume pricing,
							product options, and partner support.
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
