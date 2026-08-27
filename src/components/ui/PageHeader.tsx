import type { ReactNode } from "react";
import { Container } from "./Container";

type PageHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
};

/** Consistent page/section intro: eyebrow, title, lead, optional actions. */
export function PageHeader({ eyebrow, title, lead, children }: PageHeaderProps) {
  return (
    <Container as="header" className="py-section">
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="max-w-3xl text-title font-semibold text-fg sm:text-display">
        {title}
      </h1>
      {lead ? (
        <p className="mt-4 max-w-2xl text-lead text-muted">{lead}</p>
      ) : null}
      {children ? <div className="mt-6 flex flex-wrap gap-3">{children}</div> : null}
    </Container>
  );
}
