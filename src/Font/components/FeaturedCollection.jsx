import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import featuredProducts from "../data/featuredProducts";
import {
  getWishlist,
  toggleWishlistItem,
} from "../../utils/wishlist";

/* ── Category filters (static for now) ──────────────────────────────────── */
const FILTERS = ["All", "Tools", "Chemicals", "Monitors", "Energy"];

/* ── Badge config ─────────────────────────────────────────────────────────── */
const BADGES = ["Best Seller", "Trending", "New Arrival", "Industrial Grade"];

export default function FeaturedCollection() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [wishlist, setWishlist] = useState(getWishlist());
  const [toast, setToast] = useState(false);

  const [toastMsg, setToastMsg] = useState("");

  const visibleProducts = featuredProducts.slice(0, 4).map((p, i) => ({
    ...p,
    badge: BADGES[i % BADGES.length],
    originalPrice: p.price
      ? `₹${Math.round(parseInt(p.price.replace(/[^\d]/g, "")) * 1.38).toLocaleString("en-IN")}`
      : null,
    savings: "Save 28%",
    inStock: true,
  }));

  const toggleWishlist = (e, product) => {
    e.stopPropagation();

    const updated = toggleWishlistItem(product);

    setWishlist(updated);

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const showToast = (text) => {

    setToastMsg(text);

    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 2600);
  };

  const addToCart = (e, product) => {

    e.stopPropagation();

    const cart =
      JSON.parse(localStorage.getItem("cart") || "[]");

    const existing =
      cart.findIndex((i) => i.id === product.id);

    if (existing > -1) {

      cart[existing].qty =
        (cart[existing].qty || 1) + 1;

    } else {

      cart.push({
        ...product,
        qty: 1
      });

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    /* 🔥 ADD THIS */
    showToast(
      `${product.title.slice(0, 28)}… added to cart`
    );
  };

  return (
    <>
      {/* TOAST */}
      <div className={`fc-toast${toast ? " show" : ""}`}>
        <i className="ri-checkbox-circle-fill" />
        {toastMsg}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

        /* ── Section ─────────────────────────────── */
        /* ── Section ─────────────────────────────── */
.fc-section {
  padding: clamp(48px, 8vw, 88px) 0 clamp(56px, 8vw, 96px);
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 60%, #f0f7f9 100%);
  position: relative;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}
.fc-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
}
.fc-blob-1 {
  width: clamp(240px, 40vw, 480px);
  height: clamp(240px, 40vw, 480px);
  top: -160px; right: -100px;
  background: rgba(6,182,212,0.07);
}
.fc-blob-2 {
  width: clamp(160px, 25vw, 320px);
  height: clamp(160px, 25vw, 320px);
  bottom: -80px; left: -60px;
  background: rgba(37,99,235,0.06);
}
.fc-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px);
  background-size: 52px 52px;
  pointer-events: none;
}

/* ── Inner ───────────────────────────────── */
.fc-inner {
  max-width: 85%;
  margin: 0 auto;
  padding: 0 clamp(16px, 3vw, 40px);
  position: relative;
  z-index: 1;
}

/* ── Header ──────────────────────────────── */
.fc-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: clamp(20px, 3vw, 32px);
  gap: clamp(12px, 2vw, 24px);
}
.fc-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: #06B6D4;
  margin-bottom: 10px;
}
.fc-eyebrow-line {
  width: 28px; height: 2px;
  background: #06B6D4;
  border-radius: 2px;
}
.fc-heading {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.6rem, 4vw, 2.7rem);
  font-weight: 800;
  color: #0f172a;
  line-height: 1.08;
  letter-spacing: -.02em;
  margin: 0 0 10px;
}
.fc-heading span { color: #06B6D4; }
.fc-subtitle {
  font-size: clamp(13px, 1.5vw, 15px);
  color: #64748b;
  line-height: 1.6;
  max-width: 420px;
  margin: 0;
}
.fc-view-all {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: clamp(12px, 1.3vw, 13.5px);
  font-weight: 600;
  color: #0f172a;
  border: 1.5px solid #cbd5e1;
  border-radius: 100px;
  padding: clamp(8px, 1.2vw, 10px) clamp(14px, 2vw, 22px);
  white-space: nowrap;
  cursor: pointer;
  background: none;
  font-family: 'DM Sans', sans-serif;
  flex-shrink: 0;
  align-self: flex-start;
  margin-top: 8px;
  transition: border-color .22s, color .22s, background .22s, transform .22s cubic-bezier(.4,0,.2,1);
  text-decoration: none;
  min-height: 44px;
}
.fc-view-all:hover {
  border-color: #06B6D4;
  color: #06B6D4;
  background: rgba(6,182,212,0.06);
  transform: translateX(3px);
}
.fc-view-all i { font-size: 15px; transition: transform .22s; }
.fc-view-all:hover i { transform: translateX(4px); }

/* ── Filters ─────────────────────────────── */
.fc-filters {
  display: flex;
  gap: clamp(6px, 1vw, 8px);
  margin-bottom: clamp(20px, 3vw, 36px);
  flex-wrap: wrap;
}
.fc-filter-btn {
  padding: clamp(6px, 1vw, 8px) clamp(12px, 2vw, 18px);
  border-radius: 100px;
  border: 1.5px solid #e2e8f0;
  background: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(12px, 1.2vw, 13px);
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  min-height: 44px;
  transition: all .22s cubic-bezier(.4,0,.2,1);
}
.fc-filter-btn:hover {
  border-color: #06B6D4;
  color: #06B6D4;
  background: rgba(6,182,212,0.05);
}
.fc-filter-btn.active {
  background: linear-gradient(135deg, #06B6D4, #2563EB);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 4px 14px rgba(6,182,212,0.3);
}

/* ── Grid ────────────────────────────────── */
.fc-grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(clamp(160px, 22vw, 255px), 1fr));
  gap: clamp(14px, 2.5vw, 28px);
}

/* ── Card ────────────────────────────────── */
.fc-card {
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid rgba(226,232,240,0.9);
  box-shadow: 0 4px 24px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.04);
  display: flex;
  flex-direction: column;
  min-height: clamp(360px, 45vw, 440px);
  cursor: pointer;
  position: relative;
  transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s cubic-bezier(.4,0,.2,1), border-color .25s;
}
.fc-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(15,23,42,0.12), 0 0 0 1.5px rgba(6,182,212,0.4);
  border-color: rgba(6,182,212,0.4);
}

/* Badge */
.fc-badge {
  position: absolute;
  top: 14px; left: 14px;
  z-index: 5;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #fff;
  padding: 4px 12px;
  border-radius: 100px;
  background: linear-gradient(135deg, #06B6D4, #2563EB);
  box-shadow: 0 3px 10px rgba(6,182,212,0.35);
}

/* Wishlist */
.fc-wishlist-btn {
  position: absolute;
  top: 12px; right: 12px;
  z-index: 5;
  width: 34px; height: 34px;
  border-radius: 50%;
  border: 1.5px solid rgba(226,232,240,0.9);
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #94a3b8;
  transition: border-color .22s, color .22s, transform .22s cubic-bezier(.4,0,.2,1);
}
.fc-wishlist-btn:hover, .fc-wishlist-btn.active {
  border-color: #ef4444;
  color: #ef4444;
  transform: scale(1.1);
}
.fc-wishlist-btn.active { background: #fef2f2; }

/* Image area */
.fc-img-wrap {
  height: clamp(160px, 20vw, 210px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 2.5vw, 24px);
  background: radial-gradient(circle at 50% 30%, rgba(6,182,212,0.1) 0%, rgba(241,245,249,0.6) 70%, transparent 100%);
  position: relative;
  overflow: hidden;
}
.fc-img-wrap::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(6,182,212,0.2), transparent);
}
.fc-card-img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  transition: transform .45s cubic-bezier(.4,0,.2,1);
  filter: drop-shadow(0 8px 20px rgba(0,0,0,0.1));
}
.fc-card:hover .fc-card-img {
  transform: scale(1.1) rotate(-1deg);
  filter: drop-shadow(0 14px 28px rgba(6,182,212,0.2));
}

/* Floating quick actions */
.fc-quick-actions {
  position: absolute;
  bottom: 14px;
  right: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  opacity: 0;
  transform: translateX(10px);
  transition: opacity .25s, transform .25s cubic-bezier(.4,0,.2,1);
  z-index: 4;
}
.fc-card:hover .fc-quick-actions {
  opacity: 1;
  transform: translateX(0);
}
.fc-qa-btn {
  width: 34px; height: 34px;
  border-radius: 10px;
  border: 1.5px solid rgba(226,232,240,0.9);
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  font-size: 15px;
  color: #475569;
  transition: border-color .18s, color .18s, background .18s, transform .18s;
}
.fc-qa-btn:hover {
  border-color: #06B6D4;
  color: #06B6D4;
  background: rgba(6,182,212,0.08);
  transform: scale(1.1);
}

/* Card body */
.fc-card-body {
  padding: clamp(14px, 2vw, 18px) clamp(14px, 2vw, 20px) 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.fc-brand {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #06B6D4;
  margin-bottom: 6px;
}
.fc-title {
  font-size: clamp(13px, 1.4vw, 15px);
  font-weight: 600;
  color: #1e293b;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
  flex: 1;
}

/* Stock */
.fc-stock {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  font-weight: 600;
  color: #10b981;
  margin-bottom: 10px;
}
.fc-stock-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px rgba(16,185,129,0.5);
}

/* Price */
.fc-price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 4px;
}
.fc-price {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(18px, 2.2vw, 22px);
  font-weight: 800;
  color: #0f172a;
}
.fc-price-orig {
  font-size: 13px;
  color: #94a3b8;
  text-decoration: line-through;
}
.fc-savings {
  font-size: 11px;
  font-weight: 700;
  color: #10b981;
  background: rgba(16,185,129,0.1);
  border-radius: 6px;
  padding: 2px 7px;
}

/* Add to cart */
.fc-cart-wrap {
  padding: clamp(10px, 1.5vw, 14px) clamp(14px, 2vw, 20px) clamp(14px, 2vw, 18px);
}
.fc-add-cart {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px;
  background: #0f172a;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(12px, 1.3vw, 13.5px);
  font-weight: 700;
  cursor: pointer;
  letter-spacing: .02em;
  min-height: 44px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity .28s cubic-bezier(.4,0,.2,1), transform .28s cubic-bezier(.4,0,.2,1), background .2s;
}
.fc-card:hover .fc-add-cart {
  opacity: 1;
  transform: translateY(0);
}
.fc-add-cart:hover { background: #06B6D4; }
.fc-add-cart i { font-size: 16px; }

/* ── Toast ───────────────────────────────── */
.fc-toast {
  position: fixed;
  bottom: 28px;
  right: 28px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(15,23,42,.94);
  color: #fff;
  padding: 14px 18px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  backdrop-filter: blur(12px);
  box-shadow: 0 18px 40px rgba(15,23,42,.25);
  z-index: 9999;
  opacity: 0;
  transform: translateY(20px) scale(.96);
  pointer-events: none;
  transition: opacity .3s, transform .3s cubic-bezier(.34,1.56,.64,1);
}
.fc-toast.show {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.fc-toast i {
  color: #22c55e;
  font-size: 18px;
}

/* ── Tablet (≤1024px) ────────────────────── */
@media (max-width: 1024px) {
  .fc-inner {
    max-width: 95%;
  }
  .fc-grid-cards {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
  }
}

/* ── Mobile (≤768px) ─────────────────────── */
@media (max-width: 768px) {
  .fc-inner {
    max-width: 100%;
    padding: 0 20px;
  }
  .fc-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .fc-view-all {
    align-self: flex-start;
    margin-top: 0;
  }
  .fc-grid-cards {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
  /* Always show cart & quick actions on touch devices */
  .fc-add-cart {
    opacity: 1;
    transform: translateY(0);
  }
  .fc-quick-actions {
    opacity: 1;
    transform: translateX(0);
  }
  /* Toast centers on mobile */
  .fc-toast {
    right: 50%;
    transform: translateX(50%) translateY(20px) scale(.96);
    bottom: 20px;
    width: calc(100% - 40px);
    justify-content: center;
  }
  .fc-toast.show {
    transform: translateX(50%) translateY(0) scale(1);
  }
}

/* ── Small mobile (≤480px) ───────────────── */
@media (max-width: 480px) {
  .fc-grid-cards {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .fc-card {
    min-height: 320px;
    border-radius: 14px;
  }
  .fc-img-wrap {
    height: 140px;
    padding: 14px;
  }
  .fc-card-body {
    padding: 12px 12px 0;
  }
  .fc-cart-wrap {
    padding: 10px 12px 14px;
  }
  .fc-heading {
    font-size: 1.5rem;
  }
  .fc-subtitle {
    display: none;
  }
  .fc-filters {
    gap: 6px;
  }
  .fc-filter-btn {
    padding: 6px 12px;
    font-size: 12px;
    min-height: 38px;
  }
}

/* ── Tiny (≤360px) ───────────────────────── */
@media (max-width: 360px) {
  .fc-grid-cards {
    grid-template-columns: 1fr;
  }
  .fc-card {
    min-height: auto;
  }
}
      `}</style>

      <section className="fc-section">
        {/* Decor */}
        <div className="fc-blob fc-blob-1" />
        <div className="fc-blob fc-blob-2" />
        <div className="fc-grid" />

        <div className="fc-inner">
          {/* Header */}
          <div className="fc-header">
            <div>
              <div className="fc-eyebrow">
                <div className="fc-eyebrow-line" />
                Top Picks
              </div>
              <h2 className="fc-heading">
                Featured <span>Products</span>
              </h2>
              <p className="fc-subtitle">
                Industrial-grade tools and refrigeration solutions trusted by HVAC professionals.
              </p>
            </div>
            <button className="fc-view-all" onClick={() => navigate("/featured-products")}>
              View All Products
              <i className="ri-arrow-right-line" />
            </button>
          </div>

          {/* Filters */}
          <div className="fc-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`fc-filter-btn${activeFilter === f ? " active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="fc-grid-cards">
            {visibleProducts.map((product, i) => (
              <div
                className="fc-card"
                key={product.id}
                onClick={() => navigate("/featured-product-details", { state: product })}
              >
                {/* Badge */}
                <div className="fc-badge">{product.badge}</div>

                {/* Wishlist */}
                <button
                  className={`fc-wishlist-btn${wishlist.some((item) => item.id === product.id) ? " active" : ""}`}
                  onClick={(e) => toggleWishlist(e, product)}
                  aria-label="Toggle wishlist"
                >
                  <i className={wishlist.some((item) => item.id === product.id) ? "ri-heart-3-fill" : "ri-heart-3-line"} />
                </button>

                {/* Image */}
                <div className="fc-img-wrap">
                  <img
                    className="fc-card-img"
                    src={product.image}
                    alt={product.title}
                  />

                  {/* Quick actions */}
                  <div className="fc-quick-actions">
                    <button
                      className="fc-qa-btn"
                      title="Quick view"
                      onClick={(e) => { e.stopPropagation(); navigate("/featured-product-details", { state: product }); }}
                    >
                      <i className="ri-eye-line" />
                    </button>
                    <button
                      className="fc-qa-btn"
                      title="Add to cart"
                      onClick={(e) => addToCart(e, product)}
                    >
                      <i className="ri-shopping-cart-2-line" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="fc-card-body">
                  <div className="fc-brand">{product.brand}</div>
                  <div className="fc-title">{product.title}</div>

                  <div className="fc-stock">
                    <div className="fc-stock-dot" />
                    In Stock · Fast Shipping
                  </div>

                  <div className="fc-price-row">
                    <span className="fc-price">{product.price}</span>
                    {product.originalPrice && (
                      <span className="fc-price-orig">{product.originalPrice}</span>
                    )}
                    <span className="fc-savings">{product.savings}</span>
                  </div>
                </div>

                {/* Add to cart */}
                <div className="fc-cart-wrap">
                  <button className="fc-add-cart" onClick={(e) => addToCart(e, product)}>
                    <i className="ri-shopping-cart-2-line" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}