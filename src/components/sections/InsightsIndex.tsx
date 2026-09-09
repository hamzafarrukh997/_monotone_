"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/blog";
import { routes } from "@/lib/links";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";

type InsightsIndexProps = {
  posts: PostMeta[];
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function InsightArtwork({
  visual,
}: {
  visual: string;
}) {
  return (
    <div className="insights-art" data-visual={visual} aria-hidden="true">
      <div className="insights-art__meta">
        <span>INSIGHTS</span>
      </div>

      {visual === "pricing" ? (
        <>
          <span className="insights-art__pricing-currency">PKR</span>
          <span className="insights-art__pricing-card insights-art__pricing-card--entry">
            <small>PLACEHOLDER</small>
            <strong>20K</strong>
          </span>
          <span className="insights-art__pricing-card insights-art__pricing-card--growth">
            <small>GROWTH</small>
            <strong>150K+</strong>
          </span>
          <span className="insights-art__pricing-card insights-art__pricing-card--system">
            <small>SYSTEM</small>
            <strong>500K+</strong>
          </span>
        </>
      ) : null}

      {visual === "channels" ? (
        <>
          <span className="insights-art__channel-browser">
            <i className="insights-art__channel-browser-bar">
              <b />
              <b />
              <b />
              <small>yourbusiness.com</small>
            </i>
            <strong>WEBSITE</strong>
            <em>YOUR HOME BASE</em>
          </span>
          <span className="insights-art__channel-rail" />
          <span className="insights-art__channel-node insights-art__channel-node--facebook">
            <svg viewBox="0 0 24 24" role="img" aria-label="Facebook">
              <path d="M13.5 8H11V6.2c0-.7.5-.9 1.1-.9h1.4V3h-2c-2.2 0-3.3 1.3-3.3 3.1V8H6v2.5h2.2V21H11V10.5h2.1L13.5 8Z" />
            </svg>
          </span>
          <span className="insights-art__channel-node insights-art__channel-node--instagram">
            <svg viewBox="0 0 24 24" role="img" aria-label="Instagram">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.7" r="1" className="insights-art__instagram-dot" />
            </svg>
          </span>
          <span className="insights-art__channel-caption">SOCIAL BRINGS REACH. YOUR SITE BUILDS TRUST.</span>
        </>
      ) : null}

      {visual === "timeline" ? (
        <>
          <span className="insights-art__timeline-word">BUILD</span>
          <span className="insights-art__timeline-caption">FROM BRIEF TO LIVE</span>
          <span className="insights-art__timeline-rule" />
          <span className="insights-art__timeline-stage insights-art__timeline-stage--one"><i>01</i>BRIEF</span>
          <span className="insights-art__timeline-stage insights-art__timeline-stage--two"><i>02</i>DESIGN</span>
          <span className="insights-art__timeline-stage insights-art__timeline-stage--three"><i>03</i>BUILD</span>
          <span className="insights-art__timeline-stage insights-art__timeline-stage--four"><i>04</i>LIVE</span>
          <span className="insights-art__timeline-blocker">STUCK?</span>
        </>
      ) : null}

      {visual === "enquiries" ? (
        <>
          <span className="insights-art__conversion-card">
            <span className="insights-art__conversion-column">
              <small>TRAFFIC IN</small>
              <strong>1,248</strong>
            </span>
            <span aria-hidden="true" />
            <span className="insights-art__conversion-column insights-art__conversion-column--result">
              <small>ENQUIRIES</small>
              <strong>0</strong>
            </span>
            <em>CONVERSION LEAK</em>
          </span>
          <span className="insights-art__conversion-caption">THE TRAFFIC ISN&apos;T THE PROBLEM</span>
        </>
      ) : null}

      {visual === "checklist" ? (
        <>
          <span className="insights-art__quality-kicker">MORE THAN WHAT YOU SEE</span>
          <span className="insights-art__quality-cutaway">
            <span className="insights-art__quality-layer insights-art__quality-layer--surface">
              <small>THE SURFACE</small>
            </span>
            <span className="insights-art__quality-layer insights-art__quality-layer--message">
              <small>MESSAGE</small>
            </span>
            <span className="insights-art__quality-layer insights-art__quality-layer--structure">
              <small>STRUCTURE</small>
            </span>
            <span className="insights-art__quality-layer insights-art__quality-layer--intent">
              <small>INTENT</small>
            </span>
          </span>
          <span className="insights-art__quality-caption">WHAT&apos;S WORKING UNDERNEATH?</span>
        </>
      ) : null}

      {visual === "red-flags" ? (
        <>
          <span className="insights-art__agency-wordmark">
            <small>HOW TO</small>
            <strong>SP<span>O</span>T</strong>
          </span>
          <span className="insights-art__agency-caption">BEFORE YOU PAY</span>
        </>
      ) : null}

      {visual === "questions" ? (
        <>
          <span className="insights-art__question-card insights-art__question-card--one">?</span>
          <span className="insights-art__question-card insights-art__question-card--two">?</span>
          <span className="insights-art__question-card insights-art__question-card--three">?</span>
          <span className="insights-art__question-prompt">ASK<br />BETTER</span>
        </>
      ) : null}
    </div>
  );
}

export function InsightsIndex({ posts }: InsightsIndexProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const reduceMotion = useReducedMotion();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts],
  );
  const visiblePosts = useMemo(
    () =>
      activeCategory === "All"
        ? posts
        : posts.filter((post) => post.category === activeCategory),
    [activeCategory, posts],
  );

  return (
    <div className="bg-white text-[#2b2b2b]">
      <section
        className="mx-auto flex min-h-[clamp(30rem,60vh,44rem)] w-full max-w-[120rem] items-center px-5 py-20 md:px-8 lg:px-10 lg:py-28"
        aria-labelledby="insights-heading"
      >
        <div className="mx-auto flex w-full max-w-[86rem] flex-col items-center text-center">
          <p className="mb-6 flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.16em] uppercase">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            Monotone / Insights
          </p>
          <h1
            id="insights-heading"
            className="m-0 max-w-[75rem] font-display text-[clamp(3.65rem,7.15vw,8.5rem)] leading-[0.92] font-normal tracking-[-0.075em]"
          >
            Practical ideas for businesses who want more<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-[43rem] font-sans text-base leading-[1.55] font-normal text-[#2b2b2b]/72 md:text-lg">
            Straight advice on brand, websites, content, and growth you can
            actually use.
          </p>
        </div>
      </section>

      <section
        className="mx-auto w-full max-w-[120rem] px-5 pb-28 md:px-8 lg:px-10 lg:pb-40"
        aria-label="Insight articles"
      >
        <div className="flex flex-col gap-8 border-t border-[#2b2b2b]/25 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="font-display text-[clamp(1.55rem,2vw,2.25rem)] leading-none font-normal tracking-[-0.05em]">
            Browse the thinking
          </p>
          <div
            className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Filter insights by category"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  className={`shrink-0 rounded-full border px-5 py-2.5 font-sans text-sm font-normal transition-[background-color,color,border-color,transform] duration-300 ease-out active:scale-[0.97] ${
                    isActive
                      ? "border-[#2b2b2b] bg-[#2b2b2b] text-white"
                      : "border-[#2b2b2b]/35 bg-white text-[#2b2b2b] hover:border-accent hover:bg-accent hover:text-white"
                  }`}
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <motion.ul
          layout={!reduceMotion}
          className="mt-12 grid list-none grid-cols-1 gap-x-5 gap-y-16 p-0 md:grid-cols-2 xl:grid-cols-12 xl:gap-y-24"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visiblePosts.map((post, index) => {
              return (
                <motion.li
                  layout={!reduceMotion}
                  key={post.slug}
                  className={index < 2 ? "xl:col-span-6" : "xl:col-span-4"}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={routes.post(post.slug)}
                    className="group/insight block h-full text-[#2b2b2b] no-underline hover:text-[#2b2b2b]"
                    aria-label={`Read ${post.title}`}
                  >
                    <article className="flex h-full flex-col">
                      <motion.div
                        className="insights-card-visual relative aspect-[1.38/1] overflow-hidden rounded-[clamp(1rem,1.2vw,1.5rem)]"
                        whileHover={reduceMotion ? undefined : { y: -5 }}
                        transition={{
                          type: "spring",
                          stiffness: 115,
                          damping: 20,
                          mass: 0.85,
                        }}
                      >
                        <InsightArtwork visual={post.visual} />
                        <span className="absolute right-5 bottom-5 grid size-11 translate-y-2 place-items-center rounded-full bg-white text-lg text-[#2b2b2b] opacity-0 shadow-[0_10px_28px_rgba(43,43,43,0.14)] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/insight:translate-y-0 group-hover/insight:opacity-100 md:right-7 md:bottom-7">
                          ↗
                        </span>
                      </motion.div>

                      <div className="mt-6 flex items-center justify-between gap-5 font-sans text-[0.68rem] font-semibold tracking-[0.12em] text-[#2b2b2b]/58 uppercase">
                        <span>{post.category}</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h2
                        className="mt-4 max-w-[42rem] font-display text-[clamp(1.7rem,2.15vw,2.55rem)] leading-[1.08] font-medium tracking-[-0.055em]"
                      >
                        {post.title}
                      </h2>

                      <p
                        className="mt-4 max-w-[38rem] font-sans text-sm leading-[1.6] font-normal text-[#2b2b2b]/70 md:text-[0.95rem]"
                      >
                        {post.excerpt}
                      </p>

                      <div className="mt-auto flex items-end justify-between gap-5 pt-8">
                        <time
                          dateTime={post.date}
                          className="font-sans text-xs font-normal text-[#2b2b2b]/58"
                        >
                          {formatDate(post.date)}
                        </time>
                        <span className="h-px flex-1 bg-[#2b2b2b]/18 transition-colors duration-500 group-hover/insight:bg-accent/70" />
                      </div>
                    </article>
                  </Link>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>

        <div className="mt-28 overflow-hidden rounded-[clamp(1.25rem,1.7vw,2rem)] bg-accent px-6 py-9 text-white md:px-10 md:py-12 lg:mt-40 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:py-14">
          <div>
            <p className="font-sans text-xs font-semibold tracking-[0.14em] uppercase">
              Need the practical version?
            </p>
            <h2 className="mt-4 max-w-[52rem] font-display text-[clamp(2.35rem,4vw,4.75rem)] leading-[0.98] font-normal tracking-[-0.065em]">
              Let&apos;s turn the thinking into something useful.
            </h2>
          </div>
          <Button
            href={routes.contact}
            variant="dark"
            size="lg"
            className="hero-cta hero-cta--secondary mt-8 min-h-14 shrink-0 border-[#2b2b2b] px-7 font-normal lg:mt-0"
          >
            <span className="hero-cta__label">Request a free audit</span>
          </Button>
        </div>
      </section>
    </div>
  );
}
