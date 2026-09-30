"use client";

import { usePathname } from "next/navigation";

/** The fleet page places the same demo form directly below its hero. */
export function FooterDemoPlacement({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return pathname === "/solutions/fleet-management" ? null : children;
}
