import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Leer Lekker Anatolia kennen — een cateringbedrijf met een warme Anatolische touch, opgericht vanuit passie voor smaak en gastvrijheid.",
};

const values = [
  {
    title: "Ambacht boven snelheid",
    description:
      "We nemen de tijd om elk gerecht met zorg te bereiden. Verse ingrediënten, traditionele recepten en een oog voor detail maken het verschil.",
  },
  {
    title: "Eerlijk & transparant",
    description:
      "Geen verborgen kosten, geen verrassingen. Je weet van tevoren wat je kunt verwachten — zowel qua smaak als qua prijs.",
  },
  {
    title: "Persoonlijke aanpak",
    description:
      "Elk evenement is anders. Wij luisteren naar jouw wensen en stellen een voorstel op maat samen, afgestemd op jouw gelegenheid en budget.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <Container className="max-w-5xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Over ons
              </p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Smaak, aandacht
                <span className="block text-accent">en eenvoud</span>
              </h1>
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                Lekker Anatolia is ontstaan vanuit een eenvoudige overtuiging:
                goed eten brengt mensen samen. Wij combineren de rijke
                Anatolische keuken met een moderne, toegankelijke aanpak — zodat
                jij kunt genieten zonder gedoe.
              </p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Of het nu gaat om een verjaardagsfeest, een bedrijfsbijeenkomst
                of een informeel samenzijn — wij zorgen voor een verzorgde
                cateringervaring die indruk maakt.
              </p>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Image
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80"
                alt="Ambachtelijk bereide Anatolische gerechten"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <Separator className="opacity-50" />

      {/* Values */}
      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              Waar we voor staan
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Onze waarden
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title}>
                <h3 className="font-serif text-xl font-semibold">{v.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Separator className="opacity-50" />

      {/* Story */}
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Ons verhaal
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Hoe het begon
          </h2>
          <div className="mt-6 space-y-4 text-base leading-8 text-muted-foreground">
            <p>
              Lekker Anatolia is opgericht vanuit een diepe passie voor de
              Anatolische keuken — een keuken die al duizenden jaren wordt
              doorgegeven van generatie op generatie, vol smaak, warmte en
              gastvrijheid.
            </p>
            <p>
              Wij geloven dat catering meer is dan alleen eten leveren. Het gaat
              om de beleving, de sfeer en het gevoel dat je gasten mee naar huis
              nemen. Daarom benaderen we elk verzoek met dezelfde zorg als
              waarmee we koken: met aandacht voor detail en een glimlach.
            </p>
            <p>
              Ben je benieuwd wat we voor jouw gelegenheid kunnen betekenen?
              Neem gerust contact met ons op via WhatsApp — we beantwoorden al
              je vragen graag persoonlijk.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
