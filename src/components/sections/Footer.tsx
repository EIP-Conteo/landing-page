import Link from "next/link";
import { Heart, MessageSquare, Shield, Trash2, FileText } from "lucide-react";
import type { ReactElement } from "react";
import { Logo } from "@/components/shared/Logo";
import { Separator } from "@/components/ui/separator";
import { IPHONE_WAITLIST_ANCHOR, playStoreUrl } from "@/lib/site";
import { AppleIcon, GooglePlayIcon } from "@/components/shared/StoreIcons";

interface FooterProps {
  currentYear: number;
}

const legalLinks = [
  { href: "/feedback", label: "Feedback", icon: MessageSquare },
  { href: "/delete-account", label: "Suppression de compte", icon: Trash2 },
  { href: "/terms-of-service", label: "CGU", icon: FileText },
  { href: "/privacy", label: "Confidentialité", icon: Shield },
];

const storeLink =
  "flex items-center gap-2.5 rounded-[1rem] bg-white/[0.06] px-4 py-2.5 ring-1 ring-white/10 transition-colors hover:bg-white/10";

export function Footer({ currentYear }: Readonly<FooterProps>): ReactElement {
  return (
    <footer id="pied-de-page" aria-label="Pied de page" className="relative border-t border-white/5 bg-[#1c1c30]">
      <div className="container mx-auto px-6 py-14">
        <div className="mb-10 flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          <div className="flex flex-col items-center md:items-start">
            <Logo size="sm" className="mb-4 md:items-start" />
            <p className="max-w-sm text-center font-sans text-sm text-white/55 md:text-left">
              Des histoires personnalisées et racontées d'une voix douce, pour faire du coucher le meilleur moment de la
              journée.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 md:items-end">
            <a href={playStoreUrl("footer")} target="_blank" rel="noopener noreferrer" className={storeLink}>
              <GooglePlayIcon className="size-5 text-white" />
              <span className="flex flex-col leading-tight">
                <span className="font-sans text-[10px] text-white/60">Disponible sur</span>
                <span className="font-sans text-sm font-semibold text-white">Google Play</span>
              </span>
            </a>
            <a href={IPHONE_WAITLIST_ANCHOR} className={storeLink}>
              <AppleIcon className="size-5 text-white" />
              <span className="flex flex-col leading-tight">
                <span className="font-sans text-[10px] text-white/60">Bientôt sur iPhone</span>
                <span className="font-sans text-sm font-semibold text-white">Être prévenu</span>
              </span>
            </a>
          </div>
        </div>

        <Separator className="mb-6 bg-white/10" />
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <p className="order-last font-sans text-xs text-white/35 lg:order-first">
            © {currentYear} Contéo. Tous droits réservés.
          </p>

          <div className="flex flex-col items-center gap-5 lg:items-end">
            <nav aria-label="Liens légaux" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {legalLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-conteo-accent"
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
            <p className="flex items-center gap-1 text-xs text-white/35">
              Fait avec
              <Heart className="size-3 fill-conteo-accent text-conteo-accent" aria-label="amour" />
              à Marseille, pour les petits rêveurs
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
