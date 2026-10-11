/**
 * Central, typed manifest of every photograph on the site.
 *
 * INTERIM SOURCE NOTE (Oct 2026): original high-resolution photographs were not
 * available as files — Instagram is login-walled and Google Maps renders
 * client-side. These crops were carefully extracted from the approved design
 * mockups, which embed genuine RK Farmstay photography (aerial grounds, pool,
 * turf, cottage, signboard). To swap in originals, replace the files in
 * `public/images/farmstay/` keeping the same filenames (or update `src` below) and
 * Note: `sunGlitter` is decorative ambience (sun on water) for the intro
 * sunrise — it is never captioned or presented as the property itself.
 */

export interface SiteImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Curatorial role of the image. */
  role: string;
}

export const IMAGES = {
  heroDusk: {
    src: "/images/farmstay/rk-farmstay-hero.webp",
    alt: "RK Farmstay at dusk — sunset over the Sahyadri hills, lit cottages, glowing swimming pool, turf and lawn",
    width: 720,
    height: 851,
    role: "hero",
  },
  heroAerial: {
    src: "/images/farmstay/grounds-aerial.webp",
    alt: "Aerial view of RK Farmstay — red-roof cottages, swimming pool, enclosed turf and central lawn surrounded by green trees",
    width: 390,
    height: 355,
    role: "hero",
  },
  aerialPortrait: {
    src: "/images/farmstay/rooftops-greens.webp",
    alt: "Aerial glimpse of the farmstay rooftops, pool and lawn from above",
    width: 255,
    height: 245,
    role: "collage",
  },
  poolDay: {
    src: "/images/farmstay/pool-day.webp",
    alt: "Swimming pool with palm trees and a lounge pavilion on a bright day",
    width: 195,
    height: 210,
    role: "experience",
  },
  turfNight: {
    src: "/images/farmstay/turf-night.webp",
    alt: "Enclosed green turf glowing under lights at night",
    width: 150,
    height: 98,
    role: "experience",
  },
  lawnAerial: {
    src: "/images/farmstay/lawn-cottages.webp",
    alt: "Aerial view of the cottages, pool and open lawn in daylight",
    width: 146,
    height: 98,
    role: "experience",
  },
  poolsideNight: {
    src: "/images/farmstay/poolside-evening.webp",
    alt: "Poolside area illuminated warmly after dark",
    width: 132,
    height: 98,
    role: "experience",
  },
  nightPoolWide: {
    src: "/images/farmstay/pool-night-wide.webp",
    alt: "Swimming pool glowing turquoise at night beside the lit cottage verandah",
    width: 415,
    height: 250,
    role: "banner",
  },
  cottage: {
    src: "/images/farmstay/cottage-exterior.webp",
    alt: "Terracotta cottage exterior with warm lights under tall trees",
    width: 157,
    height: 130,
    role: "stay",
  },
  sunsetStrip: {
    src: "/images/farmstay/evening-skies.webp",
    alt: "Evening sky with palm silhouettes over the fields near the farmstay",
    width: 255,
    height: 110,
    role: "gallery",
  },
  signboard: {
    src: "/images/farmstay/signboard.webp",
    alt: "RK Farmstay signboard at Bhoirwadi with address and contact numbers",
    width: 272,
    height: 149,
    role: "documentary",
  },
  sunGlitter: {
    src: "/images/farmstay/sun-glitter.webp",
    alt: "",
    width: 675,
    height: 1200,
    role: "intro-ambience",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof IMAGES;

export interface GalleryItem extends SiteImage {
  key: string;
  title: string;
  category: "Pool" | "Turf" | "Grounds" | "Stay" | "Evening";
}

export const GALLERY: GalleryItem[] = [
  { key: "heroAerial", ...IMAGES.heroAerial, title: "Grounds from above", category: "Grounds" },
  { key: "poolDay", ...IMAGES.poolDay, title: "The pool by day", category: "Pool" },
  { key: "turfNight", ...IMAGES.turfNight, title: "Turf under lights", category: "Turf" },
  { key: "cottage", ...IMAGES.cottage, title: "Cottage exterior", category: "Stay" },
  { key: "nightPoolWide", ...IMAGES.nightPoolWide, title: "The pool at night", category: "Evening" },
  { key: "lawnAerial", ...IMAGES.lawnAerial, title: "Lawns & cottages", category: "Grounds" },
  { key: "poolsideNight", ...IMAGES.poolsideNight, title: "Evening poolside", category: "Evening" },
  { key: "aerialPortrait", ...IMAGES.aerialPortrait, title: "Rooftops & greens", category: "Grounds" },
  { key: "sunsetStrip", ...IMAGES.sunsetStrip, title: "Evening skies", category: "Evening" },
  // Note: the signboard also appears in the Location section, so it stays out
  // of the gallery to keep the mosaic grid gap-free (9 items = 3 full rows).
];

export const GALLERY_FILTERS = ["All", "Pool", "Turf", "Grounds", "Stay", "Evening"] as const;
