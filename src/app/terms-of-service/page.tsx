import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalSection } from "@/components/legal/LegalSection";
import { LegalCallout } from "@/components/legal/LegalCallout";
import type { TocItem } from "@/components/legal/legal-types";

const SUPPORT_EMAIL = "theo.fabianomattei@gmail.com";
const SITE_NAME = "Contéo";
const UPDATED_AT = "20 mai 2026";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://conteo-landing.vercel.app";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description:
    "Conditions générales d'utilisation de l'application Contéo : règles d'usage, comptes, abonnement Premium, contenus générés par IA, supervision parentale et responsabilités.",
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    type: "website",
    title: `Conditions d'utilisation | ${SITE_NAME}`,
    description:
      "Conditions générales d'utilisation de l'application Contéo : comptes, abonnement Premium, contenus générés par IA et supervision parentale.",
    url: `${SITE_URL}/terms-of-service`,
  },
  twitter: {
    card: "summary",
    title: `Conditions d'utilisation | ${SITE_NAME}`,
    description: "Conditions générales d'utilisation de l'application Contéo.",
  },
  robots: { index: true, follow: true },
};

const toc: TocItem[] = [
  { id: "presentation", label: "Présentation du service" },
  { id: "acceptation", label: "Acceptation des conditions" },
  { id: "age", label: "Conditions d'âge" },
  { id: "compte", label: "Création de compte" },
  { id: "securite-compte", label: "Sécurité du compte" },
  { id: "fonctionnement-ia", label: "Fonctionnement du service IA" },
  { id: "usage-autorise", label: "Utilisation autorisée" },
  { id: "contenus-interdits", label: "Contenus interdits" },
  { id: "quotas", label: "Quotas et limitations" },
  { id: "premium", label: "Abonnement Premium" },
  { id: "paiements", label: "Paiements et remboursements" },
  { id: "propriete", label: "Propriété intellectuelle" },
  { id: "contenus-generes", label: "Contenus générés par l'utilisateur" },
  { id: "resiliation", label: "Suspension et résiliation" },
  { id: "suppression", label: "Suppression de compte" },
  { id: "disponibilite", label: "Disponibilité du service" },
  { id: "responsabilite", label: "Limitation de responsabilité" },
  { id: "modifications", label: "Modifications des CGU" },
  { id: "droit-applicable", label: "Droit applicable" },
  { id: "contact", label: "Contact" },
];

export default function TermsOfServicePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Conditions d'utilisation – ${SITE_NAME}`,
    url: `${SITE_URL}/terms-of-service`,
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
            eyebrow="Document légal"
            title="Conditions d'utilisation"
            description={`Bienvenue sur ${SITE_NAME}. Ces conditions encadrent l'usage de l'application mobile, la création de compte, l'abonnement Premium et l'utilisation des contenus générés par intelligence artificielle.`}
            updatedAt={UPDATED_AT}
            icon={<FileText className="size-3.5" aria-hidden="true" />}
          />
        }
      >
        <LegalSection
          id="presentation"
          index={1}
          title="Présentation du service"
        >
          <p>
            {SITE_NAME} est une application mobile éditée à destination des
            familles. Elle permet à un enfant, sous la supervision d&apos;un
            adulte responsable, de créer des histoires personnalisées en
            choisissant des personnages, des objets et des décors. Chaque
            histoire est ensuite générée par un système d&apos;intelligence
            artificielle et restituée sous trois formes complémentaires :
          </p>
          <ul>
            <li>
              un <strong>texte narratif</strong> structuré, adapté aux jeunes
              lecteurs ;
            </li>
            <li>
              une <strong>narration audio</strong> produite par synthèse vocale
              (Text-to-Speech) ;
            </li>
            <li>
              des <strong>illustrations</strong> de type visual novel mettant en
              scène les éléments choisis.
            </li>
          </ul>
          <p>
            L&apos;application inclut également la gestion de profils
            utilisateurs, une bibliothèque personnelle d&apos;histoires, un
            système de favoris, des statistiques de lecture, des badges, un
            historique, des notifications locales de rappel ainsi qu&apos;un
            abonnement Premium optionnel. {SITE_NAME} est conçu pour un usage
            familial, non commercial et non éducatif au sens scolaire strict.
          </p>
        </LegalSection>

        <LegalSection
          id="acceptation"
          index={2}
          title="Acceptation des conditions"
        >
          <p>
            En téléchargeant, installant, accédant à ou utilisant
            l&apos;application {SITE_NAME}, vous reconnaissez avoir lu, compris
            et accepté sans réserve les présentes Conditions Générales
            d&apos;Utilisation (ci-après les « CGU »). Si vous n&apos;acceptez
            pas tout ou partie de ces conditions, vous devez vous abstenir
            d&apos;utiliser le service et désinstaller l&apos;application.
          </p>
          <p>
            L&apos;acceptation est matérialisée par la création de votre compte
            ou par toute première utilisation effective du service. Cette
            acceptation s&apos;applique également à la Politique de
            confidentialité, qui en constitue le complément indissociable.
          </p>
        </LegalSection>

        <LegalSection
          id="age"
          index={3}
          title="Conditions d'âge et supervision parentale"
        >
          <LegalCallout
            variant="warning"
            title="Lecture obligatoire pour les parents et tuteurs"
          >
            <p>
              {SITE_NAME} est destiné aux enfants âgés de{" "}
              <strong>0 à 12 ans</strong>. L&apos;application ne doit jamais
              être utilisée de manière autonome par un mineur. La création du
              compte, la validation des présentes CGU et toute interaction avec
              le service doivent être effectuées par un parent ou un
              représentant légal majeur, qui demeure entièrement responsable de
              l&apos;usage fait par l&apos;enfant.
            </p>
          </LegalCallout>
          <p>Le parent ou tuteur légal s&apos;engage à :</p>
          <ul>
            <li>
              créer et gérer le compte, choisir le mot de passe et conserver les
              identifiants en lieu sûr ;
            </li>
            <li>
              superviser activement les sessions de lecture et l&apos;exposition
              de l&apos;enfant aux contenus générés ;
            </li>
            <li>
              expliquer à l&apos;enfant que les histoires sont produites par une
              intelligence artificielle et peuvent contenir des imperfections ;
            </li>
            <li>
              configurer les éventuelles fonctions de rappel et le temps
              d&apos;écran selon les besoins de l&apos;enfant.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="compte" index={4} title="Création de compte">
          <p>
            L&apos;accès aux fonctionnalités personnalisées de {SITE_NAME}{" "}
            nécessite la création d&apos;un compte. Deux méthodes
            d&apos;inscription sont proposées :
          </p>
          <ul>
            <li>
              <strong>Inscription par email et mot de passe</strong> : vous
              renseignez une adresse email valide et choisissez un mot de passe
              répondant aux exigences minimales de sécurité ;
            </li>
            <li>
              <strong>Connexion Google (OAuth)</strong> : vous autorisez{" "}
              {SITE_NAME} à recevoir de Google les informations strictement
              nécessaires à l&apos;authentification (identifiant, email, nom
              affiché et photo de profil le cas échéant).
            </li>
          </ul>
          <p>
            Vous garantissez que les informations fournies sont exactes,
            actuelles et complètes, et vous vous engagez à les maintenir à jour.
            Toute utilisation d&apos;une identité fictive, d&apos;une adresse
            email appartenant à un tiers ou d&apos;informations frauduleuses
            constitue un manquement aux présentes CGU.
          </p>
        </LegalSection>

        <LegalSection id="securite-compte" index={5} title="Sécurité du compte">
          <p>
            Vous êtes seul responsable de la confidentialité de vos
            identifiants. Le mot de passe est stocké sous forme hachée et
            n&apos;est jamais accessible en clair, même par l&apos;équipe{" "}
            {SITE_NAME}. Toute action effectuée depuis votre compte est présumée
            être effectuée par vous-même.
          </p>
          <p>Vous vous engagez à :</p>
          <ul>
            <li>choisir un mot de passe robuste et unique ;</li>
            <li>
              ne jamais partager vos identifiants avec un tiers, y compris au
              sein du foyer ;
            </li>
            <li>
              nous signaler immédiatement, à l&apos;adresse{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>, toute
              utilisation non autorisée de votre compte ou toute faille de
              sécurité dont vous auriez connaissance.
            </li>
          </ul>
        </LegalSection>

        <LegalSection
          id="fonctionnement-ia"
          index={6}
          title="Fonctionnement du service IA"
        >
          <p>
            {SITE_NAME} repose sur des modèles d&apos;intelligence artificielle
            générative pour produire le texte et l&apos;audio des histoires. La
            génération de texte utilise un modèle de langage exécuté via{" "}
            <strong>Ollama</strong>, tandis que la narration vocale
            s&apos;appuie sur l&apos;API <strong>Google Gemini TTS</strong>. Le
            rendu visual novel et les illustrations sont assemblés à partir des
            éléments sélectionnés par l&apos;enfant.
          </p>
          <LegalCallout
            variant="warning"
            title="Nature probabiliste des contenus générés"
          >
            <p>
              Les contenus produits par intelligence artificielle sont par
              nature <strong>imprévisibles</strong>. Malgré nos efforts de
              filtrage et de cadrage, {SITE_NAME} ne peut garantir
              l&apos;absence totale d&apos;erreurs factuelles,
              d&apos;incohérences narratives, de formulations maladroites ou de
              biais. Le service est fourni à des fins de divertissement
              familial, et ne constitue ni un outil éducatif certifié, ni une
              source d&apos;information vérifiée.
            </p>
          </LegalCallout>
          <p>
            La supervision parentale est donc <strong>indispensable</strong>{" "}
            avant, pendant et après chaque utilisation. Le parent ou tuteur
            conserve la possibilité de relire l&apos;histoire, d&apos;ajuster
            les choix proposés et de supprimer toute production qui ne lui
            conviendrait pas.
          </p>
        </LegalSection>

        <LegalSection
          id="usage-autorise"
          index={7}
          title="Utilisation autorisée"
        >
          <p>
            Vous êtes autorisé à utiliser {SITE_NAME} dans un cadre strictement
            personnel, familial et non commercial. Ceci inclut notamment :
          </p>
          <ul>
            <li>
              la génération d&apos;histoires pour les enfants de votre foyer ;
            </li>
            <li>
              la lecture, l&apos;écoute et la sauvegarde de ces histoires sur
              vos appareils personnels ;
            </li>
            <li>
              le partage occasionnel d&apos;une histoire au sein du cercle
              familial proche, sans diffusion publique.
            </li>
          </ul>
        </LegalSection>

        <LegalSection
          id="contenus-interdits"
          index={8}
          title="Contenus et comportements interdits"
        >
          <p>
            L&apos;utilisation de {SITE_NAME} pour générer, demander, partager
            ou solliciter des contenus illicites ou inappropriés est strictement
            interdite. Sont notamment prohibés :
          </p>
          <ul>
            <li>
              tout contenu à caractère <strong>violent</strong>, gore ou
              traumatisant ;
            </li>
            <li>
              tout contenu de nature <strong>sexuelle</strong> ou de
              sexualisation, en particulier impliquant des mineurs ;
            </li>
            <li>
              les propos{" "}
              <strong>
                haineux, discriminatoires, racistes, antisémites, homophobes,
                sexistes
              </strong>{" "}
              ou attentatoires à la dignité humaine ;
            </li>
            <li>
              les contenus faisant l&apos;apologie du terrorisme, du suicide,
              des drogues ou de toute activité illégale ;
            </li>
            <li>
              toute tentative de <strong>contournement</strong> des filtres de
              modération, des quotas ou des limitations techniques (prompts
              malveillants, jailbreak, ingénierie inverse, scraping massif) ;
            </li>
            <li>
              toute utilisation du service en violation des droits de tiers,
              notamment des droits de propriété intellectuelle ou des droits de
              la personnalité.
            </li>
          </ul>
          <p>
            Tout manquement à ces règles peut entraîner la suspension immédiate
            du compte, la suppression des contenus concernés, et le cas échéant
            la transmission des éléments aux autorités compétentes.
          </p>
        </LegalSection>

        <LegalSection
          id="quotas"
          index={9}
          title="Quotas et limitations techniques"
        >
          <p>
            Le service propose un usage gratuit assorti de{" "}
            <strong>quotas quotidiens</strong> de génération d&apos;histoires,
            ainsi que des limites techniques (longueur maximale d&apos;une
            histoire, nombre d&apos;éléments combinables, durée maximale de
            l&apos;audio). Ces limites peuvent être ajustées à tout moment,
            notamment pour préserver la qualité du service, maîtriser les coûts
            d&apos;infrastructure ou prévenir les abus.
          </p>
          <p>
            Certaines fonctionnalités sont également soumises à la disponibilité
            des fournisseurs tiers (génération de texte, synthèse vocale), aux
            performances réseau et à la compatibilité du terminal utilisé.
          </p>
        </LegalSection>

        <LegalSection id="premium" index={10} title="Abonnement Premium">
          <p>
            {SITE_NAME} propose un abonnement Premium optionnel donnant accès à
            des quotas étendus, à des éléments narratifs supplémentaires et à
            des fonctionnalités avancées. L&apos;abonnement est proposé selon
            les formules en vigueur dans l&apos;application, généralement{" "}
            <strong>mensuelles ou annuelles</strong>.
          </p>
          <p>
            La souscription et la gestion de l&apos;abonnement sont opérées
            exclusivement via les plateformes officielles de distribution (App
            Store d&apos;Apple ou Google Play), avec l&apos;intermédiaire
            technique de <strong>RevenueCat</strong> pour la synchronisation des
            droits d&apos;accès.
          </p>
          <ul>
            <li>
              <strong>Renouvellement automatique</strong> : sauf résiliation par
              vos soins au moins 24 heures avant l&apos;échéance,
              l&apos;abonnement se renouvelle automatiquement pour une période
              identique, au tarif en vigueur, et est débité par la plateforme
              correspondante.
            </li>
            <li>
              <strong>Gestion et résiliation</strong> : la résiliation, la
              modification ou le changement de formule s&apos;effectuent
              directement depuis les réglages de votre compte App Store ou
              Google Play, à tout moment et sans frais.
            </li>
            <li>
              <strong>Période d&apos;essai</strong> : lorsqu&apos;une période
              d&apos;essai gratuite est proposée, la partie non utilisée est
              perdue dès lors qu&apos;un abonnement payant est activé pendant
              cette période.
            </li>
          </ul>
        </LegalSection>

        <LegalSection
          id="paiements"
          index={11}
          title="Paiements et remboursements"
        >
          <p>
            Les paiements sont traités intégralement par les plateformes Apple
            ou Google. {SITE_NAME}{" "}
            <strong>
              ne stocke ni ne traite aucune donnée de carte bancaire
            </strong>{" "}
            et n&apos;a pas accès aux moyens de paiement utilisés.
          </p>
          <p>
            Toute demande de remboursement relève de la politique applicable de
            la plateforme concernée :
          </p>
          <ul>
            <li>
              pour iOS : via le service <em>Signaler un problème</em>{" "}
              d&apos;Apple ;
            </li>
            <li>
              pour Android : via la rubrique de remboursement de Google Play.
            </li>
          </ul>
          <p>
            {SITE_NAME} n&apos;est pas en mesure de procéder à des
            remboursements en dehors de ces canaux officiels, mais peut, à sa
            discrétion et en cas d&apos;incident technique majeur de son fait,
            créditer des avantages dans l&apos;application.
          </p>
        </LegalSection>

        <LegalSection
          id="propriete"
          index={12}
          title="Propriété intellectuelle"
        >
          <p>
            L&apos;application {SITE_NAME}, son code source, sa charte
            graphique, son identité visuelle, ses illustrations, ses
            personnages, ses textes d&apos;interface, sa marque et
            l&apos;ensemble des éléments qui la composent sont protégés par les
            législations applicables en matière de droit d&apos;auteur, de
            marques et de propriété intellectuelle. Toute reproduction,
            représentation, modification ou exploitation non expressément
            autorisée est interdite.
          </p>
          <p>
            En utilisant le service, {SITE_NAME} vous concède une licence
            personnelle, limitée, non exclusive, non transférable et révocable,
            strictement destinée à un usage privé et familial conforme aux
            présentes CGU.
          </p>
        </LegalSection>

        <LegalSection
          id="contenus-generes"
          index={13}
          title="Contenus générés par l'utilisateur"
        >
          <p>
            Les histoires, textes, audios et compositions visuelles générés à
            partir de vos prompts et sélections vous sont mis à disposition pour
            un <strong>usage personnel et familial</strong>. Compte tenu de la
            nature probabiliste de la génération par IA, {SITE_NAME} ne peut
            garantir :
          </p>
          <ul>
            <li>
              l&apos;<strong>unicité</strong> des contenus produits : des
              histoires similaires peuvent être générées pour d&apos;autres
              utilisateurs à partir de prompts proches ;
            </li>
            <li>
              l&apos;absence de ressemblance fortuite avec des œuvres
              préexistantes ;
            </li>
            <li>
              la stabilité du contenu dans le temps en cas d&apos;évolution des
              modèles sous-jacents.
            </li>
          </ul>
          <p>
            Vous vous interdisez toute exploitation commerciale des contenus
            générés, ainsi que toute publication présentant ces contenus comme
            une création humaine originale.
          </p>
        </LegalSection>

        <LegalSection
          id="resiliation"
          index={14}
          title="Suspension et résiliation"
        >
          <p>
            En cas de manquement aux présentes CGU, de comportement abusif, de
            tentative de contournement des limitations techniques, de fraude au
            paiement ou de mise en danger d&apos;un mineur, {SITE_NAME} se
            réserve le droit, sans préavis et sans indemnité :
          </p>
          <ul>
            <li>de suspendre temporairement l&apos;accès au compte ;</li>
            <li>de supprimer les contenus en cause ;</li>
            <li>
              de résilier définitivement le compte et de refuser toute
              réinscription ultérieure.
            </li>
          </ul>
          <p>
            Vous conservez la possibilité de résilier votre compte à tout moment
            via la procédure décrite ci-dessous.
          </p>
        </LegalSection>

        <LegalSection id="suppression" index={15} title="Suppression de compte">
          <p>
            Vous pouvez à tout moment demander la suppression de votre compte et
            des données associées. La procédure officielle, conforme aux
            exigences des stores, est décrite sur la page dédiée :
          </p>
          <p className="not-prose">
            <Link
              href="/delete-account"
              className="inline-flex items-center gap-2 rounded-button bg-conteo-accent px-5 py-3 font-semibold text-conteo-dark transition-transform hover:scale-[1.02]"
            >
              Procédure de suppression de compte →
            </Link>
          </p>
          <p>
            La suppression est définitive et entraîne la perte de
            l&apos;ensemble des histoires sauvegardées, statistiques, badges et
            favoris associés au compte, sous réserve des données devant être
            conservées pour des raisons légales, de sécurité ou de prévention de
            la fraude.
          </p>
        </LegalSection>

        <LegalSection
          id="disponibilite"
          index={16}
          title="Disponibilité du service"
        >
          <p>
            {SITE_NAME} est fourni « <strong>en l&apos;état</strong> » et «
            selon disponibilité ». Nous mettons en œuvre des efforts
            raisonnables pour assurer la continuité du service, mais ne pouvons
            garantir une disponibilité ininterrompue. Le service peut être
            temporairement indisponible, notamment en cas de :
          </p>
          <ul>
            <li>maintenance planifiée ou d&apos;urgence ;</li>
            <li>
              incident sur l&apos;infrastructure ou chez l&apos;un de nos
              sous-traitants techniques ;
            </li>
            <li>
              cas de force majeure, attaque informatique ou panne réseau ;
            </li>
            <li>
              déploiement d&apos;une mise à jour via{" "}
              <strong>Expo Updates</strong>.
            </li>
          </ul>
        </LegalSection>

        <LegalSection
          id="responsabilite"
          index={17}
          title="Limitation de responsabilité"
        >
          <p>
            Dans la limite autorisée par la loi applicable, {SITE_NAME} ne
            saurait être tenu responsable :
          </p>
          <ul>
            <li>
              des conséquences résultant de l&apos;exposition d&apos;un mineur à
              un contenu généré sans supervision parentale appropriée ;
            </li>
            <li>
              des erreurs, biais ou imperfections inhérents à la génération par
              intelligence artificielle ;
            </li>
            <li>
              des pertes de données résultant d&apos;un incident technique, de
              la suppression volontaire du compte ou de la désinstallation de
              l&apos;application ;
            </li>
            <li>
              des dommages indirects, perte d&apos;exploitation, perte de
              chance, perte de données ou préjudice moral subis par
              l&apos;utilisateur ou un tiers.
            </li>
          </ul>
          <p>
            Aucune disposition des présentes CGU ne saurait limiter la
            responsabilité de {SITE_NAME} pour les dommages qui ne peuvent
            légalement être exclus, notamment en cas de faute lourde ou
            intentionnelle.
          </p>
        </LegalSection>

        <LegalSection
          id="modifications"
          index={18}
          title="Modifications des CGU"
        >
          <p>
            {SITE_NAME} se réserve le droit de modifier les présentes CGU à tout
            moment, notamment pour refléter les évolutions du service, les
            exigences réglementaires ou les retours utilisateurs. La date de
            mise à jour figure en tête du document.
          </p>
          <p>
            En cas de modification substantielle, vous serez informé via
            l&apos;application ou par email. La poursuite de l&apos;utilisation
            du service après notification vaut acceptation des nouvelles
            conditions. En cas de désaccord, vous pouvez à tout moment résilier
            votre compte.
          </p>
        </LegalSection>

        <LegalSection
          id="droit-applicable"
          index={19}
          title="Droit applicable et juridiction"
        >
          <p>
            Les présentes CGU sont régies par le <strong>droit français</strong>
            . En cas de litige, et préalablement à toute action judiciaire, vous
            êtes invité à nous contacter à l&apos;adresse{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> afin de
            rechercher une solution amiable.
          </p>
          <p>
            À défaut d&apos;accord amiable, et sous réserve des règles
            impératives de protection des consommateurs, les tribunaux français
            compétents seront seuls compétents. Vous conservez la faculté de
            recourir à une procédure de médiation de la consommation
            conformément à la réglementation applicable.
          </p>
        </LegalSection>

        <LegalSection id="contact" index={20} title="Contact">
          <p>
            Pour toute question relative aux présentes Conditions
            d&apos;utilisation, vous pouvez nous écrire à :
          </p>
          <p className="not-prose">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-heading text-lg font-bold text-conteo-secondary hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
