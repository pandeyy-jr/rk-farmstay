import { Home, Leaf, Users, Waves, Trophy, Trees } from "lucide-react";

const ITEMS = [
  { icon: Waves, label: "Swimming Pool" },
  { icon: Trophy, label: "Turf / Outdoor Games" },
  { icon: Leaf, label: "Spacious Open Lawn" },
  { icon: Home, label: "Private Farmstay" },
  { icon: Users, label: "Family & Group Friendly" },
  { icon: Trees, label: "Surrounded by Nature" },
];

export function AmenityMarquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-mask relative overflow-hidden border-y border-cream/10 bg-forest py-4">
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center" aria-hidden={half === 1}>
            {row.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center gap-2.5 whitespace-nowrap px-6 text-[13px] font-semibold tracking-wide text-cream/90"
              >
                <item.icon size={17} className="text-gold" aria-hidden />
                {item.label}
                <span aria-hidden className="ml-6 inline-block h-4 w-px bg-cream/20" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
