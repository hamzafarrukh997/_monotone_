import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOffer, offerSlugs } from "@/content/offers";
import { getOtherOffers, routes } from "@/lib/links";

export function generateStaticParams() {
  return offerSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/offers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) return {};
  return {
    title: offer.title,
    description: offer.summary,
    alternates: { canonical: routes.offer(offer.slug) },
  };
}

export default async function OfferDetailPage({
  params,
}: PageProps<"/offers/[slug]">) {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) notFound();

  const otherOffers = getOtherOffers(offer.slug);

  return (
    <>
      <h1>{offer.title}</h1>
      <p>{offer.summary}</p>

      {otherOffers.length > 0 ? (
        <section aria-label="Other offers">
          <h2>Other offers</h2>
          <ul>
            {otherOffers.map((other) => (
              <li key={other.slug}>
                <a href={routes.offer(other.slug)}>{other.title}</a>
              </li>
            ))}
          </ul>
          <a href={routes.offers}>All offers</a>
        </section>
      ) : null}

      <section aria-label="Contact call to action">
        <a href={routes.contact}>Book a call</a>
      </section>
    </>
  );
}
