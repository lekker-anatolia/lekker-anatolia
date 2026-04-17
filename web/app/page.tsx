import HeroSection from "@/components/sections/HeroSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import FaqPreview from "@/components/sections/FaqPreview";
import WhatsappCTA from "@/components/sections/WhatsappCTA";
import HowToOrderSection from "@/components/sections/HowtoOrderSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { getSiteSettings } from "@/lib/settings";

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <>
      <HeroSection
        phone={settings.whatsapp_phone}
        imageUrl={settings.hero_image_url}
        imageAlt={settings.hero_image_alt}
        title={settings.hero_title || undefined}
        subtitle={settings.hero_subtitle || undefined}
      />
      <WhyUsSection />
      <HowToOrderSection />
      <TestimonialsSection />
      <FaqPreview />
      <WhatsappCTA phone={settings.whatsapp_phone} />
    </>
  );
}
