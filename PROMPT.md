# Prompt for the next session

Copy everything below the line into a new session with `~/Documents/portfolio` connected.

---

Work in `~/Documents/portfolio`.

**First, read `CONTEXT.md` in that folder, all of it.** It carries the design decisions, the writing
rules, the traps, and an active brief at the bottom titled **"Next session brief — visual rollback"**.
That brief is your task list. Follow it in order.

The short version: I compared the current build against an earlier one and I prefer how the earlier
one looked. **Roll back appearance and hero copy only. Do not roll back anything functional.**
Everything shipped since then stays exactly as it is: the `src/` build system, all nine case-study
pages, the deck viewer, the lightbox, the figures, the command palette, the filters, the career
timeline, the drawn product mockups, the Google Drive links, the Beacon page.

Specifically:

1. **Restore the warm palette.** Signal orange `#FF4D1C`, warm near-black `#0A0A0B` canvas, warm
   off-white `#FAFAF7` in light mode. `404.html` was never migrated to indigo, so it still has the
   original token block. Use it as the reference. Remember the hardcoded `theme-color` values in
   `src/layout.mjs` and `assets/site.js`, and regenerate `assets/og.png` in orange.
2. **Soften the radii back** to cards 15px, buttons 11px, and 100px pills for `.availability` and
   `.chip`. Change the token values, keep the tokens.
3. **Restore the statement hero.** `<h1 class="display">` reading "I turn ambiguous AI problems into
   shipped product." with *shipped* in serif italic accent, the availability pill above it, three
   buttons below. Do not put my name in the hero as a big heading. Apply the same reversal to the
   other page headings that were flattened.
4. **Every project page and every project card must state the problem it solves**, starting with
   Animus. A reader should know what problem exists in the world and why I built the thing. Add a
   Problem row as the first row of each spec table.
5. **Fix the UI defects.** The gap between "Adhokshaj" and "Wategaonkar" in the nav is far too wide.
   The theme toggle shows one icon for all three states and needs three. Then go looking for others
   at desktop and 390px in both themes.
6. **Loosen my positioning.** The site currently says I want a PM role on an AI platform or
   infrastructure team in Bengaluru or remote. Too narrow. I am open to **any** product role where I
   get to work with AI and LLMs on real problems, B2B or B2C. My employed work is B2B; Animus and
   Shastra are B2C, which is useful proof of range. Read as a generalist who builds good products.
   `CONTEXT.md` lists every file carrying the over-specialised framing.

**Not in scope this session:** the site-wide copy rewrite. The existing copy reads too much like AI
and is full of em dashes, but fixing that properly is a rewrite pass across about 5,000 words and it
is booked as its own job under Roadmap in `CONTEXT.md`. Do not start it. **Any new copy you write in
this session does have to follow the writing rules in `CONTEXT.md`**, including no em dashes: that
means the hero lead, the problem statements in item 4, and the positioning lines in item 6.

Rules while you work:

- **Edit `src/`, never the generated `index.html` files.** Run `node build.js` after changes.
- Colour lives only in the `:root` and `[data-theme="light"]` blocks in `assets/site.css`.
- Do not deploy. I push with `bash deploy.sh "message"`.
- Ask me for files rather than fighting a blocked domain. `figma.com`, `fonts.googleapis.com` and
  Notion's renderer all fail from your sandbox; `CONTEXT.md` explains what does work.
- Verify at the end: build, check markup balance and local links, view all 15 pages in both themes
  with a temporary iframe contact sheet, then delete it. Check the copy you newly wrote, not the
  copy you inherited.
- **Update `CONTEXT.md` as part of the work.** When the rollback is done, rewrite the visual
  direction section so it describes the orange scheme as the current state rather than as a target,
  and delete the brief you just completed.
