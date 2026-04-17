import type { Metadata } from "next";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Gebruiksvoorwaarden",
  description: "Gebruiksvoorwaarden van Lekker Anatolia.",
};

export default function TermsOfUsePage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Juridisch
        </p>
        <h1 className="text-4xl font-semibold">Gebruiksvoorwaarden</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Laatst bijgewerkt: april 2026
        </p>

        <Separator className="my-8 opacity-50" />

        <div className="space-y-8 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              1. Acceptatie van de voorwaarden
            </h2>
            <p>
              Door gebruik te maken van de website van Lekker Anatolia ga je
              akkoord met deze gebruiksvoorwaarden. Als je het niet eens bent
              met (een deel van) deze voorwaarden, verzoeken wij je geen gebruik
              te maken van onze website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              2. Gebruik van de website
            </h2>
            <p>Je mag onze website uitsluitend gebruiken voor wettige doeleinden. Het is niet toegestaan om:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                De website te gebruiken op een manier die inbreuk maakt op
                rechten van anderen
              </li>
              <li>
                Virussen, malware of andere schadelijke software te verspreiden
              </li>
              <li>
                Geautomatiseerde systemen te gebruiken om de website te
                doorzoeken (scrapen) zonder toestemming
              </li>
              <li>
                Valse of misleidende informatie te verstrekken via het
                contactformulier
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              3. Intellectueel eigendom
            </h2>
            <p>
              Alle inhoud op deze website — teksten, afbeeldingen, logo's,
              ontwerp en overige materialen — is eigendom van Lekker Anatolia of
              de betreffende rechthebbenden. Niets van de inhoud mag worden
              gekopieerd, verspreid of gebruikt zonder voorafgaande schriftelijke
              toestemming.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              4. Aansprakelijkheid
            </h2>
            <p>
              Lekker Anatolia spant zich in om de informatie op de website
              actueel en correct te houden, maar kan de volledigheid of
              juistheid ervan niet garanderen. Wij zijn niet aansprakelijk voor
              schade die voortvloeit uit het gebruik van onze website of de
              informatie daarop.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              5. Links naar derden
            </h2>
            <p>
              Onze website kan links bevatten naar externe websites. Lekker
              Anatolia heeft geen controle over de inhoud van deze websites en
              is niet verantwoordelijk voor de inhoud of het privacybeleid
              daarvan.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              6. Toepasselijk recht
            </h2>
            <p>
              Op deze gebruiksvoorwaarden is Nederlands recht van toepassing.
              Geschillen worden voorgelegd aan de bevoegde rechter in
              Nederland.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              7. Wijzigingen
            </h2>
            <p>
              Wij behouden ons het recht voor deze voorwaarden te wijzigen. De
              meest actuele versie is altijd te vinden op deze pagina.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              8. Contact
            </h2>
            <p>
              Heb je vragen over deze gebruiksvoorwaarden? Neem contact op via
              ons{" "}
              <a
                href="/contact"
                className="underline underline-offset-4 hover:text-foreground"
              >
                contactformulier
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
