"use client";

import { useEffect, useRef } from "react";

/**
 * Turns the experience spine into a scroll indicator.
 *
 * Renders the track and its fill, and lights each role's node as the fill
 * reaches it. Progress is read from the list's own box against the viewport
 * centre, so it advances while the section is being read rather than while it
 * is merely on screen.
 *
 * Nodes are marked by toggling `data-reached` on the `[data-node]` elements the
 * server already rendered — the colour change itself is CSS. Under reduced
 * motion the whole thing is skipped and the track renders complete, so the
 * timeline still reads as a timeline.
 */
export function TimelineProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const list = root?.parentElement;
    if (!root || !list) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.style.setProperty("--progress", "100%");
      list
        .querySelectorAll<HTMLElement>("[data-node]")
        .forEach((node) => node.setAttribute("data-reached", "true"));
      return;
    }

    const nodes = Array.from(list.querySelectorAll<HTMLElement>("[data-node]"));
    let frame: number | null = null;

    /**
     * Geometry is measured once and re-measured only on resize. Reading
     * `getBoundingClientRect` for the list and every node inside the scroll
     * handler forces a layout on each frame — cheap alone, but it is the sort
     * of thing that quietly costs blocking time on a long page.
     *
     * Node positions are taken relative to the list, never via `offsetTop`:
     * each node is absolutely positioned inside its own `relative` <li>, so
     * `offsetTop` reports a few pixels for all of them and they would all
     * light at once.
     */
    let listTop = 0;
    let listHeight = 1;
    let offsets: number[] = [];

    const measure = () => {
      const box = list.getBoundingClientRect();
      listTop = box.top + window.scrollY;
      listHeight = box.height || 1;
      offsets = nodes.map((node) => {
        const nodeBox = node.getBoundingClientRect();
        return nodeBox.top + nodeBox.height / 2 - box.top;
      });
    };

    const update = () => {
      frame = null;
      // Anchor on a line ~55% down the viewport: the fill then tracks roughly
      // where someone's eye is, not where the section edge happens to be.
      const anchor = window.scrollY + window.innerHeight * 0.55;
      const progress = Math.min(1, Math.max(0, (anchor - listTop) / listHeight));

      root.style.setProperty("--progress", `${progress * 100}%`);

      const filledPx = progress * listHeight;
      nodes.forEach((node, i) => {
        if (filledPx >= offsets[i]) node.setAttribute("data-reached", "true");
        else node.removeAttribute("data-reached");
      });
    };

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    const remeasure = () => {
      measure();
      schedule();
    };

    measure();
    update();
    // Glyph widths change when the display face swaps in, which moves the list.
    document.fonts?.ready.then(remeasure).catch(() => {});
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="timeline-track absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-line"
    >
      <span className="timeline-fill absolute left-0 top-0 w-full rounded-full bg-terracotta" />
    </div>
  );
}
