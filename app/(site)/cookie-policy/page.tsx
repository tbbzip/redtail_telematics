import type { Metadata } from "next";

import {
	LegalPolicyPage,
	type LegalSection,
} from "@/components/legal-policy-page";

const description =
	"This policy describes the current cookie and browser-storage behavior of the Redtail Telematics website.";

export const metadata: Metadata = {
	title: "Cookie Policy | Redtail Telematics",
	description,
	alternates: {
		canonical: "https://www.redtailtelematics.com/cookie-policy",
	},
};

const sections: LegalSection[] = [
	{
		id: "about-cookies",
		title: "About Cookies",
		children: (
			<>
				<p>
					Cookies are small files that a site or its service provider
					transfers to your device through your web browser.
				</p>
				<p>
					The version of this website represented by this policy does not set
					advertising, analytics, preference, or consent cookies. The lead
					forms also do not use cookies or persistent browser storage for
					campaign attribution.
				</p>
			</>
		),
	},
	{
		id: "current-use",
		title: "Current Cookie Use",
		children: (
			<>
				<p>
					No application cookie is intentionally created by the public
					marketing pages, the Schedule a Demo form, or the Get Started form.
					The embedded Sanity Studio at <code>/studio</code> is an administrative
					tool for authorised editors and may use authentication storage supplied
					by Sanity.
				</p>
				<p>
					Hosting and security infrastructure may process request metadata and
					apply provider-managed abuse protections without creating an
					application cookie. Browser extensions or unrelated third-party pages
					may create storage outside Redtail&apos;s control.
				</p>
			</>
		),
	},
	{
		id: "future-changes",
		title: "Future Changes",
		children: (
			<p>
				If Redtail adds optional analytics, advertising, or other non-essential
				cookies, this policy and the site&apos;s consent controls must be updated
				before those cookies are enabled.
			</p>
		),
	},
	{
		id: "deleting-cookies",
		title: "Deleting Cookies",
		children: (
			<p>
				You can stop cookies being stored on your browser in the future or
				delete any cookies that are already on your browser. To do so, refer
				to your browser manufacturer&apos;s instructions by selecting &quot;Help&quot; in
				your browser menu. Information on deleting or controlling browser
				cookies is available at{" "}
				<a href="https://www.aboutcookies.org" rel="noreferrer" target="_blank">
					www.AboutCookies.org
				</a>
				.
			</p>
		),
	},
	{
		id: "talk-to-us",
		title: "Talk to Us About Our Cookies",
		children: (
			<p>
				Should you have any inquiries about our cookie policy, you can contact
				us through our <a href="/contact-us">contact page</a>.
			</p>
		),
	},
];

export default function CookiePolicyPage() {
	return (
		<LegalPolicyPage
			currentPath="/cookie-policy"
			description={description}
			lastUpdated="2026-08-12"
			sections={sections}
			title="Cookie Policy"
		/>
	);
}
