import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  "aria-label"?: string;
  /** Render without the inner Container (for full-bleed sections). */
  bleed?: boolean;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

/**
 * Semantic <section> landmark. By default wraps children in a centered
 * Container; pass `bleed` for full-bleed sections that manage their own layout.
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
    <section id={id} className={className} {...rest}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
