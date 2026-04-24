import type { Metadata } from "next";
import Image from "next/image";
import { Flame } from "lucide-react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/settings";
import { createWhatsAppLink } from "@/lib/whatsapp";
import {
  strapiFetch,
  getStrapiMediaUrl,
  type StrapiList,
  type StrapiMedia,
} from "@/lib/strapi";
import MenuCategoryTabs from "@/components/sections/MenuCategoryTabs";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Bekijk ons aanbod van authentieke Anatolische gerechten: lahmacun, pide, mezze en meer. Bestel eenvoudig via WhatsApp.",
};

// ——— Types ———

type MenuItemData = {
  id: number;
  documentId?: string;
  name: string;
  description?: string;
  price?: number;
  price_label?: string;
  image?: StrapiMedia | null;
  is_vegetarian?: boolean;
  is_vegan?: boolean;
  is_halal?: boolean;
  is_popular?: boolean;
  allergens?: string;
  is_available?: boolean;
  hide_price?: boolean;
};

type MenuCategoryData = {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  description?: string;
  image?: StrapiMedia | null;
  menu_items?: MenuItemData[];
};

// ——— Data fetching ———

async function getMenuCategories(): Promise<MenuCategoryData[]> {
  const res = await strapiFetch<StrapiList<MenuCategoryData>>({
    path: [
      "/menu-categories",
      "?sort=sort_order:asc",
      "&populate[0]=menu_items",
      "&populate[1]=image",
      "&populate[menu_items][populate][0]=image",
      "&filters[publishedAt][$notNull]=true",
    ].join(""),
    next: { revalidate: 3 },
  });
  return res?.data ?? [];
}

// ——— Helpers ———

function formatPrice(item: MenuItemData, showPrices: boolean): string | null {
  if (!showPrices || item.hide_price) return null;
  if (item.price_label) return item.price_label;
  if (item.price != null && item.price > 0)
    return `€ ${item.price.toFixed(2).replace(".", ",")}`;
  return null;
}

/** Gradient fallback backgrounds for cards without images */
const gradients = [
  "from-orange-100 to-amber-50",
  "from-red-100 to-orange-50",
  "from-yellow-100 to-lime-50",
  "from-emerald-100 to-teal-50",
];

function DietBadge({
  is_vegetarian,
  is_vegan,
  is_halal,
}: Pick<MenuItemData, "is_vegetarian" | "is_vegan" | "is_halal">) {
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

// ——— Page ———

export default async function MenuPage() {
  const [categories, settings] = await Promise.all([
    getMenuCategories(),
    getSiteSettings(),
  ]);

  const visibleCategories = categories.filter(
    (c) =>
      (c.menu_items?.filter((i) => i.is_available !== false).length ?? 0) > 0
  );

  const generalWhatsAppLink = createWhatsAppLink(
    settings.whatsapp_phone,
    "Hallo Lekker Anatolia! Ik wil graag een bestelling plaatsen. Kunnen jullie mij helpen?"
  );

  return (
    <>
      {/* Page header */}
      <section className="py-12 sm:py-16">
        <Container className="max-w-5xl">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Ons aanbod
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Menu</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            Authentieke Anatolische gerechten, met liefde bereid. Bestel direct
            via WhatsApp — we stellen het menu graag samen op maat.
          </p>

          {/* Diet legend */}
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              {
                label: "Vegetarisch",
                badge: "V",
                cls: "bg-green-100 text-green-700",
              },
              {
                label: "Veganistisch",
                badge: "VG",
                cls: "bg-green-100 text-green-700",
              },
              { label: "Halal", badge: "H", cls: "bg-accent/20 text-accent" },
            ].map(({ label, badge, cls }) => (
              <span
                key={label}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold ${cls}`}
                >
                  {badge}
                </span>
                {label}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Sticky category tabs */}
      {visibleCategories.length > 0 && (
        <MenuCategoryTabs
          categories={visibleCategories.map((c) => ({
            slug: c.slug,
            name: c.name,
          }))}
        />
      )}

      {/* Category sections */}
      <div className="pb-20">
        <Container className="max-w-5xl">
          {visibleCategories.length === 0 && (
            <div className="py-24 text-center text-muted-foreground">
              <p className="text-lg font-medium">
                Menu is tijdelijk niet beschikbaar.
              </p>
              <p className="mt-2 text-sm">
                Neem contact met ons op via WhatsApp voor het actuele aanbod.
              </p>
            </div>
          )}
          {visibleCategories.map((cat, catIndex) => {
            const items = (cat.menu_items ?? []).filter(
              (i) => i.is_available !== false
            );

            return (
              <section
                key={cat.id}
                id={`category-${cat.slug}`}
                className="pt-14 first:pt-10"
              >
                {/* Category heading */}
                <div className="mb-8">
                  <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
                    {cat.name}
                  </h2>
                  {cat.description && (
                    <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                      {cat.description}
                    </p>
                  )}
                </div>

                {/* Item grid */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item, itemIndex) => {
                    const imgUrl = getStrapiMediaUrl(item.image);
                    const price = formatPrice(item, settings.show_prices);
                    const priceHidden = !settings.show_prices || !!item.hide_price;
                    const gradient =
                      gradients[(catIndex + itemIndex) % gradients.length];

                    const orderLink = createWhatsAppLink(
                      settings.whatsapp_phone,
                      `Hallo Lekker Anatolia! Ik wil graag "${item.name}" bestellen. Kunnen jullie mij informeren over de beschikbaarheid en prijs?`
                    );

                    return (
                      <article
                        key={item.id}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-shadow hover:shadow-md"
                      >
                        {/* Image / gradient */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                          {imgUrl ? (
                            <Image
                              src={imgUrl}
                              alt={item.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          ) : (
                            <div
                              className={`flex h-full w-full items-end bg-gradient-to-br p-4 ${gradient}`}
                            >
                              <span className="font-serif text-4xl font-semibold text-foreground/20">
                                {item.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          {/* Popular badge */}
                          {item.is_popular && (
                            <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground shadow-sm">
                              <Flame className="h-3 w-3" />
                              <span>Favoriet</span>
                            </div>
                          )}

                          {/* Price badge */}
                          {price && (
                            <div className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-sm font-semibold text-foreground backdrop-blur-sm">
                              {price}
                            </div>
                          )}
                        </div>

                        {/* Card body */}
                        <div className="flex flex-1 flex-col p-5">
                          {/* Name + diet badges */}
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

                          {/* Description */}
                          {item.description && (
                            <p className="mt-2 flex-1 text-xs leading-5 text-muted-foreground">
                              {item.description}
                            </p>
                          )}

                          {/* Allergens */}
                          {item.allergens && (
                            <p className="mt-2 text-[11px] text-muted-foreground/70">
                              Allergenen: {item.allergens}
                            </p>
                          )}

                          {/* Price (fallback when no image badge) + order button */}
                          <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/40 pt-4">
                            {priceHidden ? (
                              <span className="text-xs font-medium text-muted-foreground">
                                Vraag via WhatsApp
                              </span>
                            ) : !imgUrl && price ? (
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
                              <a
                                href={orderLink}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Bestellen
                              </a>
                            </Button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Divider between categories */}
                {catIndex < visibleCategories.length - 1 && (
                  <div className="mt-14 h-px bg-border/40" />
                )}
              </section>
            );
          })}
        </Container>
      </div>

      {/* Bottom CTA */}
      <section className="pb-20">
        <Container className="max-w-5xl">
          <div className="rounded-[2rem] border border-border/70 bg-card/90 px-8 py-12 text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              Catering op maat
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              Iets speciaals in gedachten?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
              Ons menu is een leidraad — we stellen alles graag samen met je op
              maat. Vertel ons wat je wilt en we denken mee.
            </p>
            <Button asChild size="lg" className="mt-6 rounded-full px-8">
              <a href={generalWhatsAppLink} target="_blank" rel="noreferrer">
                Vraag een offerte aan
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
