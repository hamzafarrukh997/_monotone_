import Image from "next/image";
import { servicesPage } from "@/content/services";

export function ServicesHero() {
  return (
    <section
      className="relative isolate -mt-24 h-[100svh] overflow-hidden bg-white text-[#2b2b2b] min-[2000px]:h-[1080px]"
      aria-labelledby="services-page-heading"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[-38%] aspect-[1254/408] w-[165%] -translate-y-[42.16175%] sm:left-[4%] sm:w-[105%] lg:left-[19.375%] lg:w-[65.3125%]"
      >
        {/* Reserved for the Services showreel. Replace this surface with the
            final media while retaining the same frame dimensions. */}
        <span className="services-hero__showreel-placeholder absolute top-[12.75%] left-[80.22%] z-20 h-[58.8235%] w-[27.9107%] rounded-[225px] bg-[#b5b5b5]" />
        <Image
          src="/services/hero-orbits.svg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 65vw, (min-width: 640px) 105vw, 165vw"
          className="relative z-10 size-full"
        />
      </div>

      <div className="absolute top-1/2 left-6 z-20 w-[calc(100%-3rem)] -translate-y-1/2 sm:left-[9.69%] sm:w-[min(37.8125rem,44vw)] lg:w-[min(37.8125rem,31.51vw)]">
        <h1
          id="services-page-heading"
          className="font-display text-[clamp(3.75rem,10vw,5rem)] leading-none font-normal tracking-[-0.06em] lg:text-[clamp(5rem,5.755vw,6.906rem)]"
        >
          {servicesPage.hero.title}
        </h1>

        <p className="mt-[clamp(1.75rem,2.15vw,2.58rem)] max-w-[37.8125rem] font-sans text-[clamp(0.95rem,1.097vw,1.316rem)] leading-[1.32] font-normal tracking-[-0.02em]">
          {servicesPage.hero.body}
        </p>
      </div>
    </section>
  );
}
