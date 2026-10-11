const { chromium } = require("playwright-core");
const BASE_URL = "http://localhost:3100";
const results = [];
const check = (name, ok, extra = "") => {
  results.push(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? "  — " + extra : ""}`);
};

(async () => {
  const browser = await chromium.launch();

  /* ---------- Desktop interactions ---------- */
  const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await d.addInitScript(() => {
    try {
      sessionStorage.setItem("rk-intro-seen", "1");
    } catch { /* ignore */ }
  });
  d.on("pageerror", (e) => check("no page errors (desktop)", false, String(e).slice(0, 120)));
  await d.goto(BASE_URL, { waitUntil: "networkidle" });
  await d.waitForTimeout(3000);

  // Lightbox: open first item
  await d.locator("#gallery").scrollIntoViewIfNeeded();
  await d.waitForTimeout(900);
  await d.locator('#gallery button[aria-label^="Open photo"]').first().click();
  await d.waitForTimeout(500);
  check("lightbox opens", await d.getByRole("dialog").isVisible());
  check("lightbox counter 1/9", (await d.locator("text=1 / 9").count()) === 1);
  await d.keyboard.press("ArrowRight");
  await d.waitForTimeout(400);
  check("lightbox next via keyboard", (await d.locator("text=2 / 9").count()) === 1);
  await d.keyboard.press("Escape");
  await d.waitForTimeout(400);
  check("lightbox closes on Escape", (await d.getByRole("dialog").count()) === 0);

  // Gallery filter
  await d.getByRole("button", { name: "Pool", exact: true }).click();
  await d.waitForTimeout(600);
  const poolCount = await d.locator('#gallery button[aria-label^="Open photo"]').count();
  check("gallery filter Pool shows 1 item", poolCount === 1, `got ${poolCount}`);
  await d.getByRole("button", { name: "All", exact: true }).click();
  await d.waitForTimeout(600);

  // Form validation
  await d.locator("#contact").scrollIntoViewIfNeeded();
  await d.waitForTimeout(800);
  await d.getByRole("button", { name: /Send Enquiry/ }).click();
  await d.waitForTimeout(300);
  const alerts = await d.locator('#contact [role="alert"]').count();
  check("empty submit shows validation errors", alerts >= 3, `got ${alerts}`);

  // Valid submit -> WhatsApp popup URL
  await d.locator("#in-date").fill("2026-12-24");
  await d.locator("#out-date").fill("2026-12-26");
  await d.locator("#bk-name").fill("Test Guest");
  await d.locator("#bk-phone").fill("9876543210");
  const [popup] = await Promise.all([
    d.waitForEvent("popup", { timeout: 8000 }).catch(() => null),
    d.getByRole("button", { name: /Send Enquiry/ }).click(),
  ]);
  if (popup) {
    const url = popup.url();
    let okUrl = false;
    try {
      const u = new URL(url);
      const text = u.searchParams.get("text") || "";
      // wa.me redirects to api.whatsapp.com — accept either host
      okUrl =
        (u.hostname === "wa.me" || u.hostname === "api.whatsapp.com") &&
        (u.searchParams.get("phone") === "917775807655" ||
          url.includes("917775807655")) &&
        text.includes("Test Guest") &&
        text.includes("Dec, 2026") &&
        text.includes("Guests: 2");
    } catch {
      okUrl = false;
    }
    check("whatsapp enquiry URL correct", okUrl, url.slice(0, 90) + "…");
    await popup.close();
  } else {
    check("whatsapp enquiry popup opens", false, "no popup");
  }
  await d.waitForTimeout(500);
  check("success state shows", (await d.locator("text=Enquiry sent!").count()) === 1);

  // Past date + checkout-before-checkin
  await d.getByRole("button", { name: /New enquiry/ }).click();
  await d.waitForTimeout(300);
  await d.locator("#in-date").fill("2026-12-26");
  await d.locator("#out-date").fill("2026-12-24");
  await d.locator("#bk-name").fill("X Y");
  await d.locator("#bk-phone").fill("9876543210");
  await d.getByRole("button", { name: /Send Enquiry/ }).click();
  await d.waitForTimeout(300);
  check(
    "checkout-before-checkin rejected",
    (await d.locator("text=Check-out must be after check-in").count()) === 1
  );
  await d.close();

  /* ---------- Mobile interactions ---------- */
  const m = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await m.addInitScript(() => {
    try {
      sessionStorage.setItem("rk-intro-seen", "1");
    } catch { /* ignore */ }
  });
  await m.goto(BASE_URL, { waitUntil: "networkidle" });
  await m.waitForTimeout(3000);
  await m.getByRole("button", { name: "Open menu" }).click();
  await m.waitForTimeout(500);
  check("mobile menu opens", await m.getByRole("dialog").isVisible());
  await m.getByRole("link", { name: "Contact" }).first().click();
  await m.waitForTimeout(900);
  check("menu link navigates + closes", (await m.getByRole("dialog").count()) === 0);

  // Sticky CTA appears after hero, hides at contact (scoped to the fixed bar —
  // Playwright's isVisible ignores viewport position, so scope tightly)
  await m.goto(BASE_URL, { waitUntil: "networkidle" });
  await m.waitForTimeout(3000);
  const cta = m.locator("div.fixed a[href='#contact']");
  await m.evaluate(() => window.scrollTo(0, 1200));
  await m.waitForTimeout(700);
  check("sticky CTA appears on scroll", (await cta.count()) === 1 && (await cta.isVisible()));
  await m.locator("#contact").scrollIntoViewIfNeeded();
  await m.waitForTimeout(1800);
  check("sticky CTA hides at form", (await cta.count()) === 0);
  await m.close();

  /* ---------- Reduced motion ---------- */
  const r = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await r.goto(BASE_URL, { waitUntil: "networkidle" });
  await r.waitForTimeout(1200);
  const anim = await r.evaluate(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const marquee = getComputedStyle(document.querySelector(".animate-marquee")).animationName;
    return { mq, marquee };
  });
  check("reduced-motion detected, marquee off", anim.mq && (anim.marquee === "none" || anim.marquee === ""),
    JSON.stringify(anim));
  // Content still visible without animation (hero headline opacity)
  const h1op = await r.evaluate(() => getComputedStyle(document.querySelector("#hero-heading span span")).opacity);
  check("hero text visible under reduced motion", h1op === "1", `opacity=${h1op}`);
  await r.close();

  await browser.close();
  console.log(results.join("\n"));
  if (results.some((x) => x.startsWith("FAIL"))) process.exitCode = 1;
})();
