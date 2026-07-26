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
const cartDrawer = document.querySelector("[data-cart-drawer]");
const cartBackdrop = document.querySelector(".cart-backdrop");
const cartOpenButton = document.querySelector("[data-cart-open]");
const cartCloseButtons = document.querySelectorAll("[data-cart-close]");
const cartAddButtons = document.querySelectorAll("[data-add-cart]");
const cartItemsElement = document.querySelector("[data-cart-items]");
const cartEmptyElement = document.querySelector("[data-cart-empty]");
const cartCountElement = document.querySelector("[data-cart-count]");
const cartSummaryElement = document.querySelector("[data-cart-summary]");
const cartCheckout = document.querySelector("[data-cart-checkout]");
const cartToast = document.querySelector("[data-cart-toast]");
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSlides = [...document.querySelectorAll("[data-hero-slide]")];
const heroDots = [...document.querySelectorAll("[data-hero-dot]")];
const heroPrevious = document.querySelector("[data-hero-prev]");
const heroNext = document.querySelector("[data-hero-next]");
const heroAutoplayButton = document.querySelector("[data-hero-autoplay]");
const heroAutoplayIcon = document.querySelector("[data-hero-autoplay-icon]");
const heroStatus = document.querySelector("[data-hero-status]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const CART_STORAGE_KEY = "clerileide-concept-sacola";
const HERO_AUTOPLAY_DELAY = 3000;

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

let activeHeroSlide = 0;
let heroAutoplayTimer;
let heroPointerStart;
let heroAutoplayDisabled = reduceMotion;

if (reduceMotion && heroAutoplayButton) {
  heroAutoplayButton.hidden = true;
}

const setHeroSlide = (requestedIndex, announce = false) => {
  if (!heroSlides.length) return;

  activeHeroSlide =
    (requestedIndex + heroSlides.length) % heroSlides.length;

  heroSlides.forEach((slide, index) => {
    const isActive = index === activeHeroSlide;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
    slide.toggleAttribute("inert", !isActive);
    slide.querySelectorAll("a, button").forEach((control) => {
      control.tabIndex = isActive ? 0 : -1;
    });
  });

  heroDots.forEach((dot, index) => {
    const isActive = index === activeHeroSlide;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-selected", String(isActive));
    dot.tabIndex = isActive ? 0 : -1;
  });

  if (announce && heroStatus) {
    heroStatus.textContent =
      heroSlides[activeHeroSlide]?.getAttribute("aria-label") || "";
  }
};

const stopHeroAutoplay = () => {
  window.clearInterval(heroAutoplayTimer);
  heroSlider?.classList.add("is-paused");
};

const startHeroAutoplay = (force = false) => {
  stopHeroAutoplay();

  const mouseIsOverSlider =
    window.matchMedia("(hover: hover)").matches &&
    heroSlider?.matches(":hover");
  const focusIsInsideSlider = heroSlider?.contains(document.activeElement);

  if (
    reduceMotion ||
    heroAutoplayDisabled ||
    document.hidden ||
    heroSlides.length < 2 ||
    (!force && mouseIsOverSlider) ||
    (!force && focusIsInsideSlider)
  ) {
    return;
  }

  heroSlider?.classList.remove("is-paused");
  heroAutoplayTimer = window.setInterval(() => {
    setHeroSlide(activeHeroSlide + 1);
  }, HERO_AUTOPLAY_DELAY);
};

const selectHeroSlide = (index) => {
  setHeroSlide(index, true);
  startHeroAutoplay();
};

heroPrevious?.addEventListener("click", () => {
  selectHeroSlide(activeHeroSlide - 1);
});

heroNext?.addEventListener("click", () => {
  selectHeroSlide(activeHeroSlide + 1);
});

heroAutoplayButton?.addEventListener("click", () => {
  heroAutoplayDisabled = !heroAutoplayDisabled;
  heroAutoplayButton.setAttribute(
    "aria-pressed",
    String(heroAutoplayDisabled),
  );
  heroAutoplayButton.setAttribute(
    "aria-label",
    heroAutoplayDisabled
      ? "Iniciar rotação automática"
      : "Pausar rotação automática",
  );

  if (heroAutoplayIcon) {
    heroAutoplayIcon.textContent = heroAutoplayDisabled ? "▶" : "Ⅱ";
  }

  if (heroStatus) {
    heroStatus.textContent = heroAutoplayDisabled
      ? "Rotação automática pausada."
      : "Rotação automática iniciada.";
  }

  if (heroAutoplayDisabled) stopHeroAutoplay();
  else startHeroAutoplay(true);
});

heroDots.forEach((dot, index) => {
  dot.addEventListener("click", () => selectHeroSlide(index));
  dot.addEventListener("keydown", (event) => {
    let nextIndex;

    if (event.key === "ArrowLeft") nextIndex = activeHeroSlide - 1;
    if (event.key === "ArrowRight") nextIndex = activeHeroSlide + 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = heroSlides.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    setHeroSlide(nextIndex, true);
    heroDots[activeHeroSlide]?.focus();
  });
});

heroSlider?.addEventListener("mouseenter", stopHeroAutoplay);
heroSlider?.addEventListener("mouseleave", startHeroAutoplay);
heroSlider?.addEventListener("focusin", stopHeroAutoplay);
heroSlider?.addEventListener("focusout", (event) => {
  if (!heroSlider.contains(event.relatedTarget)) startHeroAutoplay();
});

heroSlider?.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse") return;
  heroPointerStart = event.clientX;
  stopHeroAutoplay();
});

heroSlider?.addEventListener("pointerup", (event) => {
  if (heroPointerStart === undefined || event.pointerType === "mouse") return;

  const distance = event.clientX - heroPointerStart;
  heroPointerStart = undefined;

  if (Math.abs(distance) >= 50) {
    selectHeroSlide(activeHeroSlide + (distance < 0 ? 1 : -1));
  } else {
    startHeroAutoplay();
  }
});

heroSlider?.addEventListener("pointercancel", () => {
  heroPointerStart = undefined;
  startHeroAutoplay();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopHeroAutoplay();
  else startHeroAutoplay();
});

setHeroSlide(0);
startHeroAutoplay();

whatsappLinks.forEach((link) => {
  const service = link.dataset.service;
  const message = service
    ? `Olá, conheci a Clerileide Concept pelo site e gostaria de saber mais sobre ${service}.`
    : CONFIG.defaultMessage;
  link.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;
});

const loadCart = () => {
  try {
    const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    if (!Array.isArray(storedCart)) return [];

    return storedCart
      .filter(
        (item) =>
          typeof item?.id === "string" &&
          typeof item?.name === "string" &&
          typeof item?.type === "string" &&
          Number.isFinite(item?.quantity),
      )
      .map((item) => ({
        id: item.id,
        name: item.name,
        type: item.type,
        quantity: Math.min(Math.max(Math.trunc(item.quantity), 1), 99),
      }));
  } catch {
    return [];
  }
};

let cart = loadCart();
let toastTimer;
let backdropTimer;

const saveCart = () => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // A sacola continua funcionando durante a visita mesmo sem armazenamento local.
  }
};

const getCartTotal = () =>
  cart.reduce((total, item) => total + item.quantity, 0);

const buildCheckoutMessage = () => {
  const lines = [
    "Olá, conheci a Clerileide Concept pelo site e gostaria de finalizar esta seleção:",
    "",
  ];

  ["Produto", "Serviço"].forEach((type) => {
    const selectedItems = cart.filter((item) => item.type === type);
    if (!selectedItems.length) return;

    lines.push(type === "Produto" ? "*Produtos:*" : "*Serviços:*");
    selectedItems.forEach((item) => {
      lines.push(`• ${item.quantity}x ${item.name}`);
    });
    lines.push("");
  });

  lines.push(
    "Pode me informar os valores, a disponibilidade e os próximos passos?",
  );

  return lines.join("\n");
};

const createQuantityButton = (label, action, item) => {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.cartAction = action;
  button.dataset.itemId = item.id;
  button.setAttribute(
    "aria-label",
    `${label} quantidade de ${item.name}`,
  );
  button.textContent = action === "increase" ? "+" : "−";
  return button;
};

const createCartItem = (item) => {
  const listItem = document.createElement("li");
  listItem.className = "cart-item";

  const icon = document.createElement("span");
  icon.className = "cart-item-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = item.type === "Produto" ? "P" : "S";

  const copy = document.createElement("div");
  copy.className = "cart-item-copy";

  const type = document.createElement("small");
  type.textContent = item.type;

  const name = document.createElement("strong");
  name.textContent = item.name;

  copy.append(type, name);

  const actions = document.createElement("div");
  actions.className = "cart-item-actions";

  const quantity = document.createElement("div");
  quantity.className = "cart-quantity";
  quantity.append(createQuantityButton("Diminuir", "decrease", item));

  const quantityValue = document.createElement("span");
  quantityValue.textContent = String(item.quantity);
  quantityValue.setAttribute("aria-label", `${item.quantity} selecionado(s)`);
  quantity.append(quantityValue);
  quantity.append(createQuantityButton("Aumentar", "increase", item));

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "cart-remove";
  remove.dataset.cartAction = "remove";
  remove.dataset.itemId = item.id;
  remove.textContent = "Remover";
  remove.setAttribute("aria-label", `Remover ${item.name} da sacola`);

  actions.append(quantity, remove);
  listItem.append(icon, copy, actions);
  return listItem;
};

const renderCart = () => {
  const total = getCartTotal();
  const hasItems = total > 0;
  const itemLabel = `${total} ${total === 1 ? "item" : "itens"}`;

  if (cartItemsElement) {
    cartItemsElement.replaceChildren(...cart.map(createCartItem));
    cartItemsElement.hidden = !hasItems;
  }

  if (cartEmptyElement) cartEmptyElement.hidden = hasItems;
  if (cartCountElement) cartCountElement.textContent = String(total);
  if (cartSummaryElement) cartSummaryElement.textContent = itemLabel;

  cartOpenButton?.setAttribute(
    "aria-label",
    hasItems
      ? `Abrir sacola. ${itemLabel} selecionado${total === 1 ? "" : "s"}.`
      : "Abrir sacola. Nenhum item selecionado.",
  );

  if (cartCheckout) {
    cartCheckout.setAttribute("aria-disabled", String(!hasItems));
    cartCheckout.tabIndex = hasItems ? 0 : -1;
    cartCheckout.href = hasItems
      ? `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
          buildCheckoutMessage(),
        )}`
      : "#";
  }
};

const showCartToast = (itemName) => {
  if (!cartToast) return;

  cartToast.textContent = `${itemName} foi adicionado à sacola.`;
  cartToast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    cartToast.classList.remove("is-visible");
  }, 2600);
};

const openCart = () => {
  if (!cartDrawer || !cartBackdrop) return;

  closeMenu();
  window.clearTimeout(backdropTimer);
  cartBackdrop.hidden = false;
  cartDrawer.removeAttribute("inert");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("cart-open");

  window.requestAnimationFrame(() => {
    cartBackdrop.classList.add("is-visible");
    cartDrawer.classList.add("is-open");
    cartDrawer.querySelector(".cart-close")?.focus();
  });
};

const closeCart = () => {
  if (!cartDrawer || !cartBackdrop) return;

  cartBackdrop.classList.remove("is-visible");
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartDrawer.setAttribute("inert", "");
  document.body.classList.remove("cart-open");

  backdropTimer = window.setTimeout(() => {
    cartBackdrop.hidden = true;
  }, 400);
};

cartAddButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = {
      id: button.dataset.itemId,
      name: button.dataset.itemName,
      type: button.dataset.itemType,
    };

    if (!item.id || !item.name || !item.type) return;

    const selectedItem = cart.find((cartItem) => cartItem.id === item.id);
    if (selectedItem) {
      selectedItem.quantity = Math.min(selectedItem.quantity + 1, 99);
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    saveCart();
    renderCart();
    showCartToast(item.name);
  });
});

cartItemsElement?.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-cart-action]");
  if (!actionButton) return;

  const selectedItem = cart.find(
    (item) => item.id === actionButton.dataset.itemId,
  );
  if (!selectedItem) return;

  if (actionButton.dataset.cartAction === "increase") {
    selectedItem.quantity = Math.min(selectedItem.quantity + 1, 99);
  }

  if (actionButton.dataset.cartAction === "decrease") {
    selectedItem.quantity -= 1;
    if (selectedItem.quantity < 1) {
      cart = cart.filter((item) => item.id !== selectedItem.id);
    }
  }

  if (actionButton.dataset.cartAction === "remove") {
    cart = cart.filter((item) => item.id !== selectedItem.id);
  }

  saveCart();
  renderCart();
});

cartOpenButton?.addEventListener("click", openCart);
cartCloseButtons.forEach((button) => button.addEventListener("click", closeCart));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartDrawer?.classList.contains("is-open")) {
    closeCart();
    cartOpenButton?.focus();
  }
});

renderCart();

if (year) year.textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll("[data-reveal]");

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
