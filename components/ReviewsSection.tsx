"use client";

import { motion } from "motion/react";
import { ArrowUpRight, BadgeCheck, PenLine, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { EASE, Eyebrow, Reveal } from "@/lib/motion";

/** Official multicolor Google "G". */
export function GoogleG({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.9-.1-1.5-.3-2.3H12v4.3h6.5c-.1 1.1-.8 2.7-2.4 3.8l-.1.4 3.5 2.7.2.1c2.2-2 3.6-5 3.6-9z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.8-2.9c-1 .7-2.4 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5l-.4.1-2.9 2.2-.1.4C3.8 21.3 7.6 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4l-.1-.4L2.2 6.9l-.3.1C.7 9.3 0 10.6 0 12s.7 2.7 1.9 5.1l3.3-2.7z"
      />
      <path
        fill="#EA4335"
        d="M12 4.7c1.8 0 2.9.8 3.6 1.4l3.2-3.1C16.9 1.1 14.8 0 12 0 7.6 0 3.8 2.7 1.9 6.9l3.3 2.7c1-2.8 3.7-4.9 6.8-4.9z"
      />
    </svg>
  );
}

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          aria-hidden
          className={i <= Math.round(value) ? "fill-gold text-gold" : "fill-stone text-stone"}
        />
      ))}
    </span>
  );
}

interface ApiPayload {
  live: boolean;
  rating?: number | null;
  reviewCount?: number | null;
  reviewsUrl?: string | null;
  reviews?: Array<{ name: string; text: string; rating: number; when: string }>;
}

export function ReviewsSection() {
  const [live, setLive] = useState<ApiPayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews")
      .then((r) => (r.ok ? r.json() : null))
      .then((j: ApiPayload | null) => {
        if (!cancelled && j?.live) setLive(j);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const rating = live?.rating ?? SITE.google.rating;
  const count = live?.reviewCount ?? SITE.google.reviewCount;
  const reviewsUrl = live?.reviewsUrl ?? SITE.google.reviewsUrl;
  const featured = live?.reviews?.filter((r) => r.text) ?? SITE.google.featured;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-mt-20 border-t border-forest/10 bg-cream py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow>Guest reviews</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="reviews-heading"
                className="mt-4 max-w-xl font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.05] text-ink"
              >
                Loved by our <span className="italic text-clay">guests</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-3 shadow-[0_10px_30px_-12px_rgba(25,59,45,0.35)] ring-1 ring-forest/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              <GoogleG />
              <span className="text-sm font-extrabold text-ink">
                {rating.toFixed(1)}
              </span>
              <Stars value={rating} size={14} />
              <span className="text-[13px] font-semibold text-ink/60">
                · {count} reviews
              </span>
              <ArrowUpRight
                size={15}
                className="text-clay transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Reveal>
        </div>

        {/* Summary band */}
        <Reveal delay={0.1} y={32}>
          <div className="relative mt-10 overflow-hidden rounded-[26px] bg-pine px-6 py-10 md:px-12 md:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-moss blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-clay/30 blur-3xl"
            />
            <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cream">
                  <GoogleG size={32} />
                </span>
                <div>
                  <p className="flex items-baseline gap-2">
                    <motion.span
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="font-display text-5xl font-semibold text-cream md:text-6xl"
                    >
                      {rating.toFixed(1)}
                    </motion.span>
                    <span className="text-lg font-bold text-cream/50">/ 5</span>
                  </p>
                  <div className="mt-1.5">
                    <Stars value={rating} size={18} />
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-cream/70">
                    Based on {count} Google reviews
                    {live ? (
                      <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#1faa55]/25 px-2.5 py-0.5 text-[11px] font-bold text-[#7be3a3]">
                        <BadgeCheck size={12} /> live
                      </span>
                    ) : null}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <a
                  href={reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-extrabold text-forest transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  Read all reviews
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <a
                  href={reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/35 px-6 py-3.5 text-sm font-bold text-cream transition-all duration-300 hover:border-cream hover:bg-cream/10"
                >
                  <PenLine size={15} />
                  Write a review
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Featured review cards (live from Google, or owner-quoted verbatim) */}
        {featured.length > 0 && (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {featured.slice(0, 3).map((r, i) => (
              <Reveal key={`${r.name}-${i}`} delay={0.08 + i * 0.08} y={24}>
                <a
                  href={reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-[22px] bg-white p-6 shadow-[0_18px_40px_-24px_rgba(25,59,45,0.35)] ring-1 ring-forest/10 transition-all duration-300 hover:-translate-y-1"
                  aria-label={`Read ${r.name}'s review on Google`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest font-display text-lg font-semibold text-cream"
                    >
                      {r.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-extrabold text-ink">{r.name}</p>
                      <p className="text-xs font-semibold text-ink/50">
                        {r.when ? `${r.when} · ` : ""}Posted on Google
                      </p>
                    </div>
                    <GoogleG size={18} />
                  </div>
                  <div className="mt-3">
                    <Stars value={r.rating} size={14} />
                  </div>
                  <p className="mt-2.5 line-clamp-4 text-[14px] leading-relaxed text-ink/75">
                    “{r.text}”
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-bold text-clay">
                    Read on Google
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
