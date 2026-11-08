// All of the site's scripted motion. Everything here is an enhancement:
// without JavaScript, or with reduced motion on, the pages are complete and still.
// Nothing here ever takes over the page's scrolling.
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mouse = matchMedia('(hover: hover) and (pointer: fine)').matches;

/* Ticket: tilts toward the pointer, with a light sheen. */
if (!calm && mouse) {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--rx', `${(0.5 - py) * 7}deg`);
      el.style.setProperty('--ry', `${(px - 0.5) * 5}deg`);
      el.style.setProperty('--sx', `${px * 100}%`);
      el.style.setProperty('--shine', '1');
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--shine', '0');
    });
  });
}

/* Things that play once when they scroll into view. */
if (!calm && 'IntersectionObserver' in window) {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight * 0.8) return;
    el.classList.add('ready');
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      el.classList.add('in');
      setTimeout(() => el.classList.add('done'), 1800);
    }, { threshold: 0.3 });
    io.observe(el);
  });
}
