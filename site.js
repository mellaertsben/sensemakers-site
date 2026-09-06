/* Sensemakers — site.js
   ------------------------------------------------------------------
   CONFIG: the only two lines you should ever need to touch.
   - BOOKING_URL: paste a Calendly / cal.com / Google booking link and
     every "Book a call" button switches from email to that page.
     Leave it empty ("") to keep the buttons on email.
   - CONTACT_EMAIL: the address behind the email links.
   ------------------------------------------------------------------ */
var BOOKING_URL = "";
var CONTACT_EMAIL = "hello@sensemakers.be";

(function () {
  document.documentElement.classList.add('js');

  // Book-a-call buttons: use the booking page if one is configured
  function wireBooking() {
    var links = document.querySelectorAll('.js-book');
    for (var i = 0; i < links.length; i++) {
      if (BOOKING_URL) {
        links[i].href = BOOKING_URL;
        links[i].target = '_blank';
        links[i].rel = 'noopener';
      } else if (links[i].href.indexOf('mailto:') === 0) {
        var q = links[i].href.indexOf('?');
        links[i].href = 'mailto:' + CONTACT_EMAIL + (q === -1 ? '' : links[i].href.slice(q));
      }
    }
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
    var items = panel.querySelectorAll('a');
    for (var i = 0; i < items.length; i++) {
      items[i].addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        panel.classList.remove('open');
      });
    }
  }

  // Gentle reveal on scroll (disabled automatically when the user prefers reduced motion)
  function reveal() {
    var sel = '.section-head, .card, .step, .muscle, .stages, .problem, .stat, .value, .format, .formats-mini > div, .founder > div, .contact-grid > div';
    var targets = Array.prototype.slice.call(document.querySelectorAll(sel));
    if (!targets.length) return;
    for (var i = 0; i < targets.length; i++) {
      targets[i].classList.add('reveal');
      var parent = targets[i].parentNode;
      if (parent && parent.children.length > 1 && parent.children.length <= 8) {
        var idx = Array.prototype.indexOf.call(parent.children, targets[i]);
        targets[i].style.setProperty('--stagger', (idx * 0.07) + 's');
      }
    }
    if (!('IntersectionObserver' in window)) {
      for (var j = 0; j < targets.length; j++) targets[j].classList.add('in');
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  // Stage tabs ("Start where it hurts")
  function wireStages() {
    var root = document.querySelector('[data-stages]');
    if (!root) return;
    var tabs = Array.prototype.slice.call(root.querySelectorAll('.stage-tab'));
    var panels = Array.prototype.slice.call(root.querySelectorAll('.stage-panel'));
    function select(i) {
      tabs.forEach(function (t, j) { t.setAttribute('aria-selected', j === i ? 'true' : 'false'); t.tabIndex = j === i ? 0 : -1; });
      panels.forEach(function (p, j) { p.hidden = j !== i; });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var n = i;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + tabs.length) % tabs.length;
        else return;
        e.preventDefault(); select(n); tabs[n].focus();
      });
    });
    select(0);
  }

  // Count-up numbers in the stats
  function counters() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
    if (!els.length) return;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

  // Compounding curve: draw the lines when the figure scrolls into view
  function curve() {
    var fig = document.querySelector('[data-curve]');
    if (!fig) return;
    var lines = fig.querySelectorAll('.line');
    for (var i = 0; i < lines.length; i++) {
      try { lines[i].style.setProperty('--len', Math.ceil(lines[i].getTotalLength()) + 2); } catch (e) {}
    }
    if (!('IntersectionObserver' in window)) { fig.classList.add('drawn'); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { fig.classList.add('drawn'); io.disconnect(); } });
    }, { threshold: 0.35 });
    io.observe(fig);
  }

  // Footer year
  function year() {
    var y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function init() { wireBooking(); wireMenu(); wireStages(); reveal(); counters(); curve(); year(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
