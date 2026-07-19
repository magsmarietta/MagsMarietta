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
    const isCheckoutPage     = document.body.classList.contains('checkout-page');
    const isShopOrProductPage = document.body.classList.contains('shop-page') ||
                                 document.body.classList.contains('product-page');

    if (isCheckoutPage || (isMobile && isAboutPage)) {
      cartPanel.style.display = 'none';
      cartPanel.classList.remove('cart-panel--static');
      return;
    }
    cartPanel.style.display = '';

    if (isMobile && isShopOrProductPage && anchorMain) {
      // Shown as a main panel: forced open, not collapsible.
      // This class only controls display — it never touches the
      // .open class, so the sidebar's collapsed/expanded state
      // (saved separately) is untouched underneath.
      cartPanel.classList.add('cart-panel--static');
      const header = cartPanel.querySelector('.collapsible-header');
      if (header) header.tabIndex = -1;
      anchorMain.parentNode.insertBefore(cartPanel, anchorMain);
    } else {
      cartPanel.classList.remove('cart-panel--static');
      const header = cartPanel.querySelector('.collapsible-header');
      if (header) header.tabIndex = 0;
      anchorSide.parentNode.insertBefore(cartPanel, anchorSide);
    }
  }

  placeCartPanel();
  mq.addEventListener('change', placeCartPanel);
  window.addEventListener('resize', placeCartPanel);
})();


// ===== CART: DATA MODEL (persisted in localStorage) =====
const CART_STORAGE_KEY = 'magsCart';

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  try { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)); } catch (e) {}
}

// Adds an item to the cart (stacks qty onto an existing entry with the same id)
// item: { id, productId, name, price, category, size, thumbnail, qty }
function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.qty += item.qty || 1;
  } else {
    cart.push({
      id:        item.id,
      productId: item.productId || item.id,
      name:      item.name,
      price:     item.price,
      category:  item.category || null,
      size:      item.size || null,
      thumbnail: item.thumbnail || null,
      qty:       item.qty || 1
    });
  }
  saveCart(cart);
  renderCartPanel();
}

// Sets an item's qty directly; qty <= 0 removes it from the cart
function setCartItemQty(id, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter(item => item.id !== id);
  } else {
    const item = cart.find(item => item.id === id);
    if (item) item.qty = qty;
  }
  saveCart(cart);
  renderCartPanel();
}

function renderCartPanel() {
  const cartPanel = document.getElementById('cart-panel');
  if (!cartPanel) return;
  const body = cartPanel.querySelector('.collapsible-body');
  if (!body) return;

  const cart = getCart();

  if (cart.length === 0) {
    body.innerHTML = '<p class="cart-empty-msg">Your cart is empty.</p>';
    return;
  }

  const itemsHTML = cart.map(item => {
    const metaParts = [item.size ? `Size ${item.size}` : null].filter(Boolean);
    return `
    <div class="cart-item-row" data-id="${item.id}">
      <div class="cart-item-info">
        <span class="cart-item-name">${item.name}</span>
        ${metaParts.length ? `<span class="cart-item-meta">${metaParts.join(' · ')}</span>` : ''}
        <span class="cart-item-price">$${item.price.toFixed(2)} each</span>
      </div>
      <div class="cart-item-qty">
        <button class="cart-qty-btn" data-action="minus" data-id="${item.id}" aria-label="Decrease quantity">−</button>
        <span class="cart-qty-val">${item.qty}</span>
        <button class="cart-qty-btn" data-action="plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
      </div>
    </div>`;
  }).join('');

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  body.innerHTML = `
    <div class="cart-items-list">${itemsHTML}</div>
    <div class="cart-total-row">
      <span>TOTAL</span>
      <span>$${total.toFixed(2)}</span>
    </div>
    <button class="cart-checkout-btn" id="cart-checkout-btn">CHECKOUT</button>
  `;
}

// Event delegation — cart contents are re-rendered often, so bind once on document
document.addEventListener('click', function (e) {
  const qtyBtn = e.target.closest('.cart-qty-btn');
  if (qtyBtn) {
    const id   = qtyBtn.dataset.id;
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;
    const delta = qtyBtn.dataset.action === 'plus' ? 1 : -1;
    setCartItemQty(id, item.qty + delta);
    return;
  }

  if (e.target.closest('#cart-checkout-btn')) {
    window.location.href = 'checkout.html';
  }
});

renderCartPanel();


// ===== COLLAPSIBLE LOG =====
function toggleLog(header) {
  const cartPanel = header.closest('#cart-panel');
  if (cartPanel && cartPanel.classList.contains('cart-panel--static')) return; // non-collapsible while shown as a main panel

  const body   = header.nextElementSibling;
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open');
  header.classList.toggle('open');
  header.setAttribute('aria-expanded', !isOpen);

  // Persist the cart panel's open/closed state across page loads
  if (cartPanel) {
    try { localStorage.setItem('cartPanelOpen', String(!isOpen)); } catch (e) {}
  }
}

document.querySelectorAll('.collapsible-header').forEach(h => {
  h.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleLog(h); }
  });
});

// Restore cart panel open/closed state on load
(function () {
  const cartPanel = document.getElementById('cart-panel');
  if (!cartPanel) return;
  let wasOpen = false;
  try { wasOpen = localStorage.getItem('cartPanelOpen') === 'true'; } catch (e) {}
  if (!wasOpen) return;
  const header = cartPanel.querySelector('.collapsible-header');
  const body   = cartPanel.querySelector('.collapsible-body');
  header.classList.add('open');
  body.classList.add('open');
  header.setAttribute('aria-expanded', 'true');
})();


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
