import { LogoCloud } from "@/components/logo-cloud";

export function LogosSection() {
	return (
		<section className="border-b border-black/10 bg-white">
			<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				<p className="text-xs font-semibold tracking-[0.28em] text-muted-foreground uppercase">
					Trusted by leading teams
				</p>
				<LogoCloud />
			</div>
		</section>
	);
}
