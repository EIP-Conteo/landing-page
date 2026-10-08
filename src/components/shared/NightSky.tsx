import { cn } from "@/lib/utils";

/** Pseudo-aléatoire déterministe : même rendu serveur et client. */
function seeded(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const STARS = Array.from({ length: 46 }, (_, i) => ({
  id: i,
  left: (seeded(i + 1) * 100).toFixed(2),
  top: (seeded(i + 101) * 100).toFixed(2),
  size: seeded(i + 201) > 0.85 ? 3 : seeded(i + 201) > 0.5 ? 2 : 1,
  opacity: (0.25 + seeded(i + 301) * 0.6).toFixed(2),
  twinkle: i % 5 === 0,
  delay: (seeded(i + 401) * 4).toFixed(2),
}));

/** Ciel nocturne calme : dégradé, halo de lune, étoiles statiques (quelques-unes scintillent). */
export function NightSky({ className }: Readonly<{ className?: string }>) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_0%,#3b3770_0%,#2a2a42_45%,#1c1c30_100%)]" />
      <div className="absolute -right-24 -top-24 size-[28rem] rounded-full bg-conteo-accent/[0.07] blur-3xl" />
      {STARS.map((star) => (
        <span
          key={star.id}
          className={cn("absolute rounded-full bg-white", star.twinkle && "motion-safe:animate-twinkle-star")}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            opacity: Number(star.opacity),
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-[#1c1c30]/40" />
    </div>
  );
}
