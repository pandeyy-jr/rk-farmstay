"use client";

import { useEffect, useState } from "react";
import { AmenityMarquee } from "@/components/AmenityMarquee";
import { BookingSection } from "@/components/BookingSection";
import { ExperiencesSection } from "@/components/ExperiencesSection";
import { GallerySection } from "@/components/GallerySection";
import { HeroSection } from "@/components/HeroSection";
import { InstagramStrip } from "@/components/InstagramStrip";
import { IntroOverlay } from "@/components/IntroOverlay";
import { IntroSection } from "@/components/IntroSection";
import { LocationSection } from "@/components/LocationSection";
import { NightSection } from "@/components/NightSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [intro, setIntro] = useState<{ show: boolean; short: boolean }>({
    show: false,
    short: false,
  });

  // One-time mount sync with external systems (sessionStorage + matchMedia).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("rk-intro-seen") === "1";
    } catch {
      seen = false;
    }
    if (reduced) {
      setEntered(true);
    } else {
      // Repeat visits get the shortened intro; first visits get the full journey.
      setIntro({ show: true, short: seen });
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <>
      {intro.show && (
        <IntroOverlay
          short={intro.short}
          onDone={() => {
            setIntro((s) => ({ ...s, show: false }));
            setEntered(true);
          }}
        />
      )}
      <SiteHeader active={entered} />
      <main id="main">
        <HeroSection active={entered} />
        <AmenityMarquee />
        <IntroSection />
        <ExperiencesSection />
        <NightSection />
        <GallerySection />
        <ReviewsSection />
        <LocationSection />
        <BookingSection />
        <InstagramStrip />
      </main>
      <SiteFooter />
      <StickyMobileCTA />
    </>
  );
}
