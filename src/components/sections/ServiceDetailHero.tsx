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
  const editorialHero =
    service.slug === "design"
      ? {
          eyebrow: "Built from the ground up",
          statement:
            "Identity, experience, and interface—designed as one coherent system.",
          navGridClass: "md:grid-cols-3",
          navItemClass:
            "md:min-h-36 md:border-r md:border-b-0 md:px-6 md:py-6 md:last:border-r-0 lg:min-h-40 lg:px-8",
          navTitleClass:
            "text-[clamp(1.65rem,2.35vw,2.8rem)] leading-none",
        }
      : service.slug === "web-development"
        ? {
            eyebrow: "Engineered from scratch",
            statement:
              "From approved design to a fast, maintainable website—built without shortcuts.",
            navGridClass: "lg:grid-cols-5",
            navItemClass:
              "lg:min-h-40 lg:border-r lg:border-b-0 lg:px-5 lg:py-6 lg:last:border-r-0",
            navTitleClass:
              "text-[clamp(1.45rem,1.65vw,1.95rem)] leading-[1.05]",
          }
        : service.slug === "growth-marketing"
          ? {
              eyebrow: "Built to compound",
              statement:
                "Search, content, media, and conversion—connected to turn attention into measurable demand.",
              navGridClass: "lg:grid-cols-5",
              navItemClass:
                "lg:min-h-40 lg:border-r lg:border-b-0 lg:px-5 lg:py-6 lg:last:border-r-0",
              navTitleClass:
                "text-[clamp(1.4rem,1.55vw,1.85rem)] leading-[1.05]",
            }
          : service.slug === "maintenance-support"
            ? {
                eyebrow: "Quietly dependable",
                statement:
                  "Updates, monitoring, and support—working in the background to keep your website at its best.",
                navGridClass: "lg:grid-cols-5",
                navItemClass:
                  "lg:min-h-40 lg:border-r lg:border-b-0 lg:px-5 lg:py-6 lg:last:border-r-0",
                navTitleClass:
                  "text-[clamp(1.4rem,1.55vw,1.85rem)] leading-[1.05]",
              }
            : null;

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

  if (editorialHero) {
    const editorialHeroImage = service.detailHero.image;

    return (
      <section
        className="border-b border-[#7f7f7f]/55 bg-white text-[#2b2b2b]"
        aria-labelledby={headingId}
      >
        <div className="mx-auto flex min-h-[clamp(30rem,60vh,44rem)] w-full max-w-[120rem] items-center px-5 py-20 md:px-8 lg:px-10 lg:py-28">
          <div className="mx-auto flex w-full max-w-[86rem] flex-col items-center text-center">
            <p className="mb-6 flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.16em] uppercase">
              <span
                className="size-2 rounded-full bg-accent"
                aria-hidden="true"
              />
              Monotone / Services / {service.title}
            </p>

            <h1
              id={headingId}
              className="m-0 font-display text-[clamp(3.65rem,7.15vw,8.5rem)] leading-[0.92] font-normal tracking-[-0.075em]"
            >
              {service.title}
              <span className="text-accent">.</span>
            </h1>

            <p className="mt-8 max-w-[43rem] font-sans text-base leading-[1.55] font-normal text-[#2b2b2b]/70 md:text-lg">
              {service.excerpt}
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[120rem] px-5 pb-28 md:px-8 lg:px-10 lg:pb-40">
          <div className="grid gap-10 border-t border-[#2b2b2b]/25 pt-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(20rem,0.7fr)] lg:items-stretch lg:gap-16 lg:pt-10">
            <div className="relative aspect-[1.38/1] overflow-hidden rounded-[clamp(1rem,1.2vw,1.5rem)] bg-[#f2eee9] lg:aspect-[1.45/1]">
              {editorialHeroImage ? (
                <Image
                  src={editorialHeroImage}
                  alt={`${service.title} service`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 59vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <span
                  role="img"
                  aria-label={`${service.title} media placeholder`}
                  className="absolute inset-0"
                />
              )}
            </div>

            <div className="flex flex-col justify-between pb-1 lg:py-2">
              <div>
                <p className="flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.15em] text-[#2b2b2b]/55 uppercase">
                  <span className="h-px w-8 bg-accent" aria-hidden="true" />
                  {editorialHero.eyebrow}
                </p>
                <p className="mt-7 font-display text-[clamp(1.8rem,2.45vw,2.9rem)] leading-[1.08] font-normal tracking-[-0.055em]">
                  {editorialHero.statement}
                </p>
              </div>

              <p className="mt-10 font-sans text-[clamp(0.95rem,1.02vw,1.15rem)] leading-[1.55] font-normal text-[#2b2b2b]/72 lg:mt-14">
                {service.detailHero.intro}
              </p>
            </div>
          </div>

          <div className="mt-16 lg:mt-24">
            <p className="mb-5 font-sans text-xs font-semibold tracking-[0.15em] text-[#2b2b2b]/55 uppercase">
              Explore the disciplines
            </p>
            <nav
              className={`grid border-y border-[#2b2b2b]/25 ${editorialHero.navGridClass}`}
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
                    className={`flex min-h-28 flex-col justify-between border-b border-[#2b2b2b]/25 bg-white px-4 py-5 text-[#2b2b2b] transition-[background-color,color] duration-300 last:border-b-0 hover:bg-accent hover:text-white focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-accent ${editorialHero.navItemClass}`}
                  >
                    <span className="font-sans text-[0.65rem] font-semibold tracking-[0.13em] opacity-50 uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display font-normal tracking-[-0.06em] ${editorialHero.navTitleClass}`}
                    >
                      {item.title}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </section>
    );
  }

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
