import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lekker-anatolia.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about-us`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/menu`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/faq`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terms-of-use`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/cookies`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
