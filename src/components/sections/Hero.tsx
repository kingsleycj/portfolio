import Image from "next/image";

import portrait from "@/assets/kingsley.jpg";
import { BlobField } from "@/components/art/BlobField";
import { HeroDepth } from "@/components/art/HeroDepth";
import { ArrowMark, Sparkle } from "@/components/art/Marks";
import { HeroStage } from "@/components/motion/HeroStage";
import { KineticName } from "@/components/motion/KineticName";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Rotator } from "@/components/motion/Rotator";
import { profile, rotatorWords, valuePropParts } from "@/content/profile";

/**
 * An editorial masthead rather than a two-column split.
 *
 * The name runs down the left at display scale with the second word thrown off
 * the grid, and reacts to the cursor. The portrait sits in an arch beside it —
 * byline-sized on mobile, full height from `lg` up, which also keeps it smaller
 * than the headline so LCP lands on cheap text rather than on an image.
 *
 * Everything enters via CSS keyframes rather than Motion, so the largest text is
 * painted straight from the server response: no hydration wait, and it degrades
 * to plain visible text with JavaScript off.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-20 pt-32 md:pt-36"
    >
      <BlobField />
      <HeroStage className="absolute inset-0">
        <HeroDepth />
      </HeroStage>

      <div className="wrap relative z-10">
        <div
          className="hero-rise text-meta flex flex-wrap items-center gap-x-4 gap-y-2"
          style={{ animationDelay: "40ms" }}
        >
          <span className="inline-flex items-center gap-2 text-terracotta-deep">
            <Sparkle className="h-3.5 w-3.5" />
            {profile.availability}
          </span>
          <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
          <span className="text-ink-faint">{profile.location}</span>
        </div>

        <div className="relative mt-8 lg:mt-10">
          <div className="portrait-stage mb-10 w-32 sm:w-40 lg:absolute lg:right-0 lg:top-1/2 lg:mb-0 lg:w-[19rem] lg:-translate-y-1/2 xl:w-[22rem]">
            {/* A solid arch sitting behind the photo rather than a thin outline
                offset from it. The old hairline read as a stray stroke where it
                left the curve; a printed colour block reads as intentional, and
                because it stays put while the card tips on hover it doubles as
                the depth cue. */}
            <div className="portrait-card relative -rotate-2">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-2.5 translate-y-3 rotate-[1.5deg] rounded-[999px_999px_1.5rem_1.5rem] bg-terracotta-wash lg:translate-x-4 lg:translate-y-4"
              />
              <Image
                src={portrait}
                alt="Kingsley Nweke, wearing glasses and a black shirt, photographed against a warm brown backdrop."
                priority
                placeholder="blur"
                sizes="(min-width: 1280px) 22rem, (min-width: 1024px) 19rem, (min-width: 640px) 10rem, 8rem"
                className="portrait-photo relative rounded-[999px_999px_1.5rem_1.5rem] object-cover"
              />
            </div>
          </div>

          {/* Rises without fading: an element at opacity 0 is not an LCP
              candidate, and this is the largest thing on the page. */}
          <h1
            id="hero-heading"
            aria-label={profile.name}
            className="text-display hero-rise-solid text-ink lg:max-w-[58%]"
            style={{ animationDelay: "60ms" }}
          >
            <KineticName
              lines={["Kingsley", "Nweke"]}
              lineClassNames={[undefined, "lg:ml-[13%]"]}
            />
          </h1>
        </div>

        <div className="mt-10 lg:mt-12 lg:max-w-[58%]">
          <p
            className="hero-rise-solid text-h3 text-ink-soft"
            style={{ animationDelay: "220ms" }}
          >
            <span className="text-ink">Software engineer.</span> I build
            <Rotator words={rotatorWords} className="mt-1" />
          </p>

          <p
            className="hero-rise-solid text-lead prose-narrow mt-7"
            style={{ animationDelay: "300ms" }}
          >
            {valuePropParts.before}
            <span className="highlight text-ink">{valuePropParts.emphasis}</span>
            {valuePropParts.after}
          </p>

          <div
            className="hero-rise mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            style={{ animationDelay: "380ms" }}
          >
            <MagneticButton
              href="#projects"
              className="text-meta group w-full justify-center rounded-full bg-ink px-6 py-4 text-paper transition-colors duration-200 hover:bg-terracotta-deep sm:w-auto"
            >
              See what I&rsquo;ve built
              <ArrowMark className="transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>

            <MagneticButton
              href={profile.resumePath}
              download
              strength={5}
              className="text-meta w-full justify-center rounded-full border border-line-strong px-6 py-4 text-ink transition-colors duration-200 hover:border-terracotta hover:text-terracotta-deep sm:w-auto"
            >
              Take my résumé
            </MagneticButton>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="hero-rise text-meta absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-ink-faint transition-colors duration-200 hover:text-terracotta-deep lg:flex"
        style={{ animationDelay: "560ms" }}
      >
        Scroll
        <span aria-hidden="true" className="h-8 w-px bg-line-strong" />
      </a>
    </section>
  );
}
