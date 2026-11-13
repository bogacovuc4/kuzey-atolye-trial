/* ==========================================================
   Components — small pure functions that return HTML strings
   ========================================================== */
(function () {
  // Data is loaded asynchronously (js/data.js), so read it at render time.
  const D = {
    get categories() {
      return window.SITE_DATA.categories;
    },
    get projects() {
      return window.SITE_DATA.projects;
    },
    img: (id, w, h) => window.SITE_DATA.img(id, w, h),
  };
  const Icon = window.Icon;

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const pad = (n) => String(n).padStart(2, "0");

  const categoryLabel = (id) => (D.categories.find((c) => c.id === id) || {}).label || "";

  const Stat = (s, i) => `
    <div class="stat reveal" style="--delay:${i * 80}ms">
      <dt class="stat__label">${esc(s.label)}</dt>
      <dd class="stat__value"><span data-count="${s.value}">${s.value}</span>${esc(s.suffix)}</dd>
    </div>`;

  const FilterChip = (c, active) => `
    <button type="button" class="chip${active ? " is-active" : ""}" data-filter="${c.id}" aria-pressed="${active}">
      ${esc(c.label)}
      <span class="chip__count">${c.id === "tumu" ? D.projects.length : D.projects.filter((p) => p.category === c.id).length}</span>
    </button>`;

  const ProjectCard = (p, i) => {
    const wide = i % 4 === 0 || i % 4 === 3;
    const w = wide ? 1100 : 800;
    const h = wide ? Math.round((w * 5) / 7) : w;
    return `
    <li class="project-card ${wide ? "project-card--wide" : ""} reveal" style="--delay:${(i % 2) * 100}ms">
      <button type="button" class="project-card__btn" data-project="${p.id}" aria-haspopup="dialog">
        <span class="project-card__media">
          <img src="${D.img(p.image, w, h)}" width="${w}" height="${h}" loading="lazy" decoding="async" alt="${esc(p.alt)}" />
          <span class="project-card__view">${Icon("arrow-up-right", 22)}<span class="sr-only">Detayları gör</span></span>
        </span>
        <span class="project-card__meta">
          <span class="project-card__title">${esc(p.title)}</span>
          <span class="project-card__info">${esc(categoryLabel(p.category))} · ${esc(p.location)} · ${p.year}</span>
        </span>
      </button>
    </li>`;
  };

  const ProjectDetail = (p, index, total) => `
    <figure class="pd__media">
      <img src="${D.img(p.image, 1400, 900)}" width="1400" height="900" alt="${esc(p.alt)}" />
    </figure>
    <div class="pd__content">
      <p class="eyebrow">${esc(categoryLabel(p.category))}</p>
      <h2 class="h2 pd__title" id="modal-title">${esc(p.title)}</h2>
      <dl class="pd__facts">
        <div><dt>Konum</dt><dd>${esc(p.location)}</dd></div>
        <div><dt>Yıl</dt><dd>${p.year}</dd></div>
        <div><dt>Alan</dt><dd>${esc(p.area)}</dd></div>
      </dl>
      <p class="pd__summary">${esc(p.summary)}</p>
      <p class="pd__body">${esc(p.body)}</p>
      <div class="pd__nav">
        <button type="button" class="btn btn--ghost btn--sm" data-modal-step="-1">${Icon("arrow-left", 18)} Önceki</button>
        <span class="pd__count">${pad(index + 1)} / ${pad(total)}</span>
        <button type="button" class="btn btn--ghost btn--sm" data-modal-step="1">Sonraki ${Icon("arrow-right", 18)}</button>
      </div>
    </div>`;

  const ServiceItem = (s, i) => `
    <li class="service reveal" style="--delay:${i * 70}ms">
      <span class="service__num">${pad(i + 1)}</span>
      <span class="service__icon">${Icon(s.icon, 26)}</span>
      <div class="service__body">
        <h3 class="h3">${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
        <ul class="tags">${s.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </div>
    </li>`;

  const Principle = (p, i) => `
    <li class="principle reveal" style="--delay:${i * 90}ms">
      <span class="principle__icon">${Icon(p.icon, 22)}</span>
      <div>
        <h3 class="principle__title">${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
      </div>
    </li>`;

  const ProcessStep = (s, i) => `
    <li class="step reveal" style="--delay:${i * 100}ms">
      <span class="step__num">${pad(i + 1)}</span>
      <h3 class="h3 step__title">${esc(s.title)}</h3>
      <p class="step__duration">${Icon("clock", 16)} ${esc(s.duration)}</p>
      <p class="step__text">${esc(s.text)}</p>
    </li>`;

  const TeamCard = (m, i) => `
    <li class="member reveal" style="--delay:${i * 80}ms">
      <figure class="member__media">
        <img src="${D.img(m.image, 600, 750)}" width="600" height="750" loading="lazy" decoding="async" alt="${esc(m.name)} portresi" />
      </figure>
      <h3 class="member__name">${esc(m.name)}</h3>
      <p class="member__role">${esc(m.role)}</p>
      <p class="member__bio">${esc(m.bio)}</p>
    </li>`;

  const Testimonial = (t) => {
    const initials = t.name.split(" ").filter((w) => /^[A-ZÇĞİÖŞÜ]/.test(w)).slice(0, 2).map((w) => w[0]).join("");
    return `
    <figure class="testimonial">
      <span class="testimonial__mark">${Icon("quote", 36)}</span>
      <blockquote class="testimonial__quote">${esc(t.quote)}</blockquote>
      <figcaption class="testimonial__author">
        <span class="avatar" aria-hidden="true">${esc(initials)}</span>
        <span><strong>${esc(t.name)}</strong><span>${esc(t.project)}</span></span>
      </figcaption>
    </figure>`;
  };

  const FaqItem = (f, i) => `
    <div class="accordion__item reveal" style="--delay:${i * 60}ms">
      <h3 class="accordion__heading">
        <button type="button" class="accordion__trigger" aria-expanded="false" aria-controls="faq-panel-${i}" id="faq-trigger-${i}">
          <span>${esc(f.q)}</span>
          <span class="accordion__icon">${Icon("plus", 20)}</span>
        </button>
      </h3>
      <div class="accordion__panel" id="faq-panel-${i}" role="region" aria-labelledby="faq-trigger-${i}">
        <div class="accordion__panel-inner"><p>${esc(f.a)}</p></div>
      </div>
    </div>`;

  window.UI = { Stat, FilterChip, ProjectCard, ProjectDetail, ServiceItem, Principle, ProcessStep, TeamCard, Testimonial, FaqItem };
})();
