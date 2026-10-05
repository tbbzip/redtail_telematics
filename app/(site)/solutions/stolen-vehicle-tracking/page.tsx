import type { Metadata } from "next";

import { AudiencePage } from "@/components/audience-page";
import { stolenVehicleTrackingPage } from "@/lib/audience-pages";
import { defaultSocialImage } from "@/lib/site-metadata";

export const metadata: Metadata = {
	...stolenVehicleTrackingPage.metadata,
	alternates: { canonical: stolenVehicleTrackingPage.path },
	openGraph: {
		...stolenVehicleTrackingPage.metadata,
		url: stolenVehicleTrackingPage.path,
		type: "website",
		images: [defaultSocialImage],
	},
	twitter: {
		...stolenVehicleTrackingPage.metadata,
		card: "summary_large_image",
		images: [defaultSocialImage],
	},
};

export default function StolenVehicleTrackingPage() {
	return <AudiencePage page={stolenVehicleTrackingPage} />;
}
