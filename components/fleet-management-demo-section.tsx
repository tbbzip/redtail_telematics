import Link from "next/link";
import {
	ArrowRight01Icon,
	CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

import { FooterDemoForm } from "@/components/footer-demo-form";
import { HugeIcon } from "@/components/huge-icon";

const demoTopics = [
	"Vehicle locations, routes, and geofence alerts",
	"Driver behavior and fleet activity reports",
	"Maintenance reminders and day-to-day fleet visibility",
];

export function FleetManagementDemoSection() {
	return (
		<section
			aria-labelledby="fleet-demo-heading"
			className="border-b border-black/10 bg-[#f4f3ef] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
		>
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1fr_28rem] lg:items-start lg:gap-20">
				<div className="min-w-0 max-w-2xl">
					<p className="text-xs font-semibold uppercase tracking-[0.24em] text-rb-red">
						Your Fleet, Your Priorities
					</p>
					<h2
						className="mt-4 max-w-xl text-[2rem] font-semibold leading-tight tracking-tight text-rb-black sm:text-4xl lg:text-5xl"
						id="fleet-demo-heading"
					>
						See how Redtail fits your business fleet.
					</h2>
					<p className="mt-5 max-w-xl text-base leading-7 text-rb-black/65 sm:text-lg sm:leading-8">
						Tell us about your company and fleet. Our team can discuss the
						vehicle types, routes, alerts, and reports that matter to your
						operations.
					</p>
					<ul className="mt-7 grid gap-4 text-sm leading-6 text-rb-black/75 sm:text-base">
						{demoTopics.map((topic) => (
							<li className="flex items-start gap-3" key={topic}>
								<HugeIcon
									className="mt-0.5 size-5 shrink-0 text-rb-red"
									icon={CheckmarkCircle02Icon}
									size={20}
								/>
								<span>{topic}</span>
							</li>
						))}
					</ul>

					<aside className="mt-10 border-l-2 border-rb-red pl-5 sm:mt-12 sm:pl-6">
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-rb-black/45">
							Fleet Case Study
						</p>
						<h3 className="mt-3 text-xl font-semibold leading-7 text-rb-black">
							From fleet data to daily decisions
						</h3>
						<p className="mt-3 max-w-lg text-sm leading-7 text-rb-black/62">
							A US building and maintenance business used Redtail to help
							plan routes and tasks and review driver behavior. See how
							its operations team put fleet data to work.
						</p>
						<Link
							className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-rb-red underline-offset-4 hover:underline"
							href="/resources/case-studies/fleet-telematics-case-study"
						>
							Read the fleet case study
							<HugeIcon icon={ArrowRight01Icon} size={16} />
						</Link>
					</aside>
				</div>

				<FooterDemoForm />
			</div>
		</section>
	);
}
