import { defineConfig, devices } from "@playwright/test";

const port = 3100;
const baseURL = `http://127.0.0.1:${port}`;
const safeProcessEnv = Object.fromEntries(
	Object.entries(process.env).filter(
		([key]) =>
			![
				"LEAD_DELIVERY_PROVIDER",
				"LEAD_DELIVERY_TIMEOUT_MS",
				"LEAD_EMAIL_FROM",
				"LEAD_EMAIL_FROM_NAME",
				"LEAD_EMAIL_RECIPIENTS",
				"LEAD_WEBHOOK_ALLOWED_HOSTS",
				"LEAD_WEBHOOK_BEARER_TOKEN",
				"LEAD_WEBHOOK_TIMEOUT_MS",
				"LEAD_WEBHOOK_URL",
				"SENDGRID_API_KEY",
			].includes(key),
	),
);

export default defineConfig({
	fullyParallel: true,
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	reporter: process.env.CI ? "github" : "list",
	retries: process.env.CI ? 1 : 0,
	testDir: "./tests/e2e",
	timeout: 30_000,
	use: {
		baseURL,
		screenshot: "only-on-failure",
		trace: "retain-on-failure",
	},
	webServer: {
		command: `npm start -- -p ${port}`,
		env: {
			...safeProcessEnv,
			LEAD_DELIVERY_PROVIDER: "webhook",
			LEAD_DELIVERY_TIMEOUT_MS: "8000",
			LEAD_EMAIL_FROM: "",
			LEAD_EMAIL_FROM_NAME: "",
			LEAD_EMAIL_RECIPIENTS: "",
			LEAD_WEBHOOK_ALLOWED_HOSTS: "",
			LEAD_WEBHOOK_BEARER_TOKEN: "",
			LEAD_WEBHOOK_URL: "",
			NEXT_TELEMETRY_DISABLED: "1",
			SENDGRID_API_KEY: "",
			SITE_URL: baseURL,
		},
		reuseExistingServer: false,
		timeout: 120_000,
		url: baseURL,
	},
	workers: process.env.CI ? 2 : undefined,
});
