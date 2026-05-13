"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function cssNumber(value: number): number {
  return Number(value.toPrecision(6));
}

// ============================================
// SHOOTING STARS
// ============================================
interface ShootingStar {
  id: string;
  startX: number;
  startY: number;
  delay: number;
  duration: number;
  size: number;
}

function generateShootingStars(count: number): ShootingStar[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: `shooting-${i}`,
    startX: cssNumber(seededRandom(i + 1) * 70),
    startY: cssNumber(seededRandom(i + 11) * 40),
    delay: cssNumber(i * 1.5 + seededRandom(i + 21) * 2),
    duration: cssNumber(1.2 + seededRandom(i + 31) * 1),
    size: cssNumber(1.5 + seededRandom(i + 41) * 1.5),
  }));
}

function ShootingStars({
  count = 5,
  className,
}: Readonly<{
  count?: number;
  className?: string;
}>) {
  const stars = useMemo(() => generateShootingStars(count), [count]);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="shooting-star absolute"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// MAGICAL SPARKLES (flying particles)
// ============================================
interface Sparkle {
  id: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: "accent" | "secondary" | "white";
}

const sparkleColors: Sparkle["color"][] = ["accent", "secondary", "white"];

function generateSparkles(count: number): Sparkle[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: `sparkle-${i}`,
    x: cssNumber(seededRandom(i + 101) * 100),
    y: cssNumber(seededRandom(i + 111) * 100),
    size: cssNumber(4 + seededRandom(i + 121) * 12),
    delay: cssNumber(seededRandom(i + 131) * 8),
    duration: cssNumber(2 + seededRandom(i + 141) * 4),
    color: sparkleColors[
      Math.floor(seededRandom(i + 151) * sparkleColors.length)
    ],
  }));
}

export function MagicalSparkles({
  count = 20,
  className,
}: Readonly<{
  count?: number;
  className?: string;
}>) {
  const sparkles = useMemo(() => generateSparkles(count), [count]);

  const colorClasses = {
    accent: "text-conteo-accent",
    secondary: "text-conteo-secondary",
    white: "text-white",
  };

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      {sparkles.map((sparkle) => (
        <svg
          key={sparkle.id}
          className={cn(
            "absolute animate-sparkle-float",
            colorClasses[sparkle.color]
          )}
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
        </svg>
      ))}
    </div>
  );
}

// ============================================
// FLOATING ORBS (magical glowing spheres)
// ============================================
interface Orb {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  blur: number;
}

const orbColors = [
  "rgba(201, 245, 96, 0.3)", // accent
  "rgba(106, 90, 224, 0.3)", // secondary
  "rgba(201, 245, 96, 0.2)",
  "rgba(106, 90, 224, 0.2)",
  "rgba(255, 255, 255, 0.15)",
];

function generateOrbs(count: number): Orb[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: `orb-${i}`,
    x: cssNumber(seededRandom(i + 201) * 100),
    y: cssNumber(seededRandom(i + 211) * 100),
    size: cssNumber(80 + seededRandom(i + 221) * 200),
    color: orbColors[Math.floor(seededRandom(i + 231) * orbColors.length)],
    delay: cssNumber(seededRandom(i + 241) * 10),
    blur: cssNumber(40 + seededRandom(i + 251) * 60),
  }));
}

function FloatingOrbs({
  count = 6,
  className,
}: Readonly<{
  count?: number;
  className?: string;
}>) {
  const orbs = useMemo(() => generateOrbs(count), [count]);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full animate-orb-float"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: `blur(${orb.blur}px)`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// TWINKLING STARS FIELD
// ============================================
interface Star {
  id: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  brightness: number;
}

function generateStarField(count: number): Star[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: `star-${i}`,
    x: cssNumber(seededRandom(i + 301) * 100),
    y: cssNumber(seededRandom(i + 311) * 100),
    size: cssNumber(1 + seededRandom(i + 321) * 3),
    delay: cssNumber(seededRandom(i + 331) * 5),
    duration: cssNumber(2 + seededRandom(i + 341) * 3),
    brightness: cssNumber(0.3 + seededRandom(i + 351) * 0.7),
  }));
}

export function StarField({
  count = 50,
  className,
}: Readonly<{
  count?: number;
  className?: string;
}>) {
  const stars = useMemo(() => generateStarField(count), [count]);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.brightness,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// MAGICAL DUST PARTICLES
// ============================================
interface Particle {
  id: string;
  x: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
}

function generateDustParticles(count: number): Particle[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: `dust-${i}`,
    x: cssNumber(seededRandom(i + 401) * 100),
    size: cssNumber(2 + seededRandom(i + 411) * 4),
    delay: cssNumber(seededRandom(i + 421) * 20),
    duration: cssNumber(15 + seededRandom(i + 431) * 25),
    drift: cssNumber(-20 + seededRandom(i + 441) * 40),
  }));
}

function MagicalDust({
  count = 30,
  className,
}: Readonly<{
  count?: number;
  className?: string;
}>) {
  const particles = useMemo(() => generateDustParticles(count), [count]);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-conteo-accent/60 animate-dust-rise"
          style={{
            left: `${particle.x}%`,
            bottom: "-10px",
            width: particle.size,
            height: particle.size,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            ["--drift" as string]: `${particle.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// CURSOR SPARKLE TRAIL
// ============================================
interface TrailSparkle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function CursorSparkles() {
  const [sparkles, setSparkles] = useState<TrailSparkle[]>([]);
  const isActive = useRef(false);

  const addSparkle = useCallback((x: number, y: number) => {
    const newSparkle: TrailSparkle = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: 8 + Math.random() * 16,
    };

    setSparkles((prev) => [...prev.slice(-15), newSparkle]);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 800);
  }, []);

  useEffect(() => {
    let lastTime = 0;
    const throttleMs = 50;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isActive.current) {
        return;
      }

      const now = Date.now();
      if (now - lastTime >= throttleMs) {
        addSparkle(e.clientX, e.clientY);
        lastTime = now;
      }
    };

    const handleMouseEnter = () => {
      isActive.current = true;
    };
    const handleMouseLeave = () => {
      isActive.current = false;
      setSparkles([]);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [addSparkle]);

  if (!sparkles.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-9999">
      {sparkles.map((sparkle) => (
        <svg
          key={sparkle.id}
          className="absolute text-conteo-accent animate-cursor-sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            transform: "translate(-50%, -50%)",
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
        </svg>
      ))}
    </div>
  );
}

// ============================================
// COMPLETE MAGICAL BACKGROUND (combines all)
// ============================================
interface MagicalBackgroundProps {
  variant?: "hero" | "section" | "subtle";
  className?: string;
}

export function MagicalBackground({
  variant = "hero",
  className,
}: Readonly<MagicalBackgroundProps>) {
  const configs = {
    hero: {
      stars: 60,
      sparkles: 25,
      orbs: 8,
      dust: 40,
      shootingStars: 6,
    },
    section: {
      stars: 30,
      sparkles: 15,
      orbs: 4,
      dust: 20,
      shootingStars: 3,
    },
    subtle: {
      stars: 15,
      sparkles: 8,
      orbs: 2,
      dust: 10,
      shootingStars: 1,
    },
  };

  const config = configs[variant];

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30" />

      {/* Star field */}
      <StarField count={config.stars} />

      {/* Floating orbs */}
      <FloatingOrbs count={config.orbs} />

      {/* Shooting stars */}
      <ShootingStars count={config.shootingStars} />

      {/* Magical sparkles */}
      <MagicalSparkles count={config.sparkles} />

      {/* Rising dust particles */}
      <MagicalDust count={config.dust} />
    </div>
  );
}
