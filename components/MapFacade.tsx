"use client";

import { Loader2, MapPin } from "lucide-react";
import { useState } from "react";

/**
 * Click-to-load facade for the Google Maps embed — avoids ~1.6 MB of Maps JS
 * on initial page load. The section stays useful (address + directions link)
 * even if the embed never loads.
 */
export function MapFacade() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  if (loaded) {
    return (
      <iframe
        title="Map showing the RK Farmstay area in Karjat"
        src="https://www.google.com/maps?q=RK+Farmstay+Bhoirwadi+Karjat+Maharashtra+410201&z=14&output=embed"
        className="h-[320px] w-full border-0 lg:h-[380px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setLoading(true);
        setLoaded(true);
      }}
      aria-label="Load interactive map of RK Farmstay"
      className="group relative flex h-[320px] w-full flex-col items-center justify-center gap-3 overflow-hidden bg-parchment lg:h-[380px]"
    >
      {/* stylised map backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(25,59,45,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(25,59,45,0.09) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div
        aria-hidden
        className="absolute left-[18%] top-[30%] h-24 w-40 -rotate-12 rounded-full bg-olive/15 blur-md"
      />
      <div
        aria-hidden
        className="absolute bottom-[18%] right-[12%] h-28 w-48 rotate-6 rounded-full bg-clay/15 blur-md"
      />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-forest text-cream shadow-lg transition-transform duration-300 group-hover:scale-110">
        {loading ? <Loader2 size={24} className="animate-spin" /> : <MapPin size={24} />}
      </span>
      <span className="relative text-[15px] font-extrabold text-forest">
        {loading ? "Loading map…" : "View interactive map"}
      </span>
      <span className="relative text-[12.5px] font-semibold text-ink/55">
        RK Farmstay · Bhoirwadi, Karjat
      </span>
    </button>
  );
}
