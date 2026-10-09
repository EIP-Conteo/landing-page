import { BookOpen, Crown, Headphones, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const modes = [
  {
    icon: BookOpen,
    title: "Texte",
    tagline: "À lire ensemble",
    description:
      "Lisez-la blotti contre votre enfant, comme un vrai livre. Les plus grands suivent le texte et progressent en lecture.",
    tint: "bg-[#fff4d6] text-[#a8740b]",
  },
  {
    icon: Headphones,
    title: "Audio",
    tagline: "Pour s'endormir",
    description:
      "Une voix douce raconte l'histoire, à la vitesse de votre choix. L'écran peut rester posé : on ferme les yeux et on écoute.",
    tint: "bg-conteo-light text-conteo-secondary",
    featured: true,
  },
  {
    icon: Sparkles,
    title: "Roman visuel",
    tagline: "Pour s'émerveiller",
    description:
      "Personnages, décors et dialogues animés, scène après scène, avec ses propres dessins en vedette et un mini-jeu tiré de l'histoire si vous le souhaitez.",
    tint: "bg-[#ffe4ec] text-[#c2416b]",
    premium: true,
  },
];

export function ModesSection() {
  return (
    <section
      aria-labelledby="modes-title"
      className="relative bg-[#f7f7fd] py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        <Reveal>
          <SectionHeading
            id="modes-title"
            eyebrow="Trois façons de la vivre"
            title={"Lue, écoutée ou animée\u00a0: à vous de choisir ce soir"}
          />
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-6xl gap-5 md:grid-cols-3">
          {modes.map(
            (
              {
                icon: Icon,
                title,
                tagline,
                description,
                tint,
                featured,
                premium,
              },
              index,
            ) => (
              <Reveal key={title} delay={index * 100}>
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-[2rem] bg-white p-8 ring-1 ring-conteo-dark/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(42,42,66,0.35)]",
                    featured && "ring-2 ring-conteo-secondary/30",
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={cn(
                        "flex size-14 items-center justify-center rounded-[1.25rem]",
                        tint,
                      )}
                    >
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    {premium && (
                      <span className="flex items-center gap-1 rounded-full bg-conteo-accent px-2.5 py-1 font-sans text-[11px] font-bold uppercase tracking-wide text-conteo-dark">
                        <Crown className="size-3" aria-hidden="true" />
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="mt-8 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-conteo-text-muted">
                    {tagline}
                  </p>
                  <h3 className="mt-1.5 font-heading text-2xl font-extrabold text-conteo-dark">
                    {title}
                  </h3>
                  <p className="mt-3 font-sans leading-relaxed text-conteo-text-muted">
                    {description}
                  </p>
                </article>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
