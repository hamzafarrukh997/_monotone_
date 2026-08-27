/**
 * Homepage content — single source of truth for the copy/CTAs rendered on `/`.
 * Only the hero exists for now; other sections are added in later phases.
 */

import { routes } from "@/lib/links";

export const home = {
  hero: {
    /**
     * Headline split around the decorative inline toggle graphic.
     * Accessible name is `${before} ${after}` — the toggle is aria-hidden.
     */
    headline: {
      before: "we make",
      after: "obsessively good websites",
    },
    subcopy:
      "We build your website, brand, and copy and get you found on Google and in AI answers, instantly trusted.",
    /** Large, low-contrast background watermark — one line per entry. */
    watermark: ["one tone", "one vision", "one direction"],
    primaryCta: { label: "Request a free audit", href: routes.contact },
    secondaryCta: { label: "Contact us", href: routes.contact },
  },
} as const;

export type Home = typeof home;
