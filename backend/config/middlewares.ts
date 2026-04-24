function parseOrigins(
  value: string,
  extras: string[] = ["http://localhost:3000", "http://localhost:3001"]
) {
  const fromEnv = value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return [...new Set([...fromEnv, ...extras])];
}

export default ({ env }: { env: (key: string, fallback?: string) => string }) => [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      // FRONTEND_URL: comma-separated, e.g. "https://site.com,https://site.vercel.app"
      origin: parseOrigins(
        env("FRONTEND_URL", "http://localhost:3000")
      ),
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
