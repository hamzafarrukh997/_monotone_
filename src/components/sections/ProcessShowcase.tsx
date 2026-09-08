"use client";

import {
  type CSSProperties,
  type RefCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { home } from "@/content/home";

type SplitCopyProps = {
  children: string;
  className: string;
  variant: "title" | "body";
};

function SplitCopy({ children, className, variant }: SplitCopyProps) {
  const words = children.split(" ");
  const exitProgressClass =
    variant === "body"
      ? "[--word-exit:clamp(0,calc(var(--exit-progress)*1.62-var(--word-index)*0.006),1)]"
      : "[--word-exit:clamp(0,calc(var(--exit-progress)*1.18-var(--word-index)*0.008),1)]";

  return (
    <span className={`${className} inline`} aria-label={children}>
      {words.map((word, index) => (
        <span
          className={`process-showcase__word inline-block [opacity:calc(1-var(--word-exit))] [transform:translate3d(0,calc(var(--word-exit)*1.25rem),0)] [will-change:transform,opacity] motion-reduce:!opacity-100 motion-reduce:!transform-none ${exitProgressClass}`}
          aria-hidden="true"
          key={`${word}-${index}`}
          style={{ "--word-index": index } as CSSProperties}
        >
          {word}
          {index < words.length - 1 ? "\u00a0" : null}
        </span>
      ))}
    </span>
  );
}

export function ProcessShowcase() {
  const { heading, steps } = home.process;
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const registerCard =
    (index: number): RefCallback<HTMLElement> =>
    (node) => {
      cardRefs.current[index] = node;
    };

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let sectionIsVisible = false;

    const update = () => {
      frameRef.current = null;
      const cards = cardRefs.current.filter(
        (card): card is HTMLElement => card !== null,
      );

      if (!cards.length) return;

      const stickyTop = Number.parseFloat(getComputedStyle(cards[0]).top) || 0;
      const rectangles = cards.map((card) => card.getBoundingClientRect());
      let nextActiveIndex = 0;

      rectangles.forEach((rectangle, index) => {
        if (rectangle.top <= stickyTop + 2) nextActiveIndex = index;
      });

      if (activeIndexRef.current !== nextActiveIndex) {
        activeIndexRef.current = nextActiveIndex;
        setActiveIndex(nextActiveIndex);
      }

      const lastCardRectangle = rectangles.at(-1);
      const rail = railRef.current;
      const currentRailOffset = rail
        ? Number.parseFloat(
            rail.style.getPropertyValue("--process-rail-follow-y"),
          ) || 0
        : 0;
      const unshiftedRailTop = rail
        ? rail.getBoundingClientRect().top - currentRailOffset
        : stickyTop;
      const railOffset =
        nextActiveIndex === cards.length - 1 &&
        lastCardRectangle &&
        lastCardRectangle.top < stickyTop
          ? lastCardRectangle.top - unshiftedRailTop
          : 0;

      rail?.style.setProperty(
        "--process-rail-follow-y",
        `${railOffset.toFixed(2)}px`,
      );

      cards.forEach((card, index) => {
        if (motionQuery.matches || index === cards.length - 1) {
          card.style.setProperty("--exit-progress", "0");
          return;
        }

        const nextTop = rectangles[index + 1].top;
        const fadeDistance = Math.min(card.offsetHeight * 0.58, innerHeight * 0.34);
        const progress = Math.min(
          1,
          Math.max(0, (stickyTop + fadeDistance - nextTop) / fadeDistance),
        );

        card.style.setProperty("--exit-progress", progress.toFixed(4));
      });

    };

    const requestUpdate = () => {
      if (!sectionIsVisible || frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(update);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        sectionIsVisible = entry.isIntersecting;
        if (sectionIsVisible) requestUpdate();
      },
      { rootMargin: "30% 0px" },
    );

    visibilityObserver.observe(section);
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    document.addEventListener("scroll", requestUpdate, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", requestUpdate);
    motionQuery.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      document.removeEventListener("scroll", requestUpdate, { capture: true });
      window.removeEventListener("resize", requestUpdate);
      motionQuery.removeEventListener("change", requestUpdate);
      visibilityObserver.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className="process-showcase relative overflow-clip text-white [--process-rail-height:1.5rem] [--process-surface:#2b2b2b] [--process-sticky-top:9.75rem] min-[35.001rem]:[--process-sticky-top:10.5rem] lg:[--process-sticky-top:clamp(9rem,27svh,19rem)]"
      aria-labelledby="process-showcase-heading"
    >
      <div className="process-showcase__canvas relative z-10 mx-auto w-full max-w-[120rem] px-5 pt-24 min-[35.001rem]:px-[clamp(1.25rem,5vw,6rem)] lg:pt-[clamp(6.5rem,9vw,10.5rem)]">
        <h2
          id="process-showcase-heading"
          className="process-showcase__heading mx-auto mb-24 max-w-[12ch] text-center font-display text-[clamp(2.75rem,13vw,4rem)] leading-[1.05] font-normal tracking-[-0.06em] lg:mb-[clamp(5.5rem,12svh,9rem)] lg:max-w-none lg:text-[clamp(3rem,4.15vw,4.8rem)]"
        >
          {heading.before}
          <span className="text-accent">{heading.accent}</span>
        </h2>

        <div className="process-showcase__stack block lg:grid lg:grid-cols-[minmax(10rem,15rem)_minmax(0,1fr)] lg:items-start lg:gap-x-[clamp(4rem,8vw,10rem)]">
          <aside
            ref={railRef}
            className="process-showcase__rail sticky top-[var(--process-sticky-top)] z-20 col-start-1 row-start-1 flex h-[var(--process-rail-height)] min-h-0 self-start items-start justify-start bg-[#2b2b2b]/[0.86] pt-[0.15rem] font-sans text-accent backdrop-blur-md [transform:translate3d(0,var(--process-rail-follow-y,0px),0)] [will-change:transform] lg:col-start-2 lg:bg-transparent lg:backdrop-blur-none lg:pt-0"
            aria-hidden="true"
          >
            <div className="process-showcase__active-step flex items-center gap-[1.1rem] lg:items-baseline">
              <div className="process-showcase__counter flex h-[1em] shrink-0 overflow-hidden font-sans text-process-step font-bold leading-process-step">
                <span>0</span>
                <span className="process-showcase__reel-window block h-[1em] overflow-hidden">
                  <span
                    className="process-showcase__digit-reel flex flex-col transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:duration-[0.01ms]"
                    style={{
                      transform: `translateY(-${activeIndex}em)`,
                    }}
                  >
                    {steps.map((step) => (
                      <span
                        className="block h-[1em] shrink-0 basis-[1em] leading-none"
                        key={step.number}
                      >
                        {step.number.at(-1)}
                      </span>
                    ))}
                  </span>
                </span>
              </div>

              <span className="process-showcase__label-window block h-[1em] min-w-[4.5rem] overflow-hidden font-sans text-process-step font-bold leading-process-step min-[35.001rem]:min-w-[5.6rem]">
                <span
                  className="process-showcase__label-reel flex flex-col transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:duration-[0.01ms]"
                  style={{
                    transform: `translateY(-${activeIndex}em)`,
                  }}
                >
                  {steps.map((step) => (
                    <span
                      className="block h-[1em] shrink-0 basis-[1em] leading-none"
                      key={step.label}
                    >
                      {step.label}
                    </span>
                  ))}
                </span>
              </span>
            </div>
          </aside>

          <div className="process-showcase__cards col-start-1 row-start-2 mt-[calc(var(--process-rail-height)*-1)] min-w-0 after:block after:h-[18svh] after:content-[''] lg:col-start-2 lg:after:h-[24svh]">
            {steps.map((step, index) => (
              <article
                ref={registerCard(index)}
                className="process-showcase__card sticky top-[var(--process-sticky-top)] z-[var(--card-index)] flex h-[72svh] min-h-[30rem] flex-col justify-start bg-transparent pt-[calc(var(--process-rail-height)+1rem)] pb-8 min-[35.001rem]:h-[66svh] min-[35.001rem]:min-h-[28rem] lg:h-[50svh] lg:min-h-[25rem]"
                style={
                  {
                    "--card-index": index + 1,
                    "--exit-progress": 0,
                  } as CSSProperties
                }
                aria-label={`${step.number} ${step.label}`}
                key={step.number}
              >
                <h3 className="process-showcase__title m-0 max-w-[18ch] font-display text-process-title font-normal leading-process-title tracking-process-title lg:max-w-[24ch]">
                  <SplitCopy
                    className="process-showcase__title-copy"
                    variant="title"
                  >
                    {step.title}
                  </SplitCopy>
                </h3>
                <p className="process-showcase__body mt-[clamp(1.3rem,2.3vh,2rem)] max-w-[39rem] font-sans text-process-body font-normal leading-process-body tracking-process-body text-white/56 lg:max-w-[46ch]">
                  <SplitCopy
                    className="process-showcase__body-copy"
                    variant="body"
                  >
                    {step.body}
                  </SplitCopy>
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
