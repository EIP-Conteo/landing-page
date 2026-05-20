import type { ReactElement, ReactNode } from "react";
import Link from "next/link";
import { Mail, FileText, Shield, Trash2 } from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import type { TocItem } from "./legal-types";

interface LegalLayoutProps {
  toc: TocItem[];
  contactEmail: string;
  hero: ReactNode;
  children: ReactNode;
}

export function LegalLayout({
  toc,
  contactEmail,
  hero,
  children,
}: Readonly<LegalLayoutProps>): ReactElement {
  return (
    <main className="min-h-screen scroll-smooth bg-white text-conteo-dark selection:bg-conteo-accent/40 selection:text-conteo-dark">
      {hero}

      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
          <aside
            aria-label="Navigation du document"
            className="hidden lg:block"
          >
            <div className="sticky top-24">
              <TableOfContents items={toc} />

              <div className="mt-10 rounded-2xl border border-conteo-light bg-conteo-light/40 p-5">
                <p className="font-heading text-sm font-extrabold text-conteo-dark">
                  Documents légaux
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link
                      href="/terms-of-service"
                      className="inline-flex items-center gap-2 text-conteo-text-muted transition-colors hover:text-conteo-secondary"
                    >
                      <FileText className="size-3.5" aria-hidden="true" />
                      Conditions d&apos;utilisation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="inline-flex items-center gap-2 text-conteo-text-muted transition-colors hover:text-conteo-secondary"
                    >
                      <Shield className="size-3.5" aria-hidden="true" />
                      Politique de confidentialité
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/delete-account"
                      className="inline-flex items-center gap-2 text-conteo-text-muted transition-colors hover:text-conteo-secondary"
                    >
                      <Trash2 className="size-3.5" aria-hidden="true" />
                      Suppression de compte
                    </Link>
                  </li>
                </ul>
              </div>

              <a
                href={`mailto:${contactEmail}`}
                className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-conteo-text-muted hover:text-conteo-secondary"
              >
                <Mail className="size-3.5" aria-hidden="true" />
                {contactEmail}
              </a>
            </div>
          </aside>

          <details className="group rounded-2xl border border-conteo-light bg-conteo-light/40 p-4 lg:hidden">
            <summary className="cursor-pointer list-none font-heading text-sm font-extrabold uppercase tracking-wider text-conteo-dark">
              Sommaire ({toc.length} sections)
              <span className="float-right text-conteo-secondary transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>
            <div className="mt-4">
              <TableOfContents items={toc} />
            </div>
          </details>

          <article className="min-w-0 max-w-3xl space-y-12 lg:space-y-14">
            {children}

            <footer
              aria-label="Pied du document légal"
              className="rounded-3xl border border-conteo-light bg-gradient-to-br from-conteo-light/50 via-white to-white p-6 md:p-8"
            >
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-heading text-lg font-extrabold text-conteo-dark">
                    Une question sur ce document ?
                  </p>
                  <p className="mt-1 text-sm text-conteo-text-muted">
                    Notre équipe répond à toute demande dans un délai
                    raisonnable.
                  </p>
                </div>
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-2 rounded-button bg-conteo-dark px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-conteo-secondary"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Nous contacter
                </a>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </main>
  );
}
