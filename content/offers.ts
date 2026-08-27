/**
 * Offers — single source of truth.
 *
 * Placeholder productised offers. Cross-links (other offers, offers index) are
 * derived from this list by src/lib/links.ts — never hardcode them in pages.
 */

export type Offer = {
  slug: string;
  title: string;
  summary: string;
};

export const offers: Offer[] = [
  {
    slug: "launch-sprint",
    title: "Launch Sprint",
    summary:
      "A fixed-scope sprint to design and ship a focused, conversion-ready website in weeks, not months.",
  },
  {
    slug: "growth-engine",
    title: "Growth Engine",
    summary:
      "A rolling program of content, SEO, and experiments that compounds inbound demand month over month.",
  },
  {
    slug: "care-plan",
    title: "Care Plan",
    summary:
      "A monthly retainer covering maintenance, monitoring, and continuous small improvements.",
  },
];

export const offerSlugs = offers.map((offer) => offer.slug);

export function getOffer(slug: string): Offer | undefined {
  return offers.find((offer) => offer.slug === slug);
}
