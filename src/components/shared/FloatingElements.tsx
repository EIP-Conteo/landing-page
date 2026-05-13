import { cn } from "@/lib/utils";

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
        "absolute rounded-full bg-linear-to-br blur-2xl",
        colors[color],
        className
      )}
    />
  );
}
