import Image from "next/image";
import { DownloadCTA } from "@/components/shared/DownloadCTA";
import { NightSky } from "@/components/shared/NightSky";
import { Reveal } from "@/components/shared/Reveal";

const cast = [
  { src: "/images/preview/characters/pablo.png", className: "-rotate-6" },
  { src: "/images/preview/characters/olga.png", className: "-mt-6 scale-110" },
  { src: "/images/preview/characters/marina.png", className: "rotate-6" },
];

export function FinalCTASection() {
  return (
    <section id="telecharger" aria-labelledby="final-title" className="relative overflow-hidden bg-conteo-dark py-24 md:py-32">
      <NightSky />
      <Reveal className="container relative mx-auto flex flex-col items-center px-6 text-center">
        <div className="flex items-end" aria-hidden="true">
          {cast.map((character) => (
            <span key={character.src} className={`relative size-24 md:size-28 ${character.className}`}>
              <Image src={character.src} alt="" fill sizes="112px" className="object-contain drop-shadow-2xl" />
            </span>
          ))}
        </div>
        <h2
          id="final-title"
          className="mt-8 max-w-3xl text-balance font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-6xl"
        >
          Ses héros l&apos;attendent pour <span className="text-conteo-accent">l&apos;histoire de ce soir</span>.
        </h2>
        <p className="mt-6 max-w-xl font-sans text-lg text-white/65">
          Téléchargez Contéo gratuitement et créez votre première histoire ensemble dès ce soir.
        </p>
        <DownloadCTA placement="final" align="center" showQr className="mt-10" />
      </Reveal>
    </section>
  );
}
