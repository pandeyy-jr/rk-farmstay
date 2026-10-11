const { chromium } = require("playwright-core");
const BASE = "http://localhost:3100";
(async () => {
  const browser = await chromium.launch();

  // 1) Full intro journey: sunrise frame + reveal frame + post-transition hero
  const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e).slice(0, 120)));
  await p.goto(BASE, { waitUntil: "networkidle" });
  await p.waitForTimeout(1100);
  await p.screenshot({ path: "qa/intro-sunrise.png" });
  await p.waitForTimeout(2400);
  await p.screenshot({ path: "qa/intro-reveal.png" });
  await p.waitForTimeout(2600);
  await p.screenshot({ path: "qa/desktop-1440-hero.png" });
  const entered = await p.evaluate(() => ({
    overlayGone: !document.querySelector('[aria-label="RK Farmstay cinematic intro"]'),
    h1: (document.getElementById("hero-heading") || { textContent: "" }).textContent.trim().replace(/\s+/g, " "),
  }));
  console.log("intro journey:", JSON.stringify(entered));

  // 2) Skip button path
  const q = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await q.goto(BASE, { waitUntil: "networkidle" });
  await q.waitForTimeout(900);
  await q.getByRole("button", { name: /skip intro/i }).click();
  await q.waitForTimeout(1200);
  console.log("skip works:", !(await q.getByRole("dialog").count()));
  console.log("seen flag:", await q.evaluate(() => { try { return sessionStorage.getItem("rk-intro-seen"); } catch { return "n/a"; } }));

  // 3) Repeat visit → short intro (overlay shows, exits fast)
  await q.goto(BASE, { waitUntil: "networkidle" });
  await q.waitForTimeout(600);
  const shortShown = await q.getByRole("dialog").count();
  await q.waitForTimeout(2200);
  const shortGone = !(await q.getByRole("dialog").count());
  console.log("repeat short intro shown then gone:", shortShown === 1 && shortGone);
  console.log("errors:", JSON.stringify(errs));
  await browser.close();
})();
