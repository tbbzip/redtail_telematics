import type { Metadata } from "next";

import {
	LegalPolicyPage,
	type LegalSection,
} from "@/components/legal-policy-page";

export const metadata: Metadata = {
	title: "Cookie Policy | Redtail Telematics",
	description:
		"Read how Redtail Telematics uses cookies to support website functionality, preferences, and site improvement.",
	alternates: {
		canonical: "https://www.redtailtelematics.com/cookie-policy",
	},
};

const cookieRows = [
	[
		"cookielawinfo-checkbox-analytics",
		"11 months",
		"This cookie is set by the GDPR Cookie Consent plugin. The cookie is used to store the user consent for the cookies in the category Analytics.",
	],
	[
		"cookielawinfo-checkbox-functional",
		"11 months",
		"This cookie is set by the GDPR Cookie Consent plugin to record the user consent for the cookies in the category Functional.",
	],
	[
		"cookielawinfo-checkbox-necessary",
		"11 months",
		"This cookie is set by the GDPR Cookie Consent plugin. The cookie is used to store the user consent for the cookies in the category Necessary.",
	],
	[
		"cookielawinfo-checkbox-others",
		"11 months",
		"This cookie is set by the GDPR Cookie Consent plugin. The cookie is used to store the user consent for the cookies in the category Other.",
	],
	[
		"cookielawinfo-checkbox-performance",
		"11 months",
		"This cookie is set by the GDPR Cookie Consent plugin. The cookie is used to store the user consent for the cookies in the category Performance.",
	],
	[
		"viewed_cookie_policy",
		"11 months",
		"The cookie is set by the GDPR Cookie Consent plugin and is used to store whether or not user has consented to the use of cookies. It does not store any personal data.",
	],
];

const sections: LegalSection[] = [
	{
		id: "about-cookies",
		title: "About Cookies",
		children: (
			<>
				<p>
					Cookies are small files that a site or its service provider
						transfers to your computer&apos;s hard drive through your web browser.
				</p>
				<p>
					Redtail Telematics uses cookies to understand and save your
					preferences for future visits, keep track of advertisements, and
					compile aggregate data about site traffic and site interaction.
				</p>
			</>
		),
	},
	{
		id: "consent",
		title: "Consent to Receive Cookies",
		children: (
			<ul>
				<li>
					Strictly necessary cookies are required for the operation of our
					website. These essential cookies are always enabled because our
					website will not work properly without them.
				</li>
				<li>
					Analytical or performance cookies allow us to recognise and count
					the number of visitors and see how visitors move around our
					website.
				</li>
				<li>
					Functionality cookies are used to recognise you when you return to
					our website, personalise our content, and remember your preferences.
				</li>
			</ul>
		),
	},
	{
		id: "cookie-table",
		title: "Cookie Table",
		children: (
			<>
				<p>
					Necessary cookies are absolutely essential for the website to
					function properly. These cookies ensure basic functionalities and
					security features of the website, anonymously.
				</p>
				<div className="overflow-x-auto rounded-lg border border-rb-black/10">
					<table className="min-w-[760px] text-left text-sm">
						<thead className="bg-rb-black text-white">
							<tr>
								<th className="px-4 py-3 font-semibold">Cookie</th>
								<th className="px-4 py-3 font-semibold">Duration</th>
								<th className="px-4 py-3 font-semibold">Description</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-rb-black/10">
							{cookieRows.map(([cookie, duration, detail]) => (
								<tr key={cookie}>
									<td className="px-4 py-3 font-mono text-xs text-rb-black">
										{cookie}
									</td>
									<td className="px-4 py-3 text-rb-black/68">{duration}</td>
									<td className="px-4 py-3 text-rb-black/68">{detail}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</>
		),
	},
	{
		id: "third-party-cookies",
		title: "Third-Party Cookies",
		children: (
			<p>
				We do not share the information collected by the cookies with any
				third parties.
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

const description =
	"Our website uses cookies to distinguish you from other users and improve your browsing experience.";

export default function CookiePolicyPage() {
	return (
		<LegalPolicyPage
			currentPath="/cookie-policy"
			description={description}
			sections={sections}
			title="Cookie Policy"
		/>
	);
}
