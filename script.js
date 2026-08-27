// Background music: plays immediately on any page, no click required.
// Browsers always allow autoplay when a media element starts muted, so
// we start muted (guaranteed to succeed) and unmute right after playback
// begins — this works without any user interaction in Chrome/Edge/most
// browsers. As a safety net (older/strict browsers), if audio is still
// silent after a moment we unmute on the very first user interaction.
const audio = document.getElementById("bgMusic");

if (audio) {
  function unmuteSoon() {
    setTimeout(() => {
      audio.muted = false;
    }, 60);
  }

  function armInteractionFallback() {
    const resume = () => {
      audio.muted = false;
      audio.play().catch(() => {});
      [
        "click",
        "touchstart",
        "keydown",
        "scroll",
        "mousemove",
        "pointerdown",
      ].forEach((evt) => window.removeEventListener(evt, resume));
    };
    [
      "click",
      "touchstart",
      "keydown",
      "scroll",
      "mousemove",
      "pointerdown",
    ].forEach((evt) =>
      window.addEventListener(evt, resume, { once: true, passive: true }),
    );
  }

  const p = audio.play();

  if (p && typeof p.then === "function") {
    p.then(unmuteSoon).catch(armInteractionFallback);
  } else {
    unmuteSoon();
  }

  // Belt-and-suspenders: if for any reason playback is still muted
  // a couple seconds in, keep the interaction fallback ready too.
  setTimeout(() => {
    if (audio.muted || audio.paused) armInteractionFallback();
  }, 1500);
}

/* =========================================
   CERTIFICATE SCROLL TRAIN
========================================= */

const certSection = document.querySelector(".certificates-section");

const certTimeline = document.querySelector(".cert-timeline");

const updateCertificateTrain = () => {
  if (!certSection || !certTimeline) return;

  const rect = certSection.getBoundingClientRect();

  const viewportCenter = window.innerHeight / 2;

  const progress = Math.min(
    Math.max((viewportCenter - rect.top) / rect.height, 0),
    1,
  );

  certTimeline.style.setProperty("--train-progress", progress);
};

window.addEventListener("scroll", updateCertificateTrain, { passive: true });

window.addEventListener("resize", updateCertificateTrain);

updateCertificateTrain();

/* =========================================
   PROTECT PDF PREVIEW
========================================= */

document.addEventListener("contextmenu", function (e) {
  if (e.target.closest(".cert-preview") || e.target.closest(".cert-card")) {
    e.preventDefault();
  }
});

document.addEventListener("dragstart", function (e) {
  if (e.target.closest(".cert-preview") || e.target.closest(".cert-card")) {
    e.preventDefault();
  }
});
/* =========================================
   SCROLL-SPY NAVIGATION
   Highlights the nav link for whichever
   section is currently in view.
========================================= */

const navLinks = document.querySelectorAll("[data-nav]");

if (navLinks.length) {
  const sections = Array.from(navLinks)
    .map((link) => document.getElementById(link.dataset.nav))
    .filter(Boolean);

  const setActiveNav = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.nav === id);
    });
  };

  if ("IntersectionObserver" in window && sections.length) {
    let current = sections[0].id;

    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            current = entry.target.id;
          }
        });
        setActiveNav(current);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => spyObserver.observe(section));
  }
}
