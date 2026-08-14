import type { Instrumentation } from "next";

export const onRequestError: Instrumentation.onRequestError = (
	error,
	_request,
	context,
) => {
	const digest =
		typeof error === "object" && error !== null && "digest" in error
			? String(error.digest)
			: undefined;

	console.error("Unhandled server request error", {
		digest,
		routePath: context.routePath,
		routeType: context.routeType,
	});
};
