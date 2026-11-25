// Small helpers shared by every Animus exhibit.

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const an = (w) => (/^[aeiou]/i.test(w) ? 'an ' : 'a ') + w;

/** Geist and Geist Mono, loaded once for every Animus exhibit. */
export function loadFonts() {
  if (document.querySelector('link[data-animus-fonts]')) return;
  const l = document.createElement('link');
  l.rel = 'stylesheet';
  l.dataset.animusFonts = '';
  l.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap';
  document.head.appendChild(l);
}

/** Build an element from a string of HTML. */
export function html(str) {
  const t = document.createElement('template');
  t.innerHTML = str.trim();
  return t.content.firstElementChild;
}

/** Timers that all die with the exhibit. */
export function clock() {
  const ids = new Set();
  const rafs = new Set();
  return {
    after(fn, ms = 0) {
      const id = setTimeout(() => { ids.delete(id); fn(); }, ms);
      ids.add(id);
      return id;
    },
    every(fn, ms) {
      const id = setInterval(fn, ms);
      ids.add(id);
      return id;
    },
    cancel(id) { clearTimeout(id); clearInterval(id); ids.delete(id); },
    frame(fn) {
      const id = requestAnimationFrame((t) => { rafs.delete(id); fn(t); });
      rafs.add(id);
      return id;
    },
    clear() {
      ids.forEach((id) => { clearTimeout(id); clearInterval(id); });
      ids.clear();
      rafs.forEach((id) => cancelAnimationFrame(id));
      rafs.clear();
    },
  };
}

export function timeNow() {
  const d = new Date();
  return d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
}

export function hostOf(u) {
  try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; }
}

/** Where a point on the page sits inside the exhibit root. */
export function local(root, x, y) {
  const b = root.getBoundingClientRect();
  return { x: x - b.left, y: y - b.top };
}

/** The centre of an element, inside the exhibit root. */
export function centreOf(root, el) {
  const r = el.getBoundingClientRect();
  return local(root, r.left + r.width / 2, r.top + r.height / 2);
}

/** A short line that appears at the top of a surface and goes again. The app's ClearNote. */
export function sayer(el, t, ms = 1900) {
  let id = null;
  return (line) => {
    if (!line || !el) return;
    el.textContent = line;
    el.classList.add('on');
    if (id) t.cancel(id);
    id = t.after(() => el.classList.remove('on'), ms);
  };
}
