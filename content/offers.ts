/**
 * Offers — single source of truth for the three packages (Starter, Complete,
 * Support). One data module, three surfaces: the homepage teaser
 * (content/home.ts re-exports `offers` as its `packages`), the hub (/offers),
 * and the per-offer deep pages (/offers/[slug]), which render `detail`.
 *
 * Cross-links (other offers, offers index) are derived from this list by
 * lib/links.ts — never hardcode them in pages.
 */

export type OfferDetail = {
  eyebrow: string;
  headline: string;
  intro: string;
  includedHeading: string;
  /** Bold lead-in shown above the included groups (e.g. "Everything in Starter, plus:"). */
  includedIntro?: string;
  includedGroups: { title: string; items: string[] }[];
  whyHeading: string;
  whyIntro: string;
  whyPoints: { lead: string; body: string }[];
  timelineSteps: { label: string; body: string }[];
  /** Bold closing line under the timeline (not every package has one). */
  timelineClosing?: string;
  /** Explanation paragraph under the headline guarantee (see `guarantee` below). */
  guaranteeBody: string;
  closingHeading: string;
  closingBody: string;
  closingNote: string;
};

export type Offer = {
  slug: string;
  title: string;
  /** Bold lead-in used by the hub's editorial row (e.g. "For new and small businesses."). */
  positioning: string;
  /** Short narrative description used by the hub's editorial row. */
  description: string;
  /** Compact one-liner used by the dense homepage teaser card. */
  summary: string;
  badge: string | null;
  includedCount: number;
  features: string[];
  guarantee: string;
  terms: string;
  featured: boolean;
  artwork: {
    frame: string;
    arrows: string;
    arrowsHeight: number;
  };
  /** Full copy for this package's own page (/offers/[slug]). */
  detail: OfferDetail;
};

export const offers: Offer[] = [
  {
    slug: "starter",
    title: "Starter Package",
    positioning: "For new and small businesses.",
    description:
      "Your website, live in one working week. Everything a customer needs to find you, trust you, and get in touch, without the long timeline.",
    summary: "Your website, live in one week.",
    badge: null,
    includedCount: 4,
    features: [
      "5–7 page website, mobile-first",
      "Website copywriting",
      "SEO foundation — speed, technical, on-page",
      "3 months maintenance and support",
      "Google Business Profile set up",
      "WhatsApp chat and enquiry forms",
      "Logo refined, colours and fonts set",
      "Analytics and conversion tracking",
      "Hosting, domain and deployment",
    ],
    guarantee: "Live in 7 working days, or you get 50% off.",
    terms:
      "Placeholder terms: final eligibility and delivery conditions will appear here.",
    featured: false,
    artwork: {
      frame: "/offers/figma-starter-card.svg",
      arrows: "/offers/figma-starter-arrows.svg",
      arrowsHeight: 355.001,
    },
    detail: {
      eyebrow: "For new and small businesses",
      headline: "A website that’s live in a week, not a quarter",
      intro:
        "Most small businesses lose months waiting on a website that keeps slipping. Starter exists to end that. A complete, professional site, written, designed, built, and live inside one working week. You get everything a customer needs to find you, trust you, and get in touch, without the long timeline or the agency runaround.",
      includedHeading: "What’s included",
      includedGroups: [
        {
          title: "Your website",
          items: [
            "5–7 page website, mobile-first",
            "Website copywriting, written for you, not templated",
            "Logo refined, colours and fonts set",
            "Hosting, domain and deployment handled",
          ],
        },
        {
          title: "Getting found",
          items: [
            "SEO foundation: speed, technical, on-page",
            "Google Business Profile set up",
            "Analytics and conversion tracking",
          ],
        },
        {
          title: "Getting enquiries",
          items: [
            "WhatsApp chat and enquiry forms",
            "3 months maintenance and support",
          ],
        },
      ],
      whyHeading: "Why Starter is built this way",
      whyIntro:
        "Speed only matters if nothing gets skipped. So Starter isn’t a stripped-back template. It’s the full essential build, compressed into a tight timeline because the scope is deliberately focused.",
      whyPoints: [
        {
          lead: "Written, not filled in.",
          body: "Your copy is written to sound like your business and speak to your customers. No lorem ipsum, no placeholder text you’re left to replace yourself.",
        },
        {
          lead: "Mobile-first, because your customers are.",
          body: "Every page is designed for the phone first, then scaled up, because that’s where most people will find you.",
        },
        {
          lead: "Findable from day one.",
          body: "The technical SEO foundation, Google Business Profile, and analytics are set up at launch, so you’re visible and measurable the moment you go live, not months later.",
        },
        {
          lead: "Yours to keep.",
          body: "Hosting, domain, and deployment are all set up and handed over with access. You own everything.",
        },
      ],
      timelineSteps: [
        {
          label: "Day 1: Kickoff",
          body: "We learn your business, your services, and your goals. You hand over what you have and we take it from there.",
        },
        {
          label: "Days 2–5: Build",
          body: "Copy is written, pages are designed, the site is built. You review as it comes together.",
        },
        {
          label: "Days 6–7: Launch",
          body: "Final checks, sign-off, and go live. You get a walkthrough of how to manage it yourself.",
        },
      ],
      timelineClosing: "One working week from kickoff to live.",
      guaranteeBody:
        "We carry the timeline risk, not you. If your site isn’t live within seven working days of kickoff, half your fee comes back. That’s not a promise we make lightly. It’s how we keep ourselves honest.",
      closingHeading: "Ready to go live?",
      closingBody: "Request a quote and we’ll scope your Starter build.",
      closingNote:
        "Not sure Starter is the right fit? Tell us about your project and we’ll point you to the package that matches.",
    },
  },
  {
    slug: "complete",
    title: "Complete Package",
    positioning: "For businesses ready to grow.",
    description:
      "A bigger, custom-designed site built to bring in customers, with enquiry capture and follow-up wired in from day one.",
    summary: "A website built to bring in customers.",
    badge: null,
    includedCount: 6,
    features: [
      "Everything in Starter",
      "10–15 page website, custom-designed",
      "Sales copywriting built to convert",
      "Booking and enquiry flow, all in one place",
      "Automated first reply and follow-ups",
      "6 months maintenance, monthly reports",
      "Landing pages for your top services",
      "Full brand identity system",
      "Blog on a CMS you control, 4 articles included",
      "Custom illustration, motion and interaction",
      "3 months ongoing SEO",
    ],
    guarantee: "Live in 14 working days, or you get 50% off.",
    terms:
      "Placeholder terms: final eligibility and delivery conditions will appear here.",
    featured: true,
    artwork: {
      frame: "/offers/figma-complete-card.svg",
      arrows: "/offers/figma-complete-arrows.svg",
      arrowsHeight: 441.001,
    },
    detail: {
      eyebrow: "For businesses ready to grow",
      headline: "A website built to bring in customers",
      intro:
        "A good website looks right. A great one brings you work. Complete is the full build: custom-designed, written to convert, and set up to capture and follow up on every enquiry on its own. It’s for businesses that don’t just need to be online, but need the site to earn its place.",
      includedHeading: "What’s included",
      includedIntro: "Everything in Starter, plus:",
      includedGroups: [
        {
          title: "A bigger, custom-designed site",
          items: [
            "10–15 page website, custom-designed",
            "Full brand identity system",
            "Custom illustration, motion and interaction",
            "Landing pages for your top services",
          ],
        },
        {
          title: "Copy and content that convert",
          items: [
            "Sales copywriting built to convert",
            "Blog on a CMS you control, 4 articles included",
          ],
        },
        {
          title: "Enquiries, captured and answered",
          items: [
            "Booking and enquiry flow, all in one place",
            "Automated first reply and follow-ups",
          ],
        },
        {
          title: "Growth, built in",
          items: [
            "3 months ongoing SEO",
            "6 months maintenance, monthly reports",
          ],
        },
      ],
      whyHeading: "Why Complete is built this way",
      whyIntro:
        "Starter gets you online. Complete gets you customers. The difference is in three things a converting website needs that a basic one doesn’t.",
      whyPoints: [
        {
          lead: "Designed around the sale, not just the brand.",
          body: "Every page has a job: move the visitor one step closer to contacting you or buying. Sales copywriting, dedicated landing pages for your top services, and a full brand system make the site feel considered and trustworthy at every turn.",
        },
        {
          lead: "Nothing slips through.",
          body: "A single booking and enquiry flow captures every lead in one place, and automated first replies mean nobody waits hours for a response. The follow-ups run on their own, so a busy week doesn’t cost you work.",
        },
        {
          lead: "Momentum after launch.",
          body: "Three months of ongoing SEO and a blog you control mean the site keeps climbing after it’s live, instead of going quiet. You get monthly reports in plain language, so you can see it working.",
        },
      ],
      timelineSteps: [
        {
          label: "Week 1: Discovery and brand",
          body: "We dig into your business, your customers, and your goals. Brand identity and site structure are mapped and approved before any page is designed.",
        },
        {
          label: "Weeks 1–2: Design and copy",
          body: "Every page is custom-designed and written to convert. You review full mockups and sign off before build.",
        },
        {
          label: "Week 2: Build, wire-up, launch",
          body: "The site is built, the enquiry and automation flows are connected and tested, and you go live with a full walkthrough.",
        },
      ],
      timelineClosing: "Live within 14 working days of kickoff.",
      guaranteeBody:
        "A bigger build, the same commitment. If Complete isn’t live within fourteen working days of kickoff, half your fee comes back. The timeline is our responsibility to hit.",
      closingHeading: "Ready to turn your site into a customer engine?",
      closingBody: "Request a quote and we’ll scope your Complete build.",
      closingNote:
        "Comparing Complete with Starter? Tell us about your project and we’ll help you choose.",
    },
  },
  {
    slug: "support",
    title: "Support Package",
    positioning: "Monthly, ongoing.",
    description:
      "We run your marketing every month so you don’t have to. We handle the content, the reviews, the SEO, and the site health.",
    summary: "We run it every month so you don’t have to.",
    badge: "Monthly",
    includedCount: 4,
    features: [
      "6 articles written and published",
      "Reviews requested, monitored and answered",
      "Monthly report, quarterly strategy call",
      "Google Business Profile managed",
      "Ongoing SEO",
      "Social templates and content calendar",
      "Your videos edited on-brand",
      "4 hours of site changes included",
      "Site health — updates, backups, monitoring",
    ],
    guarantee: "Everything published on schedule. Cancel anytime after 90 days.",
    terms:
      "Placeholder terms: final publishing and cancellation conditions will appear here.",
    featured: false,
    artwork: {
      frame: "/offers/figma-starter-card.svg",
      arrows: "/offers/figma-support-arrows.svg",
      arrowsHeight: 355.001,
    },
    detail: {
      eyebrow: "Monthly · Ongoing",
      headline: "We run it every month, so you don’t have to",
      intro:
        "A website that brings in customers needs feeding: content published, reviews answered, SEO kept moving, the site kept healthy. Support is the monthly partnership that handles all of it. You keep running your business and we keep your marketing running.",
      includedHeading: "What’s included, every month",
      includedGroups: [
        {
          title: "Content and visibility",
          items: [
            "6 articles written and published",
            "Ongoing SEO",
            "Social templates and content calendar",
            "Your videos edited on-brand",
          ],
        },
        {
          title: "Reputation and presence",
          items: [
            "Reviews requested, monitored and answered",
            "Google Business Profile managed",
          ],
        },
        {
          title: "Site health and changes",
          items: [
            "4 hours of site changes included",
            "Site health: updates, backups, monitoring",
          ],
        },
        {
          title: "Strategy and reporting",
          items: ["Monthly report, quarterly strategy call"],
        },
      ],
      whyHeading: "Why Support is built this way",
      whyIntro:
        "Most websites go quiet the moment they launch. No new content, stale profiles, unanswered reviews, and the traffic slowly dries up. Support exists to stop that, by making the ongoing work someone’s actual job.",
      whyPoints: [
        {
          lead: "Published on schedule, not when there’s time.",
          body: "Six articles a month, social content, and edited video mean your business keeps showing up, consistently and on-brand, without you chasing it.",
        },
        {
          lead: "Reputation, actively managed.",
          body: "Reviews get requested, watched, and answered, and your Google Business Profile stays current. That’s the difference between conversations that start with trust and ones that start with doubt.",
        },
        {
          lead: "The site stays healthy in the background.",
          body: "Updates, backups, and monitoring run continuously, so problems get caught before a customer ever sees them. And four hours of changes a month means the small edits you need just get done.",
        },
        {
          lead: "You stay in the loop, not in the weeds.",
          body: "A monthly report shows what happened and what it moved. A quarterly strategy call sets the direction for what’s next.",
        },
      ],
      timelineSteps: [
        {
          label: "Onboarding",
          body: "We learn your business, set up the content calendar, and align on voice, priorities, and goals.",
        },
        {
          label: "Every month",
          body: "Content is published, reviews are handled, SEO keeps moving, the site stays healthy, and your changes get made. You receive a plain-language report of everything done and what it drove.",
        },
        {
          label: "Every quarter",
          body: "A strategy call to review results and set the next quarter’s direction.",
        },
      ],
      guaranteeBody:
        "No long lock-in. We ask for ninety days to build momentum that actually shows. After that, you stay because it’s working, not because you’re tied in. Everything we commit to gets published on schedule, every month.",
      closingHeading: "Ready to keep it all running?",
      closingBody: "Request a quote and we’ll set up your monthly Support.",
      closingNote:
        "Want Support bundled with a new build? Tell us about your project and we’ll scope it together.",
    },
  },
];

export const offerSlugs = offers.map((offer) => offer.slug);

export function getOffer(slug: string): Offer | undefined {
  return offers.find((offer) => offer.slug === slug);
}

/** Copy for the /offers hub page. */
export const offersPage = {
  hero: {
    heading: {
      before: "Three packages. Every one ",
      accent: "guaranteed",
      after: ".",
    },
    body: "Three ways to work with us, one standard behind all of them. Every package carries a guarantee, because the timeline and the outcome are our job to hit, not your risk to carry.",
  },
  cardCta: "See what’s included",
  notSure: {
    heading: "Not sure which one fits?",
    body: "Tell us about your business and what you’re trying to reach. We’ll point you to the package that matches, or scope something in between.",
    cta: "Request a Quote",
  },
} as const;
