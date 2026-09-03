export const LEAD_CONVERSION_EVENT = "redtail_lead_submitted";

export type LeadFormSource = "footer-demo" | "get-started";

export type LeadConversionEvent = Readonly<{
	event: typeof LEAD_CONVERSION_EVENT;
	form_source: LeadFormSource;
	transaction_id: string;
}>;

type LeadApiResult = {
	ok?: unknown;
	requestId?: unknown;
};

const UUID_PATTERN =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const trackedTransactionIds = new Set<string>();

export function normalizeGoogleTagManagerId(
	value: string | null | undefined,
): string | null {
	const id = value?.trim().toUpperCase();

	return id && /^GTM-[A-Z0-9]+$/.test(id) ? id : null;
}

export function getAcceptedLeadRequestId({
	result,
	status,
	submissionId,
}: {
	result: LeadApiResult | null;
	status: number;
	submissionId: string;
}): string | null {
	return status === 202 &&
		result?.ok === true &&
		result.requestId === submissionId &&
		UUID_PATTERN.test(submissionId)
		? submissionId
		: null;
}

export function createLeadConversionEvent({
	formSource,
	transactionId,
}: {
	formSource: LeadFormSource;
	transactionId: string;
}): LeadConversionEvent | null {
	return UUID_PATTERN.test(transactionId)
		? {
				event: LEAD_CONVERSION_EVENT,
				form_source: formSource,
				transaction_id: transactionId,
			}
		: null;
}

export function publishLeadConversion(
	input: {
		formSource: LeadFormSource;
		transactionId: string;
	},
	pushEvent: (event: LeadConversionEvent) => void,
): boolean {
	const event = createLeadConversionEvent(input);

	if (!event || trackedTransactionIds.has(event.transaction_id)) {
		return false;
	}

	try {
		pushEvent(event);
		trackedTransactionIds.add(event.transaction_id);
		return true;
	} catch {
		// Measurement must never turn a delivered lead into a failed submission.
		return false;
	}
}
