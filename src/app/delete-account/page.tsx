import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Trash2, ArrowLeft, ShieldCheck } from "lucide-react";

const SITE_NAME = "Contéo";
const SUPPORT_EMAIL = "theo.fabianomattei@gmail.com";

export const metadata: Metadata = {
  title: "Suppression de compte et des données",
  description:
    "Demandez la suppression de votre compte Contéo et des données associées en envoyant un email à theo.fabianomattei@gmail.com.",
  alternates: {
    canonical: "/delete-account",
  },
};

const sections = [
  {
    title: "Procédure de suppression",
    content: [
      `Envoyez un email à ${SUPPORT_EMAIL} depuis l'adresse liée à votre compte Contéo.`,
      "Indiquez clairement que vous souhaitez la suppression de votre compte et des données associées.",
      "Précisez, si possible, le nom du compte ou l'adresse email utilisée dans l'application.",
      "Votre demande sera traitée manuellement dès réception.",
    ],
  },
  {
    title: "Données supprimées",
    content: [
      "Compte utilisateur Contéo.",
      "Données de profil associées au compte.",
      "Préférences et informations utilisées pour personnaliser l'expérience.",
      "Contenus et historiques associés au compte, dans la mesure où ils sont liés à votre profil.",
    ],
  },
  {
    title: "Données conservées temporairement",
    content: [
      "Les logs techniques de sécurité ou de conformité peuvent être conservés jusqu'à 30 jours après la suppression.",
      "Certaines données peuvent être conservées plus longtemps si une obligation légale, fiscale ou de sécurité l'exige.",
      "Les données strictement nécessaires à la gestion des litiges ou à la prévention des abus peuvent être conservées pendant la durée légale applicable.",
    ],
  },
];

export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen bg-conteo-dark text-white">
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-conteo-accent via-conteo-secondary to-conteo-accent" />

      <div className="container mx-auto px-6 py-10 md:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-conteo-accent transition-colors"
        >
          <ArrowLeft className="size-4" />
          Retour à l&apos;accueil
        </Link>

        <div className="mx-auto mt-8 max-w-3xl">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 md:p-10 shadow-2xl shadow-black/20 backdrop-blur">
            <div className="inline-flex items-center gap-2 rounded-full bg-conteo-accent/15 px-4 py-2 text-sm font-medium text-conteo-accent">
              <Trash2 className="size-4" />
              Demande de suppression de compte
            </div>

            <h1 className="mt-6 font-heading text-3xl font-semibold md:text-5xl">
              Suppression du compte {SITE_NAME} et des données associées
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              Si vous souhaitez supprimer votre compte {SITE_NAME}, envoyez un
              message à l&apos;adresse ci-dessous. Cette page est fournie pour
              répondre aux exigences de Google Play et décrit la procédure de
              suppression ainsi que les données concernées.
            </p>

            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Demande%20de%20suppression%20de%20compte%20Cont%C3%A9o`}
              className="mt-8 inline-flex items-center gap-3 rounded-[20px] bg-conteo-accent px-5 py-4 font-semibold text-conteo-dark transition-transform hover:scale-[1.02]"
            >
              <Mail className="size-5" />
              {SUPPORT_EMAIL}
            </a>

            <div className="mt-10 grid gap-6">
              {sections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-[28px] border border-white/10 bg-black/10 p-6"
                >
                  <h2 className="font-heading text-xl font-semibold text-conteo-accent">
                    {section.title}
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-white/78 md:text-base">
                    {section.content.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 size-2 rounded-full bg-conteo-accent shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border border-conteo-accent/20 bg-conteo-accent/10 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-conteo-accent" />
                <p className="text-sm leading-7 text-white/80 md:text-base">
                  Après validation de votre demande, nous supprimons les données
                  de compte liées à votre profil dans un délai raisonnable et au
                  plus tard dans les 30 jours, sauf obligation légale de
                  conservation plus longue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
