// Drawings that explain each job, on a loop. They are illustrations made in the browser,
// not real imagery or real traffic, and they are silent.

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = ms => new Promise(r => setTimeout(r, ms));

function runner(root, tick) {
  // runs only while visible; exposes hover for sound
  let on = false, raf = 0, hover = false, t0 = performance.now(), paused = 0;
  const io = new IntersectionObserver(es => { const v = es[0].isIntersecting; if (v && !on) { on = true; t0 = performance.now() - paused; loop(); } else if (!v && on) { on = false; paused = performance.now() - t0; cancelAnimationFrame(raf); } }, { threshold: 0.15 });
  io.observe(root);
  root.addEventListener('pointerenter', () => hover = true);
  root.addEventListener('pointerleave', () => hover = false);
  function loop() { if (!on) return; tick((performance.now() - t0) / 1000, () => hover); raf = requestAnimationFrame(loop); }
  return { destroy() { on = false; io.disconnect(); cancelAnimationFrame(raf); } };
}
function rng(s) { return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));

/* ================================================================ GalaxEye: SAR under canopy */
function mountSAR(root) {
  root.classList.add('an', 'an-sar');
  root.innerHTML = `<canvas aria-label="A drawing: a tank hidden under forest canopy. The optical view shows only trees. A radar pass reveals the metal underneath and marks it."></canvas>
    <div class="an-hud"><span class="mode">optical</span><span class="pass">drone sar · pass 03</span></div>
    <div class="an-cap"><span class="c1">A camera sees the canopy.</span></div>`;
  const cv = root.querySelector('canvas'), cx = cv.getContext('2d'), modeEl = root.querySelector('.mode'), cap = root.querySelector('.c1');
  let W = 0, H = 0, A = null, B = null, tank = null, last = -1, pinged = false, stage = '';
  function build() {
    const dpr = Math.min(2, devicePixelRatio || 1);
    const w = root.clientWidth, h = root.clientHeight; if (!w || !h) return false;
    if (w === W && h === H && A) return true;
    W = w; H = h; cv.width = w * dpr; cv.height = h * dpr; cv.style.width = w + 'px'; cv.style.height = h + 'px';
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const mk = () => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
    A = mk(); B = mk();
    const a = A.getContext('2d'), b = B.getContext('2d');
    tank = { x: w * 0.56, y: h * 0.56, r: -0.32, L: Math.min(w, h) * 0.2, Wd: Math.min(w, h) * 0.11 };
    // ground
    a.fillStyle = '#34401f'; a.fillRect(0, 0, w, h);
    b.fillStyle = '#161616'; b.fillRect(0, 0, w, h);
    const r = rng(11);
    for (let i = 0; i < 90; i++) { a.fillStyle = `rgba(${70 + r() * 30},${72 + r() * 25},${40 + r() * 20},.45)`; a.beginPath(); a.ellipse(r() * w, r() * h, 20 + r() * 60, 12 + r() * 30, r() * 3, 0, 7); a.fill(); }
    // the track the tank came in on: bare earth to a camera, a dark smooth return to radar
    const track = c => { c.beginPath(); c.moveTo(-10, h * 0.86); c.bezierCurveTo(w * 0.25, h * 0.8, w * 0.35, h * 0.62, tank.x, tank.y); };
    a.strokeStyle = 'rgba(120,104,70,.6)'; a.lineWidth = 8; track(a); a.stroke();
    b.strokeStyle = 'rgba(6,6,6,.9)'; b.lineWidth = 8; track(b); b.stroke();
    // the tank, drawn on both
    const drawTank = (c, body, turret, gun) => {
      c.save(); c.translate(tank.x, tank.y); c.rotate(tank.r);
      c.fillStyle = body; c.fillRect(-tank.L / 2, -tank.Wd / 2, tank.L, tank.Wd);
      c.fillStyle = turret; c.beginPath(); c.arc(-tank.L * 0.05, 0, tank.Wd * 0.34, 0, 7); c.fill();
      c.strokeStyle = gun; c.lineWidth = Math.max(2, tank.Wd * 0.1); c.beginPath(); c.moveTo(0, 0); c.lineTo(tank.L * 0.62, 0); c.stroke();
      c.restore();
    };
    drawTank(a, '#4a4f38', '#3e432f', '#3a3e2c');
    // canopy: clusters of leaves, tight enough that nothing below shows to a camera
    const r2 = rng(5);
    const crowns = [];
    const n = Math.round(w * h / 420);
    for (let i = 0; i < n; i++) crowns.push([r2() * (w + 40) - 20, r2() * (h + 40) - 20, 9 + r2() * 14, r2()]);
    for (let i = 0; i < 90; i++) crowns.push([tank.x + (r2() - 0.5) * tank.L * 1.8, tank.y + (r2() - 0.5) * tank.L * 1.3, 10 + r2() * 10, r2()]);
    const greens = [[58, 82, 38], [72, 96, 44], [50, 72, 34], [86, 104, 52], [64, 88, 48], [44, 64, 32]];
    crowns.forEach(([x, y, s, k0]) => {
      const [R, G, B] = greens[Math.floor(k0 * greens.length)];
      a.fillStyle = 'rgba(14,22,10,.42)'; a.beginPath(); a.arc(x + s * 0.22, y + s * 0.26, s * 0.95, 0, 7); a.fill();
      const m = 4 + Math.floor(r2() * 3);
      for (let j = 0; j < m; j++) {
        const ang = r2() * 6.28, d = r2() * s * 0.45, rr = s * (0.42 + r2() * 0.3);
        const px = x + Math.cos(ang) * d, py = y + Math.sin(ang) * d, v = 0.88 + r2() * 0.24;
        a.fillStyle = `rgb(${Math.round(R * v)},${Math.round(G * v)},${Math.round(B * v)})`; a.beginPath(); a.arc(px, py, rr, 0, 7); a.fill();
        a.fillStyle = 'rgba(190,210,140,.07)'; a.beginPath(); a.arc(px - rr * 0.3, py - rr * 0.3, rr * 0.55, 0, 7); a.fill();
      }
      // radar sees the crowns only as a faint volume
      b.fillStyle = `rgba(150,150,150,${0.05 + k0 * 0.06})`; b.beginPath(); b.arc(x, y, s, 0, 7); b.fill();
    });
    // a grain over the optical image, like an aerial photograph
    const ia = a.getImageData(0, 0, w, h), da = ia.data, r4 = rng(17);
    for (let p = 0; p < da.length; p += 4) { const nn = (r4() - 0.5) * 18; da[p] += nn; da[p + 1] += nn; da[p + 2] += nn * 0.8; }
    a.putImageData(ia, 0, 0);
    // radar: the hull and turret come back bright, corners brightest (double bounce)
    drawTank(b, '#bdbdbd', '#e8e8e8', '#d0d0d0');
    b.save(); b.translate(tank.x, tank.y); b.rotate(tank.r);
    [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5], [-0.05, -0.34], [-0.05, 0.34]].forEach(([u, v]) => {
      const px = u * tank.L, py = v * tank.Wd;
      b.fillStyle = '#fff'; b.beginPath(); b.arc(px, py, 2.6, 0, 7); b.fill();
      b.strokeStyle = 'rgba(255,255,255,.4)'; b.lineWidth = 1; b.beginPath(); b.moveTo(px - tank.Wd * 0.9, py); b.lineTo(px + tank.Wd * 0.9, py); b.moveTo(px, py - tank.Wd * 0.7); b.lineTo(px, py + tank.Wd * 0.7); b.stroke();
    });
    b.restore();
    // speckle, averaged over four looks so it reads as texture and not static
    const id = b.getImageData(0, 0, w, h), d = id.data, r3 = rng(99);
    const L = () => -Math.log(1 - r3() * 0.999);
    for (let p = 0; p < d.length; p += 4) { const nn = (L() + L() + L() + L()) / 4; const v = Math.min(255, d[p] * nn); d[p] = v * 0.9; d[p + 1] = v; d[p + 2] = v * 0.94; }
    b.putImageData(id, 0, 0);
    return true;
  }
  const CYCLE = 10;
  function frame(t, hovering) {
    if (!build()) return;
    const c = t % CYCLE;
    // sweep goes across 1.4 to 4.6, holds, then pulls back 8.2 to 9.4
    let sx;
    if (c < 1.4) sx = 0;
    else if (c < 4.6) sx = ease((c - 1.4) / 3.2) * W;
    else if (c < 8.2) sx = W;
    else if (c < 9.4) sx = (1 - ease((c - 8.2) / 1.2)) * W;
    else sx = 0;
    cx.clearRect(0, 0, W, H);
    cx.drawImage(A, 0, 0);
    if (sx > 0) {
      cx.save(); cx.beginPath(); cx.rect(0, 0, sx, H); cx.clip(); cx.drawImage(B, 0, 0); cx.restore();
      if (sx < W) {
        const g = cx.createLinearGradient(sx - 40, 0, sx + 2, 0); g.addColorStop(0, 'rgba(126,224,184,0)'); g.addColorStop(1, 'rgba(126,224,184,.5)');
        cx.fillStyle = g; cx.fillRect(sx - 40, 0, 42, H);
        cx.fillStyle = '#7EE0B8'; cx.fillRect(sx - 1, 0, 2, H);
      }
    }
    const crossed = sx >= tank.x;
    // detection
    const dk = clamp((c - 4.9) / 0.6) * (1 - clamp((c - 8.0) / 0.5));
    if (dk > 0) {
      const pad = tank.L * 0.75, bx = tank.x - pad, by = tank.y - pad * 0.72, bw = pad * 2, bh = pad * 1.44;
      const grow = 1 + (1 - ease(clamp((c - 4.9) / 0.5))) * 0.4;
      cx.save(); cx.globalAlpha = dk; cx.strokeStyle = '#7EE0B8'; cx.lineWidth = 2;
      cx.translate(tank.x, tank.y); cx.scale(grow, grow); cx.translate(-tank.x, -tank.y);
      const L = 14;
      [[bx, by, 1, 1], [bx + bw, by, -1, 1], [bx, by + bh, 1, -1], [bx + bw, by + bh, -1, -1]].forEach(([x, y, u, v]) => { cx.beginPath(); cx.moveTo(x + u * L, y); cx.lineTo(x, y); cx.lineTo(x, y + v * L); cx.stroke(); });
      cx.restore();
      cx.save(); cx.globalAlpha = dk;
      const right = bx + bw + 230 < W, lx = right ? bx + bw + 16 : Math.max(8, bx - 228), ly = Math.max(50, by - 52);
      cx.strokeStyle = 'rgba(126,224,184,.7)'; cx.lineWidth = 1; cx.beginPath(); cx.moveTo(right ? bx + bw : bx, by); cx.lineTo(right ? lx : lx + 212, ly + 46); cx.stroke();
      cx.fillStyle = 'rgba(8,14,12,.86)'; cx.fillRect(lx, ly, 212, 46);
      cx.fillStyle = '#7EE0B8'; cx.font = '500 11px "JetBrains Mono", ui-monospace, monospace';
      cx.fillText('METAL OBJECT · VEHICLE-SIZED', lx + 9, ly + 18);
      cx.fillStyle = 'rgba(220,235,228,.8)'; cx.fillText('under canopy · flag for review', lx + 9, ly + 35);
      cx.restore();
      // pulse ring
      const pr = ((c - 4.9) % 1.2) / 1.2;
      cx.save(); cx.globalAlpha = dk * (1 - pr) * 0.7; cx.strokeStyle = '#7EE0B8'; cx.beginPath(); cx.arc(tank.x, tank.y, tank.L * (0.3 + pr * 0.6), 0, 7); cx.stroke(); cx.restore();
    }
    const st = c < 1.4 ? 'opt' : c < 4.9 ? 'scan' : c < 8.2 ? 'found' : 'back';
    if (st !== stage) {
      stage = st;
      modeEl.textContent = { opt: 'optical', scan: 'radar pass', found: 'radar · detection', back: 'optical' }[st];
      root.dataset.st = st;
      cap.textContent = { opt: 'A camera sees the canopy.', scan: 'Radar passes through leaves. Metal echoes back hard.', found: 'Something vehicle-sized is under the trees.', back: 'Same patch, seen by a camera again.' }[st];
    }
  }
  const run = runner(root, (t, h) => reduce ? frame(6, h) : frame(t, h));
  const onR = () => { W = 0; };
  addEventListener('resize', onR);
  return { destroy() { run.destroy(); removeEventListener('resize', onR); } };
}

/* ================================================================ Beacon: the gateway */
const PROV = ['OpenAI', 'Anthropic', 'Gemini', 'Grok'];
// each scenario is a list of attempts: [provider, code, class]
const SCEN = [
  { ask: 'summarise this contract', tries: [[0, 200]] },
  { ask: 'draft a reply to the client', tries: [[0, 429, 'rate limited · retry after backoff'], [0, 200]] },
  { ask: 'classify 40 tickets', tries: [[1, 503, 'provider down · switch'], [2, 200]] },
  { ask: 'plan the onboarding steps', tries: [[2, 'timeout', 'too slow · switch'], [3, 200]] },
  { ask: 'call the billing tool', tries: [[0, 400, 'bad request · fail fast, no retry']] },
  { ask: 'answer from the handbook', tries: [[0, 500, 'server error · retry once'], [0, 500, 'still failing · switch'], [1, 200]] },
];
function mountGateway(root) {
  root.classList.add('an', 'an-gw');
  const Y = [62, 132, 202, 272];
  root.innerHTML = `
    <svg viewBox="0 0 560 330" aria-label="A drawing of the LLM gateway: requests go to one provider, errors are sorted, and the gateway retries or switches to the next provider.">
      <g class="gw-edges">
        <path d="M96 167 H200"/>
        ${Y.map(y => `<path d="M330 167 C 380 167, 380 ${y}, 420 ${y}"/>`).join('')}
      </g>
      <g class="gw-agent"><rect x="20" y="140" width="76" height="54" rx="10"/><text x="58" y="164">agent</text><text class="s" x="58" y="180">request</text></g>
      <g class="gw-gate"><rect x="200" y="112" width="130" height="110" rx="14"/><text x="265" y="138">gateway</text>
        <text class="s rule" x="265" y="160">classify the error</text><text class="s rule" x="265" y="176">retry or switch</text><text class="s rule" x="265" y="192">or fail fast</text></g>
      ${Y.map((y, i) => `<g class="gw-p" data-i="${i}"><rect x="420" y="${y - 22}" width="120" height="44" rx="10"/><circle class="led" cx="440" cy="${y}" r="4.5"/><text x="452" y="${y + 4}">${PROV[i]}</text><text class="code" x="532" y="${y + 4}"></text></g>`).join('')}
      <circle class="pk" r="6" cx="58" cy="167"/>
    </svg>
    <div class="gw-side"><p class="gw-n">one gateway, four providers</p><p class="gw-cls"></p></div>
    <ol class="gw-log" aria-live="off"></ol>`;
  const svg = root.querySelector('svg'), pk = root.querySelector('.pk'), log = root.querySelector('.gw-log'), cls = root.querySelector('.gw-cls');
  const gate = root.querySelector('.gw-gate');
  const provs = [...root.querySelectorAll('.gw-p')];
  let alive = true, vis = false, hover = false, ok = 0, all = 0;
  const io = new IntersectionObserver(es => { vis = es[0].isIntersecting; }, { threshold: 0.15 });
  io.observe(root);
  root.addEventListener('pointerenter', () => hover = true); root.addEventListener('pointerleave', () => hover = false);
  function move(path, ms) {
    return new Promise(res => {
      if (reduce) { const p = path[path.length - 1]; pk.setAttribute('cx', p[0]); pk.setAttribute('cy', p[1]); return res(); }
      const t0 = performance.now();
      const seg = []; let len = 0;
      for (let i = 1; i < path.length; i++) { const l = Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]); seg.push(l); len += l; }
      (function f() {
        const k = ease(clamp((performance.now() - t0) / ms)); let d = k * len, i = 0;
        while (i < seg.length - 1 && d > seg[i]) { d -= seg[i]; i++; }
        const u = seg[i] ? d / seg[i] : 1, a = path[i], b = path[i + 1];
        pk.setAttribute('cx', a[0] + (b[0] - a[0]) * u); pk.setAttribute('cy', a[1] + (b[1] - a[1]) * u);
        if (k < 1 && alive) requestAnimationFrame(f); else res();
      })();
    });
  }
  const curve = y => { const pts = []; for (let i = 0; i <= 12; i++) { const t = i / 12; const x = (1 - t) ** 3 * 330 + 3 * (1 - t) ** 2 * t * 380 + 3 * (1 - t) * t * t * 380 + t ** 3 * 420; const yy = (1 - t) ** 3 * 167 + 3 * (1 - t) ** 2 * t * 167 + 3 * (1 - t) * t * t * y + t ** 3 * y; pts.push([x, yy]); } return pts; };
  function line(txt, kind) {
    const li = document.createElement('li'); li.className = kind || ''; li.textContent = txt; log.prepend(li);
    while (log.children.length > 4) log.lastElementChild.remove();
  }
  async function play() {
    let si = 0;
    while (alive) {
      if (!vis) { await wait(400); continue; }
      const sc = SCEN[si++ % SCEN.length]; all++;
      provs.forEach(p => { p.classList.remove('err', 'ok', 'try'); p.querySelector('.code').textContent = ''; });
      cls.textContent = ''; gate.classList.remove('think', 'bad');
      pk.classList.remove('ret', 'dead'); pk.setAttribute('cx', 58); pk.setAttribute('cy', 167);
      line(`→ ${sc.ask}`, 'ask');
      await move([[58, 167], [265, 167]], 520);
      let done = false;
      for (const [pi, code, why] of sc.tries) {
        if (!alive) return;
        const P = provs[pi], y = Y[pi];
        gate.classList.add('think'); await wait(reduce ? 50 : 260); gate.classList.remove('think');
        P.classList.add('try');
        await move([[265, 167], [330, 167], ...curve(y), [440, y]], 560);
        await wait(reduce ? 50 : 300);
        P.classList.remove('try'); P.querySelector('.code').textContent = code;
        if (code === 200) {
          P.classList.add('ok'); ok++; done = true;
          line(`${PROV[pi]} · 200 · answered${sc.tries.length > 1 ? ` after ${sc.tries.length - 1} ${sc.tries.length === 2 ? 'error' : 'errors'}` : ''}`, 'ok');
          pk.classList.add('ret');
          await move([[440, y], ...curve(y).reverse(), [330, 167], [96, 167], [58, 167]], 900);
          break;
        }
        P.classList.add('err');
        line(`${PROV[pi]} · ${code} · ${why}`, 'err');
        await move([[440, y], ...curve(y).reverse(), [330, 167], [265, 167]], 520);
        cls.textContent = why; gate.classList.add('bad');
        await wait(reduce ? 100 : 700);
        gate.classList.remove('bad');
        if (/fail fast/.test(why)) { pk.classList.add('dead'); await move([[265, 167], [58, 167]], 600); line('the agent is told, with the reason', 'muted'); break; }
      }
      await wait(reduce ? 1600 : 1300);
    }
  }
  play();
  return { destroy() { alive = false; io.disconnect(); } };
}

/* ================================================================ a small timeline
   Each drawing below is a list of steps. `wait` only counts time while the drawing is
   on screen, and stops the loop when the drawing is removed. With reduced motion every
   wait resolves at once, so the drawing lands on its last frame and stays there. */
const STOP = Symbol('stop');
function play(root, seq) {
  let alive = true, vis = false;
  const io = new IntersectionObserver(es => { vis = es[0].isIntersecting; }, { threshold: 0.12 });
  io.observe(root);
  const wait = ms => new Promise((res, rej) => {
    if (!alive) return rej(STOP);
    if (reduce) return res();
    let left = ms, last = performance.now();
    (function tick() {
      if (!alive) return rej(STOP);
      const now = performance.now(); if (vis) left -= now - last; last = now;
      if (left <= 0) return res();
      setTimeout(tick, vis ? Math.min(left, 70) : 240);
    })();
  });
  (async () => { try { do { await seq(wait); await wait(1100); } while (alive && !reduce); } catch (e) { if (e !== STOP) console.error(e); } })();
  return { destroy() { alive = false; io.disconnect(); } };
}
function make(root, cls, label, html) {
  root.classList.add('an', cls); root.setAttribute('role', 'img'); root.setAttribute('aria-label', label);
  root.innerHTML = html;
  const $ = s => root.querySelector(s), $$ = s => [...root.querySelectorAll(s)];
  const step = n => { for (let i = 1; i <= 9; i++) root.classList.toggle('s' + i, i <= n); };
  // a drawn pointer, for the drawings where something gets pressed
  const ptr = $('.an-ptr');
  const pointAt = el => { if (!ptr || !el) return; const a = root.getBoundingClientRect(), b = el.getBoundingClientRect(); ptr.style.opacity = 1; ptr.style.transform = `translate(${b.left - a.left + b.width * 0.6}px, ${b.top - a.top + b.height * 0.62}px)`; };
  const tap = () => { if (!ptr) return; ptr.classList.remove('tap'); void ptr.offsetWidth; ptr.classList.add('tap'); };
  return { $, $$, step, pointAt, tap, ptr };
}
async function count(el, a, b, ms, fmt, wait) {
  const n = Math.max(1, Math.round(ms / 45));
  for (let i = 1; i <= n; i++) { el.textContent = fmt(a + (b - a) * ease(i / n)); await wait(45); }
}

/* ================================================================ Beacon: agent chat */
function mountChat(root) {
  const { $, step, pointAt, tap, ptr } = make(root, 'an-chat', 'A drawing of the agent chat: the answer streams in first, the reasoning opens from the answer, and the tool calls open from the reasoning.', `
    <div class="ch-q"><span>Summarise what changed in this contract</span></div>
    <div class="ch-a">
      <p class="ch-txt"></p>
      <span class="ch-chip r"><i></i>Reasoning<b>3 steps</b></span>
      <ol class="ch-steps">
        <li><span>Read both versions</span></li>
        <li><span>Compare the clauses</span><span class="ch-chip t"><i></i>2 tool calls</span>
          <div class="ch-tools"><p><code>get_document(v3)</code><em>200 · 310 ms</em></p><p><code>diff(v2, v3)</code><em>200 · 95 ms</em></p></div></li>
        <li><span>Write the summary</span></li>
      </ol>
    </div>
    <i class="an-ptr"></i>`);
  const txt = $('.ch-txt'), words = 'Three clauses changed: the payment terms, the notice period and the liability cap.'.split(' ');
  return play(root, async wait => {
    step(0); txt.textContent = ''; ptr.style.opacity = 0;
    await wait(450); step(1);
    await wait(650); step(2);
    for (let i = 0; i < words.length; i++) { txt.textContent = words.slice(0, i + 1).join(' '); await wait(75); }
    step(3); await wait(700);
    pointAt($('.ch-chip.r')); await wait(700); tap(); step(4); await wait(1500);
    pointAt($('.ch-chip.t')); await wait(700); tap(); step(5); await wait(600);
    ptr.style.opacity = 0; await wait(2400);
  });
}

/* ================================================================ Beacon: cost per client */
const COST = [
  ['Client A', 44, [['support', 24, [14, 10]], ['legal', 20, [12, 8]]]],
  ['Client B', 34, [['onboarding', 34, [14, 11, 9]]]],
  ['Client C', 22, [['research', 22, [9, 7, 6]]]],
];
function mountCost(root) {
  let r1 = '', r2 = '', r3 = '';
  COST.forEach(([c, w, ags], i) => {
    r1 += `<span style="flex:${w}" data-p="${i}"><b>${c}</b><em>${w}%</em></span>`;
    ags.forEach(([a, aw, wfs], j) => {
      r2 += `<span style="flex:${aw}" data-p="${i}-${j}"><b>${a}</b></span>`;
      wfs.forEach((ww, k) => { r3 += `<span style="flex:${ww}" data-p="${i}-${j}-${k}"></span>`; });
    });
  });
  const { $, $$, step } = make(root, 'an-cost', 'A drawing of model spend split by client, then by agent, then by workflow, with one workflow traced back to its client.', `
    <p class="an-tag">model spend, this month</p>
    <div class="co-rows">
      <div class="co-row"><i>client</i><div class="co-bar c1">${r1}</div></div>
      <div class="co-row"><i>agent</i><div class="co-bar c2">${r2}</div></div>
      <div class="co-row"><i>workflow</i><div class="co-bar c3">${r3}</div></div>
    </div>
    <p class="co-out"><span class="co-path">&nbsp;</span><b class="co-n"></b></p>`);
  const cells = $$('[data-p]'), path = $('.co-path'), num = $('.co-n');
  const trace = p => {
    root.classList.toggle('trace', !!p);
    cells.forEach(c => c.classList.toggle('hot', !!p && (p === c.dataset.p || p.startsWith(c.dataset.p + '-'))));
    if (!p) { path.innerHTML = '&nbsp;'; num.textContent = ''; return; }
    const [i, j, k] = p.split('-').map(Number), c = COST[i], a = c[2][j];
    path.innerHTML = `${c[0]} <u>›</u> ${a[0]} agent <u>›</u> workflow ${k + 1}`; num.textContent = a[2][k] + '%';
  };
  return play(root, async wait => {
    step(0); trace(null);
    await wait(400); step(1); await wait(700); step(2); await wait(700); step(3); await wait(900);
    for (const p of ['0-1-0', '1-0-1', '2-0-0', '0-0-1']) { trace(p); await wait(1700); }
  });
}

/* ================================================================ Beacon: architecture reviews */
function mountArch(root) {
  const Y = [70, 150, 230], T = ['tenant A', 'tenant B', 'tenant C'];
  const dots = reduce ? '' : Y.map((y, i) => [0, 1].map(k => `<circle class="ar-dot" r="3.5"><animateMotion dur="2.6s" begin="${(i * 0.5 + k * 1.3).toFixed(1)}s" repeatCount="indefinite" path="M112 ${y} H404"/></circle>`).join('')).join('');
  const { $$, step } = make(root, 'an-arch', 'A drawing of agent orchestration: three tenants, each in its own lane through the router, with a new version rolled out to one tenant at a time.', `
    <p class="an-tag">agent orchestration</p><p class="an-tag r ar-roll">rollout <b>0</b> of 3</p>
    <svg viewBox="0 0 520 300">
      <g class="ar-lanes">${Y.map(y => `<path d="M112 ${y} H404"/>`).join('')}</g>
      <g class="ar-walls"><path d="M20 110 H500"/><path d="M20 190 H500"/></g>
      <rect class="ar-router" x="212" y="34" width="96" height="232" rx="12"/>
      <text class="ar-rt" x="260" y="22">router</text>
      ${Y.map((y, i) => `<g class="ar-t" data-i="${i}">
        <rect x="14" y="${y - 22}" width="98" height="44" rx="9"/><text x="63" y="${y + 5}">${T[i]}</text>
        <rect class="cfg" x="226" y="${y - 15}" width="68" height="30" rx="7"/><text class="s" x="260" y="${y + 4}">config ${'ABC'[i]}</text>
        <rect class="ag" x="404" y="${y - 22}" width="106" height="44" rx="9"/><text x="436" y="${y + 5}">agents</text>
        <g class="ver"><rect x="470" y="${y - 11}" width="32" height="22" rx="6"/><text class="v1" x="486" y="${y + 4}">v1</text><text class="v2" x="486" y="${y + 4}">v2</text></g>
      </g>`).join('')}
      ${dots}
    </svg>`);
  const lanes = $$('.ar-t'), n = root.querySelector('.ar-roll b');
  return play(root, async wait => {
    lanes.forEach(l => l.classList.remove('up')); n.textContent = 0; step(0);
    await wait(1800);
    for (let i = 0; i < 3; i++) { lanes[i].classList.add('up'); n.textContent = i + 1; await wait(i ? 1300 : 2200); }
    step(1); await wait(2200);
  });
}

/* ================================================================ Beacon: client feedback */
function mountFeedback(root) {
  const note = i => `<div class="fb-note"><p>client session ${i + 1}</p><i></i><i></i><span>deployment problem</span></div>`;
  const row = () => `<li><b></b><i></i></li>`;
  const { $$, step } = make(root, 'an-fb', 'A drawing of client feedback sessions on the left turning into lines of a spec on the right, which are then checked off at release.', `
    <div class="fb-col">${[0, 1, 2].map(note).join('')}</div>
    <div class="fb-wire"><i></i></div>
    <div class="fb-spec"><p>spec</p><ol>${[0, 1, 2].map(row).join('')}</ol><span class="fb-rel">released, as specified</span></div>`);
  const notes = $$('.fb-note'), rows = $$('.fb-spec li'), wire = root.querySelector('.fb-wire');
  return play(root, async wait => {
    step(0); notes.forEach(n => n.classList.remove('on', 'done')); rows.forEach(r => r.classList.remove('on', 'ok'));
    await wait(600);
    for (let i = 0; i < 3; i++) {
      notes[i].classList.add('on'); await wait(650);
      wire.style.setProperty('--y', i); wire.classList.remove('run'); void wire.offsetWidth; wire.classList.add('run');
      await wait(520); rows[i].classList.add('on'); notes[i].classList.replace('on', 'done'); await wait(650);
    }
    await wait(300);
    for (const r of rows) { r.classList.add('ok'); await wait(320); }
    step(1); await wait(2400);
  });
}

/* ================================================================ Beacon: fifteen sprints */
function mountSprints(root) {
  const { $, $$, step } = make(root, 'an-sp', 'A drawing of fifteen sprints filling in one by one, with a release marked every two months and 95% of major milestones on time.', `
    <div class="sp-top"><b class="sp-n">0%</b><span>of major milestones<br>on time</span></div>
    <div class="sp-grid">${Array.from({ length: 15 }, (_, i) => `<div class="sp-c${[3, 7, 11].includes(i) ? ' rel' : ''}"><em>release</em><i></i></div>`).join('')}</div>
    <div class="sp-ax"><span>sprint 1</span><span class="sp-cur"></span><span>15</span></div>`);
  const cells = $$('.sp-c'), n = $('.sp-n'), cur = $('.sp-cur');
  return play(root, async wait => {
    step(0); cells.forEach(c => c.classList.remove('on')); n.textContent = '0%'; cur.textContent = '';
    await wait(500);
    for (let i = 0; i < 15; i++) { cells[i].classList.add('on'); cur.textContent = 'sprint ' + (i + 1); await wait(cells[i].classList.contains('rel') ? 420 : 190); }
    cur.textContent = 'a release every two months';
    await count(n, 0, 95, 900, v => Math.round(v) + '%', wait);
    step(1); await wait(2600);
  });
}

/* ================================================================ Beacon: prototype in a week */
function mountProto(root) {
  const seg = (a, b, c) => `<div class="pr-bar" style="--a:${a};--b:${b};--c:${c}"><span class="a">spec</span><span class="b">design</span><span class="c">handoff</span></div>`;
  const { step } = make(root, 'an-pr', 'A drawing of two timelines from idea to prototype: several weeks before, and under one week with AI tools in spec writing, design and handoff.', `
    <div class="pr-row r1"><p>before</p>${seg(26, 30, 19)}<em>several weeks</em></div>
    <div class="pr-row r2"><p>with Claude, Lovable and ChatGPT</p>${seg(7, 9, 6)}<em>under one week</em></div>
    <div class="pr-ax">${['idea', 'week 1', 'week 2', 'week 3', 'week 4'].map(w => `<span>${w}</span>`).join('')}</div>
    <p class="pr-cut">more than <b>60%</b> faster</p>`);
  return play(root, async wait => {
    step(0); await wait(500); step(1); await wait(1900); step(2); await wait(1100); step(3); await wait(2800);
  });
}

/* ================================================================ Nexie: the redesign */
function mountRedesign(root) {
  // nine routes: first a flat inventory, then grouped into an information architecture
  const A = [[0, 62], [0, 80], [0, 48], [0, 72], [0, 56], [0, 84], [0, 44], [0, 66], [0, 52]];
  const B = [[0, 46, 1], [1, 60], [1, 74], [1, 52], [0, 54, 1], [1, 68], [1, 58], [0, 40, 1], [1, 64]];
  const { $, $$, step } = make(root, 'an-rd', 'A drawing of the redesign: a flat list of routes is grouped into an information architecture, and ten screens are built from it.', `
    <div class="rd-l"><p class="an-tag rd-h"><span>route inventory</span><span>information architecture</span></p>
      <div class="rd-list">${A.map(([, w], i) => `<i style="--w:${w}%;--w2:${B[i][1]}%;--x2:${B[i][0] * 16}px;--y:${i};--y2:${i + (i > 6 ? 1 : i > 3 ? 0.5 : 0)}" class="${B[i][2] ? 'head' : ''}"></i>`).join('')}</div></div>
    <div class="rd-r"><p class="an-tag"><b class="rd-n">0</b> of 10 screens</p>
      <div class="rd-grid">${Array.from({ length: 10 }, (_, i) => `<div class="rd-sc v${i % 4}"><u></u><s></s><b></b><b></b></div>`).join('')}</div></div>`);
  const sc = $$('.rd-sc'), n = $('.rd-n');
  return play(root, async wait => {
    step(0); sc.forEach(s => s.classList.remove('on')); n.textContent = 0;
    await wait(1300); step(1); await wait(1500);
    for (let i = 0; i < 10; i++) { sc[i].classList.add('on'); n.textContent = i + 1; await wait(210); }
    step(2); await wait(2600);
  });
}

/* ================================================================ Nexie: the journeys engine */
const PH = ['moment', 'goal', 'touchpoints', 'strategy', 'move pool', 'structure', 'review'];
function mountJourney(root) {
  const { $, $$, step } = make(root, 'an-jr', 'A drawing of the journeys engine: seven phases run in order, the merchant approves each one, and the finished journey is drawn as a trigger, emails, a wait and a branch.', `
    <p class="an-tag">merchant’s goal: win back abandoned carts</p>
    <div class="jr-track">${PH.map(() => `<i></i>`).join('')}</div>
    <p class="jr-now"><b></b><span>merchant approves</span></p>
    <svg class="jr-g" viewBox="0 0 520 176">
      <path class="e" data-k="1" pathLength="1" d="M112 88h22"/><path class="e" data-k="2" pathLength="1" d="M214 88h24"/><path class="e" data-k="3" pathLength="1" d="M306 88h22"/>
      <path class="e" data-k="4" pathLength="1" d="M388 88 C 404 88, 402 30, 420 30"/><path class="e" data-k="5" pathLength="1" d="M388 88 C 404 88, 402 146, 420 146"/>
      <g class="n trig" data-k="0"><rect x="4" y="68" width="108" height="40" rx="10"/><text x="58" y="92">abandoned cart</text></g>
      <g class="n" data-k="1"><rect x="134" y="68" width="80" height="40" rx="10"/><text x="174" y="92">email 1</text></g>
      <g class="n wait" data-k="2"><rect x="238" y="68" width="68" height="40" rx="20"/><text x="272" y="92">wait 1d</text></g>
      <g class="n" data-k="3"><path d="M358 58 l30 30 -30 30 -30 -30z"/><text x="358" y="92">bought?</text></g>
      <g class="n" data-k="4"><rect x="420" y="10" width="96" height="40" rx="10"/><text x="468" y="34">thank you</text></g>
      <g class="n" data-k="5"><rect x="420" y="126" width="96" height="40" rx="10"/><text x="468" y="150">email 2: offer</text></g>
    </svg>`);
  const dots = $$('.jr-track i'), now = $('.jr-now b'), nodes = $$('.jr-g .n, .jr-g .e');
  return play(root, async wait => {
    step(0); dots.forEach(d => d.classList.remove('now', 'ok')); nodes.forEach(n => n.classList.remove('on')); now.textContent = '';
    await wait(500);
    for (let i = 0; i < 7; i++) {
      dots[i].classList.add('now'); now.textContent = `${String(i + 1).padStart(2, '0')} ${PH[i]}`; root.classList.remove('appr');
      await wait(520); root.classList.add('appr'); dots[i].classList.replace('now', 'ok'); await wait(330);
    }
    root.classList.remove('appr'); now.textContent = 'journey'; step(1);
    for (let k = 0; k < 6; k++) { nodes.forEach(n => { if (Number(n.dataset.k) === k) n.classList.add('on'); }); await wait(380); }
    await wait(2800);
  });
}

/* ================================================================ Nexie: evals */
function mountEvals(root) {
  const R = [['clarity', 4.5], ['relevance', 4], ['structure', 3.5], ['accuracy', 4.5]];
  const { $, $$, step } = make(root, 'an-ev', 'A drawing of the evals: an email is scored against a rubric, automatic checks catch a broken output before review, and the cost of a test run falls from 52 dollars to 7.', `
    <div class="ev-mail"><p class="an-tag">campaign email</p><i></i><i></i><i></i><i></i><b></b><span class="ev-scan"></span></div>
    <div class="ev-r">
      <p class="an-tag">rubric</p>
      ${R.map(([k]) => `<div class="ev-row"><span>${k}</span><div><i></i></div><b>0.0</b></div>`).join('')}
      <p class="an-tag ev-ch-h">automatic checks</p>
      <div class="ev-checks"><span class="ok">passed</span><span class="ok">passed</span><span class="bad">broken output</span><em>caught before review</em></div>
    </div>
    <div class="ev-cut"><div><b class="ev-w">6</b><span>weeks of engineering</span></div><div><b class="ev-d">$52</b><span>a test run</span></div></div>`);
  const rows = $$('.ev-row'), w = $('.ev-w'), d = $('.ev-d');
  return play(root, async wait => {
    step(0); rows.forEach(r => { r.querySelector('i').style.width = '0%'; r.querySelector('b').textContent = '0.0'; }); w.textContent = '6'; d.textContent = '$52';
    await wait(500); step(1); await wait(900);
    for (let i = 0; i < rows.length; i++) { rows[i].querySelector('i').style.width = R[i][1] / 5 * 100 + '%'; await count(rows[i].querySelector('b'), 0, R[i][1], 380, v => v.toFixed(1), wait); }
    step(2); await wait(700); step(3); await wait(700); step(4); await wait(1300);
    step(5);
    await Promise.all([count(w, 6, 2, 800, v => String(Math.round(v)), wait), count(d, 52, 7, 800, v => '$' + Math.round(v), wait)]);
    step(6); await wait(2600);
  });
}

/* ================================================================ Nexie: sprints and the board */
function mountBoard(root) {
  const COLS = ['to do', 'designed', 'in review', 'engineering'];
  const TARGET = [3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1];
  const { $$, step } = make(root, 'an-bd', 'A drawing of a kanban board: twenty items move out of the to-do column until each one is designed, in review or with engineering.', `
    <div class="bd-cols">${COLS.map(c => `<div class="bd-col"><p>${c}<b>0</b></p></div>`).join('')}</div>
    <div class="bd-cards">${TARGET.map(() => '<i></i>').join('')}</div>`);
  const cards = $$('.bd-cards i'), nums = $$('.bd-col b');
  // Each card keeps its slot until it moves, and the cards that will stay in a column
  // arrive first, so nothing reshuffles and no column ends with a gap in it.
  const order = TARGET.map((_, k) => k).sort((a, b) => TARGET[a] - TARGET[b] || a - b);
  const col = TARGET.map(() => 0), slot = TARGET.map(() => 0), n = [0, 0, 0, 0];
  const put = k => { const c = cards[k]; c.style.setProperty('--c', col[k]); c.style.setProperty('--x', slot[k] % 2); c.style.setProperty('--r', Math.floor(slot[k] / 2)); c.dataset.c = col[k]; };
  const tally = () => nums.forEach((el, i) => { el.textContent = col.filter(c => c === i).length; });
  return play(root, async wait => {
    step(0); n.fill(0); col.fill(0);
    order.forEach((k, i) => { slot[k] = 19 - i; put(k); }); n[0] = 20; tally();
    await wait(900);
    for (let pass = 1; pass <= 3; pass++) {
      for (const k of order) if (TARGET[k] >= pass) { col[k] = pass; slot[k] = n[pass]++; put(k); tally(); await wait(pass === 1 ? 90 : 120); }
      await wait(500);
    }
    step(1); await wait(2600);
  });
}

/* ================================================================ GalaxEye: buyer interviews */
function mountInterviews(root) {
  const G = ['government', 'agri-tech', 'defence'];
  const { $, $$, step } = make(root, 'an-iv', 'A drawing: twenty-one buyer interviews across government, agri-tech and defence fill in one by one. Both sides asked for change detection. Defence wanted the evidence, commercial buyers wanted the conclusion.', `
    <p class="an-tag">buyer interviews</p><p class="an-tag r"><b class="iv-n">0</b> done</p>
    <div class="iv-cols">${G.map(g => `<div><span>${g}</span><p>${'<i></i>'.repeat(7)}</p></div>`).join('')}</div>
    <p class="iv-both"><em>both sides asked for</em><b>change detection</b></p>
    <div class="iv-split"><p><em>defence</em>wanted the evidence</p><p><em>commercial</em>wanted the conclusion</p></div>`);
  const dots = $$('.iv-cols i'), n = $('.iv-n'), order = [];
  for (let k = 0; k < 7; k++) for (let c = 0; c < 3; c++) order.push(dots[c * 7 + k]);
  return play(root, async wait => {
    step(0); dots.forEach(d => d.classList.remove('on')); n.textContent = 0;
    await wait(400);
    for (let i = 0; i < order.length; i++) { order[i].classList.add('on'); n.textContent = i + 1; await wait(95); }
    await wait(500); step(1); await wait(1200); step(2); await wait(3400);
  });
}

/* ================================================================ GalaxEye: two markets */
function mountMarkets(root) {
  const { step } = make(root, 'an-mk', 'A drawing: one product with one pitch splits into a defence line and a commercial line. Each gets its own positioning, and its own order of what is built first.', `
    <p class="an-tag">market strategy</p>
    <div class="mk-one"><em>before</em><b>one product, one pitch</b></div>
    <div class="mk-two">
      <div><em>defence</em><b>Shows the evidence</b><ol><li>change detection<u>first</u></li><li>the evidence behind it</li></ol></div>
      <div><em>commercial</em><b>Gives the conclusion</b><ol><li>change detection<u>first</u></li><li>the conclusion from it</li></ol></div>
    </div>`);
  return play(root, async wait => { step(0); await wait(1300); step(1); await wait(900); step(2); await wait(900); step(3); await wait(800); step(4); await wait(3200); });
}

/* ================================================================ GalaxEye: the demo */
function mountDemo(root) {
  const { $, $$, step } = make(root, 'an-dm', 'A drawing of the demo’s running order. Before, it opened with the sensor and reached the buyer’s decision last. After, the decision comes first and the sensor last, and qualified partnership leads rise 25%.', `
    <p class="an-tag">the demo, in order</p><p class="an-tag r"><b class="dm-st">before</b></p>
    <div class="dm-list"><ol class="dm-num"><li>1</li><li>2</li><li>3</li><li>4</li></ol>
      <ul class="dm-rows"><li>the sensor</li><li>how it works</li><li>what it sees</li><li class="d">the decision the buyer has to make</li></ul></div>
    <div class="dm-out"><span>qualified partnership leads</span><b class="dm-n">+0%</b><i><u></u></i></div>`);
  const rows = $$('.dm-rows li'), st = $('.dm-st'), n = $('.dm-n'), bar = $('.dm-out u');
  const flip = change => {
    const a = rows.map(e => e.getBoundingClientRect()); change();
    rows.forEach((e, i) => { const b = e.getBoundingClientRect(); if (!reduce) e.animate([{ transform: `translateY(${a[i].top - b.top}px)` }, { transform: 'none' }], { duration: 760, easing: 'cubic-bezier(.3,.9,.3,1)' }); });
  };
  return play(root, async wait => {
    step(0); rows.forEach((r, i) => { r.style.order = i; }); st.textContent = 'before'; n.textContent = '+0%'; bar.style.width = '0%';
    await wait(1700);
    flip(() => { [3, 2, 1, 0].forEach((o, i) => { rows[i].style.order = o; }); }); st.textContent = 'after'; step(1);
    await wait(1300); step(2); bar.style.width = '100%';
    await count(n, 0, 25, 900, v => '+' + Math.round(v) + '%', wait);
    await wait(3000);
  });
}

/* ================================================================ GalaxEye: product positioning */
function mountPositioning(root) {
  const { $, step } = make(root, 'an-pz', 'A drawing of the product positioning. The pitch moves from leading with the sensor to leading with the decision the buyer has to make, and qualified partnership leads rise 25%.', `
    <p class="an-tag">product positioning</p><p class="an-tag r"><b class="pz-st">before</b></p>
    <div class="pz-card"><em>the pitch opens with</em><div class="pz-flip"><b class="pz-a">the sensor and what it can see</b><b class="pz-b">the decision the buyer has to make</b></div></div>
    <div class="pz-axis"><i class="pz-line"></i><i class="pz-dot"></i><span>sensor first</span><span>buyer first</span></div>
    <div class="pz-out"><span>qualified partnership leads</span><b class="pz-n">+0%</b><i><u></u></i></div>`);
  const st = $('.pz-st'), n = $('.pz-n'), bar = $('.pz-out u');
  return play(root, async wait => {
    step(0); st.textContent = 'before'; n.textContent = '+0%'; bar.style.width = '0%';
    await wait(1800);
    step(1); st.textContent = 'after';
    await wait(1200); step(2); bar.style.width = '100%';
    await count(n, 0, 25, 900, v => '+' + Math.round(v) + '%', wait);
    await wait(3200);
  });
}

/* ================================================================ GalaxEye: Aero India and HIMTECH */
function mountEvents(root) {
  const { step } = make(root, 'an-evt', 'A drawing: what officers asked for at Aero India 2025 and the Indian Army’s HIMTECH Symposium travels across and lands on the roadmap.', `
    <p class="an-tag">from the floor to the roadmap</p>
    <div class="et-l">
      <div class="et-b"><em>2025 · Bengaluru</em><b>Aero India</b><span>product, on the stand</span></div>
      <div class="et-b"><em>Indian Army</em><b>HIMTECH</b><span>symposium</span></div>
    </div>
    <div class="et-m"><i></i><i></i><i></i></div>
    <div class="et-r"><span>roadmap</span><p></p><p class="h"><u>asked by officers</u></p><p></p><p class="h"><u>asked by officers</u></p><p class="h"><u>asked by officers</u></p></div>`);
  return play(root, async wait => { step(0); await wait(500); step(1); await wait(1100); step(2); await wait(1300); step(3); await wait(3400); });
}

/* ================================================================ EarthID: product and UX */
function mountUX(root) {
  const { step } = make(root, 'an-ux', 'A drawing of one screen going through four stages: research notes, a wireframe, a prototype, and shipped in a sprint.', `
    <p class="an-tag">one screen, four stages</p>
    <div class="ux-scr">
      <div class="ux-notes"><i></i><i></i><i></i><i></i><i></i></div>
      <div class="ux-wire"><b></b><i></i><i></i><i></i><u></u></div>
      <span class="ux-ok">shipped</span>
    </div>
    <ol class="ux-st"><li>research</li><li>wireframe</li><li>prototype</li><li>sprint</li></ol>`);
  return play(root, async wait => { step(0); await wait(450); step(1); await wait(1700); step(2); await wait(1600); step(3); await wait(1600); step(4); await wait(2800); });
}

/* ================================================================ EarthID: private KYC */
function mountKYC(root) {
  const { step } = make(root, 'an-kyc', 'A drawing: a bank asks whether a person is over 18. The credential stays with the person, a zero-knowledge proof goes across, and the bank gets a yes without seeing the date of birth.', `
    <p class="an-tag">a KYC check</p><p class="an-tag r">fields shared <b>0 of 3</b></p>
    <div class="ky-row">
      <div class="ky-card"><em>verifiable credential</em><p><span>name</span><b>Priya Sharma</b></p><p class="dob"><span>date of birth</span><b>14 · 03 · 1996</b></p><p><span>address</span><b>12, Lake View Road</b></p><u>signed by the issuer</u></div>
      <div class="ky-mid"><i class="ky-q">over 18?</i><i class="ky-p">proof</i></div>
      <div class="ky-bank"><em>bank onboarding</em><b class="ky-ask">Is this person over 18?</b><b class="ky-yes">Yes<span>the proof checks out</span></b><u>never saw the document</u></div>
    </div>
    <p class="ky-end">Zero-knowledge proof: the answer crosses, the data stays.</p>`);
  return play(root, async wait => { step(0); await wait(700); step(1); await wait(1500); step(2); await wait(1500); step(3); await wait(900); step(4); await wait(3200); });
}

/* ================================================================ L&T: a model watching a plant */
function mountPlant(root) {
  const { $, $$ } = make(root, 'an-plant', 'A drawing: a bearing temperature sensor drifts out of its expected band, the model flags it and forecasts when it reaches the limit. The unit goes into maintenance, its load moves to the other two units, and the reading returns to normal.', `
    <p class="an-tag">unit 3 · bearing temperature</p>
    <p class="an-tag r pl-leg"><i class="a"></i>sensor<i class="b"></i>expected</p>
    <svg viewBox="0 0 560 300">
      <defs><linearGradient id="plg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--hue)" stop-opacity=".32"/><stop offset="1" stop-color="var(--hue)" stop-opacity="0"/></linearGradient></defs>
      <path class="pl-grid" d="M0 70H560M0 130H560M0 190H560M0 250H560"/>
      <rect class="pl-band" x="0" y="172" width="560" height="44"/>
      <path class="pl-limit" d="M0 78H560"/><text class="pl-lt" x="14" y="70">limit</text>
      <path class="pl-area" d=""/><path class="pl-line" d=""/><path class="pl-pred" d=""/>
      <path class="pl-mt" d="M406 40V262"/>
      <circle class="pl-dot" r="4.5"/>
      <g class="pl-flag f1" transform="translate(132 96)"><rect width="176" height="42" rx="9"/><text class="b" x="12" y="18">drifting</text><text x="12" y="33">out of the expected band</text></g>
      <g class="pl-flag f2" transform="translate(416 96)"><rect width="134" height="42" rx="9"/><text class="b" x="12" y="18">maintenance</text><text x="12" y="33">before the limit</text></g>
    </svg>
    <div class="pl-load"><em></em>${[1, 2, 3].map(u => `<p><span>unit ${u} load</span><b></b><i><u></u></i></p>`).join('')}</div>`);
  const ln = $('.pl-line'), ar = $('.pl-area'), pred = $('.pl-pred'), dot = $('.pl-dot'), say = $('.pl-load em'), lb = $$('.pl-load b'), lu = $$('.pl-load u');
  const LOAD = { ok: [62, 58, 71], drift: [62, 58, 71], maint: [86, 82, 18], back: [64, 60, 68] };
  const N = 80, M = 58, pts = [], r = rng(7);
  for (let i = 0; i <= N; i++) {
    const noise = (r() - 0.5) * 9;
    const y = i < 34 ? 194 : i <= M ? 194 - Math.pow((i - 34) / (M - 34), 1.5) * 88 : 194 - 88 * Math.exp(-(i - M) / 2.2);
    pts.push(y + noise);
  }
  const X = i => i * 7, xy = i => `${X(i)},${pts[i].toFixed(1)}`;
  let last = '';
  const run = runner(root, t => {
    const c = reduce ? 9.2 : (t + 2.6) % 11, n = Math.max(1, Math.min(N, Math.floor(c / 8.4 * N)));
    const d = 'M' + Array.from({ length: n + 1 }, (_, i) => xy(i)).join(' L');
    ln.setAttribute('d', d); ar.setAttribute('d', `${d} L${X(n)},262 L0,262Z`);
    dot.setAttribute('cx', X(n)); dot.setAttribute('cy', pts[n]);
    const st = n < 44 ? 'ok' : n < M ? 'drift' : n < M + 8 ? 'maint' : 'back';
    pred.setAttribute('d', st === 'drift' ? `M${xy(n)} L${Math.min(540, X(n) + (pts[n] - 78) * 1.5)},78` : '');
    if (st !== last) { last = st; root.dataset.st = st; say.textContent = { ok: 'all units normal', drift: 'unit 3 needs attention', maint: 'unit 3 in maintenance · load moved to units 1 and 2', back: 'unit 3 back · load rebalanced' }[st]; LOAD[st].forEach((v, i) => { lb[i].textContent = v + '%'; lu[i].style.width = v + '%'; }); }
  });
  return run;
}

export const ANIMS = {
  sar: mountSAR, interviews: mountInterviews, markets: mountMarkets, demo: mountDemo, positioning: mountPositioning, events: mountEvents,
  ux: mountUX, kyc: mountKYC, gateway: mountGateway, plant: mountPlant,
  chat: mountChat, cost: mountCost, arch: mountArch, feedback: mountFeedback, sprints: mountSprints, proto: mountProto,
  redesign: mountRedesign, journey: mountJourney, evals: mountEvals, board: mountBoard,
};
