import type { Metadata, Viewport } from "next";

import { Studio } from "./studio";

export const metadata: Metadata = {
	title: "Redtail Studio",
};

export const viewport: Viewport = {
	initialScale: 1,
	width: "device-width",
};

export default function StudioPage() {
	return <Studio />;
}
