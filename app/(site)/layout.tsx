import { GoogleTagManager } from "@next/third-parties/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { normalizeGoogleTagManagerId } from "@/lib/analytics";

const organizationJsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "Redtail Telematics",
	url: "https://www.redtailtelematics.com",
	logo: "https://www.redtailtelematics.com/logo.svg",
	sameAs: [
		"https://www.facebook.com/redtailtele",
		"https://www.linkedin.com/company/redtail-telematics",
		"https://x.com/RedtailTele",
	],
};

export default function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const gtmId = normalizeGoogleTagManagerId(process.env.NEXT_PUBLIC_GTM_ID);

	return (
		<div
			className="flex min-h-dvh flex-col bg-background text-foreground"
			id="site-root"
		>
			<script
				dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
				type="application/ld+json"
			/>
			<a
				className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-md bg-white px-4 py-3 text-sm font-semibold text-rb-black shadow-lg ring-2 ring-rb-red transition focus:translate-y-0 focus:outline-none"
				href="#main-content"
			>
				Skip to main content
			</a>
			<Header />
			<div className="flex-1 outline-none" id="main-content" tabIndex={-1}>
				{children}
			</div>
			<Footer />
			{gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
		</div>
	);
}
