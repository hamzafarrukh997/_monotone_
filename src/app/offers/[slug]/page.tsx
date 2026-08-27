import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { ContactCTA } from "@/components/ContactCTA";
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
      <PageHeader eyebrow="Offer" title={offer.title} lead={offer.summary}>
        <Button href={routes.contact}>Book a call</Button>
        <Button href={routes.offers} variant="secondary">
          All offers
        </Button>
      </PageHeader>

      {otherOffers.length > 0 ? (
        <Section aria-label="Other offers" className="pt-0">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-title font-semibold text-fg">Other offers</h2>
            <Link href={routes.offers}>All offers →</Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {otherOffers.map((other) => (
              <Card
                key={other.slug}
                href={routes.offer(other.slug)}
                title={other.title}
              >
                {other.summary}
              </Card>
            ))}
          </div>
        </Section>
      ) : null}

      <ContactCTA
        heading={`Interested in the ${offer.title}?`}
        body="Book a call and we'll confirm scope, timing, and pricing."
      />
    </>
  );
}
