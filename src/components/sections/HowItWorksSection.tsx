"use client";

import { cn } from "@/lib/utils";
import { MousePointerClick, Wand2, BookOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: 1,
    icon: MousePointerClick,
    title: "Choisissez",
    description:
      "Votre enfant sélectionne ses personnages, objets et décors préférés parmi une galerie adorable.",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-500",
  },
  {
    number: 2,
    icon: Wand2,
    title: "Générez",
    description:
      "La magie opère ! L'IA crée une histoire unique avec texte, audio et illustrations.",
    color: "from-conteo-secondary to-indigo-600",
    bgColor: "bg-conteo-light",
    iconColor: "text-conteo-secondary",
  },
  {
    number: 3,
    icon: BookOpen,
    title: "Profitez",
    description:
      "Écoutez et regardez cette histoire magique, créée rien que pour votre enfant.",
    color: "from-conteo-accent to-lime-400",
    bgColor: "bg-lime-50",
    iconColor: "text-lime-600",
  },
];

export function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-24 overflow-hidden"
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236a5ae0' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          className={cn(
            "text-center mb-20 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="inline-block px-4 py-1.5 bg-conteo-accent/20 text-conteo-dark text-sm font-medium rounded-full mb-4">
            Simple comme 1, 2, 3
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-conteo-dark mb-4">
            Comment ça{" "}
            <span className="relative inline-block">
              <span className="text-conteo-accent">marche</span>
              <span className="absolute -top-1 -right-4 text-2xl">✨</span>
            </span>{" "}
            ?
          </h2>
          <p className="font-sans text-conteo-text-muted text-lg max-w-xl mx-auto">
            En trois étapes simples, créez des souvenirs inoubliables avec votre
            enfant.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-linear-to-r from-pink-200 via-conteo-secondary/30 to-lime-200 rounded-full hidden md:block" />

          {/* Progress indicator on line */}
          <div
            className="absolute top-24 left-0 h-1 bg-linear-to-r from-pink-500 via-conteo-secondary to-conteo-accent rounded-full hidden md:block transition-all duration-500"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                step={step}
                index={index}
                isVisible={isVisible}
                isActive={activeStep === index}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
        </div>

        {/* Bottom visual cue */}
        <div
          className={cn(
            "text-center mt-16 transition-all duration-1000 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="inline-flex items-center gap-3 bg-conteo-dark text-white px-6 py-3 rounded-full btn-magnetic cursor-pointer hover:bg-conteo-dark/90">
            <span className="font-medium">Essayer maintenant</span>
            <div className="w-6 h-6 rounded-full bg-conteo-accent flex items-center justify-center">
              <svg
                className="w-3 h-3 text-conteo-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
  isVisible,
  isActive,
  onClick,
}: Readonly<{
  step: (typeof steps)[0];
  index: number;
  isVisible: boolean;
  isActive: boolean;
  onClick: () => void;
}>) {
  const Icon = step.icon;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center text-center cursor-pointer transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 200}ms` }}
      onClick={onClick}
    >
      {/* Number badge + Icon container */}
      <div className="relative mb-6">
        {/* Glow effect when active */}
        <div
          className={cn(
            "absolute inset-0 rounded-[1.75rem] blur-xl transition-opacity duration-500",
            `bg-linear-to-br ${step.color}`,
            isActive ? "opacity-50" : "opacity-0"
          )}
        />

        {/* Main icon container */}
        <div
          className={cn(
            "relative w-24 h-24 rounded-[1.75rem] flex items-center justify-center transition-all duration-500",
            step.bgColor,
            isActive ? "scale-110 shadow-lg" : "scale-100"
          )}
        >
          <Icon
            className={cn(
              "w-10 h-10 transition-all duration-500",
              step.iconColor,
              isActive && "animate-bounce"
            )}
          />
        </div>

        {/* Number badge */}
        <div
          className={cn(
            "absolute -top-2 -left-2 w-10 h-10 rounded-full flex items-center justify-center font-heading font-extrabold text-lg transition-all duration-500",
            isActive
              ? `bg-linear-to-br ${step.color} text-white shadow-lg scale-110`
              : "bg-conteo-accent text-conteo-dark"
          )}
        >
          {step.number}
        </div>

        {/* Pulse ring when active */}
        {isActive && (
          <div
            className={cn(
              "absolute inset-0 rounded-[1.75rem] border-2 animate-ping",
              `border-${step.iconColor.replace("text-", "")}`
            )}
            style={{ animationDuration: "1.5s" }}
          />
        )}
      </div>

      {/* Content */}
      <h3
        className={cn(
          "font-sans font-semibold text-xl mb-3 transition-all duration-300",
          isActive ? "text-conteo-dark scale-105" : "text-conteo-dark/70"
        )}
      >
        {step.title}
      </h3>
      <p
        className={cn(
          "font-sans text-sm leading-relaxed max-w-[250px] transition-all duration-300",
          isActive ? "text-conteo-text-muted" : "text-conteo-text-muted/60"
        )}
      >
        {step.description}
      </p>
    </div>
  );
}
