import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/cn";

type NextLinkHref = ComponentProps<typeof NextLink>["href"];

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-sans font-semibold transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent/90",
  secondary: "border border-accent text-fg hover:bg-accent/15",
  ghost: "text-fg hover:bg-fg/10",
  dark: "bg-pill text-white hover:bg-pill/85",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-sm",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Button / CTA primitive. Renders a real <button>, a next/link for internal
 * paths, or a plain anchor for external / protocol links.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "lg", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, external, onClick } = props;
    const isInternal = href.startsWith("/") || href.startsWith("#");

    if (isInternal && !external) {
      return (
        <NextLink
          href={href as unknown as NextLinkHref}
          className={classes}
          onClick={onClick}
        >
          {children}
        </NextLink>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    href: _href,
    ...buttonProps
  } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
