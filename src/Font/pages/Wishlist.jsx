import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Wishlist.css";

/* ── helpers ── */
function fmt(val) {
  if (!val) return "—";
  if (typeof val === "number") return `₹${val.toLocaleString("en-IN")}`;
  // already formatted string like "₹3,150" or "Rs. 47,900"
  return val;
}

function discountPct(price, oldPrice) {
  const p = typeof price === "number" ? price : Number(String(price || "").replace(/[₹Rs.,\s]/g, ""));
  const o = typeof oldPrice === "number" ? oldPrice : Number(String(oldPrice || "").replace(/[₹Rs.,\s]/g, ""));
  if (!o || o <= p) return 0;
  return Math.round((1 - p / o) * 100);
}

function Stars({ r = 4.8 }) {
  const f = Math.floor(r), h = r % 1 >= 0.5;
  return (
    <span style={{ color: "#f59e0b", fontSize: 12, letterSpacing: 1 }}>
      {"★".repeat(f)}{h ? "½" : ""}{"☆".repeat(5 - f - (h ? 1 : 0))}
    </span>
  );
}

/* ── card ── */
function WishlistCard({ item, onRemove, onMoveToCart, delay }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVis(true), delay);
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  const pct = discountPct(item.price, item.oldPrice);

  return (
    <div ref={ref} className={`wl-card${vis ? " wl-vis" : ""}`} style={{ transitionDelay: `${delay}ms` }}>

      {/* Saved badge */}
      <span className="wl-saved-badge">
        <i className="ri-heart-fill" />Saved
      </span>

      {/* Hover quick actions */}
      <div className="wl-card-actions" onClick={e => e.stopPropagation()}>
        <button className="wl-action-btn" title="Quick View"><i className="ri-eye-line" /></button>
        <button className="wl-action-btn" title="Share"><i className="ri-share-line" /></button>
        <button className="wl-action-btn remove" title="Remove from Wishlist" onClick={() => onRemove(item.id)}>
          <i className="ri-delete-bin-line" />
        </button>
      </div>

      {/* Image */}
      <div className="wl-card-img">
        {item.image
          ? <img src={item.image} alt={item.title} />
          : <i className="ri-image-line" style={{ fontSize: 40, color: "rgba(6,182,212,0.3)" }} />
        }
      </div>

      {/* Body */}
      <div className="wl-card-body">
        {item.brand && <span className="wl-card-brand">{item.brand}</span>}
        <p className="wl-card-title">{item.title}</p>

        {/* Stock */}
        <div className="wl-stock-row">
          <span className="wl-stock-dot" />
          <span>{item.stock || "In Stock"}</span>
          <span className="wl-ship-tag">· Fast Shipping</span>
        </div>

        {/* Price */}
        <div className="wl-price-row">
          <span className="wl-price-main">{fmt(item.price)}</span>
          {item.oldPrice && <span className="wl-price-old">{fmt(item.oldPrice)}</span>}
          {pct > 0 && <span className="wl-price-badge">{pct}% OFF</span>}
        </div>

        {/* Stars */}
        {item.rating && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#64748b" }}>
            <Stars r={item.rating} />
            <span>{item.rating} {item.reviews ? `(${item.reviews})` : ""}</span>
          </div>
        )}

        {/* Date saved */}
        {item.savedAt && (
          <span className="wl-saved-on">
            <i className="ri-time-line" style={{ marginRight: 3 }} />
            Saved {new Date(item.savedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="wl-card-footer">
        <button className="wl-btn-cart" onClick={() => onMoveToCart(item)}>
          <i className="ri-shopping-cart-line" />Move to Cart
        </button>
        <button className="wl-btn-remove" onClick={() => onRemove(item.id)}>
          <i className="ri-heart-off-line" />Remove
        </button>
      </div>
    </div>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState({ text: "", icon: "success" });

  useEffect(() => {

    document.title =
      "Wishlist | Tecniqa";

  }, []);

  /* Load */
  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
  }, []);

  /* Toast helper */
  const showToast = (text, icon = "success") => {
    setToastMsg({ text, icon });
    setToast(true);
    setTimeout(() => setToast(false), 2800);
  };

  /* Remove */
  const removeItem = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlist(updated);
    window.dispatchEvent(new Event("wishlistUpdated"));
    showToast("Removed from wishlist", "info");
  };

  /* Move to cart */
  const moveToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const numPrice = typeof item.price === "number"
      ? item.price
      : Number(String(item.price || "").replace(/[₹Rs.,\s]/g, ""));
    const existing = cart.find(c => c.title === item.title);
    if (existing) { existing.qty += 1; }
    else { cart.push({ title: item.title, image: item.image, price: numPrice, oldPrice: item.oldPrice, qty: 1 }); }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(
      new Event("cartUpdated")
    );

    // Remove from wishlist
    removeItem(item.id);
    showToast(`${item.title?.slice(0, 28)}… moved to cart`, "success");
  };

  return (
    <>
      {/* Toast */}
      <div className={`wl-toast${toast ? " show" : ""}`}>
        <i className={`${toastMsg.icon === "success" ? "ri-checkbox-circle-fill success" : "ri-information-line info"}`} />
        {toastMsg.text}
      </div>

      <div className="wl-page">
        <div className="wl-orb wl-orb-1" />
        <div className="wl-orb wl-orb-2" />

        {/* ── HERO ── */}
        <div className="wl-hero">
          <div className="wl-hero-left">
            <div className="wl-eyebrow">
              <span className="wl-eyebrow-dot" />
              Your Collection
            </div>
            <h1 className="wl-title">
              Saved <span>Favorites</span>
            </h1>
            <p className="wl-subtitle">
              Products you loved and saved for later — revisit anytime and move them to your cart when you're ready.
            </p>
          </div>

          <div className="wl-hero-right">
            {wishlist.length > 0 && (
              <span className="wl-count-pill">
                <i className="ri-heart-fill" />
                {wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}
              </span>
            )}
            <button className="wl-btn-shop" onClick={() => navigate("/")}>
              <i className="ri-store-line" />Continue Shopping
            </button>
          </div>
        </div>

        <div className="wl-inner">

          {/* ── EMPTY ── */}
          {wishlist.length === 0 ? (
            <div className="wl-empty">
              <div className="wl-empty-icon">
                <i className="ri-heart-line" />
              </div>
              <div className="wl-empty-title">Your Wishlist Feels Empty</div>
              <div className="wl-empty-sub">
                Save products you love by tapping the heart icon — they'll appear here for later.
              </div>
              <button className="wl-empty-btn" onClick={() => navigate("/")}>
                <i className="ri-store-2-line" />Explore Products
              </button>
            </div>
          ) : (
            <div className="wl-grid">
              {wishlist.map((item, i) => (
                <WishlistCard
                  key={item.id}
                  item={item}
                  delay={i * 80}
                  onRemove={removeItem}
                  onMoveToCart={moveToCart}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}