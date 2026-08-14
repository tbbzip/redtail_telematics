import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<main className="grid min-h-[70dvh] place-items-center bg-background px-6 py-24 text-foreground">
			<section className="max-w-xl text-center">
				<p className="text-sm font-semibold tracking-[0.24em] text-rb-red uppercase">
					404
				</p>
				<h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
					We couldn&apos;t find that page
				</h1>
				<p className="mt-5 text-lg leading-8 text-foreground/65">
					The address may have changed, or the page may no longer be available.
				</p>
				<div className="mt-8 flex flex-wrap justify-center gap-3">
					<Button asChild>
						<Link href="/">Return home</Link>
					</Button>
					<Button asChild variant="outline">
						<Link href="/contact-us">Contact Redtail</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}
