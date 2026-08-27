/**
 * Cross-link logic — the ONE place the site's internal relationships are
 * encoded. Pages call these helpers instead of hardcoding related items, so
 * every cross-link is automatic and stays consistent with the content layer.
 *
 * See the cross-link map in CLAUDE.md.
 */

import { getService, services, type ServiceCategory } from "@/content/services";
import {
  getPortfolioItem,
  portfolio,
  type PortfolioItem,
} from "@/content/portfolio";
import { offers, type Offer } from "@/content/offers";

/** Canonical route builders — avoids stringly-typed hrefs scattered in pages. */
export const routes = {
  home: "/",
  services: "/services",
  service: (slug: string) => `/services/${slug}`,
  offers: "/offers",
  offer: (slug: string) => `/offers/${slug}`,
  work: "/work",
  workItem: (slug: string) => `/work/${slug}`,
  blog: "/blog",
  post: (slug: string) => `/blog/${slug}`,
  process: "/process",
  contact: "/contact",
  privacyPolicy: "/privacy-policy",
  terms: "/terms",
  cookiePolicy: "/cookie-policy",
} as const;

/* -------------------------------------------------------------------------- */
/* Service <-> Portfolio                                                       */
/* -------------------------------------------------------------------------- */

/** The service category a case study belongs to. */
export function getServiceForPortfolio(
  portfolioSlug: string,
): ServiceCategory | undefined {
  const item = getPortfolioItem(portfolioSlug);
  return item ? getService(item.relatedService) : undefined;
}

/** The case studies related to a service category. */
export function getPortfolioForService(serviceSlug: string): PortfolioItem[] {
  const service = getService(serviceSlug);
  if (!service) return [];
  return service.relatedPortfolio
    .map((slug) => getPortfolioItem(slug))
    .filter((item): item is PortfolioItem => Boolean(item));
}

/* -------------------------------------------------------------------------- */
/* "The other ones" helpers                                                    */
/* -------------------------------------------------------------------------- */

/** Every case study except the current one. */
export function getOtherPortfolio(currentSlug: string): PortfolioItem[] {
  return portfolio.filter((item) => item.slug !== currentSlug);
}

/** Every offer except the current one. */
export function getOtherOffers(currentSlug: string): Offer[] {
  return offers.filter((offer) => offer.slug !== currentSlug);
}

/* -------------------------------------------------------------------------- */
/* Blog -> Services                                                            */
/* -------------------------------------------------------------------------- */

/** Resolve a post's `relatedServices` slugs to full service categories. */
export function getServicesForSlugs(slugs: string[]): ServiceCategory[] {
  return slugs
    .map((slug) => getService(slug))
    .filter((service): service is ServiceCategory => Boolean(service));
}

export { services, portfolio, offers };
