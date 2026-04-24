import type { NextConfig } from "next";

function strapiImageHostname(): string {
  const host = process.env.STRAPI_HOST?.trim();
  if (host) return host;
  const base = (process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "")
    .trim()
    .replace(/\/$/, "");
  if (base) {
    try {
      return new URL(base).hostname;
    } catch {
      /* ignore */
    }
  }
  return "localhost";
}

/** e.g. STRAPI_IMAGE_DOMAINS=media.strapi.io,cdn.example.com (Strapi Cloud CDNs) */
function extraImageHosts(): { hostname: string; protocol: "https" }[] {
  const raw = process.env.STRAPI_IMAGE_DOMAINS?.trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((hostname) => ({ protocol: "https" as const, hostname }));
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Strapi media (local)
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
      {
        // Strapi: same host as API — allow any path (uploads, CDN rewrites, Strapi Cloud)
        protocol: "https",
        hostname: strapiImageHostname(),
        pathname: "/**",
      },
      ...extraImageHosts().map((e) => ({
        protocol: e.protocol,
        hostname: e.hostname,
        pathname: "/**" as const,
      })),
    ],
  },
};

export default nextConfig;
