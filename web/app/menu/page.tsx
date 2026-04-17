import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { getSiteSettings } from "@/lib/settings";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import {
  strapiFetch,
  getStrapiMediaUrl,
  type StrapiList,
  type StrapiMedia,
} from "@/lib/strapi";
import { Leaf, Wheat } from "lucide-react";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Bekijk ons aanbod van authentieke Anatolische gerechten: lahmacun, pide, mezze en meer.",
};

type MenuItemData = {
  id: number;
  name: string;
  description?: string;
  price?: number;
  price_label?: string;
  image?: StrapiMedia | null;
  is_vegetarian?: boolean;
  is_vegan?: boolean;
  is_halal?: boolean;
  allergens?: string;
  is_available?: boolean;
};

type MenuCategoryData = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: StrapiMedia | null;
  menu_items?: MenuItemData[];
};

// ——— Static fallback data ———
const staticCategories: MenuCategoryData[] = [
  {
    id: 1,
    name: "Lahmacun",
    slug: "lahmacun",
    description: "Onze knapperige, dunne Turkse pizza — het paradepaardje van Lekker Anatolia.",
    menu_items: [
      { id: 1, name: "Traditionele lahmacun", description: "Gekruid gehakt op dun deeg, afgemaakt met verse peterselie en citroen.", price: 3.5, is_halal: true },
      { id: 2, name: "Vegetarische lahmacun", description: "Groentevulling met paprika, tomaat en ui. Volledig vegetarisch.", price: 3.5, is_vegetarian: true, is_vegan: true },
      { id: 3, name: "Kaas & spinazie lahmacun", description: "Romige kaas met verse spinazie op krokant deeg.", price: 4.0, is_vegetarian: true },
    ],
  },
  {
    id: 2,
    name: "Pide",
    slug: "pide",
    description: "Gevulde Turkse broodjes uit de oven — sappig en smaakvol.",
    menu_items: [
      { id: 4, name: "Kaas pide", description: "Gesmolten kaas op versgebakken pidedeeg.", price: 5.0, is_vegetarian: true },
      { id: 5, name: "Gehakt pide", description: "Gekruid rundergehakt met verse kruiden.", price: 5.5, is_halal: true },
      { id: 6, name: "Gemengde pide", description: "Combinatie van kaas, gehakt en paprika.", price: 6.0, is_halal: true },
    ],
  },
  {
    id: 3,
    name: "Mezze & Salades",
    slug: "mezze",
    description: "Kleine hapjes en salades — perfect als starter of bijgerecht.",
    menu_items: [
      { id: 7, name: "Hummus", description: "Huisgemaakte hummus met olijfolie en paprikapoeder.", is_vegetarian: true, is_vegan: true },
      { id: 8, name: "Cacık", description: "Verse komkommer in yoghurt met knoflook en dille.", is_vegetarian: true },
      { id: 9, name: "Tabouli", description: "Peterseliesalade met tomaat, munt en citroen.", is_vegetarian: true, is_vegan: true },
      { id: 10, name: "Dolma", description: "Gevulde druivenbladeren met rijst en kruiden.", is_vegetarian: true },
    ],
  },
  {
    id: 4,
    name: "Desserts",
    slug: "desserts",
    description: "Zoete afsluiting met authentieke Anatolische lekkernijen.",
    menu_items: [
      { id: 11, name: "Baklava", description: "Krokante filodeeg gevuld met pistachenoten en honing.", is_vegetarian: true },
      { id: 12, name: "Künefe", description: "Warm kaasdessert overgoten met suikersiroop.", is_vegetarian: true },
    ],
  },
];

async function getMenuCategories(): Promise<MenuCategoryData[]> {
  const res = await strapiFetch<StrapiList<MenuCategoryData>>({
    path: "/menu-categories?sort=sort_order:asc&populate[menu_items][populate]=image&populate=image&filters[publishedAt][$notNull]=true",
    next: { revalidate: 300 },
  });
  if (!res?.data?.length) return staticCategories;
  return res.data;
}

function formatPrice(item: MenuItemData): string | null {
  if (item.price_label) return item.price_label;
  if (item.price) return `€ ${item.price.toFixed(2).replace(".", ",")}`;
  return null;
}

export default async function MenuPage() {
  const [categories, settings] = await Promise.all([
    getMenuCategories(),
    getSiteSettings(),
  ]);

  const whatsappLink = createWhatsAppLink(
    settings.whatsapp_phone,
    "Hallo, ik wil graag een catering aanvragen bij Lekker Anatolia."
  );

  return (
    <>
      {/* Header */}
      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              Ons aanbod
            </p>
            <h1 className="text-4xl font-semibold sm:text-5xl">Menu</h1>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Authentieke Anatolische gerechten, met liefde bereid. Alles kan in
              overleg worden aangepast aan jouw gelegenheid en groepsgrootte.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Leaf className="h-3.5 w-3.5 text-green-600" /> Vegetarisch
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-3.5 w-3.5 rounded-full bg-green-100 text-center text-[9px] font-bold leading-[14px] text-green-700">V</span>
                Veganistisch
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-3.5 w-3.5 rounded-full bg-accent/20 text-center text-[9px] font-bold leading-[14px] text-accent">H</span>
                Halal
              </span>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-14">
            {categories.map((cat) => {
              const items = cat.menu_items?.filter((i) => i.is_available !== false) ?? [];
              if (!items.length) return null;
              return (
                <div key={cat.id}>
                  <div className="mb-6 flex items-center gap-4">
                    <div>
                      <h2 className="font-serif text-3xl font-semibold">
                        {cat.name}
                      </h2>
                      {cat.description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {cat.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => {
                      const imgUrl = getStrapiMediaUrl(item.image);
                      const price = formatPrice(item);
                      return (
                        <div
                          key={item.id}
                          className="group rounded-2xl border border-border/70 bg-card/60 p-5 transition-shadow hover:shadow-sm"
                        >
                          {imgUrl && (
                            <div className="relative mb-4 aspect-[3/2] overflow-hidden rounded-xl">
                              <Image
                                src={imgUrl}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            </div>
                          )}
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-serif text-lg font-semibold leading-tight">
                              {item.name}
                            </h3>
                            <div className="flex shrink-0 items-center gap-1">
                              {item.is_vegetarian && (
                                <Leaf className="h-3.5 w-3.5 text-green-600" aria-label="Vegetarisch" />
                              )}
                              {item.is_halal && (
                                <span className="inline-block h-4 w-4 rounded-full bg-accent/20 text-center text-[9px] font-bold leading-4 text-accent" aria-label="Halal">H</span>
                              )}
                            </div>
                          </div>
                          {item.description && (
                            <p className="mt-2 text-xs leading-5 text-muted-foreground">
                              {item.description}
                            </p>
                          )}
                          <div className="mt-3 flex items-center justify-between">
                            {price ? (
                              <span className="text-sm font-medium text-foreground">
                                {price}
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                Prijs op aanvraag
                              </span>
                            )}
                            {item.allergens && (
                              <span className="text-xs text-muted-foreground">
                                <Wheat className="mr-1 inline h-3 w-3" />
                                {item.allergens}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Separator className="mt-14 opacity-40" />
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-[2rem] border border-border/70 bg-card/90 px-8 py-10 text-center">
            <h2 className="font-serif text-3xl font-semibold">
              Interesse in catering?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
              Alle gerechten worden samengesteld op basis van jouw gelegenheid
              en wensen. Neem contact op voor een persoonlijk voorstel.
            </p>
            <Button asChild size="lg" className="mt-6 rounded-full px-8">
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                Vraag catering aan
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
