import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight01Icon, Mail01Icon } from "@hugeicons/core-free-icons";

import { HugeIcon } from "@/components/huge-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type LegalSection = {
	id: string;
	title: string;
	children: ReactNode;
};

type LegalPolicyPageProps = {
	title: string;
	description: string;
	sections: LegalSection[];
	currentPath: string;
};

const legalLinks = [
	{
		label: "Privacy Policy",
		href: "/privacy-policy",
	},
	{
		label: "Cookie Policy",
		href: "/cookie-policy",
	},
	{
		label: "Terms",
		href: "/terms-and-conditions",
	},
];

export function LegalPolicyPage({
	title,
	description,
	sections,
	currentPath,
}: LegalPolicyPageProps) {
	return (
		<main className="bg-white">
			<section className="border-b border-rb-black/10 bg-gradient-to-b from-rb-peach/70 to-white pt-28 pb-12 sm:pt-32 sm:pb-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<Badge
						variant="outline"
						className="h-7 rounded-md border-rb-red/25 bg-white/70 px-3 text-rb-red uppercase"
					>
						Legal
					</Badge>
					<div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.28fr)] lg:items-end">
						<div>
							<h1 className="max-w-4xl text-[2.75rem] leading-tight font-semibold tracking-[-0.02em] text-rb-black sm:text-6xl">
								{title}
							</h1>
							<p className="mt-5 max-w-3xl text-base leading-7 text-rb-black/68 sm:text-lg sm:leading-8">
								{description}
							</p>
						</div>
						<div className="flex flex-wrap gap-2 lg:justify-end">
							{legalLinks.map((link) => (
								<Link
									aria-current={
										currentPath === link.href ? "page" : undefined
									}
									className={cn(
										"inline-flex h-9 items-center rounded-md border px-3 text-sm font-semibold transition",
										currentPath === link.href
											? "border-rb-red bg-rb-red text-white"
											: "border-rb-black/10 bg-white text-rb-black/70 hover:border-rb-red/35 hover:text-rb-red"
									)}
									href={link.href}
									key={link.href}
								>
									{link.label}
								</Link>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
				<aside className="lg:sticky lg:top-28 lg:self-start">
					<Card className="rounded-lg border-rb-black/10 bg-white py-0 shadow-sm">
						<CardHeader className="px-5 pt-5 pb-0">
							<CardTitle className="text-base font-semibold text-rb-black">
								On this page
							</CardTitle>
							<CardDescription className="text-sm leading-6 text-rb-black/58">
								Jump to a section.
							</CardDescription>
						</CardHeader>
						<CardContent className="px-5 pt-4 pb-5">
							<nav className="flex flex-col gap-1" aria-label={`${title} sections`}>
								{sections.map((section) => (
									<a
										className="rounded-md px-3 py-2 text-sm leading-5 text-rb-black/64 transition hover:bg-rb-peach/65 hover:text-rb-red"
										href={`#${section.id}`}
										key={section.id}
									>
										{section.title}
									</a>
								))}
							</nav>
						</CardContent>
					</Card>

					<Card className="mt-4 rounded-lg border-rb-black/10 bg-rb-black py-0 text-white shadow-sm">
						<CardHeader className="px-5 pt-5 pb-0">
							<CardTitle className="text-base font-semibold">
								Need help?
							</CardTitle>
							<CardDescription className="text-sm leading-6 text-white/64">
								Contact Redtail if you have questions about these terms or
								policies.
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col gap-3 px-5 pt-4 pb-5">
							<Button asChild className="w-full justify-between rounded-md">
								<Link href="/contact-us">
									Contact us
									<HugeIcon icon={ArrowRight01Icon} size={16} />
								</Link>
							</Button>
							<Link
								className="inline-flex items-center gap-2 text-sm text-white/72 underline decoration-white/20 underline-offset-4 transition hover:text-white"
								href="mailto:sales@redtailtelematics.com"
							>
								<HugeIcon icon={Mail01Icon} size={15} />
								sales@redtailtelematics.com
							</Link>
						</CardContent>
					</Card>
				</aside>

				<article className="min-w-0 rounded-lg border border-rb-black/10 bg-white px-5 py-7 shadow-sm sm:px-8 sm:py-10 lg:px-10">
					{sections.map((section, index) => (
						<section
							className={cn(
								"scroll-mt-28",
								index > 0 && "mt-10 border-t border-rb-black/10 pt-10"
							)}
							id={section.id}
							key={section.id}
						>
							<h2 className="text-2xl leading-tight font-semibold tracking-[-0.01em] text-rb-black sm:text-3xl">
								{section.title}
							</h2>
							<div className="mt-5 space-y-4 text-base leading-7 text-rb-black/68 [&_a]:font-semibold [&_a]:text-rb-red [&_a]:underline-offset-4 [&_a:hover]:underline [&_address]:not-italic [&_strong]:font-semibold [&_strong]:text-rb-black [&_ul]:space-y-3 [&_ul]:pl-0 [&_li]:relative [&_li]:pl-5 [&_li]:before:absolute [&_li]:before:top-[0.8em] [&_li]:before:left-0 [&_li]:before:size-1.5 [&_li]:before:rounded-full [&_li]:before:bg-rb-red">
								{section.children}
							</div>
						</section>
					))}
				</article>
			</section>
		</main>
	);
}
