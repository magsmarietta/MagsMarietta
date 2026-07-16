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

// ===== CART PANEL: RESPONSIVE PLACEMENT =====
// Desktop (any page):        sidebar, collapsible
// Mobile + home page:        sidebar, collapsible
// Mobile + shop/product page: moved to end of main content
// Mobile + about page:       hidden entirely
(function () {
  const cartPanel  = document.getElementById('cart-panel');
  const anchorSide = document.getElementById('cart-anchor-sidebar');
  if (!cartPanel || !anchorSide) return;

  const anchorMain = document.getElementById('cart-anchor-main'); // only exists on shop/product pages
  const mq = window.matchMedia('(max-width: 700px) and (orientation: portrait)');

  function placeCartPanel() {
    const isMobile = mq.matches;
    const isAboutPage        = document.body.classList.contains('about-page');
    const isShopOrProductPage = document.body.classList.contains('shop-page') ||
                                 document.body.classList.contains('product-page');

    if (isMobile && isAboutPage) {
      cartPanel.style.display = 'none';
      return;
    }
    cartPanel.style.display = '';

    if (isMobile && isShopOrProductPage && anchorMain) {
      anchorMain.parentNode.insertBefore(cartPanel, anchorMain);
    } else {
      anchorSide.parentNode.insertBefore(cartPanel, anchorSide);
    }
  }

  placeCartPanel();
  mq.addEventListener('change', placeCartPanel);
  window.addEventListener('resize', placeCartPanel);
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
    note.textContent = 'ENTER A VALID EMAIL ADDRESS...';
    note.style.color = '#cc0000';
    return;
  }
  btn.textContent       = 'SENT';
  btn.style.background  = '#222';
  input.value           = '';
  input.placeholder     = "YOU'RE ON THE LIST.";
  note.textContent      = 'Thank you for joining!';
  note.style.color      = '#2c2129';
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


// ===== RANDOM TAG HOVER COLORS =====
(function () {
  const tags = document.querySelectorAll('.tag');
  const colors = [
    '#d365e4', '#e45b8a', '#8a5be4', '#5b8ae4',
    '#e4a85b', '#5be4a8', '#e45b5b', '#a8e45b'
  ];
  const isTouch = window.matchMedia('(hover: none)').matches;

  tags.forEach(tag => {
    let currentColor = null;

    if (!isTouch) {
      tag.addEventListener('mouseenter', function () {
        if (this.classList.contains('active')) {
          this.style.background = 'var(--white)';
          this.style.color = currentColor;
          this.style.borderColor = currentColor;
        } else {
          currentColor = colors[Math.floor(Math.random() * colors.length)];
          this.style.background = 'var(--white)';
          this.style.color = currentColor;
          this.style.borderColor = currentColor;
        }
      });

      tag.addEventListener('mouseleave', function () {
        if (!this.classList.contains('active')) {
          this.style.background = '';
          this.style.color = '';
          this.style.borderColor = '';
        }
      });
    }

    tag.addEventListener('click', function () {
      const isActive = this.classList.contains('active');
      if (isActive) {
        this.classList.remove('active');
        currentColor = null;
        this.style.background = '';
        this.style.color = '';
        this.style.borderColor = '';
      } else {
        if (!currentColor) {
          currentColor = colors[Math.floor(Math.random() * colors.length)];
        }
        this.classList.add('active');
        this.style.background = 'var(--white)';
        this.style.color = currentColor;
        this.style.borderColor = currentColor;
      }
    });
  });
})();

// ===== RANDOM NAV HOVER COLORS =====
(function () {
  const navLinks = document.querySelectorAll('.nav-links a');
  const colors = [
    '#d365e4', '#e45b8a', '#8a5be4', '#5b8ae4',
    '#e4a85b', '#5be4a8', '#e45b5b', '#a8e45b'
  ];

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.style.setProperty('--hover-color', color);
    });
    link.addEventListener('mouseleave', function () {
      this.style.removeProperty('--hover-color');
    });
  });
})();
