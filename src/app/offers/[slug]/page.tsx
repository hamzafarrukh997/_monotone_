import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOffer, offerSlugs } from "@/content/offers";
import { routes } from "@/lib/links";
import { OfferDetailHero } from "@/components/sections/OfferDetailHero";
import { OfferIncludedSection } from "@/components/sections/OfferIncludedSection";
import { OfferWhySection } from "@/components/sections/OfferWhySection";
import { OfferTimelineSection } from "@/components/sections/OfferTimelineSection";
import { OfferGuaranteeSection } from "@/components/sections/OfferGuaranteeSection";
import { OfferCrossLinks } from "@/components/sections/OfferCrossLinks";
import { OfferClosingCta } from "@/components/sections/OfferClosingCta";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return offerSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/offers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) return {};
  return pageMetadata({
    title: `${offer.title} for Business Websites`,
    description: offer.description,
    path: routes.offer(offer.slug),
  });
}

export default async function OfferDetailPage({
  params,
}: PageProps<"/offers/[slug]">) {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) notFound();

  return (
    <>
      <OfferDetailHero offer={offer} />
      <OfferIncludedSection offer={offer} />
      <OfferWhySection offer={offer} />
      <OfferTimelineSection offer={offer} />
      <OfferGuaranteeSection offer={offer} />
      <OfferCrossLinks currentSlug={offer.slug} />
      <OfferClosingCta offer={offer} />
    </>
  );
}
