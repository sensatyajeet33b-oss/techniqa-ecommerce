import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import {
  toggleWishlistItem,
  isInWishlist
} from "../../utils/wishlist";

/* ── Static review data ─────────────────────────────────────────────────── */
const REVIEWS = [
  { name: "Rajesh Kumar", role: "HVAC Technician, Delhi", stars: 5, text: "Exceptional build quality. Handles high-load refrigerant recovery effortlessly. Highly recommended for field professionals." },
  { name: "Sunil Mehta", role: "AC Service Engineer, Mumbai", stars: 5, text: "Solid performance, exactly as described. The precision on this unit is remarkable for the price point." },
  { name: "Priya Sharma", role: "Facility Manager, Bengaluru", stars: 4, text: "Great product. Shipping was fast and packaging was excellent. Would buy again from Tecniqa." },
];

const HIGHLIGHTS = [
  { icon: "ri-building-2-line", text: "Heavy-duty industrial construction" },
  { icon: "ri-focus-3-line", text: "High-precision performance gauges" },
  { icon: "ri-run-line", text: "Compact & portable field design" },
  { icon: "ri-flashlight-line", text: "Energy-efficient operation" },
  { icon: "ri-tools-line", text: "Designed for HVACR professionals" },
  { icon: "ri-shield-check-line", text: "ISO-certified build standards" },
];

const TABS = ["Description", "Specifications", "Reviews", "Shipping"];

export default function CollectionDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [wishlist, setWishlist] = useState(
    state?.id
      ? isInWishlist(state.id)
      : false
  );
  const [addedToCart, setAddedToCart] = useState(false);

  const images = state?.images || [state?.image, state?.image, state?.image, state?.image];

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(images[0]);
  }, []);

  if (!state) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px", fontFamily: "DM Sans, sans-serif" }}>
        <i className="ri-error-warning-line" style={{ fontSize: 48, color: "#94a3b8" }} />
        <p style={{ marginTop: 16, color: "#64748b" }}>Product not found.</p>
        <button onClick={() => navigate(-1)} style={{ marginTop: 20, padding: "10px 24px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#fff", cursor: "pointer" }}>Go Back</button>
      </div>
    );
  }

  const numericPrice = Number((state.price || "38500").replace(/[₹Rs.,\s]/g, ""));

  const handleWishlist = () => {

    const updated =
      toggleWishlistItem({
        ...state,
        image: selectedImage
      });

    const exists =
      updated.some((i) => i.id === state.id);

    setWishlist(exists);

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  const addToCart = () => {

    const cart =
      JSON.parse(localStorage.getItem("cart") || "[]");

    const existing =
      cart.find((i) => i.title === state.title);

    if (existing) {

      existing.qty += qty;

    } else {

      cart.push({
        title: state.title,
        image: selectedImage,
        price: numericPrice,
        qty
      });

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    /* 🔥 ADD THIS */
    window.dispatchEvent(
      new Event("cartUpdated")
    );

    setAddedToCart(true);

    setTimeout(
      () => setAddedToCart(false),
      2200
    );
  };

  const specs = [
    { label: "Brand", value: state.brand || "Premium HVACR" },
    { label: "Category", value: "HVACR Equipment" },
    { label: "SKU", value: "HVAC-" + (9200 + Math.floor(Math.random() * 99)) },
    { label: "Availability", value: "In Stock · Only 8 left" },
    { label: "Warranty", value: "1 Year Manufacturer Warranty" },
    { label: "Certifications", value: "ISO 9001, CE Certified" },
    { label: "Weight", value: "4.2 kg" },
    { label: "Country", value: "Made in USA / Germany" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cd-root {
          --brand: #06B6D4;
          --brand-dark: #0e7490;
          --ink: #0f172a;
          --ink-mid: #475569;
          --ink-soft: #94a3b8;
          --border: rgba(226,232,240,0.8);
          --ff-display: 'Barlow Condensed', sans-serif;
          --ff-body: 'Inter', sans-serif;
          font-family: var(--ff-body);
          color: var(--ink);
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 40%);
          min-height: 100vh;
        }

        /* ── Page inner ── */
        .cd-page {
        
          max-width: 1400px;
          margin: 0 auto;
          padding: 32px 40px 96px;
          margin-top:95px;
        }

        /* ── Breadcrumb ── */
        .cd-breadcrumb {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          color: var(--ink-soft);
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .cd-breadcrumb a {
          color: var(--ink-soft);
          text-decoration: none;
          transition: color .18s;
          cursor: pointer;
        }
        .cd-breadcrumb a:hover { color: var(--brand); }
        .cd-breadcrumb-sep { font-size: 11px; }
        .cd-breadcrumb-current { color: var(--ink-mid); font-weight: 600; }

        /* ── Back btn ── */
        .cd-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--ink-mid);
          background: none;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          padding: 8px 16px;
          cursor: pointer;
          font-family: var(--ff-body);
          transition: border-color .2s, color .2s;
          margin-bottom: 24px;
        }
        .cd-back:hover { border-color: var(--brand); color: var(--brand); }

        /* ══ MAIN LAYOUT ══════════════════════════════════════ */
        .cd-main {
          display: flex;
          gap: 52px;
          align-items: flex-start;
        }

        /* ── LEFT: Gallery ── */
        .cd-gallery {
          width: 48%;
          flex-shrink: 0;
          display: flex;
          gap: 14px;
        }
        .cd-thumbs {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cd-thumb {
          width: 68px; height: 68px;
          border-radius: 14px;
          border: 2px solid transparent;
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(8px);
          overflow: hidden;
          cursor: pointer;
          padding: 6px;
          transition: border-color .2s, transform .2s cubic-bezier(.4,0,.2,1), box-shadow .2s;
        }
        .cd-thumb:hover { transform: scale(1.06); }
        .cd-thumb.active {
          border-color: var(--brand);
          box-shadow: 0 0 0 3px rgba(6,182,212,0.18);
        }
        .cd-thumb img { width: 100%; height: 100%; object-fit: contain; }

        /* Main image */
        .cd-main-img {
          flex: 1;
          min-height: 480px;
          border-radius: 24px;
          background: radial-gradient(circle at 50% 35%, rgba(6,182,212,0.1) 0%, rgba(241,245,249,0.7) 65%, transparent 100%);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          box-shadow: 0 8px 32px rgba(15,23,42,0.07);
        }
        .cd-main-img .iiz__img {
        //   filter: drop-shadow(0 20px 40px rgba(0,0,0,0.14));
          transition: filter .3s;
        }
        .cd-main-img:hover .iiz__img {
        //   filter: drop-shadow(0 28px 50px rgba(6,182,212,0.2));
        }

        /* Wishlist floating btn */
        .cd-wish-btn {
          position: absolute;
          top: 16px; right: 16px;
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 1.5px solid var(--border);
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          font-size: 18px;
          color: var(--ink-soft);
          transition: border-color .2s, color .2s, transform .2s cubic-bezier(.4,0,.2,1);
          z-index: 2;
        }
        .cd-wish-btn:hover, .cd-wish-btn.active { border-color: #ef4444; color: #ef4444; transform: scale(1.12); }
        .cd-wish-btn.active { background: #fef2f2; }

        /* ── RIGHT: Details (sticky) ── */
        .cd-details {
          flex: 1;
          position: sticky;
          top: 110px;
        }

        /* Badge row */
        .cd-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
        .cd-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .07em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 100px;
        }
        .cd-badge-sale { background: linear-gradient(135deg,#06B6D4,#2563EB); color: #fff; }
        .cd-badge-stock { background: rgba(16,185,129,0.1); color: #10b981; border: 1px solid rgba(16,185,129,0.25); }
        .cd-badge-new { background: rgba(245,158,11,0.1); color: #f59e0b; border: 1px solid rgba(245,158,11,0.25); }

        /* Title */
        .cd-title {
          font-family: var(--ff-display);
          font-size: clamp(1.9rem, 3vw, 2.8rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -.025em;
          margin-bottom: 10px;
        }

        /* Brand */
        .cd-brand {
          font-size: 13.5px;
          color: var(--ink-soft);
          margin-bottom: 12px;
        }
        .cd-brand span { color: var(--brand); font-weight: 700; }

        /* Rating */
        .cd-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .cd-stars { display: flex; gap: 2px; }
        .cd-star { font-size: 15px; color: #FBBF24; }
        .cd-star.empty { color: #e2e8f0; }
        .cd-rating-val { font-size: 14px; font-weight: 700; color: var(--ink); }
        .cd-rating-count { font-size: 13px; color: var(--ink-soft); }

        /* Divider */
        .cd-sep { height: 1px; background: var(--border); margin: 20px 0; }

        /* Price */
        .cd-price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 6px; flex-wrap: wrap; }
        .cd-price {
          font-family: var(--ff-display);
          font-size: 36px;
          font-weight: 800;
          color: var(--ink);
          line-height: 1;
        }
        .cd-price-orig { font-size: 18px; color: var(--ink-soft); text-decoration: line-through; }
        .cd-price-save {
          font-size: 12px; font-weight: 700; color: #10b981;
          background: rgba(16,185,129,0.1);
          border-radius: 8px;
          padding: 3px 9px;
        }
        .cd-price-sub { font-size: 12px; color: var(--ink-soft); margin-bottom: 20px; }

        /* Low stock */
        .cd-low-stock {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          font-weight: 700;
          color: #ef4444;
          background: rgba(239,68,68,0.07);
          border-radius: 8px;
          padding: 5px 12px;
          margin-bottom: 20px;
        }
        .cd-low-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 0 0 6px #ef4444;
          animation: cdPulse 1.4s ease infinite;
        }
        @keyframes cdPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.65)} }

        /* Quantity */
        .cd-qty-row { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
        .cd-qty-label { font-size: 13.5px; font-weight: 600; color: var(--ink-mid); }
        .cd-qty-ctrl { display: flex; align-items: center; gap: 0; border: 1.5px solid var(--border); border-radius: 12px; overflow: hidden; }
        .cd-qty-btn {
          width: 38px; height: 40px;
          border: none;
          background: #f8fafc;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          color: var(--ink-mid);
          transition: background .18s, color .18s;
          display: flex; align-items: center; justify-content: center;
        }
        .cd-qty-btn:hover { background: rgba(6,182,212,0.08); color: var(--brand); }
        .cd-qty-val { padding: 0 18px; font-size: 15px; font-weight: 700; color: var(--ink); min-width: 44px; text-align: center; }

        /* CTA buttons */
        .cd-cta-row { display: flex; gap: 12px; margin-bottom: 20px; }
        .cd-btn-cart {
          flex: 1;
          display: flex; align-items: center; justify-content: center; gap: 9px;
          padding: 14px 20px;
          border-radius: 14px;
          border: 2px solid var(--brand);
          background: transparent;
          color: var(--brand);
          font-family: var(--ff-body);
          font-size: 14.5px;
          font-weight: 700;
          cursor: pointer;
          transition: background .22s, color .22s, transform .22s cubic-bezier(.4,0,.2,1), box-shadow .22s;
        }
        .cd-btn-cart:hover {
          background: rgba(6,182,212,0.08);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(6,182,212,0.2);
        }
        .cd-btn-cart.added {
          background: var(--brand);
          color: #fff;
        }
        .cd-btn-buy {
          flex: 1.2;
          display: flex; align-items: center; justify-content: center; gap: 9px;
          padding: 14px 24px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #fff;
          font-family: var(--ff-body);
          font-size: 14.5px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 6px 24px rgba(15,23,42,0.25);
          transition: transform .22s cubic-bezier(.4,0,.2,1), box-shadow .22s;
          position: relative;
          overflow: hidden;
        }
        .cd-btn-buy::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity .2s;
        }
        .cd-btn-buy:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(15,23,42,0.35);
        }
        .cd-btn-buy:hover::after { opacity: 1; }

        /* Payment strip */
        .cd-payment-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .cd-pay-icon {
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 5px 10px;
          font-size: 12px;
          font-weight: 700;
          color: var(--ink-mid);
          letter-spacing: .04em;
        }

        /* Delivery info */
        .cd-delivery {
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .cd-delivery-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          color: var(--ink-mid);
        }
        .cd-delivery-item i { color: var(--brand); font-size: 17px; flex-shrink: 0; }

        /* Trust badges */
        .cd-trust {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .cd-trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: var(--ink-mid);
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 5px 12px;
        }
        .cd-trust-item i { color: #10b981; font-size: 14px; }

        /* ══ LOWER CONTENT ════════════════════════════════════ */
        .cd-lower {
          margin-top: 72px;
          border-top: 1px solid var(--border);
          padding-top: 52px;
        }

        /* Tabs */
        .cd-tabs {
          display: flex;
          gap: 4px;
          margin-bottom: 40px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0;
        }
        .cd-tab {
          padding: 12px 22px;
          font-size: 14px;
          font-weight: 600;
          color: var(--ink-soft);
          cursor: pointer;
          border: none;
          background: none;
          font-family: var(--ff-body);
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          transition: color .2s, border-color .2s;
        }
        .cd-tab.active { color: var(--brand); border-bottom-color: var(--brand); }
        .cd-tab:hover { color: var(--ink); }

        /* Description tab */
        .cd-desc-body { font-size: 15.5px; color: var(--ink-mid); line-height: 1.85; margin-bottom: 36px; }
        .cd-highlights-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 28px;
        }
        .cd-hl-item {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          padding: 16px;
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 14px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--ink-mid);
          transition: border-color .2s, background .2s;
        }
        .cd-hl-item:hover { border-color: rgba(6,182,212,0.35); background: rgba(6,182,212,0.04); }
        .cd-hl-item i { color: var(--brand); font-size: 20px; flex-shrink: 0; margin-top: 1px; }

        /* Specs tab */
        .cd-spec-table { display: flex; flex-direction: column; gap: 0; border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
        .cd-spec-row {
          display: grid;
          grid-template-columns: 200px 1fr;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border);
          transition: background .15s;
        }
        .cd-spec-row:last-child { border-bottom: none; }
        .cd-spec-row:nth-child(odd) { background: #f8fafc; }
        .cd-spec-row:hover { background: rgba(6,182,212,0.04); }
        .cd-spec-key { font-size: 13.5px; font-weight: 700; color: var(--ink); }
        .cd-spec-val { font-size: 13.5px; color: var(--ink-mid); }

        /* Reviews tab */
        .cd-rev-summary {
          display: flex;
          align-items: center;
          gap: 28px;
          margin-bottom: 32px;
          padding: 24px 28px;
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 18px;
        }
        .cd-rev-big {
          font-family: var(--ff-display);
          font-size: 52px;
          font-weight: 800;
          color: var(--ink);
          line-height: 1;
        }
        .cd-rev-of { font-size: 13px; color: var(--ink-soft); margin-top: 4px; }
        .cd-reviews-list { display: flex; flex-direction: column; gap: 16px; }
        .cd-review-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px 24px;
          transition: box-shadow .2s;
        }
        .cd-review-card:hover { box-shadow: 0 8px 28px rgba(15,23,42,0.07); }
        .cd-rev-header { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
        .cd-rev-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--brand), #2563EB);
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          flex-shrink: 0;
        }
        .cd-rev-name { font-size: 14px; font-weight: 700; color: var(--ink); }
        .cd-rev-role { font-size: 12px; color: var(--ink-soft); }
        .cd-rev-text { font-size: 14px; color: var(--ink-mid); line-height: 1.7; margin-top: 4px; }

        /* Shipping tab */
        .cd-ship-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .cd-ship-card {
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .cd-ship-icon { font-size: 24px; color: var(--brand); }
        .cd-ship-title { font-size: 14.5px; font-weight: 700; color: var(--ink); }
        .cd-ship-body { font-size: 13.5px; color: var(--ink-mid); line-height: 1.6; }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .cd-page { padding: 24px 20px 80px; }
          .cd-main { flex-direction: column; gap: 32px; }
          .cd-gallery { width: 100%; }
          .cd-details { position: static; }
          .cd-highlights-grid { grid-template-columns: repeat(2,1fr); }
          .cd-ship-grid { grid-template-columns: 1fr; }
          .cd-spec-row { grid-template-columns: 140px 1fr; }
        }
        @media (max-width: 600px) {
          .cd-highlights-grid { grid-template-columns: 1fr; }
          .cd-cta-row { flex-direction: column; }
          .cd-rev-summary { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="cd-root">
        <div className="cd-page">

          {/* Breadcrumb */}
          <nav className="cd-breadcrumb">
            <a onClick={() => navigate("/")}>Home</a>
            <span className="cd-breadcrumb-sep">›</span>
            <a onClick={() => navigate(-1)}>Collections</a>
            <span className="cd-breadcrumb-sep">›</span>
            <span className="cd-breadcrumb-current">{state.title}</span>
          </nav>

          {/* Back */}
          <button className="cd-back" onClick={() => navigate(-1)}>
            <i className="ri-arrow-left-line" /> Back
          </button>

          {/* ══ MAIN ══ */}
          <div className="cd-main">

            {/* LEFT — Gallery */}
            <div className="cd-gallery">
              <div className="cd-thumbs">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className={`cd-thumb${selectedImage === img ? " active" : ""}`}
                    onMouseEnter={() => setSelectedImage(img)}
                  >
                    <img src={img} alt="" />
                  </div>
                ))}
              </div>

              <div className="cd-main-img">
                <button
                  className={`cd-wish-btn${wishlist ? " active" : ""}`}
                  onClick={handleWishlist}
                >
                  <i className={wishlist ? "ri-heart-3-fill" : "ri-heart-3-line"} />
                </button>
                {selectedImage && (
                  <InnerImageZoom
                    src={selectedImage}
                    zoomSrc={selectedImage}
                    zoomType="hover"
                    zoomScale={1.5}
                    hideHint
                    width={400}
                    height={420}
                    imgAttributes={{ style: { objectFit: "contain", width: "100%", height: "100%" } }}
                  />
                )}
              </div>
            </div>

            {/* RIGHT — Details */}
            <div className="cd-details">

              {/* Badges */}
              <div className="cd-badges">
                <span className="cd-badge cd-badge-sale">20% OFF</span>
                <span className="cd-badge cd-badge-stock"><i className="ri-checkbox-circle-fill" /> In Stock</span>
                <span className="cd-badge cd-badge-new">New Arrival</span>
              </div>

              {/* Title */}
              <h1 className="cd-title">{state.title}</h1>

              {/* Brand */}
              <p className="cd-brand">
                Brand: <span>{state.brand || "Premium HVACR"}</span>
                &nbsp;·&nbsp; SKU: HVAC-9284
              </p>

              {/* Rating */}
              <div className="cd-rating">
                <div className="cd-stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={`cd-star${s > 4 ? " empty" : ""}`}>★</span>
                  ))}
                </div>
                <span className="cd-rating-val">4.8</span>
                <span className="cd-rating-count">· 124 reviews</span>
              </div>

              <div className="cd-sep" />

              {/* Price */}
              <div className="cd-price-row">
                <span className="cd-price">{state.price || "₹38,500"}</span>
                {state.oldPrice && <span className="cd-price-orig">{state.oldPrice}</span>}
                <span className="cd-price-save">Save ₹9,500</span>
              </div>
              <p className="cd-price-sub">Inclusive of all taxes · Free shipping on this order</p>

              {/* Low stock */}
              <div className="cd-low-stock">
                <div className="cd-low-dot" />
                Only 8 units left in stock
              </div>

              {/* Quantity */}
              <div className="cd-qty-row">
                <span className="cd-qty-label">Quantity</span>
                <div className="cd-qty-ctrl">
                  <button className="cd-qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                  <span className="cd-qty-val">{qty}</span>
                  <button className="cd-qty-btn" onClick={() => setQty(qty + 1)}>+</button>
                </div>
              </div>

              {/* CTAs */}
              <div className="cd-cta-row">
                <button className={`cd-btn-cart${addedToCart ? " added" : ""}`} onClick={addToCart}>
                  <i className={addedToCart ? "ri-check-line" : "ri-shopping-cart-2-line"} />
                  {addedToCart ? "Added!" : "Add to Cart"}
                </button>
                <button className="cd-btn-buy" onClick={() => { addToCart(); navigate("/checkout"); }}>
                  <i className="ri-flashlight-line" />
                  Buy Now
                </button>
              </div>

              {/* Payment strip */}
              <div className="cd-payment-strip">
                {["VISA", "MC", "UPI", "Razorpay", "NetBanking"].map((p) => (
                  <span className="cd-pay-icon" key={p}>{p}</span>
                ))}
              </div>

              {/* Delivery info */}
              <div className="cd-delivery">
                <div className="cd-delivery-item"><i className="ri-truck-line" /><span><strong>Delivery in 3–5 business days</strong> · Pan India shipping</span></div>
                <div className="cd-delivery-item"><i className="ri-gift-2-line" /><span><strong>Free shipping</strong> on orders above ₹1,000</span></div>
                <div className="cd-delivery-item"><i className="ri-arrow-go-back-line" /><span><strong>7-day hassle-free returns</strong> · No questions asked</span></div>
                <div className="cd-delivery-item"><i className="ri-lock-2-line" /><span><strong>Secure checkout</strong> · 256-bit SSL encryption</span></div>
              </div>

              {/* Trust badges */}
              <div className="cd-trust">
                {["Genuine Product", "Warranty Included", "Industrial Grade", "Certified"].map((t) => (
                  <span className="cd-trust-item" key={t}><i className="ri-shield-check-line" />{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ══ LOWER TABS ══════════════════════════════════════ */}
          <div className="cd-lower">
            <div className="cd-tabs">
              {TABS.map((t) => (
                <button key={t} className={`cd-tab${activeTab === t ? " active" : ""}`} onClick={() => setActiveTab(t)}>{t}</button>
              ))}
            </div>

            {/* Description */}
            {activeTab === "Description" && (
              <div>
                <p className="cd-desc-body">
                  <strong>{state.title}</strong> is engineered using advanced HVACR technology to deliver exceptional efficiency, reliability, and professional-grade performance. Designed for field professionals and industrial servicing environments, this equipment is built to handle the demands of refrigeration diagnostics, air-conditioning maintenance, and cooling system servicing — all with precision and durability at its core.
                </p>
                <p className="cd-desc-body">
                  Whether you're a certified HVAC technician or a facilities engineer, this unit provides the control, accuracy, and longevity you need for mission-critical work across a wide range of refrigerants and cooling systems.
                </p>
                <div className="cd-highlights-grid">
                  {HIGHLIGHTS.map((h) => (
                    <div className="cd-hl-item" key={h.text}>
                      <i className={h.icon} />
                      {h.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications */}
            {activeTab === "Specifications" && (
              <div className="cd-spec-table">
                {specs.map((s) => (
                  <div className="cd-spec-row" key={s.label}>
                    <span className="cd-spec-key">{s.label}</span>
                    <span className="cd-spec-val">{s.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews */}
            {activeTab === "Reviews" && (
              <div>
                <div className="cd-rev-summary">
                  <div>
                    <div className="cd-rev-big">4.8</div>
                    <div className="cd-stars" style={{ marginTop: 6 }}>
                      {[1, 2, 3, 4, 5].map((s) => <span key={s} className={`cd-star${s > 4 ? " empty" : ""}`}>★</span>)}
                    </div>
                    <div className="cd-rev-of">Based on 124 verified reviews</div>
                  </div>
                </div>
                <div className="cd-reviews-list">
                  {REVIEWS.map((r) => (
                    <div className="cd-review-card" key={r.name}>
                      <div className="cd-rev-header">
                        <div className="cd-rev-avatar">{r.name[0]}</div>
                        <div>
                          <div className="cd-rev-name">{r.name}</div>
                          <div className="cd-rev-role">{r.role}</div>
                        </div>
                        <div className="cd-stars" style={{ marginLeft: "auto" }}>
                          {[1, 2, 3, 4, 5].map((s) => <span key={s} className={`cd-star${s > r.stars ? " empty" : ""}`}>★</span>)}
                        </div>
                      </div>
                      <p className="cd-rev-text">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping */}
            {activeTab === "Shipping" && (
              <div className="cd-ship-grid">
                {[
                  { icon: "ri-truck-line", title: "Standard Delivery", body: "3–5 business days via trusted courier partners. Available pan-India." },
                  { icon: "ri-flashlight-line", title: "Express Delivery", body: "1–2 business days available in select metro cities. Extra charges apply." },
                  { icon: "ri-arrow-go-back-line", title: "Easy Returns", body: "7-day return window. Raise a request and we'll arrange a pickup." },
                  { icon: "ri-shield-check-line", title: "Secure Packaging", body: "All products shipped in reinforced, tamper-proof industrial packaging." },
                ].map((s) => (
                  <div className="cd-ship-card" key={s.title}>
                    <i className={`${s.icon} cd-ship-icon`} />
                    <div className="cd-ship-title">{s.title}</div>
                    <div className="cd-ship-body">{s.body}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}