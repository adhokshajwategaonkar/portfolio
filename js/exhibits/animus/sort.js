// sort: send a mess, get it back sorted.
// The marketing site's #try demo (site/index.html), as one exhibit: a WhatsApp-like
// chat on the left, the pile on the right. A message leaves with delivery ticks, the
// typing indicator shows, the items land one by one newest first, and ONE reply names
// what it found (the product batches its reply per burst). Tap an item to open it.

import { esc, loadFonts, clock, timeNow, html, sayer, hostOf } from './lib/util.js';
import { makeAudio } from './lib/audio.js';
import { EXAMPLES, parse, replyFor, TYPES } from './lib/sorter.js';
import { clearer } from './lib/moment.js';
import { fireWash } from './lib/wash.js';
import { fireSeal } from './lib/seal.js';
import { presets, hint } from './lib/snooze.js';
import { centreOf } from './lib/util.js';

export function mount(root, ctx) {
  loadFonts();
  const t = clock();
  const audio = makeAudio(ctx.sound);
  const reduce = !!ctx.reduce;
  const moments = clearer();

  root.innerHTML = `
  <div class="ax-sort">
    <section class="ax-pane" aria-label="chat with animus">
      <div class="ax-top">
        <span class="ax-avatar" aria-hidden="true">a</span>
        <div class="ax-who"><b>animus</b><span data-status>on whatsapp</span></div>
        <span class="ax-sub">today</span>
      </div>
      <div class="ax-thread" data-thread aria-live="polite">
        <div class="ax-bub in">send me a link, a reminder, or whatever you keep forgetting. i’ll sort it.<span class="ax-stamp">9:41</span></div>
      </div>
      <div class="ax-composer">
        <div class="ax-tries" data-tries></div>
        <div class="ax-cbox">
          <textarea class="ax-msg" data-msg rows="1" spellcheck="false" autocomplete="off" placeholder="type it however it comes out…" aria-label="message to animus"></textarea>
          <button class="ax-send" data-send type="button" aria-label="send"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.3 21.4 23 12 2.3 2.6 2.3 10l14.9 2-14.9 2z"/></svg></button>
        </div>
      </div>
    </section>
    <section class="ax-pane" aria-label="the pile">
      <div class="ax-top"><b>the pile</b><span class="ax-sub" data-sub>newest first</span></div>
      <div class="ax-pile" data-pile></div>
      <div class="ax-foot">
        <svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2"/><path d="M8 7.2v3.6M8 5.2v.1"/></svg>
        <span>the real app sorts with a model. this demo sorts by hand-written rules, in your browser.</span>
      </div>
      <div class="ax-said" data-said role="status"></div>
      <div class="ax-scrim" data-scrim></div>
      <div class="ax-sheet" data-sheet role="dialog" aria-label="the item, open" aria-hidden="true">
        <div class="ax-grab"></div>
        <div class="ax-sbody" data-sbody></div>
        <div class="ax-bar" data-bar></div>
      </div>
    </section>
  </div>`;

  const $ = (s) => root.querySelector(s);
  const thread = $('[data-thread]'), msg = $('[data-msg]'), pile = $('[data-pile]'), status = $('[data-status]');
  const sub = $('[data-sub]'), sheet = $('[data-sheet]'), scrim = $('[data-scrim]'), sbody = $('[data-sbody]'), bar = $('[data-bar]');
  const say = sayer($('[data-said]'), t);

  let items = [], uid = 0, burst = 0, busy = false, used = false, typing = null, openId = null, landed = 0;
  const byId = (id) => items.find((x) => x.id === id);

  // ------------------------------------------------------------- examples
  const tries = $('[data-tries]');
  EXAMPLES.forEach((ex) => {
    const b = html(`<button class="ax-try" type="button">${esc(ex.b)}</button>`);
    b.addEventListener('click', () => typeIn(ex));
    tries.appendChild(b);
  });
  const setTries = (on) => tries.querySelectorAll('button').forEach((b) => { b.disabled = !on; });

  function autosize() { msg.style.height = 'auto'; msg.style.height = Math.min(92, msg.scrollHeight) + 'px'; }
  msg.addEventListener('input', autosize);
  msg.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(null); }
  });
  $('[data-send]').addEventListener('click', () => send(null));

  // The examples type themselves in: watching the mess arrive is half of it.
  function typeIn(ex, auto) {
    if (busy) return;
    if (typing) { t.cancel(typing); typing = null; }
    closeSheet();
    if (!auto) msg.focus({ preventScroll: true });
    if (reduce) { msg.value = ex.x; autosize(); send(ex); return; }
    let i = 0;
    msg.value = '';
    typing = t.every(() => {
      i += 1;
      msg.value = ex.x.slice(0, i);
      if (i % 4 === 0) { autosize(); audio.sfx('key'); }
      if (i >= ex.x.length) { t.cancel(typing); typing = null; autosize(); send(ex); }
    }, 12);
  }

  function scrollThread() { thread.scrollTop = thread.scrollHeight; }

  function send(ex) {
    if (busy) return;
    const text = (ex ? ex.x : msg.value).trim();
    if (!text) { msg.focus(); return; }
    if (typing) { t.cancel(typing); typing = null; }
    busy = true; used = true; burst++;
    setTries(false);
    msg.value = ''; autosize();

    const out = html(`<div class="ax-bub out">${esc(text)}<span class="ax-stamp">${timeNow()} <span class="ax-tick" data-s="pending"></span></span></div>`);
    thread.appendChild(out); scrollThread();
    audio.sfx('whoosh');
    const tick = out.querySelector('.ax-tick');

    const b = burst;
    const parsed = (ex ? ex.i : parse(text)).map((o) => ({
      id: 'i' + (++uid), b, t: o.t, y: o.y, m: o.m, url: o.url || null, urg: o.urg || 2,
      due: o.due ?? null, src: 'whatsapp', at: timeNow(), fresh: true,
    }));
    const T = reduce ? 0 : 1;
    t.after(() => { tick.dataset.s = 'sent'; }, 220 * T);
    t.after(() => { tick.dataset.s = 'delivered'; }, 520 * T);
    t.after(() => {
      if (reduce) return;
      thread.appendChild(html('<div class="ax-typing" data-typing><i></i><i></i><i></i></div>'));
      scrollThread();
      status.textContent = 'sorting…'; status.classList.add('busy');
    }, 640 * T);
    parsed.forEach((it, n) => {
      t.after(() => { items.push(it); render(true); audio.sfx('land'); }, (950 + n * 240) * T);
    });
    t.after(() => {
      thread.querySelector('[data-typing]')?.remove();
      status.textContent = 'on whatsapp'; status.classList.remove('busy');
      thread.appendChild(html(`<div class="ax-bub in">${esc(replyFor(parsed))}<span class="ax-stamp">${timeNow()}</span></div>`));
      tick.dataset.s = 'read';
      scrollThread();
      audio.sfx('reply');
      busy = false;
      setTries(true);
    }, (950 + parsed.length * 240 + 300) * T);
  }

  // ------------------------------------------------------------- the pile
  // Newest first: GET /items orders by created_at descending. Inside a burst the
  // items keep the order the reply named them in.
  const ordered = () => items.slice().sort((a, b) => b.b - a.b || (+a.id.slice(1)) - (+b.id.slice(1)));
  function chip(it) {
    if (it.due == null) return '';
    if (it.due === 0) return '<span class="ax-pill hot">due today</span>';
    return `<span class="ax-pill">due in ${it.due}d</span>`;
  }
  function itemHTML(it) {
    const fresh = it.fresh ? ' fresh' : '';
    it.fresh = false;
    const prev = it.url ? `<span class="ax-chipprev"><i></i><span>${esc(hostOf(it.url))}</span></span>` : '';
    return `<div class="ax-item${fresh}" role="button" tabindex="0" data-id="${it.id}" style="--c:var(--t-${it.y})">
      <span class="ax-dot"></span>
      <span><h3>${esc(it.t)}</h3>
        <span class="ax-meta"><span class="ax-label">${esc(it.y)}${it.m && it.m !== 'no date' ? ' · ' + esc(it.m) : ''}${it.urg === 3 ? ' · high' : ''}</span></span>
        ${prev}
      </span>
      <span class="ax-side"><span class="ax-label">just now</span>${chip(it)}</span>
    </div>`;
  }
  function render(land) {
    if (!items.length) {
      pile.innerHTML = used
        ? '<div class="ax-empty"><b>all clear.</b>nothing is rotting. the pile keeps for whenever.</div>'
        : '<div class="ax-empty"><b>nothing here yet.</b>send something on the left and watch where it lands.</div>';
    } else {
      pile.innerHTML = ordered().map(itemHTML).join('');
    }
    sub.textContent = items.length ? `${items.length} waiting · tap one` : 'newest first';
    if (land) pile.scrollTop = 0;
  }
  pile.addEventListener('click', (e) => {
    const row = e.target.closest('.ax-item');
    if (row) openSheet(row.dataset.id);
  });
  pile.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const row = e.target.closest('.ax-item');
    if (!row) return;
    e.preventDefault();
    openSheet(row.dataset.id);
  });

  // -------------------------------------------------------------- the sheet
  function openSheet(id) {
    const it = byId(id);
    if (!it) return;
    openId = id;
    paintSheet(false);
    sheet.classList.add('on'); scrim.classList.add('on');
    sheet.setAttribute('aria-hidden', 'false');
    audio.sfx('open');
    t.after(() => sheet.querySelector('.ax-shut')?.focus({ preventScroll: true }), 60);
  }
  function closeSheet() {
    if (!openId) return;
    openId = null;
    sheet.classList.remove('on'); scrim.classList.remove('on');
    sheet.setAttribute('aria-hidden', 'true');
    audio.sfx('shut');
  }
  function paintSheet(snoozing) {
    const it = byId(openId);
    if (!it) return;
    sheet.style.setProperty('--c', `var(--t-${it.y})`);
    sbody.innerHTML = `
      <div class="ax-shead"><span class="ax-dot"></span><span class="ax-label">${esc(it.y)}</span>
        <button class="ax-shut" type="button" data-shut aria-label="close">×</button></div>
      <h2>${esc(it.t)}</h2>
      <div class="ax-fld"><span class="ax-label">what kind of thing</span>
        <div class="ax-chips">${TYPES.map((y) => `<button type="button" class="ax-chip" data-type="${y}" aria-pressed="${y === it.y}" style="--c:var(--t-${y})"><i></i>${y}</button>`).join('')}</div>
      </div>
      <div class="ax-facts">
        <div><span class="ax-label">from</span><b>${esc(it.src)}</b></div>
        <div><span class="ax-label">when</span><b>${esc(it.m && it.m !== 'no date' ? it.m : 'no date')}</b></div>
        <div><span class="ax-label">landed</span><b>${esc(it.at)}</b></div>
      </div>`;
    if (snoozing) {
      bar.className = 'ax-bar snoozing';
      bar.innerHTML = `<div class="ax-snoozehead"><span class="ax-label">when should it come back?</span><button class="ax-cancel" type="button" data-cancel>cancel</button></div>
        <div class="ax-presets">${presets().slice(0, 4).map((p) => `<button type="button" data-when="${esc(p.k)}"><b>${esc(p.k)}</b><em>${esc(hint(p.at))}</em></button>`).join('')}</div>`;
    } else {
      bar.className = 'ax-bar';
      bar.innerHTML = '<button type="button" data-act="dropped">drop</button><button type="button" data-act="later">later</button><button type="button" class="pri" data-act="done">done</button>';
    }
  }
  scrim.addEventListener('click', closeSheet);
  sheet.addEventListener('click', (e) => {
    if (e.target.closest('[data-shut]')) { closeSheet(); return; }
    const ty = e.target.closest('[data-type]');
    if (ty) {
      const it = byId(openId);
      it.y = ty.dataset.type;
      audio.sfx('tick');
      paintSheet(false);
      render(false);
      return;
    }
    if (e.target.closest('[data-cancel]')) { paintSheet(false); audio.sfx('shut'); return; }
    const w = e.target.closest('[data-when]');
    if (w) { move(openId, 'snoozed', `back ${w.dataset.when}`); return; }
    const a = e.target.closest('[data-act]');
    if (!a) return;
    if (a.dataset.act === 'later') { paintSheet(true); audio.sfx('open'); return; }
    move(openId, a.dataset.act);
  });
  sheet.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.stopPropagation(); closeSheet(); } });

  // A status move from the sheet: the sheet closes first, then the row sweeps
  // (the app delays it 240ms so it isn't played behind the sheet).
  function move(id, kind, label) {
    const it = byId(id);
    if (!it || it.moving) return;
    it.moving = true;
    closeSheet();
    const row = pile.querySelector(`[data-id="${id}"]`);
    let m = null;
    if (kind === 'done') {
      m = moments.clear(it);
      audio.clear(m.tier);
      t.after(() => say(m.line), 240);
    }
    const hold = fireWash(root, row, { kind, delay: 240, label, reduce });
    if (!hold && kind === 'done' && row) {
      const c = centreOf(root, row);
      fireSeal(root, { x: c.x, y: c.y, tier: m.tier, reduce });
    } else if (!hold && label) say(label + '.');
    t.after(() => {
      items = items.filter((x) => x.id !== id);
      render(false);
      landed++;
    }, hold || 260);
  }

  render(false);
  // The first example plays by itself, so nobody meets an empty pile.
  t.after(() => { if (!used && !busy) typeIn(EXAMPLES[0], true); }, reduce ? 50 : 700);

  return {
    destroy() { t.clear(); root.innerHTML = ''; },
  };
}
