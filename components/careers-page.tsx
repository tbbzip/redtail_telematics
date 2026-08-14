import Image from "next/image";
import Link from "next/link";
import {
	ArrowRight01Icon,
	Briefcase01Icon,
	CheckmarkCircle02Icon,
	Idea01Icon,
	Mail01Icon,
} from "@hugeicons/core-free-icons";

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
import { type JobOpening } from "@/lib/jobs";

const cvEmailHref =
	"mailto:sales@redtailtelematics.com?subject=Speculative%20career%20application";

const reasons = [
	"Be part of a dynamic team pushing the boundaries of engineering.",
	"Work on innovative projects in sensing, data collection, and communications.",
	"Enjoy a collaborative environment that encourages idea sharing and innovation.",
	"Benefit from professional growth opportunities and continuous learning.",
	"Join a company that values work-life balance and employee well-being.",
];

function getJobApplication(job: JobOpening) {
	if (job.applicationUrl) {
		return {
			external: true,
			href: job.applicationUrl,
			label: "View role and apply",
		};
	}

	const email = job.applicationEmail || "sales@redtailtelematics.com";
	const subject = encodeURIComponent(`Career application: ${job.title}`);

	return {
		external: false,
		href: `mailto:${email}?subject=${subject}`,
		label: "Email about this role",
	};
}

function CareersImage({
	alt,
	className = "",
	label,
	src,
}: {
	alt: string;
	className?: string;
	label: string;
	src: string;
}) {
	return (
		<figure
			className={`relative overflow-hidden rounded-2xl border border-black/10 bg-[#f7f6f4] ${className}`}
		>
			<Image
				alt={alt}
				className="object-cover"
				fill
				sizes="(min-width: 1024px) 52vw, 100vw"
				src={src}
			/>
			<div className="absolute inset-0 bg-linear-to-t from-rb-black/60 via-transparent to-transparent" />
			<figcaption className="absolute right-5 bottom-5 left-5 rounded-xl border border-white/14 bg-rb-black/52 px-4 py-3 text-white backdrop-blur-md">
				<p className="text-xs font-semibold tracking-[0.18em] text-rb-red uppercase">
					Redtail careers
				</p>
				<p className="mt-1 text-sm font-semibold">{label}</p>
			</figcaption>
		</figure>
	);
}

export function CareersHero() {
	return (
		<section className="relative isolate overflow-hidden rounded-b-3xl bg-rb-black px-4 pt-24 pb-14 text-white sm:px-6 sm:pt-32 sm:pb-18 lg:px-8 lg:pt-28">
			<div
				aria-hidden="true"
				className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(207,19,23,0.24),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.1),transparent_24%),linear-gradient(135deg,#010101,#171514_58%,#010101)]"
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 opacity-30 [background-image:linear-gradient(120deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(30deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:36px_36px,58px_58px]"
			/>

			<div className="relative mx-auto grid max-w-7xl gap-10 lg:min-h-[40rem] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
				<div className="max-w-3xl">
					<div className="inline-flex items-center gap-3">
						<span className="flex size-10 items-center justify-center rounded-md bg-rb-red text-white shadow-[0_16px_34px_rgba(207,19,23,0.32)]">
							<HugeIcon icon={Briefcase01Icon} />
						</span>
						<p className="text-xs font-semibold tracking-[0.28em] text-white/78 uppercase">
							Careers
						</p>
					</div>

					<h1 className="mt-7 max-w-3xl text-[2.65rem] leading-[1.02] font-semibold text-balance text-white sm:text-6xl sm:leading-tight">
						Careers at Redtail Telematics
					</h1>

					<p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
						We&apos;re always on the lookout for exceptional talent.
					</p>
				</div>

				<CareersImage
					alt="Exterior of the Great Chesterford office used by Redtail Telematics"
					className="min-h-[28rem] border-white/14 bg-white/[0.055] shadow-[0_34px_120px_rgba(0,0,0,0.34)]"
					label="Great Chesterford workplace"
					src="/careers-building.jpg"
				/>
			</div>
		</section>
	);
}

export function CareersIntroSection() {
	return (
		<section className="border-b border-black/10 bg-[#fcfbf9] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
			<div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
				<div>
					<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
						Introduction
					</p>
					<h2 className="mt-4 text-[2.15rem] leading-tight font-semibold text-rb-black sm:text-5xl">
						We&apos;d love to hear from you
					</h2>
				</div>
				<Card className="border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0">
					<CardHeader className="gap-5 px-6 pt-6 sm:px-8 sm:pt-8">
						<CardDescription className="text-xl leading-8 text-rb-black/68 sm:text-2xl sm:leading-10">
							If you&apos;re passionate about technology and eager to make a real
							impact, we&apos;d love to hear from you.
						</CardDescription>
						<CardDescription className="text-base leading-7 text-rb-black/58">
							Even if you don&apos;t see a specific role listed, feel free to
							send us your CV today!
						</CardDescription>
					</CardHeader>
					<CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
						<Button asChild size="lg">
							<Link href={cvEmailHref}>
								<HugeIcon data-icon="inline-start" icon={Mail01Icon} />
								Email Us Your CV
							</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}

export function WhyJoinRedtailSection() {
	return (
		<section className="border-b border-black/10 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
				<CareersImage
					alt="Redtail Telematics headquarters at the Plextek Building"
					className="min-h-[24rem]"
					label="Redtail Telematics headquarters"
					src="/about/redtail_telematics_hq.jpg"
				/>

				<div>
					<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
						Why join Redtail Telematics?
					</p>
					<h2 className="mt-4 text-[2.35rem] leading-tight font-semibold text-rb-black sm:text-5xl">
						Why Join Redtail Telematics?
					</h2>
					<div className="mt-8 grid gap-3">
						{reasons.map((reason) => (
							<div
								className="flex items-start gap-3 rounded-xl border border-black/10 bg-[#fcfbf9] p-4"
								key={reason}
							>
								<span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-rb-red/40 text-rb-red">
									<HugeIcon icon={CheckmarkCircle02Icon} size={13} />
								</span>
								<p className="text-sm leading-6 text-rb-black/68 sm:text-base sm:leading-7">
									{reason}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export function CurrentVacanciesSection({ jobs }: { jobs: JobOpening[] }) {
	return (
		<section
			className="scroll-mt-24 bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:scroll-mt-28 lg:px-8 lg:py-24"
			id="current-vacancies"
		>
			<div className="mx-auto max-w-7xl">
				<header>
					<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
						Open roles
					</p>
					<h2 className="mt-4 text-[2.35rem] leading-tight font-semibold text-rb-black sm:text-5xl">
						Current Vacancies
					</h2>
				</header>

				{jobs.length > 0 ? (
					<div className="mt-10 grid gap-5 md:grid-cols-2">
						{jobs.map((job) => {
							const details = [job.department, job.location]
								.filter(Boolean)
								.join(" - ");
							const application = getJobApplication(job);

							return (
								<Card
									className="border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0"
									key={job.id}
								>
									<CardHeader className="gap-5 px-6 pt-6 sm:px-7 sm:pt-7">
										<div className="flex items-start justify-between gap-4">
											<div className="flex size-12 items-center justify-center rounded-xl bg-rb-black text-white">
												<HugeIcon icon={Briefcase01Icon} size={22} />
											</div>
											{job.type ? (
												<Badge className="bg-rb-red text-white">{job.type}</Badge>
											) : null}
										</div>
										<div>
											<CardTitle className="text-2xl leading-tight font-semibold text-rb-black">
												{job.title}
											</CardTitle>
											{details ? (
												<CardDescription className="mt-2 text-sm leading-6 text-rb-black/54">
													{details}
												</CardDescription>
											) : null}
										</div>
										<CardDescription className="text-base leading-7 text-rb-black/58">
											{job.summary}
										</CardDescription>
									</CardHeader>
									<CardContent className="px-6 pb-6 sm:px-7 sm:pb-7">
										<Button asChild variant="outline">
										<a
											href={application.href}
											rel={application.external ? "noreferrer" : undefined}
											target={application.external ? "_blank" : undefined}
										>
											{application.label}
											<HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
										</a>
										</Button>
									</CardContent>
								</Card>
							);
						})}
					</div>
				) : (
					<Card className="mt-10 border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0">
						<CardHeader className="gap-5 px-6 pt-6 sm:px-8 sm:pt-8">
							<div className="flex size-12 items-center justify-center rounded-xl bg-rb-red text-white">
								<HugeIcon icon={Idea01Icon} size={22} />
							</div>
							<CardTitle className="text-3xl leading-tight font-semibold text-rb-black">
								We currently don&apos;t have any open vacancies.
							</CardTitle>
							<CardDescription className="max-w-3xl text-base leading-7 text-rb-black/60 sm:text-lg sm:leading-8">
								However, we&apos;re always keen to hear from talented people.
								Feel free to send us your CV and we&apos;ll keep it on file for
								future opportunities.
							</CardDescription>
						</CardHeader>
						<CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
							<Button asChild size="lg">
								<Link href={cvEmailHref}>
									<HugeIcon data-icon="inline-start" icon={Mail01Icon} />
									Email Us Your CV
								</Link>
							</Button>
						</CardContent>
					</Card>
				)}
			</div>
		</section>
	);
}

export function CareersPageSections({ jobs }: { jobs: JobOpening[] }) {
	return (
		<>
			<CareersHero />
			<CareersIntroSection />
			<WhyJoinRedtailSection />
			<CurrentVacanciesSection jobs={jobs} />
		</>
	);
}
