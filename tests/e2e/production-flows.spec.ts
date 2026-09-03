import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { defaultSocialImageAlt } from "../../lib/site-metadata";

type LeadConversionEvent = {
	event: string;
	form_source: string;
	transaction_id: string;
};

async function getLeadConversionEvents(page: Page) {
	return page.evaluate(() => {
		const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;

		return (dataLayer ?? []).filter(
			(entry): entry is LeadConversionEvent =>
				typeof entry === "object" &&
				entry !== null &&
				"event" in entry &&
				entry.event === "redtail_lead_submitted",
		);
	});
}

test.beforeEach(async ({ page }) => {
	// Never execute a real container while CI exercises the production build.
	await page.route("https://www.googletagmanager.com/gtm.js?**", (route) =>
		route.fulfill({ body: "", contentType: "application/javascript" }),
	);
});

async function completeFooterForm(page: Page) {
	const form = page.locator("footer form");
	await form.getByRole("textbox", { name: "First name" }).fill("Ada");
	await form.getByRole("textbox", { name: "Last name" }).fill("Lovelace");
	await form.getByRole("textbox", { name: "Phone number" }).fill("+1 555 123 4567");
	await form.getByRole("textbox", { name: "Company email" }).fill("ops@example.com");
	await form.getByRole("textbox", { name: "Company name" }).fill("Acme Fleet");
	await form.getByRole("combobox", { name: "Fleet size" }).selectOption("10-49");

	return form;
}

test("homepage renders cleanly and clears automated accessibility checks", async ({
	page,
}) => {
	const consoleErrors: string[] = [];
	page.on("console", (message) => {
		if (message.type() === "error") {
			consoleErrors.push(message.text());
		}
	});

	const response = await page.goto("/");

	expect(response?.status()).toBe(200);
	await expect(
		page.getByRole("heading", {
			level: 1,
			name: "Complete telematics for fleets, insurers, and OEMs",
		}),
	).toBeVisible();
	await expect(page.getByRole("link", { name: "Login" })).toHaveAttribute(
		"href",
		"https://redtailportal.com/",
	);
	expect(
		await page.evaluate(
			() => document.documentElement.scrollWidth > document.documentElement.clientWidth,
		),
	).toBe(false);

	const accessibility = await new AxeBuilder({ page })
		.withTags(["wcag2a", "wcag2aa"])
		.analyze();

	expect(accessibility.violations).toEqual([]);
	expect(consoleErrors).toEqual([]);
});

test("brand icons and social sharing image are published with the expected metadata", async ({
	page,
	request,
}) => {
	await page.goto("/");

	const faviconHref = await page
		.locator('link[rel="icon"][type="image/x-icon"]')
		.getAttribute("href");
	const svgIconHref = await page
		.locator('link[rel="icon"][type="image/svg+xml"]')
		.getAttribute("href");
	const appleIconHref = await page
		.locator('link[rel="apple-touch-icon"]')
		.getAttribute("href");

	for (const [href, contentType] of [
		[faviconHref, "image/x-icon"],
		[svgIconHref, "image/svg+xml"],
		[appleIconHref, "image/png"],
	] as const) {
		expect(href).toBeTruthy();
		const response = await request.get(href as string);
		expect(response.status()).toBe(200);
		expect(response.headers()["content-type"]).toContain(contentType);
	}

	const openGraphImage = page.locator('meta[property="og:image"]');
	await expect(openGraphImage).toHaveAttribute(
		"content",
		"https://www.redtailtelematics.com/opengraph-image",
	);
	await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
		"content",
		defaultSocialImageAlt,
	);
	await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
		"content",
		"https://www.redtailtelematics.com/opengraph-image",
	);

	const socialImageResponse = await request.get("/opengraph-image");
	expect(socialImageResponse.status()).toBe(200);
	expect(socialImageResponse.headers()["content-type"]).toContain("image/png");

	const socialImageDimensions = await page.evaluate(async () => {
		const image = new Image();
		image.src = "/opengraph-image";
		await image.decode();
		return { height: image.naturalHeight, width: image.naturalWidth };
	});
	expect(socialImageDimensions).toEqual({ height: 630, width: 1200 });
});

test("get-started supports native radio keys and shows success only after 202", async ({
	page,
}) => {
	let submittedLead: Record<string, unknown> | undefined;
	await page.route("**/api/leads", async (route) => {
		submittedLead = route.request().postDataJSON() as Record<string, unknown>;
		await route.fulfill({
			body: JSON.stringify({ ok: true, requestId: submittedLead.submissionId }),
			contentType: "application/json",
			status: 202,
		});
	});

	await page.goto(
		"/get-started?utm_source=linkedin&utm_medium=paid-social&utm_campaign=fleet-reset&utm_content=video-a",
		{ referer: "https://www.linkedin.com/feed/" },
	);
	const logistics = page.getByRole("radio", { name: "Logistics" });
	await logistics.focus();
	await page.keyboard.press("Space");
	await page.keyboard.press("ArrowRight");
	await expect(page.getByRole("radio", { name: "Construction" })).toBeChecked();
	await page.getByRole("button", { name: "Next" }).click();

	await page.getByRole("radio", { name: "10 - 49" }).focus();
	await page.keyboard.press("Space");
	await page.getByRole("button", { name: "Next" }).click();
	await page.getByRole("textbox", { name: "First name" }).fill("Ada");
	await page.getByRole("textbox", { name: "Last name" }).fill("Lovelace");
	await page.getByRole("textbox", { name: "Phone number" }).fill("+1 555 123 4567");
	await page.getByRole("textbox", { name: "Company email" }).fill("ops@example.com");
	await page.getByRole("textbox", { name: "Company name" }).fill("Acme Fleet");
	await page.getByRole("button", { name: "Submit" }).click();

	const successHeading = page.getByRole("heading", {
		level: 1,
		name: "Thanks, we'll be in touch soon",
	});
	await expect(successHeading).toBeVisible();
	await expect(successHeading).toBeFocused();
	expect(submittedLead).toMatchObject({
		attribution: {
			landingPath: "/get-started",
			referrerOrigin: "https://www.linkedin.com",
			utmCampaign: "fleet-reset",
			utmContent: "video-a",
			utmMedium: "paid-social",
			utmSource: "linkedin",
		},
		consent: true,
		consentNoticeVersion: "lead-contact-consent-v1",
		fleetSize: "10-49",
		industry: "construction",
		source: "get-started",
	});
	expect(submittedLead?.submissionId).toMatch(
		/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
	);
	const conversionEvents = await getLeadConversionEvents(page);
	expect(conversionEvents).toEqual([
		{
			event: "redtail_lead_submitted",
			form_source: "get-started",
			transaction_id: submittedLead?.submissionId,
		},
	]);
	expect(JSON.stringify(conversionEvents)).not.toContain("ops@example.com");
});

test("server validation focuses the first rejected field", async ({ page }) => {
	await page.route("**/api/leads", (route) =>
		route.fulfill({
			body: JSON.stringify({
				code: "VALIDATION_FAILED",
				fields: { email: ["Enter a valid company email."] },
				ok: false,
			}),
			contentType: "application/json",
			status: 422,
		}),
	);

	await page.goto("/get-started");
	await page.getByRole("radio", { name: "Logistics" }).focus();
	await page.keyboard.press("Space");
	await page.getByRole("button", { name: "Next" }).click();
	await page.getByRole("radio", { name: "10 - 49" }).focus();
	await page.keyboard.press("Space");
	await page.getByRole("button", { name: "Next" }).click();
	await page.getByRole("textbox", { name: "First name" }).fill("Ada");
	await page.getByRole("textbox", { name: "Last name" }).fill("Lovelace");
	await page.getByRole("textbox", { name: "Phone number" }).fill("+1 555 123 4567");
	const email = page.getByRole("textbox", { name: "Company email" });
	await email.fill("ops@example.com");
	await page.getByRole("textbox", { name: "Company name" }).fill("Acme Fleet");
	await page.getByRole("button", { name: "Submit" }).click();

	await expect(page.locator("form").getByRole("alert")).toContainText(
		"Please review the highlighted fields",
	);
	await expect(email).toBeFocused();
	const consentNotice = page.getByText(
		"By submitting this form, you agree to be contacted by Redtail Telematics",
	);
	await expect(page.getByRole("button", { name: "Submit" })).toHaveAttribute(
		"aria-describedby",
		await consentNotice.getAttribute("id") as string,
	);
	expect(await getLeadConversionEvents(page)).toEqual([]);
});

test("footer form sends bounded context, exposes field errors, and focuses the rejected control", async ({
	page,
}) => {
	let submittedLead: Record<string, unknown> | undefined;
	await page.route("**/api/leads", (route) => {
		submittedLead = route.request().postDataJSON() as Record<string, unknown>;
		return route.fulfill({
			body: JSON.stringify({
				code: "VALIDATION_FAILED",
				fields: { phone: ["Enter a valid phone number."] },
				ok: false,
			}),
			contentType: "application/json",
			status: 422,
		});
	});

	await page.goto("/");
	const form = page.locator("footer form");
	await form.getByRole("textbox", { name: "First name" }).fill("Ada");
	await form.getByRole("textbox", { name: "Last name" }).fill("Lovelace");
	const phone = form.getByRole("textbox", { name: "Phone number" });
	await phone.fill("not-a-phone");
	await form.getByRole("textbox", { name: "Company email" }).fill("ops@example.com");
	await form.getByRole("textbox", { name: "Company name" }).fill("Acme Fleet");
	await form.getByRole("combobox", { name: "Fleet size" }).selectOption("10-49");
	await form.getByRole("button", { name: "Schedule demo" }).click();

	await expect(form.getByRole("alert")).toContainText(
		"Please review the highlighted fields",
	);
	await expect(phone).toBeFocused();
	await expect(phone).toHaveAttribute("aria-invalid", "true");
	await expect(form.getByText("Enter a valid phone number.")).toBeVisible();
	expect(submittedLead).toMatchObject({
		attribution: { landingPath: "/" },
		consent: true,
		consentNoticeVersion: "lead-contact-consent-v1",
		source: "footer-demo",
	});
});

test("footer form resets and announces success only after 202", async ({ page }) => {
	let submittedLead: Record<string, unknown> | undefined;
	await page.route("**/api/leads", (route) => {
		submittedLead = route.request().postDataJSON() as Record<string, unknown>;
		return route.fulfill({
			body: JSON.stringify({ ok: true, requestId: submittedLead.submissionId }),
			contentType: "application/json",
			status: 202,
		});
	});

	await page.goto("/");
	const form = await completeFooterForm(page);
	await form.getByRole("button", { name: "Schedule demo" }).click();

	await expect(form.getByRole("status")).toContainText("demo request was received");
	await expect(form.getByRole("textbox", { name: "First name" })).toHaveValue("");
	await expect(form.getByRole("combobox", { name: "Fleet size" })).toHaveValue("");
	expect(await getLeadConversionEvents(page)).toEqual([
		{
			event: "redtail_lead_submitted",
			form_source: "footer-demo",
			transaction_id: submittedLead?.submissionId,
		},
	]);
});

test("honeypot acknowledgements never become conversions in either form", async ({
	page,
}) => {
	const honeypotValues: string[] = [];
	await page.route("**/api/leads", (route) => {
		const submittedLead = route.request().postDataJSON() as Record<string, unknown>;
		honeypotValues.push(String(submittedLead.website));
		return route.fulfill({
			body: JSON.stringify({ ok: true, requestId: submittedLead.submissionId }),
			contentType: "application/json",
			status: 202,
		});
	});

	await page.goto("/get-started");
	await page.getByRole("radio", { name: "Logistics" }).focus();
	await page.keyboard.press("Space");
	await page.getByRole("button", { name: "Next" }).click();
	await page.getByRole("radio", { name: "10 - 49" }).focus();
	await page.keyboard.press("Space");
	await page.getByRole("button", { name: "Next" }).click();
	await page.getByRole("textbox", { name: "First name" }).fill("Ada");
	await page.getByRole("textbox", { name: "Last name" }).fill("Lovelace");
	await page.getByRole("textbox", { name: "Phone number" }).fill("+1 555 123 4567");
	await page.getByRole("textbox", { name: "Company email" }).fill("ops@example.com");
	await page.getByRole("textbox", { name: "Company name" }).fill("Acme Fleet");
	await page.locator('input[name="website"]').evaluate((input) => {
		(input as HTMLInputElement).value = "automated-entry";
	});
	await page.getByRole("button", { name: "Submit" }).click();
	await expect(
		page.getByRole("heading", { name: "Thanks, we'll be in touch soon" }),
	).toBeVisible();
	expect(await getLeadConversionEvents(page)).toEqual([]);

	await page.goto("/");
	const footerForm = await completeFooterForm(page);
	await footerForm.locator('input[name="website"]').evaluate((input) => {
		(input as HTMLInputElement).value = "automated-entry";
	});
	await footerForm.getByRole("button", { name: "Schedule demo" }).click();
	await expect(footerForm.getByRole("status")).toContainText(
		"demo request was received",
	);
	expect(await getLeadConversionEvents(page)).toEqual([]);
	expect(honeypotValues).toEqual(["automated-entry", "automated-entry"]);
});

test("footer form tells a pre-version browser to reload", async ({ page }) => {
	await page.route("**/api/leads", (route) =>
		route.fulfill({
			body: JSON.stringify({ code: "CONSENT_NOTICE_STALE", ok: false }),
			contentType: "application/json",
			status: 409,
		}),
	);

	await page.goto("/");
	const form = await completeFooterForm(page);
	await form.getByRole("button", { name: "Schedule demo" }).click();

	await expect(form.getByRole("alert")).toContainText("Reload the page");
});

test("public readiness, legal, industry, and careers routes match implemented behavior", async ({
	context,
	page,
	request,
}) => {
	const publicPage = await request.get("/");
	const contentSecurityPolicy =
		publicPage.headers()["content-security-policy"];
	expect(contentSecurityPolicy).toContain("https://www.googletagmanager.com");
	expect(contentSecurityPolicy).toContain("https://*.clarity.ms");
	expect(contentSecurityPolicy).not.toContain("livechat");
	expect(contentSecurityPolicy).not.toContain("openwidget");
	expect(contentSecurityPolicy).toContain("media-src 'self' blob: data:");
	expect(contentSecurityPolicy).not.toContain("'unsafe-eval'");

	const studioPage = await request.get("/studio");
	expect(studioPage.headers()["content-security-policy"]).toBeUndefined();

	const health = await request.get("/api/health");
	expect(health.status()).toBe(503);
	expect(await health.json()).toEqual({ status: "not_ready" });
	expect(health.headers()["cache-control"]).toBe("no-store");

	await page.goto("/industries/utilities");
	await expect(
		page.getByRole("heading", {
			name: "Connect industry priorities to the telematics stack",
		}),
	).toBeVisible();
	await expect(page.getByRole("link", { name: "Explore devices" })).toHaveAttribute(
		"href",
		"/solutions/devices",
	);

	await page.goto("/privacy-policy");
	await expect(page.getByText("Last updated: 2026-09-02")).toBeVisible();
	await expect(page.getByText("Registration Number UK: 07407204")).toBeVisible();
	await expect(page.getByText("010894475")).toHaveCount(0);
	await expect(page.getByText(/standard UTM campaign fields/)).toBeVisible();

	await page.goto("/cookie-policy");
	await expect(
		page.getByText(/Google Tag Manager to load site measurement technologies/),
	).toBeVisible();
	await expect(
		page.getByText(/does not currently use a LiveChat widget/),
	).toBeVisible();
	await expect(page.getByText(/privacy choices banner/)).toHaveCount(0);
	await expect(page.getByText(/cookielawinfo-checkbox/)).toHaveCount(0);
	expect(await context.cookies()).toEqual([]);

	await page.goto("/careers");
	await expect(
		page.getByRole("img", {
			name: "Exterior of the Great Chesterford office used by Redtail Telematics",
		}),
	).toBeVisible();
});

test("configured GTM loads without a consent banner on public routes", async ({
	page,
}) => {
	await page.goto("/");
	await expect(
		page.getByRole("heading", { name: "Your privacy choices" }),
	).toHaveCount(0);
	await expect(page.getByRole("button", { name: "Privacy settings" })).toHaveCount(0);
	await expect(
		page.locator('script[src*="googletagmanager.com/gtm.js"]'),
	).toHaveCount(1);
	await expect(
		page.locator('script[src*="googletagmanager.com/gtm.js"]'),
	).toHaveAttribute("src", /[?&]id=GTM-TEST0000(?:&|$)/);
	await expect(page.locator("#_next-gtm-init")).toHaveCount(1);
	expect(
		await page.evaluate(() => {
			const dataLayer = (
				window as unknown as {
					dataLayer?: Array<{ event?: string }>;
				}
			).dataLayer;

			return dataLayer?.some((entry) => entry.event === "gtm.js") ?? false;
		}),
	).toBe(true);

	await page.goto("/get-started");
	await expect(
		page.getByRole("heading", { name: "Your privacy choices" }),
	).toHaveCount(0);
	await expect(
		page.locator('script[src*="googletagmanager.com/gtm.js"]'),
	).toHaveCount(1);
});

test("Sanity Studio does not mount the public GTM container", async ({ page }) => {
	await page.goto("/studio", { waitUntil: "domcontentloaded" });
	await expect(
		page.locator('script[src*="googletagmanager.com/gtm.js"]'),
	).toHaveCount(0);
});

test("mobile navigation traps focus, closes with Escape, and restores focus", async ({
	page,
}) => {
	await page.setViewportSize({ height: 844, width: 390 });
	await page.goto("/");
	const toggle = page.getByRole("button", { name: "Toggle menu" });
	await toggle.click();

	const dialog = page.getByRole("dialog", { name: "Redtail navigation" });
	await expect(dialog).toBeVisible();
	const closeMenu = dialog.getByRole("button", { name: "Close menu" });
	await expect(page.locator("#site-root")).toHaveAttribute("inert", "");

	await closeMenu.click();
	await expect(dialog).toBeHidden();
	await expect(toggle).toBeFocused();

	await toggle.click();
	await expect(dialog).toBeVisible();
	await page.keyboard.press("Escape");
	await expect(dialog).toBeHidden();
	await expect(toggle).toBeFocused();
});

test("solution card dialog restores its trigger and the footer form fails closed", async ({
	page,
}) => {
	await page.route("**/api/leads", (route) =>
		route.fulfill({
			body: JSON.stringify({ code: "DELIVERY_NOT_CONFIGURED", ok: false }),
			contentType: "application/json",
			status: 503,
		}),
	);
	await page.goto("/");
	const cardTrigger = page.getByRole("button", { name: /Fleet Management/ });
	await cardTrigger.click();
	const dialog = page.getByRole("dialog", {
		name: "Providing Flexible Solutions for Fleet Managers",
	});
	await expect(dialog).toBeVisible();
	await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();
	await page.keyboard.press("Escape");
	await expect(dialog).toBeHidden();
	await expect(cardTrigger).toBeFocused();

	const form = page.locator("footer form");
	await form.getByRole("textbox", { name: "First name" }).fill("Ada");
	await form.getByRole("textbox", { name: "Last name" }).fill("Lovelace");
	await form.getByRole("textbox", { name: "Phone number" }).fill("+1 555 123 4567");
	await form.getByRole("textbox", { name: "Company email" }).fill("ops@example.com");
	await form.getByRole("textbox", { name: "Company name" }).fill("Acme Fleet");
	await form.getByRole("combobox", { name: "Fleet size" }).selectOption("10-49");
	const responsePromise = page.waitForResponse(
		(response) => response.url().endsWith("/api/leads") && response.request().method() === "POST",
	);
	await form.getByRole("button", { name: "Schedule demo" }).click();
	const response = await responsePromise;

	expect(response.status()).toBe(503);
	await expect(form.getByRole("alert")).toContainText("We couldn't send your request");
	expect(await getLeadConversionEvents(page)).toEqual([]);
});

test.use({ contextOptions: { reducedMotion: "reduce" } });
test("reduced-motion visitors receive one visible wrapping logo set", async ({ page }) => {
	await page.goto("/");
	await expect(page.locator("footer img[alt='T-Mobile']")).toHaveCount(1);
	for (const label of ["T-Mobile", "Concirrus", "Jaguar", "LoJack", "Fujitsu", "Admiral"]) {
		await expect(page.locator(`footer img[alt='${label}']`)).toBeVisible();
	}
});
