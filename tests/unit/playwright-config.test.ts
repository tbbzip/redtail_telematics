import { describe, expect, it } from "vitest";

import playwrightConfig from "../../playwright.config";

describe("Playwright server environment", () => {
	it("cannot inherit a real lead-delivery provider or SendGrid credential", () => {
		const webServer = Array.isArray(playwrightConfig.webServer)
			? playwrightConfig.webServer[0]
			: playwrightConfig.webServer;

		expect(webServer?.env).toMatchObject({
			LEAD_DELIVERY_PROVIDER: "webhook",
			LEAD_EMAIL_FROM: "",
			LEAD_EMAIL_FROM_NAME: "",
			LEAD_EMAIL_RECIPIENTS: "",
			LEAD_WEBHOOK_ALLOWED_HOSTS: "",
			LEAD_WEBHOOK_BEARER_TOKEN: "",
			LEAD_WEBHOOK_URL: "",
			SENDGRID_API_KEY: "",
		});
	});
});
