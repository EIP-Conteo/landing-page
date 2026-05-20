import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalSection } from "@/components/legal/LegalSection";
import { LegalCallout } from "@/components/legal/LegalCallout";
import { LegalTable } from "@/components/legal/LegalTable";
import type { TocItem } from "@/components/legal/legal-types";

const SUPPORT_EMAIL = "theo.fabianomattei@gmail.com";
const SITE_NAME = "Contéo";
const UPDATED_AT = "20 mai 2026";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://conteo-landing.vercel.app";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Contéo : données collectées, finalités, bases légales RGPD, sous-traitants, conservation, sécurité, droits des utilisateurs et protection des mineurs.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "website",
    title: `Politique de confidentialité | ${SITE_NAME}`,
    description:
      "Comment Contéo collecte, utilise et protège les données personnelles, dans le respect du RGPD et des règles de protection des mineurs.",
    url: `${SITE_URL}/privacy`,
  },
  twitter: {
    card: "summary",
    title: `Politique de confidentialité | ${SITE_NAME}`,
    description:
      "Politique de confidentialité de Contéo : RGPD, sécurité et protection des mineurs.",
  },
  robots: { index: true, follow: true },
};

const toc: TocItem[] = [
  { id: "responsable", label: "Responsable du traitement" },
  { id: "donnees-collectees", label: "Données collectées" },
  { id: "donnees-non-collectees", label: "Données NON collectées" },
  { id: "finalites", label: "Finalités du traitement" },
  { id: "bases-legales", label: "Bases légales RGPD" },
  { id: "sous-traitants", label: "Sous-traitants et services tiers" },
  { id: "transferts", label: "Transferts hors UE" },
  { id: "conservation", label: "Conservation des données" },
  { id: "securite", label: "Sécurité des données" },
  { id: "droits", label: "Vos droits RGPD" },
  { id: "suppression", label: "Suppression du compte" },
  { id: "mineurs", label: "Protection des mineurs" },
  { id: "ia", label: "IA et traitement automatisé" },
  { id: "cookies", label: "Stockage local et tokens" },
  { id: "modifications", label: "Modifications de la politique" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    name: `Politique de confidentialité – ${SITE_NAME}`,
    url: `${SITE_URL}/privacy`,
    inLanguage: "fr-FR",
    dateModified: "2026-05-20",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LegalLayout
        toc={toc}
        contactEmail={SUPPORT_EMAIL}
        hero={
          <LegalHero
            eyebrow="Confidentialité & RGPD"
            title="Politique de confidentialité"
            description={`${SITE_NAME} a été pensé dès l'origine pour respecter la vie privée des familles. Cette politique détaille précisément quelles données sont collectées, pourquoi, par qui elles sont traitées et comment vous gardez le contrôle.`}
            updatedAt={UPDATED_AT}
            icon={<Shield className="size-3.5" aria-hidden="true" />}
          />
        }
      >
        <LegalSection
          id="responsable"
          index={1}
          title="Responsable du traitement"
        >
          <p>
            Le responsable du traitement des données personnelles collectées
            dans le cadre de l&apos;utilisation de l&apos;application{" "}
            {SITE_NAME} est l&apos;éditeur de l&apos;application, joignable à
            l&apos;adresse suivante :
          </p>
          <p className="not-prose">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-heading text-base font-bold text-conteo-secondary hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
          </p>
          <p>
            Le présent document s&apos;applique à l&apos;ensemble des données
            traitées via l&apos;application mobile {SITE_NAME}, son backend et
            les services tiers indispensables à son fonctionnement.
          </p>
        </LegalSection>

        <LegalSection
          id="donnees-collectees"
          index={2}
          title="Données collectées"
        >
          <p>
            {SITE_NAME} ne collecte que les données strictement nécessaires au
            bon fonctionnement de l&apos;application. Aucun profilage marketing,
            aucune publicité et aucun tracking comportemental ne sont effectués.
          </p>

          <LegalTable
            caption="Catégories de données traitées"
            headers={["Catégorie", "Finalité", "Base légale", "Conservation"]}
            rows={[
              [
                "Adresse email",
                "Création de compte, authentification, contact support",
                "Exécution du contrat (CGU)",
                "Durée de vie du compte",
              ],
              [
                "Mot de passe (haché)",
                "Authentification sécurisée",
                "Exécution du contrat",
                "Durée de vie du compte",
              ],
              [
                "Nom affiché (display_name)",
                "Personnalisation de l'expérience",
                "Exécution du contrat",
                "Durée de vie du compte",
              ],
              [
                "Photo de profil / avatar (optionnel)",
                "Affichage dans le profil utilisateur",
                "Consentement",
                "Jusqu'à suppression par l'utilisateur",
              ],
              [
                "Prompts IA & sélections (personnages, objets, décors)",
                "Génération de l'histoire demandée",
                "Exécution du contrat",
                "Durée de vie du compte",
              ],
              [
                "Histoires générées (texte, audio, scènes)",
                "Bibliothèque personnelle, relecture hors ligne",
                "Exécution du contrat",
                "Durée de vie du compte",
              ],
              [
                "Historique de lecture",
                "Reprise de lecture, statistiques",
                "Exécution du contrat",
                "Durée de vie du compte",
              ],
              [
                "Statistiques d'usage interne",
                "Affichage des stats à l'utilisateur, suivi qualité",
                "Intérêt légitime",
                "Durée de vie du compte",
              ],
              [
                "Badges / achievements",
                "Système de récompenses dans l'application",
                "Exécution du contrat",
                "Durée de vie du compte",
              ],
              [
                "Données d'abonnement (statut, plateforme)",
                "Gestion des droits Premium via RevenueCat",
                "Exécution du contrat",
                "Durée de l'abonnement + obligations comptables",
              ],
              [
                "Identifiant utilisateur (user_id)",
                "Référence interne unique",
                "Exécution du contrat",
                "Durée de vie du compte",
              ],
              [
                "Tokens d'authentification (JWT)",
                "Maintien de la session",
                "Exécution du contrat",
                "Durée de la session, rotation régulière",
              ],
              [
                "Préférences utilisateur",
                "Personnalisation (thème, langue, notifications)",
                "Exécution du contrat",
                "Durée de vie du compte",
              ],
              [
                "Locale système",
                "Adaptation de la langue de l'application",
                "Intérêt légitime",
                "Stockée localement uniquement",
              ],
              [
                "Informations d'appareil limitées (OS, version app)",
                "Diagnostic technique, compatibilité",
                "Intérêt légitime",
                "12 mois maximum",
              ],
              [
                "Fichiers audio générés (TTS)",
                "Écoute des histoires, mode hors-ligne partiel",
                "Exécution du contrat",
                "Durée de vie du compte",
              ],
            ]}
          />
        </LegalSection>

        <LegalSection
          id="donnees-non-collectees"
          index={3}
          title="Données que nous ne collectons jamais"
        >
          <LegalCallout variant="success" title="Ce que Contéo ne fait pas">
            <p>
              Nous avons fait le choix explicite d&apos;exclure du périmètre de{" "}
              {SITE_NAME} les pratiques les plus intrusives pour la vie privée,
              en particulier celles ciblant les enfants.
            </p>
          </LegalCallout>
          <ul>
            <li>
              <strong>Aucune géolocalisation</strong> : ni GPS, ni IP
              géolocalisée, ni localisation approximative.
            </li>
            <li>
              <strong>Aucun accès à la caméra ni au microphone</strong> de
              l&apos;appareil.
            </li>
            <li>
              <strong>Aucun accès aux contacts</strong>, au carnet
              d&apos;adresses, aux SMS ou aux appels.
            </li>
            <li>
              <strong>Aucun accès Bluetooth</strong> ni scan d&apos;appareils
              environnants.
            </li>
            <li>
              <strong>Aucune publicité</strong>, aucun SDK publicitaire, aucun
              identifiant publicitaire (IDFA, AAID).
            </li>
            <li>
              <strong>Aucun tracking tiers</strong>, aucun pixel, aucun outil
              d&apos;analytics comportemental externe.
            </li>
            <li>
              <strong>Aucun profilage marketing</strong>, aucune revente ni
              transmission commerciale de données.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="finalites" index={4} title="Finalités du traitement">
          <p>Les données sont exclusivement traitées pour :</p>
          <ul>
            <li>
              permettre la création et la sécurisation du compte utilisateur ;
            </li>
            <li>
              authentifier l&apos;utilisateur et maintenir sa session active ;
            </li>
            <li>
              générer, restituer et sauvegarder les histoires personnalisées ;
            </li>
            <li>
              gérer la bibliothèque, les favoris, l&apos;historique et les
              statistiques de lecture ;
            </li>
            <li>attribuer et afficher les badges et achievements ;</li>
            <li>
              gérer l&apos;abonnement Premium et l&apos;accès aux
              fonctionnalités payantes ;
            </li>
            <li>
              déclencher des notifications locales de rappel lorsque
              l&apos;utilisateur les a autorisées ;
            </li>
            <li>
              assurer la sécurité du service, prévenir la fraude et les abus ;
            </li>
            <li>
              répondre aux demandes de support et aux obligations légales.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="bases-legales" index={5} title="Bases légales RGPD">
          <p>
            Conformément à l&apos;article 6 du Règlement Général sur la
            Protection des Données, les traitements reposent sur les bases
            légales suivantes :
          </p>
          <ul>
            <li>
              <strong>Exécution du contrat</strong> (art. 6.1.b) : création de
              compte, authentification, génération et sauvegarde des histoires,
              gestion de l&apos;abonnement.
            </li>
            <li>
              <strong>Consentement</strong> (art. 6.1.a) : photo de profil
              optionnelle, notifications locales, fonctionnalités spécifiques
              soumises à opt-in.
            </li>
            <li>
              <strong>Intérêt légitime</strong> (art. 6.1.f) : sécurité du
              service, prévention des abus, diagnostic technique et statistiques
              d&apos;usage interne strictement nécessaires au bon
              fonctionnement.
            </li>
            <li>
              <strong>Obligation légale</strong> (art. 6.1.c) : conservation
              limitée de certaines données pour répondre aux obligations
              comptables, fiscales ou de coopération avec les autorités.
            </li>
          </ul>
        </LegalSection>

        <LegalSection
          id="sous-traitants"
          index={6}
          title="Sous-traitants et services tiers"
        >
          <p>
            {SITE_NAME} fait appel à un nombre limité de sous-traitants
            techniques, chacun encadré par un contrat conforme à l&apos;article
            28 du RGPD lorsque la réglementation l&apos;exige. Aucune donnée
            n&apos;est transmise à des fins marketing ou publicitaires.
          </p>

          <LegalTable
            caption="Sous-traitants et services tiers utilisés"
            headers={["Service", "Rôle", "Données traitées", "Région"]}
            rows={[
              [
                "Supabase",
                "Authentification, base de données, stockage des fichiers (audio, images)",
                "Email, mot de passe haché, profil, histoires, audio, statistiques",
                "UE",
              ],
              [
                "RevenueCat",
                "Gestion technique des abonnements Premium et synchronisation des droits",
                "Identifiant utilisateur, statut d'abonnement, plateforme (iOS/Android)",
                "USA",
              ],
              [
                "Google (Sign-In)",
                "Authentification via compte Google (OAuth) lorsqu'utilisée",
                "Identifiant Google, email, nom affiché, photo de profil",
                "USA",
              ],
              [
                "Google Gemini TTS",
                "Génération audio par synthèse vocale (TTS)",
                "Texte de l'histoire à vocaliser",
                "USA",
              ],
              [
                "Ollama",
                "Génération du texte des histoires par modèle de langage",
                "Prompts IA et paramètres de génération",
                "Hébergement contrôlé par l'éditeur",
              ],
              [
                "Expo",
                "Mises à jour OTA de l'application et notifications locales",
                "Identifiant technique anonyme, version de l'app",
                "USA",
              ],
              [
                "Apple App Store / Google Play",
                "Distribution de l'application et traitement des paiements d'abonnement",
                "Identifiants de compte plateforme, données de facturation",
                "USA",
              ],
            ]}
          />
        </LegalSection>

        <LegalSection
          id="transferts"
          index={7}
          title="Transferts hors Union européenne"
        >
          <p>
            Certains de nos sous-traitants (notamment RevenueCat, Google) sont
            établis aux États-Unis. Lorsque des données personnelles sont
            transférées hors de l&apos;Espace économique européen, ces
            transferts sont encadrés par les garanties appropriées prévues par
            le RGPD :
          </p>
          <ul>
            <li>
              <strong>Clauses Contractuelles Types</strong> (CCT / SCC) adoptées
              par la Commission européenne ;
            </li>
            <li>
              certification au <strong>Data Privacy Framework</strong>{" "}
              UE–États-Unis lorsque le sous-traitant y adhère ;
            </li>
            <li>
              mesures techniques complémentaires (chiffrement en transit et au
              repos, minimisation des données transmises).
            </li>
          </ul>
        </LegalSection>

        <LegalSection
          id="conservation"
          index={8}
          title="Conservation des données"
        >
          <p>
            Les données sont conservées pendant des durées proportionnées aux
            finalités poursuivies :
          </p>
          <ul>
            <li>
              <strong>Compte actif</strong> : les données du profil, de la
              bibliothèque et des statistiques sont conservées tant que le
              compte est actif.
            </li>
            <li>
              <strong>Suppression du compte</strong> : les données associées
              sont effacées dans un délai raisonnable, généralement sous 30
              jours, sous réserve des obligations légales de conservation.
            </li>
            <li>
              <strong>Logs techniques</strong> : conservés au maximum 12 mois à
              des fins de sécurité et de diagnostic.
            </li>
            <li>
              <strong>Abonnement</strong> : les informations relatives à
              l&apos;abonnement et à la facturation peuvent être conservées
              jusqu&apos;à 10 ans pour respecter les obligations comptables et
              fiscales applicables.
            </li>
            <li>
              <strong>Cache local</strong> : les histoires téléchargées hors
              ligne, les jetons d&apos;authentification et les préférences
              stockés sur l&apos;appareil sont effacés lors de la déconnexion ou
              de la désinstallation de l&apos;application.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="securite" index={9} title="Sécurité des données">
          <p>
            {SITE_NAME} met en œuvre des mesures techniques et
            organisationnelles appropriées pour protéger vos données :
          </p>
          <ul>
            <li>
              <strong>Chiffrement HTTPS / TLS</strong> systématique pour toutes
              les communications entre l&apos;application et le backend ;
            </li>
            <li>
              <strong>Hachage</strong> des mots de passe (jamais stockés en
              clair) ;
            </li>
            <li>
              <strong>Tokens JWT</strong> à durée limitée, rotation régulière et
              stockage sécurisé ;
            </li>
            <li>
              utilisation de <strong>SecureStore</strong> côté appareil pour les
              jetons sensibles ;
            </li>
            <li>
              <strong>accès restreint</strong> aux données côté serveur, avec
              journalisation et principe du moindre privilège ;
            </li>
            <li>
              déploiement contrôlé des mises à jour applicatives via{" "}
              <strong>Expo Updates</strong>.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="droits" index={10} title="Vos droits RGPD">
          <p>
            Conformément aux articles 15 à 22 du RGPD, vous disposez des droits
            suivants sur vos données personnelles :
          </p>
          <ul>
            <li>
              <strong>Droit d&apos;accès</strong> : obtenir la confirmation que
              vos données sont traitées et en recevoir une copie ;
            </li>
            <li>
              <strong>Droit de rectification</strong> : faire corriger des
              données inexactes ou incomplètes ;
            </li>
            <li>
              <strong>Droit à l&apos;effacement</strong> (« droit à l&apos;oubli
              ») : demander la suppression de vos données ;
            </li>
            <li>
              <strong>Droit d&apos;opposition</strong> : vous opposer à un
              traitement reposant sur l&apos;intérêt légitime ;
            </li>
            <li>
              <strong>Droit à la portabilité</strong> : recevoir vos données
              dans un format structuré et lisible ;
            </li>
            <li>
              <strong>Droit à la limitation</strong> du traitement ;
            </li>
            <li>
              <strong>Droit de retirer votre consentement</strong> à tout
              moment, sans remise en cause de la licéité des traitements
              antérieurs.
            </li>
          </ul>
          <p>
            Pour exercer ces droits, écrivez-nous à{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. En cas de
            désaccord persistant, vous avez le droit d&apos;introduire une
            réclamation auprès de la <strong>CNIL</strong> (Commission Nationale
            de l&apos;Informatique et des Libertés) –{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.cnil.fr
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection id="suppression" index={11} title="Suppression du compte">
          <p>
            Vous pouvez supprimer votre compte à tout moment via la procédure
            officielle dédiée :
          </p>
          <p className="not-prose">
            <Link
              href="/delete-account"
              className="inline-flex items-center gap-2 rounded-button bg-conteo-accent px-5 py-3 font-semibold text-conteo-dark transition-transform hover:scale-[1.02]"
            >
              Accéder à la procédure de suppression →
            </Link>
          </p>
          <p>
            La suppression entraîne l&apos;effacement de votre profil, de vos
            histoires, de votre historique, de vos statistiques, de vos favoris
            et de vos badges, sous réserve des données devant être conservées
            pour des raisons légales ou de sécurité.
          </p>
        </LegalSection>

        <LegalSection id="mineurs" index={12} title="Protection des mineurs">
          <LegalCallout
            variant="highlight"
            title="Une application pensée pour les enfants, validée par les parents"
          >
            <p>
              {SITE_NAME} est destiné aux enfants de 0 à 12 ans, mais{" "}
              <strong>seuls les parents ou tuteurs légaux</strong> sont
              autorisés à créer le compte et à accepter la présente politique.
              Aucune donnée n&apos;est sciemment collectée auprès d&apos;un
              mineur agissant seul.
            </p>
          </LegalCallout>
          <ul>
            <li>
              Le compte est créé et géré par un adulte responsable, qui demeure
              titulaire des droits RGPD sur les données associées.
            </li>
            <li>
              Aucune <strong>publicité</strong>, aucun <strong>tracking</strong>{" "}
              et aucun <strong>profilage marketing</strong> ne sont mis en
              œuvre, quel que soit l&apos;âge.
            </li>
            <li>
              Aucune <strong>communication</strong> entre utilisateurs ni
              fonctionnalité sociale n&apos;est proposée à l&apos;intérieur de
              l&apos;application.
            </li>
            <li>
              Si nous étions amenés à constater qu&apos;un compte a été créé par
              un mineur seul, nous procéderions à sa suppression dans les
              meilleurs délais.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="ia" index={13} title="IA et traitement automatisé">
          <p>
            Les histoires générées par {SITE_NAME} reposent sur des modèles
            d&apos;intelligence artificielle : <strong>Ollama</strong> pour la
            génération du texte et <strong>Google Gemini TTS</strong> pour la
            narration vocale. Les prompts soumis (incluant les choix de
            personnages, d&apos;objets et de décors) sont transmis à ces modèles
            dans le seul but de produire l&apos;histoire demandée.
          </p>
          <p>
            Ces traitements ne constituent pas une{" "}
            <strong>
              décision automatisée produisant des effets juridiques
            </strong>{" "}
            au sens de l&apos;article 22 du RGPD. Aucun profil prédictif, aucune
            évaluation comportementale ni aucune notation des utilisateurs ne
            sont effectués.
          </p>
        </LegalSection>

        <LegalSection
          id="cookies"
          index={14}
          title="Cookies, stockage local et tokens"
        >
          <p>
            {SITE_NAME} est une application <strong>native mobile</strong>{" "}
            (React Native / Expo) et n&apos;utilise pas de cookies de navigation
            au sens du site web. Les seules informations stockées localement sur
            l&apos;appareil sont :
          </p>
          <ul>
            <li>
              les jetons d&apos;authentification (JWT) dans{" "}
              <strong>SecureStore</strong>, espace chiffré du système ;
            </li>
            <li>
              les préférences utilisateur et le cache de bibliothèque dans{" "}
              <strong>AsyncStorage</strong>, pour permettre la reprise de
              session et le mode hors-ligne partiel ;
            </li>
            <li>
              les fichiers audio et images téléchargés pour la lecture hors
              connexion.
            </li>
          </ul>
          <p>
            La désinstallation de l&apos;application ou la déconnexion effacent
            ces données locales. La présente landing web peut quant à elle
            utiliser des cookies strictement techniques nécessaires à son
            fonctionnement de base.
          </p>
        </LegalSection>

        <LegalSection
          id="modifications"
          index={15}
          title="Modifications de la politique"
        >
          <p>
            La présente politique de confidentialité peut être mise à jour pour
            refléter les évolutions du service, les nouvelles obligations
            réglementaires ou les recommandations des autorités de protection
            des données. La date de mise à jour figure en tête du document.
          </p>
          <p>
            Toute modification substantielle vous sera signalée via
            l&apos;application ou par email. La poursuite de l&apos;utilisation
            après notification vaut prise de connaissance.
          </p>
        </LegalSection>

        <LegalSection id="contact" index={16} title="Contact">
          <p>
            Pour toute question concernant cette politique, l&apos;exercice de
            vos droits ou pour signaler un incident de sécurité, vous pouvez
            nous écrire à :
          </p>
          <p className="not-prose">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-heading text-lg font-bold text-conteo-secondary hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
          </p>
          <p>
            Vous pouvez également contacter ou saisir la <strong>CNIL</strong>{" "}
            en tant qu&apos;autorité de contrôle française compétente :{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.cnil.fr
            </a>
            .
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
