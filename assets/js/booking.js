/* ==========================================================================
   Speedtwin — booking.js
   Wizard de prise de rendez-vous (5 étapes).
   ========================================================================== */

(function () {
  "use strict";

  const DATA = window.SPEEDTWIN_DATA;
  if (!DATA) return;

  const root = document.querySelector("[data-wizard]");
  if (!root) return;

  const state = {
    brand: null,
    family: null,
    model: null,
    year: null,
    km: null,
    services: [],
    date: null,
    slot: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: ""
  };

  const steps = Array.from(root.querySelectorAll(".wizard__step"));
  const panels = Array.from(root.querySelectorAll(".wizard__panel"));
  const btnPrev = root.querySelector("[data-prev]");
  const btnNext = root.querySelector("[data-next]");
  const btnSubmit = root.querySelector("[data-submit]");
  let current = 0;

  function go(idx) {
    current = Math.max(0, Math.min(panels.length - 1, idx));
    panels.forEach((p, i) => p.classList.toggle("is-active", i === current));
    steps.forEach((s, i) => {
      s.classList.toggle("is-active", i === current);
      s.classList.toggle("is-done", i < current);
    });
    btnPrev.style.visibility = current === 0 ? "hidden" : "visible";
    btnNext.style.display = current === panels.length - 1 ? "none" : "inline-flex";
    btnSubmit.style.display = current === panels.length - 1 ? "inline-flex" : "none";

    if (current === panels.length - 1) renderSummary();
  }

  function setSelected(container, value) {
    container.querySelectorAll(".choice").forEach((c) => {
      c.classList.toggle("is-selected", c.dataset.value === value);
    });
  }

  /* ----- Étape 1 : Marque ----- */
  const brandPanel = root.querySelector("[data-panel=brand]");
  Object.keys(DATA.brands).forEach((key) => {
    const b = DATA.brands[key];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice";
    btn.dataset.value = key;
    btn.innerHTML =
      '<strong>' + b.name + '</strong>' +
      '<small>' + Object.keys(b.families).length + ' gammes</small>';
    btn.addEventListener("click", () => {
      state.brand = key;
      state.family = null;
      state.model = null;
      setSelected(brandPanel.querySelector(".choice-grid"), key);
      renderFamilies();
    });
    brandPanel.querySelector(".choice-grid").appendChild(btn);
  });

  /* ----- Étape 2 : Modèle ----- */
  const modelPanel = root.querySelector("[data-panel=model]");
  const familySelect = modelPanel.querySelector("[name=family]");
  const modelSelect = modelPanel.querySelector("[name=model]");

  function renderFamilies() {
    familySelect.innerHTML = '<option value="">— Choisir une gamme —</option>';
    modelSelect.innerHTML = '<option value="">— Choisir un modèle —</option>';
    if (!state.brand) return;
    const families = DATA.brands[state.brand].families;
    Object.keys(families).forEach((fam) => {
      const o = document.createElement("option");
      o.value = fam;
      o.textContent = fam;
      familySelect.appendChild(o);
    });
  }
  familySelect.addEventListener("change", () => {
    state.family = familySelect.value;
    modelSelect.innerHTML = '<option value="">— Choisir un modèle —</option>';
    if (!state.family) return;
    const models = DATA.brands[state.brand].families[state.family];
    models.forEach((m) => {
      const o = document.createElement("option");
      o.value = m;
      o.textContent = m;
      modelSelect.appendChild(o);
    });
  });
  modelSelect.addEventListener("change", () => (state.model = modelSelect.value));

  modelPanel.querySelector("[name=year]").addEventListener("input", (e) => (state.year = e.target.value));
  modelPanel.querySelector("[name=km]").addEventListener("input", (e) => (state.km = e.target.value));

  /* ----- Étape 3 : Prestations ----- */
  const servicePanel = root.querySelector("[data-panel=service]");
  const serviceGrid = servicePanel.querySelector(".choice-grid");
  DATA.services.forEach((s) => {
    const c = document.createElement("button");
    c.type = "button";
    c.className = "choice";
    c.dataset.value = s.id;
    c.innerHTML =
      '<strong>' + s.title + '</strong>' +
      '<small>Durée estimée : ' + s.duration + '</small>';
    c.addEventListener("click", () => {
      const i = state.services.indexOf(s.id);
      if (i >= 0) state.services.splice(i, 1);
      else state.services.push(s.id);
      c.classList.toggle("is-selected");
    });
    serviceGrid.appendChild(c);
  });

  /* ----- Étape 4 : Vue semaine ----- */
  const datePanel = root.querySelector("[data-panel=date]");
  const weekTitle = datePanel.querySelector("[data-week-title]");
  const weekGrid = datePanel.querySelector("[data-week-grid]");
  const btnWeekPrev = datePanel.querySelector("[data-week-prev]");
  const btnWeekNext = datePanel.querySelector("[data-week-next]");

  const DAY_NAMES = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const earliest = new Date(today.getTime() + 24 * 3600 * 1000);
  const latest = new Date(today.getTime() + 60 * 24 * 3600 * 1000);

  // Démarrer la semaine au lundi de la semaine d'earliest
  function startOfWeek(d) {
    const x = new Date(d); x.setHours(0, 0, 0, 0);
    const day = x.getDay(); // 0 = dim, 1 = lun
    const diff = (day === 0 ? -6 : 1 - day);
    x.setDate(x.getDate() + diff);
    return x;
  }
  let weekStart = startOfWeek(earliest);

  function fmtDate(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function renderWeek() {
    const end = new Date(weekStart); end.setDate(weekStart.getDate() + 6);
    weekTitle.textContent =
      "Semaine du " + weekStart.getDate() + " " + MONTHS[weekStart.getMonth()] +
      " au " + end.getDate() + " " + MONTHS[end.getMonth()] + " " + end.getFullYear();

    btnWeekPrev.disabled = weekStart <= startOfWeek(earliest);
    btnWeekNext.disabled = weekStart >= startOfWeek(latest);

    weekGrid.innerHTML = "";

    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart); d.setDate(weekStart.getDate() + i);
      const iso = fmtDate(d);
      const day = d.getDay();
      const slots = DATA.slots.days[day];
      const isPast = d < earliest;
      const isToday = sameDay(d, today);

      const card = document.createElement("div");
      card.className = "week__day" + (isToday ? " week__day--today" : "");
      if (!slots || isPast || d > latest) card.classList.add("week__day--closed");

      const head = document.createElement("h4");
      head.innerHTML = DAY_NAMES[day] + '<small>' + d.getDate() + "</small>";
      card.appendChild(head);

      const slotsBox = document.createElement("div");
      slotsBox.className = "week__slots";

      if (!slots || isPast || d > latest) {
        const closed = document.createElement("span");
        closed.className = "week__closed";
        closed.textContent = !slots ? "Fermé" : (isPast ? "Passé" : "Indispo.");
        slotsBox.appendChild(closed);
      } else {
        let available = 0;
        slots.forEach((time) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "slot";
          btn.textContent = time;
          // Pseudo-disponibilité déterministe pour la démo
          const hash = (d.getDate() * 31 + parseInt(time.replace(":", ""), 10)) % 7;
          if (hash === 0) {
            btn.disabled = true;
            btn.classList.add("disabled");
            btn.title = "Créneau déjà réservé";
          } else {
            available++;
            if (state.date === iso && state.slot === time) btn.classList.add("is-selected");
            btn.addEventListener("click", () => {
              state.date = iso;
              state.slot = time;
              weekGrid.querySelectorAll(".slot").forEach((s) => s.classList.remove("is-selected"));
              btn.classList.add("is-selected");
            });
          }
          slotsBox.appendChild(btn);
        });
        const count = document.createElement("span");
        count.className = "week__count";
        count.textContent = available + " créneau" + (available > 1 ? "x" : "");
        slotsBox.appendChild(count);
      }

      card.appendChild(slotsBox);
      weekGrid.appendChild(card);
    }
  }

  btnWeekPrev.addEventListener("click", () => {
    const ns = new Date(weekStart); ns.setDate(weekStart.getDate() - 7);
    if (ns >= startOfWeek(earliest)) { weekStart = ns; renderWeek(); }
  });
  btnWeekNext.addEventListener("click", () => {
    const ns = new Date(weekStart); ns.setDate(weekStart.getDate() + 7);
    if (ns <= startOfWeek(latest)) { weekStart = ns; renderWeek(); }
  });

  renderWeek();

  /* ----- Étape 5 : Coordonnées + résumé ----- */
  const contactPanel = root.querySelector("[data-panel=contact]");
  ["firstName", "lastName", "email", "phone", "notes"].forEach((f) => {
    const el = contactPanel.querySelector("[name=" + f + "]");
    if (el) el.addEventListener("input", (e) => (state[f] = e.target.value));
  });

  function renderSummary() {
    const sum = contactPanel.querySelector(".summary dl");
    const brandName = state.brand ? DATA.brands[state.brand].name : "—";
    const services = state.services
      .map((id) => DATA.services.find((s) => s.id === id))
      .filter(Boolean);
    const dateStr = state.date
      ? new Date(state.date + "T00:00").toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        })
      : "—";

    sum.innerHTML =
      '<dt>Marque</dt><dd>' + brandName + '</dd>' +
      '<dt>Modèle</dt><dd>' + (state.model || "—") + (state.year ? " (" + state.year + ")" : "") + '</dd>' +
      '<dt>Kilométrage</dt><dd>' + (state.km ? state.km + " km" : "—") + '</dd>' +
      '<dt>Prestations</dt><dd>' + (services.length ? services.map((s) => s.title).join(", ") : "—") + '</dd>' +
      '<dt>Date</dt><dd>' + dateStr + '</dd>' +
      '<dt>Créneau</dt><dd>' + (state.slot || "—") + '</dd>';
  }

  /* ----- Validation par étape ----- */
  function validateStep(idx) {
    if (idx === 0 && !state.brand) return "Choisissez la marque de votre moto.";
    if (idx === 1 && (!state.model || !state.year))
      return "Renseignez le modèle exact et l'année de mise en circulation.";
    if (idx === 2 && state.services.length === 0)
      return "Sélectionnez au moins une prestation.";
    if (idx === 3 && (!state.date || !state.slot))
      return "Choisissez une date et un créneau disponible.";
    if (idx === 4) {
      if (!state.firstName || !state.lastName)
        return "Renseignez votre nom complet.";
      if (!/^.+@.+\..+$/.test(state.email))
        return "Adresse email invalide.";
      if (!/^[0-9 +.-]{8,}$/.test(state.phone))
        return "Numéro de téléphone invalide.";
    }
    return null;
  }

  btnNext.addEventListener("click", () => {
    const err = validateStep(current);
    if (err) {
      window.SPEEDTWIN_TOAST("Étape incomplète", err);
      return;
    }
    go(current + 1);
  });
  btnPrev.addEventListener("click", () => go(current - 1));

  btnSubmit.addEventListener("click", () => {
    const err = validateStep(current);
    if (err) {
      window.SPEEDTWIN_TOAST("Vérification", err);
      return;
    }
    // Démo : on simule l'envoi puis on affiche la confirmation.
    root.innerHTML =
      '<div style="text-align:center;padding:40px 16px;">' +
      '<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" stroke-width="2" style="margin:0 auto 24px;">' +
      '<circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>' +
      '<h2>Demande envoyée !</h2>' +
      '<p class="lead" style="margin: 16px auto 24px;">Merci ' +
      state.firstName +
      ' — nous vous confirmons votre rendez-vous par email et SMS dans les heures qui viennent. Pour toute urgence : <a href="tel:+33754804859" class="text-accent">07 54 80 48 59</a>.</p>' +
      '<a href="index.html" class="btn btn--ghost">Retour à l\'accueil</a>' +
      "</div>";
    // En prod : POST vers une API ou un service comme Formspree/Make.com
  });

  go(0);
})();
