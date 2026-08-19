import { InkRule } from "@/components/art/Marks";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, quickFacts } from "@/content/profile";
import { skillGroups } from "@/content/skills";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative pb-24 pt-24 md:pb-40 md:pt-32"
    >
      <div className="wrap">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              id="about-heading"
              index="01"
              eyebrow="About"
              title={about.heading}
            />

            <RevealGroup className="prose-narrow mt-10 space-y-6">
              {about.body.map((paragraph) => (
                <RevealItem key={paragraph} as="p" className="reveal-left text-ink-soft">
                  {paragraph}
                </RevealItem>
              ))}
            </RevealGroup>

            {/* The closing beat, set as a list so each clause lands separately. */}
            <Reveal className="reveal-left mt-10">
              <ul className="space-y-2 border-l-2 border-terracotta pl-6">
                {about.closing.map((line) => (
                  <li key={line} className="text-h3 text-ink">
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Off-grid sidebar: nudged down and away from the narrative column. */}
          <aside className="lg:col-span-4 lg:col-start-9 lg:pt-24">
            <Reveal delay={0.1}>
              <dl className="space-y-5">
                {quickFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-meta text-ink-faint">{fact.label}</dt>
                    <dd className="mt-1 text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <InkRule className="my-8 text-line-strong" />

              <h3 className="text-meta text-terracotta-deep">Comfortable across</h3>
              <ul className="mt-4 space-y-3">
                {skillGroups.map((group) => (
                  <li key={group.title} className="flex items-baseline gap-3">
                    <span
                      aria-hidden="true"
                      className={
                        group.thread === "ai"
                          ? "h-1.5 w-1.5 shrink-0 rounded-full bg-verdigris"
                          : "h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px] bg-terracotta"
                      }
                    />
                    <span className="text-ink-soft">{group.title}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
