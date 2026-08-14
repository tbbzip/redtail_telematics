"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function SiteError({
	error,
	unstable_retry,
}: {
	error: Error & { digest?: string };
	unstable_retry: () => void;
}) {
	useEffect(() => {
		console.error("Site route render failed", { digest: error.digest });
	}, [error]);

	return (
		<main className="grid min-h-[70dvh] place-items-center bg-background px-6 py-24 text-foreground">
			<section className="max-w-xl text-center">
				<p className="text-sm font-semibold tracking-[0.24em] text-rb-red uppercase">
					Temporary issue
				</p>
				<h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
					This page couldn&apos;t load
				</h1>
				<p className="mt-5 text-lg leading-8 text-foreground/65">
					Please try again. If the issue continues, our team can help.
				</p>
				<div className="mt-8 flex flex-wrap justify-center gap-3">
					<Button onClick={() => unstable_retry()}>Try again</Button>
					<Button asChild variant="outline">
						<Link href="/contact-us">Contact Redtail</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}
