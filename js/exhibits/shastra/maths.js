// Exhibit: check the maths yourself. Shastra's Spica-at-180° drawing draws
// itself, and four assertions from Shastra/server/test/jyotish.test.js are
// re-run against the live engine through GET /api/transits.
import { h, s, bag } from './lib/dom.js';
import { prewarm, call, warmState } from './lib/api.js';
import { statusLine, waiter } from './lib/ui.js';
import { bpDefs, drawOn } from './lib/bp.js';

// fig_002 from Shastra/site/index.html, unchanged apart from the class hooks.
const SPICA = '<rect class="bp-field" x="6" y="6" width="308" height="208"/><rect class="bp-frame" x="6" y="6" width="308" height="208"/><text class="fig" transform="translate(-4 8) rotate(90)">fig_05</text><text class="fig" transform="translate(324 8) rotate(90)">[ the sidereal circle ]</text><g class="draw-art"><rect class="t1" x="20" y="130" width="280" height="16"/><rect class="hx" x="20" y="146" width="280" height="6"/><path class="ln" d="M20 130v11M27.78 130v4M35.56 130v4M43.33 130v7M51.11 130v4M58.89 130v4M66.67 130v7M74.44 130v4M82.22 130v4M90 130v11M97.78 130v4M105.56 130v4M113.33 130v7M121.11 130v4M128.89 130v4M136.67 130v7M144.44 130v4M152.22 130v4M160 130v11M167.78 130v4M175.56 130v4M183.33 130v7M191.11 130v4M198.89 130v4M206.67 130v7M214.44 130v4M222.22 130v4M230 130v11M237.78 130v4M245.56 130v4M253.33 130v7M261.11 130v4M268.89 130v4M276.67 130v7M284.44 130v4M292.22 130v4M300 130v11"/><text class="num" x="20" y="164" text-anchor="start">0°</text><text class="num" x="90" y="164" text-anchor="middle">90°</text><text class="num" x="160" y="164" text-anchor="middle">180°</text><text class="num" x="230" y="164" text-anchor="middle">270°</text><text class="num" x="300" y="164" text-anchor="end">360°</text><path class="mks" d="M160 64V130"/><circle class="pl" cx="160" cy="56" r="6"/><circle class="mkd" cx="160" cy="56" r="2.2"/><path class="ln" d="M160 45V49M160 63V67M149 56H153M167 56H171"/><path class="lead" d="M112 56H147"/><text class="lab" x="108" y="59" text-anchor="end">spica</text><circle class="ln dash" cx="160" cy="138" r="7"/><path class="ln soft" d="M165.7 133.93L230.33 87.76"/><circle class="pl" cx="258" cy="68" r="34"/><rect class="t1" x="228" y="72" width="60" height="12"/><path class="ln" d="M258 72v12M242 72v7M274 72v7"/><path class="mks" d="M258 42V72"/><text class="num" x="258" y="95" text-anchor="middle">00′</text><text class="lab" x="258" y="26" text-anchor="middle">180°00′, exactly</text><text class="fig" x="285" y="101">a</text><path class="lead" d="M44 196V154"/><text class="lab" x="50" y="196">the sidereal circle · lahiri</text></g>';

const dms = (deg) => {
  const sgn = deg < 0 ? '-' : ''; let a = Math.abs(deg);
  let d = Math.floor(a), m = Math.floor((a - d) * 60), sec = Math.round(((a - d) * 60 - m) * 60);
  if (sec === 60) { sec = 0; m += 1; } if (m === 60) { m = 0; d += 1; }
  return `${sgn}${d}°${String(m).padStart(2, '0')}′${String(sec).padStart(2, '0')}″`;
};
const sepOf = (g) => Math.abs(((g.moon.lon - g.sun.lon + 540) % 360) - 180);
const elongOf = (g) => (((g.moon.lon - g.sun.lon) % 360) + 360) % 360;
const axisOf = (g) => (((g.ketu.lon - g.rahu.lon) % 360) + 360) % 360;
const UJ = 'lat=23.1765&lon=75.7885';

// The tests, quoted from server/test/jyotish.test.js, each with the live call
// that re-runs it and the value from the last saved run (22 nov 2026).
const CHECKS = [
  {
    name: 'ayanamsa ≈ 23°15\' at the 1956 definition epoch',
    code: 'Math.abs(a - 23.25) < 1 * ARCMIN',
    path: `/api/transits?${UJ}&at=1956-03-21T00:00:00Z`,
    value: (t) => t.ayanamsa,
    pass: (v) => Math.abs(v - 23.25) < 1 / 60,
    show: (v) => `${dms(v)}, ${Math.round(Math.abs(v - 23.25) * 3600)}″ from 23°15′`,
    saved: 23.245560968496193,
  },
  {
    name: 'sun and moon conjoin at the 2017-08-21 total solar eclipse',
    code: 'assert.ok(sep < 0.5)',
    path: `/api/transits?${UJ}&at=2017-08-21T18:26:40Z`,
    value: (t) => sepOf(t.grahas),
    pass: (v) => v < 0.5,
    show: (v) => `${v.toFixed(4)}° apart`,
    saved: 0.03207238448794669,
  },
  {
    name: 'moon opposes sun at the 2018-07-27 total lunar eclipse',
    code: 'Math.abs(elong - 180) < 0.6',
    path: `/api/transits?${UJ}&at=2018-07-27T20:21:00Z`,
    value: (t) => elongOf(t.grahas),
    pass: (v) => Math.abs(v - 180) < 0.6,
    show: (v) => `${v.toFixed(4)}° apart`,
    saved: 180.00474027128507,
  },
  {
    name: 'ketu is exactly opposite rahu',
    code: 'Math.abs(diff - 180) < 1e-9',
    path: `/api/transits?${UJ}`,
    value: (t) => axisOf(t.grahas),
    pass: (v) => Math.abs(v - 180) < 1e-9,
    show: (v) => `${v.toFixed(9)}° apart`,
    saved: 180.0,
  },
];

export function mount(root, ctx) {
  const api = ctx.api || 'https://shastra.onrender.com';
  const b = bag();
  root.classList.toggle('sx-reduce', !!ctx.reduce);

  const kit = bpDefs();
  const svg = s('svg', { class: 'bp sx-mt-svg', viewBox: '-12 0 344 220', role: 'img', style: kit.style, 'aria-label': 'A sidereal scale from 0 to 360 degrees, with Spica sitting exactly on 180, shown again in a magnified detail.' });
  svg.innerHTML = SPICA;
  svg.insertBefore(kit.defs, svg.firstChild);
  const redraw = h('button', { type: 'button', class: 'sx-link' }, 'draw it again');

  const status = statusLine();
  const go = h('button', { type: 'button', class: 'sx-btn' }, 'run them on the live engine');
  const list = h('ol', { class: 'sx-mt-list' });
  const rows = CHECKS.map((c, i) => {
    const val = h('span', { class: 'sx-mt-val' }, '');
    const res = h('span', { class: 'sx-mt-res' }, '');
    const li = h('li', { class: 'sx-mt-row', 'data-st': 'idle' },
      h('span', { class: 'sx-mt-n' }, String(i + 2).padStart(2, '0')),
      h('div', { class: 'sx-mt-body' },
        h('p', { class: 'sx-mt-name' }, c.name),
        h('code', { class: 'sx-mt-code' }, c.code),
        h('p', { class: 'sx-mt-out' }, val, res)));
    list.appendChild(li);
    return { li, val, res };
  });
  const right = h('div', { class: 'sx-mt-right' },
    h('div', { class: 'sx-mt-count' }, h('b', null, '4'), h('p', null, 'of the checks every release has to pass before it goes live, re-run here against the live engine.')),
    list,
    h('div', { class: 'sx-mt-go' }, go, status.el));
  const wait = waiter(right, { onSkip: () => skip() });
  const el = h('div', { class: 'sx sx-maths' },
    h('div', { class: 'sx-mt-left' },
      h('p', { class: 'sx-fig' }, 'check 01 · the first thing tested'),
      h('div', { class: 'sx-mt-art' }, svg),
      h('div', { class: 'sx-mt-cap' },
        h('p', { class: 'sx-mt-name' }, 'Spica sits at 180°', h('span', null, ' \u00b7 the definition of lahiri, tested first')),
        h('code', { class: 'sx-mt-code' }, 'assert.ok(offBy < 2 * ARCMIN)'),
        redraw)),
    right);
  root.appendChild(el);

  const draw = () => { drawOn(svg.querySelector('.draw-art'), { reduce: ctx.reduce, duration: 900, window: 900, delay: 150 }); ctx.sound?.sweep?.({ from: 400, to: 2400, dur: 1.2, gain: 0.04 }); };
  requestAnimationFrame(() => { if (!b.dead) drawOn(svg.querySelector('.draw-art'), { reduce: ctx.reduce, duration: 900, window: 900, delay: 250 }); });
  b.on(redraw, 'click', draw);

  function show(i, v, live) {
    const c = CHECKS[i], r = rows[i], ok = c.pass(v);
    r.li.dataset.st = ok ? 'pass' : 'fail';
    r.li.classList.toggle('is-saved', !live);
    r.val.textContent = c.show(v);
    r.res.textContent = ok ? (live ? ' · pass, live' : ' · pass, saved run') : ' · fail';
  }
  function showSaved() { CHECKS.forEach((c, i) => show(i, c.saved, false)); }

  let ctrl = null, busy = false;
  function skip() { ctrl?.abort(); wait.stop(); busy = false; go.removeAttribute('aria-disabled'); go.textContent = 'run them on the live engine'; showSaved(); status.set('saved', 'values from the saved run, 22 nov 2026', { label: 'try live again', fn: run }); }
  async function run() {
    if (busy) return;
    busy = true; go.setAttribute('aria-disabled', 'true'); go.textContent = 'running';
    ctx.sound?.select?.();
    ctrl = new AbortController();
    b.add(() => ctrl.abort());
    rows.forEach((r) => { r.li.dataset.st = 'idle'; r.val.textContent = ''; r.res.textContent = ''; });
    const cold = warmState(api) !== 'warm';
    status.set('wait', cold ? 'waking the server up' : 'running');
    wait.start(cold);
    let passed = 0;
    try {
      for (let i = 0; i < CHECKS.length; i += 1) {
        rows[i].li.dataset.st = 'run';
        const j = await call(api, CHECKS[i].path, { signal: ctrl.signal });
        if (i === 0) wait.stop();
        const v = CHECKS[i].value(j.transits);
        show(i, v, true);
        if (CHECKS[i].pass(v)) { passed += 1; ctx.sound?.blip?.(1200 + i * 220, 0.07, 0.035); }
        if (!ctx.reduce) await new Promise((r) => b.timeout(r, 260));
        if (b.dead) return;
      }
      status.set('live', `${passed} of 4 pass on the live engine`);
    } catch (err) {
      if (err.kind === 'cancelled' || b.dead) return;
      wait.stop(); showSaved();
      status.set('fail', 'live server did not answer · values from the saved run, 22 nov 2026', { label: 'try again', fn: run });
    } finally {
      busy = false; go.removeAttribute('aria-disabled'); go.textContent = 'run them on the live engine';
    }
  }
  b.on(go, 'click', run);

  showSaved();
  status.set('saved', 'values from the saved run, 22 nov 2026');
  prewarm(api);
  return { destroy() { b.destroy(); wait.destroy(); el.remove(); } };
}
