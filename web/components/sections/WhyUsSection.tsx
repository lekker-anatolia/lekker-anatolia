import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { HeartHandshake, MessageCircle, CalendarCheck } from "lucide-react";

const items = [
  {
    icon: HeartHandshake,
    title: "Met zorg bereid",
    description:
      "Elk gerecht wordt met liefde en aandacht bereid. We kiezen voor verse ingrediënten en authentieke Anatolische smaken die elke gelegenheid bijzonder maken.",
  },
  {
    icon: MessageCircle,
    title: "Persoonlijk contact",
    description:
      "Geen ingewikkelde bestelstraat. Gewoon direct contact via WhatsApp — snel, helder en persoonlijk. We denken graag met je mee over jouw wensen.",
  },
  {
    icon: CalendarCheck,
    title: "Geschikt voor elk moment",
    description:
      "Van een intiem dinertje tot een groot zakelijk evenement. Lekker Anatolia verzorgt catering op maat voor elke gelegenheid en groepsgrootte.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Waarom kiezen voor ons
          </p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">
            Een rustige, stijlvolle cateringervaring
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="rounded-[1.75rem] border-border/70 bg-card/80 shadow-none transition-shadow hover:shadow-md"
              >
                <CardContent className="p-8">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
