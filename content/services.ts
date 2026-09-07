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
    intro: "How your business looks — and whether people take it seriously",
    learnMoreLabel: "Learn More",
    learnMoreHref: "/services/design",
    image: "/images/service/service-design-banner.avif",
    items: [
      {
        title: "Brand Identity",
        body: "Placeholder copy for the complete visual system behind your business — from logo and colour to typography and the rules that keep every touchpoint consistent.",
        cta: "Explore",
      },
      {
        title: "UI Design",
        body: "Placeholder copy for clear, polished interfaces that feel intuitive to use and stay visually consistent across every screen and interaction.",
        cta: "Explore",
      },
      {
        title: "UX Design",
        body: "Placeholder copy for user journeys, structure, and prototypes that make complex products easier to understand and simpler to navigate.",
        cta: "Explore",
      },
    ],
  },
  development: {
    heading: "Development",
    intro:
      "Fast, accessible, maintainable websites and digital platforms built around your content, your customers, and the way your business needs to grow.",
    learnMoreLabel: "Learn More",
    learnMoreHref: "/services/web-development",
    image: "/images/service/service-dev-banner.avif",
    items: [
      {
        title: "Website Development",
        body: "Fast, accessible marketing sites and web applications engineered around your goals, content, and customers.",
        cta: "Explore",
      },
      {
        title: "CMS & Content Setup",
        body: "Flexible content systems and clear editing workflows that let your team publish and update the site with confidence.",
        cta: "Explore",
      },
      {
        title: "Integrations",
        body: "Reliable connections between your website, APIs, analytics, CRM, payments, and the tools that keep your business moving.",
        cta: "Explore",
      },
      {
        title: "Hosting & Launch",
        body: "Production hosting, deployment, redirects, analytics, and launch-day checks handled as one coordinated release.",
        cta: "Explore",
      },
      {
        title: "E-commerce",
        body: "Thoughtful storefronts and checkout experiences that make products easy to discover, manage, and buy.",
        cta: "Explore",
      },
    ],
  },
  growthMarketing: {
    heading: "Growth Marketing",
    intro:
      "Compounding, measurable growth through search, content, paid campaigns, and clear reporting — all working together as one connected system.",
    learnMoreLabel: "Learn More",
    learnMoreHref: "/services/growth-marketing",
    image: "/images/service/service-growth-banner.avif",
    items: [
      {
        title: "SEO",
        body: "Technical, on-page, and content SEO that helps the right people discover your business and keeps organic visibility growing over time.",
        cta: "Explore",
      },
      {
        title: "Content & Copywriting",
        body: "Clear positioning and useful content that makes your value easier to understand and gives people a reason to take the next step.",
        cta: "Explore",
      },
      {
        title: "Paid Advertising",
        body: "Focused paid campaigns built around the audiences, messages, and landing experiences most likely to convert.",
        cta: "Explore",
      },
      {
        title: "Analytics & Reporting",
        body: "Clean tracking and concise reporting that show what is working, what is not, and where the next opportunity sits.",
        cta: "Explore",
      },
      {
        title: "Conversion Rate Optimisation",
        body: "Evidence-led improvements to journeys, pages, and calls to action that turn more of your existing traffic into meaningful results.",
        cta: "Explore",
      },
    ],
  },
  maintenance: {
    heading: "Maintenance\n& Support",
    intro:
      "Ongoing technical care that keeps your website secure, current, fast, and dependable long after the initial launch.",
    learnMoreLabel: "Learn More",
    learnMoreHref: "/services/maintenance-support",
    image: "/images/service/service-maintenance-banner.avif",
    items: [
      {
        title: "Security & Updates",
        body: "Routine platform, dependency, and security updates handled carefully to keep your site protected and stable.",
        cta: "Explore",
      },
      {
        title: "Backups & Monitoring",
        body: "Automated backups and proactive monitoring that help us spot issues early and recover quickly when something goes wrong.",
        cta: "Explore",
      },
      {
        title: "Performance Checks",
        body: "Regular speed, accessibility, and technical health reviews to keep the experience smooth as your site and content evolve.",
        cta: "Explore",
      },
      {
        title: "Content Updates",
        body: "Reliable help publishing new pages, refreshing existing content, and keeping important information accurate across the site.",
        cta: "Explore",
      },
      {
        title: "Bug Fixes & Troubleshooting",
        body: "Practical diagnosis and repair when something breaks, behaves unexpectedly, or needs a dependable technical pair of hands.",
        cta: "Explore",
      },
    ],
  },
  faq: {
    heading: {
      before: "Your ",
      accent: "service questions,",
      after: " answered",
    },
    items: [
      {
        question: "Can I hire you for just one service?",
        answer:
          "Yes. You can bring us in for a focused piece of work such as brand identity, UX and UI design, development, SEO, or ongoing support. We will recommend a broader scope only when another part is essential to making that work successful.",
      },
      {
        question: "What is included in website development?",
        answer:
          "Website development can include the front-end build, CMS and content setup, third-party integrations, e-commerce, hosting, analytics, quality assurance, and launch. The exact scope is agreed before work begins.",
      },
      {
        question: "Can you improve an existing website?",
        answer:
          "Absolutely. We can audit an existing site, redesign selected journeys, improve performance and accessibility, rebuild problem areas, strengthen SEO, or take over its ongoing maintenance without requiring a complete restart.",
      },
      {
        question: "How do maintenance and growth support work after launch?",
        answer:
          "We can stay involved with updates, monitoring, backups, bug fixes, content changes, SEO, campaigns, conversion improvements, and reporting. The ongoing plan is shaped around the level of support your team actually needs.",
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
        "How your business looks — and whether people take it seriously. We shape the identity, structure, and interface behind a clear, credible digital experience, so every touchpoint feels considered and unmistakably yours.",
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
          "Your brand identity is how your business looks and feels everywhere it shows up — your website, your social media, your business cards, your invoices. We start with your logo, then build out from there: a colour palette that belongs to you, typography that fits your tone, and clear direction on the kind of imagery your brand should use.",
          "Everything gets documented in a brand guidelines file — a single reference that keeps your business looking consistent no matter who's designing for you next. If you already have a logo you're happy with, we work with it. If you need one from scratch or yours needs a rethink, we build it. Either way, nothing leaves without a system behind it.",
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
          "UX design is the planning that happens before anything gets designed on screen. It's where we figure out what pages your site needs, how they connect to each other, and what order visitors see things in. We map out the path from someone landing on your site to them picking up the phone or filling out a form — and we remove anything that gets in the way.",
          "This includes deciding what goes on each page, where it sits, and how much attention it gets. The goal is straightforward: when someone visits your site, they shouldn't have to think about where to go next. The structure does that work for them. Design follows this plan — not the other way around.",
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
          "UI design is what your website actually looks and feels like — the colours, the buttons, the layout, the spacing, the visual tone. Once the structure is planned in UX, this is where it comes to life on screen. We design every page your site needs, making sure it looks right on desktop, tablet, and mobile.",
          "Every button, form, image, and section gets styled so the whole site feels like one consistent experience. We also set the visual direction — whether that's clean and minimal, bold and colourful, or something else entirely. Nothing is left to guesswork for the developer. Every page, every state, every screen size gets designed before a single line of code is written.",
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
        accent: "design questions,",
        after: " answered",
      },
      items: [
        {
          question: "Can you work with our existing brand identity?",
          answer:
            "Yes. We can build from the identity you already have, refine the parts that are holding it back, or create a new system when the current direction no longer fits. We begin by reviewing what is useful, recognisable, and worth carrying forward.",
        },
        {
          question: "What is the difference between UX and UI design?",
          answer:
            "UX design plans how the experience works: the page structure, journeys, priorities, and actions. UI design determines how that plan looks and feels through typography, colour, spacing, components, and responsive layouts. They work together, but they solve different problems.",
        },
        {
          question: "Will the designs cover mobile and tablet screens?",
          answer:
            "Yes. Responsive behaviour is considered throughout the process. We design the key desktop, tablet, and mobile layouts, define how components adapt between screen sizes, and remove ambiguity before development begins.",
        },
        {
          question: "What will we receive at the end of the design phase?",
          answer:
            "You will receive the approved design files and the supporting system needed to use them consistently. Depending on the scope, that can include brand guidelines, responsive page designs, reusable components, interaction states, prototypes, and developer-ready specifications.",
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
        "Fast, accessible, maintainable websites and web apps built around your content, your customers, and the way your business needs to grow.",
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
          'This is the actual build — turning your approved designs into a working website. Frontend development handles everything the visitor sees: layouts, buttons, forms, animations. Backend development covers everything behind the scenes: databases, server logic, user accounts, anything that processes data. Responsive development makes sure the whole thing works properly on every screen size — not just "looks okay on mobile" but actually functions well.',
          "If your site needs movement — scroll animations, hover effects, interactive elements — that gets built here too. We also build with speed in mind from the start, so your site loads fast without needing fixes later. Every site is built to match your design exactly. No off-the-shelf templates, no cutting corners.",
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
          "Once your site is built, it needs a system behind it so you can manage your own content without calling a developer every time something changes. We set up WordPress as your content management system, configure a page builder so you can make basic edits yourself, and populate every page with your actual content — text, images, videos, documents. We organise your media library so files are easy to find, and set up user accounts with the right access levels if multiple people need to log in. By the time we hand it over, everything is in place and you know how to use it. You're not locked out of your own website.",
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
          "Your website doesn't work in isolation — it needs to talk to the other tools your business runs on. We connect your site to the platforms that matter: WhatsApp for instant customer enquiries, a CRM to track your leads, email marketing tools to stay in touch with your list, booking systems so customers can schedule appointments directly, and payment gateways so you can take money online. Each integration is tested to make sure data flows correctly — so when someone fills out a form on your site, it actually ends up where it needs to. We work with the tools you already use wherever possible, and recommend alternatives when something better exists for your setup.",
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
          "Getting your site live involves more than pressing a button. We handle the full technical setup: connecting your domain name, configuring your hosting environment, installing SSL certificates so your site is secure, and deploying everything to the live server. DNS settings are configured so your domain points to the right place and your email routing stays intact. Before anything goes public, we run a full round of checks — broken links, missing images, form submissions, mobile display, load speed. Once everything passes, the site goes live and we confirm it's working across devices and browsers. If you don't have a domain or hosting yet, we recommend what to get and where to get it.",
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
          "Not every project needs a full website. Sometimes you need a single focused page — for a product launch, an ad campaign, an event, or just to capture leads while your main site is being built. We design and build standalone landing pages and microsites that work on their own, with their own domain if needed. Each one is built around one clear action: fill out a form, make a call, register, book. No distractions, no unnecessary navigation, no content that doesn't serve that goal. These pages are also useful for testing — if you want to try a new offer or audience before committing to a full site, a landing page lets you do that quickly and cheaply.",
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
        accent: "development questions,",
        after: " answered",
      },
      items: [
        {
          question: "Can you build from designs we already have?",
          answer:
            "Yes. We can develop from completed Figma files or another established design system. We review the designs before development begins, flag any missing responsive states or interactions, and agree on how those details should behave before they reach the build.",
        },
        {
          question: "Will we be able to update the website ourselves?",
          answer:
            "Yes. When content management is part of the scope, we configure the CMS around the content your team actually needs to change. We also organise editing permissions and provide a clear handover so routine updates do not require a developer.",
        },
        {
          question: "How do you make sure the website is fast and responsive?",
          answer:
            "Performance and responsive behaviour are considered throughout development rather than added at the end. We optimise assets and code, test the layouts across common screen sizes, and check loading speed, accessibility, forms, and interactions before launch.",
        },
        {
          question: "What is included when the website goes live?",
          answer:
            "We handle the agreed hosting setup, domain and DNS configuration, SSL, deployment, redirects, forms, analytics, and final quality checks. After launch, we confirm the live site is working across devices and can continue with maintenance and support if needed.",
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
        "Compounding, measurable growth through search, content, and analytics — planned as one connected system and improved with clear evidence.",
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
          "SEO is how your website gets found on Google without paying for ads. We work on three levels: on-page optimisation makes sure your content is structured so search engines understand what each page is about. Technical SEO covers site speed, mobile-friendliness, crawlability, and the code-level details that affect your ranking. Local SEO makes sure your business shows up when someone nearby searches for what you do — that includes setting up and optimising your Google Business Profile, the listing that appears on Google Maps and in local results. We also handle keyword research upfront to make sure you're targeting the terms your actual customers are searching for, not just the ones that sound right to you.",
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
          "Good design means nothing if the words on the page don't do their job. We write the copy your business needs — from the main pages of your website to blog posts that bring in search traffic over time. Every piece of content is written with two readers in mind: the person visiting your site and the search engine deciding whether to show it. Brand messaging work defines how your business sounds — your tone, your language, the way you talk about what you do — so everything stays consistent whether it's a homepage headline or a follow-up email. If you already have content, we edit and restructure it. If you're starting from nothing, we write it.",
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
          "Paid advertising puts your business in front of the right people immediately — no waiting months for organic traffic to build. We set up and manage campaigns on Google Ads and Meta (Facebook and Instagram), starting with a clear plan: who you're targeting, what you're offering, and what a successful campaign looks like at your budget. We handle the ad creative, the copy, the audience targeting, and the tracking that shows you exactly what your money is doing. Every campaign gets ongoing monitoring and adjustments — not a set-and-forget setup. You get regular reports showing what's working, what isn't, and what we're changing next. No vanity metrics. No dashboards full of numbers you can't act on.",
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
          "You can't improve what you're not measuring. We set up Google Analytics on your site so you know exactly what's happening — how many people visit, where they come from, what pages they look at, and what they do before they leave. Conversion tracking tells you which visitor actions matter most: form submissions, phone calls, WhatsApp clicks, bookings. We configure goals and events so these are counted automatically. Every month, you get a clear performance dashboard — not a spreadsheet full of numbers, but a readable report that shows what's working and what needs attention. We include recommendations based on the data, so the numbers actually lead to decisions instead of just sitting in a report no one opens.",
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
        title: "Conversion Rate Optimisation",
        capabilities: [
          "A/B Testing",
          "Landing Page Optimisation",
          "Form & CTA Improvements",
          "User Behaviour Analysis",
          "Enquiry Flow Audits",
        ],
        body: [
          "Getting traffic to your site is only half the job — the other half is making sure that traffic actually does something. Conversion rate optimisation is the process of improving your site so more visitors take the action you want: filling out a form, making a call, booking an appointment. We look at how people behave on your site — where they click, where they hesitate, where they leave — and make targeted changes based on that data. That might mean testing two versions of a headline, redesigning a form, moving a button, or simplifying a page that's trying to do too much. Small changes, tested properly, often make a bigger difference than a full redesign.",
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
        accent: "growth questions,",
        after: " answered",
      },
      items: [
        {
          question: "How long does SEO take to show results?",
          answer:
            "SEO builds over time rather than producing an instant spike. Technical and on-page improvements can be recognised relatively quickly, while meaningful ranking and traffic growth often takes several months. We track progress from the beginning and explain which changes are gaining traction.",
        },
        {
          question: "How do you decide which marketing channels to use?",
          answer:
            "We start with your audience, offer, goals, existing data, and available budget. From there, we identify whether search, content, paid campaigns, conversion improvements, or a combination of channels gives you the clearest route to measurable growth.",
        },
        {
          question: "What is included in your marketing reports?",
          answer:
            "Reports focus on the numbers connected to business outcomes: qualified traffic, enquiries, calls, bookings, campaign efficiency, and conversion performance. Each report also explains what changed, what we learned, and what we recommend doing next.",
        },
        {
          question: "Can you improve conversions without redesigning the whole site?",
          answer:
            "Yes. Conversion optimisation is usually based on focused, evidence-led changes rather than a complete redesign. We can improve messaging, forms, calls to action, page hierarchy, and individual journey steps, then measure whether those changes produce better results.",
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
        title: "Conversion Rate Optimisation",
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
        "Ongoing technical care that keeps your website secure, current, fast, and dependable long after the initial launch.",
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
          "WordPress sites need regular updates to stay secure. The core software, your plugins, and your theme all release updates — some for new features, some to close security holes. If these aren't applied promptly, your site becomes a target. We handle all updates on a set schedule, testing for compatibility before anything goes live so an update doesn't break your site. We run malware scans to catch anything suspicious early, apply security patches as soon as they're available, and configure firewall and login protections to block common attacks. If something does get through, we clean it up and close the gap that let it in. You don't need to think about any of this — that's the point.",
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
          "If something goes wrong with your site — a bad update, a hack, a server failure — you need a recent backup ready to restore from. We run automated daily backups of your entire site, stored off-site so they're available even if your hosting goes down. We also monitor your site's uptime around the clock. If it goes offline, we get an alert immediately — usually before you or your customers notice. When restoration is needed, we handle it: no digging through hosting panels, no guesswork, no waiting on hold. Your most recent backup is always ready, and someone is always watching. This is the safety net that makes everything else on this list recoverable.",
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
          "A slow website loses visitors and ranks lower on Google. We run regular speed audits to catch performance issues before they affect your business — bloated images, unoptimised code, database clutter, badly configured caching. Core Web Vitals are the specific metrics Google uses to judge your site's user experience: how fast a page loads, how quickly it responds to interaction, and how stable the layout is while loading. We monitor all of them and fix problems as they come up. Database optimisation clears out the accumulated clutter that slows WordPress down over time. Image and asset compression keeps your files as small as possible without losing quality. The goal is a site that stays fast — not one that was fast once at launch.",
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
          "Your website isn't a one-time project — it needs to change as your business changes. New services, updated pricing, seasonal promotions, team changes, new locations. We handle all of it. Send us what needs updating — text, images, new pages, menu changes, layout tweaks — and we make the edits. This is useful if you don't want to learn the backend of your site, or if a change is complex enough that doing it yourself risks breaking something. We also handle time-sensitive updates: putting up a Ramadan offer, updating your holiday hours, adding a new service to your lineup. Your site stays current without you needing to open WordPress yourself.",
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
        title: "Bug Fixes & Troubleshooting",
        capabilities: [
          "Broken Feature Repairs",
          "Display & Layout Issues",
          "Cross-Browser Fixes",
          "Plugin Conflicts",
          "Emergency Support",
        ],
        body: [
          "Things break. A plugin update clashes with your theme. A form stops sending emails. A page looks fine on Chrome but falls apart on Safari. A feature that worked yesterday stops working today. We fix these problems — usually within hours, not days. We diagnose the root cause, apply the fix, and test across devices and browsers to make sure it's actually resolved, not just patched over. For urgent issues — your site is down, your contact form isn't working during a campaign, your booking system stops accepting appointments — we offer emergency support with faster response times. You don't need to understand what went wrong. You just need it fixed.",
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
        accent: "maintenance questions,",
        after: " answered",
      },
      items: [
        {
          question: "What is included in ongoing website maintenance?",
          answer:
            "Maintenance can include WordPress core, plugin, and theme updates, security patches, malware scanning, daily backups, uptime monitoring, performance checks, content updates, and bug fixes. We shape the exact plan around the website and the level of support your team needs.",
        },
        {
          question: "How often do you update and back up the website?",
          answer:
            "We run automated daily backups and store them away from the live website. Software and security updates are applied on a planned schedule, with compatibility checks before changes go live and additional attention when an urgent patch is released.",
        },
        {
          question: "How quickly can you respond when something breaks?",
          answer:
            "Response time depends on the severity of the issue and the support plan. Urgent problems such as downtime, broken enquiry forms, or failed booking systems are prioritised, diagnosed quickly, and tested across devices and browsers after the fix is applied.",
        },
        {
          question: "Can you maintain a website you did not build?",
          answer:
            "Yes. We begin with a technical review of the website, hosting, plugins, backups, and existing access. If the setup is maintainable, we can take over directly; if we find risks or outdated components, we explain what should be stabilised before ongoing support begins.",
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
        title: "Bug Fixes & Troubleshooting",
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
