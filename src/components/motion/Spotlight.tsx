"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  /** Accent for the glow — pass a CSS colour. */
  tint?: string;
}

/**
 * A soft light that follows the cursor across a case study.
 *
 * Position is written to CSS custom properties inside a rAF, so a fast pointer
 * can't queue more work than the compositor can drain. Nothing here animates
 * layout — the glow is a background gradient on an inert overlay.
 */
export function Spotlight({
  children,
  className,
  tint = "var(--color-terracotta)",
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const next = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse" || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      next.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const node = ref.current;
        if (!node) return;
        node.style.setProperty("--spot-x", `${next.current.x}px`);
        node.style.setProperty("--spot-y", `${next.current.y}px`);
      });
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setActive(true);
      }}
      onPointerLeave={() => setActive(false)}
      className={cn("relative", className)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(24rem 24rem at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, ${tint} 12%, transparent), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
