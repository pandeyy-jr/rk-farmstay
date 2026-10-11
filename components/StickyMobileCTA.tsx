"use client";

import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE, telHref } from "@/lib/site";

/** Fixed bottom booking bar — mobile only, hides while the enquiry form is visible. */
export function StickyMobileCTA() {
  const [past, setPast] = useState(false);
  const [nearForm, setNearForm] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const form = document.getElementById("contact");
    const footer = document.querySelector("footer");
    const io = new IntersectionObserver(
      (entries) => {
        const contactVisible = entries.find((e) => e.target.id === "contact")?.isIntersecting;
        const footerVisible = entries.find((e) => e.target.tagName === "FOOTER")?.isIntersecting;
        setNearForm(!!contactVisible || !!footerVisible);
      },
      { threshold: 0.12 }
    );
    if (form) io.observe(form);
    if (footer) io.observe(footer);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = past && !nearForm;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 md:hidden"
          style={{ paddingBottom: "max(0.9rem, env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center gap-2.5 rounded-[22px] border border-cream/15 bg-pine/95 p-2.5 shadow-[0_-8px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
            <a
              href={telHref(SITE.phones.primary)}
              aria-label={`Call RK Farmstay on ${SITE.phones.primary}`}
              className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-cream/12 text-cream"
            >
              <Phone size={20} />
            </a>
            <a
              href="#contact"
              className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl bg-clay text-[15px] font-extrabold text-white"
            >
              <CalendarCheck size={18} />
              Check Availability
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
