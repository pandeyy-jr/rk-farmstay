"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { IMAGES, type ImageKey } from "@/lib/images";
import { Eyebrow, Reveal } from "@/lib/motion";

interface Experience {
  image: ImageKey;
  title: string;
  text: string;
}

const EXPERIENCES: Experience[] = [
  {
    image: "poolDay",
    title: "Swimming Pool",
    text: "Take a refreshing dip and enjoy quality time.",
  },
  {
    image: "turfNight",
    title: "Turf / Outdoor Games",
    text: "Play, relax and have fun with your group.",
  },
  {
    image: "lawnAerial",
    title: "Farmstay & Open Lawn",
    text: "Spacious green spaces for a perfect getaway.",
  },
  {
    image: "poolsideNight",
    title: "Evening Poolside",
    text: "Beautifully lit pool area for a relaxing evening.",
  },
];

export function ExperiencesSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="experiences"
      aria-labelledby="experiences-heading"
      className="scroll-mt-20 bg-pine py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow tone="gold">Experiences</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="experiences-heading"
                className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.05] text-cream"
              >
                More than <span className="italic text-gold">just a stay</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 text-[15.5px] leading-relaxed text-cream/72">
                From peaceful mornings to fun-filled evenings, there&apos;s something for
                everyone at RK Farmstay.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="font-display text-lg italic text-cream/55">Same place, new memories</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={36}>
          <div
            ref={trackRef}
            className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0"
          >
            {EXPERIENCES.map((exp) => {
              const img = IMAGES[exp.image];
              return (
                <article
                  key={exp.title}
                  className="group relative w-[68vw] max-w-[300px] shrink-0 snap-center overflow-hidden rounded-[22px] bg-forest md:w-auto md:max-w-none"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 68vw, 300px"
                      loading="lazy"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-pine/95 via-pine/25 to-transparent"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                    <div>
                      <h3 className="font-display text-[19px] font-semibold text-cream">
                        {exp.title}
                      </h3>
                      <p className="mt-1 text-[12.5px] leading-snug text-cream/75">{exp.text}</p>
                    </div>
                    <span
                      aria-hidden
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/40 text-cream transition-all duration-300 group-hover:border-clay group-hover:bg-clay"
                    >
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-cream/40 md:hidden">
            Swipe to explore
          </p>
        </Reveal>
      </div>
    </section>
  );
}
