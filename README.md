# adhokshaj — portfolio

A static, multi-page portfolio site. **No dependencies, no `node_modules`, no framework.**
There is a tiny local build (`node build.js`) that stamps shared chrome around each page; the
*deployed* artifact is still plain static HTML that GitHub Pages serves directly.

---

## Why there's a build step (and why it's this small)

Nav, footer, `<head>` and the command palette used to be hand-copied into every page. At five
pages that was an acceptable cost; at thirteen it's a guarantee of drift. So `src/layout.mjs`
holds one copy of the chrome, `src/pages/*.mjs` hold the body of each page, and `node build.js`
writes the HTML.

**The build runs on your machine and the output is committed.** Pages serves static files as
before — no Action, no lockfile, no `node_modules`. The only rule: **edit `src/`, never the
generated `index.html` files**, and run `node build.js` before you deploy. `deploy.sh` does it
for you.

The "app-like" feel still comes from the **View Transitions API**
(`@view-transition { navigation: auto }` in `site.css`), not from a router.

---

## Layout

```
build.js                    node build.js  →  writes every index.html
src/layout.mjs              ONE copy of head, nav, footer, palette + mockup helpers
src/case-template.mjs       shared shell for a case-study page
src/pages/*.mjs             the body of each page. EDIT THESE, not the HTML

index.html                  Home — editorial hero, four featured cases, numbers, career
work/                       Work — filterable archive, all 8 cases + engineering archive
career/  about/  contact/
projects/animus/            solo build · case study
projects/shastra/           solo build · case study
projects/weekend-conundrum/ BookMyShow
projects/zomato/
projects/youtube-music/     + link to the PRD
projects/shopsy/            + link to the PRD
projects/galaxeye/
projects/lila-games/        + link to the original submission
404.html                    self-contained on purpose — see below

assets/site.css             design system. Colour lives ONLY in :root and
                            [data-theme="light"]. Never a hex anywhere else.
assets/site.js              theme, palette, filters, timeline, reveals, previews
assets/og.png · favicon.svg
assets/og.py                regenerates og.png. `python3 assets/og.py`, needs
                            Pillow. Not served, kept next to its output
Adhokshaj-Wategaonkar-Resume.pdf
sitemap.xml · robots.txt · .nojekyll · deploy.sh
```

---

## Deploying to GitHub Pages

The site is plain static files, so Pages needs no configuration beyond pointing at a branch.

### First time

```bash
cd ~/Documents/portfolio

# 1 — create the repo (needs the gh CLI: brew install gh && gh auth login)
gh repo create portfolio --public --source=. --remote=origin

# 2 — first push
git add -A
git commit -m "portfolio site"
git branch -M main
git push -u origin main

# 3 — turn Pages on.
#    The quotes are load-bearing: zsh treats [ ] as glob characters and fails
#    with "no matches found: source[branch]=main" if you leave them off.
gh api -X POST "repos/:owner/portfolio/pages" -f "source[branch]=main" -f "source[path]=/"
#    …or in the browser: Settings → Pages → Source: Deploy from a branch → main → / (root)
```

Check it worked:

```bash
gh api "repos/:owner/portfolio/pages" --jq '.status, .html_url'
```

Live at **`https://adhokshajwategaonkar.github.io/portfolio/`** within a minute or two.

### Every time after that

```bash
bash deploy.sh "what changed"
```

### If you want it at the bare domain

Two options:

- **User site.** Name the repo `adhokshajwategaonkar.github.io` instead of `portfolio`. It then
  serves from `https://adhokshajwategaonkar.github.io/` with no path prefix. Nothing in the code
  needs changing — every internal link is relative on purpose.
- **Custom domain.** Add a `CNAME` file containing the domain, point a DNS `CNAME` record at
  `adhokshajwategaonkar.github.io`, then set it under Settings → Pages.

Either way, **update the absolute URLs** — they appear in the `og:image`, `og:url` and `canonical`
tags in each page's `<head>`, and in `sitemap.xml`. Those are the only absolute paths in the repo:

```bash
grep -rl "adhokshajwategaonkar.github.io/portfolio" .
```

---

## Things worth knowing before you edit

**`.nojekyll` is not optional.** Without it, GitHub Pages runs the files through Jekyll, which
ignores any directory starting with an underscore and can rewrite things unpredictably. The file
is empty; its existence is the whole point.

**`404.html` is deliberately self-contained.** Pages serves it for any unknown path. On a project
site the real root is `/portfolio/`, so a `<link href="/assets/site.css">` would resolve to
`adhokshajwategaonkar.github.io/assets/site.css` and 404 — leaving an unstyled error page. All its
CSS is inline, and a small script at the bottom computes the correct "back home" link from the URL.

**Product mockups are markup, not screenshots.** The Animus phone and the Shastra chart in
`src/layout.mjs` are drawn in HTML/CSS/SVG using each product's *own* design tokens — Animus keeps
its lime-on-near-black, Shastra its chart geometry. They stay sharp at any size, follow the theme,
add zero image weight, and can't silently go stale when the product ships a new build. Repainting
them in the portfolio's indigo would be a lie about what the products look like, so don't.

**Colour has exactly one source of truth.** The `:root` and `[data-theme="light"]` blocks at the top
of `site.css`. The one thing not to "simplify": `--accent` (for fills) and `--accent-ink` (for text)
are separate tokens. The indigo as *text* on the near-white canvas fails contrast, so `--accent-ink`
deepens to `#3A48C9` in light and lifts to `#8B98FF` in dark. `--live` is a third token and exists
for exactly one job — "this is running, go poke it". It is never decoration.

**The theme is resolved before first paint.** Each page has a tiny blocking script in its `<head>`
that reads `localStorage` and sets `data-theme`. If that ran in `site.js` instead, every cold start
would flash near-black at a light-mode visitor. Don't move it.

**Live previews are lazy on purpose.** The Animus app runs on Render's free tier, which sleeps after
15 minutes and cold-starts in about 50 seconds. The iframe is only attached when someone clicks, and
hovering the button fires a pre-warm fetch first. An eager iframe would show every visitor a spinner.

**Nothing depends on JavaScript.** If `site.js` fails to load, `html:not(.js) .rise` keeps every
revealed section visible, all navigation is real links, and the filter chips simply do nothing. Test
this by blocking the script in devtools.

---

## Adding a project

1. Copy a file in `src/pages/` — `project-galaxeye.mjs` is the fullest example, the five generated
   ones are leaner.
2. Add an entry to the `PROJECTS` array at the top of `src/pages/work.mjs`. **The filter chips and
   their counts are derived from that array**, so they can't drift — unlike the previous version,
   where they were hand-typed and immediately wrong.
3. `node build.js`.

---

## Content sources

| Section | Comes from |
|---|---|
| Career, education, skills | `Adhokshaj-Wategaonkar-Resume.pdf` |
| Animus + Shastra | Written from the project repos — real decisions, trade-offs and gotchas |
| GalaxEye | The résumé, expanded |
| BookMyShow, Zomato, YouTube Music, Shopsy, LILA | The "Portfolio content and links" Figma decks + Adho's own notes |
| Shopsy + YouTube Music PRDs | Google Docs, linked from their pages |

**No page redirects to the old Notion portfolio.** Two exceptions, both deliberate: the two
archived ML projects on `/work/`, and the LILA take-home, where the original submission *is* the
artifact and rewriting it would defeat the point.
