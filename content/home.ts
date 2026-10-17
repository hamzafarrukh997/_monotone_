/**
 * Homepage content — single source of truth for the copy/CTAs rendered on `/`.
 * Homepage sections are added here as their final designs are implemented.
 */

import { routes } from "@/lib/links";
import { offers as offerPackages } from "@/content/offers";

export const home = {
  hero: {
    eyebrow: "Design. Development. Growth.",
    exploreLabel: "Scroll to explore",
    pauseMotionLabel: "Pause motion",
    resumeMotionLabel: "Resume motion",
    /**
     * Headline split around the decorative inline toggle graphic.
     * Accessible name is `${before} ${after}` — the toggle is aria-hidden.
     */
    headline: {
      before: "we make",
      after: "obsessively good websites",
    },
    subcopy:
      "We build your website, brand, and copy to make your business easier to find, understand, and trust.",
    /** Large, low-contrast background watermark. */
    watermark: [""],
    primaryCta: { label: "Request a free audit", href: routes.contact },
    secondaryCta: { label: "Contact us", href: routes.contact },
  },
  offers: {
    heading: {
      before: "Find the ",
      accent: "right fit",
      after: " for your business",
    },
    sectionCta: {
      label: "View all offers",
      href: routes.offers,
    },
    cta: { label: "Request a Quote", href: routes.contact },
    packages: offerPackages,
  },
  process: {
    heading: {
      before: "Your website in ",
      accent: "four steps",
    },
    steps: [
      {
        number: "01",
        label: "Discover",
        title: "We find out where you actually stand.",
        body: "If you don't have a site, we look at how people find you now and work out what your site needs to do. If you have, we tell you plainly what's working and what's costing you customers.",
      },
      {
        number: "02",
        label: "Plan",
        title: "You see the whole plan before we build anything.",
        body: "We write out what the site will say and how it's laid out — in plain language. Nothing gets built until you approve it.",
      },
      {
        number: "03",
        label: "Build",
        title: "You watch it get built, not just see it at the end.",
        body: "You see pages as they're built, not just at the end — so changes get caught early.",
      },
      {
        number: "04",
        label: "Launch",
        title: "It goes live — and we keep working on it.",
        body: "Launch isn't the finish line. We watch performance, fix what needs fixing, and keep improving.",
      },
    ],
  },
  work: {
    heading: {
      before: "See the ",
      accent: "work",
    },
    cta: {
      label: "View all projects",
      href: routes.work,
    },
  },
  insights: {
    heading: {
      before: "Fresh insights for ",
      accent: "ambitious brands",
    },
    cta: {
      label: "Explore all",
      href: routes.blog,
    },
    articles: [
      {
        category: "Business guides",
        kicker: "Read the quote, not just the total.",
        title: "How much should a small business website cost in Pakistan?",
        visual: "pricing",
        href: routes.post("small-business-website-cost-pakistan"),
      },
      {
        category: "Business guides",
        kicker: "Own the foundation. Use the platforms.",
        title:
          "Website vs Facebook page vs Instagram: what a local business actually needs",
        visual: "channels",
        href: routes.post("website-vs-facebook-vs-instagram-local-business"),
      },
      {
        category: "Growth strategy",
        kicker: "Fix the leak, not the traffic.",
        title: "The real reason your website gets visitors but no enquiries",
        visual: "enquiries",
        href: routes.post("website-visitors-but-no-enquiries"),
      },
    ],
  },
  faq: {
    heading: {
      before: "Your ",
      accent: "questions,",
      after: " answered",
    },
    items: [
      {
        question: "How much does a website cost?",
        answer:
          "Every project is scoped around what your business needs. Our Starter and Complete packages provide clear starting points, and we confirm the final price before any work begins.",
      },
      {
        question: "What happens after the website is launched?",
        answer:
          "We stay involved after launch to monitor performance, handle maintenance, resolve issues, and keep improving the website as your business grows.",
      },
      {
        question: "Will the website be prepared for Google and AI?",
        answer:
          "Yes. We build in technical SEO, speed, structured content, and clear on-page foundations so search engines and AI systems can understand and surface your business.",
      },
      {
        question: "What do you do?",
        answer:
          "We handle strategy, brand identity, UX and UI design, website development, copywriting, growth marketing, SEO, analytics, and ongoing maintenance and support.",
      },
    ],
  },
  testimonials: [
    {
      quote:
        "We needed a website that showed our products clearly and build trust with our industrial clients. This website delivers exactly that.",
      name: "Farrukh Chauhdry",
      role: "Owner, Mehboob Scales",
    },
    {
      quote:
        "I expected a nicer-looking version of what we had. What we got was a proper explanation of the business — every service laid out, and the alert system finally connected to the work it supports.",
      name: "Jon Credendino",
      role: "Owner, Proactive Building Solutions",
    },
  ],
  insightsPrototype: {
    heading: "Insights",
    cta: {
      label: "More blog articles",
      href: routes.blog,
    },
    articles: [
      {
        category: "Digital design",
        date: "Sep 12, 2026",
        dateIso: "2026-09-12",
        title: "What makes a digital experience feel effortless?",
        author: "Avery",
        role: "Product Designer",
        href: routes.blog,
      },
      {
        category: "Studio notes",
        date: "Sep 04, 2026",
        dateIso: "2026-09-04",
        title: "The systems behind websites that keep getting better",
        author: "Noah",
        role: "Creative Director",
        href: routes.blog,
      },
      {
        category: "Growth",
        date: "Aug 28, 2026",
        dateIso: "2026-08-28",
        title: "Turning useful ideas into content people remember",
        author: "Mia",
        role: "Growth Strategist",
        href: routes.blog,
      },
    ],
  },
} as const;

export type Home = typeof home;
