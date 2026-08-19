import { cn } from "@/lib/cn";
import type { Thread } from "@/content/types";

const THREAD_LABEL: Record<Thread, string> = {
  software: "Software",
  ai: "AI/ML",
};

interface ThreadTagProps {
  thread: Thread;
  className?: string;
  /** Use on the espresso band, where the paper-tuned colours lose contrast. */
  onDark?: boolean;
}

/**
 * The dual-positioning marker. Terracotta for software engineering, verdigris
 * for AI systems.
 *
 * The label is always spelled out, so the distinction never depends on colour
 * alone — it survives greyscale, colour-blindness and a printed page.
 */
export function ThreadTag({ thread, className, onDark = false }: ThreadTagProps) {
  const isAi = thread === "ai";

  return (
    <span
      className={cn(
        "text-meta inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        onDark
          ? isAi
            ? "border-verdigris-light/40 text-verdigris-light"
            : "border-terracotta-light/40 text-terracotta-light"
          : isAi
            ? "border-verdigris/30 bg-verdigris-wash text-verdigris"
            : "border-terracotta/30 bg-terracotta-wash text-terracotta-deep",
        className,
      )}
    >
      {/* Shape differs too, giving a third signal after label and colour:
          a dot for AI work, a diamond for software. */}
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 bg-current",
          isAi ? "rounded-full" : "rotate-45 rounded-[1px]",
        )}
      />
      {THREAD_LABEL[thread]}
    </span>
  );
}
