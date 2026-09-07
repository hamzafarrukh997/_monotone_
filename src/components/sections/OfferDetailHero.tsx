import type { Offer } from "@/content/offers";
import { Button } from "@/components/ui/Button";
import { routes } from "@/lib/links";

export function OfferDetailHero({ offer }: { offer: Offer }) {
  const { detail } = offer;

  return (
    <section className="bg-white text-fg" aria-labelledby="offer-detail-heading">
      <div className="mx-auto grid w-full max-w-[120rem] gap-12 px-6 pt-12 pb-16 sm:px-8 sm:pt-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:items-center lg:gap-x-[7%] lg:px-10 lg:pt-20 lg:pb-24">
        <div className="min-w-0">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.08em] text-accent sm:text-sm">
            {detail.eyebrow}
          </p>

          <h1
            id="offer-detail-heading"
            className="mt-4 max-w-[16ch] font-display text-[clamp(2.75rem,4.6vw,4.5rem)] leading-[1.05] font-normal tracking-[-0.06em]"
          >
            {detail.headline}
          </h1>

          <p className="mt-6 max-w-[38rem] font-sans text-[clamp(1rem,1.1vw,1.25rem)] leading-[1.5] font-normal tracking-[-0.02em] text-fg/75">
            {detail.intro}
          </p>

          <Button
            href={routes.contact}
            variant="primary"
            size="lg"
            className="mt-8 h-[50px] px-8 text-base font-normal tracking-[-0.03em]"
          >
            Request a Quote
          </Button>
        </div>

        <div
          role="img"
          aria-label={`${offer.title} media placeholder`}
          className="aspect-[755/462] w-full rounded-[24px] bg-[#f2eee9]"
        />
      </div>
    </section>
  );
}
