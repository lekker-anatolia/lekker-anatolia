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

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Strapi media uploads (local dev)
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        // Strapi media uploads (production)
        protocol: "https",
        hostname: strapiImageHostname(),
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
