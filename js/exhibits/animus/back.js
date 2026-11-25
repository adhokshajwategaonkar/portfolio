// back: it comes back when it matters.
// The marketing site's #back section: a lock screen, ONE item close to its time, done
// and later on the notification itself. Later opens snooze presets in place. Nothing
// here opens the app, which is the claim. It fires itself once, so the button below
// is a replay rather than a guess.

import { esc, loadFonts, clock, html, timeNow } from './lib/util.js';
import { makeAudio } from './lib/audio.js';
import { presets, hint } from './lib/snooze.js';

const PINGS = [
  { t: 'call the bank', line: 'due today' },
  { t: 'book the dentist', line: 'you moved this once' },
  { t: 'pay the electricity bill', line: 'due tomorrow' },
  { t: 'renew the passport', line: 'waiting three weeks' },
];

export function mount(root, ctx) {
  loadFonts();
  const t = clock();
  const audio = makeAudio(ctx.sound);
  const reduce = !!ctx.reduce;

  root.innerHTML = `
  <div class="ax-backx">
    <div class="ax-phone" aria-label="a phone's lock screen">
      <div class="ax-screen">
        <div class="ax-sbar"><span data-time>9:41</span><span class="bars" aria-hidden="true"><i style="height:4px"></i><i style="height:6px"></i><i style="height:8px"></i><i style="height:10px"></i></span><span class="bat" aria-hidden="true"></span></div>
        <div class="ax-lockclock"><b data-clock>9:41</b><span data-date></span></div>
        <div class="ax-notes" data-notes></div>
        <p class="ax-waiting" data-waiting>all clear</p>
      </div>
    </div>
    <div class="ax-backside">
      <span class="ax-label">reminders</span>
      <h3>one thing, near its time.</h3>
      <p>mark it done or move it to later, right from the notification. no list, and no count of what’s left.</p>
      <div><button class="ax-ghost" type="button" data-ping>send another</button></div>
      <ul class="ax-log" data-log aria-live="polite"></ul>
    </div>
  </div>`;

  const $ = (s) => root.querySelector(s);
  const notes = $('[data-notes]'), waiting = $('[data-waiting]'), log = $('[data-log]');
  let n = 0;

  function stamp() {
    $('[data-clock]').textContent = timeNow();
    $('[data-time]').textContent = timeNow();
    $('[data-date]').textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' }).toLowerCase();
  }
  stamp();
  t.every(stamp, 20000);

  function note(line, colour) {
    const li = html(`<li style="--c:${colour}"><i></i><span>${esc(line)}</span></li>`);
    log.prepend(li);
    while (log.children.length > 3) log.lastChild.remove();
  }

  function deliver() {
    stamp();
    const p = PINGS[n % PINGS.length];
    n++;
    const card = html(`<div class="ax-note">
      <div class="who"><i></i>animus<em>now</em></div>
      <p><b>${esc(p.t)}</b> · ${esc(p.line)}</p>
      <div class="acts"><button type="button" data-a="done">done</button><button type="button" data-a="later">later</button></div>
    </div>`);
    card.dataset.title = p.t;
    notes.appendChild(card);
    // Never more than two on screen: nothing it learns makes it send MORE.
    while (notes.children.length > 2) notes.firstElementChild.remove();
    waiting.textContent = '';
    t.after(() => { card.classList.add('in'); audio.sfx('buzz'); }, reduce ? 0 : 30);
  }

  function settle(card, line, done) {
    card.classList.add('settled');
    card.querySelector('.acts')?.remove();
    card.querySelector('.ax-presets')?.remove();
    card.appendChild(html(`<div class="resolved${done ? ' done' : ''}">${esc(line)}</div>`));
    if (done) return; // a done item stays on screen, marked done
    t.after(() => {
      card.classList.add('out');
      t.after(() => {
        card.remove();
        if (!notes.children.length) waiting.textContent = 'all clear';
      }, 300);
    }, 1800);
  }

  notes.addEventListener('click', (e) => {
    const card = e.target.closest('.ax-note');
    if (!card) return;
    const title = card.dataset.title;
    const a = e.target.closest('[data-a]');
    if (a && a.dataset.a === 'done') {
      audio.clear('small');
      card.querySelector('p').classList.add('struck');
      settle(card, '✓ done', true);
      note(`${title} · done`, 'var(--accent)');
      return;
    }
    if (a && a.dataset.a === 'later') {
      card.querySelector('.acts').remove();
      card.appendChild(html(`<div class="ax-presets">${presets().slice(0, 4).map((s) => `<button type="button" data-when="${esc(s.k)}" data-hint="${esc(hint(s.at))}"><b>${esc(s.k)}</b><em>${esc(hint(s.at))}</em></button>`).join('')}</div>`));
      audio.sfx('open');
      return;
    }
    const w = e.target.closest('[data-when]');
    if (w) {
      settle(card, `back ${w.dataset.when}`);
      note(`${title} · back ${w.dataset.hint}`, 'var(--wash-snooze-ink)');
    }
  });
  $('[data-ping]').addEventListener('click', () => { audio.sfx('tap'); deliver(); });

  t.after(deliver, reduce ? 100 : 650);

  return { destroy() { t.clear(); root.innerHTML = ''; } };
}
