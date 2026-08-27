import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ContactCTA } from "@/components/ContactCTA";
import { offers, routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Offers",
  description:
    "Productised ways to work with Monotone — from a fixed-scope launch sprint to an ongoing growth engine and care plan.",
};

export default function OffersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Offers"
        title="Clear, productised ways to get started"
        lead="Pick the shape that fits where you are. Each one has a defined scope and a clear outcome."
      />

      <Section aria-label="All offers" className="pt-0">
        <div className="grid gap-4 sm:grid-cols-3">
          {offers.map((offer) => (
            <Card
              key={offer.slug}
              href={routes.offer(offer.slug)}
              title={offer.title}
            >
              {offer.summary}
            </Card>
          ))}
        </div>
      </Section>

      <ContactCTA />
    </>
  );
}
