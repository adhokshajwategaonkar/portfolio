// Every sound on the site is synthesised here, at the moment it plays. Nothing is a file.
// Exhibits get `soundFor()`: the same context and master bus, so the visitor's choice of
// sound on or off reaches the Animus felt mallet too.

const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
};

export const S = { ctx: null, out: null, buf: null, on: store.get('aw.snd') !== 'off', armed: false, lastHover: 0 };

function ctx() {
  if (!S.on || !S.armed) return null;
  try {
    if (!S.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      S.ctx = new AC();
      S.out = S.ctx.createGain();
      S.out.gain.value = 0.34;
      const comp = S.ctx.createDynamicsCompressor();
      comp.threshold.value = -18; comp.ratio.value = 4;
      S.out.connect(comp); comp.connect(S.ctx.destination);
      const n = Math.floor(S.ctx.sampleRate * 0.6);
      S.buf = S.ctx.createBuffer(1, n, S.ctx.sampleRate);
      const d = S.buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    }
    if (S.ctx.state !== 'running') S.ctx.resume();
    return S.ctx;
  } catch (e) { return null; }
}

function noise(c, t, o) {
  const s = c.createBufferSource(); s.buffer = S.buf;
  const f = c.createBiquadFilter(); f.type = o.type || 'bandpass'; f.frequency.value = o.f; f.Q.value = o.q || 1;
  const g = c.createGain(); g.gain.setValueAtTime(o.a ? 0.0006 : o.g, t);
  if (o.a) g.gain.exponentialRampToValueAtTime(o.g, t + o.a);
  g.gain.exponentialRampToValueAtTime(0.0006, t + (o.a || 0) + o.dur);
  s.connect(f); f.connect(g); g.connect(S.out);
  s.start(t, Math.random() * 0.4); s.stop(t + (o.a || 0) + o.dur + 0.03);
}
function tone(c, t, o) {
  const os = c.createOscillator(); os.type = o.type || 'triangle';
  os.frequency.setValueAtTime(o.f, t); os.frequency.exponentialRampToValueAtTime(o.f2 || o.f, t + o.dur);
  const g = c.createGain();
  if (o.a) { g.gain.setValueAtTime(0.0006, t); g.gain.exponentialRampToValueAtTime(o.g, t + o.a); }
  else g.gain.setValueAtTime(o.g, t);
  g.gain.exponentialRampToValueAtTime(0.0006, t + (o.a || 0) + o.dur);
  let node = g;
  if (o.lp) { const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = o.lp; g.connect(f); node = f; }
  os.connect(g); node.connect(S.out); os.start(t); os.stop(t + (o.a || 0) + o.dur + 0.03);
}
const jit = () => 0.93 + Math.random() * 0.14;

// The set is small on purpose. A sound marks something that changed state: a selection,
// a tile opening, the dial crossing a sign, the email landing on the clipboard. Hovering,
// scrolling, paging and moving between pages are silent.
const off = () => {};
export const sfx = {
  // every click, once for the whole page (see cursor.js): a crisp click as the button
  // goes down and a softer, lower one as it comes back up, like a real switch
  tap() {
    const c = ctx(); if (!c) return; const t = c.currentTime, k = jit();
    noise(c, t, { f: 3100 * k, q: 2.4, g: 0.13, dur: 0.006 });
    tone(c, t + 0.001, { f: 330 * k, f2: 210 * k, g: 0.045, dur: 0.022, type: 'sine' });
  },
  untap() {
    const c = ctx(); if (!c) return; const t = c.currentTime, k = jit();
    noise(c, t, { f: 2100 * k, q: 2, g: 0.06, dur: 0.005 });
    tone(c, t + 0.001, { f: 190 * k, f2: 150 * k, g: 0.022, dur: 0.02, type: 'sine' });
  },
  down: off,
  up: off,
  tick(h) { const c = ctx(); if (!c) return; noise(c, c.currentTime, { f: 4400 * (h || 1), q: 3.5, g: 0.07, dur: 0.007 }); },
  // a selection settling into place
  detent() {
    const c = ctx(); if (!c) return; const t = c.currentTime;
    noise(c, t, { f: 1800, q: 2, g: 0.16, dur: 0.011 });
    tone(c, t, { f: 400, f2: 300, g: 0.05, dur: 0.04, type: 'sine' });
  },
  latch() { sfx.detent(); },
  // two soft notes, only for "copied"
  ok() {
    const c = ctx(); if (!c) return; const t = c.currentTime;
    tone(c, t, { f: 880, f2: 880, g: 0.035, dur: 0.11, type: 'sine' });
    tone(c, t + 0.07, { f: 1318, f2: 1318, g: 0.03, dur: 0.15, type: 'sine' });
  },
  // a short low buzz, for the one place a save is made to fail on purpose
  err() {
    const c = ctx(); if (!c) return; const t = c.currentTime;
    tone(c, t, { f: 180, f2: 170, g: 0.04, dur: 0.08, type: 'square', lp: 900 });
  },
  hover: off, page: off, enter: off, leave: off, ping: off,
};

export function arm() { S.armed = true; }
function unlock() {
  arm(); const c = ctx(); if (!c) return;
  try { const b = c.createBuffer(1, 1, 22050), src = c.createBufferSource(); src.buffer = b; src.connect(c.destination); src.start(0); } catch (e) {}
}
['pointerdown', 'keydown', 'touchend', 'click'].forEach(t => addEventListener(t, unlock, { capture: true, passive: true }));

export function setSound(on) { S.on = on; store.set('aw.snd', on ? 'on' : 'off'); if (on) { S.armed = true; sfx.detent(); } }

// What the product exhibits expect: { on, ctx, master }.
export const soundFor = {
  get on() { return S.on && S.armed; },
  get ctx() { return ctx(); },
  get master() { ctx(); return S.out; },
};
