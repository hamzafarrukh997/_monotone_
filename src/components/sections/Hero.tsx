import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { home } from "@/content/home";

/** Decorative toggle graphic embedded in the headline. Sized in `em` so it
 *  scales with the headline font-size. Hidden from assistive tech. */
function HeadlineToggle() {
  return (
    <span
      aria-hidden="true"
      className="relative mx-[0.25em] inline-block h-[0.62em] w-[1.7em] translate-y-[0.02em] align-middle"
    >
      <span className="absolute inset-y-0 left-0 w-[62%] rounded-pill bg-toggle-a" />
      <span className="absolute inset-y-0 right-0 w-[62%] rounded-pill bg-toggle-b" />
    </span>
  );
}

export function Hero() {
  const { hero } = home;

  return (
    <Section
      bleed
      aria-label="Introduction"
      className="relative isolate overflow-hidden bg-bg text-fg"
    >
      {/* Background watermark — large, low-contrast, purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none flex-col justify-center"
      >
        <div className="font-sans text-watermark font-extrabold lowercase text-fg/5">
          {hero.watermark.map((line) => (
            <span key={line} className="block whitespace-nowrap">
              {line}
            </span>
          ))}
        </div>
      </div>

      {/* Foreground content, anchored to the lower-left of the frame. */}
      <Container className="relative z-10 flex min-h-[36rem] flex-col justify-end pb-16 pt-28 lg:min-h-[46rem] lg:pb-24 lg:pt-40">
        <h1 className="max-w-3xl font-display text-hero font-medium text-fg">
          {hero.headline.before}
          <HeadlineToggle />
          {hero.headline.after}
        </h1>

        <div className="mt-8 flex max-w-md flex-col items-center gap-6">
          <p className="max-w-[17rem] text-center text-body text-fg/80">
            {hero.subcopy}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href={hero.primaryCta.href} className="uppercase tracking-wide">
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="secondary"
              className="uppercase tracking-wide"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
