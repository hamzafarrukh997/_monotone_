"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { home } from "@/content/home";

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 36 : -36,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -36 : 36,
  }),
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : undefined}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 12h13m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function TestimonialsShowcase() {
  const testimonials = home.testimonials;
  const reduceMotion = useReducedMotion();
  const [{ index, direction }, setSlide] = useState({ index: 0, direction: 1 });
  const testimonial = testimonials[index];

  function navigate(step: number) {
    setSlide((current) => ({
      index: (current.index + step + testimonials.length) % testimonials.length,
      direction: step,
    }));
  }

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-white px-5 py-16 text-[#2b2b2b] md:px-8 md:py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[120rem]">
        <div className="relative flex h-[36rem] flex-col overflow-hidden rounded-[1.5rem] border border-[#2b2b2b]/15 bg-[#f2eee9] px-6 py-7 sm:h-[38rem] sm:px-10 sm:py-10 lg:h-[40rem] lg:px-16 lg:py-14">
          <div
            aria-hidden="true"
            className="absolute -right-[0.05em] -top-[0.34em] select-none font-display text-[clamp(11rem,24vw,30rem)] leading-none text-accent/[0.075]"
          >
            “
          </div>

          <header className="relative z-10 flex items-center justify-between gap-5 font-sans text-[0.6875rem] font-bold uppercase tracking-[0.14em] sm:text-xs">
            <h2 id="testimonials-heading" className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              Client stories
            </h2>
            <p className="hidden text-[#2b2b2b]/50 sm:block">In their own words</p>
          </header>

          <div className="relative z-10 flex min-h-0 flex-1 items-center py-10 sm:py-12 lg:py-16">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                variants={reduceMotion ? undefined : slideVariants}
                initial={reduceMotion ? false : "enter"}
                animate="center"
                exit={reduceMotion ? undefined : "exit"}
                transition={{
                  duration: reduceMotion ? 0 : 0.48,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mx-auto w-full max-w-[74rem]"
              >
                <blockquote className="m-0 font-sans text-[clamp(1.5rem,3vw,3.5rem)] leading-[1.16] font-semibold tracking-[-0.045em]">
                  <span className="text-accent">“</span>
                  {testimonial.quote}
                  <span className="text-accent">”</span>
                </blockquote>

                <figcaption className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm sm:mt-12 sm:text-base">
                  <span className="font-bold">{testimonial.name}</span>
                  <span className="h-px w-8 bg-accent" aria-hidden="true" />
                  <span className="text-[#2b2b2b]/55">{testimonial.role}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="relative z-10 flex items-end justify-between gap-5">
            <p
              aria-live="polite"
              className="font-sans text-xs font-bold tracking-[0.14em]"
            >
              {String(index + 1).padStart(2, "0")}
              <span className="mx-2 text-accent">/</span>
              {String(testimonials.length).padStart(2, "0")}
            </p>

            <div className="flex gap-2" aria-label="Testimonial navigation">
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Previous testimonial"
                className="group grid h-12 w-12 place-items-center rounded-full border border-[#2b2b2b]/25 transition-[background-color,color,border-color,transform] duration-300 hover:-translate-x-0.5 hover:border-[#2b2b2b] hover:bg-[#2b2b2b] hover:text-white sm:h-14 sm:w-14"
              >
                <span className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5">
                  <ArrowIcon direction="left" />
                </span>
              </button>
              <button
                type="button"
                onClick={() => navigate(1)}
                aria-label="Next testimonial"
                className="group grid h-12 w-12 place-items-center rounded-full border border-accent bg-accent text-[#2b2b2b] transition-[background-color,color,transform] duration-300 hover:translate-x-0.5 hover:bg-transparent sm:h-14 sm:w-14"
              >
                <span className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowIcon direction="right" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
