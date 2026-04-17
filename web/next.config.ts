import type { NextConfig } from "next";

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
        hostname: process.env.STRAPI_HOST ?? "localhost",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
