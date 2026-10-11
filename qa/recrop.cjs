const sharp = require("sharp");
const path = require("path");
const D = path.join(process.env.USERPROFILE || "", "Downloads/RK Farmstay_ A Nature-Filled Escape.png");
const M = path.join(process.env.USERPROFILE || "", "Downloads/RK Farmstay Mobile Experience.png");
const jobs = [
  [D, "public/images/hero-aerial.jpg", { left: 440, top: 70, width: 390, height: 355 }],
  [M, "public/images/pool-day.jpg", { left: 360, top: 310, width: 195, height: 210 }],
  [D, "public/images/turf-night.jpg", { left: 482, top: 572, width: 150, height: 98 }],
  [D, "public/images/lawn-aerial.jpg", { left: 668, top: 572, width: 146, height: 98 }],
  [D, "public/images/poolside-night.jpg", { left: 858, top: 572, width: 132, height: 98 }],
  [M, "public/images/cottage.jpg", { left: 608, top: 300, width: 157, height: 130 }],
  [M, "public/images/aerial-portrait.jpg", { left: 15, top: 85, width: 255, height: 245 }],
];
(async () => {
  for (const [src, name, r] of jobs) {
    await sharp(src).extract(r).jpeg({ quality: 90 }).sharpen({ sigma: 0.5 }).toFile(name);
    console.log("ok", name, JSON.stringify(r));
  }
})();
