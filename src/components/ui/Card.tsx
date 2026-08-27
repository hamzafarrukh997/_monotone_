import type { ComponentProps, ReactNode } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/cn";

type NextLinkHref = ComponentProps<typeof NextLink>["href"];

type CardProps = {
  /** When set, the whole card becomes a link (internal paths only). */
  href?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  className?: string;
  children?: ReactNode;
};

/**
 * Surface card primitive. Neutral styling from tokens (surface, border, radius,
 * shadow). Pass `href` to make the entire card an internal link.
 */
export function Card({ href, eyebrow, title, className, children }: CardProps) {
  const classes = cn(
    "block rounded-lg border border-border bg-surface p-6 shadow-card",
    href && "transition-colors hover:bg-surface-muted",
    className,
  );

  const inner = (
    <>
      {eyebrow ? (
        <p className="mb-2 text-sm font-medium text-muted">{eyebrow}</p>
      ) : null}
      {title ? (
        <h3 className="text-heading font-semibold text-fg">{title}</h3>
      ) : null}
      {children ? (
        <div className={cn(title ? "mt-2" : undefined, "text-muted")}>{children}</div>
      ) : null}
    </>
  );

  if (href) {
    return (
      <NextLink href={href as unknown as NextLinkHref} className={classes}>
        {inner}
      </NextLink>
    );
  }

  return <div className={classes}>{inner}</div>;
}
