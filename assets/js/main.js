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

  const targets = document.querySelectorAll(
    '.stat, .ley-card, .mod, .method-card, .why-card, .feat, .bp-cell'
  );

  targets.forEach(el => el.classList.add('reveal'));

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

/* ── 5. MÓDULOS: expand en móvil ──────────────────────── */
(function initModules() {
  if (window.innerWidth > 900) return; // Solo en móvil
  const mods = document.querySelectorAll('.mod:not(.featured)');
  mods.forEach(mod => {
    const features = mod.querySelector('.mod-features');
    const desc = mod.querySelector('.mod-desc');
    if (!features && !desc) return;
    // En móvil, las features están colapsadas por defecto
    // (se manejan con CSS, este script solo añade accesibilidad)
    mod.setAttribute('role', 'button');
    mod.setAttribute('tabindex', '0');
  });
})();

/* ── 6. NÚMERO de nav móvil ───────────────────────────── */
(function initMobileNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  // Botón hamburguesa para móvil (inyectado)
  const menuBtn = document.createElement('button');
  menuBtn.className = 'nav-menu-btn';
  menuBtn.setAttribute('aria-label', 'Abrir menú');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.innerHTML = '<span></span><span></span><span></span>';

  // Solo mostrar en móvil vía CSS
  const style = document.createElement('style');
  style.textContent = `
    .nav-menu-btn {
      display: none;
      flex-direction: column;
      gap: 4px;
      padding: 8px;
      background: none;
      border: none;
      cursor: pointer;
    }
    .nav-menu-btn span {
      display: block;
      width: 20px;
      height: 2px;
      background: var(--ink);
      border-radius: 2px;
      transition: .2s;
    }
    @media (max-width: 900px) {
      .nav-menu-btn { display: flex; }
      .nav-links {
        display: none;
        position: fixed;
        top: 65px; left: 0; right: 0;
        background: var(--paper);
        border-bottom: 1px solid var(--line);
        padding: 20px 32px;
        flex-direction: column;
        gap: 16px;
        z-index: 49;
      }
      .nav-links.open { display: flex; }
    }
  `;
  document.head.appendChild(style);

  const navLinks = nav.querySelector('.nav-links');
  nav.insertBefore(menuBtn, nav.querySelector('.nav-cta'));

  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });
})();
