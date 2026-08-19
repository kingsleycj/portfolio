import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Staggers a reveal against its siblings. */
  delay?: number;
}

/**
 * Scroll reveal: a 14px rise and a fade, once, as the element enters view.
 *
 * A Server Component. The transition lives in CSS and the trigger comes from
 * the single page-wide `RevealObserver`, so wrapping a section in `<Reveal>`
 * adds no client JavaScript whatsoever.
 *
 * Reduced motion and the no-JavaScript case are both handled in CSS (see the
 * `.reveal` rules in globals.css and the <noscript> block in layout.tsx).
 */
export function Reveal({ children, className, delay }: RevealProps) {
  return (
    <div
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
