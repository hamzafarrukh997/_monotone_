import { Button } from "@/components/ui/Button";
import { offersPage } from "@/content/offers";
import { routes } from "@/lib/links";

export function OffersNotSure() {
  const { notSure } = offersPage;

  return (
    <section
      className="border-t border-[#7f7f7f]/30 bg-white text-fg"
      aria-labelledby="offers-not-sure-heading"
    >
      <div className="mx-auto w-full max-w-[120rem] px-5 py-20 text-center sm:px-8 md:py-24 lg:px-10">
        <h2
          id="offers-not-sure-heading"
          className="font-display text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.1] font-normal tracking-[-0.055em]"
        >
          {notSure.heading}
        </h2>

        <p className="mx-auto mt-4 max-w-[34rem] font-sans text-base leading-[1.5] font-normal text-fg/70 sm:text-lg">
          {notSure.body}
        </p>

        <Button
          href={routes.contact}
          variant="primary"
          size="lg"
          className="mt-8 h-[50px] px-8 text-base font-normal tracking-[-0.03em]"
        >
          {notSure.cta}
        </Button>
      </div>
    </section>
  );
}
