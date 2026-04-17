import Link from "next/link";
import Container from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { strapiFetch, type StrapiList, type FaqItemData } from "@/lib/strapi";

const staticFaqs = [
  {
    question: "Hoe kan ik catering aanvragen?",
    answer:
      "Stuur ons een bericht via WhatsApp of gebruik het contactformulier op onze website. We nemen daarna zo snel mogelijk contact met je op om de details te bespreken.",
  },
  {
    question: "Voor welke gelegenheden verzorgen jullie catering?",
    answer:
      "Wij verzorgen catering voor uiteenlopende gelegenheden: verjaardagsfeesten, bedrijfsbijeenkomsten, bruiloften, familiebijeenkomsten en meer. Neem contact op om te bespreken wat wij voor jou kunnen betekenen.",
  },
  {
    question: "Hoe ver van tevoren moet ik bestellen?",
    answer:
      "We raden aan om minimaal 3 tot 5 werkdagen van tevoren contact op te nemen, zodat we voldoende tijd hebben om alles zorgvuldig voor te bereiden. Voor grotere evenementen is meer voorbereidingstijd gewenst.",
  },
  {
    question: "Kan ik het menu aanpassen?",
    answer:
      "Jazeker. We denken graag met je mee over een aanbod dat past bij jouw gelegenheid, dieetwensen en budget. Bespreek je wensen via WhatsApp of ons contactformulier.",
  },
  {
    question: "Hoe werkt de betaling?",
    answer:
      "Na het bespreken van je aanvraag ontvang je een offerte op maat. Betaling verloopt momenteel via overboeking. We werken aan uitbreiding van betaalmogelijkheden.",
  },
];

async function getFaqItems(): Promise<typeof staticFaqs> {
  const res = await strapiFetch<StrapiList<FaqItemData>>({
    path: "/faq-items?sort=sort_order:asc&pagination[limit]=5&filters[publishedAt][$notNull]=true",
    next: { revalidate: 300 },
  });

  if (!res?.data?.length) return staticFaqs;

  return res.data.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));
}

interface FaqPreviewProps {
  showViewAll?: boolean;
}

export default async function FaqPreview({ showViewAll = true }: FaqPreviewProps) {
  const faqs = await getFaqItems();

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              FAQ
            </p>
            <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">
              Veelgestelde vragen
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Hier vind je snel antwoord op de belangrijkste vragen.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {showViewAll && (
            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="text-sm font-medium text-accent underline underline-offset-4 hover:text-accent/80 transition-colors"
              >
                Alle vragen bekijken →
              </Link>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
