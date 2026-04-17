import type { Metadata } from "next";
import Container from "@/components/ui/container";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ContactForm from "@/components/sections/ContactForm";
import { getSiteSettings } from "@/lib/settings";
import { MessageCircle, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Lekker Anatolia. Vul ons contactformulier in of stuur ons direct een WhatsApp-bericht.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const whatsappLink = createWhatsAppLink(
    settings.whatsapp_phone,
    "Hallo, ik wil contact opnemen met Lekker Anatolia."
  );

  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-5xl">
        <div className="mb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Contact
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            Neem contact op
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">
            Heb je een vraag, wil je een catering aanvragen of gewoon even
            kennismaken? We horen graag van je.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <div>
            <h2 className="mb-6 font-serif text-2xl font-semibold">
              Stuur een bericht
            </h2>
            <ContactForm />
          </div>

          {/* Side info */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 font-serif text-2xl font-semibold">
                Of neem direct contact op
              </h2>
              <Button asChild className="w-full rounded-full" size="lg">
                <a href={whatsappLink} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp ons
                </a>
              </Button>
            </div>

            <Separator className="opacity-50" />

            <div className="space-y-4 text-sm text-muted-foreground">
              {settings.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  <a
                    href={`mailto:${settings.email}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {settings.email}
                  </a>
                </div>
              )}
              {settings.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                  <span>
                    {settings.address}
                    {settings.city && (
                      <>
                        <br />
                        {settings.city}
                      </>
                    )}
                  </span>
                </div>
              )}
            </div>

            <Separator className="opacity-50" />

            <div className="rounded-2xl bg-card/80 border border-border/70 p-6 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Reactietijd</p>
              <p className="mt-2 leading-6">
                We reageren doorgaans binnen 24 uur op werkdagen. Voor spoed
                kun je ons het snelst bereiken via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
