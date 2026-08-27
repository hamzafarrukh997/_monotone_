import type { AnchorHTMLAttributes, ComponentProps, ReactNode } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/cn";

type NextLinkHref = ComponentProps<typeof NextLink>["href"];

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

function isInternal(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}

/** App-wide link primitive: next/link for internal paths, plain anchor for external. */
export function Link({ href, className, children, ...rest }: LinkProps) {
  const classes = cn(
    "underline-offset-4 transition-colors hover:text-accent focus-visible:text-accent",
    className,
  );

  if (isInternal(href)) {
    return (
      <NextLink href={href as unknown as NextLinkHref} className={classes} {...rest}>
        {children}
      </NextLink>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
      {children}
    </a>
  );
}
