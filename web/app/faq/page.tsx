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

const staticFaqs = [
  {
    category: "bestellen",
    question: "Hoe kan ik catering aanvragen?",
    answer:
      "Stuur ons een bericht via WhatsApp of gebruik het contactformulier. We nemen daarna zo snel mogelijk contact met je op om de details te bespreken.",
  },
  {
    category: "bestellen",
    question: "Hoe ver van tevoren moet ik bestellen?",
    answer:
      "We raden aan om minimaal 3 tot 5 werkdagen van tevoren contact op te nemen. Voor grotere evenementen is meer voorbereidingstijd gewenst.",
  },
  {
    category: "menu",
    question: "Welke gerechten bieden jullie aan?",
    answer:
      "Wij bieden een gevarieerd aanbod van authentieke Anatolische gerechten, waaronder lahmacun, pide, diverse mezze en meer. Neem contact op voor een actueel overzicht.",
  },
  {
    category: "menu",
    question: "Kunnen jullie rekening houden met dieetwensen?",
    answer:
      "Ja. We houden rekening met vegetarische, veganistische en halal wensen. Vermeld je wensen bij je aanvraag.",
  },
  {
    category: "catering",
    question: "Voor welke gelegenheden verzorgen jullie catering?",
    answer:
      "Verjaardagsfeesten, bedrijfsbijeenkomsten, bruiloften, familiebijeenkomsten en meer. Neem contact op om te bespreken wat wij voor jou kunnen doen.",
  },
  {
    category: "catering",
    question: "Bezorgen jullie ook aan huis?",
    answer:
      "We kijken per aanvraag naar de mogelijkheden op basis van locatie en wensen.",
  },
  {
    category: "betalen",
    question: "Hoe werkt de betaling?",
    answer:
      "Na het bespreken van je aanvraag ontvang je een offerte op maat. Betaling verloopt momenteel via overboeking.",
  },
  {
    category: "betalen",
    question: "Moet ik een aanbetaling doen?",
    answer:
      "Voor grotere opdrachten kan een aanbetaling gevraagd worden. Dit wordt bij de offerte aangegeven.",
  },
  {
    category: "overig",
    question: "Kan ik het menu aanpassen?",
    answer:
      "Jazeker. We denken graag met je mee over een aanbod dat past bij jouw gelegenheid, dieetwensen en budget.",
  },
  {
    category: "overig",
    question: "Hoe neem ik contact op?",
    answer:
      "Via WhatsApp, het contactformulier of per e-mail. We reageren doorgaans binnen 24 uur op werkdagen.",
  },
];

const categoryLabels: Record<string, string> = {
  bestellen: "Bestellen",
  betalen: "Betalen",
  menu: "Menu & Aanbod",
  catering: "Catering",
  overig: "Overig",
};

async function getAllFaqs() {
  const res = await strapiFetch<StrapiList<FaqItemData>>({
    path: "/faq-items?sort=sort_order:asc&pagination[limit]=50&filters[publishedAt][$notNull]=true",
    next: { revalidate: 300 },
  });

  if (!res?.data?.length) return staticFaqs;

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

        {/* Categories */}
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
      </Container>
    </section>
  );
}
