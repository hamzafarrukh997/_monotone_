import { servicesPage } from "@/content/services";
import { ServicesCategorySection } from "@/components/sections/ServicesCategorySection";

export function ServicesDesignSection() {
  const { design } = servicesPage;

  return (
    <ServicesCategorySection
      sectionId="design"
      heading={design.heading}
      intro={design.intro}
      learnMoreLabel={design.learnMoreLabel}
      learnMoreHref={design.learnMoreHref}
      image={design.image}
      items={design.items}
      defaultOpenItem={0}
    />
  );
}
