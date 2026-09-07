import type { Offer } from "@/content/offers";

export function OfferGuaranteeSection({ offer }: { offer: Offer }) {
  return (
    <section className="bg-white text-fg" aria-labelledby="offer-guarantee-heading">
      <div className="mx-auto w-full max-w-[120rem] px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <p
          id="offer-guarantee-heading"
          className="text-center font-sans text-xs font-bold uppercase tracking-[0.08em] text-accent sm:text-sm"
        >
          The guarantee
        </p>

        <blockquote className="mx-auto mt-5 max-w-[42rem] border-l-4 border-accent pl-6">
          <p className="font-display text-[clamp(1.65rem,2.6vw,2.35rem)] leading-[1.25] font-normal tracking-[-0.04em]">
            {offer.guarantee}
          </p>
          <p className="mt-4 font-sans text-[1rem] leading-[1.5] font-normal tracking-[-0.02em] text-fg/75">
            {offer.detail.guaranteeBody}
          </p>
        </blockquote>
      </div>
    </section>
  );
}
