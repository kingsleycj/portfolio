"use client";

import { useEffect } from "react";

/**
 * The entire scroll-reveal engine: one observer for the whole page.
 *
 * Mounted once in the root layout. Everything it drives (`Reveal`,
 * `RevealGroup`, `RevealItem`) is a plain Server Component that ships no
 * JavaScript of its own — this is the only client code involved.
 *
 * Elements are unobserved as soon as they appear, so a reveal fires once and
 * the observer drains to nothing as the reader scrolls.
 */
export function RevealObserver() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    if (nodes.length === 0) return;

    // No IntersectionObserver (very old browsers): show everything rather than
    // leaving the page blank below the fold.
    if (typeof IntersectionObserver === "undefined") {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      // Fire slightly before the element is fully on screen.
      { rootMargin: "-12% 0px -8% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}
