import type { Metadata, Viewport } from "next";
import { Nunito, Rubik } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://conteo-landing.vercel.app";
const SITE_NAME = "Contéo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2a2a42" },
    { media: "(prefers-color-scheme: dark)", color: "#2a2a42" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Contéo - Histoires personnalisées pour enfants | App iOS & Android",
    template: "%s | Contéo",
  },
  description:
    "Contéo crée des histoires magiques personnalisées pour vos enfants de 3 à 12 ans. Choisissez personnages, objets et décors. Texte, narration audio et illustrations uniques générés par IA.",
  keywords: [
    "histoires pour enfants",
    "contes personnalisés",
    "application enfants",
    "histoires audio",
    "livre interactif",
    "histoire du soir",
    "conte de fées",
    "IA pour enfants",
    "narration audio enfants",
    "app éducative",
    "créativité enfants",
    "histoires illustrées",
    "personnages mignons",
    "application famille",
    "Contéo",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Contéo - Histoires magiques créées par votre enfant",
    description:
      "Votre enfant choisit ses personnages préférés, Contéo crée une histoire unique avec texte, narration audio et illustrations générés par IA. Pour les 3-12 ans.",
    url: SITE_URL,
    locale: "fr_FR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contéo - Application d'histoires personnalisées pour enfants",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contéo - Histoires magiques créées par votre enfant",
    description:
      "Votre enfant choisit ses personnages préférés, Contéo crée une histoire unique avec texte, audio et visuels générés par IA.",
    images: ["/og-image.png"],
    creator: "@conteo_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "education",
  classification: "Application mobile pour enfants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: "Application d'histoires personnalisées pour enfants",
        inLanguage: "fr-FR",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
          width: 512,
          height: 512,
        },
        sameAs: [
          "https://twitter.com/conteo_app",
          "https://www.instagram.com/conteo_app",
          "https://www.facebook.com/conteoapp",
        ],
      },
      {
        "@type": "MobileApplication",
        "@id": `${SITE_URL}/#app`,
        name: SITE_NAME,
        operatingSystem: "iOS, Android",
        applicationCategory: "EducationalApplication",
        description:
          "Contéo crée des histoires magiques personnalisées pour vos enfants. Choisissez personnages, objets et décors pour générer texte, audio et illustrations uniques.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
          description: "Téléchargement gratuit",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "10000",
          bestRating: "5",
          worstRating: "1",
        },
        author: {
          "@id": `${SITE_URL}/#organization`,
        },
        screenshot: `${SITE_URL}/og-image.png`,
        featureList: [
          "Histoires personnalisées",
          "Narration audio",
          "Illustrations générées par IA",
          "Personnages adorables",
          "Pour enfants de 3 à 12 ans",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Pour quel âge est Contéo ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Contéo est conçu pour les enfants de 3 à 12 ans. Les histoires s'adaptent automatiquement à l'âge de l'enfant pour offrir un contenu approprié et captivant.",
            },
          },
          {
            "@type": "Question",
            name: "Comment fonctionne Contéo ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Votre enfant choisit ses personnages, objets et décors préférés parmi notre galerie adorable. Contéo génère ensuite une histoire unique avec du texte, une narration audio et des illustrations personnalisées.",
            },
          },
          {
            "@type": "Question",
            name: "Contéo est-il gratuit ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Contéo est gratuit à télécharger avec des histoires gratuites chaque jour. Un abonnement premium offre un accès illimité à toutes les fonctionnalités et personnages.",
            },
          },
          {
            "@type": "Question",
            name: "Les histoires sont-elles sûres pour les enfants ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolument ! Toutes les histoires générées sont adaptées aux enfants, sans contenu inapproprié. Notre IA est spécialement entraînée pour créer des contes bienveillants et éducatifs.",
            },
          },
          {
            "@type": "Question",
            name: "Puis-je utiliser Contéo hors connexion ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Une connexion internet est nécessaire pour générer de nouvelles histoires. Cependant, les histoires déjà créées peuvent être sauvegardées et écoutées hors ligne.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="fr" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${nunito.variable} ${rubik.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
