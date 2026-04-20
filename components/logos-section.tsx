import { LogoCloud } from "@/components/logo-cloud";

export function LogosSection() {
	return (
		<section className="border-t bg-white">
			<div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
				<p className="text-xs font-semibold tracking-[0.28em] text-muted-foreground uppercase">
					Trusted by leading teams
				</p>
				<LogoCloud />
			</div>
		</section>
	);
}
