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
        links[i].href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent('Sensemakers — let’s talk');
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
    var sel = '.section-head, .card, .step, .muscle, .artifact, .why-row, .stat, .test, .founder > div, .contact-grid > div';
    var targets = Array.prototype.slice.call(document.querySelectorAll(sel));
    if (!targets.length) return;
    for (var i = 0; i < targets.length; i++) targets[i].classList.add('reveal');
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

  // Footer year
  function year() {
    var y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function init() { wireBooking(); wireMenu(); reveal(); year(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
