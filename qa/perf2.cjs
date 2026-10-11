const { chromium } = require("playwright-core");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const rows = [];
  page.on("response", async (res) => {
    try {
      const buf = await res.body();
      const h = await res.allHeaders().catch(() => ({}));
      rows.push({
        url: res.url().replace("http://localhost:3101", ""),
        kb: Math.round(buf.length / 1024),
        enc: h["content-encoding"] || "-",
      });
    } catch { /* ignore */ }
  });
  await page.goto("http://localhost:3101", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  rows.sort((a, b) => b.kb - a.kb);
  for (const r of rows.slice(0, 18)) console.log(String(r.kb).padStart(6), "KB  enc:" + r.enc, " ", r.url.slice(0, 100));
  await browser.close();
})();
