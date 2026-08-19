import { cn } from "@/lib/cn";

interface BlobFieldProps {
  className?: string;
  variant?: "hero" | "soft";
}

/**
 * Slow-drifting colour washes behind a section. Purely decorative: inert to
 * pointers, hidden from assistive tech, and animated by CSS keyframes
 * (`drift-a` / `drift-b`) that stop under `prefers-reduced-motion`.
 *
 * Blur is heavy to composite, so these are kept to two shapes per section and
 * promoted onto their own layer.
 */
export function BlobField({ className, variant = "hero" }: BlobFieldProps) {
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
          "drift-a absolute -left-[18%] -top-[22%] h-[60rem] w-[60rem] max-w-none blur-3xl will-change-transform",
          opacity,
        )}
        viewBox="0 0 200 200"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill="var(--color-terracotta-wash)"
          d="M46.8,-58.9C59.3,-49.2,67.1,-33.4,71.2,-16.6C75.3,0.2,75.6,18,68.3,32.1C61,46.2,46.1,56.6,30.2,63.2C14.3,69.8,-2.6,72.6,-19.4,69.1C-36.2,65.6,-52.9,55.8,-63.1,41.3C-73.3,26.8,-77,7.6,-73.4,-9.7C-69.8,-27,-58.9,-42.4,-45,-52.6C-31.1,-62.8,-14.2,-67.8,2.5,-70.8C19.2,-73.8,34.3,-68.6,46.8,-58.9Z"
          transform="translate(100 100)"
        />
      </svg>

      <svg
        className={cn(
          "drift-b absolute -right-[22%] top-[18%] h-[48rem] w-[48rem] max-w-none blur-3xl will-change-transform",
          opacity,
        )}
        viewBox="0 0 200 200"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill="var(--color-verdigris-wash)"
          d="M39.7,-52.6C51.4,-44.3,60.6,-32.1,66.2,-17.6C71.8,-3.1,73.8,13.7,68.1,27.6C62.4,41.5,49,52.5,34.2,59.9C19.4,67.3,3.2,71.1,-13.8,69.4C-30.8,67.7,-48.6,60.5,-59.4,47.5C-70.2,34.5,-74,15.7,-71.6,-1.5C-69.2,-18.7,-60.6,-34.3,-48.3,-42.9C-36,-51.5,-20,-53.1,-4.3,-47.9C11.4,-42.7,28,-60.9,39.7,-52.6Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
}
