import type { HeroCategoryTile } from "@/components/sections/HeroSection";
import type { MenuPreviewCategory } from "@/components/sections/MenuPreviewSection";
import {
  strapiFetch,
  getStrapiMediaUrl,
  type StrapiList,
  type StrapiMedia,
} from "@/lib/strapi";

const MENU_CATEGORIES_PATH = [
  "/menu-categories",
  "?sort=sort_order:asc",
  "&populate[0]=menu_items",
  "&populate[1]=image",
  "&populate[menu_items][populate][0]=image",
  "&filters[publishedAt][$notNull]=true",
].join("");

const MENU_ITEMS_FLAT_PATH = [
  "/menu-items",
  "?sort=sort_order:asc",
  "&populate[0]=image",
  "&filters[publishedAt][$notNull]=true",
  "&pagination[pageSize]=200",
].join("");

const FALLBACK_SLUG = "ons-aanbod";
const FALLBACK_NAME = "Ons aanbod";

const REVALIDATE = { revalidate: 3 as const };

export type MenuItemData = {
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
  is_available?: boolean;
  hide_price?: boolean;
  allergens?: string;
};

export type MenuCategoryData = {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  description?: string;
  image?: StrapiMedia | null;
  menu_items?: MenuItemData[];
};

async function fetchMenuCategories(): Promise<MenuCategoryData[]> {
  const res = await strapiFetch<StrapiList<MenuCategoryData>>({
    path: MENU_CATEGORIES_PATH,
    next: REVALIDATE,
  });
  return res?.data ?? [];
}

async function fetchMenuItemsFlat(): Promise<MenuItemData[]> {
  const res = await strapiFetch<StrapiList<MenuItemData>>({
    path: MENU_ITEMS_FLAT_PATH,
    next: REVALIDATE,
  });
  return res?.data ?? [];
}

function categoryHasVisibleItems(cat: MenuCategoryData): boolean {
  return (
    (cat.menu_items?.filter((i) => i.is_available !== false).length ?? 0) > 0
  );
}

function syntheticCategoryFromItems(items: MenuItemData[]): MenuCategoryData {
  const visible = items.filter((i) => i.is_available !== false);
  return {
    id: 0,
    name: FALLBACK_NAME,
    slug: FALLBACK_SLUG,
    menu_items: visible,
  };
}

/** Menu page: categories with items, or a single group built from /menu-items when there are no categories. */
export async function getMenuCategoriesForPage(): Promise<MenuCategoryData[]> {
  const fromCategories = (await fetchMenuCategories()).filter(
    categoryHasVisibleItems
  );
  if (fromCategories.length > 0) return fromCategories;

  const items = await fetchMenuItemsFlat();
  if (items.length === 0) return [];
  return [syntheticCategoryFromItems(items)];
}

type MenuFetchResult = {
  preview: MenuPreviewCategory[];
  heroTiles: HeroCategoryTile[];
};

function toPreviewItem(item: MenuItemData) {
  return {
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
  };
}

/** Home: menu preview + hero category tiles, with flat /menu-items fallback. */
export async function getMenuDataForHome(): Promise<MenuFetchResult> {
  const categories = await fetchMenuCategories();
  const withItems = categories.filter(categoryHasVisibleItems);

  let preview: MenuPreviewCategory[] = withItems.map((cat) => ({
    slug: cat.slug,
    name: cat.name,
    items: (cat.menu_items ?? [])
      .filter((i) => i.is_available !== false)
      .map(toPreviewItem),
  }));

  let heroTiles: HeroCategoryTile[] = categories
    .filter((c) =>
      (c.menu_items ?? []).some((i) => i.is_available !== false)
    )
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

  if (preview.length > 0) {
    return { preview, heroTiles };
  }

  const items = (await fetchMenuItemsFlat()).filter(
    (i) => i.is_available !== false
  );
  if (items.length === 0) {
    return { preview: [], heroTiles: [] };
  }

  preview = [
    {
      slug: FALLBACK_SLUG,
      name: FALLBACK_NAME,
      items: items.map(toPreviewItem),
    },
  ];

  heroTiles = items.slice(0, 4).map((item) => ({
    slug: FALLBACK_SLUG,
    name: item.name,
    image_url: getStrapiMediaUrl(item.image) ?? null,
  }));

  return { preview, heroTiles };
}
