import Link from "next/link";
import { getOtherOffers, routes } from "@/lib/links";

const linkClass =
  "font-sans text-sm font-semibold tracking-[-0.02em] text-fg/70 underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-current";

export function OfferCrossLinks({ currentSlug }: { currentSlug: string }) {
  const otherOffers = getOtherOffers(currentSlug);

  return (
    <section className="border-t border-[#7f7f7f]/25 bg-white text-fg" aria-label="Other packages">
      <div className="mx-auto flex w-full max-w-[120rem] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-8 sm:px-8 lg:px-10">
        {otherOffers.map((other) => (
          <Link key={other.slug} href={routes.offer(other.slug)} className={linkClass}>
            {other.title}
          </Link>
        ))}
        <Link href={routes.offers} className={linkClass}>
          All packages
        </Link>
      </div>
    </section>
  );
}
