import { ServicesCategorySection } from "@/components/sections/ServicesCategorySection";
import { servicesPage } from "@/content/services";

export function ServicesMaintenanceSection() {
  const { maintenance } = servicesPage;

  return (
    <ServicesCategorySection
      sectionId="maintenance-support"
      heading={maintenance.heading}
      intro={maintenance.intro}
      learnMoreLabel={maintenance.learnMoreLabel}
      learnMoreHref={maintenance.learnMoreHref}
      image={maintenance.image}
      items={maintenance.items}
    />
  );
}
