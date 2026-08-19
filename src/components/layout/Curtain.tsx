/**
 * The opening sequence.
 *
 * A hand-drawn node graph assembles — points appear, edges draw between them,
 * the hub lands — while three words step through underneath. Then the panel
 * lifts away on the same curve the sections meet on further down the page.
 *
 * Deliberately *not* a loading gate. The page is fully rendered underneath from
 * the first frame; this only covers it. Consequences worth keeping:
 *
 * - No JavaScript is involved, so it cannot fail to dismiss and strand the page.
 * - `pointer-events: none` lets an impatient visitor click straight through.
 * - It contributes no LCP candidate (an inline `<svg>` path is not one), and
 *   Chrome's LCP ignores occlusion — so covering the hero does not delay the
 *   hero's measurement.
 * - Under `prefers-reduced-motion` it is removed outright, not shortened.
 *
 * It does cost Speed Index, which measures visual completeness over time; any
 * covering overlay does. That is the trade for having an opening at all.
 */

/** Graph geometry. Edges are drawn first-to-last, nodes pop along the way. */
const EDGES = [
  "M22 26 62 44",
  "M62 44 104 20",
  "M62 44 96 74",
  "M62 44 30 68",
  "M22 26 30 68",
  "M104 20 138 48",
  "M96 74 138 48",
];

const NODES = [
  { cx: 22, cy: 26, r: 4 },
  { cx: 104, cy: 20, r: 3.4 },
  { cx: 30, cy: 68, r: 3.4 },
  { cx: 96, cy: 74, r: 3.8 },
  { cx: 138, cy: 48, r: 3 },
];

const WORDS = ["Backends", "Payment rails", "AI systems"];

export function Curtain() {
  return (
    <div
      aria-hidden="true"
      className="curtain pointer-events-none fixed inset-0 z-[60]"
    >
      <div className="relative h-full w-full bg-paper">
        <div className="loader-fade absolute left-1/2 top-1/2 flex w-[min(20rem,80vw)] -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <svg
            viewBox="0 0 160 94"
            className="w-full max-w-[13rem] overflow-visible"
            fill="none"
            focusable="false"
            aria-hidden="true"
          >
            {EDGES.map((d, i) => (
              <path
                key={d}
                d={d}
                className="loader-edge"
                stroke="var(--color-terracotta)"
                strokeWidth={1.4}
                strokeLinecap="round"
                opacity={0.55}
                style={{ animationDelay: `${i * 55}ms` }}
              />
            ))}

            {NODES.map((node, i) => (
              <circle
                key={`${node.cx}-${node.cy}`}
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                className="loader-node"
                fill="var(--color-terracotta)"
                style={{ animationDelay: `${i * 70}ms` }}
              />
            ))}

            {/* The hub lands last and larger — the graph resolving into a centre. */}
            <circle
              cx={62}
              cy={44}
              r={8}
              className="loader-hub"
              fill="var(--color-marigold)"
            />
            <circle
              cx={62}
              cy={44}
              r={8}
              className="loader-hub"
              fill="none"
              stroke="var(--color-terracotta-deep)"
              strokeWidth={1.6}
            />
          </svg>

          {/* Fixed-height box with the words stacked inside it, so stepping
              through them cannot reflow anything. */}
          <div className="relative mt-8 h-6 w-full">
            {WORDS.map((word, i) => (
              <span
                key={word}
                className="text-meta loader-word absolute inset-x-0 text-center text-ink-faint"
                style={{ animationDelay: `${i * 480}ms` }}
              >
                {word}
              </span>
            ))}
          </div>

          <span className="mt-5 block h-px w-full overflow-hidden bg-line">
            <span className="loader-sweep block h-full w-full bg-terracotta" />
          </span>
        </div>

        {/* Hangs BELOW the panel, filled in the panel's own colour, so the
            curtain's leading edge is a curve rather than a straight line.
            Inside the panel it would be invisible: same fill, same box. */}
        <svg
          className="absolute left-0 top-full -mt-px h-16 w-full md:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          focusable="false"
          aria-hidden="true"
        >
          <path
            fill="var(--color-paper)"
            d="M0,64 C220,120 380,8 620,36 C840,62 980,118 1180,96 C1290,84 1370,52 1440,28 L1440,120 L0,120 Z"
            transform="translate(0,120) scale(1,-1)"
          />
        </svg>
      </div>
    </div>
  );
}
