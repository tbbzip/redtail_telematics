import Image from "next/image";

export function ProductScreenshot({ src, alt, label, caption, className = "", eager = false, aspectRatio = 1.85 }: {
	src: string; alt: string; label: string; caption: string; className?: string; eager?: boolean; aspectRatio?: number;
}) {
	return (
		<figure className={`overflow-hidden rounded-lg border border-white/20 bg-[#f1f3f5] shadow-[0_30px_80px_#0004] ${className}`}>
			<div className="flex items-center justify-between gap-3 border-b border-black/10 bg-white px-4 py-3 text-[10px] font-semibold tracking-[0.12em] text-[#46505d] uppercase"><span>{label}</span><span className="text-rb-red">Redtail</span></div>
			<div className="relative" style={{ aspectRatio }}>
				<Image src={src} alt={alt} fill className="object-contain" sizes="(min-width: 1024px) 620px, 92vw" loading={eager ? "eager" : "lazy"} />
			</div>
			<figcaption className="border-t border-black/10 bg-white px-4 py-3 text-xs leading-5 text-[#55606d]">{caption}</figcaption>
		</figure>
	);
}
