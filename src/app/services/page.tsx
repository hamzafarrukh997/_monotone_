import type { Metadata } from "next";
import { FAQShowcase } from "@/components/sections/FAQShowcase";
import { ServicesDesignSection } from "@/components/sections/ServicesDesignSection";
import { ServicesDevelopmentSection } from "@/components/sections/ServicesDevelopmentSection";
import { ServicesGrowthMarketingSection } from "@/components/sections/ServicesGrowthMarketingSection";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServicesMaintenanceSection } from "@/components/sections/ServicesMaintenanceSection";
import { servicesPage } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Design, web development, growth marketing, and maintenance & support.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesDesignSection />
      <ServicesDevelopmentSection />
      <ServicesGrowthMarketingSection />
      <ServicesMaintenanceSection />
      <FAQShowcase
        heading={servicesPage.faq.heading}
        items={servicesPage.faq.items}
        sectionId="services-faq"
      />
    </>
  );
}
