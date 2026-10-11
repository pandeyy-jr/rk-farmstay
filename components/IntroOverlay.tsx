"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { EASE } from "@/lib/motion";

type Phase = "sunrise" | "reveal" | "exit";

/**
 * Cinematic intro: deep-forest sunrise → the actual hero photograph
 * (shared <HeroBackdrop/>, so the handoff to the hero cannot jump).
 * ~5.2s full, ~1.6s on repeat visits. Skippable. No audio.
 */
export function IntroOverlay({ short = false, onDone }: { short?: boolean; onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("sunrise");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("reveal"), short ? 250 : 2200);
    const t2 = setTimeout(() => setPhase("exit"), short ? 1100 : 4600);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [short]);

  useEffect(() => {
    if (phase !== "exit") return;
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem("rk-intro-seen", "1");
      } catch {
        /* private mode — intro simply replays next visit */
      }
      onDone();
    }, 650);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="RK Farmstay cinematic intro"
      className="fixed inset-0 z-[70] overflow-hidden bg-pine"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
    >
      {/* Preload the hero photograph from the first frame */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0">
        <HeroBackdrop />
      </div>

      {/* Phase A — sunrise over misty hills */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "sunrise" ? 1 : 0 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#071410] via-pine to-[#1c2b1e]" />
        {/* warm horizon glow behind the hills */}
        {/* rising golden glow */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[75%]"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 100%, rgba(201,162,77,0.55), rgba(184,111,74,0.25) 55%, transparent 75%)",
          }}
          initial={{ y: "35%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: short ? 0.6 : 2.4, ease: EASE }}
        />
        {/* sun disc */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-[58%] h-20 w-20 -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, #f6dfa8 0%, #e9b95c 45%, rgba(233,185,92,0) 72%)",
          }}
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: short ? 0.6 : 2.4, ease: EASE }}
        />
        {/* drifting mist */}
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            aria-hidden
            className="absolute inset-x-[-20%] top-[46%] h-24 bg-white/10 blur-2xl"
            style={{ top: `${44 + i * 12}%` }}
            initial={{ x: i === 0 ? "-12%" : "12%" }}
            animate={{ x: i === 0 ? "12%" : "-12%" }}
            transition={{ duration: short ? 1 : 5, ease: "linear" }}
          />
        ))}
        {/* hill silhouettes */}
        <svg aria-hidden viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute bottom-0 h-[38%] w-full">
          <path d="M0,220 C240,170 420,240 720,200 C1020,160 1200,230 1440,180 L1440,320 L0,320 Z" fill="#0b1f17" opacity="0.9" />
          <path d="M0,260 C300,220 600,280 900,250 C1150,228 1300,270 1440,250 L1440,320 L0,320 Z" fill="#060f0b" />
        </svg>
      </motion.div>

      {/* Wordmark (sunrise phase) */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: phase === "sunrise" ? 1 : 0, y: phase === "sunrise" ? 0 : -18 }}
        transition={{ duration: 0.9, ease: EASE, delay: short ? 0 : 0.5 }}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">
          A private farmstay in Karjat
        </p>
        <p className="mt-4 font-display text-[clamp(2.6rem,9vw,5rem)] font-semibold leading-none text-cream">
          RK <span className="font-normal">Farmstay</span>
        </p>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.5em] text-cream/60">
          Urja · Karjat
        </p>
      </motion.div>

      {/* Phase B — the property reveal (identical pixels to the hero) */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={
          phase === "sunrise" ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }
        }
        transition={{ duration: short ? 1 : 2.4, ease: EASE }}
      >
        <HeroBackdrop />
      </motion.div>

      {/* Skip control */}
      <motion.button
        type="button"
        onClick={() => setPhase("exit")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-cream/35 bg-black/30 px-6 py-2.5 text-[13px] font-bold tracking-wide text-cream backdrop-blur-sm transition-colors hover:border-cream hover:bg-black/50"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        Skip intro
      </motion.button>
    </motion.div>
  );
}
