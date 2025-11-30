import { cn } from "@/lib/utils";

interface AppStoreBadgesProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function AppStoreBadges({ className, size = "md" }: AppStoreBadgesProps) {
  const sizeStyles = {
    sm: {
      container: "px-4 py-2 rounded-lg",
      icon: "w-5 h-5",
      topText: "text-[8px]",
      bottomText: "text-xs",
      badge: "text-[8px] px-1.5 py-0.5",
    },
    md: {
      container: "px-5 py-3 rounded-xl",
      icon: "w-7 h-7",
      topText: "text-[10px]",
      bottomText: "text-sm",
      badge: "text-[10px] px-2 py-0.5",
    },
    lg: {
      container: "px-6 py-4 rounded-xl",
      icon: "w-8 h-8",
      topText: "text-xs",
      bottomText: "text-base",
      badge: "text-xs px-2.5 py-1",
    },
  };

  const styles = sizeStyles[size];

  return (
    <div className={cn("flex flex-col sm:flex-row gap-3", className)}>
      {/* App Store Badge */}
      <div className="relative">
        <div
          className={cn(
            "flex items-center gap-2 bg-black/20 text-white/60 cursor-not-allowed",
            styles.container
          )}
        >
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          <div className="flex flex-col">
            <span className={cn("leading-tight", styles.topText)}>Bientôt sur</span>
            <span className={cn("font-semibold leading-tight", styles.bottomText)}>App Store</span>
          </div>
        </div>
        <div
          className={cn(
            "absolute -top-2 -right-2 bg-conteo-secondary text-white font-medium rounded-full",
            styles.badge
          )}
        >
          Bientôt
        </div>
      </div>

      {/* Google Play Badge */}
      <div className="relative">
        <div
          className={cn(
            "flex items-center gap-2 bg-black/20 text-white/60 cursor-not-allowed",
            styles.container
          )}
        >
          <svg
            className={cn(styles.icon, size === "md" ? "w-6 h-6" : "")}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" />
          </svg>
          <div className="flex flex-col">
            <span className={cn("leading-tight", styles.topText)}>Bientôt sur</span>
            <span className={cn("font-semibold leading-tight", styles.bottomText)}>Google Play</span>
          </div>
        </div>
        <div
          className={cn(
            "absolute -top-2 -right-2 bg-conteo-secondary text-white font-medium rounded-full",
            styles.badge
          )}
        >
          Bientôt
        </div>
      </div>
    </div>
  );
}
