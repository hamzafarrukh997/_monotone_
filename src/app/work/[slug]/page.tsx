import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
      <h1>{item.title}</h1>
      <p>{item.summary}</p>

      {/* Related service category */}
      {relatedService ? (
        <section aria-label="Related service">
          <h2>Related service</h2>
          <a href={routes.service(relatedService.slug)}>{relatedService.title}</a>
        </section>
      ) : null}

      {/* The other case studies */}
      {otherWork.length > 0 ? (
        <section aria-label="More work">
          <h2>More work</h2>
          <ul>
            {otherWork.map((other) => (
              <li key={other.slug}>
                <a href={routes.workItem(other.slug)}>{other.title}</a>
              </li>
            ))}
          </ul>
          <a href={routes.work}>All work</a>
        </section>
      ) : null}

      <section aria-label="Contact call to action">
        <a href={routes.contact}>Start a project</a>
      </section>
    </>
  );
}
