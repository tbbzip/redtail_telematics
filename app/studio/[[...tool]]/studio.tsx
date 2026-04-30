"use client";

import config from "@/sanity.config";
import dynamic from "next/dynamic";
import Image from "next/image";

const NextStudio = dynamic(
	() => import("next-sanity/studio").then((mod) => mod.NextStudio),
	{
		ssr: false,
		loading: () => (
			<div className="flex h-dvh w-screen items-center justify-center bg-[#111216] px-6 text-white">
				<div className="flex flex-col items-center gap-5 text-center">
					<div className="rounded-2xl border border-white/10 bg-white px-5 py-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
						<Image
							src="/logo.svg"
							alt="Redtail Telematics"
							width={180}
							height={55}
							className="h-10 w-auto"
							priority
						/>
					</div>
					<div>
						<p className="text-sm font-semibold tracking-[-0.01em]">
							Loading Redtail Studio
						</p>
						<p className="mt-1 text-xs text-white/55">
							Content operations for Redtail Telematics
						</p>
					</div>
					<div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
						<div className="h-full w-1/2 animate-pulse rounded-full bg-[#d91016]" />
					</div>
				</div>
			</div>
		),
	},
);

export function Studio() {
	return (
		<div className="h-dvh w-screen overflow-hidden bg-[#111216]">
			<NextStudio config={config} />
		</div>
	);
}
