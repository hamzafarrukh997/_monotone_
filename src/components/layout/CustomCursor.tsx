"use client";

import { useEffect, useRef } from "react";

const ACTION_SELECTOR =
  'a, button, summary, [role="button"], [data-cursor="action"]';
const NATIVE_CURSOR_SELECTOR =
  'input, textarea, select, [contenteditable="true"], [data-cursor="none"]';
const COMPACT_CURSOR_SELECTOR = ".hero-cta";
const HERO_SELECTOR = ".home-hero";
const CURSOR_LERP = 0.2;
const CURSOR_BOUNCE = 0.65;
const CURSOR_HIDE_DELAY = 1500;

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!cursor || !finePointer.matches || reducedMotion.matches) return;

    const root = document.documentElement;
    let frame = 0;
    let hideTimer = 0;
    let hasPosition = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let velocityX = 0;
    let velocityY = 0;

    root.classList.add("custom-cursor-enabled");

    const render = () => {
      velocityX += (targetX - currentX) * CURSOR_LERP;
      velocityY += (targetY - currentY) * CURSOR_LERP;
      velocityX *= CURSOR_BOUNCE;
      velocityY *= CURSOR_BOUNCE;
      currentX += velocityX;
      currentY += velocityY;

      if (
        Math.abs(targetX - currentX) < 0.001 &&
        Math.abs(targetY - currentY) < 0.001 &&
        Math.abs(velocityX) < 0.001 &&
        Math.abs(velocityY) < 0.001
      ) {
        currentX = targetX;
        currentY = targetY;
        velocityX = 0;
        velocityY = 0;
      }

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = window.requestAnimationFrame(render);
    };

    const setVariant = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      const useNativeCursor = element?.closest(NATIVE_CURSOR_SELECTOR);
      const useCompactCursor = element?.closest(COMPACT_CURSOR_SELECTOR);
      const isAction = element?.closest(ACTION_SELECTOR);

      cursor.dataset.surface = element?.closest(HERO_SELECTOR)
        ? "hero"
        : "default";

      if (useNativeCursor) cursor.dataset.variant = "hidden";
      else if (useCompactCursor) cursor.dataset.variant = "idle";
      else if (isAction) cursor.dataset.variant = "action";
      else cursor.dataset.variant = "idle";
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      targetX = event.clientX;
      targetY = event.clientY;

      if (!hasPosition || cursor.dataset.visible !== "true") {
        currentX = targetX;
        currentY = targetY;
        velocityX = 0;
        velocityY = 0;
        hasPosition = true;
      }

      cursor.dataset.visible = "true";
      setVariant(event.target);

      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        cursor.dataset.visible = "false";
      }, CURSOR_HIDE_DELAY);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") cursor.dataset.pressed = "true";
    };

    const handlePointerUp = () => {
      cursor.dataset.pressed = "false";
    };

    const handlePointerLeave = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        window.clearTimeout(hideTimer);
        cursor.dataset.visible = "false";
      }
    };

    const handleWindowBlur = () => {
      window.clearTimeout(hideTimer);
      cursor.dataset.visible = "false";
      cursor.dataset.pressed = "false";
    };

    frame = window.requestAnimationFrame(render);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("mouseout", handlePointerLeave);

    return () => {
      root.classList.remove("custom-cursor-enabled");
      window.cancelAnimationFrame(frame);
      window.clearTimeout(hideTimer);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("mouseout", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="site-cursor"
      data-pressed="false"
      data-surface="default"
      data-variant="idle"
      data-visible="false"
      aria-hidden="true"
    >
      <span className="site-cursor__surface" />
      <svg
        className="site-cursor__arrow"
        viewBox="0 0 40 40"
        aria-hidden="true"
      >
        <path d="m32.063 24-9 9-2.123-2.122 5.377-5.378H8.063V6h3v16.5h15.254l-5.377-5.378L23.062 15z" />
      </svg>
    </div>
  );
}
