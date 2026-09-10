"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { services, routes } from "@/lib/links";
import { Button } from "@/components/ui/Button";

const FOLLOW_SMOOTHING = 0.1;
const MAX_CARD_TRANSLATE = 20;
const MAX_CARD_ROTATION = 3;

function ArrowArtwork() {
  return (
    <span className="services-showcase__arrow-art" aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M7 20H32" />
        <path d="M24 12L32 20L24 28" />
      </svg>
    </span>
  );
}

function RollingNumber({ value }: { value: string }) {
  return (
    <span className="services-showcase__number" aria-hidden="true">
      {value.split("").map((digit, index) => (
        <span className="services-showcase__digit-window" key={`${digit}-${index}`}>
          <span
            className="services-showcase__digit-lane"
            data-digit-position={index}
          >
            <span>{digit}</span>
            <span>{digit}</span>
          </span>
        </span>
      ))}
    </span>
  );
}

type FollowState = {
  x: number;
  rotation: number;
};

function ServiceRow({
  service,
  number,
}: {
  service: (typeof services)[number];
  number: string;
}) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const followRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef(0);
  const targetRef = useRef<FollowState>({ x: 0, rotation: 0 });
  const currentRef = useRef<FollowState>({ x: 0, rotation: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  const animateFollow = useCallback(() => {
    if (animationFrameRef.current) return;

    const tick = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      current.x += (target.x - current.x) * FOLLOW_SMOOTHING;
      current.rotation +=
        (target.rotation - current.rotation) * FOLLOW_SMOOTHING;

      if (Math.abs(target.x - current.x) < 0.01) current.x = target.x;
      if (Math.abs(target.rotation - current.rotation) < 0.01) {
        current.rotation = target.rotation;
      }

      followRef.current?.style.setProperty(
        "--services-card-x",
        `${current.x}%`,
      );
      followRef.current?.style.setProperty(
        "--services-card-rotation",
        `${current.rotation}deg`,
      );

      if (current.x !== target.x || current.rotation !== target.rotation) {
        animationFrameRef.current = requestAnimationFrame(tick);
      } else {
        animationFrameRef.current = 0;
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(
    () => () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    },
    [],
  );

  const updateCardTarget = useCallback(
    (clientX: number) => {
      const row = rowRef.current;
      if (!row) return;

      const bounds = row.getBoundingClientRect();
      const progress = Math.min(
        Math.max((clientX - bounds.left) / bounds.width, 0),
        1,
      );
      const centeredProgress = progress * 2 - 1;

      targetRef.current = {
        x: centeredProgress * MAX_CARD_TRANSLATE,
        rotation: centeredProgress * MAX_CARD_ROTATION,
      };
      animateFollow();
    },
    [animateFollow],
  );

  const handlePointerEnter = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch") return;
    setIsActive(true);
    updateCardTarget(event.clientX);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch") return;
    updateCardTarget(event.clientX);
  };

  const resetRow = () => {
    setIsActive(false);
    targetRef.current = { x: 0, rotation: 0 };
    animateFollow();
  };

  return (
    <a
      ref={rowRef}
      href={routes.service(service.slug)}
      className="services-showcase__row"
      data-active={isActive}
      data-revealed={isRevealed}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetRow}
      onFocus={() => setIsActive(true)}
      onBlur={resetRow}
      aria-label={service.title}
    >
      <span className="services-showcase__fill" aria-hidden="true" />

      <span className="services-showcase__title-group">
        <RollingNumber value={number} />
        <span className="services-showcase__title">{service.title}</span>
      </span>

      <span className="services-showcase__arrow-shift">
        <ArrowArtwork />
      </span>

      <span className="services-showcase__card-stage" aria-hidden="true">
        <span className="services-showcase__card-reveal">
          <span className="services-showcase__card-stretch">
            <span ref={followRef} className="services-showcase__card-follow">
              <span className="services-showcase__card">
                <span className="services-showcase__card-media">
                  <Image
                    className="services-showcase__card-image"
                    src={service.cardImage}
                    alt=""
                    fill
                    sizes="(max-width: 63.999rem) 0px, 20vw"
                  />
                </span>
                <span className="services-showcase__card-list">
                  {service.subServices.map((subService) => (
                    <span key={subService.slug}>{subService.title}</span>
                  ))}
                </span>
              </span>
            </span>
          </span>
        </span>
      </span>

      <span className="services-showcase__rule" aria-hidden="true" />
    </a>
  );
}

export function ServicesShowcase() {
  return (
    <section
      aria-labelledby="services-showcase-heading"
      className="services-showcase bg-bg text-fg"
    >
      <div className="services-showcase__header">
        <h2
          id="services-showcase-heading"
          className="services-showcase__heading font-display"
        >
          Everything <span>we handle</span> for you
        </h2>

        <Button
          href={routes.services}
          variant="secondary"
          size="lg"
          className="home-heading-cta shrink-0 px-8 text-[18px] font-[350]"
        >
          <span className="home-heading-cta__label">View all services</span>
        </Button>
      </div>

      <div className="services-showcase__list">
        {services.map((service, index) => (
          <ServiceRow
            key={service.slug}
            service={service}
            number={String(index + 1).padStart(2, "0")}
          />
        ))}
      </div>
    </section>
  );
}
