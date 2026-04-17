import type { Metadata } from "next";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description: "Privacyverklaring van Lekker Anatolia.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Juridisch
        </p>
        <h1 className="text-4xl font-semibold">Privacyverklaring</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Laatst bijgewerkt: april 2026
        </p>

        <Separator className="my-8 opacity-50" />

        <div className="space-y-8 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              1. Wie zijn wij?
            </h2>
            <p>
              Lekker Anatolia is een cateringbedrijf gevestigd in Nederland. Wij
              zijn verantwoordelijk voor de verwerking van persoonsgegevens die
              via onze website worden verzameld.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              2. Welke gegevens verzamelen wij?
            </h2>
            <p>Wij kunnen de volgende persoonsgegevens verwerken:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Naam en voornaam</li>
              <li>E-mailadres</li>
              <li>Telefoonnummer</li>
              <li>Berichten die je ons stuurt via het contactformulier</li>
              <li>
                IP-adres en browsergegevens (via analytische cookies, indien van
                toepassing)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              3. Waarvoor gebruiken wij je gegevens?
            </h2>
            <p>Wij gebruiken je gegevens uitsluitend voor:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Het beantwoorden van je vragen en aanvragen</li>
              <li>Het uitvoeren van catering-overeenkomsten</li>
              <li>Het verbeteren van onze dienstverlening</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              4. Grondslag voor verwerking
            </h2>
            <p>
              Wij verwerken je gegevens op basis van jouw toestemming (bij het
              invullen van het contactformulier) of voor de uitvoering van een
              overeenkomst.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              5. Bewaartermijn
            </h2>
            <p>
              Wij bewaren je gegevens niet langer dan noodzakelijk voor de
              doeleinden waarvoor ze zijn verzameld, tenzij een wettelijke
              bewaarplicht anders vereist.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              6. Delen met derden
            </h2>
            <p>
              Wij verkopen je gegevens nooit aan derden. We kunnen wel gebruik
              maken van dienstverleners (zoals hostingproviders) die uitsluitend
              in opdracht van ons handelen en gebonden zijn aan strikte
              geheimhoudingsafspraken.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              7. Jouw rechten
            </h2>
            <p>Op grond van de AVG heb je de volgende rechten:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Recht op inzage in je persoonsgegevens</li>
              <li>Recht op rectificatie of aanvulling</li>
              <li>Recht op verwijdering ("recht om vergeten te worden")</li>
              <li>Recht op beperking van de verwerking</li>
              <li>Recht op gegevensoverdraagbaarheid</li>
              <li>Recht van bezwaar</li>
            </ul>
            <p className="mt-3">
              Om een van deze rechten uit te oefenen, neem je contact met ons op
              via het{" "}
              <a
                href="/contact"
                className="underline underline-offset-4 hover:text-foreground"
              >
                contactformulier
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              8. Klachten
            </h2>
            <p>
              Heb je een klacht over de manier waarop wij met je gegevens
              omgaan? Je kunt een klacht indienen bij de Autoriteit
              Persoonsgegevens via{" "}
              <a
                href="https://www.autoriteitpersoonsgegevens.nl"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-foreground"
              >
                autoriteitpersoonsgegevens.nl
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              9. Wijzigingen
            </h2>
            <p>
              Wij behouden ons het recht voor deze privacyverklaring te
              wijzigen. De meest actuele versie is altijd te vinden op deze
              pagina.
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
