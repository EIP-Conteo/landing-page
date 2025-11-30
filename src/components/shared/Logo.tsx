import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

const sizes = {
  sm: { box: "w-12 h-12", text: "text-xl" },
  md: { box: "w-20 h-20", text: "text-3xl" },
  lg: { box: "w-28 h-28", text: "text-4xl" },
};

export function Logo({
  size = "md",
  className,
  showText = true,
}: Readonly<LogoProps>) {
  const { box, text } = sizes[size];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className={cn("relative", box)}>
        <Image
          src="/logo.png"
          alt="Contéo"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span
          className={cn(
            "font-heading font-extrabold text-conteo-accent tracking-tight",
            text
          )}
        >
          Contéo
        </span>
      )}
    </div>
  );
}
