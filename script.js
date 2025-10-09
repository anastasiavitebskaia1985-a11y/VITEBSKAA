// === VITEBSKA · core script (safe & minimal) ===
(function () {
  const doc = document;
  const win = window;
  const prefersReduced = win.matchMedia && win.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 0) Пометка "готово"
  doc.documentElement.classList.add('js-ready');

  // 1) Плавный скролл по якорям (без рывков, с учётом reduced motion)
  function smoothScrollTo(sel) {
    const el = doc.querySelector(sel);
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
  }
  doc.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = doc.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      smoothScrollTo(hash);
    });
  });

  // 2) Тень у шапки при прокрутке
  const header = doc.querySelector('.header');
  function setHeaderShadow() {
    if (!header) return;
    header.classList.toggle('scrolled', win.scrollY > 4);
  }
  setHeaderShadow();
  win.addEventListener('scroll', setHeaderShadow, { passive: true });

  // 3) Ленивая загрузка картинок (подстрахуем, если атрибут не задан)
  doc.querySelectorAll('img:not([loading])').forEach(img => {
    img.loading = 'lazy';
    img.decoding = 'async';
  });

  // 4) Reveal-анимация при появлении в вьюпорте (мягко, без «прыжков»)
  const revealTargets = new Set();
  [
    '.hero .card',
    '.section',
    '.card',
    '.faq-item',
    '.grid > *'
  ].forEach(sel => doc.querySelectorAll(sel).forEach(el => revealTargets.add(el)));

  // добавим класс .reveal, чтобы css мог анимировать
  revealTargets.forEach(el => el.classList.add('reveal'));

  function revealNow(el) {
    el.classList.add('is-in');
  }

  if ('IntersectionObserver' in win && !prefersReduced) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          revealNow(e.target);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(el => io.observe(el));
  } else {
    // без IO или при reduced motion — показать сразу, без анимаций
    revealTargets.forEach(revealNow);
  }

  // 5) Трекинг кликов по CTA-кнопкам (работает, только если есть GA)
  doc.querySelectorAll('[data-cta]').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.dataset.label || (btn.textContent || 'cta').trim();
      try {
        if (typeof gtag === 'function') {
          gtag('event', 'click', { event_category: 'CTA', event_label: label });
        }
      } catch (e) { /* тихо игнорируем */ }
    });
  });
})();
