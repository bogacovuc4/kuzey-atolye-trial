/* ==========================================================
   Main — renders components and wires up interactions
   ========================================================== */
(function () {
  const D = window.SITE_DATA;
  const UI = window.UI;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Reveal on scroll ---------- */
  const revealObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("is-visible");
                revealObserver.unobserve(e.target);
              }
            });
          },
          { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
        )
      : null;

  function observeReveals(root) {
    $$(".reveal:not(.is-visible)", root).forEach((el) => {
      if (revealObserver && !reduceMotion) revealObserver.observe(el);
      else el.classList.add("is-visible");
    });
  }

  /* ---------- Static renders ---------- */
  function render(selector, items, component) {
    const el = $(selector);
    if (el) el.innerHTML = items.map(component).join("");
  }

  render("[data-stats]", D.stats, UI.Stat);
  render("[data-services]", D.services, UI.ServiceItem);
  render("[data-principles]", D.principles, UI.Principle);
  render("[data-process]", D.process, UI.ProcessStep);
  render("[data-team]", D.team, UI.TeamCard);
  render("[data-faq]", D.faq, UI.FaqItem);

  /* ---------- Header: scrolled state ---------- */
  const header = $("[data-header]");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuBtn = $("[data-menu-toggle]");
  const menu = $("[data-mobile-menu]");

  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    header.classList.toggle("menu-open", open);
    document.body.classList.toggle("is-locked", open);
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add("is-open"));
      const first = $("a", menu);
      if (first) first.focus({ preventScroll: true });
    } else {
      menu.classList.remove("is-open");
      setTimeout(() => {
        if (!menu.classList.contains("is-open")) menu.hidden = true;
      }, 260);
    }
  }

  menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuBtn.focus();
    }
  });
  window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });

  /* ---------- Active nav link ---------- */
  const navLinks = $$(".nav__link");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          navLinks.forEach((l) => {
            const active = l.getAttribute("href") === "#" + e.target.id;
            l.classList.toggle("is-active", active);
            if (active) l.setAttribute("aria-current", "true");
            else l.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach((l) => {
      const s = $(l.getAttribute("href"));
      if (s) sectionObserver.observe(s);
    });
  }

  /* ---------- Projects + filters ---------- */
  const grid = $("[data-projects]");
  const filtersEl = $("[data-filters]");
  const filterStatus = $("[data-filter-status]");
  let activeFilter = "tumu";
  let visibleProjects = D.projects.slice();

  function renderFilters() {
    filtersEl.innerHTML = D.categories.map((c) => UI.FilterChip(c, c.id === activeFilter)).join("");
  }

  function renderProjects() {
    visibleProjects = activeFilter === "tumu" ? D.projects.slice() : D.projects.filter((p) => p.category === activeFilter);
    grid.innerHTML = visibleProjects.map(UI.ProjectCard).join("");
    observeReveals(grid);
  }

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn || btn.dataset.filter === activeFilter) return;
    activeFilter = btn.dataset.filter;
    $$("[data-filter]", filtersEl).forEach((b) => {
      const on = b === btn;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    grid.classList.add("is-switching");
    setTimeout(
      () => {
        renderProjects();
        grid.classList.remove("is-switching");
        filterStatus.textContent = visibleProjects.length + " proje gösteriliyor";
      },
      reduceMotion ? 0 : 180
    );
  });

  renderFilters();
  renderProjects();

  /* ---------- Dialog helper ---------- */
  function openDialog(dialog, opener) {
    dialog._opener = opener || document.activeElement;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    document.body.classList.add("is-locked");
  }

  function closeDialog(dialog) {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    document.body.classList.remove("is-locked");
  }

  $$("dialog").forEach((dialog) => {
    dialog.addEventListener("close", () => {
      document.body.classList.remove("is-locked");
      if (dialog._opener && document.contains(dialog._opener)) dialog._opener.focus();
    });
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog || e.target.closest("[data-modal-close]")) closeDialog(dialog);
    });
  });

  /* ---------- Project modal ---------- */
  const modal = $("[data-project-modal]");
  const modalBody = $("[data-modal-body]");
  let modalIndex = 0;

  function showProject(index) {
    const total = visibleProjects.length;
    modalIndex = (index + total) % total;
    modalBody.innerHTML = UI.ProjectDetail(visibleProjects[modalIndex], modalIndex, total);
    modalBody.scrollTop = 0;
    $(".modal__inner", modal).scrollTop = 0;
  }

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-project]");
    if (!btn) return;
    const idx = visibleProjects.findIndex((p) => p.id === btn.dataset.project);
    showProject(idx);
    openDialog(modal, btn);
  });

  modal.addEventListener("click", (e) => {
    const step = e.target.closest("[data-modal-step]");
    if (step) showProject(modalIndex + Number(step.dataset.modalStep));
  });

  modal.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea, select")) return;
    if (e.key === "ArrowRight") showProject(modalIndex + 1);
    if (e.key === "ArrowLeft") showProject(modalIndex - 1);
  });

  /* ---------- KVKK modal ---------- */
  const kvkk = $("[data-kvkk-modal]");
  $$("[data-kvkk-open]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      openDialog(kvkk, a);
    })
  );

  /* ---------- Testimonials slider ---------- */
  const tViewport = $("[data-t-viewport]");
  const tCount = $("[data-t-count]");
  let tIndex = 0;

  function showTestimonial(i) {
    const total = D.testimonials.length;
    tIndex = (i + total) % total;
    tViewport.classList.add("is-switching");
    setTimeout(
      () => {
        tViewport.innerHTML = UI.Testimonial(D.testimonials[tIndex]);
        tCount.textContent = String(tIndex + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");
        tViewport.classList.remove("is-switching");
      },
      reduceMotion ? 0 : 200
    );
  }

  tViewport.innerHTML = UI.Testimonial(D.testimonials[0]);
  tCount.textContent = "01 / " + String(D.testimonials.length).padStart(2, "0");
  $("[data-t-prev]").addEventListener("click", () => showTestimonial(tIndex - 1));
  $("[data-t-next]").addEventListener("click", () => showTestimonial(tIndex + 1));

  /* ---------- FAQ accordion ---------- */
  $("[data-faq]").addEventListener("click", (e) => {
    const trigger = e.target.closest(".accordion__trigger");
    if (!trigger) return;
    const open = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!open));
    trigger.closest(".accordion__item").classList.toggle("is-open", !open);
  });

  /* ---------- Count-up stats ---------- */
  function countUp(el) {
    const target = Number(el.dataset.count);
    if (reduceMotion) return;
    const dur = 1100;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    el.textContent = "0";
    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window) {
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            $$("[data-count]", e.target).forEach(countUp);
            statObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statObserver.observe($("[data-stats]"));
  }

  /* ---------- Contact form ---------- */
  const form = $("[data-contact-form]");
  const success = $("[data-form-success]");
  const submitBtn = $("[data-submit]");

  const validators = {
    name: (v) => (v.trim().length < 3 ? "Lütfen adınızı ve soyadınızı girin." : ""),
    email: (v) =>
      !v.trim() ? "E-posta adresinizi girin." : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Geçerli bir e-posta adresi girin (ör. ad@alanadi.com).",
    phone: (v) => (!v.trim() || /^[+\d\s()-]{10,}$/.test(v.trim()) ? "" : "Telefon numarasını kontrol edin."),
    type: (v) => (v ? "" : "Lütfen bir proje türü seçin."),
    message: (v) => (v.trim().length < 20 ? "Projenizi en az 20 karakterle kısaca anlatın." : ""),
    kvkk: (_v, el) => (el.checked ? "" : "Devam etmek için aydınlatma metnini onaylayın."),
  };

  function validateField(el) {
    const fn = validators[el.name];
    if (!fn) return true;
    const msg = fn(el.value, el);
    const errEl = $('[data-error-for="' + el.name + '"]', form);
    if (errEl) errEl.textContent = msg;
    el.setAttribute("aria-invalid", msg ? "true" : "false");
    el.closest(".field, .check")?.classList.toggle("has-error", !!msg);
    return !msg;
  }

  form.addEventListener("focusout", (e) => {
    if (e.target.name && validators[e.target.name] && e.target.type !== "checkbox") validateField(e.target);
  });
  form.addEventListener("input", (e) => {
    if (e.target.getAttribute("aria-invalid") === "true") validateField(e.target);
  });
  form.addEventListener("change", (e) => {
    if (e.target.name === "kvkk" || e.target.tagName === "SELECT") validateField(e.target);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = Object.keys(validators).map((n) => form.elements[n]);
    const results = fields.map(validateField);
    const firstInvalid = fields[results.indexOf(false)];
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add("is-loading");
    $(".btn__label", submitBtn).textContent = "Gönderiliyor…";

    // Demo: no backend is connected; simulate a network request.
    setTimeout(() => {
      submitBtn.classList.remove("is-loading");
      submitBtn.disabled = false;
      $(".btn__label", submitBtn).textContent = "Talebi Gönder";
      form.reset();
      $$("[aria-invalid]", form).forEach((el) => el.removeAttribute("aria-invalid"));
      success.hidden = false;
      success.focus?.();
    }, 1200);
  });

  form.addEventListener("input", () => {
    if (!success.hidden) success.hidden = true;
  });

  /* ---------- Misc ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  window.hydrateIcons();
  observeReveals(document);
})();
