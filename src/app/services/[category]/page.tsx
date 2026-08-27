import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { ContactCTA } from "@/components/ContactCTA";
import { getService, serviceSlugs } from "@/content/services";
import { getPortfolioForService, routes } from "@/lib/links";

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

  const relatedPortfolio = getPortfolioForService(service.slug);

  return (
    <>
      <PageHeader eyebrow="Service" title={service.title} lead={service.excerpt}>
        <Button href={routes.contact}>Book a call</Button>
        <Button href={routes.offers} variant="secondary">
          View offers
        </Button>
      </PageHeader>

      {/* Sub-services: on-page content only. Intentionally NOT links —
          sub-service routes are deferred to a later phase. */}
      <Section aria-label="What's included" className="pt-0">
        <h2 className="text-title font-semibold text-fg">What&apos;s included</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.subServices.map((sub) => (
            <Card key={sub.slug} title={sub.title}>
              {sub.excerpt}
            </Card>
          ))}
        </div>
      </Section>

      {/* Related portfolio */}
      {relatedPortfolio.length > 0 ? (
        <Section aria-label="Related work" className="border-t border-border">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-title font-semibold text-fg">Related work</h2>
            <Link href={routes.work}>All work →</Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {relatedPortfolio.map((item) => (
              <Card
                key={item.slug}
                href={routes.workItem(item.slug)}
                title={item.title}
              >
                {item.summary}
              </Card>
            ))}
          </div>
        </Section>
      ) : null}

      <ContactCTA
        heading={`Ready to talk ${service.title.toLowerCase()}?`}
        body="Book a call and we'll scope the work and map out next steps."
      />
    </>
  );
}
