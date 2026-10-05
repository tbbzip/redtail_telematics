import Image from "next/image";

import { cn } from "@/lib/utils";

type ResourceVisualProps = {
	src?: string;
	alt?: string;
	title: string;
	category: string;
	kind?: string;
	fit?: "cover" | "contain";
	sizes: string;
	compact?: boolean;
};

export function ResourceVisual({
	src,
	alt = "",
	title,
	category,
	kind = "Resource",
	fit = "contain",
	sizes,
	compact = false,
}: ResourceVisualProps) {
	if (src) {
		return (
			<div className="absolute inset-0 bg-[#f3f5f7]">
				<Image alt={alt} className={cn("transition duration-500 group-hover:scale-[1.025]", fit === "contain" ? "object-contain p-3 sm:p-4" : "object-cover")} fill sizes={sizes} src={src} />
			</div>
		);
	}

	const light = kind === "Guide" || kind === "Event";

	return (
		<div
			aria-hidden="true"
			className={cn(
				"absolute inset-0 flex flex-col justify-between overflow-hidden border border-black/8",
				light ? "bg-[#e9edf0] text-[#16202c]" : "bg-[#15212e] text-white",
				compact ? "p-4" : "p-5 sm:p-7",
			)}
		>
			<div className={cn("flex items-start justify-between gap-3 border-t-2 pt-3", light ? "border-rb-red" : "border-[#ef555b]")}>
				<span className={cn("line-clamp-2 text-[9px] leading-4 font-semibold tracking-[0.14em] uppercase", light ? "text-[#4b5968]" : "text-white/70")}>{category}</span>
				{kind !== category ? <span className={cn("shrink-0 text-[9px] leading-4", light ? "text-[#4b5968]" : "text-white/70")}>{kind}</span> : null}
			</div>
			<p className={cn("my-3 line-clamp-4 font-semibold tracking-[-0.025em] text-pretty break-words", compact ? "text-[15px] leading-[1.28]" : "text-xl leading-[1.2] sm:text-2xl")}>{title}</p>
			{compact ? null : <span className={cn("text-[9px] font-medium tracking-[0.12em] uppercase", light ? "text-[#4b5968]" : "text-white/60")}>Redtail Telematics</span>}
		</div>
	);
}
