"use client";

import { Logo } from "@/components/shared/Logo";
import { AppStoreBadges } from "@/components/shared/AppStoreBadges";
import {
  MagicalBackground,
  MagicalSparkles,
} from "@/components/shared/MagicalBackground";
import { DecorativeBlob } from "@/components/shared/FloatingElements";
import { PhoneDemo } from "@/components/shared/PhoneDemo";
import { BetaSignupForm } from "@/components/shared/BetaSignupForm";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Sparkle, Sparkles, Star, Wand2, Zap, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Local assets
const decorativeCircle = "/images/figma/decorative/circle.svg";
const cowReading = "/images/figma/decorative/cow-reading.png";
const foxGaming = "/images/figma/decorative/fox-gaming.png";

// Animated text component
function AnimatedWord({
  children,
  delay = 0,
}: Readonly<{
  children: string;
  delay?: number;
}>) {
  return (
    <span
      className="inline-block animate-text-reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </span>
  );
}

// Floating sparkle decorations
function FloatingSparkles() {
  return (
    <>
      <Sparkle
        className="absolute -top-8 -right-8 w-10 h-10 text-conteo-accent animate-rotate-glow"
        fill="currentColor"
      />
      <Sparkle
        className="absolute -bottom-4 -left-6 w-6 h-6 text-conteo-secondary animate-twinkle delay-500"
        fill="currentColor"
      />
      <Star
        className="absolute top-1/2 -right-12 w-5 h-5 text-white/50 animate-twinkle delay-300"
        fill="currentColor"
      />
    </>
  );
}

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsLoaded(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Fetch subscriber count
  useEffect(() => {
    let isMounted = true;
    fetch("/api/beta-signup")
      .then((res) => res.ok && res.json())
      .then((data) => isMounted && data && setSubscriberCount(data.count))
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSignupSuccess = () => {
    fetch("/api/beta-signup")
      .then((res) => res.ok && res.json())
      .then((data) => data && setSubscriberCount(data.count))
      .catch(() => {});
  };

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    globalThis.addEventListener("mousemove", handleMouseMove);
    return () => globalThis.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="accueil"
      aria-label="Présentation de Contéo"
      className="relative bg-conteo-dark overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-conteo-dark via-[#1e1e35] to-[#2a2a52] opacity-100" />

      {/* MAGICAL BACKGROUND with all effects */}
      <MagicalBackground variant="hero" />

      {/* Additional sparkles layer */}
      <MagicalSparkles count={15} className="z-10" />

      {/* Animated decorative blobs */}
      <DecorativeBlob
        className="w-[600px] h-[600px] -left-64 -top-32 animate-morph"
        color="secondary"
      />
      <DecorativeBlob
        className="w-[400px] h-[400px] right-0 bottom-0 animate-morph delay-1000"
        color="accent"
      />

      {/* Animated decorative circle with parallax */}
      <div
        className="absolute -left-48 -top-24 w-[500px] h-[500px] opacity-15 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${
            mousePosition.y * 0.5
          }px)`,
        }}
      >
        <Image
          src={decorativeCircle}
          alt=""
          fill
          className="object-contain animate-rotate-glow"
          style={{ animationDuration: "60s" }}
          priority
          unoptimized
        />
      </div>

      {/* Secondary animated circle */}
      <div
        className="absolute right-0 top-1/4 w-[300px] h-[300px] opacity-10 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x * -0.3}px, ${
            mousePosition.y * -0.3
          }px)`,
        }}
      >
        <Image
          src={decorativeCircle}
          alt=""
          fill
          className="object-contain animate-rotate-glow"
          style={{ animationDuration: "45s", animationDirection: "reverse" }}
          unoptimized
        />
      </div>

      <div className="relative container mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between min-h-screen">
        {/* Left content */}
        <div
          className={cn(
            "flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl z-10 transition-all duration-1000",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {/* Logo with glow effect */}
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-conteo-accent/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <Logo size="lg" className="relative" />
          </div>

          <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
            <AnimatedWord delay={100}>Des</AnimatedWord>{" "}
            <AnimatedWord delay={200}>histoires</AnimatedWord>{" "}
            <span className="relative inline-block">
              <span className="shimmer-text">
                <AnimatedWord delay={300}>magiques</AnimatedWord>
              </span>
              {/* Multiple sparkle decorations */}
              <FloatingSparkles />
            </span>{" "}
            <br />
            <AnimatedWord delay={400}>créées</AnimatedWord>{" "}
            <AnimatedWord delay={500}>par</AnimatedWord>{" "}
            <AnimatedWord delay={600}>votre</AnimatedWord>{" "}
            <AnimatedWord delay={700}>enfant</AnimatedWord>
          </h1>

          <p
            className={cn(
              "font-sans text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-lg transition-all duration-1000 delay-500",
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            Votre enfant choisit ses personnages, objets et décors préférés.
            Contéo crée une histoire unique avec{" "}
            <span className="text-conteo-accent font-medium relative">
              texte
              <Sparkles className="inline w-4 h-4 ml-1 animate-twinkle" />
            </span>
            , <span className="text-conteo-secondary font-medium">audio</span>{" "}
            et{" "}
            <span className="text-conteo-accent font-medium relative">
              visuels
              <Wand2 className="inline w-4 h-4 ml-1 animate-magical-bounce" />
            </span>{" "}
            générés rien que pour lui.
          </p>

          {/* CTA Buttons with magical effects */}
          <div
            className={cn(
              "transition-all duration-1000 delay-700",
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div className="relative">
              {/* Glow effect behind badges */}
              <div className="absolute inset-0 bg-conteo-accent/20 blur-2xl rounded-full scale-110 animate-pulse" />
              <AppStoreBadges />
            </div>
          </div>

          {/* Stats/Social proof with animations */}
          <div
            className={cn(
              "flex gap-8 mt-10 transition-all duration-1000 delay-1000",
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            {[
              { value: "∞", label: "Histoires uniques", delay: 0 },
              { value: "3-12", label: "ans", delay: 100 },
              { value: "100%", label: "Personnalisé", delay: 200 },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center lg:text-left group cursor-default"
                style={{ animationDelay: `${stat.delay}ms` }}
              >
                <div className="font-heading font-extrabold text-2xl text-conteo-accent group-hover:scale-110 transition-transform duration-300">
                  <span className="relative">
                    {stat.value}
                    <span className="absolute -inset-2 bg-conteo-accent/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right content - Interactive phone demo */}
        <div
          className={cn(
            "relative mt-16 lg:mt-0 w-full max-w-sm z-10 transition-all duration-1000 delay-500",
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}
          style={{
            transform: isLoaded
              ? `translate(${mousePosition.x * -0.2}px, ${
                  mousePosition.y * -0.2
                }px)`
              : undefined,
          }}
        >
          {/* Animated glow effect behind phone */}
          <div className="absolute inset-0 scale-75">
            <div className="absolute inset-0 bg-conteo-secondary/30 blur-3xl rounded-full animate-pulse" />
            <div
              className="absolute inset-0 bg-conteo-accent/20 blur-3xl rounded-full animate-pulse delay-500"
              style={{ transform: "scale(0.8)" }}
            />
          </div>

          {/* Orbiting sparkles around phone */}
          <div
            className="absolute inset-0 animate-orbit"
            style={{ animationDuration: "20s" }}
          >
            <Sparkle
              className="w-6 h-6 text-conteo-accent"
              fill="currentColor"
            />
          </div>
          <div
            className="absolute inset-0 animate-orbit"
            style={{ animationDuration: "25s", animationDelay: "-10s" }}
          >
            <Star
              className="w-4 h-4 text-conteo-secondary"
              fill="currentColor"
            />
          </div>
          <div
            className="absolute inset-0 animate-orbit"
            style={{ animationDuration: "30s", animationDelay: "-5s" }}
          >
            <Sparkle className="w-5 h-5 text-white/70" fill="currentColor" />
          </div>

          {/* Interactive Phone Demo with glow */}
          <div
            className="relative animate-magical-bounce"
            style={{ animationDuration: "6s" }}
          >
            <PhoneDemo />
          </div>

          {/* Animated decorative characters */}
          <div
            className="absolute -left-16 top-1/4 w-24 h-24 hidden lg:block animate-character-float"
            style={{
              transform: `translate(${mousePosition.x * 0.3}px, ${
                mousePosition.y * 0.3
              }px)`,
            }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-conteo-accent/20 blur-xl rounded-full animate-pulse" />
              <Image
                src={cowReading}
                alt=""
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
          <div
            className="absolute -right-12 bottom-1/3 w-20 h-20 hidden lg:block animate-character-float delay-300"
            style={{
              transform: `translate(${mousePosition.x * -0.3}px, ${
                mousePosition.y * -0.3
              }px)`,
              animationDirection: "reverse",
            }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-conteo-secondary/20 blur-xl rounded-full animate-pulse delay-500" />
              <Image
                src={foxGaming}
                alt=""
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Beta Signup Section */}
      <div id="beta" className="relative container mx-auto px-6 py-16">
        <div
          className={cn(
            "max-w-2xl mx-auto text-center transition-all duration-1000",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <Badge
            variant="secondary"
            className="bg-conteo-accent/20 text-conteo-accent border-none px-4 py-1.5 text-sm mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Beta privée
          </Badge>

          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Soyez parmi les <span className="text-conteo-accent">premiers</span>
          </h2>

          <p className="font-sans text-white/70 text-lg mb-8 max-w-lg mx-auto">
            Inscrivez-vous pour un accès anticipé et aidez-nous à créer la
            meilleure expérience pour vos enfants.
          </p>

          <BetaSignupForm onSuccess={handleSignupSuccess} className="mx-auto" />

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: Zap, text: "Accès anticipé gratuit" },
              { icon: Sparkles, text: "Influence sur le produit" },
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-white/60"
              >
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-conteo-accent/20">
                  <Check className="w-3 h-3 text-conteo-accent" />
                </div>
                {benefit.text}
              </div>
            ))}
          </div>

          {/* Subscriber count */}
          {subscriberCount !== null && subscriberCount > 0 && (
            <p className="text-white/50 text-sm mt-8">
              🎉{" "}
              <span className="text-conteo-accent font-semibold">
                {subscriberCount}
              </span>{" "}
              {subscriberCount === 1
                ? "famille inscrite"
                : "familles déjà inscrites"}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
