"use client";

import { Logo } from "@/components/shared/Logo";
import { AppStoreBadges } from "@/components/shared/AppStoreBadges";
import {
  FloatingElements,
  DecorativeBlob,
} from "@/components/shared/FloatingElements";
import { PhoneDemo } from "@/components/shared/PhoneDemo";
import Image from "next/image";
import { useEffect, useState } from "react";

// Assets from Figma MCP
const decorativeCircle =
  "https://www.figma.com/api/mcp/asset/edd550ab-f8f7-4bd3-83ca-85072bd7a59a";
const cowReading =
  "https://www.figma.com/api/mcp/asset/81408f97-7dc8-4a18-915a-1584352b5dc3";
const foxGaming =
  "https://www.figma.com/api/mcp/asset/ba0ffe3a-9f3d-48e5-9ea3-6980f8ba293b";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsLoaded(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative bg-conteo-dark min-h-screen overflow-hidden">
      {/* Static gradient background - no animation for perf */}
      <div className="absolute inset-0 bg-linear-to-br from-conteo-dark via-[#1e1e35] to-conteo-dark opacity-50" />

      {/* Minimal floating elements */}
      <FloatingElements variant="stars" density="low" />

      {/* Static decorative blobs - no animation */}
      <DecorativeBlob
        className="w-[500px] h-[500px] -left-64 -top-32"
        color="secondary"
      />
      <DecorativeBlob
        className="w-[300px] h-[300px] right-0 bottom-0"
        color="accent"
      />

      {/* Single decorative circle - static */}
      <div className="absolute -left-48 -top-24 w-[500px] h-[500px] opacity-10">
        <Image
          src={decorativeCircle}
          alt=""
          fill
          className="object-contain"
          priority
          unoptimized
        />
      </div>

      <div className="relative container mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between min-h-screen">
        {/* Left content */}
        <div
          className={`flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl z-10 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Logo size="lg" className="mb-10" />

          <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
            Des histoires{" "}
            <span className="relative inline-block">
              <span className="gradient-text">magiques</span>
              {/* Sparkle decoration */}
              <svg
                className="absolute -top-4 -right-6 w-8 h-8 text-conteo-accent animate-twinkle"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </span>{" "}
            <br />
            créées par votre enfant
          </h1>

          <p className="font-sans text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-lg">
            Votre enfant choisit ses personnages, objets et décors préférés.
            Contéo crée une histoire unique avec{" "}
            <span className="text-conteo-accent font-medium">texte</span>,{" "}
            <span className="text-conteo-secondary font-medium">audio</span> et{" "}
            <span className="text-conteo-accent font-medium">visuels</span>{" "}
            générés rien que pour lui.
          </p>

          <div
            className={`transition-all duration-1000 delay-300 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <AppStoreBadges />
          </div>

          {/* Stats/Social proof mini */}
          <div
            className={`flex gap-8 mt-10 transition-all duration-1000 delay-500 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center lg:text-left">
              <div className="font-heading font-extrabold text-2xl text-conteo-accent">
                ∞
              </div>
              <div className="text-white/50 text-sm">Histoires uniques</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="font-heading font-extrabold text-2xl text-conteo-accent">
                3-12
              </div>
              <div className="text-white/50 text-sm">ans</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="font-heading font-extrabold text-2xl text-conteo-accent">
                100%
              </div>
              <div className="text-white/50 text-sm">Personnalisé</div>
            </div>
          </div>
        </div>

        {/* Right content - Interactive phone demo */}
        <div
          className={`relative mt-16 lg:mt-0 w-full max-w-sm z-10 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          {/* Glow effect behind phone - reduced blur for perf */}
          <div className="absolute inset-0 bg-conteo-secondary/20 blur-3xl rounded-full scale-75" />

          {/* Interactive Phone Demo */}
          <div className="relative">
            <PhoneDemo />
          </div>

          {/* Static decorative characters */}
          <div className="absolute -left-12 top-1/4 w-20 h-20 hidden lg:block">
            <Image src={cowReading} alt="" fill className="object-contain" />
          </div>
          <div className="absolute -right-8 bottom-1/3 w-16 h-16 hidden lg:block">
            <Image src={foxGaming} alt="" fill className="object-contain" />
          </div>
        </div>
      </div>

      {/* Scroll indicator - static */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/30 text-xs uppercase tracking-widest">
          Découvrir
        </span>
        <svg
          className="w-5 h-5 text-white/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
