// What a status move looks like on a row. web/src/lib/wash.js, ported to draw
// inside the exhibit.
//
// A fill sweeps through the row, the words change colour at the sweep's edge, a
// mark draws itself, and the row leaves. Done goes right in lime (the only lime one,
// because it's the reward), dropped goes left in neutral grey, snoozed comes down in
// dim amber. The sweep runs on a copy of the row revealed by a moving clip.
// Returns how long the real row must stay, or 0 if nothing played.

import { esc } from './util.js';

const SWEEP_EASE = 'cubic-bezier(.65,0,.35,1)';
const DRAW = ' pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"';
const svg = (size, body) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

const KINDS = {
  done: {
    bg: 'var(--accent)', ink: 'var(--on-accent)', from: 'inset(0 100% 0 0)', sweep: 340, hold: 620,
    leave: 'translateY(-14px)', mark: svg(20, `<path class="wd" d="M3 8.4l3.2 3.4L13 4.5"${DRAW}/>`),
  },
  dropped: {
    bg: 'var(--wash-drop-bg)', ink: 'var(--wash-drop-ink)', from: 'inset(0 0 0 100%)', sweep: 300, hold: 560,
    leave: 'translateX(-20px)', label: 'dropped',
    mark: svg(15, `<path class="wd" d="M4 4l8 8"${DRAW}/><path class="wd" d="M12 4l-8 8"${DRAW}/>`),
  },
  snoozed: {
    bg: 'var(--wash-snooze-bg)', ink: 'var(--wash-snooze-ink)', from: 'inset(0 0 100% 0)', sweep: 340, hold: 760,
    leave: 'translateY(14px)', mark: svg(15, '<circle cx="8" cy="8" r="6"/><path class="wh" d="M8 8V4.400"/>'),
  },
};

export function fireWash(root, row, { kind = 'done', delay = 0, label, reduce = false } = {}) {
  const k = KINDS[kind];
  if (!k || reduce || !row || !row.animate) return 0;
  try {
    const box = row.getBoundingClientRect();
    const rb = root.getBoundingClientRect();
    if (!box.width) return 0;
    const wash = document.createElement('div');
    wash.className = 'ax-wash';
    wash.setAttribute('aria-hidden', 'true');
    Object.assign(wash.style, {
      left: `${box.left - rb.left}px`, top: `${box.top - rb.top}px`,
      width: `${box.width}px`, height: `${box.height}px`,
      borderRadius: getComputedStyle(row).borderRadius || '14px',
      background: k.bg, color: k.ink, clipPath: k.from,
    });
    wash.style.setProperty('--wash-ink', k.ink);
    const copy = row.cloneNode(true);
    copy.classList.add('wash-copy');
    copy.removeAttribute('data-id');
    copy.removeAttribute('tabindex');
    copy.removeAttribute('role');
    wash.appendChild(copy);

    const text = label ?? k.label;
    const tag = document.createElement('div');
    tag.className = 'ax-wash-tag' + (text ? ' has-text' : '');
    tag.style.background = text ? k.bg : 'transparent';
    tag.innerHTML = `${text ? `<span>${esc(text)}</span>` : ''}${k.mark}`;
    wash.appendChild(tag);
    root.appendChild(wash);

    const markAt = delay + k.sweep - 60;
    wash.animate([{ clipPath: k.from }, { clipPath: 'inset(0 0% 0% 0%)' }], { duration: k.sweep, delay, easing: SWEEP_EASE, fill: 'both' });
    tag.querySelectorAll('.wd').forEach((p, i) => {
      p.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 200, delay: markAt + i * 70, easing: 'ease-out', fill: 'both' });
    });
    const hand = tag.querySelector('.wh');
    if (hand) {
      hand.style.transformOrigin = '8px 8px';
      hand.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], { duration: 520, delay: markAt, easing: 'cubic-bezier(.45,0,.25,1)', fill: 'both' });
    }
    const end = delay + k.hold;
    wash.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: k.leave }], { duration: 260, delay: end, easing: 'ease-in', fill: 'both' })
      .finished.catch(() => {}).finally(() => wash.remove());
    return end;
  } catch {
    return 0;
  }
}
