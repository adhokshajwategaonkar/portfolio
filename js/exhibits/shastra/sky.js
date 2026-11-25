// Exhibit: the sky right now. The real rasi chakra from Shastra's landing
// page, drawn from a baked sky first and replaced by GET /api/transits.
import { h, bag, titleCase, ORD } from './lib/dom.js';
import { prewarm } from './lib/api.js';
import { statusLine, runLive } from './lib/ui.js';
import { skyWheel, ORDER, GLYPH, SA, drishtiOf } from './lib/sky-wheel.js';
import { SNAPSHOT } from './data/sky-snapshot.js';

const UJJAIN = { lat: 23.1765, lon: 75.7885 };

export function mount(root, ctx) {
  const api = ctx.api || 'https://shastra.onrender.com';
  const b = bag();
  root.classList.toggle('sx-reduce', !!ctx.reduce);

  const status = statusLine();
  const wheelHost = h('div', { class: 'sky-wheel' });
  const title = h('p', { class: 'sx-k-title' });
  const sub = h('p', { class: 'sx-k-sub' });
  const rows = h('dl', { class: 'sx-k-rows' });
  const panel = h('div', { class: 'sx-k' }, title, sub, rows);
  const list = h('ul', { class: 'sx-plist', role: 'list' });
  const legend = h('ul', { class: 'sx-legend-list', 'aria-label': 'key' },
    h('li', null, h('i', { class: 'lg lg-band' }), 'the twelve signs'),
    h('li', null, h('i', { class: 'lg lg-chord' }), 'looks at, 7th'),
    h('li', null, h('i', { class: 'lg lg-dash' }), 'mars, jupiter, saturn also'),
    h('li', null, h('i', { class: 'lg lg-hand' }), 'rising now, ujjain'));

  const el = h('div', { class: 'sx sx-sky' },
    h('div', { class: 'sx-sky-art' }, wheelHost),
    h('div', { class: 'sx-sky-side' },
      h('header', { class: 'sx-head' }, h('p', { class: 'sx-fig' }, 'fig_01 · the sky now'), status.el),
      panel, list, legend));
  root.appendChild(el);

  let pinned = null, interacted = false, isLive = false;
  const wheel = skyWheel(wheelHost, { uid: 'sky' + Math.random().toString(36).slice(2, 7), onFocus: describe });

  function describe(key, data, lit) {
    list.querySelectorAll('li').forEach((li) => li.classList.toggle('is-lit', li.dataset.graha === key));
    rows.textContent = '';
    if (!key || !data) {
      title.textContent = 'nine planets, where they are';
      sub.textContent = 'every position is computed by the swiss ephemeris, the planet data astronomers use. a line joins two planets when one looks at the other.';
      if (data) {
        const add = (k, v, mark) => rows.append(h('dt', null, k), h('dd', { class: mark ? 'is-mark' : '' }, v));
        if (data.lagna) add(isLive ? 'rising now' : 'rising, 5 nov', data.lagna.sign + ' ' + (data.lagna.degInSignStr || ''), true);
        if (data.panchanga) {
          add('moon\u2019s star', data.panchanga.nakshatra);
          add('lunar day', data.panchanga.tithi.name + ', ' + data.panchanga.tithi.paksha);
        }
        if (data.ayanamsa) add('ayanamsa', data.ayanamsa.toFixed(4) + '\u00b0 lahiri');
      }
      return;
    }
    const g = data.grahas[key];
    title.textContent = titleCase(key) + ' in ' + titleCase(g.sign);
    sub.textContent = SA[key] + (g.retrograde ? ' · moving backwards' : '');
    const targets = ORDER.filter((k) => k !== key && data.grahas[k] && drishtiOf(key).includes(((data.grahas[k].signIndex - g.signIndex + 12) % 12) + 1));
    const add = (k, v, mark) => rows.append(h('dt', null, k), h('dd', { class: mark ? 'is-mark' : '' }, v));
    add('position', g.degInSignStr || Math.floor(g.degInSign) + '°');
    add('birth star', g.nakshatra + (g.pada ? ', quarter ' + g.pada : ''));
    add('looks at', 'the ' + drishtiOf(key).map((x) => ORD[x]).join(', ') + ' sign from itself');
    add('lands on', targets.length ? targets.join(', ') : 'no planet right now', !!targets.length);
  }

  function buildList(data) {
    list.textContent = '';
    ORDER.forEach((k) => {
      const g = data.grahas[k]; if (!g) return;
      const li = h('li', { 'data-graha': k },
        h('button', { type: 'button', class: 'sx-prow', 'aria-label': `${k} in ${g.sign}` },
          h('span', { class: 'sx-pg' + (k === 'moon' ? ' is-moon' : '') }, GLYPH[k]),
          h('span', { class: 'sx-pn' }, k),
          h('span', { class: 'sx-ps' }, g.sign.slice(0, 3) + ' ' + Math.floor(g.degInSign) + '°' + (g.retrograde ? ' r' : ''))));
      list.appendChild(li);
    });
  }

  function focus(key, how) {
    if (key === wheel.focused) return;
    wheel.set(key);
    if (key && how !== 'demo') ctx.sound?.tick?.();
  }
  // hover on the wheel and the list
  b.on(el, 'pointerover', (e) => {
    const t = e.target.closest?.('.sw-graha, .sx-plist li');
    if (e.pointerType === 'touch') return;
    if (t) { interacted = true; focus(t.dataset.graha); }
  });
  b.on(el, 'pointerout', (e) => {
    if (e.pointerType === 'touch') return;
    const to = e.relatedTarget;
    if (!to || !to.closest || !to.closest('.sw-graha, .sx-plist li')) focus(pinned);
  });
  // a tap or click pins; a tap on empty space lets go
  b.on(el, 'click', (e) => {
    interacted = true;
    const t = e.target.closest?.('.sw-graha, .sx-plist li');
    const key = t ? t.dataset.graha : null;
    pinned = key && key !== pinned ? key : null;
    if (key) ctx.sound?.select?.();
    wheel.set(pinned || (t && e.pointerType !== 'touch' ? key : null));
  });
  b.on(el, 'focusin', (e) => { const t = e.target.closest?.('.sw-graha, .sx-plist li'); if (t) { interacted = true; focus(t.dataset.graha); } });
  b.on(el, 'keydown', (e) => {
    if (e.key === 'Escape') { pinned = null; wheel.set(null); }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.sw-graha')) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
  });

  // the entrance runs once; later repaints (the live sky, the minute refresh) just swap
  b.timeout(() => wheelHost.classList.add('sw-entered'), ctx.reduce ? 0 : 2600);
  // first paint: the saved sky, at reduced contrast
  wheel.paint(SNAPSHOT, 'wait');
  buildList(SNAPSHOT);
  describe(null, SNAPSHOT, 0);
  status.set('wait', 'saved sky, 5 nov 2026 · fetching the live one');

  let live = false, timer = 0, paused = false;
  function load(first) {
    runLive({
      api, path: `/api/transits?lat=${UJJAIN.lat}&lon=${UJJAIN.lon}`, bag: b, saved: null,
      status: first || !live ? status : null,
      savedText: 'saved sky, 5 nov 2026',
      liveText: (j) => 'live · computed ' + new Date(j.transits.at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }) + ' ist',
      onData: (j, state) => {
        if (b.dead) return;
        if (state === 'live' && j && j.transits && j.transits.grahas) {
          live = true; isLive = true;
          wheel.paint(j.transits, 'live');
          buildList(j.transits);
          if (!first) status.set('live', 'live · computed ' + new Date(j.transits.at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }) + ' ist');
          ctx.sound?.blip?.(1760, 0.08, 0.03);
        } else if (!live) {
          wheel.readout('stale');
        }
      },
    });
  }
  prewarm(api);
  load(true);
  const schedule = () => { clearInterval(timer); timer = setInterval(() => { if (!paused && !document.hidden) load(false); }, 60000); };
  schedule();
  b.add(() => clearInterval(timer));

  // show the hover once, on the moon, unless someone is already using it
  if (!ctx.reduce) b.timeout(() => {
    if (interacted || b.dead) return;
    wheelHost.querySelector('.sw-graha[data-graha="moon"]')?.classList.add('is-demo');
    focus('moon', 'demo');
    b.timeout(() => { wheelHost.querySelector('.sw-graha.is-demo')?.classList.remove('is-demo'); if (!interacted) focus(null, 'demo'); }, 1900);
  }, 2800);

  return {
    destroy() { b.destroy(); el.remove(); },
    pause() { paused = true; el.classList.add('is-paused'); },
    resume() { paused = false; el.classList.remove('is-paused'); if (!live) load(false); },
  };
}
