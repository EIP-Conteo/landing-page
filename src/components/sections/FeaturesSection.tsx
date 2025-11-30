"use client";

import { cn } from "@/lib/utils";
import { Users, Sparkles, Volume2, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Character assets from Figma
const teddyBear =
  "https://www.figma.com/api/mcp/asset/caa3a5ee-a235-431e-a9a7-3a5181358cfc";
const frog =
  "https://www.figma.com/api/mcp/asset/8fd7630f-36b5-457d-9cba-8cb7398524b6";
const baby =
  "https://www.figma.com/api/mcp/asset/df1375c2-c9bd-49e5-9531-5b96e0b1ef3a";

const features = [
  {
    icon: Users,
    title: "Personnages adorables",
    description:
      "Une galerie de personnages mignons que votre enfant peut choisir pour être les héros de son histoire.",
    gradient: "from-pink-500 to-rose-500",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    icon: Sparkles,
    title: "Histoires générées par IA",
    description:
      "Chaque histoire est unique, créée spécialement selon les choix de votre enfant.",
    gradient: "from-conteo-secondary to-indigo-600",
    iconBg: "bg-conteo-light",
    iconColor: "text-conteo-secondary",
  },
  {
    icon: Volume2,
    title: "Narration audio",
    description:
      "Une voix douce raconte l'histoire, parfaite pour le coucher ou les moments calmes.",
    gradient: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: ImageIcon,
    title: "Illustrations uniques",
    description:
      "De belles images générées pour accompagner chaque moment de l'histoire.",
    gradient: "from-conteo-accent to-lime-400",
    iconBg: "bg-lime-100",
    iconColor: "text-lime-600",
  },
];

export function FeaturesSection() {
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
      ref={sectionRef}
      className="relative bg-gradient-to-b from-conteo-light to-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-conteo-dark to-transparent opacity-5" />

      {/* Static decorative characters */}
      <div className="absolute -left-16 top-32 w-32 h-32 opacity-20 hidden lg:block">
        <Image src={teddyBear} alt="" fill className="object-contain" />
      </div>
      <div className="absolute -right-12 top-1/2 w-24 h-24 opacity-20 hidden lg:block">
        <Image src={frog} alt="" fill className="object-contain" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="inline-block px-4 py-1.5 bg-conteo-secondary/10 text-conteo-secondary text-sm font-medium rounded-full mb-4">
            Fonctionnalités
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-conteo-dark mb-4">
            Tout ce qu&apos;il faut pour des{" "}
            <span className="relative">
              <span className="text-conteo-secondary">moments magiques</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 8C50 2 150 2 198 8"
                  stroke="#6a5ae0"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="opacity-30"
                />
              </svg>
            </span>
          </h2>
          <p className="font-sans text-conteo-text-muted text-lg max-w-2xl mx-auto">
            Contéo combine créativité et technologie pour offrir à votre enfant
            une expérience unique de création d&apos;histoires.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={cn(
            "text-center mt-16 transition-all duration-1000 delay-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        ></div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
  isVisible,
}: {
  feature: (typeof features)[0];
  index: number;
  isVisible: boolean;
}) {
  const Icon = feature.icon;

  return (
    <div
      className={cn(
        "group relative bg-white p-6 rounded-[2rem] transition-all duration-700 card-hover",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Gradient border on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10",
          `bg-gradient-to-br ${feature.gradient}`
        )}
        style={{ padding: "2px" }}
      >
        <div className="absolute inset-[2px] bg-white rounded-[calc(2rem-2px)]" />
      </div>

      {/* Shadow on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-20 blur-xl",
          `bg-gradient-to-br ${feature.gradient}`
        )}
      />

      {/* Icon */}
      <div
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
          feature.iconBg
        )}
      >
        <Icon className={cn("w-7 h-7", feature.iconColor)} />
      </div>

      {/* Content */}
      <h3 className="font-sans font-semibold text-xl text-conteo-dark mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-conteo-dark group-hover:to-conteo-secondary transition-all duration-300">
        {feature.title}
      </h3>
      <p className="font-sans text-conteo-text-muted text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}
