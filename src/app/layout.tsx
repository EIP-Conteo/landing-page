import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Contéo - Des histoires magiques créées par votre enfant",
  description:
    "Contéo génère des histoires personnalisées pour enfants. Choisissez les personnages, objets et décors, et laissez la magie opérer avec du texte, de l'audio et des visuels uniques.",
  openGraph: {
    title: "Contéo - Des histoires magiques créées par votre enfant",
    description:
      "Votre enfant choisit ses personnages préférés, Contéo crée une histoire unique avec texte, audio et visuels générés.",
    images: ["/logo.png"],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contéo - Des histoires magiques créées par votre enfant",
    description:
      "Votre enfant choisit ses personnages préférés, Contéo crée une histoire unique avec texte, audio et visuels générés.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${nunito.variable} ${rubik.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
