/* =====================================================
   MAGS MARIETTA — main.js
   ===================================================== */

// ===== LOADING SCREEN =====
(function () {
  const loader = document.getElementById('loader');
  const bar    = document.getElementById('loader-bar');

  if (sessionStorage.getItem('visited')) {
    loader.remove();
    return;
  }

  sessionStorage.setItem('visited', 'true');

  let progress = 0;

  function tick() {
    progress = Math.min(progress + 3 + Math.random() * 8, 100);
    bar.style.width = progress + '%';
    if (progress >= 100) {
      setTimeout(() => {
        loader.classList.add('fade-out');
        loader.addEventListener('animationend', () => loader.remove(), { once: true });
      }, 260);
      return;
    }
    setTimeout(tick, 60 + Math.random() * 80);
  }

  setTimeout(tick, 120);
})();

// ===== COLLAPSIBLE LOG =====
function toggleLog(header) {
  const body   = header.nextElementSibling;
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open');
  header.classList.toggle('open');
  header.setAttribute('aria-expanded', !isOpen);
}

document.querySelectorAll('.collapsible-header').forEach(h => {
  h.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleLog(h); }
  });
});


// ===== EMAIL SUBMIT =====
function handleEmailSubmit(btn) {
  const input = btn.previousElementSibling;
  const note  = document.getElementById('contact-note');
  const val   = input.value.trim();

  if (!val || !val.includes('@')) {
    note.textContent = '// ENTER A VALID EMAIL ADDRESS.';
    note.style.color = '#cc0000';
    return;
  }
  btn.textContent       = '✓ SENT';
  btn.style.background  = '#222';
  input.value           = '';
  input.placeholder     = "YOU'RE ON THE LIST.";
  note.textContent      = '// WELCOME TO THE INNER CIRCLE.';
  note.style.color      = '#228B22';
}


// ===== MARQUEE: clone strip so it loops seamlessly =====
(function () {
  const strip = document.getElementById('marquee-strip-1');
  if (!strip) return;

  [1, 2].forEach(() => {
    const clone = strip.cloneNode(true);
    clone.removeAttribute('id');
    clone.setAttribute('aria-hidden', 'true');
    strip.parentNode.appendChild(clone);
  });

  // Wait a beat for images to settle, then measure and inject animation
  setTimeout(function () {
    const stripW = strip.offsetWidth;
    const style  = document.createElement('style');
    style.textContent =
      '@keyframes scroll-left {' +
        '0%   { transform: translateX(0); }' +
        '100% { transform: translateX(-' + stripW + 'px); }' +
      '}' +
      '.marquee-inner { animation: scroll-left 23s linear infinite; }';
    document.head.appendChild(style);
  }, 800);
})();

// ===== CAROUSEL =====
(function () {
  const items = document.querySelectorAll('.carousel-item');
  if (!items.length) return;

  let current = 1; // start on middle item

  function update() {
    items.forEach((item, i) => {
      item.classList.remove('active');
      if (i === current) item.classList.add('active');
    });
  }

  window.shiftCarousel = function (dir) {
    current = (current + dir + items.length) % items.length;
    update();
  };

  update();
})();
