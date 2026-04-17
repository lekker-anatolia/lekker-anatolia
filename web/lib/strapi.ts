export const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? "";

type FetchOptions = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  next?: NextFetchRequestConfig;
};

export async function strapiFetch<T>({
  path,
  method = "GET",
  body,
  next,
}: FetchOptions): Promise<T | null> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (STRAPI_TOKEN) {
      headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
    }

    const res = await fetch(`${STRAPI_URL}/api${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      next,
    });

    if (!res.ok) {
      console.error(`Strapi error ${res.status} for ${path}`);
      return null;
    }

    return res.json() as Promise<T>;
  } catch {
    // Strapi is not running — return null so callers fall back to static data
    return null;
  }
}

// ——— Types ———

export type StrapiSingle<T> = { data: T };
export type StrapiList<T> = { data: T[]; meta: { pagination: unknown } };

export type StrapiMedia = {
  id: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  };
};

/** Converts a Strapi media URL to an absolute URL usable by next/image. */
export function getStrapiMediaUrl(media: StrapiMedia | null | undefined): string | null {
  if (!media?.url) return null;
  // Already absolute (production CDN / full URL configured in Strapi)
  if (media.url.startsWith("http")) return media.url;
  // Relative path — prepend the Strapi origin
  return `${STRAPI_URL}${media.url}`;
}

export type SiteSettingData = {
  id: number;
  whatsapp_phone: string;
  email?: string;
  address?: string;
  city?: string;
  instagram_url?: string;
  facebook_url?: string;
  kvk_number?: string;
  btw_number?: string;
  hero_image?: StrapiMedia | null;
  hero_title?: string | null;
  hero_subtitle?: string | null;
};

export type FaqItemData = {
  id: number;
  documentId: string;
  question: string;
  answer: string;
  sort_order: number;
  category: string;
};
