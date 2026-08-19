import { cn } from "@/lib/cn";

interface WaveDividerProps {
  /** CSS colour of the section *above* the divider — paints the strip behind the curve. */
  from: string;
  /** CSS colour of the section *below* the divider — fills the curve itself. */
  fill: string;
  /** Mirror the curve so consecutive dividers don't repeat the same silhouette. */
  flip?: boolean;
  /**
   * `soft` is a shallower band, for the low-contrast paper-to-paper-deep joins
   * where a full-height wave would draw more attention than the change deserves.
   */
  depth?: "full" | "soft";
  className?: string;
}

/**
 * A fluid section boundary in place of a straight edge.
 *
 * The strip is painted with the colour above and the path filled with the colour
 * below, so the two backgrounds meet on a curve with no seam. `preserveAspectRatio`
 * is off so the wave stretches to any viewport width without letterboxing.
 */
export function WaveDivider({
  from,
  fill,
  flip = false,
  depth = "full",
  className,
}: WaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none relative -mb-px w-full", className)}
      style={{ backgroundColor: from }}
    >
      <svg
        className={cn(
          "block w-full",
          depth === "soft" ? "h-9 md:h-14" : "h-16 md:h-24",
          flip && "-scale-x-100",
        )}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill={fill}
          d="M0,64 C220,120 380,8 620,36 C840,62 980,118 1180,96 C1290,84 1370,52 1440,28 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}
