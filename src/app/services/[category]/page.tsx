import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FAQShowcase } from "@/components/sections/FAQShowcase";
import { ServiceDetailHero } from "@/components/sections/ServiceDetailHero";
import { ServiceDetailSection } from "@/components/sections/ServiceDetailSection";
import { getService, serviceSlugs } from "@/content/services";
import { routes } from "@/lib/links";

export function generateStaticParams() {
  return serviceSlugs.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[category]">): Promise<Metadata> {
  const { category } = await params;
  const service = getService(category);
  if (!service) return {};
  return {
    title: service.title,
    description: service.excerpt,
    alternates: { canonical: routes.service(service.slug) },
  };
}

export default async function ServiceCategoryPage({
  params,
}: PageProps<"/services/[category]">) {
  const { category } = await params;
  const service = getService(category);
  if (!service) notFound();

  return (
    <>
      <ServiceDetailHero service={service} />
      {service.detailSections.map((section, index) => (
        <ServiceDetailSection
          key={section.slug}
          section={section}
          connectTimelineFromTop={index > 0}
        />
      ))}
      {service.faq ? (
        <>
          <div
            aria-hidden="true"
            className="h-[clamp(5rem,7.292vw,8.75rem)] bg-white"
          />
          <FAQShowcase
            heading={service.faq.heading}
            items={service.faq.items}
            sectionId={`service-${service.slug}-faq`}
          />
        </>
      ) : null}
    </>
  );
}
