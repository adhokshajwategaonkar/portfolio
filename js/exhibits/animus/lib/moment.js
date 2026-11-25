// What a clear feels like. web/src/lib/moment.js, ported. Pure: no DOM, no audio.
//
// Most clears say nothing, which is what lets the big ones land. The surprise is a
// pure function of the item id, so re-clearing can't re-roll it. A combo has no
// failure state: when the window passes, the next clear simply starts at one.

export const COMBO_WINDOW_MS = 3 * 60_000;
export const SURPRISE_DOING = 0.2;
export const SURPRISE_KEEP = 0.1;

const DOING = new Set(['task', 'reminder', 'goal']);
const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const spell = (n) => WORDS[n] || String(n);

export const SURPRISE_LINES = ['off your mind.', 'clean.', 'lighter.', 'and it’s gone.', 'out of your head.', 'nicely done.'];

export function hash01(text, salt = '') {
  const s = `${text}|${salt}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d);
  h ^= h >>> 12;
  return (h >>> 0) / 4294967296;
}

export function nextCombo(prev, now) {
  const inWindow = prev && prev.count > 0 && now - prev.at <= COMBO_WINDOW_MS;
  return { count: inWindow ? prev.count + 1 : 1, at: now };
}

export function isSurprise(id, type) {
  return hash01(String(id), 'surprise') < (DOING.has(type) ? SURPRISE_DOING : SURPRISE_KEEP);
}

function weekLine(week) {
  if (week === 3) return 'three this week.';
  if (week === 5) return 'five this week.';
  if (week === 10) return 'ten this week.';
  if (week > 0 && week % 25 === 0) return `${week} this week.`;
  return null;
}

/** Counts are the values BEFORE this clear. Returns { tier, line }. */
export function momentFor({ id, type, combo = 1, completed = 0, week = 0 }) {
  if (completed === 0) return { tier: 'huge', line: 'your first star.' };
  if (combo >= 3) return { tier: 'big', line: `${spell(combo)} in a row.` };
  if (isSurprise(id, type)) {
    const i = Math.floor(hash01(String(id), 'line') * SURPRISE_LINES.length);
    return { tier: 'big', line: SURPRISE_LINES[i] };
  }
  if (combo === 2) return { tier: 'small', line: 'two in a row.' };
  return { tier: 'small', line: weekLine(week + 1) };
}

/** One counter per exhibit: the clear moment, decided on the tap. */
export function clearer() {
  let combo = null;
  let completed = 0;
  return {
    clear(item) {
      combo = nextCombo(combo, Date.now());
      const m = momentFor({ id: item.id, type: item.y, combo: combo.count, completed, week: completed });
      completed++;
      return m;
    },
    get completed() { return completed; },
    reset() { combo = null; completed = 0; },
  };
}
