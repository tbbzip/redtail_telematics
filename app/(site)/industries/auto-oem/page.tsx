import type { Metadata } from "next";

import { AudiencePage } from "@/components/audience-page";
import { autoOemPage } from "@/lib/audience-pages";
import { defaultSocialImage } from "@/lib/site-metadata";

export const metadata: Metadata = {
	...autoOemPage.metadata,
	alternates: { canonical: autoOemPage.path },
	openGraph: {
		...autoOemPage.metadata,
		url: autoOemPage.path,
		type: "website",
		images: [defaultSocialImage],
	},
	twitter: {
		...autoOemPage.metadata,
		card: "summary_large_image",
		images: [defaultSocialImage],
	},
};

export default function AutoOemPage() {
	return <AudiencePage page={autoOemPage} />;
}
