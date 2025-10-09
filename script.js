// === VITEBSKA · core script (safe & minimal)
(function () {
  const d = document, w = window;
  const prefersReduced = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // lazy/async для картинок
  d.querySelectorAll('img:not([loading])').forEach(img => {
    img.loading = 'lazy';
    img.decoding = 'async';
  });

  // плавний скролл по якорях
  d.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = d.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    });
  });

  // тінь у шапки при скролі
  const header = d.querySelector('.header');
  function setHeaderShadow(){ if(header) header.classList.toggle('scrolled', w.scrollY > 4); }
  setHeaderShadow();
  w.addEventListener('scroll', setHeaderShadow, { passive:true });

  // анімація появи блоків
  const items = d.querySelectorAll('.reveal');
  function show(el){ el.classList.add('is-in'); }
  if ('IntersectionObserver' in w && !prefersReduced) {
    const io = new IntersectionObserver((ents, obs) => {
      ents.forEach(e => { if (e.isIntersecting){ show(e.target); obs.unobserve(e.target); }});
    }, { threshold: .15 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(show);
  }

  // простий трек кліків по CTA (працює лише якщо є GA)
  d.querySelectorAll('[data-cta]').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.dataset.label || (btn.textContent||'cta').trim();
      if (typeof gtag === 'function') {
        try { gtag('event','click',{event_category:'CTA',event_label:label}); } catch(e){}
      }
    });
  });
})();
