/**
 * Portfolio / case studies — single source of truth.
 *
 * `relatedService` holds a service category slug (see content/services.ts).
 * Cross-links between a case study and its service category are derived from
 * this field by the helpers in src/lib/links.ts — never hardcode them in pages.
 */

export type PortfolioItem = {
  slug: string;
  title: string;
  summary: string;
  /** Slug of the related service category (content/services.ts). */
  relatedService: string;
};

export const portfolio: PortfolioItem[] = [
  {
    slug: "proactive-building-solutions",
    title: "Proactive Building Solutions",
    summary:
      "A ground-up website and booking flow for a property maintenance company, rebuilt for speed, clarity, and inbound lead capture.",
    relatedService: "web-development",
  },
  {
    slug: "mehboob-scales",
    title: "Mehboob Scales",
    summary:
      "A brand refresh and growth program for a weighing-equipment supplier, turning a legacy catalogue into a measurable acquisition channel.",
    relatedService: "growth-marketing",
  },
];

export const portfolioSlugs = portfolio.map((item) => item.slug);

export function getPortfolioItem(slug: string): PortfolioItem | undefined {
  return portfolio.find((item) => item.slug === slug);
}
