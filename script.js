// ---------- circuit trace scroll signature ----------
const nodes = document.querySelectorAll('.circuit .node');
const segs = document.querySelectorAll('.circuit .seg');
const sections = ['hero', 'projects', 'skills', 'contact'].map(id => {
  const el = id === 'hero' ? document.querySelector('.hero') : document.getElementById(id);
  return { id, el };
});
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = sections.findIndex(s => s.el === entry.target);
      nodes.forEach((n, i) => n.classList.toggle('active', i <= idx));
      segs.forEach((s, i) => s.classList.toggle('active', i < idx));
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => s.el && io.observe(s.el));

// ---------- background music (uses the bundled music.mp3) ----------
const audio = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let playing = false;

musicBtn.addEventListener('click', () => {
  if (!playing) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
  playing = !playing;
  musicBtn.classList.toggle('playing', playing);
});

audio.addEventListener('pause', () => {
  playing = false;
  musicBtn.classList.remove('playing');
});
audio.addEventListener('play', () => {
  playing = true;
  musicBtn.classList.add('playing');
});