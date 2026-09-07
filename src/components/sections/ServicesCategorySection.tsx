"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

type ServicesCategoryItem = {
  title: string;
  body: string;
  cta: string;
};

type ServicesCategorySectionProps = {
  sectionId: string;
  heading: string;
  intro: string;
  learnMoreLabel: string;
  learnMoreHref: string;
  image: string;
  items: readonly ServicesCategoryItem[];
  defaultOpenItem?: number | null;
  showSubserviceCtas?: boolean;
};

export function ServicesCategorySection({
  sectionId,
  heading,
  intro,
  learnMoreLabel,
  learnMoreHref,
  image,
  items,
  defaultOpenItem = null,
  showSubserviceCtas = false,
}: ServicesCategorySectionProps) {
  const [openItem, setOpenItem] = useState<number | null>(defaultOpenItem);
  const headingId = `services-${sectionId}-heading`;
  const mediaLabel = `${heading.replace(/\s+/g, " ")}`;

  return (
    <section
      className="border-b border-[#7f7f7f]/55 bg-white text-[#2b2b2b]"
      aria-labelledby={headingId}
    >
      <div className="mx-auto grid w-full max-w-[120rem] px-[clamp(1.5rem,2.083vw,2.5rem)] pt-[clamp(5.5rem,6.7vw,8rem)] pb-[clamp(7rem,12vw,14rem)] lg:grid-cols-[minmax(0,0.83fr)_minmax(0,1fr)] lg:gap-x-[9.5%]">
        <h2
          id={headingId}
          className="whitespace-pre-line font-display text-[clamp(3.25rem,4.167vw,5rem)] leading-none font-normal tracking-[-0.06em] lg:col-start-1 lg:row-start-1"
        >
          {heading}
        </h2>

        <div className="mt-8 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:pt-[2.625rem]">
          <p className="max-w-[39.125rem] font-sans text-[clamp(1rem,1.097vw,1.316rem)] leading-[1.35] font-normal tracking-[-0.02em]">
            {intro}
          </p>

          <Button
            href={learnMoreHref}
            variant="primary"
            size="lg"
            className="mt-[clamp(2rem,3.85vw,4.625rem)] h-[50px] px-[1.8rem] text-[clamp(0.95rem,1.042vw,1.25rem)] font-normal tracking-[-0.03em]"
          >
            {learnMoreLabel}
          </Button>
        </div>

        <div className="relative mt-14 aspect-[755/462] w-full overflow-hidden rounded-[24px] bg-[#f2eee9] lg:col-start-1 lg:row-start-2 lg:mt-[4.125rem]">
          <Image
            src={image}
            alt={mediaLabel}
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-14 border-t border-[#7f7f7f]/70 lg:col-start-2 lg:row-start-2 lg:mt-[4.125rem]">
          {items.map((item, index) => {
            const isOpen = openItem === index;
            const panelId = `${sectionId}-service-panel-${index}`;

            return (
              <div className="border-b border-[#7f7f7f]/70" key={item.title}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenItem(isOpen ? null : index)}
                  className="flex min-h-[5.75rem] w-full items-center justify-between gap-6 px-[clamp(1rem,1.667vw,2rem)] py-5 text-left font-sans text-[clamp(1.65rem,1.875vw,2.25rem)] leading-tight font-normal tracking-[-0.06em] transition-colors hover:text-accent"
                >
                  <span>{item.title}</span>
                  <span className="grid h-[18px] w-[18px] shrink-0 place-items-center">
                    <Image
                      src="/services/accordion-chevron.svg"
                      alt=""
                      width={10}
                      height={15}
                      className={`h-[15px] w-[10px] transition-transform duration-300 ease-out ${
                        isOpen ? "rotate-90" : "rotate-0"
                      }`}
                    />
                  </span>
                </button>

                <div
                  id={panelId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-[clamp(1rem,1.667vw,2rem)] pb-[2.5rem]">
                      <p className="max-w-[43.875rem] font-sans text-[clamp(1rem,1.097vw,1.316rem)] leading-[1.38] font-normal tracking-[-0.02em]">
                        {item.body}
                      </p>

                      {showSubserviceCtas ? (
                        <Button
                          href={learnMoreHref}
                          variant="secondary"
                          size="lg"
                          className="mt-6 h-[50px] px-[1.6rem] text-[clamp(0.95rem,1.042vw,1.25rem)] font-normal tracking-[-0.03em]"
                        >
                          {item.cta}
                        </Button>
                      ) : null}
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
