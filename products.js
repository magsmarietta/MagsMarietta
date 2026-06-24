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
    category:    "Zipper Tags",
    description: "Cast 316L stainless steel zipper tag. Skull face, hollow eyes. Heavy enough to feel intentional — light enough to not drag.",
    details:     ["316L Stainless Steel", "Brushed finish", "Fits #5 YKK & standard zippers", "Approx. 2.8cm × 1.8cm"],
    model:       "models/skull-tag.glb",
    thumbnail:   null   // replace with "images/skull-tag.webp" once you have photos
  },
  {
    id:          "mace-tag",
    name:        "Mace Tag",
    price:       30.00,
    category:    "Zipper Tags",
    description: "Mace-head zipper pull. Sharp geometry, heavy presence. Machined from solid stainless stock.",
    details:     ["316L Stainless Steel", "Brushed finish", "Fits #5 YKK & standard zippers", "Approx. 3.2cm × 1.4cm"],
    model:       "models/mace-tag.glb",
    thumbnail:   null
  },
  {
    id:          "spirit-tag",
    name:        "Spirit Tag",
    price:       30.00,
    category:    "Zipper Tags",
    description: "Ghost-form zipper tag. Fluid silhouette cut from stainless plate. Hangs with intention.",
    details:     ["316L Stainless Steel", "Brushed finish", "Fits #5 YKK & standard zippers", "Approx. 3.0cm × 1.6cm"],
    model:       "models/spirit-tag.glb",
    thumbnail:   null
  },
  {
    id:          "ring",
    name:        "Ring",
    price:       30.00,
    category:    "Jewelry",
    description: "Solid stainless band. No coating, no plating. The brushed finish deepens with wear.",
    details:     ["316L Stainless Steel", "Brushed finish", "Sized to order — DM for sizing", "8mm band width"],
    model:       "models/ring.glb",
    thumbnail:   null
  },
  {
    id:          "aglet",
    name:        "Aglet",
    price:       30.00,
    category:    "Hardware",
    description: "Cold-formed stainless aglets. Replace the plastic tips on laces, cords, drawstrings. Built to outlast the shoe.",
    details:     ["316L Stainless Steel", "Brushed finish", "Fits 3–5mm cord", "Sold as a pair"],
    model:       "models/aglet.glb",
    thumbnail:   null
  },
  {
    id:          "jump-ring",
    name:        "Jump Ring",
    price:       3.00,
    category:    "Hardware",
    description: "Heavy-gauge stainless jump rings. For connecting, layering, customizing. Sold individually.",
    details:     ["316L Stainless Steel", "Polished finish", "8mm inner diameter", "2mm wire gauge"],
    model:       "models/jump-ring.glb",
    thumbnail:   null
  }
];

// Node.js compat (ignored in browser)
if (typeof module !== "undefined") module.exports = PRODUCTS;
