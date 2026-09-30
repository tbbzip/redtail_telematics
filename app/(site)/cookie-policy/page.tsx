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
		title: "About Cookies and Browser Storage",
		children: (
			<>
				<p>
					Cookies and similar browser technologies allow a website or its
					service providers to remember information or understand how the
					site is used.
				</p>
				<p>
					When configured for production, Redtail uses Google Tag Manager to
					load site measurement technologies on the public marketing pages.
					Those services may set or read cookies and similar identifiers.
				</p>
			</>
		),
	},
	{
		id: "current-use",
		title: "Technologies We Use",
		children: (
			<>
				<p>
					The technologies currently configured through Google Tag Manager
					include Google Analytics, Google Ads conversion measurement, and
					Microsoft Clarity. The site does not currently use a LiveChat widget.
					Those providers may set cookies or use similar storage and may process
					technical and usage information such as browser and device details,
					pages viewed, interactions, referring or campaign information, and
					network information.
				</p>
				<p>
					To connect an inquiry with the visit that led to it, the public
					website uses a limited campaign record in the current tab&apos;s
					session storage with a 30-minute attribution window. It contains the landing page
					path, standard UTM fields, the origin of an external referring
					website, and Google Ads click identifiers (GCLID, GBRAID, or WBRAID)
					when present. It does not contain the contact details you enter in
					the form, and it is not written to cookies or local storage. These
					campaign details accompany an inquiry sent to our lead-management
					provider. If session storage is unavailable, the form still works,
					although attribution across page loads may be incomplete. Google
					Analytics and Google Ads technologies available on those pages may
					use cookies or similar storage to attribute an inquiry to a campaign.
					The embedded Sanity Studio at <code>/studio</code> is an
					administrative tool for authorised editors and may use authentication
					storage supplied by Sanity. Hosting and security providers may also
					process request metadata to operate and protect the site.
				</p>
				<p>
					Expired campaign values are no longer used and are removed when
					the record is next checked. A limited marker remains for that tab
					to prevent an old campaign URL from renewing the same attribution.
					Closing the tab clears its session storage.
				</p>
			</>
		),
	},
	{
		id: "your-choices",
		title: "Managing Cookies",
		children: (
			<p>
				You can block or delete cookies through your browser settings. Blocking
				measurement technologies may reduce Redtail&apos;s ability to understand
				website performance and attribute advertising-driven inquiries, but it
				does not prevent you from submitting the Schedule a Demo or Get Started
				forms.
			</p>
		),
	},
	{
		id: "changes",
		title: "Changes to This Policy",
		children: (
			<p>
				Redtail may update the services or how they are configured.
				We will update this page when those changes materially affect the
				information described here.
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
			lastUpdated="2026-09-29"
			sections={sections}
			title="Cookie Policy"
		/>
	);
}
