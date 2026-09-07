import { ServicesCategorySection } from "@/components/sections/ServicesCategorySection";
import { servicesPage } from "@/content/services";

export function ServicesGrowthMarketingSection() {
  const { growthMarketing } = servicesPage;

  return (
    <ServicesCategorySection
      sectionId="growth-marketing"
      heading={growthMarketing.heading}
      intro={growthMarketing.intro}
      learnMoreLabel={growthMarketing.learnMoreLabel}
      learnMoreHref={growthMarketing.learnMoreHref}
      image={growthMarketing.image}
      items={growthMarketing.items}
    />
  );
}
