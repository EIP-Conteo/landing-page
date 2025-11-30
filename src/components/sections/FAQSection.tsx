"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { HelpCircle, Sparkles, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { MagicalSparkles, StarField } from "@/components/shared/MagicalBackground";

const faqs = [
  {
    question: "Pour quel âge est Contéo ?",
    answer:
      "Contéo est conçu pour les enfants de 3 à 12 ans. Les histoires s'adaptent automatiquement à l'âge de l'enfant pour offrir un contenu approprié et captivant.",
  },
  {
    question: "Comment fonctionne Contéo ?",
    answer:
      "Votre enfant choisit ses personnages, objets et décors préférés parmi notre galerie adorable. Contéo génère ensuite une histoire unique avec du texte, une narration audio et des illustrations personnalisées.",
  },
  {
    question: "Contéo est-il gratuit ?",
    answer:
      "Contéo est gratuit à télécharger avec des histoires gratuites chaque jour. Un abonnement premium offre un accès illimité à toutes les fonctionnalités et personnages.",
  },
  {
    question: "Les histoires sont-elles sûres pour les enfants ?",
    answer:
      "Absolument ! Toutes les histoires générées sont adaptées aux enfants, sans contenu inapproprié. Notre IA est spécialement entraînée pour créer des contes bienveillants et éducatifs.",
  },
  {
    question: "Puis-je utiliser Contéo hors connexion ?",
    answer:
      "Une connexion internet est nécessaire pour générer de nouvelles histoires. Cependant, les histoires déjà créées peuvent être sauvegardées et écoutées hors ligne.",
  },
];

export function FAQSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      ref={sectionRef}
      className="relative bg-conteo-light py-24 overflow-hidden"
    >
      {/* Magical background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <StarField count={15} className="opacity-15" />
        <MagicalSparkles count={8} className="opacity-20" />
      </div>

      {/* Animated background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-conteo-secondary/10 rounded-full blur-3xl animate-orb-float" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-conteo-accent/10 rounded-full blur-3xl animate-orb-float delay-1000" style={{ animationDirection: "reverse" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          className={cn(
            "text-center mb-12 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <Badge
            variant="secondary"
            className="bg-conteo-secondary/10 text-conteo-secondary border-none px-4 py-1.5 text-sm mb-4"
          >
            <HelpCircle className="w-3 h-3 mr-1 inline" />
            Questions fréquentes
          </Badge>
          <h2
            id="faq-title"
            className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-conteo-dark mb-4"
          >
            Vous avez des{" "}
            <span className="relative inline-block">
              <span className="shimmer-text">questions</span>
              <Sparkles className="absolute -top-2 -right-6 w-6 h-6 text-conteo-accent animate-rotate-glow" />
              <Star className="absolute -bottom-1 -left-3 w-4 h-4 text-conteo-secondary animate-twinkle delay-300" fill="currentColor" />
            </span>{" "}
            ?
          </h2>
          <p className="font-sans text-conteo-text-muted text-lg max-w-xl mx-auto">
            Trouvez les réponses aux questions les plus courantes sur Contéo.
          </p>
        </div>

        {/* FAQ Accordion with magical styling */}
        <div
          className={cn(
            "max-w-2xl mx-auto transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={cn(
                  "group relative bg-white/80 backdrop-blur-sm rounded-2xl border-none px-6 transition-all duration-500",
                  "shadow-sm hover:shadow-xl",
                  "data-[state=open]:bg-white data-[state=open]:shadow-2xl data-[state=open]:shadow-conteo-secondary/10",
                  "hover:scale-[1.01]"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient border effect on hover/open */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-conteo-accent/20 via-conteo-secondary/20 to-conteo-accent/20 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />

                {/* Question number indicator */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-conteo-accent/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <span className="text-xs font-bold text-conteo-dark">{index + 1}</span>
                </div>

                <AccordionTrigger className="text-lg font-semibold text-conteo-dark hover:text-conteo-secondary hover:no-underline py-5 data-[state=open]:text-conteo-secondary transition-colors duration-300">
                  <span className="flex items-center gap-2">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-conteo-text-muted leading-relaxed pb-5">
                  <div className="relative">
                    {/* Decorative sparkle */}
                    <Sparkles className="absolute -left-6 top-0 w-4 h-4 text-conteo-accent/50 animate-twinkle" />
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
