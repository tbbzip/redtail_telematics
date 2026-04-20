import { MarketingPage } from "@/app/_components/marketing-page";
import { Button } from "@/components/ui/button";

export default function ContactUsPage() {
	return (
		<main className="flex-1 bg-background">
			<MarketingPage
				description="Use this page to route visitors to sales, support, or a product walkthrough without making them hunt for the right next step."
				eyebrow="Contact"
				primaryCta={{ href: "#demo", label: "Book a Demo" }}
				secondaryCta={{ href: "mailto:hello@redtailtelematics.com", label: "Email Sales" }}
				title="Contact Us"
			/>
			<section className="mx-auto grid w-full max-w-5xl gap-4 px-4 pb-18 sm:px-6 lg:grid-cols-3 lg:px-8 lg:pb-24">
				<div className="rounded-3xl border bg-rb-light-green p-6">
					<p className="text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase">
						Sales
					</p>
					<p className="mt-3 text-lg font-medium">
						Discuss fleets, insurance programs, and rollout plans.
					</p>
				</div>
				<div className="rounded-3xl border bg-rb-light-blue p-6">
					<p className="text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase">
						Support
					</p>
					<p className="mt-3 text-lg font-medium">
						Route existing customers to onboarding, devices, or platform support.
					</p>
				</div>
				<div className="rounded-3xl border bg-rb-peach p-6" id="demo">
					<p className="text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase">
						Demo
					</p>
					<p className="mt-3 text-lg font-medium">
						Anchor this section to your booking workflow or embedded form.
					</p>
					<Button className="mt-5" variant="outline">
						Add booking form
					</Button>
				</div>
			</section>
		</main>
	);
}
