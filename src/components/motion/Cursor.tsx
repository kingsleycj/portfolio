"use client";

import { useEffect, useRef } from "react";

/**
 * A custom cursor: a dot that tracks the pointer exactly, and a ring that
 * follows with lag and swells over anything interactive.
 *
 * Distinct from the other cursor work on the page — `Spotlight` lights a card,
 * `MagneticButton` pulls one element, `KineticName` bends the masthead — this
 * is the pointer itself, and it applies everywhere.
 *
 * Elements can name themselves with `data-cursor="Open"` to put a word inside
 * the ring; anything else interactive just gets the swell.
 *
 * Notes that matter:
 *
 * - One rAF loop, transform-only, and state is written to `classList` rather
 *   than React state, so moving the mouse costs no re-renders.
 * - Scrolling deforms the ring: it stretches along the axis of travel and is
 *   tugged slightly in the direction you are going, then eases back to a circle
 *   when you stop. The amount comes from scroll velocity, so a flick reads
 *   differently from a slow drag.
 * - `mix-blend-mode: difference` means the ring inverts whatever is behind it,
 *   so it stays visible on paper, on the espresso band and over the portrait
 *   without needing to know which.
 * - The native cursor is only hidden once this is confirmed running. Touch
 *   devices, reduced-motion readers and anyone without JavaScript keep the
 *   system cursor, which is the one some people have deliberately configured.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!ring || !dot || !label) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let frame: number | null = null;
    let visible = false;

    /** Scroll velocity in px/frame, smoothed and decayed toward rest. */
    let lastScrollY = window.scrollY;
    let velocity = 0;

    /** Above this speed the deformation is at full strength. */
    const MAX_SPEED = 55;

    const render = () => {
      // The ring eases toward the pointer while the dot pins to it exactly —
      // the gap between them is what gives the cursor a sense of weight.
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      // Sample scroll here rather than in the listener: one reading per frame
      // is what makes this a velocity instead of a pile of deltas.
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;
      // Ease toward the new delta, then bleed off, so the ring keeps a little
      // momentum after the scroll stops rather than snapping back.
      velocity += (delta - velocity) * 0.25;
      velocity *= 0.9;

      const strength = Math.min(Math.abs(velocity) / MAX_SPEED, 1);
      // Squash across, stretch along — volume roughly preserved, which is what
      // makes it read as a deformation rather than a resize.
      const scaleY = 1 + strength * 0.45;
      const scaleX = 1 - strength * 0.24;
      // Tugged in the direction of travel.
      const drag = Math.sign(velocity) * strength * 12;

      const deform =
        strength > 0.01 && !ring.classList.contains("has-label")
          ? ` scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`
          : "";

      ring.style.transform = `translate3d(${ringX}px, ${ringY + drag}px, 0) translate(-50%, -50%)${deform}`;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      const settled =
        Math.abs(targetX - ringX) <= 0.1 &&
        Math.abs(targetY - ringY) <= 0.1 &&
        Math.abs(velocity) <= 0.05;

      if (settled) {
        frame = null;
      } else {
        frame = requestAnimationFrame(render);
      }
    };

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;

      if (!visible) {
        visible = true;
        ring.classList.add("is-visible");
        dot.classList.add("is-visible");
      }
      schedule();
    };

    // Delegated, so nothing has to register per element and content added later
    // still works.
    const onOver = (event: PointerEvent) => {
      const el = (event.target as Element | null)?.closest?.(
        "a, button, [data-cursor]",
      );
      if (!el) return;
      const word = el.getAttribute("data-cursor");
      label.textContent = word ?? "";
      ring.classList.add("is-active");
      ring.classList.toggle("has-label", Boolean(word));
      // Inside a solid disc the dot is just noise.
      dot.classList.toggle("is-hidden", Boolean(word));
    };

    const onOut = (event: PointerEvent) => {
      const el = (event.target as Element | null)?.closest?.(
        "a, button, [data-cursor]",
      );
      if (!el) return;
      // Ignore moves between children of the same interactive element.
      const next = event.relatedTarget as Element | null;
      if (next?.closest?.("a, button, [data-cursor]") === el) return;
      ring.classList.remove("is-active", "has-label");
      dot.classList.remove("is-hidden");
      label.textContent = "";
    };

    const onLeave = () => {
      visible = false;
      ring.classList.remove("is-visible", "is-active", "has-label");
      dot.classList.remove("is-visible", "is-hidden");
    };

    // The listener only wakes the loop; the velocity itself is sampled there.
    const onScroll = () => {
      if (!visible) return;
      schedule();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerleave", onLeave);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true">
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
