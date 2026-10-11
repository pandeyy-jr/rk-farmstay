const { chromium } = require("playwright-core");
(async () => {
  const browser = await chromium.launch();
  // Desktop prod measurement
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  let bytes = 0;
  const byType = {};
  page.on("response", async (res) => {
    try {
      const buf = await res.body();
      bytes += buf.length;
      const t = res.request().resourceType();
      byType[t] = (byType[t] || 0) + buf.length;
    } catch { /* ignore */ }
  });
  await page.goto("http://localhost:3101", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const perf = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const paints = Object.fromEntries(
      performance.getEntriesByType("paint").map((p) => [p.name, Math.round(p.startTime)])
    );
    return {
      domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
      load: Math.round(nav.loadEventEnd),
      paints,
    };
  });
  const kb = (n) => (n / 1024).toFixed(0) + " KB";
  console.log("total transfer:", kb(bytes));
  for (const [k, v] of Object.entries(byType)) console.log("  ", k, kb(v));
  console.log("timing ms:", JSON.stringify(perf));
  await browser.close();
})();
