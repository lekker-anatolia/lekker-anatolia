import {
  strapiFetch,
  getStrapiMediaUrl,
  pickStrapiMedia,
  type StrapiSingle,
  type SiteSettingData,
} from "./strapi";

const PHONE_FALLBACK =
  process.env.WHATSAPP_PHONE_FALLBACK ?? "31612345678";

// `web/public/hero.jpeg` — this is the default unless you set HERO_USE_STRAPI_HERO=true
// (then Site settings `hero` / `hero_image` in Strapi are used).
const HERO_IMAGE_FALLBACK = "/hero.jpeg";

function strapiHeroEnabled(): boolean {
  const v = process.env.HERO_USE_STRAPI_HERO;
  return v === "1" || v === "true";
}

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
    path: "/site-settings?populate=*",
    next: { revalidate: 3 },
  });

  const data = res?.data;
  const heroMedia =
    pickStrapiMedia(data?.hero) ?? pickStrapiMedia(data?.hero_image);
  const fromStrapi = getStrapiMediaUrl(heroMedia);
  const useCmsHero = strapiHeroEnabled() && Boolean(fromStrapi);

  return {
    whatsapp_phone: data?.whatsapp_phone ?? PHONE_FALLBACK,
    email: data?.email ?? "",
    address: data?.address ?? "",
    city: data?.city ?? "",
    instagram_url: data?.instagram_url ?? "",
    facebook_url: data?.facebook_url ?? "",
    kvk_number: data?.kvk_number ?? "",
    btw_number: data?.btw_number ?? "",
    hero_image_url: useCmsHero && fromStrapi ? fromStrapi : HERO_IMAGE_FALLBACK,
    hero_image_alt: useCmsHero
      ? (heroMedia?.alternativeText ?? "Lekker Anatolia")
      : "Lekker Anatolia",
    hero_title: data?.hero_title ?? "",
    hero_subtitle: data?.hero_subtitle ?? "",
    // Default true: if the CMS field is unset (null/undefined), show prices.
    show_prices: data?.show_prices !== false,
  };
}
