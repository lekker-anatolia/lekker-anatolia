import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    title: "1. Neem contact op",
    description:
      "Stuur ons een bericht via WhatsApp en vertel ons waar je naar op zoek bent.",
  },
  {
    title: "2. We denken met je mee",
    description:
      "Samen bespreken we de wensen, het moment en de mogelijkheden.",
  },
  {
    title: "3. Heldere afstemming",
    description:
      "Je ontvangt een duidelijke terugkoppeling en weet precies wat de volgende stap is.",
  },
];

export default function HowToOrderSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Hoe werkt het
          </p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">
            Eenvoudig contact, persoonlijke afstemming
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.title}
              className="rounded-[1.75rem] border-border/70 bg-card/80 shadow-none"
            >
              <CardContent className="p-8">
                <h3 className="font-serif text-2xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
