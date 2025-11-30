import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface StepCardProps {
  number: number;
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function StepCard({
  number,
  icon,
  title,
  description,
  className,
}: StepCardProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="relative mb-4">
        <div className="w-20 h-20 bg-conteo-light rounded-[1.5rem] flex items-center justify-center text-conteo-secondary">
          {icon}
        </div>
        <div className="absolute -top-2 -left-2 w-8 h-8 bg-conteo-accent rounded-full flex items-center justify-center font-heading font-extrabold text-conteo-dark text-sm">
          {number}
        </div>
      </div>
      <h3 className="font-sans font-semibold text-lg text-conteo-dark mb-2">
        {title}
      </h3>
      <p className="font-sans text-conteo-text-muted text-sm leading-relaxed max-w-[200px]">
        {description}
      </p>
    </div>
  );
}
