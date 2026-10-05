/* Sensemakers — site.js
   ------------------------------------------------------------------
   SETTINGS: the only lines you should need to touch. Fill them in as
   the details arrive. Anything left empty ("") stays hidden on the
   site, so a placeholder never shows.
   ------------------------------------------------------------------ */

// Calendly (or other booking) link. Every "Book a call" button opens it.
// Empty: the buttons open an email instead.
var BOOKING_URL = "";

// The address behind every email link.
var CONTACT_EMAIL = "hello@sensemakers.be";

// Company page on LinkedIn. Filled in: "LinkedIn" appears in the footer.
var LINKEDIN_URL = "";

// Company details, as Belgian law asks for them on a business website.
// Filled in: they appear in the footer of every page and on the privacy page.
var LEGAL = {
  company: "Aventiq BV",                 // registered name with legal form
  office: "Steenweg 204, 3570 Alken",    // registered office
  enterprise: "1021.275.881",            // enterprise number
  rpr: "",         // register court and division as on the deed, e.g. "Antwerpen, afdeling Tongeren" (shown as "RPR ...")
  vat: "BE 1021.275.881"                 // VAT number
};

// Plausible analytics (no cookies). Paste the script link Plausible gives you
// (https://plausible.io/js/pa-....js), or just the domain ("sensemakers.be").
// Empty: no analytics, and the privacy page says so.
var ANALYTICS = "";

(function () {
  document.documentElement.classList.add('js');
  var reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function show(sel, on) { all(sel).forEach(function (el) { el.hidden = !on; }); }

  // Book-a-call buttons: use the booking page if one is configured
  function wireBooking() {
    all('.js-book').forEach(function (a) {
      if (BOOKING_URL) {
        a.href = BOOKING_URL;
        a.target = '_blank';
        a.rel = 'noopener';
      } else if (a.href.indexOf('mailto:') === 0) {
        var q = a.href.indexOf('?');
        a.href = 'mailto:' + CONTACT_EMAIL + (q === -1 ? '' : a.href.slice(q));
      }
    });
    show('[data-when="booking"]', !!BOOKING_URL);
  }

  // LinkedIn link in the footer
  function wireLinkedIn() {
    all('[data-linkedin]').forEach(function (a) {
      if (!LINKEDIN_URL) return;
      a.href = LINKEDIN_URL; a.target = '_blank'; a.rel = 'noopener'; a.hidden = false;
    });
  }

  // Company details: footer line and privacy page
  function wireLegal() {
    var L = LEGAL || {};
    if (!L.company) return;
    var own = /^sensemakers\b/i.test(L.company);
    var parts = [own ? L.company : 'Sensemakers is a trade name of ' + L.company];
    if (L.office) parts.push(L.office);
    if (L.enterprise) parts.push('Enterprise number ' + L.enterprise);
    if (L.rpr) parts.push(/^RPR\b/i.test(L.rpr) ? L.rpr : 'RPR ' + L.rpr);
    if (L.vat) parts.push('VAT ' + L.vat);
    all('[data-legal]').forEach(function (slot) {
      parts.forEach(function (p) {
        var s = document.createElement('span');
        s.textContent = p;
        slot.parentNode.insertBefore(s, slot);
      });
      slot.parentNode.removeChild(slot);
    });
    var who = (own ? 'We are ' + L.company : 'Sensemakers is a trade name of ' + L.company) +
      (L.office ? ', ' + L.office : '') +
      (L.enterprise ? ', enterprise number ' + L.enterprise : '') +
      '. We decide how your data is used.';
    all('[data-legal-who]').forEach(function (el) { el.textContent = who; });
  }

  // Plausible, only when configured; the privacy page follows the setting
  function analytics() {
    var on = !!ANALYTICS;
    show('[data-analytics="on"]', on);
    show('[data-analytics="off"]', !on);
    if (!on) return;
    var s = document.createElement('script');
    s.defer = true;
    if (/^https?:\/\//.test(ANALYTICS)) {
      window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments); };
      window.plausible.init = window.plausible.init || function (i) { window.plausible.o = i || {}; };
      window.plausible.init();
      s.src = ANALYTICS;
    } else {
      s.src = 'https://plausible.io/js/script.js';
      s.setAttribute('data-domain', ANALYTICS);
    }
    document.head.appendChild(s);
  }

  // Mobile menu
  function wireMenu() {
    var toggle = document.querySelector('.nav-toggle');
    var panel = document.getElementById('nav-mobile');
    if (!toggle || !panel) return;
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      panel.classList.toggle('open', !open);
    });
    all('#nav-mobile a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        panel.classList.remove('open');
      });
    });
  }

  // Dropdown menu in the header (hover with intent on desktop, click/keyboard everywhere)
  function wireMenus() {
    var items = all('.has-menu');
    if (!items.length) return;
    var timers = [];
    function open(i) { items.forEach(function (it, j) { var on = j === i; it.classList.toggle('open', on); it.querySelector('.nav-link').setAttribute('aria-expanded', on ? 'true' : 'false'); }); }
    function closeAll() { open(-1); }
    items.forEach(function (it, i) {
      var btn = it.querySelector('.nav-link');
      btn.addEventListener('click', function (e) { e.preventDefault(); it.classList.contains('open') ? closeAll() : open(i); });
      it.addEventListener('mouseenter', function () { clearTimeout(timers[i]); timers[i] = setTimeout(function () { open(i); }, 70); });
      it.addEventListener('mouseleave', function () { clearTimeout(timers[i]); timers[i] = setTimeout(function () { if (it.classList.contains('open')) closeAll(); }, 160); });
      it.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeAll(); btn.focus(); } });
      it.addEventListener('focusout', function (e) { if (!it.contains(e.relatedTarget)) closeAll(); });
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.has-menu')) closeAll(); });
    all('.menu a').forEach(function (a) { a.addEventListener('click', function () { closeAll(); }); });
  }

  // "Read more": open the <details> a link points at (page.html#id opens it)
  function openFromHash() {
    function go() {
      var id = decodeURIComponent((location.hash || '').slice(1));
      if (!id) return;
      var el = document.getElementById(id);
      if (!el) return;
      var d = el.tagName === 'DETAILS' ? el : el.querySelector('details.more');
      if (d) d.open = true;
    }
    go();
    window.addEventListener('hashchange', go);
    all('a[href*="#"]').forEach(function (a) {
      a.addEventListener('click', function () {
        var href = a.getAttribute('href');
        var path = href.split('#')[0];
        if (path && location.pathname.slice(-path.length) !== path) return; // another page
        var el = document.getElementById(href.split('#')[1]);
        var d = el && (el.tagName === 'DETAILS' ? el : el.querySelector('details.more'));
        if (d) d.open = true;
      });
    });
  }

  // Gentle reveal on scroll (off when the visitor prefers reduced motion)
  function reveal() {
    var sel = '.p-stat, .p-item, .oc, .lv, .split-role, .h-head, .h-blocks, .mate, .cta-dark, .section-head, .card, .pcard, .step, .stat, .value, .tile, .fw-steps li, .group, .ex, .fcard, .artifact, .faq > div, .person-card, .contact-card, .hero-wide-in';
    var targets = all(sel);
    if (!targets.length) return;
    targets.forEach(function (t) {
      t.classList.add('reveal');
      var parent = t.parentNode;
      if (parent && parent.children.length > 1 && parent.children.length <= 8) {
        var idx = Array.prototype.indexOf.call(parent.children, t);
        t.style.setProperty('--stagger', (idx * 0.07) + 's');
      }
    });
    if (!('IntersectionObserver' in window)) { targets.forEach(function (t) { t.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }

  // Count-up numbers
  function counters() {
    var els = all('[data-count]');
    if (!els.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var pre = el.getAttribute('data-prefix') || '', suf = el.getAttribute('data-suffix') || '';
      if (reduced) { el.textContent = pre + target + suf; return; }
      var start = null, dur = 900;
      function frame(ts) {
        if (!start) start = ts;
        var p = Math.min(1, (ts - start) / dur), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + Math.round(target * eased) + suf;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  }

  // Homepage hero: the big S turns slowly as the hero scrolls away (off with reduced motion)
  function heroTurn() {
    var s = document.querySelector('.hero-s');
    if (!s || reduced) return;
    var hero = s.parentNode, ticking = false;
    function frame() {
      ticking = false;
      var r = hero.getBoundingClientRect();
      var p = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height)));
      s.style.setProperty('--rot', (p * 55).toFixed(1) + 'deg');
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
    frame();
  }

  // Homepage (Round 12): situation paths, ticker loop, journey that draws with the scroll
  function home() {
    var chips = all('.h-chip');
    if (chips.length) {
      chips.forEach(function (c) {
        c.addEventListener('click', function () {
          chips.forEach(function (x) { var on = x === c; x.classList.toggle('on', on); x.setAttribute('aria-checked', on ? 'true' : 'false'); });
          all('.h-p').forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-path') === c.getAttribute('data-path')); });
        });
      });
    }
    all('.ticker-row').forEach(function (row) {
      if (reduced) return;
      Array.prototype.slice.call(row.children).forEach(function (li) { var c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); row.appendChild(c); });
    });
    var j = document.querySelector('.journey');
    if (j && !reduced && window.matchMedia('(min-width: 861px)').matches) {
      var line = j.querySelector('.journey-line i'), stages = all('.journey .stage'), ticking = false;
      j.classList.add('drawn');
      function frame() {
        ticking = false;
        var r = j.getBoundingClientRect(), vh = window.innerHeight;
        var p = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (r.height * 0.9)));
        line.style.setProperty('--p', p.toFixed(3));
        stages.forEach(function (s, i) { s.classList.toggle('lit', p >= i / (stages.length - 1) - 0.02); });
      }
      window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
      window.addEventListener('resize', frame);
      frame();
    }
  }


  // Round 13: live demo window. Scenes live in a <script type="application/json"> inside .demo.
  // Each scene: { label, u (question), a (answer, may hold <mark>), who (optional name above the answer),
  // f (the flag at the end), ok (true: a green "next step" flag instead of an orange warning) }
  function demos() {
    all('.demo').forEach(function (d) {
      var data = d.querySelector('script[type="application/json"]');
      var body = d.querySelector('.demo-body'), label = d.querySelector('.demo-label'), steps = all('.demo-steps i').filter(function (i) { return d.contains(i); });
      if (!data || !body) return;
      var scenes = JSON.parse(data.textContent), n = 0, timer, visible = false;
      function el(cls, html) { var e = document.createElement('div'); e.className = cls; if (html) e.innerHTML = html; body.appendChild(e); return e; }
      function bubbleA(s) { return (s.who ? '<span class="who">' + s.who + '</span>' : '') + s.a; }
      function still(s) { body.innerHTML = ''; el('msg u', s.u); el('msg a', bubbleA(s)); el('flag' + (s.ok ? ' ok' : ''), s.f); }
      function type(e, html, done) {
        var i = 0;
        (function step() {
          i += 2;
          if (i >= html.length) { e.innerHTML = html; done(); return; }
          if (html.charAt(i - 1) === '<' || html.charAt(i - 2) === '<') { var close = html.indexOf('>', i); if (close > -1) i = close + 1; }
          e.innerHTML = html.slice(0, i).replace(/<[^>]*$/, '') + '<span class="caret"></span>';
          timer = setTimeout(step, 22);
        })();
      }
      function play() {
        clearTimeout(timer);
        var s = scenes[n];
        if (label) label.textContent = s.label || '';
        steps.forEach(function (x, i) { x.classList.toggle('on', i <= n); });
        if (reduced) { still(s); return; }
        if (!visible) { timer = setTimeout(play, 600); return; }
        body.innerHTML = '';
        type(el('msg u'), s.u, function () {
          timer = setTimeout(function () {
            type(el('msg a'), bubbleA(s), function () {
              timer = setTimeout(function () {
                el('flag' + (s.ok ? ' ok' : ''), s.f);
                timer = setTimeout(function () { n = (n + 1) % scenes.length; play(); }, 3400);
              }, 500);
            });
          }, 400);
        });
      }
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0.3 }).observe(d);
      } else { visible = true; }
      if (reduced) {
        steps.forEach(function (x, i) { x.style.cursor = 'pointer'; x.addEventListener('click', function () { n = i; play(); }); });
      }
      play();
    });
  }

  // Round 13: sideways rail with arrows and a progress bar
  function rails() {
    all('.rail').forEach(function (r) {
      var sec = r.closest('section') || document;
      var prev = sec.querySelector('[data-rail="prev"]'), next = sec.querySelector('[data-rail="next"]'), bar = sec.querySelector('.rail-progress i');
      function step() { var c = r.querySelector('.r-card'); return c ? c.getBoundingClientRect().width + 18 : 340; }
      if (prev) prev.addEventListener('click', function () { r.scrollBy({ left: -step(), behavior: reduced ? 'auto' : 'smooth' }); });
      if (next) next.addEventListener('click', function () { r.scrollBy({ left: step(), behavior: reduced ? 'auto' : 'smooth' }); });
      function prog() { if (!bar) return; var m = r.scrollWidth - r.clientWidth; var share = r.clientWidth / r.scrollWidth; bar.style.width = (100 * Math.min(1, share + (1 - share) * (m > 0 ? r.scrollLeft / m : 1))).toFixed(1) + '%'; }
      r.addEventListener('scroll', prog, { passive: true }); window.addEventListener('resize', prog); prog();
    });
  }

  // Round 13: programme modules open on click; phase tabs; marquee loop
  function subpages() {
    all('.mod').forEach(function (m) {
      m.setAttribute('tabindex', '0'); m.setAttribute('role', 'button');
      function t() { m.classList.toggle('open'); m.setAttribute('aria-expanded', m.classList.contains('open') ? 'true' : 'false'); }
      m.setAttribute('aria-expanded', m.classList.contains('open') ? 'true' : 'false');
      m.addEventListener('click', t);
      m.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t(); } });
    });
    all('.tl-tabs').forEach(function (tabs) {
      var wrap = tabs.parentNode, btns = all('.tl-tab').filter(function (b) { return tabs.contains(b); });
      btns.forEach(function (b) {
        b.addEventListener('click', function () {
          btns.forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-selected', on ? 'true' : 'false'); });
          all('.tl-pane').filter(function (p) { return wrap.contains(p); }).forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-p') === b.getAttribute('data-p')); });
        });
      });
    });
    all('.marquee ul').forEach(function (ul) {
      Array.prototype.slice.call(ul.children).forEach(function (li) { var c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); ul.appendChild(c); });
    });
  }

  // Footer year
  function year() {
    var y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function init() { wireBooking(); wireLinkedIn(); wireLegal(); analytics(); wireMenu(); wireMenus(); openFromHash(); reveal(); counters(); heroTurn(); home(); demos(); rails(); subpages(); year(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
