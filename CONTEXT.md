# Context for editing this site

Replaced the multi-page site on 25 Nov 2026. The old site and the dropped assignments are kept
outside the repo in `../portfolio-archive/`, and in git history.

**Routes** are hash names: `#top #work #experience #cases #contact`, product views `#animus`,
`#animus-case`, `#animus-play-<piece>` (same for `shastra`), decks `#case-bookmyshow`, `#case-zomato`.

**Rules for copy:** short, plain, first person, no em dashes, no invented facts.

**Traps**
- Drawings in `js/anims.js` share one stylesheet. A new drawing that reuses a class prefix breaks an old one.
- Using the `scale` property together with `transform` scales the translate too. Position with `translate`.
- The résumé link is relative (`Adhokshaj-Wategaonkar-Resume.pdf`). Keep the PDF's filename.
- Shastra's API allows only the `https://adhokshajwategaonkar.github.io` origin.
