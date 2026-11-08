// On the first visit, dots form a halftone of the portrait at the same moment dots form the name,
// then it sharpens into the photo. It plays once, and after that the photo stays still.
const hero = document.querySelector<HTMLElement>('[data-hero]')!;
const portrait = hero.querySelector<HTMLElement>('.portrait')!;

async function dots() {
  const img = new Image();
  img.src = '/images/shem.jpg';
  await img.decode();
  const box = hero.getBoundingClientRect(), r = portrait.getBoundingClientRect();
  const pw = Math.round(r.width), ph = Math.round(r.height);
  // Same crop as the photo: cover, positioned 58% 20%.
  const scale = Math.max(pw / img.width, ph / img.height);
  const dw = img.width * scale, dh = img.height * scale;
  const off = document.createElement('canvas');
  off.width = pw; off.height = ph;
  const o = off.getContext('2d', { willReadFrequently: true })!;
  o.drawImage(img, (pw - dw) * 0.58, (ph - dh) * 0.2, dw, dh);
  const data = o.getImageData(0, 0, pw, ph).data;
  const gap = pw < 340 ? 5 : 6;
  const w = hero.clientWidth, h = hero.clientHeight;
  const points: { sx: number; sy: number; x: number; y: number; s: number; delay: number }[] = [];
  for (let y = 0; y < ph; y += gap) for (let x = 0; x < pw; x += gap) {
    const i = (y * pw + x) * 4;
    const lum = (data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11) / 255;
    if (lum < 0.14) continue;
    points.push({ sx: Math.random() * w, sy: Math.random() * h, x: r.left - box.left + x, y: r.top - box.top + y, s: 1 + lum * (gap - 1), delay: Math.random() * 700 });
  }
  const cv = document.createElement('canvas');
  cv.className = 'fx fx-top';
  const dpr = Math.min(devicePixelRatio || 1, 1.5);
  cv.width = w * dpr; cv.height = h * dpr;
  hero.append(cv);
  const c = cv.getContext('2d')!;
  c.scale(dpr, dpr);
  let begun = 0;
  const tick = (t: number) => {
    begun ||= t;
    const e = t - begun;
    c.clearRect(0, 0, w, h);
    const fade = Math.min(1, Math.max(0, 1 - (e - 2100) / 500));
    c.fillStyle = '#fff';
    c.globalAlpha = fade * 0.92;
    for (const p of points) {
      const q = 1 - (1 - Math.min(1, Math.max(0, (e - p.delay) / 1300))) ** 4;
      c.fillRect(p.sx + (p.x - p.sx) * q, p.sy + (p.y - p.sy) * q, p.s, p.s);
    }
    if (e > 2050) hero.classList.add('photo-on');
    if (fade > 0) requestAnimationFrame(tick);
    else cv.remove();
  };
  requestAnimationFrame(tick);
}
// The intro class is only set on a first visit without reduced motion.
if (document.documentElement.classList.contains('intro')) dots();
