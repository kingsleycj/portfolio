import { Sparkle } from "@/components/art/Marks";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ThreadTag } from "@/components/ui/ThreadTag";
import { experience } from "@/content/experience";

/**
 * The timeline. An ordered list on a dashed spine — semantically a sequence,
 * which is what it is, rather than a stack of cards.
 */
export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative bg-paper-deep py-28 md:py-36"
    >
      <div className="wrap">
        <SectionHeading
          id="experience-heading"
          index="02"
          eyebrow="The road so far"
          title="Not a straight line"
          lead="Client work, then smart contracts, then healthcare, then AI infrastructure. I did not plan it in that order, and I would not swap it."
        />

        <RevealGroup
          as="ol"
          className="mt-16 space-y-14 border-l border-dashed border-line-strong pl-8 md:mt-20 md:pl-12"
        >
          {experience.map((role) => (
            <RevealItem as="li" key={`${role.company}-${role.period}`} className="relative">
              {/* Spine node. Filled for current roles, hollow for past ones. */}
              <span
                aria-hidden="true"
                className={
                  role.current
                    ? "absolute -left-[2.35rem] top-2 h-3 w-3 rounded-full bg-terracotta ring-4 ring-paper-deep md:-left-[3.35rem]"
                    : "absolute -left-[2.35rem] top-2 h-3 w-3 rounded-full border-2 border-line-strong bg-paper-deep md:-left-[3.35rem]"
                }
              />

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <p className="text-meta text-ink-faint">{role.period}</p>
                {role.current ? (
                  <span className="text-meta inline-flex items-center gap-1.5 rounded-full bg-terracotta-wash px-2.5 py-1 text-terracotta-deep">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-terracotta"
                    />
                    Current
                  </span>
                ) : null}
              </div>

              <h3 className="text-h3 mt-3 text-ink">{role.role}</h3>
              <p className="mt-1 text-ink-soft">
                {role.company} · <span className="text-ink-faint">{role.location}</span>
              </p>

              <ul className="mt-2 flex flex-wrap gap-2">
                {role.threads.map((thread) => (
                  <li key={thread}>
                    <ThreadTag thread={thread} />
                  </li>
                ))}
              </ul>

              <ul className="prose-narrow mt-5 space-y-3">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-ink-soft">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-line-strong"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {role.highlight ? (
                <p className="text-meta mt-5 inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-paper px-3.5 py-2 text-terracotta-deep">
                  <Sparkle className="h-3.5 w-3.5" />
                  {role.highlight}
                </p>
              ) : null}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
