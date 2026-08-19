import { cn } from "@/lib/cn";

/**
 * The decorative depth layers behind and around the hero.
 *
 * All of it is inert and hidden from assistive tech: a receding dot floor and a
 * slowly tumbling wireframe prism. Each layer sets its own `--depth`, and
 * `.parallax` turns that plus the stage's pointer variables into a translate —
 * so the layers separate as the cursor moves, which is what sells the space as
 * three-dimensional.
 */

export function HeroDepth({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* Dot floor, laid flat and receding toward the horizon. */}
      <div className="hero-floor parallax" style={{ "--depth": 8 } as React.CSSProperties}>
        <div className="hero-floor-plane" />
      </div>

      {/* Wireframe prism, tucked into a corner the content never reaches.
          Just the one: each is a perspective context with six continuously
          transformed faces, and two of them measurably cost style and layout
          time for decoration most people never look straight at. */}
      <div
        className="parallax absolute right-[2%] top-[24%] hidden xl:block"
        style={{ "--depth": 56 } as React.CSSProperties}
      >
        <div className="prism">
          {["front", "back", "right", "left", "top", "bottom"].map((face) => (
            <span key={face} className={`prism-face prism-${face}`} />
          ))}
        </div>
      </div>

    </div>
  );
}
