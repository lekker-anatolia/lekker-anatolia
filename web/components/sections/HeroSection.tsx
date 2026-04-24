import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const DEFAULT_TITLE = "Ambachtelijke catering";
const DEFAULT_TITLE_ACCENT = "met een warme Anatolische touch";
const DEFAULT_SUBTITLE =
  "Lekker Anatolia staat voor smaak, aandacht en eenvoud. Neem via WhatsApp contact met ons op voor catering, aanvragen op maat en meer informatie.";

export type HeroCategoryTile = {
  slug: string;
  name: string;
  image_url?: string | null;
};

interface HeroSectionProps {
  phone?: string;
  imageUrl?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  categories?: HeroCategoryTile[];
}

// Soft fallback gradients so tiles without images still look intentional.
const tileGradients = [
  "from-orange-300/80 to-amber-200/80",
  "from-rose-300/80 to-orange-200/80",
  "from-yellow-300/80 to-lime-200/80",
  "from-emerald-300/80 to-teal-200/80",
];

export default function HeroSection({
  phone = "31612345678",
  imageUrl = "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1920&q=80",
  imageAlt = "Anatolische gerechten op een rijkelijk gedekte tafel",
  title,
  subtitle,
  categories = [],
}: HeroSectionProps) {
  const whatsappLink = createWhatsAppLink(
    phone,
    "Hallo, ik wil graag meer informatie over catering van Lekker Anatolia."
  );

  // Split custom title into main + accent line if it contains " — "
  const [mainTitle, accentTitle] = title?.includes(" — ")
    ? title.split(" — ")
    : [DEFAULT_TITLE, DEFAULT_TITLE_ACCENT];

  const displaySubtitle = subtitle || DEFAULT_SUBTITLE;

  // Take the first 4 categories with items for the hero tile strip.
  const tiles = categories.slice(0, 4);

  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center pt-20 pb-12 sm:pt-24 sm:pb-16">
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
              "linear-gradient(to right, oklch(0.96 0.015 65 / 0.92) 0%, oklch(0.96 0.015 65 / 0.80) 50%, oklch(0.96 0.015 65 / 0.65) 100%)",
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

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
              <a href="#menu-preview">Bekijk het menu</a>
            </Button>
          </div>
        </div>

        {/* Category tile strip — only render when Strapi has categories */}
        {tiles.length > 0 && (
          <div className="mx-auto mt-12 max-w-5xl sm:mt-14">
            <p className="mb-4 text-center text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Ontdek per categorie
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {tiles.map((tile, i) => (
                <Link
                  key={tile.slug}
                  href={`/menu#category-${tile.slug}`}
                  className={cn(
                    "group relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl",
                    "border border-border/60 bg-card/70 backdrop-blur",
                    "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10"
                  )}
                >
                  {tile.image_url ? (
                    <>
                      <Image
                        src={tile.image_url}
                        alt={tile.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    </>
                  ) : (
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br",
                        tileGradients[i % tileGradients.length]
                      )}
                    />
                  )}
                  <div className="relative z-10 w-full p-3 sm:p-4">
                    <p
                      className={cn(
                        "font-serif text-base font-semibold leading-tight sm:text-lg",
                        tile.image_url ? "text-white" : "text-foreground"
                      )}
                    >
                      {tile.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
