import { Download, Moon, Sun, Timer, Volume2 } from "lucide-react";
import { NightSky } from "@/components/shared/NightSky";
import { PhoneFrame } from "@/components/shared/PhoneFrame";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const points = [
  {
    icon: Moon,
    title: "Un mode sombre pour le soir",
    text: "L'interface passe en couleurs sombres d'un simple geste, pour ménager ses yeux avant de dormir.",
  },
  {
    icon: Timer,
    title: "La longueur qui convient",
    text: "Courte, moyenne ou longue : vous choisissez selon l'heure et la fatigue du soir.",
  },
  {
    icon: Volume2,
    title: "Une voix qui apaise",
    text: "Une voix douce raconte l'histoire, à la vitesse de votre choix (de 0,75x à 1,5x). L'écran peut rester posé.",
  },
  {
    icon: Download,
    title: "Ses histoires, même sans réseau",
    text: "Avec Premium, téléchargez ses histoires préférées pour les retrouver en voyage ou chez les grands-parents.",
  },
];

export function BedtimeSection() {
  return (
    <section id="coucher" aria-labelledby="bedtime-title" className="relative overflow-hidden bg-conteo-dark py-24 md:py-32">
      <NightSky />
      <div className="container relative mx-auto grid items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal>
            <SectionHeading
              id="bedtime-title"
              tone="dark"
              align="start"
              eyebrow="Pensé pour le coucher"
              title="Moins d'écran, plus de rêves"
              description="Contéo n'est pas un jeu de plus. C'est un rituel calme, conçu pour accompagner votre enfant jusqu'au sommeil."
            />
          </Reveal>
          <ul className="mt-12 grid gap-7 sm:grid-cols-2">
            {points.map(({ icon: Icon, title, text }, index) => (
              <li key={title}>
                <Reveal delay={index * 80}>
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-white/[0.07] text-conteo-accent ring-1 ring-white/10">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-sans text-base font-semibold text-white">{title}</h3>
                  <p className="mt-1.5 font-sans text-sm leading-relaxed text-white/60">{text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="relative mx-auto w-full max-w-[19rem]">
          <div aria-hidden="true" className="absolute inset-0 scale-110 rounded-full bg-conteo-secondary/30 blur-[90px]" />
          <PhoneFrame
            src="/images/app/accueil.png"
            alt="Écran d'accueil de l'application Contéo"
            className="relative rotate-2"
          />
          <div className="absolute -left-10 top-24 hidden rounded-2xl bg-white px-4 py-3 shadow-xl sm:block">
            <p className="flex items-center gap-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-conteo-text-muted">
              <Sun className="size-3" aria-hidden="true" />
              Chaque histoire
            </p>
            <p className="font-heading text-lg font-extrabold text-conteo-dark">finit bien</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
