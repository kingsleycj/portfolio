import { skillGroups } from "@/content/skills";

/**
 * A slow ticker between the hero and the page proper.
 *
 * Decorative: every term also appears in the Skills section, so this is hidden
 * from assistive tech rather than read out twice. The track holds the list
 * twice and translates exactly -50%, which is what makes the loop seamless —
 * keep both halves identical if you edit it.
 *
 * Under `prefers-reduced-motion` the animation simply never applies and the
 * strip sits still.
 */
export function Marquee() {
  const terms = skillGroups.flatMap((group) => group.items.slice(0, 5));

  return (
    <div
      aria-hidden="true"
      className="relative flex overflow-hidden border-y border-line bg-paper-deep/50 py-4"
    >
      <div className="marquee-track flex shrink-0">
        {[0, 1].map((half) => (
          <ul key={half} className="flex shrink-0 items-center">
            {terms.map((term) => (
              <li
                key={`${half}-${term}`}
                className="text-meta flex shrink-0 items-center gap-6 px-6 text-ink-faint"
              >
                {term}
                <span className="h-1 w-1 rotate-45 rounded-[1px] bg-terracotta/60" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
