import Link from "next/link";
import type { Metadata } from "next";

import {
	LegalPolicyPage,
	type LegalSection,
} from "@/components/legal-policy-page";

export const metadata: Metadata = {
	title: "Terms of Service | Redtail Telematics",
	description:
		"Read the terms that apply when using the Redtail Telematics website.",
	alternates: {
		canonical: "https://www.redtailtelematics.com/terms-and-conditions",
	},
};

const sections: LegalSection[] = [
	{
		id: "who-we-are",
		title: "Who we are and how to contact us",
		children: (
			<p>
				www.redtailtelematics.com is a site operated by Redtail Telematics
				Limited. We are registered in England and Wales under company number
				07407204 and have our registered office at Plextek Building, London
				Road, Great Chesterford, Saffron Walden, UK, CB10 1NY. Our VAT
				number is GB 112 6900 46. We are a limited company.
			</p>
		),
	},
	{
		id: "acceptance",
		title: "By using our site, you accept these terms",
		children: (
			<>
				<p>
					By using our site, you confirm that you accept these terms of
					service and that you agree to comply with them.
				</p>
				<p>If you do not agree to these terms, you must not use our site.</p>
			</>
		),
	},
	{
		id: "other-terms",
		title: "There are other terms that may apply to you",
		children: (
			<>
				<p>
					These terms of service refer to the following additional terms,
					which also apply to your use of our site:
				</p>
				<ul>
					<li>
						Our <Link href="/privacy-policy">Privacy Policy</Link>, which
						explains how we collect, use, and store your personal data.
					</li>
					<li>
						Our <Link href="/cookie-policy">Cookies Policy</Link>, which
						sets out information about the cookies on our site.
					</li>
				</ul>
			</>
		),
	},
	{
		id: "changes",
		title: "We may make changes to these terms",
		children: (
			<p>
				We amend these terms from time to time. Every time you wish to use
				our site, please check these terms to ensure you understand the terms
				that apply at that time.
			</p>
		),
	},
];

const description =
	"These terms tell you the rules for using our website www.redtailtelematics.com.";

export default function TermsAndConditionsPage() {
	return (
		<LegalPolicyPage
			currentPath="/terms-and-conditions"
			description={description}
			sections={sections}
			title="Terms of Service"
		/>
	);
}
