"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The hero's 3D stage.
 *
 * Establishes a perspective and publishes the pointer position as `--px` /
 * `--py` (roughly -1..1) on itself. Every layer inside reads those same two
 * variables and multiplies them by its own depth, so one rAF-throttled listener
 * drives the whole parallax — no per-layer JavaScript, and no layout reads.
 *
 * Deliberately CSS 3D rather than WebGL: real depth, GPU-composited, and none
 * of the ~150KB a canvas renderer would put back on the main thread after all
 * the work spent taking it off.
 *
 * Off under reduced motion and on coarse pointers, where there is no hover to
 * respond to; the layers then simply sit at their resting depth.
 */
export function HeroStage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Decoration stops once the hero is off screen: a wireframe tumbling where
  // nobody can see it is pure cost, and it runs for the whole session.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => root.classList.toggle("hero-idle", !entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    let frame: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const tick = () => {
      // Ease toward the pointer rather than snapping — the lag is what makes
      // the layers feel like they have mass.
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      root.style.setProperty("--px", currentX.toFixed(4));
      root.style.setProperty("--py", currentY.toFixed(4));

      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = null;
      }
    };

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = (event.clientY / window.innerHeight) * 2 - 1;
      schedule();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={cn("hero-stage", className)}>
      {children}
    </div>
  );
}
