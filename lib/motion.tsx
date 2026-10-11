"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/** Shared easing — soft cinematic settle. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DUR = {
  fast: 0.25,
  base: 0.6,
  slow: 1.0,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE, delay: i * 0.09 },
  }),
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/** Scroll-triggered reveal wrapper — fires once, respects reduced motion via CSS. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: DUR.base, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/** Serif italic accent line used across sections. */
export function ScriptAccent({ children }: { children: ReactNode }) {
  return (
    <span className="font-display text-[1.35em] italic font-medium tracking-normal">
      {children}
    </span>
  );
}

/** Small tracked eyebrow label. */
export function Eyebrow({ children, tone = "clay" }: { children: ReactNode; tone?: "clay" | "gold" | "olive" }) {
  const color =
    tone === "gold" ? "text-gold" : tone === "olive" ? "text-olive" : "text-clay";
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.28em] ${color} flex items-center gap-3`}
    >
      <span aria-hidden className="inline-block h-px w-8 bg-current opacity-70" />
      {children}
    </p>
  );
}
