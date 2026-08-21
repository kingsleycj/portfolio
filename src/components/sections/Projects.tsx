import { ArrowMark, NodeGraph } from "@/components/art/Marks";
import { HorizontalScroller } from "@/components/motion/HorizontalScroller";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Spotlight } from "@/components/motion/Spotlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ThreadTag } from "@/components/ui/ThreadTag";
import { projects, secondaryProjects } from "@/content/projects";
import { cn } from "@/lib/cn";

/**
 * The case studies run on a horizontal rail rather than stacking down the page.
 *
 * Each panel is restructured into a single column — the alternating two-column
 * layout the vertical version used has nowhere to alternate at rail width.
 *
 * Panels deliberately do **not** use `Reveal`. Anything off to the right sits
 * outside the viewport, so an in-view reveal would hold it at `opacity: 0`
 * until scrolled to — which reads as broken content the moment someone arrives
 * by keyboard or deep link.
 */
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
          title="Four I&rsquo;d happily be quizzed on"
          lead="Not a link dump. What each one does, the bit that was genuinely hard, and where it honestly stands today."
        />
      </div>

      <HorizontalScroller
        label="Selected work — scroll sideways to move between projects"
        className="mt-14 md:mt-16"
      >
        <ul className="hscroll-track">
          {projects.map((project, index) => {
            const isAi = project.threads[0] === "ai";

            return (
              <li key={project.slug} className="hscroll-panel">
                <Spotlight
                  tint={
                    isAi ? "var(--color-verdigris)" : "var(--color-terracotta)"
                  }
                  className="h-full"
                >
                  {/* Two columns from lg: meta on the left, the case study on
                      the right. A single column at panel width ran ~1089px
                      tall — taller than most viewports, which would mean
                      scrolling vertically to read one panel and horizontally to
                      reach the next. */}
                  <article className="grid h-full gap-x-10 gap-y-6 rounded-[2rem_0.75rem_2rem_0.75rem] border border-line bg-paper-deep/40 p-7 md:p-9 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                      <div className="flex items-start justify-between gap-4">
                        <p
                          aria-hidden="true"
                          className="text-display -rotate-[1.5deg] text-[3rem] leading-none text-watermark"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        {isAi ? (
                          <NodeGraph className="mt-1 shrink-0 text-verdigris" />
                        ) : null}
                      </div>

                      <p className="text-meta mt-5 text-ink-faint">
                        {project.period}
                      </p>

                      <ul className="mt-4 flex flex-wrap gap-2">
                        {project.threads.map((thread) => (
                          <li key={thread}>
                            <ThreadTag thread={thread} />
                          </li>
                        ))}
                      </ul>

                      <p
                        id={`${project.slug}-stack-label`}
                        className="text-meta mt-8 text-ink-faint"
                      >
                        Built with
                      </p>
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

                    <div className="flex flex-col lg:col-span-8">
                      <h3 className="text-h2 text-ink">{project.name}</h3>
                      <p
                        className={cn(
                          "text-h3 mt-2",
                          isAi ? "text-verdigris" : "text-terracotta-deep",
                        )}
                      >
                        {project.tagline}
                      </p>

                      <div className="mt-6 space-y-4">
                        {project.body.map((paragraph) => (
                          <p key={paragraph} className="text-ink-soft">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* Pushed down so status and links sit on the same line
                          across panels, however long the copy runs. */}
                      <div className="mt-auto pt-7">
                        {project.status ? (
                          <p className="-rotate-[0.4deg] rounded-[1.5rem_0.75rem_1.5rem_0.75rem] border border-dashed border-line-strong bg-paper/60 px-5 py-4 text-sm text-ink-soft">
                            <span className="text-meta mr-2 text-ink-faint">
                              Status
                            </span>
                            {project.status}
                          </p>
                        ) : null}

                        {project.links.length > 0 ? (
                          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
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
                    </div>
                  </article>
                </Spotlight>
              </li>
            );
          })}
        </ul>
      </HorizontalScroller>

      {/* Earlier work — listed for completeness, not given a case study. */}
      <div className="wrap">
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
