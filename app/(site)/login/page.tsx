import { MarketingPage } from "@/app/_components/marketing-page";

export default function LoginPage() {
	return (
		<MarketingPage
			description="Placeholder login route for Redtail customers. Replace this page with your authentication flow or redirect it to the production customer portal."
			eyebrow="Customer Access"
			secondaryCta={{ href: "/contact-us", label: "Contact Us" }}
			title="Login"
		/>
	);
}
