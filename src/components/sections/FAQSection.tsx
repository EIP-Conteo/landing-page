import { faqs } from "@/content/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-white py-24 md:py-32">
      <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            id="faq-title"
            align="start"
            eyebrow="Questions fréquentes"
            title="Vous vous demandez sûrement…"
            description={
              <>
                Une autre question ?{" "}
                <a href="/feedback" className="font-semibold text-conteo-secondary hover:underline">
                  Écrivez-nous
                </a>
                , on répond vite.
              </>
            }
            className="lg:sticky lg:top-28"
          />
        </Reveal>

        <Reveal delay={100}>
          <Accordion type="single" collapsible defaultValue="item-0" className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="rounded-[1.5rem] border-none bg-[#f7f7fd] px-6 ring-1 ring-transparent transition-all data-[state=open]:bg-white data-[state=open]:ring-conteo-dark/5 data-[state=open]:shadow-[0_20px_40px_-25px_rgba(42,42,66,0.35)]"
              >
                <AccordionTrigger className="py-5 text-left font-sans text-base font-semibold text-conteo-dark hover:no-underline md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 font-sans text-base leading-relaxed text-conteo-text-muted">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
