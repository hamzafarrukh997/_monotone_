import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCaseStudy,
  portfolioSlugs,
  publishedCaseStudies,
} from "@/content/portfolio";
import { getServiceForPortfolio, routes } from "@/lib/links";
import { site } from "@/content/site";
import { CaseStudyDetail } from "@/components/sections/CaseStudyDetail";

export function generateStaticParams() {
  return portfolioSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.client,
    description: study.summary,
    alternates: { canonical: routes.workItem(study.slug) },
    openGraph: {
      type: "article",
      title: study.client,
      description: study.summary,
      url: routes.workItem(study.slug),
    },
  };
}

export default async function WorkDetailPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = publishedCaseStudies.findIndex((item) => item.slug === study.slug);
  const nextStudy =
    publishedCaseStudies[(index + 1) % publishedCaseStudies.length];
  const relatedService = getServiceForPortfolio(study.slug);
  const canonicalUrl = new URL(routes.workItem(study.slug), site.url).toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.client,
    description: study.summary,
    url: canonicalUrl,
    dateCreated: study.year,
    creator: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    about: study.services,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <CaseStudyDetail
        study={study}
        projectNumber={String(index + 1).padStart(2, "0")}
        relatedService={relatedService}
        nextStudy={nextStudy}
      />
    </>
  );
}
