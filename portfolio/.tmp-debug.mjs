import { chromium } from "@playwright/test";

const browser = await chromium.launch({ channel: "chrome", headless: true });
let ok = true;
for (const [name, vp] of [
  ["desktop-1920", { width: 1920, height: 1000 }],
  ["desktop-1440", { width: 1440, height: 900 }],
  ["desktop-1024", { width: 1024, height: 800 }],
  ["tablet-768", { width: 768, height: 900 }],
  ["mobile-390", { width: 390, height: 844 }],
  ["mobile-360", { width: 360, height: 800 }],
  ["mobile-320", { width: 320, height: 700 }],
]) {
  const page = await (await browser.newContext({ viewport: vp })).newPage();
  await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const res = await page.evaluate(() => {
    const base = document.querySelector(".zro-wordmark-base");
    const box = document.querySelector(".zro-wordmark");
    const r = document.createRange();
    r.selectNodeContents(base);
    const t = r.getBoundingClientRect();
    const mail = document.querySelector(".zro-contact-card .zro-copy");
    const lh = parseFloat(getComputedStyle(mail).lineHeight) || 20;
    return {
      containerW: Math.round(box.clientWidth),
      textW: Math.round(t.width),
      marginPx: Math.round(box.clientWidth - t.width),
      emailLines: Math.round(mail.getBoundingClientRect().height / lh),
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });
  const pass = res.marginPx >= 0 && res.emailLines <= (vp.width <= 320 ? 2 : 1) && !res.overflowX;
  if (!pass) ok = false;
  console.log(pass ? "PASS" : "FAIL", name, JSON.stringify(res));
  await page.close();
}
console.log(ok ? "ALL PASS" : "SOME FAILED");
await browser.close();
