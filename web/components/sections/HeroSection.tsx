import Image from "next/image";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { createWhatsAppLink } from "@/lib/whatsapp";

const DEFAULT_TITLE = "Ambachtelijke catering";
const DEFAULT_TITLE_ACCENT = "met een warme Anatolische touch";
const DEFAULT_SUBTITLE =
  "Lekker Anatolia staat voor smaak, aandacht en eenvoud. Neem via WhatsApp contact met ons op voor catering, aanvragen op maat en meer informatie.";

interface HeroSectionProps {
  phone?: string;
  imageUrl?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
}

export default function HeroSection({
  phone = "31612345678",
  imageUrl = "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1920&q=80",
  imageAlt = "Anatolische gerechten op een rijkelijk gedekte tafel",
  title,
  subtitle,
}: HeroSectionProps) {
  const whatsappLink = createWhatsAppLink(
    phone,
    "Hallo, ik wil graag meer informatie over catering van Lekker Anatolia."
  );

  // Split custom title into main + accent line if it contains " — "
  // e.g. "Verse lahmacun — voor elke gelegenheid" → two lines
  // Otherwise fall back to the default two-line layout.
  const [mainTitle, accentTitle] = title?.includes(" — ")
    ? title.split(" — ")
    : [DEFAULT_TITLE, DEFAULT_TITLE_ACCENT];

  const displaySubtitle = subtitle || DEFAULT_SUBTITLE;

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Warm gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.96 0.015 65 / 0.90) 0%, oklch(0.96 0.015 65 / 0.75) 50%, oklch(0.96 0.015 65 / 0.60) 100%)",
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Warm • Elegant • Anatolisch
          </p>

          <h1 className="text-5xl font-semibold leading-tight sm:text-6xl md:text-7xl">
            {mainTitle}
            <span className="block text-accent">{accentTitle}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {displaySubtitle}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-8">
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                Vraag catering aan
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8"
            >
              <a href="/faq">Bekijk de FAQ</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
