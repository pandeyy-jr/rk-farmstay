const { chromium } = require("playwright-core");
const ASSETS = [
  "/images/farmstay/rk-farmstay-hero.webp",
  "/images/farmstay/grounds-aerial.webp",
  "/images/farmstay/rooftops-greens.webp",
  "/images/farmstay/pool-day.webp",
  "/images/farmstay/turf-night.webp",
  "/images/farmstay/lawn-cottages.webp",
  "/images/farmstay/poolside-evening.webp",
  "/images/farmstay/pool-night-wide.webp",
  "/images/farmstay/cottage-exterior.webp",
  "/images/farmstay/evening-skies.webp",
  "/images/farmstay/signboard.webp",
];
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const bad = [];
  for (const a of ASSETS) {
    const r = await page.goto(`http://localhost:3100${a}`);
    const ct = r.headers()["content-type"];
    if (r.status() !== 200 || !String(ct).includes("webp")) bad.push(`${a} -> ${r.status()} ${ct}`);
  }
  console.log(bad.length === 0 ? `ALL ${ASSETS.length} ASSETS 200 + image/webp` : "BAD:\n" + bad.join("\n"));
  // hero + intro on the live page (short-intro path)
  await page.addInitScript(() => { try { sessionStorage.setItem("rk-intro-seen", "1"); } catch {} });
  await page.goto("http://localhost:3100", { waitUntil: "networkidle" });
  await page.waitForTimeout(3400);
  const hero = await page.evaluate(() => {
    const img = document.querySelector("#home img");
    return img ? { src: img.currentSrc.split("/").slice(-2).join("/"), w: img.naturalWidth } : null;
  });
  console.log("hero img:", JSON.stringify(hero));
  const failed = [];
  page.on("response", (r) => { if (r.status() >= 400) failed.push(r.url()); });
  await browser.close();
  console.log("done");
})();
