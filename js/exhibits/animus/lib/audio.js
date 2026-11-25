// Animus's own sounds, played through the portfolio's audio context so the
// visitor's sound choice is respected. Nothing plays unless ctx.sound.on.
//
// clear(): web/src/lib/sound.js, ported. A felt mallet on a wooden key at E5: a
// breath of noise for the contact, a sine body that settles from a hair sharp, one
// inharmonic overtone that dies first, all under a low-pass. Bigger moments add a
// quieter major third, the biggest a faint bell. Pitch never climbs with a streak.
//
// sfx(): the marketing site's small interface sounds (site/index.html).

const NOTE = 659.25;
const THIRD = NOTE * 1.26;

export function makeAudio(sound) {
  let noiseBuf = null;
  let siteNoise = null;
  let siteBus = null;

  const live = () => (sound && sound.on && sound.ctx ? sound.ctx : null);
  const dest = (ac) => sound.master || ac.destination;

  function out(ac, at, level) {
    const master = ac.createGain();
    master.gain.setValueAtTime(level, at);
    const soft = ac.createBiquadFilter();
    soft.type = 'lowpass';
    soft.frequency.setValueAtTime(3800, at);
    soft.Q.setValueAtTime(0.4, at);
    master.connect(soft).connect(dest(ac));
    return master;
  }

  function contact(ac) {
    if (noiseBuf && noiseBuf.sampleRate === ac.sampleRate) return noiseBuf;
    const length = Math.floor(ac.sampleRate * 0.03);
    noiseBuf = ac.createBuffer(1, length, ac.sampleRate);
    const data = noiseBuf.getChannelData(0);
    let x = 0x2545f491;
    for (let i = 0; i < length; i++) {
      x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
      data[i] = ((x >>> 0) / 0xffffffff) * 2 - 1;
    }
    return noiseBuf;
  }

  function tap(ac, delay, freq, { level = 0.09, ring = 0.13 } = {}) {
    const at = ac.currentTime + delay;
    const bus = out(ac, at, level);

    const click = ac.createBufferSource();
    click.buffer = contact(ac);
    const band = ac.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.setValueAtTime(freq * 3, at);
    band.Q.setValueAtTime(1.2, at);
    const clickEnv = ac.createGain();
    clickEnv.gain.setValueAtTime(0.0001, at);
    clickEnv.gain.exponentialRampToValueAtTime(0.35, at + 0.002);
    clickEnv.gain.exponentialRampToValueAtTime(0.0001, at + 0.014);
    click.connect(band).connect(clickEnv).connect(bus);
    click.start(at);
    click.stop(at + 0.03);

    const body = ac.createOscillator();
    body.type = 'sine';
    body.frequency.setValueAtTime(freq * 1.012, at);
    body.frequency.exponentialRampToValueAtTime(freq, at + 0.03);
    const bodyEnv = ac.createGain();
    bodyEnv.gain.setValueAtTime(0.0001, at);
    bodyEnv.gain.exponentialRampToValueAtTime(1, at + 0.004);
    bodyEnv.gain.exponentialRampToValueAtTime(0.0001, at + ring);
    body.connect(bodyEnv).connect(bus);
    body.start(at);
    body.stop(at + ring + 0.02);

    const wood = ac.createOscillator();
    wood.type = 'sine';
    wood.frequency.setValueAtTime(freq * 3.93, at);
    const woodEnv = ac.createGain();
    woodEnv.gain.setValueAtTime(0.0001, at);
    woodEnv.gain.exponentialRampToValueAtTime(0.18, at + 0.003);
    woodEnv.gain.exponentialRampToValueAtTime(0.0001, at + ring * 0.35);
    wood.connect(woodEnv).connect(bus);
    wood.start(at);
    wood.stop(at + ring);
  }

  function bloom(ac, delay) {
    const at = ac.currentTime + delay;
    const bus = out(ac, at, 0.022);
    [2, 3.01].forEach((m, i) => {
      const osc = ac.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(NOTE * m, at);
      const env = ac.createGain();
      env.gain.setValueAtTime(0.0001, at);
      env.gain.exponentialRampToValueAtTime(i ? 0.5 : 1, at + 0.03);
      env.gain.exponentialRampToValueAtTime(0.0001, at + 0.7);
      osc.connect(env).connect(bus);
      osc.start(at);
      osc.stop(at + 0.75);
    });
  }

  function clear(tier = 'small') {
    const ac = live();
    if (!ac) return;
    try {
      if (tier === 'huge') {
        tap(ac, 0, NOTE, { level: 0.09, ring: 0.16 });
        tap(ac, 0.07, THIRD, { level: 0.065, ring: 0.2 });
        bloom(ac, 0.1);
      } else if (tier === 'big') {
        tap(ac, 0, NOTE, { level: 0.09, ring: 0.14 });
        tap(ac, 0.07, THIRD, { level: 0.06, ring: 0.17 });
      } else {
        tap(ac, 0, NOTE, { level: 0.09, ring: 0.12 });
      }
    } catch { /* a sound never gets between someone and their clear */ }
  }

  // ------------------------------------------------------------ the site's sfx
  function site(ac) {
    if (!siteBus || siteBus.context !== ac) {
      siteBus = ac.createGain();
      siteBus.gain.value = 0.36;
      siteBus.connect(dest(ac));
      const n = Math.floor(ac.sampleRate * 0.5);
      siteNoise = ac.createBuffer(1, n, ac.sampleRate);
      const d = siteNoise.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    }
    return siteBus;
  }
  function noise(ac, dur, f0, f1, peak, q, type) {
    const bus = site(ac);
    const t = ac.currentTime;
    const s = ac.createBufferSource();
    s.buffer = siteNoise;
    s.playbackRate.value = 0.85 + Math.random() * 0.3;
    const f = ac.createBiquadFilter();
    f.type = type || 'bandpass';
    f.Q.value = q || 1;
    f.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f).connect(g).connect(bus);
    s.start(t);
    s.stop(t + dur + 0.05);
  }
  function tone(ac, freq, dur, peak, type) {
    const bus = site(ac);
    const t = ac.currentTime;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(bus);
    o.start(t);
    o.stop(t + dur + 0.05);
  }
  const SFX = {
    tap: (ac) => noise(ac, 0.02, 2500, 1200, 0.045, 1.2),
    key: (ac) => noise(ac, 0.01, 3200, 1800, 0.014, 1.2),
    whoosh: (ac) => noise(ac, 0.17, 900, 2400, 0.045, 0.8),
    land: (ac) => { noise(ac, 0.05, 2600, 700, 0.07, 1.1); tone(ac, 150, 0.07, 0.03); },
    reply: (ac) => { noise(ac, 0.04, 1800, 900, 0.05, 1.2); tone(ac, 210, 0.09, 0.035); },
    open: (ac) => noise(ac, 0.07, 700, 1700, 0.035, 0.9),
    shut: (ac) => noise(ac, 0.06, 1500, 600, 0.03, 0.9),
    nope: (ac) => tone(ac, 90, 0.16, 0.055, 'triangle'),
    buzz: (ac) => { tone(ac, 48, 0.1, 0.09, 'triangle'); setTimeout(() => { if (live()) tone(ac, 56, 0.09, 0.06, 'triangle'); }, 95); },
    tick: (ac) => noise(ac, 0.012, 2200, 1500, 0.02, 1.4),
  };
  function sfx(k) {
    const ac = live();
    if (!ac || !SFX[k]) return;
    try { SFX[k](ac); } catch { /* decoration */ }
  }

  return { clear, sfx };
}
