import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

const sizes = {
  sm: { box: "size-12", image: "48px", text: "text-xl" },
  md: { box: "size-20", image: "80px", text: "text-3xl" },
  lg: { box: "size-28", image: "112px", text: "text-4xl" },
};

export function Logo({
  size = "md",
  className,
  showText = true,
}: Readonly<LogoProps>) {
  const { box, image, text } = sizes[size];

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("relative", box)}>
        <Image
          src="/logo.png"
          alt="Contéo"
          fill
          sizes={image}
          className="object-contain rounded-[22.5%]"
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
