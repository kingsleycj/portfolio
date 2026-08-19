import { cn } from "@/lib/cn";

/**
 * Four blob silhouettes. The same two shapes behind every section is one of the
 * quieter tells that a page was assembled rather than composed — the washes are
 * blurred almost past recognition, but the eye still clocks the repetition.
 */
const SHAPES = [
  "M46.8,-58.9C59.3,-49.2,67.1,-33.4,71.2,-16.6C75.3,0.2,75.6,18,68.3,32.1C61,46.2,46.1,56.6,30.2,63.2C14.3,69.8,-2.6,72.6,-19.4,69.1C-36.2,65.6,-52.9,55.8,-63.1,41.3C-73.3,26.8,-77,7.6,-73.4,-9.7C-69.8,-27,-58.9,-42.4,-45,-52.6C-31.1,-62.8,-14.2,-67.8,2.5,-70.8C19.2,-73.8,34.3,-68.6,46.8,-58.9Z",
  "M39.7,-52.6C51.4,-44.3,60.6,-32.1,66.2,-17.6C71.8,-3.1,73.8,13.7,68.1,27.6C62.4,41.5,49,52.5,34.2,59.9C19.4,67.3,3.2,71.1,-13.8,69.4C-30.8,67.7,-48.6,60.5,-59.4,47.5C-70.2,34.5,-74,15.7,-71.6,-1.5C-69.2,-18.7,-60.6,-34.3,-48.3,-42.9C-36,-51.5,-20,-53.1,-4.3,-47.9C11.4,-42.7,28,-60.9,39.7,-52.6Z",
  "M54.2,-46.3C67.9,-33.1,74.6,-11.4,71.1,7.9C67.6,27.2,53.9,44.1,36.7,54.8C19.5,65.5,-1.2,70,-20.9,65.4C-40.6,60.8,-59.3,47.1,-67.4,28.6C-75.5,10.1,-73,-13.2,-62.2,-30.4C-51.4,-47.6,-32.3,-58.7,-13.2,-61.9C5.9,-65.1,40.5,-59.5,54.2,-46.3Z",
  "M33.8,-45.9C46.1,-36.8,60.2,-29.7,66.8,-18.2C73.4,-6.7,72.5,9.2,65.6,21.6C58.7,34,45.8,42.9,32.4,52.6C19,62.3,5.1,72.8,-9.8,73.2C-24.7,73.6,-40.6,64,-53.9,51.1C-67.2,38.2,-77.9,22,-77.5,5.9C-77.1,-10.2,-65.6,-26.2,-52.3,-36.2C-39,-46.2,-23.9,-50.2,-10.4,-49.3C3.1,-48.4,21.5,-55,33.8,-45.9Z",
] as const;

interface BlobFieldProps {
  className?: string;
  variant?: "hero" | "soft";
  /** Pair of silhouettes to use. Vary it between sections. */
  shapes?: [0 | 1 | 2 | 3, 0 | 1 | 2 | 3];
  /** Nudges the washes so they do not sit in the same corners every time. */
  offset?: boolean;
}

/**
 * Slow-drifting colour washes behind a section. Purely decorative: inert to
 * pointers, hidden from assistive tech, and animated by CSS keyframes
 * (`drift-a` / `drift-b`) that stop under `prefers-reduced-motion`.
 *
 * Blur is heavy to composite, so these are kept to two shapes per section and
 * promoted onto their own layer.
 */
export function BlobField({
  className,
  variant = "hero",
  shapes = [0, 1],
  offset = false,
}: BlobFieldProps) {
  const opacity = variant === "hero" ? "opacity-70" : "opacity-45";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "blob-field pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <svg
        className={cn(
          "drift-a absolute h-[60rem] w-[60rem] max-w-none blur-3xl will-change-transform",
          offset ? "-right-[14%] -top-[30%]" : "-left-[18%] -top-[22%]",
          opacity,
        )}
        viewBox="0 0 200 200"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill="var(--color-terracotta-wash)"
          d={SHAPES[shapes[0]]}
          transform="translate(100 100)"
        />
      </svg>

      <svg
        className={cn(
          "drift-b absolute h-[48rem] w-[48rem] max-w-none blur-3xl will-change-transform",
          offset ? "-left-[26%] top-[24%]" : "-right-[22%] top-[18%]",
          opacity,
        )}
        viewBox="0 0 200 200"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill="var(--color-verdigris-wash)"
          d={SHAPES[shapes[1]]}
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
}
