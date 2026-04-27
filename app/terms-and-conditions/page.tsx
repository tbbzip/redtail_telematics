import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Terms | Redtail",
	description: "Terms and conditions information for Redtail Telematics.",
};

export default function TermsAndConditionsPage() {
	return (
		<main className="bg-white pt-28 pb-20">
			<section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
				<p className="text-xs font-semibold tracking-[0.24em] text-rb-red uppercase">
					Legal
				</p>
				<h1 className="mt-4 text-4xl font-semibold tracking-tight text-rb-black sm:text-5xl">
					Terms
				</h1>
				<p className="mt-5 text-base leading-7 text-rb-black/68">
					This page is reserved for Redtail Telematics terms and conditions.
					Replace this placeholder with the approved legal copy before launch.
				</p>
				<Link
					className="mt-8 inline-flex rounded-lg bg-rb-red px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a81218]"
					href="/contact-us"
				>
					Contact Redtail
				</Link>
			</section>
		</main>
	);
}
