import { cn } from "@/lib/cn";

interface RotatorProps {
  words: readonly string[];
  className?: string;
}

/**
 * Cycles through a list of phrases.
 *
 * Pure CSS — the words are stacked absolutely inside a fixed-height box, so
 * stepping through them can never reflow the line beneath. A Server Component:
 * no JavaScript ships for this at all.
 *
 * Under `prefers-reduced-motion` the stack pins to the first phrase and reads
 * as an ordinary static line (see `.rotator-word` in globals.css).
 */
/**
 * Seconds for one full pass through the list. At four phrases that is four
 * seconds each, of which ~2.9s is fully opaque — enough to read a short phrase
 * without hurrying. Raise this to slow the rotation; the per-word offsets and
 * the CSS cycle both derive from it.
 */
const CYCLE_SECONDS = 16;

export function Rotator({ words, className }: RotatorProps) {
  return (
    <span
      className={cn("relative block h-[1.3em] w-full", className)}
      style={{ "--rotator-cycle": `${CYCLE_SECONDS}s` } as React.CSSProperties}
    >
      {/* The full list stays in the accessible tree as one readable phrase,
          rather than a screen reader announcing a word that is mid-fade. */}
      <span className="sr-only">{words.join(", or ")}</span>

      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden="true"
          className="rotator-word absolute left-0 top-0 whitespace-nowrap text-terracotta-deep"
          style={{
            animationDelay: `${(i * CYCLE_SECONDS) / words.length}s`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
