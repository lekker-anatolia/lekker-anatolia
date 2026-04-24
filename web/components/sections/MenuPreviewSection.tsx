"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createWhatsAppLink } from "@/lib/whatsapp";

// ——— Types (kept self-contained so the homepage doesn't import menu-page types) ———

export type MenuPreviewItem = {
  id: number;
  name: string;
  description?: string;
  price?: number | null;
  price_label?: string | null;
  image_url?: string | null;
  is_vegetarian?: boolean;
  is_vegan?: boolean;
  is_halal?: boolean;
  /** Chef's pick / popular marker — shows a flame badge. */
  is_popular?: boolean;
  /** Per-item override: hide the price even when global show_prices is true. */
  hide_price?: boolean;
};

export type MenuPreviewCategory = {
  slug: string;
  name: string;
  items: MenuPreviewItem[];
};

interface Props {
  categories: MenuPreviewCategory[];
  phone: string;
  /** Global CMS toggle — when false, ALL prices are hidden. */
  showPrices?: boolean;
  /** Max items shown per category in the preview grid */
  perCategory?: number;
}

// ——— Helpers ———

const gradients = [
  "from-orange-200/70 to-amber-100/70",
  "from-rose-200/70 to-orange-100/70",
  "from-yellow-200/70 to-lime-100/70",
  "from-emerald-200/70 to-teal-100/70",
];

function formatPrice(item: MenuPreviewItem, showPrices: boolean): string | null {
  if (!showPrices || item.hide_price) return null;
  if (item.price_label) return item.price_label;
  if (item.price != null && item.price > 0)
    return `€ ${item.price.toFixed(2).replace(".", ",")}`;
  return null;
}

function DietBadge({
  is_vegetarian,
  is_vegan,
  is_halal,
}: Pick<MenuPreviewItem, "is_vegetarian" | "is_vegan" | "is_halal">) {
  return (
    <div className="flex items-center gap-1">
      {is_vegan && (
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-[9px] font-bold text-green-700"
          title="Veganistisch"
        >
          VG
        </span>
      )}
      {!is_vegan && is_vegetarian && (
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-[9px] font-bold text-green-700"
          title="Vegetarisch"
        >
          V
        </span>
      )}
      {is_halal && (
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-[9px] font-bold text-accent"
          title="Halal"
        >
          H
        </span>
      )}
    </div>
  );
}

// ——— Component ———

const ALL = "__all__";

export default function MenuPreviewSection({
  categories,
  phone,
  showPrices = true,
  perCategory = 3,
}: Props) {
  const tabs = useMemo(
    () => [{ slug: ALL, name: "Alles" }, ...categories.map((c) => ({ slug: c.slug, name: c.name }))],
    [categories]
  );
  const [active, setActive] = useState<string>(ALL);

  // Build the preview list for the active tab:
  //  • "Alles" → N items per category (interleaved visually)
  //  • category → up to 6 items of that category
  const visibleItems = useMemo(() => {
    if (active === ALL) {
      return categories.flatMap((cat) =>
        cat.items.slice(0, perCategory).map((item, i) => ({
          ...item,
          _cat: cat.slug,
          _gradient: gradients[(categories.indexOf(cat) + i) % gradients.length],
        }))
      );
    }
    const cat = categories.find((c) => c.slug === active);
    if (!cat) return [];
    return cat.items.slice(0, perCategory * 2).map((item, i) => ({
      ...item,
      _cat: cat.slug,
      _gradient: gradients[i % gradients.length],
    }));
  }, [active, categories, perCategory]);

  if (categories.length === 0) return null;

  return (
    <section id="menu-preview" className="relative scroll-mt-20 py-20 sm:py-24">
      {/* Soft radial background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[420px] max-w-5xl rounded-full bg-accent/5 blur-3xl"
      />

      <Container>
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Ons menu
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            Een voorproefje van onze keuken
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Van knapperige lahmacun tot warme künefe — ontdek een greep uit wat
            we voor je bereiden. Bestel elk gerecht direct via WhatsApp.
          </p>
        </div>

        {/* Category pills */}
        <div
          role="tablist"
          aria-label="Menucategorieën"
          className="mx-auto mb-10 flex max-w-full flex-wrap justify-center gap-2 px-2"
        >
          {tabs.map((t) => {
            const isActive = active === t.slug;
            return (
              <button
                key={t.slug}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(t.slug)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                  "border",
                  isActive
                    ? "border-transparent bg-foreground text-background shadow-sm"
                    : "border-border/70 bg-background/60 text-muted-foreground backdrop-blur hover:border-foreground/30 hover:text-foreground"
                )}
              >
                {t.name}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => {
            const price = formatPrice(item, showPrices);
            const priceHidden = !showPrices || !!item.hide_price;
            const orderLink = createWhatsAppLink(
              phone,
              `Hallo Lekker Anatolia! Ik wil graag "${item.name}" bestellen. Kunnen jullie mij informeren over de beschikbaarheid en prijs?`
            );

            return (
              <article
                key={`${item._cat}-${item.id}`}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-border/70 bg-card",
                  "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
                )}
              >
                {/* Image / gradient header */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div
                      className={cn(
                        "flex h-full w-full items-end bg-gradient-to-br p-5 transition-transform duration-700 group-hover:scale-[1.03]",
                        item._gradient
                      )}
                    >
                      <span className="font-serif text-5xl font-semibold text-foreground/15">
                        {item.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Popular badge (top-left) */}
                  {item.is_popular && (
                    <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground shadow-sm">
                      <Flame className="h-3 w-3" />
                      <span>Favoriet</span>
                    </div>
                  )}

                  {/* Price badge (top-right) */}
                  {price && (
                    <div className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm">
                      {price}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-lg font-semibold leading-snug">
                      {item.name}
                    </h3>
                    <DietBadge
                      is_vegetarian={item.is_vegetarian}
                      is_vegan={item.is_vegan}
                      is_halal={item.is_halal}
                    />
                  </div>

                  {item.description && (
                    <p className="mt-2 line-clamp-3 flex-1 text-xs leading-5 text-muted-foreground">
                      {item.description}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/40 pt-4">
                    {priceHidden ? (
                      <span className="text-xs font-medium text-muted-foreground">
                        Vraag via WhatsApp
                      </span>
                    ) : !item.image_url && price ? (
                      <span className="text-sm font-semibold text-foreground">
                        {price}
                      </span>
                    ) : !price ? (
                      <span className="text-xs text-muted-foreground">
                        Prijs op aanvraag
                      </span>
                    ) : (
                      <span />
                    )}

                    <Button
                      asChild
                      size="sm"
                      className="ml-auto rounded-full px-4"
                    >
                      <a href={orderLink} target="_blank" rel="noreferrer">
                        Bestellen
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA row */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="group rounded-full px-8">
            <Link href="/menu">
              Bekijk het volledige menu
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            {categories.reduce((n, c) => n + c.items.length, 0)} gerechten · {categories.length} categorieën
          </p>
        </div>
      </Container>
    </section>
  );
}
