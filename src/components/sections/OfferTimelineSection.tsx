import type { Offer } from "@/content/offers";

export function OfferTimelineSection({ offer }: { offer: Offer }) {
  const { detail } = offer;
  const steps = detail.timelineSteps;

  return (
    <section className="bg-white text-fg" aria-labelledby="offer-timeline-heading">
      <div className="mx-auto w-full max-w-[120rem] px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[62rem] text-center">
          <h2
            id="offer-timeline-heading"
            className="font-display text-[clamp(2.25rem,3.4vw,3.5rem)] leading-[1.1] font-normal tracking-[-0.06em]"
          >
            What to expect
          </h2>

          {/* Tablet / desktop: horizontal stepper */}
          <ol className="mt-14 hidden sm:grid sm:grid-cols-3 sm:gap-x-6 lg:mt-16 lg:gap-x-10">
            {steps.map((step, index) => (
              <li key={step.label} className="flex flex-col items-center">
                <div className="flex w-full items-center">
                  <span
                    aria-hidden="true"
                    className={`h-px flex-1 ${index === 0 ? "bg-transparent" : "bg-[#2b2b2b]/15"}`}
                  />
                  <span
                    aria-hidden="true"
                    className="mx-3 size-3 shrink-0 rounded-full bg-accent"
                  />
                  <span
                    aria-hidden="true"
                    className={`h-px flex-1 ${index === steps.length - 1 ? "bg-transparent" : "bg-[#2b2b2b]/15"}`}
                  />
                </div>

                <p className="mt-6 font-sans text-lg font-bold tracking-[-0.02em]">
                  {step.label}
                </p>
                <p className="mt-2 max-w-[16rem] font-sans text-sm leading-[1.5] font-normal tracking-[-0.01em] text-fg/65">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          {/* Mobile: vertical stepper */}
          <ol className="mt-12 flex flex-col items-center sm:hidden">
            {steps.map((step, index) => (
              <li key={step.label} className="flex flex-col items-center">
                <span aria-hidden="true" className="size-3 shrink-0 rounded-full bg-accent" />
                <p className="mt-4 font-sans text-lg font-bold tracking-[-0.02em]">
                  {step.label}
                </p>
                <p className="mt-2 max-w-[20rem] font-sans text-sm leading-[1.5] font-normal tracking-[-0.01em] text-fg/65">
                  {step.body}
                </p>
                {index < steps.length - 1 ? (
                  <span aria-hidden="true" className="my-6 h-8 w-px bg-[#2b2b2b]/15" />
                ) : null}
              </li>
            ))}
          </ol>

          {detail.timelineClosing ? (
            <p className="mt-12 font-display text-[clamp(1.25rem,1.8vw,1.65rem)] leading-[1.3] font-normal tracking-[-0.03em] text-accent">
              {detail.timelineClosing}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
