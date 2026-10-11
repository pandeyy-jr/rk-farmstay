const sharp = require("sharp");
const path = require("path");
const D = path.join(process.env.USERPROFILE || "", "Downloads/RK Farmstay_ A Nature-Filled Escape.png");
(async () => {
  await sharp(D)
    .extract({ left: 300, top: 828, width: 415, height: 250 })
    .jpeg({ quality: 90 })
    .sharpen({ sigma: 0.5 })
    .toFile("public/images/night-pool-wide.jpg");
  console.log("night ok");
})();
