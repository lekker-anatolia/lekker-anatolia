import HeroSection, {
  type HeroCategoryTile,
} from "@/components/sections/HeroSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import FaqPreview from "@/components/sections/FaqPreview";
import WhatsappCTA from "@/components/sections/WhatsappCTA";
import HowToOrderSection from "@/components/sections/HowtoOrderSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import MenuPreviewSection, {
  type MenuPreviewCategory,
} from "@/components/sections/MenuPreviewSection";
import { getSiteSettings } from "@/lib/settings";
import {
  strapiFetch,
  getStrapiMediaUrl,
  type StrapiList,
  type StrapiMedia,
} from "@/lib/strapi";

export const revalidate = 3;

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
  is_popular?: boolean;
  is_available?: boolean;
  hide_price?: boolean;
};

type MenuCategoryData = {
  id: number;
  name: string;
  slug: string;
  image?: StrapiMedia | null;
  menu_items?: MenuItemData[];
};

type MenuFetchResult = {
  preview: MenuPreviewCategory[];
  heroTiles: HeroCategoryTile[];
};

async function getMenuData(): Promise<MenuFetchResult> {
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

  const categories = res?.data ?? [];

  const preview: MenuPreviewCategory[] = categories
    .map((cat) => ({
      slug: cat.slug,
      name: cat.name,
      items: (cat.menu_items ?? [])
        .filter((i) => i.is_available !== false)
        .map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price ?? null,
          price_label: item.price_label ?? null,
          image_url: getStrapiMediaUrl(item.image),
          is_vegetarian: item.is_vegetarian,
          is_vegan: item.is_vegan,
          is_halal: item.is_halal,
          is_popular: item.is_popular,
          hide_price: item.hide_price ?? false,
        })),
    }))
    .filter((c) => c.items.length > 0);

  // Hero tiles: prefer category image, fall back to first available item image.
  const heroTiles: HeroCategoryTile[] = categories
    .filter((c) => (c.menu_items ?? []).some((i) => i.is_available !== false))
    .slice(0, 4)
    .map((cat) => {
      const categoryImage = getStrapiMediaUrl(cat.image);
      const firstItemImage = cat.menu_items?.find(
        (i) => i.is_available !== false && i.image
      )?.image;
      return {
        slug: cat.slug,
        name: cat.name,
        image_url: categoryImage ?? getStrapiMediaUrl(firstItemImage),
      };
    });

  return { preview, heroTiles };
}

export default async function HomePage() {
  const [settings, { preview: menuCategories, heroTiles }] = await Promise.all([
    getSiteSettings(),
    getMenuData(),
  ]);

  return (
    <>
      <HeroSection
        phone={settings.whatsapp_phone}
        imageUrl={settings.hero_image_url}
        imageAlt={settings.hero_image_alt}
        title={settings.hero_title || undefined}
        subtitle={settings.hero_subtitle || undefined}
        categories={heroTiles}
      />
      <WhyUsSection />
      {menuCategories.length > 0 && (
        <MenuPreviewSection
          categories={menuCategories}
          phone={settings.whatsapp_phone}
          showPrices={settings.show_prices}
        />
      )}
      <HowToOrderSection />
      <TestimonialsSection />
      <FaqPreview />
      <WhatsappCTA phone={settings.whatsapp_phone} />
    </>
  );
}
