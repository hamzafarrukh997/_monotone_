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
import { absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return portfolioSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const heroImage = study.images.find((image) => image.role === "hero")?.src;

  const base = pageMetadata({
    title: `${study.client} Website Case Study`,
    description: study.summary,
    path: routes.workItem(study.slug),
    image: heroImage,
  });

  return {
    ...base,
    openGraph: {
      type: "article",
      siteName: site.name,
      title: `${study.client} Website Case Study | ${site.name}`,
      description: study.summary,
      url: absoluteUrl(routes.workItem(study.slug)),
      images: heroImage ? [absoluteUrl(heroImage)] : undefined,
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
  const canonicalUrl = absoluteUrl(routes.workItem(study.slug));
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
          __html: jsonLd(structuredData),
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
