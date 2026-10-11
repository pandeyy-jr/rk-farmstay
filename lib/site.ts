/**
 * Central business settings for RK Farmstay.
 * Change phone numbers / links here — every CTA on the site reads from this file.
 */

export const SITE = {
  name: "RK Farmstay",
  place: "Urja · Karjat",
  eyebrow: "A private farmstay in Karjat",
  address: {
    line1: "At. Bhoirwadi, Tal. Karjat,",
    line2: "Dist. Raigad, Maharashtra 410201.",
    short: "Urja · Bhoirwadi, Karjat",
  },
  phones: {
    /** Preferred booking contact — used for WhatsApp + primary CTAs. */
    primary: "7775807655",
    /** Secondary contact — shown in contact sections. */
    secondary: "8237392121",
    countryCode: "91",
  },
  links: {
    instagram: "https://www.instagram.com/rk_farmstay_karjat/",
    maps: "https://maps.app.goo.gl/e4htADWcfi6K2QvU7?g_st=awb",
  },
  /**
   * Google rating snapshot shown on the site. These numbers were supplied by
   * the owner from the live Google listing — update them here if they drift.
   * Set GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID env vars to fetch live data
   * via /api/reviews instead.
   */
  google: {
    rating: 4.9,
    reviewCount: 59,
    /** Link to the listing (reviews open here). */
    reviewsUrl: "https://maps.app.goo.gl/e4htADWcfi6K2QvU7?g_st=awb",
    /**
     * Featured reviews, quoted verbatim from the Google listing.
     * Paste real entries here as { name, text, rating, when } — never invent.
     */
    featured: [] as Array<{ name: string; text: string; rating: number; when: string }>,
  },
} as const;

export function telHref(number: string): string {
  return `tel:+${SITE.phones.countryCode}${number}`;
}

export function waHref(message: string, number: string = SITE.phones.primary): string {
  return `https://wa.me/${SITE.phones.countryCode}${number}?text=${encodeURIComponent(message)}`;
}

export interface EnquiryDetails {
  checkIn: string;
  checkOut: string;
  guests: string;
  name: string;
  phone: string;
  message: string;
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  if (Number.isNaN(dt.getTime())) return iso;
  return dt.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Builds the pre-filled WhatsApp enquiry message. */
export function buildEnquiryMessage(d: EnquiryDetails): string {
  const lines = [
    "Hello RK Farmstay! I would like to enquire about a stay.",
    "",
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Check-in: ${formatDate(d.checkIn)}`,
    `Check-out: ${formatDate(d.checkOut)}`,
    `Guests: ${d.guests}`,
  ];
  if (d.message.trim()) lines.push(`Note: ${d.message.trim()}`);
  lines.push("", "Please confirm availability and pricing. Thank you!");
  return lines.join("\n");
}

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Stay", href: "#stay" },
  { label: "Experiences", href: "#experiences" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
] as const;
