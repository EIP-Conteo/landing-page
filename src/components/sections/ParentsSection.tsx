import Link from "next/link";
import { ArrowRight, Ban, HeartHandshake, Lock, MessageCircleHeart } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const commitments = [
  {
    icon: Ban,
    title: "Zéro publicité",
    text: "Pas une seule publicité, ni dans les histoires ni entre deux histoires. Juste le conte, et le calme.",
  },
  {
    icon: HeartHandshake,
    title: "Des histoires bienveillantes",
    text: "Les histoires sont générées pour un jeune public, avec des thèmes doux et un langage adapté à son âge.",
  },
  {
    icon: Lock,
    title: "Ses données restent les siennes",
    text: "Ses informations ne sont jamais revendues ni utilisées pour de la publicité. Vous pouvez tout supprimer à tout moment.",
    link: { href: "/privacy", label: "Notre politique de confidentialité" },
  },
  {
    icon: MessageCircleHeart,
    title: "Une équipe qui vous répond",
    text: "Contéo est conçu à Marseille par une petite équipe. Une remarque, une idée ? On lit tout.",
    link: { href: "/feedback", label: "Nous écrire" },
  },
];

export function ParentsSection() {
  return (
    <section aria-labelledby="parents-title" className="relative bg-[#f7f7fd] py-24 md:py-32">
      <div className="container mx-auto px-6">
        <Reveal>
          <SectionHeading
            id="parents-title"
            eyebrow="Côté parents"
            title="Un espace serein, sans mauvaise surprise"
            description="Vous confiez à Contéo un moment précieux. Voici nos engagements."
          />
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-2">
          {commitments.map(({ icon: Icon, title, text, link }, index) => (
            <Reveal key={title} delay={index * 80}>
              <article className="flex h-full gap-5 rounded-[2rem] bg-white p-7 ring-1 ring-conteo-dark/5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-conteo-dark text-conteo-accent">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heading text-xl font-extrabold text-conteo-dark">{title}</h3>
                  <p className="mt-2 font-sans leading-relaxed text-conteo-text-muted">{text}</p>
                  {link && (
                    <Link
                      href={link.href}
                      className="mt-3 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-conteo-secondary hover:underline"
                    >
                      {link.label}
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
