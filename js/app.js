// The site. One page with three kinds of place in it:
//   the index (#top, #work, #experience, #cases, #contact)
//   a product page (#animus is its playground, #animus-play-sort one piece of it,
//   #animus-case its case study; same for shastra)
//   a case study (#case-bookmyshow, #case-bookmyshow-4), a page you scroll
// Routes are plain names so they survive the artifact frame.

import { S, sfx, setSound, soundFor } from './sound.js';
import { initCursor } from './cursor.js';
import { ROLES, WORLDS, CASES, EMAIL } from './content.js';
import { mountDial } from './dial.js';
import { mountSplit, OWN } from './pieces.js';
import { ANIMS } from './anims.js';
import { FIG } from './figures.js';
import { cover } from './covers.js';
import { mountField } from './field.js';

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
const pad = n => String(n).padStart(2, '0');
const NUM = [, 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
const SND = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z"/><g class="w"><path d="M15.5 9a4 4 0 0 1 0 6"/><path d="M18 6.5a7.5 7.5 0 0 1 0 11"/></g><path class="x" d="M16 10l4 4m0-4l-4 4"/></svg>';
const SUNMOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><g class="sun"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2m0 15v2M4.6 4.6 6 6m12 12 1.4 1.4M2.5 12h2m15 0h2M4.6 19.4 6 18M18 6l1.4-1.4"/></g><path class="moon" d="M19.5 14.5A7.5 7.5 0 0 1 9.5 4.5a7.5 7.5 0 1 0 10 10z"/></svg>';
const EXPAND = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"/></svg>';
const CHEV = '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9.5l6 6 6-6"/></svg>';

document.body.dataset.world = 'home';
initCursor();
// Shastra's body face comes from Fontshare, which only the site's own hosts can reach
if (/localhost|127\.0\.0\.1|github\.io/.test(location.hostname)) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://api.fontshare.com/v2/css?f[]=switzer@400,500&display=swap'; document.head.appendChild(l); }

/* =============================================================== toast, email */
const toastEl = $('#toast'); let tt;
function toast(msg) { toastEl.textContent = msg; toastEl.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove('on'), 2400); }
function copy() {
  const shown = () => toast(EMAIL);
  try { navigator.clipboard.writeText(EMAIL).then(() => { toast('Copied ' + EMAIL); sfx.ok(); }, shown); } catch (e) { shown(); }
}
document.addEventListener('click', e => { if (e.target.closest('[data-copy]')) copy(); });

/* =============================================================== theme, sound */
const thm = $('#thm'), snd = $('#snd');
const themeNow = () => root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
function setTheme(x, y) {
  const next = themeNow() === 'dark' ? 'light' : 'dark';
  const apply = () => { root.dataset.theme = next; store.set('aw.theme', next); setMeta('home'); };
  sfx.detent();
  if (!document.startViewTransition || reduce) { apply(); return; }
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  root.classList.add('vt-theme');
  const vt = document.startViewTransition(apply);
  vt.ready.then(() => root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] }, { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)', pseudoElement: '::view-transition-new(root)' })).catch(() => {});
  vt.finished.finally(() => root.classList.remove('vt-theme'));
}
thm.addEventListener('click', () => { const b = thm.getBoundingClientRect(); setTheme(b.left + b.width / 2, b.top + b.height / 2); });
function paintSnd() {
  $$('.snd').forEach(b => { b.setAttribute('aria-pressed', S.on); b.title = S.on ? 'Sound is on. Press S to turn it off.' : 'Sound is off. Press S to turn it on.'; const t = $('.snd-t', b); if (t) t.textContent = S.on ? 'Sound on' : 'Sound off'; else b.setAttribute('aria-label', S.on ? 'Sound on' : 'Sound off'); });
}
paintSnd();
function toggleSound() { setSound(!S.on); paintSnd(); }
snd.addEventListener('click', toggleSound);

/* =============================================================== bar */
const bar = $('#bar'), navLinks = $$('.nav a'), secs = $$('[data-name]');
function onScroll() {
  if (view !== 'home') return;
  bar.classList.toggle('scrolled', scrollY > 8);
  let cur = ''; for (const s of secs) if (s.getBoundingClientRect().top < innerHeight * 0.42) cur = s.id;
  navLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + cur));
}
addEventListener('scroll', onScroll, { passive: true });

/* =============================================================== reveal */
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -6% 0px' });
const reveal = (scope = document) => $$('.rv:not(.in)', scope).forEach(el => io.observe(el));
reveal();

/* =============================================================== home: fields, product tiles */
/* The intro is short notes. One thing is hidden in it: click the name (or type "adho")
   and the page gives way to a field of dots with the name set in it. To come back you
   press and hold anywhere: the dots shake loose, harder the longer you hold, then fly
   apart, and the notes are there again. Letting go early lets the name settle back. */
const heroEl = $('#top'); let heroField = null;
function setHero(m, user, soft) {
  if (heroEl.dataset.hero === m) return;
  const paint = () => {
    heroEl.dataset.hero = m; heroEl.classList.remove('holding');
    if (heroField) { heroField.destroy(); heroField = null; }
    if (m === 'field') heroField = mountField($('#field'), { cell: innerWidth < 720 ? 5 : 6, dot: innerWidth < 720 ? 2 : 2.2, lean: 0, floor: 0.57, alpha: 0.36, reach: 220, text: w => w < 720 ? 'Adho' : 'Adhokshaj' });
    if (user) { scrollTo(0, 0); $$('.rv', heroEl).forEach(el => el.classList.remove('in')); reveal(heroEl); }
  };
  if (user && !soft) { sfx.latch(); transition(paint); } else paint();
}
$$('[data-egg=field]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); lastPoint = { x: e.clientX, y: e.clientY }; setHero('field', true); }));
{
  const HOLD = 600, hint = $('.hf-hint span');
  let v = 0, held = false, raf = 0, last = 0, ticks = 0, leaving = false;
  const step = now => {
    raf = 0; if (heroEl.dataset.hero !== 'field' || !heroField) { v = 0; held = false; leaving = false; return; }
    const dt = Math.min(64, now - last); last = now;
    if (leaving) {
      v += dt / 380; heroField.chaos(1 + v);
      if (v >= 1) { leaving = false; v = 0; setHero('notes', true, true); return; }
    } else {
      v = held ? Math.min(1, v + dt / HOLD) : Math.max(0, v - dt / 300);
      heroField.chaos(v * v);
      const q = Math.floor(v * 5); if (held && q > ticks) { ticks = q; sfx.tick(0.8 + q * 0.2); }
      if (v >= 1) { held = false; leaving = true; v = 0; sfx.latch(); hint.textContent = ''; }
      else if (!held && v <= 0) { heroEl.classList.remove('holding'); hint.textContent = 'hold anywhere to go back'; return; }
    }
    raf = requestAnimationFrame(step);
  };
  heroEl.addEventListener('pointerdown', e => {
    if (heroEl.dataset.hero !== 'field' || e.button || leaving || e.target.closest('a, button')) return;
    held = true; ticks = Math.floor(v * 5); last = performance.now(); heroEl.classList.add('holding'); hint.textContent = 'keep holding';
    if (!raf) raf = requestAnimationFrame(step);
  });
  const up = () => { if (held) { held = false; hint.textContent = 'hold anywhere to go back'; } };
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(n => heroEl.addEventListener(n, up));
  heroEl.addEventListener('contextmenu', e => { if (heroEl.dataset.hero === 'field') e.preventDefault(); });
}
// the field stays until it is held away; it pauses itself while scrolled out of view (field.js)
// typing his name anywhere on the home page does the same
let typed = '';
addEventListener('keydown', e => {
  if (view !== 'home' || e.metaKey || e.ctrlKey || e.altKey || /INPUT|TEXTAREA/.test(e.target.tagName)) return;
  if (e.key === 'Escape' && heroEl.dataset.hero === 'field') { setHero('notes', true); return; }
  if (e.key.length !== 1) return;
  typed = (typed + e.key.toLowerCase()).slice(-4);
  if (typed === 'adho') { typed = ''; if (heroEl.dataset.hero !== 'field') { lastPoint = null; setHero('field', true); toast('You typed my name. Here it is in dots.'); } }
});
// Notes: a highlighted phrase takes you down to the section it is about
$$('.hl').forEach(a => a.addEventListener('click', e => {
  e.preventDefault(); const t = $(a.getAttribute('href')); if (!t) return;
  sfx.detent(); t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', a.getAttribute('href'));
}));
$$('a[data-go]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); go(a.getAttribute('href'), e); }));

/* The mark next to the name is one of twenty-eight, and a click on it deals the next.
   They are meant to be a mixed hand, and no two neighbours share a look: plain marks,
   a serif on green, neon, chrome, a blueprint, a CRT, a terminal, a wax seal, a label
   maker strip, frosted glass, a two-colour print, a notebook page, a barcode. */
const R = f => `<rect width="28" height="28" rx="8" fill="${f}"/>`;
const SANS = 'font-family="Geist, system-ui, sans-serif"', SERIF = 'font-family="\'Instrument Serif\', Georgia, serif" font-style="italic"', MONO = 'font-family="\'Geist Mono\', ui-monospace, monospace"';
const A_LINE = 'M7.5 22 14 6l6.5 16M10.2 16.6h7.6', A_TRI = 'M14 5.5 22.5 22h-4L14 12.6 9.5 22h-4z';
const EDGE = '<rect x=".5" y=".5" width="27" height="27" rx="7.5" fill="none" stroke="#000" stroke-opacity=".12"/>';
const LOGOS = [
  // 1 plain triangle, in the page's own colours
  `<rect class="tb" width="28" height="28" rx="8"/><path class="tf" d="${A_TRI}"/><circle class="h" cx="14" cy="19.6" r="1.9"/>`,
  // 2 serif on bottle green
  R('#0F3D2E') + `<text x="14" y="20.6" text-anchor="middle" ${SERIF} font-size="21" fill="#F3E9D2">Aw</text>`,
  // 3 neon pink
  R('#0A0612') + `<defs><filter id="lg-n1" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="1.5"/></filter></defs><g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${A_LINE}" stroke="#FF3DCB" stroke-width="3.6" filter="url(#lg-n1)"/><path d="${A_LINE}" stroke="#FF3DCB" stroke-width="2.2"/><path d="${A_LINE}" stroke="#FFE3F8" stroke-width=".9"/></g>`,
  // 4 bold on orange
  R('#FF5A1F') + `<text x="12.2" y="20.6" text-anchor="middle" ${SANS} font-weight="700" font-size="18" fill="#fff">A</text><circle cx="21.3" cy="18.7" r="2" fill="#111"/>`,
  // 5 blueprint
  R('#1E4FD0') + `<path d="M0 7h28M0 14h28M0 21h28M7 0v28M14 0v28M21 0v28" stroke="#fff" stroke-opacity=".16" stroke-width=".5"/><path d="${A_LINE}" fill="none" stroke="#fff" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"/><path d="M5.5 24.5h17M5.5 23.5v2M22.5 23.5v2" stroke="#fff" stroke-opacity=".7" stroke-width=".6"/>`,
  // 6 the pile, on lime
  R('#C6FF3D') + '<rect x="6.5" y="7.6" width="15" height="3.4" rx="1.7" fill="#0B0B0C"/><rect x="6.5" y="12.3" width="10" height="3.4" rx="1.7" fill="#0B0B0C" opacity=".6"/><rect x="6.5" y="17" width="12.5" height="3.4" rx="1.7" fill="#0B0B0C" opacity=".6"/>',
  // 7 chrome
  `<defs><linearGradient id="lg-c0" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A3E46"/><stop offset="1" stop-color="#0C0D10"/></linearGradient><linearGradient id="lg-c1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".42" stop-color="#B9C0CA"/><stop offset=".5" stop-color="#4D5561"/><stop offset=".56" stop-color="#EEF1F5"/><stop offset="1" stop-color="#8C95A2"/></linearGradient></defs><rect width="28" height="28" rx="8" fill="url(#lg-c0)"/><path d="M14 5 23 22.5h-4.3L14 12.4 9.3 22.5H5z" fill="url(#lg-c1)" stroke="#fff" stroke-opacity=".5" stroke-width=".4"/>`,
  // 8 Swiss: black on white, one red rule
  R('#FFFFFF') + EDGE + `<text x="14.4" y="11.6" text-anchor="middle" ${MONO} font-weight="500" font-size="9" letter-spacing="1.2" fill="#111">AD</text><text x="14.4" y="20.6" text-anchor="middle" ${MONO} font-weight="500" font-size="9" letter-spacing="1.2" fill="#111">HO</text><rect x="6.2" y="23.2" width="15.6" height="1.5" fill="#E4002B"/>`,
  // 9 spark on violet
  R('#6D4AFF') + '<path d="M14 4.5c.9 6.4 3.1 8.6 9.5 9.5-6.4.9-8.6 3.1-9.5 9.5-.9-6.4-3.1-8.6-9.5-9.5 6.4-.9 8.6-3.1 9.5-9.5z" fill="#fff"/><circle cx="21.6" cy="6.4" r="1.8" fill="#FFD84D"/>',
  // 10 CRT pixels
  R('#03140A') + '<g fill="#39FF88"><rect x="12.5" y="5" width="3" height="3"/><rect x="9.5" y="8" width="3" height="3"/><rect x="15.5" y="8" width="3" height="3"/><rect x="6.5" y="11" width="3" height="3"/><rect x="18.5" y="11" width="3" height="3"/><rect x="6.5" y="14" width="15" height="3"/><rect x="6.5" y="17" width="3" height="6"/><rect x="18.5" y="17" width="3" height="6"/></g><path d="M0 4h28M0 8h28M0 12h28M0 16h28M0 20h28M0 24h28" stroke="#000" stroke-opacity=".35" stroke-width=".7"/>',
  // 11 gold seal on navy
  R('#0E1B3D') + `<g fill="none" stroke="#E8C46A"><circle cx="14" cy="14" r="9.8" stroke-width="1.1"/><circle cx="14" cy="14" r="7.9" stroke-width=".5" stroke-dasharray=".6 1.3"/></g><text x="14.3" y="17" text-anchor="middle" ${MONO} font-weight="500" font-size="8" letter-spacing=".6" fill="#E8C46A">AW</text>`,
  // 12 sticker
  `<g transform="rotate(-7 14 14)"><rect x="3.2" y="3.2" width="21.6" height="21.6" rx="6.5" fill="#FFD43B" stroke="#fff" stroke-width="2"/><text x="14" y="20" text-anchor="middle" ${SANS} font-weight="700" font-size="15" fill="#151515">A!</text></g>`,
  // 13 frosted glass
  `<defs><linearGradient id="lg-gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0BC5B4"/><stop offset="1" stop-color="#3B5BFF"/></linearGradient><filter id="lg-gb" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.6"/></filter><clipPath id="lg-gc"><rect width="28" height="28" rx="8"/></clipPath></defs><g clip-path="url(#lg-gc)"><rect width="28" height="28" fill="url(#lg-gl)"/><circle cx="7" cy="8" r="7" fill="#FF7AD9" filter="url(#lg-gb)"/><circle cx="22" cy="21" r="8" fill="#FFE066" filter="url(#lg-gb)"/></g><rect x="5" y="5" width="18" height="18" rx="5.5" fill="#fff" fill-opacity=".24" stroke="#fff" stroke-opacity=".75" stroke-width=".6"/><path d="M14 8.6 19.6 19.6h-2.7L14 13.4l-2.9 6.2H8.400z" fill="#fff"/>`,
  // 14 smile on pink
  R('#FF7AB6') + '<circle cx="10.2" cy="11.6" r="1.7" fill="#2A0A1A"/><circle cx="17.8" cy="11.6" r="1.7" fill="#2A0A1A"/><path d="M9 16.5c2.8 3.4 7.2 3.4 10 0" fill="none" stroke="#2A0A1A" stroke-width="2.2" stroke-linecap="round"/>',
  // 15 amber terminal
  R('#0E0A02') + `<circle cx="5.6" cy="5.6" r="1" fill="#FF5F57"/><circle cx="8.8" cy="5.6" r="1" fill="#FEBC2E"/><circle cx="12" cy="5.6" r="1" fill="#28C840"/><text x="14" y="19.4" text-anchor="middle" ${MONO} font-weight="500" font-size="10.5" fill="#FFB000">&gt;a_</text>`,
  // 16 notebook page, in pencil
  R('#FFFFFF') + EDGE + '<path d="M0 9.500h28M0 14.500h28M0 19.500h28M0 24.500h28" stroke="#8DB8FF" stroke-width=".5"/><path d="M6 0v28" stroke="#FF8A8A" stroke-width=".5"/><g fill="none" stroke="#3A3A3A" stroke-linecap="round" stroke-linejoin="round"><path d="M9 22.400c1.500-5.600 3.800-11.800 6.200-16.300 2 4.800 4.200 10.900 6.100 16.500M11.300 16.300c2.600-.8 5.600-.6 8.300.2" stroke-width="1.600"/><path d="M9.700 21.600c1.700-5.300 3.700-10.400 5.500-14.400" stroke-width=".7" opacity=".5"/></g>',
  // 17 app-icon gradient
  `<defs><linearGradient id="lg-g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF8A3D"/><stop offset=".55" stop-color="#FF3D8B"/><stop offset="1" stop-color="#7A5CFF"/></linearGradient></defs><rect width="28" height="28" rx="8" fill="url(#lg-g1)"/><path d="${A_TRI}" fill="#fff"/>`,
  // 18 one line, on black
  R('#0B0B0C') + '<rect x=".5" y=".5" width="27" height="27" rx="7.5" fill="none" stroke="#fff" stroke-opacity=".16"/><g fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 20 9 8l4.5 12 3-7.5 3 7.5L24 8" stroke="#F4F3EF"/><path d="M6.9 15.6h4.2" stroke="#FF6B3D"/></g>',
  // 19 two-colour print, slightly out of register
  R('#E6EEF5') + `<path d="${A_TRI}" fill="#00B7EB" transform="translate(-1 -.7)" style="mix-blend-mode:multiply"/><path d="${A_TRI}" fill="#FF3D7F" transform="translate(1 .7)" style="mix-blend-mode:multiply"/>`,
  // 20 wax seal
  R('#17100F') + `<defs><radialGradient id="lg-w" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#F0584A"/><stop offset="1" stop-color="#8A1812"/></radialGradient></defs><circle cx="14" cy="14" r="9.4" fill="none" stroke="#A8221A" stroke-width="3" stroke-linecap="round" stroke-dasharray=".1 3.18"/><circle cx="14" cy="14" r="9.4" fill="url(#lg-w)"/><circle cx="14" cy="14" r="6.6" fill="none" stroke="#6A100C" stroke-opacity=".7" stroke-width=".7"/><text x="13.6" y="18.6" text-anchor="middle" ${SERIF} font-size="13" fill="#FFD9D0">A</text>`,
  // 21 pointer on blue
  R('#2F9BFF') + '<path d="M8 5.5v16.5l4.1-3.7 2.6 5.7 2.7-1.2-2.6-5.6h5.7z" fill="#fff" stroke="#0B2A4A" stroke-width=".9" stroke-linejoin="round"/><path d="M19.5 8l2-2M21.5 11.8H24M17 5.800V3.400" fill="none" stroke="#fff" stroke-width="1.700" stroke-linecap="round"/>',
  // 22 chrome ball
  R('#0E0F12') + '<defs><linearGradient id="lg-c2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4F8FF"/><stop offset=".46" stop-color="#8FA3BE"/><stop offset=".5" stop-color="#1D232C"/><stop offset=".62" stop-color="#6E5A48"/><stop offset="1" stop-color="#E7D8C2"/></linearGradient></defs><circle cx="14" cy="14" r="9" fill="url(#lg-c2)"/><ellipse cx="11" cy="9.2" rx="3.4" ry="1.5" fill="#fff" opacity=".8"/><circle cx="14" cy="14" r="9" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width=".5"/>',
  // 23 label maker
  R('#D7263D') + `<rect x="2.6" y="9.200" width="22.800" height="9.600" rx="1.200" fill="#141414"/><path d="M2.600 10.600h22.800M2.600 17.400h22.800" stroke="#fff" stroke-opacity=".12" stroke-width=".4"/><text x="14.300" y="16.500" text-anchor="middle" ${MONO} font-weight="500" font-size="6.800" letter-spacing=".9" fill="#fff">ADHO</text>`,
  // 24 marker
  R('#FFFFFF') + EDGE + `<path d="M6 17.500c5-2 11-2.600 17-1" fill="none" stroke="#8EF0B0" stroke-width="8.500" stroke-linecap="round"/><text x="14" y="20.400" text-anchor="middle" ${SERIF} font-size="20" fill="#111">aw</text>`,
  // 25 a block, in three teals
  R('#101A33') + '<path d="M14 4.800 22 9.400 14 14 6 9.400z" fill="#7FE7D2"/><path d="M6 9.400 14 14v9.200L6 18.600z" fill="#2BB39A"/><path d="M22 9.400 14 14v9.200l8-4.600z" fill="#17806E"/>',
  // 26 seventies sun
  R('#0F2A2E') + '<defs><clipPath id="lg-r"><rect x="0" y="0" width="28" height="20.500"/></clipPath></defs><g clip-path="url(#lg-r)"><circle cx="14" cy="20.500" r="11.500" fill="#E63946"/><circle cx="14" cy="20.500" r="8.600" fill="#F25C05"/><circle cx="14" cy="20.500" r="5.700" fill="#F7B32B"/><circle cx="14" cy="20.500" r="2.800" fill="#FCE38A"/></g><path d="M4 22.800h20M7 25h14" stroke="#F7B32B" stroke-width=".9" stroke-linecap="round"/>',
  // 27 neon ring
  R('#04101A') + `<defs><filter id="lg-n2" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="1.300"/></filter></defs><circle cx="14" cy="14" r="9" fill="none" stroke="#33D6FF" stroke-width="3" filter="url(#lg-n2)"/><circle cx="14" cy="14" r="9" fill="none" stroke="#9BEBFF" stroke-width="1.300"/><text x="14" y="17.400" text-anchor="middle" ${SANS} font-weight="600" font-size="9.600" fill="#D9F8FF">aw</text>`,
  // 28 barcode
  R('#FFFFFF') + EDGE + `<path d="M5.500 5.500v12M7.300 5.500v12M9.700 5.500v12M11 5.500v12M13.600 5.500v12M15.800 5.500v12M17 5.500v12M19.700 5.500v12M22 5.500v12" stroke="#111" stroke-width="1"/><path d="M8.500 5.500v12M12.300 5.500v12M18.300 5.500v12M20.800 5.500v12" stroke="#111" stroke-width=".5"/><text x="14" y="23.600" text-anchor="middle" ${MONO} font-weight="500" font-size="5.200" letter-spacing="1" fill="#111">ADHO</text>`,
].map(x => x.replace(/(\d?\.\d)00(?=[^\d])/g, '$1'));
const markEl = $('.me .mark'); let logoI = (Number(store.get('aw.mark')) || 0) % LOGOS.length;
function paintLogo(user) {
  markEl.innerHTML = `<svg viewBox="0 0 28 28">${LOGOS[logoI]}</svg>`;
  if (user) { markEl.classList.remove('swap'); void markEl.offsetWidth; markEl.classList.add('swap'); sfx.detent(); }
  try {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><style>.tb{fill:#0B0B0C}.tf{fill:#F4F3EF}.h{fill:#FF6B3D}.s{fill:none;stroke:#F4F3EF;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}.sh{stroke:#FF6B3D}</style>${LOGOS[logoI]}</svg>`;
    $('link[rel=icon]').href = 'data:image/svg+xml,' + encodeURIComponent(svg);
  } catch (e) {}
}
paintLogo();
markEl.addEventListener('click', () => { logoI = (logoI + 1) % LOGOS.length; store.set('aw.mark', logoI); paintLogo(true); });

mountField($('#field2'), { cell: 7, dot: 2.4, lean: 0.7, floor: 0.4, alpha: 0.55 });
mountSplit($('#inst-animus'));
mountDial($('#inst-shastra'));

/* A tile is for playing with, so nothing in it opens the product by accident. The
   way in is the key in its corner: press and hold. The ring fills, the product's
   colour spreads from the key across the tile, and at the end it opens. */
function holdKey(prod) {
  const box = $('.tilebox', prod), key = prod.dataset.go, name = prod.dataset.title, DUR = 320;
  const flood = document.createElement('div'); flood.className = 'hk-flood'; flood.setAttribute('aria-hidden', 'true'); flood.innerHTML = `<span>${name}</span>`;
  const b = document.createElement('button'); b.className = 'hk'; b.type = 'button'; b.setAttribute('aria-label', `Open ${name}. Press and hold.`);
  b.innerHTML = '<span class="hk-t">Hold to open</span><span class="hk-k"><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20.5" pathLength="1"/></svg><b aria-hidden="true">→</b></span>';
  box.append(flood, b);
  const label = $('.hk-t', b), knob = $('.hk-k', b);
  let v = 0, last = 0, raf = 0, holding = false, ticks = 0, began = 0, sleep = 0;
  const set = () => { box.style.setProperty('--p', v.toFixed(3)); flood.style.setProperty('--p', (v * v).toFixed(3)); };
  function place() {
    const r = box.getBoundingClientRect(), k = knob.getBoundingClientRect(), fx = k.left + k.width / 2 - r.left, fy = k.top + k.height / 2 - r.top;
    box.style.setProperty('--fx', fx + 'px'); box.style.setProperty('--fy', fy + 'px');
    box.style.setProperty('--reach', Math.hypot(Math.max(fx, r.width - fx), Math.max(fy, r.height - fy)) + 8 + 'px');
    return { x: k.left + k.width / 2, y: k.top + k.height / 2 };
  }
  function step(now) {
    const dt = Math.min(64, now - last); last = now;
    if (holding) {
      v = Math.min(1, v + dt / DUR);
      const q = Math.floor(v * 4); if (q > ticks && q < 4) { ticks = q; sfx.tick(0.85 + q * 0.22); }
      set();
      if (v >= 1) { raf = 0; holding = false; sfx.latch(); label.textContent = 'Opening'; lastPoint = place(); go('#' + key); setTimeout(reset, 900); return; }
    } else {
      v = Math.max(0, v - dt / 260); set();
      if (v <= 0) { raf = 0; box.classList.remove('holding'); return; }
    }
    raf = requestAnimationFrame(step);
  }
  function reset() { v = 0; set(); holding = false; b.classList.remove('holding'); box.classList.remove('holding'); label.textContent = 'Hold to open'; }
  function start() {
    if (holding || view !== 'home') return;
    holding = true; ticks = Math.floor(v * 4); began = performance.now(); last = began; place();
    b.classList.add('holding'); box.classList.add('holding'); label.textContent = 'Keep holding'; sfx.down();
    if (!raf) raf = requestAnimationFrame(step);
  }
  function stop() {
    if (!holding) return;
    holding = false; b.classList.remove('holding'); label.textContent = 'Hold to open';
    if (performance.now() - began < 170) { b.classList.remove('short'); void b.offsetWidth; b.classList.add('short'); label.textContent = 'Press and hold'; wake(); }
  }
  function wake() { b.classList.add('awake'); clearTimeout(sleep); sleep = setTimeout(() => { b.classList.remove('awake'); if (!holding) label.textContent = 'Hold to open'; }, 7000); }
  b.addEventListener('pointerdown', e => { if (e.button) return; e.preventDefault(); try { b.setPointerCapture(e.pointerId); } catch (err) {} start(); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(n => b.addEventListener(n, stop));
  b.addEventListener('contextmenu', e => e.preventDefault());
  b.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) { e.preventDefault(); start(); } });
  b.addEventListener('keyup', e => { if (e.key === 'Enter' || e.key === ' ') stop(); });
  b.addEventListener('blur', stop);
  // assistive tech sends a plain click with no press to hold
  b.addEventListener('click', e => { if (e.detail === 0 && !holding && v === 0) go('#' + key); });
  // the key wakes up once the tile has been played with
  box.addEventListener('pointerdown', e => { if (!e.target.closest('.hk')) wake(); });
}
$$('.prod').forEach(holdKey);

/* =============================================================== home: experience
   A list of roles on the left, the open role on the right. Inside a role, each thing
   I did is a row; opening a row plays its drawing. */
const xl = $('#xp-list'), xd = $('#xp-detail');
xl.innerHTML = ROLES.map((r, i) => `<button class="xp-i" role="tab" id="xp-t-${r.key}" data-i="${i}" style="--hue:${r.hue}" aria-selected="false" aria-controls="xp-detail" tabindex="-1">
    <span class="xp-co">${r.short || r.co}</span><span class="xp-yr">${r.yrs}</span>
  </button>`).join('');
/* The section takes on the open role's colour and its own faint texture. It stays
   inside this section and fades out at its top and bottom edges. */
const toneL = $$('#tone i'); let toneN = 0;
function setTone(r) {
  toneN ^= 1;
  const on = toneL[toneN], off = toneL[toneN ^ 1];
  on.style.setProperty('--h', r.hue); on.dataset.tex = r.tex || 'dots';
  on.classList.add('on'); off.classList.remove('on');
}
const xis = $$('button.xp-i', xl);
let roleIdx = -1, roleAnim = null, animKey = null;
function setAnim(stage, key) {
  if (key === animKey && roleAnim) return;
  roleAnim && roleAnim.destroy && roleAnim.destroy(); roleAnim = null; animKey = key;
  stage.innerHTML = '<div class="role-anim"></div>';
  if (key && ANIMS[key]) roleAnim = ANIMS[key](stage.firstElementChild);
}
function openRole(i, user) {
  if (i === roleIdx) return;
  roleIdx = i;
  const r = ROLES[i];
  xis.forEach(k => { const on = Number(k.dataset.i) === i; k.classList.toggle('on', on); k.setAttribute('aria-selected', on); k.tabIndex = on ? 0 : -1; });
  if (user) sfx.detent();
  roleAnim && roleAnim.destroy && roleAnim.destroy(); roleAnim = null; animKey = null;
  xd.style.setProperty('--hue', r.hue); setTone(r);
  xd.setAttribute('aria-labelledby', 'xp-t-' + r.key);
  xd.classList.remove('show'); void xd.offsetWidth;
  xd.innerHTML = `
    <header class="xp-head">
      <div><p class="xp-meta">${r.role}${r.where ? ' · ' + r.where : ''}</p><h3>${r.co}</h3><p class="xp-line">${r.line}</p></div>
      <p class="xp-when"><b>${r.dates}</b><span>${r.span}</span></p>
      ${r.note ? `<p class="xp-note">${r.note}</p>` : ''}
    </header>
    ${r.points.length ? `<div class="xp-body">
      <div class="xp-stage"></div>
      <div class="xp-pts"><p class="xp-lab">What I did</p>${r.points.map((p, j) => `
        <div class="pt"><button class="pt-h" id="pt-h-${j}" aria-expanded="false" aria-controls="pt-b-${j}"><span class="pt-n">${pad(j + 1)}</span><span class="pt-t">${p.t}</span>${CHEV}</button>
        <div class="pt-b" id="pt-b-${j}" role="region" aria-labelledby="pt-h-${j}"><div><p>${p.p}</p></div></div></div>`).join('')}</div>
    </div>` : ''}`;
  const stage = $('.xp-stage', xd), pts = $$('.pt', xd);
  const pick = (j, byUser) => {
    pts.forEach((el, x) => { el.classList.toggle('on', x === j); $('.pt-h', el).setAttribute('aria-expanded', x === j); });
    setAnim(stage, r.points[j].anim || r.anim);
  };
  pts.forEach((el, j) => $('.pt-h', el).addEventListener('click', () => pick(j, true)));
  if (pts.length) pick(0);
  requestAnimationFrame(() => xd.classList.add('show'));
}
xis.forEach((k, n) => {
  k.addEventListener('click', () => openRole(Number(k.dataset.i), true));
  k.addEventListener('keydown', e => {
    const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; if (!d) return;
    e.preventDefault(); e.stopPropagation();
    const t = xis[Math.max(0, Math.min(xis.length - 1, n + d))]; t.focus(); openRole(Number(t.dataset.i), true);
  });
});
openRole(0);

/* =============================================================== home: case covers */
$('#cases-list').innerHTML = CASES.map((c, i) => `
  <a class="case rv" href="#case-${c.key}" style="--d:${i};--c-bg:${c.world.bg};--c-ink:${c.world.ink};--c-mut:${c.world.mut};--c-acc:${c.world.accent}">
    <div class="cover"><span class="kc-k">${c.title}</span><span class="kc-t">${c.name}</span><span class="kc-m">${c.slides.length} slides <i aria-hidden="true">→</i></span>
      <span class="kc-fan" aria-hidden="true">${[5, 1, 0].map(n => `<img src="${c.slides[n].src}" alt="" loading="lazy" decoding="async">`).join('')}</span></div>
    <div class="ccap"><p>${c.dek}</p></div>
  </a>`).join('');
reveal($('#cases-list'));
$$('.case').forEach(a => a.addEventListener('click', e => { e.preventDefault(); go(a.getAttribute('href'), e); }));

/* =============================================================== router */
let view = 'home', homeY = 0, worldKey = null, lastPoint = null;
const worldEl = $('#world'), viewerEl = $('#viewer'), homeEl = $('#home');

function go(hash, e) {
  if (e && e.clientX != null && (e.clientX || e.clientY)) lastPoint = { x: e.clientX, y: e.clientY };
  if (location.hash === hash) route(); else location.hash = hash;
}
function parse() {
  const h = decodeURIComponent(location.hash.slice(1)), p = h.split('-');
  if (WORLDS[p[0]]) return { v: 'world', key: p[0], mode: p[1] === 'case' ? 'case' : 'play', piece: p[1] === 'play' ? p.slice(2).join('-') : '' };
  if (p[0] === 'case' && CASES.some(c => c.key === p[1])) return { v: 'case', key: p[1], n: Number(p[2]) || 0 };
  return { v: 'home', anchor: h };
}
function transition(fn) {
  const pt = lastPoint || { x: innerWidth / 2, y: innerHeight / 2 }; lastPoint = null;
  if (!document.startViewTransition || reduce) { fn(); return; }
  const r = Math.hypot(Math.max(pt.x, innerWidth - pt.x), Math.max(pt.y, innerHeight - pt.y));
  root.classList.add('vt-world');
  const vt = document.startViewTransition(fn);
  vt.ready.then(() => root.animate({ clipPath: [`circle(0px at ${pt.x}px ${pt.y}px)`, `circle(${r}px at ${pt.x}px ${pt.y}px)`] }, { duration: 560, easing: 'cubic-bezier(.6,0,.2,1)', pseudoElement: '::view-transition-new(root)' })).catch(() => {});
  vt.finished.finally(() => root.classList.remove('vt-world'));
}
function route() {
  const r = parse();
  if (r.v === 'home') {
    if (view !== 'home') {
      view = 'home';
      transition(() => {
        closeWorld(); closeViewer(); showHome();
        const t = r.anchor && document.getElementById(r.anchor);
        root.style.scrollBehavior = 'auto';
        if (t && r.anchor !== 'top') t.scrollIntoView({ behavior: 'auto' }); else scrollTo(0, r.anchor ? 0 : homeY);
        root.style.scrollBehavior = '';
        onScroll();
      });
    } else if (r.anchor) { const t = document.getElementById(r.anchor); t && t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); }
    return;
  }
  if (view === 'home') homeY = scrollY;
  if (r.v === 'world') {
    if (view === 'world' && worldKey === r.key) { worldState(r); return; }
    view = 'world';
    transition(() => { closeViewer(); closeWorld(); openWorld(r); });
    return;
  }
  const c = CASES.find(x => x.key === r.key);
  if (view === 'case' && viewerEl.dataset.key === r.key) { if (r.n) slideTo(r.n); return; }
  view = 'case';
  transition(() => { closeWorld(); closeViewer(); openViewer(c, r.n); });
}
addEventListener('hashchange', route);
function showHome() { homeEl.hidden = false; bar.hidden = false; document.body.dataset.world = 'home'; delete document.body.dataset.atheme; document.title = 'Adhokshaj Wategaonkar'; setMeta('home'); }
function setMeta(w) { const m = $('meta[name=theme-color]'); m && (m.content = { animus: aTheme() === 'light' ? '#F4F4F0' : '#0B0B0F', shastra: '#FBF4E6', home: themeNow() === 'light' ? '#F4F3EF' : '#0B0B0C' }[w] || '#111'); }

/* =============================================================== product pages */
let W = null;
const loadedCss = new Set();
function needCss(p) { if (loadedCss.has(p)) return; loadedCss.add(p); const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = `css/exhibits/${p}.css`; document.head.appendChild(l); }
const aTheme = () => store.get('aw.animus') === 'light' ? 'light' : 'dark';
function paintATheme() {
  if (!W || W.key !== 'animus') return;
  const t = aTheme(); worldEl.dataset.theme = t; document.body.dataset.atheme = t; setMeta('animus');
  const b = $('.w-thm', worldEl); if (b) b.setAttribute('aria-label', t === 'light' ? 'Switch Animus to dark' : 'Switch Animus to light');
}

/* A product page has two separate views, Playground and Case study, and a switch
   that stays on the left edge. Changing view draws the product's colour across the
   page from the switch's side, with the name of where you are going on it. */
const MODES = { play: 'Play around', case: 'Why I built this' };
const I_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5v10.2l2.9-2.5 2 4.6 2-.9-2-4.5 3.9-.2z"/><path d="M15.5 4.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/></svg>';
const I_CASE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5h8l3 3v14H7z"/><path d="M10 10.5h5M10 14h5M10 17.5h3"/></svg>';
function openWorld(r) {
  const w = WORLDS[r.key], other = WORLDS[w.next], an = r.key === 'animus';
  worldKey = r.key;
  homeEl.hidden = true; bar.hidden = true;
  document.body.dataset.world = r.key;
  document.title = `${w.name} · Adhokshaj Wategaonkar`;
  worldEl.hidden = false;
  worldEl.className = 'w w-' + r.key;
  worldEl.innerHTML = `
    <div class="w-bg" aria-hidden="true">${an ? '<canvas class="w-stars"></canvas>' : wheelSVG()}</div>
    <header class="w-bar">
      <a class="btn back" href="#work"><span aria-hidden="true">←</span> Back</a>
      <div class="w-tools">
        <button class="btn snd" aria-pressed="${S.on}">${SND}<span class="snd-t">Sound on</span></button>
        ${an ? `<button class="btn ic w-thm thm">${SUNMOON}</button>` : ''}
      </div>
    </header>
    <nav class="w-dock" aria-label="${w.name}: choose a view" data-mode="play">
      <i class="w-dock-th" aria-hidden="true"></i>
      <button data-mode="play" aria-pressed="true">${I_PLAY}<span>${MODES.play}</span></button>
      <button data-mode="case" aria-pressed="false">${I_CASE}<span>${MODES.case}</span></button>
    </nav>
    <div class="w-body">
      <div class="w-mode w-play" data-mode="play">
        <section class="w-hero">
          <p class="w-k rv">${w.kicker}</p>
          <h1 class="w-h rv" style="--d:1">${w.name}</h1>
          <p class="w-dek rv" style="--d:2">${w.dek}</p>
          <p class="w-lede rv" style="--d:3">${w.lede}</p>
          <dl class="w-facts rv" style="--d:4">${w.facts.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>
          <div class="w-links rv" style="--d:5">${w.links.map(([t, u], i) => `<a class="btn ${i ? '' : 'pri'}" href="${u}" target="_blank" rel="noopener">${t} <span aria-hidden="true">↗</span></a>`).join('')}</div>
        </section>
        <section class="w-sec w-lib" aria-label="${MODES.play}">
          <div class="w-sh"><h2>${MODES.play}</h2><p>The cool parts of ${w.name}, working. Open one and use it.</p></div>
          <div class="g-grid n${w.gallery.length}">${w.gallery.map((g, i) => `
            <button class="g-tile g${i}" data-id="${g.id}" style="--i:${i}" aria-label="${g.title}. Open to try it.">
              <span class="g-art">${cover(r.key, g.id)}</span><span class="g-name" aria-hidden="true">${g.title}</span>
            </button>`).join('')}</div>
        </section>
      </div>
      <div class="w-mode w-case" data-mode="case" hidden>
        <header class="cs-head">
          <p class="w-k rv">${MODES.case} · ${w.name}</p>
          <h1 class="cs-h rv" style="--d:1">${w.dek}</h1>
          <p class="cs-sum rv" style="--d:2">${w.sum}</p>
          <ol class="cs-toc rv" style="--d:3">${w.steps.map((x, i) => `<li><a href="#" data-step="${i}"><span>${pad(i + 1)}</span>${x.k}</a></li>`).join('')}</ol>
        </header>
        <section class="w-sec w-story" aria-label="${MODES.case}">
          ${w.steps.map((x, i) => stepHTML(x, i, w)).join('')}
        </section>
      </div>
      <footer class="w-foot">
        <a class="nx nx-${other.key}" href="#${other.key}">
          <span class="nx-art" aria-hidden="true">${other.key === 'shastra' ? wheelSVG() : '<i></i><i></i><i></i><b></b>'}</span>
          <span class="nx-k">Next product</span>
          <b class="nx-n">${other.name}</b>
          <span class="nx-d">${other.dek}</span>
          <span class="nx-go">Open ${other.name} <i aria-hidden="true">→</i></span>
        </a>
        <a class="btn" href="#work"><span aria-hidden="true">←</span> Back to home</a>
      </footer>
    </div>
    <div class="w-wipe" aria-hidden="true"><p><small>${w.name}</small><span></span></p></div>
    <div class="stage" hidden></div>`;
  W = { key: r.key, w, bg: null, stageH: null, sid: null, mode: 'play', busy: 0 };
  $$('.w-foot a, .w-bar .back', worldEl).forEach(a => a.addEventListener('click', e => { e.preventDefault(); go(a.getAttribute('href'), e); }));
  $$('[data-mode]:is(button)', worldEl).forEach(b => b.addEventListener('click', e => go(b.dataset.mode === 'case' ? `#${r.key}-case` : `#${r.key}`, e)));
  $$('.cs-toc a', worldEl).forEach(a => a.addEventListener('click', e => { e.preventDefault(); const t = $$('.cs-step', worldEl)[Number(a.dataset.step)]; if (t) scrollTo({ top: t.getBoundingClientRect().top + scrollY - 76, behavior: reduce ? 'auto' : 'smooth' }); }));
  $('.snd', worldEl).addEventListener('click', toggleSound); paintSnd();
  if (an) { $('.w-thm', worldEl).addEventListener('click', () => { store.set('aw.animus', aTheme() === 'light' ? 'dark' : 'light'); sfx.detent(); paintATheme(); }); }
  paintATheme(); if (!an) setMeta(r.key);
  $$('.g-tile', worldEl).forEach(t => t.addEventListener('click', e => { W.from = t; sfx.down(); go(`#${r.key}-play-${t.dataset.id}`, e); }));
  // the story figures draw themselves the first time they are seen
  $$('.dw', worldEl).forEach(p => { if (!p.getAttribute('stroke-dasharray')) p.setAttribute('pathLength', '1'); else p.classList.add('dash'); });
  const fio = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('drawn'); fio.unobserve(en.target); } }), { threshold: 0.3 });
  $$('.cs-step', worldEl).forEach(x => fio.observe(x));
  W.fio = fio;
  W.bg = an ? stars($('.w-stars', worldEl)) : wheelSpin($('.w-bg svg', worldEl));
  scrollTo(0, 0);
  reveal(worldEl);
  worldState(r, true);
}
function closeWorld() {
  if (!W) return;
  closeStage(true);
  W.bg && W.bg.destroy && W.bg.destroy(); W.fio && W.fio.disconnect();
  W = null; worldKey = null;
  worldEl.hidden = true; worldEl.innerHTML = ''; delete worldEl.dataset.theme;
}
function setMode(m, instant) {
  if (!W || W.mode === m) return;
  const from = W.mode, me = W, rail = $('.w-dock', worldEl), wipe = $('.w-wipe', worldEl), turn = ++W.busy;
  W.mode = m; rail.dataset.mode = m; worldEl.dataset.mode = m;
  $$('button', rail).forEach(b => b.setAttribute('aria-pressed', b.dataset.mode === m));
  const swap = () => {
    $$('.w-mode', worldEl).forEach(el => { el.hidden = el.dataset.mode !== m; });
    root.style.scrollBehavior = 'auto'; scrollTo(0, 0); root.style.scrollBehavior = '';
    $$(`.w-mode[data-mode="${m}"] .rv`, worldEl).forEach(el => { el.classList.remove('in'); });
    requestAnimationFrame(() => reveal(worldEl));
  };
  if (instant || reduce) { swap(); return; }
  const live = () => W === me && W.busy === turn;
  sfx.detent();
  $('span', wipe).textContent = MODES[m];
  wipe.className = 'w-wipe'; wipe.dataset.to = m; void wipe.offsetWidth; wipe.classList.add('in');
  setTimeout(() => { if (!live()) return; swap(); }, 460);
  setTimeout(() => { if (!live()) return; wipe.classList.replace('in', 'out'); sfx.tick(1.2); }, 640);
  setTimeout(() => { if (!live()) return; wipe.className = 'w-wipe'; }, 1240);
}
function worldState(r, first) {
  if (!W) return;
  setMode(r.mode, first || !!r.piece || !$('.stage', worldEl).hidden);
  if (r.piece) openStage(r.piece); else closeStage();
}
function stepHTML(s, i, w) {
  const fig = s.fig && FIG[s.fig] ? `<div class="cs-fig">${FIG[s.fig]}</div>` : '';
  let extra = '';
  if (s.list) extra += `<ol class="cs-list">${s.list.map(([n, t, p]) => `<li><span class="cs-n">${n}</span><div><b>${t}</b><p>${p}</p></div></li>`).join('')}</ol>`;
  if (s.cut) extra += `<div class="cs-cut"><p class="cs-cut-h">Cut on purpose</p><ul>${s.cut.map(c => `<li>${c}</li>`).join('')}</ul></div>`;
  if (s.rank) extra += `<div class="cs-scroll"><table class="cs-rank"><thead><tr><th>Idea</th><th>Why</th><th>Call</th></tr></thead><tbody>${s.rank.map(([a, b, c], j) => `<tr class="${j ? '' : 'win'}"><td>${a}</td><td>${b}</td><td><span class="pill ${c.toLowerCase().replace(/[^a-z]/g, '')}">${c}</span></td></tr>`).join('')}</tbody></table></div>`;
  if (s.stats) extra += `<div class="cs-stats">${s.stats.map(([a, b]) => `<div><b>${a}</b><p>${b}</p></div>`).join('')}</div>`;
  const cta = s.cta ? `<div class="cs-cta"><a class="btn pri" href="${w.links[0][1]}" target="_blank" rel="noopener">${w.links[0][0]} <span aria-hidden="true">↗</span></a></div>` : '';
  return `<article class="cs-step${fig ? '' : ' wide'}">
    <p class="cs-kick"><span>${pad(i + 1)}</span>${s.k}</p>
    <div class="cs-text"><h3>${s.h}</h3>${s.stats ? extra : ''}${(s.p || []).map(p => `<p>${p}</p>`).join('')}${s.stats ? '' : extra}${cta}</div>
    ${fig}</article>`;
}

/* ---------------- the stage: one piece, live */
async function openStage(id) {
  const g = W.w.gallery.find(x => x.id === id); if (!g) return closeStage();
  const st = $('.stage', worldEl), list = W.w.gallery, idx = list.indexOf(g);
  const fresh = st.hidden;
  if (W.stageH) { W.stageH.destroy && W.stageH.destroy(); W.stageH = null; }
  st.hidden = false; document.body.classList.add('staged');
  st.innerHTML = `
    <div class="st-back" data-close></div>
    <div class="st-box" role="dialog" aria-modal="true" aria-label="${g.title}" tabindex="-1">
      <aside class="st-side">
        <div class="st-top"><span class="st-count">${pad(idx + 1)} / ${pad(list.length)}</span><button class="btn ic" data-close aria-label="Close" title="Close (Esc)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
        <h2>${g.title}</h2>
        <p class="st-about">${g.about}</p>
        <div class="st-try"><span>Try it</span><p>${g.try}</p></div>
        <div class="st-nav"><button class="btn" data-step="-1" aria-label="Previous: ${list[(idx - 1 + list.length) % list.length].title}"><span aria-hidden="true">←</span></button><button class="btn st-nx" data-step="1"><span>${list[(idx + 1) % list.length].title}</span> <span aria-hidden="true">→</span></button></div>
      </aside>
      <div class="st-frame"><div class="st-fit"><div class="ex-root ex-${W.key}"></div></div><p class="st-load">Loading…</p><p class="st-pan" hidden>Swipe sideways to see the rest</p></div>
    </div>`;
  const box = $('.st-box', st);
  if (fresh) {
    // grow out of the tile that was pressed
    const from = W.from || $(`.g-tile[data-id="${id}"]`, worldEl);
    if (from) { const a = from.getBoundingClientRect(), b = box.getBoundingClientRect(); box.style.transformOrigin = `${a.left + a.width / 2 - b.left}px ${a.top + a.height / 2 - b.top}px`; }
    st.classList.remove('on'); void st.offsetWidth;
  }
  st.classList.add('on'); W.from = null;
  $$('[data-close]', st).forEach(b => b.addEventListener('click', () => go(`#${W.key}`)));
  $$('[data-step]', st).forEach(b => b.addEventListener('click', () => { const n = (idx + Number(b.dataset.step) + list.length) % list.length; go(`#${W.key}-play-${list[n].id}`); }));
  const ex = $('.ex-root', st), fit = $('.st-fit', st);
  sizeStage(fit, ex, !!g.own);
  W.sid = id;
  try {
    if (g.own) {
      ex.className = 'ex-root own';
      W.stageH = g.own === 'dial' ? mountDial(ex, { big: true }) : OWN[g.own](ex);
    } else {
      needCss(W.key);
      const mod = await import(`./exhibits/${g.ex}.js`);
      if (!W || W.sid !== id) return;
      const light = W.key === 'animus' && aTheme() === 'light';
      W.stageH = mod.mount(ex, { sound: soundFor, world: W.key === 'animus' ? { bg: light ? '#f4f4f0' : '#0b0b0f', ink: light ? '#0e0e12' : '#f5f5f7', accent: '#c6ff3d' } : { bg: '#fbf4e6', ink: '#831729', accent: '#c8102e' }, reduce, api: 'https://shastra.onrender.com' });
    }
    $('.st-load', st) && $('.st-load', st).remove();
  } catch (err) {
    console.error(err);
    const l = $('.st-load', st); if (l) l.textContent = 'This one did not load. Try the next.';
  }
  box.focus({ preventScroll: true });
}
function sizeStage(fit, ex, own) {
  const f = fit.parentElement;
  const cs = getComputedStyle(f), aw = f.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - 2, ah = f.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - 2;
  let w = Math.min(1120, aw), h = w / 1.6;
  if (h > ah) { h = ah; w = h * 1.6; }
  if (own) { w = Math.min(aw, 1000); h = Math.min(ah, 640); }
  const pan = f.querySelector('.st-pan'); fit.classList.remove('pan'); if (pan) pan.hidden = true;
  if (w >= 700 || own) { fit.style.width = w + 'px'; fit.style.height = h + 'px'; ex.style.width = '100%'; ex.style.height = '100%'; ex.style.transform = ''; }
  else {
    const s = Math.max(aw / 700, Math.min(1, (ah - 28) / 440));
    fit.style.width = Math.min(aw, 700 * s) + 'px'; fit.style.height = 440 * s + 'px'; ex.style.width = '700px'; ex.style.height = '440px'; ex.style.transform = `scale(${s})`; ex.style.transformOrigin = '0 0';
    if (700 * s > aw + 4) { fit.classList.add('pan'); if (pan) pan.hidden = false; }
  }
}
function closeStage(silent) {
  if (!W) return;
  const st = $('.stage', worldEl); if (!st || st.hidden) return;
  const back = W.sid && $(`.g-tile[data-id="${W.sid}"]`, worldEl);
  W.stageH && W.stageH.destroy && W.stageH.destroy(); W.stageH = null; W.sid = null;
  document.body.classList.remove('staged');
  if (silent || reduce) { st.hidden = true; st.innerHTML = ''; return; }
  st.classList.remove('on'); st.classList.add('off');
  setTimeout(() => { st.classList.remove('off'); st.hidden = true; st.innerHTML = ''; }, 280);
  back && back.focus({ preventScroll: true });
}

/* ---------------- product page backgrounds */
function stars(cv) {
  // the Animus sky, at rest: dust that drifts and leans toward the pointer
  const cx = cv.getContext('2d'); let w = 0, h = 0, raf = 0, on = true, mx = -1e4, my = -1e4;
  const pts = Array.from({ length: 140 }, (_, i) => ({ x: Math.random(), y: Math.random(), z: 0.3 + Math.random() * 0.7, c: i % 23 === 0 }));
  function size() { const d = Math.min(2, devicePixelRatio || 1); w = cv.clientWidth; h = cv.clientHeight; cv.width = w * d; cv.height = h * d; cx.setTransform(d, 0, 0, d, 0, 0); }
  size(); addEventListener('resize', size);
  const mv = e => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
  addEventListener('pointermove', mv, { passive: true });
  let t = 0;
  function f() {
    if (!on) return; t += 0.0006;
    const light = aTheme() === 'light', dust = light ? '20,20,26' : '245,245,247', acc = light ? '#5F9400' : '#C6FF3D';
    cx.clearRect(0, 0, w, h);
    const P = pts.map(p => {
      let x = ((p.x + t * p.z * 0.6) % 1) * w, y = (p.y + Math.sin(t * 6 + p.x * 9) * 0.004) * h;
      const dx = mx - x, dy = my - y, d = Math.hypot(dx, dy);
      if (d < 180) { x += dx * (1 - d / 180) * 0.12 * p.z; y += dy * (1 - d / 180) * 0.12 * p.z; }
      return [x, y, p];
    });
    cx.strokeStyle = light ? 'rgba(95,148,0,.16)' : 'rgba(198,255,61,.07)'; cx.lineWidth = 1;
    for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) { const a = P[i], b = P[j]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (d < 70 && Math.hypot(a[0] - mx, a[1] - my) < 220) { cx.globalAlpha = 1 - d / 70; cx.beginPath(); cx.moveTo(a[0], a[1]); cx.lineTo(b[0], b[1]); cx.stroke(); } }
    cx.globalAlpha = 1;
    P.forEach(([x, y, p]) => { cx.fillStyle = p.c ? acc : `rgba(${dust},${0.18 + p.z * 0.4})`; cx.beginPath(); cx.arc(x, y, p.c ? 1.8 : 0.6 + p.z, 0, 7); cx.fill(); });
    raf = reduce ? 0 : requestAnimationFrame(f);
  }
  f();
  return { destroy() { on = false; cancelAnimationFrame(raf); removeEventListener('resize', size); removeEventListener('pointermove', mv); } };
}
function wheelSVG() {
  const R = 460, ticks = [];
  for (let i = 0; i < 108; i++) { const a = i / 108 * Math.PI * 2, l = i % 9 === 0 ? 22 : i % 3 === 0 ? 12 : 6; ticks.push(`<path d="M${Math.cos(a) * R} ${Math.sin(a) * R}L${Math.cos(a) * (R - l)} ${Math.sin(a) * (R - l)}"/>`); }
  const signs = ['mesha', 'vrishabha', 'mithuna', 'karka', 'simha', 'kanya', 'tula', 'vrishchika', 'dhanu', 'makara', 'kumbha', 'meena'];
  const labels = signs.map((s, i) => { const a = (i + 0.5) / 12 * Math.PI * 2; const r = R - 60; return `<text x="${Math.cos(a) * r}" y="${Math.sin(a) * r}" transform="rotate(${a * 180 / Math.PI + 90} ${Math.cos(a) * r} ${Math.sin(a) * r})">${s}</text>`; }).join('');
  const spokes = Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return `<path d="M${Math.cos(a) * 150} ${Math.sin(a) * 150}L${Math.cos(a) * (R - 90)} ${Math.sin(a) * (R - 90)}"/>`; }).join('');
  return `<svg viewBox="-500 -500 1000 1000"><g class="wh">
    <circle r="${R}"/><circle r="${R - 90}"/><circle r="${R - 100}" stroke-dasharray="2 6"/><circle r="150"/><circle r="40"/>
    ${ticks.join('')}${spokes}${labels}
    <path d="M-480 0H480M0 -480V480" stroke-dasharray="1 9"/></g></svg>`;
}
function wheelSpin(svgEl) {
  let raf = 0, on = true;
  const g = svgEl && svgEl.querySelector('.wh');
  function f() { if (!on || !g) return; const a = (performance.now() / 1000) * 0.6 + scrollY * 0.03; g.style.transform = `rotate(${a}deg)`; raf = reduce ? 0 : requestAnimationFrame(f); }
  f();
  return { destroy() { on = false; cancelAnimationFrame(raf); } };
}

/* =============================================================== case study: a page you scroll
   Every slide is on the page with its note beside it. Any slide opens full screen,
   where the arrow keys, a swipe or a tap on either half move through the deck. */
let D = null;
function openViewer(c, n) {
  homeEl.hidden = true; bar.hidden = true;
  document.body.dataset.world = 'case';
  document.title = `${c.title} case study · Adhokshaj Wategaonkar`;
  viewerEl.hidden = false; viewerEl.dataset.key = c.key;
  viewerEl.style.cssText = `--bg:${c.world.bg};--ink:${c.world.ink};--mut:${c.world.mut};--line:${c.world.line};--acc:${c.world.accent}`;
  $('meta[name=theme-color]').content = c.world.bg;
  document.body.style.setProperty('--case-acc', c.world.accent);
  const other = CASES.find(x => x.key !== c.key), N = c.slides.length;
  viewerEl.innerHTML = `
    <header class="dv-bar">
      <a class="btn back" href="#cases"><span aria-hidden="true">←</span> Back</a>
      <div class="dv-prog" aria-hidden="true"><span><b class="dv-i">01</b> / ${pad(N)}</span><div class="dv-track"><i></i></div></div>
      <button class="btn dv-full" data-present>${EXPAND}<span>Full screen</span></button>
    </header>
    <div class="dv-head">
      <p class="dv-k">Case study · ${c.title}</p>
      <h1>${c.name}</h1>
      <p class="dv-dek">${c.dek}</p>
      <dl class="dv-facts">${c.facts.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>
      <p class="dv-hint">Scroll to flip through the deck. Open a slide to read it full screen.</p>
    </div>
    <div class="dv-body">
      <aside class="dv-side" aria-label="Slides">
        <ol class="dv-toc">${c.slides.map((s, i) => `<li><button data-to="${i}"><span>${pad(i + 1)}</span><b>${s.t}</b></button><div><p>${s.b}</p></div></li>`).join('')}</ol>
      </aside>
      <ol class="dv-list">${c.slides.map((s, i) => `
        <li class="dv-s" data-i="${i}" style="--i:${i}"><div class="dv-card">
          <button class="dv-img" data-present="${i}" aria-label="Slide ${i + 1}, ${s.t}. Open full screen."><img src="${s.src}" width="1800" height="1013" alt="${s.t}" loading="${i < 2 ? 'eager' : 'lazy'}"><span class="dv-ex" aria-hidden="true">${EXPAND}</span></button>
          <div class="dv-cap"><span class="dv-n">${pad(i + 1)}</span><h2>${s.t}</h2><p>${s.b}</p></div>
        </div></li>`).join('')}</ol>
    </div>
    <footer class="dv-foot">
      <a class="w-next" href="#case-${other.key}"><span class="dv-k">Next case study</span><b>${other.title} <span aria-hidden="true">→</span></b><span>${other.name}</span></a>
      <a class="btn" href="#cases"><span aria-hidden="true">←</span> Back to case studies</a>
    </footer>
    <div class="pv" hidden role="dialog" aria-modal="true" aria-label="${c.name}, slides full screen" tabindex="-1">
      <div class="pv-stage"><img class="pv-img" alt=""><button class="pv-hit l" aria-label="Previous slide" data-d="-1"></button><button class="pv-hit r" aria-label="Next slide" data-d="1"></button></div>
      <div class="pv-bar"><p class="pv-cap" aria-live="polite"></p><div class="pv-nav"><button class="btn ic" data-d="-1" aria-label="Previous slide"><span aria-hidden="true">←</span></button><span class="pv-n"></span><button class="btn ic" data-d="1" aria-label="Next slide"><span aria-hidden="true">→</span></button></div><button class="btn pv-x" data-exit>Exit <span class="kbd">esc</span></button></div>
    </div>`;
  D = { c, i: 0, pv: $('.pv', viewerEl), present: false };
  $$('.dv-bar a, .dv-foot a', viewerEl).forEach(a => a.addEventListener('click', e => { e.preventDefault(); go(a.getAttribute('href'), e); }));
  $$('[data-present]', viewerEl).forEach(b => b.addEventListener('click', () => present(b.dataset.present === '' ? D.i : Number(b.dataset.present))));
  $$('.pv [data-d]', viewerEl).forEach(b => b.addEventListener('click', () => presentBy(Number(b.dataset.d))));
  $('[data-exit]', viewerEl).addEventListener('click', () => endPresent());
  let sx = null; const stg = $('.pv-stage', viewerEl);
  stg.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  stg.addEventListener('touchend', e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 40) { e.preventDefault(); presentBy(dx < 0 ? 1 : -1); } });
  // Each slide sticks near the top and the next one slides up over it, so the deck
  // piles up like cards. The slide underneath shrinks and dims as it is covered.
  const cards = $$('.dv-s', viewerEl), toc = $$('.dv-toc li', viewerEl);
  $$('.dv-toc button', viewerEl).forEach(b => b.addEventListener('click', () => slideTo(Number(b.dataset.to) + 1)));
  D.cards = cards;
  D.onScroll = () => {
    const rs = cards.map(c => c.getBoundingClientRect()), base = parseFloat(getComputedStyle(cards[0]).top) || 0;
    let act = 0;
    cards.forEach((c, i) => {
      if (rs[i].top <= base + i * 5 + innerHeight * 0.3) act = i;
      const p = i < N - 1 ? Math.max(0, Math.min(1, (rs[i].bottom - rs[i + 1].top) / rs[i].height)) : 0;
      c.style.setProperty('--p', p.toFixed(3));
    });
    cards.forEach((c, i) => c.classList.toggle('under', i < act - 2));
    if (act !== D.i || !D.painted) {
      D.painted = true; D.i = act; $('.dv-i', viewerEl).textContent = pad(act + 1);
      toc.forEach((li, i) => li.classList.toggle('on', i === act));
      const side = $('.dv-side', viewerEl), on = toc[act];
      if (side.scrollHeight > side.clientHeight) side.scrollTop = on.offsetTop - side.clientHeight / 3;
    }
    const max = document.documentElement.scrollHeight - innerHeight;
    $('.dv-track i', viewerEl).style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    $('.dv-bar', viewerEl).classList.toggle('scrolled', scrollY > 8);
  };
  addEventListener('scroll', D.onScroll, { passive: true });
  D.onFs = () => { if (D && D.present && !document.fullscreenElement && D.wasFs) endPresent(true); };
  document.addEventListener('fullscreenchange', D.onFs);
  scrollTo(0, 0);
  if (n > 1) requestAnimationFrame(() => slideTo(n, true));
  D.onScroll();
}
function slideTo(n, instant) {
  const cards = D.cards, i = Math.max(0, Math.min(cards.length - 1, n - 1));
  // where the card sits before it sticks: the list's top plus everything above it
  const list = cards[0].parentNode, base = parseFloat(getComputedStyle(cards[0]).top) || 0;
  let y = list.getBoundingClientRect().top + scrollY;
  for (let j = 0; j < i; j++) y += cards[j].offsetHeight + (parseFloat(getComputedStyle(cards[j]).marginBottom) || 0);
  root.style.scrollBehavior = 'auto'; scrollTo({ top: y - base - i * 5 + 2, behavior: instant || reduce ? 'auto' : 'smooth' }); root.style.scrollBehavior = '';
}
function present(i) {
  if (!D) return;
  D.present = true; D.pv.hidden = false; document.body.classList.add('staged');
  D.wasFs = false;
  try { const p = D.pv.requestFullscreen && D.pv.requestFullscreen(); p && p.then(() => { D && (D.wasFs = true); }, () => {}); } catch (e) {}
  showSlide(i);
  D.pv.focus({ preventScroll: true }); viewerEl.classList.add('seen');
}
function showSlide(i) {
  const N = D.c.slides.length; i = Math.max(0, Math.min(N - 1, i)); D.pi = i;
  const s = D.c.slides[i], img = $('.pv-img', D.pv);
  img.src = s.src; img.alt = s.t;
  $('.pv-cap', D.pv).textContent = s.t; $('.pv-n', D.pv).textContent = `${pad(i + 1)} / ${pad(N)}`;
  $$('.pv [data-d="-1"]', viewerEl).forEach(b => b.disabled = i === 0);
  $$('.pv [data-d="1"]', viewerEl).forEach(b => b.disabled = i === N - 1);
  [i - 1, i + 1].forEach(k => { if (D.c.slides[k]) { const im = new Image(); im.src = D.c.slides[k].src; } });
}
function presentBy(d) { if (D && D.present) showSlide(D.pi + d); }
function endPresent(fromFs) {
  if (!D || !D.present) return;
  D.present = false; D.pv.hidden = true; document.body.classList.remove('staged');
  if (!fromFs && document.fullscreenElement) { try { document.exitFullscreen(); } catch (e) {} }
  slideTo(D.pi + 1, true);
  const b = $(`.dv-img[data-present="${D.pi}"]`, viewerEl); b && b.focus({ preventScroll: true });
}
function closeViewer() {
  if (!D) return;
  if (document.fullscreenElement) { try { document.exitFullscreen(); } catch (e) {} }
  removeEventListener('scroll', D.onScroll); document.removeEventListener('fullscreenchange', D.onFs);
  document.body.classList.remove('staged');
  D = null; viewerEl.hidden = true; viewerEl.innerHTML = ''; viewerEl.dataset.key = '';
}

/* =============================================================== keys */
addEventListener('keydown', e => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const t = e.target; if (t && (t.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(t.tagName))) return;
  if (t && t.closest && t.closest('.ex-root') && !t.closest('.ex-root.own')) return;
  const k = e.key, kl = k.toLowerCase();
  if (view === 'case' && D) {
    if (D.present) {
      if (k === 'ArrowRight' || k === ' ' || k === 'PageDown') { e.preventDefault(); presentBy(1); }
      else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); presentBy(-1); }
      else if (k === 'Escape') { e.preventDefault(); endPresent(); }
      return;
    }
    if (k === 'Escape') go('#cases');
    else if (kl === 'f') present(D.i);
    else if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); slideTo(D.i + 2); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); slideTo(D.i); }
    return;
  }
  if (view === 'world' && W) {
    const staged = !$('.stage', worldEl).hidden;
    if (k === 'Escape') { e.preventDefault(); go(staged ? `#${W.key}` : '#work'); return; }
    if (staged && (k === 'ArrowRight' || k === 'ArrowLeft')) { e.preventDefault(); const l = W.w.gallery, i = l.findIndex(x => x.id === W.sid); go(`#${W.key}-play-${l[(i + (k === 'ArrowRight' ? 1 : -1) + l.length) % l.length].id}`); return; }
    if (kl === 's' && !e.repeat) toggleSound();
    return;
  }
  if (e.repeat) return;
  if (kl === 't') { const b = thm.getBoundingClientRect(); setTheme(b.left + b.width / 2, b.top + b.height / 2); }
  else if (kl === 's') toggleSound();
});

// for anyone who opens the console
try { console.log('%cHi. %cPlain ES modules, no build step. Click my name on the home page, or type "adho".', 'font-weight:600', 'font-weight:400'); } catch (e) {}

route();
onScroll();
