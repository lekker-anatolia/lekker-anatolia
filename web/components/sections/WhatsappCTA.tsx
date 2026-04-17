import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { createWhatsAppLink } from "@/lib/whatsapp";

interface WhatsappCTAProps {
  phone?: string;
}

export default function WhatsappCTA({ phone = "31612345678" }: WhatsappCTAProps) {
  const whatsappLink = createWhatsAppLink(
    phone,
    "Hallo, ik wil graag meer informatie over catering van Lekker Anatolia."
  );

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="rounded-[2rem] border border-border/70 bg-card/90 px-8 py-14 text-center sm:px-12">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Contact
          </p>

          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">
            Klaar om samen iets moois neer te zetten?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            Neem gerust contact met ons op via WhatsApp voor catering, vragen of
            een aanvraag op maat.
          </p>

          <div className="mt-8">
            <Button asChild size="lg" className="rounded-full px-8">
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                Neem contact op via WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
