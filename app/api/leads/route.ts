import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

import { deliverLead, LeadDeliveryError } from "@/lib/leads/deliver";
import { checkLeadRateLimit } from "@/lib/leads/rate-limit";
import { LEAD_CONSENT_NOTICE_VERSION } from "@/lib/leads/consent";
import { leadSubmissionSchema } from "@/lib/leads/schema";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_384;

function json(body: Record<string, unknown>, status: number, headers?: HeadersInit) {
	return NextResponse.json(body, {
		headers: {
			"Cache-Control": "no-store",
			...headers,
		},
		status,
	});
}

function isAllowedOrigin(request: NextRequest) {
	const origin = request.headers.get("origin");

	if (!origin) {
		return false;
	}

	const allowedOrigins = new Set<string>();
	const configuredOrigins = [
		process.env.SITE_URL,
		...(process.env.LEAD_ALLOWED_ORIGINS || "").split(","),
		process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
	];

	for (const configuredOrigin of configuredOrigins) {
		if (!configuredOrigin?.trim()) {
			continue;
		}

		try {
			allowedOrigins.add(new URL(configuredOrigin.trim()).origin);
		} catch {
			// Invalid deployment configuration must not weaken the allowlist.
		}
	}

	if (process.env.NODE_ENV === "development") {
		allowedOrigins.add(request.nextUrl.origin);
	}

	return allowedOrigins.has(origin);
}

function getRequestIdentifier(request: NextRequest) {
	const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

	return forwardedFor || request.headers.get("x-real-ip") || "unknown-client";
}

async function readBoundedBody(request: NextRequest) {
	if (!request.body) {
		return { body: "", tooLarge: false };
	}

	const reader = request.body.getReader();
	const chunks: Uint8Array[] = [];
	let totalBytes = 0;

	while (true) {
		const { done, value } = await reader.read();

		if (done) {
			break;
		}

		totalBytes += value.byteLength;

		if (totalBytes > MAX_BODY_BYTES) {
			await reader.cancel();
			return { body: "", tooLarge: true };
		}

		chunks.push(value);
	}

	const bytes = new Uint8Array(totalBytes);
	let offset = 0;

	for (const chunk of chunks) {
		bytes.set(chunk, offset);
		offset += chunk.byteLength;
	}

	return { body: new TextDecoder().decode(bytes), tooLarge: false };
}

export async function POST(request: NextRequest) {
	if (!isAllowedOrigin(request)) {
		return json({ code: "INVALID_ORIGIN", ok: false }, 403);
	}

	const mediaType = request.headers
		.get("content-type")
		?.split(";", 1)[0]
		?.trim()
		.toLowerCase();

	if (mediaType !== "application/json") {
		return json({ code: "UNSUPPORTED_MEDIA_TYPE", ok: false }, 415);
	}

	const contentLength = Number(request.headers.get("content-length") || 0);

	if (contentLength > MAX_BODY_BYTES) {
		return json({ code: "PAYLOAD_TOO_LARGE", ok: false }, 413);
	}

	const rateLimit = checkLeadRateLimit(getRequestIdentifier(request));

	if (!rateLimit.allowed) {
		return json(
			{ code: "RATE_LIMITED", ok: false },
			429,
			{
				"RateLimit-Limit": String(rateLimit.limit),
				"RateLimit-Remaining": "0",
				"RateLimit-Reset": String(rateLimit.retryAfterSeconds),
				"Retry-After": String(rateLimit.retryAfterSeconds),
			},
		);
	}

	let input: unknown;

	try {
		const { body, tooLarge } = await readBoundedBody(request);

		if (tooLarge) {
			return json({ code: "PAYLOAD_TOO_LARGE", ok: false }, 413);
		}

		input = JSON.parse(body);
	} catch {
		return json({ code: "INVALID_JSON", ok: false }, 400);
	}

	const parsed = leadSubmissionSchema.safeParse(input);

	if (!parsed.success) {
		return json(
			{
				code: "VALIDATION_FAILED",
				fields: parsed.error.flatten().fieldErrors,
				ok: false,
			},
			422,
		);
	}

	const { consentNoticeVersion, submissionId, website, ...lead } = parsed.data;
	const requestId = submissionId || randomUUID();

	if (consentNoticeVersion !== LEAD_CONSENT_NOTICE_VERSION) {
		return json({ code: "CONSENT_NOTICE_STALE", ok: false, requestId }, 409);
	}

	if (website) {
		return json({ ok: true, requestId }, 202);
	}

	try {
		await deliverLead(lead, requestId);
		return json({ ok: true, requestId }, 202);
	} catch (error) {
		const code =
			error instanceof LeadDeliveryError ? error.code : "DELIVERY_FAILED";
		const status = code === "DELIVERY_NOT_CONFIGURED" ? 503 : 502;

		console.error("Lead delivery failed", { code, requestId });
		return json({ code, ok: false, requestId }, status);
	}
}
