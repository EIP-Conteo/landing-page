import type { ReactElement, ReactNode } from "react";
import { AlertTriangle, Info, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "warning" | "success" | "highlight";

interface LegalCalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}

const VARIANTS: Record<
  CalloutVariant,
  { wrapper: string; icon: ReactNode; iconWrap: string }
> = {
  info: {
    wrapper: "border-conteo-secondary/20 bg-conteo-secondary/[0.06]",
    icon: <Info className="size-4" aria-hidden="true" />,
    iconWrap: "bg-conteo-secondary/15 text-conteo-secondary",
  },
  warning: {
    wrapper: "border-amber-300/40 bg-amber-50",
    icon: <AlertTriangle className="size-4" aria-hidden="true" />,
    iconWrap: "bg-amber-200/70 text-amber-700",
  },
  success: {
    wrapper: "border-conteo-accent/30 bg-conteo-accent/10",
    icon: <ShieldCheck className="size-4" aria-hidden="true" />,
    iconWrap: "bg-conteo-accent/30 text-conteo-dark",
  },
  highlight: {
    wrapper: "border-conteo-dark/10 bg-conteo-dark text-white",
    icon: <Sparkles className="size-4" aria-hidden="true" />,
    iconWrap: "bg-white/15 text-conteo-accent",
  },
};

export function LegalCallout({
  variant = "info",
  title,
  children,
}: Readonly<LegalCalloutProps>): ReactElement {
  const v = VARIANTS[variant];
  return (
    <aside
      role="note"
      className={cn(
        "not-prose my-2 flex gap-4 rounded-2xl border p-5",
        v.wrapper,
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl",
          v.iconWrap,
        )}
      >
        {v.icon}
      </span>
      <div className="space-y-2 text-sm leading-7 md:text-[15px]">
        {title ? (
          <p className="font-heading text-base font-bold tracking-tight">
            {title}
          </p>
        ) : null}
        <div
          className={cn(
            variant === "highlight" ? "text-white/85" : "text-conteo-dark/85",
          )}
        >
          {children}
        </div>
      </div>
    </aside>
  );
}
