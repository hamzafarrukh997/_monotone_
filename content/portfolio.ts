/**
 * Portfolio / case studies — the single source of truth for `/work`,
 * `/work/[slug]`, homepage cards, service cross-links, and the sitemap.
 */

export type ServiceCategorySlug =
  | "design"
  | "web-development"
  | "growth-marketing"
  | "maintenance-support";

export type CaseStudyVisual = "signal" | "frames" | "type" | "grid";

export type CaseStudyImage = {
  /** Path under `/public`; leave empty while designed placeholders are used. */
  src: string;
  alt: string;
  role?: "hero" | "gallery";
};

export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  year: string;
  category: ServiceCategorySlug;
  summary: string;
  challengeTitle: string;
  challenge: string;
  approachTitle: string;
  approach: string;
  outcomeTitle: string;
  outcome: string;
  services: ServiceCategorySlug[];
  stack: string[];
  liveUrl?: string;
  images: CaseStudyImage[];
  metrics: CaseStudyMetric[];
  visual: CaseStudyVisual;
  featured: boolean;
  draft?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "mehboob-scales",
    client: "Mehboob Scales",
    year: "2026",
    category: "growth-marketing",
    summary:
      "Fifty years of reputation, and none of it online. We gave a legacy weighing-equipment business its first real web presence, and within a month it was pulling in qualified leads every day.",
    challengeTitle: "The reputation was there. The digital proof wasn't.",
    challenge:
      "Mehboob Scales had spent half a century earning trust the old way, face to face, deal by deal. But when buyers went looking online, the business simply was not there. No site, no verified profile, nothing to find. Half a century of goodwill counted for nothing at the exact moment a buyer was ready to spend.",
    approachTitle: "We made fifty years of trust visible online",
    approach:
      "The hard part was not building a website. It was translating fifty years of offline reputation into something a stranger online would believe in seconds. So we started with research: who buys weighing equipment, what they search for when they are ready to spend, and where the real demand sits. That told us how to place a legacy brand for a first-time online audience. From there we built a site engineered to convert, with technical and on-page SEO in the foundation and keyword targeting aimed at buyers with intent, not idle browsers. The copy does a specific job on every page, moving the visitor toward an inquiry and closing off the exits that lose them. Then we made the business findable where most local buyers actually start: we set up and verified their Google Business Profile, tied it cleanly to the site, and built a review strategy to grow the kind of standing that takes years to earn offline.",
    outcomeTitle: "From invisible to in demand",
    outcome:
      "From a standing start, the site drew around 2,000 visitors in its first fifteen days, and those visits now convert into five to ten inquiries a day from serious buyers asking about real products. This is under a month in and the curve is still going up. The bigger prize is already in view: the plan is to make Mehboob Scales the largest online weighing-solutions store in Pakistan.",
    services: ["growth-marketing", "web-development", "design"],
    stack: [
      "WordPress",
      "Google Business Profile",
      "Technical SEO",
      "Keyword Research",
      "Conversion Copywriting",
    ],
    liveUrl: "https://mehboob-scales.com",
    images: [
      {
        src: "/images/portfolio/portfolio-mehboob-banner.avif",
        alt: "Mehboob Scales website case study",
        role: "hero",
      },
      {
        src: "/images/portfolio/mehboob/mehboob1.avif",
        alt: "Mehboob Scales website overview",
        role: "gallery",
      },
      {
        src: "/images/portfolio/mehboob/mehboob2.avif",
        alt: "Mehboob Scales website detail",
        role: "gallery",
      },
    ],
    metrics: [
      { value: "~2,000", label: "visitors in the first 15 days" },
      { value: "5–10", label: "qualified enquiries per day" },
    ],
    visual: "signal",
    featured: true,
  },
  {
    slug: "proactive-building-solutions",
    client: "Proactive Building Solutions",
    year: "2026",
    category: "web-development",
    summary:
      "A New York construction firm whose website was a decade behind the business. We rebuilt it around what the market actually responds to, and monthly traffic climbed more than twelvefold in two months.",
    challengeTitle: "Serious work. An outdated first impression.",
    challenge:
      "Proactive Building Solutions did serious work in a competitive market. Their website did not say so. It looked like 2010, ranked for nothing, and gave a visitor no reason to stay or reach out. A capable construction company was losing to worse companies with better websites.",
    approachTitle: "We made the message lead the build",
    approach:
      "Before writing a word, we sat down with the people who run the business. Those conversations were the real work: who they sell to, what they actually do better than anyone else, and how much the market already understands about the problem they solve. Most agencies skip this and design a pretty box. We treated it as the brief. What came out of those meetings shaped the copy, and the copy shaped the design, so the site says something true about the company before it tries to look good. Every page is built to give the visitor a reason to act, whether that means becoming a lead or leaving with something useful. Behind it, a headless WordPress CMS lets the team publish insights and guides without touching code, and the whole site is built to be found across search and AI answer engines, not just Google's blue links.",
    outcomeTitle: "A website that started doing its job",
    outcome:
      "Monthly traffic grew by more than 1,200% in two months. More than a bigger number, the site now does a job the old one never could: it makes a credible first impression and turns quiet visits into inquiries. The content system means that momentum keeps compounding on its own.",
    services: ["web-development", "design", "growth-marketing"],
    stack: [
      "Headless WordPress",
      "Next.js",
      "Technical SEO",
      "AEO",
      "GEO",
      "Conversion Copywriting",
    ],
    liveUrl: "https://pbs.nyc",
    images: [
      {
        src: "/images/portfolio/portfolio-pbs-banner.avif",
        alt: "Proactive Building Solutions website case study",
        role: "hero",
      },
      {
        src: "/images/portfolio/pbs/pbs1.avif",
        alt: "Proactive Building Solutions website overview",
        role: "gallery",
      },
      {
        src: "/images/portfolio/pbs/pbs2.avif",
        alt: "Proactive Building Solutions website detail",
        role: "gallery",
      },
    ],
    metrics: [
      { value: "1,200%+", label: "monthly traffic growth" },
      { value: "2 months", label: "from launch to measured result" },
    ],
    visual: "frames",
    featured: true,
  },
];

export const publishedCaseStudies = caseStudies.filter((study) => !study.draft);

/** Backwards-compatible exports used by existing site-wide cross-links. */
export type PortfolioItem = CaseStudy;
export const portfolio = publishedCaseStudies;
export const portfolioSlugs = portfolio.map((item) => item.slug);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return publishedCaseStudies.find((study) => study.slug === slug);
}

export const getPortfolioItem = getCaseStudy;

export function caseStudiesByCategory(
  category: ServiceCategorySlug,
): CaseStudy[] {
  return publishedCaseStudies.filter((study) => study.category === category);
}
