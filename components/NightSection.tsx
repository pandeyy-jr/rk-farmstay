import { ArrowRight, Fence, MoonStar, Users, Waves } from "lucide-react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { Eyebrow, Reveal } from "@/lib/motion";

const NOTES = [
  { icon: Fence, label: "Open lawns & green surroundings" },
  { icon: Waves, label: "Pool & turf on the property" },
  { icon: MoonStar, label: "A different mood after dark" },
  { icon: Users, label: "Room for the whole group" },
];

export function NightSection() {
  return (
    <section aria-labelledby="night-heading" className="bg-cream">
      <div className="grid lg:grid-cols-[1.5fr_1fr]">
        {/* Night pool banner */}
        <div className="grain relative min-h-[420px] overflow-hidden lg:min-h-[540px]">
          <Image
            src={IMAGES.nightPoolWide.src}
            alt={IMAGES.nightPoolWide.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 62vw"
            loading="lazy"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-pine/92 via-pine/45 to-transparent" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-pine/70 via-transparent to-pine/20" />
          <div className="relative flex h-full min-h-[420px] flex-col justify-center px-6 py-16 md:px-12 lg:min-h-[540px]">
            <Reveal>
              <Eyebrow tone="gold">Unwind after a long week</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="night-heading"
                className="mt-4 max-w-md font-display text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-[1.03] text-cream"
              >
                Relax by
                <br />
                the <span className="italic text-[#cfe0c2]">pool</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cream/80">
                Clear water, peaceful surroundings and a beautifully lit pool area — the
                perfect spot to slow down and make memories.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <a
                href="#gallery"
                className="group mt-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-cream/45 px-6 py-3 text-sm font-bold text-cream transition-all duration-300 hover:border-cream hover:bg-cream/10"
              >
                See it in the gallery
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>

        {/* Occasion panel */}
        <div className="relative overflow-hidden bg-clay px-6 py-14 md:px-12 lg:py-0 lg:flex lg:flex-col lg:justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          />
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/70">
              A space for every occasion
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="mt-3 font-display text-[clamp(1.9rem,3.5vw,2.6rem)] font-semibold leading-tight text-white">
              Perfect for families, friends & getaways
            </h3>
          </Reveal>
          <ul className="mt-7 space-y-4">
            {NOTES.map((n, i) => (
              <Reveal key={n.label} delay={0.1 + i * 0.07} y={16}>
                <li className="flex items-center gap-3.5 text-[14.5px] font-semibold text-white/92">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/14">
                    <n.icon size={17} aria-hidden />
                  </span>
                  {n.label}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
