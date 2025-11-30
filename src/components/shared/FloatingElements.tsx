"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface FloatingElementsProps {
  variant?: "stars" | "orbs" | "mixed";
  density?: "low" | "medium" | "high";
  className?: string;
}

interface StarData {
  id: string;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: "sm" | "md";
}

const DENSITY_COUNTS = {
  low: 4,
  medium: 6,
  high: 10,
} as const;

export function FloatingElements({
  variant = "mixed",
  density = "medium",
  className,
}: Readonly<FloatingElementsProps>) {
  const [stars, setStars] = useState<StarData[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const starCount = DENSITY_COUNTS[density];

    const frame = requestAnimationFrame(() => {
      if (variant === "stars" || variant === "mixed") {
        const generatedStars: StarData[] = Array.from({
          length: starCount,
        }).map((_, i) => ({
          id: `star-${i}`,
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 3 + Math.random() * 2,
          size: Math.random() > 0.5 ? "sm" : "md",
        }));
        setStars(generatedStars);
      }
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [density, variant]);

  if (!mounted) {
    return (
      <div
        className={cn(
          "absolute inset-0 overflow-hidden pointer-events-none",
          className
        )}
      />
    );
  }

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
          className={cn(
            "absolute rounded-full bg-conteo-accent animate-twinkle",
            star.size === "sm" ? "w-1 h-1" : "w-1.5 h-1.5"
          )}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export function DecorativeBlob({
  className,
  color = "accent",
}: Readonly<{
  className?: string;
  color?: "accent" | "secondary";
}>) {
  const colors = {
    accent: "from-conteo-accent/15 to-conteo-accent/5",
    secondary: "from-conteo-secondary/15 to-conteo-secondary/5",
  };

  return (
    <div
      className={cn(
        "absolute bg-linear-to-br rounded-full blur-2xl",
        colors[color],
        className
      )}
    />
  );
}

export function SparkleGroup({ className }: Readonly<{ className?: string }>) {
  return (
    <div className={cn("absolute", className)}>
      {[new Array(6)].map((_, i) => (
        <svg
          key={i}
          className="absolute w-3 h-3 text-conteo-accent animate-sparkle"
          style={{
            left: `${50 + Math.cos((i * Math.PI) / 3) * 30}%`,
            top: `${50 + Math.sin((i * Math.PI) / 3) * 30}%`,
            animationDelay: `${i * 0.2}s`,
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      ))}
    </div>
  );
}
