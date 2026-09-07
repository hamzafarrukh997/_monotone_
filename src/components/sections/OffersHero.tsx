import { offersPage } from "@/content/offers";

export function OffersHero() {
  const { heading, body } = offersPage.hero;

  return (
    <section className="bg-white text-fg" aria-labelledby="offers-hero-heading">
      <div className="mx-auto w-full max-w-[120rem] px-5 pt-16 pb-14 text-center sm:px-8 sm:pt-20 md:pb-16 lg:px-10 lg:pt-24">
        <h1
          id="offers-hero-heading"
          className="mx-auto max-w-[19ch] font-display text-[clamp(2.75rem,7vw,4.5rem)] leading-[1.08] font-normal tracking-[-0.06em] lg:text-[clamp(3.5rem,4.7vw,5.25rem)]"
        >
          {heading.before}
          <span className="text-accent">{heading.accent}</span>
          {heading.after}
        </h1>

        <p className="mx-auto mt-6 max-w-[38rem] font-sans text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.4] font-normal tracking-[-0.02em] text-fg/75">
          {body}
        </p>
      </div>
    </section>
  );
}
