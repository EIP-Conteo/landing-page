import Image from "next/image";
import { ArrowRight, Crown, Palette, PencilLine, Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const points = [
  {
    icon: PencilLine,
    title: "Il dessine ses propres héros",
    text: "Un dragon à pois, un doudou qui vole, sa petite sœur en princesse : tout ce qu'il imagine peut devenir un personnage.",
  },
  {
    icon: Palette,
    title: "Et ses objets magiques",
    text: "Une baguette, une clé, une fusée en carton… Ses objets dessinés rejoignent ceux de la galerie.",
  },
  {
    icon: Sparkles,
    title: "Qu'il retrouve dans le roman visuel",
    text: "Ses créations sont intégrées à l'histoire et apparaissent à l'écran, scène après scène.",
  },
];

/** Gribouillis façon crayon de couleur, pour évoquer un dessin d'enfant. */
function KidDrawing({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Corps */}
      <path
        d="M58 120c-6-26 14-50 44-50 30 0 50 20 46 48-4 26-26 38-50 36-22-2-36-14-40-34Z"
        fill="#c9f560"
        stroke="#2a2a42"
        strokeWidth="4"
      />
      {/* Ailes */}
      <path d="M70 92c-18-14-34-10-40 4 12-2 22 4 30 14" fill="#ffd166" stroke="#2a2a42" strokeWidth="4" />
      <path d="M134 90c18-14 34-10 40 4-12-2-22 4-30 14" fill="#ffd166" stroke="#2a2a42" strokeWidth="4" />
      {/* Cornes */}
      <path d="M86 74l-6-20 16 14M114 72l8-20-18 14" stroke="#2a2a42" strokeWidth="4" fill="#ff8fab" />
      {/* Yeux */}
      <circle cx="88" cy="104" r="7" fill="#fff" stroke="#2a2a42" strokeWidth="3" />
      <circle cx="118" cy="102" r="7" fill="#fff" stroke="#2a2a42" strokeWidth="3" />
      <circle cx="89" cy="105" r="3" fill="#2a2a42" />
      <circle cx="119" cy="103" r="3" fill="#2a2a42" />
      {/* Sourire */}
      <path d="M90 124c8 8 20 8 28-2" stroke="#2a2a42" strokeWidth="4" />
      {/* Pois */}
      <circle cx="76" cy="136" r="4" fill="#6a5ae0" />
      <circle cx="132" cy="132" r="5" fill="#6a5ae0" />
      <circle cx="104" cy="146" r="4" fill="#6a5ae0" />
      {/* Pattes */}
      <path d="M80 152l-4 14M124 152l4 14" stroke="#2a2a42" strokeWidth="4" />
    </svg>
  );
}

export function DrawSection() {
  return (
    <section
      id="dessins"
      aria-labelledby="draw-title"
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="container mx-auto grid items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal>
            <SectionHeading
              id="draw-title"
              align="start"
              eyebrow="Ses dessins prennent vie"
              title="Son dessin devient le héros de l'histoire"
              description="Avec Premium, votre enfant dessine ses propres personnages et objets. Contéo les intègre à l'histoire, et il les voit apparaître en roman visuel."
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
          <Reveal delay={260}>
            <p className="mt-10 inline-flex items-center gap-1.5 rounded-full bg-conteo-accent px-3 py-1.5 font-sans text-xs font-bold uppercase tracking-wide text-conteo-dark">
              <Crown className="size-3.5" aria-hidden="true" />
              Inclus dans Premium
            </p>
          </Reveal>
        </div>

        <Reveal className="relative mx-auto flex w-full max-w-lg flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-4">
          <div
            aria-hidden="true"
            className="absolute inset-6 rounded-[3rem] bg-conteo-light"
          />

          {/* Le dessin sur papier */}
          <figure className="relative w-48 shrink-0 -rotate-3 rounded-[1.5rem] bg-[#fffdf6] p-4 shadow-[0_20px_40px_-20px_rgba(42,42,66,0.35)] ring-1 ring-conteo-dark/5">
            <KidDrawing className="aspect-square w-full" />
            <figcaption className="mt-2 whitespace-nowrap text-center font-heading text-sm font-extrabold text-conteo-dark">
              {"« Pistache, mon dragon »"}
            </figcaption>
          </figure>

          <span className="relative flex size-11 shrink-0 rotate-90 items-center justify-center rounded-full bg-conteo-accent text-conteo-dark shadow-md sm:rotate-0">
            <ArrowRight className="size-5" aria-hidden="true" />
          </span>

          {/* La scène du roman visuel */}
          <figure className="relative w-full max-w-[15rem] rotate-2 overflow-hidden rounded-[1.75rem] bg-conteo-dark shadow-[0_30px_60px_-30px_rgba(42,42,66,0.55)]">
            <div className="relative aspect-[3/4]">
              <Image
                src="/images/preview/landscapes/cloud-mountain.png"
                alt=""
                fill
                sizes="240px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-conteo-dark/80 via-transparent to-transparent" />
              <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wide text-conteo-secondary">
                <Sparkles className="size-3" aria-hidden="true" />
                Roman visuel
              </span>
              <KidDrawing className="absolute bottom-[26%] left-1/2 w-[58%] -translate-x-1/2 drop-shadow-[0_8px_12px_rgba(0,0,0,0.3)]" />
              <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-white px-3 py-2 shadow-lg">
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-wider text-conteo-secondary">
                  Pistache
                </span>
                <span className="block font-sans text-xs leading-snug text-conteo-dark">
                  {"« Accroche-toi, on s'envole jusqu'au château des nuages ! »"}
                </span>
              </figcaption>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
