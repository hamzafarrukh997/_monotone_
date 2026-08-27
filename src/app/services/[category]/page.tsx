import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
      <h1>{service.title}</h1>
      <p>{service.excerpt}</p>

      {/* Sub-services: on-page content only. Intentionally NOT links —
          sub-service routes are deferred to a later phase. */}
      <section aria-label="What's included">
        <h2>What&apos;s included</h2>
        <ul>
          {service.subServices.map((sub) => (
            <li key={sub.slug}>
              <strong>{sub.title}</strong> — {sub.excerpt}
            </li>
          ))}
        </ul>
      </section>

      {/* Related portfolio */}
      {relatedPortfolio.length > 0 ? (
        <section aria-label="Related work">
          <h2>Related work</h2>
          <ul>
            {relatedPortfolio.map((item) => (
              <li key={item.slug}>
                <a href={routes.workItem(item.slug)}>{item.title}</a>
              </li>
            ))}
          </ul>
          <a href={routes.work}>All work</a>
        </section>
      ) : null}

      {/* Cross-links */}
      <section aria-label="Contact call to action">
        <a href={routes.offers}>View offers</a>
        <a href={routes.contact}>Book a call</a>
      </section>
    </>
  );
}
