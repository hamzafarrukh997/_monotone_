import type { Offer } from "@/content/offers";
import { Button } from "@/components/ui/Button";
import { routes } from "@/lib/links";

export function OfferClosingCta({ offer }: { offer: Offer }) {
  const { detail } = offer;

  return (
    <section
      data-header-theme="dark"
      className="bg-[#2b2b2b] text-white"
      aria-labelledby="offer-closing-heading"
    >
      <div className="mx-auto w-full max-w-[120rem] px-6 py-20 text-center sm:px-8 md:py-24 lg:px-10">
        <h2
          id="offer-closing-heading"
          className="mx-auto max-w-[24ch] font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.15] font-normal tracking-[-0.055em]"
        >
          {detail.closingHeading}
        </h2>

        <p className="mx-auto mt-4 max-w-[30rem] font-sans text-base leading-[1.5] font-normal text-white/70 sm:text-lg">
          {detail.closingBody}
        </p>

        <Button
          href={routes.contact}
          variant="primary"
          size="lg"
          className="mt-8 h-[50px] px-8 text-base font-normal tracking-[-0.03em]"
        >
          Request a Quote
        </Button>

        <p className="mx-auto mt-6 max-w-[30rem] font-sans text-sm italic leading-[1.5] text-white/50">
          {detail.closingNote}
        </p>
      </div>
    </section>
  );
}
