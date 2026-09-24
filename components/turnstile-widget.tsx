"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Script from "next/script";

const TURNSTILE_SITE_KEY = "0x4AAAAAAFB0y-_9XL6-1Gxh";
const TURNSTILE_SCRIPT =
	"https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
	render: (
		container: HTMLElement,
		options: {
			action: string;
			callback: (token: string) => void;
			"error-callback": () => void;
			"expired-callback": () => void;
			"response-field": boolean;
			sitekey: string;
		},
	) => string;
	remove: (widgetId: string) => void;
	reset: (widgetId: string) => void;
};

declare global {
	interface Window {
		turnstile?: TurnstileApi;
	}
}

export type TurnstileWidgetHandle = {
	reset: () => void;
};

export const TurnstileWidget = forwardRef<
	TurnstileWidgetHandle,
	{ action: "footer_demo" | "get_started"; onTokenChange: (token: string) => void }
>(function TurnstileWidget({ action, onTokenChange }, ref) {
	const containerRef = useRef<HTMLDivElement>(null);
	const widgetIdRef = useRef<string | null>(null);
	const [scriptReady, setScriptReady] = useState(false);
	const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

	useImperativeHandle(ref, () => ({
		reset() {
			onTokenChange("");
			const widgetId = widgetIdRef.current;
			if (widgetId && window.turnstile) {
				window.turnstile.reset(widgetId);
			}
		},
	}), [onTokenChange]);

	useEffect(() => {
		if (!scriptReady || !containerRef.current || !window.turnstile) {
			return;
		}

		let widgetId: string;
		try {
			widgetId = window.turnstile.render(containerRef.current, {
				action,
				callback: (token) => {
					onTokenChange(token);
					setStatus("ready");
				},
				"error-callback": () => {
					onTokenChange("");
					setStatus("error");
				},
				"expired-callback": () => {
					onTokenChange("");
					setStatus("ready");
				},
				"response-field": false,
				sitekey: TURNSTILE_SITE_KEY,
			});
		} catch {
			queueMicrotask(() => setStatus("error"));
			return;
		}

		widgetIdRef.current = widgetId;

		return () => {
			window.turnstile?.remove(widgetId);
			widgetIdRef.current = null;
		};
	}, [action, onTokenChange, scriptReady]);

	return (
		<div aria-label="Security verification" className="mt-4" role="group">
			<Script
				onError={() => setStatus("error")}
				onReady={() => {
					setScriptReady(true);
					setStatus("ready");
				}}
				src={TURNSTILE_SCRIPT}
				strategy="afterInteractive"
			/>
			<div ref={containerRef} />
			{status === "loading" ? (
				<p className="mt-2 text-xs text-rb-black/65" role="status">
					Loading verification…
				</p>
			) : null}
			{status === "error" ? (
				<p className="mt-2 text-xs font-medium text-rb-red" role="alert">
					Verification is unavailable. Reload the page and try again.
				</p>
			) : null}
		</div>
	);
});
