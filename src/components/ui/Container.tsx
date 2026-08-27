import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/**
 * Centered, max-width page gutter. Width comes from the `--container-page`
 * token; horizontal padding matches the design's edge gutter.
 */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-page px-6 sm:px-8 lg:px-20", className)}>
      {children}
    </Tag>
  );
}
