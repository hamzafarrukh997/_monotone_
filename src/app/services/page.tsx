import type { Metadata } from "next";
import { FAQShowcase } from "@/components/sections/FAQShowcase";
import { ServicesDesignSection } from "@/components/sections/ServicesDesignSection";
import { ServicesDevelopmentSection } from "@/components/sections/ServicesDevelopmentSection";
import { ServicesGrowthMarketingSection } from "@/components/sections/ServicesGrowthMarketingSection";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServicesMaintenanceSection } from "@/components/sections/ServicesMaintenanceSection";
import { servicesPage } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Web Design, Development & Digital Marketing Services",
  description:
    "Explore Monotone's brand and web design, website development, SEO and growth marketing, and ongoing website maintenance services.",
  path: "/services",
});

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
