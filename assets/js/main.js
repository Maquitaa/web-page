/* ═══════════════════════════════════════════════════════
   DataShield Consulting · main.js
   Interacciones del sitio (sin dependencias externas)
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ── 1. NAV: blur + clase activa al hacer scroll ──────── */
(function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;

    // Añade sombra sutil tras 20px de scroll
    nav.classList.toggle('nav--scrolled', scroll > 20);

    // Oculta nav al bajar rápido, muestra al subir
    if (scroll > lastScroll + 10 && scroll > 100) {
      nav.classList.add('nav--hidden');
    } else if (scroll < lastScroll - 5) {
      nav.classList.remove('nav--hidden');
    }
    lastScroll = scroll;
  }, { passive: true });
})();

/* ── 2. SMOOTH SCROLL para links ancla ────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 80; // altura del nav sticky
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ── 3. ANIMACIÓN de aparición (Intersection Observer) ── */
(function initReveal() {
  // Solo si el navegador lo soporta y el usuario no prefiere movimiento reducido
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: none;
    }
  `;
  document.head.appendChild(style);

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const targets = document.querySelectorAll(
    '.stat, .ley-card, .mod, .method-card, .why-card, .feat, .bp-cell'
  );

  // Only hide elements that start below the initial viewport — never gate above-fold content
  targets.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top > viewportHeight + 50) {
      el.classList.add('reveal');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Escalonar la aparición por índice
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 40);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
})();

/* ── 4. BLUEPRINT: highlight al hacer click ───────────── */
(function initBlueprint() {
  const cells = document.querySelectorAll('.bp-cell');
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const targetSection = cell.querySelector('.bp-cell-label span')?.textContent?.trim();
      // Scroll suave a la sección de módulos
      const modsSection = document.getElementById('modulos');
      if (modsSection) {
        const offset = 80;
        const top = modsSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();

/* ── 5. SCROLL-SPY: resalta el link de nav activo ────── */
(function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!navLinks.length || !('IntersectionObserver' in window)) return;

  const linkMap = {};
  navLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    if (id) linkMap[id] = link;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = linkMap[entry.target.id];
      if (link) link.classList.toggle('active', entry.isIntersecting);
    });
  }, {
    rootMargin: '-8% 0px -62% 0px',
    threshold: 0
  });

  Object.keys(linkMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();

/* ── 6. MÓDULOS: expand en móvil ──────────────────────── */
/* La expansión se maneja por .mod-detail-toggle (botones accesibles en el HTML) */
/* No se añaden atributos aquí para no crear roles ARIA sin handlers de teclado */

/* ── 6. NAV MÓVIL — hamburguesa (botón en HTML, CSS en main.css) ── */
(function initMobileNav() {
  const menuBtn = document.querySelector('.nav-menu-btn');
  const navLinks = document.getElementById('primary-nav-links');
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  // Cierra el menú al hacer clic en un enlace interno
  navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Abrir menú');
    });
  });
})();
