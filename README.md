# Adhokshaj Wategaonkar, portfolio

https://adhokshajwategaonkar.github.io/portfolio/

A single static page with plain ES modules. No build step and no dependencies. GitHub Pages serves
`main` from the repo root.

- `index.html` the page. `css/site.css` all site styles. `css/exhibits/` the product demos' styles.
- `js/app.js` routes and views. `js/content.js` most of the copy. Product demos are in `js/exhibits/`.
- `assets/` slides, fonts, cursors, photo, icons, and `og.png` (the link preview image).
- `work/`, `career/`, `about/`, `contact/`, `projects/*` are redirects from the old site's addresses.

Preview: `python3 -m http.server 4173` in this folder, then open `http://localhost:4173/`. The Shastra
demos fetch live data only from the published address; locally they show saved results.

Deploy: `bash deploy.sh "what changed"`. It checks the basics, commits and pushes.

`next/`, `v2/`, `desk/` and `resume/` are local drafts and are git-ignored, because anything committed
here is public.
