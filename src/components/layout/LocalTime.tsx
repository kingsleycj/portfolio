"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Lagos",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/**
 * The clock is external state, so it is read with `useSyncExternalStore`.
 *
 * `getSnapshot` must return a stable reference or React re-renders forever —
 * hence the cached string, refreshed by the interval rather than computed per
 * call. The server can't know the visitor's clock, so `getServerSnapshot`
 * returns null and the label simply isn't there until hydration; that keeps the
 * markup identical on both sides.
 */
let cached: string | null = null;

function subscribe(onChange: () => void) {
  const tick = () => {
    const next = formatter.format(new Date());
    if (next !== cached) {
      cached = next;
      onChange();
    }
  };
  tick();
  const id = window.setInterval(tick, 10_000);
  return () => window.clearInterval(id);
}

function getSnapshot() {
  return cached;
}

function getServerSnapshot(): string | null {
  return null;
}

/** Live local time in Lagos — a small sign that someone is actually there. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!time) return null;

  return (
    <span className="text-meta inline-flex items-center gap-2 text-ink-faint">
      <span
        aria-hidden="true"
        className="status-pip h-1.5 w-1.5 rounded-full bg-terracotta"
      />
      {/* No opacity modifier here: `ink-faint` is already tuned to sit just
          above the 4.5:1 floor, so knocking it back even to 70% puts 12px text
          under 3:1. Fade a colour token and you are re-picking it blind. */}
      <span>{time} in Lagos</span>
    </span>
  );
}
