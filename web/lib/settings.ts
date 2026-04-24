import {
  strapiFetch,
  getStrapiMediaUrl,
  pickStrapiMedia,
  type StrapiSingle,
  type SiteSettingData,
} from "./strapi";

const PHONE_FALLBACK =
  process.env.WHATSAPP_PHONE_FALLBACK ?? "31612345678";

// When Strapi has no `hero` and no `hero_image`, use `web/public/hero.jpeg` (served as /hero.jpeg)
const HERO_IMAGE_FALLBACK = "/hero.jpeg";

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
    // Strapi 5: `hero` takes precedence over `hero_image` in code; then /public/hero.jpeg
    path: "/site-settings?populate=*",
    next: { revalidate: 3 },
  });

  const data = res?.data;
  const heroMedia =
    pickStrapiMedia(data?.hero) ?? pickStrapiMedia(data?.hero_image);

  return {
    whatsapp_phone: data?.whatsapp_phone ?? PHONE_FALLBACK,
    email: data?.email ?? "",
    address: data?.address ?? "",
    city: data?.city ?? "",
    instagram_url: data?.instagram_url ?? "",
    facebook_url: data?.facebook_url ?? "",
    kvk_number: data?.kvk_number ?? "",
    btw_number: data?.btw_number ?? "",
    hero_image_url: getStrapiMediaUrl(heroMedia) ?? HERO_IMAGE_FALLBACK,
    hero_image_alt:
      heroMedia?.alternativeText ??
      "Anatolische gerechten op een rijkelijk gedekte tafel",
    hero_title: data?.hero_title ?? "",
    hero_subtitle: data?.hero_subtitle ?? "",
    // Default true: if the CMS field is unset (null/undefined), show prices.
    show_prices: data?.show_prices !== false,
  };
}
