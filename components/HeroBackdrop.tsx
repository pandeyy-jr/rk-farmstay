import Image from "next/image";
import { IMAGES } from "@/lib/images";

/**
 * Shared cinematic backdrop — the golden-hour property photograph with its
 * colour grade. Rendered identically by the homepage hero and the intro's
 * final phase so the intro → hero transition has no visible jump.
 */
export function HeroBackdrop() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Image
        src={IMAGES.heroDusk.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[60%_28%]"
      />
      {/* Cinematic grade — must stay in sync wherever this is used */}
      <div className="absolute inset-0 bg-gradient-to-r from-pine via-pine/72 to-pine/8" />
      <div className="absolute inset-0 bg-gradient-to-t from-pine via-transparent to-pine/45" />
      <div className="grain absolute inset-0" />
    </div>
  );
}
