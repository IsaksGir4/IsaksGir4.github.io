/* Portafolio de Isaac Giraldo · v3.1.0 · JavaScript modular sin dependencias · GitHub Pages.
   El contenido (proyectos, certificados, perfil) vive en /data/*.json; aquí hay configuración, i18n e interactividad. */

import { createMotionEngine } from './motion.js?v=3.1.0';

// ---------- Configuración (edita aquí) ----------
export const CFG = {
  version: '3.1.0',
  user: 'IsaksGir4',
  linkedin: 'https://www.linkedin.com/in/isaac-giraldo-gomez-b65ba7223/',
  // El correo se arma en el navegador para no dejarlo en texto plano en el HTML.
  emailUser: 'isaacgiraldo.dev',
  emailHost: 'gmail.com',
  cvPath: 'assets/Isaac_Camilo_Giraldo_Gomez_CV.pdf',
  maxEvents: 10,
  maxRepos: 6
};

// ---------- Textos de la interfaz (ES / EN) ----------
const I18N = {
  es: {
    skip: 'Saltar al contenido',
    nav_about: 'Perfil', nav_projects: 'Proyectos', nav_journey: 'Trayectoria', nav_certs: 'Formación', nav_activity: 'GitHub', nav_contact: 'Contacto',
    theme_toggle: 'Cambiar tema claro u oscuro',
    hero_kicker: 'Ingeniería de Sistemas y Computación + Ingeniería Administrativa · Universidad EIA',
    hero_kicker_short: 'Sistemas + Administrativa · Universidad EIA',
    hero_photo_alt: 'Retrato de Isaac Camilo Giraldo Gómez',
    hero_lead: 'Me gusta entender el problema desde sus fundamentos antes de elegir la herramienta. Combino ciencia de datos, ingeniería y análisis financiero y de riesgos para construir soluciones sólidas y útiles para decidir.',
    hero_signature: 'Entre los datos, los sistemas y las decisiones.',
    hero_location: 'Bello, Antioquia · Universidad EIA',
    hero_areas_aria: 'Áreas de interés',
    hero_chip_1: 'Ciencia de datos y analítica',
    hero_chip_2: 'Ingeniería de datos',
    hero_chip_3: 'IA aplicada',
    hero_chip_4: 'Consultoría financiera y de riesgos',
    btn_projects: 'Ver proyectos', btn_contact: 'Contactar', btn_cv: 'Descargar hoja de vida', btn_email: 'Escribir un correo', btn_copy_email: 'Copiar correo',
    statband_aria: 'Logros verificables',
    stat_vitalrisk: 'VitalRisk AI, jurado externo entre 269 equipos',
    stat_sura: 'Reto Nacional Seguros Sura',
    stat_alight: 'Pitch Day Spark-X · Alight',
    projects_badge: '{n} proyectos', certs_badge: '{n} certificados', repos_badge: '{n} repos públicos',
    about_eyebrow: 'Quién soy', about_title: 'Perfil',
    about_p1: 'Soy Isaac, y vivo en Bello, Antioquia. Estudio en la modalidad de doble programa en Ingeniería de Sistemas y Computación e Ingeniería Administrativa, ambas en la Universidad EIA, con foco en ciencia de datos, ingeniería de datos, inteligencia artificial y consultoría financiera y de riesgos.',
    about_p2: 'Me interesa comprender los problemas desde sus fundamentos, explorar los datos a fondo y construir soluciones técnicamente sólidas que sean útiles para la toma de decisiones. He trabajado en integración y transformación de datos, modelado predictivo y análisis financiero con Python, SQL, Machine Learning y Power BI.',
    about_p3: 'Abordo los proyectos de manera analítica y estructurada, dispuesto a aprender, contrastar alternativas y mejorar a partir de la retroalimentación. En el Reto Nacional Seguros Sura lideré el frente analítico y financiero de mi equipo, con el que obtuvimos el tercer puesto entre 12 equipos.',
    note_label: 'Una idea que guía mi trabajo', profile_quote: 'La tecnología es útil cuando resuelve un problema que vale la pena entender.',
    principles_title: 'Cómo pienso', strengths_title: 'Cómo trabajo',
    workstyle_sub: 'Perfil cualitativo basado en resultados reales, sin puntajes inventados. Toca o pulsa cualquier tarjeta para ver en qué estoy trabajando.',
    badge_strength: 'Fortaleza', badge_working: 'En qué estoy trabajando', flip_hint_front: 'Ver reto ↻', flip_hint_back: 'Ver fortaleza ↻',
    projects_eyebrow: 'Trabajo aplicado', projects_title: 'Proyectos',
    projects_sub: 'Problemas que he explorado desde los datos, la ingeniería y el negocio. Cada proyecto resume el problema, mi rol y el resultado.',
    kind_all: 'Todos', kind_data: 'Datos y riesgo', kind_ai: 'IA aplicada', kind_innovation: 'Innovación e investigación',
    projects_filtered: 'Mostrando {n} proyectos',
    scan_problem: 'Problema', scan_role: 'Qué hice', scan_result: 'Resultado',
    gallery_aria: 'Galería de imágenes', gallery_prev: 'Imagen anterior', gallery_next: 'Imagen siguiente', gallery_counter: '{i} de {n}',
    live_repos: 'Repositorios recientes en GitHub', repos_intro: 'El código es parte del proceso: aquí puedes revisar cómo experimento, documento y construyo.',
    link_repo: 'Código en GitHub', link_demo: 'Ver demo', btn_case: 'Explorar caso de estudio',
    case_eyebrow: 'Caso de estudio interactivo',
    case_jury_note: 'Evaluación oficial del jurado externo entre {teams} equipos nacionales en Datos al Ecosistema 2026 (MinTIC y Corporación Colombia Digital).',
    case_scorecard_title: 'Desglose del jurado (82 / 100)',
    case_metrics_title: 'Métricas del modelo (prueba temporal 2022–2023)',
    case_media_title: 'Vista del tablero y recorrido en video',
    case_video_note: 'El video solo se descarga si pulsas reproducir (demo local, sin rastreadores).',
    case_pipeline_title: 'Arquitectura y flujo de datos',
    case_specs_title: 'Detalles técnicos verificados',
    case_reflection_title: 'Aprendizaje sincero',
    journey_eyebrow: 'Más allá de los proyectos', journey_title: 'Trayectoria',
    journey_sub: 'También me han formado la investigación, el servicio al cliente en operación real y la disciplina deportiva.',
    hobbies_title: 'Fuera del trabajo', hobbies_sub: 'Lo que me divierte también dice cómo pienso: crear, explorar y aprender por cuenta propia.',
    skills_eyebrow: 'Herramientas al servicio del problema', skills_title: 'Con qué trabajo',
    skills_intro: 'No las veo como una colección de etiquetas. Las elijo según el tipo de dato, la pregunta, las restricciones y el resultado que se necesita.',
    certs_eyebrow: 'Aprendizaje continuo', certs_title: 'Formación y reconocimientos',
    certs_sub: 'Certificaciones, cursos y reconocimientos que complementan mi formación universitaria. Toca uno para ver el detalle.',
    search_label: 'Buscar certificado', search_ph: 'Buscar…', filter_all: 'Todos',
    sort_label: 'Ordenar certificados', sort_newest: 'Más recientes', sort_oldest: 'Más antiguos', sort_hours: 'Mayor duración',
    cat_data: 'Datos', cat_ai: 'Inteligencia artificial', cat_cloud: 'Nube', cat_business: 'Emprendimiento y riesgos', cat_language: 'Idiomas', cat_recognition: 'Reconocimientos',
    hours: 'h', verify: 'Verificar en línea', verified_tag: 'Verificable', open_file: 'Abrir archivo', no_preview: 'Aún no hay archivo cargado para este certificado.',
    showing: 'Mostrando {n} de {t}', none_found: 'No hay resultados con ese filtro.',
    activity_eyebrow: 'Trabajo en público', activity_title: 'Actividad en GitHub',
    activity_sub: 'Mis contribuciones del último año y mi actividad pública reciente. El código y la documentación de cada repositorio cuentan mejor la historia.',
    less: 'Menos', more: 'Más', recent_activity: 'Actividad reciente', contrib_total: '{n} contribuciones en el último año',
    heat_fallback: 'Mapa aproximado con los eventos públicos recientes de GitHub; no incluye contribuciones privadas.',
    activity_error: 'No se pudo cargar la actividad desde GitHub (límite temporal o sin conexión). Puedes verla directamente en',
    activity_ratelimit: 'GitHub alcanzó el límite temporal de peticiones desde esta red. Puedes ver mi actividad directamente en',
    activity_offline: 'Parece que no tienes conexión a internet. Cuando vuelvas a conectarte, consulta la actividad en',
    no_activity: 'No hay actividad pública reciente para mostrar.', loading: 'Cargando…',
    lazy_waiting: 'Se cargará automáticamente al acercarte a esta sección…',
    repos_error: 'No se pudieron cargar los repositorios desde GitHub. Puedes verlos directamente en',
    repos_ratelimit: 'Límite temporal de la API de GitHub alcanzado. Puedes explorar mis repositorios directamente en',
    repos_offline: 'Sin conexión a internet para cargar los repositorios. Puedes verlos luego en',
    data_error: 'No se pudieron cargar los datos. Si estás probando en tu computador, abre el sitio con un servidor local (no con doble clic).',
    contact_eyebrow: 'Contacto', contact_title: 'Hablemos de problemas interesantes.',
    contact_p: 'Me interesan los equipos que combinan rigor analítico, ingeniería y comprensión del negocio, especialmente en datos, riesgo y tecnología financiera.',
    form_title: 'O cuéntame en un par de líneas', form_name: 'Nombre', form_email: 'Tu correo', form_msg: 'Mensaje', form_send: 'Abrir en mi correo',
    form_note: 'Esto abre tu aplicación de correo con el mensaje listo; no se guarda nada en este sitio.',
    form_subject: 'Contacto desde tu portafolio — {name}',
    form_err_name: 'Cuéntame cómo te llamas.',
    form_err_email: 'Revisa que tu correo tenga un formato válido.',
    form_err_msg: 'Escribe un mensaje breve antes de enviar.',
    toast_copied: 'Correo copiado al portapapeles',
    toast_copy_fail: 'No se pudo copiar automáticamente; usa el botón de correo.',
    footer: 'Hecho con HTML, CSS y JavaScript. Construido para mostrar procesos, no solo resultados.', close: 'Cerrar',
    ev_push: 'Subió {n} commit(s) a', ev_create: 'Creó {what} en', ev_branch: 'una rama', ev_tag: 'una etiqueta', ev_repo: 'el repositorio',
    ev_pr: '{act} un pull request en', ev_issue: '{act} un issue en', ev_watch: 'Marcó con estrella', ev_fork: 'Hizo fork de', ev_public: 'Hizo público', ev_release: 'Publicó una versión en', ev_other: 'Actividad en',
    act_opened: 'Abrió', act_closed: 'Cerró', act_merged: 'Fusionó', act_other: 'Actualizó', updated: 'Actualizado',
    title: 'Isaac Giraldo · Portafolio',
    meta_desc: 'Portafolio de Isaac Camilo Giraldo Gómez: ciencia de datos, ingeniería de datos, inteligencia artificial y consultoría financiera y de riesgos.'
  },
  en: {
    skip: 'Skip to content',
    nav_about: 'Profile', nav_projects: 'Projects', nav_journey: 'Background', nav_certs: 'Learning', nav_activity: 'GitHub', nav_contact: 'Contact',
    theme_toggle: 'Switch light or dark theme',
    hero_kicker: 'Systems & Computer Engineering + Management Engineering · Universidad EIA',
    hero_kicker_short: 'Systems + Management · Universidad EIA',
    hero_photo_alt: 'Portrait of Isaac Camilo Giraldo Gómez',
    hero_lead: 'I like understanding a problem from first principles before choosing the tool. I combine data science, engineering, and financial & risk analysis to build sound solutions that support real decisions.',
    hero_signature: 'Between data, systems and decisions.',
    hero_location: 'Bello, Antioquia · Universidad EIA',
    hero_areas_aria: 'Focus areas',
    hero_chip_1: 'Data Science & Analytics',
    hero_chip_2: 'Data Engineering',
    hero_chip_3: 'Applied AI',
    hero_chip_4: 'Financial & Risk Consulting',
    btn_projects: 'See projects', btn_contact: 'Contact me', btn_cv: 'Download résumé', btn_email: 'Send an email', btn_copy_email: 'Copy email',
    statband_aria: 'Verifiable achievements',
    stat_vitalrisk: 'VitalRisk AI, external jury among 269 teams',
    stat_sura: 'Seguros Sura National Challenge',
    stat_alight: 'Spark-X Pitch Day · Alight',
    projects_badge: '{n} projects', certs_badge: '{n} certificates', repos_badge: '{n} public repos',
    about_eyebrow: 'Who I am', about_title: 'Profile',
    about_p1: 'My name is Isaac, and I live in Bello, Antioquia. I am pursuing a dual degree in Systems and Computer Engineering and Management Engineering, both at Universidad EIA, with a focus on data science, data engineering, artificial intelligence, and financial and risk consulting.',
    about_p2: "I'm interested in understanding problems from the ground up, exploring data in depth, and building technically sound solutions that are useful for decision-making. I've worked on data integration and transformation, predictive modeling, and financial analysis using Python, SQL, machine learning, and Power BI.",
    about_p3: "I approach projects analytically and in a structured manner, always eager to learn, evaluate alternatives, and improve based on feedback. In the Seguros Sura National Challenge, I led my team's analytical and financial efforts, and we placed third out of 12 teams.",
    note_label: 'An idea that guides my work', profile_quote: 'Technology is useful when it solves a problem worth understanding.',
    principles_title: 'How I think', strengths_title: 'How I work',
    workstyle_sub: 'Qualitative profile grounded in real assessment results—no invented scores. Click or press any card to flip between strengths and growth areas.',
    badge_strength: 'Strength', badge_working: "What I'm working on", flip_hint_front: 'See growth area ↻', flip_hint_back: 'See strength ↻',
    projects_eyebrow: 'Applied work', projects_title: 'Projects',
    projects_sub: 'Problems I have explored through data, engineering, and business. Each card outlines the problem, my role, and the result.',
    kind_all: 'All', kind_data: 'Data & risk', kind_ai: 'Applied AI', kind_innovation: 'Innovation & research',
    projects_filtered: 'Showing {n} projects',
    scan_problem: 'Problem', scan_role: 'What I did', scan_result: 'Result',
    gallery_aria: 'Image gallery', gallery_prev: 'Previous image', gallery_next: 'Next image', gallery_counter: '{i} of {n}',
    live_repos: 'Recent repositories on GitHub', repos_intro: 'Code is part of the process: here you can see how I experiment, document, and build.',
    link_repo: 'Code on GitHub', link_demo: 'View demo', btn_case: 'Explore case study',
    case_eyebrow: 'Interactive case study',
    case_jury_note: 'Official external jury evaluation among {teams} national teams in Datos al Ecosistema 2026 (MinTIC & Corporación Colombia Digital).',
    case_scorecard_title: 'Jury breakdown (82 / 100)',
    case_metrics_title: 'Model metrics (2022–2023 temporal test)',
    case_media_title: 'Dashboard preview & video walkthrough',
    case_video_note: 'Video downloads only when you press play (local clip, no third-party trackers).',
    case_pipeline_title: 'Architecture & data flow',
    case_specs_title: 'Verified technical details',
    case_reflection_title: 'Honest takeaway',
    journey_eyebrow: 'Beyond the projects', journey_title: 'Background',
    journey_sub: 'Research, real-world customer operations, and competitive sports have shaped how I work too.',
    hobbies_title: 'Outside of work', hobbies_sub: 'What I enjoy also says how I think: making things, exploring, and teaching myself.',
    skills_eyebrow: 'Tools in service of the problem', skills_title: 'What I work with',
    skills_intro: 'I do not see them as a collection of labels. I choose them by the kind of data, the question, the constraints, and the result that is needed.',
    certs_eyebrow: 'Continuous learning', certs_title: 'Learning & recognitions',
    certs_sub: 'Certifications, courses, and recognitions that complement my university studies. Select any card for details.',
    search_label: 'Search certificates', search_ph: 'Search…', filter_all: 'All',
    sort_label: 'Sort certificates', sort_newest: 'Newest first', sort_oldest: 'Oldest first', sort_hours: 'Most hours',
    cat_data: 'Data', cat_ai: 'Artificial intelligence', cat_cloud: 'Cloud', cat_business: 'Business & risk', cat_language: 'Languages', cat_recognition: 'Awards',
    hours: 'h', verify: 'Verify online', verified_tag: 'Verifiable', open_file: 'Open file', no_preview: 'No file has been uploaded for this certificate yet.',
    showing: 'Showing {n} of {t}', none_found: 'No results for this filter.',
    activity_eyebrow: 'Working in public', activity_title: 'GitHub activity',
    activity_sub: 'My contributions over the last year and my recent public activity. Each repository and its documentation tell the story better.',
    less: 'Less', more: 'More', recent_activity: 'Recent activity', contrib_total: '{n} contributions in the last year',
    heat_fallback: 'Approximate map built from recent public GitHub events; private contributions are not included.',
    activity_error: 'Could not load activity from GitHub (rate limit or offline). You can view it directly at',
    activity_ratelimit: 'GitHub API rate limit reached temporarily on this network. You can view my activity directly at',
    activity_offline: 'You appear to be offline—live GitHub activity could not load. Check back later at',
    no_activity: 'No recent public activity to show.', loading: 'Loading…',
    lazy_waiting: 'Loads automatically as you scroll near this section…',
    repos_error: 'Could not load repositories from GitHub. You can view them directly at',
    repos_ratelimit: 'Temporary GitHub API rate limit reached. Browse my repositories directly at',
    repos_offline: 'Offline—could not load GitHub repositories right now. View them later at',
    data_error: 'Could not load the data. If you are testing on your computer, open the site with a local server (not by double-clicking).',
    contact_eyebrow: 'Contact', contact_title: "Let's talk about interesting problems.",
    contact_p: 'I am interested in teams that combine analytical rigor, engineering, and business understanding, especially in data, risk, and financial technology.',
    form_title: 'Or tell me in a couple of lines', form_name: 'Name', form_email: 'Your email', form_msg: 'Message', form_send: 'Open in my email app',
    form_note: 'This opens your email app with the message ready; nothing is stored on this site.',
    form_subject: 'Contact from your portfolio — {name}',
    form_err_name: 'Please tell me your name.',
    form_err_email: 'Please enter a valid email address.',
    form_err_msg: 'Please write a brief message before sending.',
    toast_copied: 'Email copied to clipboard',
    toast_copy_fail: 'Could not copy automatically; please use the email button.',
    footer: 'Built with HTML, CSS and JavaScript. Made to show process, not just results.', close: 'Close',
    ev_push: 'Pushed {n} commit(s) to', ev_create: 'Created {what} in', ev_branch: 'a branch', ev_tag: 'a tag', ev_repo: 'the repository',
    ev_pr: '{act} a pull request in', ev_issue: '{act} an issue in', ev_watch: 'Starred', ev_fork: 'Forked', ev_public: 'Made public', ev_release: 'Published a release in', ev_other: 'Activity in',
    act_opened: 'Opened', act_closed: 'Closed', act_merged: 'Merged', act_other: 'Updated', updated: 'Updated',
    title: 'Isaac Giraldo · Portfolio',
    meta_desc: 'Portfolio of Isaac Camilo Giraldo Gómez: data science, data engineering, artificial intelligence, and financial & risk consulting.'
  }
};

// Iconos SVG creados con DOM seguro (createElementNS, cero innerHTML)
const SVG_NS = 'http://www.w3.org/2000/svg';
function createSvgIcon(viewBox, strokeWidth, shapes) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', String(strokeWidth));
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  shapes.forEach(([tag, attrs]) => {
    const node = document.createElementNS(SVG_NS, tag);
    Object.keys(attrs).forEach((k) => node.setAttribute(k, String(attrs[k])));
    svg.appendChild(node);
  });
  return svg;
}

const HOBBY_SHAPES = {
  figures: [['path', { d: 'M32 6l22 12v28L32 58 10 46V18z' }], ['path', { d: 'M10 18l22 12 22-12M32 30v28' }]],
  gamepad: [['path', { d: 'M18 22h28a10 10 0 0 1 9.7 7.6l3 12.4a7 7 0 0 1-12 6.2L42 42H22l-4.7 6.2a7 7 0 0 1-12-6.2l3-12.4A10 10 0 0 1 18 22z' }], ['path', { d: 'M20 30v8M16 34h8' }], ['circle', { cx: 42, cy: 31, r: 1.6, fill: 'currentColor' }], ['circle', { cx: 47, cy: 36, r: 1.6, fill: 'currentColor' }]],
  chart: [['path', { d: 'M8 8v48h48' }], ['path', { d: 'M16 44l12-14 10 8 16-22' }], ['path', { d: 'M44 16h10v10' }]]
};

const EVENT_SHAPES = {
  PushEvent: [['path', { d: 'M12 19V5M5 12l7-7 7 7' }]],
  CreateEvent: [['path', { d: 'M12 5v14M5 12h14' }]],
  PullRequestEvent: [['circle', { cx: 6, cy: 6, r: 2.5 }], ['circle', { cx: 6, cy: 18, r: 2.5 }], ['circle', { cx: 18, cy: 18, r: 2.5 }], ['path', { d: 'M6 8.5v7M18 15.5V9a3 3 0 0 0-3-3h-3' }]],
  IssuesEvent: [['circle', { cx: 12, cy: 12, r: 9 }], ['path', { d: 'M12 8v4M12 16h.01' }]],
  WatchEvent: [['path', { d: 'M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9z' }]],
  ForkEvent: [['circle', { cx: 6, cy: 6, r: 2.5 }], ['circle', { cx: 18, cy: 6, r: 2.5 }], ['circle', { cx: 12, cy: 18, r: 2.5 }], ['path', { d: 'M6 8.5v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-2M12 13.5v2' }]],
  ReleaseEvent: [['path', { d: 'M20 12l-8 8-9-9V3h8z' }], ['circle', { cx: 8, cy: 8, r: 1.2, fill: 'currentColor' }]],
  default: [['circle', { cx: 12, cy: 12, r: 4 }]]
};

const CATS = ['data', 'ai', 'cloud', 'business', 'language', 'recognition'];
const KINDS = ['data', 'ai', 'innovation'];
const motion = createMotionEngine();

const state = {
  lang: 'es',
  cat: 'all',
  q: '',
  sort: 'date-desc',
  kind: 'all',
  certs: [],
  projects: [],
  profile: null,
  repos: null,
  reposErrorReason: '',
  reposLoaded: false,
  dataError: false,
  statsCounted: false,
  statsDone: false,
  reposCount: null,
  heatAnimated: false
};

const activity = { days: null, approx: false, events: null, error: false, errorReason: '', loaded: false, total: null };

// ---------- Utilidades ----------
const $ = (s, r = document) => r.querySelector(s);

function t(k, vars) {
  let s = (I18N[state.lang] && I18N[state.lang][k]) || I18N.es[k] || k;
  if (vars) {
    Object.keys(vars).forEach((v) => { s = s.replace(`{${v}}`, vars[v]); });
  }
  return s;
}

function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  if (attrs) {
    Object.keys(attrs).forEach((k) => {
      if (k === 'class') el.className = attrs[k];
      else if (k === 'text') el.textContent = attrs[k];
      else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) el.setAttribute(k, attrs[k]);
    });
  }
  children.flat().forEach((c) => {
    if (c === null || c === undefined || c === false) return;
    el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return el;
}

function store(k, v) {
  try {
    if (v === undefined) return localStorage.getItem(k);
    if (v === null) localStorage.removeItem(k);
    else localStorage.setItem(k, v);
  } catch (e) {}
  return null;
}

const loc = (obj) => (obj && typeof obj === 'object' && !Array.isArray(obj) ? (obj[state.lang] || obj.es || obj.en || '') : (obj || ''));
const locList = (obj) => (obj && (obj[state.lang] || obj.es)) || [];
const visible = (list) => (list || []).filter((x) => !x.draft);
const getEmailAddress = () => `${CFG.emailUser}@${CFG.emailHost}`;

function fmtDate(iso, opts) {
  const p = String(iso).split('-').map(Number);
  const d = new Date(Date.UTC(p[0], (p[1] || 1) - 1, p[2] || 1));
  const o = Object.assign({}, opts || (p[2] ? { year: 'numeric', month: 'long', day: 'numeric' } : { year: 'numeric', month: 'long' }), { timeZone: 'UTC' });
  return new Intl.DateTimeFormat(state.lang === 'es' ? 'es-CO' : 'en-US', o).format(d);
}

function relTime(iso) {
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(state.lang === 'es' ? 'es' : 'en', { numeric: 'auto' });
  const units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
  for (let i = 0; i < units.length; i++) {
    if (Math.abs(diff) >= units[i][1] || units[i][0] === 'minute') return rtf.format(Math.round(diff / units[i][1]), units[i][0]);
  }
  return '';
}

function getJSON(url) {
  return fetch(url, { headers: { Accept: 'application/json' } }).then((r) => {
    if (!r.ok) {
      const err = new Error(`${url} → ${r.status}`);
      err.status = r.status;
      throw err;
    }
    return r.json();
  });
}

function classifyNetworkError(err) {
  if (err && (err.status === 403 || err.status === 429)) return 'ratelimit';
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return 'offline';
  return 'generic';
}

// Resaltado seguro de coincidencias de búsqueda (sin innerHTML)
function highlightNodes(text, query) {
  const raw = String(text || '');
  const q = String(query || '').trim();
  if (!q) return [document.createTextNode(raw)];
  const lower = raw.toLowerCase();
  const needle = q.toLowerCase();
  const out = [];
  let pos = 0;
  let idx = lower.indexOf(needle, pos);
  while (idx !== -1) {
    if (idx > pos) out.push(document.createTextNode(raw.slice(pos, idx)));
    out.push(h('mark', { class: 'hl', text: raw.slice(idx, idx + needle.length) }));
    pos = idx + needle.length;
    idx = lower.indexOf(needle, pos);
  }
  if (pos < raw.length) out.push(document.createTextNode(raw.slice(pos)));
  return out;
}

// ---------- Toast accesible ----------
let toastTimer = 0;
function showToast(msg) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = '';
  requestAnimationFrame(() => {
    el.textContent = msg;
    el.classList.add('is-shown');
  });
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => { el.classList.remove('is-shown'); }, 2800);
}

// ---------- Tema (View Transitions circular desde el botón + fallback a fade) ----------
function getEffectiveTheme() {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(next) {
  const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const sys = sysDark ? 'dark' : 'light';
  const meta = document.querySelector('meta[name="color-scheme"]');

  if (next === 'light' || next === 'dark') {
    document.documentElement.setAttribute('data-theme', next);
    if (meta) meta.setAttribute('content', next);
    // Guarda valor literal si difiere del sistema; elimina si coincide (patrón two-state toggle)
    if (next === sys) store('theme', null);
    else store('theme', next);
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (meta) meta.setAttribute('content', 'light dark');
    store('theme', null);
  }
  if (dockApi) dockApi.syncTheme();
}

function setTheme(next, originEvent) {
  if (next !== 'light' && next !== 'dark') return;
  const btn = $('#themeBtn');

  if (!document.startViewTransition || motion.env.reduced) {
    applyTheme(next);
    return;
  }

  let x = window.innerWidth - 40;
  let y = 32;
  if (originEvent && typeof originEvent.clientX === 'number' && originEvent.clientX > 0) {
    x = originEvent.clientX;
    y = originEvent.clientY;
  } else if (btn) {
    const r = btn.getBoundingClientRect();
    if (r.width > 0) {
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    }
  }
  const maxR = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  document.documentElement.classList.add('theme-transitioning');
  const transition = document.startViewTransition(() => applyTheme(next));
  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxR.toFixed(1)}px at ${x}px ${y}px)`] },
      { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
    );
  }).catch(() => {});
  transition.finished.finally(() => {
    document.documentElement.classList.remove('theme-transitioning');
  });
}

function toggleTheme(originEvent) {
  const next = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next, originEvent);
}

function initTheme() {
  const btn = $('#themeBtn');
  if (btn) btn.addEventListener('click', (e) => toggleTheme(e));
  window.addEventListener('storage', (e) => {
    if (e.key !== 'theme') return;
    const v = e.newValue;
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (v === 'light' || v === 'dark') {
      document.documentElement.setAttribute('data-theme', v);
      if (meta) meta.setAttribute('content', v);
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (meta) meta.setAttribute('content', 'light dark');
    }
    if (dockApi) dockApi.syncTheme();
  });
}

// ---------- Idioma (crossfade sin CLS y sin reemplazar nodos de texto idénticos para preservar LCP) ----------
function applyStaticI18n() {
  if (document.documentElement.lang !== state.lang) document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const next = t(el.getAttribute('data-i18n'));
    if (el.textContent !== next) el.textContent = next;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    const next = t(el.getAttribute('data-i18n-ph'));
    if (el.getAttribute('placeholder') !== next) el.setAttribute('placeholder', next);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const next = t(el.getAttribute('data-i18n-aria'));
    if (el.getAttribute('aria-label') !== next) el.setAttribute('aria-label', next);
  });
  document.querySelectorAll('.seg button').forEach((b) => { b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang)); });
  const nextTitle = t('title');
  if (document.title !== nextTitle) document.title = nextTitle;
  const desc = document.querySelector('meta[name="description"]');
  const nextDesc = t('meta_desc');
  if (desc && desc.getAttribute('content') !== nextDesc) desc.setAttribute('content', nextDesc);
}

let extrasApi = null;
let extrasLoading = null;
let dockApi = null;
let dockLoading = null;
let activeSectionId = 'about';
let cvAvailable = true;
let pendingAnchor = '';
let pendingAnchorTimer = 0;

function trackAnchorJump(secId) {
  if (!secId) return;
  pendingAnchor = secId;
  window.clearTimeout(pendingAnchorTimer);
  pendingAnchorTimer = window.setTimeout(() => { pendingAnchor = ''; }, 2000);
}

function keepAnchorAligned() {
  if (!pendingAnchor) return;
  const target = document.getElementById(pendingAnchor);
  if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
}

function syncStatAndBadges() {
  const heroPhoto = $('.hero-photo');
  if (heroPhoto) heroPhoto.setAttribute('alt', t('hero_photo_alt'));

  if (state.statsDone) {
    const vr = $('#statVitalRisk');
    const sr = $('#statSura');
    const al = $('#statAlight');
    if (vr) vr.textContent = '82/100';
    if (sr) sr.textContent = state.lang === 'es' ? '3.º de 12' : '3rd of 12';
    if (al) al.textContent = state.lang === 'es' ? '1.º' : '1st';
  }

  const pBadge = $('#projectsCountBadge');
  if (pBadge && state.projects.length) pBadge.textContent = t('projects_badge', { n: state.projects.length });
  const cBadge = $('#certsCountBadge');
  if (cBadge && state.certs.length) cBadge.textContent = t('certs_badge', { n: state.certs.length });
  const rBadge = $('#reposCountBadge');
  if (rBadge) {
    if (state.reposCount != null) {
      rBadge.textContent = t('repos_badge', { n: state.reposCount });
      rBadge.hidden = false;
    } else {
      rBadge.hidden = true;
    }
  }
}

function renderAll() {
  applyStaticI18n();
  syncStatAndBadges();
  renderProfile();
  renderProjectChips();
  renderProjects(false);
  renderChips();
  renderCerts();
  renderRepos();
  renderActivityText();
  updateNavIndicator();
  if (extrasApi) extrasApi.syncExtraLabels();
  if (dockApi) dockApi.sync();
}

function setLang(l) {
  if (l !== 'es' && l !== 'en') return;
  if (l === state.lang) return;
  state.lang = l;
  store('lang', l);
  const main = $('#main');
  if (main && !motion.env.reduced) {
    main.classList.add('is-switching');
    window.setTimeout(() => {
      renderAll();
      main.classList.remove('is-switching');
    }, 110);
  } else {
    renderAll();
  }
}

// ---------- Perfil, Workplace Insights, trayectoria, aficiones y herramientas ----------
function renderWorkStyle(ws) {
  const host = $('#strengths');
  if (!host) return;
  host.textContent = '';
  if (!ws) return;

  // 1. Espectros cualitativos de solo lectura (sin porcentajes ni puntajes)
  const specGrid = h('div', { class: 'spectra-grid' });
  (ws.spectra || []).forEach((s) => {
    const ticks = [];
    for (let z = 0; z < 5; z++) {
      ticks.push(h('span', { class: 'spectrum-tick' + (z === s.zone ? ' is-active' : ''), 'aria-hidden': 'true' }));
    }
    const poleText = `${loc(s.trait)}: ${loc(s.left)} — ${loc(s.right)}`;
    specGrid.appendChild(
      h('article', { class: 'spectrum' },
        h('div', { class: 'spectrum-head' }, h('h4', { text: loc(s.trait) })),
        h('div', { class: 'spectrum-track', role: 'img', 'aria-label': poleText }, ticks),
        h('div', { class: 'spectrum-poles' },
          h('span', { text: loc(s.left) }),
          h('span', { text: loc(s.right) })),
        h('p', { text: loc(s.summary) }))
    );
  });
  host.appendChild(specGrid);

  // 2. Tarjetas volteables Fortaleza ↔ En qué estoy trabajando
  const flipGrid = h('div', { class: 'flip-grid' });
  (ws.cards || []).forEach((c) => {
    const btn = h('button', { type: 'button', class: 'flip-card', 'aria-pressed': 'false' },
      h('span', { class: 'flip-inner' },
        h('span', { class: 'flip-face flip-front' },
          h('span', { class: 'flip-top' },
            h('span', { class: 'flip-badge', text: t('badge_strength') }),
            h('span', { class: 'flip-hint', 'aria-hidden': 'true', text: t('flip_hint_front') })),
          h('h4', { text: loc(c.frontTitle) }),
          h('p', { text: loc(c.frontText) })),
        h('span', { class: 'flip-face flip-back' },
          h('span', { class: 'flip-top' },
            h('span', { class: 'flip-badge', text: t('badge_working') }),
            h('span', { class: 'flip-hint', 'aria-hidden': 'true', text: t('flip_hint_back') })),
          h('h4', { text: loc(c.backTitle) }),
          h('p', { text: loc(c.backText) }))));
    btn.addEventListener('click', () => {
      const flipped = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!flipped));
    });
    flipGrid.appendChild(btn);
  });
  host.appendChild(flipGrid);

  if (ws.source) {
    host.appendChild(h('p', { class: 'workstyle-source', text: loc(ws.source) }));
  }
}

// Mini-galería accesible sin dependencias (teclado ←/→, botones >=44px, alt ES/EN, CLS = 0)
function buildMiniGallery(slides, ownerTitle, opts = {}) {
  let idx = 0;
  const total = slides.length;
  const isHobby = Boolean(opts.hobbyMode);

  const img = h('img', {
    class: 'mg-img',
    src: slides[0].src,
    alt: loc(slides[0].alt) || ownerTitle,
    width: String(slides[0].width || 1000),
    height: String(slides[0].height || 565),
    loading: 'lazy',
    decoding: 'async'
  });

  const stage = h('div', { class: 'mg-stage' + (isHobby ? ' is-hobby-stage' : '') },
    img,
    isHobby ? h('span', { class: 'hobby-veil', 'aria-hidden': 'true' }) : null
  );

  const counter = h('span', { class: 'mg-counter', 'aria-live': 'polite', text: t('gallery_counter', { i: 1, n: total }) });
  const caption = h('figcaption', { class: 'mg-caption', text: loc(slides[0].caption) || '' });
  if (!loc(slides[0].caption)) caption.hidden = true;

  const prevBtn = h('button', { type: 'button', class: 'mg-btn mg-prev', 'aria-label': t('gallery_prev') },
    createSvgIcon('0 0 24 24', 2, [['path', { d: 'M15 6l-6 6 6 6' }]]));
  const nextBtn = h('button', { type: 'button', class: 'mg-btn mg-next', 'aria-label': t('gallery_next') },
    createSvgIcon('0 0 24 24', 2, [['path', { d: 'M9 6l6 6-6 6' }]]));

  const show = (nextIdx) => {
    idx = (nextIdx + total) % total;
    const s = slides[idx];
    img.src = s.src;
    img.alt = loc(s.alt) || ownerTitle;
    if (s.width) img.setAttribute('width', String(s.width));
    if (s.height) img.setAttribute('height', String(s.height));
    counter.textContent = t('gallery_counter', { i: idx + 1, n: total });
    const capTxt = loc(s.caption) || '';
    caption.textContent = capTxt;
    caption.hidden = !capTxt;
  };

  prevBtn.addEventListener('click', () => show(idx - 1));
  nextBtn.addEventListener('click', () => show(idx + 1));

  const fig = h('figure', {
    class: 'mini-gallery' + (isHobby ? ' is-hobby-gallery' : ''),
    role: 'region',
    'aria-roledescription': 'carousel',
    'aria-label': `${ownerTitle} — ${t('gallery_aria')}`,
    tabindex: '0'
  },
    stage,
    h('div', { class: 'mg-bar' },
      prevBtn,
      h('div', { class: 'mg-meta' }, caption, counter),
      nextBtn
    )
  );

  fig.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(idx - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); show(idx + 1); }
  });

  return fig;
}

function renderProfile() {
  const p = state.profile;
  const ids = ['principles', 'strengths', 'journeyGrid', 'hobbiesGrid', 'skillsList', 'projectCards'];
  if (!p) {
    if (state.dataError) {
      ids.forEach((id) => {
        const el = $('#' + id);
        if (!el) return;
        el.textContent = '';
        el.appendChild(h('p', { class: 'muted', text: t('data_error') }));
      });
    }
    return;
  }

  const pr = $('#principles');
  pr.textContent = '';
  (p.principles || []).forEach((x, i) => {
    pr.appendChild(
      h('article', { class: 'principle' },
        h('span', { text: ('0' + (i + 1)).slice(-2) }),
        h('h4', { text: loc(x.title) }),
        h('p', { text: loc(x.text) }))
    );
  });

  renderWorkStyle(p.workStyle);

  const jg = $('#journeyGrid');
  jg.textContent = '';
  (p.journey || []).forEach((x) => {
    const chips = locList(x.chips);
    jg.appendChild(
      h('article', { class: 'journey-item', 'data-journey-id': x.id || '' },
        h('span', { class: 'journey-dot', 'aria-hidden': 'true' }),
        h('div', { class: 'journey-card' },
          h('div', { class: 'journey-meta' },
            h('span', { class: 'journey-kicker', text: loc(x.kicker) }),
            x.period ? h('span', { class: 'journey-period', text: loc(x.period) }) : null),
          h('h3', { text: loc(x.title) }),
          h('p', { text: loc(x.text) }),
          chips.length ? h('ul', { class: 'journey-chips' }, chips.map((c) => h('li', { class: 'tag', text: c }))) : null))
    );
  });

  const hg = $('#hobbiesGrid');
  hg.textContent = '';
  (p.hobbies || []).forEach((x) => {
    let mediaEl;
    if (x.gallery && x.gallery.length > 1) {
      mediaEl = buildMiniGallery(x.gallery, loc(x.title), { hobbyMode: true });
    } else {
      const art = h('div', { class: 'hobby-art' + (x.image ? ' is-photo' : '') });
      if (x.image) {
        art.appendChild(h('img', {
          src: x.image,
          alt: loc(x.alt) || loc(x.title),
          loading: 'lazy',
          decoding: 'async',
          width: String(x.width || 1200),
          height: String(x.height || 675)
        }));
        art.appendChild(h('span', { class: 'hobby-veil', 'aria-hidden': 'true' }));
      } else if (HOBBY_SHAPES[x.icon]) {
        art.appendChild(createSvgIcon('0 0 64 64', 2.5, HOBBY_SHAPES[x.icon]));
      }
      mediaEl = art;
    }
    hg.appendChild(
      h('article', { class: 'hobby', 'data-hobby-id': x.id || '' },
        mediaEl,
        h('div', { class: 'hobby-body' },
          h('h4', { text: loc(x.title) }),
          h('p', { text: loc(x.text) })))
    );
  });

  const sk = $('#skillsList');
  sk.textContent = '';
  (p.skills || []).forEach((g) => {
    sk.appendChild(h('dt', { text: loc(g.group) }));
    sk.appendChild(h('dd', {}, (g.items || []).map((item) => h('span', { class: 'tag', text: loc(item) }))));
  });
}

// ---------- Proyectos + FLIP + caso interactivo VitalRisk AI ----------
function renderProjectChips() {
  const box = $('#projectChips');
  box.textContent = '';
  const present = KINDS.filter((k) => state.projects.some((p) => p.kind === k));
  const all = [['all', t('kind_all')]].concat(present.map((k) => [k, t('kind_' + k)]));
  if (all.length < 3) return;
  all.forEach(([key, label]) => {
    const b = h('button', { type: 'button', class: 'chip', 'aria-pressed': String(state.kind === key), text: label });
    b.addEventListener('click', () => {
      if (state.kind === key) return;
      state.kind = key;
      renderProjectChips();
      renderProjects(true);
    });
    box.appendChild(b);
  });
}

function buildProjectCard(p) {
  const links = [];
  if (p.caseStudy) {
    const caseBtn = h('button', { type: 'button', class: 'btn-case', text: t('btn_case') });
    caseBtn.addEventListener('click', () => openCaseStudy(p));
    links.push(caseBtn);
  }
  if (p.repo) links.push(h('a', { href: p.repo, target: '_blank', rel: 'noopener noreferrer', text: `${t('link_repo')} ↗` }));
  if (p.demo) {
    const demoText = p.demoLabel ? loc(p.demoLabel) : t('link_demo');
    links.push(h('a', { href: p.demo, target: '_blank', rel: 'noopener noreferrer', text: `${demoText} ↗` }));
  }

  const scanRows = [
    ['scan_problem', loc(p.problem)],
    ['scan_role', loc(p.role)],
    ['scan_result', loc(p.result)]
  ].filter(([, val]) => Boolean(val));

  const bodyEl = scanRows.length
    ? h('dl', { class: 'project-scan' },
      scanRows.map(([k, val]) => h('div', { class: 'scan-row' },
        h('dt', { text: t(k) }),
        h('dd', { text: val })
      )))
    : h('p', { text: loc(p.summary) });

  let mediaEl = null;
  if (p.gallery && p.gallery.length > 1) {
    mediaEl = buildMiniGallery(p.gallery, loc(p.title));
  } else if (p.gallery && p.gallery.length === 1) {
    const g0 = p.gallery[0];
    mediaEl = h('figure', { class: 'project-cover' },
      h('img', { src: g0.src, alt: loc(g0.alt) || loc(p.title), width: String(g0.width || 1000), height: String(g0.height || 565), loading: 'lazy', decoding: 'async' }),
      loc(g0.caption) ? h('figcaption', { text: loc(g0.caption) }) : null
    );
  }

  const isWip = p.id === 'alight-sparkx';
  return h('article', {
    class: 'card' + (p.featured ? ' featured' : '') + (p.caseStudy ? ' is-flagship' : ''),
    'data-flip-id': p.id
  },
    h('div', { class: 'card-top' },
      h('span', { class: 'idx', text: t('kind_' + p.kind) }),
      p.status ? h('span', { class: 'badge' + (isWip ? ' is-wip' : ''), text: loc(p.status) }) : null),
    h('h3', { text: loc(p.title) }),
    p.context ? h('p', { class: 'ctx', text: loc(p.context) }) : null,
    mediaEl,
    bodyEl,
    p.caseStudy ? h('ul', { class: 'metrics' }, locList(p.metrics).map((m) => h('li', { text: m }))) : null,
    p.learned ? h('p', { class: 'learned', text: loc(p.learned) }) : null,
    h('div', { class: 'tags' }, (p.tags || []).map((x) => h('span', { class: 'tag', text: x }))),
    links.length ? h('div', { class: 'links' }, links) : null
  );
}

function renderProjects(useFlip = false) {
  const box = $('#projectCards');
  const list = state.projects
    .filter((p) => state.kind === 'all' || p.kind === state.kind)
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const paint = () => {
    box.textContent = '';
    list.forEach((p) => box.appendChild(buildProjectCard(p)));
    motion.bindCardTilt(box);
  };

  if (useFlip) {
    motion.animateFlip(box, paint);
    const st = $('#projectStatus');
    if (st) st.textContent = t('projects_filtered', { n: list.length });
  } else {
    paint();
  }
}

// Diagrama SVG animado del flujo VitalRisk AI
function buildPipelineSvg(steps) {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'pipeline-svg');
  svg.setAttribute('viewBox', '0 0 912 132');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', steps.map((s) => loc(s.short)).join(' → '));

  const defs = document.createElementNS(NS, 'defs');
  const marker = document.createElementNS(NS, 'marker');
  marker.setAttribute('id', 'pipeArrow');
  marker.setAttribute('viewBox', '0 0 10 10');
  marker.setAttribute('refX', '8');
  marker.setAttribute('refY', '5');
  marker.setAttribute('markerWidth', '6');
  marker.setAttribute('markerHeight', '6');
  marker.setAttribute('orient', 'auto-start-reverse');
  const arrowPath = document.createElementNS(NS, 'path');
  arrowPath.setAttribute('d', 'M0 1 L9 5 L0 9 z');
  arrowPath.setAttribute('fill', 'var(--gold)');
  marker.appendChild(arrowPath);
  defs.appendChild(marker);
  svg.appendChild(defs);

  const nodeW = 132;
  const nodeH = 74;
  const gap = 22;
  const y0 = 28;

  steps.forEach((step, idx) => {
    const x = 6 + idx * (nodeW + gap);

    if (idx < steps.length - 1) {
      const x1 = x + nodeW;
      const x2 = x + nodeW + gap - 2;
      const ym = y0 + nodeH / 2;

      const base = document.createElementNS(NS, 'line');
      base.setAttribute('class', 'pipe-line');
      base.setAttribute('x1', x1);
      base.setAttribute('y1', ym);
      base.setAttribute('x2', x2);
      base.setAttribute('y2', ym);
      svg.appendChild(base);

      const flow = document.createElementNS(NS, 'line');
      flow.setAttribute('class', 'pipe-flow');
      flow.setAttribute('x1', x1);
      flow.setAttribute('y1', ym);
      flow.setAttribute('x2', x2);
      flow.setAttribute('y2', ym);
      flow.setAttribute('marker-end', 'url(#pipeArrow)');
      svg.appendChild(flow);
    }

    const g = document.createElementNS(NS, 'g');
    const rect = document.createElementNS(NS, 'rect');
    rect.setAttribute('class', 'pipe-node-bg');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y0);
    rect.setAttribute('width', nodeW);
    rect.setAttribute('height', nodeH);
    rect.setAttribute('rx', '12');
    g.appendChild(rect);

    const bar = document.createElementNS(NS, 'rect');
    bar.setAttribute('class', 'pipe-node-accent');
    bar.setAttribute('x', x + 12);
    bar.setAttribute('y', y0 + 10);
    bar.setAttribute('width', '26');
    bar.setAttribute('height', '3');
    bar.setAttribute('rx', '1.5');
    g.appendChild(bar);

    const num = document.createElementNS(NS, 'text');
    num.setAttribute('class', 'pipe-node-sub');
    num.setAttribute('x', x + nodeW - 12);
    num.setAttribute('y', y0 + 17);
    num.setAttribute('text-anchor', 'end');
    num.textContent = `0${idx + 1}`;
    g.appendChild(num);

    const title = document.createElementNS(NS, 'text');
    title.setAttribute('class', 'pipe-node-title');
    title.setAttribute('x', x + 12);
    title.setAttribute('y', y0 + 40);
    title.textContent = loc(step.short);
    g.appendChild(title);

    const sub = document.createElementNS(NS, 'text');
    sub.setAttribute('class', 'pipe-node-sub');
    sub.setAttribute('x', x + 12);
    sub.setAttribute('y', y0 + 58);
    sub.textContent = loc(step.sub);
    g.appendChild(sub);

    svg.appendChild(g);
  });

  return svg;
}

function openCaseStudy(p) {
  const dlg = $('#caseDialog');
  const cs = p.caseStudy;
  if (!dlg || !cs) return;

  dlg.classList.remove('is-animated');
  $('#caseEyebrow').textContent = t('case_eyebrow');
  $('#caseTitle').textContent = loc(p.title);
  $('#caseSub').textContent = loc(cs.subtitle);

  const content = $('#caseContent');
  content.textContent = '';

  const locale = state.lang === 'es' ? 'es-CO' : 'en-US';
  const bigNum = h('strong', { text: '0' });
  content.appendChild(
    h('div', { class: 'case-banner' },
      h('div', { class: 'case-score-big' }, bigNum, h('span', { text: `/ ${cs.juryMax}` })),
      h('p', { class: 'case-banner-note', text: t('case_jury_note', { teams: cs.teamsCount }) }))
  );

  // Scorecard del jurado
  const scoreBox = h('section', {}, h('h3', { class: 'case-section-title', text: t('case_scorecard_title') }));
  const scoreList = h('div', { class: 'scorecard' });
  (cs.scorecard || []).forEach((row) => {
    const ratio = Math.max(0, Math.min(1, row.score / row.max));
    const bar = h('div', { class: 'score-bar' + (row.score === row.max ? ' is-perfect' : '') });
    bar.style.setProperty('--ratio', String(ratio));
    scoreList.appendChild(
      h('div', { class: 'score-row' },
        h('div', { class: 'score-row-head' },
          h('span', { text: loc(row.label) }),
          h('span', { class: 'score-row-val', text: `${row.score} / ${row.max}` })),
        h('div', { class: 'score-track', role: 'img', 'aria-label': `${loc(row.label)}: ${row.score} / ${row.max}` }, bar))
    );
  });
  scoreBox.appendChild(scoreList);
  content.appendChild(scoreBox);

  // Métricas del modelo con count-up
  const kpiSec = h('section', {}, h('h3', { class: 'case-section-title', text: t('case_metrics_title') }));
  const kpiGrid = h('div', { class: 'kpi-grid' });
  const kpiTargets = [];
  (cs.modelKpis || []).forEach((k) => {
    const valEl = h('span', { class: 'kpi-val', text: '0' });
    kpiTargets.push({ el: valEl, cfg: k });
    kpiGrid.appendChild(
      h('div', { class: 'kpi-card' },
        valEl,
        h('span', { class: 'kpi-lbl', text: loc(k.label) }),
        h('span', { class: 'kpi-det', text: loc(k.detail) }))
    );
  });
  kpiSec.appendChild(kpiGrid);
  content.appendChild(kpiSec);

  // Vista de la aplicación y recorrido en video bajo demanda (preload="none")
  if (cs.media && (cs.media.poster || cs.media.video)) {
    const m = cs.media;
    const mediaBox = h('figure', { class: 'case-media' });
    if (m.video) {
      const videoEl = h('video', {
        class: 'case-video',
        controls: '',
        preload: 'none',
        playsinline: '',
        poster: m.poster || '',
        width: String(m.posterWidth || 908),
        height: String(m.posterHeight || 542),
        'aria-label': loc(m.posterAlt) || loc(p.title)
      },
        h('source', { src: m.video, type: 'video/mp4' }),
        m.poster ? h('img', { src: m.poster, alt: loc(m.posterAlt) || loc(p.title), width: String(m.posterWidth || 908), height: String(m.posterHeight || 542) }) : null
      );
      mediaBox.appendChild(videoEl);
    } else if (m.poster) {
      mediaBox.appendChild(h('img', {
        class: 'case-poster',
        src: m.poster,
        alt: loc(m.posterAlt) || loc(p.title),
        width: String(m.posterWidth || 908),
        height: String(m.posterHeight || 542),
        loading: 'lazy',
        decoding: 'async'
      }));
    }
    const capTxt = loc(m.videoCaption) || loc(m.posterAlt);
    if (capTxt) {
      mediaBox.appendChild(h('figcaption', { class: 'case-media-cap' },
        h('span', { text: capTxt }),
        m.video ? h('span', { class: 'case-media-hint', text: t('case_video_note') }) : null
      ));
    }
    content.appendChild(
      h('section', {},
        h('h3', { class: 'case-section-title', text: t('case_media_title') }),
        mediaBox)
    );
  }

  // Diagrama SVG del pipeline
  if (cs.pipeline && cs.pipeline.length) {
    content.appendChild(
      h('section', {},
        h('h3', { class: 'case-section-title', text: t('case_pipeline_title') }),
        h('div', { class: 'pipeline-box' }, buildPipelineSvg(cs.pipeline)))
    );
  }

  // Especificaciones técnicas
  if (cs.specs) {
    content.appendChild(
      h('section', {},
        h('h3', { class: 'case-section-title', text: t('case_specs_title') }),
        h('ul', { class: 'case-specs' }, locList(cs.specs).map((item) => h('li', { text: item }))))
    );
  }

  // Aprendizaje sincero
  if (cs.reflection) {
    content.appendChild(
      h('section', {},
        h('h3', { class: 'case-section-title', text: t('case_reflection_title') }),
        h('div', { class: 'case-reflection', text: loc(cs.reflection) }))
    );
  }

  // Enlaces directos (repo + demo Render)
  const acts = [];
  if (p.repo) acts.push(h('a', { class: 'btn', href: p.repo, target: '_blank', rel: 'noopener noreferrer', text: `${t('link_repo')} ↗` }));
  if (p.demo) {
    const demoText = p.demoLabel ? loc(p.demoLabel) : t('link_demo');
    acts.push(h('a', { class: 'btn primary', href: p.demo, target: '_blank', rel: 'noopener noreferrer', text: `${demoText} ↗` }));
  }
  if (acts.length) content.appendChild(h('div', { class: 'case-actions' }, acts));

  if (typeof dlg.showModal === 'function') dlg.showModal();
  else dlg.setAttribute('open', '');

  requestAnimationFrame(() => {
    dlg.classList.add('is-animated');
    motion.animateNumber(bigNum, cs.juryTotal, { decimals: 0, locale, duration: 760 });
    kpiTargets.forEach(({ el, cfg }) => {
      motion.animateNumber(el, cfg.value, {
        decimals: cfg.decimals || 0,
        prefix: cfg.prefix || '',
        suffix: cfg.suffix || '',
        locale,
        duration: 760
      });
    });
    const heading = $('#caseTitle');
    if (heading) heading.focus();
  });
}

// ---------- Certificados: portada 3:2 generada, búsqueda resaltada, orden y transición ----------
function monogram(issuer) {
  const w = String(issuer).split(/[\s·–-]+/).filter((x) => /^[A-Za-zÁÉÍÓÚ]/.test(x));
  return ((w[0] ? w[0][0] : '?') + (w[1] ? w[1][0] : '')).toUpperCase();
}

function buildGeneratedCover(c) {
  const year = String(c.date || '').slice(0, 4);
  const pills = [];
  if (year) pills.push(h('span', { class: 'cert-cover-pill', text: year }));
  if (c.hours) pills.push(h('span', { class: 'cert-cover-pill', text: `${c.hours} ${t('hours')}` }));

  return h('div', { class: 'cert-cover', 'data-cat': c.category },
    h('div', { class: 'cert-cover-top' },
      h('span', { class: 'cert-cover-cat', text: t('cat_' + c.category) }),
      h('div', { class: 'cert-cover-pills' }, pills)),
    h('div', { class: 'cert-cover-mid' },
      h('span', { class: 'cert-mono', text: monogram(c.issuer) }),
      h('span', { class: 'cert-cover-issuer', text: c.issuer })),
    h('span', { class: 'cert-cover-rule', 'aria-hidden': 'true' })
  );
}

function renderChips() {
  const box = $('#certChips');
  box.textContent = '';
  const present = CATS.filter((c) => state.certs.some((x) => x.category === c));
  const all = [['all', t('filter_all')]].concat(present.map((c) => [c, t('cat_' + c)]));
  all.forEach(([key, label]) => {
    const b = h('button', { type: 'button', class: 'chip', 'aria-pressed': String(state.cat === key), text: label });
    b.addEventListener('click', () => {
      state.cat = key;
      renderChips();
      renderCerts();
    });
    box.appendChild(b);
  });
}

function filteredCerts() {
  const q = state.q.trim().toLowerCase();
  const list = state.certs.filter((c) => {
    if (state.cat !== 'all' && c.category !== state.cat) return false;
    if (!q) return true;
    return `${c.title} ${c.issuer} ${t('cat_' + c.category)}`.toLowerCase().includes(q);
  });
  return list.sort((a, b) => {
    if (state.sort === 'date-asc') return String(a.date).localeCompare(String(b.date));
    if (state.sort === 'hours-desc') return (b.hours || 0) - (a.hours || 0) || String(b.date).localeCompare(String(a.date));
    return String(b.date).localeCompare(String(a.date));
  });
}

function renderCerts() {
  const grid = $('#certGrid');
  grid.textContent = '';
  if (state.dataError && !state.certs.length) {
    grid.appendChild(h('div', { class: 'empty', text: t('data_error') }));
    return;
  }
  const list = filteredCerts();
  $('#certCount').textContent = t('showing', { n: list.length, t: state.certs.length });
  if (!list.length) {
    grid.appendChild(h('div', { class: 'empty', text: t('none_found') }));
    return;
  }

  list.forEach((c) => {
    const art = h('div', { class: 'cert-art' },
      c.thumb
        ? h('img', { src: c.thumb, alt: '', loading: 'lazy', decoding: 'async', width: '1200', height: '800' })
        : buildGeneratedCover(c)
    );
    const foot = h('div', { class: 'cert-foot' },
      h('span', { text: fmtDate(c.date, { year: 'numeric', month: 'short' }) + (c.hours ? ` · ${c.hours} ${t('hours')}` : '') }),
      c.url ? h('span', { class: 'cert-verified', text: `${t('verified_tag')} ↗` }) : null
    );
    const titleEl = h('span', { class: 'cert-title' }, highlightNodes(c.title, state.q));
    const issuerEl = h('span', { class: 'cert-issuer' }, highlightNodes(c.issuer, state.q));

    const card = h('button', { type: 'button', class: 'cert' },
      art,
      h('div', { class: 'cert-body' },
        h('span', { class: 'cert-cat', text: t('cat_' + c.category) }),
        titleEl,
        issuerEl,
        foot)
    );
    card.addEventListener('click', () => openCert(c, art));
    grid.appendChild(card);
  });
}

function populateCertDialog(c) {
  $('#dlgCat').textContent = t('cat_' + c.category);
  $('#dlgTitle').textContent = c.title;
  $('#dlgMeta').textContent = `${c.issuer} · ${fmtDate(c.date)}${c.hours ? ` · ${c.hours} ${t('hours')}` : ''}`;
  const noteEl = $('#dlgNote');
  const noteTxt = loc(c.note);
  noteEl.textContent = noteTxt;
  noteEl.hidden = !noteTxt;

  const body = $('#dlgBody');
  body.textContent = '';
  const acts = $('#dlgActions');
  acts.textContent = '';

  const f = c.file || '';
  if (/\.(png|jpe?g|webp|gif)$/i.test(f)) {
    body.appendChild(h('img', { src: f, alt: c.title, class: 'dlg-hero-preview' }));
  } else if (/\.pdf$/i.test(f)) {
    body.appendChild(h('object', { data: f, type: 'application/pdf', 'aria-label': c.title },
      h('a', { href: f, target: '_blank', rel: 'noopener noreferrer', text: t('open_file') })));
  } else if (c.thumb) {
    body.appendChild(h('img', { src: c.thumb, alt: c.title, class: 'dlg-hero-preview' }));
  } else {
    body.appendChild(h('div', { class: 'dlg-hero-preview' }, buildGeneratedCover(c)));
    if (!c.url) body.appendChild(h('p', { class: 'muted small dlg-empty-note', text: t('no_preview') }));
  }

  if (f) acts.appendChild(h('a', { class: 'btn', href: f, target: '_blank', rel: 'noopener noreferrer', text: t('open_file') }));
  if (c.url) acts.appendChild(h('a', { class: 'btn primary', href: c.url, target: '_blank', rel: 'noopener noreferrer', text: `${t('verify')} ↗` }));
}

function openCert(c, sourceArt) {
  const dlg = $('#certDialog');
  if (!dlg) return;

  const show = () => {
    populateCertDialog(c);
    if (sourceArt) sourceArt.classList.remove('is-vt');
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
  };

  if (document.startViewTransition && !motion.env.reduced && sourceArt) {
    document.querySelectorAll('.cert-art.is-vt').forEach((el) => el.classList.remove('is-vt'));
    sourceArt.classList.add('is-vt');
    const transition = document.startViewTransition(() => show());
    transition.finished.finally(() => {
      document.querySelectorAll('.cert-art.is-vt').forEach((el) => el.classList.remove('is-vt'));
      const heading = $('#dlgTitle');
      if (heading) heading.focus();
    });
  } else {
    show();
    const heading = $('#dlgTitle');
    if (heading) heading.focus();
  }
}

// ---------- GitHub: repositorios y actividad (carga diferida al acercarse al viewport) ----------
function renderRepos() {
  const box = $('#repoList');
  if (!box) return;
  if (state.repos === null) {
    box.textContent = '';
    box.appendChild(h('p', { class: 'muted', text: state.reposLoaded ? t('loading') : t('lazy_waiting') }));
    return;
  }
  box.textContent = '';
  if (state.repos === false) {
    const key = state.reposErrorReason === 'ratelimit' ? 'repos_ratelimit'
      : state.reposErrorReason === 'offline' ? 'repos_offline' : 'repos_error';
    box.appendChild(h('p', { class: 'muted' }, `${t(key)} `,
      h('a', { href: `https://github.com/${CFG.user}?tab=repositories`, target: '_blank', rel: 'noopener noreferrer', text: `github.com/${CFG.user}` })));
    return;
  }
  if (!state.repos.length) { box.appendChild(h('p', { class: 'muted', text: t('no_activity') })); return; }
  state.repos.forEach((r) => {
    box.appendChild(
      h('div', { class: 'repo' },
        h('a', { href: r.html_url, target: '_blank', rel: 'noopener noreferrer', text: r.name }),
        r.description ? h('p', { text: r.description }) : null,
        h('div', { class: 'meta' },
          r.language ? h('span', { text: r.language }) : null,
          r.stargazers_count ? h('span', { text: `★ ${r.stargazers_count}` }) : null,
          h('span', { text: `${t('updated')} ${relTime(r.pushed_at)}` })))
    );
  });
}

function loadRepos() {
  if (state.reposLoaded) return Promise.resolve();
  state.reposLoaded = true;
  renderRepos();
  return getJSON(`https://api.github.com/users/${CFG.user}/repos?per_page=100&sort=pushed`).then((all) => {
    const skip = [CFG.user.toLowerCase(), `${CFG.user}.github.io`.toLowerCase()];
    const own = all.filter((r) => !r.fork && !skip.includes(r.name.toLowerCase()));
    state.repos = own.slice(0, CFG.maxRepos);
    state.reposCount = all.filter((r) => !r.fork).length;
    state.reposErrorReason = '';
    syncStatAndBadges();
    renderRepos();
    keepAnchorAligned();
    if (dockApi) dockApi.sync();
  }).catch((err) => {
    state.repos = false;
    state.reposErrorReason = classifyNetworkError(err);
    syncStatAndBadges();
    renderRepos();
    keepAnchorAligned();
    if (dockApi) dockApi.sync();
  });
}

function positionHeatTooltip(rectEl, text) {
  const tip = $('#heatTooltip');
  const stage = $('.heat-stage');
  if (!tip || !stage) return;
  const sr = stage.getBoundingClientRect();
  const rr = rectEl.getBoundingClientRect();
  tip.textContent = text;
  tip.hidden = false;
  const left = Math.max(70, Math.min(sr.width - 70, rr.left - sr.left + rr.width / 2));
  const top = Math.max(26, rr.top - sr.top - 8);
  tip.style.left = `${left.toFixed(1)}px`;
  tip.style.top = `${top.toFixed(1)}px`;
}

function hideHeatTooltip() {
  const tip = $('#heatTooltip');
  if (tip) tip.hidden = true;
}

function buildHeatmap() {
  const box = $('#heatmap');
  box.textContent = '';
  hideHeatTooltip();
  if (!activity.days) return;

  const days = activity.days;
  const cell = 11, gap = 3, step = cell + gap, left = 26, top = 16;
  const first = new Date(`${days[0].date}T00:00:00Z`);
  const offset = first.getUTCDay();
  const weeks = Math.ceil((days.length + offset) / 7);
  const NS = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', left + weeks * step);
  svg.setAttribute('height', top + 7 * step);

  const months = state.lang === 'es'
    ? ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dnames = state.lang === 'es' ? ['', 'lun', '', 'mié', '', 'vie', ''] : ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  dnames.forEach((n, i) => {
    if (!n) return;
    const tx = document.createElementNS(NS, 'text');
    tx.setAttribute('x', 0);
    tx.setAttribute('y', top + i * step + 9);
    tx.textContent = n;
    svg.appendChild(tx);
  });

  // Agrupar rectángulos por columna (semana) para animar en ola
  const colGroups = [];
  for (let w = 0; w < weeks; w++) {
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'heat-col');
    g.style.setProperty('--col', String(w));
    svg.appendChild(g);
    colGroups.push(g);
  }

  let lastMonth = -1;
  let lastMonthCol = -4;
  days.forEach((d, i) => {
    const idx = i + offset;
    const w = Math.floor(idx / 7);
    const dow = idx % 7;
    const date = new Date(`${d.date}T00:00:00Z`);
    if (dow === 0 || i === 0) {
      const m = date.getUTCMonth();
      if (m !== lastMonth && w - lastMonthCol >= 3 && (w > 0 || date.getUTCDate() < 20)) {
        lastMonth = m;
        lastMonthCol = w;
        const tl = document.createElementNS(NS, 'text');
        tl.setAttribute('x', left + w * step);
        tl.setAttribute('y', 10);
        tl.textContent = months[m];
        svg.appendChild(tl);
      }
    }

    const r = document.createElementNS(NS, 'rect');
    r.setAttribute('x', left + w * step);
    r.setAttribute('y', top + dow * step);
    r.setAttribute('width', cell);
    r.setAttribute('height', cell);
    r.setAttribute('rx', 2.5);
    r.setAttribute('tabindex', '0');
    r.setAttribute('class', 'l' + Math.max(0, Math.min(4, d.level)));

    const label = `${d.count}${state.lang === 'es' ? ' contribuciones · ' : ' contributions · '}${fmtDate(d.date)}`;
    r.setAttribute('aria-label', label);
    const ti = document.createElementNS(NS, 'title');
    ti.textContent = label;
    r.appendChild(ti);

    r.addEventListener('pointerenter', () => positionHeatTooltip(r, label));
    r.addEventListener('focus', () => positionHeatTooltip(r, label));
    r.addEventListener('pointerleave', hideHeatTooltip);
    r.addEventListener('blur', hideHeatTooltip);

    colGroups[w].appendChild(r);
  });

  box.appendChild(svg);
  const sc = $('#heatScroll');
  if (sc) sc.scrollLeft = sc.scrollWidth;

  if (!motion.env.reduced && !state.heatAnimated) {
    box.classList.add('is-animating');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        state.heatAnimated = true;
        box.classList.add('is-wave');
        io.disconnect();
      }, { threshold: 0.15 });
      io.observe(box);
    } else {
      state.heatAnimated = true;
      box.classList.remove('is-animating');
    }
  }
}

function levelFor(n, max) {
  if (!n) return 0;
  const q = n / Math.max(max, 1);
  return q > 0.75 ? 4 : q > 0.5 ? 3 : q > 0.25 ? 2 : 1;
}

function daysFromEvents(events) {
  const counts = {};
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  events.forEach((e) => {
    const k = e.created_at.slice(0, 10);
    const n = e.type === 'PushEvent' ? ((e.payload && e.payload.commits && e.payload.commits.length) || 1) : 1;
    counts[k] = (counts[k] || 0) + n;
  });
  const out = [];
  let max = 0;
  for (let i = 364; i >= 0; i--) {
    const d = new Date(end.getTime() - i * 86400000);
    const k = d.toISOString().slice(0, 10);
    out.push({ date: k, count: counts[k] || 0 });
    max = Math.max(max, counts[k] || 0);
  }
  out.forEach((d) => { d.level = levelFor(d.count, max); });
  return out;
}

function describeEvent(e) {
  const p = e.payload || {};
  const repo = e.repo && e.repo.name ? e.repo.name : '';
  const url = repo ? `https://github.com/${repo}` : `https://github.com/${CFG.user}`;
  let head = '';
  let detail = '';
  switch (e.type) {
    case 'PushEvent': {
      const n = p.commits ? p.commits.length : (p.size || 1);
      head = t('ev_push', { n });
      detail = p.commits && p.commits[0] ? p.commits[0].message.split('\n')[0] : '';
      break;
    }
    case 'CreateEvent':
      head = t('ev_create', { what: p.ref_type === 'branch' ? t('ev_branch') : p.ref_type === 'tag' ? t('ev_tag') : t('ev_repo') });
      detail = p.ref || '';
      break;
    case 'PullRequestEvent':
      head = t('ev_pr', { act: p.action === 'closed' ? (p.pull_request && p.pull_request.merged ? t('act_merged') : t('act_closed')) : p.action === 'opened' ? t('act_opened') : t('act_other') });
      detail = p.pull_request ? p.pull_request.title : '';
      break;
    case 'IssuesEvent':
      head = t('ev_issue', { act: p.action === 'closed' ? t('act_closed') : p.action === 'opened' ? t('act_opened') : t('act_other') });
      detail = p.issue ? p.issue.title : '';
      break;
    case 'WatchEvent': head = t('ev_watch'); break;
    case 'ForkEvent': head = t('ev_fork'); break;
    case 'PublicEvent': head = t('ev_public'); break;
    case 'ReleaseEvent': head = t('ev_release'); detail = p.release ? (p.release.name || p.release.tag_name) : ''; break;
    default: head = t('ev_other');
  }
  return { head, repo, url, detail, type: e.type };
}

function renderFeed() {
  const feed = $('#feed');
  if (!feed) return;
  if (!activity.error && !activity.events) {
    feed.textContent = '';
    feed.appendChild(h('li', { class: 'muted feed-msg', text: activity.loaded ? t('loading') : t('lazy_waiting') }));
    return;
  }
  feed.textContent = '';
  if (activity.error) {
    const key = activity.errorReason === 'ratelimit' ? 'activity_ratelimit'
      : activity.errorReason === 'offline' ? 'activity_offline' : 'activity_error';
    feed.appendChild(h('li', { class: 'muted feed-msg' }, `${t(key)} `, h('a', { href: `https://github.com/${CFG.user}`, target: '_blank', rel: 'noopener noreferrer', text: `github.com/${CFG.user}` })));
    return;
  }
  if (!activity.events) return;
  const list = activity.events.slice(0, CFG.maxEvents);
  if (!list.length) {
    feed.appendChild(h('li', { class: 'muted feed-msg', text: t('no_activity') }));
    return;
  }
  list.forEach((e) => {
    const d = describeEvent(e);
    const ico = h('span', { class: 'feed-ico', 'aria-hidden': 'true' },
      createSvgIcon('0 0 24 24', 2, EVENT_SHAPES[d.type] || EVENT_SHAPES.default));
    feed.appendChild(
      h('li', {},
        ico,
        h('div', { class: 'what' }, `${d.head} `, h('a', { href: d.url, target: '_blank', rel: 'noopener noreferrer', text: d.repo })),
        d.detail ? h('p', { class: 'detail', text: d.detail }) : null,
        h('div', { class: 'when', text: relTime(e.created_at) }))
    );
  });
}

function renderActivityText() {
  if (activity.days) {
    const total = activity.total != null ? activity.total : activity.days.reduce((a, d) => a + d.count, 0);
    $('#contribTotal').textContent = t('contrib_total', { n: total.toLocaleString(state.lang === 'es' ? 'es-CO' : 'en-US') });
    $('#heatNote').textContent = activity.approx ? t('heat_fallback') : '';
    buildHeatmap();
  } else if (activity.error) {
    $('#contribTotal').textContent = '–';
    $('#heatmap').textContent = '';
  }
  renderFeed();
}

function loadActivity() {
  if (activity.loaded) return Promise.resolve();
  activity.loaded = true;
  renderFeed();
  let evErr = null;
  let grErr = null;
  const ev = getJSON(`https://api.github.com/users/${CFG.user}/events/public?per_page=100`).catch((e) => { evErr = e; return null; });
  const gr = getJSON(`https://github-contributions-api.jogruber.de/v4/${CFG.user}?y=last`).catch((e) => { grErr = e; return null; });
  return Promise.all([ev, gr]).then(([events, graph]) => {
    activity.events = events || [];
    if (graph && graph.contributions && graph.contributions.length) {
      activity.days = graph.contributions.slice(-371);
      activity.total = graph.total && graph.total.lastYear != null ? graph.total.lastYear : null;
      if (activity.total == null) activity.total = activity.days.reduce((a, d) => a + d.count, 0);
    } else if (events) {
      activity.days = daysFromEvents(events);
      activity.approx = true;
      activity.total = null;
    }
    if (!events && !graph) {
      activity.error = true;
      activity.errorReason = classifyNetworkError(evErr || grErr);
    }
    renderActivityText();
    keepAnchorAligned();
  });
}

function initLazyGitHub() {
  const projSec = $('#projects');
  const actSec = $('#activity');
  if (!('IntersectionObserver' in window)) {
    loadRepos();
    loadActivity();
    return;
  }
  if (projSec) {
    const ioProj = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      ioProj.disconnect();
      loadRepos();
    }, { rootMargin: '320px 0px' });
    ioProj.observe(projSec);
  } else {
    loadRepos();
  }
  if (actSec) {
    const ioAct = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      ioAct.disconnect();
      loadActivity();
      loadRepos();
    }, { rootMargin: '360px 0px' });
    ioAct.observe(actSec);
  } else {
    loadActivity();
  }
}

// ---------- Scrollspy con indicador deslizante ----------
const mqHideDesktopNav = window.matchMedia('(max-width: 760px), (pointer: coarse) and (max-width: 1024px)');
let navIndicatorRaf = 0;

function updateNavIndicator() {
  if (mqHideDesktopNav.matches) return;
  if (navIndicatorRaf) cancelAnimationFrame(navIndicatorRaf);
  navIndicatorRaf = requestAnimationFrame(() => {
    navIndicatorRaf = 0;
    const nav = $('#nav');
    const indicator = $('#navIndicator');
    if (!nav || !indicator || mqHideDesktopNav.matches) return;
    const active = nav.querySelector('a.active');
    if (!active) {
      indicator.classList.remove('is-visible');
      return;
    }
    const nr = nav.getBoundingClientRect();
    if (nr.width === 0) return;
    const ar = active.getBoundingClientRect();
    const x = ar.left - nr.left + nav.scrollLeft;
    indicator.style.transform = `translateX(${x.toFixed(1)}px) scaleX(${ar.width.toFixed(1)})`;
    indicator.classList.add('is-visible');
  });
}

function setActiveNav(secId) {
  activeSectionId = secId;
  const target = '#' + secId;
  document.querySelectorAll('#nav a').forEach((a) => {
    const on = a.getAttribute('href') === target;
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'location');
    else a.removeAttribute('aria-current');
  });
  updateNavIndicator();
  if (dockApi) dockApi.setActiveSection(secId, { fromScroll: true });
}

function initScrollSpy() {
  if (!('IntersectionObserver' in window)) return;
  const map = { top: 'about', about: 'about', projects: 'projects', journey: 'journey', skills: 'journey', certs: 'certs', activity: 'activity', contact: 'contact' };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const mapped = map[en.target.id];
      if (mapped) setActiveNav(mapped);
    });
  }, { rootMargin: '-24% 0px -58% 0px' });
  Object.keys(map).forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });

  // Garantiza que Contacto se active al llegar al final de la página en cualquier altura
  const foot = document.querySelector('footer.foot');
  if (foot) {
    const footIo = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setActiveNav('contact');
    }, { threshold: 0.25 });
    footIo.observe(foot);
  }

  window.addEventListener('resize', updateNavIndicator, { passive: true });
}

// ---------- Logros verificables del hero con count-up ----------
function initStatCounters() {
  const band = $('.statband');
  const fire = () => {
    if (state.statsCounted) return;
    state.statsCounted = true;
    const locale = state.lang === 'es' ? 'es-CO' : 'en-US';
    motion.animateNumber($('#statVitalRisk'), 82, { suffix: '/100', locale, duration: 560 });
    motion.animateNumber($('#statSura'), 3, { suffix: state.lang === 'es' ? '.º de 12' : 'rd of 12', locale, duration: 520 });
    motion.animateNumber($('#statAlight'), 1, { suffix: state.lang === 'es' ? '.º' : 'st', locale, duration: 460 });
    window.setTimeout(() => {
      state.statsDone = true;
      syncStatAndBadges();
    }, motion.env.reduced ? 0 : 620);
  };
  if (!band || !('IntersectionObserver' in window) || motion.env.reduced) {
    fire();
    return;
  }
  const io = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    fire();
    io.disconnect();
  }, { threshold: 0.15 });
  io.observe(band);
}

// ---------- Contacto: copiar correo con toast y validación amable ----------
async function copyEmail() {
  const email = getEmailAddress();
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(email);
    } else {
      const tmp = document.createElement('textarea');
      tmp.value = email;
      tmp.setAttribute('readonly', '');
      tmp.style.position = 'fixed';
      tmp.style.opacity = '0';
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand('copy');
      tmp.remove();
    }
    showToast(t('toast_copied'));
  } catch (e) {
    showToast(t('toast_copy_fail'));
  }
}

function initContact() {
  const mail = `mailto:${getEmailAddress()}`;
  $('#mailBtn').href = mail;
  $('#linkedinBtn').href = CFG.linkedin;
  $('#linkedinBtn2').href = CFG.linkedin;
  $('#githubBtn').href = `https://github.com/${CFG.user}`;
  $('#githubBtn2').href = `https://github.com/${CFG.user}`;

  const copyBtn = $('#copyMailBtn');
  if (copyBtn) copyBtn.addEventListener('click', copyEmail);

  const form = $('#contactForm');
  const errBox = $('#cfError');
  const fields = [$('#cfName'), $('#cfEmail'), $('#cfMsg')];

  fields.forEach((f) => {
    f.addEventListener('input', () => {
      if (f.getAttribute('aria-invalid') === 'true') {
        f.setAttribute('aria-invalid', 'false');
        if (errBox && !fields.some((x) => x.getAttribute('aria-invalid') === 'true')) {
          errBox.hidden = true;
        }
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const [name, email, msg] = fields;
    const checks = [
      { el: name, ok: name.value.trim() !== '', err: t('form_err_name') },
      { el: email, ok: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), err: t('form_err_email') },
      { el: msg, ok: msg.value.trim() !== '', err: t('form_err_msg') }
    ];
    let firstBad = null;
    checks.forEach((c) => {
      c.el.setAttribute('aria-invalid', String(!c.ok));
      if (!c.ok && !firstBad) firstBad = c;
    });
    if (firstBad) {
      if (errBox) {
        errBox.textContent = firstBad.err;
        errBox.hidden = false;
      }
      firstBad.el.focus();
      return;
    }
    if (errBox) errBox.hidden = true;
    const body = `${msg.value.trim()}\n\n— ${name.value.trim()} (${email.value.trim()})`;
    window.location.href = `${mail}?subject=${encodeURIComponent(t('form_subject', { name: name.value.trim() }))}&body=${encodeURIComponent(body)}`;
  });
}

// ---------- Fallback light-dismiss en <dialog> + pausa de video al cerrar ----------
function initDialogFallbacks() {
  const caseDlg = $('#caseDialog');
  if (caseDlg) {
    caseDlg.addEventListener('close', () => {
      caseDlg.querySelectorAll('video').forEach((v) => { try { v.pause(); } catch {} });
    });
  }
  if ('closedBy' in HTMLDialogElement.prototype) return;
  const isOutside = (e, dlg) => {
    const r = dlg.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };
  document.querySelectorAll('dialog[closedby="any"]').forEach((dlg) => {
    let pressedOutside = false;
    dlg.addEventListener('pointerdown', (e) => { pressedOutside = isOutside(e, dlg); });
    dlg.addEventListener('pointerup', (e) => { if (pressedOutside && isOutside(e, dlg)) dlg.close(); });
  });
}

// ---------- API interna para extras (paleta, atajos) y Dock móvil ----------
export const portfolioApi = {
  CFG,
  state,
  motion,
  t,
  setLang,
  setTheme,
  toggleTheme,
  getEffectiveTheme,
  copyEmail,
  showToast,
  getExtrasApi: () => extrasApi,
  openVitalRisk: () => {
    const vr = state.projects.find((p) => p.id === 'vitalrisk-ai');
    if (vr) openCaseStudy(vr);
  }
};

function ensureExtras() {
  if (extrasApi) return Promise.resolve(extrasApi);
  if (!extrasLoading) {
    extrasLoading = import('./extras.js?v=3.1.0').then(({ initExtras }) => {
      extrasApi = initExtras(portfolioApi);
      if (dockApi) dockApi.sync();
      return extrasApi;
    }).catch(() => {
      extrasLoading = null;
      return null;
    });
  }
  return extrasLoading;
}

function initMobileDockLoader() {
  const mqDock = window.matchMedia('(max-width: 760px), (pointer: coarse) and (max-width: 1024px)');
  const ensureDock = () => {
    if (dockApi || dockLoading || !mqDock.matches) return;
    dockLoading = import('./dock.js?v=3.1.0').then(({ initDock }) => {
      dockApi = initDock(portfolioApi);
      dockApi.syncCv(cvAvailable);
      dockApi.setActiveSection(activeSectionId, { silent: true, animate: false });
      dockApi.sync();
    }).catch(() => {
      dockLoading = null;
    });
  };
  ensureDock();
  if (mqDock.addEventListener) mqDock.addEventListener('change', ensureDock);
}

// ---------- Inicio ----------
function init() {
  const saved = store('lang');
  state.lang = saved === 'en' || saved === 'es' ? saved : 'es';

  motion.runIntroLoader();
  motion.initHeroCanvas();
  motion.initScrollMechanics();
  motion.initReveals();
  motion.bindMagnetic(document);

  initTheme();
  initContact();
  initScrollSpy();
  initDialogFallbacks();
  initMobileDockLoader();

  // Carga extras (paleta Ctrl+K, atajos, spotlight) en inactividad o al primer intento de uso
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => ensureExtras(), { timeout: 600 });
  } else {
    window.setTimeout(() => ensureExtras(), 120);
  }
  const onCmdEarly = () => ensureExtras().then((api) => { if (api) api.openCmdPalette(); });
  const onHelpEarly = () => ensureExtras().then((api) => { if (api) api.openHelpDialog(); });
  const cmdBtn = $('#cmdBtn');
  const helpBtn = $('#helpBtn');
  if (cmdBtn) cmdBtn.addEventListener('click', () => { if (!extrasApi) onCmdEarly(); }, { once: true });
  if (helpBtn) helpBtn.addEventListener('click', () => { if (!extrasApi) onHelpEarly(); }, { once: true });
  document.addEventListener('keydown', (e) => {
    if (!extrasApi && ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      onCmdEarly();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => {
      const id = (a.getAttribute('href') || '').slice(1);
      if (id && id !== 'top') trackAnchorJump(id);
    });
  });

  document.querySelectorAll('.seg button').forEach((b) => {
    b.addEventListener('click', () => setLang(b.dataset.lang));
  });
  $('#certSearch').addEventListener('input', (e) => {
    state.q = e.target.value;
    renderCerts();
  });
  $('#certSort').addEventListener('change', (e) => {
    state.sort = e.target.value;
    renderCerts();
  });

  fetch(CFG.cvPath, { method: 'HEAD' })
    .then((r) => {
      cvAvailable = r.ok;
      const b = $('#cvBtn');
      if (b) {
        b.hidden = !r.ok;
        if (r.ok) b.href = CFG.cvPath;
      }
      if (dockApi) dockApi.syncCv(r.ok);
    })
    .catch(() => {});

  applyStaticI18n();
  initStatCounters();

  const vq = `?v=${CFG.version}`;
  Promise.all([
    getJSON(`data/certificates.json${vq}`),
    getJSON(`data/projects.json${vq}`),
    getJSON(`data/profile.json${vq}`)
  ]).then(([certs, projects, profile]) => {
    state.certs = visible(certs).sort((a, b) => String(b.date).localeCompare(String(a.date)));
    state.projects = visible(projects);
    state.profile = profile;
    renderAll();
  }).catch(() => {
    state.dataError = true;
    renderProfile();
    renderCerts();
  });

  initLazyGitHub();
}

init();
