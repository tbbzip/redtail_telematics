import { GoogleTagManager } from "@next/third-parties/google";
import LeadAttributionCapture from "@/components/lead-attribution-capture";

import { normalizeGoogleTagManagerId } from "@/lib/analytics";

export default function GetStartedLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const gtmId = normalizeGoogleTagManagerId(process.env.NEXT_PUBLIC_GTM_ID);

	return (
		<>
			<LeadAttributionCapture />
			{children}
			{gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
		</>
	);
}
