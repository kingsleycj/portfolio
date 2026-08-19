import { cn } from "@/lib/cn";

interface MarkProps {
  className?: string;
}

/**
 * Hand-drawn line-art accents, in place of a stock icon set.
 * All decorative — hidden from assistive tech and inert to pointers.
 *
 * Several are drawn with two overlapping passes at different opacities and
 * slightly different paths, the way a pen doubles back over a line. A single
 * mathematically clean stroke is the giveaway: real pen marks are never
 * symmetrical and never land twice in the same place.
 */

/** A six-point spark. Marks the "currently" signal and standout moments. */
export function Sparkle({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      className={cn("h-4 w-4", className)}
      focusable="false"
      aria-hidden="true"
    >
      <path d="M12 2.5c.4 4.6 1.6 6.4 6.2 7.1-4.6.7-5.8 2.5-6.2 7.1-.4-4.6-1.6-6.4-6.2-7.1 4.6-.7 5.8-2.5 6.2-7.1Z" />
      <path d="M18.4 15.2c.2 2.3.8 3.2 3.1 3.6-2.3.4-2.9 1.3-3.1 3.6-.2-2.3-.8-3.2-3.1-3.6 2.3-.4 2.9-1.3 3.1-3.6Z" />
    </svg>
  );
}

/** An off-hand arrow. Points at the primary CTA and section jumps. */
export function ArrowMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      focusable="false"
      aria-hidden="true"
    >
      <path d="M4.5 12.4c5.8.4 11.6.2 15.2-.4" />
      <path d="M14.8 7.2c1.8 2.4 3.4 4 4.9 4.8-1.8.9-3.4 2.4-4.6 4.6" />
      {/* Faint second pass on the shaft — the pen going back over it. */}
      <path d="M5.4 13.2c5.4-.1 10.8-.3 14.1-.7" strokeWidth={0.8} opacity={0.4} />
    </svg>
  );
}

/**
 * A small connected graph. The motif for the AI thread — deliberately drawn
 * rather than picked from an icon pack, and never used for software-only work.
 */
export function NodeGraph({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 64 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      className={cn("h-12 w-16", className)}
      focusable="false"
      aria-hidden="true"
    >
      {/* Four nodes around one hub. Kept sparse on purpose — more edges turn
          into a scribble at the size this actually renders. */}
      <path d="M13 13 32 25M32 25 53 11M32 25 26 40M13 13 26 40" />
      <circle cx="32" cy="25" r="5" fill="currentColor" fillOpacity="0.22" />
      <circle cx="13" cy="13" r="3.6" fill="currentColor" fillOpacity="0.14" />
      <circle cx="53" cy="11" r="3.2" fill="currentColor" fillOpacity="0.14" />
      <circle cx="26" cy="40" r="3.4" fill="currentColor" fillOpacity="0.14" />
    </svg>
  );
}

/** A rough rule, for closing a section without a hard 1px line. */
export function InkRule({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 240 8"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      className={cn("h-2 w-full", className)}
      focusable="false"
      aria-hidden="true"
    >
      {/* Two passes, neither quite on top of the other. */}
      <path d="M2 5.2C46 2.4 92 6.4 136 3.6c34-2.2 68 1.6 102 1.2" strokeWidth={1.5} />
      <path
        d="M5 4.4C52 6.1 88 2.9 132 5.4c36 2 70-1.4 104 .4"
        strokeWidth={0.9}
        opacity={0.45}
      />
    </svg>
  );
}
