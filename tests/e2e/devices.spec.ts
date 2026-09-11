import { expect, test, type Locator, type Page } from "@playwright/test";

test.use({ contextOptions: { reducedMotion: "reduce" } });

const browserErrors = new WeakMap<Page, string[]>();

test.beforeEach(async ({ page }) => {
	const errors: string[] = [];
	browserErrors.set(page, errors);
	page.on("pageerror", (error) => errors.push(error.message));
	await page.route("https://www.googletagmanager.com/gtm.js?**", (route) =>
		route.fulfill({ body: "", contentType: "application/javascript" }),
	);
});

test.afterEach(async ({ page }) => {
	expect(browserErrors.get(page)).toEqual([]);
});

async function leftEdge(locator: Locator) {
	const bounds = await locator.boundingBox();
	expect(bounds).not.toBeNull();
	return bounds!.x;
}

test("Devices uses the corrected product copy and compatibility qualifications", async ({ page }) => {
	const response = await page.goto("/solutions/devices");
	expect(response?.status()).toBe(200);
	await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

	const content = await page.locator("main").innerText();
	for (const unsupportedClaim of [
		/VAM[-\s]HDR/i,
		/solar/i,
		/mag(?:netic)?[-\s]mount/i,
		/AES[-\s]?256/i,
		/dual[-\s]CAN/i,
		/J1939/i,
		/iBeacon|Eddystone/i,
		/100\s*m(?:et(?:er|re)s)?\b/i,
		/350\s*\+/,
		/6\s+form factors/i,
		/All models include GSM\/GPRS/i,
	]) {
		expect(content).not.toMatch(unsupportedClaim);
	}
	await expect(page.locator('#vam-hdr, a[href="#vam-hdr"], img[alt*="VAM-HDR"]')).toHaveCount(0);
	await expect(
		page.getByText("Up to 1 kHz impact sampling and upgradeable over the air (OTA)", { exact: true }),
	).toBeVisible();

	const obd = page.locator("#vam-obd");
	await expect(obd).toContainText(/VIN[^.!?]*DTC[^.!?]*\*/i);
	await expect(obd).toContainText(/not guaranteed[^.!?]*all vehicle manufacturers/i);
	await expect(page.locator("#bluetooth-tag")).toContainText(/no cellular[^.!?]*GPS/i);
});

test("The comparison table omits HDR and unsupported HUB power and battery specifications", async ({ page }) => {
	await page.goto("/solutions/devices");
	const table = page.locator("#technical-specs").getByRole("table");
	const hub = table.getByRole("row").filter({
		has: page.getByRole("cell", { name: "VAM-HUB", exact: true }),
	});
	await expect(hub).toHaveCount(1);
	await expect(hub).not.toContainText(/backup|1\.3\s*Ah/i);
	await expect(table).not.toContainText("VAM-HDR");

	const headings = await table.getByRole("columnheader").allTextContents();
	const powerColumn = headings.findIndex((heading) => /^Power$/i.test(heading.trim()));
	expect(powerColumn).toBeGreaterThanOrEqual(0);
	await expect(hub.getByRole("cell").nth(powerColumn)).toHaveText(/^Vehicle$/i);

	const batteryColumn = headings.findIndex((heading) => /^Battery$/i.test(heading.trim()));
	if (batteryColumn >= 0) {
		// Gordon supplied no replacement capacity; no numeric battery claim should be invented.
		await expect(hub.getByRole("cell").nth(batteryColumn)).not.toContainText(/\d|\bAh\b/i);
	}
});

test("The device family buttons reach both ends and every card has a real destination", async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 1000 });
	await page.goto("/solutions/devices");
	const family = page.getByRole("region", { name: "Device family", exact: true });
	const previous = page.getByRole("button", { name: "Previous devices", exact: true });
	const next = page.getByRole("button", { name: "Next devices", exact: true });
	const cards = family.getByRole("link");
	await family.scrollIntoViewIfNeeded();
	await expect(previous).toBeDisabled();
	await expect(next).toBeEnabled();
	await expect(cards.first()).toBeInViewport({ ratio: 0.95 });

	const destinations = await cards.evaluateAll((links) => links.map((link) => link.getAttribute("href")));
	expect(destinations.length).toBeGreaterThan(1);
	for (const href of destinations) {
		expect(href).toMatch(/^#[a-z0-9-]+$/);
		await expect(page.locator(`[id="${href!.slice(1)}"]`)).toHaveCount(1);
	}

	const initialPosition = await leftEdge(cards.first());
	await next.click();
	await expect.poll(() => leftEdge(cards.first())).toBeLessThan(initialPosition - 30);
	await expect(previous).toBeEnabled();
	await previous.click();
	await expect(previous).toBeDisabled();
	await expect(cards.first()).toBeInViewport({ ratio: 0.95 });

	for (let step = 0; step < destinations.length && await next.isEnabled(); step++) {
		const position = await leftEdge(cards.first());
		await next.click();
		await expect.poll(() => leftEdge(cards.first())).toBeLessThan(position - 1);
	}
	await expect(next).toBeDisabled();
	await expect(cards.last()).toBeInViewport({ ratio: 0.95 });
	await cards.last().click();
	await expect(page).toHaveURL(new RegExp(`${destinations.at(-1)}$`));
});

test("The device family supports keyboard navigation and mouse dragging without opening a card", async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto("/solutions/devices");
	const family = page.getByRole("region", { name: "Device family", exact: true });
	const previous = page.getByRole("button", { name: "Previous devices", exact: true });
	const next = page.getByRole("button", { name: "Next devices", exact: true });
	const cards = family.getByRole("link");
	await family.scrollIntoViewIfNeeded();
	await family.focus();
	await expect(family).toBeFocused();
	await expect(previous).toBeDisabled();
	const initialPosition = await leftEdge(cards.first());

	await page.keyboard.press("ArrowRight");
	await expect.poll(() => leftEdge(cards.first())).toBeLessThan(initialPosition - 30);
	await expect(previous).toBeEnabled();
	await page.keyboard.press("ArrowLeft");
	await expect(previous).toBeDisabled();
	await page.keyboard.press("End");
	await expect(next).toBeDisabled();
	await expect(cards.last()).toBeInViewport({ ratio: 0.95 });
	await page.keyboard.press("Home");
	await expect(previous).toBeDisabled();
	await expect(cards.first()).toBeInViewport({ ratio: 0.95 });

	const cardBounds = await cards.first().boundingBox();
	expect(cardBounds).not.toBeNull();
	const startX = cardBounds!.x + cardBounds!.width * 0.8;
	const startY = cardBounds!.y + cardBounds!.height / 2;
	const urlBeforeDrag = page.url();
	await page.mouse.move(startX, startY);
	await page.mouse.down();
	await page.mouse.move(startX - 190, startY, { steps: 12 });
	await page.mouse.up();
	await expect.poll(() => leftEdge(cards.first())).toBeLessThan(initialPosition - 30);
	await expect(previous).toBeEnabled();
	expect(page.url()).toBe(urlBeforeDrag);
});

for (const width of [390, 1440]) {
	test(`Devices keeps the page within a ${width}px viewport`, async ({ page }) => {
		await page.setViewportSize({ width, height: 1000 });
		await page.goto("/solutions/devices");
		await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
		await expect(page.getByRole("region", { name: "Device family", exact: true })).toBeVisible();
		const pageWidth = await page.evaluate(() => ({
			content: document.documentElement.scrollWidth,
			viewport: document.documentElement.clientWidth,
		}));
		expect(pageWidth.content).toBeLessThanOrEqual(pageWidth.viewport);
		await page.locator("#technical-specs").scrollIntoViewIfNeeded();
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
	});
}
