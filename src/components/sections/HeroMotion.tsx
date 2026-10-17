"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { HeroFluidCanvas } from "./HeroFluidCanvas";
import { home } from "@/content/home";

/** Keeps motion local to the hero; the headline and links stay server-rendered. */
export function HeroMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let visible = true;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      x = y = targetX = targetY = 0;
      root.style.setProperty("--hero-x", "0px");
      root.style.setProperty("--hero-y", "0px");
      root.style.setProperty("--hero-scroll", "0px");
    };

    const update = () => {
      frame = 0;
      if (paused || reduced.matches || !visible || document.hidden) return;
      x += (targetX - x) * 0.075;
      y += (targetY - y) * 0.075;
      const rect = root.getBoundingClientRect();
      const scroll = Math.min(1, Math.max(0, -rect.top / rect.height));
      root.style.setProperty("--hero-x", `${x.toFixed(3)}px`);
      root.style.setProperty("--hero-y", `${y.toFixed(3)}px`);
      root.style.setProperty("--hero-scroll", `${(scroll * 48).toFixed(2)}px`);
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.05) schedule();
    };

    const schedule = () => {
      if (!frame && !paused && !reduced.matches && visible && !document.hidden) {
        frame = requestAnimationFrame(update);
      }
    };

    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === "touch") return;
      const rect = root.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
      schedule();
    };
    const leave = () => {
      targetX = targetY = 0;
      schedule();
    };
    const syncPlayback = () => {
      root.dataset.visible = String(visible && !document.hidden);
      if (reduced.matches || paused || document.hidden || !visible) reset();
      else schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });

    observer.observe(root);
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("visibilitychange", syncPlayback);
    reduced.addEventListener("change", syncPlayback);
    syncPlayback();

    return () => {
      reset();
      observer.disconnect();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", schedule);
      document.removeEventListener("visibilitychange", syncPlayback);
      reduced.removeEventListener("change", syncPlayback);
    };
  }, [paused]);

  return (
    <div ref={rootRef} className="hero-experience" data-motion={paused ? "paused" : "playing"}>
      {children}
      <button
        type="button"
        className="hero-motion-control"
        onClick={() => setPaused((value) => !value)}
      >
        <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
        <span>{paused ? home.hero.resumeMotionLabel : home.hero.pauseMotionLabel}</span>
      </button>
      <HeroFluidCanvas paused={paused} />
    </div>
  );
}
