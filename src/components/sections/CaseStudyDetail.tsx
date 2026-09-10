import type { CaseStudy, CaseStudyImage } from "@/content/portfolio";
import type { ServiceCategory } from "@/content/services";
import { routes } from "@/lib/links";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { CaseStudyArtwork } from "@/components/sections/CaseStudyArtwork";

type CaseStudyDetailProps = {
  study: CaseStudy;
  projectNumber: string;
  relatedService?: ServiceCategory;
  nextStudy?: CaseStudy;
};

const serviceLabels: Record<CaseStudy["services"][number], string> = {
  design: "Design",
  "web-development": "Web Development",
  "growth-marketing": "Growth Marketing",
  "maintenance-support": "Maintenance & Support",
};

function MediaPlaceholder({
  study,
  number,
  className,
  image = null,
}: {
  study: CaseStudy;
  number: string;
  className: string;
  image?: CaseStudyImage | null;
}) {
  return (
    <div
      className={`work-index-card relative overflow-hidden rounded-[clamp(1rem,1.4vw,1.75rem)] ${className}`}
    >
      <CaseStudyArtwork
        study={study}
        number={number}
        label="MONOTONE / IMAGE PLACEHOLDER"
        image={image}
      />
    </div>
  );
}

export function CaseStudyDetail({
  study,
  projectNumber,
  relatedService,
  nextStudy,
}: CaseStudyDetailProps) {
  const galleryImages = study.images.filter(
    (entry) => entry.role === "gallery" && entry.src,
  );

  return (
    <article className="bg-white text-[#2b2b2b]">
      <header className="mx-auto w-full max-w-[120rem] px-5 pt-12 pb-16 md:px-8 md:pt-20 md:pb-24 lg:px-10 lg:pt-24 lg:pb-32">
        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-[#2b2b2b]/25 pt-5 font-sans text-[0.65rem] font-semibold tracking-[0.14em] uppercase md:text-xs">
          <Link
            href={routes.work}
            className="group inline-flex items-center gap-3 text-[#2b2b2b] no-underline"
          >
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            Monotone / Work
          </Link>
          <span className="text-[#2b2b2b]/55">
            Case study {projectNumber} / {study.year}
          </span>
        </div>

        <div className="mt-[clamp(4rem,7vw,8.5rem)] grid items-end gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)] lg:gap-20">
          <h1 className="m-0 max-w-[13ch] font-display text-[clamp(3.8rem,7.25vw,8.75rem)] leading-[0.89] font-normal tracking-[-0.078em]">
            {study.client}
            <span className="text-accent">.</span>
          </h1>

          <div className="max-w-[38rem] lg:pb-2">
            <p className="font-sans text-base leading-[1.62] font-normal text-[#2b2b2b]/72 md:text-lg">
              {study.summary}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[#2b2b2b]/25 pt-5">
              {relatedService ? (
                <Link
                  href={routes.service(relatedService.slug)}
                  className="font-sans text-xs font-semibold tracking-[0.1em] text-[#2b2b2b] uppercase no-underline"
                >
                  {relatedService.title} ↗
                </Link>
              ) : null}
              {study.liveUrl ? (
                <Link
                  href={study.liveUrl}
                  className="font-sans text-xs font-semibold tracking-[0.1em] text-[#2b2b2b] uppercase no-underline"
                >
                  Visit live site ↗
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <section
        className="mx-auto w-full max-w-[120rem] px-5 pb-[clamp(7rem,10vw,12rem)] md:px-8 lg:px-10"
        aria-label={`${study.client} project imagery`}
      >
        <MediaPlaceholder
          study={study}
          number={projectNumber}
          image={galleryImages[0] ?? null}
          className="aspect-[1.1/1] sm:aspect-[1.55/1] lg:aspect-[2.05/1]"
        />
      </section>

      <section
        className="mx-auto grid w-full max-w-[120rem] gap-12 border-t border-[#2b2b2b]/25 px-5 py-[clamp(7rem,10vw,12rem)] md:px-8 lg:grid-cols-[minmax(16rem,0.65fr)_minmax(0,1.35fr)] lg:gap-24 lg:px-10"
        aria-labelledby="case-study-challenge"
      >
        <div>
          <p className="flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.14em] uppercase">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            01 / The challenge
          </p>
          <h2
            id="case-study-challenge"
            className="mt-6 max-w-[12ch] font-display text-[clamp(3rem,5vw,6rem)] leading-[0.94] font-normal tracking-[-0.07em]"
          >
            {study.challengeTitle}
          </h2>
        </div>

        <div className="lg:pt-10">
          <p className="max-w-[58rem] font-sans text-[clamp(1.2rem,1.65vw,1.8rem)] leading-[1.55] font-light tracking-[-0.02em]">
            {study.challenge}
          </p>

          <div className="mt-16 grid gap-x-10 gap-y-10 border-t border-[#2b2b2b]/25 pt-6 sm:grid-cols-2">
            <div>
              <p className="font-sans text-[0.65rem] font-semibold tracking-[0.14em] text-[#2b2b2b]/50 uppercase">
                Services
              </p>
              <ul className="mt-4 m-0 list-none p-0">
                {study.services.map((service) => (
                  <li key={service} className="border-b border-[#2b2b2b]/18 py-2.5">
                    <Link
                      href={routes.service(service)}
                      className="font-display text-lg tracking-[-0.04em] text-[#2b2b2b] no-underline"
                    >
                      {serviceLabels[service]} ↗
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-sans text-[0.65rem] font-semibold tracking-[0.14em] text-[#2b2b2b]/50 uppercase">
                Stack
              </p>
              <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
                {study.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[#2b2b2b]/25 px-4 py-2 font-sans text-xs font-normal"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#2b2b2b] text-white" aria-labelledby="case-study-approach">
        <div className="mx-auto grid w-full max-w-[120rem] gap-14 px-5 py-[clamp(7rem,11vw,13rem)] md:px-8 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)] lg:gap-24 lg:px-10">
          <div>
            <p className="flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.14em] uppercase">
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
              02 / The approach
            </p>
            <h2
              id="case-study-approach"
              className="mt-6 max-w-[11ch] font-display text-[clamp(3.4rem,6vw,7.2rem)] leading-[0.91] font-normal tracking-[-0.075em]"
            >
              {study.approachTitle}
              <span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-[58rem] font-sans text-[clamp(1.15rem,1.55vw,1.7rem)] leading-[1.62] font-light text-white/78 lg:pt-10">
            {study.approach}
          </p>
        </div>
      </section>

      <section
        className="mx-auto grid w-full max-w-[120rem] gap-5 px-5 py-[clamp(7rem,10vw,12rem)] md:grid-cols-[1.25fr_0.75fr] md:px-8 lg:px-10"
        aria-label="Additional project imagery"
      >
        <MediaPlaceholder
          study={study}
          number="A"
          image={null}
          className="aspect-[1.2/1] md:aspect-auto md:min-h-[clamp(28rem,45vw,54rem)]"
        />
        <MediaPlaceholder
          study={study}
          number="B"
          image={galleryImages[1] ?? null}
          className="aspect-[1.2/1] md:aspect-auto md:min-h-[clamp(28rem,45vw,54rem)]"
        />
      </section>

      <section
        className="mx-auto w-full max-w-[120rem] border-t border-[#2b2b2b]/25 px-5 py-[clamp(7rem,10vw,12rem)] md:px-8 lg:px-10"
        aria-labelledby="case-study-outcome"
      >
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.14em] uppercase">
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
              03 / The outcome
            </p>
            <h2
              id="case-study-outcome"
              className="mt-6 max-w-[10ch] font-display text-[clamp(3.4rem,6vw,7.2rem)] leading-[0.91] font-normal tracking-[-0.075em]"
            >
              {study.outcomeTitle}
              <span className="text-accent">.</span>
            </h2>
          </div>
          <div className="lg:pt-10">
            <p className="max-w-[58rem] font-sans text-[clamp(1.2rem,1.65vw,1.8rem)] leading-[1.55] font-light tracking-[-0.02em]">
              {study.outcome}
            </p>
            <dl className="mt-16 grid border-t border-[#2b2b2b]/25 sm:grid-cols-2">
              {study.metrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className={`py-7 sm:py-10 ${index === 0 ? "sm:border-r sm:pr-10" : "border-t sm:border-t-0 sm:pl-10"} border-[#2b2b2b]/25`}
                >
                  <dt className="font-sans text-xs font-semibold tracking-[0.12em] text-[#2b2b2b]/52 uppercase">
                    {metric.label}
                  </dt>
                  <dd className="mt-3 font-display text-[clamp(3rem,5vw,6rem)] leading-none font-normal tracking-[-0.075em] text-accent">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {nextStudy ? (
        <section className="bg-accent text-white" aria-labelledby="next-case-study">
          <div className="mx-auto w-full max-w-[120rem] px-5 py-[clamp(5rem,8vw,9rem)] md:px-8 lg:px-10">
            <p className="font-sans text-xs font-semibold tracking-[0.14em] uppercase">
              Next case study
            </p>
            <Link
              href={routes.workItem(nextStudy.slug)}
              className="group mt-8 flex items-end justify-between gap-8 border-t border-white/45 pt-8 text-white no-underline hover:text-white"
            >
              <h2
                id="next-case-study"
                className="max-w-[13ch] font-display text-[clamp(3rem,6.5vw,8rem)] leading-[0.9] font-normal tracking-[-0.075em]"
              >
                {nextStudy.client}
              </h2>
              <span className="shrink-0 font-display text-[clamp(2.5rem,5vw,5rem)] transition-transform duration-500 group-hover:translate-x-2" aria-hidden="true">
                ↗
              </span>
            </Link>
            <Button
              href={routes.work}
              variant="dark"
              size="lg"
              className="hero-cta hero-cta--secondary mt-12 min-h-14 border-[#2b2b2b] px-7 font-light"
            >
              <span className="hero-cta__label">View all work</span>
            </Button>
          </div>
        </section>
      ) : null}
    </article>
  );
}
