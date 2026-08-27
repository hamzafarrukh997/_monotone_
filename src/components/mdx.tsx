import type { ComponentPropsWithoutRef } from "react";
import { Link } from "@/components/ui/Link";

/**
 * Element map for MDX blog content. Neutral, token-driven styling applied to
 * raw markdown elements (no typography plugin). Extend as posts need it.
 */
export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 text-heading font-semibold text-fg" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 text-lg font-semibold text-fg" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-4 leading-relaxed text-fg/90" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-fg/90" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-fg/90" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-6 border-l-2 border-border pl-4 text-muted italic"
      {...props}
    />
  ),
  a: ({ href = "#", ...props }: ComponentPropsWithoutRef<"a">) => (
    <Link href={href}>{props.children}</Link>
  ),
};
