/* Motor de movimiento v3 · un único bucle requestAnimationFrame compartido.
   Respeta prefers-reduced-motion, pointer: fine (sin canvas ni tilt en móvil) y visibilitychange. */

export function createMotionEngine() {
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mqFine = window.matchMedia('(pointer: fine)');

  const env = {
    reduced: mqReduce.matches,
    fine: mqFine.matches,
    hidden: document.hidden
  };

  let rafId = 0;
  const tasks = new Set();

  function tick(now) {
    rafId = 0;
    if (env.hidden || tasks.size === 0) return;
    for (const fn of Array.from(tasks)) {
      const keep = fn(now);
      if (keep === false) tasks.delete(fn);
    }
    if (tasks.size > 0 && !env.hidden) {
      rafId = requestAnimationFrame(tick);
    }
  }

  function schedule() {
    if (!rafId && tasks.size > 0 && !env.hidden) {
      rafId = requestAnimationFrame(tick);
    }
  }

  function addTask(fn) {
    tasks.add(fn);
    schedule();
    return () => tasks.delete(fn);
  }

  document.addEventListener('visibilitychange', () => {
    env.hidden = document.hidden;
    if (env.hidden && rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    } else if (!env.hidden) {
      schedule();
    }
  });

  if (mqReduce.addEventListener) {
    mqReduce.addEventListener('change', (e) => { env.reduced = e.matches; });
    mqFine.addEventListener('change', (e) => { env.fine = e.matches; });
  }

  // ---------- 1. Loader breve (~550ms, no bloquea LCP) ----------
  function runIntroLoader() {
    const el = document.getElementById('introLoader');
    if (!el || env.reduced) return;
    requestAnimationFrame(() => el.classList.add('is-active'));
    window.setTimeout(() => {
      el.classList.add('is-done');
      window.setTimeout(() => el.remove(), 320);
    }, 540);
  }

  // ---------- 2. Canvas de nodos en Hero (SOLO puntero fino, >=768px y sin reduced-motion) ----------
  function initHeroCanvas() {
    const hero = document.getElementById('top');
    const canvas = document.getElementById('heroCanvas');
    if (!hero || !canvas || !env.fine || env.reduced || window.innerWidth < 768) return;

    const boot = () => {
      if (!env.fine || env.reduced || window.innerWidth < 768) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = 0;
      let height = 0;
      let dpr = 1;
      let inView = true;
      let lastDraw = 0;
      const pointer = { x: -999, y: -999, active: false };
      const nodes = [];

      function setupSize() {
        const rect = hero.getBoundingClientRect();
        width = Math.max(1, rect.width);
        height = Math.max(1, rect.height);
        dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const count = Math.min(26, Math.max(16, Math.floor((width * height) / 36000)));
        nodes.length = 0;
        for (let i = 0; i < count; i++) {
          nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.42,
            vy: (Math.random() - 0.5) * 0.34,
            r: 1.6 + Math.random() * 1.8,
            gold: i % 3 === 0
          });
        }
      }

      setupSize();

      let resizeTimer = 0;
      window.addEventListener('resize', () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          if (!env.fine || env.reduced || window.innerWidth < 768) {
            inView = false;
            ctx.clearRect(0, 0, width, height);
            return;
          }
          setupSize();
        }, 180);
      }, { passive: true });

      hero.addEventListener('pointermove', (e) => {
        const rect = hero.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
        pointer.active = true;
      }, { passive: true });

      hero.addEventListener('pointerleave', () => {
        pointer.active = false;
      }, { passive: true });

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          inView = entries[0].isIntersecting;
          if (inView && !env.reduced && env.fine && window.innerWidth >= 768) {
            addTask(drawFrame);
          }
        }, { threshold: 0.02 });
        io.observe(hero);
      }

      const linkDist = 142;
      const linkDistSq = linkDist * linkDist;
      const pointerDist = 158;
      const pointerDistSq = pointerDist * pointerDist;

      function drawFrame(now) {
        if (!inView || env.reduced || !env.fine || window.innerWidth < 768) return false;
        if (now - lastDraw < 32) return true; // ~30 fps suave, cero presión sobre el hilo principal
        lastDraw = now;

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < -10) n.x = width + 10;
          if (n.x > width + 10) n.x = -10;
          if (n.y < -10) n.y = height + 10;
          if (n.y > height + 10) n.y = -10;

          if (pointer.active) {
            const dx = pointer.x - n.x;
            const dy = pointer.y - n.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 24000 && d2 > 64) {
              n.x += dx * 0.005;
              n.y += dy * 0.005;
            }
          }
        }

        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < linkDistSq) {
              const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.22;
              ctx.strokeStyle = a.gold || b.gold
                ? `rgba(225, 193, 125, ${alpha.toFixed(3)})`
                : `rgba(148, 198, 238, ${alpha.toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }

          if (pointer.active) {
            const pdx = a.x - pointer.x;
            const pdy = a.y - pointer.y;
            const pd2 = pdx * pdx + pdy * pdy;
            if (pd2 < pointerDistSq) {
              const alpha = (1 - Math.sqrt(pd2) / pointerDist) * 0.34;
              ctx.strokeStyle = `rgba(230, 200, 133, ${alpha.toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(pointer.x, pointer.y);
              ctx.stroke();
            }
          }

          ctx.fillStyle = a.gold ? 'rgba(230, 200, 133, 0.72)' : 'rgba(176, 214, 245, 0.56)';
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
          ctx.fill();
        }
        return true;
      }

      addTask(drawFrame);
    };

    // Inicia tras la pintura inicial para no competir con LCP ni TBT
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => window.setTimeout(boot, 250), { timeout: 900 });
    } else {
      window.setTimeout(boot, 500);
    }
  }

  // ---------- 3. Scroll compartido: header compacto, progreso fallback y línea de tiempo ----------
  function initScrollMechanics() {
    const header = document.getElementById('siteHeader');
    const progressEl = document.getElementById('scrollProgress');
    const dockProgressEl = document.getElementById('dockProgress');
    const supportsScrollTimeline = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline', 'scroll()');
    const timelineShell = document.getElementById('timelineShell');
    const timelineFill = document.getElementById('timelineFill');

    let dirty = true;

    function updateScroll() {
      if (!dirty) return false;
      dirty = false;

      const y = window.scrollY || 0;
      if (header) header.classList.toggle('is-compact', y > 36);

      if ((progressEl || dockProgressEl) && !supportsScrollTimeline && !env.reduced) {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const ratio = Math.min(1, Math.max(0, y / max));
        const scale = `scaleX(${ratio.toFixed(4)})`;
        if (progressEl) progressEl.style.transform = scale;
        if (dockProgressEl) dockProgressEl.style.transform = scale;
      }

      if (timelineShell && timelineFill) {
        if (env.reduced) {
          timelineFill.style.strokeDashoffset = '0';
          timelineShell.querySelectorAll('.journey-item').forEach((it) => it.classList.add('is-lit'));
        } else {
          const rect = timelineShell.getBoundingClientRect();
          const vh = window.innerHeight || 800;
          const triggerY = vh * 0.68;
          const p = Math.min(1, Math.max(0, (triggerY - rect.top) / Math.max(1, rect.height)));
          timelineFill.style.strokeDashoffset = String((1 - p).toFixed(4));
          timelineShell.querySelectorAll('.journey-item').forEach((it) => {
            const ir = it.getBoundingClientRect();
            it.classList.toggle('is-lit', ir.top < triggerY + 30);
          });
        }
      }

      return false;
    }

    window.addEventListener('scroll', () => {
      dirty = true;
      addTask(updateScroll);
    }, { passive: true });
    window.addEventListener('resize', () => {
      dirty = true;
      addTask(updateScroll);
    }, { passive: true });

    addTask(updateScroll);
  }

  // ---------- 4. Revelado al scroll ----------
  function initReveals() {
    const els = Array.from(document.querySelectorAll('.reveal'));
    if (!els.length) return;
    if (env.reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const vh = window.innerHeight || 800;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.remove('reveal-pending');
        en.target.classList.add('is-visible');
        io.unobserve(en.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

    const tops = els.map((el) => el.getBoundingClientRect().top);
    els.forEach((el, idx) => {
      if (tops[idx] < vh * 0.94) {
        el.classList.add('is-visible');
      } else {
        el.classList.add('reveal-pending');
        io.observe(el);
      }
    });
  }

  // ---------- 5. Count-up suave en el bucle rAF compartido ----------
  function animateNumber(el, target, opts = {}) {
    if (!el || typeof target !== 'number' || Number.isNaN(target)) return;
    const decimals = opts.decimals || 0;
    const prefix = opts.prefix || '';
    const suffix = opts.suffix || '';
    const locale = opts.locale || 'es-CO';
    const duration = opts.duration || 680;

    const fmt = (val) => {
      const num = val.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
      return `${prefix}${num}${suffix}`;
    };

    if (env.reduced) {
      el.textContent = fmt(target);
      return;
    }

    const start = performance.now();
    addTask((now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt(target * eased);
      if (t >= 1) {
        el.textContent = fmt(target);
        return false;
      }
      return true;
    });
  }

  // ---------- 6. Botones magnéticos (solo puntero fino) ----------
  function bindMagnetic(root = document) {
    if (!env.fine || env.reduced) return;
    root.querySelectorAll('.magnetic').forEach((btn) => {
      if (btn.dataset.magBound) return;
      btn.dataset.magBound = '1';
      let tx = 0, ty = 0, cx = 0, cy = 0, hovering = false;

      const step = () => {
        cx += (tx - cx) * 0.22;
        cy += (ty - cy) * 0.22;
        btn.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
        if (!hovering && Math.abs(cx) < 0.08 && Math.abs(cy) < 0.08) {
          btn.style.transform = '';
          return false;
        }
        return true;
      };

      btn.addEventListener('pointermove', (e) => {
        if (!env.fine || env.reduced) return;
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        tx = Math.max(-1, Math.min(1, dx)) * 5.5;
        ty = Math.max(-1, Math.min(1, dy)) * 4;
        hovering = true;
        addTask(step);
      }, { passive: true });

      btn.addEventListener('pointerleave', () => {
        hovering = false;
        tx = 0;
        ty = 0;
        addTask(step);
      }, { passive: true });
    });
  }

  // ---------- 7. Tilt 3D + brillo dorado en tarjetas de proyecto (solo puntero fino) ----------
  function bindCardTilt(container) {
    if (!container || !env.fine || env.reduced) return;
    container.querySelectorAll('.card').forEach((card) => {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = '1';
      let rx = 0, ry = 0, crx = 0, cry = 0, hovering = false;

      const step = () => {
        crx += (rx - crx) * 0.18;
        cry += (ry - cry) * 0.18;
        card.style.transform = `perspective(900px) rotateX(${crx.toFixed(2)}deg) rotateY(${cry.toFixed(2)}deg) translateZ(0)`;
        if (!hovering && Math.abs(crx) < 0.05 && Math.abs(cry) < 0.05) {
          card.style.transform = '';
          return false;
        }
        return true;
      };

      card.addEventListener('pointermove', (e) => {
        if (!env.fine || env.reduced) return;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / Math.max(1, r.width);
        const py = (e.clientY - r.top) / Math.max(1, r.height);
        card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
        card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
        rx = (0.5 - py) * 4.5;
        ry = (px - 0.5) * 5.5;
        hovering = true;
        addTask(step);
      }, { passive: true });

      card.addEventListener('pointerleave', () => {
        hovering = false;
        rx = 0;
        ry = 0;
        addTask(step);
      }, { passive: true });
    });
  }

  // ---------- 8. Animación FLIP al filtrar tarjetas ----------
  function animateFlip(container, mutateDom) {
    if (!container || env.reduced || typeof container.animate !== 'function') {
      mutateDom();
      return;
    }
    const first = new Map();
    container.querySelectorAll('[data-flip-id]').forEach((el) => {
      first.set(el.dataset.flipId, el.getBoundingClientRect());
    });

    mutateDom();

    container.querySelectorAll('[data-flip-id]').forEach((el) => {
      const prev = first.get(el.dataset.flipId);
      const next = el.getBoundingClientRect();
      if (prev) {
        const dx = prev.left - next.left;
        const dy = prev.top - next.top;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          el.animate(
            [
              { transform: `translate3d(${dx}px, ${dy}px, 0)` },
              { transform: 'translate3d(0, 0, 0)' }
            ],
            { duration: 320, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
          );
        }
      } else {
        el.animate(
          [
            { opacity: 0, transform: 'translate3d(0, 12px, 0) scale(0.97)' },
            { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
          ],
          { duration: 280, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
        );
      }
    });
  }

  return {
    env,
    addTask,
    runIntroLoader,
    initHeroCanvas,
    initScrollMechanics,
    initReveals,
    animateNumber,
    bindMagnetic,
    bindCardTilt,
    animateFlip
  };
}
