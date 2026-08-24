// background music: auto-plays, no on/off button.
// If the browser blocks audio-with-sound autoplay, start it on first interaction.
const audio = document.getElementById("bgMusic");

function tryPlay() {
  const p = audio.play();
  if (p && typeof p.catch === "function") {
    p.catch(() => {
      const resume = () => {
        audio.play().catch(() => {});
        ["click", "touchstart", "keydown", "scroll", "mousemove", "pointerdown"].forEach((evt) =>
          window.removeEventListener(evt, resume),
        );
      };
      ["click", "touchstart", "keydown", "scroll", "mousemove", "pointerdown"].forEach((evt) =>
        window.addEventListener(evt, resume, { once: true, passive: true }),
      );
    });
  }
}
tryPlay();

const certCursor = document.getElementById("certCursor");

const certCards = document.querySelectorAll(".cert-card");

document.addEventListener("mousemove", function (e) {
  certCursor.style.left = e.clientX + "px";
  certCursor.style.top = e.clientY + "px";
});

certCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    certCursor.classList.add("show");
  });

  card.addEventListener("mouseleave", () => {
    certCursor.classList.remove("show");
  });

  /*
    Prevent direct PDF opening.
    The certificate remains a preview.
  */

  card.addEventListener("click", () => {
    const pdf = card.dataset.pdf;

    if (!pdf) return;

    certCursor.classList.add("clicked");

    setTimeout(() => {
      certCursor.classList.remove("clicked");
    }, 300);
  });
});

/* =========================================
   CERTIFICATE SCROLL TRAIN
========================================= */

const certSection = document.querySelector(".certificates-section");

const certTimeline = document.querySelector(".cert-timeline");

const updateCertificateTrain = () => {
  if (!certSection || !certTimeline) return;

  const rect = certSection.getBoundingClientRect();

  const viewportCenter = window.innerHeight / 2;

  const progress = Math.min(Math.max((viewportCenter - rect.top) / rect.height, 0), 1);

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
