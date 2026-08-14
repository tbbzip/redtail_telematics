import type { Metadata, Viewport } from "next";

import { Studio } from "./studio";

export const metadata: Metadata = {
	title: "Redtail Studio",
	robots: {
		follow: false,
		index: false,
		noarchive: true,
		nosnippet: true,
	},
};

export const viewport: Viewport = {
	initialScale: 1,
	width: "device-width",
};

export default function StudioPage() {
	return <Studio />;
}
