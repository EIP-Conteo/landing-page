import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: Readonly<FeatureCardProps>) {
  return (
    <div
      className={cn(
        "bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="w-14 h-14 bg-conteo-light rounded-2xl flex items-center justify-center text-conteo-secondary mb-4">
        {icon}
      </div>
      <h3 className="font-sans font-semibold text-lg text-conteo-dark mb-2">
        {title}
      </h3>
      <p className="font-sans text-conteo-text-muted text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
