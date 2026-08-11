# CONTEXT.md — read this first

Working notes for a fresh session on **Adhokshaj Wategaonkar's portfolio site**.
`README.md` explains how the site works. This file explains *why it looks like this* and what's
still outstanding. Keep it current as part of the work; Adho should never have to say
"remember this."

There is no active brief. The next scheduled job is the site-wide copy rewrite, under Roadmap.

---

## Who this is for

**Adhokshaj Wategaonkar** — Product Manager, Bengaluru. adhokshaj.pande@gmail.com · +91 8552886369
· [LinkedIn](https://www.linkedin.com/in/adhokshaj/) · [X](https://twitter.com/AdhokshajW)

### Positioning

**A generalist product manager who wants to build good products, with AI and LLMs as the material
he works in.** Not an "AI infrastructure PM". Not locked to platform or infra roles. Not locked to
Bengaluru. The site says this correctly as of 2026-08-11; if you find a page still narrowing it to
"AI platform or infrastructure, Bengaluru or remote", that page was missed.

- **Open to any product opportunity** where he gets to use AI and LLMs to solve real problems.
- **B2B and B2C both.** His employed work is B2B (enterprise AI, space tech, identity); the two
  products he built himself, Animus and Shastra, are B2C. That range is an asset, not a conflict.
- The thing to convey is **range and judgement**, not a specialism.

Career: L&T Technology Services (SDE, ML on Azure, 2021–22) → EarthID (PM, verifiable credentials
and ZKP KYC, 2023–24) → GalaxEye Space (APM, satellite intelligence and SAR analytics, 2024–25) →
Beacon.li (APM, enterprise AI platform, Oct 2025 – Jun 2026). B.Tech CSE + ML/DS, MIT School of
Engineering, Pune.

---

## Writing rules — these are hard rules, not preferences

Adho's exact words: *"Copy is too AI. Never use em dashes."*

1. **No em dashes. Anywhere.** Not in copy, not in headings, not in captions, not in CONTEXT.md.
   Use a full stop, a comma, a colon, or restructure the sentence. This is the single most
   frequent tell and the site is currently full of them.
2. **No "It's not X, it's Y" constructions.** Also banned: "X isn't a Y problem, it's a Z problem",
   "The point isn't X. It's Y."
3. **No rhetorical question immediately answered by the writer.** ("So what's the actual problem?
   It's this.")
4. **No three-item rhythmic lists used for cadence** rather than because there are exactly three
   things.
5. **No "which is exactly why", "precisely why", "and that's the whole point", "the interesting
   thing is", "here's the thing", "worth knowing", "genuinely", "delve", "leverage", "robust",
   "seamless", "in today's landscape".**
6. **Cut sentence fragments used for emphasis.** ("Same engine, two products." "A time delta, not
   an engagement metric.")
7. **Vary sentence length naturally.** LLM prose has a very even rhythm. Read it aloud.
8. **Say the concrete thing first.** Prefer "the app takes 50 seconds to wake up" over
   "cold starts are a consideration".

**Scope right now:** these rules are binding for **any copy you write or rewrite**. The existing
copy across the site does not follow them yet. Cleaning that up retroactively is a scheduled job of
its own, listed under Roadmap. Do not start it as a side quest; it is a rewrite pass, and a
de-dashed AI paragraph still reads like an AI paragraph.

---

## Content rules Adho has stated

1. **Every case study states the problem it solves.** A reader must be able to tell, from the top
   of any project page and from its card, *what problem exists in the world* and *why this was
   built*. Applies to Animus, Shastra and every case study. **Done as of 2026-08-11:** a
   **Problem** row is the first row of the spec table on all nine project pages, above Role, and
   the first sentence of every card on `/work/` and the home page names the problem rather than the
   mechanism. A new project needs both or it is not finished.
2. **No redirects to the old Notion portfolio.** Two deliberate exceptions: the GalaxEye 30-page
   strategy and the LILA submission, because those documents are the artefacts themselves.
3. **Removed on request:** the EarthID and FleetPanda case-study cards. EarthID stays in the career
   timeline; it is a real job, just not a case study.
4. **Nothing invented.** Where a case needs facts only Adho has, the page carries honest framing and
   method rather than fabricated findings or metrics.
5. **Artefacts are evidence.** Wireframes, deck slides and review screenshots get a framed figure, a
   mono caption and click-to-enlarge. A wireframe shown at 300px is decoration.

---

## Visual direction (this is the current state, not a target)

Adho compared the warm/orange scheme against an indigo one and **chose warm/orange with a statement
hero**. That is what is in the repo now. The indigo scheme and the flattened `.intro-name` headings
were rolled back on 2026-08-11. **Do not reintroduce them**, and treat a request for "a cooler,
more platform-y palette" as a decision that has already been made and lost.

**Vercel structure + CRED texture.** Vercel's grid discipline (persistent vertical hairline rules,
full-bleed section dividers, tight type, mono uppercase labels) carrying CRED's depth (near-black
canvas, film grain, one accent per screen, spring motion).

**Warm near-black canvas, signal orange, soft radii.** Dark canvas `#0A0A0B`, light canvas the warm
off-white `#FAFAF7`, accent `#FF4D1C`. `404.html` is deliberately self-contained and carries its own
copy of the token block, so **it has to be edited by hand whenever the tokens change**. It is
currently in step.

**Three hardcoded copies of the canvas colour exist and none of them can read the CSS.** `--bg` in
`site.css`, the `theme-color` meta in `src/layout.mjs`, and `applyTheme()` in `assets/site.js`.
Change one, change all three, or the phone status bar goes the wrong colour on theme switch.

**Radii are tokens and the scale is deliberate**, top to bottom: `--r-pill` 100px (only
`.availability` and `.chip`), `--r-2xl` 18px (big CTA), `--r-xl` 15px (cards, palette), `--r-lg`
13px (frames, figures, deck), `--r-md` 11px (buttons, toast, callout), `--r-sm` 9px (icon buttons,
palette rows), `--r-tab` 8px (nav tabs and the sliding pill), `--r-xs` 6px (badges), `--r-2xs` 5px
(tags, code, kbd, focus ring). `--r-tab` and `--r-pill` are named for their one job rather than
their size, because that is what stops someone reaching for them by accident.

**The accent splits in three, and this is the part that is easy to break:**

| Token | Job | Note |
|---|---|---|
| `--accent` | Fills only | Near-black text sits on it at about 6:1 |
| `--accent-ink` | Text only | Must deepen in light mode or it fails contrast on the canvas |
| `--live` | "This is running, go and look at it" | Never decoration |

If you find yourself writing `color: var(--accent)`, you almost certainly want `--accent-ink`.

**Colour lives ONLY in `:root` and `[data-theme="light"]` in `assets/site.css`.** The thirteen hex
values below those blocks are all inside the phone and WhatsApp mockup rules, which keep each
product's own palette on purpose. Nothing else in the file may carry a hex.

**The hero is a statement, not a name.** `<h1 class="display">` reading "I turn ambiguous AI
problems into shipped product." with *shipped* in `.serif .accent`, the `.availability` pill above
it, three buttons below. Work, career, about, contact and the two solo-build case studies use
`.display` with the same serif-italic flourish. `.intro-name` survives only in `case-template.mjs`,
where the headings are full sentences and a 5rem display size would be absurd. **Adho asked for the
statement hero explicitly and does not want his name set as the big heading.**

**Product mockups are markup, not screenshots.** `src/layout.mjs` draws the Animus phone feed, the
WhatsApp capture thread and the Shastra kundli chart in HTML, CSS and SVG. They keep **each
product's own palette**: Animus stays lime on near-black, Shastra keeps its chart geometry.
Repainting them in the site's accent would misrepresent the products.

**Every card gets the same cover frame.** Products show a mockup; case studies show a miniature of
their opening slide (`slide()` in `layout.mjs`). No emoji anywhere on the site.

**Fonts load asynchronously.** A render-blocking Google Fonts link showed a blank page for as long
as the CDN was slow. `preload` plus a `media="print"` swap. Do not revert this.

**The theme button carries all three icons and CSS picks one.** `applyTheme()` writes `data-pref`
on it; `[data-theme-btn][data-pref="…"] [data-icon="…"]` in `site.css` shows the monitor, sun or
moon. Swapping `innerHTML` from JS was the obvious alternative and is worse: the markup ships with
`data-pref="system"` so the right icon is painted before `site.js` runs at all.

**`assets/og.py` regenerates `assets/og.png`.** Pillow, Lato and DejaVu Sans Mono, no network. The
hexes in it are a hand copy of the token block, same problem as the other three.

**There is a build step and it is local.** `src/layout.mjs` plus `src/pages/*.mjs`, then
`node build.js`, then the generated HTML is committed. **Edit `src/`, never the generated
`index.html` files.** `deploy.sh` rebuilds first.

**Filter chips derive their counts from the `PROJECTS` array** in `src/pages/work.mjs`.

---

## State

| | |
|---|---|
| ✅ | Design system, 5 tabs, command palette (⌘K), theme (system/light/dark, resolved pre-paint, three icons), filters synced to URL, career timeline, lightbox, view transitions |
| ✅ | **Warm/orange palette, soft radii, statement hero.** Rolled back to Adho's preferred look on 2026-08-11 and verified across 15 pages, two themes, desktop and 390px |
| ✅ | **Positioning is open.** Any product role working with AI and LLMs, B2B or B2C. No page still says "AI platform or infrastructure, Bengaluru or remote" |
| ✅ | **Every project states its problem.** A Problem row on all nine spec tables, problem-first card copy on `/work/` and home |
| ✅ | **Animus** — full case study, drawn mockups, links to both the site and the app |
| ✅ | **Shastra** — full case study, kundli mockup, the PII-free digest the model receives |
| ✅ | **Beacon.li × Deel** — built from the PDF, with the real G2 evidence and all five wireframes extracted into `assets/cases/beacon/` |
| ✅ | **BookMyShow + Zomato** — written from the decks, key slides inline as figures, plus a slide-by-slide deck viewer and the PDF |
| ✅ | **GalaxEye** — framed around the 30-page strategy on selling satellite intelligence to insurers |
| ✅ | **Engineering / ML archive** — links to the Google Drive PDFs |
| ⚠️ | **YouTube Music + Shopsy + LILA Games** — correct titles and framing from Adho's beats, but no findings, numbers or trade-offs. Needs their decks as PDFs |
| ⏳ | Not deployed by Claude. Adho pushes. Repo `portfolio`, Pages from `main` → `/` |

---

## The deck viewer

`deckViewer(base, slides, pdf)` in `src/layout.mjs`, `.deck` in `site.css`, the `[data-deck]` block
in `site.js`. Slides live at `assets/cases/<name>/sNN.jpg`, rendered from the source PDF at 1400px
wide, JPEG q80. Arrow keys work but **only while the deck is in view**, otherwise it hijacks arrow
scrolling for the whole page. First four thumbnails are eager, the rest lazy. Clicking a slide opens
the shared lightbox.

Deck PDFs are compressed with Ghostscript (`-dPDFSETTINGS=/screen -dColorImageResolution=110`); the
BookMyShow deck was 14 MB raw. `assets/cases/` is about 19 MB, which is fine because the slides are
lazy and the PDFs are opt-in downloads.

### Extracting artefacts from a PDF (this worked, reuse it)

```bash
pip install pymupdf pdfplumber --break-system-packages -q
python3 -c "
import pymupdf
d = pymupdf.open('SOURCE.pdf')
for i, page in enumerate(d, 1):
    print(i, [(x[2], x[3]) for x in page.get_images(full=True)])
"
# then extract, downscale to 1400px, save as JPEG q80 into assets/cases/<name>/
```

Text comes out of `pdfplumber` with `page.extract_text()`. The Beacon, BookMyShow and Zomato pages
were written entirely from that, and they are the three strongest pages on the site.

---

## Traps

- **`figma.com` and `fonts.googleapis.com` are blocked from the sandbox proxy.** Do not burn calls
  retrying. Get files from Adho, or use the Chrome MCP.
- **Notion's public renderer never reaches `document_idle`**, so `get_page_text` times out on
  `adhokshaj.notion.site`. Do not use Notion as a content source.
- **Chrome is granted at tier "read"** to computer-use: screenshots only, no clicks, scrolling or
  keystrokes. To see a page, open it from Finder (`cmd+shift+g`, type the path, Return, then
  `cmd+o`), and re-focus Finder before every keystroke or the keys land in Chrome.
- **To see a whole page, run headless Chromium in the sandbox.** This replaces the iframe
  contact-sheet trick and is much better: real screenshots at any viewport, both themes, full page,
  plus console and page errors. Setup, once per session:

  ```bash
  pip install playwright --break-system-packages -q
  python3 -m playwright install chromium          # ignore the install-deps warning
  ```

  It then fails to launch with **`libXdamage.so.1 => not found`**, which is the only missing
  library and is not installable (the apt proxy returns 403). Stub it, because headless never
  calls into the X damage extension:

  ```bash
  mkdir -p /tmp/stub && cd /tmp/stub && cat > s.c <<'C'
  int XDamageQueryExtension(void*d,int*e,int*r){if(e)*e=0;if(r)*r=0;return 0;}
  unsigned long XDamageCreate(void*d,unsigned long dr,int l){return 0;}
  int XDamageDestroy(void*d,unsigned long dm){return 0;}
  int XDamageSubtract(void*d,unsigned long dm,unsigned long a,unsigned long b){return 0;}
  C
  gcc -shared -fPIC -o libXdamage.so.1 s.c
  # then run everything with:
  LD_LIBRARY_PATH=/tmp/stub PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1 python3 shots.py
  ```

  Serve the repo with `http.server` rather than opening `file://`, seed the theme with an init
  script writing `localStorage['aw.theme']`, and force the reveal animations done with
  `document.querySelectorAll('.rise').forEach(e=>e.classList.add('in'))` or every screenshot below
  the fold is blank. Google Fonts is blocked, so renders use the fallback stack and Instrument
  Serif shows as a generic serif. Fine for layout and colour, not for judging type.
- **`.nojekyll` must exist** or Pages mangles the site.
- **`404.html` is deliberately self-contained**, because on a project site `/assets/site.css`
  resolves above the repo root and 404s.

---

## Bugs already found and fixed. Do not reintroduce

1. **Render-blocking font stylesheet caused a blank page.** Now async.
2. **`min-height: 100%` on `.card-pad.proj`** demanded the full card height on top of the cover,
   overflowed the flex column and collapsed every project cover to zero height. Now `flex: 1 1 auto`
   on the body and `flex: none` on the cover.
3. **`grid--2` used `auto-fit` with `minmax`**, which silently produced 3 columns on a wide screen.
   Column counts are explicit at breakpoints now.
4. **Filter chip counts were hand-typed** and immediately wrong. Now derived from `PROJECTS`.
5. **`zsh` globs `[` and `]`.** The Pages enable command needs quotes:
   `gh api -X POST "repos/:owner/portfolio/pages" -f "source[branch]=main" -f "source[path]=/"`
6. **The nav brand read as two words with a hole in it.** `.brand` was `display:flex; gap:10px`, so
   the gap applied between the "Adhokshaj" text node and the `.sur` span as well as after the dot,
   and the markup carried a literal `&nbsp;` on top of that. Roughly 15px where a word space is 5.
   Now `gap:0`, the dot owns `margin-right:10px`, and `.sur` gets `margin-left:.3em`. The footer
   brand uses different markup with a real space and works under the same rules.
7. **The theme toggle showed one icon for all three states.** Fixed in CSS off `data-pref`; see the
   visual direction section.
8. **`.stats` used `auto-fit` with `minmax(160px,1fr)`**, which resolved to three columns between
   roughly 600 and 700px and left the fourth stat alone on a second row with an underline a third
   the width of the one above it. Four items divide cleanly by 2 and by 4, so those are now the only
   two counts. Same bug as #3, second time; **stop reaching for `auto-fit`.**
9. **The timeline spine poked out above the first node.** `.tl-row:first-child::before` started at
   `top:22px` while the node's centre is at 31.5px. Both ends are now pinned to 31.5px. If the node
   size or its `top` ever changes, all three numbers move together.
10. **Figures in a `.figs` row had captions on different baselines**, because each `.fig-frame`
    shrink-wrapped its own image. `.figs .fig` is now a flex column with the frame set to
    `flex:1 1 auto`, so frames in a row share a height.

---

## Related repos

- `~/Documents/Pin` — **Animus**. Has its own `CLAUDE.md` with the full decision log.
- `~/Documents/Shastra` — **Shastra**. Same.

Both are the source of truth for those two case studies. Read their `CLAUDE.md` before editing
either page; the specific figures come from there.

---

## Roadmap — agreed, not yet scheduled

### 1. Site-wide copy rewrite (the "too AI" pass)

Adho's note: *"Copy is too AI. Never use em dashes. Also look for other tell-tale signs of AI use
and remove those patterns."* The writing rules near the top of this file are the spec.

Deliberately split into its own session because it is roughly **5,000 words across 15 pages**, and
doing it properly means reworking paragraphs rather than deleting punctuation. Stripping the dashes
alone would leave the same prose rhythm and fail the actual request.

Order to work in, worst first: `project-animus.mjs` (Adho named this one), then `project-shastra`,
`project-zomato`, `project-weekend-conundrum`, `project-beacon`, `project-galaxeye`, then the five
top-level pages, then the card copy in `work.mjs` and `home.mjs`, then the strings inside
`layout.mjs` and `case-template.mjs`. Check the code comments too; they are full of the same tells.

**Already clean, leave alone:** the home hero and its lead, the closing CTA on home and career, the
"Looking for" and "Open to" rows, the footer blurb, the nine Problem rows, and every card body on
`/work/` and home. Those were written to the rules on 2026-08-11.

**One thing the rewrite has to settle:** page `<title>` values use an em dash as a separator on
fourteen pages ("Work — Adhokshaj Wategaonkar"). Home was changed to a comma, so the set is
inconsistent until someone picks one. It is a separator convention rather than prose, so it needs
Adho's call rather than a guess.

Suggested method: read each page rendered, not as source, and rewrite paragraph by paragraph in
Adho's own register. The strongest existing reference for tone is what he writes in the Animus and
Shastra `CLAUDE.md` files.

### 2. YouTube Music, Shopsy and LILA Games need their decks

All three have correct titles and framing but no findings, numbers or trade-offs. One PDF each is
all it takes; the extraction method above turned Beacon, BookMyShow and Zomato into the three
strongest pages on the site.
