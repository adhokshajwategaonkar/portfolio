// The blueprint drawing kit from Shastra/site: hatch and dot patterns, the
// arrow marker, and the draw-on from site/assets/motion.js, without GSAP.
import { s, nextId } from './dom.js';

/**
 * Patterns resolve their colour where they are defined, so each drawing gets
 * its own copy with unique ids. Returns { defs, url(name) }.
 */
export function bpDefs() {
  const p = nextId('bp');
  const id = (n) => `${p}-${n}`;
  const defs = s('defs', null,
    s('pattern', { id: id('hatch'), width: 5, height: 5, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, s('path', { d: 'M0 0V5', class: 'bp-pat' })),
    s('pattern', { id: id('hatch-s'), width: 2.6, height: 2.6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, s('path', { d: 'M0 0V2.6', class: 'bp-pat' })),
    s('pattern', { id: id('dots'), width: 6, height: 6, patternUnits: 'userSpaceOnUse' }, s('circle', { cx: 1, cy: 1, r: 0.55, class: 'bp-dot' })),
    s('marker', { id: id('arrow'), viewBox: '0 0 8 8', refX: 7.5, refY: 4, markerWidth: 5, markerHeight: 5, markerUnits: 'userSpaceOnUse', orient: 'auto-start-reverse' }, s('path', { d: 'M0 1 8 4 0 7z', class: 'bp-arrowhead' })),
  );
  const url = (n) => `url(#${id(n)})`;
  return { defs, url, style: `--bp-hatch:${url('hatch')};--bp-hatch-s:${url('hatch-s')};--bp-dots:${url('dots')};--bp-arrow:${url('arrow')}` };
}

/**
 * Each stroke draws over its own on-screen length (geometric length times the
 * element's screen scale, because the strokes are non-scaling). One window for
 * the whole figure, whatever its part count. Labels, leaders, dashed and
 * dotted lines are left alone, as on the site.
 */
const SKIP = '.lead, .dash, .dot, .mkd, .hxf, .bp-field, .bp-frame, .nodraw';
export function drawOn(root, { reduce = false, duration = 700, window = 500, delay = 0 } = {}) {
  if (reduce) return [];
  const els = [...root.querySelectorAll('path, circle, rect, line, polyline')].filter((e) => !e.matches(SKIP) && !e.closest('defs'));
  const n = els.length || 1;
  return els.map((el, i) => {
    let L = 600;
    try {
      const m = el.getScreenCTM();
      L = Math.ceil(el.getTotalLength() * (m ? Math.hypot(m.a, m.b) : 1)) + 2;
    } catch {}
    if (!isFinite(L) || L <= 2) return null;
    const a = el.animate(
      [{ strokeDasharray: `${L} ${L}`, strokeDashoffset: L }, { strokeDasharray: `${L} ${L}`, strokeDashoffset: 0 }],
      { duration, delay: delay + (window * i) / n, easing: 'cubic-bezier(.33,1,.68,1)', fill: 'backwards' },
    );
    return a;
  }).filter(Boolean);
}
