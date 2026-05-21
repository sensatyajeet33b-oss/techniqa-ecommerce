import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import "./ProductDetails.css";
import {
  toggleWishlistItem,
  isInWishlist
} from "../../utils/wishlist";

import NewArrivalsImage1 from "../assets/NewArrivals Image1.png";
import NewArrivalsImage2 from "../assets/NewArrivals Image2.png";
import NewArrivalsImage3 from "../assets/NewArrivals Image3.png";
import NewArrivalsImage4 from "../assets/NewArrivals Image4.png";

/* ================================================================
   DATA
   ================================================================ */

const products = [
  {
    id: 1,
    title: "Vortex Refrigerant Recovery Machine",
    brand: "Inficon",
    sku: "IFC-VX-RRM",
    category: "Recovery Machines",
    rating: 4.8, reviews: 126,
    price: 171600,
    oldPrice: 194900,
    discount: "Save 12%",
    stock: "In Stock",
    units: 8,
    images: [NewArrivalsImage1, NewArrivalsImage2, NewArrivalsImage3, NewArrivalsImage4],
    description: "Designed for professional HVAC technicians operating in commercial and industrial refrigeration environments, the Inficon Vortex delivers fast, reliable refrigerant recovery with dual-piston push-pull technology. Its robust steel housing and oil-less compressor system ensure long-term durability and consistent performance across demanding field operations.",
    features: [
      { icon: "ri-flashlight-line", label: "Dual-piston push-pull recovery" },
      { icon: "ri-shield-line", label: "Oil-less compressor system" },
      { icon: "ri-box-3-line", label: "Compact field-ready design" },
      { icon: "ri-temp-cold-line", label: "All refrigerant compatible" },
      { icon: "ri-speed-line", label: "High recovery flow rate" },
      { icon: "ri-user-star-line", label: "Trusted by HVAC professionals" },
    ],
    specs: [
      ["Brand", "Inficon"],
      ["Category", "Recovery Machines"],
      ["Motor Type", "Oil-less Dual Piston"],
      ["Refrigerants", "All HFC / HFO / HCFC"],
      ["Housing", "Heavy-gauge steel"],
      ["Warranty", "2 Years"],
      ["Origin", "Germany"],
      ["SKU", "IFC-VX-RRM"],
    ],
  },
  {
    id: 2,
    title: "MicroBluVac+ Digital Micron Gauge",
    brand: "Accutools",
    sku: "ACT-MBV-PLUS",
    category: "Vacuum Tools",
    rating: 4.9, reviews: 214,
    price: 23750,
    oldPrice: 45150,
    discount: "Save 47%",
    stock: "In Stock",
    units: null,
    images: [NewArrivalsImage2, NewArrivalsImage1, NewArrivalsImage3, NewArrivalsImage4],
    description: "The Accutools MicroBluVac+ is the definitive Bluetooth micron gauge for HVAC professionals who demand digital accuracy and wireless freedom. Featuring a 1 micron resolution Pirani sensor and real-time Bluetooth logging, it eliminates manual readings and integrates directly with the BluVac app for complete evacuation reporting.",
    features: [
      { icon: "ri-bluetooth-line", label: "Bluetooth real-time logging" },
      { icon: "ri-focus-3-line", label: "1 micron resolution sensor" },
      { icon: "ri-drop-line", label: "Triple evacuation ports" },
      { icon: "ri-battery-charge-line", "label": "Long-life rechargeable battery" },
      { icon: "ri-smartphone-line", label: "BluVac app integration" },
      { icon: "ri-shield-check-line", label: "NIST traceable calibration" },
    ],
    specs: [
      ["Brand", "Accutools"],
      ["Category", "Vacuum Tools"],
      ["Resolution", "1 Micron"],
      ["Sensor", "Pirani Thermal"],
      ["Connection", "Bluetooth 4.0"],
      ["Warranty", "1 Year"],
      ["Origin", "USA"],
      ["SKU", "ACT-MBV-PLUS"],
    ],
  },
  {
    id: 3,
    title: "Pilot+ Vacuum Gauge",
    brand: "Inficon",
    sku: "IFC-PLT-VG",
    category: "Vacuum Tools",
    rating: 4.7, reviews: 89,
    price: 48600,
    oldPrice: 55900,
    discount: "Save 13%",
    stock: "In Stock",
    units: 14,
    images: [NewArrivalsImage3, NewArrivalsImage1, NewArrivalsImage2, NewArrivalsImage4],
    description: "The Inficon Pilot+ is a precision wireless vacuum gauge engineered for commercial HVAC evacuation verification. Its compact ergonomic design houses a high-resolution thermocouple sensor and a bright OLED display that delivers clear readings even in low-light field conditions.",
    features: [
      { icon: "ri-wifi-line", label: "Wireless OLED display" },
      { icon: "ri-focus-3-line", label: "Thermocouple precision sensor" },
      { icon: "ri-box-3-line", label: "Ergonomic pocket design" },
      { icon: "ri-temp-cold-line", label: "Full refrigerant compatibility" },
      { icon: "ri-battery-line", label: "Extended battery life" },
      { icon: "ri-shield-line", label: "Industrial-grade housing" },
    ],
    specs: [
      ["Brand", "Inficon"],
      ["Category", "Vacuum Tools"],
      ["Sensor", "Thermocouple"],
      ["Display", "OLED Wireless"],
      ["Range", "0–25,000 micron"],
      ["Warranty", "2 Years"],
      ["Origin", "Germany"],
      ["SKU", "IFC-PLT-VG"],
    ],
  },
  {
    id: 4,
    title: "TEK-Mate Leak Detector",
    brand: "Inficon",
    sku: "IFC-TM-LD",
    category: "Leak Detectors",
    rating: 4.6, reviews: 173,
    price: 38500,
    oldPrice: 43778,
    discount: "Save 12%",
    stock: "In Stock",
    units: 6,
    images: [NewArrivalsImage4, NewArrivalsImage1, NewArrivalsImage2, NewArrivalsImage3],
    description: "The Inficon TEK-Mate is a professional-grade heated diode refrigerant leak detector built for fast, accurate pinpointing of refrigerant leaks in commercial HVAC and industrial refrigeration systems. Its flexible probe reaches into tight spaces where conventional detectors fail.",
    features: [
      { icon: "ri-sensor-line", label: "Heated diode sensor" },
      { icon: "ri-focus-3-line", label: "3 ppm detection sensitivity" },
      { icon: "ri-sound-module-line", label: "Audible + visual alarm" },
      { icon: "ri-hand-coin-line", label: "Flexible ergonomic probe" },
      { icon: "ri-battery-charge-line", "label": "Long battery runtime" },
      { icon: "ri-refresh-line", label: "Auto-zero baseline reset" },
    ],
    specs: [
      ["Brand", "Inficon"],
      ["Category", "Leak Detectors"],
      ["Sensor", "Heated Diode"],
      ["Sensitivity", "3 ppm minimum"],
      ["Refrigerants", "All HFC / HFO / HCFC"],
      ["Warranty", "1 Year"],
      ["Origin", "Germany"],
      ["SKU", "IFC-TM-LD"],
    ],
  },
];

const TABS = ["Description", "Specifications", "Reviews", "Shipping"];

const fakeReviews = [
  { name: "Arun K.", stars: 5, date: "14 Mar 2025", text: "Exceptional build quality — exactly what I needed for our commercial refrigeration fleet. Performs flawlessly." },
  { name: "Priya S.", stars: 5, date: "2 Feb 2025", text: "Arrived well-packaged and ahead of schedule. Very professional performance in field conditions." },
  { name: "Rajesh M.", stars: 4, date: "18 Nov 2024", text: "Solid product, very reliable. Would have loved a more detailed manual, but the hardware is top-notch." },
];

const ratingBars = [
  { label: "5★", pct: 68 }, { label: "4★", pct: 18 },
  { label: "3★", pct: 8 }, { label: "2★", pct: 4 }, { label: "1★", pct: 2 },
];

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

const shippingInfo = [
  { icon: "ri-truck-line", title: "Standard Delivery", desc: "3–5 business days across India. Free on orders above ₹1,000." },
  { icon: "ri-timer-flash-line", title: "Express Delivery", desc: "1–2 days available in select cities at additional cost." },
  { icon: "ri-arrow-go-back-line", title: "Returns & Refunds", desc: "7-day hassle-free return for defective or incorrect items." },
  { icon: "ri-lock-line", title: "Secure Packaging", desc: "All industrial products shipped with tamper-proof packaging." },
];

/* ── Helpers ── */
function Stars({ rating, size = 15 }) {
  const f = Math.floor(rating), h = rating % 1 >= 0.5;
  return <span className="pd-stars" style={{ fontSize: size }}>{"★".repeat(f)}{h ? "½" : ""}{"☆".repeat(5 - f - (h ? 1 : 0))}</span>;
}

function fmt(n) { return `₹${n.toLocaleString("en-IN")}`; }

/* ── Related card ── */
function RelCard({ p, onClick, delay }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.unobserve(e.target); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`pd-rel-card${vis ? " pd-rel-visible" : ""}`} style={{ transitionDelay: `${delay}ms` }} onClick={onClick}>
      <div className="pd-rel-img-wrap"><img src={p.images[0]} alt={p.title} /></div>
      <div className="pd-rel-body">
        <div className="pd-rel-brand">{p.brand}</div>
        <div className="pd-rel-title">{p.title}</div>
        <div className="pd-rel-price-row">
          <span className="pd-rel-price">{fmt(p.price)}</span>
          <span className="pd-rel-old">{fmt(p.oldPrice)}</span>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));
  const [selImg, setSelImg] = useState(product?.images?.[0]);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWish] = useState(
    product?.id
      ? isInWishlist(product.id)
      : false
  );
  const [activeTab, setTab] = useState("Description");
  const [cartAnim, setCartAnim] = useState(false);
  const [toast, setToast] = useState(false);

  const [toastMsg, setToastMsg] = useState("");
  const [topVis, setTopVis] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTopVis(true); obs.unobserve(e.target); } }, { threshold: 0.04 });
    if (topRef.current) obs.observe(topRef.current);
    return () => obs.disconnect();
  }, []);

  if (!product) {
    return (
      <div style={{ padding: "80px 5%", fontFamily: "DM Sans,sans-serif", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <h2 style={{ fontWeight: 800, color: "#0f172a" }}>Product not found</h2>
        <button onClick={() => navigate(-1)} style={{ marginTop: 16, padding: "10px 24px", borderRadius: 12, border: "none", background: "#06b6d4", color: "white", fontWeight: 700, cursor: "pointer" }}>Go Back</button>
      </div>
    );
  }

  const addToCart = (go = false) => {

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const numPrice = product.price;

    const existing =
      cart.find((i) => i.title === product.title);

    if (existing) {

      existing.qty += qty;

    } else {

      cart.push({
        title: product.title,
        image: selImg,
        price: numPrice,
        oldPrice: product.oldPrice,
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

    if (go) {

      navigate("/checkout");

    } else {

      setCartAnim(true);

      setTimeout(
        () => setCartAnim(false),
        1300
      );
    }
  };

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
        image: selImg
      });

    const exists =
      updated.some((i) => i.id === product.id);

    setWish(exists);

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );

    showToast(
      exists
        ? "Added to wishlist ❤️"
        : "Removed from wishlist"
    );
  };

  const related = products.filter((p) => p.id !== product.id);

  return (
    <div className="pd-page">
      {/* Toast */}
      <div className={`pd-toast${toast ? " show" : ""}`}>
        <i className="ri-checkbox-circle-fill" />
        {toastMsg}
      </div>
      <div className="pd-orb pd-orb-1" />
      <div className="pd-orb pd-orb-2" />

      <div className="pd-inner">

        {/* Breadcrumbs */}
        <nav className="pd-breadcrumbs">
          <a href="/">Home</a>
          <i className="pd-bc-sep ri-arrow-right-s-line" />
          <a href="/new-arrivals">New Arrivals</a>
          <i className="pd-bc-sep ri-arrow-right-s-line" />
          <a href="#">{product.brand}</a>
          <i className="pd-bc-sep ri-arrow-right-s-line" />
          <span className="pd-bc-curr">{product.title}</span>
        </nav>

        {/* Back */}
        <button className="pd-back" onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-line" />Back
        </button>

        {/* ── TOP SPLIT ── */}
        <div ref={topRef} className={`pd-top${topVis ? " pd-visible" : ""}`}>

          {/* IMAGE PANEL */}
          <div className="pd-img-panel">
            {/* Corner actions */}
            <div className="pd-img-actions">
              <button className={`pd-img-btn${wishlisted ? " wishlisted" : ""}`} title="Wishlist" onClick={handleWishlist}>
                <i className={wishlisted ? "ri-heart-fill" : "ri-heart-line"} />
              </button>
              <button className="pd-img-btn" title="Share"><i className="ri-share-line" /></button>
            </div>

            {/* Thumbnails */}
            <div className="pd-thumbs">
              {product.images.map((img, i) => (
                <div key={i} className={`pd-thumb${selImg === img ? " active" : ""}`}
                  onMouseEnter={() => setSelImg(img)} onClick={() => setSelImg(img)}>
                  <img src={img} alt={`thumb-${i}`} />
                </div>
              ))}
            </div>

            {/* Main image */}
            <div className="pd-main-img">
              <InnerImageZoom
                src={selImg} zoomSrc={selImg}
                zoomType="hover" zoomScale={2} hideHint
                imgAttributes={{ alt: product.title, style: { maxWidth: "100%", maxHeight: 380, objectFit: "contain" } }}
              />
            </div>
          </div>

          {/* DETAILS PANEL */}
          <div className="pd-details-panel">
            <div className="pd-details-sticky">

              {/* Brand + verified */}
              <div className="pd-brand-row">
                <span className="pd-brand-tag">{product.brand}</span>
                <span className="pd-genuine-tag"><i className="ri-shield-check-fill" />Genuine</span>
              </div>

              {/* Title */}
              <h1 className="pd-title">{product.title}</h1>

              {/* Ratings */}
              <div className="pd-rating-row">
                <Stars rating={product.rating} />
                <span className="pd-rating-num">{product.rating}</span>
                <span className="pd-rating-sep">·</span>
                <span className="pd-rating-cnt">{product.reviews} Reviews</span>
                <span className="pd-rating-sep">·</span>
                <span className="pd-rating-sku">SKU: {product.sku}</span>
              </div>

              {/* Stock */}
              <div className="pd-stock-row">
                <span className="pd-stock-dot" />
                <span className="pd-stock-txt">{product.stock}</span>
                {product.units && <span className="pd-stock-scarcity">— Only {product.units} left</span>}
              </div>

              <div className="pd-divider" />

              {/* Price */}
              <div className="pd-price-block">
                <div className="pd-price-inner">
                  <span className="pd-price-main">{fmt(product.price)}</span>
                  <span className="pd-price-old">{fmt(product.oldPrice)}</span>
                  <span className="pd-price-badge">{product.discount}</span>
                </div>
                <span className="pd-price-tax">Inclusive of all taxes</span>
              </div>

              {/* Quantity */}
              <div className="pd-qty-row">
                <span className="pd-qty-label">Quantity</span>
                <div className="pd-qty-ctrl">
                  <button className="pd-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty === 1}>
                    <i className="ri-subtract-line" />
                  </button>
                  <span className="pd-qty-num">{qty}</span>
                  <button className="pd-qty-btn" onClick={() => setQty(q => q + 1)}>
                    <i className="ri-add-line" />
                  </button>
                </div>
              </div>

              {/* CTA */}
              <div className="pd-cta-row">
                <button className="pd-btn-cart" onClick={() => addToCart(false)}
                  style={cartAnim ? { transform: "scale(0.96)" } : {}}>
                  <i className={cartAnim ? "ri-checkbox-circle-line" : "ri-shopping-cart-line"} />
                  {cartAnim ? "Added!" : "Add to Cart"}
                </button>
                <button className="pd-btn-buy" onClick={() => addToCart(true)}>
                  <i className="ri-flashlight-line" />Buy Now
                </button>
              </div>

              {/* Payment */}
              <div className="pd-payment-strip">
                <span className="pd-pay-label">Pay via</span>
                {paymentMethods.map((m) => <span key={m} className="pd-pay-pill">{m}</span>)}
              </div>

              {/* Delivery */}
              <div className="pd-delivery-grid">
                {deliveryItems.map(({ icon, text }) => (
                  <div key={text} className="pd-delivery-item"><i className={icon} /><span>{text}</span></div>
                ))}
              </div>

              {/* Trust */}
              <div className="pd-trust-row">
                {trustBadges.map(({ icon, label }) => (
                  <span key={label} className="pd-trust-badge"><i className={icon} />{label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* META ROW */}
        <div className="pd-meta-row">
          <span className="pd-meta-item">SKU: <span>{product.sku}</span></span>
          <span className="pd-meta-item">Category: <span>{product.category}</span></span>
          <span className="pd-meta-item">Brand: <span>{product.brand}</span></span>
          <span className="pd-meta-item">Tags: <span>Industrial, HVAC, Refrigeration</span></span>
        </div>

        {/* TABS */}
        <div className="pd-tabs-wrap">
          <div className="pd-tab-nav">
            {TABS.map((t) => (
              <button key={t} className={`pd-tab-btn${activeTab === t ? " active" : ""}`} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>

          <div className="pd-tab-body">

            {activeTab === "Description" && (
              <>
                <p className="pd-desc-text">{product.description}</p>
                <div className="pd-features-grid">
                  {product.features.map(({ icon, label }) => (
                    <div key={label} className="pd-feature-item"><i className={icon} />{label}</div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "Specifications" && (
              <div className="pd-specs-table">
                {product.specs.map(([k, v]) => (
                  <div key={k} className="pd-spec-row">
                    <span className="pd-spec-key">{k}</span>
                    <span className="pd-spec-val">{v}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Reviews" && (
              <>
                <div className="pd-review-summary">
                  <div>
                    <div className="pd-review-big">{product.rating}</div>
                    <div className="pd-review-big-stars"><Stars rating={product.rating} size={20} /></div>
                    <div className="pd-review-big-cnt">{product.reviews} verified ratings</div>
                  </div>
                  <div className="pd-review-bars">
                    {ratingBars.map(({ label, pct }) => (
                      <div key={label} className="pd-bar-row">
                        <span style={{ minWidth: 22 }}>{label}</span>
                        <div className="pd-bar-track"><div className="pd-bar-fill" style={{ width: `${pct}%` }} /></div>
                        <span>{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pd-reviews-list">
                  {fakeReviews.map((r, i) => (
                    <div key={i} className="pd-review-card">
                      <div className="pd-review-top">
                        <span className="pd-reviewer">{r.name}</span>
                        <span className="pd-review-dt">{r.date}</span>
                      </div>
                      <div className="pd-rev-stars">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
                      <p className="pd-rev-text">{r.text}</p>
                      <span className="pd-verified"><i className="ri-shield-check-fill" />Verified Purchase</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "Shipping" && (
              <div className="pd-ship-list">
                {shippingInfo.map(({ icon, title, desc }) => (
                  <div key={title} className="pd-ship-item">
                    <div className="pd-ship-icon"><i className={icon} /></div>
                    <div><div className="pd-ship-title">{title}</div><div className="pd-ship-desc">{desc}</div></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="pd-related">
          <div className="pd-section-eyebrow">
            <span className="pd-eyebrow-line" />
            <span className="pd-eyebrow-txt">More to Explore</span>
          </div>
          <h2 className="pd-related-title">You May Also Like</h2>
          <div className="pd-related-grid">
            {related.map((p, i) => (
              <RelCard key={p.id} p={p} delay={i * 90} onClick={() => navigate(`/product/${p.id}`)} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}