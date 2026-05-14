import {
	AiSecurity03Icon,
	Analytics01Icon,
	ApiIcon,
	BrushIcon,
	Building02Icon,
	CustomizeIcon,
	DeviceAccessIcon,
	SmartPhone01Icon,
} from "@hugeicons/core-free-icons";
import { type IconSvgElement } from "@hugeicons/react";

import { HugeIcon } from "@/components/huge-icon";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const whiteLabelFeatures = [
	{
		title: "Custom Branding",
		description:
			"Our platform adapts to your brand guidelines, styles, logos, and color schemes to deliver a seamless customer experience.",
		outcome: "Brand",
		icon: BrushIcon,
		toneClass: "from-rb-peach/70",
	},
	{
		title: "Serving Diverse Industries",
		description:
			"From automotive to insurance and beyond, white-label solutions can be tailored to multiple verticals under your brand.",
		outcome: "Adapt",
		icon: Building02Icon,
		toneClass: "from-rb-light-blue/85",
	},
	{
		title: "Robust Analytics",
		description:
			"Give users access to real-time dashboards and insightful reports personalized to reflect your unique brand identity.",
		outcome: "Measure",
		icon: Analytics01Icon,
		toneClass: "from-rb-light-green/85",
	},
	{
		title: "Enterprise-Grade Security",
		description:
			"Secure infrastructure, data encryption, and compliance-minded operations help give your clients confidence.",
		outcome: "Protect",
		icon: AiSecurity03Icon,
		toneClass: "from-rb-peach/60",
	},
] satisfies {
	title: string;
	description: string;
	outcome: string;
	icon: IconSvgElement;
	toneClass: string;
}[];

const launchItems = [
	{
		label: "Configurable devices",
		icon: DeviceAccessIcon,
	},
	{
		label: "Branded apps",
		icon: SmartPhone01Icon,
	},
	{
		label: "Platform APIs",
		icon: ApiIcon,
	},
	{
		label: "Customer experience",
		icon: CustomizeIcon,
	},
] satisfies {
	label: string;
	icon: IconSvgElement;
}[];

function FeatureCard({
	feature,
	index,
}: {
	feature: (typeof whiteLabelFeatures)[number];
	index: number;
}) {
	const featured = index === 0;

	return (
		<Card className="relative isolate border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0 transition duration-300 hover:-translate-y-1 hover:border-rb-red/28 hover:shadow-[0_24px_70px_rgba(1,1,1,0.1)]">
			<div
				aria-hidden="true"
				className={cn(
					"absolute inset-x-0 top-0 h-24 bg-linear-to-b to-transparent",
					feature.toneClass
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
						<HugeIcon icon={feature.icon} size={22} />
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
						{feature.outcome}
					</Badge>
					<CardTitle className="text-xl font-semibold leading-tight text-rb-black sm:text-2xl">
						{feature.title}
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="relative px-6 pb-6 sm:px-7 sm:pb-7">
				<CardDescription className="text-sm leading-6 text-rb-black/58 sm:text-base sm:leading-7">
					{feature.description}
				</CardDescription>
			</CardContent>
		</Card>
	);
}

export function WhiteLabelOfferingSection() {
	return (
		<section className="border-b border-black/10 bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<header className="grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-end">
					<div>
						<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
							White label offering
						</p>
						<h2 className="mt-4 text-[2.35rem] font-semibold leading-tight tracking-tight text-rb-black sm:text-5xl">
							A branded telematics stack you can take to market
						</h2>
					</div>
					<p className="max-w-3xl text-base leading-7 text-rb-black/60 sm:text-lg sm:leading-8 lg:justify-self-end">
						Redtail gives partners the devices, platform workflows, apps,
						analytics, and support needed to deliver a credible telematics
						experience without building the foundation from scratch.
					</p>
				</header>

				<div className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
					<Card className="border-black/10 bg-rb-black py-0 text-white shadow-[0_24px_70px_rgba(1,1,1,0.16)] ring-0">
						<CardHeader className="px-6 pt-6 sm:px-7 sm:pt-7">
							<Badge className="w-fit bg-rb-red text-white">Launch system</Badge>
							<CardTitle className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">
								Redtail powers the technical foundation behind your customer
								offer.
							</CardTitle>
							<CardDescription className="mt-3 text-base leading-7 text-white/62">
								Use our proven telematics technology to move faster while keeping
								your brand at the front of the customer relationship.
							</CardDescription>
						</CardHeader>
						<CardContent className="px-6 pb-6 sm:px-7 sm:pb-7">
							<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
								{launchItems.map((item) => (
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

							<div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
								<p className="text-xs font-semibold tracking-[0.2em] text-white/38 uppercase">
									Best for
								</p>
								<p className="mt-3 text-sm leading-6 text-white/72">
									Brands serving fleets, insurers, automotive programs, and
									connected-vehicle customers who need a market-ready telematics
									experience.
								</p>
							</div>
						</CardContent>
					</Card>

					<div className="grid gap-4 sm:grid-cols-2">
						{whiteLabelFeatures.map((feature, index) => (
							<FeatureCard feature={feature} index={index} key={feature.title} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
