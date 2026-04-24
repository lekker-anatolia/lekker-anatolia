import Link from "next/link";
import Container from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { strapiFetch, type StrapiList, type FaqItemData } from "@/lib/strapi";

type FaqPreviewItem = {
  question: string;
  answer: string;
};

async function getFaqItems(): Promise<FaqPreviewItem[]> {
  const res = await strapiFetch<StrapiList<FaqItemData>>({
    path: "/faq-items?sort=sort_order:asc&pagination[limit]=5&filters[publishedAt][$notNull]=true",
    next: { revalidate: 3 },
  });

  if (!res?.data?.length) return [];

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

  // Hide the whole section when Strapi has no published FAQ items.
  if (faqs.length === 0) return null;

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
