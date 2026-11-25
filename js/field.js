// A dithered field: slow noise, thresholded through a 4 by 4 Bayer matrix and drawn as
// a grid of small squares, the way a one-bit display renders a gradient. It leans
// toward the pointer. It runs at about 20 frames a second and only while on screen.

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16);

const perm = new Uint8Array(512);
{ let s = 1337; const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; const p = Array.from({ length: 256 }, (_, i) => i); for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; } for (let i = 0; i < 512; i++) perm[i] = p[i & 255]; }
const fade = t => t * t * (3 - 2 * t);
function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, X = xi & 255, Y = yi & 255;
  const a = perm[perm[X] + Y] / 255, b = perm[perm[X + 1] + Y] / 255, c = perm[perm[X] + Y + 1] / 255, d = perm[perm[X + 1] + Y + 1] / 255;
  const u = fade(xf), v = fade(yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
const fbm = (x, y) => vnoise(x, y) * 0.58 + vnoise(x * 2.1 + 7.3, y * 2.1 - 3.1) * 0.29 + vnoise(x * 4.3 - 2.2, y * 4.3 + 9.4) * 0.13;

// With `text`, the word is set in the field itself: cells inside the letters fill in
// almost solid, so the name is made of the same dots as everything around it.
// `chaos(v)` shakes it apart: from 0 to 1 the dots jitter harder and the letters lose
// their hold; past 1 they fly outward and fade, until at 2 nothing is left.
export function mountField(cv, { cell = 7, dot = 2.4, lean = 0.5, floor = 0.42, alpha = 0.4, text = null, textAlpha = 0.92, reach = 180 } = {}) {
  const cx = cv.getContext('2d');
  let w = 0, h = 0, cols = 0, rows = 0, raf = 0, vis = false, alive = true, t = Math.random() * 40, last = 0, mx = -1e4, my = -1e4, ink = '#fff', hot = '#fff', mask = null, chaos = 0;
  const R2 = reach * reach;
  function size() {
    const r = cv.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1);
    w = r.width; h = r.height; if (!w || !h) return;
    cv.width = Math.round(w * d); cv.height = Math.round(h * d); cx.setTransform(d, 0, 0, d, 0, 0);
    cols = Math.ceil(w / cell); rows = Math.ceil(h / cell);
    if (text) letters();
  }
  function letters() {
    // draw the word once at one pixel per cell and keep its coverage
    const word = typeof text === 'function' ? text(w, h) : text, lines = [].concat(word);
    const o = document.createElement('canvas'); o.width = cols; o.height = rows;
    const c = o.getContext('2d'); let fs = 100;
    const face = s => `700 ${s}px Geist, ui-sans-serif, system-ui, sans-serif`;
    c.font = face(fs);
    const widest = Math.max(...lines.map(l => c.measureText(l).width));
    fs = Math.min(fs * cols * 0.9 / widest, rows * 0.6 / lines.length);
    c.font = face(fs); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#000';
    try { c.letterSpacing = `${-fs * 0.045}px`; } catch (e) {}
    const lh = fs * 0.9, y0 = rows * 0.45 - (lines.length - 1) * lh / 2;
    lines.forEach((l, i) => c.fillText(l, cols / 2, y0 + i * lh));
    const d = c.getImageData(0, 0, cols, rows).data; mask = new Float32Array(cols * rows);
    for (let i = 0; i < mask.length; i++) mask[i] = d[i * 4 + 3] / 255;
  }
  function tones() { const cs = getComputedStyle(cv); ink = cs.color; hot = cs.getPropertyValue('--field-hot').trim() || ink; }
  function draw() {
    if (!cols) return;
    cx.clearRect(0, 0, w, h);
    const warm = [], solid = [];
    const k = Math.min(1, chaos), out = Math.max(0, chaos - 1), amp = k * k * cell * 3 + out * out * 260, gone = Math.max(0, 1 - out * 1.15);
    const jx = () => (Math.random() - 0.5) * amp;
    cx.fillStyle = ink; cx.globalAlpha = alpha * gone;
    for (let y = 0; y < rows; y++) {
      const py = y * cell, by = (y & 3) * 4;
      for (let x = 0; x < cols; x++) {
        const px = x * cell;
        let v = fbm(x * 0.034 + t, y * 0.052 - t * 0.55) + (x / cols - 0.5) * lean;
        const dx = px - mx, dy = py - my, d2 = dx * dx + dy * dy;
        let near = 0;
        if (d2 < R2) { near = 1 - Math.sqrt(d2) / reach; v += near * (text ? 0.14 : 0.3); }
        const m = mask ? mask[y * cols + x] : 0;
        if (m > 0.4) v += 0.62 * m * (1 - k * 0.45);
        if (k) v += (Math.random() - 0.5) * k * 0.5;
        if (v > floor + BAYER[by + (x & 3)] * 0.46) {
          const qx = amp ? px + jx() : px, qy = amp ? py + jx() : py;
          if (near > 0.3 || (k && m > 0.4 && Math.random() < k * 0.4)) warm.push(qx, qy); else if (m > 0.4) solid.push(qx, qy); else cx.fillRect(qx, qy, dot, dot);
        }
      }
    }
    cx.globalAlpha = textAlpha * gone;
    for (let i = 0; i < solid.length; i += 2) cx.fillRect(solid[i], solid[i + 1], dot, dot);
    cx.fillStyle = hot; cx.globalAlpha = gone;
    for (let i = 0; i < warm.length; i += 2) cx.fillRect(warm[i], warm[i + 1], dot, dot);
  }
  function frame(now) {
    raf = 0; if (!alive || !vis) return;
    if (chaos > 0 || now - last > 48) { last = now; t += 0.0042 * (1 + chaos * 5); draw(); }
    raf = requestAnimationFrame(frame);
  }
  const kick = () => { if (reduce) { draw(); return; } if (!raf && vis && alive) raf = requestAnimationFrame(frame); };
  const io = new IntersectionObserver(es => { vis = es[0].isIntersecting; if (vis) { size(); tones(); kick(); } }, { threshold: 0 });
  io.observe(cv);
  const onR = () => { size(); if (reduce || !raf) draw(); };
  addEventListener('resize', onR);
  const mv = e => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
  addEventListener('pointermove', mv, { passive: true });
  const mo = new MutationObserver(() => { tones(); if (reduce) draw(); });
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  size(); tones(); if (reduce) draw();
  if (text && document.fonts && document.fonts.load) document.fonts.load('700 100px Geist').then(() => { if (alive && cols) { letters(); if (reduce) draw(); } });
  return { chaos(v) { chaos = reduce ? 0 : Math.max(0, v); }, destroy() { alive = false; cancelAnimationFrame(raf); io.disconnect(); mo.disconnect(); removeEventListener('resize', onR); removeEventListener('pointermove', mv); } };
}
