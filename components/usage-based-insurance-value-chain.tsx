import {
	ApiIcon,
	CloudUploadIcon,
	ComputerChartUpIcon,
	CourtHouseIcon,
	CpuIcon,
	DatabaseLightningIcon,
	DeviceAccessIcon,
	Factory01Icon,
	FileChartColumnIcon,
	GpsSignal01Icon,
	Simcard01Icon,
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

const valueChainSteps = [
	{
		phase: "Build",
		title: "Own-device control",
		description:
			"We specify and manufacture our own devices, without relying on unmanageable third-party hardware.",
		icon: Factory01Icon,
	},
	{
		phase: "Build",
		title: "Edge computing",
		description:
			"Our devices optimize the transfer of data to the cloud before it reaches downstream systems.",
		icon: CpuIcon,
	},
	{
		phase: "Capture",
		title: "Report-ready data",
		description:
			"We provide useful reports that give teams clear insight into the data collected.",
		icon: FileChartColumnIcon,
	},
	{
		phase: "Capture",
		title: "Sensor specification",
		description:
			"We specify GPS, accelerometer, and gyro sensors and signals for precise data capture.",
		icon: GpsSignal01Icon,
	},
	{
		phase: "Connect",
		title: "Airtime aggregation",
		description:
			"We source SIM and airtime, aggregating charges across the fleet for cost-effective MB rates.",
		icon: Simcard01Icon,
	},
	{
		phase: "Verify",
		title: "High-impact event warehouse",
		description:
			"Our DataWarehouse organizes verified journey and event data, with sampling rates up to 1kHz for high-impact events.",
		icon: DatabaseLightningIcon,
	},
	{
		phase: "Analyze",
		title: "Raw or managed access",
		description:
			"Data is available in raw or managed form, supporting driver scoring, lift charts, and insights from billions of miles analyzed.",
		icon: ApiIcon,
	},
	{
		phase: "Deliver",
		title: "Portals and alerts",
		description:
			"Data is available through portals with customizable alerts for fleet management, crash analysis, incident classification, and driver scoring.",
		icon: ComputerChartUpIcon,
	},
	{
		phase: "Engage",
		title: "White-label apps",
		description:
			"Our white-label B2B and B2C apps provide communication channels for operations managers and consumers alike.",
		icon: SmartPhone01Icon,
	},
	{
		phase: "Support",
		title: "Integration and expert support",
		description:
			"We collaborate with IT teams for smooth integration and offer expert support, even in court situations.",
		icon: CourtHouseIcon,
	},
] satisfies {
	phase: string;
	title: string;
	description: string;
	icon: IconSvgElement;
}[];

const chainHighlights = [
	{
		label: "Hardware",
		icon: DeviceAccessIcon,
	},
	{
		label: "Cloud",
		icon: CloudUploadIcon,
	},
	{
		label: "Data",
		icon: DatabaseLightningIcon,
	},
	{
		label: "Decision",
		icon: ComputerChartUpIcon,
	},
] satisfies {
	label: string;
	icon: IconSvgElement;
}[];

function ChainHighlight({
	highlight,
	index,
}: {
	highlight: (typeof chainHighlights)[number];
	index: number;
}) {
	return (
		<div className="relative flex items-center gap-3">
			<div className="flex size-11 items-center justify-center rounded-xl border border-white/12 bg-white/8 text-white">
				<HugeIcon icon={highlight.icon} size={20} />
			</div>
			<div>
				<p className="text-[10px] font-semibold tracking-[0.2em] text-white/36 uppercase">
					Step {String(index + 1).padStart(2, "0")}
				</p>
				<p className="mt-1 text-sm font-semibold text-white">{highlight.label}</p>
			</div>
		</div>
	);
}

function ValueChainCard({
	step,
	index,
}: {
	step: (typeof valueChainSteps)[number];
	index: number;
}) {
	const featured = index === 5;

	return (
		<Card
			className={cn(
				"relative isolate overflow-hidden border-white/10 bg-white/[0.045] py-0 text-white shadow-none ring-0 transition duration-300 hover:-translate-y-1 hover:border-rb-red/44 hover:bg-white/[0.07]",
				featured && "border-rb-red/42 bg-rb-red/10"
			)}
		>
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/24 to-transparent"
			/>
			<CardHeader className="relative gap-5 px-5 pt-5 sm:px-6 sm:pt-6">
				<div className="flex items-start justify-between gap-4">
					<div
						className={cn(
							"flex size-11 items-center justify-center rounded-xl text-white",
							featured ? "bg-rb-red" : "bg-white/10"
						)}
					>
						<HugeIcon icon={step.icon} size={20} />
					</div>
					<div className="flex items-center gap-2">
						<Badge className="bg-white/10 text-white" variant="secondary">
							{step.phase}
						</Badge>
						<span className="text-xs font-semibold text-white/34">
							{String(index + 1).padStart(2, "0")}
						</span>
					</div>
				</div>
				<CardTitle className="text-lg font-semibold leading-tight text-white sm:text-xl">
					{step.title}
				</CardTitle>
			</CardHeader>
			<CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
				<CardDescription className="text-sm leading-6 text-white/62">
					{step.description}
				</CardDescription>
			</CardContent>
		</Card>
	);
}

export function UsageBasedInsuranceValueChainSection() {
	return (
		<section className="relative overflow-hidden bg-rb-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rb-red/70 to-transparent"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-28 right-0 size-[32rem] rounded-full bg-rb-red/10 blur-3xl"
			/>
			<div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.25fr] lg:gap-14">
				<aside className="lg:sticky lg:top-24 lg:self-start">
					<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
						Device to decision
					</p>
					<h2 className="mt-4 max-w-xl text-[2.35rem] font-semibold leading-tight tracking-tight text-white sm:text-5xl">
						Our Comprehensive Value Chain
					</h2>
					<p className="mt-5 max-w-xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
						Redtail controls the complete path from device specification and
						connectivity through verified data, insurance workflows, customer
						apps, and expert support.
					</p>

					<div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
						<div className="grid gap-5">
							{chainHighlights.map((highlight, index) => (
								<ChainHighlight
									highlight={highlight}
									index={index}
									key={highlight.label}
								/>
							))}
						</div>
					</div>
				</aside>

				<div className="grid gap-4 sm:grid-cols-2">
					{valueChainSteps.map((step, index) => (
						<ValueChainCard index={index} key={step.title} step={step} />
					))}
				</div>
			</div>
		</section>
	);
}
