// What a clear looks like where there is no row to sweep: one seal with a ripple.
// web/src/lib/seal.js, ported to draw inside the exhibit instead of over the page.
//
// A lime disc arrives, a check draws itself in one stroke, thin rings spread and
// fade, and it's gone in about a second. No glow and no particles: impact comes from
// size and movement. Two rings on every clear, a third on a bigger moment.

const EASE_OUT = 'cubic-bezier(.22,1,.36,1)';
const SIZES = {
  desktop: { disc: 72, check: 34, rings: [1.85, 2.45, 3] },
  phone: { disc: 56, check: 27, rings: [1.7, 2.15, 2.6] },
};
export const ringsFor = (tier) => (tier === 'small' ? 2 : 3);

/** x, y are inside root. */
export function fireSeal(root, { x, y, tier = 'small', reduce = false }) {
  try {
    const size = root.clientWidth >= 900 ? SIZES.desktop : SIZES.phone;
    const seal = document.createElement('div');
    seal.className = 'ax-seal';
    seal.setAttribute('aria-hidden', 'true');
    Object.assign(seal.style, {
      left: `${x - size.disc / 2}px`,
      top: `${y - size.disc / 2}px`,
      width: `${size.disc}px`,
      height: `${size.disc}px`,
    });
    const disc = document.createElement('div');
    disc.className = 'ax-seal-disc';
    disc.innerHTML =
      `<svg width="${size.check}" height="${size.check}" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">` +
      '<path d="M3 8.4l3.2 3.4L13 4.5" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>';
    seal.appendChild(disc);
    root.appendChild(seal);
    const check = disc.querySelector('path');

    if (reduce || !disc.animate) {
      check.setAttribute('stroke-dashoffset', '0');
      if (disc.animate) {
        disc.animate([{ opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 1, offset: 0.75 }, { opacity: 0 }], { duration: 700, fill: 'forwards' })
          .finished.finally(() => seal.remove());
      } else setTimeout(() => seal.remove(), 700);
      return;
    }

    const running = [
      disc.animate(
        [
          { opacity: 0, transform: 'scale(.6)', easing: EASE_OUT },
          { opacity: 1, transform: 'scale(1)', offset: 0.26 },
          { opacity: 1, transform: 'scale(1)', offset: 0.76, easing: 'ease-in' },
          { opacity: 0, transform: 'scale(.97)' },
        ],
        { duration: 920, fill: 'forwards' }
      ),
      check.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 280, delay: 130, easing: 'ease-out', fill: 'forwards' }),
    ];
    size.rings.slice(0, ringsFor(tier)).forEach((to, i) => {
      const ring = document.createElement('div');
      ring.className = 'ax-seal-ring';
      seal.insertBefore(ring, disc);
      running.push(
        ring.animate(
          [
            { opacity: 0.85 - i * 0.2, transform: 'scale(1)' },
            { opacity: 0.32 - i * 0.07, transform: `scale(${to * 0.8})`, offset: 0.6 },
            { opacity: 0, transform: `scale(${to})` },
          ],
          { duration: 820, delay: 150 + i * 120, easing: EASE_OUT, fill: 'both' }
        )
      );
    });
    Promise.all(running.map((a) => a.finished)).catch(() => {}).finally(() => seal.remove());
  } catch { /* decoration: it never gets to break a clear */ }
}
