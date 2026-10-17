import type { Metadata } from "next";
import { home } from "@/content/home";
import { services, portfolio, offers, routes } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Website Design & Development Process",
  description:
    "See how Monotone takes a business website from discovery and planning through build, launch, and ongoing improvement.",
  path: routes.process,
});

export default function ProcessPage() {
  return (
    <div className="bg-white text-[#2b2b2b]">
      <div className="mx-auto max-w-[120rem] px-5 py-20 md:px-8 md:py-28 lg:px-10 lg:py-36">
        <header className="max-w-4xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            Monotone / Process
          </p>
          <h1 className="mt-7 font-display text-[clamp(3.5rem,7vw,7rem)] leading-[0.96] tracking-[-0.07em]">
            How we build your website<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-[#2b2b2b]/70">
            We start by understanding your business and what the website needs
            to achieve. Then we agree on the content and structure, build the
            pages with you, and keep improving after launch.
          </p>
        </header>

        <section className="mt-24 border-t border-[#2b2b2b]/25" aria-labelledby="stages-heading">
          <h2 id="stages-heading" className="py-8 font-display text-3xl tracking-[-0.05em] md:text-4xl">
            What happens at each stage
          </h2>
          <ol>
            {home.process.steps.map((step) => (
              <li key={step.number} className="grid gap-5 border-t border-[#2b2b2b]/25 py-9 md:grid-cols-[5rem_12rem_1fr] md:gap-10">
                <span className="font-sans text-sm font-semibold text-accent">{step.number}</span>
                <h3 className="font-display text-3xl tracking-[-0.05em]">{step.label}</h3>
                <div className="max-w-2xl font-sans leading-relaxed text-[#2b2b2b]/75">
                  <p className="font-semibold text-[#2b2b2b]">{step.title}</p>
                  <p className="mt-2">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-24 grid gap-12 border-t border-[#2b2b2b]/25 pt-10 md:grid-cols-2" aria-labelledby="next-heading">
          <div>
            <h2 id="next-heading" className="font-display text-3xl tracking-[-0.05em] md:text-4xl">
              Choose where to start
            </h2>
            <p className="mt-4 max-w-xl font-sans leading-relaxed text-[#2b2b2b]/70">
              You can bring us a new site, an existing site that needs work,
              or one part of the project. Explore the services and packages,
              then tell us what you need.
            </p>
          </div>
          <div className="grid gap-9 sm:grid-cols-2">
            <div>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em]">Services</h3>
              <ul className="mt-4 space-y-2">
                {services.map((service) => (
                  <li key={service.slug}><a className="underline underline-offset-4" href={routes.service(service.slug)}>{service.title}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em]">Packages</h3>
              <ul className="mt-4 space-y-2">
                {offers.map((offer) => (
                  <li key={offer.slug}><a className="underline underline-offset-4" href={routes.offer(offer.slug)}>{offer.title}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-20 border-t border-[#2b2b2b]/25 pt-10" aria-labelledby="proof-heading">
          <h2 id="proof-heading" className="font-display text-3xl tracking-[-0.05em] md:text-4xl">
            See the process in practice
          </h2>
          <ul className="mt-5 flex flex-wrap gap-5">
            {portfolio.map((item) => (
              <li key={item.slug}><a className="underline underline-offset-4" href={routes.workItem(item.slug)}>{item.client}</a></li>
            ))}
          </ul>
          <a className="mt-9 inline-block rounded-full bg-accent px-7 py-4 font-sans font-semibold text-white" href={routes.contact}>
            Talk about your project
          </a>
        </section>
      </div>
    </div>
  );
}
