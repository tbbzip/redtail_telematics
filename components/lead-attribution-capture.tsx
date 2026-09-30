"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

import { captureLeadAttribution } from "@/lib/leads/attribution";

function CaptureCurrentEntry() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		captureLeadAttribution();
	}, [pathname, searchParams]);

	return null;
}

export default function LeadAttributionCapture() {
	return (
		<Suspense fallback={null}>
			<CaptureCurrentEntry />
		</Suspense>
	);
}
