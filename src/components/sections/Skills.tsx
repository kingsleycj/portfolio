import { NodeGraph } from "@/components/art/Marks";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/content/skills";
import { cn } from "@/lib/cn";

/**
 * Grouped by the kind of work rather than flattened into one tag cloud.
 * The AI Systems group is given a washed panel — it is the thread the rest of
 * the page is arguing for, so it should not look like just another column.
 */
export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative bg-paper-deep pb-28 pt-24 md:pb-36 md:pt-28"
    >
      <div className="wrap">
        <SectionHeading
          id="skills-heading"
          index="04"
          eyebrow="Toolkit"
          title="What I reach for"
          lead="Grouped by the kind of problem it solves rather than dumped in one pile. The AI column is the newest, and the one growing fastest."
        />

        <RevealGroup
          as="ul"
          className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 md:mt-20"
        >
          {skillGroups.map((group) => {
            const isAi = group.thread === "ai";

            return (
              <RevealItem
                as="li"
                key={group.title}
                className={cn(
                  "reveal-pop",
                  isAi &&
                    "-rotate-[0.5deg] rounded-[2.5rem_1rem_2.75rem_1.25rem] border border-verdigris/25 bg-verdigris-wash/70 p-8 md:row-span-2 md:-mt-6",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3
                    className={cn(
                      "text-h3",
                      isAi ? "text-verdigris" : "text-ink",
                    )}
                  >
                    {group.title}
                  </h3>
                  {isAi ? <NodeGraph className="shrink-0 text-verdigris" /> : null}
                </div>

                <p className="prose-narrow mt-3 text-sm text-ink-soft">
                  {group.blurb}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "text-meta rounded-full border px-3 py-1.5",
                        isAi
                          ? "border-verdigris/25 bg-paper/60 text-verdigris"
                          : "border-line bg-paper text-ink-soft",
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
