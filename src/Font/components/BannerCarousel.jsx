import React, { useState, useEffect, useRef } from "react";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import BannerVideo from "../assets/Banner/banner-video.mp4";

// ── Slide Data ───────────────────────────────────────────────────────────────
const SLIDES = [
    {
        id: 1,
        type: "video",
        src: BannerVideo,
        badge: "New Arrivals 2025",
        headline: ["Premium HVAC Tools &", "Cooling Solutions"],
        accent: "Cooling Solutions",
        sub: "Trusted refrigeration tools, chemicals and energy solutions for professionals across India.",
        cta: { label: "Explore Products", to: "/featured-products" },
        ctaSecondary: { label: "View Catalogue", to: "/catalogue" },
        stats: [
            { value: "500+", label: "Products" },
            { value: "10k+", label: "Professionals" },
            { value: "15+", label: "Years" },
        ],
        card: {
            title: "Yellow Jacket Manifold",
            tag: "Best Seller",
            price: "₹12,499",
            rating: 4.9,
        },
    },
    {
        id: 2,
        type: "video",
        src: BannerVideo,
        badge: "Best Seller",
        headline: ["Industrial-Grade", "Gas Leak Monitors"],
        accent: "Gas Leak Monitors",
        sub: "Precision detection for refrigerants and hazardous gases. Built for harsh field conditions.",
        cta: { label: "Shop Monitors", to: "/product-group/Leak%20Monitors" },
        ctaSecondary: { label: "Learn More", to: "/about-us" },
        stats: [
            { value: "99.8%", label: "Accuracy" },
            { value: "IP65", label: "Rated" },
            { value: "24/7", label: "Support" },
        ],
        card: {
            title: "Inficon Leak Detector",
            tag: "IP65 Rated",
            price: "₹38,000",
            rating: 4.8,
        },
    },
    {
        id: 3,
        type: "video",
        src: BannerVideo,
        badge: "Energy Solutions",
        headline: ["Phase Change", "Materials for Tomorrow"],
        accent: "Materials for Tomorrow",
        sub: "Next-gen thermal energy storage that cuts costs and reduces your carbon footprint.",
        cta: { label: "Discover PCM", to: "/product-group/Phase%20Change%20Materials" },
        ctaSecondary: { label: "Get a Quote", to: "/contact" },
        stats: [
            { value: "40%", label: "Energy Saved" },
            { value: "Zero", label: "Emissions" },
            { value: "ROI", label: "In 2 Years" },
        ],
        card: {
            title: "PCM Thermal Unit",
            tag: "Eco Certified",
            price: "₹54,000",
            rating: 5.0,
        },
    },
];

// ── Main Component ───────────────────────────────────────────────────────────
const BannerCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animKey, setAnimKey] = useState(0);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);
        setAnimKey((k) => k + 1);
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        /* ── Swiper Reset ── */
        .bc-swiper { width: 100%; position: relative; margin-top:65px }
        .bc-swiper .swiper-slide { opacity: 0 !important; transition: opacity 0.9s ease !important; }
        .bc-swiper .swiper-slide-active { opacity: 1 !important; }

        /* ── Slide Wrapper ── */
        .bc-slide {
          position: relative;
          height: clamp(520px, 85vh, 680px);
          overflow: hidden;
          }


        /* ── Video / BG ── */
        .bc-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.06);
          animation: bcSlowZoom 14s linear infinite alternate;
          will-change: transform;
        }
        @keyframes bcSlowZoom {
          from { transform: scale(1.06); }
          to   { transform: scale(1.0); }
        }

        /* ── Overlays ── */
        .bc-overlay-main {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            108deg,
            rgba(5,10,24,0.93) 0%,
            rgba(5,10,24,0.72) 42%,
            rgba(5,10,24,0.18) 100%
          );
          z-index: 1;
        }
        .bc-overlay-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 80% 50%, transparent 40%, rgba(5,10,24,0.55) 100%);
          z-index: 2;
        }
        .bc-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(6,182,212,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.07) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 3;
        }

        /* ── Depth blobs ── */
        .bc-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 2;
        }
        .bc-blob-1 {
          width: 420px; height: 420px;
          right: 12%;
          top: -80px;
          background: rgba(6,182,212,0.12);
        }
        .bc-blob-2 {
          width: 260px; height: 260px;
          right: 28%;
          bottom: 0;
          background: rgba(37,99,235,0.1);
        }

        /* ── Content ── */
        .bc-content-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          z-index: 10;
          padding: 0 40px;
          padding-top: 0;
          transform: translateY(-28px); /* slightly upward */
        }
        .bc-content-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          gap: 48px;
        }
        .bc-left { max-width: 540px; color: #fff; }

        /* ── Badge ── */
        .bc-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(6,182,212,0.12);
          color: #06B6D4;
          border: 1px solid rgba(6,182,212,0.3);
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          padding: 5px 14px;
          margin-bottom: 22px;
          backdrop-filter: blur(8px);
        }
        .bc-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #06B6D4;
          box-shadow: 0 0 6px #06B6D4;
          animation: bcPulse 1.6s ease infinite;
        }
        @keyframes bcPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        /* ── Headline ── */
        .bc-headline {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(2.4rem, 5vw, 4.4rem);
          font-weight: 800;
          line-height: 1.04;
          letter-spacing: -0.01em;
          margin-bottom: 20px;
          text-shadow: 0 2px 40px rgba(0,0,0,0.5);
        }
        .bc-accent { color: #06B6D4; }

        /* ── Sub ── */
        .bc-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.88rem, 1.5vw, 1.05rem);
          line-height: 1.72;
          opacity: 0.78;
          margin-bottom: 36px;
          max-width: 440px;
        }

        /* ── CTAs ── */
        .bc-ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 44px; }
        .bc-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          background: linear-gradient(135deg, #06B6D4 0%, #2563EB 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: .02em;
          box-shadow: 0 4px 22px rgba(6,182,212,0.32);
          transition: transform .25s cubic-bezier(.4,0,.2,1), box-shadow .25s;
          text-decoration: none;
        }
        .bc-cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(6,182,212,0.5);
        }
        .bc-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: border-color .25s, color .25s, background .25s, transform .25s cubic-bezier(.4,0,.2,1);
          text-decoration: none;
        }
        .bc-cta-secondary:hover {
          border-color: rgba(6,182,212,0.6);
          color: #06B6D4;
          background: rgba(6,182,212,0.07);
          transform: translateY(-2px);
        }

        /* ── Stats ── */
        .bc-stats {
          display: flex;
          gap: 32px;
          padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .bc-stat-val {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 800;
          color: #06B6D4;
          line-height: 1;
        }
        .bc-stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px;
          opacity: 0.55;
          font-weight: 600;
          letter-spacing: .07em;
          text-transform: uppercase;
          margin-top: 3px;
        }

        /* ── Right: Glass Cards ── */
        .bc-right {
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex-shrink: 0;
        }

        /* Product card */
        .bc-glass-card {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 18px;
          padding: 20px 22px;
          color: #fff;
          width: 240px;
          transition: transform .3s cubic-bezier(.4,0,.2,1), border-color .3s;
        }
        .bc-glass-card:hover {
          transform: translateY(-4px);
          border-color: rgba(6,182,212,0.35);
        }
        .bc-card-tag {
          display: inline-block;
          background: rgba(6,182,212,0.15);
          color: #06B6D4;
          border: 1px solid rgba(6,182,212,0.25);
          border-radius: 100px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: 3px 10px;
          margin-bottom: 10px;
        }
        .bc-card-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          font-weight: 600;
          line-height: 1.3;
          margin-bottom: 6px;
        }
        .bc-card-price {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #06B6D4;
          margin-bottom: 10px;
        }
        .bc-card-stars {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          opacity: 0.75;
        }
        .bc-card-stars span { color: #FBBF24; font-size: 13px; }

        /* Trust card */
        .bc-trust-card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          padding: 18px 22px;
          color: #fff;
          width: 240px;
        }
        .bc-trust-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          opacity: 0.85;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .bc-trust-item:last-child { border-bottom: none; }
        .bc-trust-icon {
          width: 26px; height: 26px;
          background: rgba(6,182,212,0.15);
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          flex-shrink: 0;
        }

        /* ── Arrows ── */
        .bc-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(15,23,42,0.55);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(8px);
          display: flex !important;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: background .25s cubic-bezier(.4,0,.2,1), border-color .25s, transform .25s;
        }
        .bc-arrow:hover {
          background: rgba(6,182,212,0.25);
          border-color: rgba(6,182,212,0.6);
          transform: translateY(-50%) scale(1.1);
        }
        .bc-prev { left: 22px; }
        .bc-next { right: 22px; }

        /* ── Pagination ── */
        .bc-pagination {
          position: absolute !important;
          bottom: 28px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          display: flex;
          gap: 8px;
          z-index: 20;
          align-items: center;
          justify-content: center;
        }
        .bc-pagination .swiper-pagination-bullet {
          width: 22px; height: 3px;
          border-radius: 2px;
          background: rgba(255,255,255,0.3);
          opacity: 1;
          transition: background .3s, width .3s;
        }
        .bc-pagination .swiper-pagination-bullet-active {
          background: #06B6D4;
          width: 38px;
        }

        /* ── Scroll indicator ── */
        .bc-scroll-hint {
          position: absolute;
          bottom: 28px;
          right: 44px;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.4);
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        .bc-scroll-line {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.4), transparent);
          animation: bcScrollLine 1.8s ease infinite;
        }
        @keyframes bcScrollLine {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }

        /* ── Entrance animation ── */
        .bc-anim {
          opacity: 0;
          transform: translateY(24px);
          animation: bcUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes bcUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Mobile ── */
        @media (max-width: 900px) {
          .bc-right { display: none; }
          .bc-content-wrap { padding: 0 20px; }
          .bc-content-inner { justify-content: flex-start; }
          .bc-left { max-width: 100%; }
          .bc-scroll-hint { display: none; }
        }
        @media (max-width: 600px) {
          .bc-slide { height: 520px; }
          .bc-cta-secondary { display: none; }
          .bc-stats { gap: 20px; }
          .bc-prev { left: 10px; } .bc-next { right: 10px; }
          .bc-arrow { width: 36px; height: 36px; }
        }
      `}</style>

            <Box sx={{ position: "relative" }}>
                <Swiper
                    modules={[Navigation, Autoplay, Pagination, EffectFade]}
                    effect="fade"
                    navigation={{ nextEl: ".bc-next", prevEl: ".bc-prev" }}
                    pagination={{ el: ".bc-pagination", clickable: true }}
                    autoplay={{ delay: 5500, disableOnInteraction: false }}
                    loop
                    onSlideChange={handleSlideChange}
                    className="bc-swiper"
                >
                    {SLIDES.map((slide, i) => (
                        <SwiperSlide key={slide.id}>
                            <SlideContent slide={slide} animKey={animKey} isActive={activeIndex === i} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Arrows */}
                <Box className="bc-prev bc-arrow" aria-label="Previous">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </Box>
                <Box className="bc-next bc-arrow" aria-label="Next">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </Box>

                {/* Pagination */}
                <Box className="bc-pagination" />

                {/* Scroll hint */}
                <div className="bc-scroll-hint">
                    <div className="bc-scroll-line" />
                    <span>Scroll</span>
                </div>
            </Box>
        </>
    );
};

// ── Slide Content ────────────────────────────────────────────────────────────
function SlideContent({ slide, animKey }) {
    const navigate = useNavigate();

    const renderHeadline = () =>
        slide.headline.map((line, i) => {
            if (line.includes(slide.accent)) {
                const [before, after] = line.split(slide.accent);
                return (
                    <React.Fragment key={i}>
                        {before}<span className="bc-accent">{slide.accent}</span>{after}
                        {i < slide.headline.length - 1 && <br />}
                    </React.Fragment>
                );
            }
            return (
                <React.Fragment key={i}>
                    {line}
                    {i < slide.headline.length - 1 && <br />}
                </React.Fragment>
            );
        });

    const stars = Math.round(slide.card?.rating || 5);

    return (
        <div className="bc-slide">
            {/* Background video */}
            {slide.type === "video" && (
                <video className="bc-video" src={slide.src} autoPlay muted loop playsInline />
            )}

            {/* Depth layers */}
            <div className="bc-overlay-main" />
            <div className="bc-overlay-vignette" />
            <div className="bc-grid-overlay" />
            <div className="bc-blob bc-blob-1" />
            <div className="bc-blob bc-blob-2" />

            {/* Content */}
            <div className="bc-content-wrap">
                <div className="bc-content-inner">

                    {/* LEFT */}
                    <div className="bc-left" key={animKey}>

                        <div className="bc-badge bc-anim" style={{ animationDelay: "0ms" }}>
                            <div className="bc-badge-dot" />
                            {slide.badge}
                        </div>

                        <h1 className="bc-headline bc-anim" style={{ animationDelay: "80ms" }}>
                            {renderHeadline()}
                        </h1>

                        <p className="bc-sub bc-anim" style={{ animationDelay: "160ms" }}>
                            {slide.sub}
                        </p>

                        <div className="bc-ctas bc-anim" style={{ animationDelay: "240ms" }}>
                            <button className="bc-cta-primary" onClick={() => navigate(slide.cta.to)}>
                                {slide.cta.label}
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                            <button className="bc-cta-secondary" onClick={() => navigate(slide.ctaSecondary.to)}>
                                {slide.ctaSecondary.label}
                            </button>
                        </div>

                        <div className="bc-stats bc-anim" style={{ animationDelay: "320ms" }}>
                            {slide.stats.map((s) => (
                                <div key={s.label}>
                                    <div className="bc-stat-val">{s.value}</div>
                                    <div className="bc-stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Glass Cards */}
                    <div className="bc-right" key={`right-${animKey}`}>

                        {/* Featured product card */}
                        {slide.card && (
                            <div className="bc-glass-card bc-anim" style={{ animationDelay: "200ms" }}>
                                <div className="bc-card-tag">{slide.card.tag}</div>
                                <div className="bc-card-title">{slide.card.title}</div>
                                <div className="bc-card-price">{slide.card.price}</div>
                                <div className="bc-card-stars">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i}>{i < stars ? "★" : "☆"}</span>
                                    ))}
                                    <span style={{ color: "rgba(255,255,255,0.45)", marginLeft: 4 }}>{slide.card.rating}</span>
                                </div>
                            </div>
                        )}

                        {/* Trust badges card */}
                        <div className="bc-trust-card bc-anim" style={{ animationDelay: "300ms" }}>
                            {[
                                { icon: "✓", text: "ISO Certified Supplier" },
                                { icon: "⚡", text: "24/7 Technical Support" },
                                { icon: "🛡", text: "Trusted by 10k+ Technicians" },
                            ].map((item) => (
                                <div className="bc-trust-item" key={item.text}>
                                    <div className="bc-trust-icon">{item.icon}</div>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default BannerCarousel;