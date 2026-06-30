/* ============================================================
   MOBILE.JS — Phone fit-to-screen (≤768px)
   Does NOT replace the orbit. It keeps the existing desktop
   motion and only:
     (1) feeds a small --radius so the HERO orbit fits the phone
     (2) runs a small-radius orbit loop for SECTION-3 items
         (premium.js hardcodes 420px which we can't reach)
     (3) neutralises the section-2 GSAP y:500 fling
   Loads AFTER script.js + premium.js. Classic script, so it can
   read CATEGORY_DATA / activeCategory by name.
   ============================================================ */
(function () {
  'use strict';

  var MQ = window.matchMedia('(max-width: 768px)');
  if (!MQ.matches) return;

  /* ============================================================
     1. HERO ORBIT — shrink radius to fit the phone
     ============================================================ */
  function fitHeroOrbit() {
    /* Pivot is left-anchored (like desktop). Radius places the in-focus
       product around the centre of the phone. ~46% of width puts it
       nicely centred without clipping the right edge. */
    var vw = window.innerWidth;
    var r = Math.round(vw * 0.46);
    r = Math.max(120, Math.min(r, 200));
    document.documentElement.style.setProperty('--radius', r + 'px');

    /* Shorten the scroll spacer so the orbit rotates over a sensible
       distance on mobile (desktop inline = 800vh, too long for phone). */
    var spacer = document.getElementById('orbitSpacer');
    if (spacer) spacer.style.height = '300vh';
  }

  /* ============================================================
     2. SECTION-03 ORBIT — own small-radius loop
     premium.js's ORBIT_RADIUS=420 is a private const, so we just
     drive the same .og-orbit-item elements ourselves at a small
     radius. premium.js also drives them, so to avoid two writers
     fighting, we set transform with higher-priority inline style
     on each frame AFTER premium.js — same elements, our values win
     because we write last via our own rAF.
     Simplest robust approach: scale the radius by rewriting the
     transform every frame with mobile geometry.
     ============================================================ */
  function initMobileGalleryOrbit() {
    var stage = document.getElementById('ogStage');
    var items = document.querySelectorAll('.og-orbit-item');
    if (!stage || !items.length) return;

    var COUNT = items.length;

    function radius() {
      var w = stage.getBoundingClientRect().width || (window.innerWidth * 0.9);
      /* item is 34vw wide (max 150). Its half-width ≈ 17vw (max 75).
         radius + half-width must stay < w/2 so nothing clips. */
      var itemHalf = Math.min(window.innerWidth * 0.17, 75);
      var maxR = (w / 2) - itemHalf - 4;
      var r = w * 0.30;
      return Math.max(36, Math.min(r, maxR));
    }

    var angle = 0;
    var floatT = 0;
    var offsets = [];
    for (var i = 0; i < COUNT; i++) offsets.push(i * (Math.PI * 2 / COUNT));

    function frame() {
      if (!MQ.matches) return;              // stop if resized to desktop
      var R = radius();
      angle += 0.0032;
      floatT += 0.018;
      items.forEach(function (item, i) {
        var theta = angle + (i * (Math.PI * 2 / COUNT));
        var x = Math.cos(theta) * R;
        var y = Math.sin(theta) * R * 0.5;
        var fy = Math.sin(floatT + offsets[i]) * 6;
        var tilt = Math.sin(theta) * 8;
        /* setProperty with important so we beat premium.js's inline write */
        item.style.setProperty(
          'transform',
          'translate(' + x + 'px,' + (y + fy) + 'px) rotate(' + tilt + 'deg)',
          'important'
        );
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ============================================================
     3. NEUTRALISE section-02 bottle fling (GSAP y:500)
     ============================================================ */
  function tameSection02() {
    try {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(function (st) {
          var t = st.trigger;
          if (!t) return;
          if (t.id === 'section02' ||
              (t.classList && t.classList.contains('char-png'))) {
            st.kill(false);
          }
        });
      }
      var png = document.getElementById('charPng');
      if (png) { png.style.transform = 'none'; png.style.opacity = '1'; }
    } catch (e) {}
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    fitHeroOrbit();
    initMobileGalleryOrbit();
    tameSection02();
    /* GSAP/ScrollTrigger register late — re-tame a few times */
    setTimeout(tameSection02, 500);
    setTimeout(tameSection02, 1400);
  }

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init);

  /* keep things sized on rotate/resize */
  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      if (!MQ.matches) return;
      fitHeroOrbit();
    }, 200);
  });

  /* if crossing the breakpoint without reload, reload for a clean swap */
  if (MQ.addEventListener) {
    MQ.addEventListener('change', function () { location.reload(); });
  }

})();