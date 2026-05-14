import Link from "next/link";
import {
	ArrowRight01Icon,
	DeviceAccessIcon,
	DiscountTag02Icon,
	GpsSignal01Icon,
	MarketingIcon,
	MoneyBag02Icon,
	PresentationBarChart01Icon,
	SmartPhone01Icon,
	StoreVerified02Icon,
} from "@hugeicons/core-free-icons";
import { type IconSvgElement } from "@hugeicons/react";

import { HugeIcon } from "@/components/huge-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const resellerBenefits = [
	{
		title: "Simple to Use",
		description: "World-class devices, adaptable portals, and intuitive apps.",
		outcome: "Launch",
		icon: DeviceAccessIcon,
		toneClass: "from-rb-peach/70",
	},
	{
		title: "GPS Technology",
		description: "Track and manage your valued assets and people.",
		outcome: "Locate",
		icon: GpsSignal01Icon,
		toneClass: "from-rb-light-blue/85",
	},
	{
		title: "App to Track",
		description:
			"The mobile workforce has access to all necessary data wherever they are.",
		outcome: "Mobilize",
		icon: SmartPhone01Icon,
		toneClass: "from-rb-light-green/85",
	},
	{
		title: "Save Money",
		description:
			"Efficiencies in driver and vehicle performance will deliver savings inside three months.",
		outcome: "Improve",
		icon: MoneyBag02Icon,
		toneClass: "from-rb-peach/60",
	},
] satisfies {
	title: string;
	description: string;
	outcome: string;
	icon: IconSvgElement;
	toneClass: string;
}[];

const supportItems = [
	{
		label: "Volume pricing",
		icon: DiscountTag02Icon,
	},
	{
		label: "Territory leads",
		icon: StoreVerified02Icon,
	},
	{
		label: "Marketing support",
		icon: MarketingIcon,
	},
	{
		label: "Training and rebranding",
		icon: PresentationBarChart01Icon,
	},
] satisfies {
	label: string;
	icon: IconSvgElement;
}[];

function BenefitCard({
	benefit,
	index,
}: {
	benefit: (typeof resellerBenefits)[number];
	index: number;
}) {
	const featured = index === 0;

	return (
		<Card
			className={cn(
				"relative isolate border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0 transition duration-300 hover:-translate-y-1 hover:border-rb-red/28 hover:shadow-[0_24px_70px_rgba(1,1,1,0.1)]"
			)}
		>
			<div
				aria-hidden="true"
				className={cn(
					"absolute inset-x-0 top-0 h-24 bg-linear-to-b to-transparent",
					benefit.toneClass
				)}
			/>
			<CardHeader className="relative gap-5 px-6 pt-6 sm:px-7 sm:pt-7">
				<div className="flex items-start justify-between gap-4">
					<div
						className={cn(
							"flex size-12 items-center justify-center rounded-xl text-white shadow-[0_16px_34px_rgba(207,19,23,0.18)]",
							featured ? "bg-rb-red" : "bg-rb-black"
						)}
					>
						<HugeIcon icon={benefit.icon} size={22} />
					</div>
					<Badge
						className="border-black/10 bg-white/70 text-rb-black/54 backdrop-blur-sm"
						variant="outline"
					>
						{String(index + 1).padStart(2, "0")}
					</Badge>
				</div>
				<div>
					<Badge
						className={cn(
							"mb-4",
							featured ? "bg-rb-red text-white" : "bg-rb-black text-white"
						)}
					>
						{benefit.outcome}
					</Badge>
					<CardTitle className="text-xl font-semibold leading-tight text-rb-black sm:text-2xl">
						{benefit.title}
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="relative px-6 pb-6 sm:px-7 sm:pb-7">
				<CardDescription className="text-sm leading-6 text-rb-black/58 sm:text-base sm:leading-7">
					{benefit.description}
				</CardDescription>
			</CardContent>
		</Card>
	);
}

export function ResellerProgramPartnerSection() {
	return (
		<section className="border-b border-black/10 bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
					<div>
						<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
							Partner program
						</p>
						<h2 className="mt-4 text-[2.35rem] font-semibold leading-tight tracking-tight text-rb-black sm:text-5xl">
							Redtail Telematics - A Perfect Partner
						</h2>
						<div className="mt-6 grid gap-5 text-base leading-7 text-rb-black/62 sm:text-lg sm:leading-8">
							<p>
								Telematics resellers are a major part of our distribution
								strategy, providing revenue and profit opportunities with proven
								fleet management solutions. Products and services are affordable,
								easy to resell, and our apps work with Android or iOS
								smartphones.
							</p>
							<p>
								For your fleets and their managers, we offer a range of both
								professional and self-fit devices. These quality devices provide
								valuable data to our fleet management portals, enabling asset
								management, reporting, and crash reconstruction. In addition, we
								have app-based tools for device installation and fleet management.
							</p>
						</div>
					</div>

					<Card className="border-black/10 bg-rb-black py-0 text-white shadow-[0_24px_70px_rgba(1,1,1,0.16)] ring-0">
						<CardHeader className="px-6 pt-6 sm:px-7 sm:pt-7">
							<Badge className="w-fit bg-rb-red text-white">Reseller CTA</Badge>
							<CardTitle className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">
								Interested in joining the Redtail reseller program?
							</CardTitle>
							<CardDescription className="mt-3 text-base leading-7 text-white/62">
								Email our sales team and we will guide you through partnership
								options, onboarding, products, and support.
							</CardDescription>
						</CardHeader>
						<CardContent className="px-6 pb-6 sm:px-7 sm:pb-7">
							<div className="grid gap-3 sm:grid-cols-2">
								{supportItems.map((item) => (
									<div
										className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.045] p-3"
										key={item.label}
									>
										<div className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-white">
											<HugeIcon icon={item.icon} />
										</div>
										<p className="text-sm font-semibold text-white/82">
											{item.label}
										</p>
									</div>
								))}
							</div>
							<Button asChild className="mt-6 w-full" size="lg">
								<Link href="mailto:sales@redtailtelematics.com">
									Email sales@redtailtelematics.com
									<HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
								</Link>
							</Button>
						</CardContent>
					</Card>
				</div>

				<div className="mt-12">
					<div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
								Benefits
							</p>
							<h3 className="mt-3 text-3xl font-semibold leading-tight text-rb-black sm:text-4xl">
								Benefits of Partnering with Redtail
							</h3>
						</div>
					</div>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{resellerBenefits.map((benefit, index) => (
							<BenefitCard benefit={benefit} index={index} key={benefit.title} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
