import type { Offer } from "@/content/offers";

export function OfferWhySection({ offer }: { offer: Offer }) {
  const { detail } = offer;
  const pointsColsClass =
    detail.whyPoints.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section className="bg-[#f2eee9] text-fg" aria-labelledby="offer-why-heading">
      <div className="mx-auto w-full max-w-[120rem] px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-x-[6%]">
          <h2
            id="offer-why-heading"
            className="max-w-[20ch] font-display text-[clamp(2rem,3vw,3rem)] leading-[1.1] font-normal tracking-[-0.06em]"
          >
            {detail.whyHeading}
          </h2>

          <p className="mt-4 max-w-[36rem] font-sans text-[1rem] leading-[1.45] font-normal tracking-[-0.02em] text-fg/70 lg:mt-0">
            {detail.whyIntro}
          </p>
        </div>

        <div
          className={`mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-12 ${pointsColsClass}`}
        >
          {detail.whyPoints.map((point) => (
            <div
              key={point.lead}
              className="border-t border-[#2b2b2b]/15 pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <p className="font-sans text-[1.05rem] font-bold leading-snug tracking-[-0.03em]">
                {point.lead}
              </p>
              <p className="mt-2 font-sans text-sm leading-[1.5] font-normal tracking-[-0.01em] text-fg/65">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
