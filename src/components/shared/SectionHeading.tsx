import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "center" | "start";
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "center",
  id,
  className,
}: Readonly<SectionHeadingProps>) {
  const onDark = tone === "dark";

  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <span
        className={cn(
          "font-sans text-xs font-semibold uppercase tracking-[0.18em]",
          onDark ? "text-conteo-accent" : "text-conteo-secondary",
        )}
      >
        {eyebrow}
      </span>
      <h2
        id={id}
        className={cn(
          "text-balance font-heading text-3xl font-extrabold leading-[1.1] tracking-tight md:text-5xl",
          onDark ? "text-white" : "text-conteo-dark",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-pretty font-sans text-lg leading-relaxed",
            onDark ? "text-white/65" : "text-conteo-text-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
