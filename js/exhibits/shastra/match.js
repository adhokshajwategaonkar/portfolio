// Exhibit: kundli matching. Two births, POST /api/match, the 36-point guna
// milan as eight rows that fill in, and mangal dosha. Numbers only: the
// product never prints a verdict, so the API's own band is left unshown.
import { h, bag } from './lib/dom.js';
import { prewarm } from './lib/api.js';
import { statusLine, waiter, runLive } from './lib/ui.js';
import { birthForm, SAMPLE_A, SAMPLE_B } from './lib/birth.js';
import { SAMPLE_MATCH } from './data/sample-match.js';

// Names and glosses as /kundli-matching prints them.
const NAME = { varna: 'varna', vashya: 'vashya', tara: 'tara', yoni: 'yoni', grahaMaitri: 'graha maitri', gana: 'gana', bhakoot: 'bhakoot', nadi: 'nadi' };
const GLOSS = {
  varna: 'work and temperament', vashya: 'who holds more sway', tara: 'how your birth stars line up',
  yoni: 'physical and instinctive fit', grahaMaitri: 'whether your minds get on', gana: 'temperament: gentle, mixed or blunt',
  bhakoot: 'how your moon signs sit together', nadi: 'your physical constitution, worth the most points',
};
const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

export function mount(root, ctx) {
  const api = ctx.api || 'https://shastra.onrender.com';
  const b = bag();
  root.classList.toggle('sx-reduce', !!ctx.reduce);

  const status = statusLine();
  const fa = birthForm({ api, sample: SAMPLE_A, label: 'first chart', signal: b.signal, onSubmit: () => compute() });
  const fb = birthForm({ api, sample: SAMPLE_B, label: 'second chart', signal: b.signal, onSubmit: () => compute() });
  const go = h('button', { type: 'button', class: 'sx-btn' }, 'compare live');
  const total = h('b', { class: 'sx-m-total' }, '0');
  const rows = h('ol', { class: 'sx-m-rows' });
  const dosha = h('div', { class: 'sx-m-dosha' });
  const note = h('p', { class: 'sx-m-note' });
  const right = h('div', { class: 'sx-m-right' },
    h('div', { class: 'sx-m-score' },
      h('p', { class: 'sx-fig' }, 'fig_03 · guna milan'),
      h('p', { class: 'sx-m-big' }, total, h('span', { class: 'sx-m-of' }, ' / 36')),
      status.el),
    rows, dosha, note);
  const wait = waiter(right, { onSkip: () => wait.skipFn && wait.skipFn() });
  const el = h('div', { class: 'sx sx-match' },
    h('div', { class: 'sx-m-left' }, fa.el, fb.el, go,
      h('p', { class: 'sx-m-how' }, 'every score comes from the moon\u2019s birth star and sign in each chart, and nothing else. it is arithmetic on fixed tables, so the number is free and anyone can check it.')),
    right);
  root.appendChild(el);

  let raf = 0;
  function paint(data, animate) {
    const m = data.milan;
    rows.textContent = '';
    m.order.forEach((k, i) => {
      const kt = m.kootas[k];
      const cells = h('span', { class: 'sx-m-cells', 'aria-hidden': 'true' });
      for (let c = 0; c < kt.max; c += 1) {
        const fill = Math.max(0, Math.min(1, kt.score - c));
        cells.appendChild(h('i', { class: 'sx-m-cell' + (fill >= 1 ? ' is-full' : fill > 0 ? ' is-half' : '') + (k === 'nadi' ? ' is-nadi' : '') }));
      }
      const li = h('li', { class: 'sx-m-row' + (kt.score === 0 ? ' is-zero' : ''), style: { '--i': i } },
        h('span', { class: 'sx-m-name' }, NAME[k], h('small', null, GLOSS[k])),
        cells,
        h('span', { class: 'sx-m-pts' }, h('b', null, fmt(kt.score)), ' / ' + kt.max));
      rows.appendChild(li);
    });
    // mangal dosha, as found, with no grading added
    const md = m.doshas.mangal;
    const line = (who, x) => h('li', null,
      h('span', { class: 'sx-m-who' }, who),
      h('span', null, x.present ? 'present, counted from the ' + [x.fromLagna && 'rising sign', x.fromMoon && 'moon', x.fromVenus && 'venus'].filter(Boolean).join(', ') : 'not present',
        x.cancellations && x.cancellations.length ? h('span', { class: 'sx-m-ex' }, ' · ' + x.cancellations.join('; ')) : null));
    dosha.textContent = '';
    dosha.append(h('p', { class: 'sx-lab' }, 'mangal dosha'), h('ul', null, line('first', md.groom), line('second', md.bride)), md.framing ? h('p', { class: 'sx-m-framing' }, md.framing + '.') : null);
    note.textContent = m.honestNote || '';
    // the total counts up
    cancelAnimationFrame(raf);
    const to = m.total;
    if (!animate || ctx.reduce) { total.textContent = fmt(to); el.classList.remove('is-filling'); return; }
    el.classList.remove('is-filling'); void el.offsetWidth; el.classList.add('is-filling');
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - t0) / 1100), e = 1 - Math.pow(1 - t, 3);
      total.textContent = fmt(Math.round(to * e * 2) / 2);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    m.order.forEach((k, i) => b.timeout(() => ctx.sound?.blip?.(900 + i * 140, 0.05, 0.025), 120 + i * 90));
  }
  b.add(() => cancelAnimationFrame(raf));

  let busy = false;
  function compute() {
    if (busy) return;
    const a = fa.read(), bb = fb.read();
    if (!a || !bb) { status.set('fail', 'check both dates, times and places'); return; }
    busy = true; go.setAttribute('aria-disabled', 'true'); go.textContent = 'comparing';
    ctx.sound?.select?.();
    runLive({
      api, path: '/api/match', body: { a, b: bb }, wait, status, bag: b, saved: SAMPLE_MATCH,
      savedText: 'saved result for the two samples',
      liveText: (j, ms) => `live · computed in ${ms < 1000 ? ms + ' ms' : (ms / 1000).toFixed(1) + ' s'}`,
      onData: (data, state) => {
        busy = false; go.removeAttribute('aria-disabled'); go.textContent = 'compare live';
        if (!b.dead) paint(data, true);
      },
    });
  }
  b.on(go, 'click', compute);

  paint(SAMPLE_MATCH, false);
  status.set('saved', 'saved result for the two samples · press compare to run it live');
  prewarm(api);
  return { destroy() { b.destroy(); wait.destroy(); el.remove(); } };
}
