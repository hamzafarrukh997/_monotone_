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

  /** Primary header navigation. */
  nav: [
    { label: "Services", href: "/services", children: serviceNavItems },
    { label: "Work", href: "/work" },
    { label: "Offers", href: "/offers" },
    { label: "Insights", href: "/blog" },
  ] satisfies NavItem[],

  /** Header call-to-action. */
  cta: { label: "Let's Talk", href: "/contact" } satisfies NavItem,

  projectRequest: {
    title: "Tell us about your project",
    servicePrompt: "What can we help you with?",
    serviceOptions: [...services.map((service) => service.title), "Other"],
    budgetPrompt: "What budget range are you considering?",
    budgetOptions: ["$2k–$5k", "$5k–$10k", "$10k–$25k", "$25k+"],
    detailsPrompt: "Your information",
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    detailsPlaceholder: "Tell us what you want to build",
    submitLabel: "Submit",
    sentLabel: "Sent",
    successMessage: "Thanks — we’ve received your request and will get back to you soon.",
    errorMessage: "Please complete the highlighted fields.",
    sendErrorMessage:
      "Something went wrong sending your request. Please try again or email us directly.",
  },

  footerCta: {
    heading: {
      before: "Let’s build the website",
      after: "your business deserves.",
    },
    body: "Bring us the rough idea, the half-finished brief, or the website that has stopped pulling its weight. We’ll help you find the clearest way forward.",
    cta: "Start the conversation",
    note: "No polished brief required.",
  },

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
    whatsapp: "+92 305 4602778",
    location: "Remote — worldwide",
    availability: "Booking new projects for Q4",
  } satisfies ContactBlock,
} as const;

export type Site = typeof site;
