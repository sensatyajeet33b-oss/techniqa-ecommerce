import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import "./ProductGroup.css";
import {
  toggleWishlistItem,
  isInWishlist
} from "../../utils/wishlist";

import TubeBender from "../assets/Tube-Bender.png";
import VacuumPump from "../assets/Vacuum-Pump.png";
import CleaningChemicals from "../assets/Cleaning-Chemicals.png";
import CraneTemper from "../assets/Crane-Temper.png";
import RefrigerantLeakSolutions from "../assets/Refrigerant-Leak-Solutions.png";
import LeakMonitors from "../assets/Leak-Monitors.png";
import PhaseChangeMaterials from "../assets/Phase-Change-Materials.png";

/* ================================================================
   DATA
   ================================================================ */

const products = [
  {
    id: 1,
    title: "Inner Spring Bender",
    group: "Tube Bender",
    brand: "Ecoab",
    sku: "ECO-TB-001",
    price: "₹175",
    oldPrice: "₹370",
    discount: "Save 53%",
    stock: "In Stock",
    units: 83,
    rating: 4.7, reviews: 52,
    images: [TubeBender, VacuumPump, CleaningChemicals, CraneTemper],
    description: "The Ecoab Inner Spring Bender delivers professional-grade tube bending with zero kinking or deformation. Engineered for HVAC technicians who require consistent, repeatable bends in copper and aluminium refrigerant lines across commercial servicing applications.",
    features: [
      { icon: "ri-tools-line", label: "Heavy-duty industrial build" },
      { icon: "ri-focus-3-line", label: "High precision bending" },
      { icon: "ri-box-3-line", label: "Compact portable design" },
      { icon: "ri-leaf-line", label: "Energy efficient operation" },
      { icon: "ri-shield-line", label: "Corrosion resistant alloy" },
      { icon: "ri-user-star-line", label: "Trusted by HVAC professionals" },
    ],
    specs: [
      ["Brand", "Ecoab"],
      ["Category", "Tube Bender"],
      ["Material", "Hardened Alloy Steel"],
      ["Compatibility", "Copper / Aluminium tubes"],
      ["Warranty", "1 Year"],
      ["Country of Origin", "Germany"],
      ["Availability", "In Stock — 83 units"],
      ["SKU", "ECO-TB-001"],
    ],
  },
  {
    id: 2,
    title: "Bullet Vacuum Pump",
    group: "Vacuum Pump",
    brand: "Yellow Jacket",
    sku: "YJ-VP-2402",
    price: "₹93,900",
    oldPrice: "₹1,08,900",
    discount: "Save 14%",
    stock: "In Stock",
    units: null,
    rating: 4.9, reviews: 118,
    images: [VacuumPump, TubeBender, CleaningChemicals, LeakMonitors],
    description: "The Yellow Jacket Bullet Vacuum Pump delivers powerful high-efficiency evacuation with a whisper-quiet dual-stage motor. Built for HVAC professionals demanding sub-500-micron deep vacuum performance with field-proven durability in commercial and industrial refrigeration environments.",
    features: [
      { icon: "ri-flashlight-line", label: "Dual-stage high vacuum" },
      { icon: "ri-sound-module-line", label: "Ultra-quiet motor" },
      { icon: "ri-speed-line", label: "Fast evacuation speed" },
      { icon: "ri-box-3-line", label: "Rugged portable casing" },
      { icon: "ri-drop-line", label: "Oil backflow prevention" },
      { icon: "ri-temp-cold-line", label: "HVAC / refrigeration certified" },
    ],
    specs: [
      ["Brand", "Yellow Jacket"],
      ["Category", "Vacuum Pump"],
      ["Motor", "Dual-Stage"],
      ["Vacuum Level", "< 500 Micron"],
      ["Displacement", "8 CFM"],
      ["Warranty", "2 Years"],
      ["Country of Origin", "USA"],
      ["SKU", "YJ-VP-2402"],
    ],
  },
  {
    id: 3,
    title: "Luxedo Chemical",
    group: "Cleaning Chemicals",
    brand: "Errecom",
    sku: "ERC-CC-LUX",
    price: "₹14,500",
    oldPrice: "₹23,500",
    discount: "Save 38%",
    stock: "In Stock",
    units: null,
    rating: 4.6, reviews: 87,
    images: [CleaningChemicals, VacuumPump, TubeBender, CraneTemper],
    description: "Errecom Luxedo is a professional-grade HVAC coil cleaner formulated to dissolve stubborn grease, scale and biofilm deposits without damaging aluminium or copper fins. Safe for indoor and outdoor use — trusted by technicians across Europe and Asia.",
    features: [
      { icon: "ri-flask-line", label: "Non-corrosive formula" },
      { icon: "ri-recycle-line", label: "Biodegradable & eco-safe" },
      { icon: "ri-water-flash-line", label: "Rapid foaming action" },
      { icon: "ri-shield-check-line", label: "Safe on all coil metals" },
      { icon: "ri-global-line", label: "EU & REACH compliant" },
      { icon: "ri-contrast-drop-line", "label": "Rinse-free formulation" },
    ],
    specs: [
      ["Brand", "Errecom"],
      ["Category", "Cleaning Chemicals"],
      ["Volume", "5 Litres"],
      ["pH Value", "6.5 – 7.5 (neutral)"],
      ["Application", "Evaporator & condenser coils"],
      ["Warranty", "N/A"],
      ["Country of Origin", "Italy"],
      ["SKU", "ERC-CC-LUX"],
    ],
  },
  {
    id: 4,
    title: "Transfer Fluid",
    group: "Crane Temper",
    brand: "Crane Temper",
    sku: "CT-TF-380",
    price: "₹380",
    oldPrice: "₹1,200",
    discount: "Save 68%",
    stock: "In Stock",
    units: 43,
    rating: 4.5, reviews: 29,
    images: [CraneTemper, TubeBender, VacuumPump, CleaningChemicals],
    description: "Crane Temper Transfer Fluid is a high-performance heat transfer medium designed for industrial refrigeration loops, chiller systems, and secondary cooling circuits. Offers exceptional thermal stability across a wide operating temperature range.",
    features: [
      { icon: "ri-temp-hot-line", label: "Wide temperature range" },
      { icon: "ri-shield-line", label: "Anti-corrosion additives" },
      { icon: "ri-leaf-line", label: "Low environmental impact" },
      { icon: "ri-drop-line", label: "Low viscosity formula" },
      { icon: "ri-speed-line", label: "High thermal conductivity" },
      { icon: "ri-stack-line", label: "Compatible with most metals" },
    ],
    specs: [
      ["Brand", "Crane Temper"],
      ["Category", "Heat Transfer Fluid"],
      ["Volume", "1 Litre"],
      ["Operating Temp.", "-30°C to +120°C"],
      ["Application", "Chiller & refrigeration loops"],
      ["Warranty", "N/A"],
      ["Country of Origin", "Sweden"],
      ["SKU", "CT-TF-380"],
    ],
  },
  {
    id: 5,
    title: "Extreme Ultra Refrigerant Leak Sealant",
    group: "Refrigerant Leak Solutions",
    brand: "Errecom",
    sku: "ERC-LS-XUL",
    price: "₹2,200",
    oldPrice: "₹3,500",
    discount: "Save 37%",
    stock: "In Stock",
    units: 60,
    rating: 4.8, reviews: 74,
    images: [RefrigerantLeakSolutions, TubeBender, VacuumPump, CleaningChemicals],
    description: "Errecom Extreme Ultra is a next-generation refrigerant leak sealant that permanently seals micro-leaks in copper, aluminium, and brazed joints without any system disassembly. Trusted by HVAC technicians across industrial and commercial applications.",
    features: [
      { icon: "ri-drop-line", label: "Permanent micro-leak seal" },
      { icon: "ri-settings-3-line", label: "No system disassembly" },
      { icon: "ri-shield-check-line", label: "Compatible with all refrigerants" },
      { icon: "ri-recycle-line", label: "Non-flammable & eco-safe" },
      { icon: "ri-timer-flash-line", label: "Fast acting — under 30 mins" },
      { icon: "ri-global-line", label: "ASHRAE & REACH approved" },
    ],
    specs: [
      ["Brand", "Errecom"],
      ["Category", "Refrigerant Leak Solutions"],
      ["Volume", "250 ml"],
      ["Compatibility", "All refrigerant types"],
      ["Application", "Copper, aluminium, brazed joints"],
      ["Warranty", "N/A"],
      ["Country of Origin", "Italy"],
      ["SKU", "ERC-LS-XUL"],
    ],
  },
  {
    id: 6,
    title: "Refrigerant Gas Leak Detector",
    group: "Leak Monitors",
    brand: "Accutools",
    sku: "ACT-LD-GAS",
    price: "₹18,150",
    oldPrice: "₹34,500",
    discount: "Save 47%",
    stock: "In Stock",
    units: null,
    rating: 4.9, reviews: 143,
    images: [LeakMonitors, VacuumPump, TubeBender, CleaningChemicals],
    description: "The Accutools Refrigerant Gas Leak Detector uses advanced heated diode sensing to detect all common refrigerants at concentrations as low as 3 ppm. Delivers fast, accurate leak location with an ergonomic probe design suited for tight access areas in commercial HVAC systems.",
    features: [
      { icon: "ri-sensor-line", label: "Heated diode sensor" },
      { icon: "ri-focus-3-line", label: "3 ppm sensitivity" },
      { icon: "ri-sound-module-line", label: "Audio + visual alert" },
      { icon: "ri-battery-charge-line", "label": "Long battery life" },
      { icon: "ri-hand-coin-line", label: "Ergonomic flexible probe" },
      { icon: "ri-refresh-line", label: "Auto-zeroing baseline" },
    ],
    specs: [
      ["Brand", "Accutools"],
      ["Category", "Leak Monitors"],
      ["Sensor Type", "Heated Diode"],
      ["Sensitivity", "3 ppm minimum"],
      ["Refrigerant Support", "All HFC / HFO / HCFC"],
      ["Warranty", "1 Year"],
      ["Country of Origin", "USA"],
      ["SKU", "ACT-LD-GAS"],
    ],
  },
  {
    id: 7,
    title: "Phase Change Material",
    group: "Phase Change Materials",
    brand: "Errecom",
    sku: "ERC-PCM-130",
    price: "₹130",
    oldPrice: "₹500",
    discount: "Save 74%",
    stock: "In Stock",
    units: 353,
    rating: 4.4, reviews: 36,
    images: [PhaseChangeMaterials, TubeBender, VacuumPump, CleaningChemicals],
    description: "Errecom Phase Change Material is a high-performance thermal storage medium used in cold chain, HVAC buffer tanks, and energy management systems. Provides stable latent heat storage at precise transition temperatures, reducing peak energy load significantly.",
    features: [
      { icon: "ri-temp-cold-line", label: "Precise phase transition temp." },
      { icon: "ri-battery-line", label: "High latent heat capacity" },
      { icon: "ri-recycle-line", label: "Fully recyclable" },
      { icon: "ri-shield-line", label: "Non-toxic & non-corrosive" },
      { icon: "ri-timer-line", label: "Reduces peak energy load" },
      { icon: "ri-stack-line", label: "Multiple form factors available" },
    ],
    specs: [
      ["Brand", "Errecom"],
      ["Category", "Phase Change Materials"],
      ["Transition Temp.", "Customisable"],
      ["Latent Heat", "> 200 kJ/kg"],
      ["Application", "Cold chain, HVAC buffer"],
      ["Warranty", "N/A"],
      ["Country of Origin", "Italy"],
      ["SKU", "ERC-PCM-130"],
    ],
  },
];

const fakeReviews = [
  { name: "Rajesh M.", stars: 5, date: "12 Mar 2025", text: "Excellent build quality. Exactly what we needed for our commercial HVAC fleet." },
  { name: "Priya S.", stars: 5, date: "28 Jan 2025", text: "Arrived well-packaged. Works perfectly — very professional performance." },
  { name: "Arun Kumar", stars: 4, date: "5 Nov 2024", text: "Good product. Would have loved a detailed instruction booklet but the unit itself is solid." },
];

const TABS = ["Description", "Specifications", "Reviews", "Shipping"];

const deliveryItems = [
  { icon: "ri-truck-line", text: "Delivery in 3–5 business days" },
  { icon: "ri-gift-line", text: "Free shipping above ₹1,000" },
  { icon: "ri-lock-line", text: "Secure checkout" },
  { icon: "ri-arrow-go-back-line", text: "Easy 7-day returns" },
];

const trustBadges = [
  { icon: "ri-shield-check-line", label: "Genuine Product" },
  { icon: "ri-medal-line", label: "ISO Certified" },
  { icon: "ri-headphone-line", label: "Fast Support" },
  { icon: "ri-award-line", label: "Warranty Included" },
];

const paymentMethods = ["Visa", "Mastercard", "UPI", "Razorpay", "Net Banking"];

const shippingDetails = [
  { icon: "ri-truck-line", title: "Standard Delivery", desc: "3–5 business days across India. Free on orders above ₹1,000." },
  { icon: "ri-timer-flash-line", title: "Express Delivery", desc: "1–2 days available in select cities at additional cost." },
  { icon: "ri-arrow-go-back-line", title: "Returns & Refunds", desc: "7-day hassle-free return for defective or incorrect items." },
  { icon: "ri-lock-line", title: "Secure Packaging", desc: "All industrial products shipped with tamper-proof packaging." },
];

/* ================================================================
   STARS HELPER
   ================================================================ */

function Stars({ rating, size = 15 }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="pg-stars" style={{ fontSize: size }}>
      {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

/* ================================================================
   SINGLE PRODUCT BLOCK
   ================================================================ */

function ProductBlock({ product }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedImg, setSelectedImg] = useState(product.images[0]);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [wishlisted, setWishlisted] =
    useState(isInWishlist(product.id));
  const [cartAnim, setCartAnim] = useState(false);
  const [toast, setToast] = useState(false);

  const [toastMsg, setToastMsg] = useState("");
    useEffect(() => {
  
      document.title =
        "Product Details | Tecniqa";
  
    }, []);

  /* Entry animation */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.06 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  /* Cart logic */
  const addToCart = () => {

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const numericPrice =
      Number(product.price.replace(/[₹Rs.,\s]/g, ""));

    const existing =
      cart.find((i) => i.title === product.title);

    if (existing) {

      existing.qty += qty;

    } else {

      cart.push({
        title: product.title,
        image: selectedImg,
        price: numericPrice,
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

    showToast(
      `${product.title.slice(0, 28)}… added to cart`
    );

    setCartAnim(true);

    setTimeout(
      () => setCartAnim(false),
      1200
    );
  };

  const buyNow = () => { addToCart(); navigate("/checkout"); };
  const showToast = (text) => {

    setToastMsg(text);

    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 2600);
  };

  const handleWishlist = () => {

    const updated =
      toggleWishlistItem({
        ...product,
        image: selectedImg
      });

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

  /* Rating bar helper */
  const ratingBars = [
    { label: "5★", pct: 68 }, { label: "4★", pct: 18 },
    { label: "3★", pct: 8 }, { label: "2★", pct: 4 }, { label: "1★", pct: 2 },
  ];

  return (
    <>
      {/* Toast */}
      <div className={`pg-toast${toast ? " show" : ""}`}>
        <i className="ri-checkbox-circle-fill" />
        {toastMsg}
      </div>
      <div ref={cardRef} className={`pg-card${visible ? " pg-card-visible" : ""}`}>

        {/* ── TOP: image + details ── */}
        <div className="pg-top">

          {/* IMAGE PANEL */}
          <div className="pg-image-panel">
            {/* Thumbnails */}
            <div className="pg-thumbs">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className={`pg-thumb${selectedImg === img ? " active" : ""}`}
                  onMouseEnter={() => setSelectedImg(img)}
                  onClick={() => setSelectedImg(img)}
                >
                  <img src={img} alt={`thumb-${i}`} />
                </div>
              ))}
            </div>

            {/* Main image */}
            <div className="pg-main-img-wrap">
              {/* Wishlist + Share */}
              <div className="pg-img-actions">
                <button
                  className="pg-img-action-btn"
                  title={wishlisted ? "Remove wishlist" : "Add to wishlist"}
                  onClick={handleWishlist}
                  style={wishlisted ? { background: "#fee2e2", borderColor: "#fca5a5", color: "#dc2626" } : {}}
                >
                  <i className={wishlisted ? "ri-heart-fill" : "ri-heart-line"} />
                </button>
                <button className="pg-img-action-btn" title="Share">
                  <i className="ri-share-line" />
                </button>
              </div>

              <InnerImageZoom
                src={selectedImg}
                zoomSrc={selectedImg}
                zoomType="hover"
                zoomScale={1.6}
                hideHint
                imgAttributes={{
                  style: { maxWidth: "100%", maxHeight: 380, objectFit: "contain" },
                  alt: product.title,
                }}
              />
            </div>
          </div>

          {/* DETAILS PANEL */}
          <div className="pg-details-panel">
            <div className="pg-details-sticky">

              {/* Brand + verified */}
              <div className="pg-brand-row">
                <span className="pg-brand-tag">{product.brand}</span>
                <span className="pg-verified-tag"><i className="ri-shield-check-fill" />Genuine</span>
              </div>

              {/* Title */}
              <h1 className="pg-product-title">{product.title}</h1>

              {/* Ratings */}
              <div className="pg-rating-row">
                <Stars rating={product.rating} />
                <span className="pg-rating-num">{product.rating}</span>
                <span className="pg-rating-sep">·</span>
                <span className="pg-rating-count">{product.reviews} Reviews</span>
                <span className="pg-rating-sep">·</span>
                <span className="pg-rating-sku">SKU: {product.sku}</span>
              </div>

              {/* Stock */}
              <div className="pg-stock-row">
                <span className="pg-stock-dot" />
                <span className="pg-stock-label">{product.stock}</span>
                {product.units && (
                  <span className="pg-stock-scarcity">— Only {product.units} units left</span>
                )}
              </div>

              <div className="pg-divider" />

              {/* Price */}
              <div className="pg-price-block">
                <div className="pg-price-row-inner">
                  <span className="pg-price-main">{product.price}</span>
                  <span className="pg-price-old">{product.oldPrice}</span>
                  <span className="pg-price-badge">{product.discount}</span>
                </div>
                <span className="pg-price-tax">Inclusive of all taxes</span>
              </div>

              {/* Quantity */}
              <div className="pg-qty-row">
                <span className="pg-qty-label">Quantity</span>
                <div className="pg-qty-ctrl">
                  <button className="pg-qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                    <i className="ri-subtract-line" />
                  </button>
                  <span className="pg-qty-num">{qty}</span>
                  <button className="pg-qty-btn" onClick={() => setQty((q) => q + 1)}>
                    <i className="ri-add-line" />
                  </button>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="pg-cta-row">
                <button
                  className="pg-btn-cart"
                  onClick={addToCart}
                  style={cartAnim ? { transform: "scale(0.96)" } : {}}
                >
                  <i className={cartAnim ? "ri-checkbox-circle-line" : "ri-shopping-cart-line"} />
                  {cartAnim ? "Added!" : "Add to Cart"}
                </button>
                <button className="pg-btn-buy" onClick={buyNow}>
                  <i className="ri-flashlight-line" />
                  Buy Now
                </button>
              </div>

              {/* Payment strip */}
              <div className="pg-payment-strip">
                <span className="pg-payment-label">Pay via</span>
                {paymentMethods.map((m) => (
                  <span key={m} className="pg-payment-pill">{m}</span>
                ))}
              </div>

              {/* Delivery info */}
              <div className="pg-delivery-grid">
                {deliveryItems.map(({ icon, text }) => (
                  <div key={text} className="pg-delivery-item">
                    <i className={icon} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="pg-trust-row">
                {trustBadges.map(({ icon, label }) => (
                  <span key={label} className="pg-trust-badge">
                    <i className={icon} />{label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── META ROW ── */}
        <div className="pg-meta-row">
          <span className="pg-meta-item">SKU: <span>{product.sku}</span></span>
          <span className="pg-meta-item">Category: <span>{product.group}</span></span>
          <span className="pg-meta-item">Brand: <span>{product.brand}</span></span>
          <span className="pg-meta-item">Tags: <span>Industrial, HVAC, Refrigeration</span></span>
        </div>

        {/* ── TABS ── */}
        <div className="pg-tabs-wrap">
          <div className="pg-tab-nav">
            {TABS.map((t) => (
              <button
                key={t}
                className={`pg-tab-btn${activeTab === t ? " active" : ""}`}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="pg-tab-content">

            {activeTab === "Description" && (
              <>
                <p className="pg-desc-text">{product.description}</p>
                <div className="pg-features-grid">
                  {product.features.map(({ icon, label }) => (
                    <div key={label} className="pg-feature-item">
                      <i className={icon} />{label}
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "Specifications" && (
              <div className="pg-specs-table">
                {product.specs.map(([key, val]) => (
                  <div key={key} className="pg-spec-row">
                    <span className="pg-spec-key">{key}</span>
                    <span className="pg-spec-val">{val}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Reviews" && (
              <>
                <div className="pg-reviews-summary">
                  <div>
                    <div className="pg-review-big-num">{product.rating}</div>
                    <div className="pg-review-big-stars"><Stars rating={product.rating} size={22} /></div>
                    <div className="pg-review-big-count">{product.reviews} verified ratings</div>
                  </div>
                  <div className="pg-review-bars">
                    {ratingBars.map(({ label, pct }) => (
                      <div key={label} className="pg-review-bar-row">
                        <span style={{ minWidth: 22 }}>{label}</span>
                        <div className="pg-review-bar-track">
                          <div className="pg-review-bar-fill" style={{ width: `${pct}%` }} />
                        </div>
                        <span>{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pg-reviews-list">
                  {fakeReviews.map((r, i) => (
                    <div key={i} className="pg-review-card">
                      <div className="pg-review-header">
                        <span className="pg-reviewer-name">{r.name}</span>
                        <span className="pg-review-date">{r.date}</span>
                      </div>
                      <div className="pg-review-stars">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
                      <p className="pg-review-text">{r.text}</p>
                      <span className="pg-verified-badge"><i className="ri-shield-check-fill" />Verified Purchase</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "Shipping" && (
              <div className="pg-shipping-list">
                {shippingDetails.map(({ icon, title, desc }) => (
                  <div key={title} className="pg-shipping-item">
                    <div className="pg-shipping-icon"><i className={icon} /></div>
                    <div>
                      <div className="pg-shipping-title">{title}</div>
                      <div className="pg-shipping-desc">{desc}</div>
                    </div>
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

/* ================================================================
   PAGE
   ================================================================ */

export default function ProductGroup() {
  const { product } = useParams();
  const navigate = useNavigate();

  const label = product ? decodeURIComponent(product) : null;

  const filtered = label
    ? products.filter((p) => p.group.toLowerCase() === label.toLowerCase())
    : products;

  return (
    <div className="pg-page">

      {/* Breadcrumbs */}
      <nav className="pg-breadcrumbs">
        <a href="/">Home</a>
        <i className="pg-breadcrumb-sep ri-arrow-right-s-line" />
        <a href="/products">Products</a>
        {label && (
          <>
            <i className="pg-breadcrumb-sep ri-arrow-right-s-line" />
            <span className="pg-breadcrumb-current">{label}</span>
          </>
        )}
      </nav>

      {/* Page header */}
      <div className="pg-header">
        <h2 className="pg-page-title">
          {label ? <><span>{label}</span></> : "All Products"}
        </h2>
        <button className="pg-btn-back" onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-line" />
          Back
        </button>
      </div>

      {/* Products */}
      <div className="pg-stack">
        {filtered.map((p) => (
          <ProductBlock key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}