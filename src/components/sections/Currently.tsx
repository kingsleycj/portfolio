import { Sparkle } from "@/components/art/Marks";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ThreadTag } from "@/components/ui/ThreadTag";
import { currently } from "@/content/skills";

/**
 * The one dark band on the page. Current work is the first thing recruiters look
 * for, so it gets the strongest contrast on the page rather than a footnote.
 *
 * The wave dividers that top and tail this band live in `page.tsx`, where the
 * whole colour sequence can be read in one place.
 */
export function Currently() {
  return (
    <section
      id="currently"
      aria-labelledby="currently-heading"
      className="on-espresso relative bg-espresso py-24 md:py-32"
    >
      <div className="wrap">
        <SectionHeading
          id="currently-heading"
          index="05"
          eyebrow="Right now"
          title="On my desk this month"
          onDark
        />

        <RevealGroup as="ul" className="mt-14 grid gap-10 md:grid-cols-3">
          {currently.map((item) => (
            <RevealItem as="li" key={item.label} className="reveal-tilt">
              <Sparkle
                className={
                  item.thread === "ai"
                    ? "h-5 w-5 text-verdigris-light"
                    : "h-5 w-5 text-terracotta-light"
                }
              />
              <h3 className="text-h3 mt-4 text-on-espresso">{item.label}</h3>
              <p className="mt-3 text-on-espresso-soft">{item.detail}</p>
              <div className="mt-4">
                <ThreadTag thread={item.thread} onDark />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
