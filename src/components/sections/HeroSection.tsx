import { Ban, Heart, MapPin } from "lucide-react";
import { DownloadCTA } from "@/components/shared/DownloadCTA";
import { NightSky } from "@/components/shared/NightSky";
import { PhoneDemo } from "@/components/shared/PhoneDemo";

const reassurances = [
  { icon: Heart, label: "Gratuit pour commencer" },
  { icon: Ban, label: "Sans publicité" },
  { icon: MapPin, label: "Fait à Marseille" },
];

export function HeroSection() {
  return (
    <section
      id="accueil"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-conteo-dark pb-20 pt-32 lg:pb-28 lg:pt-40"
    >
      <NightSky />

      <div className="container relative mx-auto grid items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="hero-in mb-7 inline-flex items-center gap-2 rounded-full bg-white/[0.07] py-1.5 pl-1.5 pr-4 font-sans text-sm text-white/80 ring-1 ring-white/10">
            <span className="rounded-full bg-conteo-accent px-2.5 py-0.5 text-xs font-semibold text-conteo-dark">
              Nouveau
            </span>
            Disponible sur Android
          </span>

          <h1
            id="hero-title"
            className="hero-in text-balance font-heading text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-white [animation-delay:80ms] sm:text-6xl lg:text-[4.25rem]"
          >
            Ce soir, c&apos;est votre enfant qui{" "}
            <span className="relative whitespace-nowrap text-conteo-accent">
              invente l&apos;histoire
              <svg
                aria-hidden="true"
                viewBox="0 0 300 14"
                className="absolute -bottom-2 left-0 h-3 w-full text-conteo-accent/50"
                preserveAspectRatio="none"
              >
                <path d="M2 10 C 80 2, 220 2, 298 9" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>

          <p className="hero-in mt-7 max-w-xl text-pretty font-sans text-lg leading-relaxed text-white/70 [animation-delay:160ms] md:text-xl">
            Ses héros, un objet magique, un décor : Contéo en fait une histoire
            unique, racontée d&apos;une voix douce. Le rituel du coucher
            qu&apos;il attendra avec impatience.
          </p>

          <div className="hero-in mt-10 w-full [animation-delay:240ms]">
            <DownloadCTA placement="hero" showQr />
          </div>

          <ul className="hero-in mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 [animation-delay:320ms] lg:justify-start">
            {reassurances.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 font-sans text-sm text-white/60">
                <Icon className="size-4 text-conteo-accent" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-in relative [animation-delay:200ms]">
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-conteo-secondary/35 blur-[100px]" />
          <div className="relative">
            <PhoneDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
