import { ArrowRight, Bath, BedDouble, Sun } from "lucide-react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { Eyebrow, Reveal } from "@/lib/motion";

const POINTS = [
  { icon: BedDouble, label: "Cozy cottages" },
  { icon: Bath, label: "Comfortable rooms" },
  { icon: Sun, label: "Garden views" },
];

export function IntroSection() {
  return (
    <section id="stay" aria-labelledby="stay-heading" className="scroll-mt-20 overflow-hidden bg-cream py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>Experience RK Farmstay</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="stay-heading"
              className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.05] text-ink"
            >
              Simple stays.
              <br />
              Big moments.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-ink/72 md:text-base">
              Whether it&apos;s a relaxing family weekend, a fun trip with friends, or a quiet
              escape into nature, RK Farmstay gives you the perfect space to unwind and
              reconnect — wake up to fresh air, spend your days in open green spaces, and make
              memories with the people who matter.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {POINTS.map((p) => (
                <li
                  key={p.label}
                  className="flex items-center gap-2 rounded-full border border-forest/15 bg-white/60 px-4 py-2 text-[13px] font-bold text-forest"
                >
                  <p.icon size={15} className="text-clay" aria-hidden />
                  {p.label}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.28}>
            <a
              href="#experiences"
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-forest px-7 py-3.5 text-[15px] font-bold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-pine"
            >
              Explore Our Farm
              <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* Collage */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <Reveal y={36} className="relative">
            <div className="grain relative overflow-hidden rounded-[26px] shadow-[0_30px_60px_-25px_rgba(25,59,45,0.5)]">
              <Image
                src={IMAGES.cottage.src}
                alt={IMAGES.cottage.alt}
                width={IMAGES.cottage.width * 3}
                height={IMAGES.cottage.height * 3}
                sizes="(max-width: 768px) 90vw, 480px"
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-pine/45 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-5 right-5 font-display text-xl italic text-cream">
                Cottage stay
              </p>
            </div>
          </Reveal>
          <Reveal
            delay={0.18}
            y={44}
            className="absolute -bottom-10 -left-3 w-[46%] sm:-left-8"
          >
            <div className="animate-drift overflow-hidden rounded-[20px] border-[5px] border-cream shadow-[0_24px_50px_-20px_rgba(25,59,45,0.55)]">
              <Image
                src={IMAGES.aerialPortrait.src}
                alt={IMAGES.aerialPortrait.alt}
                width={IMAGES.aerialPortrait.width * 2}
                height={IMAGES.aerialPortrait.height * 2}
                sizes="(max-width: 768px) 40vw, 240px"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <div
            aria-hidden
            className="absolute -right-4 -top-6 -z-10 h-full w-full rounded-[26px] bg-parchment"
          />
        </div>
      </div>
    </section>
  );
}
