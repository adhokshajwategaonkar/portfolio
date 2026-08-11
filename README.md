# adhokshaj — portfolio

A static, multi-page portfolio site. **No build step, no dependencies, no `node_modules`.**
Open `index.html` in a browser and it works; push it to GitHub Pages and it works there too.

---

## Why no build step

A Vite/React setup would mean a lockfile, a GitHub Action and a `node_modules` directory for
what is ultimately eight HTML files and one stylesheet. The cost of that choice would be paid
every time a line of copy changes.

What you give up is component reuse, and it shows in exactly one place: **the nav, the footer
and the command-palette markup are duplicated across every page.** Nothing will catch drift
between them. If you change the nav, change it in all eight files — `grep -l 'class="tabs"' -r .`
lists them.

The "app-like" feel comes from the **View Transitions API** (`@view-transition { navigation: auto }`
in `site.css`) rather than from a router. Real URLs, real page loads, animated transitions where
the browser supports them, and a plain fast site where it doesn't.

---

## Layout

```
index.html                  Home — hero, selected work, how I work, career preview, CTA
work/index.html             Work — filterable archive of all 14 projects
career/index.html           Career — interactive timeline, education
about/index.html            About — story, toolkit, "now"
contact/index.html          Contact — email, socials, live products, practicalities
projects/animus/index.html  Native case study — Animus
projects/shastra/index.html Native case study — Shastra
404.html                    Self-contained. See note below.

assets/site.css             The whole design system. Colour lives ONLY in :root and
                            [data-theme="light"]. Never put a hex value anywhere else.
assets/site.js              Theme engine, command palette, filters, timeline, reveals,
                            count-ups, lazy previews. Fully progressive.
assets/og.png               1200×630 social card
assets/favicon.svg

Adhokshaj-Wategaonkar-Resume.pdf
sitemap.xml · robots.txt · .nojekyll
deploy.sh                   One command: commit + push to GitHub Pages
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

# 3 — turn Pages on
gh api -X POST repos/:owner/portfolio/pages -f source[branch]=main -f source[path]=/
#    …or in the browser: Settings → Pages → Source: Deploy from a branch → main → / (root)
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

**Colour has exactly one source of truth.** The `:root` and `[data-theme="light"]` blocks at the top
of `site.css`. The one thing not to "simplify": `--accent` (for fills) and `--accent-ink` (for text)
are separate tokens. The brand orange as *text* on the warm-white canvas fails contrast, so
`--accent-ink` deepens in light mode. In dark they're nearly the same, which is exactly why the
split is easy to delete by accident.

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

## Adding a project to the Work page

Copy any `<a class="card proj" data-card …>` block in `work/index.html` and change three things:

1. `data-tags` — space-separated, from `product case prd company assessment ml`. An item can carry
   more than one (the YouTube Music card is `case prd`, so it appears under both filters).
2. The `href`, badge text, heading and description.
3. **The counts in the filter chips** — those are hand-written in the `<span class="n">` elements
   and nothing recalculates them. The `data-result-count` in the page header *is* computed.

---

## Content sources

| Section | Comes from |
|---|---|
| Career, education, skills | `Adhokshaj-Wategaonkar-Resume.pdf` |
| 12 case studies, collabs, ML projects | [Notion portfolio](https://adhokshaj.notion.site/Hi-I-m-Adhokshaj-d14bd00fa0814905af5147c71f491ab6) |
| Shopsy + YouTube Music PRDs, LILA assessment | The "Portfolio content and links" Figma file |
| Animus + Shastra case studies | Written from the project repos — decisions, tradeoffs and gotchas |

⚠️ **Verify the Notion links open in a private window.** They point at `adhokshaj.notion.site`,
which is the public domain for that workspace, but each sub-page must be shared to web individually
for a stranger to reach it. Anything not shared will render fine for you (you're logged in) and
404 for a recruiter.
