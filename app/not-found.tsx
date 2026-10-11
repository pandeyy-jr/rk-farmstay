import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-pine px-6 text-center">
      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
        Off the trail
      </p>
      <h1 className="mt-4 font-display text-[clamp(3rem,10vw,6rem)] font-semibold leading-none text-cream">
        404
      </h1>
      <p className="mt-3 max-w-md font-display text-2xl italic text-cream/75">
        This path doesn&apos;t lead to the farm.
      </p>
      <p className="mt-2 max-w-md text-sm text-cream/60">
        The page you&apos;re looking for has moved or never existed.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-bold text-white"
        >
          Back to RK Farmstay
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <a
          href={SITE.links.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/40 px-7 py-3.5 text-sm font-bold text-cream"
        >
          <MapPin size={15} /> Get Directions
        </a>
      </div>
    </main>
  );
}
