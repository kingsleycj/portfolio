import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary. Import from here rather than writing per-component
 * transitions, so the whole site moves with one hand.
 *
 * Invariant: variants only ever touch `opacity` and `transform`-backed values
 * (`x`, `y`, `scale`, `rotate`). Nothing here can shift layout.
 */

/** Matches --ease-out-soft in globals.css. */
export const easeOutSoft = [0.2, 0.65, 0.3, 1] as const;

export const revealTransition: Transition = {
  duration: 0.7,
  ease: easeOutSoft,
};

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
};

/** Parent for staggered groups — 60ms between children. */
export const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/**
 * Fire slightly before the element is fully on screen, and only once —
 * re-animating on every scroll pass reads as nervous rather than alive.
 */
export const viewportOnce = { once: true, margin: "-12% 0px -8% 0px" } as const;
