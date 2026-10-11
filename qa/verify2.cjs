const { chromium } = require("playwright-core");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 120)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 120)); });
  await page.goto("http://localhost:3100", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.locator("#reviews").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "qa/desktop-reviews.png" });
  // reviews API check
  const api = await page.evaluate(() => fetch("/api/reviews").then((r) => r.json()));
  console.log("reviews API:", JSON.stringify(api));
  await page.locator("#location").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "qa/desktop-location.png" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log("errors:", JSON.stringify(errs), "| overflow:", overflow);
  await browser.close();
})();
