const sharp = require("sharp");
const path = require("path");
const G = path.join(process.env.USERPROFILE || "", "Downloads/Golden-Hour Karjat Farmstay Escape.png");
const W = path.join(process.env.USERPROFILE || "", "Downloads/water.jpg");
(async () => {
  await sharp(G)
    .extract({ left: 660, top: 90, width: 720, height: 851 })
    .jpeg({ quality: 92 })
    .sharpen({ sigma: 0.5 })
    .toFile("public/images/hero-dusk.jpg");
  await sharp(W).jpeg({ quality: 85 }).toFile("public/images/sun-glitter.jpg");
  console.log("hero + glitter ok");
})();
