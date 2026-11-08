// The hero background, in two parts:
//   1. Assembly: on the first visit, a cloud of dots forms the name, then the real text takes over.
//   2. Agents: dots leave the name and become a network that drifts gently, and yellow pulses
//      of work hand off across it.
// It only runs while the hero is on screen. With reduced motion it draws one still frame.
const hero = document.querySelector<HTMLElement>('[data-hero]')!;
const net = hero.querySelector<HTMLCanvasElement>('[data-net]')!;
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
const dpr = Math.min(devicePixelRatio || 1, 1.5);

const angle = (x: number, y: number, t: number) =>
  Math.sin(x * 0.0021 + t * 0.00006) * 1.7 + Math.cos(y * 0.0034 - t * 0.00004) * 1.5 + Math.sin((x + y) * 0.0012) * 0.8;
const ease = (p: number) => 1 - (1 - p) ** 4;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

interface Node { hx: number; hy: number; x: number; y: number; sx: number; sy: number; arrive: number; links: Edge[]; glow: number; dim: number; seen: boolean; }
interface Edge { a: Node; b: Node; from: Node; born: number; }
interface Pulse { n: Node; e: Edge; p: number; }

/* Where the dots of the name go: read from the page so they land exactly on the real text. */
function nameDots(w: number, h: number) {
  const off = document.createElement('canvas');
  off.width = w; off.height = h;
  const o = off.getContext('2d', { willReadFrequently: true })!;
  const box = hero.getBoundingClientRect();
  o.fillStyle = '#fff';
  hero.querySelectorAll<HTMLElement>('h1 .line > span').forEach((s) => {
    const cs = getComputedStyle(s);
    o.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    (o as any).letterSpacing = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;
    const r = s.getBoundingClientRect();
    const m = o.measureText(s.textContent!);
    const asc = m.fontBoundingBoxAscent, desc = m.fontBoundingBoxDescent;
    o.fillText(s.textContent!, r.left - box.left, r.top - box.top + (r.height - (asc + desc)) / 2 + asc);
  });
  const data = o.getImageData(0, 0, w, h).data;
  const gap = w < 600 ? 3 : 4;
  const dots: { sx: number; sy: number; x: number; y: number; delay: number; a: number }[] = [];
  for (let y = 0; y < h; y += gap) for (let x = 0; x < w; x += gap) {
    if (data[(y * w + x) * 4 + 3] > 128) dots.push({ sx: Math.random() * w, sy: Math.random() * h, x, y, delay: Math.random() * 700, a: 0.5 + Math.random() * 0.5 });
  }
  return dots;
}

/* The network, grown outward from the end of the name. */
function buildNetwork(w: number, h: number, dots: { x: number; y: number }[], start: number) {
  const step = w < 600 ? 84 : 108;
  const nodes: Node[] = [];
  const text = hero.querySelector('.hero-text')!.getBoundingClientRect();
  const box = hero.getBoundingClientRect();
  for (let y = step / 2; y < h; y += step) for (let x = step / 2; x < w; x += step) {
    if (Math.random() > 0.53) continue;
    const hx = x + (Math.random() - 0.5) * step * 0.8, hy = y + (Math.random() - 0.5) * step * 0.8;
    const inText = hx > text.left - box.left - 10 && hx < text.right - box.left + 10 && hy > text.top - box.top - 10 && hy < text.bottom - box.top + 10;
    const from = dots.length ? dots[Math.floor(Math.random() * dots.length)] : { x: hx, y: hy };
    nodes.push({ hx, hy, x: hx, y: hy, sx: from.x, sy: from.y, arrive: 0, links: [], glow: 0, dim: inText ? 0.4 : 1, seen: false });
  }
  const edges: Edge[] = [];
  for (const a of nodes) for (const b of nodes) {
    if (a !== b && a.hx < b.hx && Math.hypot(a.hx - b.hx, a.hy - b.hy) < step * 1.5 && a.links.length < 4 && b.links.length < 4) {
      const e: Edge = { a, b, from: a, born: 0 };
      edges.push(e); a.links.push(e); b.links.push(e);
    }
  }
  const ox = text.left - box.left + text.width * 0.55, oy = text.top - box.top + 120;
  let wave = [nodes.reduce((m, n) => (Math.hypot(n.hx - ox, n.hy - oy) < Math.hypot(m.hx - ox, m.hy - oy) ? n : m), nodes[0])];
  wave[0].seen = true;
  let when = start, last = start;
  while (wave.length) {
    const next: Node[] = [];
    for (const n of wave) {
      n.arrive = when + 750;
      last = Math.max(last, n.arrive);
      for (const e of n.links) {
        const o = e.a === n ? e.b : e.a;
        if (!o.seen) { o.seen = true; e.from = n; next.push(o); }
      }
    }
    wave = next;
    when += 140;
  }
  for (const n of nodes) if (!n.seen) { n.arrive = last; n.seen = true; }
  for (const e of edges) {
    const later = e.a.arrive > e.b.arrive ? e.a : e.b;
    e.from = later === e.a ? e.b : e.a;
    e.born = later.arrive - 420;
  }
  return { nodes, edges, ready: last };
}

async function start(intro: boolean) {
  await document.fonts.ready;
  let w = 0, h = 0;
  const c = net.getContext('2d')!;
  const fit = () => {
    w = hero.clientWidth; h = hero.clientHeight;
    net.width = w * dpr; net.height = h * dpr;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  fit();

  const dots = intro ? nameDots(w, h) : [];
  const released = intro ? 2100 : -2000; // when the name is formed and the network starts growing
  let graph = buildNetwork(w, h, dots.filter((_, i) => i % 7 === 0), released);
  let pulses: Pulse[] = [];

  addEventListener('resize', () => {
    if (hero.clientWidth === w) return;
    fit();
    graph = buildNetwork(w, h, [], -2000);
    pulses = [];
  });

  const drawName = (e: number) => {
    const fade = clamp01(1 - (e - 2100) / 500);
    if (fade <= 0) return;
    c.fillStyle = '#fff';
    for (const d of dots) {
      const p = ease(clamp01((e - d.delay) / 1300));
      c.globalAlpha = d.a * fade;
      c.fillRect(d.sx + (d.x - d.sx) * p, d.sy + (d.y - d.sy) * p, 2.4, 2.4);
    }
    c.globalAlpha = 1;
  };

  const drawNetwork = (e: number, t: number) => {
    for (const n of graph.nodes) {
      const sway = angle(n.hx, n.hy, t);
      const hx = n.hx + Math.cos(sway) * 16, hy = n.hy + Math.sin(sway) * 16;
      const p = ease(clamp01((e - (n.arrive - 750)) / 750));
      n.x = n.sx + (hx - n.sx) * p; n.y = n.sy + (hy - n.sy) * p;
    }
    c.lineWidth = 1;
    for (const ed of graph.edges) {
      if (e < ed.born) continue;
      const p = clamp01((e - ed.born) / 420);
      const to = ed.from === ed.a ? ed.b : ed.a;
      c.strokeStyle = `rgba(165,185,255,${0.2 * Math.min(ed.a.dim, ed.b.dim)})`;
      c.beginPath();
      c.moveTo(ed.from.x, ed.from.y);
      c.lineTo(ed.from.x + (to.x - ed.from.x) * p, ed.from.y + (to.y - ed.from.y) * p);
      c.stroke();
    }
    if (e > graph.ready - 400 && pulses.length < 14 && Math.random() < 0.05) {
      const n = graph.nodes[Math.floor(Math.random() * graph.nodes.length)];
      if (n.links.length) pulses.push({ n, e: n.links[Math.floor(Math.random() * n.links.length)], p: 0 });
    }
    pulses = pulses.filter((q) => {
      const to = q.e.a === q.n ? q.e.b : q.e.a;
      q.p += 0.016;
      c.fillStyle = `rgba(255,212,0,${0.45 + 0.55 * Math.min(q.n.dim, to.dim)})`;
      c.beginPath();
      c.arc(q.n.x + (to.x - q.n.x) * q.p, q.n.y + (to.y - q.n.y) * q.p, 2, 0, 7);
      c.fill();
      if (q.p < 1) return true;
      to.glow = 1;
      if (Math.random() < 0.72 && to.links.length) { q.n = to; q.e = to.links[Math.floor(Math.random() * to.links.length)]; q.p = 0; return true; }
      return false;
    });
    for (const n of graph.nodes) {
      if (e < n.arrive - 750) continue;
      n.glow *= 0.965;
      c.fillStyle = `rgba(195,210,255,${(0.5 + n.glow * 0.5) * n.dim})`;
      c.beginPath();
      c.arc(n.x, n.y, 2 + n.glow * 2.5, 0, 7);
      c.fill();
      if (n.glow > 0.05) {
        c.strokeStyle = `rgba(255,212,0,${n.glow * 0.7 * n.dim})`;
        c.beginPath();
        c.arc(n.x, n.y, 3 + (1 - n.glow) * 15, 0, 7);
        c.stroke();
      }
    }
  };

  if (calm) {
    drawNetwork(100000, 0);
    return;
  }

  let begun = 0, id = 0, visible = true;
  const tick = (t: number) => {
    begun ||= t;
    const e = t - begun;
    c.clearRect(0, 0, w, h);
    if (intro) {
      drawName(e);
      if (e > 2000) hero.classList.add('named');
    }
    drawNetwork(e, t);
    id = requestAnimationFrame(tick);
  };
  const sync = () => { cancelAnimationFrame(id); if (visible && !document.hidden) id = requestAnimationFrame(tick); };
  new IntersectionObserver((en) => { visible = en[0].isIntersecting; sync(); }).observe(hero);
  document.addEventListener('visibilitychange', sync);
  sync();
}

start(document.documentElement.classList.contains('intro'));
