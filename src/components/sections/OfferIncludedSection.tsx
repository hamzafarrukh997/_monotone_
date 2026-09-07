import type { Offer } from "@/content/offers";

export function OfferIncludedSection({ offer }: { offer: Offer }) {
  const { detail } = offer;

  return (
    <section
      className="border-t border-[#7f7f7f]/30 bg-white text-fg"
      aria-labelledby="offer-included-heading"
    >
      <div className="mx-auto w-full max-w-[120rem] px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h2
            id="offer-included-heading"
            className="font-display text-[clamp(2.25rem,3.4vw,3.5rem)] leading-[1.1] font-normal tracking-[-0.06em]"
          >
            {detail.includedHeading}
          </h2>

          {detail.includedIntro ? (
            <p className="font-sans text-[1.1rem] font-bold tracking-[-0.02em] text-accent">
              {detail.includedIntro}
            </p>
          ) : null}
        </div>

        <div className="mt-12 divide-y divide-[#7f7f7f]/25 border-t border-[#7f7f7f]/25 lg:mt-16">
          {detail.includedGroups.map((group, index) => (
            <div
              key={group.title}
              className="grid gap-3 py-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-x-[6%] lg:py-10"
            >
              <div className="flex items-baseline gap-3 lg:flex-col lg:items-start lg:gap-3">
                <span className="font-sans text-sm font-bold tracking-[-0.02em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[clamp(1.6rem,2.2vw,2.1rem)] leading-[1.1] font-normal tracking-[-0.055em]">
                  {group.title}
                </h3>
              </div>

              <ul className="divide-y divide-[#7f7f7f]/20 border-t border-[#7f7f7f]/20 lg:border-t-0">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex min-h-14 items-center font-sans text-[clamp(1.05rem,1.3vw,1.3rem)] leading-tight font-normal tracking-[-0.03em]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
