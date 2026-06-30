/* ============================================================
   PAGES.JS — Shared behaviour for secondary pages
   ============================================================ */
(function () {
  'use strict';

  /* Mobile nav */
  var ham = document.getElementById('navHam');
  var drw = document.getElementById('mobileDrawer');
  var ovl = document.getElementById('mobileOverlay');
  var cls = document.getElementById('mobileClose');
  function openNav(){ if(drw){drw.classList.add('open');ovl.classList.add('open');document.body.style.overflow='hidden';} }
  function closeNav(){ if(drw){drw.classList.remove('open');ovl.classList.remove('open');document.body.style.overflow='';} }
  if (ham) ham.addEventListener('click', openNav);
  if (cls) cls.addEventListener('click', closeNav);
  if (ovl) ovl.addEventListener('click', closeNav);
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeNav(); });

  /* Navbar bg on scroll */
  window.addEventListener('scroll', function(){
    var nav = document.querySelector('.navbar');
    if (!nav) return;
    nav.style.background = window.scrollY > 40 ? 'rgba(249,236,226,0.97)' : 'rgba(249,236,226,0.8)';
  });

  /* Reveal on scroll */
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });

  /* Accordion */
  document.querySelectorAll('.acc-head').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.acc-item');
      var body = item.querySelector('.acc-body');
      var isOpen = item.classList.contains('open');
      /* close siblings in same accordion */
      var acc = item.closest('.accordion');
      if (acc) acc.querySelectorAll('.acc-item.open').forEach(function(o){
        if (o !== item){ o.classList.remove('open'); o.querySelector('.acc-body').style.maxHeight = null; }
      });
      if (isOpen){ item.classList.remove('open'); body.style.maxHeight = null; }
      else { item.classList.add('open'); body.style.maxHeight = body.scrollHeight + 'px'; }
    });
  });

  /* Toast helper */
  window.showToast = function(msg){
    var t = document.getElementById('toast');
    if (!t) return;
    t.innerHTML = '<span class="toast-ic">✦</span>' + msg;
    t.classList.add('show');
    clearTimeout(window._tt);
    window._tt = setTimeout(function(){ t.classList.remove('show'); }, 4000);
  };

  /* Generic contact / form → WhatsApp */
  window.sendContact = function(){
    var name  = (document.getElementById('c-name')||{}).value || '';
    var email = (document.getElementById('c-email')||{}).value || '';
    var subj  = (document.getElementById('c-subject')||{}).value || '';
    var msg   = (document.getElementById('c-msg')||{}).value || '';
    name = name.trim(); msg = msg.trim();
    if (!name) { showToast('Please enter your name.'); return; }
    if (!msg)  { showToast('Please enter a message.'); return; }
    var wa = '*DIMAZOFLY — Contact*\n\n' +
             '👤 Name: ' + name + '\n' +
             (email ? '✉️ Email: ' + email.trim() + '\n' : '') +
             (subj ? '📌 Subject: ' + subj.trim() + '\n' : '') +
             '\n💬 ' + msg;
    window.open('https://wa.me/917000418227?text=' + encodeURIComponent(wa), '_blank');
    showToast('Opening WhatsApp…');
  };

  /* Careers apply → WhatsApp */
  window.applyJob = function(role){
    var wa = '*DIMAZOFLY — Job Application*\n\n📌 Role: ' + role + '\n\nHi! I would like to apply for this position.';
    window.open('https://wa.me/917000418227?text=' + encodeURIComponent(wa), '_blank');
  };

  /* Track order (demo simulation) */
  window.trackOrder = function(){
    var id = (document.getElementById('track-id')||{}).value || '';
    id = id.trim();
    if (!id) { showToast('Please enter your order ID.'); return; }
    var res = document.getElementById('trackResult');
    var lbl = document.getElementById('trackOrderId');
    if (lbl) lbl.textContent = id.toUpperCase();
    if (res) res.classList.add('show');
  };

})();