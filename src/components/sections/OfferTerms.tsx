"use client";

import {
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type OfferTermsProps = {
  offerTitle: string;
  summary: string;
  terms: string;
};

type PopupPosition = {
  left: number;
  top: number;
  opensLeft: boolean;
};

export function OfferTerms({ offerTitle, summary, terms }: OfferTermsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [position, setPosition] = useState<PopupPosition>({
    left: 0,
    top: 0,
    opensLeft: false,
  });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleId = useId();

  const closePopup = (restoreFocus = true) => {
    setIsOpen(false);
    closeTimerRef.current = setTimeout(() => {
      setIsRendered(false);
      closeTimerRef.current = null;
    }, 160);
    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  };

  const togglePopup = (event: ReactMouseEvent<HTMLButtonElement>) => {
    if (isOpen) {
      closePopup(false);
      return;
    }

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    const triggerRect = event.currentTarget.getBoundingClientRect();
    const popupWidth = Math.min(224, window.innerWidth - 24);
    const gap = 10;
    const opensLeft =
      triggerRect.right + gap + popupWidth + 12 > window.innerWidth;
    const verticalCenter = triggerRect.top + triggerRect.height / 2;

    setPosition({
      left: opensLeft ? triggerRect.left - gap : triggerRect.right + gap,
      top: Math.min(Math.max(verticalCenter, 72), window.innerHeight - 72),
      opensLeft,
    });
    setIsRendered(true);
    window.requestAnimationFrame(() => setIsOpen(true));
  };

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
    };
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !popupRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        closePopup(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="offer-card__guarantee"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`${summary}. View terms and conditions.`}
        onClick={togglePopup}
      >
        <span className="offer-card__guarantee-text">{summary}</span>
        <span className="offer-card__condition-mark" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" width="100%" height="100%">
            <circle
              cx="8"
              cy="8"
              r="7.25"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 7.1v4.15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="8" cy="4.85" r="0.85" fill="currentColor" />
          </svg>
        </span>
      </button>

      {isRendered
        ? createPortal(
            <div
              ref={popupRef}
              className="offer-terms"
              role="dialog"
              aria-labelledby={titleId}
              data-side={position.opensLeft ? "left" : "right"}
              data-open={isOpen}
              style={{
                left: position.left,
                top: position.top,
                transform: position.opensLeft
                  ? "translate(-100%, -50%)"
                  : "translateY(-50%)",
              }}
            >
              <div className="offer-terms__content">
                <button
                  type="button"
                  className="offer-terms__close"
                  aria-label="Close terms and conditions"
                  onClick={() => closePopup()}
                >
                  <span aria-hidden="true">×</span>
                </button>

                <p className="offer-terms__eyebrow">Terms apply</p>
                <h4 id={titleId} className="offer-terms__title">
                  {offerTitle}
                </h4>
                <p className="offer-terms__copy">{terms}</p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
