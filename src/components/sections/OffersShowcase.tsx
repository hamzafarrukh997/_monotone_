import Image from "next/image";
import { home } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { OfferTerms } from "@/components/sections/OfferTerms";

type OfferPackage = (typeof home.offers.packages)[number];

function OfferCard({ offer }: { offer: OfferPackage }) {
  return (
    <article className={`offer-card offer-card--${offer.slug}`}>
      <div className="offer-card__surface">
        <Image
          className="offer-card__frame"
          src={offer.artwork.frame}
          alt=""
          width={600}
          height={802}
          unoptimized
        />

        <div className="offer-card__title-row">
          <h3 className="offer-card__title">{offer.title}</h3>
          {offer.badge ? (
            <span className="offer-card__badge">{offer.badge}</span>
          ) : null}
        </div>
        <p className="offer-card__summary">{offer.summary}</p>

        <Image
          className="offer-card__rule"
          src="/offers/figma-rule.svg"
          alt=""
          width={536}
          height={1}
          unoptimized
        />

        <div className="offer-card__art" aria-hidden="true">
          <Image
            className="offer-card__arrows"
            src={offer.artwork.arrows}
            alt=""
            width={8}
            height={offer.artwork.arrowsHeight}
            unoptimized
          />
        </div>

        <ul className="offer-card__features">
          {offer.features.map((feature, index) => (
            <li data-included={index < offer.includedCount} key={feature}>
              <Image
                className="offer-card__feature-arrow"
                src={
                  index < offer.includedCount
                    ? "/offers/figma-arrow-included.svg"
                    : "/offers/figma-arrow-excluded.svg"
                }
                alt=""
                width={8}
                height={11}
                unoptimized
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <OfferTerms
          offerTitle={offer.title}
          summary={offer.guarantee}
          terms={offer.terms}
        />

        <Button
          href={home.offers.cta.href}
          className="hero-cta hero-cta--primary offer-card__cta whitespace-nowrap font-normal uppercase"
          size="sm"
        >
          <span className="hero-cta__label">{home.offers.cta.label}</span>
        </Button>
      </div>
    </article>
  );
}

export function OffersShowcase() {
  const { heading, sectionCta, packages } = home.offers;

  return (
    <section
      className="offers-showcase"
      aria-labelledby="offers-showcase-heading"
    >
      <div className="offers-showcase__canvas">
        <div className="offers-showcase__header">
          <h2 id="offers-showcase-heading" className="offers-showcase__heading">
            {heading.before}
            <span>{heading.accent}</span>
            {heading.after}
          </h2>

          <Button
            href={sectionCta.href}
            variant="secondary"
            size="lg"
            className="home-heading-cta h-14 shrink-0 px-8 text-base"
          >
            <span className="home-heading-cta__label">{sectionCta.label}</span>
          </Button>
        </div>

        <div className="offers-showcase__cards">
          {packages.map((offer) => (
            <OfferCard key={offer.slug} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}
