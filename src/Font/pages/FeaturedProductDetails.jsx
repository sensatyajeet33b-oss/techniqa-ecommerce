import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import "../styles/FeaturedProductDetails.css";
import {
  getWishlist,
  toggleWishlistItem,
  isInWishlist
} from "../../utils/wishlist";

/* ================================================================
   STATIC DATA
   ================================================================ */

const TABS = ["Description", "Specifications", "Reviews", "Shipping"];

const FEATURES = [
  { icon: "ri-flashlight-line", label: "Industrial-grade performance" },
  { icon: "ri-shield-line", label: "Precision engineered build" },
  { icon: "ri-box-3-line", label: "Compact portable design" },
  { icon: "ri-temp-cold-line", label: "All refrigerant compatible" },
  { icon: "ri-speed-line", label: "High-efficiency operation" },
  { icon: "ri-user-star-line", label: "Trusted by HVAC professionals" },
];

const FAKE_REVIEWS = [
  { name: "Arun K.", stars: 5, date: "14 Mar 2025", text: "Excellent build quality — exactly what our commercial refrigeration fleet needed. Performs flawlessly." },
  { name: "Priya S.", stars: 5, date: "2 Feb 2025", text: "Arrived well-packaged and ahead of schedule. Very professional performance in field conditions." },
  { name: "Rajesh M.", stars: 4, date: "18 Nov 2024", text: "Solid and reliable. Would have loved a more detailed manual, but the hardware is top-notch." },
];

const RATING_BARS = [
  { label: "5★", pct: 68 }, { label: "4★", pct: 18 },
  { label: "3★", pct: 8 }, { label: "2★", pct: 4 }, { label: "1★", pct: 2 },
];

const DELIVERY_ITEMS = [
  { icon: "ri-truck-line", text: "Delivery in 3–5 business days" },
  { icon: "ri-gift-line", text: "Free shipping above ₹1,000" },
  { icon: "ri-lock-line", text: "Secure checkout" },
  { icon: "ri-arrow-go-back-line", text: "Easy 7-day returns" },
];

const TRUST_BADGES = [
  { icon: "ri-shield-check-line", label: "Genuine Product" },
  { icon: "ri-medal-line", label: "ISO Certified" },
  { icon: "ri-headphone-line", label: "Fast Support" },
  { icon: "ri-award-line", label: "Warranty Included" },
];

const PAYMENT_METHODS = ["Visa", "Mastercard", "UPI", "Razorpay", "Net Banking"];

const SHIPPING_INFO = [
  { icon: "ri-truck-line", title: "Standard Delivery", desc: "3–5 business days across India. Free on orders above ₹1,000." },
  { icon: "ri-timer-flash-line", title: "Express Delivery", desc: "1–2 days available in select cities at additional cost." },
  { icon: "ri-arrow-go-back-line", title: "Returns & Refunds", desc: "7-day hassle-free return for defective or incorrect items." },
  { icon: "ri-lock-line", title: "Secure Packaging", desc: "All products shipped with tamper-proof industrial packaging." },
];

/* ── Helpers ── */
function Stars({ rating, size = 15 }) {
  const f = Math.floor(rating), h = rating % 1 >= 0.5;
  return <span className="fp-stars" style={{ fontSize: size }}>{"★".repeat(f)}{h ? "½" : ""}{"☆".repeat(5 - f - (h ? 1 : 0))}</span>;
}

function parsePriceToNum(raw = "") {
  return Number(String(raw).replace(/[₹Rs.,\s]/g, "")) || 0;
}

function formatPrice(num) {
  return `₹${Number(num).toLocaleString("en-IN")}`;
}

/* ================================================================
   COMPONENT
   ================================================================ */

export default function FeaturedProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const topRef = useRef(null);

  const [selImg, setSelImg] = useState("");
  const [qty, setQty] = useState(1);
  const [wishlisted, setWish] = useState(
    state?.id
      ? isInWishlist(state.id)
      : false
  );
  const [activeTab, setTab] = useState("Description");
  const [cartAnim, setCartAnim] = useState(false);
  const [topVis, setTopVis] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    text: ""
  });

  /* Scroll to top */
  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* Set initial image */
  useEffect(() => {
    if (state?.image) setSelImg(state.image);
  }, [state?.image]);

  /* Entry animation */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTopVis(true); obs.unobserve(e.target); } },
      { threshold: 0.04 }
    );
    if (topRef.current) obs.observe(topRef.current);
    return () => obs.disconnect();
  }, []);

  /* Guard — after all hooks */
  if (!state) {
    return (
      <div style={{ padding: "80px 5%", fontFamily: "DM Sans,sans-serif", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <h2 style={{ fontWeight: 800, color: "#0f172a" }}>Product not found</h2>
        <button onClick={() => navigate(-1)} style={{ marginTop: 16, padding: "10px 24px", borderRadius: 12, border: "none", background: "#06b6d4", color: "white", fontWeight: 700, cursor: "pointer" }}>Go Back</button>
      </div>
    );
  }

  /* Derived */
  const images = state.image ? [state.image] : [];
  const numPrice = parsePriceToNum(state.price) || 38500;
  const numOld = parsePriceToNum(state.oldPrice) || 0;
  const discountPct = numOld > numPrice ? Math.round((1 - numPrice / numOld) * 100) : 0;
  const rating = state.rating || 4.8;
  const reviewCount = state.reviews || 94;

  const specs = [
    ["Brand", state.brand || "—"],
    ["Category", state.category || "Featured Product"],
    ["SKU", state.sku || `FP-${String(state.title || "").slice(0, 4).toUpperCase()}-001`],
    ["Availability", state.stock || "In Stock"],
    ["Warranty", "1 Year"],
    ["Country of Origin", "Germany"],
  ];

  /* Cart */
  const showToast = (text) => {

    setToast({
      show: true,
      text
    });

    setTimeout(() => {
      setToast({
        show: false,
        text: ""
      });
    }, 2800);
  };

  const toggleWishlist = () => {

    const updated =
      toggleWishlistItem(state);

    const exists =
      updated.some((i) => i.id === state.id);

    setWish(exists);

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );

    showToast(
      exists
        ? "Added to wishlist!"
        : "Removed from wishlist!"
    );
  };

  const addToCart = (goCheckout = false) => {

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existing =
      cart.find((i) => i.title === state.title);

    if (existing) {

      existing.qty += qty;

    } else {

      cart.push({
        title: state.title,
        image: selImg,
        price: numPrice,
        oldPrice: numOld,
        qty
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

    if (goCheckout) {

      navigate("/checkout");

    } else {

      setCartAnim(true);

      showToast("Added to cart successfully!");;

      setTimeout(
        () => setCartAnim(false),
        1300
      );
    }
  };

  return (
    <>
      {/* Toast */}
      <div className={`fp-toast${toast.show ? " show" : ""}`}>
        <i className="ri-checkbox-circle-fill" />
        {toast.text}
      </div>

      <div className="fp-page">
        <div className="fp-orb fp-orb-1" />
        <div className="fp-orb fp-orb-2" />

        <div className="fp-inner">

          {/* Breadcrumbs */}
          <nav className="fp-breadcrumbs">
            <a href="/">Home</a>
            <i className="fp-bc-sep ri-arrow-right-s-line" />
            <a href="/">Featured Products</a>
            {state.brand && (
              <>
                <i className="fp-bc-sep ri-arrow-right-s-line" />
                <a href="#">{state.brand}</a>
              </>
            )}
            <i className="fp-bc-sep ri-arrow-right-s-line" />
            <span className="fp-bc-curr">{state.title}</span>
          </nav>

          {/* Back */}
          <button className="fp-back" onClick={() => navigate(-1)}>
            <i className="ri-arrow-left-line" />Back
          </button>

          {/* Featured badge */}
          <div className="fp-featured-strip">
            <i className="ri-star-line" />
            Featured Product
          </div>

          {/* ── TOP SPLIT ── */}
          <div ref={topRef} className={`fp-top${topVis ? " fp-visible" : ""}`}>

            {/* IMAGE PANEL */}
            <div className="fp-img-panel">
              {/* Corner actions */}
              <div className="fp-img-actions">
                <button
                  className={`fp-img-btn${wishlisted ? " wishlisted" : ""}`}
                  title="Wishlist"
                  onClick={toggleWishlist}
                >
                  <i className={wishlisted ? "ri-heart-fill" : "ri-heart-line"} />
                </button>
                <button className="fp-img-btn" title="Share">
                  <i className="ri-share-line" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="fp-thumbs">
                {images.length > 0 ? images.map((img, i) => (
                  <div
                    key={i}
                    className={`fp-thumb${selImg === img ? " active" : ""}`}
                    onMouseEnter={() => setSelImg(img)}
                    onClick={() => setSelImg(img)}
                  >
                    <img src={img} alt={`thumb-${i}`} />
                  </div>
                )) : (
                  <div className="fp-thumb-placeholder">
                    <i className="ri-image-line" />
                  </div>
                )}
              </div>

              {/* Main image */}
              <div className="fp-main-img">
                {selImg ? (
                  <InnerImageZoom
                    src={selImg} zoomSrc={selImg}
                    zoomType="hover" zoomScale={1.8} hideHint
                    imgAttributes={{
                      alt: state.title,
                      style: { maxWidth: "100%", maxHeight: 380, objectFit: "contain" },
                    }}
                  />
                ) : (
                  <div style={{ fontSize: 64, color: "rgba(6,182,212,0.3)" }}>
                    <i className="ri-image-2-line" />
                  </div>
                )}
              </div>
            </div>

            {/* DETAILS PANEL */}
            <div className="fp-details-panel">
              <div className="fp-details-sticky">

                {/* Brand + genuine */}
                <div className="fp-brand-row">
                  {state.brand && <span className="fp-brand-tag">{state.brand}</span>}
                  <span className="fp-genuine-tag"><i className="ri-shield-check-fill" />Genuine</span>
                </div>

                {/* Title */}
                <h1 className="fp-title">{state.title}</h1>

                {/* Rating */}
                <div className="fp-rating-row">
                  <Stars rating={rating} />
                  <span className="fp-rating-num">{rating}</span>
                  <span className="fp-rating-sep">·</span>
                  <span className="fp-rating-cnt">{reviewCount} Reviews</span>
                </div>

                {/* Stock */}
                <div className="fp-stock-row">
                  <span className="fp-stock-dot" />
                  <span className="fp-stock-txt">{state.stock || "In Stock"}</span>
                  {state.units && <span className="fp-stock-scarcity">— Only {state.units} left</span>}
                </div>

                <div className="fp-divider" />

                {/* Price */}
                <div className="fp-price-block">
                  <div className="fp-price-inner">
                    <span className="fp-price-main">{formatPrice(numPrice)}</span>
                    {numOld > 0 && <span className="fp-price-old">{formatPrice(numOld)}</span>}
                    {discountPct > 0 && <span className="fp-price-badge">Save {discountPct}%</span>}
                  </div>
                  <span className="fp-price-tax">Inclusive of all taxes</span>
                </div>

                {/* Quantity */}
                <div className="fp-qty-row">
                  <span className="fp-qty-label">Quantity</span>
                  <div className="fp-qty-ctrl">
                    <button className="fp-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty === 1}>
                      <i className="ri-subtract-line" />
                    </button>
                    <span className="fp-qty-num">{qty}</span>
                    <button className="fp-qty-btn" onClick={() => setQty(q => q + 1)}>
                      <i className="ri-add-line" />
                    </button>
                  </div>
                </div>

                {/* CTAs */}
                <div className="fp-cta-row">
                  <button
                    className="fp-btn-cart"
                    onClick={() => addToCart(false)}
                    style={cartAnim ? { transform: "scale(0.96)" } : {}}
                  >
                    <i className={cartAnim ? "ri-checkbox-circle-line" : "ri-shopping-cart-line"} />
                    {cartAnim ? "Added!" : "Add to Cart"}
                  </button>
                  <button className="fp-btn-buy" onClick={() => addToCart(true)}>
                    <i className="ri-flashlight-line" />Buy Now
                  </button>
                </div>

                {/* Payment */}
                <div className="fp-payment-strip">
                  <span className="fp-pay-label">Pay via</span>
                  {PAYMENT_METHODS.map(m => <span key={m} className="fp-pay-pill">{m}</span>)}
                </div>

                {/* Delivery */}
                <div className="fp-delivery-grid">
                  {DELIVERY_ITEMS.map(({ icon, text }) => (
                    <div key={text} className="fp-delivery-item"><i className={icon} /><span>{text}</span></div>
                  ))}
                </div>

                {/* Trust */}
                <div className="fp-trust-row">
                  {TRUST_BADGES.map(({ icon, label }) => (
                    <span key={label} className="fp-trust-badge"><i className={icon} />{label}</span>
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* META ROW */}
          <div className="fp-meta-row">
            <span className="fp-meta-item">Category: <span>{state.category || "Featured Product"}</span></span>
            <span className="fp-meta-item">Brand: <span>{state.brand || "—"}</span></span>
            <span className="fp-meta-item">Status: <span>{state.stock || "In Stock"}</span></span>
            <span className="fp-meta-item">Tags: <span>Industrial, HVAC, Refrigeration</span></span>
          </div>

          {/* TABS */}
          <div className="fp-tabs-wrap">
            <div className="fp-tab-nav">
              {TABS.map(t => (
                <button key={t} className={`fp-tab-btn${activeTab === t ? " active" : ""}`} onClick={() => setTab(t)}>{t}</button>
              ))}
            </div>

            <div className="fp-tab-body">

              {activeTab === "Description" && (
                <>
                  <p className="fp-desc-text">
                    Designed for demanding HVACR servicing and industrial refrigeration environments,
                    {state.title ? ` the ${state.title}` : " this featured product"} delivers
                    precision, long-term reliability, and consistent performance under the toughest
                    field conditions. Built for professionals who require industrial-grade durability
                    and accuracy in every operation.
                  </p>
                  <div className="fp-features-grid">
                    {FEATURES.map(({ icon, label }) => (
                      <div key={label} className="fp-feature-item"><i className={icon} />{label}</div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === "Specifications" && (
                <div className="fp-specs-table">
                  {specs.map(([k, v]) => (
                    <div key={k} className="fp-spec-row">
                      <span className="fp-spec-key">{k}</span>
                      <span className="fp-spec-val">{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "Reviews" && (
                <>
                  <div className="fp-review-summary">
                    <div>
                      <div className="fp-review-big">{rating}</div>
                      <div className="fp-review-big-stars"><Stars rating={rating} size={20} /></div>
                      <div className="fp-review-big-cnt">{reviewCount} verified ratings</div>
                    </div>
                    <div className="fp-review-bars">
                      {RATING_BARS.map(({ label, pct }) => (
                        <div key={label} className="fp-bar-row">
                          <span style={{ minWidth: 22 }}>{label}</span>
                          <div className="fp-bar-track"><div className="fp-bar-fill" style={{ width: `${pct}%` }} /></div>
                          <span>{pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="fp-reviews-list">
                    {FAKE_REVIEWS.map((r, i) => (
                      <div key={i} className="fp-review-card">
                        <div className="fp-review-top">
                          <span className="fp-reviewer">{r.name}</span>
                          <span className="fp-review-dt">{r.date}</span>
                        </div>
                        <div className="fp-rev-stars">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
                        <p className="fp-rev-text">{r.text}</p>
                        <span className="fp-verified"><i className="ri-shield-check-fill" />Verified Purchase</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === "Shipping" && (
                <div className="fp-ship-list">
                  {SHIPPING_INFO.map(({ icon, title, desc }) => (
                    <div key={title} className="fp-ship-item">
                      <div className="fp-ship-icon"><i className={icon} /></div>
                      <div><div className="fp-ship-title">{title}</div><div className="fp-ship-desc">{desc}</div></div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </>
  );
}