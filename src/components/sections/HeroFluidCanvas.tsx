"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { createFluidSim, type FluidSimHandle } from "@/lib/fluidSim";

export function HeroFluidCanvas({ paused = false }: { paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<FluidSimHandle | null>(null);
  const destroyTimerRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (destroyTimerRef.current !== null) {
      window.clearTimeout(destroyTimerRef.current);
      destroyTimerRef.current = null;
    }

    return () => {
      destroyTimerRef.current = window.setTimeout(() => {
        simRef.current?.destroy();
        simRef.current = null;
        destroyTimerRef.current = null;
      }, 0);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (reduceMotion) {
      simRef.current?.stop();
      canvas.classList.remove("is-active");
      return;
    }

    if (paused) {
      simRef.current?.stop();
      canvas.classList.toggle("is-active", Boolean(simRef.current));
      return;
    }

    const ambientOnly = window.matchMedia("(pointer: coarse)").matches;

    if (!simRef.current) {
      try {
        simRef.current = createFluidSim(canvas, { ambientOnly });
      } catch {
        simRef.current = null;
      }
    }

    const sim = simRef.current;
    if (!sim) return;

    canvas.classList.add("is-active");

    let frame = 0;
    let heroIsVisible = false;
    let pointerX = 0;
    let pointerY = 0;

    const updatePlayback = () => {
      if (heroIsVisible && document.visibilityState === "visible") {
        sim.start();
      } else {
        sim.stop();
      }
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        heroIsVisible = entry.isIntersecting;
        updatePlayback();
      },
      { threshold: 0 },
    );

    const apply = () => {
      frame = 0;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const x = (pointerX - rect.left) / rect.width;
      const y = (pointerY - rect.top) / rect.height;
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) sim!.pointerMove(x, y);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (
        event.pointerType === "touch" ||
        !heroIsVisible ||
        document.visibilityState !== "visible"
      ) {
        return;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;
      schedule();
    };

    visibilityObserver.observe(canvas);
    document.addEventListener("visibilitychange", updatePlayback);

    if (!ambientOnly) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      window.removeEventListener("pointermove", onPointerMove);
      sim.stop();
      canvas.classList.remove("is-active");
    };
  }, [reduceMotion, paused]);

  return (
    <div className="hero-fluid" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-fluid__canvas" />
    </div>
  );
}
