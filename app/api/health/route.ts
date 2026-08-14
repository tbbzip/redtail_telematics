import { NextResponse } from "next/server";

import { getProductionReadiness } from "@/lib/production-readiness";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const headers = {
	"Cache-Control": "no-store",
	"X-Robots-Tag": "noindex, nofollow",
};

function status() {
	return getProductionReadiness().ready ? 200 : 503;
}

export function GET() {
	const responseStatus = status();

	return NextResponse.json(
		{ status: responseStatus === 200 ? "ready" : "not_ready" },
		{ headers, status: responseStatus },
	);
}

export function HEAD() {
	return new Response(null, { headers, status: status() });
}
