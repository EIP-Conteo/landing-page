import type { ReactElement, ReactNode } from "react";

interface LegalSectionProps {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}

export function LegalSection({
  id,
  index,
  title,
  children,
}: Readonly<LegalSectionProps>): ReactElement {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28 border-t border-conteo-light/80 pt-10 first:border-t-0 first:pt-0 md:scroll-mt-32 md:pt-12"
    >
      <div className="flex items-baseline gap-4">
        <span
          aria-hidden="true"
          className="font-heading text-sm font-extrabold tracking-wider text-conteo-secondary/70"
        >
          {String(index).padStart(2, "0")}
        </span>
        <h2
          id={`${id}-heading`}
          className="font-heading text-2xl font-extrabold tracking-tight text-conteo-dark md:text-3xl"
        >
          {title}
        </h2>
      </div>

      <div className="legal-prose mt-6 space-y-4 text-base leading-7 text-conteo-dark/85 md:text-[17px] md:leading-8">
        {children}
      </div>
    </section>
  );
}
