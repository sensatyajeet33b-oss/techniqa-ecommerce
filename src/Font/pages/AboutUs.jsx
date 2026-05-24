import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AboutUSBannerImage from "../assets/aboutus banner image.png";

/* ── Why Choose Us data ─────────────────────────────────────────────────── */
const WHY = [
  {
    icon: "ri-tools-line",
    title: "Expert Engineering",
    desc: "Designed by HVAC professionals with decades of field experience, built for real-world demands.",
    color: "#06B6D4",
    gradient: "linear-gradient(135deg,rgba(6,182,212,0.13),rgba(37,99,235,0.09))",
    glow: "rgba(6,182,212,0.2)",
  },
  {
    icon: "ri-settings-3-line",
    title: "Precision Manufacturing",
    desc: "Built using modern production techniques that meet international quality and safety standards.",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg,rgba(139,92,246,0.13),rgba(217,70,239,0.07))",
    glow: "rgba(139,92,246,0.18)",
  },
  {
    icon: "ri-shield-check-line",
    title: "Certified & Reliable",
    desc: "Every product is tested for consistent performance and certified to meet industry benchmarks.",
    color: "#10B981",
    gradient: "linear-gradient(135deg,rgba(16,185,129,0.13),rgba(6,182,212,0.07))",
    glow: "rgba(16,185,129,0.18)",
  },
  {
    icon: "ri-customer-service-2-line",
    title: "Lifetime Expert Support",
    desc: "Dedicated technical assistance before and after every purchase — available around the clock.",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg,rgba(245,158,11,0.13),rgba(239,68,68,0.07))",
    glow: "rgba(245,158,11,0.18)",
  },
];

/* ── Timeline ───────────────────────────────────────────────────────────── */
const TIMELINE = [
  { year: "2008", title: "Founded",              desc: "Tecniqa established with a mission to modernise India's HVAC supply chain." },
  { year: "2012", title: "First Global Brand",   desc: "Partnered with Yellow Jacket USA, opening doors to international-grade tools." },
  { year: "2016", title: "National Expansion",   desc: "Grew to serve HVAC professionals in 18+ states across India." },
  { year: "2020", title: "Energy Solutions",     desc: "Launched Phase Change Material products, pioneering sustainable cooling." },
  { year: "2024", title: "Digital Commerce",     desc: "Tecniqa.com launched — bringing the full catalogue online for professionals." },
];

/* ── Stats ──────────────────────────────────────────────────────────────── */
const STATS = [
  { val: "10k+",  label: "Professionals Served" },
  { val: "500+",  label: "Products Available" },
  { val: "15+",   label: "Global Brand Partners" },
  { val: "24/7",  label: "Technical Support" },
];

export default function AboutUs() {
  const navigate = useNavigate();
  const sectionsRef = useRef([]);

  /* Scroll-triggered fade-up ───────────────────────────────────────────── */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("au-visible"); }),
      { threshold: 0.12 }
    );
    sectionsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

    useEffect(() => {
  
      document.title =
        "About Us | Tecniqa";
  
    }, []);

  const obs = (i) => (el) => { sectionsRef.current[i] = el; };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.au-root {
    --brand: #06B6D4;
    --brand-dark: #0e7490;
    --ink: #0f172a;
    --ink-mid: #475569;
    --ink-soft: #94a3b8;
    --border: rgba(226, 232, 240, 0.7);
    --ff-display: 'Barlow Condensed', sans-serif;
    --ff-body: 'DM Sans', sans-serif;
    font-family: var(--ff-body);
    color: var(--ink);
    overflow-x: hidden;
}

/* ── Scroll animation base ── */
.au-reveal {
    opacity: 0;
    transform: translateY(36px);
    transition: opacity .7s cubic-bezier(.22, 1, .36, 1), transform .7s cubic-bezier(.22, 1, .36, 1);
}

.au-reveal.au-visible {
    opacity: 1;
    transform: translateY(0);
}

.au-reveal-d1 {
    transition-delay: .1s;
}

.au-reveal-d2 {
    transition-delay: .2s;
}

.au-reveal-d3 {
    transition-delay: .3s;
}

.au-reveal-d4 {
    transition-delay: .4s;
}

/* ══════════════════════════════════════════════════════
1. CINEMATIC HERO
══════════════════════════════════════════════════════ */
.au-hero {
    margin-top: 4%;
    position: relative;
    height: clamp(560px, 88vh, 780px);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.au-hero-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.06);
    filter: blur(3px);
    animation: auHeroZoom 16s linear infinite alternate;

}

@keyframes auHeroZoom {
    from {
        transform: scale(1.06);
    }

    to {
        transform: scale(1.0);
    }
}

.au-hero-overlay {
    position: absolute;
    inset: 0;
    background:
        linear-gradient(108deg, rgba(5, 10, 24, 0.88) 0%, rgba(5, 10, 24, 0.60) 50%, rgba(5, 10, 24, 0.25) 100%);
}

.au-hero-grid {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(6, 182, 212, 0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(6, 182, 212, 0.07) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
}

/* Bottom fade */
.au-hero::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(to bottom, transparent, #f8fafc);
    z-index: 3;
}

.au-hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: #fff;
    padding: 0 24px;
    max-width: 860px;
}

.au-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(6, 182, 212, 0.15);
    border: 1px solid rgba(6, 182, 212, 0.35);
    border-radius: 100px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: var(--brand);
    padding: 5px 16px;
    margin-bottom: 24px;
    backdrop-filter: blur(8px);
    animation: auFadeUp .6s .1s cubic-bezier(.22, 1, .36, 1) both;
}

.au-hero-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--brand);
    box-shadow: 0 0 6px var(--brand);
    animation: auPulse 1.6s ease infinite;
}

@keyframes auPulse {

    0%,
    100% {
        opacity: 1;
        transform: scale(1)
    }

    50% {
        opacity: .5;
        transform: scale(.7)
    }
}

.au-hero-h1 {
    font-family: var(--ff-display);
    font-size: clamp(2.8rem, 6vw, 5.4rem);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -.02em;
    text-shadow: 0 4px 40px rgba(0, 0, 0, 0.4);
    margin-bottom: 20px;
    animation: auFadeUp .65s .2s cubic-bezier(.22, 1, .36, 1) both;
}

.au-hero-h1 em {
    font-style: italic;
    color: var(--brand);
}

.au-hero-sub {
    font-size: clamp(.95rem, 1.6vw, 1.2rem);
    opacity: .78;
    line-height: 1.7;
    max-width: 560px;
    margin: 0 auto 40px;
    animation: auFadeUp .65s .32s cubic-bezier(.22, 1, .36, 1) both;
}

/* Hero stats strip */
.au-hero-stats {
    display: flex;
    gap: 36px;
    justify-content: center;
    flex-wrap: wrap;
    animation: auFadeUp .65s .44s cubic-bezier(.22, 1, .36, 1) both;
}

.au-hero-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
}

.au-hero-stat-val {
    font-family: var(--ff-display);
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 800;
    color: var(--brand);
    line-height: 1;
}

.au-hero-stat-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: .08em;
    text-transform: uppercase;
    opacity: .6;
}

@keyframes auFadeUp {
    from {
        opacity: 0;
        transform: translateY(24px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ══════════════════════════════════════════════════════
2. SHARED SECTION UTILITIES
══════════════════════════════════════════════════════ */
.au-section {
    padding: 96px 0;
    position: relative;
    overflow: hidden;
}

.au-inner {
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 40px;
    position: relative;
    z-index: 1;
}

.au-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--brand);
    margin-bottom: 12px;
}

.au-eyebrow-line {
    width: 28px;
    height: 2px;
    background: var(--brand);
    border-radius: 2px;
}

.au-section-heading {
    font-family: var(--ff-display);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.06;
    letter-spacing: -.02em;
    margin-bottom: 14px;
}

.au-section-heading span {
    color: var(--brand);
}

.au-section-sub {
    font-size: 16px;
    color: var(--ink-mid);
    line-height: 1.7;
    max-width: 480px;
}

/* Ambient blobs */
.au-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
}

/* ══════════════════════════════════════════════════════
3. MISSION & VISION
══════════════════════════════════════════════════════ */
.au-mv-section {
    background: linear-gradient(180deg, #f8fafc 0%, #eef6f9 100%);
}

.au-mv-blob-1 {
    width: 400px;
    height: 400px;
    top: -120px;
    right: -80px;
    background: rgba(6, 182, 212, 0.08);
}

.au-mv-blob-2 {
    width: 280px;
    height: 280px;
    bottom: -60px;
    left: -60px;
    background: rgba(37, 99, 235, 0.07);
}

.au-mv-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    margin-top: 56px;
}

.au-mv-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(14px);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 36px 32px;
    position: relative;
    overflow: hidden;
    transition: transform .3s cubic-bezier(.4, 0, .2, 1), box-shadow .3s;
}

.au-mv-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 52px rgba(15, 23, 42, 0.10);
}

.au-mv-card-accent {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    border-radius: 24px 24px 0 0;
}

.au-mv-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin-bottom: 20px;
}

.au-mv-title {
    font-family: var(--ff-display);
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -.02em;
    margin-bottom: 12px;
}

.au-mv-body {
    font-size: 15px;
    color: var(--ink-mid);
    line-height: 1.75;
}

/* ══════════════════════════════════════════════════════
4. STATS STRIP
══════════════════════════════════════════════════════ */
.au-stats-section {
    background: linear-gradient(135deg, #020c1b 0%, #051b2c 100%);
    padding: 72px 0;
    position: relative;
    overflow: hidden;
}

.au-stats-grid-tex {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(6, 182, 212, 0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(6, 182, 212, 0.07) 1px, transparent 1px);
    background-size: 56px 56px;
    pointer-events: none;
}

.au-stats-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
}

.au-stats-orb-1 {
    width: 360px;
    height: 360px;
    top: -120px;
    right: -60px;
    background: rgba(6, 182, 212, 0.15);
}

.au-stats-orb-2 {
    width: 260px;
    height: 260px;
    bottom: -80px;
    left: -60px;
    background: rgba(37, 99, 235, 0.12);
}

.au-stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
    position: relative;
    z-index: 1;
}

.au-stat-item {
    text-align: center;
    padding: 36px 24px;
    border-right: 1px solid rgba(255, 255, 255, 0.07);
    transition: background .25s;
}

.au-stat-item:last-child {
    border-right: none;
}

.au-stat-item:hover {
    background: rgba(6, 182, 212, 0.06);
}

.au-stat-val {
    font-family: var(--ff-display);
    font-size: clamp(2.4rem, 4vw, 3.4rem);
    font-weight: 800;
    color: var(--brand);
    line-height: 1;
    margin-bottom: 8px;
}

.au-stat-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .09em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.45);
}

/* ══════════════════════════════════════════════════════
5. WHY CHOOSE US
══════════════════════════════════════════════════════ */
.au-why-section {
    background: #fff;
}

.au-why-blob-1 {
    width: 400px;
    height: 400px;
    top: -100px;
    left: -80px;
    background: rgba(6, 182, 212, 0.07);
}

.au-why-blob-2 {
    width: 300px;
    height: 300px;
    bottom: -80px;
    right: -60px;
    background: rgba(139, 92, 246, 0.06);
}

.au-why-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 52px;
    gap: 24px;
    flex-wrap: wrap;
}

.au-why-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 22px;
}

.au-why-card {
    border-radius: 20px;
    padding: 30px 24px;
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
    border: 1px solid var(--border);
    box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
    transition: transform .32s cubic-bezier(.4, 0, .2, 1), box-shadow .32s, border-color .25s;
    cursor: default;
}

.au-why-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 24px 50px rgba(6, 182, 212, 0.14);
    border-color: rgba(6, 182, 212, 0.35);
}

.au-why-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 20px;
    transition: transform .3s cubic-bezier(.4, 0, .2, 1);
}

.au-why-card:hover .au-why-icon {
    transform: scale(1.12) rotate(-6deg);
}

.au-why-title {
    font-family: var(--ff-display);
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -.01em;
    margin-bottom: 10px;
}

.au-why-desc {
    font-size: 14px;
    color: var(--ink-mid);
    line-height: 1.7;
}

/* ══════════════════════════════════════════════════════
6. TIMELINE
══════════════════════════════════════════════════════ */
.au-timeline-section {
    background: linear-gradient(180deg, #f0f7f9 0%, #f8fafc 100%);
}

.au-timeline-blob {
    width: 340px;
    height: 340px;
    top: -80px;
    right: -60px;
    background: rgba(6, 182, 212, 0.08);
}

.au-timeline-track {
    position: relative;
    margin-top: 56px;
    padding-left: 32px;
}

/* Vertical line */
.au-timeline-track::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--brand), rgba(6, 182, 212, 0.1));
    border-radius: 2px;
}

.au-tl-item {
    position: relative;
    padding: 0 0 44px 36px;
    transition: transform .25s;
}

.au-tl-item:last-child {
    padding-bottom: 0;
}

.au-tl-item:hover {
    transform: translateX(4px);
}

/* Dot */
.au-tl-dot {
    position: absolute;
    left: -6px;
    top: 6px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--brand);
    border: 3px solid #f0f7f9;
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.25);
}

.au-tl-year {
    font-family: var(--ff-display);
    font-size: 13px;
    font-weight: 800;
    letter-spacing: .08em;
    color: var(--brand);
    text-transform: uppercase;
    margin-bottom: 5px;
}

.au-tl-title {
    font-family: var(--ff-display);
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -.01em;
    margin-bottom: 6px;
}

.au-tl-desc {
    font-size: 14.5px;
    color: var(--ink-mid);
    line-height: 1.65;
    max-width: 520px;
}

/* ══════════════════════════════════════════════════════
7. CTA SECTION
══════════════════════════════════════════════════════ */
.au-cta-section {
    background: linear-gradient(145deg, #020c1b 0%, #051b2c 60%, #07293a 100%);
    padding: 100px 0;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.au-cta-grid {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(6, 182, 212, 0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(6, 182, 212, 0.07) 1px, transparent 1px);
    background-size: 56px 56px;
    pointer-events: none;
}

.au-cta-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
}

.au-cta-orb-1 {
    width: 400px;
    height: 400px;
    top: -120px;
    right: -80px;
    background: rgba(6, 182, 212, 0.16);
}

.au-cta-orb-2 {
    width: 280px;
    height: 280px;
    bottom: -80px;
    left: -60px;
    background: rgba(37, 99, 235, 0.13);
}

.au-cta-inner {
    position: relative;
    z-index: 1;
}

.au-cta-heading {
    font-family: var(--ff-display);
    font-size: clamp(2rem, 4.5vw, 3.6rem);
    font-weight: 800;
    letter-spacing: -.02em;
    color: #fff;
    line-height: 1.07;
    margin-bottom: 16px;
}

.au-cta-heading span {
    color: var(--brand);
}

.au-cta-sub {
    font-size: 16px;
    color: rgba(255, 255, 255, .55);
    line-height: 1.7;
    max-width: 480px;
    margin: 0 auto 40px;
}

.au-cta-btns {
    display: flex;
    gap: 14px;
    justify-content: center;
    flex-wrap: wrap;
}

.au-cta-primary {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 15px 32px;
    background: linear-gradient(135deg, var(--brand) 0%, #2563EB 100%);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: var(--ff-body);
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 6px 24px rgba(6, 182, 212, 0.35);
    transition: transform .25s cubic-bezier(.4, 0, .2, 1), box-shadow .25s;
    text-decoration: none;
}

.au-cta-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 36px rgba(6, 182, 212, 0.5);
}

.au-cta-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background: rgba(255, 255, 255, 0.07);
    color: rgba(255, 255, 255, .8);
    border: 1.5px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    font-family: var(--ff-body);
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    backdrop-filter: blur(8px);
    transition: border-color .22s, color .22s, transform .22s cubic-bezier(.4, 0, .2, 1);
    text-decoration: none;
}

.au-cta-secondary:hover {
    border-color: var(--brand);
    color: var(--brand);
    transform: translateY(-2px);
}

/* ══ Trust badge row ══ */
.au-trust-row {
    display: flex;
    gap: 28px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 48px;
}

.au-trust-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.55);
}

.au-trust-badge i {
    color: var(--brand);
    font-size: 16px;
}

/* ══ Responsive ══ */
@media (max-width: 960px) {
    .au-inner {
        padding: 0 24px;
    }

    .au-mv-grid {
        grid-template-columns: 1fr;
    }

    .au-why-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .au-stats-row {
        grid-template-columns: repeat(2, 1fr);
    }

    .au-stat-item:nth-child(2) {
        border-right: none;
    }

    .au-stat-item {
        border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    }

    .au-stat-item:nth-child(3),
    .au-stat-item:nth-child(4) {
        border-bottom: none;
    }
}

@media (max-width: 600px) {
    .au-cta-btns {

        flex-direction: column;
    }

    .au-cta-primary,
    .au-cta-secondary {

        width: 100%;

        justify-content: center;
    }

    .au-hero {

        min-height: 520px;

        height: auto;

        padding:
            120px 0 90px;
    }

    .au-hero-h1 {

        font-size:
            clamp(2.2rem, 10vw, 3.4rem);

        line-height: 1.05;
    }

    .au-hero-stats {

        flex-direction: column;

        gap: 18px;
    }

    .au-section {
        padding: 64px 0;
    }

    .au-why-grid {
        grid-template-columns: 1fr;
    }

    .au-stats-row {
        grid-template-columns: repeat(2, 1fr);
    }

    .au-hero-stats {
        gap: 20px;
    }

    .au-timeline-track {
        padding-left: 20px;
    }

    .au-tl-item {
        padding-left: 24px;
    }
}

@media (max-width: 480px) {

    .au-inner {
        padding: 0 18px;
    }

    .au-section {
        padding: 56px 0;
    }

    .au-hero-content {
        padding: 0 14px;
    }

    .au-hero-h1 {
        font-size: 2rem;
    }

    .au-hero-sub {
        font-size: 14px;
        line-height: 1.6;
    }

    .au-section-heading {
        font-size: 1.9rem;
    }

    .au-section-sub {
        font-size: 14px;
    }

    .au-mv-card {
        padding: 26px 20px;
    }

    .au-mv-title {
        font-size: 20px;
    }

    .au-stat-item {
        padding: 28px 14px;
    }

    .au-stat-val {
        font-size: 2rem;
    }

    .au-why-card {
        padding: 22px 18px;
    }

    .au-why-title {
        font-size: 18px;
    }

    .au-tl-title {
        font-size: 17px;
    }

    .au-tl-desc {
        font-size: 13.5px;
    }

    .au-cta-heading {
        font-size: 2rem;
    }

    .au-cta-sub {
        font-size: 14px;
    }
}
      `}
      
      
      </style>

      <div className="au-root">

        {/* ══ 1. HERO ════════════════════════════════════════════════════════ */}
        <section className="au-hero">
          <img className="au-hero-img" src={AboutUSBannerImage} alt="Tecniqa HVAC" />
          <div className="au-hero-overlay" />
          <div className="au-hero-grid" />

          <div className="au-hero-content">
            <div className="au-hero-badge">
              <div className="au-hero-badge-dot" />
              About Tecniqa
            </div>

            <h1 className="au-hero-h1">
              Engineering the <em>Future</em><br />
              of HVAC & Refrigeration
            </h1>

            <p className="au-hero-sub">
              Delivering certified tools, chemicals, and energy solutions trusted by cooling professionals across India for over 15 years.
            </p>

            <div className="au-hero-stats">
              {STATS.map((s) => (
                <div className="au-hero-stat" key={s.label}>
                  <div className="au-hero-stat-val">{s.val}</div>
                  <div className="au-hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 2. MISSION & VISION ════════════════════════════════════════════ */}
        <section className="au-section au-mv-section">
          <div className="au-blob au-mv-blob-1" />
          <div className="au-blob au-mv-blob-2" />
          <div className="au-inner">

            <div className="au-reveal" ref={obs(0)}>
              <div className="au-eyebrow"><div className="au-eyebrow-line" />Our Purpose</div>
              <h2 className="au-section-heading">Mission & <span>Vision</span></h2>
              <p className="au-section-sub">The values and aspirations that have guided Tecniqa from day one.</p>
            </div>

            <div className="au-mv-grid">
              {/* Mission */}
              <div className="au-mv-card au-reveal au-reveal-d1" ref={obs(1)}>
                <div className="au-mv-card-accent" style={{ background: "linear-gradient(90deg,#06B6D4,#2563EB)" }} />
                <div className="au-mv-icon" style={{ background: "linear-gradient(135deg,rgba(6,182,212,0.13),rgba(37,99,235,0.09))", color: "#06B6D4" }}>
                  <i className="ri-focus-3-line" />
                </div>
                <h3 className="au-mv-title">Our Mission</h3>
                <p className="au-mv-body">
                  To empower HVAC and refrigeration professionals across India with access to world-class tools, certified chemicals, and innovative energy solutions — delivered with speed, integrity, and expert guidance.
                </p>
              </div>

              {/* Vision */}
              <div className="au-mv-card au-reveal au-reveal-d2" ref={obs(2)}>
                <div className="au-mv-card-accent" style={{ background: "linear-gradient(90deg,#8B5CF6,#EC4899)" }} />
                <div className="au-mv-icon" style={{ background: "linear-gradient(135deg,rgba(139,92,246,0.13),rgba(217,70,239,0.07))", color: "#8B5CF6" }}>
                  <i className="ri-eye-line" />
                </div>
                <h3 className="au-mv-title">Our Vision</h3>
                <p className="au-mv-body">
                  To become the most trusted digital marketplace for modern HVAC, cooling, and refrigeration technologies — bridging global brands with Indian professionals and setting new standards for the industry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 3. STATS DARK STRIP ════════════════════════════════════════════ */}
        <section className="au-stats-section">
          <div className="au-stats-grid-tex" />
          <div className="au-stats-orb au-stats-orb-1" />
          <div className="au-stats-orb au-stats-orb-2" />
          <div className="au-inner">
            <div className="au-stats-row au-reveal" ref={obs(3)}>
              {STATS.map((s) => (
                <div className="au-stat-item" key={s.label}>
                  <div className="au-stat-val">{s.val}</div>
                  <div className="au-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 4. WHY CHOOSE US ═══════════════════════════════════════════════ */}
        <section className="au-section au-why-section">
          <div className="au-blob au-why-blob-1" />
          <div className="au-blob au-why-blob-2" />
          <div className="au-inner">
            <div className="au-why-header">
              <div className="au-reveal" ref={obs(4)}>
                <div className="au-eyebrow"><div className="au-eyebrow-line" />Why Tecniqa</div>
                <h2 className="au-section-heading">Why Choose <span>Us</span></h2>
                <p className="au-section-sub">We combine engineering expertise and customer-first service to deliver dependable cooling solutions.</p>
              </div>
            </div>

            <div className="au-why-grid">
              {WHY.map((item, i) => (
                <div
                  className={`au-why-card au-reveal au-reveal-d${i + 1}`}
                  key={item.title}
                  ref={obs(5 + i)}
                >
                  <div className="au-why-icon" style={{ background: item.gradient, color: item.color, boxShadow: `0 4px 18px ${item.glow}` }}>
                    <i className={item.icon} />
                  </div>
                  <h3 className="au-why-title">{item.title}</h3>
                  <p className="au-why-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 5. TIMELINE ════════════════════════════════════════════════════ */}
        <section className="au-section au-timeline-section">
          <div className="au-blob au-timeline-blob" />
          <div className="au-inner">
            <div className="au-reveal" ref={obs(9)}>
              <div className="au-eyebrow"><div className="au-eyebrow-line" />Our Story</div>
              <h2 className="au-section-heading">The Tecniqa <span>Journey</span></h2>
              <p className="au-section-sub">From a single vision to India's trusted HVAC destination.</p>
            </div>

            <div className="au-timeline-track">
              {TIMELINE.map((item, i) => (
                <div className={`au-tl-item au-reveal au-reveal-d${(i % 4) + 1}`} key={item.year} ref={obs(10 + i)}>
                  <div className="au-tl-dot" />
                  <div className="au-tl-year">{item.year}</div>
                  <div className="au-tl-title">{item.title}</div>
                  <p className="au-tl-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 6. CTA ═════════════════════════════════════════════════════════ */}
        <section className="au-cta-section">
          <div className="au-cta-grid" />
          <div className="au-cta-orb au-cta-orb-1" />
          <div className="au-cta-orb au-cta-orb-2" />
          <div className="au-inner au-cta-inner au-reveal" ref={obs(15)}>
            <h2 className="au-cta-heading">
              Ready to Explore <span>Professional</span><br />HVAC Solutions?
            </h2>
            <p className="au-cta-sub">
              Browse 500+ certified products trusted by HVAC professionals across India.
            </p>
            <div className="au-cta-btns">
              <button className="au-cta-primary" onClick={() => navigate("/featured-products")}>
                <i className="ri-store-2-line" />
                Explore Products
              </button>
              <button className="au-cta-secondary" onClick={() => navigate("/contact")}>
                <i className="ri-mail-send-line" />
                Get in Touch
              </button>
            </div>

            <div className="au-trust-row">
              {["Certified Products", "Industrial Grade", "Trusted by Professionals"].map((t) => (
                <div className="au-trust-badge" key={t}>
                  <i className="ri-checkbox-circle-fill" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}