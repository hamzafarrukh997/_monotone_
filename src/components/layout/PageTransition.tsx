"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type WipePhase = "idle" | "covering" | "covered" | "revealing";

const destinationNames: Record<string, string> = {
  blog: "Insights",
  contact: "Contact",
  "cookie-policy": "Cookie Policy",
  offers: "Offers",
  process: "Process",
  "privacy-policy": "Privacy Policy",
  services: "Services",
  terms: "Terms",
  work: "Work",
};

const serviceNames: Record<string, string> = {
  design: "Design",
  "growth-marketing": "Growth Marketing",
  "maintenance-support": "Maintenance & Support",
  "web-development": "Web Development",
};

function titleFromSlug(value: string) {
  return decodeURIComponent(value)
    .split("-")
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function getDestinationName(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return "Home";
  if (segments[0] === "services" && segments[1]) {
    return serviceNames[segments[1]] ?? titleFromSlug(segments[1]);
  }
  if (segments[0] === "offers" && segments[1]) {
    return titleFromSlug(segments[1]);
  }

  return destinationNames[segments[0]] ?? titleFromSlug(segments[0]);
}

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<WipePhase>("idle");
  const [destination, setDestination] = useState("");
  const activeRef = useRef(false);
  const originPathRef = useRef(pathname);
  const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!activeRef.current || pathname === originPathRef.current) return;

    if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    revealTimerRef.current = setTimeout(() => setPhase("revealing"), 90);
    resetTimerRef.current = setTimeout(() => {
      activeRef.current = false;
      setPhase("idle");
      setDestination("");
    }, 860);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || isModifiedClick(event)) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target.toLowerCase() !== "_self") return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#")) return;

      const destinationUrl = new URL(anchor.href, window.location.href);
      if (destinationUrl.origin !== window.location.origin) return;
      if (destinationUrl.hash && destinationUrl.pathname === window.location.pathname) return;

      const currentLocation = `${window.location.pathname}${window.location.search}`;
      const nextLocation = `${destinationUrl.pathname}${destinationUrl.search}`;
      if (currentLocation === nextLocation) return;

      event.preventDefault();

      if (activeRef.current) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(`${nextLocation}${destinationUrl.hash}`);
        return;
      }

      activeRef.current = true;
      originPathRef.current = window.location.pathname;
      setDestination(getDestinationName(destinationUrl.pathname));
      setPhase("covering");

      navigationTimerRef.current = setTimeout(() => {
        setPhase("covered");
        router.push(`${nextLocation}${destinationUrl.hash}`);

        // Never leave the curtain covering the page if a navigation is rejected.
        revealTimerRef.current = setTimeout(() => {
          if (!activeRef.current) return;
          setPhase("revealing");
          resetTimerRef.current = setTimeout(() => {
            activeRef.current = false;
            setPhase("idle");
            setDestination("");
          }, 760);
        }, 1800);
      }, 560);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router]);

  useEffect(
    () => () => {
      if (navigationTimerRef.current) clearTimeout(navigationTimerRef.current);
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    },
    [],
  );

  return (
    <>
      <div
        className="page-wipe"
        data-phase={phase}
        aria-hidden="true"
        onWheel={(event) => event.preventDefault()}
        onTouchMove={(event) => event.preventDefault()}
      >
        <div className="page-wipe__panel">
          <div className="page-wipe__topline">
            <span>Monotone</span>
            <span>Digital, made deliberate</span>
          </div>

          <div className="page-wipe__rule" />

          <div className="page-wipe__destination">
            <span className="page-wipe__eyebrow">Next page</span>
            <span className="page-wipe__title">{destination}</span>
          </div>

          <span className="page-wipe__index">M—01</span>
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {phase !== "idle" && destination ? `Opening ${destination}` : ""}
      </span>
    </>
  );
}
