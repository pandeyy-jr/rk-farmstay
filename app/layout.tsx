import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL when the production domain is known.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "RK Farmstay, Karjat — Private Farmstay in Urja | Pool, Turf & Lawns",
    template: "%s · RK Farmstay, Karjat",
  },
  description:
    "RK Farmstay in Urja, Karjat — a private countryside getaway with a swimming pool, enclosed turf and open lawns. Perfect for families, friends and nature lovers. Enquire on WhatsApp.",
  keywords: ["farmstay karjat", "rk farmstay", "private farmstay", "karjat getaway", "farmhouse karjat", "pool farmstay"],
  authors: [{ name: "RK Farmstay" }],
  openGraph: {
    type: "website",
    title: "RK Farmstay, Karjat — Your private escape, closer to nature",
    description:
      "A peaceful farmstay in Urja, Karjat with a swimming pool, enclosed turf and open green lawns. Check availability on WhatsApp.",
    images: [{ url: "/images/farmstay/rk-farmstay-hero.webp", width: 1440, height: 1702, alt: "RK Farmstay at dusk, Karjat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RK Farmstay, Karjat — Your private escape, closer to nature",
    description:
      "Private farmstay in Urja, Karjat with pool, turf and open lawns. Enquire on WhatsApp.",
    images: ["/images/farmstay/rk-farmstay-hero.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f271e",
  width: "device-width",
  initialScale: 1,
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "RK Farmstay",
  description:
    "Private farmstay in Urja, Karjat with swimming pool, enclosed turf and open lawns.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "At. Bhoirwadi, Tal. Karjat",
    addressLocality: "Karjat",
    addressRegion: "Maharashtra",
    postalCode: "410201",
    addressCountry: "IN",
  },
  telephone: `+91${SITE.phones.primary}`,
  sameAs: [SITE.links.instagram],
  hasMap: SITE.links.maps,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-cream focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-forest"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </body>
    </html>
  );
}
