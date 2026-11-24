/* Página 404 · Portafolio Isaac Giraldo · v3.1.0
   Respeta idioma (ES/EN) y tema (claro/oscuro) guardados en localStorage. */

const NF_I18N = {
  es: {
    title: '404 · Página no encontrada · Isaac Giraldo',
    code: 'Error 404',
    heading: 'Esta página no existe.',
    body: 'La dirección que abriste no corresponde a ninguna sección del portafolio o fue movida. Puedes volver al inicio para ver mis proyectos, trayectoria y contacto.',
    home: 'Volver al inicio',
    theme_toggle: 'Cambiar tema claro u oscuro',
    footer: 'Isaac Camilo Giraldo Gómez · Portafolio'
  },
  en: {
    title: '404 · Page not found · Isaac Giraldo',
    code: 'Error 404',
    heading: 'This page does not exist.',
    body: 'The address you opened does not match any section of this portfolio or may have moved. Head back to the start to explore my projects, background, and contact.',
    home: 'Back to home',
    theme_toggle: 'Switch light or dark theme',
    footer: 'Isaac Camilo Giraldo Gómez · Portfolio'
  }
};

function store(k, v) {
  try {
    if (v === undefined) return localStorage.getItem(k);
    if (v === null) localStorage.removeItem(k);
    else localStorage.setItem(k, v);
  } catch (e) {}
  return null;
}

let lang = store('lang') === 'en' ? 'en' : 'es';

function applyLang() {
  const dict = NF_I18N[lang] || NF_I18N.es;
  document.documentElement.lang = lang;
  document.title = dict.title;
  document.querySelectorAll('[data-nf]').forEach((el) => {
    const key = el.getAttribute('data-nf');
    if (dict[key]) el.textContent = dict[key];
  });
  const themeBtn = document.getElementById('nfThemeBtn');
  if (themeBtn) themeBtn.setAttribute('aria-label', dict.theme_toggle);
  document.querySelectorAll('.seg button[data-lang]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
  });
}

function getEffectiveTheme() {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function toggleTheme() {
  const next = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
  const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const meta = document.querySelector('meta[name="color-scheme"]');
  document.documentElement.setAttribute('data-theme', next);
  if (meta) meta.setAttribute('content', next);
  if (next === sys) store('theme', null);
  else store('theme', next);
}

document.querySelectorAll('.seg button[data-lang]').forEach((b) => {
  b.addEventListener('click', () => {
    const next = b.dataset.lang;
    if (next !== 'es' && next !== 'en') return;
    lang = next;
    store('lang', lang);
    applyLang();
  });
});

const themeBtn = document.getElementById('nfThemeBtn');
if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

applyLang();
