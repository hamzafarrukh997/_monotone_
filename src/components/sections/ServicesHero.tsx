import { servicesPage } from "@/content/services";

export function ServicesHero() {
  return (
    <section
      className="mx-auto flex min-h-[clamp(30rem,60vh,44rem)] w-full max-w-[120rem] items-center bg-white px-5 py-20 text-[#2b2b2b] md:px-8 lg:px-10 lg:py-28"
      aria-labelledby="services-page-heading"
    >
      <div className="mx-auto flex w-full max-w-[86rem] flex-col items-center text-center">
        <p className="mb-6 flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.16em] uppercase">
          <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
          Monotone / Services
        </p>

        <h1
          id="services-page-heading"
          className="m-0 font-display text-[clamp(3.65rem,7.15vw,8.5rem)] leading-[0.92] font-normal tracking-[-0.075em]"
        >
          {servicesPage.hero.title}
          <span className="text-accent">.</span>
        </h1>

        <p className="mt-8 max-w-[44rem] font-sans text-base leading-[1.55] font-normal text-[#2b2b2b]/70 md:text-lg">
          {servicesPage.hero.body}
        </p>
      </div>
    </section>
  );
}
