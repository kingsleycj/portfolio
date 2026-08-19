import { Sparkle } from "@/components/art/Marks";
import { TimelineProgress } from "@/components/motion/TimelineProgress";
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
      className="relative bg-paper-deep pb-32 pt-20 md:pb-44 md:pt-28"
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
          className="relative mt-16 space-y-14 pl-8 md:mt-20 md:pl-12"
        >
          <TimelineProgress />

          {experience.map((role) => (
            <RevealItem
              as="li"
              key={`${role.company}-${role.period}`}
              className="reveal-slide relative"
            >
              {/* Spine node. Hollow until the scroll fill reaches it, then it
                  takes the accent — so the track reads as progress through the
                  story rather than as decoration. */}
              <span
                data-node
                aria-hidden="true"
                className="timeline-node absolute -left-[2.4rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-line-strong bg-paper-deep md:-left-[3.4rem]"
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

              {/* Wraps to about four lines on a phone, where a pill shape and a
                  centred 14px mark both stop working — so it becomes a block with
                  the mark sized up and aligned to the first line. */}
              {role.highlight ? (
                <p className="text-meta mt-5 inline-flex -rotate-[0.8deg] items-start gap-3 rounded-2xl border border-terracotta/30 bg-paper px-4 py-3 text-terracotta-deep sm:items-center sm:gap-2 sm:rounded-full sm:px-3.5 sm:py-2">
                  <Sparkle className="mt-0.5 h-5 w-5 shrink-0 sm:mt-0 sm:h-3.5 sm:w-3.5" />
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
