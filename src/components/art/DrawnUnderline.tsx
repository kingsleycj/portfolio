"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { easeOutSoft, viewportOnce } from "@/lib/motion";

interface DrawnUnderlineProps {
  children: ReactNode;
  /** Stroke colour — defaults to the software-thread accent. */
  color?: string;
  className?: string;
  delay?: number;
}

/**
 * A hand-drawn stroke that draws itself under a phrase as it scrolls into view.
 *
 * Used deliberately sparingly — two or three phrases across the whole page.
 * Any more and it stops reading as emphasis.
 *
 * Reduced motion is handled in CSS (`.drawn-underline` in globals.css), which
 * overrides the inline dash values Motion writes for `pathLength` so the stroke
 * simply renders complete.
 */
export function DrawnUnderline({
  children,
  color = "var(--color-terracotta)",
  className,
  delay = 0.15,
}: DrawnUnderlineProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      {children}
      <svg
        className="drawn-underline pointer-events-none absolute -bottom-1.5 left-0 h-[0.42em] w-full overflow-visible"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        focusable="false"
        aria-hidden="true"
      >
        <m.path
          d="M2,8.5 C38,3.4 74,10.2 110,6.1 C140,2.7 170,7.8 198,4.2"
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOutSoft, delay }}
        />
        {/* A lighter second pass, offset and drawn a beat later — the way a
            hand goes back over an underline rather than landing it once. */}
        <m.path
          d="M6,10.4 C40,6.6 78,11.6 112,8.4 C142,5.6 168,9.8 194,7.2"
          fill="none"
          stroke={color}
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.5}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOutSoft, delay: delay + 0.18 }}
        />
      </svg>
    </span>
  );
}
