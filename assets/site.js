/* ============================================================================
   adhokshaj.dev — shared behaviour
   No framework, no build step. Everything here is progressive: if this file
   never loads, the site is still readable and every link still works.
   ========================================================================= */
(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------- theme ---
     The <head> of every page runs a tiny blocking script that reads the
     stored preference and sets data-theme BEFORE first paint. If this ran
     here instead, every cold start would flash dark at a light-mode visitor.
     This block only handles changes after boot. */
  const THEME_KEY = 'aw.theme';
  const order = ['system', 'light', 'dark'];

  function resolved(pref) {
    return pref === 'system'
      ? (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
      : pref;
  }

  function applyTheme(pref, announce) {
    const t = resolved(pref);
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem(THEME_KEY, pref); } catch {}
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = t === 'light' ? '#FAFAFB' : '#08080A';
    $$('[data-theme-btn]').forEach(b => {
      b.setAttribute('aria-label', `Theme: ${pref}. Click to change.`);
      b.dataset.pref = pref;
    });
    if (announce) toast(`${pref[0].toUpperCase()}${pref.slice(1)} theme`, 'sun');
  }

  function currentPref() {
    try { return localStorage.getItem(THEME_KEY) || 'system'; } catch { return 'system'; }
  }

  function cycleTheme() {
    const next = order[(order.indexOf(currentPref()) + 1) % order.length];
    applyTheme(next, true);
  }

  applyTheme(currentPref(), false);
  // Follow the OS live, but only while the preference is still "system".
  matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
    if (currentPref() === 'system') applyTheme('system', false);
  });
  $$('[data-theme-btn]').forEach(b => b.addEventListener('click', cycleTheme));

  /* ------------------------------------------------------------- toast --- */
  let toastEl, toastTimer;
  const ICONS = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    sun:   '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    link:  '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>'
  };

  function toast(msg, icon = 'check') {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML =
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
            stroke-linecap="round" stroke-linejoin="round">${ICONS[icon] || ICONS.check}</svg><span></span>`;
    toastEl.querySelector('span').textContent = msg;
    requestAnimationFrame(() => toastEl.classList.add('on'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('on'), 2200);
  }

  /* ------------------------------------------------------------ reveals --- */
  const reveal = $$('.rise');
  if (reveal.length) {
    if (reduced || !('IntersectionObserver' in window)) {
      reveal.forEach(el => el.classList.add('in'));
    } else {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          e.target.classList.add('in');
          obs.unobserve(e.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      reveal.forEach(el => io.observe(el));
    }
  }

  /* ------------------------------------------------- nav: stuck + progress */
  const nav = $('.nav');
  const bar = $('.progress');
  let ticking = false;

  function onScroll() {
    const y = scrollY;
    if (nav) nav.classList.toggle('stuck', y > 8);
    if (bar) {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 40 ? Math.min(y / max, 1) : 0})`;
    }
    ticking = false;
  }
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ------------------------------------------------------- sliding pill --- */
  const tabs = $('.tabs');
  if (tabs) {
    const pill = document.createElement('span');
    pill.className = 'tab-pill';
    tabs.prepend(pill);
    const move = (el, animate) => {
      if (!el) { pill.classList.remove('on'); return; }
      if (!animate) pill.style.transition = 'none';
      pill.style.width = `${el.offsetWidth}px`;
      pill.style.transform = `translateX(${el.offsetLeft}px)`;
      pill.classList.add('on');
      if (!animate) requestAnimationFrame(() => { pill.style.transition = ''; });
    };
    const active = () => $('[aria-current="page"]', tabs);
    requestAnimationFrame(() => move(active(), false));
    tabs.addEventListener('pointerover', e => {
      const a = e.target.closest('a'); if (a) move(a, true);
    });
    tabs.addEventListener('pointerleave', () => move(active(), true));
    addEventListener('resize', () => move(active(), false));
  }

  /* -------------------------------------------------------- mobile menu --- */
  const sheet = $('.sheet'), menuBtn = $('[data-menu]');
  if (sheet && menuBtn) {
    const setMenu = open => {
      sheet.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    };
    menuBtn.addEventListener('click', () => setMenu(!sheet.classList.contains('open')));
    sheet.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
    addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  }

  /* ------------------------------------------------------ card spotlight --- */
  if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced) {
    document.addEventListener('pointermove', e => {
      const card = e.target.closest('.card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  /* --------------------------------------------------------- count-ups --- */
  const nums = $$('[data-count]');
  if (nums.length && !reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        obs.unobserve(e.target);
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const dur = 1100, t0 = performance.now();
        const tick = now => {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Number.isInteger(target)
            ? Math.round(target * eased).toString()
            : (target * eased).toFixed(1);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    nums.forEach(n => io.observe(n));
  } else {
    nums.forEach(n => { n.textContent = n.dataset.count; });
  }

  /* ------------------------------------------------------- copy to clip --- */
  $$('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        toast('Copied to clipboard');
      } catch {
        // Clipboard API needs a secure context; fall back to mailto.
        location.href = `mailto:${text}`;
      }
    });
  });

  /* ------------------------------------------------------------- filter ---
     Work archive. The chosen filter is written to the URL hash so a filtered
     view is a shareable link, and a reload keeps what you were looking at. */
  const chips = $$('[data-filter]');
  if (chips.length) {
    const cards = $$('[data-card]');
    const countEl = $('[data-result-count]');

    const setFilter = (key, push) => {
      chips.forEach(c => c.setAttribute('aria-pressed', String(c.dataset.filter === key)));
      let shown = 0;
      cards.forEach(card => {
        const match = key === 'all' || (card.dataset.tags || '').split(' ').includes(key);
        card.classList.toggle('hide', !match);
        if (match) { shown++; card.style.animationDelay = `${Math.min(shown, 10) * 28}ms`; }
      });
      if (countEl) countEl.textContent = shown;
      if (push) history.replaceState(null, '', key === 'all' ? location.pathname : `#${key}`);
    };

    chips.forEach(c => c.addEventListener('click', () => setFilter(c.dataset.filter, true)));
    const initial = location.hash.slice(1);
    setFilter(chips.some(c => c.dataset.filter === initial) ? initial : 'all', false);
  }

  /* ----------------------------------------------------------- timeline --- */
  const rows = $$('.tl-row');
  if (rows.length) {
    const toggle = row => {
      const open = row.getAttribute('aria-expanded') === 'true';
      rows.forEach(r => r.setAttribute('aria-expanded', 'false'));
      row.setAttribute('aria-expanded', String(!open));
    };
    rows.forEach(row => {
      row.addEventListener('click', e => { if (!e.target.closest('a')) toggle(row); });
      row.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(row); }
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          const i = rows.indexOf(row) + (e.key === 'ArrowDown' ? 1 : -1);
          rows[Math.max(0, Math.min(rows.length - 1, i))].focus();
        }
      });
    });
  }

  /* ------------------------------------------------- lazy live previews ---
     Render's free instance sleeps and cold-starts in roughly 50 seconds. An
     eager iframe would show every visitor a spinner, so the frame is only
     attached on click — and the click pre-warms the host first. */
  $$('[data-preview]').forEach(box => {
    const url = box.dataset.preview;
    const btn = $('[data-preview-load]', box);
    if (!btn) return;
    const warm = () => { fetch(new URL('/health', url).href, { mode: 'no-cors' }).catch(() => {}); };
    btn.addEventListener('pointerenter', warm, { once: true });
    btn.addEventListener('click', () => {
      const body = $('.frame-body', box);
      body.innerHTML = '';
      const f = document.createElement('iframe');
      f.src = url;
      f.loading = 'lazy';
      f.title = box.dataset.previewTitle || 'Live site preview';
      f.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-forms');
      body.appendChild(f);
    });
  });

  /* ---------------------------------------------------- command palette ---
     ⌘K / Ctrl-K. Navigation, outbound links, theme, copy email. Built from
     the DOM so it can't drift out of sync with the nav. */
  const palette = $('.palette'), scrim = $('.scrim');
  if (palette && scrim) {
    const input = $('input', palette);
    const list  = $('ul', palette);
    const ICON = {
      page: '<path d="M4 3h9l7 7v11H4z"/><path d="M13 3v7h7"/>',
      out:  '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
      act:  '<circle cx="12" cy="12" r="9"/><path d="M12 8v8m-4-4h8"/>'
    };

    const items = [
      ...$$('.sheet a, .tabs a').reduce((map, a) => {
        const label = a.childNodes[0].textContent.trim();
        if (!map.has(label)) map.set(label, { label, hint: 'Page', href: a.href, kind: 'page' });
        return map;
      }, new Map()).values(),
      { label: 'Animus — case study', hint: 'Project', href: withBase('projects/animus/'), kind: 'page' },
      { label: 'Shastra — case study', hint: 'Project', href: withBase('projects/shastra/'), kind: 'page' },
      { label: 'The Weekend Conundrum — BookMyShow', hint: 'Case study', href: withBase('projects/weekend-conundrum/'), kind: 'page' },
      { label: 'Zomato — ordering & revenue', hint: 'Case study', href: withBase('projects/zomato/'), kind: 'page' },
      { label: 'YouTube Music — weekly active users', hint: 'Case study', href: withBase('projects/youtube-music/'), kind: 'page' },
      { label: 'Shopsy — user growth', hint: 'Case study', href: withBase('projects/shopsy/'), kind: 'page' },
      { label: 'Beacon.li × Deel — APM assessment', hint: 'Case study', href: withBase('projects/beacon-deel/'), kind: 'page' },
      { label: 'GalaxEye Space — SAR analytics', hint: 'Case study', href: withBase('projects/galaxeye/'), kind: 'page' },
      { label: 'LILA Games — APM take-home', hint: 'Case study', href: withBase('projects/lila-games/'), kind: 'page' },
      { label: 'Download résumé (PDF)', hint: 'File', href: withBase('Adhokshaj-Wategaonkar-Resume.pdf'), kind: 'out' },
      { label: 'LinkedIn', hint: 'External', href: 'https://www.linkedin.com/in/adhokshaj/', kind: 'out' },
      { label: 'X / Twitter', hint: 'External', href: 'https://twitter.com/AdhokshajW', kind: 'out' },
      { label: 'Animus — live site', hint: 'External', href: 'https://adhokshajwategaonkar.github.io/animus-site/', kind: 'out' },
      { label: 'Animus — live app', hint: 'External', href: 'https://animus-jwui.onrender.com', kind: 'out' },
      { label: 'Shastra — live site', hint: 'External', href: 'https://adhokshajwategaonkar.github.io/shastra-site/', kind: 'out' },
      { label: 'Copy email address', hint: 'Action', kind: 'act',
        run: async () => { try { await navigator.clipboard.writeText('adhokshaj.pande@gmail.com'); toast('Copied to clipboard'); } catch { location.href = 'mailto:adhokshaj.pande@gmail.com'; } } },
      { label: 'Toggle theme', hint: 'Action', kind: 'act', run: cycleTheme }
    ];

    let view = items, cursor = 0;

    function withBase(rel) {
      // Every page knows the site root through <body data-root>, which keeps
      // these links correct whether the site is at / or at /repo-name/.
      return (document.body.dataset.root || './') + rel;
    }

    const render = () => {
      if (!view.length) { list.innerHTML = '<li class="empty">No matches</li>'; return; }
      list.innerHTML = view.map((it, i) => `
        <li role="option" data-i="${i}" data-active="${i === cursor}" aria-selected="${i === cursor}">
          <span class="ic"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
            stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICON[it.kind]}</svg></span>
          <span>${it.label}</span>
          <span class="k label">${it.hint}</span>
        </li>`).join('');
    };

    const run = it => {
      close();
      if (!it) return;
      if (it.run) return it.run();
      if (it.kind === 'out') window.open(it.href, '_blank', 'noopener');
      else location.href = it.href;
    };

    const open = () => {
      scrim.classList.add('on'); palette.classList.add('on');
      palette.setAttribute('aria-hidden', 'false');
      input.value = ''; view = items; cursor = 0; render();
      setTimeout(() => input.focus(), 40);
    };
    const close = () => {
      scrim.classList.remove('on'); palette.classList.remove('on');
      palette.setAttribute('aria-hidden', 'true');
    };

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      view = q ? items.filter(i => i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q)) : items;
      cursor = 0; render();
    });

    palette.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); cursor = (cursor + 1) % view.length; render(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); cursor = (cursor - 1 + view.length) % view.length; render(); }
      else if (e.key === 'Enter') { e.preventDefault(); run(view[cursor]); }
      else if (e.key === 'Escape') { e.preventDefault(); close(); }
    });

    list.addEventListener('click', e => {
      const li = e.target.closest('li[data-i]');
      if (li) run(view[+li.dataset.i]);
    });
    list.addEventListener('pointermove', e => {
      const li = e.target.closest('li[data-i]');
      if (li && +li.dataset.i !== cursor) { cursor = +li.dataset.i; render(); }
    });

    scrim.addEventListener('click', close);
    $$('[data-palette]').forEach(b => b.addEventListener('click', open));

    addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); }
      // "/" opens it too, but not while the visitor is typing somewhere else.
      if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        e.preventDefault(); open();
      }
    });
  }

  /* ----------------------------------------------------------- lightbox ---
     Case-study artefacts open full size. Built lazily on first click — there
     is no reason for a page with no figures to carry the markup. */
  const figs = $$('.fig-frame img');
  if (figs.length) {
    let lb;
    const open = img => {
      if (!lb) {
        lb = document.createElement('div');
        lb.className = 'lb';
        lb.setAttribute('role', 'dialog');
        lb.setAttribute('aria-modal', 'true');
        lb.innerHTML = '<button class="lb-close" aria-label="Close">' +
          '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" ' +
          'stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
          '<img alt="" /><p class="lb-cap"></p>';
        document.body.appendChild(lb);
        lb.addEventListener('click', e => { if (!e.target.closest('img')) close(); });
        addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
      }
      $('img', lb).src = img.currentSrc || img.src;
      $('img', lb).alt = img.alt || '';
      $('.lb-cap', lb).textContent = img.dataset.cap || img.alt || '';
      lb.classList.add('on');
      document.body.style.overflow = 'hidden';
    };
    const close = () => { if (lb) lb.classList.remove('on'); document.body.style.overflow = ''; };
    figs.forEach(img => {
      img.addEventListener('click', () => open(img));
      img.setAttribute('tabindex', '0');
      img.addEventListener('keydown', e => { if (e.key === 'Enter') open(img); });
    });
  }

  /* --------------------------------------------------------------- deck ---
     Slide-by-slide viewer for the original case-study decks. Only the first
     two slides are eager; the rest load as you reach them, so a 12-slide deck
     doesn't cost 1.6 MB on first paint. */
  $$('[data-deck]').forEach(deck => {
    const slides = JSON.parse(deck.dataset.deck);
    const base   = deck.dataset.deckBase;
    const stage  = $('.deck-stage', deck);
    const railEl = $('.deck-rail', deck);
    const img    = $('img', stage);
    const prev   = $('[data-deck-prev]', deck);
    const next   = $('[data-deck-next]', deck);
    const cur    = $('[data-deck-cur]', deck);
    const title  = $('.deck-title', deck);
    let i = 0;

    railEl.innerHTML = slides.map((s, n) => `
      <button type="button" aria-label="Slide ${n + 1}: ${s.t}" aria-current="${n === 0}">
        <img src="${base}s${String(n + 1).padStart(2, '0')}.jpg" alt="" loading="${n < 4 ? 'eager' : 'lazy'}" />
      </button>`).join('');
    const thumbs = $$('button', railEl);

    const show = n => {
      i = (n + slides.length) % slides.length;
      img.src = `${base}s${String(i + 1).padStart(2, '0')}.jpg`;
      img.alt = slides[i].t;
      img.dataset.cap = `Slide ${i + 1} of ${slides.length} — ${slides[i].t}`;
      cur.textContent = String(i + 1).padStart(2, '0');
      title.textContent = slides[i].t;
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
      thumbs.forEach((b, n2) => b.setAttribute('aria-current', String(n2 === i)));
      const t = thumbs[i];
      if (t) railEl.scrollTo({ left: t.offsetLeft - railEl.clientWidth / 2 + t.clientWidth / 2, behavior: 'smooth' });
    };

    prev.addEventListener('click', () => show(i - 1));
    next.addEventListener('click', () => show(i + 1));
    railEl.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (b) show(thumbs.indexOf(b));
    });
    // Arrow keys, but only while the deck is actually on screen.
    addEventListener('keydown', e => {
      if (!/^Arrow(Left|Right)$/.test(e.key)) return;
      const r = deck.getBoundingClientRect();
      if (r.bottom < 80 || r.top > innerHeight - 80) return;
      e.preventDefault();
      show(i + (e.key === 'ArrowRight' ? 1 : -1));
    });
    show(0);
  });

  /* ------------------------------------------------------- year stamp --- */
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
