import { BlobField } from "@/components/art/BlobField";
import { ArrowMark } from "@/components/art/Marks";
import { DrawnUnderline } from "@/components/art/DrawnUnderline";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile, socials } from "@/content/profile";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden py-28 md:py-36"
    >
      <BlobField variant="soft" />

      <div className="wrap">
        <SectionHeading
          id="contact-heading"
          index="06"
          eyebrow="Contact"
          title={
            <>
              Come tell me{" "}
              <DrawnUnderline color="var(--color-verdigris)">
                what you&rsquo;re building
              </DrawnUnderline>
            </>
          }
          lead="Roles, contract work, or a good argument about something you’re building — all welcome. Email reaches me fastest."
        />

        {/* The address steps down to h3 on narrow screens: at h2 it is wider than
            a phone viewport and would be clipped by the page's overflow guard. */}
        <Reveal className="mt-12">
          <a
            href={`mailto:${profile.email}`}
            className="text-h3 sm:text-h2 group inline-flex flex-wrap items-center gap-3 break-words text-ink transition-colors duration-200 hover:text-terracotta-deep"
          >
            {profile.email}
            <ArrowMark className="h-6 w-6 -rotate-45 text-terracotta transition-transform duration-300 group-hover:translate-x-1 sm:h-8 sm:w-8" />
          </a>
        </Reveal>

        {/* The grid *is* the reveal group. An intermediate wrapper using
            `display: contents` would generate no box, so IntersectionObserver
            would never report it visible and none of these would ever reveal. */}
        <RevealGroup
          as="ul"
          className="mt-14 grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {socials.map((social) => (
            <RevealItem as="li" key={social.href}>
              <p className="text-meta text-ink-faint">{social.label}</p>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group mt-2 inline-flex items-center gap-1.5 text-ink transition-colors duration-200 hover:text-terracotta-deep"
              >
                {social.handle}
                <ArrowMark className="h-3.5 w-3.5 -rotate-45 text-ink-faint transition-transform duration-300 group-hover:translate-x-0.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </RevealItem>
          ))}

          <RevealItem as="li">
            <p className="text-meta text-ink-faint">Phone</p>
            <a
              href={profile.phoneHref}
              className="mt-2 inline-block text-ink transition-colors duration-200 hover:text-terracotta-deep"
            >
              {profile.phone}
            </a>
          </RevealItem>

          <RevealItem as="li">
            <p className="text-meta text-ink-faint">Résumé</p>
            <MagneticButton
              href={profile.resumePath}
              download
              strength={5}
              className="text-meta mt-2 rounded-full bg-ink px-5 py-3 text-paper transition-colors duration-200 hover:bg-terracotta-deep"
            >
              Download PDF
              <ArrowMark className="h-3.5 w-3.5 rotate-90" />
            </MagneticButton>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
