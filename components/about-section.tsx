import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const aboutStats = [
	{
		value: "6M+",
		label: "Devices shipped",
	},
	{
		value: "30B+",
		label: "Miles tracked",
	},
	{
		value: "30+",
		label: "Years in telematics",
	},
];

const officeLocations = [
	{
		title: "UK HQ",
		address:
			"Plextek Building, London Road, Great Chesterford, Essex, CB10 1NY, UK",
		phone: "+44 1799 533300",
		phoneHref: "tel:+441799533300",
		mapHref:
			"https://www.google.com/maps/search/?api=1&query=Plextek+Building+London+Road+Great+Chesterford+Essex+CB10+1NY+UK",
	},
	{
		title: "San Diego",
		address:
			"1420 Kettner Blvd Suite 100, San Diego, CA 92101, United States",
		phone: "+1 619-546-9061",
		phoneHref: "tel:+16195469061",
		mapHref:
			"https://www.google.com/maps/search/?api=1&query=1420+Kettner+Blvd+Suite+100+San+Diego+CA+92101+United+States",
	},
];

export function AboutSection() {
	return (
		<section className="border-b bg-[#fcfbf9]">
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
				<div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
					<div className="order-2 space-y-6 lg:order-1">
						<div className="overflow-hidden border border-black/10 bg-white p-2 shadow-sm shadow-black/5">
							<Image
								alt="Redtail headquarters building in the Cambridge technology cluster"
								className="h-auto w-full"
								height={1000}
								sizes="(max-width: 1024px) 100vw, 720px"
								src="/about/redtail_telematics_hq.jpg"
								width={1500}
							/>
						</div>

						<div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-3">
							{aboutStats.map((stat) => (
								<div className="bg-white px-5 py-5 sm:px-6" key={stat.label}>
									<p className="text-3xl leading-none font-bold tracking-tight text-rb-black sm:text-4xl">
										{stat.value}
									</p>
									<p className="mt-2 text-sm leading-6 text-foreground/72">
										{stat.label}
									</p>
								</div>
							))}
						</div>
					</div>

					<div className="order-1 lg:order-2">
						<p className="text-xs font-semibold tracking-[0.34em] text-rb-red uppercase">
							About Redtail
						</p>
						<h2 className="mt-5 max-w-xl text-4xl leading-tight font-bold tracking-tight text-balance text-rb-black sm:text-5xl">
							A Legacy of Service &amp; Innovation
						</h2>
						<p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/80">
							Redtail is built on quality technology delivering actionable data of
							value.
						</p>

						<div className="mt-8 flex flex-col gap-5 text-sm leading-7 text-foreground/74 sm:text-[15px]">
							<p>
								Born in the Cambridge Technology Cluster, for over 30 years
								we&apos;ve led in stolen vehicle tracking, usage-based insurance,
								and fleet management &amp; optimization.
							</p>
							<p>
								Our customer relationships are fueled by listening,
								responsiveness, and solutions that truly impact your business.
							</p>
							<p>
								With a quality DNA at every layer from device to data, we empower
								your decisions.
							</p>
						</div>

						<div className="mt-10 grid gap-6 border-y border-black/10 py-7 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-8">
							<div className="border-l-2 border-rb-red pl-5">
								<p className="text-[11px] font-semibold tracking-[0.22em] text-rb-red uppercase">
									Accomplished People
								</p>
								<p className="mt-3 max-w-sm text-base leading-7 text-rb-black sm:text-lg">
									We blend your expertise with ours to deliver impactful telematics
									solutions.
								</p>
							</div>

							<div>
								<p className="text-[11px] font-semibold tracking-[0.22em] text-rb-red uppercase">
									Global presence
								</p>
								<p className="mt-3 max-w-xl text-sm leading-7 text-foreground/74 sm:text-[15px]">
									We serve customers worldwide with teams based in key regions for
									faster support and delivery.
								</p>
							</div>
						</div>

						<div className="mt-8 grid gap-5 md:grid-cols-2">
							{officeLocations.map((office) => (
								<article
									className="flex h-full flex-col border-b border-black/10 pb-5 last:border-b-0 md:border-b-0 md:border-l md:border-black/10 md:pl-5 first:md:border-l-0 first:md:pl-0"
									key={office.title}
								>
									<h3 className="text-xl font-semibold text-rb-black">
										{office.title}
									</h3>
									<div className="mt-5 space-y-4 text-sm leading-7 text-foreground/74 sm:text-[15px]">
										<div className="flex items-start gap-3">
											<MapPinIcon className="mt-1 size-4 shrink-0 text-rb-red" />
											<p className="max-w-md">{office.address}</p>
										</div>
										<div className="flex items-start gap-3">
											<PhoneIcon className="mt-1 size-4 shrink-0 text-rb-red" />
											<a
												className="inline-flex transition-colors hover:text-rb-red"
												href={office.phoneHref}
											>
												{office.phone}
											</a>
										</div>
									</div>
									<div className="mt-6">
										<a
											className="inline-flex items-center gap-2 text-sm font-semibold text-rb-black transition-colors hover:text-rb-red"
											href={office.mapHref}
											rel="noreferrer"
											target="_blank"
										>
											View on map
											<ArrowRightIcon className="size-4" />
										</a>
									</div>
								</article>
							))}
						</div>

						<div className="mt-8">
							<Button asChild size="lg">
								<Link href="/contact-us">
									Get in Touch
									<ArrowRightIcon data-icon="inline-end" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
