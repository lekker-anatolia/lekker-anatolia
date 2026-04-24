import {
  strapiFetch,
  getStrapiMediaUrl,
  type StrapiSingle,
  type SiteSettingData,
} from "./strapi";

const PHONE_FALLBACK =
  process.env.WHATSAPP_PHONE_FALLBACK ?? "31612345678";

// Fallback hero image (Unsplash — swap with your own when ready)
const HERO_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1920&q=80";

export type SiteSettings = {
  whatsapp_phone: string;
  email: string;
  address: string;
  city: string;
  instagram_url: string;
  facebook_url: string;
  kvk_number: string;
  btw_number: string;
  hero_image_url: string;
  hero_image_alt: string;
  hero_title: string;
  hero_subtitle: string;
  /** Global: when false, all menu prices are hidden site-wide. Defaults to true. */
  show_prices: boolean;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const res = await strapiFetch<StrapiSingle<SiteSettingData>>({
    // populate=hero_image tells Strapi to include the media relation
    path: "/site-setting?populate=hero_image",
    next: { revalidate: 3 },
  });

  const data = res?.data;

  return {
    whatsapp_phone: data?.whatsapp_phone ?? PHONE_FALLBACK,
    email: data?.email ?? "",
    address: data?.address ?? "",
    city: data?.city ?? "",
    instagram_url: data?.instagram_url ?? "",
    facebook_url: data?.facebook_url ?? "",
    kvk_number: data?.kvk_number ?? "",
    btw_number: data?.btw_number ?? "",
    hero_image_url: getStrapiMediaUrl(data?.hero_image) ?? HERO_IMAGE_FALLBACK,
    hero_image_alt: data?.hero_image?.alternativeText ?? "Anatolische gerechten op een rijkelijk gedekte tafel",
    hero_title: data?.hero_title ?? "",
    hero_subtitle: data?.hero_subtitle ?? "",
    // Default true: if the CMS field is unset (null/undefined), show prices.
    show_prices: data?.show_prices !== false,
  };
}
