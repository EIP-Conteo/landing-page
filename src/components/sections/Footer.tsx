"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { AppStoreBadges } from "@/components/shared/AppStoreBadges";
import { Heart, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { ReactElement } from "react";

export function Footer(): ReactElement {
  return (
    <footer
      role="contentinfo"
      aria-label="Pied de page"
      className="relative bg-conteo-dark overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-conteo-accent via-conteo-secondary to-conteo-accent" />

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <Logo size="md" className="mb-4" />
            <p className="font-sans text-white/60 text-sm text-center md:text-left max-w-sm">
              Contéo crée des histoires personnalisées et magiques pour
              émerveiller vos enfants, nuit après nuit.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-sans font-semibold text-white mb-3 text-sm">
              Bientôt disponible
            </h4>
            <AppStoreBadges size="sm" />
          </div>
        </div>

        <Separator className="bg-white/10 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-white/30 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Contéo. Tous droits réservés.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/feedback"
              className="flex items-center gap-1.5 text-white/50 hover:text-conteo-accent text-xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Feedback</span>
            </Link>

            <div className="flex items-center gap-1 text-white/30 text-xs">
              <span>Fait avec</span>
              <Heart className="w-3 h-3 text-conteo-accent fill-conteo-accent animate-pulse" />
              <span>pour les petits rêveurs</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
