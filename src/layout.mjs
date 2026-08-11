/* ============================================================================
   One copy of every piece of page chrome. `node build.js` stamps these around
   each file in src/pages/ and writes the static HTML that GitHub Pages serves.

   The build is LOCAL. The deployed artifact is still plain static files with no
   runtime dependency — this exists only so the nav isn't hand-copied into
   fourteen files, which is how nav drift happens.
   ========================================================================= */

export const SITE = {
  name:  'Adhokshaj Wategaonkar',
  role:  'Product Manager',
  email: 'adhokshaj.pande@gmail.com',
  base:  'https://adhokshajwategaonkar.github.io/portfolio',
  linkedin: 'https://www.linkedin.com/in/adhokshaj/',
  twitter:  'https://twitter.com/AdhokshajW',
  resume:   'Adhokshaj-Wategaonkar-Resume.pdf',
  animusApp:  'https://animus-jwui.onrender.com',
  animusSite: 'https://adhokshajwategaonkar.github.io/animus-site/',
  shastraSite:'https://adhokshajwategaonkar.github.io/shastra-site/',
};

const TABS = [
  ['home',    '',        'Home'],
  ['work',    'work/',   'Work'],
  ['career',  'career/', 'Career'],
  ['about',   'about/',  'About'],
  ['contact', 'contact/','Contact'],
];

const FONTS = 'https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap';

export const icon = {
  arrow:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrowOut: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4 10 14"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
  mail:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  copy:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  chevron:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
};

/** Depth-aware root prefix, so the site works at / or at /repo-name/. */
const rootFor = dir => dir ? '../'.repeat(dir.split('/').length) : './';

export function render(p) {
  const R = rootFor(p.dir);
  const canonical = `${SITE.base}/${p.dir ? p.dir + '/' : ''}`;
  const tabs = TABS.map(([key, href, text]) =>
    `<a href="${key === 'home' ? R : R + href}"${key === p.nav ? ' aria-current="page"' : ''}>${text}</a>`
  ).join('\n      ');
  const sheet = TABS.map(([key, href, text], i) =>
    `<a href="${key === 'home' ? R : R + href}">${text} <span class="label">0${i + 1}</span></a>`
  ).join('\n  ');

  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>${p.title}</title>
<meta name="description" content="${p.description}" />
<meta name="theme-color" content="#0A0A0B" />
<link rel="canonical" href="${canonical}" />

<meta property="og:type" content="${p.dir.startsWith('projects') ? 'article' : 'website'}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:title" content="${p.ogTitle || p.title}" />
<meta property="og:description" content="${p.description}" />
<meta property="og:image" content="${SITE.base}/assets/og.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:creator" content="@AdhokshajW" />

<link rel="icon" href="${R}assets/favicon.svg" type="image/svg+xml" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<!-- Fonts load ASYNCHRONOUSLY. A render-blocking third-party stylesheet means a
     blank screen for as long as that CDN is slow — which on a portfolio is the
     difference between a first impression and a bounce. -->
<link rel="preload" as="style" href="${FONTS}" />
<link rel="stylesheet" href="${FONTS}" media="print" onload="this.media='all';this.onload=null" />
<noscript><link rel="stylesheet" href="${FONTS}" /></noscript>
<link rel="stylesheet" href="${R}assets/site.css" />

<!-- Resolve the theme BEFORE first paint. In site.js this would flash
     near-black at every light-mode visitor on every cold start. -->
<script>
  document.documentElement.classList.add('js');
  try {
    var p = localStorage.getItem('aw.theme') || 'system';
    var t = p === 'system' ? (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark') : p;
    document.documentElement.dataset.theme = t;
    if (t === 'light') document.querySelector('meta[name=theme-color]').content = '#FAFAF7';
  } catch (e) {}
</script>
${p.head || ''}</head>

<body data-root="${R}">
<a class="skip" href="#main">Skip to content</a>
<div class="rules" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
<div class="grain" aria-hidden="true"></div>

<header class="nav">
  <div class="wrap">
    <a class="brand" href="${R}"><span class="dot"></span>Adhokshaj<span class="sur">Wategaonkar</span></a>
    <nav class="tabs" aria-label="Primary">
      ${tabs}
    </nav>
    <div class="nav-actions">
      <button class="kbd-btn" data-palette aria-label="Open command palette">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <span>Search</span><kbd>⌘K</kbd>
      </button>
      <!-- Three icons, one visible. data-pref defaults to system so the button
           isn't blank before site.js corrects it. See [data-theme-btn] in site.css. -->
      <button class="icon-btn" data-theme-btn data-pref="system" aria-label="Theme: system. Switch to light.">
        <svg data-icon="system" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>
        <svg data-icon="light" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.4m0 15.2V22M4.2 4.2l1.7 1.7m12.2 12.2 1.7 1.7M2 12h2.4m15.2 0H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7"/></svg>
        <svg data-icon="dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9Z"/></svg>
      </button>
      <button class="icon-btn menu-toggle" data-menu aria-label="Menu" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>
</header>
<div class="progress" aria-hidden="true"></div>

<nav class="sheet" aria-label="Mobile">
  ${sheet}
</nav>

<main id="main">
${p.body}
</main>

<footer class="foot">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="brand" href="${R}"><span class="dot"></span>Adhokshaj Wategaonkar</a>
        <p class="muted" style="margin-top:14px; font-size:14px; max-width:34ch">
          Product Manager. Bengaluru, India.<br />
          Building with AI and LLMs, at work and on my own time.
        </p>
      </div>
      <div>
        <h4>Site</h4>
        <ul>
          ${TABS.map(([key, href, text]) => `<li><a href="${key === 'home' ? R : R + href}">${text}</a></li>`).join('\n          ')}
        </ul>
      </div>
      <div>
        <h4>Elsewhere</h4>
        <ul>
          <li><a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a></li>
          <li><a href="${SITE.twitter}" target="_blank" rel="noopener">X / Twitter ↗</a></li>
          <li><a href="${R}${SITE.resume}" target="_blank" rel="noopener">Résumé (PDF) ↗</a></li>
          <li><a href="mailto:${SITE.email}">Email ↗</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-bar">
      <span class="label">© <span data-year>2026</span> Adhokshaj Wategaonkar</span>
      <span class="label">Press <kbd style="font-family:var(--font-mono)">⌘K</kbd> anywhere</span>
    </div>
  </div>
</footer>

<div class="scrim" aria-hidden="true"></div>
<div class="palette" role="dialog" aria-modal="true" aria-label="Command palette" aria-hidden="true">
  <input type="text" placeholder="Search pages, projects, links…" aria-label="Search" autocomplete="off" spellcheck="false" />
  <ul role="listbox" aria-label="Results"></ul>
  <div class="palette-foot">
    <span class="label"><kbd>↑↓</kbd> navigate</span>
    <span class="label"><kbd>↵</kbd> open</span>
    <span class="label"><kbd>esc</kbd> close</span>
  </div>
</div>

<script src="${R}assets/site.js"></script>
</body>
</html>
`;
}

/* ---------------------------------------------------------------- mockups
   Drawn UI, not screenshots. Animus and Shastra keep their OWN palettes here —
   a mockup repainted in the portfolio's colours would misrepresent what the
   products actually look like. */
export const mock = {
  animusFeed: () => `<div class="mock phone" aria-hidden="true">
        <div class="bar"><b>animus</b><span style="font-size:10px;color:#6B6B76">◑</span></div>
        <div class="panes"><span class="on">the pile</span><span>progress</span></div>
        <div>
          <div class="hero-n">14</div>
          <div class="hero-k">in the pile · 6 cleared this week</div>
        </div>
        <div class="item"><b><i style="background:#C6FF3D"></i>Book dentist — Friday</b><span>task · due in 2 days</span></div>
        <div class="item"><b><i style="background:#3DA9FC"></i>Attention Is All You Need</b><span>link · arxiv.org</span></div>
        <div class="item"><b><i style="background:#7C5CFC"></i>Pricing should degrade, not block</b><span>idea · 4 days ago</span></div>
        <div class="item"><b><i style="background:#FF8A3D"></i>Ship the nudge templates</b><span>goal · this week</span></div>
      </div>`,

  animusChat: () => `<div class="mock wa" aria-hidden="true">
        <div class="msg out">book dentist friday, read this later https://arxiv.org/abs/1706.03762 — also, pricing should degrade not block<span class="t">09:41 ✓✓</span></div>
        <div class="msg in">got it. three things.<br />· task — book dentist, friday<br />· link — Attention Is All You Need<br />· idea — pricing should degrade<span class="t">09:41</span></div>
      </div>`,

  shastraChart: () => `<div class="mock win" aria-hidden="true">
        <div class="win-bar"><i></i><i></i><i></i><span>shastra — free kundli</span></div>
        <div class="win-body">
          <svg class="kundli" viewBox="0 0 100 100" role="img" aria-label="North Indian birth chart">
            <rect x="1" y="1" width="98" height="98"/>
            <line x1="1" y1="1" x2="99" y2="99"/><line x1="99" y1="1" x2="1" y2="99"/>
            <line x1="50" y1="1" x2="1" y2="50"/><line x1="50" y1="1" x2="99" y2="50"/>
            <line x1="1" y1="50" x2="50" y2="99"/><line x1="99" y1="50" x2="50" y2="99"/>
            <text class="p" x="46" y="18">Su</text><text class="p" x="70" y="30">Me</text>
            <text class="p" x="16" y="56">Ma</text><text class="p" x="78" y="56">Ju</text>
            <text class="p" x="44" y="88">Mo</text><text class="p" x="28" y="30">Ve</text>
            <text x="47" y="46">1</text><text x="47" y="60">7</text>
          </svg>
          <div class="skel"><i class="m"></i><i></i><i class="s"></i></div>
        </div>
      </div>`,
};

/** A miniature of a case study's opening slide — used as the card cover. */
export const slide = ({ kicker, title, left, right }) => `<div class="cover">
      <span class="halo"></span>
      <div class="slide">
        <span class="kicker">${kicker}</span>
        <strong>${title}</strong>
        <span class="foot"><span>${left}</span><span>${right}</span></span>
      </div>
    </div>`;

/** Cover holding a scaled product mockup. */
export const coverMock = (inner, ms = '.56') =>
  `<div class="cover" style="--ms:${ms}">
      <span class="halo"></span>
      ${inner}
    </div>`;

/** The original deck, read in place. `slides` is [{t}] in order. */
export const deckViewer = (base, slides, pdf) => `<div class="deck rise" data-deck='${JSON.stringify(slides).replace(/'/g, "&#39;")}' data-deck-base="${base}">
      <div class="deck-stage">
        <img src="${base}s01.jpg" alt="${slides[0].t}" />
        <div class="deck-nav">
          <button type="button" data-deck-prev aria-label="Previous slide">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button type="button" data-deck-next aria-label="Next slide">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
      <div class="deck-bar">
        <span class="deck-count"><b data-deck-cur>01</b> / ${String(slides.length).padStart(2, '0')}</span>
        <span class="deck-title">${slides[0].t}</span>
        ${pdf ? `<a class="arrow-link" href="${pdf}" target="_blank" rel="noopener" style="flex:none">PDF ↗</a>` : ''}
      </div>
      <div class="deck-rail" role="tablist" aria-label="Slides"></div>
    </div>`;
