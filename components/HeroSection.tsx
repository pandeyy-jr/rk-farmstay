"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, CalendarCheck, MapPin } from "lucide-react";
import { useRef } from "react";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { InstagramIcon } from "@/components/icons";
import { SITE } from "@/lib/site";
import { EASE, fadeUp, staggerParent } from "@/lib/motion";

const LINES = ["Escape.", "Relax.", "Reconnect."];

export function HeroSection({ active }: { active: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} id="home" aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-pine">
      {/* Backdrop photograph (shared with the intro's final frame) */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <div className="animate-kenburns relative h-full w-full">
          <HeroBackdrop />
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        variants={staggerParent}
        initial="hidden"
        animate={active ? "show" : "hidden"}
        className="mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-5 pb-14 pt-32 md:justify-center md:pb-20 md:pt-28"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold sm:tracking-[0.3em]"
        >
          <span aria-hidden className="inline-block h-px w-10 bg-gold" />
          {SITE.eyebrow}
        </motion.p>

        <h1
          id="hero-heading"
          className="max-w-3xl font-display text-[clamp(2.9rem,8.5vw,5.9rem)] font-semibold leading-[1.02] text-cream"
        >
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className={`block ${i === 2 ? "italic text-[#cfe0c2]" : ""}`}
                variants={{
                  hidden: { y: "110%" },
                  show: {
                    y: 0,
                    transition: { duration: 0.9, ease: EASE, delay: 0.1 + i * 0.12 },
                  },
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          variants={fadeUp}
          custom={4}
          className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream/82 md:text-[17px]"
        >
          A peaceful getaway surrounded by greenery, fresh air and open spaces — perfect
          for families, friends and nature lovers.
        </motion.p>

        <motion.div variants={fadeUp} custom={5} className="mt-4">
          <a
            href={SITE.links.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-cream/85 transition-colors hover:text-cream"
          >
            <MapPin size={16} className="text-gold" aria-hidden />
            Urja, Karjat
            <ArrowRight
              size={14}
              aria-hidden
              className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
            />
            <span className="sr-only">(opens Google Maps directions)</span>
          </a>
        </motion.div>

        <motion.div variants={fadeUp} custom={6} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-clay px-7 py-4 text-[15px] font-bold text-white shadow-[0_16px_40px_-12px_rgba(184,111,74,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay-deep"
          >
            <CalendarCheck size={18} strokeWidth={2.4} />
            Check Availability
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href={SITE.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-cream/45 px-7 py-4 text-[15px] font-bold text-cream backdrop-blur-sm transition-all duration-300 hover:border-cream hover:bg-cream/10"
          >
            <InstagramIcon size={17} />
            Instagram
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#stay"
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/60 transition-colors hover:text-cream md:flex"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative block h-10 w-[22px] overflow-hidden rounded-full border border-current">
          <span className="animate-cue absolute left-1/2 top-0 h-2.5 w-[3px] -translate-x-1/2 rounded-full bg-current" />
        </span>
      </motion.a>
    </section>
  );
}
