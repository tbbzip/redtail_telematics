"use client";

import Image from "next/image";
import {
	ActivityIcon,
	DatabaseIcon,
	MapIcon,
	MonitorIcon,
	RadioTowerIcon,
	ShieldCheckIcon,
	SmartphoneIcon,
	WrenchIcon,
	type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const integrationNodes = [
	{
		label: "Devices",
		Icon: RadioTowerIcon,
		position: "left-0 top-8",
	},
	{
		label: "Vehicle data",
		Icon: DatabaseIcon,
		position: "left-0 top-28",
	},
	{
		label: "Web platform",
		Icon: MonitorIcon,
		position: "right-0 top-8",
	},
	{
		label: "Mobile app",
		Icon: SmartphoneIcon,
		position: "right-0 top-28",
	},
] satisfies {
	label: string;
	Icon: LucideIcon;
	position: string;
}[];

const platformPaths = [
	{
		id: "devices-to-redtail",
		d: "M 152 60 H 340 Q 356 60 356 76 V 100 H 510",
		accent: false,
		delay: 0,
	},
	{
		id: "data-to-redtail",
		d: "M 152 140 H 340 Q 356 140 356 124 V 100 H 510",
		accent: false,
		delay: 0.08,
	},
	{
		id: "redtail-to-web",
		d: "M 590 100 H 744 V 76 Q 744 60 760 60 H 948",
		accent: false,
		delay: 0.16,
	},
	{
		id: "redtail-to-mobile",
		d: "M 590 100 H 744 V 124 Q 744 140 760 140 H 948",
		accent: false,
		delay: 0.24,
	},
	{
		id: "redtail-to-feature-bus",
		d: "M 550 136 V 258",
		accent: true,
		delay: 0.34,
		glow: true,
	},
	{
		id: "feature-bus",
		d: "M 178 350 V 282 Q 178 258 202 258 H 898 Q 922 258 922 282 V 350",
		accent: true,
		delay: 0.48,
	},
	{
		id: "feature-center-drop",
		d: "M 550 258 V 350",
		accent: true,
		delay: 0.56,
	},
] satisfies {
	id: string;
	d: string;
	accent: boolean;
	glow?: boolean;
	delay: number;
}[];

const signalPacketPaths = [
	{
		id: "redtail-to-devices-packet",
		d: "M 510 100 H 356 V 76 Q 356 60 340 60 H 152",
	},
	{
		id: "redtail-to-data-packet",
		d: "M 510 100 H 356 V 124 Q 356 140 340 140 H 152",
	},
	{
		id: "features-left-packet",
		d: "M 550 136 V 258 H 202 Q 178 258 178 282 V 350",
	},
	{
		id: "features-middle-packet",
		d: "M 550 136 V 350",
	},
	{
		id: "features-right-packet",
		d: "M 550 136 V 258 H 898 Q 922 258 922 282 V 350",
	},
] satisfies {
	id: string;
	d: string;
}[];

const signalPackets = [
	{
		pathId: "redtail-to-devices-packet",
		color: "#010101",
		delay: 0.35,
		radius: 2.8,
	},
	{
		pathId: "redtail-to-data-packet",
		color: "#010101",
		delay: 1.05,
		radius: 2.8,
	},
	{
		pathId: "redtail-to-web",
		color: "#010101",
		delay: 2.05,
		radius: 2.8,
	},
	{
		pathId: "redtail-to-mobile",
		color: "#010101",
		delay: 2.72,
		radius: 2.8,
	},
	{
		pathId: "features-left-packet",
		color: "#cf1317",
		delay: 3.46,
		radius: 3,
	},
	{
		pathId: "features-middle-packet",
		color: "#cf1317",
		delay: 4.66,
		radius: 3,
	},
	{
		pathId: "features-right-packet",
		color: "#cf1317",
		delay: 5.86,
		radius: 3,
	},
] satisfies {
	pathId: string;
	color: string;
	delay: number;
	radius: number;
}[];

const featureCards = [
	{
		title: "Live fleet visibility",
		description:
			"Track vehicles, journeys, and assets from one operating view.",
		Icon: MapIcon,
		tone: "bg-[#f4f1ee]",
		visual: "map",
	},
	{
		title: "Risk and incident insight",
		description:
			"Turn behaviour events and incident context into faster decisions.",
		Icon: ShieldCheckIcon,
		tone: "bg-[#edf7fa]",
		visual: "risk",
	},
	{
		title: "Install and asset health",
		description:
			"Monitor device status and deployment quality as programs scale.",
		Icon: WrenchIcon,
		tone: "bg-[#f4f8f0]",
		visual: "health",
	},
] satisfies {
	title: string;
	description: string;
	Icon: LucideIcon;
	tone: string;
	visual: "map" | "risk" | "health";
	}[];

function FeatureVisual({
	type,
	reducedMotion,
}: {
	type: "map" | "risk" | "health";
	reducedMotion: boolean;
}) {
	if (type === "map") {
		return (
			<div className="relative h-full min-h-40 overflow-hidden rounded-b-[1.4rem] bg-rb-black sm:min-h-48 lg:min-h-64 xl:min-h-72">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_70%,rgba(207,19,23,0.18),transparent_30%),linear-gradient(135deg,#010101_0%,#071019_58%,#142332_100%)]" />
				<div className="absolute inset-0 opacity-35 [background-image:linear-gradient(120deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px]" />
				<svg
					aria-hidden="true"
					className="absolute inset-0 h-full w-full"
					viewBox="0 0 360 180"
					>
						<defs>
							<clipPath id="fleet-map-clip">
								<rect height="112" rx="13" width="232" x="30" y="18" />
							</clipPath>
							<filter height="160%" id="map-tile-shadow" width="160%" x="-30%" y="-30%">
								<feDropShadow dx="0" dy="10" floodColor="#000000" floodOpacity="0.32" stdDeviation="10" />
							</filter>
						</defs>
						<rect
							fill="rgba(255,255,255,0.08)"
							filter="url(#map-tile-shadow)"
							height="112"
							rx="13"
							width="232"
							x="30"
							y="18"
						/>
						<g clipPath="url(#fleet-map-clip)">
							<rect fill="#8d9d78" height="112" width="232" x="30" y="18" />
							<rect fill="#b6a681" height="34" opacity="0.9" width="62" x="36" y="24" />
							<rect fill="#738d70" height="50" opacity="0.9" width="54" x="42" y="72" />
							<rect fill="#b7aa8d" height="38" opacity="0.88" width="58" x="118" y="22" />
							<rect fill="#7c946f" height="58" opacity="0.94" width="72" x="180" y="64" />
							<rect fill="#cfc6ad" height="30" width="26" x="48" y="30" />
							<rect fill="#d8cfb8" height="20" width="30" x="78" y="32" />
							<rect fill="#d9d2bd" height="24" width="34" x="82" y="76" />
							<rect fill="#cec5ad" height="25" width="26" x="130" y="30" />
							<rect fill="#dcd5c1" height="18" width="36" x="194" y="74" />
							<rect fill="#d4ccb5" height="20" width="42" x="190" y="106" />
							<rect fill="#b7a98c" height="18" opacity="0.82" width="28" x="224" y="38" />
							<path
								d="M 148 4 V 146"
								fill="none"
								stroke="rgba(242,244,235,0.92)"
								strokeWidth="16"
							/>
							<path
								d="M 20 68 H 274"
								fill="none"
								stroke="rgba(242,244,235,0.82)"
								strokeWidth="13"
							/>
							<path
								d="M 28 116 H 260"
								fill="none"
								stroke="rgba(242,244,235,0.72)"
								strokeWidth="11"
							/>
							<path
								d="M 82 12 L 264 130"
								fill="none"
								stroke="rgba(242,244,235,0.64)"
								strokeWidth="9"
							/>
							<path
								d="M 148 4 V 146 M 20 68 H 274 M 28 116 H 260 M 82 12 L 264 130"
								fill="none"
								stroke="rgba(82,92,76,0.3)"
								strokeWidth="1"
							/>
							<path
								d="M 34 92 H 112 M 186 46 H 252 M 60 20 V 58 M 222 68 V 122"
								fill="none"
								stroke="rgba(255,255,255,0.35)"
								strokeWidth="3"
							/>
							<g>
								<circle cx="148" cy="68" fill="rgba(1,1,1,0.45)" r="16" />
								<motion.circle
									animate={
										reducedMotion
											? { opacity: 0.16, r: 20 }
											: { opacity: [0.2, 0, 0.2], r: [16, 28, 16] }
									}
									cx="148"
									cy="68"
									fill="#cf1317"
									transition={{
										duration: 2.7,
										ease: "easeInOut",
										repeat: reducedMotion ? 0 : Infinity,
									}}
								/>
								<circle cx="148" cy="68" fill="#cf1317" r="13" stroke="white" strokeWidth="3" />
								<path
									d="M 148 59 L 156 76 L 148 73 L 140 76 Z"
									fill="white"
									stroke="white"
									strokeLinejoin="round"
								/>
							</g>
						{[
							[96, 118],
							[118, 118],
							[150, 118],
							[184, 118],
						].map(([x, y], index) => (
							<motion.circle
								animate={
									reducedMotion
										? { opacity: 0.8 }
										: { opacity: [0.25, 0.9, 0.25] }
								}
								cx={x}
								cy={y}
								fill="#cf1317"
								key={`${x}-${y}`}
								r="3.3"
								transition={{
									delay: index * 0.28,
									duration: 2.2,
									ease: "easeInOut",
									repeat: reducedMotion ? 0 : Infinity,
								}}
							/>
						))}
					</g>
				</svg>
				<div className="absolute right-4 bottom-4 z-20 w-[58%] rounded-2xl border border-white/14 bg-white/12 p-3 text-white shadow-[0_18px_46px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:right-5 lg:bottom-5 lg:w-[60%] lg:p-4">
					<div className="flex items-center justify-between gap-3">
						<div className="flex items-center gap-2">
								<div className="flex size-8 items-center justify-center rounded-full bg-rb-red text-[10px] font-semibold ring-2 ring-white/35">
									RT
								</div>
								<div>
									<p className="text-xs font-semibold leading-none lg:text-sm">Fleet 42</p>
									<p className="mt-1 text-[10px] text-white/62 lg:text-[11px]">
										San Diego route
									</p>
								</div>
							</div>
							<div className="flex items-center gap-1.5 text-[10px] font-medium text-white/78">
							<span className="size-2 rounded-full bg-rb-red" />
							Live
						</div>
					</div>
					<div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/12 pt-3">
							{[
								["04:27", "Drive"],
								["32mph", "Speed"],
								["OK", "Device"],
							].map(([value, label]) => (
							<div
								className="rounded-xl border border-white/12 bg-white/8 px-2 py-1.5 text-center"
								key={label}
							>
								<p className="text-xs font-semibold leading-none lg:text-sm">{value}</p>
								<p className="mt-1 text-[9px] text-white/55">{label}</p>
							</div>
							))}
						</div>
					</div>
				<div className="absolute left-6 bottom-4 z-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/48">
					Live fleet view
				</div>
			</div>
		);
	}

		if (type === "risk") {
			return (
				<div className="relative h-full min-h-40 overflow-hidden rounded-b-[1.4rem] bg-[#edf7fa] sm:min-h-48 lg:min-h-64 xl:min-h-72">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(207,19,23,0.12),transparent_32%),linear-gradient(to_bottom,rgba(255,255,255,0.94),rgba(237,247,250,0.92))]" />
					<div className="absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-rb-red/15" />
					<div className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-rb-red/22" />
					<div className="absolute inset-x-6 top-1/2 -translate-y-1/2">
						<div className="relative mx-auto flex max-w-sm items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white/92 p-4 shadow-[0_18px_48px_rgba(1,1,1,0.11)]">
							<motion.span
								animate={
									reducedMotion
										? { opacity: 0.18, scale: 1 }
										: { opacity: [0.08, 0.2, 0.08], scale: [1, 1.22, 1] }
								}
								className="absolute left-4 size-12 rounded-full bg-rb-red"
								transition={{
									duration: 2.8,
									ease: "easeInOut",
									repeat: reducedMotion ? 0 : Infinity,
								}}
							/>
							<div className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-rb-black text-white">
								<ActivityIcon className="size-5" />
							</div>
							<div className="min-w-0 flex-1">
								<p className="text-sm font-semibold text-rb-black">
									Harsh braking detected
								</p>
								<p className="mt-1 text-xs text-rb-black/52">
									Incident context ready for review
								</p>
							</div>
							<div className="text-right">
								<p className="text-3xl font-semibold leading-none text-rb-red lg:text-4xl">
									82
								</p>
								<p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-rb-black/42">
									Score
								</p>
							</div>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className="relative h-full min-h-40 overflow-hidden rounded-b-[1.4rem] bg-[#f4f8f0] sm:min-h-48 lg:min-h-64 xl:min-h-72">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(207,19,23,0.09),transparent_32%),linear-gradient(to_bottom,rgba(255,255,255,0.94),rgba(244,248,240,0.92))]" />
				<div className="absolute left-1/2 top-1/2 h-px w-56 -translate-x-1/2 bg-gradient-to-r from-transparent via-rb-red/24 to-transparent" />
				<div className="absolute inset-x-6 top-1/2 -translate-y-1/2">
					<div className="relative mx-auto max-w-sm rounded-2xl border border-black/5 bg-white/92 p-4 shadow-[0_18px_48px_rgba(1,1,1,0.1)]">
						<div className="flex items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<div className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-rb-black text-white">
									<motion.span
										animate={
											reducedMotion
												? { opacity: 0.16, scale: 1 }
												: { opacity: [0.08, 0.18, 0.08], scale: [1, 1.25, 1] }
										}
										className="absolute inset-0 rounded-full bg-rb-red"
										transition={{
											duration: 2.8,
											ease: "easeInOut",
											repeat: reducedMotion ? 0 : Infinity,
										}}
									/>
									<WrenchIcon className="relative size-5 text-rb-red" />
								</div>
								<div>
									<p className="text-sm font-semibold text-rb-black">
										Install verified
									</p>
									<p className="mt-1 text-xs text-rb-black/52">
										Device OK across deployment
									</p>
								</div>
							</div>
							<div className="text-right">
								<p className="text-2xl font-semibold leading-none text-rb-red lg:text-3xl">
									99.8%
								</p>
								<p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-rb-black/42">
									Reporting
								</p>
							</div>
						</div>
						<div className="mt-4 flex items-center gap-2 border-t border-black/5 pt-3">
							{["Power", "Signal", "Ignition"].map((label, index) => (
								<div
									className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-rb-black/[0.04] px-2 py-1.5 text-[10px] font-semibold text-rb-black/60"
									key={label}
								>
									<motion.span
										animate={
											reducedMotion
												? { opacity: 1 }
												: { opacity: [0.45, 1, 0.45] }
										}
										className="size-1.5 rounded-full bg-rb-red"
										transition={{
											delay: index * 0.22,
											duration: 2.2,
											ease: "easeInOut",
											repeat: reducedMotion ? 0 : Infinity,
										}}
									/>
									{label}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

export function PlatformFeatures() {
	const shouldReduceMotion = useReducedMotion();
	const reducedMotion = Boolean(shouldReduceMotion);

	return (
		<section className="relative overflow-hidden border-y border-black/10 bg-white py-16 sm:py-20 lg:py-24">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(207,19,23,0.06),transparent_28%),linear-gradient(to_bottom,rgba(1,1,1,0.025),transparent_18%,transparent_82%,rgba(1,1,1,0.025))]" />
				<div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
				<header className="mx-auto max-w-4xl text-center">
					<p className="mx-auto inline-flex rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-semibold text-rb-black/68 shadow-sm">
						Platform features
					</p>
					<h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance text-rb-black sm:text-4xl lg:text-5xl">
						One telematics platform connecting every vehicle, device, and team
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-rb-black/60 sm:text-lg">
						Redtail brings device data, fleet activity, safety events, and
						deployment health into one operating layer for modern telematics
						programs.
					</p>
				</header>

						<div className="relative mx-auto mt-14 hidden h-[350px] max-w-7xl lg:block">
						<svg
							aria-hidden="true"
							className="absolute inset-0 h-full w-full overflow-visible"
							preserveAspectRatio="none"
							viewBox="0 0 1100 350"
						>
						<defs>
							<filter
								height="180%"
								id="feature-line-glow"
								width="180%"
								x="-40%"
								y="-40%"
								>
										<feGaussianBlur result="blur" stdDeviation="2.4" />
									<feMerge>
										<feMergeNode in="blur" />
										<feMergeNode in="SourceGraphic" />
									</feMerge>
							</filter>
							<filter
								height="280%"
								id="signal-packet-glow"
								width="280%"
								x="-90%"
								y="-90%"
							>
								<feGaussianBlur result="blur" stdDeviation="4.5" />
								<feMerge>
									<feMergeNode in="blur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
						</defs>
							{platformPaths.map((path) => (
								<path
									d={path.d}
									fill="none"
									id={path.id}
									key={`${path.id}-base`}
									stroke={
										path.accent ? "rgba(207,19,23,0.16)" : "rgba(1,1,1,0.14)"
									}
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={path.accent ? 1.35 : 1.5}
								/>
							))}
								{platformPaths
									.filter((path) => path.glow)
									.map((path) => (
										<motion.path
											d={path.d}
											fill="none"
											filter="url(#feature-line-glow)"
											initial={{ pathLength: 0, opacity: 0 }}
											key={`${path.id}-glow`}
											stroke="rgba(207,19,23,0.2)"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="4"
										transition={{
											delay: path.delay,
											duration: 1.15,
											ease: "easeInOut",
										}}
										viewport={{ once: true, amount: 0.45 }}
										whileInView={{ pathLength: 1, opacity: 1 }}
									/>
								))}
							{signalPacketPaths.map((path) => (
								<path
									d={path.d}
									fill="none"
									id={path.id}
									key={`${path.id}-motion-path`}
									stroke="none"
								/>
							))}
							{platformPaths
								.map((path) => (
									<motion.path
										animate={
											reducedMotion
												? { strokeDashoffset: 0 }
												: { strokeDashoffset: [52, 0] }
										}
											d={path.d}
											fill="none"
											initial={{ pathLength: 0, opacity: 0 }}
											key={`${path.id}-flow`}
											stroke={
												path.accent ? "rgba(207,19,23,0.38)" : "rgba(1,1,1,0.2)"
											}
										strokeDasharray={path.accent ? "3 18" : "2 18"}
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={path.accent ? 1.65 : 1.4}
										transition={{
											pathLength: {
												delay: path.delay,
												duration: 1.1,
												ease: "easeInOut",
											},
											opacity: {
												delay: path.delay,
												duration: 0.5,
												ease: "easeOut",
											},
											strokeDashoffset: {
												delay: path.delay,
												duration: path.accent ? 6.4 : 7.2,
												ease: "linear",
												repeat: reducedMotion ? 0 : Infinity,
											},
										}}
										viewport={{ once: true, amount: 0.45 }}
										whileInView={{ pathLength: 1, opacity: 1 }}
									/>
								))}
						{!reducedMotion &&
							signalPackets.map((packet) => (
								<g
									filter="url(#signal-packet-glow)"
									key={`${packet.pathId}-${packet.delay}`}
									opacity="0"
								>
									<circle
										fill={packet.color}
										opacity="0.18"
										r={packet.radius + 5}
									/>
									<circle
										fill={packet.color}
										opacity="0.95"
										r={packet.radius}
									/>
									<animate
										attributeName="opacity"
										begin={`${packet.delay}s`}
										dur="7.6s"
										keyTimes="0;0.08;0.64;0.78;1"
										repeatCount="indefinite"
										values="0;1;1;0;0"
									/>
									<animateMotion
										begin={`${packet.delay}s`}
										calcMode="spline"
										dur="7.6s"
										keySplines="0.42 0 0.18 1"
										keyTimes="0;1"
										repeatCount="indefinite"
									>
										<mpath href={`#${packet.pathId}`} />
									</animateMotion>
								</g>
							))}
						</svg>

							{integrationNodes.map(({ label, Icon, position }, index) => (
								<motion.div
								className={`absolute ${position} z-10 inline-flex h-14 w-44 items-center gap-3 rounded-2xl border border-black/10 bg-white/96 px-4 text-sm font-semibold text-rb-black shadow-[0_18px_52px_rgba(1,1,1,0.08)] backdrop-blur-sm`}
							initial={{ opacity: 0, y: 14, scale: 0.98 }}
							key={label}
							transition={{
								delay: 0.08 * index,
								duration: 0.5,
								ease: "easeOut",
							}}
							viewport={{ once: true }}
							whileInView={{ opacity: 1, y: 0, scale: 1 }}
						>
							<span className="flex size-8 items-center justify-center rounded-xl bg-rb-peach text-rb-red">
								<Icon className="size-4" />
							</span>
							{label}
						</motion.div>
						))}

						<motion.div
							className="absolute top-16 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 rounded-full bg-rb-black px-5 py-4 text-white shadow-[0_24px_70px_rgba(1,1,1,0.32)]"
						initial={{ opacity: 0, y: 12, scale: 0.98 }}
						transition={{ delay: 0.42, duration: 0.58, ease: "easeOut" }}
						viewport={{ once: true }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
					>
						{!reducedMotion && (
							<>
								<motion.span
									animate={{ opacity: [0.18, 0, 0.18], scale: [1, 1.8, 1] }}
									className="absolute left-4 size-12 rounded-full border border-rb-red/50"
									transition={{
										duration: 3.4,
										ease: "easeInOut",
										repeat: Infinity,
									}}
								/>
								<motion.span
									animate={{ opacity: [0.12, 0, 0.12], scale: [1, 2.25, 1] }}
									className="absolute left-4 size-12 rounded-full border border-white/20"
									transition={{
										delay: 0.8,
										duration: 4.2,
										ease: "easeInOut",
										repeat: Infinity,
									}}
								/>
							</>
						)}
						<span className="relative flex size-10 items-center justify-center rounded-full border border-white/22 bg-white/5">
							<RadioTowerIcon className="size-5 text-rb-red" />
						</span>
						<Image
							alt="Redtail"
							className="relative h-8 w-auto"
							height={48}
							src="/logo-white.svg"
							width={158}
						/>
					</motion.div>
				</div>

					<div className="mt-10 lg:hidden">
						<motion.div
							className="relative overflow-hidden rounded-[1.75rem] border border-black/10 bg-white p-5 shadow-sm"
							initial={{ opacity: 0, y: 16 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							viewport={{ once: true, amount: 0.35 }}
							whileInView={{ opacity: 1, y: 0 }}
						>
							<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(207,19,23,0.07),transparent_34%)]" />
							<span className="absolute top-12 bottom-12 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-black/12 to-transparent" />
								<p className="relative z-10 mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-rb-black/45">
								Data sources
							</p>
							<div className="relative z-10 grid grid-cols-2 gap-3">
								{integrationNodes.slice(0, 2).map(({ label, Icon }, index) => (
									<motion.div
										className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-3 py-3 text-sm font-semibold text-rb-black shadow-sm"
										initial={{ opacity: 0, y: 10 }}
										key={label}
										transition={{ delay: index * 0.08, duration: 0.42 }}
										viewport={{ once: true }}
										whileInView={{ opacity: 1, y: 0 }}
									>
										<span className="flex size-8 items-center justify-center rounded-xl bg-rb-peach text-rb-red">
											<Icon className="size-4" />
										</span>
										{label}
									</motion.div>
								))}
							</div>

							<div className="relative z-20 my-6 flex justify-center">
								<div className="rounded-full bg-rb-black px-5 py-3 shadow-[0_20px_60px_rgba(1,1,1,0.22)]">
									<Image
										alt="Redtail"
										className="h-7 w-auto"
										height={42}
										src="/logo-white.svg"
										width={138}
									/>
								</div>
							</div>

							<p className="relative z-10 mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-rb-black/45">
								Team tools
							</p>
							<div className="relative z-10 grid grid-cols-2 gap-3">
								{integrationNodes.slice(2).map(({ label, Icon }, index) => (
									<motion.div
										className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-3 py-3 text-sm font-semibold text-rb-black shadow-sm"
										initial={{ opacity: 0, y: 10 }}
										key={label}
										transition={{ delay: 0.16 + index * 0.08, duration: 0.42 }}
										viewport={{ once: true }}
										whileInView={{ opacity: 1, y: 0 }}
									>
										<span className="flex size-8 items-center justify-center rounded-xl bg-rb-peach text-rb-red">
											<Icon className="size-4" />
										</span>
										{label}
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>

						<div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:pb-0 xl:gap-6">
						{featureCards.map((feature, index) => (
							<motion.article
								className="group min-w-[84vw] snap-center overflow-hidden rounded-[1.65rem] border border-black/10 bg-white shadow-sm shadow-black/5 transition-colors duration-300 hover:border-rb-red/20 lg:min-w-0"
							initial={{ opacity: 0, y: 22 }}
							key={feature.title}
							transition={{
								delay: 0.1 * index + 0.24,
								duration: 0.55,
								ease: "easeOut",
							}}
							viewport={{ once: true, amount: 0.28 }}
							whileHover={reducedMotion ? undefined : { y: -5 }}
							whileInView={{ opacity: 1, y: 0 }}
						>
								<div className="p-6 sm:p-7 lg:p-8">
								<div className="flex items-start gap-4">
									<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-rb-peach text-rb-red transition-transform duration-300 group-hover:scale-105">
										<feature.Icon className="size-5" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-rb-black">
											{feature.title}
										</h3>
										<p className="mt-2 max-w-sm text-sm leading-6 text-rb-black/60">
											{feature.description}
										</p>
									</div>
								</div>
							</div>
							<div className={feature.tone}>
								<FeatureVisual
									reducedMotion={reducedMotion}
									type={feature.visual}
								/>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}
