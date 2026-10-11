const { chromium } = require("playwright-core");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 100)));
  await page.goto("http://localhost:3100", { waitUntil: "networkidle" });
  await page.locator("#location").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const facade = page.getByRole("button", { name: /interactive map/ });
  console.log("facade visible:", await facade.isVisible());
  console.log("iframe before click:", await page.locator("#location iframe").count());
  await facade.click();
  await page.waitForTimeout(2500);
  console.log("iframe after click:", await page.locator("#location iframe").count());
  await page.screenshot({ path: "qa/desktop-location.png" });
  // mobile night section
  const m = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await m.goto("http://localhost:3100", { waitUntil: "networkidle" });
  await m.waitForTimeout(1200);
  await m.screenshot({ path: "qa/mobile-390-hero.png" });
  console.log("pageerrors:", JSON.stringify(errs));
  await browser.close();
})();
