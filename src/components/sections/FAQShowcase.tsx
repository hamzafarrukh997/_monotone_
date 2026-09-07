"use client";

import Image from "next/image";
import { useState } from "react";
import { home } from "@/content/home";

type FAQHeading = {
  before: string;
  accent: string;
  after: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type FAQShowcaseProps = {
  heading?: FAQHeading;
  items?: readonly FAQItem[];
  sectionId?: string;
};

export function FAQShowcase({
  heading = home.faq.heading,
  items = home.faq.items,
  sectionId = "home-faq",
}: FAQShowcaseProps = {}) {
  const headingId = `${sectionId}-heading`;
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <section
      data-header-theme="dark"
      className="bg-[#2b2b2b] text-white"
      aria-labelledby={headingId}
    >
      <div className="mx-auto w-full max-w-[120rem] px-5 pt-[100px] pb-28 md:px-8 md:pb-36 lg:px-10 lg:pb-[10.75rem]">
        <h2
          id={headingId}
          className="m-0 text-center font-display text-[clamp(3rem,8vw,5rem)] leading-[1.4] font-normal tracking-[-0.06em]"
        >
          {heading.before}
          <span className="text-accent">{heading.accent}</span>
          {heading.after}
        </h2>

        <div className="mt-[clamp(3.5rem,5vw,4.375rem)] border-t border-white">
          {items.map((item, index) => {
            const isOpen = openItem === index;
            const questionId = `${sectionId}-question-${index}`;
            const panelId = `${sectionId}-panel-${index}`;

            return (
              <div className="border-b border-white" key={item.question}>
                <button
                  id={questionId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenItem(isOpen ? null : index)}
                  className="grid min-h-24 w-full cursor-pointer grid-cols-[2.5rem_minmax(0,1fr)_1rem] items-center gap-x-4 px-3 py-5 text-left font-display focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent md:min-h-[6.5625rem] md:grid-cols-[clamp(7rem,14.5vw,17.375rem)_minmax(0,1fr)_0.9375rem] md:gap-x-0 md:px-8 md:py-4"
                >
                  <span className="text-base leading-none font-normal tracking-[-0.06em] md:text-2xl">
                    {String(index + 1).padStart(2, "0")}.
                  </span>

                  <span className="pr-4 font-sans text-[clamp(1.25rem,3vw,2.25rem)] leading-[1.35] font-normal tracking-[-0.06em]">
                    {item.question}
                  </span>

                  <Image
                    className={`h-[1.4375rem] w-[0.9375rem] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      isOpen ? "rotate-90" : "rotate-0"
                    }`}
                    src="/faq/figma-chevron.svg"
                    alt=""
                    width={15}
                    height={23}
                    unoptimized
                  />
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={questionId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 px-3 pb-7 md:grid-cols-[clamp(7rem,14.5vw,17.375rem)_minmax(0,1fr)] md:gap-x-0 md:px-8 md:pb-8">
                      <p
                        className={`col-start-2 m-0 max-w-[62rem] font-sans text-sm leading-[1.65] font-normal text-white/70 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none md:text-lg ${
                          isOpen
                            ? "translate-y-0 opacity-100 delay-100"
                            : "-translate-y-1 opacity-0 delay-0"
                        }`}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
