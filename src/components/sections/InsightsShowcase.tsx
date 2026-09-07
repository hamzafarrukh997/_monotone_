"use client";

import { motion, useReducedMotion } from "framer-motion";
import { home } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { InsightArtwork } from "@/components/sections/InsightsIndex";

export function InsightsShowcase() {
  const { heading, cta, articles } = home.insights;
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="bg-white text-[#2b2b2b]"
      aria-labelledby="insights-showcase-heading"
    >
      <div className="mx-auto w-full max-w-[120rem] px-5 py-24 md:px-8 lg:px-10 lg:py-32">
        <div className="mb-16 flex flex-col items-start gap-6 lg:mb-20 lg:flex-row lg:items-center lg:justify-between">
          <h2
            id="insights-showcase-heading"
            className="m-0 max-w-[78rem] text-left font-display text-[clamp(3rem,4.17vw,5rem)] leading-[1.08] font-normal tracking-[-0.06em]"
          >
            {heading.before}
            <span className="text-accent">{heading.accent}</span>
          </h2>

          <Button
            href={cta.href}
            variant="secondary"
            size="lg"
            className="home-heading-cta group/cta h-14 w-fit shrink-0 gap-4 px-7 text-base font-medium transition-[background-color,color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            <span className="home-heading-cta__label">{cta.label}</span>
            <span
              className="home-heading-cta__icon text-lg leading-none text-accent transition-[color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </Button>
        </div>

        <ul className="m-0 grid list-none gap-x-5 gap-y-14 p-0 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article, index) => {
            return (
              <li
                className={index === 2 ? "md:col-span-2 xl:col-span-1" : ""}
                key={article.title}
              >
                <Link
                  href={article.href}
                  className="group/card block h-full text-[#2b2b2b] no-underline hover:text-[#2b2b2b]"
                  aria-label={`Read ${article.title}`}
                >
                  <motion.article
                    className="flex h-full flex-col"
                    initial={false}
                    whileHover={reduceMotion ? undefined : { y: -6 }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 18,
                      mass: 0.9,
                    }}
                  >
                    <div
                      className="insights-card-visual relative aspect-[1.7/1] overflow-hidden rounded-[clamp(1rem,1.15vw,1.4rem)]"
                    >
                      <InsightArtwork visual={article.visual} />

                      <span
                        className="absolute right-5 bottom-5 grid size-10 translate-y-2 scale-95 place-items-center rounded-full bg-[#111111] text-lg text-white opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group-hover/card:translate-y-0 group-hover/card:scale-100 group-hover/card:opacity-100 md:right-7 md:bottom-7"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-[clamp(1.35rem,1.45vw,1.75rem)] leading-[1.2] font-medium tracking-[-0.045em]">
                      {article.title}
                    </h3>

                    <div className="mt-auto pt-9">
                      <p className="mb-4 font-sans text-xs font-semibold tracking-[0.12em] text-[#5f5f5f] uppercase">
                        {article.category}
                      </p>
                      <span className="block h-px w-full bg-[#2b2b2b]/20" />
                    </div>
                  </motion.article>
                </Link>
              </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}
