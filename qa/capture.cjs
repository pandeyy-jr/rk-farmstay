/** QA capture: scrolls through the page to trigger reveals, then screenshots. */
const { chromium } = require("playwright-core");

const URL = "http://localhost:3100";

async function scrollThrough(page) {
  const h = await page.evaluate(() => document.body.scrollHeight);
  const steps = Math.ceil(h / 500);
  for (let i = 0; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * 500);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(900);
}

async function capture(name, width, height) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height } });
  // Preset a seen intro so automated captures exercise the short intro path
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem("rk-intro-seen", "1");
    } catch { /* ignore */ }
  });
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(3400);
  await page.screenshot({ path: `qa/${name}-hero.png` });
  await scrollThrough(page);
  await page.screenshot({ path: `qa/${name}-full.png`, fullPage: true });
  // Key sections at natural viewport
  for (const sel of ["#stay", "#experiences", "#gallery", "#contact"]) {
    await page.locator(sel).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `qa/${name}-${sel.slice(1)}.png` });
  }
  // Horizontal overflow check
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(name, "console errors:", JSON.stringify(errors.slice(0, 8)), "| h-overflow px:", overflow);
  await browser.close();
}

(async () => {
  await capture("desktop-1440", 1440, 900);
  await capture("mobile-390", 390, 844);
})();
