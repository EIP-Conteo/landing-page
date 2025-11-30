"use client";

import { Logo } from "@/components/shared/Logo";
import { AppStoreBadges } from "@/components/shared/AppStoreBadges";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer
      role="contentinfo"
      aria-label="Pied de page"
      className="relative bg-conteo-dark overflow-hidden"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-conteo-accent via-conteo-secondary to-conteo-accent" />

      {/* Main footer content */}
      <div className="container mx-auto px-6 py-12">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <Logo size="md" className="mb-4" />
            <p className="font-sans text-white/60 text-sm text-center md:text-left max-w-sm">
              Contéo crée des histoires personnalisées et magiques pour
              émerveiller vos enfants, nuit après nuit.
            </p>
          </div>

          {/* Download section */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-sans font-semibold text-white mb-3 text-sm">
              Bientôt disponible
            </h4>
            <AppStoreBadges size="sm" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-white/30 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Contéo. Tous droits réservés.
          </p>

          <div className="flex items-center gap-1 text-white/30 text-xs">
            <span>Fait avec</span>
            <Heart className="w-3 h-3 text-conteo-accent fill-conteo-accent animate-pulse" />
            <span>pour les petits rêveurs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
