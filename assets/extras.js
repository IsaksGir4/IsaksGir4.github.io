/* Extras de ingeniero senior · v3
   1. Paleta de comandos (Ctrl/Cmd+K) accesible con navegación por teclado
   2. Spotlight ambiental sutil en escritorio (solo puntero fino, en el bucle rAF compartido)
   3. Guía de atajos de teclado («?») y atajos rápidos seguros */

const EXTRA_I18N = {
  es: {
    cmd_btn_aria: 'Ctrl K, paleta de comandos',
    help_btn_aria: 'Ver atajos de teclado',
    cmd_eyebrow: 'Navegación rápida',
    cmd_title: 'Paleta de comandos',
    cmd_ph: 'Buscar sección o acción…',
    cmd_empty: 'No hay comandos que coincidan.',
    cmd_hint: '↑↓ navegar · Enter ejecutar · Esc cerrar',
    cmd_group_nav: 'Ir a sección',
    cmd_group_act: 'Acciones',
    cmd_top: 'Inicio',
    cmd_about: 'Perfil y cómo trabajo',
    cmd_projects: 'Proyectos',
    cmd_vitalrisk: 'Abrir caso de estudio: VitalRisk AI (82/100)',
    cmd_journey: 'Trayectoria y aficiones',
    cmd_skills: 'Con qué trabajo',
    cmd_certs: 'Formación y reconocimientos',
    cmd_activity: 'Actividad en GitHub',
    cmd_contact: 'Contacto',
    cmd_theme: 'Cambiar tema (claro / oscuro)',
    cmd_lang: 'Cambiar idioma a English (EN)',
    cmd_copy: 'Copiar correo electrónico',
    cmd_cv: 'Abrir hoja de vida (PDF)',
    cmd_linkedin: 'Abrir LinkedIn ↗',
    cmd_github: 'Abrir GitHub ↗',
    help_eyebrow: 'Productividad',
    help_title: 'Atajos de teclado',
    help_sub: 'Disponibles cuando no estás escribiendo en un campo de texto.',
    sc_cmd: 'Abrir paleta de comandos',
    sc_theme: 'Alternar tema claro / oscuro',
    sc_lang: 'Cambiar idioma ES / EN',
    sc_copy: 'Copiar correo al portapapeles',
    sc_vr: 'Abrir caso de estudio VitalRisk AI',
    sc_help: 'Mostrar esta guía de atajos',
    sc_esc: 'Cerrar cualquier ventana abierta'
  },
  en: {
    cmd_btn_aria: 'Ctrl K, command palette',
    help_btn_aria: 'Keyboard shortcuts',
    cmd_eyebrow: 'Quick navigation',
    cmd_title: 'Command palette',
    cmd_ph: 'Search sections or actions…',
    cmd_empty: 'No matching commands.',
    cmd_hint: '↑↓ navigate · Enter run · Esc close',
    cmd_group_nav: 'Jump to section',
    cmd_group_act: 'Actions',
    cmd_top: 'Top',
    cmd_about: 'Profile & how I work',
    cmd_projects: 'Projects',
    cmd_vitalrisk: 'Open case study: VitalRisk AI (82/100)',
    cmd_journey: 'Background & hobbies',
    cmd_skills: 'Toolbox',
    cmd_certs: 'Learning & recognitions',
    cmd_activity: 'GitHub activity',
    cmd_contact: 'Contact',
    cmd_theme: 'Toggle light / dark theme',
    cmd_lang: 'Switch language to Español (ES)',
    cmd_copy: 'Copy email address',
    cmd_cv: 'Open résumé (PDF)',
    cmd_linkedin: 'Open LinkedIn ↗',
    cmd_github: 'Open GitHub ↗',
    help_eyebrow: 'Productivity',
    help_title: 'Keyboard shortcuts',
    help_sub: 'Available whenever you are not typing inside an input field.',
    sc_cmd: 'Open command palette',
    sc_theme: 'Toggle light / dark theme',
    sc_lang: 'Switch ES / EN language',
    sc_copy: 'Copy email to clipboard',
    sc_vr: 'Open VitalRisk AI case study',
    sc_help: 'Show this shortcuts guide',
    sc_esc: 'Close any open modal dialog'
  }
};

export function initExtras(api) {
  const { CFG, state, motion } = api;
  const tx = (k) => (EXTRA_I18N[state.lang] && EXTRA_I18N[state.lang][k]) || EXTRA_I18N.es[k] || k;
  const $ = (s) => document.querySelector(s);

  const cmdDialog = $('#cmdDialog');
  const cmdInput = $('#cmdInput');
  const cmdList = $('#cmdList');
  const helpDialog = $('#helpDialog');
  const helpList = $('#helpList');
  const cmdBtn = $('#cmdBtn');
  const helpBtn = $('#helpBtn');

  let activeIdx = 0;
  let currentItems = [];

  function isTypingTarget(el) {
    if (!el) return false;
    const tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
  }

  function anyDialogOpen() {
    return Boolean(document.querySelector('dialog[open], #dockSheet:not([hidden])'));
  }

  function jumpTo(hash) {
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: motion.env.reduced ? 'auto' : 'smooth' });
    }
  }

  function getCommands() {
    const cvBtn = $('#cvBtn');
    const items = [
      { id: 'vitalrisk', group: tx('cmd_group_act'), label: tx('cmd_vitalrisk'), keys: 'V', run: () => api.openVitalRisk() },
      { id: 'theme', group: tx('cmd_group_act'), label: tx('cmd_theme'), keys: 'T', run: () => api.toggleTheme() },
      { id: 'lang', group: tx('cmd_group_act'), label: tx('cmd_lang'), keys: 'L', run: () => api.setLang(state.lang === 'es' ? 'en' : 'es') },
      { id: 'copy', group: tx('cmd_group_act'), label: tx('cmd_copy'), keys: 'C', run: () => api.copyEmail() },
      { id: 'top', group: tx('cmd_group_nav'), label: tx('cmd_top'), keys: '', run: () => jumpTo('#top') },
      { id: 'about', group: tx('cmd_group_nav'), label: tx('cmd_about'), keys: '', run: () => jumpTo('#about') },
      { id: 'projects', group: tx('cmd_group_nav'), label: tx('cmd_projects'), keys: '', run: () => jumpTo('#projects') },
      { id: 'journey', group: tx('cmd_group_nav'), label: tx('cmd_journey'), keys: '', run: () => jumpTo('#journey') },
      { id: 'skills', group: tx('cmd_group_nav'), label: tx('cmd_skills'), keys: '', run: () => jumpTo('#skills') },
      { id: 'certs', group: tx('cmd_group_nav'), label: tx('cmd_certs'), keys: '', run: () => jumpTo('#certs') },
      { id: 'activity', group: tx('cmd_group_nav'), label: tx('cmd_activity'), keys: '', run: () => jumpTo('#activity') },
      { id: 'contact', group: tx('cmd_group_nav'), label: tx('cmd_contact'), keys: '', run: () => jumpTo('#contact') },
      { id: 'linkedin', group: tx('cmd_group_act'), label: tx('cmd_linkedin'), keys: '', run: () => window.open(CFG.linkedin, '_blank', 'noopener,noreferrer') },
      { id: 'github', group: tx('cmd_group_act'), label: tx('cmd_github'), keys: '', run: () => window.open(`https://github.com/${CFG.user}`, '_blank', 'noopener,noreferrer') }
    ];
    if (cvBtn && !cvBtn.hidden) {
      items.splice(4, 0, {
        id: 'cv',
        group: tx('cmd_group_act'),
        label: tx('cmd_cv'),
        keys: '',
        run: () => window.open(CFG.cvPath, '_blank', 'noopener,noreferrer')
      });
    }
    return items;
  }

  function searchCommands(query) {
    const q = String(query || '').trim().toLowerCase();
    const all = getCommands();
    return q
      ? all.filter((item) => `${item.label} ${item.group} ${item.id}`.toLowerCase().includes(q))
      : all;
  }

  function runCommand(item) {
    if (item && typeof item.run === 'function') item.run();
  }

  function renderCommands() {
    if (!cmdList || !cmdInput) return;
    currentItems = searchCommands(cmdInput.value);

    if (activeIdx >= currentItems.length) activeIdx = 0;
    cmdList.textContent = '';

    if (!currentItems.length) {
      const empty = document.createElement('li');
      empty.className = 'cmd-empty';
      empty.textContent = tx('cmd_empty');
      cmdList.appendChild(empty);
      cmdInput.removeAttribute('aria-activedescendant');
      return;
    }

    currentItems.forEach((item, idx) => {
      const li = document.createElement('li');
      li.id = `cmd-opt-${item.id}`;
      li.className = 'cmd-item' + (idx === activeIdx ? ' is-active' : '');
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(idx === activeIdx));

      const left = document.createElement('span');
      left.className = 'cmd-item-main';
      const lbl = document.createElement('span');
      lbl.className = 'cmd-item-label';
      lbl.textContent = item.label;
      const grp = document.createElement('span');
      grp.className = 'cmd-item-group';
      grp.textContent = item.group;
      left.append(lbl, grp);
      li.appendChild(left);

      if (item.keys) {
        const kbd = document.createElement('kbd');
        kbd.textContent = item.keys;
        li.appendChild(kbd);
      }

      li.addEventListener('pointerenter', () => {
        if (activeIdx !== idx) {
          activeIdx = idx;
          syncActiveCommand();
        }
      });
      li.addEventListener('click', () => executeCommand(idx));
      cmdList.appendChild(li);
    });

    syncActiveCommand();
  }

  function syncActiveCommand() {
    if (!cmdList || !cmdInput) return;
    const nodes = cmdList.querySelectorAll('.cmd-item');
    nodes.forEach((node, idx) => {
      const active = idx === activeIdx;
      node.classList.toggle('is-active', active);
      node.setAttribute('aria-selected', String(active));
      if (active) {
        cmdInput.setAttribute('aria-activedescendant', node.id);
        node.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  function executeCommand(idx) {
    const item = currentItems[idx];
    if (!item || !cmdDialog) return;
    cmdDialog.close();
    window.setTimeout(() => item.run(), 20);
  }

  function openCmdPalette() {
    if (!cmdDialog) return;
    syncExtraLabels();
    if (helpDialog && helpDialog.open) helpDialog.close();
    if (cmdDialog.open) return;
    cmdInput.value = '';
    activeIdx = 0;
    renderCommands();
    if (typeof cmdDialog.showModal === 'function') cmdDialog.showModal();
    else cmdDialog.setAttribute('open', '');
    cmdInput.focus();
  }

  function renderHelpShortcuts() {
    if (!helpList) return;
    const rows = [
      ['Ctrl / ⌘ + K', tx('sc_cmd')],
      ['T', tx('sc_theme')],
      ['L', tx('sc_lang')],
      ['C', tx('sc_copy')],
      ['V', tx('sc_vr')],
      ['?', tx('sc_help')],
      ['Esc', tx('sc_esc')]
    ];
    helpList.textContent = '';
    rows.forEach(([keys, desc]) => {
      const li = document.createElement('li');
      const k = document.createElement('kbd');
      k.textContent = keys;
      const span = document.createElement('span');
      span.textContent = desc;
      li.append(k, span);
      helpList.appendChild(li);
    });
  }

  function openHelpDialog() {
    if (!helpDialog) return;
    syncExtraLabels();
    if (cmdDialog && cmdDialog.open) cmdDialog.close();
    if (helpDialog.open) return;
    renderHelpShortcuts();
    if (typeof helpDialog.showModal === 'function') helpDialog.showModal();
    else helpDialog.setAttribute('open', '');
    const h = $('#helpTitle');
    if (h) h.focus();
  }

  function syncExtraLabels() {
    if (cmdBtn) cmdBtn.setAttribute('aria-label', tx('cmd_btn_aria'));
    if (helpBtn) helpBtn.setAttribute('aria-label', tx('help_btn_aria'));
    const cmdEyebrow = $('#cmdEyebrow');
    const cmdTitle = $('#cmdHeading');
    const cmdHint = $('#cmdHint');
    if (cmdEyebrow) cmdEyebrow.textContent = tx('cmd_eyebrow');
    if (cmdTitle) cmdTitle.textContent = tx('cmd_title');
    if (cmdInput) cmdInput.setAttribute('placeholder', tx('cmd_ph'));
    if (cmdHint) cmdHint.textContent = tx('cmd_hint');
    const helpEyebrow = $('#helpEyebrow');
    const helpTitle = $('#helpTitle');
    const helpSub = $('#helpSub');
    if (helpEyebrow) helpEyebrow.textContent = tx('help_eyebrow');
    if (helpTitle) helpTitle.textContent = tx('help_title');
    if (helpSub) helpSub.textContent = tx('help_sub');
  }

  // Eventos de paleta de comandos
  if (cmdBtn) cmdBtn.addEventListener('click', openCmdPalette);
  if (helpBtn) helpBtn.addEventListener('click', openHelpDialog);

  if (cmdInput) {
    cmdInput.addEventListener('input', () => {
      activeIdx = 0;
      renderCommands();
    });
    cmdInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentItems.length) {
          activeIdx = (activeIdx + 1) % currentItems.length;
          syncActiveCommand();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentItems.length) {
          activeIdx = (activeIdx - 1 + currentItems.length) % currentItems.length;
          syncActiveCommand();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentItems.length) executeCommand(activeIdx);
      }
    });
  }

  // Atajos globales seguros
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdDialog && cmdDialog.open) cmdDialog.close();
      else openCmdPalette();
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey || isTypingTarget(e.target) || anyDialogOpen()) return;
    if (e.key === '?') {
      e.preventDefault();
      openHelpDialog();
    } else if (e.key.toLowerCase() === 't') {
      api.toggleTheme();
    } else if (e.key.toLowerCase() === 'l') {
      api.setLang(state.lang === 'es' ? 'en' : 'es');
    } else if (e.key.toLowerCase() === 'c') {
      api.copyEmail();
    } else if (e.key.toLowerCase() === 'v') {
      api.openVitalRisk();
    }
  });

  // Spotlight sutil de escritorio (solo puntero fino, >=768px, sin reduced-motion, sobre el bucle rAF compartido)
  function initDesktopSpotlight() {
    const spot = $('#cursorSpotlight');
    if (!spot || !motion.env.fine || motion.env.reduced || window.innerWidth < 768) return;

    let txPos = -400, tyPos = -400;
    let cxPos = -400, cyPos = -400;
    let active = false;

    const step = () => {
      if (!motion.env.fine || motion.env.reduced || window.innerWidth < 768) {
        spot.classList.remove('is-on');
        return false;
      }
      cxPos += (txPos - cxPos) * 0.16;
      cyPos += (tyPos - cyPos) * 0.16;
      spot.style.transform = `translate3d(${(cxPos - 240).toFixed(1)}px, ${(cyPos - 240).toFixed(1)}px, 0)`;
      if (!active && Math.hypot(txPos - cxPos, tyPos - cyPos) < 1) return false;
      if (Math.hypot(txPos - cxPos, tyPos - cyPos) < 0.4) return false;
      return true;
    };

    window.addEventListener('pointermove', (e) => {
      if (!motion.env.fine || motion.env.reduced || window.innerWidth < 768) return;
      txPos = e.clientX;
      tyPos = e.clientY;
      if (!active) {
        cxPos = txPos;
        cyPos = tyPos;
        active = true;
        spot.classList.add('is-on');
      }
      motion.addTask(step);
    }, { passive: true });

    document.addEventListener('pointerleave', () => {
      active = false;
      spot.classList.remove('is-on');
    }, { passive: true });
  }

  syncExtraLabels();
  initDesktopSpotlight();

  return {
    syncExtraLabels,
    openCmdPalette,
    openHelpDialog,
    searchCommands,
    runCommand,
    getLabel: tx
  };
}
