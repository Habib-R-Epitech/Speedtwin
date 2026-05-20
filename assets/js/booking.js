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
      '<small>' + s.duration + (s.priceFrom > 0 ? ' • à partir de ' + s.priceFrom + ' €' : ' • sur devis') + '</small>';
    c.addEventListener("click", () => {
      const i = state.services.indexOf(s.id);
      if (i >= 0) state.services.splice(i, 1);
      else state.services.push(s.id);
      c.classList.toggle("is-selected");
    });
    serviceGrid.appendChild(c);
  });

  /* ----- Étape 4 : Date & créneau ----- */
  const datePanel = root.querySelector("[data-panel=date]");
  const dateInput = datePanel.querySelector("[name=date]");
  const slotGrid = datePanel.querySelector(".slot-grid");

  const now = new Date();
  const min = new Date(now.getTime() + 24 * 3600 * 1000);
  const max = new Date(now.getTime() + 60 * 24 * 3600 * 1000);
  dateInput.min = min.toISOString().split("T")[0];
  dateInput.max = max.toISOString().split("T")[0];
  dateInput.value = min.toISOString().split("T")[0];

  function renderSlots() {
    slotGrid.innerHTML = "";
    if (!dateInput.value) return;
    const d = new Date(dateInput.value + "T00:00");
    const day = d.getDay();
    const slots = DATA.slots.days[day];
    if (!slots) {
      slotGrid.innerHTML = '<p class="text-dim" style="grid-column:1/-1;text-align:center;padding:24px;">Atelier fermé ce jour-là. Mardi au samedi uniquement.</p>';
      state.slot = null;
      return;
    }
    slots.forEach((time) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "slot";
      btn.textContent = time;
      btn.dataset.value = time;
      // Pseudo-aléatoire : quelques créneaux indisponibles selon la date pour réalisme
      const hash = (d.getDate() * 31 + parseInt(time.replace(":", ""), 10)) % 7;
      if (hash === 0) {
        btn.disabled = true;
        btn.classList.add("disabled");
        btn.title = "Créneau déjà réservé";
      } else {
        btn.addEventListener("click", () => {
          state.slot = time;
          slotGrid.querySelectorAll(".slot").forEach((s) => s.classList.remove("is-selected"));
          btn.classList.add("is-selected");
        });
      }
      slotGrid.appendChild(btn);
    });
  }
  dateInput.addEventListener("change", () => {
    state.date = dateInput.value;
    state.slot = null;
    renderSlots();
  });
  state.date = dateInput.value;
  renderSlots();

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
    const total = services.reduce((acc, s) => acc + (s.priceFrom || 0), 0);
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
      '<dt>Créneau</dt><dd>' + (state.slot || "—") + '</dd>' +
      '<dt>Estimation</dt><dd>' + (total > 0 ? "À partir de " + total + " €" : "Sur devis") + '</dd>';
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
