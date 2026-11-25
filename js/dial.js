// The sky dial, in Shastra's own design: haldi paper, the kumkum band of the twelve
// signs from the Shastra homepage wheel, Geist Serif in lowercase, Plex Mono for the
// numbers. Drag the band and the Moon follows your finger, because a pixel is set to
// the hours the Moon needs to cross it. Flick it and it coasts. Every nakshatra the
// Moon passes clicks, a change of sign lands with a heavier detent, a new day ticks.

import { read, dm, SIGNS, SHORT, NAK, GLYPH, moonSVG } from './astro.js';
import { sfx } from './sound.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MARK = '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="1" y="1" width="18" height="18" rx="2" fill="currentColor"/><path d="M10 4.5 15.5 10 10 15.5 4.5 10z" fill="none" stroke="var(--sd-paper)" stroke-width="1.4"/><circle cx="10" cy="10" r="1.6" fill="var(--sd-paper)"/></svg>';

// One word rolls out and the next rolls in. While the band is being dragged the words
// change many times a second, so a change that arrives within 220ms of the last one
// swaps the word in place: there is only ever one word in the row, and nothing overlaps.
function roll(el, text) {
  if (el.dataset.v === text) return;
  const first = el.dataset.v == null, now = performance.now(), fast = now - (el._t || 0) < 220;
  el.dataset.v = text; el._t = now;
  if (first || reduce || fast) { clearTimeout(el._k); el.innerHTML = ''; const s = document.createElement('span'); s.textContent = text; el.appendChild(s); return; }
  [...el.children].slice(0, -1).forEach(c => c.remove());
  const old = el.lastElementChild;
  const nu = document.createElement('span');
  nu.textContent = text; nu.className = 'in';
  el.appendChild(nu);
  if (old) old.className = 'out';
  clearTimeout(el._k);
  el._k = setTimeout(() => { [...el.children].forEach(c => { if (c !== nu) c.remove(); }); }, 400);
  requestAnimationFrame(() => requestAnimationFrame(() => { if (nu.isConnected && el.lastElementChild === nu) nu.className = ''; }));
}

export function mountDial(root, { big = false } = {}) {
  root.classList.add('sd'); if (big) root.classList.add('sd-big');
  root.innerHTML = `
    <div class="sd-top"><span class="sd-live"><i></i>the sky, computed in your browser</span><span class="sd-mark">${MARK}<b>shastra</b></span></div>
    <div class="sd-read">
      <div class="sd-row"><span class="k"><i class="lg sun"></i>sun</span><span class="v" data-r="sun"></span><span class="d" data-r="sund"></span></div>
      <div class="sd-row"><span class="k"><i class="lg moon"></i>moon</span><span class="v" data-r="moon"></span><span class="d" data-r="moond"></span></div>
      <div class="sd-row"><span class="k">nakshatra</span><span class="v" data-r="nak"></span><span class="d" data-r="pada"></span></div>
      <div class="sd-row"><span class="k">tithi</span><span class="v" data-r="tithi"></span><span class="d" data-r="phase"></span></div>
    </div>
    <div class="sd-band" role="slider" tabindex="0" data-cur="drag" data-cur-label="press and drag" aria-label="Drag to move through time" aria-valuemin="-87600" aria-valuemax="87600" aria-valuenow="0">
      <div class="sd-signs">${SHORT.map((s, i) => `<span><em>${GLYPH[i]}</em>${s}</span>`).join('')}</div>
      <div class="sd-ticks"></div>
      <div class="mk sun"></div><div class="mk moon"></div>
    </div>
    <div class="sd-ctl">
      <button class="sd-key" data-d="-1" aria-label="One day earlier">− 1 day</button>
      <button class="sd-date" data-now title="Back to now"></button>
      <button class="sd-key" data-d="1" aria-label="One day later">+ 1 day</button>
    </div>`;
  const $ = s => root.querySelector(s);
  const R = {}; root.querySelectorAll('[data-r]').forEach(e => R[e.dataset.r] = e);
  const band = $('.sd-band'), mkS = $('.mk.sun'), mkM = $('.mk.moon'), signs = [...root.querySelectorAll('.sd-signs span')], date = $('.sd-date');

  let base = new Date(), off = 0, last = null, shown = false, alive = true;
  let drag = null, vel = 0, coast = 0, lastT = 0, lastX = 0;

  function place(el, v) {
    const nx = v / 3.6, prev = parseFloat(el.style.left);
    if (!isNaN(prev) && Math.abs(nx - prev) > 50) { el.style.transition = 'none'; el.style.left = nx + '%'; el.offsetWidth; el.style.transition = ''; }
    else el.style.left = nx + '%';
  }
  function paint(silent) {
    const d = new Date(base.getTime() + off * 36e5), r = read(d);
    roll(R.sun, SIGNS[r.ss]); R.sund.textContent = dm(r.sun);
    roll(R.moon, SIGNS[r.ms]); R.moond.textContent = dm(r.moon);
    roll(R.nak, NAK[r.nk]); R.pada.textContent = 'pada ' + r.pada;
    roll(R.tithi, r.tithi); R.phase.innerHTML = `${moonSVG(r.el, 6)}<span>${r.paksha}</span>`;
    if (shown) { place(mkS, r.sun); place(mkM, r.moon); }
    signs.forEach((s, i) => s.classList.toggle('on', i === r.ss || i === r.ms));
    const day = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }).toLowerCase();
    const hm = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
    date.innerHTML = `<b>${day}</b>${Math.abs(off) < 0.5 ? 'now, over ujjain' : hm + ' ist · tap for now'}`;
    band.setAttribute('aria-valuenow', Math.round(off));
    band.setAttribute('aria-valuetext', `${day}, moon in ${SIGNS[r.ms]}, ${NAK[r.nk]}`);
    if (!silent && last) {
      if (r.ms !== last.ms || r.ss !== last.ss) { sfx.detent(); pulse(r.ms !== last.ms ? mkM : mkS); }
      else if (r.nk !== last.nk) sfx.tick(0.7);
      else if (day !== last.day) sfx.tick(1.3);
    }
    last = { ms: r.ms, ss: r.ss, nk: r.nk, day };
  }
  function pulse(el) { el.classList.remove('hit'); el.offsetWidth; el.classList.add('hit'); }

  // one pixel of band = the hours the Moon needs to cross it
  const clampN = (x, a, b) => Math.max(a, Math.min(b, x));
  const hPerPx = () => (360 / Math.max(200, band.clientWidth)) / 0.549;

  function step() {
    coast = 0;
    if (!alive || drag || Math.abs(vel) < 0.02) { vel = 0; band.classList.remove('coast'); return; }
    off += vel * 16; vel *= 0.93; paint();
    coast = requestAnimationFrame(step);
  }
  // Nothing moves until the band is pressed. On press the Moon comes to the pointer,
  // and from then on it stays under it, so it is plain what is being held. Letting go
  // stops it where it is.
  const live = root.querySelector('.sd-live'), liveWas = live ? live.innerHTML : '';
  band.addEventListener('pointerdown', e => {
    if (e.button) return;
    shown = true; cancelAnimationFrame(coast); vel = 0;
    const r = band.getBoundingClientRect(), want = clampN((e.clientX - r.left) / r.width, 0, 1) * 360;
    const at = read(new Date(base.getTime() + off * 36e5)).moon;
    let d = want - at; if (d > 180) d -= 360; if (d < -180) d += 360;
    off += d / 0.549; paint();
    drag = { x: e.clientX, o: off, moved: false };
    band.classList.add('held'); root.classList.add('holding'); band.setPointerCapture(e.pointerId);
    if (live) live.innerHTML = '<i></i>holding the moon · drag left or right';
    sfx.detent();
  });
  band.addEventListener('pointermove', e => {
    if (!drag) return;
    if (!drag.moved) { if (Math.abs(e.clientX - drag.x) < 2) return; drag.moved = true; band.classList.add('drag'); }
    off = drag.o + (e.clientX - drag.x) * hPerPx(); paint();
  });
  const end = () => {
    if (!drag) return; drag = null; band.classList.remove('drag', 'held'); root.classList.remove('holding');
    if (live) live.innerHTML = liveWas;
  };
  band.addEventListener('pointerup', end); band.addEventListener('pointercancel', end);
  band.addEventListener('keydown', e => {
    const k = e.key; let used = true;
    if (k === 'ArrowRight') off += e.shiftKey ? 24 : 3;
    else if (k === 'ArrowLeft') off -= e.shiftKey ? 24 : 3;
    else if (k === 'Home') off = 0;
    else used = false;
    if (used) { e.preventDefault(); e.stopPropagation(); shown = true; paint(); }
  });
  root.querySelectorAll('.sd-key').forEach(b => b.addEventListener('click', () => { shown = true; cancelAnimationFrame(coast); vel = 0; off += 24 * Number(b.dataset.d); paint(); }));
  date.addEventListener('click', () => { if (Math.abs(off) > 0.01) { cancelAnimationFrame(coast); vel = 0; off = 0; base = new Date(); paint(); sfx.detent(); } });

  mkS.style.left = '0%'; mkM.style.left = '0%';
  paint(true);
  const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); setTimeout(() => { shown = true; paint(true); }, reduce ? 0 : 280); } }, { threshold: 0.35 });
  io.observe(root);
  const clock = setInterval(() => { if (Math.abs(off) < 0.01 && !drag) { base = new Date(); paint(true); } }, 60000);
  return { destroy() { alive = false; io.disconnect(); clearInterval(clock); cancelAnimationFrame(coast); root.innerHTML = ''; } };
}
