import type { SiteSettings } from "@/lib/settings";

interface JsonLdProps {
  settings: SiteSettings;
}

export default function JsonLd({ settings }: JsonLdProps) {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lekker-anatolia.nl";

  const schema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Lekker Anatolia",
    description:
      "Ambachtelijke catering met een warme Anatolische touch. Lahmacun, pide en meer voor elk evenement.",
    url: BASE,
    telephone: settings.whatsapp_phone ? `+${settings.whatsapp_phone}` : undefined,
    email: settings.email || undefined,
    address: settings.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address,
          addressLocality: settings.city || "Nederland",
          addressCountry: "NL",
        }
      : undefined,
    servesCuisine: ["Turks", "Anatolisch", "Midden-Oosters"],
    priceRange: "€€",
    hasMenu: `${BASE}/menu`,
    sameAs: [
      settings.instagram_url || undefined,
      settings.facebook_url || undefined,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
