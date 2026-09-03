import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Platform & Apps presents the evidence-backed product story", async ({ page }) => {
	const response = await page.goto("/platform-and-apps");

	expect(response?.status()).toBe(200);
	await expect(
		page.getByRole("heading", {
			level: 1,
			name: "See every journey. Understand every signal.",
		}),
	).toBeVisible();
	await expect(page.getByRole("link", { name: "Book a platform demo" }).first()).toHaveAttribute(
		"href",
		"/contact-us",
	);
	await expect(page.getByRole("link", { name: "Explore capabilities" })).toHaveAttribute(
		"href",
		"#capabilities",
	);
	await page.getByRole("link", { name: "Explore capabilities" }).click();
	const capabilitiesAnchorPosition = await page.evaluate(() => ({
		headerBottom: document.querySelector("header")?.getBoundingClientRect().bottom ?? 0,
		targetTop: document.querySelector("#capabilities")?.getBoundingClientRect().top ?? -1,
	}));
	expect(capabilitiesAnchorPosition.targetTop).toBeGreaterThanOrEqual(
		capabilitiesAnchorPosition.headerBottom,
	);
	await expect(page.locator("#mobile-apps")).toContainText("Redtail Fleet App");
	await expect(page.locator("#mobile-apps")).toContainText("Redtail Installer App");
	await expect(page.getByText("32 report templates", { exact: false }).first()).toBeVisible();

	const bodyText = await page.locator("body").innerText();
	for (const unsupportedClaim of [
		/24\/7\/365/i,
		/5\.0 on iOS & Android/i,
		/30B\+\s*MILES/i,
		/custom reporting/i,
		/lower insurance premiums/i,
		/instant activation/i,
		/crash detection|crashboard/i,
		/route optimi[sz]ation/i,
		/safe disable/i,
		/automatic reminders?/i,
		/guaranteed delivery/i,
		/full mobile parity/i,
	]) {
		expect(bodyText).not.toMatch(unsupportedClaim);
	}

	await expect(page).toHaveTitle("Fleet Telematics Platform & Mobile Apps | Redtail");
	await expect(page.locator('meta[name="description"]')).toHaveAttribute(
		"content",
		/vehicle status|fleet status/i,
	);

	const visibleImages = page.locator("main img:visible");
	for (const image of await visibleImages.all()) {
		await image.scrollIntoViewIfNeeded();
	}

	const imagesLoaded = await visibleImages.evaluateAll((images) =>
		images.every((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0),
	);
	expect(imagesLoaded).toBe(true);

	const accessibility = await new AxeBuilder({ page })
		.withTags(["wcag2a", "wcag2aa"])
		.analyze();
	expect(accessibility.violations).toEqual([]);
});

for (const viewport of [
	{ name: "mobile", width: 390, height: 844 },
	{ name: "tablet", width: 768, height: 1024 },
	{ name: "desktop", width: 1440, height: 1000 },
]) {
	test(`Platform & Apps has no horizontal overflow at ${viewport.name}`, async ({ page }) => {
		await page.setViewportSize({ width: viewport.width, height: viewport.height });
		await page.goto("/platform-and-apps");

		await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
		await expect(page.locator("#capabilities")).toBeAttached();
		await expect(page.locator("#mobile-apps")).toBeAttached();
		const clippedProofImages = await page
			.locator("#alerts-proof img, #maintenance-proof img, #reports-proof img")
			.evaluateAll((images) =>
				images
					.filter((image) => {
						const rect = image.getBoundingClientRect();
						return (
							rect.width > 0 &&
							(rect.left < -1 || rect.right > document.documentElement.clientWidth + 1)
						);
					})
					.map((image) => image.getAttribute("alt")),
			);
		expect(clippedProofImages).toEqual([]);

		expect(
			await page.evaluate(
				() => document.documentElement.scrollWidth > document.documentElement.clientWidth,
			),
		).toBe(false);
	});
}

test("The mobile-app deep link clears the fixed header", async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto("/platform-and-apps#mobile-apps");
	await expect(page.getByRole("heading", { level: 2, name: "Take the right Redtail view into the field" })).toBeVisible();

	const position = await page.evaluate(() => ({
		headerBottom: document.querySelector("header")?.getBoundingClientRect().bottom ?? 0,
		targetTop: document.querySelector("#mobile-apps")?.getBoundingClientRect().top ?? -1,
	}));
	expect(position.targetTop).toBeGreaterThanOrEqual(position.headerBottom);
});
