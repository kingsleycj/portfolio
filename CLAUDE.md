# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## What this is

The personal portfolio of **Kingsley Nweke** — Software Engineer, with AI systems
engineering as a genuine secondary thread. Single page, anchor-nav scroll, deployed
to Vercel. Next.js App Router + TypeScript + Tailwind v4 + Motion.

Replaces an earlier site at kingsley-work.vercel.app. It is a ground-up build, not a
reskin — nothing from the old site carries over.

## Ground rule: everything on this page is sourced

Copy is drawn from the résumé (`public/kingsley-nweke-resume.pdf`), the VibeCraft backend repo
(`~/dev/work/vibecraft_backend`) and the DojoPay repo (`~/dev/sol/dojopay`).
**Do not add achievements, metrics, dates or technologies that no source supports.**
If a claim can't be traced to one of those, ask rather than invent.

Deliberate departures from the résumé, all confirmed by Kingsley:

- **VibeCraft uses PostgreSQL**, not MongoDB — the repo has `node-pg-migrate`
  migrations. The résumé is out of date on this point.
- **Python, FastAPI, React, Next.js, Tailwind** belong in Skills. The résumé omits
  them, but `packages/ai` is Python and DojoPay's frontend is Next.js 14 — both
  evidenced in the repos.
- **He is based in Lagos**, not Enugu. The résumé is out of date; Enugu remains
  correct as the *location of the Genesys roles*, which is why those entries still
  say Enugu.
- **Education is off the page entirely** — no degree, no class of degree, no CGPA,
  and none in the JSON-LD either. It is still in the downloadable résumé. Do not
  reintroduce it.

DojoPay is described honestly as **devnet, pre-production, custodial payouts**. Its
Anchor escrow program is written and building but undeployed and unaudited. Do not
soften this — the honesty is the point, and it reads better to engineers than a vague
claim of a live payments platform.

## Voice

This reads as someone talking, not as a résumé being narrated. Kingsley's explicit
brief: **do not quote the résumé back**. Facts come from it; sentences do not.

- **Forward-looking over retrospective.** He is open to new problems, not defined by
  solved ones. The hero line ends on "the bit I haven't figured out yet" and the rotator
  ends on "whatever I haven't tried yet" — both deliberate. Copy that frames him purely
  by past domains (an early draft led on "the patient record that has to stay private")
  is wrong even when accurate, because it reads as a specialism he is stuck in.
- **Specific over impressive.** "Money that cannot drift" beats "robust transaction
  handling". Concrete detail is what makes it sound like a person who was there.
- **Warm, dry, a little self-aware.** "It mostly did; the places it didn't were the
  useful part." Never boastful, never corporate, never a list of adjectives.
- **Admit the limits.** DojoPay says devnet and custodial. That candour is a feature.

If you rewrite copy, keep every fact traceable and keep the voice. Flat, formal phrasing
is a regression here even if the facts survive.

## Positioning

"Software Engineer" is the primary title. AI systems engineering is a secondary thread
**woven through** projects, skills and about copy — never a separate page or section.

The AI work is **AI systems engineering**: LLM provider routing, SSE streaming, speech
and image pipelines, self-hosted model evaluation, cost engineering. It is *not* model
training or ML research, and copy must never imply otherwise.

## Design system

### Palette — "Studio Warm"

Taken from the sienna backdrop of the headshot in `src/assets/kingsley.jpg`. Light-first
and warm, deliberately avoiding the default dark-grid portfolio look.

Defined as Tailwind v4 `@theme` tokens in `src/app/globals.css`.

| Token | Hex | Use |
| --- | --- | --- |
| `--color-paper` | `#FBF7F0` | page base |
| `--color-paper-deep` | `#F3EADD` | alternating section wash |
| `--color-ink` | `#1A1512` | primary text — 16.9:1 |
| `--color-ink-soft` | `#4A3F36` | secondary text — 9.4:1 |
| `--color-ink-faint` | `#6E6157` | meta, labels — 5.5:1 |
| `--color-terracotta` | `#D2502A` | primary accent, **software thread** — 4.0:1, large text and UI only |
| `--color-terracotta-deep` | `#A63A18` | accent at body size — 6.1:1 |
| `--color-terracotta-light` | `#F0906A` | accent on espresso |
| `--color-verdigris` | `#14705C` | **AI/ML thread** — 5.6:1 |
| `--color-verdigris-light` | `#6FC6AC` | AI thread on espresso |
| `--color-marigold` | `#EDA23C` | **decorative only** — see below |
| `--color-espresso` | `#22190F` | the one dark band, mid-page |
| `--color-on-espresso` | `#F7F1E6` | text on that band |
| `--color-on-espresso-soft` | `rgba(247,241,230,.72)` | secondary text on it |
| `--color-line` | `rgba(26,21,18,0.12)` | hairlines, dashed spine |
| `--color-watermark` | `#8A8079` | oversized decorative numerals — 3.6:1 |

**Colour carries the positioning.** Terracotta marks software-engineering work,
verdigris marks AI work. A reader should see the dual emphasis before reading a word.

Two rules that must hold:

1. **Never use `terracotta` for small text on paper** — it is 4.1:1. Use
   `terracotta-deep` at body size. `terracotta` is fine for large display text, borders,
   fills and icons.
2. **Colour is never the only signal.** AI-tagged items also say "AI/ML" in text and
   carry a different marker shape (dot for AI, diamond for software), so the
   distinction survives colour-blindness and greyscale printing.
3. **Never put a typeface on `line` or `line-strong`.** They are hairline colours; at
   display sizes they fail contrast. The 56px project numerals use `watermark`, which
   clears the 3:1 floor for large text while still reading as a watermark.
4. **Marigold is decorative and carries no meaning.** It is 2.1:1 on paper — it must
   never hold text, and it must never encode software-vs-AI. That split belongs to
   terracotta and verdigris alone. Marigold is for the highlight swash, the loader hub
   and selection: energy, not information.
5. **Never use `paper`/`ink` on the espresso band.** Those two invert with the theme,
   but the band is dark in *both* themes — `text-paper` there goes black-on-black the
   moment dark mode is on. Use `on-espresso` / `on-espresso-soft`, which stay light
   always. This was a real bug, caught by axe, not by eye.

### Dark mode

Every token is semantic — `paper` is the ground, `ink` is the foreground — so dark mode
only redefines values in a `[data-theme="dark"]` block. **No component carries a `dark:`
variant, and none should.** The whole page flips from that one block.

**Light is the default, and the OS preference is deliberately not consulted.** This
palette is designed light-first and that is what a first-time visitor should meet, even
on a machine set to dark. Dark is opt-in: it applies only when `localStorage.theme ===
"dark"`, and once chosen it persists. There is no `prefers-color-scheme` listener
anywhere — a visitor's system flipping to dark must not move a page they never set.

The theme is stamped onto `<html>` by a tiny inline script in `layout.tsx` that runs
before first paint, so someone who chose dark never sees a flash of light. It is always
explicitly `light` or `dark`, never absent. `<html>` carries `suppressHydrationWarning`
because that script writes an attribute React did not render.

`ThemeToggle` reads the attribute with `useSyncExternalStore` rather than mirroring it
into React state — the DOM is the source of truth. Which icon shows is decided in CSS
off `[data-theme]`, so the button is correct in the server HTML before hydration.

**Testing dark mode:** seed `localStorage.theme = "dark"` and reload. Emulating
`prefers-color-scheme: dark` does nothing, by design.

Both accents lighten in dark mode: the light-mode values are tuned for dark text on a
pale ground and lose far too much contrast when the ground inverts.

### Typography

Loaded with `next/font/google` in `src/app/layout.tsx`, `display: 'swap'`, exposed as
CSS variables and mapped to `--font-*` theme tokens.

- **Bricolage Grotesque** (variable, `wdth` only) — display. Deliberately irregular;
  this is where the handcrafted feel comes from.
- **Inter** — prose. Neutral and quiet so Bricolage carries the character.
- **JetBrains Mono** — dates, tags, section numbers, micro-labels. The engineering
  signal. Uppercase, tracked, small. Used sparingly.

| Role | Spec |
| --- | --- |
| Display (name) | Bricolage 600, `wdth 85`, `clamp(3.5rem, 16vw, 9rem)`, lh .92, tracking -.03em |
| Section h2 | Bricolage 600, `wdth 90`, `clamp(2.25rem, 5vw, 3.75rem)`, tracking -.02em |
| h3 | Bricolage 500, `clamp(1.375rem, 2.5vw, 1.875rem)` |
| Lead | Inter 400, `clamp(1.125rem, 1.6vw, 1.375rem)`, lh 1.6 |
| Body | Inter 400, 1rem, lh 1.7, max 68ch |
| Meta / tag | JetBrains Mono 500, .75rem, tracking .12em, uppercase |

`text-display`, `text-h2`, `text-h3`, `text-lead` and `text-meta` are declared with
Tailwind's `@utility` in `globals.css` — not in a components layer — so they compose
with variants. `text-h3 sm:text-h2` is valid, and the contact address relies on it.
Use them instead of re-specifying sizes per component.

**Font loading decisions**, both measured rather than assumed:

- Bricolage requests only the `wdth` axis. Adding `opsz` took the file from 78KB to
  128KB, and the type scale never varied it.
- Every face stays preloaded. Deferring JetBrains Mono saved ~22KB but pushed CLS from
  0 to 0.09 as the meta labels reflowed; deferring Inter measured *no* LCP change
  (3.50s either way) and only moved the noisy TBT number. Neither is worth taking.

### Motion

Restrained. Motion earns its place or it comes out — not every element animates.

**How reveals actually work.** Scroll reveals are CSS transitions triggered by a single
page-wide `IntersectionObserver` (`RevealObserver`, mounted once in the layout). `Reveal`,
`RevealGroup` and `RevealItem` are **Server Components that ship no JavaScript at all** —
the observer adds `.is-visible`, CSS does the rest, and group stagger is `nth-child`
transition delays. An earlier version gave each of the 37 revealed elements its own
Motion component; this does the same thing for a fraction of the main-thread cost.
Keep it that way — do not reach for Motion to add a reveal.

Motion itself is now used by exactly two components: `MagneticButton` (spring-following
cursor) and `DrawnUnderline` (`pathLength`). It costs ~88KB raw / ~30KB transferred.

**`KineticName`** makes the masthead react to the cursor — letters lift and warm as it
passes, falling off over a 190px radius with a smoothstep so the crest is rounded. It
touches **only `transform` and `color`**. The tempting alternatives — animating the
variable font's `wdth` axis, or letter-spacing — reflow the text every frame, which
would jank and put CLS at risk. Letters are split into spans, so the heading carries one
`aria-label` and the spans are `aria-hidden`: a screen reader hears the name, not
fourteen characters. It is off under reduced motion and on coarse pointers.

**`Rotator`** cycles the hero's phrases in pure CSS — a Server Component. The words are
stacked absolutely inside a fixed-height, full-width box so stepping through them can
never reflow the line beneath, and the keyframe's visible window overlaps the next
word's entry so it crossfades rather than blinking through a gap. Under reduced motion
it pins to the first phrase and reads as a static line.

**Grain** (`.grain`) is one fixed, tiled SVG noise layer at 3.5% opacity (5.5% in dark).
It gives the flat colour some tooth so the page reads as printed stock. One composited
layer, no repaint.

- Hero reveals via **CSS keyframes**, not JS, so the text is visible without JavaScript
  and never waits on hydration
- Below the fold, one `Reveal` primitive: 14px rise + fade, `once: true`, 60ms stagger
- Magnetic primary CTA, ≤8px pull, off on coarse pointers
- Cursor-aware spotlight on project case studies
- Self-drawing SVG underline — on two or three phrases in total, not everywhere
- Blob washes drift over 20–40s
- An opening **curtain** (`Curtain.tsx`) draws the monogram and lifts on a curved edge

**Three invariants:**

1. **Animate only `opacity` and `transform`.** Never height, width, margin or padding.
   This is what keeps CLS at 0 — layout is final at first paint and motion only ever
   paints over it.
2. **`prefers-reduced-motion` is honoured everywhere.** Verified by loading the page
   with the preference set and *without scrolling*: zero hidden reveals, zero running
   animations. Reveals and the drawn underline resolve in CSS (the `.reveal` and
   `.drawn-underline` rules override Motion's inline values with `!important`) rather
   than by branching in JS — no hydration mismatch, no flash.
3. **Large hero text rises without fading.** An element at `opacity: 0` is not an LCP
   candidate, so fading in the largest text on the page defers LCP by the length of the
   animation. The name, the dual title and the lead all use `hero-rise-solid`, which
   moves transform only; `hero-rise` (with the fade) is for the small stuff. Do not
   "tidy" these into one keyframe — moving the lead back to `hero-rise` measurably
   pushed LCP from 1.88s to 2.39s.

Shared easings and variants live in `src/lib/motion.ts`. Import from there rather than
writing per-component transition objects.

### The opening sequence

`Curtain.tsx` runs for ~2.05s: a hand-drawn node graph assembles — points appear, edges
draw, a marigold hub lands — while three words step through underneath, then the panel
lifts on the section-divider curve. It is **not a loading gate**. The page is fully rendered underneath it from
the first frame; the curtain only covers it, and lifts on CSS keyframes alone. That
matters for three reasons: no JavaScript is involved so it cannot fail to dismiss and
strand the page; `pointer-events: none` lets an impatient visitor click through it; and
it contributes no LCP candidate (an inline `<svg>` path is not one) while Chrome's LCP
ignores occlusion — so covering the hero does not delay the hero's measurement.

It **does** cost Speed Index, which measures visual completeness over time — any covering
overlay hurts it by definition. Measured: SI 1.76s at ~1.15s of curtain, 2.96s at ~2.05s,
for one point of Lighthouse Performance. That was judged worth it for having a real
opening rather than a flash. Lengthen it further and the cost keeps climbing.

Under `prefers-reduced-motion` it is removed outright (`display: none`) rather than
shortened. The wave hangs *below* the panel, filled in the panel's own colour — inside
the panel it would be invisible, same fill on the same box.

**Motion is loaded through `LazyMotion` with the `domAnimation` feature set**
(`src/components/motion/MotionProvider.tsx`), in `strict` mode. That is why primitives
import `* as m from "motion/react-m"` and render `m.div` rather than `motion.div` —
`strict` throws on the heavyweight component so the saving can't be undone by accident.
Hooks (`useSpring`, `useReducedMotion`) still come from `motion/react`.

### Keeping it from looking machine-made

Kingsley's note was that the page "still looks AI generated". The tells are almost all
*repetition and perfect regularity*, and the fixes are deliberate — do not tidy them away:

- **Every section boundary uses a different curve.** `WaveDivider` holds four
  silhouettes; `page.tsx` passes a distinct `curve` to each. One path mirrored five
  times is spotted long before anyone can say why.
- **Blob washes vary too.** `BlobField` holds four shapes and takes a `shapes` pair plus
  an `offset` flag, so the same two forms don't sit in the same corners on every section.
- **Hand-drawn marks are drawn twice.** `InkRule`, `ArrowMark` and `DrawnUnderline` each
  lay a lighter second pass on a slightly different path, the way a pen doubles back. A
  single mathematically clean stroke is the giveaway.
- **Section rhythm is uneven.** Top and bottom padding differ per section rather than
  every one being `py-28 md:py-36`. A composed page breathes differently depending on
  what it is holding.
- **Things sit slightly off square.** Sub-degree rotations on the status note, the AI
  skills panel, the award chip and the project numerals; asymmetric border radii.
- **Reveals differ per section** (below). Everything arriving the same way is the
  motion equivalent of the same curve five times.

### Per-section entrances

`.reveal` is the trigger class the observer looks for; the modifier sets only the
*starting* transform, and the shared `.reveal.is-visible` rule resolves them all to
`none` — its two-class specificity beats every modifier, so they compose safely.

| Class | Where | Feel |
| --- | --- | --- |
| `.reveal` | default | rise 16px |
| `.reveal-left` | About, odd projects | drifts in from the margin, off-square |
| `.reveal-right` | even projects | leans in from its own side |
| `.reveal-slide` | Experience roles | out from behind the spine |
| `.reveal-pop` | Skills groups | scatters in, overshoot easing |
| `.reveal-tilt` | Currently cards | drops onto the dark band |
| `.reveal-swell` | Contact address | swells rather than slides |

Sibling durations are nudged by `nth-child` so a group never lands in lockstep.

### The experience timeline

The spine is a scroll indicator, not decoration. `TimelineProgress` writes `--progress`
onto the track from the list's box against a line ~55% down the viewport — so it tracks
roughly where the reader's eye is, rather than where the section edge happens to be —
and toggles `data-reached` on each node as the fill passes it. The colour change itself
is CSS.

**Node positions are measured with `getBoundingClientRect` against the list, never
`offsetTop`.** Each node is absolutely positioned inside its own `relative` `<li>`, so
`offsetTop` reports a few pixels for every one of them and they all light at once. That
bug shipped once already.

Under reduced motion the track renders complete and every node reads as reached, so the
timeline still reads as a timeline.

### Shape

Organic, not rectilinear. Fluid SVG dividers instead of rules, hand-drawn stroke accents,
a dashed spine for the timeline, the headshot rotated slightly off-grid in an inked frame.
Projects are full-bleed alternating case studies, never a card grid.

One deliberate off-grid moment per section. More than that and it reads as noise.

**Every section boundary is declared in `page.tsx`**, not inside the sections. `WaveDivider`
takes both the colour above (`from`) and below (`fill`), so the page's colour sequence —
paper, deep, paper, deep, espresso, paper — reads top to bottom in one place and a section
can't drift out of step with the divider above it. Low-contrast paper joins use
`depth="soft"`; only the espresso band gets a full-height wave.

## Conventions

**Server Components by default.** Sections under `src/components/sections/` stay server
components. Only motion primitives carry `'use client'`. Section content passes through
`<Reveal>` as `children`, so it renders on the server and never enters the client bundle.
Preserve this — it is why the shipped JS stays small.

**Content is data.** All copy lives in typed modules under `src/content/`, typed by
`src/content/types.ts`. Copy edits should never require touching a component.

**Decorative SVG** always gets `aria-hidden="true"` and `focusable="false"`.

**Accessibility is not optional.** One `h1`, ordered headings, `<section aria-labelledby>`,
`<ol>` for the timeline, visible focus rings that are never removed, descriptive alt text.

**Primary actions go full width on mobile.** CTAs stack (`flex-col sm:flex-row`) and
each fills the column (`w-full justify-center sm:w-auto`). A pill sized to its label is
a small target on a phone.

Three traps already hit once, worth not repeating:

- **Never wrap a `RevealGroup` in `display: contents`.** Such an element generates no box,
  so IntersectionObserver never reports it visible and its children stay at `opacity: 0`
  forever. Make the real layout element (the grid, the list) *be* the reveal group.
- **Watch DOM order against heading order.** The projects grid alternates which column
  comes first, so a heading in the metadata column can precede the project's own `h3`.
  The "Built with" label is a `<p>` tied to its list with `aria-labelledby` for exactly
  this reason.
- **Keep the theme toggle out of the nav's scrolling list.** The section links scroll
  horizontally inside the dock on narrow screens; when the toggle lived among them it
  simply fell off the end of a 390px viewport. It now sits outside the scroll area.

## Verification

Beyond `build` / `lint` / `typecheck`, this page has been checked with:

- **axe-core**, light and dark, at 1440px and 390px — 0 violations. Run it in *both*
  themes: the espresso-band bug was invisible in light mode.
- **Keyboard**, every tab stop — 22 of them, all with a visible focus ring.
- **Reduced motion**, loaded without scrolling — 0 hidden reveals, 0 running animations.
- **Layout shift** — CLS 0 under simulated throttling and under real CDP throttling
  with a full scroll pass.

## Commands

```bash
npm run dev        # dev server
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

## Source files

`src/assets/kingsley.jpg` (static-imported, so Next generates a blur placeholder) and
`public/kingsley-nweke-resume.pdf` are now the only copies — the `img/` and `resume/`
folders they came from have been removed. Replace them in place.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
