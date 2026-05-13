"use client";

import { AppStoreBadges } from "@/components/shared/AppStoreBadges";
import { BetaSignupForm } from "@/components/shared/BetaSignupForm";
import { DecorativeBlob } from "@/components/shared/FloatingElements";
import { Logo } from "@/components/shared/Logo";
import {
  MagicalBackground,
  MagicalSparkles,
} from "@/components/shared/MagicalBackground";
import { PhoneDemo } from "@/components/shared/PhoneDemo";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, Sparkle, Sparkles, Star, Wand2, Zap } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const decorativeCircle = "/images/figma/decorative/circle.svg";
const cowReading = "/images/figma/decorative/cow-reading.png";
const foxGaming = "/images/figma/decorative/fox-gaming.png";

const stats = [
  { value: "∞", label: "Histoires uniques", delay: 0 },
  { value: "3-12", label: "ans", delay: 100 },
  { value: "100%", label: "Personnalisé", delay: 200 },
];

const benefits = [
  { icon: Zap, text: "Accès anticipé gratuit" },
  { icon: Sparkles, text: "Influence sur le produit" },
];

interface MousePosition {
  x: number;
  y: number;
}

function fetchSubscriberCount(): Promise<number | null> {
  return fetch("/api/beta-signup")
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => (typeof data?.count === "number" ? data.count : null))
    .catch(() => null);
}

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

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth - 0.5) * 20,
        y: (event.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    globalThis.addEventListener("mousemove", handleMouseMove);
    return () => globalThis.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSignupSuccess = () => {
    fetchSubscriberCount().then((count) => {
      if (count !== null) {
        setSubscriberCount(count);
      }
    });
  };

  return (
    <section
      id="accueil"
      aria-label="Présentation de Contéo"
      className="relative overflow-hidden bg-conteo-dark"
    >
      <div className="absolute inset-0 bg-linear-to-br from-conteo-dark via-[#1e1e35] to-[#2a2a52]" />
      <MagicalBackground variant="hero" />
      <MagicalSparkles count={15} className="z-10" />
      <DecorativeBlob
        className="size-[600px] -left-64 -top-32 animate-morph"
        color="secondary"
      />
      <DecorativeBlob
        className="size-[400px] right-0 bottom-0 animate-morph delay-1000"
        color="accent"
      />
      <HeroCircle
        className="absolute -left-48 -top-24 size-[500px] opacity-15"
        mousePosition={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
        priority
      />
      <HeroCircle
        className="absolute right-0 top-1/4 size-[300px] opacity-10"
        mousePosition={{ x: mousePosition.x * -0.3, y: mousePosition.y * -0.3 }}
        reverse
      />

      <div className="relative container mx-auto flex min-h-screen flex-col items-center justify-between px-6 py-16 lg:flex-row lg:py-24">
        <HeroCopy isLoaded={isLoaded} />
        <HeroVisual isLoaded={isLoaded} mousePosition={mousePosition} />
      </div>

      <BetaSignup
        isLoaded={isLoaded}
        subscriberCount={subscriberCount}
        onSignupSuccess={handleSignupSuccess}
      />
    </section>
  );
}

function HeroCircle({
  className,
  mousePosition,
  priority = false,
  reverse = false,
}: Readonly<{
  className: string;
  mousePosition: MousePosition;
  priority?: boolean;
  reverse?: boolean;
}>) {
  return (
    <div
      className={cn("transition-transform duration-300 ease-out", className)}
      style={{
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
      }}
    >
      <Image
        src={decorativeCircle}
        alt=""
        fill
        sizes="500px"
        className="object-contain animate-rotate-glow"
        style={{ animationDirection: reverse ? "reverse" : undefined }}
        priority={priority}
        unoptimized
      />
    </div>
  );
}

function HeroCopy({ isLoaded }: Readonly<{ isLoaded: boolean }>) {
  return (
    <div
      className={cn(
        "z-10 flex max-w-xl flex-col items-center text-center transition-all duration-700 lg:items-start lg:text-left",
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}
    >
      <div className="relative mb-10">
        <div className="absolute inset-0 rounded-full bg-conteo-accent/20 blur-3xl scale-150 animate-pulse" />
        <Logo size="lg" className="relative" />
      </div>
      <h1 className="mb-6 font-heading text-4xl font-semibold leading-[1.1] text-white md:text-5xl lg:text-6xl">
        <AnimatedWord delay={100}>Des</AnimatedWord>{" "}
        <AnimatedWord delay={200}>histoires</AnimatedWord>{" "}
        <span className="relative inline-block">
          <span
            className="shimmer-text inline-block animate-text-reveal"
            style={{ animationDelay: "300ms" }}
          >
            magiques
          </span>
          <FloatingSparkles />
        </span>
        <br />
        <AnimatedWord delay={400}>créées</AnimatedWord>{" "}
        <AnimatedWord delay={500}>par</AnimatedWord>{" "}
        <AnimatedWord delay={600}>votre</AnimatedWord>{" "}
        <AnimatedWord delay={700}>enfant</AnimatedWord>
      </h1>
      <HeroSubtitle isLoaded={isLoaded} />
      <AppStoreCallToAction isLoaded={isLoaded} />
      <HeroStats isLoaded={isLoaded} />
    </div>
  );
}

function FloatingSparkles() {
  return (
    <>
      <Sparkle
        className="absolute -top-8 -right-8 size-10 text-conteo-accent animate-rotate-glow"
        fill="currentColor"
      />
      <Sparkle
        className="absolute -bottom-4 -left-6 size-6 text-conteo-secondary animate-twinkle delay-500"
        fill="currentColor"
      />
      <Star
        className="absolute top-1/2 -right-12 size-5 text-white/50 animate-twinkle delay-300"
        fill="currentColor"
      />
    </>
  );
}

function HeroSubtitle({ isLoaded }: Readonly<{ isLoaded: boolean }>) {
  return (
    <p
      className={cn(
        "mb-10 max-w-lg font-sans text-lg leading-relaxed text-white/70 transition-all duration-700 delay-500 md:text-xl",
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}
    >
      Votre enfant choisit ses personnages, objets et décors préférés. Contéo
      crée une histoire unique avec{" "}
      <span className="relative font-medium text-conteo-accent">
        texte
        <Sparkles className="ml-1 inline size-4 animate-twinkle" />
      </span>
      , <span className="font-medium text-conteo-secondary">audio</span> et{" "}
      <span className="relative font-medium text-conteo-accent">
        visuels
        <Wand2 className="ml-1 inline size-4 animate-magical-bounce" />
      </span>{" "}
      générés rien que pour lui.
    </p>
  );
}

function AppStoreCallToAction({ isLoaded }: Readonly<{ isLoaded: boolean }>) {
  return (
    <div
      className={cn(
        "transition-all duration-700 delay-700",
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-conteo-accent/20 blur-2xl scale-110 animate-pulse" />
        <AppStoreBadges />
      </div>
    </div>
  );
}

function HeroStats({ isLoaded }: Readonly<{ isLoaded: boolean }>) {
  return (
    <div
      className={cn(
        "mt-10 flex gap-8 transition-all duration-700 delay-1000",
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group cursor-default text-center lg:text-left"
          style={{ animationDelay: `${stat.delay}ms` }}
        >
          <div className="font-heading text-2xl font-semibold text-conteo-accent transition-transform duration-300 group-hover:scale-110">
            <span className="relative">
              {stat.value}
              <span className="absolute -inset-2 rounded-full bg-conteo-accent/10 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
            </span>
          </div>
          <div className="text-sm text-white/50">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function HeroVisual({
  isLoaded,
  mousePosition,
}: Readonly<{
  isLoaded: boolean;
  mousePosition: MousePosition;
}>) {
  return (
    <div
      className={cn(
        "relative z-10 mt-16 w-full max-w-sm transition-all duration-700 delay-500 lg:mt-0",
        isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
      )}
      style={{
        transform: isLoaded
          ? `translate(${mousePosition.x * -0.2}px, ${
              mousePosition.y * -0.2
            }px)`
          : undefined,
      }}
    >
      <div className="absolute inset-0 scale-75">
        <div className="absolute inset-0 rounded-full bg-conteo-secondary/30 blur-3xl animate-pulse" />
        <div className="absolute inset-0 rounded-full bg-conteo-accent/20 blur-3xl scale-80 animate-pulse delay-500" />
      </div>
      <OrbitingSparkles />
      <div className="relative animate-magical-bounce">
        <PhoneDemo />
      </div>
      <DecorativeCharacter
        src={cowReading}
        className="absolute -left-16 top-1/4 hidden size-24 animate-character-float lg:block"
        mousePosition={mousePosition}
      />
      <DecorativeCharacter
        src={foxGaming}
        className="absolute -right-12 bottom-1/3 hidden size-20 animate-character-float delay-300 lg:block"
        mousePosition={{ x: -mousePosition.x, y: -mousePosition.y }}
        reverse
      />
    </div>
  );
}

function OrbitingSparkles() {
  return (
    <>
      <div className="absolute inset-0 animate-orbit">
        <Sparkle className="size-6 text-conteo-accent" fill="currentColor" />
      </div>
      <div className="absolute inset-0 animate-orbit delay-300">
        <Star className="size-4 text-conteo-secondary" fill="currentColor" />
      </div>
      <div className="absolute inset-0 animate-orbit delay-500">
        <Sparkle className="size-5 text-white/70" fill="currentColor" />
      </div>
    </>
  );
}

function DecorativeCharacter({
  src,
  className,
  mousePosition,
  reverse = false,
}: Readonly<{
  src: string;
  className: string;
  mousePosition: MousePosition;
  reverse?: boolean;
}>) {
  return (
    <div
      className={className}
      style={{
        transform: `translate(${mousePosition.x * 0.3}px, ${
          mousePosition.y * 0.3
        }px)`,
        animationDirection: reverse ? "reverse" : undefined,
      }}
    >
      <div className="relative size-full">
        <div className="absolute inset-0 rounded-full bg-conteo-accent/20 blur-xl animate-pulse" />
        <Image
          src={src}
          alt=""
          fill
          sizes="96px"
          className="object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
}

function BetaSignup({
  isLoaded,
  subscriberCount,
  onSignupSuccess,
}: Readonly<{
  isLoaded: boolean;
  subscriberCount: number | null;
  onSignupSuccess: () => void;
}>) {
  return (
    <div id="beta" className="relative container mx-auto px-6 py-16">
      <div
        className={cn(
          "mx-auto max-w-2xl text-center transition-all duration-700",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}
      >
        <Badge
          variant="secondary"
          className="mb-6 border-none bg-conteo-accent/20 px-4 py-1.5 text-sm text-conteo-accent"
        >
          <Sparkles className="mr-1.5 size-3.5" />
          Beta privée
        </Badge>
        <h2 className="mb-4 font-heading text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
          Soyez parmi les <span className="text-conteo-accent">premiers</span>
        </h2>
        <p className="mx-auto mb-8 max-w-lg font-sans text-lg text-white/70">
          Inscrivez-vous pour un accès anticipé et aidez-nous à créer la
          meilleure expérience pour vos enfants.
        </p>
        <BetaSignupForm onSuccess={onSignupSuccess} className="mx-auto" />
        <BetaBenefits />
        <SubscriberCount count={subscriberCount} />
      </div>
    </div>
  );
}

function BetaBenefits() {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      {benefits.map((benefit) => (
        <div
          key={benefit.text}
          className="flex items-center gap-2 text-sm text-white/60"
        >
          <div className="flex size-5 items-center justify-center rounded-full bg-conteo-accent/20">
            <Check className="size-3 text-conteo-accent" />
          </div>
          {benefit.text}
        </div>
      ))}
    </div>
  );
}

function SubscriberCount({ count }: Readonly<{ count: number | null }>) {
  if (count === null || count <= 0) {
    return null;
  }

  return (
    <p className="mt-8 text-sm text-white/50">
      <span className="text-conteo-accent font-semibold">{count}</span>{" "}
      {count === 1 ? "famille inscrite" : "familles déjà inscrites"}
    </p>
  );
}
