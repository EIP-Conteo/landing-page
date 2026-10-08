import { Ban, Baby, MapPin, ShieldCheck } from "lucide-react";

const items = [
  { icon: Baby, title: "0 à 8 ans", text: "Niveau de lecture adapté" },
  { icon: Ban, title: "Sans publicité", text: "Ni pub, ni revente de données" },
  { icon: ShieldCheck, title: "PEGI 3", text: "Classé tout public sur Google Play" },
  { icon: MapPin, title: "Fait à Marseille", text: "Une petite équipe à l'écoute" },
];

export function TrustBar() {
  return (
    <section aria-label="Nos engagements" className="relative border-b border-conteo-dark/5 bg-white">
      <ul className="container mx-auto grid grid-cols-2 gap-x-6 gap-y-8 px-6 py-10 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-conteo-light text-conteo-secondary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-sans text-sm font-semibold text-conteo-dark md:text-base">{title}</span>
              <span className="block font-sans text-xs text-conteo-text-muted md:text-sm">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
