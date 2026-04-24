import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import CookieBanner from "@/components/layout/CookieBanner";
import Analytics from "@/components/layout/Analytics";
import JsonLd from "@/components/layout/JsonLd";
import { getSiteSettings } from "@/lib/settings";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lekker-anatolia.nl";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Lekker Anatolia",
    template: "%s | Lekker Anatolia",
  },
  description:
    "Ambachtelijke catering met een warme Anatolische touch. Lahmacun, pide en mezze voor elk evenement. Neem eenvoudig contact op via WhatsApp.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: BASE,
    siteName: "Lekker Anatolia",
    title: "Lekker Anatolia — Anatolische Catering",
    description:
      "Ambachtelijke catering met een warme Anatolische touch. Lahmacun, pide en mezze voor elk evenement.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lekker Anatolia Catering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lekker Anatolia — Anatolische Catering",
    description:
      "Ambachtelijke catering met een warme Anatolische touch.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <Analytics />
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased`}
        suppressHydrationWarning
      >
        <JsonLd settings={settings} />
        <Header phone={settings.whatsapp_phone} />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp phone={settings.whatsapp_phone} />
        <CookieBanner />
      </body>
    </html>
  );
}
