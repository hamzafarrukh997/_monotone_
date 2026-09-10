"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  publishedCaseStudies,
  type CaseStudy,
  type ServiceCategorySlug,
} from "@/content/portfolio";
import { routes } from "@/lib/links";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { CaseStudyArtwork } from "@/components/sections/CaseStudyArtwork";

type WorkView = "featured" | "all";

const serviceLabels: Record<ServiceCategorySlug, string> = {
  design: "Design",
  "web-development": "Web Development",
  "growth-marketing": "Growth Marketing",
  "maintenance-support": "Maintenance & Support",
};

function projectNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function projectScope(project: CaseStudy) {
  return project.services.map((service) => serviceLabels[service]).join(" · ");
}

export function WorkIndex() {
  const [view, setView] = useState<WorkView>("featured");
  const reduceMotion = useReducedMotion();
  const featuredProjects = publishedCaseStudies.filter(
    (project) => project.featured,
  );

  return (
    <div className="bg-white text-[#2b2b2b]">
      <section
        className="mx-auto flex min-h-[clamp(29rem,58vh,42rem)] w-full max-w-[120rem] items-center px-5 py-20 md:px-8 lg:px-10 lg:py-28"
        aria-labelledby="work-index-heading"
      >
        <div className="mx-auto flex w-full max-w-[88rem] flex-col items-center text-center">
          <p className="mb-6 flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.16em] uppercase">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            Monotone / Work
          </p>
          <h1
            id="work-index-heading"
            className="m-0 max-w-[78rem] font-display text-[clamp(3.65rem,7.15vw,8.5rem)] leading-[0.92] font-normal tracking-[-0.075em]"
          >
            Work built to make the business easier to choose
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-[44rem] font-sans text-base leading-[1.55] font-normal text-[#2b2b2b]/70 md:text-lg">
            Real businesses, clear problems, and digital work designed to make a
            measurable difference.
          </p>
        </div>
      </section>

      <section
        className="mx-auto w-full max-w-[120rem] px-5 pb-28 md:px-8 lg:px-10 lg:pb-40"
        aria-label="Project archive"
      >
        <div
          className="work-index-filters flex max-w-full items-baseline gap-x-8 overflow-x-auto border-t border-[#2b2b2b]/25 pt-8 pb-3 [scrollbar-width:none] md:gap-x-14 lg:pt-10 [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Choose which projects to show"
        >
          <button
            type="button"
            className="work-index-filter"
            data-active={view === "featured"}
            aria-pressed={view === "featured"}
            onClick={() => setView("featured")}
          >
            <span>Featured</span>
            <sup>{String(featuredProjects.length).padStart(2, "0")}</sup>
          </button>
          <button
            type="button"
            className="work-index-filter"
            data-active={view === "all"}
            aria-pressed={view === "all"}
            onClick={() => setView("all")}
          >
            <span>All projects</span>
            <sup>{String(publishedCaseStudies.length).padStart(2, "0")}</sup>
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {view === "featured" ? (
            <motion.ul
              key="featured-projects"
              className="mt-14 grid list-none gap-x-5 gap-y-16 p-0 md:grid-cols-2 lg:mt-20 lg:gap-y-24"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {featuredProjects.map((project) => {
                const index = publishedCaseStudies.findIndex(
                  (item) => item.slug === project.slug,
                );
                const number = projectNumber(index);

                return (
                  <li key={project.slug} className="min-w-0">
                    <Link
                      href={routes.workItem(project.slug)}
                      className="group/work-card block h-full text-[#2b2b2b] no-underline hover:text-[#2b2b2b]"
                      aria-label={`View ${project.client} case study`}
                    >
                      <article className="flex h-full flex-col">
                        <motion.div
                          className="work-index-card relative aspect-[1.32/1] overflow-hidden rounded-[clamp(1rem,1.2vw,1.5rem)] md:aspect-[1.45/1]"
                          whileHover={reduceMotion ? undefined : { y: -5 }}
                          transition={{
                            type: "spring",
                            stiffness: 110,
                            damping: 20,
                            mass: 0.85,
                          }}
                        >
                          <CaseStudyArtwork study={project} number={number} />
                        </motion.div>

                        <div className="mt-5 flex items-start justify-between gap-6 border-b border-[#2b2b2b]/20 pb-5 md:mt-6">
                          <div>
                            <p className="font-sans text-[0.67rem] font-semibold tracking-[0.13em] text-[#2b2b2b]/54 uppercase">
                              {serviceLabels[project.category]} / {project.year}
                            </p>
                            <h2 className="mt-2 font-display text-[clamp(1.75rem,2.35vw,2.8rem)] leading-[1.05] font-medium tracking-[-0.055em]">
                              {project.client}
                            </h2>
                          </div>
                          <span className="mt-1 shrink-0 font-sans text-[0.67rem] font-semibold tracking-[0.13em] text-[#2b2b2b]/54 uppercase">
                            {number}
                          </span>
                        </div>
                        <p className="mt-4 max-w-[45rem] font-sans text-sm leading-[1.55] font-normal text-[#2b2b2b]/65">
                          {project.summary}
                        </p>
                      </article>
                    </Link>
                  </li>
                );
              })}
            </motion.ul>
          ) : (
            <motion.div
              key="all-projects"
              className="mt-14 lg:mt-20"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hidden grid-cols-[5rem_minmax(0,1.45fr)_minmax(0,0.8fr)_minmax(0,1fr)] gap-6 border-b border-[#2b2b2b]/30 px-5 pb-4 font-sans text-[0.65rem] font-semibold tracking-[0.13em] text-[#2b2b2b]/50 uppercase lg:grid">
                <span>No.</span>
                <span>Project</span>
                <span>Year</span>
                <span>Scope</span>
              </div>
              <ul className="m-0 list-none p-0">
                {publishedCaseStudies.map((project, index) => (
                  <li key={project.slug}>
                    <Link
                      href={routes.workItem(project.slug)}
                      className="work-index-row group/row relative isolate block overflow-hidden border-b border-[#2b2b2b]/22 px-1 py-6 text-[#2b2b2b] no-underline hover:text-[#2b2b2b] md:px-5 md:py-7"
                    >
                      <span className="relative z-10 grid items-start gap-4 md:grid-cols-[3rem_minmax(0,1fr)] lg:grid-cols-[5rem_minmax(0,1.45fr)_minmax(0,0.8fr)_minmax(0,1fr)] lg:items-center lg:gap-6">
                        <span className="font-sans text-xs font-normal text-[#2b2b2b]/50 transition-colors duration-500">
                          {projectNumber(index)}
                        </span>
                        <span className="font-display text-[clamp(1.85rem,2.7vw,3.2rem)] leading-none font-normal tracking-[-0.06em] transition-colors duration-500">
                          {project.client}
                        </span>
                        <span className="col-start-2 font-sans text-sm font-normal text-[#2b2b2b]/62 transition-colors duration-500 lg:col-start-auto">
                          {project.year}
                        </span>
                        <span className="col-start-2 font-sans text-sm font-normal text-[#2b2b2b]/62 transition-colors duration-500 lg:col-start-auto">
                          {projectScope(project)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-28 overflow-hidden rounded-[clamp(1.25rem,1.7vw,2rem)] bg-accent px-6 py-9 text-white md:px-10 md:py-12 lg:mt-40 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:py-14">
          <div>
            <p className="font-sans text-xs font-semibold tracking-[0.14em] uppercase">
              Have something worth building?
            </p>
            <h2 className="mt-4 max-w-[52rem] font-display text-[clamp(2.35rem,4vw,4.75rem)] leading-[0.98] font-normal tracking-[-0.065em]">
              Let&apos;s make the next project the one people remember.
            </h2>
          </div>
          <Button
            href={routes.contact}
            variant="dark"
            size="lg"
            className="hero-cta hero-cta--secondary mt-8 min-h-14 shrink-0 border-[#2b2b2b] px-7 font-light lg:mt-0"
          >
            <span className="hero-cta__label">Request a free audit</span>
          </Button>
        </div>
      </section>
    </div>
  );
}
