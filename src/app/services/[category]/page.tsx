import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FAQShowcase } from "@/components/sections/FAQShowcase";
import { ServiceDetailHero } from "@/components/sections/ServiceDetailHero";
import { ServiceDetailSection } from "@/components/sections/ServiceDetailSection";
import { getService, serviceSlugs } from "@/content/services";
import { routes } from "@/lib/links";
import { absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";

const serviceTitles: Record<string, string> = {
  design: "Brand & Web Design Services",
  "web-development": "Website Development Services",
  "growth-marketing": "SEO & Growth Marketing Services",
  "maintenance-support": "Website Maintenance & Support",
};

const serviceDescriptions: Record<string, string> = {
  design:
    "Brand identity, UX, and UI design for business websites. Monotone plans the experience and designs each page before development begins.",
  "web-development":
    "Custom website development with CMS setup, integrations, hosting, and launch support. Explore how Monotone builds business websites.",
  "growth-marketing":
    "SEO, content, paid advertising, analytics, and conversion improvements to help businesses attract relevant traffic and enquiries.",
  "maintenance-support":
    "Website updates, backups, security monitoring, performance checks, and ongoing support to keep your business site working after launch.",
};

export function generateStaticParams() {
  return serviceSlugs.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[category]">): Promise<Metadata> {
  const { category } = await params;
  const service = getService(category);
  if (!service) return {};
  return pageMetadata({
    title: serviceTitles[service.slug] ?? service.title,
    description: serviceDescriptions[service.slug] ?? service.excerpt,
    path: routes.service(service.slug),
    image: service.detailHero.image,
  });
}

export default async function ServiceCategoryPage({
  params,
}: PageProps<"/services/[category]">) {
  const { category } = await params;
  const service = getService(category);
  if (!service) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.excerpt,
    url: absoluteUrl(routes.service(service.slug)),
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: "Worldwide",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
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
