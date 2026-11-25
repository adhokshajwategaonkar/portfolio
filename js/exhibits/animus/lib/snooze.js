// Snooze presets, as the site and SnoozeMenu.jsx offer them. A snooze always asks
// when, because a snooze with no time is the bug this feature was built to fix.

const atHour = (d, h) => { const x = new Date(d); x.setHours(h, 0, 0, 0); return x; };

export function hint(at) {
  if (!at) return 'you fetch it';
  const today = new Date().toDateString() === at.toDateString();
  const t = at.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }).toLowerCase();
  return today ? t : at.toLocaleDateString(undefined, { weekday: 'short' }).toLowerCase() + ' ' + t;
}

export function presets() {
  const n = new Date();
  const d = n.getDay();
  const out = [{ k: 'in 3 hours', at: new Date(Date.now() + 3 * 3600000) }];
  if (n.getHours() < 17) out.push({ k: 'this evening', at: atHour(n, 18) });
  out.push({ k: 'tomorrow', at: atHour(new Date(Date.now() + 86400000), 9) });
  const sat = new Date(n);
  sat.setDate(sat.getDate() + ((6 - d + 7) % 7 || 7));
  out.push({ k: 'this weekend', at: atHour(sat, 9) });
  const mon = new Date(n);
  mon.setDate(mon.getDate() + ((1 - d + 7) % 7 || 7));
  out.push({ k: 'next week', at: atHour(mon, 9) });
  return out;
}
