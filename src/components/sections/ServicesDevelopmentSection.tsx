import { ServicesCategorySection } from "@/components/sections/ServicesCategorySection";
import { servicesPage } from "@/content/services";

export function ServicesDevelopmentSection() {
  const { development } = servicesPage;

  return (
    <ServicesCategorySection
      sectionId="development"
      heading={development.heading}
      intro={development.intro}
      learnMoreLabel={development.learnMoreLabel}
      learnMoreHref={development.learnMoreHref}
      image={development.image}
      items={development.items}
    />
  );
}
