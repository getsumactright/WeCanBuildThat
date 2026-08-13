/* ═══════════════════════════════════════════════════════════════════════════
   We Can Build That — shared behaviour
   Sticky-nav border, mobile menu, scroll reveals, footer year.
   Every page loads this; page-specific logic goes in the page itself.
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  var nav = document.getElementById('nav');
  if (nav){
    var onScroll = function(){ nav.classList.toggle('stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  var toggle = document.getElementById('navToggle');
  var menu   = document.getElementById('menu');
  if (toggle && menu){
    toggle.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    /* Close on navigation so in-page anchors don't leave the menu covering
       the content the user just jumped to. */
    menu.addEventListener('click', function(e){
      if (e.target.tagName === 'A'){
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
        toggle.setAttribute('aria-label','Open menu');
      }
    });
  }

  var items = document.querySelectorAll('.rv');
  if (!items.length) return;
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    Array.prototype.forEach.call(items, function(el){ el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, {rootMargin:'0px 0px -8% 0px', threshold:.05});
  Array.prototype.forEach.call(items, function(el){ io.observe(el); });
})();
