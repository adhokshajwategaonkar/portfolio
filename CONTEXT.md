# CONTEXT.md — read this first

Working notes for a fresh session on **Adhokshaj Wategaonkar's portfolio site**.
`README.md` explains how the site works. This file explains *why it looks like this* and
**what's still outstanding** — the things a new session cannot re-derive from the code.

Keep it current as part of the work. Adho should never have to say "remember this."

---

## Who this is for

**Adhokshaj Wategaonkar** — Product Manager, Bengaluru. adhokshaj.pande@gmail.com · +91 8552886369
· [LinkedIn](https://www.linkedin.com/in/adhokshaj/) · [X](https://twitter.com/AdhokshajW)

Positioning: **AI platforms**. Multi-provider LLM gateways, agent orchestration, and interfaces
that make non-deterministic systems inspectable. The audience is a **senior PM or hiring manager**,
so the register is credibility and judgement — not visual flourish.

Career: L&T Technology Services (SDE, ML on Azure, 2021–22) → EarthID (PM, verifiable credentials
and ZKP KYC, 2023–24) → GalaxEye Space (APM, SAR analytics for defence, 2024–25) → Beacon.li (APM,
enterprise AI platform, Oct 2025 – Jun 2026). B.Tech CSE + ML/DS, MIT School of Engineering, Pune.

---

## Design decisions — don't undo these without reading the reason

**Vercel structure + CRED texture.** Vercel's grid discipline (persistent vertical hairline rules,
full-bleed section dividers, tight type, mono uppercase labels) carrying CRED's depth (near-black
canvas, film grain, one accent per screen, spring motion). Adho picked this hybrid explicitly.

**Indigo `#4F5EE8`, not orange.** The site shipped orange first. It read *creative agency*; indigo
reads *platform/infrastructure*, which is the register the work sits in. Chosen against the
Linear/Stripe reference set after Adho asked "what do senior PMs want to see".

**The accent splits in three, and this is the part that's easy to break:**

| Token | Job | Dark | Light |
|---|---|---|---|
| `--accent` | **Fills only.** White text on it is 5.1:1 | `#4F5EE8` | `#4F5EE8` |
| `--accent-ink` | **Text only.** Must change per theme or it fails contrast | `#8B98FF` (7.6:1) | `#3A48C9` (7.8:1) |
| `--live` | "This is running, go poke it." **Never decoration** | `#34D399` | `#10B981` / ink `#0F7A4E` |

If you find yourself writing `color: var(--accent)`, you almost certainly want `--accent-ink`.

**Colour lives ONLY in `:root` and `[data-theme="light"]` in `assets/site.css`.** No hex anywhere
else in the file. Radii are tokens too (`--r-lg` 10px → `--r-xs` 4px) — Adho asked for sharper,
Vercel-like geometry, so **no pills anywhere**.

**Editorial-minimal hero.** Name is the H1; role, location and availability are three mono facts on
one rule; two sentences of substance; three links. Adho rejected the earlier statement hero
("I turn ambiguous AI problems into shipped product" with a serif italic) as not clean enough. The
serif italic flourish was removed site-wide. **Don't reintroduce a tagline hero.**

**Product mockups are markup, not screenshots.** `src/layout.mjs` draws the Animus phone feed, the
WhatsApp capture thread and the Shastra kundli chart in HTML/CSS/SVG. They keep **each product's
own palette** — Animus stays lime-on-near-black, Shastra keeps its chart geometry. Repainting them
in the portfolio's indigo would misrepresent the products. They're sharp at any size, themeable,
weigh nothing, and can't go stale.

**Every card gets the same cover frame.** Products show a mockup; case studies show a miniature of
their opening slide (`slide()` in `layout.mjs`). Adho's complaint was that two cards had icons and
two had nothing — uniformity of *frame* is what fixed it. **No emoji anywhere on the site.**

**Fonts load asynchronously.** A render-blocking Google Fonts link showed a blank page for as long
as the CDN was slow — caught live during review. `preload` + `media="print"` swap. Don't revert.

**There is a build step, and it is local.** `src/layout.mjs` + `src/pages/*.mjs` → `node build.js`
→ committed HTML. Introduced when the page count hit 13 and hand-copied navs became a guarantee of
drift. **Edit `src/`, never the generated `index.html` files.** `deploy.sh` rebuilds first.

**Filter chips derive their counts from the `PROJECTS` array** in `src/pages/work.mjs`. The earlier
hand-typed version was wrong within an hour. Add a project there, not in markup.

---

## Content rules Adho has stated

1. **No redirects to the old Notion portfolio.** Every case study is native. Two deliberate
   exceptions remain, both flagged below as open items.
2. **Removed on request:** the EarthID and FleetPanda case-study cards. EarthID *stays* in the
   career timeline — it's a real job, just not a case study.
3. **Nothing invented.** Where a case needs facts only Adho has, the page carries honest framing
   and method rather than fabricated findings or metrics.
4. **Artefacts are evidence.** Wireframes, deck slides and review screenshots get a framed figure,
   a mono caption and click-to-enlarge (`.fig` / `.figs` / lightbox in `site.js`). A wireframe shown
   at 300px is decoration.

---

## State

| | |
|---|---|
| ✅ | Design system, 5 tabs, command palette (⌘K), theme (system/light/dark, pre-paint), filters synced to URL, career timeline, lightbox, view transitions |
| ✅ | **Animus** — full case study, mockups, both links (site + app), "things that went wrong" trimmed to one callout on request |
| ✅ | **Shastra** — full case study, kundli mockup + the PII-free digest the model receives |
| ✅ | **Beacon.li × Deel** — full case study built from the PDF, with the real G2 evidence and all five wireframes extracted from the source PDF into `assets/cases/beacon/` |
| ✅ | **BookMyShow + Zomato** — full case studies written from the decks, with key slides inline as figures and a **slide-by-slide deck viewer** (arrow keys, thumbnail rail, lightbox) plus the PDF |
| ✅ | **GalaxEye** — reframed around the real artefact: a 30-page strategy on selling satellite intelligence to insurers. The SAR/defence work is now a section, not the headline |
| ✅ | **Engineering / ML archive** — now links to the Google Drive PDFs, not Notion |
| ⚠️ | **YouTube Music + Shopsy** — correct framing and titles from Adho's beats, method + PRD links. **Still no findings, numbers or trade-offs** |
| ⚠️ | **LILA Games** — correct framing (crafting economies, staffing models, monetisation). Still no specifics |
| ⏳ | Not deployed by me — Adho pushes. Repo `portfolio`, Pages from `main` → `/` |

---

## Open items — what to ask Adho for

**Only one thing is outstanding.** Everything Adho has sent has been built in.

1. **Source material for YouTube Music, Shopsy and LILA Games.** All three now have the right
   framing and title from Adho's beats, plus links to their real artefacts — but no findings,
   numbers or trade-offs, because those would have to be invented. A deck or doc PDF is all that's
   needed; the extraction method below turned the Beacon, BookMyShow and Zomato PDFs into the three
   best pages on the site.

### Extracting artefacts from a PDF (this worked, reuse it)

```bash
pip install pymupdf pdfplumber --break-system-packages -q
python3 -c "
import pymupdf
d = pymupdf.open('SOURCE.pdf')
for i, page in enumerate(d, 1):
    print(i, [(x[2], x[3]) for x in page.get_images(full=True)])   # find the good pages
"
# then extract, downscale to 1400px, save as JPEG q82 into assets/cases/<name>/
```

Text comes out with `pdfplumber` — `page.extract_text()`. The Beacon case study was written
entirely from that, and it is the best-quality page on the site as a result.

---

## The deck viewer

`deckViewer(base, slides, pdf)` in `src/layout.mjs` + `.deck` in `site.css` + the `[data-deck]`
block in `site.js`. Slides live at `assets/cases/<name>/sNN.jpg`, rendered from the source PDF at
1400px wide, JPEG q80. Arrow keys work but **only while the deck is in view** — otherwise it would
hijack arrow scrolling on the whole page. First four thumbnails are eager, the rest lazy, so a
12-slide deck doesn't cost 1.6 MB on first paint. Clicking a slide opens the shared lightbox.

Deck PDFs are compressed with Ghostscript (`-dPDFSETTINGS=/screen -dColorImageResolution=110`);
the BookMyShow deck was 14 MB raw. `assets/cases/` is ~18 MB total, which is fine for Pages
because the slides are lazy and the PDFs are opt-in downloads.

---

## Traps

- **`figma.com` and `fonts.googleapis.com` are blocked from the sandbox proxy.** Don't burn calls
  retrying. Fetch via the user, or via the Chrome MCP.
- **Notion's public renderer never reaches `document_idle`**, so `get_page_text` times out on
  `adhokshaj.notion.site`. Don't use Notion as a content source.
- **Chrome is granted at tier "read"** to computer-use — screenshots only, no clicks, no scrolling,
  no keystrokes. To *see* a page, open it from Finder (`cmd+shift+g`, type path, Return, then
  `cmd+o`), and re-focus Finder before every keystroke or the keys land in Chrome.
- **To see a whole page**, build a temporary contact-sheet HTML with scaled iframes rather than
  trying to scroll. Delete it afterwards. `mcp__cowork__allow_cowork_file_delete` unlocks `rm`.
- **`.nojekyll` must exist** or Pages mangles the site.
- **`404.html` is deliberately self-contained** — on a project site `/assets/site.css` resolves
  above the repo root and 404s, leaving an unstyled error page.

---

## Bugs already found and fixed — don't reintroduce

1. **Render-blocking font stylesheet → blank page.** Now async.
2. **`min-height: 100%` on `.card-pad.proj`** demanded the full card height *on top of* the cover,
   overflowing the flex column and collapsing every project cover to zero. Now `flex: 1 1 auto` on
   the body and `flex: none` on the cover.
3. **`grid--2` used `auto-fit`/`minmax`**, which silently produced 3 columns on a wide screen. Column
   counts are now explicit at breakpoints — they're a design decision, not a derived value.
4. **Filter chip counts were hand-typed** and immediately wrong. Now derived.
5. **`zsh` globs `[` and `]`** — the Pages enable command needs quotes:
   `gh api -X POST "repos/:owner/portfolio/pages" -f "source[branch]=main" -f "source[path]=/"`

---

## Related repos (Adho's, for context on the two solo builds)

- `~/Documents/Pin` — **Animus**. Has its own `CLAUDE.md` with the full decision log.
- `~/Documents/Shastra` — **Shastra**. Same.

Both are the source of truth for those two case studies. Read their `CLAUDE.md` before editing
either page — the specifics (₹ figures, test counts, gotcha numbers) come from there.
