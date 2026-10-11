import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { DotGlobe } from "@/components/DotGlobe";
import { MapFacade } from "@/components/MapFacade";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";
import { Eyebrow, Reveal } from "@/lib/motion";

export function LocationSection() {
  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="relative scroll-mt-20 overflow-hidden border-t border-forest/10 bg-cream pb-20 pt-4 md:pb-28"
    >
      {/* Animated dotted-earth backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-90 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_42%,black,transparent)]">
        <DotGlobe />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr_1fr] lg:gap-8">
          {/* Address */}
          <div className="pt-10">
            <Reveal>
              <Eyebrow>Our location</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="location-heading"
                className="mt-4 font-display text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-tight text-ink"
              >
                RK Farmstay, Urja
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <address className="mt-4 flex items-start gap-2.5 text-[15px] not-italic leading-relaxed text-ink/75">
                <MapPin size={18} className="mt-0.5 shrink-0 text-clay" aria-hidden />
                <span>
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                </span>
              </address>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/60">
                Set amid fields and farm roads on the edge of Karjat — follow the map pin to
                reach the gate.
              </p>
            </Reveal>
          </div>

          {/* Map card */}
          <Reveal delay={0.1} y={36}>
            <div className="relative overflow-hidden rounded-[24px] bg-parchment shadow-[0_24px_50px_-24px_rgba(25,59,45,0.4)]">
              <MapFacade />
              <div className="flex items-center justify-between gap-3 bg-forest px-5 py-4">
                <p className="flex items-center gap-2 text-sm font-bold text-cream">
                  <MapPin size={16} className="text-gold" aria-hidden />
                  RK Farmstay
                </p>
                <a
                  href={SITE.links.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full bg-cream px-4 py-2 text-[13px] font-bold text-forest transition-colors hover:bg-white"
                >
                  Get Directions
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Signboard documentary */}
          <Reveal delay={0.18} y={36}>
            <figure className="overflow-hidden rounded-[24px] bg-pine shadow-[0_24px_50px_-24px_rgba(25,59,45,0.5)]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={IMAGES.signboard.src}
                  alt={IMAGES.signboard.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 380px"
                  loading="lazy"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="px-5 py-4 text-[13px] leading-relaxed text-cream/75">
                The farmstay signboard at Bhoirwadi — look for it on the approach road.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
