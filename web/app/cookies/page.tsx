import type { Metadata } from "next";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description: "Cookiebeleid van Lekker Anatolia.",
};

export default function CookiesPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Juridisch
        </p>
        <h1 className="text-4xl font-semibold">Cookiebeleid</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Laatst bijgewerkt: april 2026
        </p>

        <Separator className="my-8 opacity-50" />

        <div className="space-y-8 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              Wat zijn cookies?
            </h2>
            <p>
              Cookies zijn kleine tekstbestanden die worden opgeslagen op jouw
              apparaat wanneer je een website bezoekt. Ze worden gebruikt om de
              website goed te laten werken, je bezoek te onthouden en om
              inzichten te verzamelen over het gebruik van de website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              Welke cookies gebruiken wij?
            </h2>

            <div className="mt-4 space-y-5">
              <div className="rounded-xl border border-border/70 p-5">
                <p className="font-medium text-foreground">
                  Functionele cookies
                </p>
                <p className="mt-2">
                  Deze cookies zijn noodzakelijk voor het correct functioneren
                  van de website. Zonder deze cookies werken bepaalde onderdelen
                  van de website niet. Ze kunnen niet worden uitgeschakeld.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 p-5">
                <p className="font-medium text-foreground">
                  Analytische cookies (optioneel)
                </p>
                <p className="mt-2">
                  We kunnen analytische cookies gebruiken om bij te houden hoe
                  bezoekers de website gebruiken. Deze informatie helpt ons de
                  website te verbeteren. Deze cookies worden alleen geplaatst
                  met jouw toestemming.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              Cookies van derden
            </h2>
            <p>
              Onze website maakt momenteel geen gebruik van cookies van derden
              voor advertentiedoeleinden. Indien dit in de toekomst verandert,
              zal dit beleid worden bijgewerkt.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              Cookies beheren of verwijderen
            </h2>
            <p>
              Je kunt cookies beheren via de instellingen van je browser. Let op
              dat het uitschakelen van cookies invloed kan hebben op de
              functionaliteit van de website. Meer informatie over het beheren
              van cookies vind je op{" "}
              <a
                href="https://www.cookiesandyou.com"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-foreground"
              >
                cookiesandyou.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
              Contact
            </h2>
            <p>
              Heb je vragen over ons cookiebeleid? Neem contact op via ons{" "}
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
