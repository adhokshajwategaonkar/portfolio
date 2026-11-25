// Exhibit: sade sati, dates not dread. POST /api/sade-sati returns Saturn's
// ingress dates for every episode of a life; this draws them as a technical
// drawing: three phases per episode, retrograde re-entries as overlaps, the
// smaller dhaiya on its own lane, and today as the one vermilion line.
// Dates only. No verdict, no severity, no remedy, same rule as the product.
import { h, s, bag, fmtDate } from './lib/dom.js';
import { prewarm } from './lib/api.js';
import { statusLine, waiter, runLive } from './lib/ui.js';
import { birthForm, SAMPLE_A, describeBirth } from './lib/birth.js';
import { bpDefs, drawOn } from './lib/bp.js';
import { SAMPLE_SADESATI } from './data/sample-sadesati.js';

const PHASE = {
  rising: { label: 'rising', note: 'saturn in the sign before your moon', cls: 't1' },
  peak: { label: 'peak', note: 'saturn in your moon sign', cls: 't2' },
  setting: { label: 'setting', note: 'saturn in the sign after your moon', cls: 't1' },
  fourth: { label: '4th', note: 'saturn fourth from your moon', cls: 'hx' },
  eighth: { label: '8th', note: 'saturn eighth from your moon', cls: 'hx' },
};
const yearOf = (iso) => { const d = new Date(iso); return d.getUTCFullYear() + (d - Date.UTC(d.getUTCFullYear(), 0, 1)) / (365.2425 * 864e5); };
const fd = (iso) => fmtDate(iso);
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

export function mount(root, ctx) {
  const api = ctx.api || 'https://shastra.onrender.com';
  const b = bag();
  root.classList.toggle('sx-reduce', !!ctx.reduce);

  const status = statusLine();
  const go = h('button', { type: 'button', class: 'sx-btn' }, 'find the dates');
  const form = birthForm({ api, sample: SAMPLE_A, signal: b.signal, onSubmit: () => compute() });
  form.el.classList.add('is-row');
  const stats = h('div', { class: 'sx-ss-stats' });
  const art = h('div', { class: 'sx-ss-art' });
  const read = h('p', { class: 'sx-ss-read', 'aria-live': 'polite' });
  const res = h('div', { class: 'sx-ss-res' }, stats, art, read);
  const wait = waiter(res, { onSkip: () => wait.skipFn && wait.skipFn() });
  const el = h('div', { class: 'sx sx-sadesati' }, h('div', { class: 'sx-kd-form' }, form.el, go), status.el, res);
  root.appendChild(el);

  let data = SAMPLE_SADESATI, born = SAMPLE_A.date, firstDraw = true, baseRead = '';

  function paintStats() {
    const st = data.sadeSati.status, m = data.moon;
    stats.textContent = '';
    const cell = (k, v, sub, mark) => stats.appendChild(h('div', { class: 'sx-ss-stat' }, h('p', { class: 'sx-lab' }, k), h('p', { class: 'sx-ss-v' + (mark ? ' is-mark' : '') }, v), h('p', { class: 'sx-ss-sub' }, sub)));
    cell('moon sign, the only input', `${m.sign}`, `${m.signSa} · ${m.nakshatra}, quarter ${m.pada}`);
    if (st.active) {
      cell('running now', st.phase + ' phase', st.episode ? 'began ' + fd(st.episode.start) : '', true);
      cell('ends', st.episode ? fd(st.episode.end) : '', '');
    } else {
      cell('last one ended', st.previousEndedOn ? fd(st.previousEndedOn) : 'none in range', st.previousEndedOn ? 'not running now' : '');
      cell('next one starts', st.nextStartsOn ? fd(st.nextStartsOn) : 'not within 35 years', st.nextStartsOn ? `in ${st.yearsUntilNext.toFixed(1)} years` : '', true);
    }
    baseRead = 'hover or tap a phase for its exact dates.' + (data.timeKnown ? '' : ' an unknown birth time does not change your moon sign much, so these dates still hold.');
    read.textContent = baseRead;
  }

  function draw() {
    const W = art.clientWidth, H = art.clientHeight;
    if (W < 50 || H < 50) return;
    art.textContent = '';
    const fs = parseFloat(getComputedStyle(el).fontSize);
    const kit = bpDefs();
    const svg = s('svg', { class: 'bp sx-ss-svg', width: W, height: H, viewBox: `0 0 ${W} ${H}`, style: kit.style, role: 'img', 'aria-label': 'sade sati timeline' });
    svg.appendChild(kit.defs);
    const ss = data.sadeSati, dh = ss.dhaiya;
    const nowY = yearOf(ss.now), bornY = yearOf(born + 'T00:00:00Z');
    const starts = [...ss.episodes, ...(dh?.episodes || [])].map((e) => yearOf(e.start));
    const y0 = Math.floor(Math.min(bornY, ...starts) / 5) * 5, y1 = Math.ceil(yearOf(ss.window.to) / 5) * 5;
    const L = fs * 5.6, R = W - fs * 0.6;
    const X = (y) => L + (y - y0) / (y1 - y0) * (R - L);
    const lab = fs * 0.72, num = fs * 0.7;
    const rowH = Math.max(fs * 1.05, Math.min(fs * 2.6, (H - fs * 7.4) / 4.6));
    const used = rowH * 4.6 + fs * 6.2;
    const top = fs * 2.3 + Math.max(0, (H - used) / 2);
    const rows = { rising: top, peak: top + rowH * 1.05, setting: top + rowH * 2.1, dhaiya: top + rowH * 3.5 };
    const axisY = rows.dhaiya + rowH + fs * 1.1;

    svg.appendChild(s('rect', { class: 'bp-field', x: 0, y: 0, width: W, height: H }));
    // lane labels and guides
    const lanes = [['rising', 'rising'], ['peak', 'peak'], ['setting', 'setting'], ['dhaiya', 'dhaiya']];
    lanes.forEach(([k, t]) => {
      svg.appendChild(s('text', { class: 'lab', x: 0, y: rows[k] + rowH / 2 + lab * 0.35, style: `font-size:${lab}px` }, t));
      svg.appendChild(s('line', { class: 'ln soft nodraw', x1: L, x2: R, y1: rows[k] + rowH, y2: rows[k] + rowH, style: 'opacity:.18' }));
    });
    // axis
    svg.appendChild(s('line', { class: 'ln', x1: L, x2: R, y1: axisY, y2: axisY }));
    for (let y = y0; y <= y1; y += 1) {
      const major = y % 10 === 0, mid = y % 5 === 0;
      svg.appendChild(s('line', { class: 'ln', x1: X(y), x2: X(y), y1: axisY, y2: axisY + (major ? fs * 0.7 : mid ? fs * 0.45 : fs * 0.22), style: major || mid ? '' : 'opacity:.5' }));
      if (major) svg.appendChild(s('text', { class: 'num', x: X(y), y: axisY + fs * 1.65, 'text-anchor': 'middle', style: `font-size:${num}px` }, String(y)));
    }
    svg.appendChild(s('text', { class: 'fig', x: 0, y: axisY + fs * 1.65, style: `font-size:${num}px` }, 'fig_04'));
    // birth
    svg.appendChild(s('line', { class: 'ln dot', x1: X(bornY), x2: X(bornY), y1: top - fs * 0.3, y2: axisY }));
    svg.appendChild(s('text', { class: 'num', x: X(bornY) + 4, y: axisY - fs * 0.35, style: `font-size:${num}px` }, 'born'));

    // episodes
    const parts = [];
    const bar = (ph, ep, kind) => {
      const k = kind === 'dhaiya' ? 'dhaiya' : ph.phase;
      const x = X(yearOf(ph.start)), x2 = X(yearOf(ph.end));
      const p = PHASE[ph.phase] || PHASE.peak;
      const g = s('g', { class: 'sx-ss-ph', tabindex: '0', role: 'button', 'data-k': kind },
        s('rect', { class: p.cls + ' sx-ss-bar', x, y: rows[k] + rowH * 0.12, width: Math.max(2, x2 - x), height: rowH * 0.76 }));
      g._info = { ph, ep, kind, p };
      parts.push(g);
      return g;
    };
    ss.episodes.forEach((ep) => {
      ep.phases.forEach((ph) => svg.appendChild(bar(ph, ep, 'sade')));
      const xs = X(yearOf(ep.start)), xe = X(yearOf(ep.end)), yb = top - fs * 0.25;
      svg.appendChild(s('path', { class: 'ln', d: `M${xs} ${yb + 5}V${yb}H${xe}V${yb + 5}` }));
      if (xe - xs > fs * 4.2) svg.appendChild(s('text', { class: 'num', x: (xs + xe) / 2, y: yb - fs * 0.35, 'text-anchor': 'middle', style: `font-size:${num}px` }, `${new Date(ep.start).getUTCFullYear()} to ${new Date(ep.end).getUTCFullYear()}`));
    });
    (dh?.episodes || []).forEach((ep) => ep.phases.forEach((ph) => svg.appendChild(bar(ph, ep, 'dhaiya'))));

    // today: the one vermilion line
    const xn = X(nowY);
    svg.appendChild(s('line', { class: 'mks', x1: xn, x2: xn, y1: top - fs * 1.3, y2: axisY + fs * 0.7 }));
    svg.appendChild(s('circle', { class: 'mkd', cx: xn, cy: axisY, r: 3 }));
    const nowLab = 'today, ' + fd(ss.now);
    const right = xn + fs * 9 < W;
    svg.appendChild(s('text', { class: 'lab mark', x: xn + (right ? 5 : -5), y: top - fs * 1.15, 'text-anchor': right ? 'start' : 'end', style: `font-size:${lab}px` }, nowLab));

    art.appendChild(svg);
    if (firstDraw) { drawOn(svg, { reduce: ctx.reduce, duration: 650, window: 600 }); firstDraw = false; }

    const say = (g) => {
      parts.forEach((p) => p.classList.toggle('is-lit', p === g));
      svg.classList.toggle('is-focus', !!g);
      if (!g) { read.textContent = baseRead; read.classList.remove('is-lit'); return; }
      const { ph, kind, p } = g._info;
      const re = ph.retrogradeReentries ? ` · saturn crossed back ${plural(ph.retrogradeReentries, 'time')} while moving backwards` : '';
      read.classList.add('is-lit');
      read.textContent = `${kind === 'dhaiya' ? 'dhaiya, ' : ''}${p.label}: ${fd(ph.start)} to ${fd(ph.end)} · ${ph.years.toFixed(2)} years · saturn in ${ph.sign}${re}`;
    };
    parts.forEach((g) => {
      g.addEventListener('pointerenter', () => { say(g); ctx.sound?.tick?.(); });
      g.addEventListener('pointerleave', () => say(null));
      g.addEventListener('focus', () => say(g));
      g.addEventListener('blur', () => say(null));
      g.addEventListener('click', () => say(g));
    });
  }

  let rq = 0;
  const ro = new ResizeObserver(() => { cancelAnimationFrame(rq); rq = requestAnimationFrame(draw); });
  ro.observe(art);
  b.add(() => { ro.disconnect(); cancelAnimationFrame(rq); });

  function paint(d, animate) {
    data = d;
    paintStats();
    if (animate) firstDraw = true;
    draw();
  }

  let busy = false;
  function compute() {
    if (busy) return;
    const body = form.read();
    if (!body) { status.set('fail', 'check the date, the time and the place'); return; }
    busy = true; go.setAttribute('aria-disabled', 'true'); go.textContent = 'scanning';
    ctx.sound?.select?.();
    const label = describeBirth(body);
    runLive({
      api, path: '/api/sade-sati', body, wait, status, bag: b, saved: SAMPLE_SADESATI,
      savedText: 'saved result, ' + describeBirth(SAMPLE_A),
      liveText: (j, ms) => `live · ${label} · ${ms < 1000 ? ms + ' ms' : (ms / 1000).toFixed(1) + ' s'}`,
      onData: (d, state) => {
        busy = false; go.removeAttribute('aria-disabled'); go.textContent = 'find the dates';
        if (b.dead) return;
        born = state === 'live' ? body.date : SAMPLE_A.date;
        paint(d, true);
        if (state === 'live') ctx.sound?.blip?.(1760, 0.08, 0.03);
      },
    });
  }
  b.on(go, 'click', compute);

  paint(SAMPLE_SADESATI, false);
  firstDraw = true;
  status.set('saved', 'saved result, ' + describeBirth(SAMPLE_A) + ' · press find to run it live');
  prewarm(api);
  return { destroy() { b.destroy(); wait.destroy(); el.remove(); } };
}
