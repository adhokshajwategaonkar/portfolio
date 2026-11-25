// Small live pieces: the Animus instrument on the index, and the gallery pieces built
// for this site from the real components (Capturing.jsx, HoldToDelete.jsx, the capture
// doors in CLAUDE.md, Shastra's datefield.js). Each mount(root) returns { destroy }.

import { sfx } from './sound.js';
import { read, SIGNS, NAK } from './astro.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = ms => new Promise(r => setTimeout(r, ms));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------------------------------------------------------- Animus: the pile, and one message at a time
   The home tile. The pile is real enough to use: tap an item and it is done, with the
   app's own lime sweep. A message is already written in the box, so the one thing to
   do is press Send; it is sorted a piece at a time, slowly enough to watch, and the
   next example writes itself in. Clear the box to type your own. */
const SAMPLES = [
  [['renew passport before march', 'Renew passport before March', 'reminder'], ['call mom on sunday', 'Call Mom on Sunday', 'task'], ['buy oat milk', 'Buy oat milk', 'task']],
  [['idea: weekly review every friday', 'Weekly review every Friday', 'idea'], ['book the dentist', 'Book the dentist', 'task']],
  [['pay the electricity bill', 'Pay the electricity bill', 'task'], ['read that sleep debt piece', 'The sleep debt piece', 'link']],
  [['reply to the landlord about the lease', 'Reply to the landlord about the lease', 'task'], ['try that ramen place', 'Try that ramen place', 'idea']],
];
const JOIN = [', ', ', and ', ', also '];
const CHECK = '<svg viewBox="0 0 16 16" aria-hidden="true"><path pathLength="1" d="M3 8.4l3.2 3.4L13 4.5"/></svg>';
export function mountSplit(root) {
  root.classList.add('am');
  root.innerHTML = `
    <div class="am-top"><span class="am-live"><i></i>the pile · tap an item when it’s done</span></div>
    <div class="am-in"><div><div class="bub"><span class="btx"></span><small>whatsapp</small></div><p class="am-say" aria-live="polite"></p></div></div>
    <ol class="am-list"></ol>
    <p class="am-clear" hidden><span>${CHECK}</span>Pile clear. Nothing left to do.</p>
    <form class="am-comp" autocomplete="off">
      <div class="am-box"><input class="am-input" type="text" enterkeyhint="send" maxlength="140" placeholder="Type a few things in one message" aria-label="A message to Animus"><button type="button" class="am-next" aria-label="Another example" title="Another example"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8a5 5 0 1 1-1.6-3.7M13 2.5v3h-3"/></svg></button><button class="am-send" type="submit" disabled>Send <span aria-hidden="true">↑</span></button></div>
    </form>`;
  const $ = s => root.querySelector(s);
  const inb = $('.am-in'), btx = $('.btx'), say = $('.am-say'), list = $('.am-list'), clear = $('.am-clear'), input = $('.am-input'), sendB = $('.am-send'), nextB = $('.am-next'), form = $('.am-comp');
  let alive = true, busy = false, si = 0, parts = null, typing = 0;
  const item = (title, type, fresh) => {
    const li = document.createElement('li'); li.className = 'it' + (fresh ? ' new' : '');
    li.innerHTML = `<button class="it-b" type="button" aria-label="Mark done: ${esc(title)}"><span class="dot">${CHECK}</span><span class="tt">${esc(title)}</span><span class="ty">${type}</span></button><span class="it-w" aria-hidden="true"><span class="tt">${esc(title)}</span>${CHECK}</span>`;
    return li;
  };
  [...SAMPLES[3], ...SAMPLES[1], ...SAMPLES[2]].forEach(([, t, y]) => list.append(item(t, y)));
  const tidy = byHand => {
    const empty = list.children.length === 0;
    if (empty && clear.hidden && byHand) { sfx.latch(); root.classList.remove('cleared'); void root.offsetWidth; root.classList.add('cleared'); }
    clear.hidden = !empty;
  };

  // done: the sweep, the tick, then the row leaves and the pile closes up
  list.addEventListener('click', async e => {
    const li = e.target.closest('.it'); if (!li || li.classList.contains('done')) return;
    li.classList.add('done'); sfx.ok(); root.dispatchEvent(new CustomEvent('played', { bubbles: true }));
    if (!reduce) { await wait(760); li.style.height = li.offsetHeight + 'px'; void li.offsetHeight; li.classList.add('gone'); await wait(380); }
    li.remove(); tidy(true);
  });

  const ready = () => { sendB.disabled = busy || !input.value.trim(); form.classList.toggle('ready', !sendB.disabled); };
  input.addEventListener('input', () => { typing++; parts = null; ready(); });
  // write the next example into the box
  async function write() {
    if (busy || !alive) return;
    const s = SAMPLES[si++ % SAMPLES.length], text = s.map((p, i) => p[0] + (i < s.length - 1 ? JOIN[i % JOIN.length] : '')).join('');
    const mine = ++typing;
    if (reduce) input.value = text;
    else for (let i = 1; i <= text.length; i++) { if (!alive || mine !== typing) return; input.value = text.slice(0, i); input.scrollLeft = 1e4; await wait(16); }
    input.scrollLeft = 0; parts = s; ready();
  }
  nextB.addEventListener('click', () => { sfx.tick(1); write(); });
  const first = new IntersectionObserver(es => { if (es[0].isIntersecting) { first.disconnect(); setTimeout(write, reduce ? 0 : 500); } }, { threshold: 0.4 });
  first.observe(root);
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const text = input.value.trim(); if (!text || busy) return;
    busy = true; typing++;
    let segs = parts;
    if (!segs) {
      // your own words go through the same rules the demo on the Animus site uses
      try { const { parse } = await import('./exhibits/animus/lib/sorter.js'); segs = parse(text).map(o => { const t = o.t.replace(/[\s,;.]+$/, ''); return [null, t.charAt(0).toUpperCase() + t.slice(1), o.y]; }); } catch (err) { segs = [[null, text, 'task']]; }
    }
    input.value = ''; parts = null; input.blur(); ready(); sfx.down();
    btx.innerHTML = segs[0][0] == null ? esc(text) : segs.map((p, i) => `<span class="seg">${esc(p[0])}</span>${i < segs.length - 1 ? JOIN[i % JOIN.length] : ''}`).join('');
    say.textContent = 'sorting…'; say.className = 'am-say busy';
    inb.classList.add('open');
    await wait(reduce ? 0 : 1100);
    const spans = [...btx.querySelectorAll('.seg')];
    for (let i = 0; i < segs.length; i++) {
      if (!alive) return;
      spans[i] && spans[i].classList.add('lit');
      await wait(reduce ? 0 : 420);
      const li = item(segs[i][1], segs[i][2], true); list.prepend(li); tidy(); sfx.tick(0.9 + i * 0.12);
      while (list.children.length > 7) list.lastElementChild.remove();
      await wait(reduce ? 0 : 520);
      spans[i] && spans[i].classList.replace('lit', 'used');
    }
    say.className = 'am-say'; say.textContent = segs.length > 1 ? `sorted into ${segs.length}. nothing for you to file.` : 'saved. it’s on the pile.';
    await wait(reduce ? 600 : 1700);
    inb.classList.remove('open'); await wait(reduce ? 0 : 420);
    list.querySelectorAll('.new').forEach(x => x.classList.remove('new'));
    busy = false; ready();
    if (!input.value && document.activeElement !== input) write();
  });
  return { destroy() { alive = false; first.disconnect(); } };
}

/* ---------------------------------------------------------- Animus: four doors, one pile */
// Each way in sends its own kind of thing, the way people actually use it, and each
// press moves on to the next example so the pile never repeats itself.
const DOORS = [
  { k: 'whatsapp', label: 'WhatsApp', note: 'message the animus number', msgs: [
    { t: 'call the bank before friday, buy stamps', items: [['Call the bank before Friday', 'reminder'], ['Buy stamps', 'task']] },
    { t: 'idea: a monthly reset sunday. also pay the electricity bill', items: [['A monthly reset Sunday', 'idea'], ['Pay the electricity bill', 'task']] },
    { t: 'remind me to water the plants tomorrow morning', items: [['Water the plants', 'reminder']] },
  ] },
  { k: 'app', label: 'The app', note: 'the + button, one box', msgs: [
    { t: 'book the dentist, ask about the night guard', items: [['Book the dentist', 'task'], ['Ask about the night guard', 'task']] },
    { t: 'start running again, three times a week', items: [['Start running again', 'goal']] },
    { t: 'send priya the photos from goa and renew the passport before march', items: [['Send Priya the photos from Goa', 'task'], ['Renew the passport before March', 'reminder']] },
  ] },
  { k: 'share', label: 'Share sheet', note: 'android, share from any app', msgs: [
    { t: 'Why sleep debt adds up', url: 'example.com/sleep-debt', items: [['Why sleep debt adds up', 'link']] },
    { t: 'One-pot rajma in 30 minutes', url: 'youtube.com/watch', items: [['One-pot rajma in 30 minutes', 'link']] },
    { t: 'A shelf for a narrow hallway', url: 'pinterest.com/pin', items: [['A shelf for a narrow hallway', 'link']] },
  ] },
  { k: 'siri', label: 'iPhone Shortcut', note: 'share sheet or “add to animus” to siri', msgs: [
    { t: 'look at flights for march', items: [['Look at flights for March', 'task']] },
    { t: 'cancel the gym trial before it charges, and call mum back', items: [['Cancel the gym trial', 'reminder'], ['Call Mum back', 'task']] },
    { t: 'the podcast about attention', items: [['The podcast about attention', 'link']] },
  ] },
];
const waReply = it => it.length > 1 ? `✅ saved ${it.length} things:<br><br>${it.map(([t, y]) => `• ${esc(t.toLowerCase())} <i>${y}</i>`).join('<br>')}` : `✅ saved as a ${it[0][1]}: ${esc(it[0][0].toLowerCase())}`;
const siriReply = it => it.length > 1 ? `saved ${it.length} things to animus` : `saved: ${esc(it[0][0].toLowerCase())}`;
export function mountDoors(root) {
  root.classList.add('pc', 'pc-animus', 'doors');
  root.innerHTML = `
    <div class="dr-doors" role="tablist" aria-label="Ways in">${DOORS.map((d, i) => `<button role="tab" class="dr-door${i ? '' : ' on'}" data-i="${i}" aria-selected="${!i}"><b>${d.label}</b><span>${d.note}</span></button>`).join('')}</div>
    <div class="dr-stage">
      <div class="dr-phone"><div class="dr-screen"></div></div>
      <div class="dr-pipe"><i></i><span>one sorter</span></div>
      <div class="dr-pile"><p class="dr-h">the pile</p><ol></ol></div>
    </div>
    <div class="dr-foot"><button class="pc-btn"></button></div>`;
  const screen = root.querySelector('.dr-screen'), pile = root.querySelector('ol'), pipe = root.querySelector('.dr-pipe'), btn = root.querySelector('.pc-btn');
  const doors = [...root.querySelectorAll('.dr-door')];
  const at = DOORS.map(() => 0);
  let cur = 0, busy = false, alive = true;
  const now = () => { const d = DOORS[cur]; return d.msgs[at[cur] % d.msgs.length]; };
  function draw() {
    const d = DOORS[cur], m = now(), msg = esc(m.t);
    const views = {
      whatsapp: `<div class="dr-wa"><div class="dr-wa-h"><i></i>animus</div><div class="dr-msg me">${msg}</div><div class="dr-msg them" hidden>${waReply(m.items)}</div></div>`,
      app: `<div class="dr-app"><div class="dr-app-box">${msg}<span class="dr-add">add</span></div><div class="dr-app-row" hidden><span class="sweep"></span>${msg}<small>sorting…</small></div></div>`,
      share: `<div class="dr-share"><div class="dr-page"><span class="dr-url">${esc(m.url || '')}</span><b>${msg}</b><i></i><i></i><i></i></div><div class="dr-sheet"><p>share link to</p><div class="dr-apps"><span>messages</span><span>gmail</span><span class="on">animus</span><span>drive</span></div></div></div>`,
      siri: `<div class="dr-siri"><div class="dr-orb"></div><p>“add to animus: ${msg}”</p><div class="dr-banner" hidden><b>add to animus</b>${siriReply(m.items)}</div></div>`,
    };
    screen.innerHTML = views[d.k];
    btn.textContent = d.k === 'share' ? 'Share to Animus' : d.k === 'siri' ? 'Say it' : d.k === 'app' ? 'Add' : 'Send';
  }
  async function send() {
    if (busy) return; busy = true;
    const d = DOORS[cur], m = now(); sfx.down();
    screen.classList.add('go'); await wait(reduce ? 0 : 420); sfx.up();
    const row = screen.querySelector('.dr-app-row'); if (row) { screen.querySelector('.dr-app-box').hidden = true; row.hidden = false; }
    pipe.classList.remove('run'); pipe.offsetWidth; pipe.classList.add('run');
    await wait(reduce ? 0 : 700);
    if (!alive) return;
    pile.querySelectorAll('li').forEach(li => li.classList.add('old'));
    for (const [t, y] of [...m.items].reverse()) {
      const li = document.createElement('li'); li.className = 'new';
      li.innerHTML = `<span class="dot"></span><span class="tt">${esc(t)}</span><span class="ty">${y}</span><span class="src">${d.label.toLowerCase()}</span>`;
      pile.prepend(li); sfx.tick(0.9); await wait(reduce ? 0 : 150);
    }
    while (pile.children.length > 6) pile.lastElementChild.remove();
    const reply = screen.querySelector('.dr-msg.them, .dr-banner'); if (reply) { reply.hidden = false; sfx.tick(1.4); }
    if (row) row.hidden = true;
    screen.classList.remove('go');
    await wait(reduce ? 0 : 1400);
    if (!alive) return;
    at[cur]++; draw(); busy = false;
  }
  doors.forEach(b => b.addEventListener('click', () => {
    if (busy) return;
    cur = Number(b.dataset.i); doors.forEach((x, i) => { x.classList.toggle('on', i === cur); x.setAttribute('aria-selected', i === cur); });
    sfx.detent(); draw();
  }));
  btn.addEventListener('click', send);
  draw();
  return { destroy() { alive = false; } };
}

/* ---------------------------------------------------------- Animus: capturing in the background */
export function mountCapturing(root) {
  root.classList.add('pc', 'pc-animus', 'capt');
  root.innerHTML = `
    <div class="cp-phone">
      <div class="cp-head"><b>your pile</b><span>newest first</span></div>
      <ol class="cp-list">
        <li><span class="dot"></span><span class="tt">Book the dentist</span><span class="ty">task</span></li>
        <li><span class="dot"></span><span class="tt">Weekly review every Friday</span><span class="ty">idea</span></li>
        <li><span class="dot"></span><span class="tt">Pay the electricity bill</span><span class="ty">task</span></li>
      </ol>
      <div class="cp-sheet" hidden>
        <textarea rows="3" aria-label="type or paste anything">renew the passport before march and send priya the photos from goa</textarea>
        <div class="cp-row"><button class="cp-x" aria-label="close">×</button><button class="cp-add">add</button></div>
      </div>
      <button class="cp-plus" aria-label="add">+</button>
    </div>
    <div class="cp-ctl">
      <p class="cp-say">Press + and add. The box closes at once.</p>
    </div>`;
  const $ = s => root.querySelector(s);
  const sheet = $('.cp-sheet'), list = $('.cp-list'), plus = $('.cp-plus'), ta = $('textarea'), say = $('.cp-say');
  let alive = true;
  const SAMPLES = ['renew the passport before march and send priya the photos from goa', 'call the plumber about the leak, and that podcast about sleep', 'buy a birthday card for amma, fix the bike light'];
  let si = 0;
  plus.addEventListener('click', () => { sheet.hidden = false; ta.value = SAMPLES[si++ % SAMPLES.length]; ta.focus(); say.textContent = 'Edit it if you like, then add.'; });
  $('.cp-x').addEventListener('click', () => { sheet.hidden = true; });
  ta.addEventListener('input', () => $('.cp-add').classList.toggle('ready', !!ta.value.trim()));
  ta.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); add(); } });
  $('.cp-add').addEventListener('click', add);
  async function add() {
    const words = ta.value.trim(); if (!words) return;
    sheet.hidden = true; sfx.down(); setTimeout(sfx.up, 50);
    say.textContent = 'Your words wait on top while the model sorts them.';
    const li = document.createElement('li'); li.className = 'pending';
    li.innerHTML = `<span class="sweep"></span><span class="pd"></span><span class="tt">${esc(words)}</span><small>sorting…</small>`;
    list.prepend(li);
    await wait(reduce ? 400 : 1900);
    if (!alive) return;
    const parts = words.split(/,| and | also /i).map(s => s.trim()).filter(Boolean).slice(0, 3);
    li.remove();
    for (const p of parts.reverse()) {
      const n = document.createElement('li'); n.className = 'new';
      n.innerHTML = `<span class="dot"></span><span class="tt">${esc(p[0].toUpperCase() + p.slice(1))}</span><span class="ty">${/podcast|photos|piece|article/.test(p) ? 'link' : 'task'}</span>`;
      list.prepend(n); sfx.tick(0.9); await wait(130);
    }
    while (list.children.length > 6) list.lastElementChild.remove();
    say.textContent = 'Sorted, while you were already doing something else.';
  }
  return { destroy() { alive = false; } };
}

/* ---------------------------------------------------------- Animus: hold to delete */
const TRASH = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 4h11"/><path d="M5.5 4V2.8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V4"/><path d="M4 4.2l.7 8.2a1 1 0 0 0 1 .92h4.6a1 1 0 0 0 1-.92L12 4.2"/><path d="M6.7 6.8v3.6M9.3 6.8v3.6"/></svg>';
export function mountHold(root) {
  root.classList.add('pc', 'pc-animus', 'hold');
  const ITEMS = ['That article about sleep debt', 'Old wifi password', 'Try the ramen place on 12th main'];
  root.innerHTML = `
    <div class="hd-card"><p class="hd-k">dropped · 3 days ago</p><p class="hd-t"></p>
      <div class="hd-row"><span class="hd-note">dropped things stay here until you delete them</span>
      <button class="hd-btn" aria-label="delete, press and hold"><span class="fill"></span><span class="bin">${TRASH}</span><span class="lb">delete</span></button></div></div>
    <p class="hd-say">Press and hold. Let go halfway and nothing happens.</p>`;
  const btn = root.querySelector('.hd-btn'), fill = btn.querySelector('.fill'), lb = btn.querySelector('.lb'), card = root.querySelector('.hd-card'), title = root.querySelector('.hd-t'), say = root.querySelector('.hd-say');
  let i = 0, t0 = 0, raf = 0, holding = false, ticked = false, alive = true;
  const DUR = 800;
  const buzz = p => { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} };
  title.textContent = ITEMS[0];
  function frame() {
    const k = Math.min(1, (performance.now() - t0) / DUR);
    fill.style.transform = `scaleX(${k})`;
    if (k > 0.6 && !ticked) { ticked = true; buzz(10); sfx.tick(0.8); }
    if (k >= 1) return commit();
    raf = requestAnimationFrame(frame);
  }
  function begin(e) { if (e && e.button) return; if (holding) return; holding = true; ticked = false; t0 = performance.now(); btn.classList.add('holding'); lb.textContent = 'hold…'; buzz(12); sfx.down(); raf = requestAnimationFrame(frame); }
  function cancel() {
    if (!holding) return; holding = false; cancelAnimationFrame(raf); btn.classList.remove('holding'); lb.textContent = 'delete';
    fill.style.transition = 'transform .16s ease-out'; fill.style.transform = 'scaleX(0)'; setTimeout(() => fill.style.transition = '', 170);
    sfx.up(); say.textContent = 'You let go, so it’s still here.';
  }
  async function commit() {
    holding = false; btn.classList.remove('holding'); buzz([0, 45, 30, 70]); sfx.down();
    card.classList.add('gone'); say.innerHTML = 'Deleted for good. <button class="hd-again" type="button">Bring it back</button>';
    say.querySelector('.hd-again').addEventListener('click', restore);
  }
  function restore() {
    fill.style.transform = 'scaleX(0)'; lb.textContent = 'delete';
    card.classList.remove('gone'); say.textContent = 'Press and hold. Let go early and nothing happens.';
  }
  btn.addEventListener('pointerdown', begin);
  ['pointerup', 'pointerleave', 'pointercancel', 'blur'].forEach(ev => btn.addEventListener(ev, cancel));
  btn.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) { e.preventDefault(); e.stopPropagation(); begin(); } });
  btn.addEventListener('keyup', e => { if (e.key === 'Enter' || e.key === ' ') cancel(); });
  btn.addEventListener('contextmenu', e => e.preventDefault());
  return { destroy() { alive = false; cancelAnimationFrame(raf); } };
}

/* ---------------------------------------------------------- Shastra: a date you type */
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
export function mountDate(root) {
  root.classList.add('pc', 'pc-shastra', 'dt');
  root.innerHTML = `
    <div class="dt-card">
      <p class="dt-k">date of birth</p>
      <div class="dt-field"><input data-i="0" inputmode="numeric" maxlength="2" placeholder="dd" aria-label="day"><span>/</span><input data-i="1" maxlength="3" placeholder="mm" aria-label="month, a number or a word"><span>/</span><input data-i="2" inputmode="numeric" maxlength="4" placeholder="yyyy" aria-label="year"></div>
      <p class="dt-echo" aria-live="polite">type a day, a month and a year</p>
      <div class="dt-out" hidden>
        <div><span class="k">moon</span><b class="v" data-o="m"></b></div>
        <div><span class="k">nakshatra</span><b class="v" data-o="n"></b></div>
        <div><span class="k">sun</span><b class="v" data-o="s"></b></div>
      </div>
      <p class="dt-small">computed in your browser at noon in India. the real tool asks for the time and place too.</p>
    </div>
    <div class="dt-vs"><p class="dt-k">a date picker, for comparison</p><div class="dt-picker"><span>‹</span><b>november 2026</b><span>›</span></div><p class="dt-taps">born in 1991: <b>420</b> taps on ‹</p></div>`;
  const ins = [...root.querySelectorAll('input')], echo = root.querySelector('.dt-echo'), out = root.querySelector('.dt-out');
  const O = {}; root.querySelectorAll('[data-o]').forEach(e => O[e.dataset.o] = e);
  const LEN = [2, 2, 4];
  function check() {
    const d = Number(ins[0].value), m = Number(ins[1].value), y = Number(ins[2].value);
    const ok = d >= 1 && m >= 1 && m <= 12 && ins[2].value.length === 4 && y >= 1900 && y <= 2026 && d <= new Date(y, m, 0).getDate();
    if (!ok) { out.hidden = true; echo.textContent = ins[2].value.length === 4 ? 'that date doesn’t exist yet, or never did' : 'type a day, a month and a year'; if (!ins.some(i => i.value)) echo.textContent = 'type a day, a month and a year'; return; }
    const when = new Date(Date.UTC(y, m - 1, d, 6, 30));
    echo.textContent = when.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).toLowerCase();
    const r = read(when);
    O.m.textContent = SIGNS[r.ms]; O.n.textContent = NAK[r.nk]; O.s.textContent = SIGNS[r.ss];
    if (out.hidden) { out.hidden = false; sfx.detent(); }
  }
  ins.forEach((p, i) => {
    p.addEventListener('input', () => {
      if (i === 1 && /[a-z]/i.test(p.value)) {
        const k = MONTHS.indexOf(p.value.slice(0, 3).toLowerCase());
        if (p.value.length >= 3) p.value = k > -1 ? String(k + 1).padStart(2, '0') : '';
      } else p.value = p.value.replace(/\D/g, '');
      if (p.value.length >= LEN[i] && ins[i + 1]) ins[i + 1].focus();
      check();
    });
    p.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'Backspace' && !p.value && i > 0) { e.preventDefault(); ins[i - 1].focus(); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const lo = [1, 1, 1900][i], hi = [31, 12, 2026][i], st = [1, 1, 1990][i];
        let v = Number(p.value || st) + (e.key === 'ArrowUp' ? 1 : -1);
        if (v > hi) v = lo; if (v < lo) v = hi;
        p.value = String(v).padStart(LEN[i], '0'); check();
      }
    });
    p.addEventListener('blur', () => { if (LEN[i] === 2 && p.value.length === 1) p.value = '0' + p.value; check(); });
  });
  return { destroy() {} };
}

export const OWN = { doors: mountDoors, capturing: mountCapturing, hold: mountHold, date: mountDate };
