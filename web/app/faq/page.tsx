import type { Metadata } from "next";
import Container from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { strapiFetch, type StrapiList, type FaqItemData } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Antwoorden op veelgestelde vragen over catering aanvragen, betalen, menu en meer.",
};

type FaqEntry = {
  category: string;
  question: string;
  answer: string;
};

const categoryLabels: Record<string, string> = {
  bestellen: "Bestellen",
  betalen: "Betalen",
  menu: "Menu & Aanbod",
  catering: "Catering",
  overig: "Overig",
};

async function getAllFaqs(): Promise<FaqEntry[]> {
  const res = await strapiFetch<StrapiList<FaqItemData>>({
    path: "/faq-items?sort=sort_order:asc&pagination[limit]=50&filters[publishedAt][$notNull]=true",
    next: { revalidate: 3 },
  });

  if (!res?.data?.length) return [];

  return res.data.map((item) => ({
    category: item.category ?? "overig",
    question: item.question,
    answer: item.answer,
  }));
}

export default async function FaqPage() {
  const faqs = await getAllFaqs();
  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        {/* Header */}
        <div className="mb-14">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            FAQ
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            Veelgestelde vragen
          </h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Staat je vraag er niet bij? Neem gerust{" "}
            <a
              href="/contact"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              contact
            </a>{" "}
            met ons op.
          </p>
        </div>

        {faqs.length === 0 ? (
          <div className="rounded-2xl border border-border/70 bg-card/80 px-8 py-16 text-center">
            <p className="text-base font-medium text-foreground">
              Binnenkort meer vragen en antwoorden.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Ondertussen beantwoorden we je vraag graag persoonlijk —{" "}
              <a
                href="/contact"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                neem contact op
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((cat) => (
              <div key={cat}>
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {categoryLabels[cat] ?? cat}
                  </span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {faqs
                    .filter((f) => f.category === cat)
                    .map((faq, i) => (
                      <AccordionItem key={faq.question} value={`${cat}-${i}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
