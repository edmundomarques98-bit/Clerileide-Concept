const CONFIG = {
  // Contato informado no briefing. Atualize aqui se o número ganhar o nono dígito.
  whatsappNumber: "558896028018",
  defaultMessage:
    "Olá, conheci a Clerileide Concept pelo site e gostaria de agendar uma avaliação.",
};

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");
const whatsappLinks = document.querySelectorAll(".js-whatsapp");
const year = document.querySelector("[data-year]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

const closeMenu = () => {
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Abrir menu");
  navigation?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

const toggleMenu = () => {
  const isOpen = menuToggle?.getAttribute("aria-expanded") === "true";
  menuToggle?.setAttribute("aria-expanded", String(!isOpen));
  menuToggle?.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  navigation?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
};

menuToggle?.addEventListener("click", toggleMenu);
navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

whatsappLinks.forEach((link) => {
  const service = link.dataset.service;
  const message = service
    ? `Olá, conheci a Clerileide Concept pelo site e gostaria de saber mais sobre ${service}.`
    : CONFIG.defaultMessage;
  link.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;
});

if (year) year.textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

document.querySelectorAll("[data-accordion] details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll("[data-accordion] details").forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});
