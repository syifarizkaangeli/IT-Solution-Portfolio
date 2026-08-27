/* =========================================================
   14 PROJECTS DATA
========================================================= */

const PROJECTS = [
  {
    repo: "Fingerprint-Absensi",
    title: "Fingerprint Absensi",
    icon: "👆",
    desc: "School attendance system using an ESP32 + fingerprint sensor talking to a Laravel API.",
    tags: ["Laravel", "ESP32", "IoT"],
    live: "https://fingerprint-absensi-hardware.netlify.app",
  },
  {
    repo: "Cwipuffy-Bakery-Store",
    title: "Cwipuffy Bakery Store",
    icon: "🥐",
    desc: "Bakery ordering & table management system built with PHP.",
    tags: ["PHP", "MySQL"],
    live: null,
  },
  {
    repo: "Zetoro-Janaloka-Technology-team",
    title: "Zetoro Janaloka (Team)",
    icon: "🏢",
    desc: "Company website built collaboratively with the Zetoro Janaloka technology team.",
    tags: ["Laravel", "Team project"],
    live: "https://zetoro-janaloka-technology-team.netlify.app",
  },
  {
    repo: "Warehouse-Inventory",
    title: "Warehouse Inventory",
    icon: "📦",
    desc: "Inventory & stock management system with PDO-backed MySQL reporting.",
    tags: ["PHP", "MySQL"],
    live: null,
  },
  {
    repo: "Vulnerable-Resident-Management",
    title: "Resident Management",
    icon: "🏘️",
    desc: "Resident data management app — Python backend with a Netlify-hosted front end.",
    tags: ["Python"],
    live: "https://vulnerable-resident-management.netlify.app",
  },
  {
    repo: "Portfolio-Basic-CRUD",
    title: "Portfolio CRUD",
    icon: "🗂️",
    desc: "A basic CRUD portfolio app — full create/read/update/delete flow in PHP.",
    tags: ["PHP", "CRUD"],
    live: null,
  },
  {
    repo: "Syifaudz-Dzikri-Quran",
    title: "Syifaudz Dzikri Quran",
    icon: "📿",
    desc: "Al-Qur'an, dzikir & doa reading app with audio playback, pulling from a public Quran API.",
    tags: ["JavaScript", "API"],
    live: "https://syifaudz-dzikri-quran.netlify.app",
  },
  {
    repo: "Mobile-App-Dev-Portfolio",
    title: "Mobile App Portfolio",
    icon: "📱",
    desc: "This very portfolio site — the one you're looking at right now.",
    tags: ["HTML", "CSS", "JS"],
    live: null,
  },
  {
    repo: "Android-App",
    title: "Android App",
    icon: "🤖",
    desc: "Native Android application project.",
    tags: ["Android"],
    live: null,
  },
  {
    repo: "POS-Cashier",
    title: "POS Cashier",
    icon: "🧾",
    desc: "Point-of-sale cashier system for handling transactions and receipts.",
    tags: ["PHP", "MySQL"],
    live: null,
  },
  {
    repo: "IoT-Project",
    title: "IoT Project",
    icon: "📡",
    desc: "Internet-of-Things project connecting hardware sensors to a live dashboard.",
    tags: ["IoT", "Hardware"],
    live: null,
  },
  {
    repo: "Game-Development",
    title: "Game Development",
    icon: "🎮",
    desc: "A game development project exploring interactive logic and design.",
    tags: ["Game Dev"],
    live: null,
  },
  {
    repo: "Web-Development",
    title: "Web Development",
    icon: "🌐",
    desc: "General web development practice project.",
    tags: ["HTML", "CSS", "JS"],
    live: null,
  },
  {
    repo: "CRUD-System",
    title: "CRUD System",
    icon: "🗃️",
    desc: "A standalone create/read/update/delete system.",
    tags: ["CRUD"],
    live: null,
  },
];

(function renderWorkGrid() {
  const grid = document.getElementById("workGrid");
  if (!grid) return;

  const GH_USER = "syifarizkaangeli";

  PROJECTS.forEach((p) => {
    const card = document.createElement("article");
    card.className = "work-card";

    const previewHTML = p.live
      ? `<div class="work-preview work-preview-live">
           <iframe src="${p.live}" loading="lazy" title="${p.title} live preview" tabindex="-1"></iframe>
         </div>`
      : `<div class="work-preview work-preview-static">
           <img
             src="https://opengraph.githubassets.com/1/${GH_USER}/${p.repo}"
             alt="${p.title}"
             loading="lazy"
             onerror="this.parentElement.classList.add('img-failed')"
           />
           <span class="work-preview-fallback">${p.icon}</span>
         </div>`;

    card.innerHTML = `
      ${previewHTML}
      <div class="work-card-body">
        <div class="work-card-top">
          <span class="work-icon">${p.icon}</span>
          <h3>${p.title}</h3>
        </div>
        <p>${p.desc}</p>
        <div class="work-tags">
          ${p.tags.map((t) => `<span>${t}</span>`).join("")}
        </div>
        <div class="work-links">
          ${
            p.live
              ? `<a href="${p.live}" target="_blank" rel="noopener" class="work-link work-link-live">Live ↗</a>`
              : ""
          }
          <a
            href="https://github.com/${GH_USER}/${p.repo}"
            target="_blank"
            rel="noopener"
            class="work-link"
            >Code ↗</a
          >
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
})();
