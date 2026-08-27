/**
 * Service categories — single source of truth.
 *
 * There are 4 categories. Each category has a `subServices` array.
 *
 * SUB-SERVICES: rendered as on-page content (cards/text) on the category page.
 * They carry a `slug` so that dedicated sub-service routes can be wired up in a
 * LATER phase. Those pages do NOT exist yet, so NOTHING links or CTAs to them
 * right now. Do not add sub-service links until the pages are authored.
 *
 * `relatedPortfolio` holds portfolio slugs (see content/portfolio.ts). Cross-
 * links are derived from this field by src/lib/links.ts — never hardcode them.
 */

export type SubService = {
  /** Reserved for a future /services/[category]/[subService] route. */
  slug: string;
  title: string;
  excerpt: string;
};

export type ServiceCategory = {
  slug: string;
  title: string;
  excerpt: string;
  /** Slugs of related portfolio case studies (content/portfolio.ts). */
  relatedPortfolio: string[];
  subServices: SubService[];
};

export const services: ServiceCategory[] = [
  {
    slug: "design",
    title: "Design",
    excerpt:
      "Research-led product and brand design that turns a rough idea into something people trust and enjoy using.",
    relatedPortfolio: ["mehboob-scales"],
    subServices: [
      {
        slug: "ux-design",
        title: "UX Design",
        excerpt:
          "User flows, wireframes, and prototypes grounded in real user behaviour, not guesswork.",
      },
      {
        slug: "ui-design",
        title: "UI Design",
        excerpt:
          "High-fidelity interfaces and design systems that stay consistent as you scale.",
      },
      {
        slug: "brand-identity",
        title: "Brand Identity",
        excerpt:
          "Logo, type, colour, and voice pulled together into a coherent, recognisable identity.",
      },
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    excerpt:
      "Fast, accessible, maintainable websites and web apps built on a modern, future-proof stack.",
    relatedPortfolio: ["proactive-building-solutions"],
    subServices: [
      {
        slug: "website-development",
        title: "Website Development",
        excerpt:
          "Marketing sites and web apps engineered for performance, SEO, and easy iteration.",
      },
      {
        slug: "cms",
        title: "CMS",
        excerpt:
          "Content models and editing experiences your team can actually run without us.",
      },
      {
        slug: "integrations-infrastructure",
        title: "Integrations & Infrastructure",
        excerpt:
          "APIs, third-party tools, and hosting wired together into a reliable, observable whole.",
      },
    ],
  },
  {
    slug: "growth-marketing",
    title: "Growth Marketing",
    excerpt:
      "Compounding, measurable demand — content, search, and analytics working as one system.",
    relatedPortfolio: ["mehboob-scales"],
    subServices: [
      {
        slug: "content-copywriting",
        title: "Content & Copywriting",
        excerpt:
          "Positioning and words that make the value obvious and move people to act.",
      },
      {
        slug: "seo",
        title: "SEO",
        excerpt:
          "Technical, on-page, and content SEO that earns durable organic visibility.",
      },
      {
        slug: "analytics-reporting",
        title: "Analytics & Reporting",
        excerpt:
          "Clean tracking and clear dashboards so every decision is backed by data.",
      },
    ],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    excerpt:
      "Ongoing care that keeps everything we build fast, secure, and quietly dependable.",
    relatedPortfolio: ["proactive-building-solutions"],
    subServices: [
      {
        slug: "site-health",
        title: "Site Health",
        excerpt:
          "Monitoring, updates, backups, and security patches handled before they become problems.",
      },
      {
        slug: "ongoing-care",
        title: "Ongoing Care",
        excerpt:
          "A retained partner for tweaks, improvements, and the next round of ideas.",
      },
    ],
  },
];

export const serviceSlugs = services.map((service) => service.slug);

export function getService(slug: string): ServiceCategory | undefined {
  return services.find((service) => service.slug === slug);
}
