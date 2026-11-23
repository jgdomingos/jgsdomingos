(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }));
  }
  const langButton = document.querySelector('.lang-toggle');
  const translatable = document.querySelectorAll('[data-pt][data-en]');
  let lang = localStorage.getItem('portfolio-lang') || 'pt';
  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    translatable.forEach(el => { el.textContent = el.dataset[lang]; });
    if (langButton) langButton.textContent = lang.toUpperCase();
    localStorage.setItem('portfolio-lang',lang);
  }
  if (langButton) {
    langButton.addEventListener('click', () => applyLang(lang === 'pt' ? 'en' : 'pt'));
    applyLang(lang);
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
