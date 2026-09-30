import type { Metadata } from "next";

import { TuroHostTrackingPage } from "@/components/turo-host-tracking-page";
import { defaultSocialImage } from "@/lib/site-metadata";

const title = "GPS Tracking for Turo Hosts | Redtail Telematics";
const description =
	"Ask Redtail about GPS tracking for your Turo host business, device compatibility, installation, and connecting eligible devices to Tint. Request host guidance.";
const canonical = "/solutions/turo-host-tracking";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical },
	openGraph: {
		title,
		description,
		images: [defaultSocialImage],
		url: canonical,
	},
	twitter: { title, description, images: [defaultSocialImage] },
};

export default function Page() {
	return <TuroHostTrackingPage />;
}
