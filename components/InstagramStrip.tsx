import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "@/lib/motion";

export function InstagramStrip() {
  return (
    <section aria-labelledby="social-heading" className="border-t border-cream/10 bg-forest py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 text-center md:flex-row md:justify-between md:text-left">
        <Reveal>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold">
              @rk_farmstay_karjat
            </p>
            <h2
              id="social-heading"
              className="mt-2 font-display text-[clamp(1.7rem,3.5vw,2.5rem)] font-semibold text-cream"
            >
              Same place, <span className="italic">new memories</span> — follow along
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <a
            href={SITE.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-cream/35 px-6 py-3.5 text-sm font-bold text-cream transition-all duration-300 hover:border-cream hover:bg-cream/10"
          >
            Open Instagram
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
