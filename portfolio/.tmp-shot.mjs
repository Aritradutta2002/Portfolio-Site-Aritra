import { chromium } from "@playwright/test";
import path from "node:path";

const out = process.env.TEMP + "\\shots";
const browser = await chromium.launch({ channel: "chrome", headless: true });

for (const [name, vp] of [
  ["desktop", { width: 1440, height: 1120 }],
  ["mobile", { width: 390, height: 1700 }],
]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("response", (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));

  await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= total; y += 350) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(90);
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(2000);

  if (name === "desktop") {
    const wm = await page.locator(".zro-wordmark").boundingBox();
    if (wm) {
      await page.mouse.move(wm.x + wm.width * 0.3, wm.y + wm.height * 0.5, { steps: 10 });
      await page.waitForTimeout(1000);
    }
  }

  const state = await page.evaluate(() => {
    const els = [...document.querySelectorAll("footer [data-reveal]")];
    return {
      reveals: els.length,
      visible: els.filter((e) => e.classList.contains("is-visible")).length,
      minOpacity: Math.min(...els.map((e) => Number(getComputedStyle(e).opacity))),
      scrollY: Math.round(scrollY),
    };
  });

  await page.screenshot({ path: path.join(out, `footer-${name}.png`) });
  const overflowX = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  console.log(name, { ...state, horizontalOverflow: overflowX, errors });
  await ctx.close();
}

await browser.close();
