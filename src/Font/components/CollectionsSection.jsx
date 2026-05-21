import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import CollectionsSection1 from "../assets/CollectionsSection1.png";
import CollectionsSection2 from "../assets/CollectionsSection2.png";
import CollectionsSection3 from "../assets/CollectionsSection3.png";
import CollectionsSection4 from "../assets/CollectionsSection4.png";
import CollectionsSection5 from "../assets/CollectionsSection5.png";

/* ── Collections Data ─────────────────────────────────────────────────────── */
const collections = [
  {
    title: "HVACR Service Tools",
    desc: "Professional servicing equipment for field technicians.",
    image: CollectionsSection1,
    icon: "ri-tools-line",
    badge: "Most Popular",
    badgeColor: "#06B6D4",
    to: "/collection-details",
  },
  {
    title: "Gas Leak Monitors",
    desc: "Precision refrigerant & hazardous gas detection systems.",
    image: CollectionsSection2,
    icon: "ri-alarm-warning-line",
    badge: "Industrial Grade",
    badgeColor: "#8B5CF6",
    to: "/collection-details",
  },
  {
    title: "HVAC&R Chemicals",
    desc: "Cleaners, flush agents and coil treatment solutions.",
    image: CollectionsSection3,
    icon: "ri-flask-line",
    badge: "New Arrivals",
    badgeColor: "#10B981",
    to: "/collection-details",
  },
  {
    title: "Energy Solutions",
    desc: "Phase change materials for next-gen thermal storage.",
    image: CollectionsSection4,
    icon: "ri-flashlight-line",
    badge: "Eco Certified",
    badgeColor: "#F59E0B",
    to: "/collection-details",
  },
  {
    title: "Recovery Machines",
    desc: "High-efficiency refrigerant recovery for professionals.",
    image: CollectionsSection5,
    icon: "ri-recycle-line",
    badge: "Best Seller",
    badgeColor: "#EF4444",
    to: "/collection-details",
  },
];

/* ── Component ────────────────────────────────────────────────────────────── */
const CollectionsSection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  return (
    <>
      <style>{`
        /* ── Section wrapper ─────────────────────── */
.cs-section {
  padding: clamp(48px, 8vw, 88px) 0 clamp(48px, 7vw, 80px);
  background: linear-gradient(180deg, #f0f7f9 0%, #e6f4f7 60%, #f8fafc 100%);
  position: relative;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}

/* Ambient decorative blobs */
.cs-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
}
.cs-blob-1 {
  width: clamp(260px, 40vw, 500px);
  height: clamp(260px, 40vw, 500px);
  top: -180px; left: -120px;
  background: rgba(6,182,212,0.09);
}
.cs-blob-2 {
  width: clamp(180px, 28vw, 360px);
  height: clamp(180px, 28vw, 360px);
  bottom: -100px; right: -80px;
  background: rgba(37,99,235,0.07);
}

/* Subtle grid texture */
.cs-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(6,182,212,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(6,182,212,0.035) 1px, transparent 1px);
  background-size: 52px 52px;
  pointer-events: none;
}

/* ── Inner container ─────────────────────── */
.cs-inner {
  max-width: 85%;
  margin: 0 auto;
  padding: 0 clamp(16px, 3vw, 40px);
  position: relative;
  z-index: 1;
}

/* ── Header row ──────────────────────────── */
.cs-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: clamp(24px, 4vw, 44px);
  gap: clamp(12px, 2vw, 24px);
}
.cs-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: #06B6D4;
  margin-bottom: 10px;
}
.cs-eyebrow-line {
  width: 28px; height: 2px;
  background: #06B6D4;
  border-radius: 2px;
}
.cs-heading {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.7rem, 4vw, 2.7rem);
  font-weight: 800;
  color: #0f172a;
  line-height: 1.08;
  letter-spacing: -.02em;
  margin: 0 0 10px;
}
.cs-heading span { color: #06B6D4; }
.cs-subtitle {
  font-size: clamp(13px, 1.5vw, 15px);
  color: #64748b;
  line-height: 1.6;
  max-width: 420px;
  margin: 0;
}
.cs-view-all {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: clamp(12px, 1.3vw, 13.5px);
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  border: 1.5px solid #cbd5e1;
  border-radius: 100px;
  padding: clamp(8px, 1.2vw, 10px) clamp(14px, 2vw, 22px);
  white-space: nowrap;
  min-height: 44px;
  transition: border-color .22s, color .22s, background .22s, transform .22s cubic-bezier(.4,0,.2,1);
  cursor: pointer;
  background: none;
  font-family: 'DM Sans', sans-serif;
  flex-shrink: 0;
  align-self: flex-start;
  margin-top: 8px;
}
.cs-view-all:hover {
  border-color: #06B6D4;
  color: #06B6D4;
  background: rgba(6,182,212,0.06);
  transform: translateX(3px);
}
.cs-view-all i { font-size: 15px; transition: transform .22s; }
.cs-view-all:hover i { transform: translateX(4px); }

/* ── Scroll track ────────────────────────── */
.cs-track-wrap {
  position: relative;
  width: 100%;
  padding: 0 clamp(16px, 3vw, 40px);
  box-sizing: border-box;
}

/* Right edge fade — desktop scroll hint */
.cs-track-wrap::after {
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 8px;
  width: 60px;
  background: linear-gradient(to right, transparent, rgba(230,244,247,0.9));
  pointer-events: none;
  z-index: 2;
}

.cs-track {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: clamp(12px, 1.8vw, 18px);
  width: 100%;
}
.cs-track:active { cursor: grabbing; }
.cs-track::-webkit-scrollbar { display: none; }
.cs-track { scrollbar-width: none; }

/* ── Card ────────────────────────────────── */
.cs-card {
  width: 100%;
  height: clamp(280px, 32vw, 360px);
  border-radius: 22px;
  overflow: hidden;
  position: relative;
  scroll-snap-align: start;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.7);
  box-shadow: 0 4px 20px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04);
  transition:
    transform .32s cubic-bezier(.4,0,.2,1),
    box-shadow .32s cubic-bezier(.4,0,.2,1),
    border-color .22s;
  background: #fff;
}
.cs-card:hover {
  transform: translateY(-8px) scale(1.015);
  box-shadow: 0 20px 50px rgba(0,0,0,0.14), 0 0 0 1.5px rgba(6,182,212,0.5);
  border-color: rgba(6,182,212,0.5);
}

/* Image */
.cs-card-img {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform .55s cubic-bezier(.4,0,.2,1);
  will-change: transform;
}
.cs-card:hover .cs-card-img { transform: scale(1.1); }

/* Gradient overlay */
.cs-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(5,10,24,0.88) 0%,
    rgba(5,10,24,0.38) 48%,
    rgba(5,10,24,0.06) 100%
  );
  transition: background .32s;
  z-index: 1;
}
.cs-card:hover .cs-card-overlay {
  background: linear-gradient(
    to top,
    rgba(5,10,24,0.92) 0%,
    rgba(5,10,24,0.50) 52%,
    rgba(5,10,24,0.1) 100%
  );
}

/* Badge */
.cs-card-badge {
  position: absolute;
  top: 16px; left: 16px;
  z-index: 3;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #fff;
  padding: 4px 11px;
  border-radius: 100px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.2);
}

/* Icon pill */
.cs-card-icon {
  position: absolute;
  top: 16px; right: 16px;
  z-index: 3;
  width: 36px; height: 36px;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.22);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  font-size: 17px;
  transition: background .22s, transform .22s cubic-bezier(.4,0,.2,1);
}
.cs-card:hover .cs-card-icon {
  background: rgba(6,182,212,0.3);
  transform: scale(1.12) rotate(-6deg);
}

/* Bottom content */
.cs-card-content {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 2;
  padding: clamp(16px, 2.5vw, 24px) clamp(14px, 2vw, 20px) clamp(14px, 2vw, 20px);
}
.cs-card-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(17px, 2.2vw, 21px);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 6px;
  letter-spacing: -.01em;
}
.cs-card-desc {
  font-size: clamp(11.5px, 1.2vw, 12.5px);
  color: rgba(255,255,255,0.65);
  line-height: 1.5;
  margin-bottom: 12px;
  font-family: 'DM Sans', sans-serif;
}
.cs-card-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12.5px;
  font-weight: 700;
  color: #06B6D4;
  letter-spacing: .04em;
  text-transform: uppercase;
  transition: gap .22s cubic-bezier(.4,0,.2,1);
}
.cs-card:hover .cs-card-cta { gap: 10px; }
.cs-card-cta i { font-size: 15px; }

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */

/* ── Large laptops  ≤ 1400px ─────────────── */
@media (max-width: 1400px) {
  .cs-inner {
    max-width: 95%;
  }

  .cs-track {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* ── Laptops  ≤ 1200px ───────────────────── */
@media (max-width: 1200px) {
  .cs-inner {
    max-width: 100%;
  }

  .cs-track {
    grid-template-columns: repeat(3, 1fr);
  }

  .cs-card {
    height: clamp(260px, 28vw, 320px);
  }
}

/* ── Tablets  ≤ 992px ────────────────────── */
@media (max-width: 992px) {
  .cs-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 28px;
  }

  .cs-view-all {
    align-self: flex-start;
    margin-top: 0;
  }

  .cs-subtitle {
    max-width: 100%;
  }

  .cs-track {
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .cs-card {
    height: clamp(240px, 30vw, 300px);
    border-radius: 18px;
  }
}

/* ── Mobile  ≤ 768px ─────────────────────── */
@media (max-width: 768px) {
  .cs-inner {
    padding: 0 16px;
  }

  .cs-track-wrap {
    padding: 0 16px;
  }

  /* Hide right edge fade on mobile — no horizontal scroll */
  .cs-track-wrap::after {
    display: none;
  }

  .cs-track {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .cs-card {
    height: clamp(200px, 45vw, 260px);
    border-radius: 16px;
  }

  /* Always show hover state content on touch */
  .cs-card-cta {
    gap: 8px;
  }

  .cs-card-icon {
    width: 32px; height: 32px;
    font-size: 15px;
    border-radius: 8px;
  }

  .cs-card-badge {
    font-size: 9.5px;
    padding: 3px 9px;
  }

  .cs-heading {
    font-size: clamp(1.5rem, 5vw, 2rem);
  }

  .cs-subtitle {
    font-size: 13.5px;
  }
}

/* ── Small mobile  ≤ 520px ───────────────── */
@media (max-width: 520px) {
  .cs-track {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .cs-card {
    height: clamp(180px, 48vw, 230px);
    border-radius: 14px;
  }

  .cs-card-title {
    font-size: 16px;
    margin-bottom: 4px;
  }

  .cs-card-desc {
    display: none; /* too cramped at this size */
  }

  .cs-card-content {
    padding: 14px 12px 12px;
  }

  .cs-card-cta {
    font-size: 11.5px;
  }

  .cs-card-badge {
    top: 10px; left: 10px;
    font-size: 9px;
    padding: 3px 8px;
  }

  .cs-card-icon {
    top: 10px; right: 10px;
    width: 30px; height: 30px;
    font-size: 14px;
    border-radius: 8px;
  }
}

/* ── Tiny  ≤ 380px ───────────────────────── */
@media (max-width: 380px) {
  .cs-track {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .cs-card {
    height: 220px;
    border-radius: 16px;
  }

  .cs-card-desc {
    display: block;
    font-size: 12px;
  }

  .cs-card-title {
    font-size: 18px;
  }

  .cs-card-content {
    padding: 18px 16px 14px;
  }

  .cs-header {
    margin-bottom: 20px;
  }
}
      `}</style>

      <section className="cs-section">
        {/* Decorative layers */}
        <div className="cs-blob cs-blob-1" />
        <div className="cs-blob cs-blob-2" />
        <div className="cs-grid" />

        <div className="cs-inner">
          {/* ── Header ── */}
          <div className="cs-header">
            <div className="cs-header-left">
              <div className="cs-eyebrow">
                <div className="cs-eyebrow-line" />
                Product Categories
              </div>
              <h2 className="cs-heading">
                Explore Our <span>Collections</span>
              </h2>
              <p className="cs-subtitle">
                Find tools, chemicals and industrial HVAC solutions built for professionals across India.
              </p>
            </div>
            <button className="cs-view-all" onClick={() => navigate("/shop-by-brand")}>
              View All Categories
              <i className="ri-arrow-right-line" />
            </button>
          </div>

          {/* ── Cards ── */}
          <div className="cs-track-wrap">
            <div className="cs-track" ref={scrollRef}>
              {collections.map((item, index) => (
                <div
                  className="cs-card"
                  key={index}
                  onClick={() => navigate(item.to, { state: item })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigate(item.to, { state: item })}
                >
                  {/* Image */}
                  <img className="cs-card-img" src={item.image} alt={item.title} />

                  {/* Overlay */}
                  <div className="cs-card-overlay" />

                  {/* Badge */}
                  <div
                    className="cs-card-badge"
                    style={{ background: item.badgeColor + "cc" }}
                  >
                    {item.badge}
                  </div>

                  {/* Icon */}
                  <div className="cs-card-icon">
                    <i className={item.icon} />
                  </div>

                  {/* Bottom content */}
                  <div className="cs-card-content">
                    <div className="cs-card-title">{item.title}</div>
                    <div className="cs-card-desc">{item.desc}</div>
                    <div className="cs-card-cta">
                      Explore
                      <i className="ri-arrow-right-line" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CollectionsSection;