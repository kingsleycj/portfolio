import { cn } from "@/lib/cn";

/**
 * Four genuinely different silhouettes. Reusing one path across every boundary
 * — even mirrored — is the sort of repetition that reads as generated: the eye
 * notices the same curve arriving five times long before it can say why.
 */
const CURVES = [
  "M0,64 C220,120 380,8 620,36 C840,62 980,118 1180,96 C1290,84 1370,52 1440,28 L1440,120 L0,120 Z",
  "M0,38 C160,92 300,104 470,70 C640,36 760,12 940,42 C1120,72 1280,110 1440,76 L1440,120 L0,120 Z",
  "M0,88 C180,42 320,18 520,54 C700,86 820,114 1010,86 C1180,60 1320,24 1440,56 L1440,120 L0,120 Z",
  "M0,50 C120,16 280,68 430,90 C610,116 780,70 950,48 C1130,26 1300,66 1440,94 L1440,120 L0,120 Z",
] as const;

interface WaveDividerProps {
  /** CSS colour of the section *above* — paints the strip behind the curve. */
  from: string;
  /** CSS colour of the section *below* — fills the curve itself. */
  fill: string;
  /** Picks the silhouette. Give each boundary on the page a different one. */
  curve?: 0 | 1 | 2 | 3;
  flip?: boolean;
  /**
   * `soft` is a shallower band, for the low-contrast paper-to-paper-deep joins
   * where a full-height wave draws more attention than the change deserves.
   */
  depth?: "full" | "soft";
  className?: string;
}

/**
 * A fluid section boundary in place of a straight edge.
 *
 * The strip is painted with the colour above and the path filled with the
 * colour below, so the two backgrounds meet on a curve with no seam.
 * `preserveAspectRatio` is off so the wave stretches to any viewport width.
 */
export function WaveDivider({
  from,
  fill,
  curve = 0,
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
        <path fill={fill} d={CURVES[curve]} />
      </svg>
    </div>
  );
}
