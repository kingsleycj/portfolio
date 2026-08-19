import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";

interface SectionHeadingProps {
  /** Mono index, e.g. "02". Decorative — read as part of the eyebrow. */
  index: string;
  eyebrow: string;
  title: ReactNode;
  /** Ties the heading to its `<section aria-labelledby>`. */
  id: string;
  lead?: ReactNode;
  className?: string;
  onDark?: boolean;
}

/** Shared section opener, so every section starts on the same rhythm. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  id,
  lead,
  className,
  onDark = false,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p
        className={cn(
          "text-meta flex items-center gap-3",
          onDark ? "text-terracotta-light" : "text-terracotta-deep",
        )}
      >
        <span aria-hidden="true">{index}</span>
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-8",
            onDark ? "bg-terracotta-light/40" : "bg-terracotta/40",
          )}
        />
        {eyebrow}
      </p>

      <h2
        id={id}
        className={cn(
          "text-h2 mt-5",
          onDark ? "text-on-espresso" : "text-ink",
        )}
      >
        {title}
      </h2>

      {lead ? (
        <p
          className={cn(
            "text-lead mt-5 prose-narrow",
            onDark && "text-on-espresso-soft",
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
