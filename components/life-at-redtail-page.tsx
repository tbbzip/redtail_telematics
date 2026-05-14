import Link from "next/link";
import {
	ArrowRight01Icon,
	Briefcase01Icon,
	Building02Icon,
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

const introduction = [
	"Our work requires the smartest minds, and we are always on the lookout for people who are as excited as we are to provide leading-edge technology that empowers customers.",
	"As so many of our projects push the boundaries of engineering, we are often called upon for answers to tomorrow's questions.",
	"We offer an open environment that encourages the discussion of ideas and the independence to explore them fully. Push your boundaries and chart your own success at Redtail through our culture of trust, debate, and support alongside a great remuneration package.",
];

const cultureParagraphs = [
	"Based just south of Cambridge, we have easy road and rail routes to the vibrant city center. Located in a picturesque setting, we understand the importance of stopping and taking note of our surroundings.",
	"Making use of local parklands and rural areas, we have regular cycling, running, and walking groups using the lunch period for wellbeing. We offer opportunities to unwind and have fun with a full calendar of social events, ranging from innovation talks, hiking trips, BBQs, curry nights, dedicated family events, and much more. From a wellbeing perspective, we also benefit from free fresh fruit delivered daily.",
];

const growthParagraphs = [
	"We want our people to do their best work in an environment where they have the facilities and support to do just that. Innovation is at the heart of our business, and we encourage all our people to bring forward ideas that will improve our ability to deliver better solutions.",
	"We provide opportunities for professional development that you would struggle to match elsewhere. Our work covers almost every area imaginable, so you won't be working on just one project or in just one discipline, but you will always be working on something new, and learning and developing fast.",
	"Whatever your role, we believe in giving everyone considerable independence to develop and grow at their own pace, with support on hand to progress learning and careers - whether it's through in-house training or formal learning courses.",
];

function PlaceholderVisual({
	label,
	className = "",
}: {
	label: string;
	className?: string;
}) {
	return (
		<div
			aria-label={label}
			className={`relative overflow-hidden rounded-2xl border border-black/10 bg-[#f7f6f4] ${className}`}
			role="img"
		>
			<div className="absolute inset-0 opacity-70 [background-image:linear-gradient(120deg,rgba(1,1,1,0.08)_1px,transparent_1px),linear-gradient(30deg,rgba(207,19,23,0.11)_1px,transparent_1px)] [background-size:34px_34px,52px_52px]" />
			<div className="absolute inset-6 rounded-2xl border border-black/10 bg-white/72" />
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="flex size-24 items-center justify-center rounded-2xl bg-rb-black text-white shadow-[0_18px_50px_rgba(1,1,1,0.18)]">
					<HugeIcon icon={Building02Icon} size={38} />
				</div>
			</div>
			<div className="absolute right-5 bottom-5 left-5 rounded-xl border border-black/10 bg-white/82 px-4 py-3 backdrop-blur-md">
				<p className="text-xs font-semibold tracking-[0.18em] text-rb-red uppercase">
					Life at Redtail
				</p>
				<p className="mt-1 text-sm font-semibold text-rb-black">{label}</p>
			</div>
		</div>
	);
}

function SectionCopy({
	eyebrow,
	title,
	paragraphs,
}: {
	eyebrow: string;
	title: string;
	paragraphs: string[];
}) {
	return (
		<div>
			<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
				{eyebrow}
			</p>
			<h2 className="mt-4 text-[2.35rem] leading-tight font-semibold text-rb-black sm:text-5xl">
				{title}
			</h2>
			<div className="mt-6 space-y-5 text-base leading-7 text-rb-black/62 sm:text-lg sm:leading-8">
				{paragraphs.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>
		</div>
	);
}

export function LifeAtRedtailHero() {
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

			<div className="relative mx-auto grid max-w-7xl gap-10 lg:min-h-[38rem] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
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
						Life at Redtail
					</h1>

					<p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
						We tackle today&apos;s hardest engineering problems across sensing,
						data collection, and communications.
					</p>
				</div>

				<PlaceholderVisual
					className="min-h-[28rem] border-white/14 bg-white/[0.055] shadow-[0_34px_120px_rgba(0,0,0,0.34)]"
					label="Engineering culture"
				/>
			</div>
		</section>
	);
}

export function LifeIntroductionSection() {
	return (
		<section className="border-b border-black/10 bg-[#fcfbf9] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
			<div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
				<div>
					<p className="text-xs font-semibold tracking-[0.26em] text-rb-red uppercase">
						Introduction
					</p>
					<h2 className="mt-4 text-[2.15rem] leading-tight font-semibold text-rb-black sm:text-5xl">
						Work that asks bigger engineering questions
					</h2>
				</div>
				<Card className="border-black/10 bg-white py-0 shadow-[0_18px_50px_rgba(1,1,1,0.06)] ring-0">
					<CardContent className="space-y-5 px-6 py-6 text-base leading-7 text-rb-black/62 sm:px-8 sm:py-8 sm:text-lg sm:leading-8">
						{introduction.map((paragraph, index) => (
							<p
								className={
									index === 0
										? "text-xl leading-8 text-rb-black/70 sm:text-2xl sm:leading-10"
										: ""
								}
								key={paragraph}
							>
								{paragraph}
							</p>
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}

export function CultureAndGrowthSection() {
	return (
		<section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto grid max-w-7xl gap-14">
				<div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
					<PlaceholderVisual label="Life and culture" className="min-h-[24rem]" />
					<SectionCopy
						eyebrow="Life & Culture"
						paragraphs={cultureParagraphs}
						title="Room to think, recharge, and connect"
					/>
				</div>

				<div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
					<SectionCopy
						eyebrow="Develop & Grow"
						paragraphs={growthParagraphs}
						title="Support for the next stage of your work"
					/>
					<PlaceholderVisual
						label="Development and growth"
						className="min-h-[24rem] lg:order-last"
					/>
				</div>
			</div>
		</section>
	);
}

export function LifeAtRedtailCta() {
	return (
		<section className="bg-[#fcfbf9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<Card className="overflow-hidden border-black/10 bg-rb-black py-0 text-white shadow-[0_24px_70px_rgba(1,1,1,0.16)] ring-0">
					<CardHeader className="gap-5 px-6 pt-6 sm:px-8 sm:pt-8">
						<div className="flex flex-wrap items-center gap-3">
							<Badge className="bg-rb-red text-white">Join Our Team</Badge>
							<span className="flex size-10 items-center justify-center rounded-xl border border-white/16 bg-white/8">
								<HugeIcon icon={Idea01Icon} size={20} />
							</span>
						</div>
						<CardTitle className="max-w-3xl text-[2.15rem] leading-tight font-semibold text-white sm:text-5xl">
							Join Our Team
						</CardTitle>
						<CardDescription className="max-w-3xl text-base leading-7 text-white/64 sm:text-lg sm:leading-8">
							If you&apos;re ready to push the boundaries of engineering and
							make a real impact, we&apos;d love to hear from you.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-3 px-6 pb-6 sm:flex-row sm:px-8 sm:pb-8">
						<Button asChild size="lg">
							<Link href="/careers#current-vacancies">
								View Open Positions
								<HugeIcon data-icon="inline-end" icon={ArrowRight01Icon} />
							</Link>
						</Button>
						<Button
							asChild
							className="border-white/28 bg-white/8 text-white hover:bg-white/14 hover:text-white"
							size="lg"
							variant="outline"
						>
							<Link href="mailto:sales@redtailtelematics.com">
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

export function LifeAtRedtailPageSections() {
	return (
		<>
			<LifeAtRedtailHero />
			<LifeIntroductionSection />
			<CultureAndGrowthSection />
			<LifeAtRedtailCta />
		</>
	);
}
