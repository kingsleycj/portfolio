import { ArrowMark, InkRule } from "@/components/art/Marks";
import { profile } from "@/content/profile";

/**
 * Closes on a colophon rather than a credential.
 *
 * The first line bookends the About section's opening ("I started out taking
 * things apart…"), and the typefaces are named the way a printed piece names
 * them — a detail for the people most likely to look this far down the page.
 */
export function Footer() {
  return (
    <footer className="wrap pb-16">
      <InkRule className="text-line-strong" />

      <div className="mt-10 grid gap-10 md:grid-cols-12">
        <p className="text-h3 text-ink md:col-span-7">
          Still the same habit — take it apart, see how it holds.
        </p>

        <div className="md:col-span-4 md:col-start-9">
          <h2 className="text-meta text-terracotta-deep">Colophon</h2>
          <p className="mt-3 text-sm text-ink-soft">
            Set in Bricolage Grotesque, Inter and JetBrains Mono. Built with
            Next.js and Motion, drawn by hand in SVG, deployed on Vercel.
          </p>
          <p className="mt-3 text-sm text-ink-soft">
            No template, no component kit — every shape on this page was made
            for it.
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-meta text-ink-faint">
          {profile.name} · {profile.location} · {new Date().getFullYear()}
        </p>

        <a
          href="#hero"
          className="text-meta group inline-flex items-center gap-2 text-ink-faint transition-colors duration-200 hover:text-terracotta-deep"
        >
          Back to top
          <ArrowMark className="h-3.5 w-3.5 -rotate-90 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
