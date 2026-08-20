import { ArrowMark, InkRule, Sparkle } from "@/components/art/Marks";
import { LocalTime } from "@/components/layout/LocalTime";
import { profile } from "@/content/profile";

/**
 * The sign-off.
 *
 * Closes on a colophon rather than a credential: the first line bookends the
 * About section's opening ("I started out taking things apart…"), and the
 * typefaces are named the way a printed piece names them — a detail for the
 * people most likely to read this far.
 *
 * The wordmark beneath is an **inline `<svg>`, not HTML text**. Two reasons:
 * `textLength` makes it span the full width exactly whatever the font metrics
 * do, and a stroked outline this faint would be reported as a contrast failure
 * if it were real text — which it isn't, since the actual name sits in the bar
 * above it.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden pb-0">
      <div className="wrap">
        <InkRule className="text-line-strong" />

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <p className="text-h2 text-ink md:col-span-7">
            Still the same habit — take it apart, see how it holds.
          </p>

          <div className="md:col-span-4 md:col-start-9">
            <h2 className="text-meta inline-flex items-center gap-2 text-terracotta-deep">
              <Sparkle className="h-3.5 w-3.5" />
              Colophon
            </h2>
            <p className="mt-4 text-sm text-ink-soft">
              Set in Syne and JetBrains Mono. Built with Next.js and Motion,
              every shape on this page drawn by hand in SVG.
            </p>
            <p className="mt-3 text-sm text-ink-soft">
              No template, no component kit, no icon pack.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <LocalTime />
            <span className="text-meta text-ink-faint">
              {profile.name} · {new Date().getFullYear()}
            </span>
          </div>

          <a
            href="#hero"
            className="text-meta group inline-flex items-center gap-2 text-ink-faint transition-colors duration-200 hover:text-terracotta-deep"
          >
            Back to top
            <ArrowMark className="h-3.5 w-3.5 -rotate-90 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Cut off by the bottom edge on purpose — it reads as a mark stamped on
          the page rather than a line of text that happens to be large. */}
      <div aria-hidden="true" className="footer-wordmark wrap mt-12">
        <svg
          viewBox="0 0 1000 96"
          className="block w-full"
          focusable="false"
          aria-hidden="true"
        >
          {/* `textLength` holds it to the full column width whatever the font
              metrics do. The font-size is picked so the *natural* width already
              lands near 1000 units — `lengthAdjust` then nudges spacing rather
              than crushing it, which is what turned an earlier attempt into
              overlapping shapes. */}
          <text
            x="0"
            y="88"
            textLength="1000"
            lengthAdjust="spacing"
            className="footer-wordmark-text"
          >
            KINGSLEY
          </text>
        </svg>
      </div>
    </footer>
  );
}
