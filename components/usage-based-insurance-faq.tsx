"use client";

import { ArrowDown01Icon, MessageQuestionIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useState } from "react";

import { HugeIcon } from "@/components/huge-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const faqItems = [
	{
		question:
			"How does Redtail's telematics support usage-based insurance models?",
		answer:
			"Redtail's telematics provides real-time data on driver behavior, vehicle usage, and incident classification, enabling insurers to create personalized policies based on actual usage. These insights support accurate driver scoring and risk assessment, making it possible to reward safer driving and engage policyholders more effectively.",
	},
	{
		question:
			"What types of data can insurers access through Redtail's telematics solutions?",
		answer:
			"Our solutions offer comprehensive data such as real-time driver scoring, speed and acceleration patterns, crash analytics, incident classification, and event histories. These insights can be seamlessly fed into your existing underwriting, claims, and customer engagement workflows to support better decision-making and policyholder satisfaction.",
	},
	{
		question:
			"How does Redtail's crash data analysis benefit the insurance claims process?",
		answer:
			"Redtail's crash portal digitally recreates incidents, providing details like impact speed, acceleration patterns, and robust incident classification. This comprehensive view helps insurers expedite claims, reduce fraudulent claims, and provide clear evidence if disputes arise.",
	},
	{
		question:
			"How does Redtail ensure the accuracy and security of telematics data?",
		answer:
			"Redtail's data accuracy and security protocols are ISO 9001 and ISO 27001 certified. Our integrated Quality and Information Security Management Systems safeguard the integrity of telematics data while maintaining strict confidentiality, giving insurers confidence in every data point they use.",
	},
	{
		question:
			"Can Redtail's telematics solutions be customized for different insurers' needs?",
		answer:
			"Absolutely. Redtail collaborates with insurers to tailor solutions, from driver scoring algorithms and lift charts to specific data analytics requirements. We partner with you from the initial design phase through full integration, ensuring each solution is aligned with your unique business goals.",
	},
	{
		question: "How can Redtail's telematics data help reduce insurance fraud?",
		answer:
			"Detailed incident classification and crash data analysis reveal critical factors - like speed of impact and acceleration changes - that help verify legitimate claims. This evidence-based approach makes it much harder for fraudulent claims to go undetected, saving insurers both time and money.",
	},
	{
		question:
			"How is Redtail's telematics data integrated into an insurer's existing systems?",
		answer:
			"Redtail offers flexible connectivity options that allow for direct data flow into your existing processes. Our dedicated integration team ensures a smooth setup, enabling real-time access to telematics insights for underwriting, incident classification, driver scoring, claims processing, and continuous policyholder engagement.",
	},
	{
		question: "Does Redtail provide support for both B2B and B2C applications?",
		answer:
			"Yes. Redtail offers white-label solutions for both B2B and B2C use cases. Our customizable applications allow insurers to engage fleet managers, operators, and individual customers by providing relevant data insights, driver feedback, and easy access to telematics services.",
	},
	{
		question:
			"What is involved in setting up Redtail's telematics for a new insurance client?",
		answer:
			"Our team supports you from product design through setup, integration, and training. We handle everything from device provisioning to configuring driver scoring and incident classification, ensuring a smooth rollout and providing ongoing support for all your telematics needs.",
	},
	{
		question:
			"How can Redtail's telematics data improve customer engagement for insurers?",
		answer:
			"By delivering real-time driver feedback and tailored insights, including detailed incident classification and usage trends, insurers can engage policyholders more meaningfully. This focus on safer driving habits and personalized coaching enhances customer satisfaction and boosts retention rates.",
	},
];

export function UsageBasedInsuranceFaqSection() {
	const [openQuestion, setOpenQuestion] = useState(0);

	return (
		<section className="border-b border-black/10 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<header className="max-w-3xl">
					<p className="text-xs font-semibold tracking-[0.24em] text-rb-red uppercase">
						FAQ
					</p>
					<h2 className="mt-4 text-[2rem] font-semibold leading-tight tracking-tight text-rb-black sm:text-4xl lg:text-5xl">
						Frequently Asked Questions
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
							Talk to our team about UBI program design, data access,
							integration, and insurance-specific support.
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
