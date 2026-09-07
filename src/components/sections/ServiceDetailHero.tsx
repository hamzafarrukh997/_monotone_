"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";
import type { ServiceCategory } from "@/content/services";

type ServiceDetailHeroProps = {
  service: ServiceCategory;
};

export function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const hasExtendedNavigation = service.subServices.length > 3;
  const headingId = `service-${service.slug}-heading`;
  const activeService =
    activeItem === null ? undefined : service.subServices[activeItem];
  const activeSection = activeService
    ? service.detailSections.find((section) => section.slug === activeService.slug)
    : undefined;
  const mediaImage = activeSection?.image ?? service.detailHero.image;
  const mediaLabel = activeService?.title ?? service.title;

  const handleServiceNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    slug: string,
    index: number,
  ) => {
    const targetId = `service-detail-${slug}`;
    const target = document.getElementById(targetId);

    event.preventDefault();
    if (!target) return;

    setActiveItem(index);
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `#${targetId}`);
  };

  return (
    <section
      className={`relative -mt-24 min-h-[100svh] border-b border-[#7f7f7f]/55 bg-white text-[#2b2b2b] lg:min-h-0 ${
        hasExtendedNavigation
          ? "lg:h-[clamp(56.5rem,56.927vw,68.3125rem)]"
          : "lg:h-[clamp(47.5rem,49.479vw,59.375rem)]"
      }`}
      aria-labelledby={headingId}
    >
      <div className="mx-auto grid w-full max-w-[120rem] px-6 pt-36 pb-24 sm:px-8 sm:pt-40 lg:h-full lg:grid-cols-[minmax(0,0.935fr)_minmax(0,1fr)] lg:gap-x-[20.6%] lg:px-[clamp(2.5rem,2.083vw,2.5rem)] lg:pt-[clamp(9rem,10.833vw,13rem)] lg:pb-0">
        <div className="min-w-0">
          <h1
            id={headingId}
            className="font-display text-[clamp(3.75rem,4.167vw,5rem)] leading-none font-normal tracking-[-0.06em]"
          >
            {service.title}
          </h1>

          <p className="mt-[clamp(3rem,4.948vw,5.9375rem)] max-w-[50.0625rem] font-sans text-[clamp(1rem,1.097vw,1.316rem)] leading-[1.35] font-normal tracking-[-0.02em] lg:min-h-[clamp(5rem,5.677vw,6.8125rem)]">
            {service.detailHero.intro}
          </p>

          <nav
            className="mt-[clamp(2.5rem,2.604vw,3.125rem)] border-t border-[#7f7f7f]/70"
            aria-label={`${service.title} services`}
          >
            {service.subServices.map((item, index) => {
              const isActive = activeItem === index;

              return (
                <a
                  key={item.slug}
                  href={`#service-detail-${item.slug}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(event) =>
                    handleServiceNavigation(event, item.slug, index)
                  }
                  className={`flex min-h-[4.5rem] w-full items-center rounded-none border-b border-[#7f7f7f]/70 px-[clamp(1.5rem,1.875vw,2.25rem)] text-left font-sans text-[clamp(1.25rem,1.5625vw,1.875rem)] leading-tight font-normal tracking-[-0.06em] transition-[background-color,color] duration-300 focus-visible:relative focus-visible:z-10 ${
                    isActive
                      ? "border-transparent bg-accent text-white"
                      : "bg-white text-[#2b2b2b] hover:text-accent"
                  }`}
                >
                  {item.title}
                </a>
              );
            })}
          </nav>
        </div>

        <div
          className={`relative mt-14 aspect-[755/462] w-full self-start overflow-hidden rounded-[24px] bg-[#f2eee9] ${
            hasExtendedNavigation
              ? "lg:mt-[clamp(10rem,12.083vw,14.5rem)]"
              : "lg:mt-[clamp(4rem,4.583vw,5.5rem)]"
          }`}
        >
          {mediaImage ? (
            <Image
              key={mediaImage}
              src={mediaImage}
              alt={mediaLabel}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          ) : (
            <span
              role="img"
              aria-label={`${mediaLabel} media placeholder`}
              className="absolute inset-0"
            />
          )}
        </div>
      </div>
    </section>
  );
}
