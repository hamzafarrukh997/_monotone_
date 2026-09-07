import { Button } from "@/components/ui/Button";
import { offers, offersPage } from "@/content/offers";
import { routes } from "@/lib/links";

/** The hub's package rows — short and editorial, on purpose: this page routes
 * visitors to the right package, it doesn't re-pitch every feature (that's
 * what the homepage teaser and each package's own page are for). */
export function OffersPackagesSection() {
  return (
    <section className="bg-white text-fg" aria-label="Packages">
      <div className="mx-auto w-full max-w-[120rem] divide-y divide-[#7f7f7f]/30 border-t border-[#7f7f7f]/30 px-5 sm:px-8 lg:px-10">
        {offers.map((offer, index) => (
          <article
            key={offer.slug}
            className="grid gap-6 py-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-x-[7%] lg:py-16"
          >
            <div className="flex items-baseline gap-4 lg:flex-col lg:items-start lg:gap-4">
              <span className="font-sans text-sm font-bold tracking-[-0.02em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] font-normal tracking-[-0.055em]">
                  {offer.title}
                </h3>

                {offer.badge ? (
                  <span className="inline-flex h-6 items-center rounded-full border border-accent px-3 font-sans text-xs font-medium tracking-[-0.02em] text-accent">
                    {offer.badge}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="max-w-[36rem]">
              <p className="font-sans text-[clamp(1rem,1.15vw,1.2rem)] leading-[1.5] tracking-[-0.02em]">
                <span className="font-bold">{offer.positioning}</span>{" "}
                <span className="text-fg/75">{offer.description}</span>
              </p>

              <div className="mt-6 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg bg-[#f2eee9] px-4 py-2.5 font-sans text-sm leading-snug tracking-[-0.02em]">
                <span className="font-bold text-accent">Guarantee</span>
                <span className="text-fg/85">{offer.guarantee}</span>
              </div>

              <div className="mt-7">
                <Button
                  href={routes.offer(offer.slug)}
                  variant="secondary"
                  size="lg"
                  className="h-[50px] px-[1.6rem] text-[1rem] font-normal tracking-[-0.03em]"
                >
                  {offersPage.cardCta}
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
