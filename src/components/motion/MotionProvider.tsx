"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Loads only the Motion features this site actually uses.
 *
 * The full `motion` component bundles layout projection and drag, neither of
 * which appears anywhere here. `domAnimation` covers animations, gestures and
 * in-view triggers — roughly a third of the JavaScript for exactly the same
 * behaviour. `strict` makes the saving enforceable: importing the heavyweight
 * `motion.*` component instead of `m.*` throws rather than silently undoing it.
 *
 * Children are server-rendered and passed through, so wrapping the page here
 * costs nothing in client bundle size.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
