# kingsley-portfolio

Personal portfolio of **Kingsley Nweke** — Software Engineer, with AI systems
engineering as a secondary thread. Single page, anchor-nav scroll.

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Motion · deployed on Vercel.
Light and dark themes, an opening curtain, and scroll reveals that ship no JavaScript.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

## Editing content

All copy is data. Nothing under `src/components/` needs touching to change what the
page says:

| File | Holds |
| --- | --- |
| `src/content/profile.ts` | Name, titles, value prop, about copy, contact details, socials |
| `src/content/experience.ts` | Work timeline |
| `src/content/projects.ts` | Project case studies and the shorter "also built" list |
| `src/content/skills.ts` | Skill groups and the "currently" items — also feeds the hero marquee |

`src/content/types.ts` types all of it. Each item carries a `thread` of `software` or
`ai`, which drives the accent colour and tag — that is how the dual positioning stays
visible without a separate AI page.

## Assets

- `src/assets/kingsley.jpg` — headshot, static-imported so Next generates a blur
  placeholder automatically
- `public/kingsley-nweke-resume.pdf` — the downloadable résumé
These two files are the originals now — the `img/` and `resume/` folders they were
copied from have been removed. Replace them in place to update the site.

## Themes

**Light is the default.** Dark is opt-in via the toggle and remembered per browser; the
OS setting is not consulted, so a first-time visitor always meets the light palette.

Every colour is a semantic token in
`src/app/globals.css` (`paper` is the ground, `ink` the foreground), and dark mode only
redefines those values — **no component has a `dark:` variant**. To adjust dark mode,
edit the `[data-theme="dark"]` block, nothing else.

The one exception is the dark band behind "Right now": it is dark in *both* themes, so
its text uses `on-espresso` / `on-espresso-soft` rather than `paper`.

## Deploying

Push to a Vercel project; the defaults are correct. Before going live, set
`profile.siteUrl` in `src/content/profile.ts` to the real domain — it drives the
canonical URL, OpenGraph tags, sitemap and robots.txt.

## Conventions

Design decisions — palette with contrast ratios, type scale, motion invariants,
component conventions — are recorded in [CLAUDE.md](CLAUDE.md). Read it before making
visual changes so later edits stay consistent.
