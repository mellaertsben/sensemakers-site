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
  var reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

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
    var sel = '.section-head, .card, .step, .thread, .layer, .format, .stat, .value, .layers > div, .founder > div, .contact-grid > div, .journey';
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

  // Dropdown menus in the header (hover with intent on desktop, click/keyboard everywhere)
  function wireMenus() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.has-menu'));
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
    // menu links that pre-select a stage in "Start where it hurts"
    var stageLinks = document.querySelectorAll('a[data-stage]');
    for (var k = 0; k < stageLinks.length; k++) {
      stageLinks[k].addEventListener('click', function (e) {
        var root = document.querySelector('[data-journey]');
        if (!root || !root.selectStage) return; // other page: let the link navigate
        e.preventDefault(); closeAll();
        root.selectStage(parseInt(this.getAttribute('data-stage'), 10) - 1);
        root.scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
    }
  }

  // "Start where it hurts": four stops on a rising path, one panel at a time.
  // The rider (green dot) travels along the path to the chosen stop.
  function wireJourney() {
    var root = document.querySelector('[data-journey]');
    if (!root) return;
    var stops = Array.prototype.slice.call(root.querySelectorAll('.stop'));
    var panels = Array.prototype.slice.call(root.querySelectorAll('.journey-panel'));
    var track = root.querySelector('.journey-line .track');
    var fill = root.querySelector('.journey-line .fill');
    var rider = root.querySelector('.journey-line .rider');
    var STOP_X = [0, 250, 500, 750];  // viewBox x of each stop (see styles.css --dy for the y)
    var len = 0, at = [];             // path length, and the length along the path at each stop
    var pos = 0, anim = null;

    function pointAtX(x) {            // binary search along the path for a given x
      var lo = 0, hi = len, p;
      for (var i = 0; i < 24; i++) {
        var mid = (lo + hi) / 2; p = track.getPointAtLength(mid);
        if (p.x < x) lo = mid; else hi = mid;
      }
      return (lo + hi) / 2;
    }
    function measure() {
      try {
        len = track.getTotalLength();
        at = STOP_X.map(pointAtX);
        fill.style.strokeDasharray = len;
      } catch (e) { len = 0; }
    }
    function place(s) {
      if (!len) return;
      var p = track.getPointAtLength(s);
      rider.setAttribute('cx', p.x); rider.setAttribute('cy', p.y);
      fill.style.strokeDashoffset = len - s;
    }
    function travel(to) {
      if (!len) return;
      if (anim) cancelAnimationFrame(anim);
      if (reduced) { pos = to; place(pos); return; }
      var from = pos, start = null, dur = 520 + Math.abs(to - from) / len * 380;
      function frame(ts) {
        if (!start) start = ts;
        var t = Math.min(1, (ts - start) / dur), e = 1 - Math.pow(1 - t, 3);
        pos = from + (to - from) * e; place(pos);
        if (t < 1) anim = requestAnimationFrame(frame);
      }
      anim = requestAnimationFrame(frame);
    }
    function select(i, silent) {
      stops.forEach(function (s, j) {
        s.setAttribute('aria-selected', j === i ? 'true' : 'false');
        s.tabIndex = j === i ? 0 : -1;
        s.classList.toggle('past', j < i);
      });
      panels.forEach(function (p, j) {
        var on = j === i;
        if (on && p.hidden) {              // re-trigger the bubble animation
          var voices = p.querySelectorAll('.voice');
          for (var v = 0; v < voices.length; v++) { voices[v].style.animation = 'none'; void voices[v].offsetWidth; voices[v].style.animation = ''; }
        }
        p.hidden = !on;
      });
      if (!silent) travel(at[i] || 0);
    }
    stops.forEach(function (s, i) {
      s.addEventListener('click', function () { select(i); });
      s.addEventListener('keydown', function (e) {
        var n = i;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % stops.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + stops.length) % stops.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = stops.length - 1;
        else return;
        e.preventDefault(); select(n); stops[n].focus();
      });
    });
    root.selectStage = function (i) { select(i); };
    measure();
    select(0, true); pos = at[0] || 0; place(pos);
    window.addEventListener('resize', function () { var i = at.indexOf(pos); measure(); pos = i >= 0 ? at[i] : pos; place(pos); });
  }

  // Threads (what we do): open the card a link points at, and animate the drawer
  function wireThreads() {
    var threads = Array.prototype.slice.call(document.querySelectorAll('details.thread'));
    if (!threads.length) return;
    function openFromHash() {
      var id = (location.hash || '').slice(1);
      if (!id) return;
      var el = document.getElementById(id);
      if (el && el.classList.contains('thread')) el.open = true;
    }
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    // in-page links to a thread should open it even if the hash doesn't change
    var links = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        var el = document.getElementById(this.getAttribute('href').slice(1));
        if (el && el.classList.contains('thread')) el.open = true;
      });
    }
  }

  // Count-up numbers in the stats
  function counters() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
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

  // Compounding curve: draw the lines when the figure scrolls into view,
  // link the markers to the principles, and let the cursor probe both lines.
  function curve() {
    var fig = document.querySelector('[data-curve]');
    if (!fig) return;
    var svg = fig.querySelector('svg');
    var lines = fig.querySelectorAll('.line');
    for (var i = 0; i < lines.length; i++) {
      try { lines[i].style.setProperty('--len', Math.ceil(lines[i].getTotalLength()) + 2); } catch (e) {}
    }
    if (!('IntersectionObserver' in window)) { fig.classList.add('drawn'); }
    else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { fig.classList.add('drawn'); io.disconnect(); } });
      }, { threshold: 0.35 });
      io.observe(fig);
    }

    // markers <-> legend
    var marks = Array.prototype.slice.call(fig.querySelectorAll('.mark'));
    var legend = Array.prototype.slice.call(fig.querySelectorAll('.curve-legend [data-k]'));
    function light(k, on) {
      marks.forEach(function (m) { m.classList.toggle('on', on && m.getAttribute('data-k') === k); });
      legend.forEach(function (l) { l.classList.toggle('on', on && l.getAttribute('data-k') === k); });
    }
    marks.concat(legend).forEach(function (el) {
      var k = el.getAttribute('data-k');
      el.addEventListener('mouseenter', function () { light(k, true); });
      el.addEventListener('mouseleave', function () { light(k, false); });
      el.addEventListener('focus', function () { light(k, true); });
      el.addEventListener('blur', function () { light(k, false); });
      el.addEventListener('click', function () { light(k, !el.classList.contains('on')); });
    });
    // shocks: keyboard users get the note on focus
    var shocks = Array.prototype.slice.call(fig.querySelectorAll('.shock'));
    shocks.forEach(function (s) {
      s.addEventListener('focus', function () { s.classList.add('on'); });
      s.addEventListener('blur', function () { s.classList.remove('on'); });
      s.addEventListener('click', function () { s.classList.toggle('on'); });
    });

    // cursor probe: compare the two lines at any moment in time (pointer devices only)
    var probe = fig.querySelector('.probe');
    var comp = fig.querySelector('.line.comp'), bolt = fig.querySelector('.line.bolt');
    if (!probe || !comp || !bolt || !(window.matchMedia && window.matchMedia('(hover: hover)').matches)) return;
    var guide = probe.querySelector('.guide'), span = probe.querySelector('.span');
    var pc = probe.querySelector('.p-comp'), pb = probe.querySelector('.p-bolt');
    var lens = {}, samples = {};
    function sample(path, key) {           // pre-sample each path so hover stays cheap
      var L = path.getTotalLength(), n = 220, arr = [];
      for (var i = 0; i <= n; i++) { var p = path.getPointAtLength(L * i / n); arr.push([p.x, p.y]); }
      lens[key] = L; samples[key] = arr;
    }
    try { sample(comp, 'c'); sample(bolt, 'b'); } catch (e) { return; }
    function yAt(key, x) {                 // linear interpolation on the samples (both paths are monotonic in x)
      var arr = samples[key], lo = 0, hi = arr.length - 1;
      if (x <= arr[0][0]) return arr[0][1];
      if (x >= arr[hi][0]) return arr[hi][1];
      while (hi - lo > 1) { var mid = (lo + hi) >> 1; if (arr[mid][0] <= x) lo = mid; else hi = mid; }
      var a = arr[lo], b = arr[hi], t = (x - a[0]) / ((b[0] - a[0]) || 1);
      return a[1] + (b[1] - a[1]) * t;
    }
    function toView(evt) {
      var r = svg.getBoundingClientRect();
      // viewBox is 1000x400 with xMidYMid meet: find the rendered box inside the element
      var scale = Math.min(r.width / 1000, r.height / 400);
      var ox = (r.width - 1000 * scale) / 2, oy = (r.height - 400 * scale) / 2;
      return { x: (evt.clientX - r.left - ox) / scale, y: (evt.clientY - r.top - oy) / scale };
    }
    var ptxt = probe.querySelector('.p-txt');
    svg.addEventListener('mousemove', function (evt) {
      if (!fig.classList.contains('drawn')) return;
      if (evt.target.closest && evt.target.closest('.shock, .mark')) { fig.classList.remove('probing'); return; }
      var v = toView(evt);
      if (v.x < 80 || v.x > 960 || v.y < 20 || v.y > 360) { fig.classList.remove('probing'); return; }
      var x = Math.max(80, Math.min(960, v.x));
      var yc = yAt('c', x), yb = yAt('b', x);
      guide.setAttribute('x1', x); guide.setAttribute('x2', x);
      span.setAttribute('x1', x); span.setAttribute('x2', x); span.setAttribute('y1', yc); span.setAttribute('y2', yb);
      pc.setAttribute('cx', x); pc.setAttribute('cy', yc);
      pb.setAttribute('cx', x); pb.setAttribute('cy', yb);
      var left = x > 800;
      ptxt.setAttribute('x', left ? x - 12 : x + 12); ptxt.setAttribute('y', (yc + yb) / 2 + 4);
      ptxt.setAttribute('text-anchor', left ? 'end' : 'start');
      ptxt.style.opacity = (yb - yc) > 26 ? 1 : 0;
      fig.classList.add('probing');
    });
    svg.addEventListener('mouseleave', function () { fig.classList.remove('probing'); });
  }

  // Footer year
  function year() {
    var y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function init() { wireBooking(); wireMenu(); wireMenus(); wireJourney(); wireThreads(); reveal(); counters(); curve(); year(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
