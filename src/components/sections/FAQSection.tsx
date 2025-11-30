"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-conteo-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-conteo-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          className={cn(
            "text-center mb-12 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="inline-block px-4 py-1.5 bg-conteo-secondary/10 text-conteo-secondary text-sm font-medium rounded-full mb-4">
            Questions fréquentes
          </span>
          <h2
            id="faq-title"
            className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-conteo-dark mb-4"
          >
            Vous avez des{" "}
            <span className="text-conteo-secondary">questions</span> ?
          </h2>
          <p className="font-sans text-conteo-text-muted text-lg max-w-xl mx-auto">
            Trouvez les réponses aux questions les plus courantes sur Contéo.
          </p>
        </div>

        {/* FAQ Accordion */}
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
            className="space-y-3"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border-none px-6 shadow-sm hover:shadow-md transition-shadow duration-300 data-[state=open]:bg-white data-[state=open]:shadow-lg"
              >
                <AccordionTrigger className="text-lg font-semibold text-conteo-dark hover:text-conteo-secondary hover:no-underline py-5 data-[state=open]:text-conteo-secondary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-conteo-text-muted leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
