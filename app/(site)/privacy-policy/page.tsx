import type { Metadata } from "next";

import {
	LegalPolicyPage,
	type LegalSection,
} from "@/components/legal-policy-page";

export const metadata: Metadata = {
	title: "Privacy Policy | Redtail Telematics",
	description:
		"Read how Redtail Telematics collects, uses, protects, and manages personal data through this website.",
	alternates: {
		canonical: "https://www.redtailtelematics.com/privacy-policy",
	},
	openGraph: {
		title: "Privacy Policy | Redtail Telematics",
		description:
			"Read how Redtail Telematics collects, uses, protects, and manages personal data through this website.",
		url: "https://www.redtailtelematics.com/privacy-policy",
		locale: "en_US",
		images: [
			{
				url: "https://www.redtailtelematics.com/og-image.webp",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		site: "@RedtailTele",
		title: "Privacy Policy | Redtail Telematics",
		description:
			"Read how Redtail Telematics collects, uses, protects, and manages personal data through this website.",
		images: ["https://www.redtailtelematics.com/og-image.webp"],
	},
};

const sections: LegalSection[] = [
	{
		id: "who-we-are",
		title: "Who are we",
		children: (
			<>
				<p>
					Redtail Telematics Limited, a company incorporated in England,
					under registration number 07407204 and whose registered office is
					at The Plextek Building, London Road, Great Chesterford, Saffron
					Walden, UK, CB10 1NY. We are an independent electronics design
					consultancy.
				</p>
				<p>
					Redtail Telematics Limited is the controller and responsible for
					your personal data, collectively referred to as &quot;Redtail&quot;,
					&quot;we&quot;, &quot;us&quot; or &quot;our&quot; in this
					Privacy Policy.
				</p>
			</>
		),
	},
	{
		id: "information-collected",
		title: "What information does Redtail collect?",
		children: (
			<>
				<p>
					Personal data means any information about an individual from which
					that person can be identified.
				</p>
				<p>
					We may collect, use, store, and transfer different kinds of
					personal data about you when you contact us directly through the
					contact page or publicly available sources, such as LinkedIn or
					websites.
				</p>
				<p>
					As appropriate, you may be asked to enter your name, email, phone
					number or company&apos;s name. You may, however, visit our site
					anonymously.
				</p>
				<p>
					This website is not intended for children, and we do not knowingly
					collect data relating to children.
				</p>
			</>
		),
	},
	{
		id: "use-of-information",
		title: "What does Redtail Telematics use your information for?",
		children: (
			<>
				<p>
					We will only use your personal data when the law allows us to, in
					the following circumstances:
				</p>
				<ul>
					<li>
						To improve customer service: Your information helps Redtail
						Telematics more effectively respond to your customer service
						requests and support needs.
					</li>
					<li>
						To send periodic emails: The email address you provide may be
						used to send you information, respond to inquiries, and/or other
						requests or questions.
					</li>
					<li>To comply with a legal or regulatory obligation.</li>
				</ul>
				<p>
					We rely on consent only where we have obtained your active
					agreement to use your personal data for specified purposes.
				</p>
			</>
		),
	},
	{
		id: "protect-information",
		title: "How does Redtail Telematics protect your information?",
		children: (
			<>
				<p>
					We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. We limit access to your personal data to employees, agents, contractors, and third parties who have a business need to know. They will only process your personal data on our instructions and are subject to a duty of confidentiality.
				</p>
				<p>
					We also have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
				</p>
			</>
		),
	},
	{
		id: "retention",
		title: "How long we hold your information",
		children: (
			<p>
				We will retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
			</p>
		),
	},
	{
		id: "outside-parties",
		title: "Does Redtail Telematics disclose any information to outside parties?",
		children: (
			<>
				<p>
					Redtail Telematics does not sell, trade, or transfer your personally identifiable information to outside parties. However, it may share the information with trusted third parties who assist Redtail in operating its website, conducting its business, or servicing you, as long as they agree to keep this information confidential.
				</p>
				<p>
					Redtail may also release your information when it believes it is appropriate to comply with the law, enforce its site policies, or protect its rights, property, or safety. Non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.
				</p>
			</>
		),
	},
	{
		id: "international-transfers",
		title: "International transfers",
		children: (
			<>
				<p>
					We share your personal data within Redtail&apos;s Group. This will involve transferring your data outside the UK to our overseas offices in the USA.
				</p>
				<p>
					Whenever we transfer your personal data out of the UK to countries which have laws that do not provide the same level of data protection as the UK law, we always ensure a similar degree of protection is afforded to it by ensuring that safeguards are implemented by standard contractual clauses used for intra-group transfers.
				</p>
				<p>
					We use specific standard contractual terms approved for use in the UK which give the transferred personal data the same protection as it has in the UK, namely the International Data Transfer Agreement.
				</p>
				<p>To obtain a copy of these contractual safeguards, please contact us.</p>
			</>
		),
	},
	{
		id: "california-compliance",
		title: "California Online Privacy Protection Act Compliance",
		children: (
			<p>
				Because Redtail values your privacy, it has taken the necessary precautions to be compliant with the California Online Privacy Protection Act. It therefore will not distribute your personal information to outside parties without your consent.
			</p>
		),
	},
	{
		id: "your-consent",
		title: "Your Consent",
		children: (
			<>
				<p>By using our website, you consent to its website&apos;s privacy policy.</p>
				<ul>
					<li>
						Right to withdraw consent: We only process your personal data based on your consent and you have the right to withdraw your consent at any time without affecting the lawfulness of processing.
					</li>
					<li>
						Right to restrict or object: You have the right to restrict or object to the processing of certain personal information.
					</li>
				</ul>
				<p>
					In cases where we are processing your personal data on the basis of our legitimate interest, you can ask us to stop for reasons connected to your individual situation. We will then do so unless we believe we have a legitimate overriding reason to continue processing your personal data.
				</p>
			</>
		),
	},
	{
		id: "changes",
		title: "Changes to the Redtail Privacy Policy",
		children: (
			<p>
				This Privacy Policy may change over time. We reserve the right to update it at any time for any reason. We will notify you of changes to our Privacy Policy by updating the &quot;last updated&quot; date and posting the updated Privacy Policy on this page.
			</p>
		),
	},
	{
		id: "concerns-and-complaints",
		title: "Concerns and complaints",
		children: (
			<>
				<p>
					If you have any concerns or complaints relating to this policy, its subject matter, or the manner in which we collect, control and/or process your personal information, please let us know by sending an email to our Data Protection Officer (DPO) who is responsible for overseeing questions in relation to this privacy notice.
				</p>
				<p>Details of our DPO are:</p>
				<address className="rounded-lg border border-rb-black/10 bg-rb-peach/35 p-5">
					<strong>Name &amp; Title:</strong> Ian Murphy, Director
					<br />
					<strong>Email address:</strong>{" "}
					<a href="mailto:hello@redtailtelematics.com">
						hello@redtailtelematics.com
					</a>
					<br />
					<strong>Postal address:</strong> The Plextek Building, London Road,
					Great Chesterford, CB10 1NY
					<br />
					<strong>Telephone number:</strong>{" "}
					<a href="tel:+441799533300">01799 533300</a>
				</address>
				<p>
						You have the right to make a complaint at any time to the Information Commissioner&apos;s Office (ICO), the UK supervisory authority for data protection issues (
					<a href="https://www.ico.org.uk" rel="noreferrer" target="_blank">
						www.ico.org.uk
					</a>
					).
				</p>
			</>
		),
	},
	{
		id: "copyright-and-trademark",
		title: "Copyright and Trademark Disclaimer",
		children: (
			<>
				<p>
					All trademarks, trade names, brand names, logos, and service marks of Redtail Telematics Limited and Redtail Telematics Corporation, whether registered or unregistered, are the property of Redtail Telematics Limited and are protected by US, European, and other trademark laws. All other trademarks, product names, and logos cited herein are the property of their respective owners.
				</p>
				<p>
					The contents of this website are subject to copyright protection. Any rights not expressly granted herein are reserved. Reproduction, transfer, distribution, or storage of part or all of the contents in any form, without the permission of an office of Redtail Telematics Limited or Redtail Telematics Corporation, is strictly prohibited.
				</p>
				<p>
					Your access to this site should not be construed as granting, by implication or otherwise, any license or right to use any trademarks or copyright appearing on this site without prior consent of Redtail Telematics Limited, or the third-party owner thereof.
				</p>
				<p>
					Whilst every effort has been taken to ensure the accuracy of the information on this website, any error or omission shall be subject to alteration without any liability to Redtail Telematics, and without any prior declaration. Any liability which may arise from your use or reliance on the information contained on the website is excluded.
				</p>
			</>
		),
	},
	{
		id: "contacting-redtail",
		title: "Contacting Redtail Telematics",
		children: (
			<div className="grid gap-4 sm:grid-cols-2">
				<address className="rounded-lg border border-rb-black/10 bg-white p-5">
					<strong>Redtail Telematics Corporation</strong>
					<br />
					Registration Number US: 77813584
					<br />
					Cabrillo Plaza 3990 Old Town Avenue Bldg B, Suite 104 San Diego,
					California 92110 USA
					<br />
					Local: <a href="tel:+16195469061">+1 619-546-9061</a>
					<br />
					Toll-free: <a href="tel:+18667114880">1-866-711-4880</a>
				</address>
				<address className="rounded-lg border border-rb-black/10 bg-white p-5">
					<strong>Redtail Telematics Limited</strong>
					<br />
					Registration Number UK: 010894475
					<br />
					Plextek Building, London Road, Great Chesterford Essex, CB10 1NY
					UK
					<br />
					<a href="tel:+441799533300">+44 (0) 1799 533300</a>
					<br />
					By email:{" "}
					<a href="mailto:sales@redtailtelematics.com">
						sales@redtailtelematics.com
					</a>
				</address>
			</div>
		),
	},
];

export default function PrivacyPolicyPage() {
	return (
		<LegalPolicyPage
			currentPath="/privacy-policy"
			description="This Privacy Policy sets out how Redtail collects, uses, and protects your personal data through your use of this website, including any data you may provide when you register with us or sign up to our newsletter."
			sections={sections}
			title="Privacy Policy"
		/>
	);
}
