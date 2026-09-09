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
 * DETAIL SECTIONS: reusable long-form modules rendered beneath each category
 * hero. Add or reorder data here to compose an inside service page without
 * duplicating the section layout.
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

export type ServiceDetailSection = {
  slug: string;
  title: string;
  /** Renders only the section marker and heading for staged page builds. */
  previewOnly?: boolean;
  capabilities: string[];
  body: string[];
  mediaLabel: string;
  /** Detail-section media (public/images/service/{category}/). */
  image?: string;
  cta: {
    label: string;
    href: string;
  };
};

export type ServiceFAQ = {
  heading: {
    before: string;
    accent: string;
    after: string;
  };
  items: {
    question: string;
    answer: string;
  }[];
};

export type ServiceCategory = {
  slug: string;
  title: string;
  excerpt: string;
  /** Homepage services hover-card image (public/images/home/service/). */
  cardImage: string;
  detailHero: {
    intro: string;
    featuredSubService: string;
    /** Category hero media (public/images/service/{category}/). */
    image?: string;
  };
  detailSections: ServiceDetailSection[];
  faq?: ServiceFAQ;
  /** Slugs of related portfolio case studies (content/portfolio.ts). */
  relatedPortfolio: string[];
  subServices: SubService[];
};

export const servicesPage = {
  hero: {
    title: "Services",
    body: "Monotone handles your website as one connected system: design, build, grow, and keep it running after launch. Take all four, or just the one you need.",
  },
  design: {
    heading: "Design",
    intro:
      "We handle design from the ground up. First your brand identity, then the structure of your website, then what every page looks like across devices. Each stage has its own deliverables and review cycle, and nothing moves forward without your sign-off. The process is the same whether you need a full brand built from scratch or a redesign that keeps your existing identity intact.",
    learnMoreLabel: "Learn More",
    learnMoreHref: "/services/design",
    image: "/images/service/service-design-banner.avif",
    items: [
      {
        title: "Brand Identity",
        body: "Your brand identity covers logo, color palette, typography, and usage guidelines. We build these as a connected system, not separate pieces, so they work together across your website, social media, print, and anywhere else your brand shows up. You get organized final files in every format you'll need, with clear guidelines so nothing gets misused. Already have a brand that just needs tightening? We work with what exists.",
        cta: "Explore",
      },
      {
        title: "UI Design",
        body: "Once the structure is locked, we design what every page actually looks like. Layouts, buttons, colors, spacing, imagery, how everything adapts from desktop to tablet to mobile. Each screen is designed individually, not stretched or shrunk from a single template. You see full mockups before any development begins, with rounds of revision built in. What you approve is exactly what gets built. No gaps between the mockup and the final website.",
        cta: "Explore",
      },
      {
        title: "UX Design",
        body: "Before any visual design starts, we map out the full structure of your website. What pages are needed, how they connect, where visitors enter, what path they follow toward contacting you or making a purchase. Every page gets a clear purpose and a deliberate position in the sequence. You review and approve the structure before we move into interface design, so there are no surprises later. Changes at this stage are fast and cheap compared to reworking a finished design.",
        cta: "Explore",
      },
    ],
  },
  development: {
    heading: "Development",
    intro:
      "Every site we build runs on WordPress. Development follows directly from the approved design, so what was signed off is what gets built. The code, the content management system, the integrations with the tools your business runs on, all of it is set up, tested across browsers and devices, and documented before launch. Once live, you get a full walkthrough of how to manage your content yourself.",
    learnMoreLabel: "Learn More",
    learnMoreHref: "/services/web-development",
    image: "/images/service/service-dev-banner.avif",
    items: [
      {
        title: "Website Development",
        body: "Your approved designs become a working website. Frontend, backend, everything in between. Every page is built to work smoothly across screen sizes, browsers, and devices. Animations and interactions are implemented exactly as designed, not approximated. We don't use pre-built themes or off-the-shelf templates. The codebase is clean, documented, and built so any developer who works on it after us can pick up without guesswork.",
        cta: "Explore",
      },
      {
        title: "CMS & Content Setup",
        body: "WordPress gets configured so you can update your own content without touching code. Your page builder, media library, menu structure, every piece of content on the site (text, images, videos, downloads) is populated and formatted before launch, not handed to you half-finished. You get a walkthrough of how to make updates yourself, so you're not dependent on us for every small change.",
        cta: "Explore",
      },
      {
        title: "Integrations",
        body: "Your website connects to the tools your business already uses. WhatsApp, CRM systems, email marketing platforms, booking systems, live chat, payment gateways. Each integration is configured and tested to make sure data flows correctly between your site and your external systems. If something needs a custom connection that doesn't exist out of the box, we build it. You get documentation for every integration: what's connected, how it works, where to find it.",
        cta: "Explore",
      },
      {
        title: "Hosting & Launch",
        body: "Getting your site live means domain configuration, hosting environment, SSL certificates, DNS records, and deployment. Everything is configured for security, speed, and reliability before the site goes public. We run a pre-launch checklist covering broken links, mobile responsiveness, form submissions, and page load times. Once live, we monitor the first 48 hours to catch anything that needs immediate attention. You receive full credentials and access to everything we've set up.",
        cta: "Explore",
      },
      {
        title: "E-commerce",
        body: "Online stores are built using WooCommerce on WordPress. Product catalogue setup, payment processing, shipping configuration, tax settings, order management workflows. Every product page is set up with the right images, descriptions, variations, and pricing. Checkout is tested end-to-end to make sure customers can pay without friction. You get a walkthrough of how to manage orders, add products, update pricing, and handle refunds, so day-to-day operations don't need a developer.",
        cta: "Explore",
      },
    ],
  },
  growthMarketing: {
    heading: "Growth Marketing",
    intro:
      "The marketing side covers everything that drives traffic to your website and turns that traffic into enquiries, calls, and sales. Search engine optimisation, paid advertising, content creation, analytics, conversion improvements. Every channel we manage comes with clear reporting so you can see what's working, what's not, and where your money is going. No budget gets spent without a plan you've reviewed and signed off on first.",
    learnMoreLabel: "Learn More",
    learnMoreHref: "/services/growth-marketing",
    image: "/images/service/service-growth-banner.avif",
    items: [
      {
        title: "SEO",
        body: "Your website gets optimised to rank higher in Google for the terms your customers are actually searching for. On-page work covers page titles, meta descriptions, heading structure, and internal linking. Technical SEO fixes and local SEO setup, including your Google Business Profile, are part of the process. Every change is documented and tracked. You receive regular reports showing which keywords you're ranking for, how positions are changing, and where the next opportunities are.",
        cta: "Explore",
      },
      {
        title: "Content & Copywriting",
        body: "The content your website needs to communicate clearly, rank in search engines, and convert visitors into enquiries. Website copy, blog posts, SEO-focused articles, brand messaging. Every piece is written to match your brand's voice and your audience's language, not stuffed with keywords or padded with filler. You review and approve everything before it goes live. Existing content that needs tightening rather than replacing? We work with what's there.",
        cta: "Explore",
      },
      {
        title: "Paid Advertising",
        body: "Campaigns on Google Ads and Meta, set up and managed from start to finish. Ad creation, audience targeting, budget allocation, campaign tracking. Every campaign is built around a specific goal: enquiries, bookings, purchases, or traffic to a landing page. You approve the budget and creative before anything goes live. Reporting is straightforward. What was spent, what it generated, what we're adjusting next. No dashboards you can't read.",
        cta: "Explore",
      },
      {
        title: "Analytics & Reporting",
        body: "Google Analytics 4, conversion tracking, and monthly performance dashboards, configured so you can see exactly how your website is performing. Visitor numbers, traffic sources, goal completions, user behaviour patterns. Every metric we track is tied to something that matters to your business: enquiries, form submissions, phone calls, purchases. Reports are delivered in plain language with clear explanations of what the numbers mean and what we recommend doing about them.",
        cta: "Explore",
      },
      {
        title: "Conversion Optimisation",
        body: "How visitors behave on your website tells us where they're dropping off and why. We make targeted changes to increase the percentage that take action, whether that's submitting a form, making a call, or completing a purchase. A/B testing, landing page improvements, form and call-to-action adjustments, user behaviour analysis using heatmaps and session recordings. Every change is tested against a control before it becomes permanent. You see the data behind every recommendation.",
        cta: "Explore",
      },
    ],
  },
  maintenance: {
    heading: "Maintenance\n& Support",
    intro:
      "After launch, your website needs to stay secure, up to date, and running properly. Updates, backups, security monitoring, performance checks, content changes, all on an ongoing basis. Issues are caught early through automated monitoring, not after a customer reports a broken page. Every task we perform is logged and reported. Whether you need a small text change or an emergency fix at short notice, there's a clear process for requesting it and a defined timeframe for completion.",
    learnMoreLabel: "Learn More",
    learnMoreHref: "/services/maintenance-support",
    image: "/images/service/service-maintenance-banner.avif",
    items: [
      {
        title: "Security & Updates",
        body: "Your WordPress installation, plugins, and theme files are kept up to date with security patches applied as they're released. Every update is tested in a staging environment before it touches your live site, so nothing breaks unexpectedly. Regular malware scans and vulnerability monitoring run in the background. If a security issue is detected, we act on it immediately, not at the next scheduled window. You receive a log of every update applied: what was done and when.",
        cta: "Explore",
      },
      {
        title: "Backups & Monitoring",
        body: "Automated daily backups of your entire website, files and database, stored securely off-site. Your site is monitored around the clock for uptime, and you're alerted immediately if it goes down. Restoring from a backup is fast and tested regularly to make sure it actually works when needed. You always have access to your backup history, and we retain enough restore points to roll back to any recent version.",
        cta: "Explore",
      },
      {
        title: "Performance Checks",
        body: "Regular speed audits and Core Web Vitals monitoring. These are the metrics Google uses to assess loading speed, responsiveness, and visual stability. When performance drops, we identify the cause and fix it, whether that's bloated images, unoptimised code, slow plugins, or a database that needs cleaning. Every fix is documented with before-and-after measurements. The goal is a site that stays fast consistently, not just on launch day.",
        cta: "Explore",
      },
      {
        title: "Content Updates",
        body: "The day-to-day content changes your website needs. Updating text, swapping images, adding new pages, adjusting menus, editing layouts. Every change request follows a simple process: you tell us what needs updating, we make the change, you review it before it goes live. Turnaround times are defined in your support plan so you know exactly when to expect completion. This covers routine updates, not full redesigns. Those are scoped as separate projects.",
        cta: "Explore",
      },
      {
        title: "Bug Fixes",
        body: "When something breaks, a form that stops submitting, a layout that looks wrong on certain browsers, a feature that worked yesterday and doesn't today, we diagnose it and fix it. Cross-browser display problems, mobile rendering issues, plugin conflicts, broken functionality. Emergency support is available for critical failures that affect your ability to take enquiries or process orders. Every fix is tested and documented, and we flag recurring issues that point to deeper problems worth addressing.",
        cta: "Explore",
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
        question: "Can I hire you for just one service?",
        answer:
          "Yes. Brand identity, UX and UI, development, SEO, or ongoing support are each a standalone piece of work. We'll only suggest adding another part if the first won't work well without it, and we'll tell you why first.",
      },
      {
        question: "Will I be locked in or dependent on you?",
        answer:
          "No. You get full credentials, access to everything we set up, and a walkthrough so you can manage your own content without touching code. Move to another developer whenever you like: the codebase is clean and documented. You own it, not us.",
      },
      {
        question: "Can you work with my existing website?",
        answer:
          "Yes. We tighten what's there rather than rebuild from scratch, whether that's your brand, page structure, copy, or SEO. If a rebuild would actually cost less than patching, we'll say so. You won't be pushed into a redesign you don't need.",
      },
      {
        question: "What do I get before the site goes live?",
        answer:
          "Nothing half-finished. Content is populated, integrations like WhatsApp are tested, and we run a full pre-launch checklist. We watch the first 48 hours live to catch anything early. What you approved in the mockup is what ships.",
      },
      {
        question: "Will I understand your marketing reports?",
        answer:
          "Yes. Plain-language reports, not dashboards you can't read. For ads: what was spent, what it made, what's changing next. For SEO: your rankings, how they're moving, and the next opportunity. No budget goes out without a plan you've signed off.",
      },
      {
        question: "What if something breaks after launch?",
        answer:
          "Downtime costs you money, so we try to catch problems before you do. Monitoring watches your site around the clock, serious issues get emergency priority, and daily off-site backups mean the worst case is a quick roll-back, not days offline.",
      },
    ],
  },
} as const;

export const services: ServiceCategory[] = [
  {
    slug: "design",
    title: "Design",
    excerpt:
      "Research-led product and brand design that turns a rough idea into something people trust and enjoy using.",
    cardImage: "/images/home/service/service-design.avif",
    detailHero: {
      intro:
        "At Monotone, design is handled from the ground up. First your brand identity, then the structure of your website, then what every page looks like across devices. Each stage has its own deliverables and review cycle, and nothing moves forward without your sign-off. The process is the same whether you need a full brand built from scratch or a redesign that keeps your existing identity intact.",
      featuredSubService: "brand-identity",
      image: "/images/service/design/service-design-banner.avif",
    },
    detailSections: [
      {
        slug: "brand-identity",
        title: "Brand Identity",
        capabilities: [
          "Logo Design",
          "Colour Palette",
          "Typography",
          "Imagery Direction",
          "Brand Guidelines Document",
        ],
        body: [
          "Your brand identity covers logo, colour palette, typography, and usage guidelines. We build these as a connected system, not separate pieces, so they work together across your website, social media, print, and anywhere else your brand shows up.",
          "You get organised final files in every format you'll need, with clear guidelines so nothing gets misused. Already have a brand that just needs tightening? We work with what exists.",
        ],
        mediaLabel: "Brand identity project media",
        image: "/images/service/design/design-brand-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
      {
        slug: "ux-design",
        title: "UX Design",
        capabilities: [
          "Site Architecture",
          "Page Structure",
          "User Flows",
          "Content Hierarchy",
          "Wireframing",
        ],
        body: [
          "Before any visual design starts, we map out the full structure of your website. What pages are needed, how they connect, where visitors enter, what path they follow toward contacting you or making a purchase.",
          "Every page gets a clear purpose and a deliberate position in the sequence. You review and approve the structure before we move into interface design, so there are no surprises later. Changes at this stage are fast and cheap compared to reworking a finished design.",
        ],
        mediaLabel: "UX design project media",
        image: "/images/service/design/design-ux-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
      {
        slug: "ui-design",
        title: "UI Design",
        capabilities: [
          "Interface Design",
          "Responsive Layouts",
          "Visual Direction",
          "Component Styling",
          "Iconography & Graphics",
        ],
        body: [
          "Once the structure is locked, we design what every page actually looks like. Layouts, buttons, colours, spacing, imagery, how everything adapts from desktop to tablet to mobile. Each screen is designed individually, not stretched or shrunk from a single template.",
          "You see full mockups before any development begins, with rounds of revision built in. What you approve is exactly what gets built. No gaps between the mockup and the final website.",
        ],
        mediaLabel: "UI design project media",
        image: "/images/service/design/design-ui-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
    ],
    faq: {
      heading: {
        before: "Your ",
        accent: "questions,",
        after: " answered",
      },
      items: [
        {
          question: "Can you work with our existing brand identity?",
          answer:
            "Yes. We build from what you have, fix what's holding it back, or start fresh when the current direction no longer fits. We begin by checking what's worth keeping.",
        },
        {
          question: "What do we receive at the end of design?",
          answer:
            "The approved design files, plus the system to keep using them: brand guidelines, responsive page designs, reusable components, interaction states, and developer-ready specs. Exactly which depends on the scope.",
        },
        {
          question: "How involved do we need to be?",
          answer:
            "Only at the decisions: reviewing structure, approving the look, signing off on pages. We handle everything in between.",
        },
        {
          question: "What if we don't like the first designs?",
          answer:
            "Every phase includes revisions. We review together, you tell us what's wrong, we adjust. Nothing moves to development until you've approved it.",
        },
        {
          question: "Do you also build the website after designing it?",
          answer:
            "Yes. The same team designs and builds, so nothing gets lost in the handoff. Every page, state, and screen size is specced before code starts.",
        },
      ],
    },
    relatedPortfolio: ["mehboob-scales"],
    subServices: [
      {
        slug: "brand-identity",
        title: "Brand Identity",
        excerpt:
          "Logo, type, colour, and voice pulled together into a coherent, recognisable identity.",
      },
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
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    excerpt:
      "Fast, accessible, maintainable websites and web apps built on a modern, future-proof stack.",
    cardImage: "/images/home/service/service-dev.avif",
    detailHero: {
      intro:
        "Every Monotone site is built from scratch. Development follows directly from the approved design, so what was signed off is what gets built. The code, the content management system, the integrations with the tools your business runs on, all of it is set up, tested across browsers and devices, and documented before launch. Once live, you get a full walkthrough of how to manage your content yourself.",
      featuredSubService: "website-development",
      image: "/images/service/dev/dev-banner.avif",
    },
    detailSections: [
      {
        slug: "website-development",
        title: "Web Development",
        capabilities: [
          "Frontend Development",
          "Backend Development",
          "Responsive Development",
          "Animations & Interactions",
          "Speed & Performance",
        ],
        body: [
          "Your approved designs become a working website. Frontend, backend, everything in between. Every page is built to work smoothly across screen sizes, browsers, and devices. Animations and interactions are implemented exactly as designed, not approximated.",
          "We don't use pre-built themes or off-the-shelf templates. The codebase is clean, documented, and built so any developer who works on it after us can pick up without guesswork.",
        ],
        mediaLabel: "Web development project media",
        image: "/images/service/dev/dev-web-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
      {
        slug: "cms-content-setup",
        title: "CMS & Content Setup",
        capabilities: [
          "WordPress Installation & Configuration",
          "Page Builder Setup",
          "Content Population",
          "Media Library Organisation",
          "User Roles & Access",
        ],
        body: [
          "Your content management system gets configured so you can update your own content without touching code. Your page builder, media library, menu structure, every piece of content on the site (text, images, videos, downloads) is populated and formatted before launch, not handed to you half-finished.",
          "You get a walkthrough of how to make updates yourself, so you're not dependent on us for every small change.",
        ],
        mediaLabel: "CMS and content setup project media",
        image: "/images/service/dev/dev-cms-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
      {
        slug: "integrations",
        title: "Integrations",
        capabilities: [
          "WhatsApp & Live Chat",
          "CRM Connections",
          "Email Marketing Tools",
          "Booking & Scheduling Systems",
          "Payment Gateways",
        ],
        body: [
          "Your website connects to the tools your business already uses. WhatsApp, CRM systems, email marketing platforms, booking systems, live chat, payment gateways. Each integration is configured and tested to make sure data flows correctly between your site and your external systems.",
          "If something needs a custom connection that doesn't exist out of the box, we build it. You get documentation for every integration: what's connected, how it works, where to find it.",
        ],
        mediaLabel: "Website integrations project media",
        image: "/images/service/dev/dev-integration-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
      {
        slug: "hosting-launch",
        title: "Hosting & Launch",
        capabilities: [
          "Domain & DNS Configuration",
          "Hosting Setup",
          "SSL & Security Certificates",
          "Deployment & Go-Live",
          "Post-Launch Checks",
        ],
        body: [
          "Getting your site live means domain configuration, hosting environment, SSL certificates, DNS records, and deployment. Everything is configured for security, speed, and reliability before the site goes public. We run a pre-launch checklist covering broken links, mobile responsiveness, form submissions, and page load times.",
          "Once live, we monitor the first 48 hours to catch anything that needs immediate attention. You receive full credentials and access to everything we've set up.",
        ],
        mediaLabel: "Hosting and launch project media",
        image: "/images/service/dev/dev-hosting-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
      {
        slug: "landing-pages",
        title: "Landing Pages",
        capabilities: [
          "Campaign Landing Pages",
          "Lead Capture Pages",
          "Event Pages",
          "Coming Soon Pages",
          "Single-Page Builds",
        ],
        body: [
          "Online stores are built with a full e-commerce setup. Product catalogue setup, payment processing, shipping configuration, tax settings, order management workflows. Every product page is set up with the right images, descriptions, variations, and pricing. Checkout is tested end-to-end to make sure customers can pay without friction.",
          "You get a walkthrough of how to manage orders, add products, update pricing, and handle refunds, so day-to-day operations don't need a developer.",
        ],
        mediaLabel: "Landing page project media",
        image: "/images/service/dev/dev-pages-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
    ],
    faq: {
      heading: {
        before: "Your ",
        accent: "questions,",
        after: " answered",
      },
      items: [
        {
          question: "How long does a website take to build?",
          answer:
            "It depends on scope. Once we've gone through what you need, we commit to a timeline before the build starts, so you have a date to hold us to. A small site moves fast, a larger custom build takes longer.",
        },
        {
          question: "How much does a website cost?",
          answer:
            "It depends on the site. Most work fits one of our packages: Starter for a fast launch, Complete for a bigger custom build, Support for ongoing monthly work. Tell us what you need and we'll point you to the right fit or scope a custom quote.",
        },
        {
          question: "How involved do we need to be?",
          answer:
            "Less than you might expect. We need your content, your brand assets, and your sign-off at two points: the design approval and the pre-launch review. Between those, running the build is on us, not you.",
        },
        {
          question: "What if we're not happy with the result?",
          answer:
            "We build to the design you approved, then you review the result. If something doesn't match or doesn't feel right, we fix it. Revisions carry on against the approved design until you sign off, as long as changes stay within the agreed scope.",
        },
        {
          question: "What do we get at launch?",
          answer:
            "Hosting, domain and DNS, SSL, deployment, redirects, forms, and analytics, all set up and checked. You get full credentials and access to everything, so the site is yours and not locked to us. We also confirm it works across devices before calling it done.",
        },
        {
          question: "Will we be able to update the website ourselves?",
          answer:
            "Yes. When content management is part of the scope, we set the CMS up around the parts your team actually changes, sort out editing permissions, and give you a proper handover. Day to day updates won't need us.",
        },
        {
          question: "Are we on our own after launch?",
          answer:
            "No. You get full access plus a walkthrough of how to manage the site yourself, so you're not dependent on anyone. If you'd rather hand off the upkeep, our Support package covers updates, backups, security, and fixes every month.",
        },
      ],
    },
    relatedPortfolio: ["proactive-building-solutions"],
    subServices: [
      {
        slug: "website-development",
        title: "Website Development",
        excerpt:
          "Marketing sites and web apps engineered for performance, SEO, and easy iteration.",
      },
      {
        slug: "cms-content-setup",
        title: "CMS & Content Setup",
        excerpt:
          "Content models and editing experiences your team can actually run without us.",
      },
      {
        slug: "integrations",
        title: "Integrations",
        excerpt:
          "APIs and third-party tools connected into one reliable, maintainable system.",
      },
      {
        slug: "hosting-launch",
        title: "Hosting & Launch",
        excerpt:
          "Hosting, deployment, redirects, analytics, and launch checks handled as one coordinated release.",
      },
      {
        slug: "landing-pages",
        title: "Landing Pages",
        excerpt:
          "Focused campaign pages designed and built to communicate clearly and convert attention into action.",
      },
    ],
  },
  {
    slug: "growth-marketing",
    title: "Growth Marketing",
    excerpt:
      "Compounding, measurable demand — content, search, and analytics working as one system.",
    cardImage: "/images/home/service/service-growth.avif",
    detailHero: {
      intro:
        "Monotone handles the marketing that drives traffic to your website and turns that traffic into enquiries, calls, and sales. Search engine optimisation, paid advertising, content creation, analytics, conversion improvements. Every channel we manage comes with clear reporting so you can see what's working, what's not, and where your money is going. No budget gets spent without a plan you've reviewed and signed off on first.",
      featuredSubService: "seo",
      image: "/images/service/marketing/marketing-banner.avif",
    },
    detailSections: [
      {
        slug: "seo",
        title: "SEO",
        capabilities: [
          "On-Page Optimisation",
          "Technical SEO",
          "Local SEO",
          "Google Business Profile",
          "Keyword Research",
        ],
        body: [
          "Your website gets optimised to rank higher in Google for the terms your customers are actually searching for. On-page work covers page titles, meta descriptions, heading structure, and internal linking. Technical SEO fixes and local SEO setup, including your Google Business Profile, are part of the process. Every change is documented and tracked.",
          "You receive regular reports showing which keywords you're ranking for, how positions are changing, and where the next opportunities are.",
        ],
        mediaLabel: "SEO project media",
        image: "/images/service/marketing/marketing-seo-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
      {
        slug: "content-copywriting",
        title: "Content & Copywriting",
        capabilities: [
          "Website Copy",
          "Blog Writing",
          "SEO Content",
          "Brand Messaging",
          "Email & Campaign Copy",
        ],
        body: [
          "The content your website needs to communicate clearly, rank in search engines, and convert visitors into enquiries. Website copy, blog posts, SEO-focused articles, brand messaging. Every piece is written to match your brand's voice and your audience's language, not stuffed with keywords or padded with filler.",
          "You review and approve everything before it goes live. Existing content that needs tightening rather than replacing? We work with what's there.",
        ],
        mediaLabel: "Content and copywriting project media",
        image: "/images/service/marketing/marketing-content-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
      {
        slug: "paid-advertising",
        title: "Paid Advertising",
        capabilities: [
          "Google Ads (Search & Display)",
          "Meta Ads (Facebook & Instagram)",
          "Campaign Strategy & Targeting",
          "Ad Creative & Copy",
          "Campaign Tracking & Reporting",
        ],
        body: [
          "Campaigns on Google Ads and Meta, set up and managed from start to finish. Ad creation, audience targeting, budget allocation, campaign tracking. Every campaign is built around a specific goal: enquiries, bookings, purchases, or traffic to a landing page.",
          "You approve the budget and creative before anything goes live. Reporting is straightforward. What was spent, what it generated, what we're adjusting next. No dashboards you can't read.",
        ],
        mediaLabel: "Paid advertising project media",
        image: "/images/service/marketing/marketing-ads-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
      {
        slug: "analytics-reporting",
        title: "Analytics & Reporting",
        capabilities: [
          "GA4 Setup & Configuration",
          "Conversion Tracking",
          "Monthly Performance Dashboards",
          "Goal & Event Tracking",
          "Data-Driven Recommendations",
        ],
        body: [
          "Google Analytics 4, conversion tracking, and monthly performance dashboards, configured so you can see exactly how your website is performing. Visitor numbers, traffic sources, goal completions, user behaviour patterns. Every metric we track is tied to something that matters to your business: enquiries, form submissions, phone calls, purchases.",
          "Reports are delivered in plain language with clear explanations of what the numbers mean and what we recommend doing about them.",
        ],
        mediaLabel: "Analytics and reporting project media",
        image: "/images/service/marketing/marketing-analytics-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
      {
        slug: "conversion-rate-optimisation",
        title: "Conversion Optimisation",
        capabilities: [
          "A/B Testing",
          "Landing Page Optimisation",
          "Form & CTA Improvements",
          "User Behaviour Analysis",
          "Enquiry Flow Audits",
        ],
        body: [
          "How visitors behave on your website tells us where they're dropping off and why. We make targeted changes to increase the percentage that take action, whether that's submitting a form, making a call, or completing a purchase. A/B testing, landing page improvements, form and call-to-action adjustments, user behaviour analysis using heatmaps and session recordings.",
          "Every change is tested against a control before it becomes permanent. You see the data behind every recommendation.",
        ],
        mediaLabel: "Conversion rate optimisation project media",
        image: "/images/service/marketing/marketing-conversion-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
    ],
    faq: {
      heading: {
        before: "Your ",
        accent: "questions,",
        after: " answered",
      },
      items: [
        {
          question: "How much does marketing cost?",
          answer:
            "It depends on what you need. Most work fits one of our packages, or we scope a custom monthly plan around your goals and budget. Either way, no spend goes ahead without a plan you've reviewed and signed off first.",
        },
        {
          question: "Are we locked into a long contract?",
          answer:
            "No. Ongoing marketing runs month to month, so you can stop whenever it stops working for you. We'd rather keep your business by earning it each month than by tying you in.",
        },
        {
          question: "How do you decide which channels to use?",
          answer:
            "We start with your audience, your offer, your goals, and your budget. From there we work out whether search, content, paid ads, conversion work, or a mix gives you the clearest route to more enquiries. We don't push channels you don't need.",
        },
        {
          question: "How long does SEO take to show results?",
          answer:
            "SEO builds over time, it doesn't spike overnight. Technical and on-page fixes get picked up fairly quickly, but real ranking and traffic gains usually take a few months. We track it from day one and show you which changes are landing.",
        },
        {
          question: "Do we keep access to our own accounts?",
          answer:
            "Yes. Your Google, Meta, analytics, and Google Business Profile accounts are set up in your name, and you keep full ownership and access. We manage them for you, but nothing sits locked under our account. If we ever stop working together, everything stays with you.",
        },
        {
          question: "What's included in your marketing reports?",
          answer:
            "The numbers that tie to your business, not vanity metrics: qualified traffic, enquiries, calls, bookings, and how campaigns are performing. Each report also says what changed, what we learned, and what we'd do next, in plain language.",
        },
        {
          question: "Can you improve conversions without redesigning the site?",
          answer:
            "Yes. Most conversion work is focused, evidence-led changes, not a full rebuild. We improve messaging, forms, calls to action, and page structure, then measure whether the changes actually move results. If a bigger fix is needed, we tell you before touching anything.",
        },
      ],
    },
    relatedPortfolio: ["mehboob-scales"],
    subServices: [
      {
        slug: "seo",
        title: "SEO",
        excerpt:
          "Technical, on-page, and content SEO that earns durable organic visibility.",
      },
      {
        slug: "content-copywriting",
        title: "Content & Copywriting",
        excerpt:
          "Positioning and words that make the value obvious and move people to act.",
      },
      {
        slug: "paid-advertising",
        title: "Paid Advertising",
        excerpt:
          "Focused paid campaigns shaped around the right audience, offer, creative, and conversion path.",
      },
      {
        slug: "analytics-reporting",
        title: "Analytics & Reporting",
        excerpt:
          "Clean tracking and clear dashboards so every decision is backed by data.",
      },
      {
        slug: "conversion-rate-optimisation",
        title: "Conversion Optimisation",
        excerpt:
          "Targeted improvements that turn more existing traffic into enquiries, bookings, and sales.",
      },
    ],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    excerpt:
      "Ongoing care that keeps everything we build fast, secure, and quietly dependable.",
    cardImage: "/images/home/service/service-maintenance.avif",
    detailHero: {
      intro:
        "Once a Monotone site is live, it stays secure, up to date, and running properly. Updates, backups, security monitoring, performance checks, content changes, all on an ongoing basis. Issues are caught early through automated monitoring, not after a customer reports a broken page. Every task we perform is logged and reported. Whether you need a small text change or an emergency fix at short notice, there's a clear process for requesting it and a defined timeframe for completion.",
      featuredSubService: "security-updates",
      image: "/images/service/maintenance/maintenance-banner.avif",
    },
    detailSections: [
      {
        slug: "security-updates",
        title: "Security & Updates",
        capabilities: [
          "WordPress Core Updates",
          "Plugin & Theme Updates",
          "Security Patches",
          "Malware Scanning & Removal",
          "Firewall & Login Protection",
        ],
        body: [
          "Your CMS, plugins, and theme files are kept up to date with security patches applied as they're released. Every update is tested in a staging environment before it touches your live site, so nothing breaks unexpectedly. Regular malware scans and vulnerability monitoring run in the background.",
          "If a security issue is detected, we act on it immediately, not at the next scheduled window. You receive a log of every update applied: what was done and when.",
        ],
        mediaLabel: "Website security and updates media",
        image: "/images/service/maintenance/maintenance-security-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
      {
        slug: "backups-monitoring",
        title: "Backups & Monitoring",
        capabilities: [
          "Automated Daily Backups",
          "Off-Site Backup Storage",
          "Uptime Monitoring",
          "Downtime Alerts",
          "Backup Restoration",
        ],
        body: [
          "Automated daily backups of your entire website, files and database, stored securely off-site. Your site is monitored around the clock for uptime, and you're alerted immediately if it goes down. Restoring from a backup is fast and tested regularly to make sure it actually works when needed.",
          "You always have access to your backup history, and we retain enough restore points to roll back to any recent version.",
        ],
        mediaLabel: "Website backups and monitoring media",
        image: "/images/service/maintenance/maintenance-backup-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
      {
        slug: "performance-checks",
        title: "Performance Checks",
        capabilities: [
          "Speed Audits",
          "Core Web Vitals Monitoring",
          "Database Optimisation",
          "Image & Asset Optimisation",
          "Caching Configuration",
        ],
        body: [
          "Regular speed audits and Core Web Vitals monitoring. These are the metrics Google uses to assess loading speed, responsiveness, and visual stability. When performance drops, we identify the cause and fix it, whether that's bloated images, unoptimised code, slow plugins, or a database that needs cleaning.",
          "Every fix is documented with before-and-after measurements. The goal is a site that stays fast consistently, not just on launch day.",
        ],
        mediaLabel: "Website performance checks media",
        image: "/images/service/maintenance/maintenance-performance-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
      {
        slug: "content-updates",
        title: "Content Updates",
        capabilities: [
          "Text & Image Changes",
          "New Page Additions",
          "Menu & Navigation Edits",
          "Layout Adjustments",
          "Seasonal & Promotional Updates",
        ],
        body: [
          "The day-to-day content changes your website needs. Updating text, swapping images, adding new pages, adjusting menus, editing layouts. Every change request follows a simple process: you tell us what needs updating, we make the change, you review it before it goes live.",
          "Turnaround times are defined in your support plan so you know exactly when to expect completion. This covers routine updates, not full redesigns. Those are scoped as separate projects.",
        ],
        mediaLabel: "Website content updates media",
        image: "/images/service/maintenance/maintenance-updates-banner.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
      {
        slug: "bug-fixes-troubleshooting",
        title: "Bug Fixes",
        capabilities: [
          "Broken Feature Repairs",
          "Display & Layout Issues",
          "Cross-Browser Fixes",
          "Plugin Conflicts",
          "Emergency Support",
        ],
        body: [
          "When something breaks, a form that stops submitting, a layout that looks wrong on certain browsers, a feature that worked yesterday and doesn't today, we diagnose it and fix it. Cross-browser display problems, mobile rendering issues, plugin conflicts, broken functionality.",
          "Emergency support is available for critical failures that affect your ability to take enquiries or process orders. Every fix is tested and documented, and we flag recurring issues that point to deeper problems worth addressing.",
        ],
        mediaLabel: "Website troubleshooting media",
        image: "/images/service/maintenance/maintenance-bugs-banners.avif",
        cta: {
          label: "Learn More",
          href: "/contact",
        },
      },
    ],
    faq: {
      heading: {
        before: "Your ",
        accent: "questions,",
        after: " answered",
      },
      items: [
        {
          question: "What's included in ongoing maintenance?",
          answer:
            "Depending on your plan: software, security, plugin, and theme updates, malware scanning, daily backups, uptime monitoring, performance checks, content updates, and bug fixes. We shape the plan around your site and how much support you actually need.",
        },
        {
          question: "How much does maintenance cost?",
          answer:
            "It depends on how much cover you need. Most sites fit our Support package, or we tailor a plan to your site and its traffic. You get a fixed monthly figure up front, so there are no surprise bills.",
        },
        {
          question: "Are we tied into a contract?",
          answer:
            "No. Support runs month to month, so you can stop whenever you want. Everything we manage, hosting, backups, access, is set up in your name, so leaving is clean and the site stays yours.",
        },
        {
          question: "How fast do you respond when something breaks?",
          answer:
            "It depends on how serious it is and which plan you're on. Anything urgent, downtime, a broken enquiry form, a booking system that's stopped, jumps the queue. We diagnose it fast, fix it, and test the fix across devices before closing it out.",
        },
        {
          question: "Does maintenance cover any change we ask for?",
          answer:
            "It covers routine changes: text edits, image swaps, new pages, menu and layout tweaks. Bigger jobs like a full redesign are scoped as their own project. If a request crosses that line, we tell you before doing any work.",
        },
        {
          question: "Will we know what you've actually done?",
          answer:
            "Yes. Every task we carry out is logged: what was done, when, and why. You get a regular report, so you can see exactly what your plan is paying for instead of taking it on trust.",
        },
      ],
    },
    relatedPortfolio: ["proactive-building-solutions"],
    subServices: [
      {
        slug: "security-updates",
        title: "Security & Updates",
        excerpt:
          "Core, plugin, theme, and security updates handled carefully before they become problems.",
      },
      {
        slug: "backups-monitoring",
        title: "Backups & Monitoring",
        excerpt:
          "Daily off-site backups and proactive uptime monitoring with fast recovery when needed.",
      },
      {
        slug: "performance-checks",
        title: "Performance Checks",
        excerpt:
          "Regular speed, Core Web Vitals, database, image, and caching reviews.",
      },
      {
        slug: "content-updates",
        title: "Content Updates",
        excerpt:
          "Reliable help keeping text, imagery, pages, navigation, and promotions current.",
      },
      {
        slug: "bug-fixes-troubleshooting",
        title: "Bug Fixes",
        excerpt:
          "Fast diagnosis and repair for broken features, display issues, conflicts, and urgent problems.",
      },
    ],
  },
];

export const serviceSlugs = services.map((service) => service.slug);

export function getService(slug: string): ServiceCategory | undefined {
  return services.find((service) => service.slug === slug);
}
