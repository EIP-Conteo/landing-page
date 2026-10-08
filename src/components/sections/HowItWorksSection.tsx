import { PhoneFrame } from "@/components/shared/PhoneFrame";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const steps = [
  {
    title: "Votre enfant choisit ses héros",
    description:
      "Il compose son équipe de héros, puis ajoute un objet magique et un décor dans la galerie.",
    image: "/images/app/choix-heros.png",
    alt: "Écran Contéo « Choisis tes héros » avec Luna la Fée et Merlin le Sorcier sélectionnés",
  },
  {
    title: "Vous réglez l'histoire",
    description:
      "Courte pour les soirs pressés, longue pour les week-ends. Vous choisissez le mode et le niveau de lecture.",
    image: "/images/app/reglages.png",
    alt: "Écran Contéo « Dernier réglage » : longueur, mode de l'histoire et niveau de lecture",
  },
  {
    title: "Contéo l'écrit et la raconte",
    description:
      "En quelques instants, une histoire unique est prête, à lire ensemble ou à écouter avec une voix douce.",
    image: "/images/app/lecture-audio.png",
    alt: "Écran de lecture Contéo en mode audio",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="comment-ca-marche"
      aria-labelledby="how-title"
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        <Reveal>
          <SectionHeading
            id="how-title"
            eyebrow="Comment ça marche"
            title="Une histoire unique, en trois gestes"
            description="Pas besoin d'inspiration à 20 h. Votre enfant choisit, Contéo s'occupe du reste."
          />
        </Reveal>

        <ol className="mt-16 grid gap-14 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 120} className="flex flex-col items-center text-center">
                <div className="relative w-full max-w-[17rem]">
                  <div aria-hidden="true" className="absolute inset-x-6 bottom-0 top-16 rounded-[3rem] bg-conteo-light" />
                  <PhoneFrame
                    src={step.image}
                    alt={step.alt}
                    className="relative mx-auto w-[82%] -rotate-1 transition-transform duration-500 hover:rotate-0"
                    sizes="(min-width: 768px) 240px, 60vw"
                  />
                </div>
                <span className="mt-8 flex size-9 items-center justify-center rounded-full bg-conteo-accent font-heading text-base font-extrabold text-conteo-dark">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-heading text-xl font-extrabold text-conteo-dark md:text-2xl">{step.title}</h3>
                <p className="mt-2 max-w-xs font-sans leading-relaxed text-conteo-text-muted">{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
