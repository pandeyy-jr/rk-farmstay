import type { MetadataRoute } from "next";

/**
 * Sitemap needs an absolute production URL. Set NEXT_PUBLIC_SITE_URL when the
 * domain is known — until then we emit no URLs rather than invent a domain.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) return [];
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
