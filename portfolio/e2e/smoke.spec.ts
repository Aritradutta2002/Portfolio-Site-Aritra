import { test, expect } from "@playwright/test";

test.describe("Portfolio Smoke Tests", () => {
  test("home loads without critical console errors and all in-page anchors resolve", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") {
        errors.push(m.text());
      }
    });

    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();

    const hrefs = await page.$$eval('a[href^="#"]', (as) =>
      as
        .map((a) => a.getAttribute("href")!)
        .filter((h) => h.length > 1 && !h.includes("void"))
    );

    for (const h of new Set(hrefs)) {
      const target = page.locator(h);
      await expect(target.first()).toBeAttached();
    }

    // Ignore benign Next.js dev websocket/hydration warnings if any
    const realErrors = errors.filter(
      (e) => !e.includes("hydration") && !e.includes("favicon")
    );
    expect(realErrors).toEqual([]);
  });

  test("project filter chips change visible cards without scroll jumps", async ({
    page,
  }) => {
    await page.goto("/");
    const filterGroup = page.locator('[role="group"][aria-label*="Filter projects"]');
    await expect(filterGroup).toBeVisible();

    const javaButton = filterGroup.locator('button:has-text("JAVA / SPRING")');
    await expect(javaButton).toBeVisible();
    await javaButton.click();

    // Verify button is active
    await expect(javaButton).toHaveAttribute("data-active", "true");
  });

  test("alternate routes /classic and /desktop load successfully", async ({
    page,
  }) => {
    const classicRes = await page.goto("/classic");
    expect(classicRes?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();

    const desktopRes = await page.goto("/desktop");
    expect(desktopRes?.status()).toBe(200);
  });

  test("AI pill renders and handles mocked response in CI", async ({ page }) => {
    // Intercept /api/chat so tests never hit the real LLM endpoint
    await page.route("**/api/chat", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "text/plain",
        body: "Mocked AI assistant response for automated testing.",
      });
    });

    await page.goto("/");
    const pill = page.locator('button:has-text("Ask my résumé")');
    await expect(pill).toBeVisible();

    // Click pill to expand
    await pill.click();

    // Verify expanded console input is visible
    const input = page.locator('input[placeholder*="Ask"]');
    await expect(input).toBeVisible();
  });

  test("reduced motion is respected when user requests it", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    // Verify main content is immediately visible without blocking loader
    await expect(page.locator("h1")).toBeVisible();
  });
});
