import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  toggleWishlistItem,
  isInWishlist,
} from "../../utils/wishlist";
import "../styles/ShopByBrand.css";


import ShopByBrandImage1 from "../assets/ShopByBrand Image1.png";
import ShopByBrandImage2 from "../assets/ShopByBrand Image2.png";
import ShopByBrandImage3 from "../assets/ShopByBrand Image3.png";
import ShopByBrandImage4 from "../assets/ShopByBrand Image4.png";
import ShopByBrandImage5 from "../assets/ShopByBrand Image5.png";
import ShopByBrandImage6 from "../assets/ShopByBrand Image6.png";
import ShopByBrandImage7 from "../assets/ShopByBrand Image7.png";

/* ================================================================
   DATA
   ================================================================ */

const products = [
  {
    id: 1,
    title: "ACCUPROBE UV Leak Detector",
    brand: "Yellow Jacket",
    category: "Leak Detectors",
    price: 47900, oldPrice: 54900,
    stock: "In Stock", units: 3,
    rating: 4.8, reviews: 62,
    badge: "Best Seller",
    image: ShopByBrandImage1,
  },
  {
    id: 2,
    title: "Bullet Vacuum Pump",
    brand: "Appion",
    category: "Vacuum Tools",
    price: 128000, oldPrice: 145000,
    stock: "In Stock", units: null,
    rating: 4.9, reviews: 118,
    badge: "Professional Series",
    image: ShopByBrandImage2,
  },
  {
    id: 3,
    title: "Carbon Dioxide Gas Leak Detector",
    brand: "Accutools",
    category: "Leak Detectors",
    price: 49250, oldPrice: 64000,
    stock: "In Stock", units: null,
    rating: 4.7, reviews: 45,
    badge: "Industrial Grade",
    image: ShopByBrandImage3,
  },
  {
    id: 4,
    title: "Fix Quick Refrigerant Leak Sealant",
    brand: "Errecom",
    category: "Chemicals",
    price: 3150, oldPrice: 4800,
    stock: "In Stock", units: 8,
    rating: 4.5, reviews: 33,
    badge: null,
    image: ShopByBrandImage4,
  },
  {
    id: 5,
    title: "Anti-Corrosive Treatment",
    brand: "BP Refcool",
    category: "Chemicals",
    price: 585, oldPrice: 890,
    stock: "In Stock", units: 78,
    rating: 4.4, reviews: 27,
    badge: null,
    image: ShopByBrandImage5,
  },
  {
    id: 6,
    title: "Single Stage Vacuum Pump",
    brand: "Ecoab",
    category: "Vacuum Tools",
    price: 4125, oldPrice: 5500,
    stock: "In Stock", units: 120,
    rating: 4.6, reviews: 51,
    badge: "Industrial Grade",
    image: ShopByBrandImage6,
  },
  {
    id: 7,
    title: "Ultrasonic Leak Detector",
    brand: "Inficon",
    category: "Leak Detectors",
    price: 95000, oldPrice: 108000,
    stock: "In Stock", units: null,
    rating: 4.9, reviews: 143,
    badge: "Professional Series",
    image: ShopByBrandImage7,
  },
];

/* Brand descriptions */
const BRAND_INFO = {
  "yellow jacket": { icon: "ri-tools-line", desc: "Professional-grade HVAC gauges and service tools trusted by technicians worldwide.", products: "48+", years: "70+" },
  "appion": { icon: "ri-wind-line", desc: "High-performance vacuum and refrigerant recovery solutions for commercial HVAC.", products: "32+", years: "20+" },
  "accutools": { icon: "ri-bluetooth-line", desc: "Precision wireless HVAC instruments built for modern diagnostic accuracy.", products: "24+", years: "15+" },
  "errecom": { icon: "ri-flask-line", desc: "Italian-engineered HVAC treatment chemicals and refrigerant leak solutions.", products: "60+", years: "30+" },
  "bp refcool": { icon: "ri-drop-line", desc: "Premium refrigeration lubricants and system protection fluids.", products: "20+", years: "25+" },
  "ecoab": { icon: "ri-leaf-line", desc: "Eco-friendly refrigeration equipment combining performance and sustainability.", products: "18+", years: "10+" },
  "inficon": { icon: "ri-sensor-line", desc: "German precision leak detection and measurement instruments for industrial HVAC.", products: "55+", years: "50+" },
};

const TRUST_ITEMS = [
  { icon: "ri-shield-check-line", label: "Genuine Products" },
  { icon: "ri-truck-line", label: "Fast Delivery" },
  { icon: "ri-tools-line", label: "HVAC Expert Support" },
  { icon: "ri-lock-line", label: "Secure Checkout" },
  { icon: "ri-award-line", label: "ISO Certified" },
];

/* ── Helpers ── */
function fmt(n) { return `₹${Number(n).toLocaleString("en-IN")}`; }
function disc(price, old) { return old > price ? Math.round((1 - price / old) * 100) : 0; }
function Stars({ r }) {
  const f = Math.floor(r), h = r % 1 >= 0.5;
  return <span className="sb-stars">{"★".repeat(f)}{h ? "½" : ""}{"☆".repeat(5 - f - (h ? 1 : 0))}</span>;
}

/* ── Card component ── */
function ProductCard({
  product,
  delay,
  onAddToCart,
  onBuyNow,
  showToast
}) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [wishlisted, setWishlisted] =
    useState(isInWishlist(product.id));

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.unobserve(e.target); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  const handleWishlist = (e) => {

    e.stopPropagation();

    const updated =
      toggleWishlistItem(product);

    const exists =
      updated.some((i) => i.id === product.id);

    setWishlisted(exists);

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );

    showToast(
      exists
        ? "Added to wishlist ❤️"
        : "Removed from wishlist"
    );
  };

  const pct = disc(product.price, product.oldPrice);

  return (
    <div ref={ref} className={`sb-card${vis ? " sb-card-vis" : ""}`} style={{ transitionDelay: `${delay}ms` }}>

      {/* Hover actions */}
      <div className="sb-card-actions" onClick={e => e.stopPropagation()}>
        <button
          className={`sb-action-btn ${wishlisted ? "active" : ""}`}
          title="Wishlist"
          onClick={handleWishlist}
        >
          <i
            className={
              wishlisted
                ? "ri-heart-fill"
                : "ri-heart-line"
            }
          />
        </button>
        <button className="sb-action-btn" title="Quick View"><i className="ri-eye-line" /></button>
        <button className="sb-action-btn" title="Compare"><i className="ri-scales-line" /></button>
      </div>

      {/* Image */}
      <div className="sb-card-img">
        <img src={product.image} alt={product.title} />
      </div>

      {/* Body */}
      <div className="sb-card-body">
        <span className="sb-card-brand">{product.brand}</span>
        <p className="sb-card-title">{product.title}</p>

        {/* Stars */}
        <div className="sb-card-stars">
          <Stars r={product.rating} />
          <span className="sb-rating-num">{product.rating} ({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="sb-price-row">
          <span className="sb-price-main">{fmt(product.price)}</span>
          {product.oldPrice > product.price && <span className="sb-price-old">{fmt(product.oldPrice)}</span>}
          {pct > 0 && <span className="sb-price-badge">{pct}% OFF</span>}
        </div>

        {/* Stock */}
        <div className="sb-stock-row">
          <span className="sb-stock-dot" />
          <span>{product.stock}</span>
          {product.units && <span className="sb-stock-scarcity">· Only {product.units} left</span>}
        </div>
      </div>

      {/* CTA */}
      <div className="sb-card-footer">
        <button className="sb-btn-cart" onClick={() => onAddToCart(product)}>
          <i className="ri-shopping-cart-line" />Add to Cart
        </button>
        <button className="sb-btn-buy" onClick={() => onBuyNow(product)}>
          <i className="ri-flashlight-line" />Buy Now
        </button>
      </div>
    </div>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */

export default function ShopByBrand() {
  const { brand } = useParams();
  const navigate = useNavigate();
  const brandLabel = brand ? decodeURIComponent(brand) : null;
  const brandKey = brandLabel?.toLowerCase() || null;
  const brandMeta = brandKey ? BRAND_INFO[brandKey] : null;

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const brandCardRef = useRef(null);
  const [brandVis, setBrandVis] = useState(false);

  useEffect(() => {
    if (!brandCardRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setBrandVis(true); obs.unobserve(e.target); } }, { threshold: 0.1 });
    obs.observe(brandCardRef.current);
    return () => obs.disconnect();
  }, [brandLabel]);

  /* Filter + sort */
  let filtered = brandKey
    ? products.filter(p => p.brand.toLowerCase() === brandKey)
    : products;

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  }

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  /* Cart */
  const showToast = (msg) => {
    setToastMsg(msg); setToast(true);
    setTimeout(() => setToast(false), 2800);
  };

  const addToCart = (product) => {

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existing =
      cart.find(i => i.title === product.title);

    if (existing) {

      existing.qty += 1;

    } else {

      cart.push({
        title: product.title,
        image: product.image,
        price: product.price,
        oldPrice: product.oldPrice,
        qty: 1
      });

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    /* 🔥 IMPORTANT */
    window.dispatchEvent(
      new Event("cartUpdated")
    );

    showToast(
      `${product.title.slice(0, 28)}… added to cart`
    );
  };

  const buyNow = (product) => {
    addToCart(product);
    navigate("/checkout");
  };

  const heroLabel = brandLabel || "All Brands";
  const heroSub = brandLabel
    ? `Explore the full ${brandLabel} collection — industrial-grade HVAC tools trusted by professionals.`
    : "Discover industrial-grade tools and professional refrigeration solutions from globally trusted manufacturers.";

  return (
    <>
      {/* Toast */}
      <div className={`sb-toast${toast ? " show" : ""}`}>
        <i className="ri-checkbox-circle-fill" />
        {toastMsg}
      </div>

      <div className="sb-page">
        <div className="sb-orb sb-orb-1" />
        <div className="sb-orb sb-orb-2" />

        {/* ── HERO ── */}
        <div className="sb-hero">
          <div className="sb-hero-inner">
            <div className="sb-hero-left">
              <div className="sb-hero-eyebrow">
                <span className="sb-hero-eyebrow-dot" />
                {brandLabel ? "Brand Collection" : "Shop by Brand"}
              </div>
              <h1 className="sb-hero-title">
                {brandLabel ? <><span>{brandLabel}</span> Products</> : <>Explore <span>Premium</span> HVAC Brands</>}
              </h1>
              <p className="sb-hero-sub">{heroSub}</p>
            </div>
            <div className="sb-hero-right">
              <button className="sb-btn-back" onClick={() => navigate(-1)}>
                <i className="ri-arrow-left-line" />Back
              </button>
            </div>
          </div>
        </div>

        {/* ── TRUST STRIP ── */}
        <div className="sb-trust-strip">
          {TRUST_ITEMS.map(({ icon, label }) => (
            <div key={label} className="sb-trust-item">
              <i className={icon} />{label}
            </div>
          ))}
        </div>

        <div className="sb-inner">

          {/* ── BRAND INFO CARD ── */}
          {brandMeta && (
            <div ref={brandCardRef} className={`sb-brand-card${brandVis ? " sb-vis" : ""}`}>
              <div className="sb-brand-icon"><i className={brandMeta.icon} /></div>
              <div>
                <div className="sb-brand-name">{brandLabel}</div>
                <div className="sb-brand-desc">{brandMeta.desc}</div>
              </div>
              <div className="sb-brand-stats">
                <div className="sb-brand-stat">
                  <div className="sb-brand-stat-num">{brandMeta.products}</div>
                  <div className="sb-brand-stat-lbl">Products</div>
                </div>
                <div className="sb-brand-stat">
                  <div className="sb-brand-stat-num">{brandMeta.years}</div>
                  <div className="sb-brand-stat-lbl">Years Est.</div>
                </div>
              </div>
            </div>
          )}

          {/* ── CONTROLS ── */}
          <div className="sb-controls" style={{ marginTop: brandMeta ? 0 : 32 }}>
            <div className="sb-search-wrap">
              <i className="ri-search-line" />
              <input
                className="sb-search-input"
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button
                  style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 16, color: "var(--sb-muted)" }}
                  onClick={() => setSearch("")}
                >
                  <i className="ri-close-line" />
                </button>
              )}
            </div>

            <select className="sb-sort-select" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            <span className="sb-results-count">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          {/* ── GRID ── */}
          {filtered.length === 0 ? (
            <div className="sb-empty">
              <div className="sb-empty-icon"><i className="ri-search-line" /></div>
              <div className="sb-empty-title">No products found</div>
              <div className="sb-empty-sub">
                {search ? `No results for "${search}". Try a different search term.` : `No products available for ${brandLabel || "this brand"} yet.`}
              </div>
              {search && (
                <button className="sb-empty-btn" onClick={() => setSearch("")}>
                  <i className="ri-refresh-line" />Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="sb-grid">
              {filtered.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  delay={i * 75}
                  onAddToCart={addToCart}
                  onBuyNow={buyNow}
                  showToast={showToast}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}