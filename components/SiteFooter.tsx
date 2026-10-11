import { CalendarCheck, MapPin, Phone } from "lucide-react";
import { CurrentYear } from "@/components/CurrentYear";
import { InstagramIcon } from "@/components/icons";
import { NAV_ITEMS, SITE, telHref } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-pine pb-28 pt-14 text-cream md:pb-10 md:pt-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-2xl font-bold tracking-wide">RK</p>
            <p className="text-[11px] font-bold tracking-[0.32em]">FARMSTAY</p>
            <p className="mt-1 text-[9px] font-semibold tracking-[0.24em] text-gold">
              URJA · KARJAT
            </p>
            <address className="mt-4 text-sm not-italic leading-relaxed text-cream/70">
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
            </address>
          </div>

          <nav aria-label="Footer">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-cream/45">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-semibold text-cream/80 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-cream/45">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm font-semibold">
              <li>
                <a
                  href={telHref(SITE.phones.primary)}
                  className="flex items-center gap-2 text-cream/85 transition-colors hover:text-gold"
                >
                  <Phone size={14} aria-hidden /> {SITE.phones.primary}
                </a>
              </li>
              <li>
                <a
                  href={telHref(SITE.phones.secondary)}
                  className="flex items-center gap-2 text-cream/85 transition-colors hover:text-gold"
                >
                  <Phone size={14} aria-hidden /> {SITE.phones.secondary}
                </a>
              </li>
              <li>
                <a
                  href={SITE.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cream/85 transition-colors hover:text-gold"
                >
                  <InstagramIcon size={14} /> Instagram
                </a>
              </li>
              <li>
                <a
                  href={SITE.links.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cream/85 transition-colors hover:text-gold"
                >
                  <MapPin size={14} aria-hidden /> Directions
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <p className="max-w-xs font-display text-xl italic leading-snug text-cream/70">
              “A slower kind of escape — find your own little corner of green in Karjat.”
            </p>
            <a
              href="#contact"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-clay px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-clay-deep"
            >
              <CalendarCheck size={16} /> Check Availability
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/12 pt-6 text-[12.5px] text-cream/50 md:flex-row">
          <p>© <CurrentYear /> RK Farmstay, Karjat. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="/privacy" className="transition-colors hover:text-cream">
              Privacy Policy
            </a>
            <a
              href={SITE.links.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cream"
            >
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
