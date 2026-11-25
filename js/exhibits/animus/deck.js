// deck: one thing at a time. Card view (Deck.jsx), as the marketing site's #swipe
// section ports it. Right done, left drop, down later, up skip, undo. Up and undo
// were added to the brief because a stack demanding a verdict on every card inserts
// a decision. Deliberately no "4 of 19": a deck that counts down is a backlog with a
// progress bar. Down asks when before it flies. A done card has no row to sweep, so
// the clear is the seal: lime disc, a check that draws itself, rings, and the mallet.

import { esc, loadFonts, clock, html, sayer, clamp, centreOf } from './lib/util.js';
import { makeAudio } from './lib/audio.js';
import { clearer } from './lib/moment.js';
import { fireSeal } from './lib/seal.js';
import { presets, hint } from './lib/snooze.js';

const SAMPLE = [
  { t: 'reply to the landlord about the boiler', y: 'task', m: 'today', age: '2 days ago', from: 'whatsapp' },
  { t: 'that video on sleep', y: 'link', m: 'youtube · 8 min', age: 'monday', from: 'share sheet' },
  { t: 'book the dentist', y: 'reminder', m: 'friday', age: '1 week ago', from: 'whatsapp', due: 'due in 2d' },
  { t: 'call mum back', y: 'reminder', m: 'tonight', age: 'this morning', from: 'iphone shortcut' },
  { t: 'a shelf for the hallway', y: 'idea', m: 'no date', age: '3 weeks ago', from: 'whatsapp' },
  { t: 'renew the passport', y: 'task', m: 'next week', age: '9 days ago', from: 'in the app', stale: true },
  { t: 'start running again', y: 'goal', m: 'by march', age: '1 month ago', from: 'whatsapp' },
];
const WORD = { done: 'done', dropped: 'drop', snoozed: 'later', skip: 'skip' };
const EDGE = { done: 'var(--accent)', dropped: 'var(--wash-drop-ink)', snoozed: 'var(--wash-snooze-ink)', skip: 'var(--ink)' };
const THROW_AT = 84, FLICK_AT = 620;
const ICON = {
  undo: '<path d="M6 3.5L2.5 7 6 10.5"/><path d="M3 7h6.5a3.5 3.5 0 0 1 0 7H8"/>',
  dropped: '<path d="M4 4l8 8M12 4l-8 8"/>',
  snoozed: '<circle cx="8" cy="8" r="6"/><path d="M8 4.8V8l2 1.5"/>',
  done: '<path d="M3 8.4l3.2 3.4L13 4.5"/>',
  skip: '<path d="M8 13V3.5M4 7l4-4 4 4"/>',
};

export function mount(root, ctx) {
  loadFonts();
  const t = clock();
  const audio = makeAudio(ctx.sound);
  const reduce = !!ctx.reduce;
  const moments = clearer();

  const btn = (d, label, cls = '') => `<button type="button" class="${cls}" data-d="${d}"${d === 'undo' ? ' disabled' : ''}><i><svg viewBox="0 0 16 16" aria-hidden="true">${ICON[d]}</svg></i>${label}</button>`;
  root.innerHTML = `
  <div class="ax-deckx">
    <section class="ax-dstage">
      <div class="ax-dtop"><b>the pile, as cards</b><span data-left></span></div>
      <div class="ax-stack" data-stack tabindex="0" aria-label="a stack of cards. arrow keys: right done, left drop, down later, up skip. z undoes."></div>
      <div class="ax-dacts" data-acts>
        ${btn('undo', 'undo', 'sm')}${btn('dropped', 'drop')}${btn('snoozed', 'later')}${btn('done', 'done', 'pri')}${btn('skip', 'skip', 'sm')}
      </div>
      <div class="ax-said" data-said role="status"></div>
    </section>
    <section class="ax-moves" aria-label="the four moves">
      <span class="ax-label">four directions, one decision</span>
      <ul>
        <li><button type="button" data-d="done"><i class="ax-k done" aria-hidden="true">→</i><span><b>right: done</b>you finished it. a check, and a small sound.</span></button></li>
        <li><button type="button" data-d="snoozed"><i class="ax-k" aria-hidden="true">↓</i><span><b>down: later</b>pick when it comes back. out of the way until then.</span></button></li>
        <li><button type="button" data-d="dropped"><i class="ax-k" aria-hidden="true">←</i><span><b>left: drop</b>you’re not doing it. put aside, never deleted.</span></button></li>
        <li><button type="button" data-d="skip"><i class="ax-k" aria-hidden="true">↑</i><span><b>up: skip</b>not now. it goes to the back, and nothing is recorded.</span></button></li>
      </ul>
      <p class="ax-keys">drag a card, or use <kbd>←</kbd> <kbd>↑</kbd> <kbd>→</kbd> <kbd>↓</kbd>. <kbd>z</kbd> undoes.</p>
    </section>
  </div>`;

  const $ = (s) => root.querySelector(s);
  const stack = $('[data-stack]'), acts = $('[data-acts]'), left = $('[data-left]');
  const say = sayer($('[data-said]'), t, 1700);
  let items = [], undo = [], tally = { done: 0, snoozed: 0, dropped: 0 }, busy = false;

  function deal() {
    items = SAMPLE.map((x, i) => ({ ...x, id: 'd' + i }));
    undo = [];
    tally = { done: 0, snoozed: 0, dropped: 0 };
    render();
  }
  function cardHTML(it, depth) {
    const chips = [`<span class="ax-pill">from ${esc(it.from)}</span>`];
    if (it.due) chips.push(`<span class="ax-pill">${esc(it.due)}</span>`);
    if (it.stale) chips.push('<span class="ax-pill">going stale</span>');
    return `<div class="ax-card${depth ? ' under' : ''}"${depth ? ' aria-hidden="true"' : ' data-top'} style="--c:var(--t-${it.y});z-index:${3 - depth};transform:translate3d(0,${depth * 14}px,0) scale(${1 - depth * 0.045});--dim:${1 - depth * 0.28}">
      <span class="ax-tint"></span><span class="ax-word" aria-hidden="true"></span>
      <span class="ax-ctop"><span class="ax-dot"></span><span class="ax-label">${esc(it.y)}${it.m && it.m !== 'no date' ? ' · ' + esc(it.m) : ''}</span><span class="ax-label">${esc(it.age)}</span></span>
      <h3>${esc(it.t)}</h3>
      <span class="ax-cfoot">${chips.join('')}</span>
    </div>`;
  }
  function render() {
    if (!items.length) {
      stack.innerHTML = `<div class="ax-dempty"><b>nothing left to decide.</b><span>${tally.done} done, ${tally.snoozed} for later, ${tally.dropped} dropped.</span><button class="ax-ghost" type="button" data-again>deal the cards again</button></div>`;
    } else {
      const list = items.slice(0, 3);
      stack.innerHTML = list.slice().reverse().map((it) => cardHTML(it, list.indexOf(it))).join('');
      wire(stack.querySelector('[data-top]'));
    }
    acts.querySelector('[data-d="undo"]').disabled = !undo.length;
    left.textContent = 'newest first';
  }
  function feel(c, k, amount) {
    const word = c.querySelector('.ax-word'), tint = c.querySelector('.ax-tint');
    if (amount > 0) c.style.setProperty('--edge', EDGE[k]); else c.style.removeProperty('--edge');
    word.textContent = WORD[k]; word.dataset.k = k; word.style.opacity = amount;
    tint.style.opacity = amount * (k === 'done' ? 0.14 : 0.1);
  }

  function throwCard(kind, when) {
    const c = stack.querySelector('[data-top]');
    if (!c || busy) return;
    if (c.querySelector('.ax-later')) return;
    const it = items[0];
    if (kind === 'snoozed' && !when) { later(c); return; }
    busy = true;
    const at = centreOf(root, c);
    feel(c, kind, 1);
    const dx = kind === 'done' ? 1 : kind === 'dropped' ? -1 : 0;
    const dy = kind === 'skip' ? -1 : kind === 'snoozed' ? 1 : 0;
    c.style.transition = reduce ? 'none' : 'transform .34s cubic-bezier(.3,0,.7,1),opacity .34s';
    c.style.transform = `translate3d(${dx * 560}px,${dy * 420}px,0) rotate(${dx * 16}deg)`;
    c.style.opacity = '0';
    c.style.pointerEvents = 'none';
    // The next card is already there.
    const next = stack.querySelector('.ax-card.under[style*="z-index:2"]');
    if (next && kind !== 'skip') {
      next.classList.remove('under');
      next.style.transform = 'none';
    }
    if (kind === 'done') {
      tally.done++;
      const m = moments.clear(it);
      audio.clear(m.tier);
      fireSeal(root, { x: at.x, y: at.y, tier: m.tier, reduce });
      say(m.line);
    } else if (kind === 'dropped') { tally.dropped++; }
    else if (kind === 'snoozed') { tally.snoozed++; say(`back ${when}.`); }
    else { audio.sfx('whoosh'); }
    undo.push({ it, kind });
    t.after(() => {
      items.shift();
      if (kind === 'skip') items.push(it);
      busy = false;
      render();
    }, reduce ? 0 : 300);
  }

  function later(c) {
    c.style.transition = ''; c.style.transform = ''; feel(c, 'snoozed', 0);
    const p = html(`<div class="ax-later">
      <div class="ax-snoozehead"><span class="ax-label">when should “${esc(items[0].t)}” come back?</span><button class="ax-cancel" type="button" data-x>cancel</button></div>
      <div class="ax-presets">${presets().slice(0, 4).map((s) => `<button type="button" data-v="${esc(s.k)}"><b>${esc(s.k)}</b><em>${esc(hint(s.at))}</em></button>`).join('')}</div>
    </div>`);
    c.appendChild(p);
    audio.sfx('open');
    p.addEventListener('pointerdown', (e) => e.stopPropagation());
    p.addEventListener('click', (e) => {
      e.stopPropagation();
      if (e.target.closest('[data-x]')) { p.remove(); audio.sfx('shut'); stack.focus({ preventScroll: true }); return; }
      const b = e.target.closest('[data-v]');
      if (!b) return;
      p.remove();
      throwCard('snoozed', b.dataset.v);
      stack.focus({ preventScroll: true });
    });
    p.querySelector('[data-v]')?.focus({ preventScroll: true });
  }

  function back() {
    const u = undo.pop();
    if (!u || busy) return;
    if (u.kind === 'skip') items.pop();
    else if (tally[u.kind]) tally[u.kind]--;
    items.unshift(u.it);
    audio.sfx('shut');
    render();
  }

  function wire(c) {
    if (!c) return;
    let pid = null, sx = 0, sy = 0, dx = 0, dy = 0, t0 = 0, moved = false;
    const dirOf = () => (Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? 'done' : 'dropped') : (dy > 0 ? 'snoozed' : 'skip'));
    c.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.ax-later') || busy) return;
      pid = e.pointerId; sx = e.clientX; sy = e.clientY; dx = dy = 0; moved = false; t0 = performance.now();
      try { c.setPointerCapture(pid); } catch { /* fine */ }
      c.style.transition = 'none';
      stack.focus({ preventScroll: true });
    });
    c.addEventListener('pointermove', (e) => {
      if (e.pointerId !== pid) return;
      dx = e.clientX - sx; dy = e.clientY - sy;
      const d = Math.hypot(dx, dy);
      if (d > 6) moved = true;
      if (!moved) return;
      c.style.transform = `translate3d(${dx}px,${dy}px,0) rotate(${dx * 0.05}deg)`;
      feel(c, dirOf(), clamp((d - 16) / (THROW_AT - 16), 0, 1));
    });
    const end = (e) => {
      if (e.pointerId !== pid) return;
      pid = null;
      const d = Math.hypot(dx, dy), speed = (d / Math.max(1, performance.now() - t0)) * 1000;
      if (e.type === 'pointerup' && moved && (d > THROW_AT || (speed > FLICK_AT && d > 28))) { throwCard(dirOf()); return; }
      c.style.transition = ''; c.style.transform = ''; feel(c, 'done', 0);
    };
    c.addEventListener('pointerup', end);
    c.addEventListener('pointercancel', end);
  }

  // The first time it's seen, the top card leans right and back: the gesture, taught.
  function teach() {
    if (reduce) return;
    const c = stack.querySelector('[data-top]');
    if (!c || !c.animate) return;
    const word = c.querySelector('.ax-word');
    word.textContent = WORD.done; word.dataset.k = 'done';
    c.animate([{ transform: 'none' }, { transform: 'translate3d(70px,0,0) rotate(3.5deg)', offset: 0.45 },
      { transform: 'translate3d(70px,0,0) rotate(3.5deg)', offset: 0.6 }, { transform: 'none' }], { duration: 1400, easing: 'cubic-bezier(.45,0,.25,1)' });
    word.animate([{ opacity: 0 }, { opacity: 1, offset: 0.45 }, { opacity: 1, offset: 0.6 }, { opacity: 0 }], { duration: 1400 });
  }

  const onClick = (e) => {
    if (e.target.closest('[data-again]')) { audio.sfx('open'); deal(); stack.focus({ preventScroll: true }); return; }
    const b = e.target.closest('.ax-dacts [data-d], .ax-moves [data-d]');
    if (!b) return;
    if (b.dataset.d === 'undo') { back(); return; }
    if (!items.length) deal();
    throwCard(b.dataset.d);
  };
  root.addEventListener('click', onClick);
  // Keys only while focus is inside the exhibit (the listener is on root).
  const onKey = (e) => {
    if (e.target.closest('textarea,input')) return;
    const k = { ArrowRight: 'done', ArrowLeft: 'dropped', ArrowDown: 'snoozed', ArrowUp: 'skip' }[e.key];
    if (k) {
      e.preventDefault();
      e.stopPropagation();
      if (stack.querySelector('.ax-later')) return;
      if (!items.length) return;
      throwCard(k);
      return;
    }
    if (e.key === 'z' || e.key === 'Z') { e.preventDefault(); back(); }
    if (e.key === 'Escape') {
      const p = stack.querySelector('.ax-later');
      if (p) { p.remove(); stack.focus({ preventScroll: true }); }
    }
  };
  root.addEventListener('keydown', onKey);

  deal();
  t.after(teach, 600);

  return {
    destroy() {
      t.clear();
      root.removeEventListener('click', onClick);
      root.removeEventListener('keydown', onKey);
      root.innerHTML = '';
    },
  };
}
