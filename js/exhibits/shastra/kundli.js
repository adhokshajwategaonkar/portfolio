// Exhibit: your chart, explained. A compact birth form calling POST /api/chart,
// the North Indian chart (D1 and D9), and the deterministic reading beside it,
// linked both ways: a planet in the chart and its paragraph are the same thing.
import { h, s, bag, emph, titleCase, ORD } from './lib/dom.js';
import { prewarm } from './lib/api.js';
import { statusLine, waiter, runLive } from './lib/ui.js';
import { birthForm, SAMPLE_A, describeBirth } from './lib/birth.js';
import { renderKundli } from './lib/kundli-chart.js';
import { SAMPLE_CHART } from './data/sample-chart.js';

const ORDER = ['lagna', 'sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'];

export function mount(root, ctx) {
  const api = ctx.api || 'https://shastra.onrender.com';
  const b = bag();
  root.classList.toggle('sx-reduce', !!ctx.reduce);

  const status = statusLine();
  const go = h('button', { type: 'button', class: 'sx-btn' }, 'compute live');
  const form = birthForm({ api, sample: SAMPLE_A, signal: b.signal, onSubmit: () => compute() });
  form.el.classList.add('is-row');

  const svg = s('svg', { viewBox: '0 0 320 320', class: 'kc', role: 'img', 'aria-label': 'North Indian birth chart' });
  const d1 = h('button', { type: 'button', 'aria-pressed': 'true' }, 'd1 birth');
  const d9 = h('button', { type: 'button', 'aria-pressed': 'false' }, 'd9 navamsa');
  const summary = h('p', { class: 'sx-kc-sum' });
  const headline = h('p', { class: 'sx-rd-head' });
  const blocks = h('div', { class: 'sx-rd-list' });
  const reading = h('div', { class: 'sx-rd', tabindex: '0', 'aria-label': 'the reading' }, headline, blocks);
  const results = h('div', { class: 'sx-kd-res' },
    h('div', { class: 'sx-kc-col' },
      h('div', { class: 'sx-kc-top' }, h('p', { class: 'sx-fig' }, 'fig_02 · the chart'), h('div', { class: 'sx-seg-toggle' }, d1, d9)),
      h('div', { class: 'sx-kc-art' }, svg),
      summary),
    reading);
  const wait = waiter(results, { reduce: ctx.reduce, onSkip: () => wait.skipFn && wait.skipFn() });

  const el = h('div', { class: 'sx sx-kundli' },
    h('div', { class: 'sx-kd-form' }, form.el, go),
    status.el,
    results);
  root.appendChild(el);

  let current = SAMPLE_CHART, navamsa = false;

  function draw() {
    renderKundli(svg, current.chart, { navamsa });
    d1.setAttribute('aria-pressed', String(!navamsa));
    d9.setAttribute('aria-pressed', String(navamsa));
  }

  function paint(data) {
    current = data;
    const { chart, interpretation: it } = data;
    draw();
    const g = chart.grahas;
    summary.textContent = `${chart.lagna.sign} rising · ${g.moon.sign} moon · ${g.moon.nakshatra}` + (chart.meta.precisionNote ? '' : ` · ayanamsa ${chart.meta.ayanamsa.toFixed(4)}°`);
    headline.textContent = it.headline;
    blocks.textContent = '';
    const byKey = {};
    [...(it.openers || []), ...(it.grahas || [])].forEach((o) => { byKey[o.key] = o; });
    for (const key of ORDER) {
      const o = byKey[key]; if (!o) continue;
      const name = key === 'lagna' ? 'Rising sign in ' + titleCase(o.sign) : titleCase(key) + ' in ' + titleCase(o.sign);
      const meta = [o.degree];
      if (o.house) meta.push(ORD[o.house] + ' house');
      if (o.bandLabel) meta.push(o.bandLabel);
      if (o.retrograde) meta.push('retrograde');
      const text = o.lead || o.bandSentence || '';
      blocks.appendChild(h('article', { class: 'sx-rd-b', 'data-graha': key, tabindex: '-1' },
        h('p', { class: 'sx-rd-plain' }, o.plain || o.title),
        h('h3', { class: 'sx-rd-name' }, name),
        h('p', { class: 'sx-rd-meta' }, meta.filter(Boolean).join(' · ')),
        h('p', { class: 'sx-rd-text', html: emph(text) })));
    }
    if (chart.meta.precisionNote) blocks.appendChild(h('p', { class: 'sx-rd-note' }, chart.meta.precisionNote));
    reading.scrollTop = 0;
  }

  // two-way linking
  let lit = null, pinned = null;
  function light(key, scroll) {
    if (key === lit && !scroll) return;
    lit = key;
    svg.querySelectorAll('.kc-graha').forEach((t) => t.classList.toggle('is-lit', t.dataset.graha === key));
    blocks.querySelectorAll('.sx-rd-b').forEach((bl) => bl.classList.toggle('is-lit', bl.dataset.graha === key));
    results.classList.toggle('is-linking', !!key);
    if (key && scroll) {
      const bl = blocks.querySelector(`.sx-rd-b[data-graha="${key}"]`);
      if (bl) reading.scrollTo({ top: bl.offsetTop - reading.offsetTop - 8, behavior: ctx.reduce ? 'auto' : 'smooth' });
    }
    if (key) ctx.sound?.tick?.();
  }
  b.on(svg, 'pointerover', (e) => { if (e.pointerType === 'touch') return; const t = e.target.closest('.kc-graha'); if (t) light(t.dataset.graha, true); });
  b.on(svg, 'pointerout', (e) => { if (e.pointerType === 'touch') return; if (!e.relatedTarget?.closest?.('.kc-graha')) light(pinned); });
  b.on(svg, 'click', (e) => { const t = e.target.closest('.kc-graha'); const k = t ? t.dataset.graha : null; pinned = k && k !== pinned ? k : null; light(pinned || k, !!k); if (k) ctx.sound?.select?.(); });
  b.on(svg, 'keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.kc-graha')) { e.preventDefault(); e.target.closest('.kc-graha').dispatchEvent(new MouseEvent('click', { bubbles: true })); } });
  b.on(svg, 'focusin', (e) => { const t = e.target.closest('.kc-graha'); if (t) light(t.dataset.graha, true); });
  b.on(blocks, 'pointerover', (e) => { if (e.pointerType === 'touch') return; const bl = e.target.closest('.sx-rd-b'); if (bl) light(bl.dataset.graha); });
  b.on(blocks, 'pointerleave', () => light(pinned));
  b.on(blocks, 'click', (e) => { const bl = e.target.closest('.sx-rd-b'); if (bl) { pinned = bl.dataset.graha; light(pinned); } });

  b.on(d1, 'click', () => { navamsa = false; draw(); light(lit); ctx.sound?.tick?.(); });
  b.on(d9, 'click', () => { navamsa = true; draw(); light(lit); ctx.sound?.tick?.(); });

  let busy = false;
  function compute() {
    if (busy) return;
    const body = form.read();
    if (!body) { status.set('fail', 'check the date, the time and the place'); return; }
    busy = true; go.setAttribute('aria-disabled', 'true'); go.textContent = 'computing';
    ctx.sound?.select?.();
    const label = describeBirth(body);
    runLive({
      api, path: '/api/chart', body, wait, status, bag: b, saved: SAMPLE_CHART,
      savedText: 'saved result, ' + describeBirth(SAMPLE_A),
      liveText: (j, ms) => `live · ${label} · ${ms < 1000 ? ms + ' ms' : (ms / 1000).toFixed(1) + ' s'}`,
      onData: (data, state) => {
        busy = false; go.removeAttribute('aria-disabled'); go.textContent = 'compute live';
        if (b.dead) return;
        pinned = null; lit = null;
        paint(data);
        if (state === 'live') ctx.sound?.blip?.(1760, 0.08, 0.03);
      },
    });
  }
  b.on(go, 'click', compute);

  paint(SAMPLE_CHART);
  status.set('saved', 'saved result, ' + describeBirth(SAMPLE_A) + ' · press compute to run it live');
  prewarm(api);

  return { destroy() { b.destroy(); wait.destroy(); el.remove(); } };
}
