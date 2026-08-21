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

    const render = () => {
      // The ring eases toward the pointer while the dot pins to it exactly —
      // the gap between them is what gives the cursor a sense of weight.
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      if (Math.abs(targetX - ringX) > 0.1 || Math.abs(targetY - ringY) > 0.1) {
        frame = requestAnimationFrame(render);
      } else {
        frame = null;
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

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
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
