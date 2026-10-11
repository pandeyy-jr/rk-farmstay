"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { GALLERY, GALLERY_FILTERS, type GalleryItem } from "@/lib/images";
import { EASE, Eyebrow, Reveal } from "@/lib/motion";

/* ---------------------------------- Lightbox ---------------------------------- */

function Lightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const item = items[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
    if (Math.abs(dx) > 48) onStep(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      className="fixed inset-0 z-[60] flex flex-col bg-pine/97 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer — ${item.title}`}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <p className="text-sm font-bold tracking-[0.2em] text-cream/70" aria-live="polite">
          {index + 1} / {items.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-cream/80"
        >
          <X size={20} />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-2 md:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onStep(-1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream backdrop-blur transition-all hover:bg-clay md:left-6"
        >
          <ChevronLeft size={22} />
        </button>

        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={item.key}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="max-h-full w-full max-w-4xl"
          >
            <div className="relative mx-auto aspect-[4/3] max-h-[68vh] w-full overflow-hidden rounded-2xl bg-forest">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1 text-center">
              <span className="font-display text-2xl italic text-cream">{item.title}</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
                {item.category}
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => onStep(1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream backdrop-blur transition-all hover:bg-clay md:right-6"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <p className="pb-6 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-cream/40">
        Swipe or use arrow keys
      </p>
    </motion.div>
  );
}

/* ---------------------------------- Gallery ---------------------------------- */

/** Indexes of items that span two columns for editorial rhythm (sums to full rows). */
const WIDE = new Set([0, 4, 8]);

export function GallerySection() {
  const [filter, setFilter] = useState<(typeof GALLERY_FILTERS)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const items = filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter);

  const openAt = useCallback(
    (item: GalleryItem, btn: HTMLButtonElement | null) => {
      openerRef.current = btn;
      setLightbox(GALLERY.indexOf(item));
    },
    []
  );

  const close = useCallback(() => {
    setLightbox(null);
    openerRef.current?.focus();
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setLightbox((cur) => (cur == null ? cur : (cur + dir + GALLERY.length) % GALLERY.length));
    },
    []
  );

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-20 bg-cream py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow>Photo gallery</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="gallery-heading"
                className="mt-4 max-w-xl font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.05] text-ink"
              >
                A closer look at <span className="italic text-clay">RK Farmstay</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter photos">
              {GALLERY_FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`rounded-full px-4 py-2 text-[12.5px] font-bold transition-all duration-300 ${
                    filter === f
                      ? "bg-forest text-cream shadow-md"
                      : "border border-forest/20 text-forest/70 hover:border-forest/50 hover:text-forest"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-10 grid grid-flow-dense grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.button
                layout
                key={item.key}
                type="button"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: EASE }}
                onClick={(e) => openAt(item, e.currentTarget)}
                aria-label={`Open photo: ${item.title}`}
                className={`group relative overflow-hidden rounded-2xl bg-parchment text-left focus-visible:outline-2 ${
                  WIDE.has(GALLERY.indexOf(item)) ? "col-span-2 aspect-[16/10]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-108"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-pine/70 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                />
                <span className="absolute bottom-3 left-3 right-3 flex translate-y-2 items-center justify-between opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="truncate text-[13px] font-bold text-cream">{item.title}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream/20 text-cream backdrop-blur">
                    <Expand size={14} />
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox != null && (
          <Lightbox items={GALLERY} index={lightbox} onClose={close} onStep={step} />
        )}
      </AnimatePresence>
    </section>
  );
}
