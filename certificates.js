/* =========================================================
   CERTIFICATE DATA
========================================================= */

const CERTIFICATES = [
  {
    file: "Sertifikat_Kompetensi_BNSP_Junior_Assistant_Programmer.pdf",
    title: "Junior Assistant Programmer",
    category: "BNSP Competency Certification",
  },
  {
    file: "Sertifikat_Bootcamp_FrontEnd_Programming_ITS.pdf",
    title: "Front-End Programming Bootcamp",
    category: "ITS",
  },
  {
    file: "Sertifikat_National_Logic_Competition_ITS.pdf",
    title: "National Logic Competition",
    category: "ITS",
  },
  {
    file: "Sertifikat_Data_Science_Machine_Learning_Dibimbing.pdf",
    title: "Data Science & Machine Learning",
    category: "Dibimbing",
  },
  {
    file: "Sertifikat_Internship_Software_Developer_Zetoro_Janaloka.pdf",
    title: "Software Developer Internship",
    category: "Zetoro Janaloka",
  },
  {
    file: "Sertifikat_PKL_ITS.pdf",
    title: "Industrial Work Practice (PKL)",
    category: "ITS",
  },
  {
    file: "Sertifikat_Webinar_Arsitek_IT_Universitas_Ma_Chung.pdf",
    title: "Webinar: IT Architect",
    category: "Universitas Ma Chung",
  },
  {
    file: "Sertifikat_Spectacular_Public_Speaking_Galeria_Potensi.pdf",
    title: "Spectacular Public Speaking",
    category: "Galeria Potensi",
  },
  {
    file: "Sertifikat_Webinar_Public_Speaking_Galeria_Potensi_1.pdf",
    title: "Webinar: Public Speaking I",
    category: "Galeria Potensi",
  },
  {
    file: "Sertifikat_Webinar_Public_Speaking_Galeria_Potensi_2.pdf",
    title: "Webinar: Public Speaking II",
    category: "Galeria Potensi",
  },
  {
    file: "Sertifikat_Webinar_Public_Speaking_Galeria_Potensi_3.pdf",
    title: "Webinar: Public Speaking III",
    category: "Galeria Potensi",
  },
  {
    file: "Sertifikat_Workshop_Business_Model_Canvas_2025_Undika.pdf",
    title: "Business Model Canvas Workshop",
    category: "Undika · 2025",
  },
  {
    file: "Sertifikat_Workshop_Business_Model_Canvas_Undika.pdf",
    title: "Business Model Canvas Workshop",
    category: "Undika",
  },
  {
    file: "Sertifikat_Workshop_Membangun_Usaha_Sedari_Muda_Undika.pdf",
    title: "Building a Business Young",
    category: "Undika",
  },
  {
    file: "Sertifikat_Workshop_Pengenalan_Bisnis_Undika.pdf",
    title: "Introduction to Business",
    category: "Undika",
  },
  {
    file: "Sertifikat_Pelatihan_Entrepreneur_Young_Undika.pdf",
    title: "Young Entrepreneur Training",
    category: "Undika",
  },
  {
    file: "Sertifikat_English_Basic_Grammar_Central_Course.pdf",
    title: "Basic English Grammar",
    category: "Central Course",
  },
  {
    file: "Sertifikat Webinar Ai Security Syifa Rizkia Angeli.pdf",
    title: "Webinar: AI Security",
    category: "Cybersecurity",
  },
  {
    file: "Sertifikat_Mandarin_Conversation_Kunkwan.pdf",
    title: "Mandarin Conversation",
    category: "Kunkwan",
  },
];

/* =========================================================
   3D COVERFLOW CAROUSEL
========================================================= */

(function initCertCarousel() {
  const track = document.getElementById("certTrack");
  const dotsWrap = document.getElementById("certDots");
  const prevBtn = document.getElementById("certPrev");
  const nextBtn = document.getElementById("certNext");
  const stage = document.getElementById("certStage");
  const progressFill = document.getElementById("certProgress");

  if (!track) return;

  const total = CERTIFICATES.length;
  let active = 0;
  let autoplayTimer = null;
  let progressStart = null;
  const AUTOPLAY_MS = 4200;

  /* build slides */

  function thumbPath(file) {
    const base = file.replace(/\.pdf$/i, "").replace(/ /g, "_");
    return `certificates/thumbs/${encodeURIComponent(base)}-1.jpg`;
  }

  const slides = CERTIFICATES.map((cert, index) => {
    const slide = document.createElement("div");
    slide.className = "cert-slide";
    slide.dataset.index = String(index);

    slide.innerHTML = `
      <div class="cert-slide-inner">
        <div class="cert-slide-preview">
          <img src="${thumbPath(cert.file)}" alt="${cert.title}" loading="lazy" />
          <div class="cert-slide-overlay"><span>VIEW CERTIFICATE ↗</span></div>
        </div>
        <div class="cert-slide-meta">
          <span class="cert-slide-index">${String(index + 1).padStart(2, "0")} / ${total}</span>
          <h3>${cert.title}</h3>
          <p>${cert.category}</p>
        </div>
      </div>
    `;

    track.appendChild(slide);
    return slide;
  });

  /* build dots */

  const dots = CERTIFICATES.map((_, index) => {
    const dot = document.createElement("button");
    dot.className = "cert-dot";
    dot.setAttribute("aria-label", `Go to certificate ${index + 1}`);
    dot.addEventListener("click", () => goTo(index));
    dotsWrap.appendChild(dot);
    return dot;
  });

  /* shortest signed circular distance from `active` to `index` */

  function offsetOf(index) {
    let diff = index - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  }

  function render() {
    slides.forEach((slide, index) => {
      const offset = offsetOf(index);
      const abs = Math.abs(offset);

      const translateX = offset * 230;
      const rotateY = Math.max(-58, Math.min(58, offset * -42));
      const translateZ = -abs * 220;
      const scale = Math.max(0.6, 1 - abs * 0.16);
      const opacity = abs > 3 ? 0 : Math.max(0, 1 - abs * 0.32);
      const zIndex = 100 - abs;

      slide.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      slide.style.opacity = String(opacity);
      slide.style.zIndex = String(zIndex);
      slide.style.pointerEvents = abs > 3 ? "none" : "auto";

      slide.classList.toggle("is-active", offset === 0);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === active);
    });
  }

  function goTo(index, userTriggered = true) {
    active = ((index % total) + total) % total;
    render();
    if (userTriggered) restartAutoplay();
  }

  function next(userTriggered = true) {
    goTo(active + 1, userTriggered);
  }

  function prev(userTriggered = true) {
    goTo(active - 1, userTriggered);
  }

  /* click handling: side slides navigate, active slide opens the PDF */

  slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      if (offsetOf(index) !== 0) {
        goTo(index);
        return;
      }
      window.open(
        `certificates/${encodeURIComponent(CERTIFICATES[index].file)}`,
        "_blank",
        "noopener",
      );
    });
  });

  prevBtn.addEventListener("click", () => prev());
  nextBtn.addEventListener("click", () => next());

  document.addEventListener("keydown", (e) => {
    if (!isCarouselInView()) return;
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  function isCarouselInView() {
    const rect = stage.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  /* touch swipe */

  let touchStartX = null;

  stage.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true },
  );

  stage.addEventListener(
    "touchend",
    (e) => {
      if (touchStartX === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) > 40) {
        deltaX < 0 ? next() : prev();
      }
      touchStartX = null;
    },
    { passive: true },
  );

  /* autoplay with visible progress rail */

  function runProgress() {
    progressFill.classList.remove("is-animating");
    progressFill.style.transition = "none";
    progressFill.style.width = "0%";

    void progressFill.offsetWidth;

    progressFill.classList.add("is-animating");
    progressFill.style.transition = `width ${AUTOPLAY_MS}ms linear`;
    progressFill.style.width = "100%";
  }

  function startAutoplay() {
    stopAutoplay();
    runProgress();
    autoplayTimer = setInterval(() => {
      next(false);
      runProgress();
    }, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  function restartAutoplay() {
    if (prefersReducedMotion()) return;
    startAutoplay();
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  stage.addEventListener("mouseenter", stopAutoplay);
  stage.addEventListener("mouseleave", () => restartAutoplay());

  render();

  if (!prefersReducedMotion()) {
    startAutoplay();
  }
})();
