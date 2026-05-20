import type { ReactElement, ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  icon?: ReactNode;
}

export function LegalHero({
  eyebrow,
  title,
  description,
  updatedAt,
  icon,
}: Readonly<LegalHeroProps>): ReactElement {
  return (
    <header className="relative overflow-hidden border-b border-conteo-light bg-gradient-to-b from-conteo-light/60 via-white to-white">
      <div className="absolute inset-0 -z-10 bg-mesh-gradient opacity-60" />
      <div className="container mx-auto px-6 pt-10 pb-14 md:pt-14 md:pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-conteo-text-muted transition-colors hover:bg-white hover:text-conteo-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-conteo-secondary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Retour à l&apos;accueil
        </Link>

        <div className="mt-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-conteo-secondary/20 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-conteo-secondary shadow-sm backdrop-blur">
            {icon}
            {eyebrow}
          </div>

          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-conteo-dark md:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-conteo-text-muted md:text-xl">
            {description}
          </p>

          <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-conteo-dark/5 px-4 py-1.5 text-xs font-medium text-conteo-dark/70">
            <span
              className="size-1.5 rounded-full bg-conteo-accent"
              aria-hidden="true"
            />
            Dernière mise à jour : {updatedAt}
          </p>
        </div>
      </div>
    </header>
  );
}
