// background music: auto-plays, no on/off button.
// If the browser blocks audio-with-sound autoplay, start it on first interaction.
const audio = document.getElementById('bgMusic');

function tryPlay() {
  const p = audio.play();
  if (p && typeof p.catch === 'function') {
    p.catch(() => {
      const resume = () => {
        audio.play().catch(() => {});
        ['click', 'touchstart', 'keydown', 'scroll', 'mousemove', 'pointerdown'].forEach(evt =>
          window.removeEventListener(evt, resume)
        );
      };
      ['click', 'touchstart', 'keydown', 'scroll', 'mousemove', 'pointerdown'].forEach(evt =>
        window.addEventListener(evt, resume, { once: true, passive: true })
      );
    });
  }
}
tryPlay();