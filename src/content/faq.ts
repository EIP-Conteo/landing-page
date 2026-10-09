import { PRICING } from "@/lib/site";

export interface FaqItem {
  question: string;
  answer: string;
}

/** Source unique : affichée dans la FAQ et reprise dans le JSON-LD (layout). */
export const faqs: FaqItem[] = [
  {
    question: "Pour quel âge est Contéo ?",
    answer:
      "Contéo est conçu pour les enfants de 0 à 8 ans. Vous choisissez le niveau de lecture à chaque histoire : le vocabulaire et la complexité de l'histoire s'adaptent à l'âge de votre enfant.",
  },
  {
    question: "Comment ça marche, concrètement ?",
    answer:
      "Votre enfant choisit ses héros, un objet magique et un décor. Vous réglez la longueur, le niveau de lecture et le mode (texte, audio ou roman visuel), puis Contéo écrit une histoire unique, prête à être lue ou écoutée.",
  },
  {
    question: "Combien ça coûte ?",
    answer: `Contéo se télécharge gratuitement et permet de créer plusieurs histoires gratuites chaque jour. L'abonnement Premium (${PRICING.monthly} par mois ou ${PRICING.yearly} par an) débloque les histoires illimitées, le roman visuel, les mini-jeux, les personnages et objets dessinés par votre enfant, et le téléchargement hors ligne. Il se gère et se résilie à tout moment depuis votre compte Google Play.`,
  },
  {
    question: "Mon enfant peut-il dessiner ses propres personnages ?",
    answer:
      "Oui, avec Premium. Votre enfant dessine ses personnages et ses objets, Contéo les intègre à l'histoire et il les retrouve à l'écran dans le mode roman visuel.",
  },
  {
    question: "Les histoires sont-elles adaptées aux enfants ?",
    answer:
      "Oui. Les histoires sont générées pour un jeune public, avec des thèmes bienveillants et un niveau de langage adapté à l'âge choisi. L'application ne contient aucune publicité.",
  },
  {
    question: "Encore un écran avant de dormir ?",
    answer:
      "Justement, non : en mode audio, l'histoire est racontée par une voix douce et l'écran peut rester posé. Et un mode sombre adoucit l'écran le soir.",
  },
  {
    question: "Puis-je utiliser Contéo hors connexion ?",
    answer:
      "Une connexion est nécessaire pour créer une nouvelle histoire. Avec Premium, vous pouvez ensuite télécharger vos histoires pour les retrouver hors ligne, en voyage ou chez les grands-parents.",
  },
  {
    question: "Et sur iPhone ?",
    answer:
      "Contéo est disponible dès maintenant sur Android via Google Play. La version iPhone est en préparation : laissez votre email dans la section dédiée et nous vous prévenons dès son ouverture.",
  },
  {
    question: "Que faites-vous des données de mon enfant ?",
    answer:
      "Nous gardons le strict minimum, et ces informations ne sont jamais revendues ni utilisées pour de la publicité. Vous pouvez supprimer votre compte et tout son contenu à tout moment. Tous les détails sont dans notre politique de confidentialité.",
  },
];
