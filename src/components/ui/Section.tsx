import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  /** Optional id for in-page anchors (e.g. FAQ, services). */
  id?: string;
  /** Accessible label for the section landmark. */
  "aria-label"?: string;
  /** Render without the inner Container (for full-bleed sections). */
  bleed?: boolean;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

/**
 * Vertical rhythm wrapper. Renders a semantic <section> landmark with
 * token-driven vertical padding and an optional centered Container.
 */
export function Section({
  id,
  bleed = false,
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section id={id} className={cn("py-section", className)} {...rest}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
