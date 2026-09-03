import { describe, expect, it, vi } from "vitest";

import {
	createLeadConversionEvent,
	getAcceptedLeadRequestId,
	normalizeGoogleTagManagerId,
	publishLeadConversion,
} from "@/lib/analytics";

describe("normalizeGoogleTagManagerId", () => {
	it("normalizes a configured container ID and rejects unsafe values", () => {
		expect(normalizeGoogleTagManagerId(" gtm-njbd87xb ")).toBe("GTM-NJBD87XB");
		expect(normalizeGoogleTagManagerId(undefined)).toBeNull();
		expect(normalizeGoogleTagManagerId("G-ABC123")).toBeNull();
		expect(normalizeGoogleTagManagerId("GTM-ABC<script>")).toBeNull();
	});
});

describe("getAcceptedLeadRequestId", () => {
	const submissionId = "10000000-0000-4000-8000-000000000001";

	it("accepts only a 202 response that confirms the submitted UUID", () => {
		expect(
			getAcceptedLeadRequestId({
				result: { ok: true, requestId: submissionId },
				status: 202,
				submissionId,
			}),
		).toBe(submissionId);
	});

	it.each([
		[200, { ok: true, requestId: submissionId }, undefined],
		[202, { ok: false, requestId: submissionId }, undefined],
		[202, { ok: true, requestId: "20000000-0000-4000-8000-000000000002" }, undefined],
		[202, { ok: true, requestId: submissionId }, "not-a-uuid"],
		[202, null, undefined],
	])("rejects an unconfirmed delivery response", (status, result, submittedId) => {
		expect(
			getAcceptedLeadRequestId({
				result,
				status,
				submissionId: submittedId ?? submissionId,
			}),
		).toBeNull();
	});
});

describe("lead conversion events", () => {
	it("creates the exact non-PII event contract", () => {
		expect(
			createLeadConversionEvent({
				formSource: "footer-demo",
				transactionId: "30000000-0000-4000-8000-000000000003",
			}),
		).toEqual({
			event: "redtail_lead_submitted",
			form_source: "footer-demo",
			transaction_id: "30000000-0000-4000-8000-000000000003",
		});
		expect(
			createLeadConversionEvent({
				formSource: "get-started",
				transactionId: "invalid",
			}),
		).toBeNull();
	});

	it("publishes each accepted transaction once", () => {
		const pushEvent = vi.fn();
		const input = {
			formSource: "get-started" as const,
			transactionId: "40000000-0000-4000-8000-000000000004",
		};

		expect(publishLeadConversion(input, pushEvent)).toBe(true);
		expect(publishLeadConversion(input, pushEvent)).toBe(false);
		expect(pushEvent).toHaveBeenCalledTimes(1);
	});

	it("keeps successful form delivery fail-open when analytics throws", () => {
		const transactionId = "50000000-0000-4000-8000-000000000005";
		const failingPush = vi.fn(() => {
			throw new Error("data layer unavailable");
		});

		expect(
			publishLeadConversion(
				{ formSource: "footer-demo", transactionId },
				failingPush,
			),
		).toBe(false);

		const recoveredPush = vi.fn();
		expect(
			publishLeadConversion(
				{ formSource: "footer-demo", transactionId },
				recoveredPush,
			),
		).toBe(true);
		expect(recoveredPush).toHaveBeenCalledOnce();
	});
});
