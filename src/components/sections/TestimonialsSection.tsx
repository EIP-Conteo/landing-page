"use client";

import { cn } from "@/lib/utils";
import { Star, Quote, Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const avatars = [
  "https://www.figma.com/api/mcp/asset/df1375c2-c9bd-49e5-9531-5b96e0b1ef3a", // baby character as avatar
  "https://www.figma.com/api/mcp/asset/8fd7630f-36b5-457d-9cba-8cb7398524b6", // frog
  "https://www.figma.com/api/mcp/asset/caa3a5ee-a235-431e-a9a7-3a5181358cfc", // teddy
];

const testimonials = [
  {
    name: "Marie L.",
    role: "Maman de Lucas, 5 ans",
    content:
      "Lucas adore créer ses propres histoires ! Chaque soir c'est devenu notre rituel. Il choisit ses personnages et on découvre ensemble une nouvelle aventure.",
    rating: 5,
    avatar: 0,
  },
  {
    name: "Thomas D.",
    role: "Papa de Emma, 7 ans",
    content:
      "Impressionnant ! Emma est captivée par les illustrations et la narration. Une vraie magie technologique au service de l'imagination des enfants.",
    rating: 5,
    avatar: 1,
  },
  {
    name: "Sophie M.",
    role: "Maman de Léo, 4 ans",
    content:
      "Léo qui n'aimait pas les histoires avant est maintenant impatient chaque soir. Les personnages mignons et les voix douces ont tout changé !",
    rating: 5,
    avatar: 2,
  },
];

const stats = [
  { value: "10K+", label: "Familles heureuses", icon: Heart },
  { value: "50K+", label: "Histoires créées", icon: Star },
  { value: "4.9", label: "Note App Store", icon: Star },
];

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-conteo-dark py-24 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-linear-to-br from-conteo-dark via-[#1e1e35] to-conteo-dark opacity-50" />

      {/* Floating quote marks */}
      <div className="absolute top-20 left-10 opacity-5">
        <Quote className="w-40 h-40 text-conteo-accent" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-5 rotate-180">
        <Quote className="w-32 h-32 text-conteo-secondary" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-conteo-secondary/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 -right-20 w-48 h-48 bg-conteo-accent/20 rounded-full blur-3xl animate-float-reverse" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="inline-block px-4 py-1.5 bg-conteo-accent/20 text-conteo-accent text-sm font-medium rounded-full mb-4">
            Ils nous font confiance
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Des familles{" "}
            <span className="relative inline-block">
              <span className="gradient-text">enchantées</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 8C50 2 150 2 198 8"
                  stroke="#c9f560"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="opacity-50"
                />
              </svg>
            </span>
          </h2>
          <p className="font-sans text-white/60 text-lg max-w-xl mx-auto">
            Découvrez ce que les parents disent de Contéo
          </p>
        </div>

        {/* Stats bar */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-8 md:gap-16 mb-16 transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-conteo-secondary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-conteo-secondary/30 transition-all duration-300">
                <stat.icon className="w-6 h-6 text-conteo-accent" />
              </div>
              <div>
                <div className="font-heading font-extrabold text-2xl text-white">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Cards stack effect */}
          <div className="relative h-[320px] md:h-[280px]">
            {testimonials.map((testimonial, index) => {
              const isActive = index === activeIndex;
              const isPrev =
                index ===
                (activeIndex - 1 + testimonials.length) % testimonials.length;
              const isNext = index === (activeIndex + 1) % testimonials.length;

              return (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-all duration-700 ease-out cursor-pointer",
                    isActive && "z-30 scale-100 opacity-100 translate-x-0",
                    isPrev &&
                      "z-20 scale-95 opacity-40 -translate-x-8 md:-translate-x-16",
                    isNext &&
                      "z-20 scale-95 opacity-40 translate-x-8 md:translate-x-16",
                    !isActive && !isPrev && !isNext && "z-10 scale-90 opacity-0"
                  )}
                  onClick={() => setActiveIndex(index)}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    isActive={isActive}
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "bg-conteo-accent w-8"
                    : "bg-white/30 hover:bg-white/50"
                )}
              />
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div
          className={cn(
            "flex flex-wrap justify-center items-center gap-6 mt-16 pt-12 border-t border-white/10 transition-all duration-1000 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="text-white/40 text-sm">Disponible sur</span>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <span className="text-white/70 text-sm font-medium">App Store</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
            </svg>
            <span className="text-white/70 text-sm font-medium">
              Google Play
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  isActive,
}: Readonly<{
  testimonial: (typeof testimonials)[0];
  isActive: boolean;
}>) {
  return (
    <div
      className={cn(
        "h-full glass rounded-[2rem] p-8 transition-all duration-500",
        isActive ? "bg-white/10" : "bg-white/5"
      )}
    >
      {/* Quote icon */}
      <div className="absolute top-6 right-6">
        <Quote
          className={cn(
            "w-10 h-10 transition-all duration-500",
            isActive ? "text-conteo-accent/50" : "text-white/10"
          )}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col h-full">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-5 h-5 fill-current transition-all duration-300",
                isActive ? "text-conteo-accent" : "text-white/30"
              )}
              style={{ transitionDelay: `${i * 50}ms` }}
            />
          ))}
        </div>

        {/* Quote */}
        <p
          className={cn(
            "font-sans text-lg leading-relaxed grow transition-all duration-500",
            isActive ? "text-white/90" : "text-white/50"
          )}
        >
          &ldquo;{testimonial.content}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-conteo-secondary/30">
            <Image
              src={avatars[testimonial.avatar]}
              alt={testimonial.name}
              fill
              className="object-cover p-1"
            />
          </div>
          <div>
            <div
              className={cn(
                "font-semibold transition-all duration-500",
                isActive ? "text-white" : "text-white/60"
              )}
            >
              {testimonial.name}
            </div>
            <div
              className={cn(
                "text-sm transition-all duration-500",
                isActive ? "text-conteo-accent" : "text-white/40"
              )}
            >
              {testimonial.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
