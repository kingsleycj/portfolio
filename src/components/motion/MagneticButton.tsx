"use client";

import { useReducedMotion, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { useCallback, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

interface MagneticButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
  /** Maximum pull in px. Kept small — this should register as weight, not as a toy. */
  strength?: number;
  download?: boolean;
  external?: boolean;
  /** Word shown inside the custom cursor's ring on hover. */
  cursorLabel?: string;
}

/**
 * A link that leans toward the cursor while it's nearby.
 *
 * Disabled for reduced-motion readers and for coarse pointers, where there is
 * no hover state to respond to and the transform would only fight the tap.
 */
export function MagneticButton({
  children,
  href,
  className,
  strength = 8,
  download = false,
  external = false,
  cursorLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();

  const spring = { stiffness: 260, damping: 20, mass: 0.4 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLAnchorElement>) => {
      if (reducedMotion || event.pointerType !== "mouse" || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);

      // Normalise against the element's own size so wide buttons don't pull harder.
      x.set((offsetX / (rect.width / 2)) * strength);
      y.set((offsetY / (rect.height / 2)) * strength);
    },
    [reducedMotion, strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <m.a
      ref={ref}
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      data-cursor={cursorLabel}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      className={cn("inline-flex items-center gap-2", className)}
    >
      {children}
    </m.a>
  );
}
