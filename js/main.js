/* =========================================================
   Zeus Eletropostos — interações
   ========================================================= */
(function () {
  'use strict';

  /* --- CONFIG: troque pelo número real da Zeus (formato internacional, só dígitos) --- */
  var WHATSAPP = '5592981540466'; // ex.: 55 (Brasil) + 92 (Manaus) + número
  var MSG_PADRAO = 'Olá! Vim pelo site da Zeus Eletropostos e quero conversar sobre uma parceria para o meu ponto comercial.';

  function wppLink(text) {
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text || MSG_PADRAO);
  }

  /* --- ano no rodapé --- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- links de WhatsApp diretos --- */
  document.querySelectorAll('.js-wpp, .js-wpp-direct').forEach(function (el) {
    el.setAttribute('href', wppLink());
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* --- header com fundo ao rolar --- */
  var header = document.getElementById('header');
  var onScroll = function () {
    if (window.scrollY > 20) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- menu mobile --- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- reveal ao entrar na viewport --- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* --- contadores animados --- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var dur = 1600;
    var start = null;

    function fmt(v) {
      var n = decimals ? v.toFixed(decimals).replace('.', ',') : Math.round(v).toLocaleString('pt-BR');
      return n + suffix;
    }
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = fmt(target);
    }
    requestAnimationFrame(frame);
  }

  var counters = document.querySelectorAll('.stat__num');
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCount(e.target);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* --- formulário -> WhatsApp com dados preenchidos --- */
  var form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var nome = (form.nome.value || '').trim();
      var estab = (form.estabelecimento.value || '').trim();
      var local = (form.local.value || '').trim();
      var msg = (form.msg.value || '').trim();

      var linhas = ['Olá! Vim pelo site da Zeus Eletropostos e quero conversar sobre uma parceria.'];
      if (nome) linhas.push('\n• Nome: ' + nome);
      if (estab) linhas.push('• Estabelecimento: ' + estab);
      if (local) linhas.push('• Local: ' + local);
      if (msg) linhas.push('• Obs.: ' + msg);

      window.open(wppLink(linhas.join('\n')), '_blank', 'noopener');
    });
  }
})();
