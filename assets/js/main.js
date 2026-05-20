/* ==========================================================================
   Speedtwin — main.js
   Header, navigation mobile, animations scroll, formulaire de contact.
   ========================================================================== */

(function () {
  "use strict";

  /* Mobile burger */
  const burger = document.querySelector(".nav__burger");
  const menu = document.querySelector(".nav__menu");
  if (burger && menu) {
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => menu.classList.remove("open"));
    });
  }

  /* Lien actif selon l'URL */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__link").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  /* Reveal on scroll */
  const reveals = document.querySelectorAll("[data-reveal]");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-revealed"));
  }

  /* Toast utility */
  window.SPEEDTWIN_TOAST = function (title, message) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.innerHTML = "<strong>" + title + "</strong><span>" + message + "</span>";
    toast.classList.add("is-visible");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove("is-visible"), 4200);
  };

  /* Contact form */
  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = contactForm.querySelector("[name=name]").value.trim();
      const email = contactForm.querySelector("[name=email]").value.trim();
      const message = contactForm.querySelector("[name=message]").value.trim();
      if (!name || !email || !message) {
        window.SPEEDTWIN_TOAST("Champs manquants", "Merci de remplir tous les champs.");
        return;
      }
      const subject = encodeURIComponent("Demande depuis le site Speedtwin");
      const body = encodeURIComponent(
        "Nom : " + name + "\nEmail : " + email + "\n\nMessage :\n" + message
      );
      window.location.href = "mailto:speedtwin.moto@gmail.com?subject=" + subject + "&body=" + body;
      window.SPEEDTWIN_TOAST(
        "Message en route",
        "Votre client email s'ouvre. À très vite !"
      );
      contactForm.reset();
    });
  }
})();
