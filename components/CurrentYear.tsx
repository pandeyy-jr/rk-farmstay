"use client";

import { useEffect, useState } from "react";

/**
 * Renders the current year on the client to keep the page statically
 * prerenderable (Next 16 forbids `new Date()` in the render path).
 */
export function CurrentYear() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setYear(new Date().getFullYear()));
    return () => cancelAnimationFrame(frame);
  }, []);
  return <>{year ?? 2026}</>;
}
