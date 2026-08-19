"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

interface KineticNameProps {
  /** Each string renders as its own line. */
  lines: string[];
  className?: string;
  /** Extra classes per line, positionally. Plain data — this crosses the
      server/client boundary, so it cannot be a function. */
  lineClassNames?: (string | undefined)[];
}

/** How far a letter lifts at the cursor's exact position, in px. */
const MAX_LIFT = 16;
/** Falloff radius. Wider than it sounds — a narrow one feels twitchy. */
const RADIUS = 190;

/**
 * The name reacts to the cursor: letters near it lift and warm, and the effect
 * falls off smoothly either side, so sweeping across the masthead sends a wave
 * through it.
 *
 * Only `transform` and `color` are touched. The tempting alternatives —
 * animating the variable font's `wdth` axis, or letter-spacing — reflow the
 * text every frame, which would both jank and put CLS at risk.
 *
 * Letters are split into spans for the effect, so the heading carries a single
 * `aria-label` and the spans are hidden: a screen reader hears the name, not
 * fourteen separate characters.
 */
export function KineticName({
  lines,
  className,
  lineClassNames,
}: KineticNameProps) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    if (reduced.matches || !fine.matches) return;

    const letters = Array.from(
      root.querySelectorAll<HTMLElement>("[data-letter]"),
    );
    if (letters.length === 0) return;

    let centres: number[] = [];
    let frame: number | null = null;
    let pointerX = 0;
    let active = false;

    const measure = () => {
      const rootBox = root.getBoundingClientRect();
      centres = letters.map((el) => {
        const box = el.getBoundingClientRect();
        return box.left + box.width / 2 - rootBox.left;
      });
    };

    const paint = () => {
      frame = null;
      letters.forEach((el, i) => {
        if (!active) {
          el.style.transform = "";
          el.style.color = "";
          return;
        }
        const distance = Math.abs(centres[i] - pointerX);
        const strength = Math.max(0, 1 - distance / RADIUS);
        // Smoothstep, so the crest is rounded rather than conical.
        const eased = strength * strength * (3 - 2 * strength);
        el.style.transform = `translate3d(0, ${-MAX_LIFT * eased}px, 0)`;
        el.style.color =
          eased > 0.08
            ? `color-mix(in oklab, var(--color-terracotta) ${Math.round(eased * 92)}%, var(--color-ink))`
            : "";
      });
    };

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(paint);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const box = root.getBoundingClientRect();
      pointerX = event.clientX - box.left;
      // Stay responsive a little beyond the text itself.
      active = event.clientY > box.top - 140 && event.clientY < box.bottom + 140;
      schedule();
    };

    const onLeave = () => {
      active = false;
      schedule();
    };

    // Measure after fonts settle: glyph widths change when the display face
    // swaps in, and stale centres would put the wave in the wrong place.
    measure();
    document.fonts?.ready.then(measure).catch(() => {});

    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [lines]);

  return (
    <span ref={rootRef} className={cn("block", className)}>
      {lines.map((line, lineIdx) => (
        <span
          key={line}
          aria-hidden="true"
          className={cn("block whitespace-nowrap", lineClassNames?.[lineIdx])}
        >
          {line.split("").map((char, i) => (
            <span
              key={`${char}-${i}`}
              data-letter
              className="inline-block will-change-transform"
              style={{
                transition:
                  "transform 260ms var(--ease-spring), color 260ms linear",
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
