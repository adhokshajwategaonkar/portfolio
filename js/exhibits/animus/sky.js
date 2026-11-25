// sky: everything you sent, as a sky.
// A plain-JS port of the app's PhysicsSky (PhysicsSky.jsx + lib/graph.js + lib/sky.js).
// Every item is a star coloured by where it stands. A tag held by 3+ stars becomes a
// topic; inside a topic stars hang off a branch per kind; stars no topic claims group
// by site, then by kind. Dropped stars are nebula dust. Placement is a force
// simulation with d3-force's maths (link, many-body, x/y, collide, the same alpha
// decay), written out here so there is no dependency. It is seeded, settles and
// stops; dragging a star wakes it and the rest answer.

import { esc, loadFonts, clock, clamp } from './lib/util.js';
import { makeAudio } from './lib/audio.js';
import { hash01 } from './lib/moment.js';
import { SKY } from './data/sky.js';

const COL = {
  bg: '#08080d', star: '#f5f5f7', text: '#d8d8de', dim: '#85858f', due: '#ff5c6c',
  done: '#6ee7a0', pending: '#7cc4ff', snoozed: '#ffd866', dropped: '#ff9a5c',
};
const STATUSES = [
  { key: 'done', label: 'done' },
  { key: 'pending', label: 'waiting' },
  { key: 'due', label: 'due today' },
  { key: 'snoozed', label: 'snoozed' },
  { key: 'dropped', label: 'dropped' },
];
const KINDS = [
  { key: 'done', label: 'tasks' }, { key: 'goal', label: 'goals' },
  { key: 'idea', label: 'ideas' }, { key: 'link', label: 'links' },
];
const SITE_NAMES = { 'youtube.com': 'youtube', 'x.com': 'x', 'open.spotify.com': 'spotify', 'instagram.com': 'instagram' };
const kindOf = (s) => (s.y === 'goal' || s.y === 'idea' || s.y === 'link' ? s.y : 'done');
const statusOf = (s) => (s.due ? 'due' : s.status);
const colourOf = (s) => COL[s.status === 'pending' || s.due ? 'pending' : s.status];
const MIN_CONSTELLATION = 3;
const LINK_DISTANCE = 120;
const LINE_GAP = 4.5;
const INTRO_STAGGER = 70, INTRO_MS = 760;

function whenOf(days) {
  if (days === 0) return 'sent today';
  if (days === 1) return 'sent yesterday';
  if (days < 7) return `sent ${days} days ago`;
  if (days < 14) return 'sent last week';
  return `sent ${Math.round(days / 7)} weeks ago`;
}

function seeded(seed = 7) {
  let s = seed >>> 0 || 1;
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
}

// ---------------------------------------------------------------- the graph
function buildGraph(stars) {
  const counts = new Map();
  stars.forEach((s) => s.tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
  const held = (s) => s.tags.filter((t) => counts.get(t) >= MIN_CONSTELLATION);
  const loose = stars.filter((s) => !held(s).length);
  const bySite = new Map();
  loose.forEach((s) => { const f = s.site && (SITE_NAMES[s.site] || s.site.split('.').slice(-2)[0]); if (f) bySite.set(f, (bySite.get(f) || 0) + 1); });
  const facet = (s) => {
    const f = s.site && (SITE_NAMES[s.site] || s.site.split('.').slice(-2)[0]);
    if (f && bySite.get(f) >= MIN_CONSTELLATION) return f;
    return KINDS.find((k) => k.key === kindOf(s)).label;
  };
  const homes = new Map();
  stars.forEach((s) => {
    const tags = held(s);
    const home = tags[0] || facet(s);
    if (!homes.has(home)) homes.set(home, []);
    homes.get(home).push({ s, others: tags.slice(1) });
  });

  const nodes = [], links = [];
  const hubs = new Map();
  for (const [tag, members] of homes) {
    const hub = { id: `t:${tag}`, kind: 'tag', tag, label: tag, count: members.length };
    hubs.set(tag, hub);
    nodes.push(hub);
    const tree = members.filter((m) => m.s.status !== 'dropped');
    const kinds = KINDS.filter((k) => tree.some((m) => kindOf(m.s) === k.key));
    const solo = kinds.length <= 1;
    const branch = new Map();
    if (!solo) {
      kinds.forEach((k) => {
        const b = { id: `b:${tag}:${k.key}`, kind: 'branch', topic: tag, label: k.label };
        branch.set(k.key, b);
        nodes.push(b);
        links.push({ source: hub, target: b, type: 'trunk' });
      });
    }
    members.forEach(({ s }) => {
      const dust = s.status === 'dropped';
      const n = { id: `i:${s.id}`, kind: 'item', star: s, topic: tag, dust };
      nodes.push(n);
      if (dust) links.push({ source: hub, target: n, type: 'dust' });
      else if (solo) links.push({ source: hub, target: n, type: 'leaf' });
      else { const b = branch.get(kindOf(s)); n.branch = b.id; links.push({ source: b, target: n, type: 'branch' }); }
    });
  }
  for (const [, members] of homes) {
    members.forEach(({ s, others }) => others.forEach((o) => {
      const hub = hubs.get(o);
      const n = nodes.find((x) => x.id === `i:${s.id}`);
      if (hub && n) links.push({ source: n, target: hub, type: 'bridge' });
    }));
  }
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const neighbours = new Map();
  links.forEach((l) => {
    if (l.type === 'dust') return;
    [[l.source, l.target], [l.target, l.source]].forEach(([a, b]) => {
      if (!neighbours.has(a.id)) neighbours.set(a.id, new Set());
      neighbours.get(a.id).add(b.id);
    });
  });
  return { nodes, links, byId, neighbours };
}

// ----------------------------------------------- d3-force's maths, by hand
function simulation(nodes, links) {
  const rand = seeded(7);
  const jiggle = () => (rand() - 0.5) * 1e-6;
  const GOLD = Math.PI * (3 - Math.sqrt(5));
  nodes.forEach((n, i) => {
    const r = 10 * Math.sqrt(0.5 + i), a = i * GOLD;
    n.x = r * Math.cos(a); n.y = r * Math.sin(a); n.vx = 0; n.vy = 0;
  });
  const reach = { trunk: 0.32, branch: 0.42, leaf: 0.55, dust: 1.05, bridge: 1.6 };
  const pull = { dust: 0.35, bridge: 0.03 };
  const count = new Map();
  links.forEach((l) => {
    count.set(l.source.id, (count.get(l.source.id) || 0) + 1);
    count.set(l.target.id, (count.get(l.target.id) || 0) + 1);
  });
  links.forEach((l) => {
    l.distance = LINK_DISTANCE * (reach[l.type] ?? 0.5);
    l.strength = pull[l.type] ?? 0.6;
    l.bias = count.get(l.source.id) / (count.get(l.source.id) + count.get(l.target.id));
  });
  const charge = (n) => -10 * (n.dust ? 2.5 : n.kind === 'branch' ? 5 : 12);
  const radius = (n) => (n.dust ? 1.5 : n.kind === 'item' ? 7 : n.kind === 'tag' ? 9 : 5);
  nodes.forEach((n) => { n.charge = charge(n); n.radius = radius(n); });

  const sim = { alpha: 1, alphaTarget: 0, alphaMin: 0.001, alphaDecay: 0.028, velocityDecay: 0.4 };
  sim.tick = () => {
    sim.alpha += (sim.alphaTarget - sim.alpha) * sim.alphaDecay;
    const alpha = sim.alpha;
    // link
    for (const l of links) {
      const s = l.source, t = l.target;
      let x = t.x + t.vx - s.x - s.vx || jiggle();
      let y = t.y + t.vy - s.y - s.vy || jiggle();
      let d = Math.sqrt(x * x + y * y);
      d = ((d - l.distance) / d) * alpha * l.strength;
      x *= d; y *= d;
      t.vx -= x * l.bias; t.vy -= y * l.bias;
      s.vx += x * (1 - l.bias); s.vy += y * (1 - l.bias);
    }
    // many-body, exact (a few dozen nodes)
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const b = nodes[j];
        let x = b.x - a.x, y = b.y - a.y;
        let l2 = x * x + y * y;
        if (l2 > 1440000) continue;
        if (x === 0) { x = jiggle(); l2 += x * x; }
        if (y === 0) { y = jiggle(); l2 += y * y; }
        if (l2 < 1) l2 = Math.sqrt(l2);
        const w = (b.charge * alpha) / l2;
        a.vx += x * w; a.vy += y * w;
      }
    }
    // x / y towards the centre
    for (const n of nodes) { n.vx += -n.x * 0.06 * alpha; n.vy += -n.y * 0.06 * alpha; }
    // collide
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const r = a.radius + b.radius + 2;
        let x = a.x + a.vx - b.x - b.vx, y = a.y + a.vy - b.y - b.vy;
        let l = x * x + y * y;
        if (l >= r * r) continue;
        if (x === 0) { x = jiggle(); l += x * x; }
        if (y === 0) { y = jiggle(); l += y * y; }
        l = Math.sqrt(l);
        l = ((r - l) / l) * 0.7;
        const rb = b.radius * b.radius, ra = a.radius * a.radius, k = rb / (ra + rb);
        a.vx += x * l * k; a.vy += y * l * k;
        b.vx -= x * l * (1 - k); b.vy -= y * l * (1 - k);
      }
    }
    for (const n of nodes) {
      if (n.fx != null) { n.x = n.fx; n.vx = 0; } else { n.vx *= 1 - sim.velocityDecay; n.x += n.vx; }
      if (n.fy != null) { n.y = n.fy; n.vy = 0; } else { n.vy *= 1 - sim.velocityDecay; n.y += n.vy; }
    }
  };
  sim.settled = () => sim.alpha < sim.alphaMin && sim.alphaTarget === 0;
  return sim;
}

export function mount(root, ctx) {
  loadFonts();
  const t = clock();
  const audio = makeAudio(ctx.sound);
  const reduce = !!ctx.reduce;
  root.classList.add('ax-skyroot');

  const stars = SKY.map((r, i) => ({
    id: 's' + i, t: r[0], y: r[1], tags: r[2], status: r[3], days: r[4], site: r[5] || null, fact: r[6] || null,
    due: r[7] === 'due', up: r[7] === 'up',
  }));
  const g = buildGraph(stars);
  const sim = simulation(g.nodes, g.links);
  for (let i = 0; i < 320; i++) sim.tick();

  root.innerHTML = `
  <div class="ax-sky">
    <canvas role="img" aria-label="a night sky where each star is something sent to animus, coloured by whether it is done, waiting, snoozed or dropped, grouped by topic"></canvas>
    <div class="ax-skyhead">
      <span class="ax-label">your sky</span>
      <b data-n></b>
      <div class="ax-skykey" data-key></div>
    </div>
    <button class="ax-skyback" type="button" data-whole hidden>whole sky</button>
    <div class="ax-skytools">
      <button type="button" data-zoom="in" aria-label="zoom in">+</button>
      <button type="button" data-zoom="out" aria-label="zoom out">−</button>
    </div>
    <div class="ax-skycap off" data-cap aria-live="polite"></div>
    <p class="ax-skyhint" data-hint>drag a star and the rest answer. tap one to open it.</p>
  </div>`;

  const $ = (s) => root.querySelector(s);
  const canvas = root.querySelector('canvas');
  const c2 = canvas.getContext('2d');
  const cap = $('[data-cap]'), nEl = $('[data-n]'), keyEl = $('[data-key]'), whole = $('[data-whole]'), hintEl = $('[data-hint]');
  let W = 0, H = 0, dpr = 1;
  let cam = { x: 0, y: 0, k: 1 }, fit = { x: 0, y: 0, k: 1 }, flight = null;
  let picked = null, hover = null, topic = null, dragging = null;
  const hidden = new Set();
  let intro = reduce ? null : { start: performance.now(), order: new Map() };
  if (intro) [...new Set(g.nodes.filter((n) => n.kind === 'tag').map((n) => n.tag))].forEach((tg, i) => intro.order.set(tg, i));
  let running = true, raf = 0, nameBoxes = [];
  const halos = new Map();
  const DUST = Array.from({ length: 130 }, (_, i) => ({
    x: hash01(String(i), 'dust-x'), y: hash01(String(i), 'dust-y'),
    r: 0.35 + hash01(String(i), 'dust-r') * 0.45, o: 0.1 + hash01(String(i), 'dust-o') * 0.16,
  }));

  // ---------------------------------------------------------------- camera
  const toScreen = (c, x, y) => ({ x: (x - c.x) * c.k + W / 2, y: (y - c.y) * c.k + H / 2 });
  const toWorld = (c, x, y) => ({ x: (x - W / 2) / c.k + c.x, y: (y - H / 2) / c.k + c.y });
  function boundsOf(list) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    list.forEach((n) => { minX = Math.min(minX, n.x); minY = Math.min(minY, n.y); maxX = Math.max(maxX, n.x); maxY = Math.max(maxY, n.y); });
    return { minX, minY, maxX, maxY };
  }
  function frame(list, pad) {
    const b = boundsOf(list);
    const bw = Math.max(b.maxX - b.minX, 40), bh = Math.max(b.maxY - b.minY, 40);
    const k = clamp(Math.min((W - pad.side * 2) / bw, (H - pad.top - pad.bottom) / bh), 0.2, 3.2);
    return { x: (b.minX + b.maxX) / 2, y: (b.minY + b.maxY) / 2 - (pad.top - pad.bottom) / (2 * k), k };
  }
  const headH = () => $('.ax-skyhead').getBoundingClientRect().height + 30;
  function refit(jump) {
    fit = frame(g.nodes, { side: 44, top: Math.min(headH(), H * 0.34), bottom: 46 });
    if (jump) cam = { ...fit };
  }
  function flyTo(target) {
    if (reduce) { cam = { ...target }; kick(); return; }
    flight = { from: { ...cam }, to: target, start: performance.now(), ms: 650 };
    kick();
  }
  const fitted = () => Math.abs(cam.k - fit.k) / fit.k < 0.04 && Math.hypot(cam.x - fit.x, cam.y - fit.y) * cam.k < 12;

  function resize() {
    const r = root.getBoundingClientRect();
    if (!r.width) return;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    const wasFit = !W || fitted();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    refit(wasFit);
    kick();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(root);

  // ----------------------------------------------------------------- chrome
  function present() { return STATUSES.filter((s) => stars.some((x) => statusOf(x) === s.key)); }
  const shows = (s) => !hidden.has(statusOf(s));
  function paintChrome() {
    keyEl.innerHTML = present().map((s) => `<button type="button" data-k="${s.key}" aria-pressed="${!hidden.has(s.key)}" style="--k:${s.key === 'due' ? COL.due : COL[s.key]}"><i></i>${s.label}</button>`).join('');
    const done = stars.filter((s) => s.status === 'done').length;
    nEl.textContent = hidden.size ? `${stars.filter(shows).length} showing` : `${done} finished`;
    whole.hidden = fitted() && !topic;
  }
  keyEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-k]');
    if (!b) return;
    const k = b.dataset.k;
    if (hidden.has(k)) hidden.delete(k); else hidden.add(k);
    // No dead end: hiding the last visible status shows everything again.
    if (present().every((s) => hidden.has(s.key))) hidden.clear();
    if (picked && !shows(picked.star)) pick(null);
    audio.sfx('tick');
    paintChrome(); kick();
  });
  whole.addEventListener('click', () => { topic = null; pick(null); flyTo(fit); audio.sfx('shut'); });
  root.querySelector('.ax-skytools').addEventListener('click', (e) => {
    const b = e.target.closest('[data-zoom]');
    if (!b) return;
    zoomAt(W / 2, H / 2, b.dataset.zoom === 'in' ? 1.6 : 1 / 1.6, true);
  });

  // A tapped star opens the item itself, the way the app's item sheet does: what it is,
  // where it sits, when it came in, and the three things you can do with it.
  const TYPE_NOTE = { task: 'a task', reminder: 'a reminder', link: 'a link to read or watch', idea: 'an idea', goal: 'a goal' };
  function pick(n) {
    picked = n;
    if (!n) { cap.classList.add('off'); cap.innerHTML = ''; return; }
    const s = n.star;
    const st = statusOf(s), stl = STATUSES.find((x) => x.key === st).label;
    const k = st === 'due' ? COL.due : colourOf(s);
    const acts = s.status === 'pending' || s.status === 'snoozed'
      ? `<button type="button" data-act="done">done</button><button type="button" data-act="snoozed">later</button><button type="button" data-act="dropped">drop</button>`
      : `<button type="button" data-act="pending">put it back on the pile</button>`;
    cap.innerHTML = `
      <div class="ax-sh-top"><span class="ax-sh-st" style="--k:${k}"><i></i>${esc(stl)}</span><button type="button" class="ax-sh-x" data-act="close" aria-label="close">×</button></div>
      <b>${esc(s.t)}</b>
      <dl>
        <div><dt>type</dt><dd>${esc(TYPE_NOTE[s.y] || s.y)}</dd></div>
        <div><dt>topic</dt><dd>${esc((s.tags && s.tags.length ? s.tags : [n.topic || 'none yet']).join(', '))}</dd></div>
        <div><dt>came in</dt><dd>${esc(whenOf(s.days))}${s.site ? ' · ' + esc(s.site) : ''}</dd></div>
        ${s.fact ? `<div><dt>history</dt><dd>${esc(s.fact)}</dd></div>` : ''}
        ${s.up ? `<div><dt>next</dt><dd>comes back this week</dd></div>` : ''}
      </dl>
      <div class="ax-sh-acts">${acts}</div>`;
    cap.classList.remove('off');
  }
  cap.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b || !picked) return;
    e.stopPropagation();
    const act = b.dataset.act;
    if (act === 'close') { pick(null); audio.sfx('shut'); return; }
    const s = picked.star;
    s.status = act; s.due = false;
    audio.sfx(act === 'done' ? 'tap' : 'shut');
    paintChrome(); kick(); pick(picked);
  });

  function zoomAt(sx, sy, factor, animate) {
    const before = toWorld(cam, sx, sy);
    const k = clamp(cam.k * factor, fit.k * 0.6, fit.k * 7);
    const target = { k, x: before.x - (sx - W / 2) / k, y: before.y - (sy - H / 2) / k };
    if (animate) flyTo(target); else { cam = target; kick(); }
  }
  function topicCam(tag) {
    const members = g.nodes.filter((n) => n.id === `t:${tag}` || n.topic === tag);
    const f = frame(members, { side: 70, top: 90, bottom: 90 });
    f.k = Math.min(f.k, fit.k * 3.2);
    return f;
  }

  // ------------------------------------------------------------------ input
  const pointers = new Map();
  let press = null, pinch = null, interacted = false;
  function hitStar(x, y) {
    let best = null, bd = 18;
    for (const n of g.nodes) {
      if (n.kind !== 'item' || !shows(n.star)) continue;
      const p = toScreen(cam, n.x, n.y);
      const d = Math.hypot(p.x - x, p.y - y);
      if (d < bd) { bd = d; best = n; }
    }
    return best;
  }
  function hitName(x, y) {
    const b = nameBoxes.find((r) => x >= r.x - 4 && x <= r.x + r.w + 4 && y >= r.y - 4 && y <= r.y + r.h + 4);
    if (b) return b.tag;
    for (const n of g.nodes) {
      if (n.kind !== 'tag') continue;
      const p = toScreen(cam, n.x, n.y);
      if (Math.hypot(p.x - x, p.y - y) < 12) return n.tag;
    }
    return null;
  }
  const pos = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  function firstTouch() {
    if (interacted) return;
    interacted = true;
    hintEl.classList.add('off');
  }

  canvas.addEventListener('pointerdown', (e) => {
    const p = pos(e);
    pointers.set(e.pointerId, p);
    try { canvas.setPointerCapture(e.pointerId); } catch { /* fine */ }
    firstTouch();
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      if (dragging) { dragging.fx = dragging.fy = null; dragging = null; sim.alphaTarget = 0; }
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), k: cam.k, mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } };
      press = null;
      return;
    }
    flight = null;
    const star = hitStar(p.x, p.y);
    press = { x: p.x, y: p.y, star, cam: { ...cam }, moved: false, tag: star ? null : hitName(p.x, p.y) };
    if (star) {
      dragging = star;
      const w = toWorld(cam, p.x, p.y);
      star.fx = star.x; star.fy = star.y;
      press.off = { x: star.x - w.x, y: star.y - w.y };
    }
  });
  canvas.addEventListener('pointermove', (e) => {
    const p = pos(e);
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, p);
    if (pinch && pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const before = toWorld(cam, pinch.mid.x, pinch.mid.y);
      cam.k = clamp(pinch.k * (d / pinch.d), fit.k * 0.6, fit.k * 7);
      cam.x = before.x - (pinch.mid.x - W / 2) / cam.k;
      cam.y = before.y - (pinch.mid.y - H / 2) / cam.k;
      kick();
      return;
    }
    if (!press) {
      if (e.pointerType === 'mouse') {
        const h = hitStar(p.x, p.y) || null;
        const overName = !h && hitName(p.x, p.y);
        canvas.classList.toggle('over', !!(h || overName));
        if (h !== hover) { hover = h; kick(); }
      }
      return;
    }
    if (Math.hypot(p.x - press.x, p.y - press.y) > 5) press.moved = true;
    if (!press.moved) return;
    canvas.classList.add('dragging');
    if (press.star) {
      const w = toWorld(cam, p.x, p.y);
      press.star.fx = w.x + press.off.x; press.star.fy = w.y + press.off.y;
      sim.alphaTarget = 0.3;
      if (sim.alpha < 0.3) sim.alpha = 0.3;
    } else {
      cam.x = press.cam.x - (p.x - press.x) / cam.k;
      cam.y = press.cam.y - (p.y - press.y) / cam.k;
    }
    kick();
  });
  const up = (e) => {
    pointers.delete(e.pointerId);
    canvas.classList.remove('dragging');
    if (pinch) { if (pointers.size < 2) pinch = null; press = null; return; }
    if (!press) return;
    const pr = press;
    press = null;
    if (pr.star) {
      pr.star.fx = null; pr.star.fy = null; dragging = null;
      sim.alphaTarget = 0;
    }
    if (e.type !== 'pointerup' || pr.moved) { kick(); return; }
    if (pr.star) {
      if (picked === pr.star) { pick(null); } else { pick(pr.star); audio.sfx('tap'); }
    } else if (pr.tag) {
      topic = pr.tag; pick(null); audio.sfx('open');
      flyTo(topicCam(pr.tag));
    } else if (picked) pick(null);
    kick();
  };
  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('pointerleave', () => { if (hover) { hover = null; kick(); } });
  const onWheel = (e) => {
    e.preventDefault();
    firstTouch();
    const p = pos(e);
    zoomAt(p.x, p.y, Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0022)), false);
  };
  canvas.addEventListener('wheel', onWheel, { passive: false });
  canvas.addEventListener('dblclick', (e) => { const p = pos(e); zoomAt(p.x, p.y, 1.8, true); });
  // A touchend that opened a caption must not become a click on what's under it.
  canvas.addEventListener('touchend', (e) => { if (e.cancelable) e.preventDefault(); }, { passive: false });
  const onKey = (e) => {
    if (e.key === 'Escape') { topic = null; pick(null); flyTo(fit); }
    else if (e.key === '+' || e.key === '=') zoomAt(W / 2, H / 2, 1.4, true);
    else if (e.key === '-') zoomAt(W / 2, H / 2, 1 / 1.4, true);
  };
  root.addEventListener('keydown', onKey);
  canvas.tabIndex = 0;

  // ---------------------------------------------------------------- paint
  function halo(key, colour) {
    if (halos.has(key)) return halos.get(key);
    const c = document.createElement('canvas');
    c.width = 64; c.height = 64;
    const x = c.getContext('2d');
    const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, colour); gr.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
    halos.set(key, c);
    return c;
  }
  const ease = (u) => 1 - Math.pow(1 - clamp(u, 0, 1), 3);

  function draw(now) {
    const ctx = c2;
    const k = cam.k;
    const focus = hover || picked;
    const near = focus ? g.neighbours.get(focus.id) || new Set() : null;
    const lit = (n) => {
      if (topic && n.kind !== 'tag' && n.topic !== topic && !(focus && near.has(n.id))) return false;
      if (topic && n.kind === 'tag' && n.tag !== topic) return false;
      return !focus || n === focus || near.has(n.id)
        || (focus.kind === 'item' && focus.topic && n.id === `t:${focus.topic}`)
        || (focus.kind === 'item' && n.branch && n.branch === focus.branch);
    };
    const visibleIn = new Map();
    g.nodes.forEach((n) => {
      if (n.kind === 'item' && shows(n.star)) {
        visibleIn.set(`t:${n.topic}`, (visibleIn.get(`t:${n.topic}`) || 0) + 1);
        if (n.branch) visibleIn.set(n.branch, (visibleIn.get(n.branch) || 0) + 1);
      }
    });
    const alive = (n) => (n.kind === 'item' ? shows(n.star) : (visibleIn.get(n.id) || 0) > 0);
    const grown = (n) => {
      if (!intro) return 1;
      const tag = n.kind === 'tag' ? n.tag : n.topic;
      return ease((now - intro.start - (intro.order.get(tag) ?? 0) * INTRO_STAGGER) / INTRO_MS);
    };
    const at = (n) => {
      const gr = grown(n);
      const hub = gr < 1 && n.kind !== 'tag' ? g.byId.get(`t:${n.topic}`) : null;
      if (!hub) return toScreen(cam, n.x, n.y);
      return toScreen(cam, hub.x + (n.x - hub.x) * gr, hub.y + (n.y - hub.y) * gr);
    };
    const sec = now / 1000;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = COL.bg;
    ctx.fillRect(0, 0, W, H);

    const driftX = cam.x * k * 0.04, driftY = cam.y * k * 0.04;
    ctx.fillStyle = COL.star;
    for (const d of DUST) {
      const x = (((d.x * W - driftX) % W) + W) % W, y = (((d.y * H - driftY) % H) + H) % H;
      ctx.globalAlpha = d.o;
      ctx.beginPath(); ctx.arc(x, y, d.r, 0, Math.PI * 2); ctx.fill();
    }

    // a faint cloud behind each topic
    for (const n of g.nodes) {
      if (n.kind !== 'tag' || !alive(n)) continue;
      const p = at(n);
      const r = Math.max(40, Math.sqrt(Math.min(n.count || 1, 30)) * LINK_DISTANCE * 0.4 * k);
      ctx.globalAlpha = 0.07 * (lit(n) ? 1 : 0.3);
      ctx.drawImage(halo('cloud', COL.star), p.x - r, p.y - r, r * 2, r * 2);
    }

    // hairlines that stop short of both ends; bridges only while one end is lit
    ctx.strokeStyle = COL.star;
    ctx.lineCap = 'round';
    for (const l of g.links) {
      if (l.type === 'dust' || !alive(l.source) || !alive(l.target)) continue;
      const bridge = l.type === 'bridge';
      if (bridge && !(focus && (l.source === focus || l.target === focus))) continue;
      const a = at(l.source), b = at(l.target);
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      if (len < LINE_GAP * 2 + 1) continue;
      const ux = (b.x - a.x) / len, uy = (b.y - a.y) / len;
      const hot = focus && (l.source === focus || l.target === focus);
      const family = (focus || topic) && lit(l.source) && lit(l.target);
      ctx.globalAlpha = bridge ? 0.45 : hot || family ? 0.6 : focus || topic ? 0.05 : 0.22;
      ctx.lineWidth = hot ? 1 : 0.75;
      if (bridge) ctx.setLineDash([2, 6]);
      ctx.beginPath();
      ctx.moveTo(a.x + ux * LINE_GAP, a.y + uy * LINE_GAP);
      ctx.lineTo(b.x - ux * LINE_GAP, b.y - uy * LINE_GAP);
      ctx.stroke();
      if (bridge) ctx.setLineDash([]);
    }

    for (const n of g.nodes) {
      if ((n.kind !== 'tag' && n.kind !== 'branch') || !alive(n)) continue;
      const p = at(n);
      ctx.globalAlpha = lit(n) ? (n.kind === 'tag' ? 0.8 : 0.55) : 0.2;
      ctx.fillStyle = COL.star;
      ctx.beginPath(); ctx.arc(p.x, p.y, n.kind === 'tag' ? 1.8 : 1.2, 0, Math.PI * 2); ctx.fill();
    }

    const close = k >= fit.k * 2.2;
    const shown = [];
    for (const n of g.nodes) {
      if (n.kind !== 'item' || !shows(n.star)) continue;
      const s = n.star;
      const p = at(n);
      if (p.x < -40 || p.y < -40 || p.x > W + 40 || p.y > H + 40) continue;
      shown.push({ n, p });
      const dropped = s.status === 'dropped';
      const colour = colourOf(s);
      const dim = (lit(n) ? 1 : 0.22) * Math.max(0.05, grown(n));
      if (n.dust && !close && n !== focus) {
        ctx.globalAlpha = (dropped ? 0.45 : 0.55) * (focus && !lit(n) ? 0.3 : 1) * grown(n);
        ctx.fillStyle = colour;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2); ctx.fill();
        continue;
      }
      let flash = 0;
      if (s.up && !reduce) {
        const a1 = Math.sin(sec * (0.7 + hash01(s.id, 'f1') * 0.9) + hash01(s.id, 'p1') * 6.28);
        const a2 = Math.sin(sec * (1.3 + hash01(s.id, 'f2') * 1.1) + hash01(s.id, 'p2') * 6.28);
        flash = Math.max(0, (a1 + a2) / 2) ** 3;
      }
      const base = Math.min(4.4, Math.max(2.4, 2.9 * Math.sqrt(k)));
      const body = (dropped ? base * 0.75 : base) * (1 + flash * 0.35);
      const shine = Math.min(1.6, (dropped ? 0.55 : 1) * (0.82 + flash * 0.5)) * dim;

      ctx.globalCompositeOperation = 'lighter';
      if (s.due) {
        const breathe = reduce ? 0.5 : 0.5 + 0.5 * Math.sin(now / 700 + hash01(s.id, 'due') * 6.28);
        const red = body * (5.5 + breathe * 1.5);
        ctx.globalAlpha = (0.55 + 0.3 * breathe) * dim;
        ctx.drawImage(halo('due', COL.due), p.x - red, p.y - red, red * 2, red * 2);
      }
      const glow = body * 3.8 * (1 + flash * 0.6);
      ctx.globalAlpha = Math.min(1, 0.5 * shine);
      ctx.drawImage(halo('h' + colour, colour), p.x - glow, p.y - glow, glow * 2, glow * 2);
      if (!dropped) {
        const reach = body * (3 + flash * 4);
        ctx.lineWidth = 0.7;
        for (const [dx, dy] of [[1, 0], [0, 1]]) {
          const gr = ctx.createLinearGradient(p.x - dx * reach, p.y - dy * reach, p.x + dx * reach, p.y + dy * reach);
          gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.5, colour); gr.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.strokeStyle = gr;
          ctx.globalAlpha = Math.min(1, (flash > 0.05 ? 0.8 : 0.5) * shine);
          ctx.beginPath(); ctx.moveTo(p.x - dx * reach, p.y - dy * reach); ctx.lineTo(p.x + dx * reach, p.y + dy * reach); ctx.stroke();
        }
      }
      ctx.globalCompositeOperation = 'source-over';
      const core = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, body);
      core.addColorStop(0, dropped ? colour : '#ffffff');
      core.addColorStop(dropped ? 0 : 0.35, colour);
      core.addColorStop(1, colour);
      ctx.globalAlpha = Math.min(1, shine * 1.1);
      ctx.fillStyle = core;
      ctx.beginPath(); ctx.arc(p.x, p.y, body, 0, Math.PI * 2); ctx.fill();
      if (n === focus || n === picked) {
        ctx.globalAlpha = 0.85;
        ctx.strokeStyle = COL.text;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(p.x, p.y, body + 5, 0, Math.PI * 2); ctx.stroke();
      }
    }

    // ------------------------------------------------------------- labels
    // Nothing draws over anything: topic names first, then titles by priority.
    const head = $('.ax-skyhead').getBoundingClientRect(), rb = root.getBoundingClientRect();
    const taken = [{ x: 0, y: 0, w: head.right - rb.left + 10, h: head.bottom - rb.top + 6 }, { x: W - 60, y: H - 100, w: 60, h: 100 }];
    if (!cap.classList.contains('off')) { const cb = cap.getBoundingClientRect(); taken.push({ x: cb.left - rb.left, y: cb.top - rb.top, w: cb.width, h: cb.height }); }
    if (!whole.hidden) taken.push({ x: W - 130, y: 0, w: 130, h: 56 });
    const free = (b) => !taken.some((r) => b.x < r.x + r.w + 3 && r.x < b.x + b.w + 3 && b.y < r.y + r.h + 3 && r.y < b.y + b.h + 3);
    nameBoxes = [];
    ctx.textBaseline = 'middle';
    const names = g.nodes.filter((n) => n.kind === 'tag' && alive(n)).sort((a, b) => b.count - a.count);
    for (const n of names) {
      const p = at(n);
      const members = g.nodes.filter((m) => m.topic === n.tag && m.kind === 'item' && !m.dust && alive(m));
      let top = p.y;
      members.forEach((m) => { top = Math.min(top, at(m).y); });
      const text = n.label.toUpperCase();
      ctx.font = `600 10.5px Geist, system-ui, sans-serif`;
      const tw = ctx.measureText(text).width * 1.14 + ctx.measureText(String(visibleIn.get(n.id) || 0)).width + 22;
      const cand = [
        { x: p.x - tw / 2, y: top - 26 },
        { x: p.x - tw / 2, y: p.y + 10 },
        { x: p.x + 10, y: p.y - 9 },
      ].map((c) => ({ x: clamp(c.x, 6, W - tw - 6), y: c.y, w: tw, h: 18 }));
      const box = cand.find((c) => c.y > 4 && c.y < H - 22 && free(c));
      if (!box) continue;
      taken.push(box);
      nameBoxes.push({ ...box, tag: n.tag });
      const on = lit(n) || topic === n.tag;
      ctx.globalAlpha = (on ? 0.95 : 0.35) * grown(n);
      ctx.fillStyle = 'rgba(22,22,31,.86)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(box.x, box.y, box.w, box.h, 9); else ctx.rect(box.x, box.y, box.w, box.h);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.1)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = COL.text;
      let x = box.x + 9;
      for (const ch of text) { ctx.fillText(ch, x, box.y + 9.5); x += ctx.measureText(ch).width * 1.14; }
      ctx.fillStyle = COL.dim;
      ctx.fillText(String(visibleIn.get(n.id) || 0), x + 5, box.y + 9.5);
    }

    const deep = k >= fit.k * 1.6;
    const titles = shown
      .filter(({ n }) => (deep && (!n.dust || close)) || n === focus || (focus && near.has(n.id) && n.kind === 'item') || (topic && n.topic === topic && k >= fit.k * 1.3))
      .map(({ n, p }) => ({ n, p, pri: n === focus ? 3 : n === picked ? 2.5 : near && near.has(n.id) ? 2 : 1 }))
      .sort((a, b) => b.pri - a.pri);
    ctx.font = `400 11.5px Geist, system-ui, sans-serif`;
    for (const { n, p, pri } of titles) {
      let text = n.star.t;
      const max = 170;
      if (ctx.measureText(text).width > max) {
        while (text.length > 6 && ctx.measureText(text + '…').width > max) text = text.slice(0, -1);
        text = text.trim() + '…';
      }
      const w = ctx.measureText(text).width;
      const right = { x: p.x + 9, y: p.y - 8, w, h: 16 };
      const left = { x: p.x - 9 - w, y: p.y - 8, w, h: 16 };
      const box = [right, left].find((b) => b.x > 4 && b.x + b.w < W - 4 && free(b));
      if (!box) continue;
      taken.push(box);
      ctx.globalAlpha = pri >= 2 ? 1 : lit(n) ? 0.78 : 0.25;
      ctx.fillStyle = pri >= 2 ? '#ffffff' : COL.text;
      ctx.fillText(text, box.x, box.y + 8);
    }
    ctx.globalAlpha = 1;
  }

  // ------------------------------------------------------------------- loop
  let lastChrome = '';
  function loop(now) {
    raf = 0;
    if (!running) return;
    if (!sim.settled()) sim.tick();
    if (flight) {
      const u = ease((now - flight.start) / flight.ms);
      cam = {
        x: flight.from.x + (flight.to.x - flight.from.x) * u,
        y: flight.from.y + (flight.to.y - flight.from.y) * u,
        k: flight.from.k * Math.pow(flight.to.k / flight.from.k, u),
      };
      if (u >= 1) flight = null;
    }
    if (intro && now - intro.start > INTRO_MS + intro.order.size * INTRO_STAGGER) intro = null;
    draw(now);
    const chrome = `${fitted()}|${topic}`;
    if (chrome !== lastChrome) { lastChrome = chrome; whole.hidden = fitted() && !topic; }
    // Twinkles and the due-today breath keep it alive; otherwise it rests.
    const moving = !sim.settled() || flight || intro || (!reduce && stars.some((s) => (s.up || s.due) && shows(s)));
    if (moving) raf = requestAnimationFrame(loop);
  }
  function kick() { if (!raf && running) raf = requestAnimationFrame(loop); }

  paintChrome();
  resize();
  kick();

  return {
    destroy() {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      t.clear();
      root.removeEventListener('keydown', onKey);
      root.classList.remove('ax-skyroot');
      root.innerHTML = '';
    },
    pause() { running = false; cancelAnimationFrame(raf); raf = 0; },
    resume() { if (!running) { running = true; kick(); } },
    // for the test harness: where a done star sits on screen
    _probe() {
      const n = g.nodes.find((x) => x.kind === 'item' && x.star.t === 'book the train to pune') || g.nodes.find((x) => x.kind === 'item');
      return toScreen(cam, n.x, n.y);
    },
  };
}
