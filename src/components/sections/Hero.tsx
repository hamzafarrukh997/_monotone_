import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { HeroFluidCanvas } from "@/components/sections/HeroFluidCanvas";
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

function HeadlineToggle({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`absolute h-[59px] w-[150px] ${className}`}>
      <span className="absolute inset-y-0 left-0 w-[85px] rounded-pill bg-toggle-a" />
      <span className="absolute inset-y-0 right-0 w-[85px] rounded-pill bg-toggle-b" />
    </span>
  );
}

function HeroCtaContent({ label }: { label: string }) {
  return <span className="hero-cta__label">{label}</span>;
}

function DesktopHero() {
  const { hero } = home;

  return (
    <div className="design-canvas-1920 absolute bottom-0 left-1/2 hidden h-[764px] w-[1386px] origin-bottom lg:block">
      <div
        aria-hidden="true"
        className="hero-fluid__watermark pointer-events-none absolute left-1/2 top-[216px] -translate-x-1/2 select-none whitespace-nowrap text-center font-sans text-[380px] font-bold leading-[0.85] tracking-[-22.8px] text-watermark"
      >
        {hero.watermark.map((line) => (
          <span key={line} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </div>

      <div className="absolute inset-0 translate-x-[293px] -translate-y-[130px]">
        <h1 className="font-display text-[79.888px] font-normal leading-normal tracking-[-4.793px] text-fg">
          <span className="absolute left-[302.5px] top-[390px] -translate-x-1/2 whitespace-nowrap">
            {hero.headline.before}
          </span>
          <span className="absolute left-[294px] top-[464px] -translate-x-1/2 whitespace-nowrap">
            obsessively
          </span>
          <span className="absolute left-[616.5px] top-[464px] -translate-x-1/2 whitespace-nowrap">
            good
          </span>
          <span className="absolute left-[553.5px] top-[542px] -translate-x-1/2 whitespace-nowrap">
            websites
          </span>
        </h1>

        <HeadlineToggle className="left-[494px] top-[415px]" />

        <p className="absolute left-[98px] top-[575px] w-[267px] text-right font-sans text-[14px] leading-normal text-fg">
          {hero.subcopy}
        </p>

      </div>

      <div className="absolute left-1/2 top-[516px] flex -translate-x-1/2 items-center gap-[13px]">
        <Button
          href={hero.primaryCta.href}
          size="sm"
          className="hero-cta hero-cta--primary h-[38px] whitespace-nowrap px-7 text-[15.5px] font-normal leading-none uppercase tracking-[-0.1px]"
        >
          <HeroCtaContent label={hero.primaryCta.label} />
        </Button>
        <Button
          href={hero.secondaryCta.href}
          variant="secondary"
          size="sm"
          className="hero-cta hero-cta--secondary h-[38px] whitespace-nowrap px-7 text-[15.5px] font-normal leading-none uppercase tracking-[-0.1px]"
        >
          <HeroCtaContent label={hero.secondaryCta.label} />
        </Button>
      </div>
    </div>
  );
}

function MobileHero() {
  const { hero } = home;

  return (
    <div className="relative flex h-full flex-col justify-end overflow-hidden px-6 pb-24 pt-28 sm:px-8 sm:pb-28 lg:hidden">
      <div
        aria-hidden="true"
        className="hero-fluid__watermark pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center font-sans text-[30vw] font-bold leading-none tracking-[-0.06em] text-watermark"
      >
        {hero.watermark.map((line) => (
          <span key={line} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </div>

      <div className="relative z-10">
        <h1 className="max-w-[9.5ch] font-display text-[clamp(2.75rem,13vw,4.75rem)] font-normal leading-[0.94] tracking-[-0.06em] text-fg">
          <span className="block">{hero.headline.before}</span>
          <span className="block">obsessively good</span>
          <span className="block">websites</span>
        </h1>

        <div aria-hidden="true" className="relative mt-4 h-10 w-[102px]">
          <span className="absolute inset-y-0 left-0 w-[61px] rounded-pill bg-toggle-a" />
          <span className="absolute inset-y-0 right-0 w-[61px] rounded-pill bg-toggle-b" />
        </div>

        <p className="mt-6 max-w-[18rem] font-sans text-sm leading-5 text-fg/85">
          {hero.subcopy}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button
            href={hero.primaryCta.href}
            className="hero-cta hero-cta--primary h-11 px-7 text-xs font-normal uppercase"
          >
            <HeroCtaContent label={hero.primaryCta.label} />
          </Button>
          <Button
            href={hero.secondaryCta.href}
            variant="secondary"
            className="hero-cta hero-cta--secondary h-11 px-7 text-xs font-normal uppercase"
          >
            <HeroCtaContent label={hero.secondaryCta.label} />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ClientLogoRail() {
  return (
    <div className="absolute inset-x-0 bottom-4 z-[4] px-4 sm:bottom-5 sm:px-6 lg:bottom-6">
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
      className="home-hero relative isolate -mt-24 h-[100svh] overflow-hidden bg-hero-bg text-fg min-[2000px]:h-[1080px]"
    >
      <div className="relative z-[2] h-full">
        <DesktopHero />
        <MobileHero />
      </div>
      <ClientLogoRail />
      <HeroFluidCanvas />
    </Section>
  );
}
