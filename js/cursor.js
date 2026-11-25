// The pointer is an arrow: a real cursor image set in CSS, so the browser moves it and
// it never lags, covers nothing and has no moving parts. It takes the accent colour
// over anything that can be pressed. This file adds the click: while the button is
// down the arrow is swapped for a slightly smaller, darker one, as if pushed in, with
// a crisp click going down and a softer one coming up. It also shows a short hint
// beside the pointer where one is needed ("press and drag").
import { sfx } from './sound.js';

const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;

export function initCursor() {
  const root = document.documentElement;
  let pressed = false;
  addEventListener('pointerdown', e => {
    if (e.button) return;
    pressed = !(e.target.closest && e.target.closest('.ex-root'));
    if (pressed) sfx.tap();
    root.classList.add('pressing');
  }, { passive: true, capture: true });
  const lift = () => { if (pressed) { pressed = false; sfx.untap(); } root.classList.remove('pressing'); };
  ['pointerup', 'pointercancel'].forEach(n => addEventListener(n, lift, { passive: true, capture: true }));
  addEventListener('blur', lift);

  if (!fine) return;
  const lab = document.createElement('div');
  lab.id = 'cur'; lab.setAttribute('aria-hidden', 'true');
  document.body.appendChild(lab);
  let shown = '';
  addEventListener('pointermove', e => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const h = e.target && e.target.closest ? e.target.closest('[data-cur-label]') : null;
    const text = h && !e.buttons ? h.dataset.curLabel : '';
    if (text !== shown) { shown = text; if (text) lab.textContent = text; lab.classList.toggle('on', !!text); }
    if (text) lab.style.translate = `${e.clientX + 16}px ${e.clientY + 22}px`;
  }, { passive: true });
  const hide = () => { shown = ''; lab.classList.remove('on'); };
  addEventListener('scroll', hide, { passive: true }); addEventListener('blur', hide); document.addEventListener('pointerleave', hide);
}
