"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CalendarCheck, Menu, X, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { NAV_ITEMS, SITE, telHref } from "@/lib/site";
import { EASE } from "@/lib/motion";

function Wordmark({ light = true }: { light?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-2.5" aria-label="RK Farmstay — home">
      {/* Palm + waves mark */}
      <svg width="40" height="40" viewBox="0 0 44 44" fill="none" aria-hidden className="shrink-0">
        <g stroke={light ? "#C9A24D" : "#193B2D"} strokeWidth="1.7" strokeLinecap="round">
          <path d="M22 8v18" />
          <path d="M22 12c-3-1-6-1-8 1 2.5.5 5.5.3 8-1Z" />
          <path d="M22 12c3-1 6-1 8 1-2.5.5-5.5.3-8-1Z" />
          <path d="M22 17c-4-1.2-7.5-.8-9.5 1.5 3 .6 6.5.2 9.5-1.5Z" />
          <path d="M22 17c4-1.2 7.5-.8 9.5 1.5-3 .6-6.5.2-9.5-1.5Z" />
          <path d="M22 22c-2.5 2-6 3-9.5 2.5M22 22c2.5 2 6 3 9.5 2.5" />
          <path d="M6 30c4-2.5 8 2.5 12 0s8 2.5 12 0 5-1.5 8 .5" />
          <path d="M8 35c4-2.5 8 2.5 12 0s8 2.5 12 0 4-1.2 6 .3" />
        </g>
        <circle cx="22" cy="8" r="1.6" fill={light ? "#C9A24D" : "#193B2D"} />
      </svg>
      <span className="leading-none">
        <span
          className={`font-display text-[22px] font-bold tracking-wide block ${
            light ? "text-cream" : "text-forest"
          }`}
        >
          RK
        </span>
        <span
          className={`block text-[10px] font-bold tracking-[0.32em] ${
            light ? "text-cream/90" : "text-forest"
          }`}
        >
          FARMSTAY
        </span>
        <span
          className={`block text-[8px] font-semibold tracking-[0.24em] mt-0.5 ${
            light ? "text-gold" : "text-clay"
          }`}
        >
          URJA · KARJAT
        </span>
      </span>
    </a>
  );
}

export function SiteHeader({ active = true }: { active?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={active ? { y: 0, opacity: 1 } : { y: -70, opacity: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-pine/92 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-md"
            : "bg-gradient-to-b from-black/55 to-transparent"
        }`}
        style={scrolled ? { backgroundColor: "rgba(15,39,30,0.93)" } : undefined}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
          <Wordmark />
          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-[13px] font-semibold tracking-[0.08em] text-cream/85 transition-colors hover:text-cream"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full"
                />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full bg-clay px-5 py-2.5 text-[13px] font-bold tracking-wide text-white shadow-[0_8px_24px_-8px_rgba(184,111,74,0.8)] transition-all duration-300 hover:bg-clay-deep hover:shadow-[0_10px_28px_-8px_rgba(184,111,74,0.9)] sm:inline-flex"
            >
              <CalendarCheck size={16} strokeWidth={2.4} />
              Check Availability
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-label="Open menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-cream/70 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-pine"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-moss blur-3xl" />
              <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-clay/40 blur-3xl" />
            </div>
            <div className="relative flex h-[72px] items-center justify-between px-5">
              <Wordmark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-cream/70"
              >
                <X size={20} />
              </button>
            </div>
            <nav aria-label="Mobile" className="relative flex-1 overflow-y-auto px-6 pb-6 pt-2">
              <ul className="divide-y divide-cream/10">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: EASE }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-4"
                    >
                      <span className="font-display text-3xl font-medium text-cream transition-colors group-hover:text-gold">
                        {item.label}
                      </span>
                      <ArrowRight
                        size={20}
                        className="text-cream/40 transition-all group-hover:translate-x-1 group-hover:text-gold"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.45, ease: EASE }}
                className="mt-6 grid grid-cols-2 gap-3"
              >
                <a
                  href={telHref(SITE.phones.primary)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-cream/10 px-4 py-3.5 text-sm font-bold text-cream"
                >
                  <Phone size={16} /> {SITE.phones.primary}
                </a>
                <a
                  href={SITE.links.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-cream/10 px-4 py-3.5 text-sm font-bold text-cream"
                >
                  <MapPin size={16} /> Directions
                </a>
              </motion.div>
              <a
                href={SITE.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center gap-2 text-sm font-semibold text-cream/70"
              >
                <InstagramIcon size={17} /> Follow us on Instagram
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
