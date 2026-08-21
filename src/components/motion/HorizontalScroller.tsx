"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A horizontally scrolling rail with a progress bar.
 *
 * Native `overflow-x` rather than scroll-jacking: trackpad swipes, shift+wheel,
 * touch drags, arrow keys and the scrollbar all work without being
 * reimplemented, and nothing fights the page's vertical scroll.
 *
 * The container is focusable and labelled because a scrollable region has to be
 * reachable by keyboard — otherwise anyone not using a pointer simply cannot
 * read past the first panel.
 */
export function HorizontalScroller({
  children,
  label,
  className,
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const bar = barRef.current;
    if (!rail || !bar) return;

    let frame: number | null = null;

    const update = () => {
      frame = null;
      const travel = rail.scrollWidth - rail.clientWidth;
      const progress = travel > 0 ? rail.scrollLeft / travel : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress)).toFixed(4)})`;
    };

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    rail.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      rail.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={className}>
      <div
        ref={railRef}
        tabIndex={0}
        role="region"
        aria-label={label}
        className="hscroll"
      >
        {children}
      </div>

      <div aria-hidden="true" className="wrap mt-10">
        <span className="block h-px w-full overflow-hidden bg-line">
          <span
            ref={barRef}
            className="block h-full w-full origin-left scale-x-0 bg-terracotta"
          />
        </span>
      </div>
    </div>
  );
}
