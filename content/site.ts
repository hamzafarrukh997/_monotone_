/**
 * Site-wide configuration — single source of truth for chrome (header, footer)
 * and contact details.
 *
 * The Header and Footer render ENTIRELY from this file. Never hardcode nav
 * labels, hrefs, or service names in components or pages — add them here.
 *
 * The Services dropdown (header) and the Services footer group are DERIVED from
 * content/services.ts so the 4 categories stay in exactly one place.
 */

import { services } from "./services";

export type NavItem = {
  label: string;
  href: string;
  /** Present only on items that open a dropdown (e.g. Services). */
  children?: NavItem[];
};

export type FooterGroup = {
  title: string;
  items: NavItem[];
};

export type ContactBlock = {
  email: string;
  whatsapp: string;
  location: string;
  availability: string;
};

/** The 4 service categories as nav items — the one place they become links. */
const serviceNavItems: NavItem[] = services.map((service) => ({
  label: service.title,
  href: `/services/${service.slug}`,
}));

export const site = {
  name: "Monotone",
  shortDescription: "A digital agency for design, web, and growth.",
  description:
    "Monotone is a digital agency pairing research-led design, modern web development, and measurable growth marketing.",
  /** Canonical production origin. Swap for the real domain before launch. */
  url: "https://monotone.agency",

  /** Primary header navigation. `Services` opens a dropdown of the 4 categories. */
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services", children: serviceNavItems },
    { label: "Process", href: "/process" },
    { label: "Offers", href: "/offers" },
    { label: "Insights", href: "/blog" },
  ] satisfies NavItem[],

  /** Header call-to-action. */
  cta: { label: "Book a call", href: "/contact" } satisfies NavItem,

  /** Footer link groups. `Services` mirrors the 4 categories ONLY. */
  footerGroups: [
    {
      title: "Services",
      items: serviceNavItems,
    },
    {
      title: "Company",
      items: [
        { label: "Process", href: "/process" },
        { label: "Work", href: "/work" },
        { label: "Offers", href: "/offers" },
        { label: "Insights", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      items: [
        { label: "Privacy", href: "/privacy-policy" },
        { label: "Terms", href: "/terms" },
        { label: "Cookie", href: "/cookie-policy" },
      ],
    },
  ] satisfies FooterGroup[],

  contact: {
    email: "hello@monotone.agency",
    whatsapp: "+1 (555) 010-0100",
    location: "Remote — worldwide",
    availability: "Booking new projects for Q4",
  } satisfies ContactBlock,
} as const;

export type Site = typeof site;
