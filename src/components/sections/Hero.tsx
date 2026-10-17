import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { HeroMotion } from "@/components/sections/HeroMotion";
import { home } from "@/content/home";

const clientLogos = [
  {
    name: "JCCM",
    src: "/client-logos/jccm.svg",
    width: 268,
    height: 254,
    imageClassName: "max-h-8 max-w-10 brightness-0",
  },
  {
    name: "Park Pro Plumbing",
    src: "/client-logos/park-pro-plumbing.png",
    width: 277,
    height: 69,
    imageClassName: "max-h-6 max-w-[7rem] brightness-0",
  },
  {
    name: "Park Ave Electrical",
    src: "/client-logos/park-ave-electrical.png",
    width: 213,
    height: 147,
    imageClassName: "max-h-8 max-w-12 brightness-0",
  },
  {
    name: "Proactive Building Solutions",
    src: "/client-logos/proactive-building-solutions.png",
    width: 1254,
    height: 1324,
    imageClassName: "max-h-9 max-w-10 brightness-0",
  },
  {
    name: "Sorora Land",
    src: "/client-logos/sorora-land.webp",
    width: 600,
    height: 141,
    imageClassName: "max-h-5 max-w-[7rem] brightness-0",
  },
  {
    name: "Mehboob Sons",
    src: "/client-logos/mehboob-sons.png",
    width: 2792,
    height: 1098,
    imageClassName:
      "max-h-6 max-w-[7rem] grayscale contrast-125 mix-blend-multiply",
  },
] as const;

function HeroComposition() {
  const { hero } = home;

  return (
    <div className="hero-stage">
      <div className="hero-composition">
        <div className="hero-eyebrow hero-enter">
          <span className="hero-eyebrow__dot" aria-hidden="true" />
          <span>{hero.eyebrow}</span>
          <span className="hero-eyebrow__rule" aria-hidden="true" />
        </div>

        <div className="hero-type-layout">
          <h1 className="hero-heading" aria-label={`${hero.headline.before} ${hero.headline.after}`}>
            <span className="hero-heading__line hero-heading__line--first" aria-hidden="true">
              <span className="hero-heading__reveal">{hero.headline.before}</span>
              <span className="hero-mark">
                <span className="hero-mark__orbit">
                  <span className="hero-mark__disc hero-mark__disc--back" />
                  <span className="hero-mark__disc hero-mark__disc--front">
                    <svg viewBox="0 0 40 40" fill="none">
                      <path d="M20 7v26M7 20h26M11 11l18 18M11 29l18-18" />
                    </svg>
                  </span>
                </span>
              </span>
            </span>
            <span className="hero-heading__line hero-heading__line--second" aria-hidden="true">
              <span className="hero-heading__reveal">obsessively good</span>
            </span>
            <span className="hero-heading__line hero-heading__line--third" aria-hidden="true">
              <span className="hero-heading__reveal">websites<span className="hero-heading__period">.</span></span>
            </span>
          </h1>
          <p className="hero-subcopy hero-enter">{hero.subcopy}</p>
        </div>

        <div className="hero-actions hero-enter">
          <Button href={hero.primaryCta.href} className="hero-cta hero-cta--primary">
            <span className="hero-cta__label">{hero.primaryCta.label}</span>
            <span className="hero-action-arrow" aria-hidden="true">↗</span>
          </Button>
          <Button href={hero.secondaryCta.href} variant="secondary" className="hero-cta hero-cta--secondary">
            <span className="hero-cta__label">{hero.secondaryCta.label}</span>
          </Button>
        </div>
      </div>
      <a className="hero-scroll" href="#work-showcase-heading">
        <span>{hero.exploreLabel}</span>
        <span className="hero-scroll__track" aria-hidden="true"><span>↓</span></span>
      </a>
    </div>
  );
}

function ClientLogoRail() {
  return (
    <div className="hero-clients absolute inset-x-0 bottom-4 z-[4] px-4 sm:bottom-5 sm:px-6 lg:bottom-6">
      <div className="mx-auto flex h-16 max-w-5xl overflow-hidden rounded-full border border-[#2B2B2B]/12 bg-white/78 backdrop-blur-lg">
        <div className="hidden h-full w-36 shrink-0 items-center gap-2.5 border-r border-[#2B2B2B]/10 px-5 lg:flex">
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <p className="font-sans text-[9px] font-bold uppercase leading-3 tracking-[0.16em] text-[#2B2B2B]/55">
            Selected work
          </p>
        </div>

        <ol className="client-logo-strip flex h-full min-w-0 flex-1 snap-x snap-mandatory overflow-x-auto px-2 lg:grid lg:grid-cols-6 lg:px-0">
          {clientLogos.map((logo) => (
            <li
              key={logo.name}
              className="group/logo relative flex h-full w-28 shrink-0 snap-center items-center justify-center border-r border-[#2B2B2B]/8 px-3 last:border-r-0 lg:w-auto lg:min-w-0"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={logo.width}
                height={logo.height}
                sizes="(min-width: 1024px) 9rem, 7rem"
                className={`h-auto w-auto object-contain opacity-50 transition-opacity duration-300 ease-out group-hover/logo:opacity-85 ${logo.imageClassName}`}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <Section
      bleed
      aria-label="Introduction"
      className="home-hero relative isolate -mt-24 h-[100svh] overflow-hidden bg-hero-bg text-fg"
    >
      <HeroMotion>
        <HeroComposition />
        <ClientLogoRail />
      </HeroMotion>
    </Section>
  );
}
