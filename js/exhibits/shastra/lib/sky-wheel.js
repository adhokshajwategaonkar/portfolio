// The live rasi chakra, ported from Shastra/site/assets/sky-wheel.js.
//
// Nine grahas at real sidereal longitudes (Lahiri), the twelve rasi named in
// Sanskrit on an ink band, the 27 nakshatra ticks, the lagna as a hand, and
// graha drishti as chords. Drishti is reckoned by sign and is one-way for the
// special aspects: Mars also the 4th and 8th, Jupiter the 5th and 9th, Saturn
// the 3rd and 10th. Rahu and Ketu get the 7th only, because the sources
// disagree and the contested chords are left undrawn rather than asserted.
// The sky barely moves in a minute, so nothing spins: the drawing animates
// once and the data is what is live.
import { s } from './dom.js';

const C = 300, R_BAND_O = 292, R_BAND_I = 243, R_RASI_G = 279, R_RASI_N = 257;
const R_NAK_O = 244, R_NAK_I = 232, R_TICK_O = 244, R_TICK_I = 232, R_GLYPH = 206;
const RING = 15, DEG_GAP = 4, DEG_CHAR = 6.2, DEG_H = 10, R_CHORD = 156, R_INNER = 80;

// U+FE0E on every glyph, or the zodiac turns into colour emoji on phones.
export const RASI = [
  ['mesha', '♈︎'], ['vrishabha', '♉︎'], ['mithuna', '♊︎'], ['karka', '♋︎'],
  ['simha', '♌︎'], ['kanya', '♍︎'], ['tula', '♎︎'], ['vrishchika', '♏︎'],
  ['dhanu', '♐︎'], ['makara', '♑︎'], ['kumbha', '♒︎'], ['meena', '♓︎'],
];
export const ORDER = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'];
export const GLYPH = { sun: '☉︎', moon: '☽︎', mars: '♂︎', mercury: '☿︎', jupiter: '♃︎', venus: '♀︎', saturn: '♄︎', rahu: '☊︎', ketu: '☋︎' };
export const SA = { sun: 'surya', moon: 'chandra', mars: 'mangala', mercury: 'budha', jupiter: 'guru', venus: 'shukra', saturn: 'shani', rahu: 'rahu', ketu: 'ketu' };
export const DRISHTI = { mars: [4, 7, 8], jupiter: [5, 7, 9], saturn: [3, 7, 10] };
export const drishtiOf = (k) => DRISHTI[k] || [7];

const f = (v) => Math.round(v * 100) / 100;
function pt(r, lon) { const a = (180 + lon) * Math.PI / 180; return [C + r * Math.cos(a), C - r * Math.sin(a)]; }
function arc(r, a0, a1, sweep) { const a = pt(r, a0), b = pt(r, a1); return `M${f(a[0])} ${f(a[1])} A${r} ${r} 0 0 ${sweep} ${f(b[0])} ${f(b[1])}`; }
const houseFrom = (from, to) => ((to - from + 12) % 12) + 1;

// Glyphs that would collide are nudged along the ring; the tick stays true.
function spread(items) {
  const a = items.slice().sort((x, y) => x.lon - y.lon);
  a.forEach((it) => { it.at = it.lon; });
  for (let pass = 0; pass < 60 && a.length > 1; pass += 1) {
    let moved = false;
    for (let i = 0; i < a.length; i += 1) {
      const cur = a[i], nxt = a[(i + 1) % a.length];
      let gap = nxt.at - cur.at; if (i === a.length - 1) gap += 360;
      if (gap >= 9) continue;
      const push = (9 - gap) / 2; cur.at -= push; nxt.at += push; moved = true;
    }
    if (!moved) break;
  }
  a.forEach((it) => { it.at = ((it.at % 360) + 360) % 360; });
  return items;
}

export function skyWheel(host, { uid = 'sw', onFocus } = {}) {
  const svg = s('svg', { viewBox: '0 0 600 600', class: 'sw', role: 'img', 'aria-label': 'The sky right now: the twelve signs, the twenty-seven birth stars and the nine planets where they are now, with lines showing which planet influences which.' });
  host.appendChild(svg);

  // the plate
  const defs = s('defs');
  const plate = s('g', { class: 'sw-plate' });
  plate.appendChild(s('circle', { cx: C, cy: C, r: (R_BAND_O + R_BAND_I) / 2, class: 'sw-band', 'stroke-width': R_BAND_O - R_BAND_I }));
  const names = s('g', { class: 'sw-rasi' }), glyphs = s('g', { class: 'sw-rasi-glyph' });
  for (let i = 0; i < 12; i += 1) {
    const l0 = i * 30, l1 = l0 + 30, top = pt(R_RASI_N, l0 + 15)[1] < C, id = `${uid}-arc-${i}`;
    defs.appendChild(s('path', { id, d: top ? arc(R_RASI_N, l1, l0, 1) : arc(R_RASI_N, l0, l1, 0), fill: 'none' }));
    const t = s('text', { 'text-anchor': 'middle' });
    t.appendChild(s('textPath', { href: '#' + id, startOffset: '50%', 'text-anchor': 'middle' }, RASI[i][0]));
    names.appendChild(t);
    const gp = pt(R_RASI_G, l0 + 15);
    glyphs.appendChild(s('text', { x: f(gp[0]), y: f(gp[1]), 'text-anchor': 'middle', dy: '0.36em' }, RASI[i][1]));
  }
  plate.append(names, glyphs);
  const divs = s('g', { class: 'sw-div' });
  for (let i = 0; i < 12; i += 1) { const o = pt(R_BAND_O, i * 30), n = pt(R_BAND_I, i * 30); divs.appendChild(s('line', { x1: f(o[0]), y1: f(o[1]), x2: f(n[0]), y2: f(n[1]) })); }
  const naks = s('g', { class: 'sw-nak' });
  for (let k = 0; k < 27; k += 1) { const d = k * 360 / 27, a = pt(R_NAK_O, d), b = pt(R_NAK_I, d); const ln = s('line', { x1: f(a[0]), y1: f(a[1]), x2: f(b[0]), y2: f(b[1]) }); ln.style.setProperty('--i', k); naks.appendChild(ln); }
  plate.append(divs, naks,
    s('circle', { cx: C, cy: C, r: R_NAK_I, fill: 'none', class: 'sw-hair' }),
    s('circle', { cx: C, cy: C, r: R_CHORD, fill: 'none', class: 'sw-hair' }));
  svg.append(defs, plate);

  let data = null, focused = null;

  function drawSky(d, state) {
    svg.querySelector('.sw-sky')?.remove();
    const sky = s('g', { class: 'sw-sky' + (state === 'live' ? '' : ' is-snapshot') });
    const gr = d.grahas, placed = {};
    spread(ORDER.filter((k) => gr[k]).map((k) => ({ key: k, lon: gr[k].lon }))).forEach((it) => { placed[it.key] = it.at; });
    const chords = s('g', { class: 'sw-chords' });
    let n = 0;
    for (const from of ORDER) {
      const a = gr[from]; if (!a) continue;
      for (const to of ORDER) {
        if (to === from || !gr[to]) continue;
        const hs = houseFrom(a.signIndex, gr[to].signIndex);
        if (!drishtiOf(from).includes(hs)) continue;
        if (hs === 7 && ORDER.indexOf(to) < ORDER.indexOf(from)) continue;
        const p = pt(R_CHORD, placed[from]), q = pt(R_CHORD, placed[to]);
        const ln = s('line', { x1: f(p[0]), y1: f(p[1]), x2: f(q[0]), y2: f(q[1]), class: 'sw-chord sw-chord--' + (hs === 7 ? 'opp' : from), 'data-from': from, 'data-to': to, 'data-house': hs });
        ln.style.setProperty('--i', n++);
        chords.appendChild(ln);
      }
    }
    sky.appendChild(chords);
    const marks = s('g', { class: 'sw-grahas' });
    ORDER.forEach((key, i) => {
      const g = gr[key]; if (!g) return;
      const at = placed[key];
      const grp = s('g', { class: 'sw-graha' + (key === 'moon' ? ' is-moon' : '') + (g.retrograde ? ' is-retro' : ''), 'data-graha': key, tabindex: '0', role: 'button', 'aria-label': `${key} in ${g.sign}, ${g.degInSignStr || ''}, birth star ${g.nakshatra}${g.retrograde ? ', retrograde' : ''}` });
      grp.style.setProperty('--i', i);
      const t1 = pt(R_TICK_O, g.lon), t2 = pt(R_TICK_I, g.lon), gp = pt(R_GLYPH, at);
      grp.appendChild(s('line', { x1: f(t1[0]), y1: f(t1[1]), x2: f(t2[0]), y2: f(t2[1]), class: 'sw-graha-tick' }));
      const ldx = t2[0] - gp[0], ldy = t2[1] - gp[1], ld = Math.hypot(ldx, ldy) || 1;
      grp.appendChild(s('line', { x1: f(t2[0]), y1: f(t2[1]), x2: f(gp[0] + ldx / ld * RING), y2: f(gp[1] + ldy / ld * RING), class: 'sw-leader' }));
      grp.appendChild(s('circle', { cx: f(gp[0]), cy: f(gp[1]), r: RING + 4, class: 'sw-hit' }));
      grp.appendChild(s('circle', { cx: f(gp[0]), cy: f(gp[1]), r: RING, class: 'sw-ring' }));
      grp.appendChild(s('text', { x: f(gp[0]), y: f(gp[1]), 'text-anchor': 'middle', dy: '0.36em', class: 'sw-glyph' }, GLYPH[key]));
      const label = Math.floor(g.degInSign) + '°';
      const rad = (180 + at) * Math.PI / 180;
      const halfW = (label.length + (g.retrograde ? 2 : 0)) * DEG_CHAR / 2;
      const reach = Math.abs(Math.cos(rad)) * halfW + Math.abs(Math.sin(rad)) * DEG_H / 2;
      const dp = pt(R_GLYPH - RING - DEG_GAP - reach, at);
      const deg = s('text', { x: f(dp[0]), y: f(dp[1]), 'text-anchor': 'middle', dy: '0.36em', class: 'sw-deg' }, label);
      if (g.retrograde) deg.appendChild(s('tspan', { class: 'sw-retro', dx: '3' }, 'R'));
      grp.appendChild(deg);
      marks.appendChild(grp);
    });
    sky.appendChild(marks);
    if (d.lagna) {
      const l1 = pt(R_INNER + 8, d.lagna.lon), l2 = pt(R_NAK_I - 4, d.lagna.lon);
      sky.appendChild(s('g', { class: 'sw-lagna' }, s('line', { x1: f(l1[0]), y1: f(l1[1]), x2: f(l2[0]), y2: f(l2[1]) }), s('circle', { cx: f(l2[0]), cy: f(l2[1]), r: 3.5 })));
    }
    svg.appendChild(sky);
  }

  function drawReadout(d, state) {
    svg.querySelector('.sw-readout')?.remove();
    const g = s('g', { class: 'sw-readout' });
    g.appendChild(s('circle', { cx: C, cy: C, r: R_INNER, class: 'sw-disc' }));
    let lines;
    if (state === 'live') {
      const at = new Date(d.at);
      lines = [
        { y: -34, t: 'the sky now', c: 'sw-r-label' },
        { y: -8, t: at.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }) + ' ist', c: 'sw-r-big' },
        { y: 14, t: d.panchanga ? d.panchanga.nakshatra : '', c: 'sw-r-mid' },
        { y: 32, t: d.panchanga ? `${d.panchanga.tithi.name} · ${d.panchanga.tithi.paksha}` : '', c: 'sw-r-small' },
        { y: 48, t: d.ayanamsa ? 'ayan ' + d.ayanamsa.toFixed(3) + '°' : '', c: 'sw-r-small' },
      ];
    } else if (state === 'wait') {
      lines = [{ y: -26, t: 'saved sky', c: 'sw-r-label' }, { y: -2, t: '5 nov 2026', c: 'sw-r-mid' }, { y: 22, t: 'fetching the', c: 'sw-r-small' }, { y: 36, t: 'live sky', c: 'sw-r-small' }];
    } else {
      lines = [{ y: -26, t: 'saved sky', c: 'sw-r-label' }, { y: -2, t: '5 nov 2026', c: 'sw-r-mid' }, { y: 22, t: 'live sky', c: 'sw-r-small' }, { y: 36, t: 'unavailable', c: 'sw-r-small' }];
    }
    lines.forEach((l) => { if (l.t) g.appendChild(s('text', { x: C, y: C + l.y, 'text-anchor': 'middle', class: l.c }, l.t)); });
    if (state === 'live') g.appendChild(s('rect', { x: C - 3, y: C + 58, width: 6, height: 6, class: 'sw-tick is-beat' }));
    svg.appendChild(g);
  }

  function set(key) {
    focused = key && data && data.grahas[key] ? key : null;
    host.classList.toggle('sw-focused', !!focused);
    let lit = 0;
    svg.querySelectorAll('.sw-chord').forEach((c) => { const on = !!focused && (c.dataset.from === focused || c.dataset.to === focused); if (on) lit += 1; c.classList.toggle('is-lit', on); });
    svg.querySelectorAll('.sw-graha').forEach((g) => g.classList.toggle('is-lit', g.dataset.graha === focused));
    onFocus && onFocus(focused, data, lit);
  }

  return {
    svg,
    paint(d, state) { data = d; drawSky(d, state); drawReadout(d, state); set(focused); },
    readout(state) { if (data) drawReadout(data, state); svg.querySelector('.sw-sky')?.classList.toggle('is-stale', state === 'stale'); },
    set,
    get focused() { return focused; },
    get data() { return data; },
  };
}
