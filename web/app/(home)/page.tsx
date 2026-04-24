import HeroSection from "@/components/sections/HeroSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import FaqPreview from "@/components/sections/FaqPreview";
import WhatsappCTA from "@/components/sections/WhatsappCTA";
import HowToOrderSection from "@/components/sections/HowtoOrderSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import MenuPreviewSection from "@/components/sections/MenuPreviewSection";
import { getSiteSettings } from "@/lib/settings";
import { getMenuDataForHome } from "@/lib/menu-data";

export const revalidate = 3;

export default async function HomePage() {
  const [settings, { preview: menuCategories, heroTiles }] = await Promise.all([
    getSiteSettings(),
    getMenuDataForHome(),
  ]);

  return (
    <>
      <HeroSection
        phone={settings.whatsapp_phone}
        imageUrl={settings.hero_image_url}
        imageAlt={settings.hero_image_alt}
        title={settings.hero_title || undefined}
        subtitle={settings.hero_subtitle || undefined}
        categories={heroTiles}
      />
      <WhyUsSection />
      {menuCategories.length > 0 && (
        <MenuPreviewSection
          categories={menuCategories}
          phone={settings.whatsapp_phone}
          showPrices={settings.show_prices}
        />
      )}
      <HowToOrderSection />
      <TestimonialsSection />
      <FaqPreview />
      <WhatsappCTA phone={settings.whatsapp_phone} />
    </>
  );
}
