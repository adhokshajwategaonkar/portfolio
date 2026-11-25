// Low-precision sidereal Sun and Moon, enough for a sign, a nakshatra and a tithi.
// The real Shastra uses Swiss Ephemeris on the server; this runs in the browser so the
// dial needs no network. Lahiri ayanamsa, approximated linearly.

export const SIGNS = ['mesha', 'vrishabha', 'mithuna', 'karka', 'simha', 'kanya', 'tula', 'vrishchika', 'dhanu', 'makara', 'kumbha', 'meena'];
export const SHORT = ['mes', 'vrs', 'mit', 'kar', 'sim', 'kan', 'tul', 'vrc', 'dha', 'mak', 'kum', 'mee'];
export const NAK = ['ashwini', 'bharani', 'krittika', 'rohini', 'mrigashira', 'ardra', 'punarvasu', 'pushya', 'ashlesha', 'magha', 'purva phalguni', 'uttara phalguni', 'hasta', 'chitra', 'swati', 'vishakha', 'anuradha', 'jyeshtha', 'mula', 'purva ashadha', 'uttara ashadha', 'shravana', 'dhanishta', 'shatabhisha', 'purva bhadrapada', 'uttara bhadrapada', 'revati'];
const TITHI = ['pratipada', 'dwitiya', 'tritiya', 'chaturthi', 'panchami', 'shashthi', 'saptami', 'ashtami', 'navami', 'dashami', 'ekadashi', 'dwadashi', 'trayodashi', 'chaturdashi'];
// the rashi glyphs the Shastra site uses
export const GLYPH = ['♈︎', '♉︎', '♊︎', '♋︎', '♌︎', '♍︎', '♎︎', '♏︎', '♐︎', '♑︎', '♒︎', '♓︎'];

const rad = Math.PI / 180, norm = x => ((x % 360) + 360) % 360;

export function sky(date) {
  const n = date.getTime() / 864e5 + 2440587.5 - 2451545;
  const T = n / 36525;
  const g = norm(357.529 + 0.98560028 * n), L = norm(280.459 + 0.98564736 * n);
  const sun = L + 1.915 * Math.sin(g * rad) + 0.020 * Math.sin(2 * g * rad);
  const Lm = norm(218.3165 + 13.17639648 * n), D = norm(297.8502 + 12.19074912 * n), Mm = norm(134.9634 + 13.06499295 * n), F = norm(93.2721 + 13.22935024 * n);
  const moon = Lm + 6.289 * Math.sin(Mm * rad) - 1.274 * Math.sin((2 * D - Mm) * rad) + 0.658 * Math.sin(2 * D * rad) + 0.214 * Math.sin(2 * Mm * rad) - 0.186 * Math.sin(g * rad) - 0.114 * Math.sin(2 * F * rad);
  const aya = 23.85306 + (T * 100) * 0.013972;
  return { sun: norm(sun - aya), moon: norm(moon - aya) };
}

export function read(date) {
  const p = sky(date);
  const ss = Math.floor(p.sun / 30), ms = Math.floor(p.moon / 30);
  const nk = Math.floor(p.moon / (360 / 27));
  const pada = Math.floor((p.moon % (360 / 27)) / (360 / 108)) + 1;
  const el = norm(p.moon - p.sun);
  const t = Math.floor(el / 12); // 0..29
  const shukla = t < 15;
  const i = t % 15;
  const tithi = i === 14 ? (shukla ? 'purnima' : 'amavasya') : TITHI[i];
  return { ...p, ss, ms, nk, pada, el, t, tithi, paksha: shukla ? 'shukla' : 'krishna' };
}

export const dm = x => { const d = Math.floor(x % 30), m = Math.floor(((x % 30) - d) * 60); return `${String(d).padStart(2, '0')}°${String(m).padStart(2, '0')}′`; };

// a moon drawn at its phase: elongation 0 is new, 180 is full
export function moonSVG(el, r = 7, ink = 'currentColor') {
  const k = Math.cos(el * rad); // 1 new, -1 full
  const lit = el < 180; // waxing lights the right side
  const rx = Math.abs(k) * r;
  const sweepOuter = lit ? 1 : 0;
  const bulge = k > 0 ? (lit ? 0 : 1) : (lit ? 1 : 0);
  return `<svg viewBox="-${r + 1} -${r + 1} ${2 * r + 2} ${2 * r + 2}" width="${2 * r + 2}" height="${2 * r + 2}" aria-hidden="true">
    <circle r="${r}" fill="none" stroke="${ink}" stroke-width="1"/>
    <path d="M0 ${-r} A${r} ${r} 0 0 ${sweepOuter} 0 ${r} A${rx} ${r} 0 0 ${bulge} 0 ${-r}Z" fill="${ink}"/>
  </svg>`;
}
