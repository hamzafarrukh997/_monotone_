"use client";

import { site } from "@/content/site";
import { openProjectRequest } from "@/lib/projectRequest";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
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

const footerLinkClass =
  "group relative block w-fit origin-left transition-[transform,color] duration-300 ease-out hover:translate-x-2 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export function Footer() {
  const { contact } = site;
  const cta = site.footerCta;
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`;
  const navigationGroups = [...site.footerGroups.slice(0, -1)].reverse();
  const legalGroup = site.footerGroups.at(-1);

  return (
    <footer
      data-header-theme="dark"
      data-header-hide="true"
      className="relative overflow-hidden bg-[#2b2b2b] text-[#f2eee9]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0"
        style={{
          height: "calc(44rem + 100vh)",
          background:
            "linear-gradient(104deg, rgba(255,90,31,0.20) 0%, rgba(255,90,31,0.11) 30%, rgba(255,255,255,0.055) 66%, rgba(255,255,255,0.11) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 24%, black 62%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 24%, black 62%, transparent 100%)",
        }}
      />

      <section
        aria-labelledby="closing-cta-heading"
        className="group relative isolate text-white"
      >
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-56 w-[125%] -translate-x-1/2 -translate-y-1/2 -rotate-[7deg] bg-[linear-gradient(90deg,transparent_5%,rgba(255,90,31,0.09)_30%,rgba(255,255,255,0.045)_57%,transparent_88%)] blur-3xl transition-transform duration-1000 ease-out group-hover:-rotate-[5deg] group-hover:scale-105 sm:h-72"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[27rem] w-[62rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/10 transition-transform duration-1000 ease-out group-hover:scale-[1.025] sm:h-[32rem] sm:w-[78rem]"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[18rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-accent/20 transition-transform duration-1000 ease-out group-hover:scale-[0.975] sm:h-[22rem] sm:w-[56rem]"
        />

        <div className="relative z-10 mx-auto flex min-h-[38rem] w-full max-w-[120rem] flex-col items-center justify-center px-5 py-20 text-center sm:min-h-[44rem] sm:px-8 sm:py-24 lg:px-10">
          <h2
            id="closing-cta-heading"
            className="max-w-[16ch] font-display text-[clamp(2.75rem,5.25vw,6rem)] leading-[0.92] font-medium tracking-[-0.065em]"
          >
            {cta.heading.before}{" "}
            <span className="text-white/40">{cta.heading.after}</span>
          </h2>

          <p className="mt-7 max-w-[42rem] font-sans text-base leading-relaxed text-white/60 sm:text-lg">
            {cta.body}
          </p>

          <button
            type="button"
            aria-haspopup="dialog"
            aria-controls="project-request-dialog"
            onClick={openProjectRequest}
            className="group/button mt-9 inline-flex min-h-14 items-center gap-5 rounded-full bg-white py-3 pl-6 pr-3 font-sans text-sm font-bold text-[#2b2b2b] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:min-h-16 sm:pl-8 sm:text-base"
          >
            <span>{cta.cta}</span>
            <span
              aria-hidden="true"
              className="grid h-10 w-10 place-items-center rounded-full bg-accent text-[#2b2b2b] transition-transform duration-300 group-hover/button:rotate-45 sm:h-11 sm:w-11"
            >
              <span className="h-5 w-5">
                <ArrowIcon />
              </span>
            </span>
          </button>

          <p className="mt-5 font-sans text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white/35 sm:text-xs">
            {cta.note}
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto flex min-h-[clamp(48rem,60vw,66rem)] max-w-[1920px] flex-col px-5 pb-5 pt-14 sm:px-8 sm:pb-7 sm:pt-20 lg:px-10 lg:pt-24">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[0.9fr_1.35fr_1.45fr] lg:gap-10">
          {navigationGroups.map((group, groupIndex) => (
            <nav key={group.title} aria-label={`${group.title} footer navigation`}>
              <p className="mb-5 font-sans text-xs font-bold uppercase tracking-[0.08em] text-accent sm:text-sm">
                {group.title}
              </p>

              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`${footerLinkClass} font-display font-normal leading-[1.06] tracking-[-0.055em] ${
                        groupIndex === 0
                          ? "text-[clamp(2.2rem,3.4vw,2.8rem)]"
                          : "text-[clamp(1.55rem,2.3vw,2.0rem)]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span
                        aria-hidden="true"
                        className="ml-2 inline-block text-[0.48em] text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <address className="not-italic md:col-span-2 lg:col-span-1 lg:text-right">
            <p className="mb-5 font-sans text-xs font-bold uppercase tracking-[0.08em] text-accent sm:text-sm">
              {site.cta.label}
            </p>

            <a
              href={`mailto:${contact.email}`}
              className="group ml-auto flex w-fit max-w-full items-start gap-3 break-all font-display text-[clamp(1.75rem,2.8vw,3.5rem)] leading-[1.06] tracking-[-0.055em] transition-colors duration-300 hover:text-accent sm:break-normal"
            >
              <span className="underline decoration-[0.05em] underline-offset-[0.14em] transition-[text-underline-offset] duration-300 group-hover:underline-offset-[0.22em]">
                {contact.email}
              </span>
              <span
                aria-hidden="true"
                className="mt-[0.18em] text-[0.55em] text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>

            <a
              href={whatsappHref}
              className="mt-8 inline-block font-sans text-base font-semibold text-accent underline decoration-1 underline-offset-4 transition-opacity hover:opacity-65 sm:text-2xl"
            >
              WhatsApp {contact.whatsapp}
            </a>

            {/* <p className="mt-5 font-sans text-sm leading-relaxed sm:ml-auto sm:max-w-[28rem] sm:text-base">
              {contact.availability}
            </p> */}
          </address>
        </div>

        <div className="mt-auto pt-24 sm:pt-32 lg:pt-40">
          <p className="max-w-[34rem] font-sans text-sm font-medium leading-relaxed text-[#f2eee9]/75 sm:text-base">
            {site.shortDescription}
          </p>

          <a
            href="/"
            aria-label={`${site.name} home`}
            className="mt-8 flex w-full items-end overflow-hidden font-display text-[clamp(4.35rem,17.7vw,21rem)] font-medium leading-[0.72] tracking-[-0.095em] text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span>{site.name.toLowerCase()}</span>
            <span className="relative -top-[0.04em] ml-[0.025em] text-accent" aria-hidden="true">
              .
            </span>
          </a>

          <div className="mt-8 grid gap-4 border-t border-white/25 pt-5 font-sans text-xs font-semibold uppercase tracking-[0.04em] text-[#f2eee9]/80 sm:grid-cols-2 sm:text-sm lg:grid-cols-3">
            <p>© {site.name}</p>
            <p className="sm:text-right lg:text-center">{contact.location}</p>

            {legalGroup ? (
              <nav
                aria-label={`${legalGroup.title} footer navigation`}
                className="sm:col-span-2 lg:col-span-1"
              >
                <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-end">
                  {legalGroup.items.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-current"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
