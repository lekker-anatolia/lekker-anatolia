function readStrapiBaseUrl(): string {
  const raw =
    process.env.STRAPI_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "";
  if (raw) {
    // Strip trailing slash so /api/... joins correctly
    return raw.replace(/\/$/, "");
  }
  return "http://localhost:1337";
}

// Prefer STRAPI_URL (server-only). NEXT_PUBLIC_API_URL is a supported fallback.
export const STRAPI_URL = readStrapiBaseUrl();

const STRAPI_TOKEN = (process.env.STRAPI_API_TOKEN ?? "").trim();

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

    // In dev, always fetch fresh so Strapi edits show up immediately.
    // In prod, honour the caller's `next.revalidate`.
    const isDev = process.env.NODE_ENV !== "production";
    const fetchInit: RequestInit & { next?: NextFetchRequestConfig } = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };
    if (isDev) {
      fetchInit.cache = "no-store";
    } else if (next) {
      fetchInit.next = next;
    }

    const res = await fetch(`${STRAPI_URL}/api${path}`, fetchInit);

    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      if (res.status === 404 || res.status === 403 || res.status === 401) {
        // Always log auth/deny so Vercel / server logs show the real cause (token, permissions, URL).
        console.warn(
          `[strapi] ${res.status} ${path} — check STRAPI_URL, STRAPI_API_TOKEN, and Public permissions in Strapi. ${errBody ? errBody.slice(0, 200) : ""}`
        );
      } else {
        console.error(
          `Strapi error ${res.status} for ${path}:`,
          errBody.slice(0, 500)
        );
      }
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

/** Unwraps Strapi 4/5 media shapes (flat, or nested `data` / `attributes`) to a single object with `url`. */
export function pickStrapiMedia(raw: unknown): StrapiMedia | null {
  if (raw == null) return null;
  if (typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.url === "string" && o.url.length > 0) {
    return o as StrapiMedia;
  }
  const data = o.data;
  if (Array.isArray(data) && data[0] != null) {
    return pickStrapiMedia(data[0]);
  }
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    if (typeof d.url === "string" && d.url.length > 0) {
      return d as StrapiMedia;
    }
    const attrs = d.attributes as Record<string, unknown> | undefined;
    if (attrs && typeof attrs.url === "string") {
      return {
        id: typeof d.id === "number" ? d.id : 0,
        url: attrs.url,
        alternativeText: (attrs.alternativeText as string | null) ?? null,
      };
    }
  }
  return null;
}

/** Converts a Strapi media URL to an absolute URL usable by next/image. */
export function getStrapiMediaUrl(media: unknown): string | null {
  const m = pickStrapiMedia(media);
  if (!m?.url) return null;
  if (m.url.startsWith("http")) return m.url;
  return `${STRAPI_URL}${m.url}`;
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
  hero?: StrapiMedia | null;
  hero_image?: StrapiMedia | null;
  hero_title?: string | null;
  hero_subtitle?: string | null;
  show_prices?: boolean | null;
};

export type FaqItemData = {
  id: number;
  documentId: string;
  question: string;
  answer: string;
  sort_order: number;
  category: string;
};
