// Shared pieces of interface: the status line, the waiting state, and the
// one flow every live exhibit runs (call, wait, show live or fall back).
import { h } from './dom.js';
import { call, warmState } from './api.js';

/** A mono status line with a square mark. States: saved, wait, live, fail. */
export function statusLine(cls = '') {
  const mark = h('i', { class: 'sx-st-mark', 'aria-hidden': 'true' });
  const text = h('span', { class: 'sx-st-text' });
  const extra = h('span', { class: 'sx-st-extra' });
  const el = h('p', { class: 'sx-status ' + cls, 'data-st': 'saved', role: 'status' }, mark, text, extra);
  return {
    el,
    set(state, t, action) {
      el.dataset.st = state;
      text.textContent = t;
      extra.textContent = '';
      if (action) extra.appendChild(h('button', { type: 'button', class: 'sx-link', onclick: action.fn }, action.label));
    },
  };
}

/**
 * The designed waiting state. It appears only if the call is slow (so a warm
 * server never flashes it), counts real seconds, and fills a hairline over
 * the 50 seconds a cold start can take.
 */
export function waiter(host, { onSkip, reduce } = {}) {
  const secs = h('b', { class: 'sx-w-secs' }, '0');
  const fill = h('i', { class: 'sx-w-fill' });
  const title = h('p', { class: 'sx-w-title' }, 'waking the server up');
  const note = h('p', { class: 'sx-w-note' }, 'shastra runs on a free server that sleeps when nobody is using it. the first answer can take 20 to 50 seconds. every answer after that is instant.');
  const skip = h('button', { type: 'button', class: 'sx-btn sx-btn-ghost', onclick: () => onSkip && onSkip() }, 'show the saved result');
  const el = h('div', { class: 'sx-wait', hidden: true, 'aria-live': 'polite' },
    h('div', { class: 'sx-w-box' },
      h('p', { class: 'sx-w-label' }, 'live call', h('span', null, ' · '), secs, h('span', null, ' s')),
      title,
      h('div', { class: 'sx-w-track' }, fill),
      note,
      skip));
  host.appendChild(el);
  let t0 = 0, raf = 0, showT = 0;
  const frame = () => {
    const s = (performance.now() - t0) / 1000;
    secs.textContent = String(Math.floor(s));
    // linear to 50s, then creeps toward the end without ever claiming done
    const p = s < 50 ? s / 50 * 0.92 : 0.92 + 0.08 * (1 - Math.exp(-(s - 50) / 30));
    fill.style.transform = `scaleX(${p.toFixed(4)})`;
    raf = requestAnimationFrame(frame);
  };
  return {
    el,
    start(cold) {
      t0 = performance.now();
      title.textContent = cold ? 'waking the server up' : 'computing';
      note.hidden = !cold;
      clearTimeout(showT);
      showT = setTimeout(() => { el.hidden = false; cancelAnimationFrame(raf); frame(); }, cold ? 250 : 900);
    },
    stop() { clearTimeout(showT); cancelAnimationFrame(raf); el.hidden = true; },
    destroy() { clearTimeout(showT); cancelAnimationFrame(raf); el.remove(); },
  };
}

/**
 * Run one live call with the waiting state and the fallback.
 *   onData(data, 'live' | 'saved', info)
 */
export function runLive(args) {
  const { api, path, body, wait, status, saved, onData, bag, savedText, liveText } = args;
  const ctrl = new AbortController();
  bag?.add(() => ctrl.abort());
  const cold = warmState(api) !== 'warm';
  const t0 = performance.now();
  let settled = false;
  status?.set('wait', cold ? 'waking the server up' : 'computing');
  wait?.start(cold);
  const skip = () => {
    if (settled) return;
    settled = true; ctrl.abort(); wait?.stop();
    status?.set('saved', savedText || 'saved result', { label: 'try live again', fn: () => runLive(args) });
    onData(saved, 'saved', { skipped: true });
  };
  if (wait) wait.skipFn = skip;
  const p = call(api, path, { body, signal: ctrl.signal })
    .then((data) => {
      if (settled) return;
      settled = true; wait?.stop();
      const ms = Math.round(performance.now() - t0);
      status?.set('live', (liveText ? liveText(data, ms) : 'live') );
      onData(data, 'live', { ms });
    })
    .catch((err) => {
      if (settled || err.kind === 'cancelled') return;
      settled = true; wait?.stop();
      const why = err.kind === 'bad' ? err.message : err.kind === 'rate' ? 'the server asked us to slow down' : 'the live server did not answer';
      status?.set('fail', (savedText || 'saved result') + ' · ' + why, { label: 'try again', fn: () => runLive(args) });
      onData(saved, 'saved', { error: err });
    });
  return { skip, promise: p };
}
