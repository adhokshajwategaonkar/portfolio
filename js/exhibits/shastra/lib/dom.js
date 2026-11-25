// Small DOM helpers shared by the Shastra exhibits.
export const NS = 'http://www.w3.org/2000/svg';

/** h('div', { class: 'x', onclick: fn }, child, 'text', [more]) */
export function h(tag, attrs, ...kids) {
  const n = document.createElement(tag);
  setAttrs(n, attrs);
  append(n, kids);
  return n;
}

/** s('circle', { cx: 1 }) creates an SVG element. */
export function s(tag, attrs, ...kids) {
  const n = document.createElementNS(NS, tag);
  setAttrs(n, attrs);
  append(n, kids);
  return n;
}

function setAttrs(n, attrs) {
  if (!attrs) return;
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
    else if (k === 'style' && typeof v === 'object') Object.assign(n.style, v);
    else if (k === 'text') n.textContent = v;
    else if (k === 'html') n.innerHTML = v;
    else n.setAttribute(k, v === true ? '' : String(v));
  }
}

function append(n, kids) {
  for (const k of kids.flat(Infinity)) {
    if (k == null || k === false) continue;
    n.appendChild(typeof k === 'string' || typeof k === 'number' ? document.createTextNode(String(k)) : k);
  }
}

export const esc = (t) => String(t ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** The reading marks its key phrases with *asterisks*. */
export const emph = (t) => esc(t).replace(/\*([^*]+)\*/g, '<em>$1</em>');

export const titleCase = (t) => String(t || '').replace(/\b[a-z]/g, (c) => c.toUpperCase());

export const ORD = { 1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 5: '5th', 6: '6th', 7: '7th', 8: '8th', 9: '9th', 10: '10th', 11: '11th', 12: '12th' };

export const fmtDate = (iso, opts = { day: 'numeric', month: 'short', year: 'numeric' }) => {
  const d = new Date(iso);
  return isNaN(d) ? '' : d.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', ...opts }).toLowerCase();
};

let uid = 0;
export const nextId = (p = 'sx') => `${p}${++uid}`;

/** A bag of teardown callbacks, so every exhibit can destroy cleanly. */
export function bag() {
  const fns = [];
  const ctrl = new AbortController();
  return {
    signal: ctrl.signal,
    add(fn) { fns.push(fn); return fn; },
    on(el, ev, fn, opts) { el.addEventListener(ev, fn, opts); fns.push(() => el.removeEventListener(ev, fn, opts)); },
    timeout(fn, ms) { const t = setTimeout(fn, ms); fns.push(() => clearTimeout(t)); return t; },
    interval(fn, ms) { const t = setInterval(fn, ms); fns.push(() => clearInterval(t)); return t; },
    get dead() { return ctrl.signal.aborted; },
    destroy() { ctrl.abort(); fns.splice(0).forEach((f) => { try { f(); } catch {} }); },
  };
}
