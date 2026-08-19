import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ElementKey = "div" | "ul" | "ol" | "li" | "p";

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /** Render as ul/ol when the children are list items. */
  as?: ElementKey;
}

/**
 * Staggers its `RevealItem` children as they enter view. Server Component —
 * the stagger is `nth-child` transition delays in CSS, not JavaScript.
 */
export function RevealGroup({
  children,
  className,
  as: Component = "div",
}: RevealGroupProps) {
  return (
    <Component className={cn("reveal-group", className)}>{children}</Component>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  as?: ElementKey;
}

export function RevealItem({
  children,
  className,
  as: Component = "div",
}: RevealItemProps) {
  return <Component className={cn("reveal", className)}>{children}</Component>;
}
