import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { ContactCTA } from "@/components/ContactCTA";
import { getPortfolioItem, portfolioSlugs } from "@/content/portfolio";
import { getOtherPortfolio, getServiceForPortfolio, routes } from "@/lib/links";

export function generateStaticParams() {
  return portfolioSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: routes.workItem(item.slug) },
  };
}

export default async function WorkDetailPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) notFound();

  const relatedService = getServiceForPortfolio(item.slug);
  const otherWork = getOtherPortfolio(item.slug);

  return (
    <>
      <PageHeader eyebrow="Case study" title={item.title} lead={item.summary}>
        <Button href={routes.contact}>Start a project</Button>
        <Button href={routes.work} variant="secondary">
          All work
        </Button>
      </PageHeader>

      {/* Related service category */}
      {relatedService ? (
        <Section aria-label="Related service" className="pt-0">
          <h2 className="text-title font-semibold text-fg">Related service</h2>
          <div className="mt-8">
            <Card
              href={routes.service(relatedService.slug)}
              title={relatedService.title}
            >
              {relatedService.excerpt}
            </Card>
          </div>
        </Section>
      ) : null}

      {/* The other case studies */}
      {otherWork.length > 0 ? (
        <Section aria-label="More work" className="border-t border-border">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-title font-semibold text-fg">More work</h2>
            <Link href={routes.work}>All work →</Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {otherWork.map((other) => (
              <Card
                key={other.slug}
                href={routes.workItem(other.slug)}
                title={other.title}
              >
                {other.summary}
              </Card>
            ))}
          </div>
        </Section>
      ) : null}

      <ContactCTA />
    </>
  );
}
