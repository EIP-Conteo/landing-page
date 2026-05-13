import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, Shield } from "lucide-react";

const SUPPORT_EMAIL = "theo.fabianomattei@gmail.com";
const SITE_NAME = "Contéo";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de Contéo.",
  alternates: {
    canonical: "/privacy",
  },
};

const dataCategories = [
  "Informations de compte: adresse email, nom ou pseudonyme, photo de profil et, si renseigné, numéro de téléphone.",
  "Informations d'authentification: données nécessaires à la connexion, au maintien de la session et à la réinitialisation du mot de passe.",
  "Préférences d'utilisation: langue, thème, notifications et réglages de lecture.",
  "Contenus liés aux histoires: histoires générées, images associées, audio, favoris, progression et historique de lecture.",
  "Données d'abonnement et de paiement: informations nécessaires à la gestion des abonnements via Stripe.",
  "Notifications: identifiant technique permettant d'envoyer des notifications push si vous les autorisez.",
];

const purposes = [
  "Créer et sécuriser votre compte.",
  "Vous connecter à l'application et maintenir votre session.",
  "Générer, afficher, écouter, sauvegarder et supprimer vos histoires.",
  "Personnaliser votre expérience dans l'application.",
  "Permettre l'accès hors ligne à certaines histoires et contenus audio.",
  "Afficher vos favoris, votre progression, vos statistiques et vos badges.",
  "Gérer les notifications, uniquement si vous les avez autorisées.",
  "Gérer les abonnements et l'accès aux fonctionnalités payantes.",
];

const services = [
  {
    name: "Backend Contéo",
    description:
      "héberge les fonctionnalités principales de l'application: compte, profil, histoires, historique et statistiques.",
  },
  {
    name: "Google Auth",
    description: "permet la connexion avec un compte Google lorsque cette option est utilisée.",
  },
  {
    name: "Stripe",
    description: "gère les abonnements, paiements et le portail de facturation.",
  },
  {
    name: "Expo Push Notifications",
    description: "permet l'envoi de notifications push si vous les acceptez.",
  },
  {
    name: "Supabase",
    description:
      "peut être utilisé pour l'authentification et le stockage de certains contenus comme les fichiers audio ou images.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-conteo-light/40 to-white text-conteo-dark">
      <div className="container mx-auto px-6 py-10 md:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-conteo-text-muted transition-colors hover:text-conteo-secondary"
        >
          <ArrowLeft className="size-4" />
          Retour à l&apos;accueil
        </Link>

        <div className="mx-auto mt-8 max-w-3xl">
          <div className="rounded-[32px] border border-conteo-light bg-white p-8 shadow-[0_20px_60px_rgba(42,42,66,0.08)] md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-conteo-secondary/10 px-4 py-2 text-sm font-medium text-conteo-secondary">
              <Shield className="size-4" />
              Politique de confidentialité
            </div>

            <h1 className="mt-6 font-heading text-3xl font-extrabold md:text-5xl">
              Politique de confidentialité de {SITE_NAME}
            </h1>

            <p className="mt-5 text-base leading-7 text-conteo-text-muted md:text-lg">
              Cette politique explique quelles données peuvent être utilisées par
              l&apos;application {SITE_NAME}, pourquoi elles sont utilisées et
              comment vous pouvez demander leur suppression.
            </p>

            <section className="mt-10">
              <h2 className="font-heading text-2xl font-extrabold">
                Données que nous utilisons
              </h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-conteo-dark/80">
                {dataCategories.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2.5 size-2 shrink-0 rounded-full bg-conteo-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="font-heading text-2xl font-extrabold">
                Pourquoi ces données sont utilisées
              </h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-conteo-dark/80">
                {purposes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2.5 size-2 shrink-0 rounded-full bg-conteo-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-base leading-7 text-conteo-dark/80">
                Nous n&apos;utilisons pas ces données à des fins de publicité
                ciblée, de revente de données ou de géolocalisation.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="font-heading text-2xl font-extrabold">
                Services utilisés
              </h2>
              <div className="mt-5 grid gap-4">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className="rounded-[24px] bg-conteo-light/70 p-5"
                  >
                    <h3 className="font-heading text-lg font-extrabold">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-conteo-dark/80">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="font-heading text-2xl font-extrabold">
                Conservation des données
              </h2>
              <p className="mt-4 text-base leading-7 text-conteo-dark/80">
                Les données liées à votre compte sont conservées aussi longtemps
                que votre compte est actif ou que leur conservation est nécessaire
                au fonctionnement du service.
              </p>
              <p className="mt-4 text-base leading-7 text-conteo-dark/80">
                Certaines données peuvent être conservées plus longtemps lorsque
                cela est nécessaire pour respecter une obligation légale, résoudre
                un litige, assurer la sécurité du service ou prévenir les abus.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="font-heading text-2xl font-extrabold">
                Suppression du compte et des données
              </h2>
              <p className="mt-4 text-base leading-7 text-conteo-dark/80">
                Vous pouvez demander la suppression de votre compte {SITE_NAME} et
                des données associées en envoyant un email à l&apos;adresse de
                contact ci-dessous.
              </p>
              <p className="mt-4 text-base leading-7 text-conteo-dark/80">
                La suppression concerne notamment les informations de profil, les
                préférences liées au compte, les statistiques, les histoires
                associées au compte et les contenus liés à ces histoires, sous
                réserve des données devant être conservées pour des raisons
                légales, techniques ou de sécurité.
              </p>
              <Link
                href="/delete-account"
                className="mt-5 inline-flex rounded-[20px] bg-conteo-accent px-5 py-3 font-semibold text-conteo-dark transition-transform hover:scale-[1.02]"
              >
                Voir la procédure de suppression
              </Link>
            </section>

            <section className="mt-10">
              <h2 className="font-heading text-2xl font-extrabold">
                Vos droits
              </h2>
              <p className="mt-4 text-base leading-7 text-conteo-dark/80">
                Vous pouvez demander l&apos;accès, la correction ou la suppression
                des données liées à votre compte. Vous pouvez aussi nous contacter
                pour toute question concernant l&apos;utilisation de vos données.
              </p>
            </section>

            <section className="mt-10 rounded-[28px] border border-conteo-secondary/15 bg-conteo-secondary/5 p-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-conteo-secondary" />
                <div>
                  <h2 className="font-heading text-xl font-extrabold">
                    Contact
                  </h2>
                  <p className="mt-3 text-base leading-7 text-conteo-dark/80">
                    Pour toute demande liée à la confidentialité ou à la
                    suppression de compte:
                  </p>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="mt-2 inline-flex font-semibold text-conteo-secondary hover:underline"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
