import { GoogleTagManager } from "@next/third-parties/google";

import { normalizeGoogleTagManagerId } from "@/lib/analytics";

export default function GetStartedLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const gtmId = normalizeGoogleTagManagerId(process.env.NEXT_PUBLIC_GTM_ID);

	return (
		<>
			{children}
			{gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
		</>
	);
}
