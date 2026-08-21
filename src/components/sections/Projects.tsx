import { ArrowMark, NodeGraph } from "@/components/art/Marks";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Spotlight } from "@/components/motion/Spotlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ThreadTag } from "@/components/ui/ThreadTag";
import { projects, secondaryProjects } from "@/content/projects";
import { cn } from "@/lib/cn";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative pb-24 pt-28 md:pb-32 md:pt-40"
    >
      <div className="wrap">
        <SectionHeading
          id="projects-heading"
          index="03"
          eyebrow="Selected work"
          title="Four I’d happily be quizzed on"
          lead="Not a link dump. What each one does, the bit that was genuinely hard, and where it honestly stands today."
        />

        <div className="mt-16 md:mt-20">
          {projects.map((project, index) => {
            const leadThread = project.threads[0];
            const isAi = leadThread === "ai";
            // Alternate which side the metadata column sits on, so the eye
            // doesn't settle into a single repeating column.
            const metaFirst = index % 2 === 0;

            return (
              <Reveal
                key={project.slug}
                className={metaFirst ? "reveal-left" : "reveal-right"}
              >
                <Spotlight
                  tint={
                    isAi
                      ? "var(--color-verdigris)"
                      : "var(--color-terracotta)"
                  }
                >
                  <article className="grid gap-8 border-t border-line py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
                    <div
                      className={cn(
                        "lg:col-span-4",
                        metaFirst ? "lg:order-1" : "lg:order-2 lg:col-start-9",
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <p
                          aria-hidden="true"
                          className="text-display -rotate-[1.5deg] text-[3.5rem] leading-none text-watermark"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        {isAi ? (
                          <NodeGraph className="mt-1 text-verdigris" />
                        ) : null}
                      </div>

                      <p className="text-meta mt-6 text-ink-faint">
                        {project.period}
                      </p>

                      <ul className="mt-4 flex flex-wrap gap-2">
                        {project.threads.map((thread) => (
                          <li key={thread}>
                            <ThreadTag thread={thread} />
                          </li>
                        ))}
                      </ul>

                      {/* A label, not a heading: on alternating rows this column
                          precedes the project's own h3 in the DOM, so a heading
                          here would break sequential heading order. The list is
                          associated with it by aria-labelledby instead. */}
                      <p
                        id={`${project.slug}-stack-label`}
                        className="text-meta mt-8 text-ink-faint"
                      >
                        Built with
                      </p>
                      {/* Separated by middots — entries like "Node.js 22" and
                          "Anchor (Rust)" run together on whitespace alone. */}
                      <ul
                        aria-labelledby={`${project.slug}-stack-label`}
                        className="mt-3 flex flex-wrap gap-y-1"
                      >
                        {project.stack.map((tech) => (
                          <li
                            key={tech}
                            className="text-sm text-ink-soft after:mx-2 after:text-line-strong after:content-['·'] last:after:hidden"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className={cn(
                        "lg:col-span-7",
                        metaFirst ? "lg:order-2 lg:col-start-6" : "lg:order-1",
                      )}
                    >
                      <h3 className="text-h2 text-ink">{project.name}</h3>
                      <p
                        className={cn(
                          "text-h3 mt-2",
                          isAi ? "text-verdigris" : "text-terracotta-deep",
                        )}
                      >
                        {project.tagline}
                      </p>

                      <div className="prose-narrow mt-7 space-y-5">
                        {project.body.map((paragraph) => (
                          <p key={paragraph} className="text-ink-soft">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {project.status ? (
                        <p className="prose-narrow mt-7 -rotate-[0.4deg] rounded-[1.5rem_0.75rem_1.5rem_0.75rem] border border-dashed border-line-strong bg-paper-deep/60 px-5 py-4 text-sm text-ink-soft">
                          <span className="text-meta mr-2 text-ink-faint">
                            Status
                          </span>
                          {project.status}
                        </p>
                      ) : null}

                      {project.links.length > 0 ? (
                        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                          {project.links.map((link) => (
                            <li key={link.href}>
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                data-cursor="Open"
                                className="text-meta group inline-flex items-center gap-2 text-ink transition-colors duration-200 hover:text-terracotta-deep"
                              >
                                <span className="border-b border-line-strong pb-0.5 transition-colors duration-200 group-hover:border-terracotta">
                                  {link.label}
                                </span>
                                <ArrowMark className="h-3.5 w-3.5 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5" />
                                <span className="sr-only">
                                  ({project.name}, opens in a new tab)
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </article>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>

        {/* Earlier work — listed for completeness, not given a case study. */}
        <Reveal className="mt-20 border-t border-line pt-14">
          <h3 className="text-h3 text-ink">And a few more</h3>
          <RevealGroup as="ul" className="mt-8 grid gap-8 sm:grid-cols-2">
            {secondaryProjects.map((project) => (
              <RevealItem as="li" key={project.name}>
                <h4 className="font-medium text-ink">
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="Open"
                      className="group inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-terracotta-deep"
                    >
                      {project.name}
                      <ArrowMark className="h-3.5 w-3.5 -rotate-45 text-ink-faint transition-transform duration-300 group-hover:translate-x-0.5" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    project.name
                  )}
                </h4>
                <p className="mt-2 text-sm text-ink-soft">
                  {project.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>
      </div>
    </section>
  );
}
