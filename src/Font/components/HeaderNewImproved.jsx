import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import Logo from "../assets/logo.png";

const megaMenuData = [
  {
    label: "Product Group",
    columns: [
      { heading: "HVACR Service Tools",  links: ["Tube Bender", "Vacuum Pump", "Manifold Gauges", "Pipe Cutter"] },
      { heading: "HVAC&R Chemicals",     links: ["Cleaning Chemicals", "Crane Temper", "Flush Agents", "Coil Cleaners"] },
      { heading: "Gas Leak Monitors",    links: ["Refrigerant Leak Solutions", "Leak Monitors", "Gas Detectors"] },
      { heading: "Energy Solutions",     links: ["Phase Change Materials", "Thermal Storage", "Heat Exchangers"] },
    ],
    featured: { label: "New Arrivals", description: "Fresh tools & chemicals just landed", cta: "Shop Now →", to: "/new-arrivals" },
  },
];

/* ── Magnetic button hook ─────────────────────────────────────────────────── */
function useMagnetic(strength = 0.32) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const r  = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width  / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    ref.current.style.transform  = `translate(${dx * strength}px, ${dy * strength}px)`;
    ref.current.style.transition = "";
  }, [strength]);
  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transition = "transform .5s cubic-bezier(.23,1,.32,1)";
    ref.current.style.transform  = "translate(0,0)";
  }, []);
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

/* ── Scroll progress bar ─────────────────────────────────────────────────── */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const calc = () => {
      const el  = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    window.addEventListener("scroll", calc, { passive: true });
    return () => window.removeEventListener("scroll", calc);
  }, []);
  if (pct === 0) return null;
  return <div className="hdr-progress" style={{ width: `${pct}%` }} />;
}

export default function Header() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const [scrolled,      setScrolled]      = useState(false);
  const [cartOpen,      setCartOpen]      = useState(false);
  const [megaOpen,      setMegaOpen]      = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [category,      setCategory]      = useState("All");
  const [ripples,       setRipples]       = useState([]);
  const [utilIdx,       setUtilIdx]       = useState(0);

  const megaRef   = useRef(null);
  const megaTimer = useRef(null);
  const prevY     = useRef(0);

  /* Rotating utility messages */
  const UTILS = [
    ["ri-truck-line",             "Free Shipping Above ₹1,000"],
    ["ri-file-text-line",         "GST Invoice Available"],
    ["ri-shield-check-line",      "Trusted HVAC Supplier"],
    ["ri-customer-service-2-line","Expert Support 24/7"],
  ];
  useEffect(() => {
    const t = setInterval(() => setUtilIdx((i) => (i + 1) % UTILS.length), 3200);
    return () => clearInterval(t);
  }, []);

  /* Scroll */
  useEffect(() => {
    const h = () => { setScrolled(window.scrollY > 8); prevY.current = window.scrollY; };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* Outside click */
  useEffect(() => {
    const h = (e) => { if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(null); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  /* Assets */
  useEffect(() => {
    [
      { id: "remix-icons-css", href: "https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" },
      { id: "header-fonts",    href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700&display=swap" },
    ].forEach(({ id, href }) => {
      if (!document.querySelector(`#${id}`)) {
        const l = document.createElement("link");
        l.id = id; l.rel = "stylesheet"; l.href = href;
        document.head.appendChild(l);
      }
    });
  }, []);

  /* Cart */
  const getCart = () => { try { return JSON.parse(localStorage.getItem("cart")) || []; } catch { return []; } };
  const [cart, setCart] = useState(getCart);
  useEffect(() => { if (cartOpen) setCart(getCart()); }, [cartOpen]);
  const cartCount = cart.reduce((s, i) => s + (i.qty || 1), 0);
  const updateCart = (nc) => { localStorage.setItem("cart", JSON.stringify(nc)); setCart([...nc]); };

  /* Mega */
  const openMega  = (i) => { clearTimeout(megaTimer.current); setMegaOpen(i); };
  const closeMega = ()  => { megaTimer.current = setTimeout(() => setMegaOpen(null), 140); };

  /* Ripple */
  const addRipple = (e) => {
    const b  = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - b.left, y: e.clientY - b.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 700);
  };

  /* Magnetic refs */
  const magAcc  = useMagnetic(0.3);
  const magWish = useMagnetic(0.3);
  const magCart = useMagnetic(0.22);

  const navLinks = [
    { label: "Home",         to: "/" },
    { label: "New Arrivals", to: "/new-arrivals" },
    ...megaMenuData.map((m, i) => ({ label: m.label, mega: i })),
    { label: "About Us",     to: "/about-us" },
    { label: "Contact",      to: "/contact" },
  ];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .hdr-root {
          --brand:      #0793a6;
          --brand-dk:   #056577;
          --brand-lt:   #e0f7fa;
          --ink:        #0f172a;
          --ink-mid:    #475569;
          --ink-soft:   #94a3b8;
          --surface:    #ffffff;
          --border:     #e2e8f0;
          --pill:       999px;
          --ff-b:       'DM Sans', sans-serif;
          --ff-d:       'Syne', sans-serif;
          font-family: var(--ff-b);
        }

        /* ── Utility bar ── */
        .hdr-util {
          background: var(--ink);
          height: 38px; padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; overflow: hidden; position: relative;
        }
        .hdr-util::after {
          content: '';
          position: absolute; top: 0; left: -60%; width: 50%; height: 100%;
          background: linear-gradient(90deg,transparent,rgba(7,147,166,.1),transparent);
          animation: hdrSweep 4.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes hdrSweep { 0%{left:-60%} 100%{left:130%} }

        .hdr-util-center {
          flex: 1; display: flex; justify-content: center; align-items: center;
          font-size: 12.5px; font-weight: 500; letter-spacing: .02em;
          position: relative; z-index: 1; overflow: hidden; height: 38px;
        }
        .hdr-util-msg {
          display: flex; align-items: center; gap: 7px; color: #e2e8f0;
          animation: hdrMsgIn .42s cubic-bezier(.22,1,.36,1) both;
          position: absolute;
        }
        @keyframes hdrMsgIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .hdr-util-msg i { color: var(--brand); font-size: 13px; }

        .hdr-util-right { display:flex; align-items:center; gap:20px; position:relative; z-index:1; }
        .hdr-util-link {
          display: flex; align-items: center; gap: 5px;
          color: #94a3b8; font-size: 12.5px; font-family: var(--ff-b);
          background: none; border: none; cursor: pointer; text-decoration: none;
          transition: color .2s; padding: 0;
        }
        .hdr-util-link:hover { color: var(--brand); }

        /* ── Sticky ── */
        .hdr-sticky {
          position: sticky; top: 0; z-index: 1100;
          transition: background .3s, box-shadow .3s;
        }
        .hdr-sticky.scrolled {
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px);
          box-shadow: 0 1px 0 var(--border), 0 6px 32px rgba(0,0,0,.1);
        }
        .hdr-sticky:not(.scrolled) { background:#fff; box-shadow: 0 1px 0 var(--border); }

        /* Scroll progress bar */
        .hdr-progress {
          position: absolute; top: 0; left: 0; height: 2.5px;
          background: linear-gradient(90deg, var(--brand), #2563eb, var(--brand));
          background-size: 200%;
          animation: hdrPShimmer 2.5s linear infinite;
          z-index: 10; pointer-events: none;
          transition: width .1s linear;
        }
        @keyframes hdrPShimmer { 0%{background-position:0%} 100%{background-position:200%} }

        /* ── Main row ── */
        .hdr-main {
          display: flex; align-items: center; gap: 24px;
          padding: 8px 40px; border-bottom: 1px solid var(--border);
        }

        /* Logo */
        .hdr-logo {
          display: flex; align-items: center; text-decoration: none;
          flex-shrink: 0;
          transition: transform .35s cubic-bezier(.34,1.56,.64,1);
        }
        .hdr-logo:hover { transform: scale(1.05) rotate(-1deg); }
        .hdr-logo img { height: 58px; display: block; }

        /* Search */
        .hdr-sw { flex: 1; max-width: 720px; margin: 0 auto; }
        .hdr-search {
          display: flex; align-items: center;
          background: #f1f5f9; border-radius: var(--pill);
          border: 2px solid transparent; height: 46px; overflow: hidden;
          transition: border-color .25s, box-shadow .25s, background .25s;
          position: relative;
        }
        .hdr-search.focused {
          background: #fff; border-color: var(--brand);
          box-shadow: 0 0 0 5px rgba(7,147,166,.12), 0 4px 18px rgba(7,147,166,.14);
        }
        .hdr-search-cat {
          appearance: none; background: none; border: none;
          border-right: 1px solid #cbd5e1; padding: 0 28px 0 18px;
          font-family: var(--ff-b); font-size: 13px; font-weight: 500;
          color: var(--ink-mid); cursor: pointer; height: 100%; min-width: 128px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2394a3b8'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center;
        }
        .hdr-search-cat:focus { outline: none; }
        .hdr-search-input {
          flex: 1; border: none; background: none; padding: 0 16px;
          font-family: var(--ff-b); font-size: 14px; color: var(--ink); height: 100%;
        }
        .hdr-search-input::placeholder { color: var(--ink-soft); }
        .hdr-search-input:focus { outline: none; }
        .hdr-search-btn {
          display: flex; align-items: center; justify-content: center;
          width: 48px; height: 46px;
          background: var(--brand); border: none;
          border-radius: 0 var(--pill) var(--pill) 0;
          color: #fff; cursor: pointer; font-size: 18px; flex-shrink: 0;
          position: relative; overflow: hidden;
          transition: background .25s, box-shadow .25s;
        }
        /* Shine sweep */
        .hdr-search-btn::after {
          content:''; position:absolute; top:0; left:-100%; width:55%; height:100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent);
          transform: skewX(-18deg); transition: left .4s;
        }
        .hdr-search-btn:hover { background: var(--brand-dk); box-shadow: 0 0 0 6px rgba(7,147,166,.14); }
        .hdr-search-btn:hover::after { left: 160%; }

        /* Actions */
        .hdr-actions { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
        .hdr-action-btn {
          display: flex; flex-direction: column; align-items: center; gap: 2px;
          padding: 8px 12px; border-radius: 14px; border: none; background: none;
          cursor: pointer; color: var(--ink); font-family: var(--ff-b);
          position: relative; overflow: hidden;
          transition: color .25s;
        }
        /* Liquid bubble fill */
        .hdr-action-btn::before {
          content:''; position:absolute; bottom:-100%; left:0; right:0; height:200%;
          background: var(--brand-lt); border-radius: 50% 50% 0 0 / 30% 30% 0 0;
          transition: bottom .38s cubic-bezier(.34,1.2,.64,1), border-radius .38s;
        }
        .hdr-action-btn:hover::before { bottom: 0; border-radius: 14px; }
        .hdr-action-btn:hover { color: var(--brand); }
        .hdr-action-btn i {
          font-size: 22px; line-height: 1; position: relative; z-index: 1;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1);
        }
        .hdr-action-btn:hover i { transform: scale(1.22) translateY(-2px); }
        .hdr-action-label { font-size: 11px; font-weight: 500; white-space: nowrap; position: relative; z-index: 1; }

        /* Badge with pulse ring */
        .hdr-badge {
          position: absolute; top: 4px; right: 5px;
          background: #ef4444; color: #fff; font-size: 10px; font-weight: 700;
          width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; z-index: 2;
        }
        .hdr-badge::after {
          content:''; position:absolute; inset:-3px;
          border-radius: 50%; border: 2px solid #ef4444;
          animation: hdrBadgePulse 1.9s ease infinite;
        }
        @keyframes hdrBadgePulse {
          0%  { transform:scale(1);   opacity:.8; }
          70% { transform:scale(1.9); opacity:0;  }
          100%{ transform:scale(1.9); opacity:0;  }
        }

        /* Ripple */
        .hdr-ripple {
          position: absolute; border-radius: 50%;
          background: rgba(7,147,166,.22); pointer-events: none;
          animation: hdrRippleOut .68s ease-out forwards;
          transform: translate(-50%,-50%);
        }
        @keyframes hdrRippleOut {
          from { width:0; height:0; opacity:.8; }
          to   { width:150px; height:150px; opacity:0; }
        }

        .hdr-divider { width:1px; height:36px; background:var(--border); margin:0 4px; }

        /* ── Navbar ── */
        .hdr-nav {
          display: flex; align-items: center; justify-content: center;
          gap: 2px; padding: 0 40px; height: 40px;
          background: var(--surface); position: relative; overflow: visible;
        }
        /* Gradient bottom line */
        .hdr-nav::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:1px;
          background: linear-gradient(90deg,transparent,rgba(7,147,166,.28),transparent);
        }

        /* Categories pill */
        .hdr-cat-btn {
          display: flex; align-items: center; gap: 8px; padding: 8px 18px;
          background: linear-gradient(135deg, var(--brand), var(--brand-dk));
          color: #fff; border: none; border-radius: 10px;
          font-family: var(--ff-b); font-size: 13.5px; font-weight: 600;
          cursor: pointer; flex-shrink: 0;
          position: relative; overflow: hidden;
          box-shadow: 0 4px 14px rgba(7,147,166,.26);
          transition: transform .28s cubic-bezier(.34,1.56,.64,1), box-shadow .25s;
        }
        .hdr-cat-btn::after {
          content:''; position:absolute; top:0; left:-100%; width:50%; height:100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);
          transform: skewX(-18deg); transition: left .42s;
        }
        .hdr-cat-btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 24px rgba(7,147,166,.4); }
        .hdr-cat-btn:hover::after { left: 160%; }
        .hdr-cat-btn i { font-size: 17px; }

        .hdr-nav-center { display: flex; align-items: center; gap: 2px; }

        .hdr-nav-link {
          display: flex; align-items: center; gap: 4px;
          padding: 7px 14px; border-radius: 8px;
          font-size: 14px; font-weight: 500; color: var(--ink-mid);
          text-decoration: none; border: none; background: none;
          cursor: pointer; font-family: var(--ff-b); position: relative;
          white-space: nowrap; transition: color .2s;
        }
        /* Animated underline */
        .hdr-nav-link::after {
          content:''; position:absolute; bottom:3px; left:50%;
          transform: translateX(-50%) scaleX(0);
          width: calc(100% - 28px); height: 2px;
          background: linear-gradient(90deg, var(--brand), #2563eb);
          border-radius: 2px;
          transition: transform .28s cubic-bezier(.4,0,.2,1);
        }
        .hdr-nav-link:hover::after, .hdr-nav-link.active::after { transform: translateX(-50%) scaleX(1); }
        .hdr-nav-link:hover, .hdr-nav-link.active { color: var(--ink); }
        /* Active glow dot */
        .hdr-nav-link.active::before {
          content:''; position:absolute; bottom:1px; left:50%;
          transform:translateX(-50%); width:4px; height:4px; border-radius:50%;
          background: var(--brand); box-shadow: 0 0 7px var(--brand);
        }
        .hdr-nav-link i { font-size:16px; transition: transform .28s cubic-bezier(.34,1.56,.64,1); }
        .hdr-nav-link.mega-open i { transform: rotate(180deg); }

        /* ── Mega menu ── */
        .hdr-mega {
          position: absolute; top: calc(100% + 16px); left: 50%;
          transform: translateX(-50%);
          width: 1100px; max-width: 95vw;
          background: #fff; border: 1px solid var(--border);
          border-radius: 24px;
          box-shadow: 0 28px 70px rgba(0,0,0,.13), 0 6px 18px rgba(0,0,0,.07);
          overflow: hidden; z-index: 1200; display: flex;
          animation: megaBounce .3s cubic-bezier(.34,1.2,.64,1) both;
        }
        @keyframes megaBounce {
          0%  { opacity:0; transform:translateX(-50%) translateY(-18px) scaleY(.9); }
          65% { opacity:1; transform:translateX(-50%) translateY(3px) scaleY(1.01); }
          100%{ opacity:1; transform:translateX(-50%) translateY(0) scaleY(1); }
        }
        .hdr-mega-cols { flex:1; display:grid; grid-template-columns:repeat(4,1fr); gap:8px; padding:28px; }
        .hdr-mega-col-h {
          font-family: var(--ff-d); font-size:11.5px; font-weight:700;
          letter-spacing:.09em; text-transform:uppercase; color:var(--brand);
          margin-bottom:12px; padding-bottom:8px; border-bottom:1px solid var(--brand-lt);
        }
        .hdr-mega-col-link {
          display:block; padding:7px 0; font-size:13.5px; color:var(--ink-mid);
          text-decoration:none; border-radius:6px; position:relative;
          transition: color .18s, padding-left .22s cubic-bezier(.4,0,.2,1);
        }
        .hdr-mega-col-link::before {
          content:'→'; position:absolute; left:-14px; opacity:0; color:var(--brand); font-size:12px;
          transition: opacity .18s, left .22s;
        }
        .hdr-mega-col-link:hover { color:var(--brand); padding-left:10px; }
        .hdr-mega-col-link:hover::before { opacity:1; left:0; }

        /* Featured panel */
        .hdr-mega-feat {
          width:210px; flex-shrink:0;
          background: linear-gradient(160deg, var(--brand), var(--brand-dk));
          padding:28px 24px; display:flex; flex-direction:column;
          justify-content:flex-end; gap:8px; position:relative; overflow:hidden;
        }
        .hdr-mega-feat::before {
          content:''; position:absolute; top:-70px; right:-70px;
          width:220px; height:220px; border-radius:50%;
          background:rgba(255,255,255,.07);
          animation:hdrFeatOrb 5s ease-in-out infinite alternate;
        }
        @keyframes hdrFeatOrb { from{transform:scale(1)} to{transform:scale(1.25) translate(-12px,12px)} }
        .hdr-mega-feat-tag {
          display:inline-block; background:rgba(255,255,255,.18); color:#fff;
          font-size:10.5px; font-weight:600; letter-spacing:.09em; text-transform:uppercase;
          padding:3px 10px; border-radius:20px; width:fit-content; position:relative; z-index:1;
        }
        .hdr-mega-feat-title { font-family:var(--ff-d); font-size:18px; font-weight:700; color:#fff; line-height:1.2; position:relative; z-index:1; }
        .hdr-mega-feat-desc  { font-size:12.5px; color:rgba(255,255,255,.72); line-height:1.5; position:relative; z-index:1; }
        .hdr-mega-feat-cta {
          display:inline-flex; align-items:center; gap:6px; margin-top:12px;
          background:#fff; color:var(--brand); font-size:13px; font-weight:600;
          padding:8px 16px; border-radius:var(--pill); text-decoration:none;
          width:fit-content; position:relative; z-index:1;
          transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .2s;
        }
        .hdr-mega-feat-cta:hover { transform:translateX(5px); box-shadow:0 4px 14px rgba(0,0,0,.16); }

        /* ── Cart drawer ── */
        .hdr-overlay {
          position:fixed; inset:0; background:rgba(15,23,42,.45);
          backdrop-filter:blur(6px); z-index:1300;
          animation:hdrFadeIn .22s ease;
        }
        @keyframes hdrFadeIn { from{opacity:0} to{opacity:1} }
        .hdr-drawer {
          position:fixed; top:0; right:0; bottom:0; width:390px;
          background:#fff; z-index:1400; display:flex; flex-direction:column;
          box-shadow:-16px 0 60px rgba(0,0,0,.14);
          animation:hdrSlideIn .3s cubic-bezier(.34,1.1,.64,1);
        }
        @keyframes hdrSlideIn { from{transform:translateX(100%)} to{transform:translateX(0)} }

        .hdr-drawer-head {
          display:flex; align-items:center; justify-content:space-between;
          padding:20px 24px; border-bottom:1px solid var(--border);
          background:linear-gradient(135deg,rgba(7,147,166,.04),transparent);
        }
        .hdr-drawer-title { font-family:var(--ff-d); font-size:18px; font-weight:700; }
        .hdr-drawer-close {
          width:36px; height:36px; border-radius:50%;
          border:1px solid var(--border); background:none; cursor:pointer;
          color:var(--ink-mid); font-size:18px;
          display:flex; align-items:center; justify-content:center;
          transition:background .2s, color .2s, transform .25s cubic-bezier(.34,1.56,.64,1);
        }
        .hdr-drawer-close:hover { background:#fee2e2; color:#ef4444; transform:rotate(90deg) scale(1.1); }

        .hdr-drawer-body { flex:1; overflow-y:auto; padding:20px 24px; }
        .hdr-cart-empty {
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          height:100%; gap:12px; color:var(--ink-soft);
        }
        .hdr-cart-empty i { font-size:60px; color:#cbd5e1; animation:hdrBounce 2s ease infinite; }
        @keyframes hdrBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .hdr-cart-empty p { font-size:15px; }

        .hdr-cart-item {
          display:flex; gap:14px; align-items:flex-start;
          background:#f8fafc; border:1px solid #e2e8f0;
          border-radius:16px; padding:14px; margin-bottom:12px;
          transition:transform .22s cubic-bezier(.4,0,.2,1), box-shadow .22s, border-color .22s;
        }
        .hdr-cart-item:hover { transform:translateY(-3px); box-shadow:0 10px 28px rgba(15,23,42,.09); border-color:rgba(7,147,166,.3); }
        .hdr-cart-item-img { width:68px; height:68px; border-radius:10px; border:1px solid var(--border); object-fit:contain; padding:4px; }
        .hdr-cart-item-info { flex:1; }
        .hdr-cart-item-title { font-size:13.5px; font-weight:600; color:var(--ink); line-height:1.3; }
        .hdr-cart-item-price { font-size:13px; color:var(--brand); font-weight:700; margin-top:3px; }
        .hdr-qty-ctrl {
          display:inline-flex; align-items:center; gap:10px;
          background:#fff; border:1.5px solid #e2e8f0;
          border-radius:var(--pill); padding:3px 8px; margin-top:9px;
        }
        .hdr-qty-btn {
          width:26px; height:26px; border-radius:50%; border:none;
          background:#f1f5f9; cursor:pointer; font-size:14px; font-weight:700;
          display:flex; align-items:center; justify-content:center; color:var(--ink);
          transition:background .18s, transform .22s cubic-bezier(.34,1.56,.64,1), color .18s;
        }
        .hdr-qty-btn:hover { background:var(--brand); color:#fff; transform:scale(1.18); }
        .hdr-qty-val { font-size:14px; font-weight:700; min-width:20px; text-align:center; }
        .hdr-item-remove {
          background:none; border:none; cursor:pointer; color:var(--ink-soft);
          font-size:18px; padding:4px; border-radius:6px;
          transition:color .15s, transform .2s cubic-bezier(.34,1.56,.64,1);
        }
        .hdr-item-remove:hover { color:#ef4444; transform:scale(1.22) rotate(-8deg); }

        .hdr-drawer-foot {
          padding:18px 24px; background:#fff;
          box-shadow:0 -8px 30px rgba(15,23,42,.06);
          border-top:1px solid rgba(226,232,240,.8);
          display:flex; flex-direction:column; gap:10px;
        }
        .hdr-drawer-total { display:flex; justify-content:space-between; font-size:15px; font-weight:700; color:var(--ink); margin-bottom:2px; }

        .hdr-btn-primary {
          display:flex; align-items:center; justify-content:center; gap:8px;
          width:100%; height:50px;
          background:linear-gradient(135deg,var(--brand),var(--brand-dk));
          color:#fff; border:none; border-radius:13px;
          font-family:var(--ff-b); font-size:15px; font-weight:700;
          cursor:pointer; text-decoration:none;
          box-shadow:0 8px 22px rgba(7,147,166,.28);
          position:relative; overflow:hidden;
          transition:transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s;
        }
        .hdr-btn-primary::after {
          content:''; position:absolute; top:0; left:-100%; width:50%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);
          transform:skewX(-18deg); transition:left .45s;
        }
        .hdr-btn-primary:hover { transform:translateY(-2px); box-shadow:0 14px 32px rgba(7,147,166,.42); }
        .hdr-btn-primary:hover::after { left:160%; }
        .hdr-btn-ghost {
          display:flex; align-items:center; justify-content:center;
          width:100%; padding:11px; background:none;
          border:1.5px solid var(--border); border-radius:12px;
          font-family:var(--ff-b); font-size:14px; font-weight:500; color:var(--ink-mid);
          cursor:pointer; transition:border-color .2s, color .2s;
        }
        .hdr-btn-ghost:hover { border-color:var(--brand); color:var(--brand); }
      `}</style>

      <div className="hdr-root">

        {/* ── Utility bar ── */}
        <div className="hdr-util">
          <div className="hdr-util-center">
            <span className="hdr-util-msg" key={utilIdx}>
              <i className={UTILS[utilIdx][0]} />
              {UTILS[utilIdx][1]}
            </span>
          </div>
          <div className="hdr-util-right">
            <button className="hdr-util-link"><i className="ri-customer-service-2-line" />Support</button>
            <button className="hdr-util-link"><i className="ri-mail-line" />Subscribe</button>
          </div>
        </div>

        {/* ── Sticky ── */}
        <div className={`hdr-sticky${scrolled ? " scrolled" : ""}`}>
          <ScrollProgress />

          {/* Main row */}
          <div className="hdr-main">
            <Link to="/" className="hdr-logo">
              <img src={Logo} alt="Logo" />
            </Link>

            <div className="hdr-sw">
              <div className={`hdr-search${searchFocused ? " focused" : ""}`}>
                <select className="hdr-search-cat" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>All</option><option>Tools</option><option>Chemicals</option>
                  <option>Gas Monitors</option><option>Energy</option>
                </select>
                <input
                  className="hdr-search-input"
                  placeholder="Search products, brands, categories…"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <button className="hdr-search-btn"><i className="ri-search-line" /></button>
              </div>
            </div>

            <div className="hdr-actions">
              {/* Account — magnetic */}
              <button className="hdr-action-btn" ref={magAcc.ref} onMouseMove={magAcc.onMouseMove} onMouseLeave={magAcc.onMouseLeave} onClick={() => navigate("/login")}>
                <i className="ri-user-3-line" />
                <span className="hdr-action-label">Account</span>
              </button>
              <div className="hdr-divider" />
              {/* Wishlist — magnetic */}
              <button className="hdr-action-btn" ref={magWish.ref} onMouseMove={magWish.onMouseMove} onMouseLeave={magWish.onMouseLeave} onClick={() => navigate("/wishlist")}>
                <i className="ri-heart-3-line" />
                <span className="hdr-action-label">Wishlist</span>
              </button>
              {/* Cart — magnetic + ripple */}
              <button
                className="hdr-action-btn"
                ref={magCart.ref}
                onMouseMove={magCart.onMouseMove}
                onMouseLeave={magCart.onMouseLeave}
                onClick={(e) => { addRipple(e); setCartOpen(true); }}
                style={{ position: "relative", overflow: "hidden" }}
              >
                {ripples.map((r) => (
                  <span key={r.id} className="hdr-ripple" style={{ left: r.x, top: r.y }} />
                ))}
                <i className="ri-shopping-cart-2-line" />
                <span className="hdr-action-label">Cart</span>
                {cartCount > 0 && <span className="hdr-badge">{cartCount}</span>}
              </button>
            </div>
          </div>

          {/* Navbar */}
          <nav className="hdr-nav" ref={megaRef}>

            <div className="hdr-divider" style={{ height: 22, margin: "0 6px" }} />
            <div className="hdr-nav-center">
              {navLinks.map((link, idx) => {
                if (link.mega !== undefined) {
                  const isOpen = megaOpen === link.mega;
                  const data   = megaMenuData[link.mega];
                  return (
                    <div key={idx} style={{ position: "relative" }}
                      onMouseEnter={() => openMega(link.mega)} onMouseLeave={closeMega}>
                      <button className={`hdr-nav-link${isOpen ? " mega-open" : ""}`}>
                        {link.label}<i className="ri-arrow-down-s-line" />
                      </button>
                      {isOpen && (
                        <div className="hdr-mega" onMouseEnter={() => openMega(link.mega)} onMouseLeave={closeMega}>
                          <div className="hdr-mega-cols">
                            {data.columns.map((col) => (
                              <div key={col.heading}>
                                <div className="hdr-mega-col-h">{col.heading}</div>
                                {col.links.map((lnk) => (
                                  <Link key={lnk} to={`/product-group/${encodeURIComponent(lnk)}`} className="hdr-mega-col-link" onClick={() => setMegaOpen(null)}>{lnk}</Link>
                                ))}
                              </div>
                            ))}
                          </div>
                          {data.featured && (
                            <div className="hdr-mega-feat">
                              <div className="hdr-mega-feat-tag">{data.featured.label}</div>
                              <div className="hdr-mega-feat-title">New tools just landed</div>
                              <div className="hdr-mega-feat-desc">{data.featured.description}</div>
                              <Link to={data.featured.to} className="hdr-mega-feat-cta" onClick={() => setMegaOpen(null)}>{data.featured.cta}</Link>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
                const isActive = location.pathname === link.to;
                return (
                  <Link key={idx} to={link.to} className={`hdr-nav-link${isActive ? " active" : ""}`}>{link.label}</Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Cart drawer */}
        {cartOpen && createPortal(
          <>
            <div className="hdr-overlay" onClick={() => setCartOpen(false)} />
            <div className="hdr-drawer">
              <div className="hdr-drawer-head">
                <span className="hdr-drawer-title">Your Cart {cartCount > 0 && `(${cartCount})`}</span>
                <button className="hdr-drawer-close" onClick={() => setCartOpen(false)}><i className="ri-close-line" /></button>
              </div>
              <div className="hdr-drawer-body">
                {cart.length === 0 ? (
                  <div className="hdr-cart-empty">
                    <i className="ri-shopping-bag-3-line" /><p>Your cart is empty</p>
                  </div>
                ) : (
                  cart.map((item, i) => (
                    <div className="hdr-cart-item" key={i}>
                      <img className="hdr-cart-item-img" src={item.image} alt={item.title} />
                      <div className="hdr-cart-item-info">
                        <div className="hdr-cart-item-title">{item.title}</div>
                        <div className="hdr-cart-item-price">₹{item.price?.toLocaleString("en-IN")}</div>
                        <div className="hdr-qty-ctrl">
                          <button className="hdr-qty-btn" onClick={() => { const nc=[...cart]; nc[i].qty=Math.max(1,(nc[i].qty||1)-1); updateCart(nc); }}>−</button>
                          <span className="hdr-qty-val">{item.qty||1}</span>
                          <button className="hdr-qty-btn" onClick={() => { const nc=[...cart]; nc[i].qty=(nc[i].qty||1)+1; updateCart(nc); }}>+</button>
                        </div>
                      </div>
                      <button className="hdr-item-remove" onClick={() => { const nc=[...cart]; nc.splice(i,1); updateCart(nc); }}>
                        <i className="ri-delete-bin-6-line" />
                      </button>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="hdr-drawer-foot">
                  <div className="hdr-drawer-total">
                    <span>Subtotal</span>
                    <span>₹{cart.reduce((s,i)=>s+(Number(String(i.price).replace(/[^\d.]/g,""))||0)*(i.qty||1),0).toLocaleString("en-IN")}</span>
                  </div>
                  <button className="hdr-btn-primary" onClick={() => { setCartOpen(false); navigate("/checkout"); }}>
                    <i className="ri-secure-payment-line" />Proceed to Checkout
                  </button>
                  <button className="hdr-btn-ghost" onClick={() => setCartOpen(false)}>Continue Shopping</button>
                </div>
              )}
            </div>
          </>,
          document.body
        )}
      </div>
    </>
  );
}