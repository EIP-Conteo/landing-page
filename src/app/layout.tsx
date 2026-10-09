import type { Metadata, Viewport } from "next";
import { Nunito, Rubik } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { faqs } from "@/content/faq";
import { PLAY_STORE_URL, PRICING } from "@/lib/site";
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

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.conteo.xyz").replace(/\/+$/, "");
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
    default: "Contéo : l'histoire du soir inventée par votre enfant",
    template: "%s | Contéo",
  },
  description:
    "Votre enfant choisit ses héros, un objet magique et un décor : Contéo crée une histoire unique, racontée d'une voix douce. Gratuit, sans publicité, de 0 à 8 ans.",
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
    "histoire du soir audio",
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
    title: "Contéo : ce soir, c'est votre enfant qui invente l'histoire",
    description:
      "Ses héros, un objet magique, un décor : Contéo en fait une histoire unique, racontée d'une voix douce. Gratuit, sans publicité, de 0 à 8 ans.",
    url: SITE_URL,
    locale: "fr_FR",
    images: [
      {
        url: "/og-image.png?v=2",
        width: 1200,
        height: 630,
        alt: "Contéo - Application d'histoires personnalisées pour enfants",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contéo : ce soir, c'est votre enfant qui invente l'histoire",
    description:
      "Ses héros, un objet magique, un décor : Contéo en fait une histoire unique, racontée d'une voix douce. Gratuit et sans publicité.",
    images: ["/og-image.png?v=2"],
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
        operatingSystem: "Android",
        applicationCategory: "EducationalApplication",
        installUrl: PLAY_STORE_URL,
        contentRating: "PEGI 3",
        description:
          "Contéo crée des histoires personnalisées pour les enfants de 0 à 8 ans : l'enfant choisit ses héros, un objet et un décor, et l'application génère une histoire unique à lire, écouter ou vivre en roman visuel.",
        offers: [
          {
            "@type": "Offer",
            name: "Gratuit",
            price: "0",
            priceCurrency: "EUR",
          },
          {
            "@type": "Offer",
            name: "Premium mensuel",
            price: PRICING.monthlyAmount,
            priceCurrency: "EUR",
          },
          {
            "@type": "Offer",
            name: "Premium annuel",
            price: PRICING.yearlyAmount,
            priceCurrency: "EUR",
          },
        ],
        author: {
          "@id": `${SITE_URL}/#organization`,
        },
        screenshot: `${SITE_URL}/images/app/choix-heros.png`,
        featureList: [
          "Histoires personnalisées pour enfants de 0 à 8 ans",
          "Modes livre, audio et roman visuel",
          "Narration audio douce à vitesse réglable",
          "Personnages et objets dessinés par l'enfant, intégrés au roman visuel (Premium)",
          "Mode sombre",
          "Histoires téléchargeables hors ligne (Premium)",
          "Sans publicité",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <html lang="fr" dir="ltr">
      <head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </head>
      <body className={`${nunito.variable} ${rubik.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
