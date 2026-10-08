import { Award, Library, TrendingUp } from "lucide-react";
import { PhoneFrame } from "@/components/shared/PhoneFrame";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const points = [
  {
    icon: TrendingUp,
    title: "Un niveau qui suit son âge",
    text: "Plusieurs niveaux de lecture, des tout-petits aux premiers lecteurs : vocabulaire et style s'adaptent à son âge.",
  },
  {
    icon: Award,
    title: "Des badges et une série de lecture",
    text: "Première lecture, Lecteur assidu, Collectionneur… Il débloque des badges et suit sa série de lecture, jour après jour.",
  },
  {
    icon: Library,
    title: "Sa bibliothèque à lui",
    text: "Toutes ses histoires et ses favoris au même endroit, avec la reprise là où il s'était arrêté.",
  },
];

export function GrowSection() {
  return (
    <section
      aria-labelledby="grow-title"
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="container mx-auto grid items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative order-last mx-auto flex w-full max-w-md items-start justify-center lg:order-first">
          <div
            aria-hidden="true"
            className="absolute inset-8 rounded-[3rem] bg-conteo-light"
          />
          <PhoneFrame
            src="/images/app/bibliotheque.png"
            alt="Bibliothèque Contéo avec les histoires en cours, terminées et favorites"
            className="relative w-[52%] -rotate-3"
            sizes="(min-width: 1024px) 230px, 45vw"
          />
          <PhoneFrame
            src="/images/app/profil.png"
            alt="Écran de profil de l'application Contéo"
            className="relative -ml-[8%] mt-14 w-[52%] rotate-3"
            sizes="(min-width: 1024px) 230px, 45vw"
          />
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              id="grow-title"
              align="start"
              eyebrow="Ça grandit avec lui"
              title="Des histoires qui l'accompagnent en grandissant"
              description="Contéo s'adapte à son âge et donne envie de revenir, soir après soir."
            />
          </Reveal>
          <ul className="mt-10 flex flex-col gap-7">
            {points.map(({ icon: Icon, title, text }, index) => (
              <li key={title}>
                <Reveal delay={index * 80} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-conteo-light text-conteo-secondary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-conteo-dark">
                      {title}
                    </h3>
                    <p className="mt-1 font-sans leading-relaxed text-conteo-text-muted">
                      {text}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
