import type { AnchorHTMLAttributes, ComponentProps, ReactNode } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/cn";

/** The href type next/link expects (varies with the typedRoutes setting). */
type NextLinkHref = ComponentProps<typeof NextLink>["href"];

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

function isInternal(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}

/**
 * App-wide link primitive.
 *
 * - Internal paths use next/link (client-side nav + prefetch).
 * - External / protocol links (http, mailto, tel, wa.me) render a plain anchor
 *   with safe rel/target defaults.
 *
 * href is typed as `string` so pages can pass values from the `routes` helper
 * freely; the cast to next/link's stricter type is centralized here.
 */
export function Link({ href, className, children, ...rest }: LinkProps) {
  const base = cn(
    "text-fg underline-offset-4 hover:underline focus-visible:underline",
    className,
  );

  if (isInternal(href)) {
    return (
      <NextLink href={href as unknown as NextLinkHref} className={base} {...rest}>
        {children}
      </NextLink>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={base}
      {...rest}
    >
      {children}
    </a>
  );
}
