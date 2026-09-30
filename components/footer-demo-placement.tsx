"use client";

import { usePathname } from "next/navigation";

/** These landing pages place the same lead form directly below their heroes. */
export function FooterDemoPlacement({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return pathname === "/solutions/fleet-management" ||
		pathname === "/solutions/turo-host-tracking"
		? null
		: children;
}
