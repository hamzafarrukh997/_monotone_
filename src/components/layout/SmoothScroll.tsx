"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      autoToggle: true,
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      overscroll: true,
      anchors: true,
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
