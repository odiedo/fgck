/* ============================================================
   FGCK MALABA — SHARED JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PAGE LOADER ─────────────────────────────────────────── */
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('out'), 1200);
    });
  }

  /* ── CUSTOM CURSOR ───────────────────────────────────────── */
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    const trackRing = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(trackRing);
    };
    trackRing();
    document.querySelectorAll('a,button,.card,.svc-card,.ev-card,.min-card,.gal-item,.leader-card,.testi-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ── NAVBAR SCROLL ───────────────────────────────────────── */
  const nav = document.querySelector('.site-nav');
  const btt = document.getElementById('btt');
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 50);
    if (btt) btt.classList.toggle('show', y > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── ACTIVE NAV LINK ────────────────────────────────────── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === page || a.getAttribute('href') === './' && page === 'index.html') {
      a.classList.add('active');
    }
  });

  /* ── MOBILE MENU ─────────────────────────────────────────── */
  const hamburger  = document.querySelector('.nav-hamburger');
  const mobileNav  = document.querySelector('.mobile-nav');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }));

  /* ── BACK TO TOP ─────────────────────────────────────────── */
  btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── SCROLL REVEAL ───────────────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || 0;
        setTimeout(() => e.target.classList.add('in'), parseFloat(delay) * 1000);
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    // auto stagger siblings
    const siblings = el.parentElement?.querySelectorAll('.reveal');
    if (siblings && siblings.length > 1 && !el.dataset.delay) {
      Array.from(siblings).forEach((s, idx) => {
        if (!s.dataset.delay) s.dataset.delay = idx * 0.1;
      });
    }
    revealObs.observe(el);
  });

  /* ── COUNTER ANIMATION ───────────────────────────────────── */
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const dur = 2200;
        const step = target / (dur / 16);
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = Math.floor(cur) + suffix;
          if (cur >= target) clearInterval(t);
        }, 16);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

  /* ── PROGRESS BAR ────────────────────────────────────────── */
  const progressObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.progress-fill').forEach(b => b.classList.add('go'));
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.give-card,.give-section').forEach(el => progressObs.observe(el));

  /* ── MODAL HELPERS ───────────────────────────────────────── */
  window.showModal = (id) => document.getElementById(id)?.classList.add('show');
  window.hideModal = (id) => document.getElementById(id)?.classList.remove('show');
  document.querySelectorAll('.overlay').forEach(o => {
    o.addEventListener('click', e => { if (e.target === o) o.classList.remove('show'); });
  });
  document.querySelectorAll('.modal-x').forEach(x => x.addEventListener('click', () => x.closest('.overlay').classList.remove('show')));

  /* ── HERO PARTICLES ──────────────────────────────────────── */
  const pc = document.getElementById('hero-particles');
  if (pc) {
    for (let i = 0; i < 50; i++) {
      const p = document.createElement('span');
      p.className = 'h-particle';
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        left:${Math.random()*100}%;
        width:${size}px; height:${size}px;
        --hd:${Math.random()*9+6}s;
        --hd2:${Math.random()*12}s;
      `;
      pc.appendChild(p);
    }
  }

  /* ── FORM SUBMISSION (demo) ──────────────────────────────── */
  document.querySelectorAll('[data-form-submit]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.dataset.formSubmit;
      showModal(target);
    });
  });

  /* ── SMOOTH HASH LINKS ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const tgt = document.querySelector(a.getAttribute('href'));
      if (tgt) {
        e.preventDefault();
        tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
