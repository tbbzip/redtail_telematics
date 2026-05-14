import {
	AiBrain03Icon,
	CarSignalIcon,
	ChartAnalysisIcon,
	Database01Icon,
	Target03Icon,
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

const solutionBenefits = [
	{
		title: "Tailored Solutions",
		description:
			"We create solutions tailored to each insurer's specific needs, enhancing product differentiation and policyholder engagement.",
		icon: Target03Icon,
		outcome: "Differentiate",
		toneClass: "from-rb-peach/70",
		className: "lg:col-span-3",
	},
	{
		title: "Better Data",
		description:
			"Configurable devices mean a higher quality of real-time data designed to meet your specific needs.",
		icon: Database01Icon,
		outcome: "Verify",
		toneClass: "from-rb-light-blue/85",
		className: "lg:col-span-3",
	},
	{
		title: "Crash Reconstruction",
		description:
			"Detailed understanding of the context and causes of a crash. Claims can be streamlined and fraud handling improved.",
		icon: CarSignalIcon,
		outcome: "Resolve",
		toneClass: "from-rb-light-green/85",
		className: "lg:col-span-2",
	},
	{
		title: "Risk Analysis",
		description:
			"Leverage driver behaviours detection and analysis to gain insights and mitigate risks, provide targeted driving feedback, all supported by validated lift charts.",
		icon: ChartAnalysisIcon,
		outcome: "Predict",
		toneClass: "from-rb-peach/60",
		className: "lg:col-span-2",
	},
	{
		title: "Reliable FNOL",
		description:
			"Advanced machine learning, trained with many years of confirmed crashes, provides quick and reliable classification of high-energy impacts as unlikely or probable crashes.",
		icon: AiBrain03Icon,
		outcome: "Classify",
		toneClass: "from-rb-light-blue/80",
		className: "lg:col-span-2",
	},
] satisfies {
	title: string;
	description: string;
	icon: IconSvgElement;
	outcome: string;
	toneClass: string;
	className: string;
}[];

function BenefitCard({
	benefit,
	index,
}: {
	benefit: (typeof solutionBenefits)[number];
	index: number;
}) {
	const featured = index < 2;

	return (
		<Card
			className={cn(
				"relative isolate border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0 transition duration-300 hover:-translate-y-1 hover:border-rb-red/28 hover:shadow-[0_24px_70px_rgba(1,1,1,0.1)]",
				benefit.className
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
							featured
								? "bg-rb-red text-white"
								: "bg-rb-black text-white"
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

export function UsageBasedInsuranceSolutionSection() {
	return (
		<section className="border-b border-black/10 bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<header className="grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
					<div>
						<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
							Benefits
						</p>
						<h2 className="mt-4 text-[2.35rem] font-semibold leading-tight tracking-tight text-rb-black sm:text-5xl">
							Our Solution
						</h2>
					</div>
					<p className="max-w-3xl text-base leading-7 text-rb-black/60 sm:text-lg sm:leading-8 lg:justify-self-end">
						Redtail brings together configurable devices, verified data,
						incident intelligence, and insurance-specific analytics for UBI
						programs that need accuracy from policy pricing through claims.
					</p>
				</header>

				<div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-6">
					{solutionBenefits.map((benefit, index) => (
						<BenefitCard benefit={benefit} index={index} key={benefit.title} />
					))}
				</div>
			</div>
		</section>
	);
}
