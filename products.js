/* =====================================================
   MAGS MARIETTA — products.js
   Single source of truth for all products.
   Edit here — shop.html and product.html both read this.
   ===================================================== */

const PRODUCTS = [
  {
    id:          "skull-tag",
    name:        "Skull Tag",
    price:       30.00,
    category:    "Zipper Pull",
    description: "Stacked Skulls zipper pull.",
    details:     ["316L Stainless Steel", "Polished finish", "Fits all zippers", "Approx. 7.4cm × 32.2cm"],
    model:       "models/skull-tag.glb",
    thumbnail:   "images/products/skull-tag/thumbnail.jpg",
    photos:      [
      "images/products/skull-tag/1.jpg",
      "images/products/skull-tag/2.jpg",
      "images/products/skull-tag/3.jpg"
    ],
    inventory:   true,  // ← shows in Inventory
    deal:        false,  // ← shows in Great Deals
    featured:    true    // ← shows in Featured Items on index
  },
  {
    id:          "mace-tag",
    name:        "Mace Tag",
    price:       30.00,
    category:    "Zipper Pull",
    description: "Mace-head zipper pull.",
    details:     ["316L Stainless Steel", "Polished finish", "Fits all zippers", "Approx. 16.6cm × 42.0cm"],
    model:       "models/mace-tag.glb",
    thumbnail:   "images/products/mace-tag/thumbnail.jpg",
    photos:      [
      "images/products/mace-tag/1.jpg",
      "images/products/mace-tag/2.jpg"
    ],
    inventory:   true,
    deal:        false,
    featured:    true
  },
  {
    id:          "spirit-tag",
    name:        "Spirit Tag",
    price:       30.00,
    category:    "Zipper Pull",
    description: "All Seeing Eye zipper pull",
    details:     ["316L Stainless Steel", "Polished finish", "Fits all zippers", "Approx. 25.2cm × 29.8cm"],
    model:       "models/spirit-tag.glb",
    thumbnail:   "images/products/spirit-tag/thumbnail.jpg",
    photos:      [
      "images/products/spirit-tag/1.jpg",
      "images/products/spirit-tag/2.jpg",
      "images/products/spirit-tag/3.jpg"
    ],
    inventory:   true,
    deal:        false,
    featured:    true
  },
  {
    id:          "flower-ring",
    name:        "Flower Ring",
    price:       30.00,
    category:    "Ring",
    description: "Solid stainless steel band engraved with flowers.",
    details:     ["316L Stainless Steel", "Polished finish", "Band Ring", "See chart for sizing"],
    model:       "models/flower-ring.glb",
    thumbnail:   null,
    photos:      [
      "images/products/flower-ring/1.jpg",
      "images/products/flower-ring/2.jpg",
      "images/products/flower-ring/3.jpg"
    ],
    inventory:   true,
    deal:        false,
    featured:    true
  },
  {
    id:          "etched-ring",
    name:        "Etched Ring",
    price:       30.00,
    category:    "Ring",
    description: "Solid stainless steel engraved signet ring featuring a skull.",
    details:     ["316L Stainless Steel", "Polished finish", "Signet Ring", "See chart for sizing"],
    model:       "models/etched-ring.glb",
    thumbnail:   null,
    photos:      [
      "images/products/etched-ring/1.jpg",
      "images/products/etched-ring/2.jpg",
      "images/products/etched-ring/3.jpg"
    ],
    inventory:   true,
    deal:        false,
    featured:    true
  },
  {
    id:          "jump-ring",
    name:        "Jump Ring",
    price:       3.00,
    category:    "Hardware",
    description: "Heavy-gauge stainless jump rings. For connecting, layering, customizing. Sold as pack of 4.",
    details:     ["316L Stainless Steel", "Polished finish", "Pack of 4", "Multipurpose"],
    model:       "models/jump-ring.glb",
    thumbnail:   null,
    photos:      [
      "images/products/jump-ring/1.jpg"
    ],
    inventory:   true,
    deal:        true,
    featured:    true
  },
  {
    id:          "desert-eagle",
    name:        "Desert Eagle",
    price:       18.00,
    category:    "Zipper Pull",
    description: "...",
    details:     ["316L Stainless Steel", "Polished finish", "Fits all zippers", "Approx. 29.0cm × 20.2cm"],
    model:       "models/desert-eagle.glb",
    thumbnail:   null,
    photos:      [
      "images/products/desert-eagle/1.jpg",
      "images/products/desert-eagle/2.jpg",
      "images/products/desert-eagle/3.jpg"
    ],
    inventory:   false,
    deal:        false,
    featured:    false
  }
];

// Node.js compat (ignored in browser)
if (typeof module !== "undefined") module.exports = PRODUCTS;
