import "server-only";

import { isIP } from "node:net";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileResult = {
	action?: unknown;
	hostname?: unknown;
	success?: unknown;
};

export type TurnstileVerification =
	| "verified"
	| "invalid"
	| "not-configured"
	| "unavailable";

function isHostname(value: string) {
	return (
		value.length <= 253 &&
		/^[a-z0-9.-]+$/.test(value) &&
		value.split(".").every(
			(label) =>
				label.length > 0 &&
				label.length <= 63 &&
				!label.startsWith("-") &&
				!label.endsWith("-"),
		)
	);
}

function siteHostname() {
	try {
		return new URL(process.env.SITE_URL ?? "").hostname.toLowerCase();
	} catch {
		return "";
	}
}

function configuredHostnames() {
	const values = (process.env.TURNSTILE_HOSTNAMES ?? "")
		.split(",")
		.map((hostname) => hostname.trim().toLowerCase())
		.filter(Boolean);
	if (values.some((hostname) => !isHostname(hostname))) {
		return new Set<string>();
	}
	const hostnames = new Set(values);

	if (
		(process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") &&
		(hostnames.has("localhost") || hostnames.has("127.0.0.1"))
	) {
		return new Set<string>();
	}

	return hostnames;
}

export function isTurnstileConfigured() {
	return (
		Boolean(process.env.TURNSTILE_SECRET?.trim()) &&
		configuredHostnames().has(siteHostname())
	);
}

export async function verifyTurnstileToken({
	action,
	clientIp,
	hostname,
	token,
}: {
	action: "footer_demo" | "get_started";
	clientIp: string;
	hostname: string;
	token: string;
}): Promise<TurnstileVerification> {
	const secret = process.env.TURNSTILE_SECRET?.trim();
	const hostnames = configuredHostnames();

	if (!secret || !hostnames.has(siteHostname())) {
		return "not-configured";
	}

	if (!token || token.length > 2048 || !hostnames.has(hostname.toLowerCase())) {
		return "invalid";
	}

	const body = new URLSearchParams({ response: token, secret });
	if (isIP(clientIp)) {
		body.set("remoteip", clientIp);
	}

	let result: TurnstileResult;
	try {
		const response = await fetch(SITEVERIFY_URL, {
			body,
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			method: "POST",
			signal: AbortSignal.timeout(10_000),
		});
		if (!response.ok) {
			return "unavailable";
		}
		result = (await response.json()) as TurnstileResult;
	} catch {
		return "unavailable";
	}

	return result?.success === true &&
		result.action === action &&
		result.hostname === hostname &&
		hostnames.has(hostname.toLowerCase())
		? "verified"
		: "invalid";
}
