/* ==========================================================
   EDIT YOUR CONTENT HERE: socials, projects, skills.
   Leave a url as "" and the link shows as disabled.
   ========================================================== */
const SOCIALS = [
  { name: "GitHub",   icon: "github",   url: "" },   // e.g. "https://github.com/your-username"
  { name: "LinkedIn", icon: "linkedin", url: "" },
  { name: "Facebook", icon: "facebook", url: "" },
  { name: "Email",    icon: "mail",     url: "" }    // e.g. "mailto:you@example.com"
];


const PROJECTS = [
  {
    title: "LabWatch",
    image: "./LabWatch.png",
    description: "IoT-based smart monitoring system that detects selected IT laboratory policy violations, sends real-time alerts, and records incidents.",
    tech: ["Python", "YOLO11", "PHP", "MySQL"],
    repo: "",
    demo: "",
    uses: ["HTML5", "CSS3", "JavaScript", "PHP", "Python", "MySQL", "YOLO11", "OpenCV", "YuNet", "SFace", "VS Code", "XAMPP", "phpMyAdmin"]
  },
  {
    title: "Smile Essential Dental Clinic",
    image: "./SmileEssentials.png",
    description: "Full-stack dental clinic management system built as a capstone project.",
    tech: ["Full-Stack", "Web App"],
    repo: "",
    demo: "",
    uses: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"]
  },
  {
    title: "Daybreak Coffee",
    image: "./DaybreakCoffee.png",
    description: "A warm and modern café website concept highlighting signature drinks, menu items, and a welcoming coffeehouse experience.",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "",
    demo: "",
    uses: ["HTML5", "CSS3", "JavaScript"]
  }
];


const SKILLS = [
  { title: "Front-End", icon: "</>", note: "Responsive, accessible interfaces.", items: ["HTML5", "CSS3", "JavaScript"] },
  { title: "Back-End & Database", icon: "{ }", note: "Server-side logic and data storage.", items: ["PHP", "Python", "MySQL"] },
  { title: "AI & Computer Vision", icon: "AI", note: "Detection and recognition for smart monitoring.", items: ["YOLO11", "OpenCV", "YuNet", "SFace"] },
  { title: "Tools", icon: "◆", note: "My everyday development environment.", items: ["VS Code", "XAMPP", "phpMyAdmin"] }
];

/* ---------- Helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Generated placeholder used when a project image is missing */
function placeholder(title) {
  const t = esc(title.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase());
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b1535"/><stop offset="1" stop-color="#0d1426"/></linearGradient></defs><rect width="640" height="400" fill="url(#g)"/><text x="50%" y="54%" font-family="Arial" font-weight="700" font-size="96" fill="#8B5CF6" opacity=".75" text-anchor="middle">${t}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* ---------- Socials (hero + footer) ---------- */
function renderSocials() {
  const html = SOCIALS.map(s => {
    const svg = `<svg class="icon" aria-hidden="true"><use href="#i-${s.icon}"/></svg>`;
    return s.url
      ? `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.name)}">${svg}</a></li>`
      : `<li><span class="off" role="img" aria-label="${esc(s.name)} link not set" title="Add your ${esc(s.name)} link in script.js">${svg}</span></li>`;
  }).join("");
  $("#heroSocial").innerHTML = html;
  $("#footSocial").innerHTML = html;
}

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

function observe(root = document) {
  root.querySelectorAll(".reveal:not(.in)").forEach(el => reduced ? el.classList.add("in") : io.observe(el));
}

/* ---------- Projects ---------- */
function linkOrOff(url, label) {
  return url ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`
             : `<span class="off" title="Add this link in script.js">${label} (not set)</span>`;
}
function renderProjects() {
  $("#projectGrid").innerHTML = PROJECTS.map((p, i) => `
    <article class="card reveal" style="--i:${i}">
      <div class="thumb"><img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" width="640" height="400"></div>
      <div class="card-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.description)}</p>
        <ul class="badges" aria-label="Technologies">${p.tech.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="links">${linkOrOff(p.repo, "GitHub")}${p.demo ? linkOrOff(p.demo, "Live demo") : ""}</div>
      </div>
    </article>`).join("");
  document.querySelectorAll(".thumb img").forEach((img, i) => {
    img.addEventListener("error", () => { img.onerror = null; img.src = placeholder(PROJECTS[i].title); }, { once: true });
  });
  observe($("#projectGrid"));
}

/* ---------- Skills (click a skill to see the projects/websites that use it) ---------- */
function renderSkills() {
  let k = 0;
  $("#skillGrid").innerHTML = SKILLS.map((s, i) => `
    <article class="skill reveal" style="--i:${i}">
      <div class="skill-head"><span class="skill-ico" aria-hidden="true">${esc(s.icon)}</span><h3>${esc(s.title)}</h3></div>
      <p>${esc(s.note)}</p>
      <ul class="badges" aria-label="${esc(s.title)} skills">${s.items.map(t =>
        `<li><button type="button" class="sk" style="--k:${k++}" aria-pressed="false" aria-controls="skillPanel" data-skill="${esc(t)}">${esc(t)}</button></li>`).join("")}</ul>
    </article>`).join("");
  observe($("#skillGrid"));

  const panel = $("#skillPanel"), box = $("#skBox");
  let current = null;
  const setOpen = open => {
    panel.classList.toggle("open", open);
    panel.inert = !open;                       // keep hidden links out of the tab order
    if (!open) { current = null; document.querySelectorAll(".sk").forEach(b => b.setAttribute("aria-pressed", "false")); }
  };
  $("#skillGrid").addEventListener("click", e => {
    const btn = e.target.closest(".sk");
    if (!btn) return;
    const skill = btn.dataset.skill;
    if (current === skill) return setOpen(false);          // click again to close
    current = skill;
    document.querySelectorAll(".sk").forEach(b => b.setAttribute("aria-pressed", b === btn));
    const list = PROJECTS.filter(p => (p.uses || []).includes(skill));
    box.innerHTML = `<button type="button" class="sk-close" aria-label="Close projects">&times;</button>
      <h3>Projects using <span>${esc(skill)}</span></h3>` + (list.length
      ? `<div class="sk-list">${list.map((p, i) => `
          <article class="sk-proj" style="--i:${i}"><h4>${esc(p.title)}</h4><p>${esc(p.description)}</p>
            <div class="links">${linkOrOff(p.demo, "Visit website")}${p.repo ? linkOrOff(p.repo, "GitHub") : ""}</div></article>`).join("")}</div>`
      : `<p class="sk-empty">No project is linked to ${esc(skill)} yet. Add it to a project's <code>uses</code> list in script.js.</p>`);
    setOpen(true);
    panel.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
  });
  box.addEventListener("click", e => { if (e.target.closest(".sk-close")) setOpen(false); });
  addEventListener("keydown", e => { if (e.key === "Escape" && current) setOpen(false); });
}

/* ---------- Navigation ---------- */
function initNav() {
  const nav = $("#nav"), burger = $("#burger"), menu = $("#menu");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 24);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const setMenu = open => { menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); };
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  // Active link indicator
  const links = [...menu.querySelectorAll("a")];
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => {
        const on = a.getAttribute("href") === "#" + e.target.id;
        a.classList.toggle("active", on);
        on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["home", "projects", "skills"].forEach(id => spy.observe(document.getElementById(id)));
}

/* ---------- Init ---------- */
$("#year").textContent = new Date().getFullYear();
renderSocials();
renderProjects();
renderSkills();
observe();
initNav();
