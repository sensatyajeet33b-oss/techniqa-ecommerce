import React, { useEffect, useRef, useState } from "react";

import KeyCustomersImage1 from "../assets/KeyCustomersImage1.png";
import KeyCustomersImage2 from "../assets/KeyCustomersImage2.png";
import KeyCustomersImage3 from "../assets/KeyCustomersImage3.png";
import KeyCustomersImage4 from "../assets/KeyCustomersImage4.png";
import KeyCustomersImage5 from "../assets/KeyCustomersImage5.png";
import KeyCustomersImage6 from "../assets/KeyCustomersImage6.png";
import KeyCustomersImage7 from "../assets/KeyCustomersImage7.png";
import KeyCustomersImage8 from "../assets/KeyCustomersImage8.png";
import KeyCustomersImage9 from "../assets/KeyCustomersImage9.png";

const PremiumCSS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800;900&display=swap');
    @import url('https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css');

    .kc-section {
      font-family: 'DM Sans', sans-serif;
      padding: 88px 0 96px;
      background:
        radial-gradient(ellipse 60% 50% at 100% 0%,   rgba(6,182,212,0.07) 0%, transparent 50%),
        radial-gradient(ellipse 45% 35% at 0%   100%,  rgba(37,99,235,0.05) 0%, transparent 50%),
        linear-gradient(180deg, #ffffff 0%, #f8fafc 60%, #ffffff 100%);
      position: relative;
      overflow: hidden;
    }

    /* Tech grid */
    .kc-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px);
      background-size: 52px 52px;
      pointer-events: none;
      z-index: 0;
    }

    /* Ambient orbs */
    .kc-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(90px);
      pointer-events: none;
      z-index: 0;
    }
    .kc-orb-1 { width:340px;height:340px;top:-100px;right:-60px; background:radial-gradient(circle,rgba(6,182,212,0.11),transparent 70%); }
    .kc-orb-2 { width:240px;height:240px;bottom:-60px;left:-40px; background:radial-gradient(circle,rgba(37,99,235,0.08),transparent 70%); }

    /* Header */
    .kc-header {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 0 5%;
      margin-bottom: 52px;
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .kc-header.kc-visible { opacity: 1; transform: translateY(0); }

    .kc-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.13em;
      text-transform: uppercase;
      color: #06b6d4;
      margin-bottom: 14px;
    }
    .kc-eyebrow-dot {
      width: 6px;height: 6px;
      border-radius: 50%;
      background: #06b6d4;
      animation: kcPulseDot 2s ease-in-out infinite;
    }
    @keyframes kcPulseDot {
      0%,100% { transform: scale(1); opacity:1; }
      50%      { transform: scale(1.7); opacity:0.4; }
    }

    .kc-title {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.75rem, 3.5vw, 2.6rem);
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.03em;
      line-height: 1.15;
      margin-bottom: 16px;
    }
    .kc-title span {
      background: linear-gradient(135deg, #06b6d4, #2563eb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .kc-subtitle {
      font-size: 15.5px;
      color: #64748b;
      line-height: 1.75;
      max-width: 520px;
      margin: 0 auto 36px;
    }

    /* Stats row */
    .kc-stats {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0;
      flex-wrap: wrap;
    }
    .kc-stat {
      padding: 0 32px;
      border-right: 1px solid rgba(226,232,240,0.8);
      text-align: center;
      opacity: 0;
      transform: translateY(16px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .kc-stat.kc-visible { opacity:1; transform:translateY(0); }
    .kc-stat:last-child { border-right: none; }
    .kc-stat-num {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.5rem, 2.5vw, 2rem);
      font-weight: 900;
      background: linear-gradient(135deg, #06b6d4, #2563eb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1;
      margin-bottom: 4px;
    }
    .kc-stat-label {
      font-size: 11.5px;
      font-weight: 600;
      color: #94a3b8;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    /* Marquee wrapper */
    .kc-marquee-outer {
      position: relative;
      z-index: 1;
      overflow: hidden;
    }

    /* Edge fade masks */
    .kc-marquee-outer::before,
    .kc-marquee-outer::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 140px;
      z-index: 2;
      pointer-events: none;
    }
    .kc-marquee-outer::before {
      left: 0;
      background: linear-gradient(to right, #ffffff, transparent);
    }
    .kc-marquee-outer::after {
      right: 0;
      background: linear-gradient(to left, #f8fafc, transparent);
    }

    /* Track */
    .kc-track {
      display: inline-flex;
      gap: 20px;
      padding: 16px 10px;
      animation: kcMarquee 42s linear infinite;
    }
    .kc-track:hover { animation-play-state: paused; }

    @keyframes kcMarquee {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* Logo card */
    .kc-logo-card {
      height: 100px;
      min-width: 175px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18px 24px;
      background: linear-gradient(160deg, #ffffff 0%, #f1f5f9 100%);
      border: 1px solid rgba(226,232,240,0.9);
      border-radius: 20px;
      box-shadow:
        0 6px 20px rgba(15,23,42,0.06),
        inset 0 1px 0 rgba(255,255,255,0.9);
      transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
      cursor: default;
    }

    .kc-logo-card:hover {
      background: linear-gradient(135deg, #ffffff 0%, rgba(6,182,212,0.06) 100%);
      border-color: rgba(6,182,212,0.28);
      box-shadow:
        0 18px 40px rgba(6,182,212,0.14),
        0 4px 10px rgba(15,23,42,0.06);
      transform: translateY(-5px) scale(1.03);
    }

    .kc-logo-card img {
      max-width: 130px;
      max-height: 58px;
      object-fit: contain;
      filter: grayscale(100%) opacity(0.6);
      transition: filter 0.35s ease, transform 0.35s ease;
    }

    .kc-logo-card:hover img {
      filter: grayscale(0%) opacity(1);
      transform: scale(1.06);
    }

    /* Bottom strip */
    .kc-bottom-strip {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 44px;
      flex-wrap: wrap;
      padding: 0 5%;
      opacity: 0;
      transform: translateY(14px);
      transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
    }
    .kc-bottom-strip.kc-visible { opacity:1; transform:translateY(0); }

    .kc-trust-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      background: white;
      border: 1px solid rgba(226,232,240,0.9);
      border-radius: 100px;
      padding: 7px 14px;
      box-shadow: 0 2px 8px rgba(15,23,42,0.04);
    }
    .kc-trust-pill i { font-size: 13px; color: #06b6d4; }

    @media (max-width: 640px) {
      .kc-stat { padding: 0 18px; }
      .kc-marquee-outer::before,
      .kc-marquee-outer::after { width: 60px; }
      .kc-logo-card { min-width: 140px; height: 86px; }
    }
  `}</style>
);

const images = [
  KeyCustomersImage1, KeyCustomersImage2, KeyCustomersImage3,
  KeyCustomersImage4, KeyCustomersImage5, KeyCustomersImage6,
  KeyCustomersImage7, KeyCustomersImage8, KeyCustomersImage9,
];

const stats = [
  { value: "50+",  label: "Enterprise Clients" },
  { value: "10K+", label: "Professionals Served" },
  { value: "15+",  label: "Years of Trust" },
  { value: "12+",  label: "Industry Sectors" },
];

const trustPills = [
  { icon: "ri-shield-check-line",  label: "Verified Partners" },
  { icon: "ri-building-2-line",    label: "Enterprise Clients" },
  { icon: "ri-map-pin-line",       label: "Pan-India Presence" },
  { icon: "ri-award-line",         label: "Industry Recognised" },
];

export default function KeyCustomersMarquee() {
  const headerRef = useRef(null);
  const statsRefs = useRef([]);
  const stripRef  = useRef(null);
  const [headerVis, setHeaderVis] = useState(false);
  const [statsVis,  setStatsVis]  = useState([false, false, false, false]);
  const [stripVis,  setStripVis]  = useState(false);

  useEffect(() => {
    /* Header */
    const hObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeaderVis(true); hObs.unobserve(e.target); } },
      { threshold: 0.2 }
    );
    if (headerRef.current) hObs.observe(headerRef.current);

    /* Stats */
    statsRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setStatsVis(v => { const n = [...v]; n[i] = true; return n; }), i * 100);
          obs.unobserve(el);
        }
      }, { threshold: 0.2 });
      obs.observe(el);
    });

    /* Strip */
    const sObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStripVis(true); sObs.unobserve(e.target); } },
      { threshold: 0.2 }
    );
    if (stripRef.current) sObs.observe(stripRef.current);

    return () => { hObs.disconnect(); sObs.disconnect(); };
  }, []);

  return (
    <>
      <PremiumCSS />
      <section className="kc-section">

        <div className="kc-orb kc-orb-1" />
        <div className="kc-orb kc-orb-2" />

        {/* Header */}
        <div ref={headerRef} className={`kc-header${headerVis ? " kc-visible" : ""}`}>
          <div className="kc-eyebrow">
            <span className="kc-eyebrow-dot" />
            Our Clients
          </div>

          <h2 className="kc-title">
            Trusted Across <span>Industrial</span> HVAC Operations
          </h2>

          <p className="kc-subtitle">
            Serving leading businesses, certified technicians, and industrial
            cooling professionals nationwide — from commercial facilities to
            enterprise-scale operations.
          </p>

          {/* Stats */}
          <div className="kc-stats">
            {stats.map((s, i) => (
              <div
                key={s.label}
                ref={el => statsRefs.current[i] = el}
                className={`kc-stat${statsVis[i] ? " kc-visible" : ""}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="kc-stat-num">{s.value}</div>
                <div className="kc-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className="kc-marquee-outer">
          <div className="kc-track">
            {[...images, ...images].map((img, i) => (
              <div className="kc-logo-card" key={i}>
                <img src={img} alt={`Client logo ${(i % images.length) + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Trust pills */}
        <div ref={stripRef} className={`kc-bottom-strip${stripVis ? " kc-visible" : ""}`}>
          {trustPills.map(({ icon, label }) => (
            <span key={label} className="kc-trust-pill">
              <i className={icon} />
              {label}
            </span>
          ))}
        </div>

      </section>
    </>
  );
}