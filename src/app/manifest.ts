import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Contéo - Histoires magiques pour enfants",
    short_name: "Contéo",
    description:
      "Créez des histoires personnalisées pour vos enfants avec personnages, narration audio et illustrations générés par IA.",
    start_url: "/",
    display: "standalone",
    background_color: "#2a2a42",
    theme_color: "#2a2a42",
    orientation: "portrait",
    scope: "/",
    lang: "fr",
    categories: ["education", "entertainment", "kids"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/og-image.png",
        sizes: "1200x630",
        type: "image/png",
      },
    ],
  };
}
