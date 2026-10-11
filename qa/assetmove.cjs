const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const MAP = [
  ["hero-dusk.jpg", "rk-farmstay-hero.webp"],
  ["hero-aerial.jpg", "grounds-aerial.webp"],
  ["aerial-portrait.jpg", "rooftops-greens.webp"],
  ["pool-day.jpg", "pool-day.webp"],
  ["turf-night.jpg", "turf-night.webp"],
  ["lawn-aerial.jpg", "lawn-cottages.webp"],
  ["poolside-night.jpg", "poolside-evening.webp"],
  ["night-pool-wide.jpg", "pool-night-wide.webp"],
  ["cottage.jpg", "cottage-exterior.webp"],
  ["sunset-strip.jpg", "evening-skies.webp"],
  ["signboard.jpg", "signboard.webp"],
  ["sun-glitter.jpg", "sun-glitter.webp"],
];

(async () => {
  fs.mkdirSync("public/images/farmstay", { recursive: true });
  fs.mkdirSync("public/videos", { recursive: true });
  fs.mkdirSync("public/audio", { recursive: true });
  for (const d of ["public/videos", "public/audio"]) {
    const keep = path.join(d, ".gitkeep");
    if (!fs.existsSync(keep)) fs.writeFileSync(keep, "");
  }
  for (const [from, to] of MAP) {
    const src = `public/images/${from}`;
    const dst = `public/images/farmstay/${to}`;
    const info = await sharp(src).webp({ quality: 82 }).toFile(dst);
    const before = fs.statSync(src).size;
    console.log(`${from} (${(before / 1024).toFixed(0)}KB) -> ${to} (${(info.size / 1024).toFixed(0)}KB)`);
  }
})();
