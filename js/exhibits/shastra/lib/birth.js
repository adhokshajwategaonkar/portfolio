// A compact birth-details form: the typed date field from
// Shastra/site/assets/datefield.js, a typed time with "i don't know the time",
// and a place field on /api/places, as in Shastra/site/assets/shastra.js.
import { h } from './dom.js';
import { places } from './api.js';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const pad = (n, w = 2) => String(n).padStart(w, '0');
const daysIn = (y, m) => new Date(y, m, 0).getDate();

/** Typed segments that jump forward when full and back on an empty backspace. */
function segments(defs, onChange) {
  const parts = defs.map((d) => h('input', {
    class: 'sx-seg sx-seg-' + d.cls, type: 'text', inputmode: 'numeric', maxlength: d.len,
    placeholder: d.ph, 'aria-label': d.label, autocomplete: 'off', spellcheck: 'false',
  }));
  parts.forEach((p, i) => {
    const d = defs[i];
    p.addEventListener('input', () => {
      if (d.month && /[a-z]/i.test(p.value)) {
        const k = MONTHS.indexOf(p.value.slice(0, 3).toLowerCase());
        p.value = k > -1 ? pad(k + 1) : '';
      } else p.value = p.value.replace(/\D/g, '');
      if (p.value.length >= d.len && parts[i + 1]) parts[i + 1].focus();
      onChange();
    });
    p.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !p.value && i > 0) { e.preventDefault(); parts[i - 1].focus(); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        let v = Number(p.value || d.start) + (e.key === 'ArrowUp' ? 1 : -1);
        if (v > d.hi) v = d.lo; if (v < d.lo) v = d.hi;
        p.value = pad(v, d.len); onChange();
      }
    });
    p.addEventListener('blur', () => { if (d.len === 2 && p.value.length === 1) p.value = pad(p.value); onChange(); });
  });
  return parts;
}

/**
 * birthForm({ api, sample, id, label, compact })
 *   .el, .read() → payload for parseBirthInput or null, .valid(), .set(sample)
 */
export function birthForm({ api, sample, label, signal, onSubmit }) {
  // date
  const echo = h('span', { class: 'sx-echo', 'aria-live': 'polite' });
  const dateBox = h('div', { class: 'sx-field sx-date' });
  const [d, m, y] = segments([
    { cls: 'd', len: 2, ph: 'dd', label: 'day of birth', lo: 1, hi: 31, start: 1 },
    { cls: 'm', len: 2, ph: 'mm', label: 'month of birth', lo: 1, hi: 12, start: 1, month: true },
    { cls: 'y', len: 4, ph: 'yyyy', label: 'year of birth', lo: 1900, hi: 2026, start: 1990 },
  ], () => check());
  dateBox.append(d, h('span', { class: 'sx-sep', 'aria-hidden': 'true' }, '/'), m, h('span', { class: 'sx-sep', 'aria-hidden': 'true' }, '/'), y);

  // time
  const timeBox = h('div', { class: 'sx-field sx-time' });
  const [hh, mm] = segments([
    { cls: 'h', len: 2, ph: 'hh', label: 'hour of birth, 24 hour clock', lo: 0, hi: 23, start: 12 },
    { cls: 'mi', len: 2, ph: 'mm', label: 'minute of birth', lo: 0, hi: 59, start: 0 },
  ], () => check());
  timeBox.append(hh, h('span', { class: 'sx-sep', 'aria-hidden': 'true' }, ':'), mm);
  const unknown = h('input', { type: 'checkbox', class: 'sx-check' });
  const unknownLab = h('label', { class: 'sx-unknown' }, unknown, h('span', null, 'i don’t know the time'));
  unknown.addEventListener('change', () => { timeBox.classList.toggle('is-off', unknown.checked); hh.disabled = mm.disabled = unknown.checked; check(); });

  // place
  const place = h('input', { class: 'sx-place-in', type: 'text', placeholder: 'town or city', 'aria-label': 'place of birth', autocomplete: 'off', spellcheck: 'false', role: 'combobox', 'aria-autocomplete': 'list', 'aria-expanded': 'false' });
  const list = h('div', { class: 'sx-sugg', role: 'listbox', hidden: true });
  const placeBox = h('div', { class: 'sx-field sx-place' }, place, list);
  let items = [], cursor = -1, timer = 0;
  const close = () => { list.hidden = true; list.textContent = ''; items = []; cursor = -1; place.setAttribute('aria-expanded', 'false'); };
  const choose = (p) => { place.value = p.label; Object.assign(place.dataset, { lat: p.lat, lon: p.lon, tz: p.tz || '' }); close(); check(); };
  const render = () => {
    list.textContent = '';
    items.forEach((p, i) => list.appendChild(h('button', { type: 'button', role: 'option', 'aria-selected': String(i === cursor), onpointerdown: (e) => { e.preventDefault(); choose(p); } }, p.label)));
    list.hidden = !items.length; place.setAttribute('aria-expanded', String(!!items.length));
  };
  place.addEventListener('input', () => {
    delete place.dataset.lat; delete place.dataset.lon; delete place.dataset.tz;
    const q = place.value.trim(); clearTimeout(timer); check();
    if (q.length < 2) return close();
    timer = setTimeout(async () => { items = await places(api, q, signal); cursor = -1; if (document.activeElement === place) render(); }, 200);
  });
  place.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (list.hidden || cursor < 0)) { e.preventDefault(); close(); onSubmit && onSubmit(); return; }
    if (list.hidden || !items.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); cursor = (cursor + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length; render(); }
    else if (e.key === 'Enter') { e.preventDefault(); choose(items[cursor]); }
    else if (e.key === 'Escape') close();
  });
  place.addEventListener('blur', () => setTimeout(close, 150));

  const el = h('fieldset', { class: 'sx-birth' },
    label ? h('legend', { class: 'sx-legend' }, label) : null,
    h('label', { class: 'sx-f' }, h('span', { class: 'sx-lab' }, 'date', echo), dateBox),
    h('div', { class: 'sx-f' }, h('span', { class: 'sx-lab' }, 'time'), h('div', { class: 'sx-timerow' }, timeBox, unknownLab)),
    h('label', { class: 'sx-f sx-f-place' }, h('span', { class: 'sx-lab' }, 'place'), placeBox),
  );
  el.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target !== place) { e.preventDefault(); onSubmit && onSubmit(); } });

  function dateISO() {
    const dd = Number(d.value), mo = Number(m.value), yy = Number(y.value);
    const ok = d.value && m.value && y.value.length === 4 && mo >= 1 && mo <= 12 && yy >= 1900 && yy <= 2026 && dd >= 1 && dd <= daysIn(yy, mo);
    return ok ? `${yy}-${pad(mo)}-${pad(dd)}` : null;
  }
  function timeStr() {
    if (unknown.checked) return null;
    const a = Number(hh.value), b = Number(mm.value);
    return hh.value !== '' && mm.value !== '' && a <= 23 && b <= 59 ? `${pad(a)}:${pad(b)}` : null;
  }
  function check() {
    const iso = dateISO();
    dateBox.classList.toggle('is-bad', y.value.length === 4 && !iso);
    echo.textContent = iso ? ' · ' + Number(d.value) + ' ' + MONTHS[Number(m.value) - 1] + ' ' + y.value : '';
    el.classList.toggle('is-ready', valid());
  }
  function valid() { return !!dateISO() && (unknown.checked || !!timeStr()) && place.value.trim().length > 1; }

  function read() {
    if (!valid()) return null;
    const t = timeStr();
    const out = { date: dateISO(), time: t, timeKnown: !!t };
    if (place.dataset.lat && place.dataset.lon) {
      out.lat = Number(place.dataset.lat); out.lon = Number(place.dataset.lon); out.placeLabel = place.value;
      if (place.dataset.tz) out.tz = place.dataset.tz;
    } else out.place = place.value.trim();
    return out;
  }
  function set(b) {
    const [yy, mo, dd] = b.date.split('-');
    d.value = dd; m.value = mo; y.value = yy;
    unknown.checked = !b.time; timeBox.classList.toggle('is-off', !b.time); hh.disabled = mm.disabled = !b.time;
    if (b.time) { const [a, c] = b.time.split(':'); hh.value = a; mm.value = c; } else { hh.value = mm.value = ''; }
    place.value = b.placeLabel || b.place || '';
    delete place.dataset.lat; delete place.dataset.lon; delete place.dataset.tz;
    if (b.lat != null) Object.assign(place.dataset, { lat: b.lat, lon: b.lon, tz: b.tz || '' });
    check();
  }
  /** A short line describing the input, for status labels. */
  function describe(b = read()) {
    if (!b) return '';
    const [yy, mo, dd] = b.date.split('-');
    return `${Number(dd)} ${MONTHS[Number(mo) - 1]} ${yy}, ${b.time || 'time unknown'}, ${(b.placeLabel || b.place || '').split(',')[0].toLowerCase()}`;
  }
  if (sample) set(sample);
  return { el, read, set, valid, describe };
}

export const SAMPLE_A = { date: '1990-05-12', time: '14:30', timeKnown: true, lat: 18.51957, lon: 73.85535, placeLabel: 'Pune, Maharashtra, India', tz: 'Asia/Kolkata' };
export const SAMPLE_B = { date: '1992-08-03', time: '07:15', timeKnown: true, lat: 19.07283, lon: 72.88261, placeLabel: 'Mumbai, Maharashtra, India', tz: 'Asia/Kolkata' };
export const describeBirth = (b) => {
  const [yy, mo, dd] = b.date.split('-');
  return `${Number(dd)} ${MONTHS[Number(mo) - 1]} ${yy}, ${b.time || 'time unknown'}, ${(b.placeLabel || b.place || '').split(',')[0].toLowerCase()}`;
};
