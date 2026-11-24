/* Dock de Instrumentos móvil · v3.1.0
   Navegación flotante inferior con píldora deslizante, progreso CSS Scroll-Driven,
   panel de control (bottom sheet) reutilizando extras.js, sincronía con encabezados,
   auto-ocultado en descenso sostenido (>=120px) con reaparición al subir, cambiar de sección o 900ms sin scroll,
   ocultado inteligente de teclado (visualViewport) y accesibilidad completa. */

const DOCK_I18N = {
  es: {
    dock_nav_aria: 'Secciones',
    dock_panel_open: 'Abrir panel de control',
    dock_panel_close: 'Cerrar panel de control',
    sheet_eyebrow: 'Panel de control',
    sheet_search_lbl: 'Buscar sección o acción',
    sheet_lang: 'Idioma',
    sheet_theme: 'Tema',
    theme_light: 'Claro',
    theme_dark: 'Oscuro',
    sec_about_desc: 'Enfoque, principios y cómo trabajo',
    sec_projects_desc: 'Trabajo aplicado y VitalRisk AI',
    sec_journey_desc: 'Investigación, operación y deporte',
    sec_certs_desc: 'Certificados y reconocimientos',
    sec_activity_desc: 'Contribuciones y código público',
    sec_contact_desc: 'Correo directo y formulario',
    meta_spectra: '{n} espectros',
    meta_projects: '{n} proyectos',
    meta_milestones: '{n} etapas',
    meta_certs: '{n} certificados',
    meta_repos: '{n} repos',
    meta_github_fallback: 'En vivo',
    meta_contact: 'Bello, CO'
  },
  en: {
    dock_nav_aria: 'Sections',
    dock_panel_open: 'Open control panel',
    dock_panel_close: 'Close control panel',
    sheet_eyebrow: 'Control panel',
    sheet_search_lbl: 'Search sections or actions',
    sheet_lang: 'Language',
    sheet_theme: 'Theme',
    theme_light: 'Light',
    theme_dark: 'Dark',
    sec_about_desc: 'Focus, principles & work style',
    sec_projects_desc: 'Applied work & VitalRisk AI',
    sec_journey_desc: 'Research, operations & sports',
    sec_certs_desc: 'Certificates & recognitions',
    sec_activity_desc: 'Contributions & public code',
    sec_contact_desc: 'Direct email & message form',
    meta_spectra: '{n} spectra',
    meta_projects: '{n} projects',
    meta_milestones: '{n} milestones',
    meta_certs: '{n} certificates',
    meta_repos: '{n} repos',
    meta_github_fallback: 'Live',
    meta_contact: 'Bello, CO'
  }
};

const SECTIONS = [
  { id: 'about', num: '01', navKey: 'nav_about', descKey: 'sec_about_desc' },
  { id: 'projects', num: '02', navKey: 'nav_projects', descKey: 'sec_projects_desc' },
  { id: 'journey', num: '03', navKey: 'nav_journey', descKey: 'sec_journey_desc' },
  { id: 'certs', num: '04', navKey: 'nav_certs', descKey: 'sec_certs_desc' },
  { id: 'activity', num: '05', navKey: 'nav_activity', descKey: 'sec_activity_desc' },
  { id: 'contact', num: '06', navKey: 'nav_contact', descKey: 'sec_contact_desc' }
];

export function initDock(api) {
  const { CFG, state, motion, t, getEffectiveTheme } = api;
  const $ = (s, r = document) => r.querySelector(s);

  const dock = $('#mobileDock');
  const dockNav = $('#dockNav');
  const dockPill = $('#dockPill');
  const menuBtn = $('#dockMenuBtn');
  const readoutNum = $('#dockReadoutNum');
  const readoutLbl = $('#dockReadoutLbl');
  const backdrop = $('#dockBackdrop');
  const sheet = $('#dockSheet');
  const sheetTitle = $('#dockSheetTitle');
  const sheetClose = $('#dockSheetClose');
  const sheetBody = $('#sheetBody');
  const handleZone = $('#sheetHandleZone');
  const sheetSections = $('#sheetSections');
  const sheetSearch = $('#sheetSearch');
  const sheetCmdList = $('#sheetCmdList');
  const sheetCvBtn = $('#sheetCvBtn');
  const sheetCopyMail = $('#sheetCopyMail');
  const sheetLinkedin = $('#sheetLinkedin');
  const sheetGithub = $('#sheetGithub');

  if (!dock || !dockNav || !sheet || !backdrop || !menuBtn) {
    return {
      setActiveSection: () => {},
      sync: () => {},
      syncCv: () => {},
      syncTheme: () => {}
    };
  }

  const mqDock = window.matchMedia('(max-width: 760px), (pointer: coarse) and (max-width: 1024px)');
  const items = Array.from(dockNav.querySelectorAll('.dock-item'));
  const itemById = new Map(items.map((a) => [a.dataset.sec, a]));

  let activeSec = 'about';
  let sheetOpen = false;
  let lastScrollY = window.scrollY || 0;
  let downAccum = 0;
  let idleRevealTimer = 0;
  let lockVisibleUntil = 0;
  let keyboardOpen = false;
  let sweepTimer = 0;
  let closeTimer = 0;
  let sheetSearchIdx = 0;
  let sheetCmdItems = [];

  const HIDE_DOWN_PX = 120;
  const IDLE_REVEAL_MS = 900;

  function revealDock() {
    downAccum = 0;
    if (!keyboardOpen) dock.classList.remove('is-hidden');
  }

  function scheduleIdleReveal() {
    window.clearTimeout(idleRevealTimer);
    idleRevealTimer = window.setTimeout(() => {
      if (!keyboardOpen) {
        downAccum = 0;
        dock.classList.remove('is-hidden');
      }
    }, IDLE_REVEAL_MS);
  }

  const dt = (k, vars) => {
    let s = (DOCK_I18N[state.lang] && DOCK_I18N[state.lang][k]) || DOCK_I18N.es[k] || k;
    if (vars) {
      Object.keys(vars).forEach((v) => { s = s.replace(`{${v}}`, vars[v]); });
    }
    return s;
  };

  function vibrateShort() {
    if (motion.env.reduced) return;
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try { navigator.vibrate(8); } catch {}
    }
  }

  function isDockActive() {
    return mqDock.matches;
  }

  // ---------- 1. Posicionamiento de la píldora deslizante (solo transform) ----------
  function positionPill(instant = false) {
    if (!dockPill || !isDockActive()) return;
    const activeEl = itemById.get(activeSec) || items[0];
    if (!activeEl) return;

    const x = activeEl.offsetLeft;
    const w = activeEl.offsetWidth;
    if (w <= 0) return;

    if (instant || motion.env.reduced) {
      dockPill.classList.add('is-instant');
    }
    dockPill.style.width = `${w}px`;
    dockPill.style.transform = `translate3d(${x}px, 0, 0)`;
    dockPill.classList.add('is-ready');

    if (instant || motion.env.reduced) {
      requestAnimationFrame(() => dockPill.classList.remove('is-instant'));
    }
  }

  // ---------- 2. Subrayado dorado de 300ms en el encabezado activo ----------
  function sweepSectionHeading(secId) {
    if (motion.env.reduced || !isDockActive()) return;
    const sec = document.getElementById(secId);
    const heading = sec ? sec.querySelector('h2') : null;
    if (!heading) return;

    document.querySelectorAll('section h2.is-section-sweep').forEach((h2) => {
      h2.classList.remove('is-section-sweep');
    });
    window.clearTimeout(sweepTimer);
    // Reinicia la animación limpia sin forzar lectura si no estaba activa
    requestAnimationFrame(() => {
      heading.classList.add('is-section-sweep');
      sweepTimer = window.setTimeout(() => {
        heading.classList.remove('is-section-sweep');
      }, 340);
    });
  }

  // ---------- 3. Cambio de sección activa (sincronía dock + hoja + lectura 320px) ----------
  function updateReadout(secId, animate = true) {
    const meta = SECTIONS.find((s) => s.id === secId) || SECTIONS[0];
    if (readoutNum) readoutNum.textContent = meta.num;
    if (readoutLbl) {
      readoutLbl.textContent = t(meta.navKey);
      if (animate && !motion.env.reduced) {
        readoutLbl.classList.remove('is-fading');
        requestAnimationFrame(() => readoutLbl.classList.add('is-fading'));
      }
    }
  }

  function setActiveSection(secId, opts = {}) {
    if (!itemById.has(secId)) return;
    const changed = secId !== activeSec;
    activeSec = secId;
    dock.dataset.active = secId;

    items.forEach((a) => {
      const isAct = a.dataset.sec === secId;
      a.classList.toggle('is-active', isAct);
      if (isAct) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });

    if (sheetSections) {
      sheetSections.querySelectorAll('.sheet-sec-card').forEach((card) => {
        const isAct = card.dataset.sec === secId;
        card.classList.toggle('is-active', isAct);
        if (isAct) card.setAttribute('aria-current', 'location');
        else card.removeAttribute('aria-current');
      });
    }

    updateReadout(secId, changed);
    positionPill(!changed && !opts.animate);

    if (changed) {
      revealDock();
      if (!opts.silent) {
        sweepSectionHeading(secId);
      }
    }
  }

  // Clic en ítems del dock
  items.forEach((a) => {
    a.addEventListener('click', (e) => {
      const secId = a.dataset.sec;
      const target = document.getElementById(secId);
      if (!target) return;
      e.preventDefault();
      vibrateShort();
      if (sheetOpen) closeSheet({ restoreFocus: false });
      lockVisibleUntil = Date.now() + 1200;
      dock.classList.remove('is-hidden');
      setActiveSection(secId, { animate: true });
      target.scrollIntoView({ behavior: motion.env.reduced ? 'auto' : 'smooth', block: 'start' });
    });
  });

  // ---------- 4. Datos vivos de las 6 tarjetas del Panel de control ----------
  function getLiveMeta(secId) {
    switch (secId) {
      case 'about': {
        const n = state.profile?.workStyle?.spectra?.length || 4;
        return dt('meta_spectra', { n });
      }
      case 'projects': {
        const n = state.projects.length || 9;
        return dt('meta_projects', { n });
      }
      case 'journey': {
        const n = state.profile?.journey?.length || 4;
        return dt('meta_milestones', { n });
      }
      case 'certs': {
        const n = state.certs.length || 19;
        return dt('meta_certs', { n });
      }
      case 'activity':
        return state.reposCount != null
          ? dt('meta_repos', { n: state.reposCount })
          : dt('meta_github_fallback');
      case 'contact':
        return dt('meta_contact');
      default:
        return '';
    }
  }

  function renderSheetSections() {
    if (!sheetSections) return;
    sheetSections.textContent = '';

    SECTIONS.forEach((sec) => {
      const card = document.createElement('a');
      card.className = 'sheet-sec-card' + (sec.id === activeSec ? ' is-active' : '');
      card.href = `#${sec.id}`;
      card.dataset.sec = sec.id;
      if (sec.id === activeSec) card.setAttribute('aria-current', 'location');

      const top = document.createElement('span');
      top.className = 'sheet-sec-top';
      const num = document.createElement('span');
      num.className = 'sheet-sec-num';
      num.setAttribute('aria-hidden', 'true');
      num.textContent = sec.num;
      const badge = document.createElement('span');
      badge.className = 'sheet-sec-meta';
      badge.textContent = getLiveMeta(sec.id);
      top.append(num, badge);

      const title = document.createElement('strong');
      title.className = 'sheet-sec-name';
      title.textContent = t(sec.navKey);

      const desc = document.createElement('span');
      desc.className = 'sheet-sec-desc';
      desc.textContent = dt(sec.descKey);

      card.append(top, title, desc);

      card.addEventListener('click', (e) => {
        e.preventDefault();
        vibrateShort();
        closeSheet({ restoreFocus: false });
        const target = document.getElementById(sec.id);
        lockVisibleUntil = Date.now() + 1200;
        dock.classList.remove('is-hidden');
        setActiveSection(sec.id, { animate: true });
        if (target) {
          target.scrollIntoView({ behavior: motion.env.reduced ? 'auto' : 'smooth', block: 'start' });
        }
      });

      sheetSections.appendChild(card);
    });
  }

  // ---------- 5. Búsqueda de la paleta reutilizando extras.js ----------
  function renderSheetSearch() {
    if (!sheetSearch || !sheetCmdList) return;
    const extras = api.getExtrasApi ? api.getExtrasApi() : null;
    const q = sheetSearch.value.trim();

    if (!q || !extras || typeof extras.searchCommands !== 'function') {
      sheetCmdItems = [];
      sheetCmdList.textContent = '';
      sheetCmdList.hidden = true;
      return;
    }

    sheetCmdItems = extras.searchCommands(q);
    if (sheetSearchIdx >= sheetCmdItems.length) sheetSearchIdx = 0;
    sheetCmdList.textContent = '';
    sheetCmdList.hidden = false;

    if (!sheetCmdItems.length) {
      const empty = document.createElement('li');
      empty.className = 'cmd-empty';
      empty.textContent = extras.getLabel('cmd_empty');
      sheetCmdList.appendChild(empty);
      return;
    }

    sheetCmdItems.forEach((item, idx) => {
      const li = document.createElement('li');
      li.className = 'cmd-item' + (idx === sheetSearchIdx ? ' is-active' : '');
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(idx === sheetSearchIdx));

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

      li.addEventListener('click', () => {
        vibrateShort();
        closeSheet({ restoreFocus: false });
        window.setTimeout(() => extras.runCommand(item), 30);
      });
      sheetCmdList.appendChild(li);
    });
  }

  if (sheetSearch) {
    sheetSearch.addEventListener('input', () => {
      sheetSearchIdx = 0;
      renderSheetSearch();
    });
    sheetSearch.addEventListener('keydown', (e) => {
      if (!sheetCmdItems.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        sheetSearchIdx = (sheetSearchIdx + 1) % sheetCmdItems.length;
        renderSheetSearch();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        sheetSearchIdx = (sheetSearchIdx - 1 + sheetCmdItems.length) % sheetCmdItems.length;
        renderSheetSearch();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = sheetCmdItems[sheetSearchIdx];
        const extras = api.getExtrasApi ? api.getExtrasApi() : null;
        if (item && extras) {
          vibrateShort();
          closeSheet({ restoreFocus: false });
          window.setTimeout(() => extras.runCommand(item), 30);
        }
      }
    });
  }

  // ---------- 6. Apertura, cierre, inert, focus trap y devolución de foco ----------
  const bgLandmarks = [
    document.querySelector('header.top'),
    document.getElementById('main'),
    document.querySelector('footer.foot')
  ].filter(Boolean);

  function setBackgroundInert(on) {
    bgLandmarks.forEach((el) => { el.inert = on; });
  }

  function getSheetFocusable() {
    const sel = 'a[href]:not([hidden]), button:not([disabled]):not([hidden]), input:not([disabled]):not([hidden]), [tabindex]:not([tabindex="-1"]):not([hidden])';
    return Array.from(sheet.querySelectorAll(sel)).filter((el) => {
      if (el.closest('[hidden]')) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 || r.height > 0;
    });
  }

  function openSheet() {
    if (sheetOpen) return;
    window.clearTimeout(closeTimer);
    sheetOpen = true;
    vibrateShort();

    sync();
    if (sheetSearch) {
      sheetSearch.value = '';
      renderSheetSearch();
    }
    if (sheetBody) sheetBody.scrollTop = 0;

    // El dock siempre permanece visible con el panel abierto
    dock.classList.remove('is-hidden', 'is-keyboard');
    dock.classList.add('is-sheet-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', dt('dock_panel_close'));

    setBackgroundInert(true);

    sheet.style.transform = '';
    backdrop.style.opacity = '';
    backdrop.hidden = false;
    sheet.hidden = false;

    if (motion.env.reduced) {
      backdrop.classList.add('is-open');
      sheet.classList.add('is-open');
      if (sheetClose) sheetClose.focus({ preventScroll: true });
    } else {
      requestAnimationFrame(() => {
        backdrop.classList.add('is-open');
        sheet.classList.add('is-open');
        if (sheetClose) sheetClose.focus({ preventScroll: true });
      });
    }
  }

  function closeSheet({ restoreFocus = true } = {}) {
    if (!sheetOpen) return;
    sheetOpen = false;
    window.clearTimeout(closeTimer);

    dock.classList.remove('is-sheet-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', dt('dock_panel_open'));

    sheet.style.transform = '';
    sheet.classList.remove('is-dragging', 'is-open');
    backdrop.style.opacity = '';
    backdrop.classList.remove('is-open');

    setBackgroundInert(false);

    const finalize = () => {
      if (!sheetOpen) {
        sheet.hidden = true;
        backdrop.hidden = true;
      }
      if (restoreFocus && isDockActive()) {
        menuBtn.focus({ preventScroll: true });
      }
    };

    if (motion.env.reduced) {
      finalize();
    } else {
      if (restoreFocus && isDockActive()) {
        menuBtn.focus({ preventScroll: true });
      }
      closeTimer = window.setTimeout(() => {
        if (!sheetOpen) {
          sheet.hidden = true;
          backdrop.hidden = true;
        }
      }, 240);
    }
  }

  menuBtn.addEventListener('click', () => {
    if (sheetOpen) closeSheet({ restoreFocus: true });
    else openSheet();
  });

  if (sheetClose) {
    sheetClose.addEventListener('click', () => {
      vibrateShort();
      closeSheet({ restoreFocus: true });
    });
  }

  backdrop.addEventListener('click', () => {
    closeSheet({ restoreFocus: true });
  });

  // Focus trap + tecla Esc en el panel
  document.addEventListener('keydown', (e) => {
    if (!sheetOpen) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      closeSheet({ restoreFocus: true });
      return;
    }
    if (e.key === 'Tab') {
      const focusables = getSheetFocusable();
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first || !sheet.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || !sheet.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // ---------- 7. Gesto de arrastre hacia abajo para cerrar la hoja ----------
  let dragStartY = 0;
  let dragStartTime = 0;
  let dragCurrentDy = 0;
  let dragging = false;
  let dragPointerId = null;

  function startDrag(e) {
    if (!sheetOpen) return;
    // Permite arrastrar desde el asa, el encabezado, o desde el cuerpo si está arriba del todo
    const onHandle = handleZone && handleZone.contains(e.target);
    const onHead = e.target.closest('.sheet-head') && !e.target.closest('button');
    const onBodyTop = sheetBody && sheetBody.contains(e.target) && sheetBody.scrollTop <= 0 && !e.target.closest('input, button, a');
    if (!onHandle && !onHead && !onBodyTop) return;

    dragging = true;
    dragPointerId = e.pointerId;
    dragStartY = e.clientY;
    dragStartTime = performance.now();
    dragCurrentDy = 0;
    sheet.classList.add('is-dragging');
    try { sheet.setPointerCapture(e.pointerId); } catch {}
  }

  function moveDrag(e) {
    if (!dragging || e.pointerId !== dragPointerId) return;
    const dy = e.clientY - dragStartY;
    if (dy <= 0) {
      dragCurrentDy = 0;
      sheet.style.transform = 'translate3d(0, 0, 0)';
      backdrop.style.opacity = '';
      return;
    }
    dragCurrentDy = dy;
    sheet.style.transform = `translate3d(0, ${dy.toFixed(1)}px, 0)`;
    const h = Math.max(240, sheet.offsetHeight || 400);
    const ratio = Math.max(0.15, 1 - dy / h);
    backdrop.style.opacity = ratio.toFixed(3);
  }

  function endDrag(e) {
    if (!dragging || (e.pointerId !== undefined && e.pointerId !== dragPointerId)) return;
    dragging = false;
    try { sheet.releasePointerCapture(dragPointerId); } catch {}
    dragPointerId = null;
    sheet.classList.remove('is-dragging');

    const dtMs = Math.max(1, performance.now() - dragStartTime);
    const velocity = dragCurrentDy / dtMs;
    if (dragCurrentDy > 72 || (dragCurrentDy > 28 && velocity > 0.45)) {
      vibrateShort();
      closeSheet({ restoreFocus: true });
    } else {
      sheet.style.transform = '';
      backdrop.style.opacity = '';
    }
    dragCurrentDy = 0;
  }

  sheet.addEventListener('pointerdown', startDrag);
  sheet.addEventListener('pointermove', moveDrag);
  sheet.addEventListener('pointerup', endDrag);
  sheet.addEventListener('pointercancel', endDrag);

  // ---------- 8. Controles segmentados (ES/EN, Claro/Oscuro) y acciones ----------
  sheet.querySelectorAll('[data-sheet-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      vibrateShort();
      api.setLang(btn.dataset.sheetLang);
    });
  });

  sheet.querySelectorAll('[data-sheet-theme]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      vibrateShort();
      const targetTheme = btn.dataset.sheetTheme;
      if (getEffectiveTheme() !== targetTheme) {
        api.setTheme(targetTheme, e);
      }
      syncTheme();
    });
  });

  if (sheetCopyMail) {
    sheetCopyMail.addEventListener('click', () => {
      vibrateShort();
      api.copyEmail();
    });
  }

  if (sheetLinkedin) sheetLinkedin.href = CFG.linkedin;
  if (sheetGithub) sheetGithub.href = `https://github.com/${CFG.user}`;

  // ---------- 9. Auto-ocultado en descenso sostenido (~120 px sin cambio de sección) y reaparición ----------
  let scrollDirty = false;
  function updateScrollVisibility() {
    scrollDirty = false;
    if (!isDockActive() || sheetOpen || keyboardOpen) return false;

    const y = window.scrollY || 0;
    const delta = y - lastScrollY;
    lastScrollY = y;

    scheduleIdleReveal();

    if (Date.now() < lockVisibleUntil) {
      downAccum = 0;
      return false;
    }

    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    if (y < 72 || (maxScroll > 0 && y >= maxScroll - 56)) {
      revealDock();
      return false;
    }

    if (delta > 0) {
      downAccum += delta;
      if (downAccum >= HIDE_DOWN_PX && y > 160) {
        dock.classList.add('is-hidden');
      }
    } else if (delta < -4) {
      revealDock();
    }
    return false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollDirty) {
      scrollDirty = true;
      motion.addTask(updateScrollVisibility);
    }
  }, { passive: true });

  // ---------- 10. Ocultado inteligente con teclado abierto (visualViewport + formulario) ----------
  function isPageFormField(el) {
    if (!el || sheet.contains(el)) return false;
    const tag = el.tagName;
    if (tag === 'TEXTAREA') return true;
    if (tag === 'INPUT') {
      const type = (el.getAttribute('type') || 'text').toLowerCase();
      return !['checkbox', 'radio', 'button', 'submit', 'reset', 'range', 'color'].includes(type);
    }
    return Boolean(el.isContentEditable);
  }

  function updateKeyboardState() {
    if (!isDockActive()) {
      keyboardOpen = false;
      dock.classList.remove('is-keyboard');
      return;
    }
    if (sheetOpen) {
      dock.classList.remove('is-keyboard');
      return;
    }

    const vv = window.visualViewport;
    const vvShrunk = Boolean(vv && vv.scale <= 1.05 && (window.innerHeight - vv.height > 120));
    const focusedForm = isPageFormField(document.activeElement);
    keyboardOpen = vvShrunk || focusedForm;
    dock.classList.toggle('is-keyboard', keyboardOpen);
    if (!keyboardOpen) {
      dock.classList.remove('is-hidden');
    }
  }

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', updateKeyboardState, { passive: true });
  }
  document.addEventListener('focusin', updateKeyboardState);
  document.addEventListener('focusout', () => {
    window.setTimeout(updateKeyboardState, 60);
  });

  // Si el viewport pasa a escritorio mientras la hoja está abierta, ciérrala limpiamente
  const onMediaChange = () => {
    if (!isDockActive() && sheetOpen) {
      closeSheet({ restoreFocus: false });
    }
    updateKeyboardState();
    positionPill(true);
  };
  if (mqDock.addEventListener) mqDock.addEventListener('change', onMediaChange);
  window.addEventListener('resize', () => positionPill(true), { passive: true });

  // ---------- 11. Sincronización de textos, idioma, tema y CV ----------
  function syncTheme() {
    const cur = getEffectiveTheme();
    sheet.querySelectorAll('[data-sheet-theme]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.sheetTheme === cur));
    });
  }

  function syncCv(available) {
    if (!sheetCvBtn) return;
    sheetCvBtn.hidden = !available;
    if (available) sheetCvBtn.href = CFG.cvPath;
  }

  function sync() {
    dockNav.setAttribute('aria-label', dt('dock_nav_aria'));
    menuBtn.setAttribute('aria-label', sheetOpen ? dt('dock_panel_close') : dt('dock_panel_open'));

    const eyebrow = $('#sheetEyebrow');
    const searchLbl = $('#sheetSearchLabel');
    const langLbl = $('#sheetLangLabel');
    const themeLbl = $('#sheetThemeLabel');
    const themeLight = $('#sheetThemeLight');
    const themeDark = $('#sheetThemeDark');
    const extras = api.getExtrasApi ? api.getExtrasApi() : null;

    if (eyebrow) eyebrow.textContent = dt('sheet_eyebrow');
    if (searchLbl) searchLbl.textContent = dt('sheet_search_lbl');
    if (sheetSearch && extras) sheetSearch.setAttribute('placeholder', extras.getLabel('cmd_ph'));
    if (langLbl) langLbl.textContent = dt('sheet_lang');
    if (themeLbl) themeLbl.textContent = dt('sheet_theme');
    if (themeLight) themeLight.textContent = dt('theme_light');
    if (themeDark) themeDark.textContent = dt('theme_dark');

    sheet.querySelectorAll('[data-sheet-lang]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.sheetLang === state.lang));
    });

    syncTheme();
    renderSheetSections();
    updateReadout(activeSec, false);
    if (sheetSearch && sheetSearch.value.trim()) renderSheetSearch();
    requestAnimationFrame(() => positionPill(true));
  }

  sync();
  setActiveSection('about', { silent: true, animate: false });

  return {
    setActiveSection,
    sync,
    syncCv,
    syncTheme,
    openSheet,
    closeSheet
  };
}
