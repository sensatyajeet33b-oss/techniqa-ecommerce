import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import Logo from "../assets/logo.png";
import { getWishlist } from "../../utils/wishlist";
import {
    getCurrentUser,
    logoutUser,
} from "../../utils/auth";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const megaMenuData = [
    {
        label: "Product Group",
        columns: [
            { heading: "HVACR Service Tools", links: ["Tube Bender", "Vacuum Pump", "Manifold Gauges", "Pipe Cutter"] },
            { heading: "HVAC&R Chemicals", links: ["Cleaning Chemicals", "Crane Temper", "Flush Agents", "Coil Cleaners"] },
            { heading: "Gas Leak Monitors", links: ["Refrigerant Leak Solutions", "Leak Monitors", "Gas Detectors"] },
            { heading: "Energy Solutions", links: ["Phase Change Materials", "Thermal Storage", "Heat Exchangers"] },
        ],
        featured: { label: "New Arrivals", description: "Fresh tools & chemicals just landed", cta: "Shop Now →", to: "/new-arrivals" },
    },
];

const TRENDING = ["Vacuum Pump", "Leak Detector", "Manifold Gauge", "Coil Cleaner", "Refrigerant Tool"];
const RECENT_KEY = "hdr_recent_searches";

const FREE_SHIPPING_THRESHOLD = 1000;

/* ─────────────────────────────────────────────────────────────
   SCROLL PROGRESS
───────────────────────────────────────────────────────────── */
function ScrollProgress() {
    const [pct, setPct] = useState(0);
    useEffect(() => {
        const calc = () => {
            const el = document.documentElement;
            const max = el.scrollHeight - el.clientHeight;
            setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
        };
        window.addEventListener("scroll", calc, { passive: true });
        return () => window.removeEventListener("scroll", calc);
    }, []);
    if (pct === 0) return null;
    return <div className="hdr-progress" style={{ width: `${pct}%` }} />;
}

/* ─────────────────────────────────────────────────────────────
   TOAST
───────────────────────────────────────────────────────────── */
function Toast({ msg, onDone }) {
    useEffect(() => { const t = setTimeout(onDone, 2600); return () => clearTimeout(t); }, []);
    return createPortal(
        <div className="hdr-toast">{msg}</div>,
        document.body
    );
}

/* ─────────────────────────────────────────────────────────────
   HEADER
───────────────────────────────────────────────────────────── */
export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === "/";

    /* State */
    const [scrolled, setScrolled] = useState(false);
    const [compact, setCompact] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [megaOpen, setMegaOpen] = useState(null);
    const [wishlistCount, setWishlistCount] = useState(
        getWishlist().length
    );
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);   // Ctrl+K modal
    const [category, setCategory] = useState("All");
    const [toast, setToast] = useState(null);
    const [cartShake, setCartShake] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const [currentUser, setCurrentUser] = useState(getCurrentUser());
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [mobileUserMenu, setMobileUserMenu] = useState(false);

    /* Refs */
    const megaRef = useRef(null);
    const megaTimer = useRef(null);
    const prevY = useRef(0);
    const searchRef = useRef(null);
    const searchInput = useRef(null);

    /* ── Assets ── */
    useEffect(() => {
        [
            { id: "remix-icons-css", href: "https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" },
            { id: "header-fonts", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700&display=swap" },
        ].forEach(({ id, href }) => {
            if (!document.querySelector(`#${id}`)) {
                const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"; l.href = href;
                document.head.appendChild(l);
            }
        });
        try { setRecentSearches(JSON.parse(localStorage.getItem(RECENT_KEY)) || []); } catch { }
    }, []);


    useEffect(() => {

        const closeMenu = (e) => {

            if (
                !e.target.closest(".hdr-user-wrap")
            ) {

                setMobileUserMenu(false);

            }

        };

        document.addEventListener(
            "click",
            closeMenu
        );

        return () =>
            document.removeEventListener(
                "click",
                closeMenu
            );

    }, []);

    /* ── Scroll: compact + hide/reveal ── */
    useEffect(() => {
        const h = () => {
            const y = window.scrollY;
            const dir = y > prevY.current ? "down" : "up";
            setScrolled(y > 8);
            setCompact(y > 80);
            setHidden(y > 160 && dir === "down");
            prevY.current = y;
        };
        window.addEventListener("scroll", h, { passive: true });
        return () => window.removeEventListener("scroll", h);
    }, []);

    /* WISHLIST LISTENER */
    useEffect(() => {

        const updateWishlist = () => {
            setWishlistCount(getWishlist().length);
        };

        window.addEventListener("wishlistUpdated", updateWishlist);

        return () => {
            window.removeEventListener(
                "wishlistUpdated",
                updateWishlist
            );
        };

    }, []);

    /* CART LISTENER */
    useEffect(() => {

        const updateCartItems = () => {

            const updatedCart =
                JSON.parse(localStorage.getItem("cart")) || [];

            setCart(updatedCart);
        };

        window.addEventListener(
            "cartUpdated",
            updateCartItems
        );

        return () => {

            window.removeEventListener(
                "cartUpdated",
                updateCartItems
            );

        };

    }, []);

    /* ── Outside clicks ── */
    useEffect(() => {
        const h = (e) => {
            if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(null);
            if (searchRef.current && !searchRef.current.contains(e.target)) setSearchFocused(false);
        };
        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, []);

    /* ── Ctrl+K global search ── */
    useEffect(() => {
        const h = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault(); setSearchOpen(true);
                setTimeout(() => searchInput.current?.focus(), 60);
            }
            if (e.key === "Escape") setSearchOpen(false);
        };
        document.addEventListener("keydown", h);
        return () => document.removeEventListener("keydown", h);
    }, []);

    /* ── Cart ── */
    const getCart = () => { try { return JSON.parse(localStorage.getItem("cart")) || []; } catch { return []; } };
    const [cart, setCart] = useState(getCart);
    useEffect(() => { if (cartOpen) setCart(getCart()); }, [cartOpen]);
    const cartCount = cart.reduce((s, i) => s + (i.qty || 1), 0);
    const subtotal = cart.reduce((s, i) => s + (Number(String(i.price).replace(/[^\d.]/g, "")) || 0) * (i.qty || 1), 0);
    const toFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const freeShipPct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

    const handleLogout = () => {

        logoutUser();
        window.dispatchEvent(
            new Event("authChanged")
        );
        setCurrentUser(null);

        setShowUserMenu(false);

        navigate("/login");

    };

    const updateCart = (nc) => {

        localStorage.setItem(
            "cart",
            JSON.stringify(nc)
        );

        setCart([...nc]);

        window.dispatchEvent(
            new Event("cartUpdated")
        );
    };

    /* Cart shake */
    const shakeCart = () => { setCartShake(true); setTimeout(() => setCartShake(false), 600); };

    /* ── Mega ── */
    const openMega = (i) => { clearTimeout(megaTimer.current); setMegaOpen(i); };
    const closeMega = () => { megaTimer.current = setTimeout(() => setMegaOpen(null), 140); };

    /* ── Search suggestion ── */
    const suggestions = searchQuery.length > 0
        ? TRENDING.filter(t => t.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
        : [];

    const commitSearch = (term) => {
        if (!term.trim()) return;
        const updated = [term, ...recentSearches.filter(r => r !== term)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
        setSearchFocused(false);
        setSearchQuery("");
        navigate(`/featured-products?q=${encodeURIComponent(term)}`);
    };

    /* ── Toast helper ── */
    const showToast = (msg) => { setToast(msg); shakeCart(); };

    const navLinks = [
        { label: "Home", to: "/" },
        { label: "New Arrivals", to: "/new-arrivals" },
        ...megaMenuData.map((m, i) => ({ label: m.label, mega: i })),
        { label: "About Us", to: "/about-us" },
        { label: "Contact", to: "/contact" },
    ];


    useEffect(() => {

        const syncUser = () => {
            setCurrentUser(
                getCurrentUser()
            );
        };

        window.addEventListener(
            "authChanged",
            syncUser
        );

        return () =>
            window.removeEventListener(
                "authChanged",
                syncUser
            );

    }, []);

    /* ─────────────────────────────────────────────────────── */
    return (
        <>
            <style>{` 
        *,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.hdr-root {
    --brand: #0793a6;
    --brand-dk: #056577;
    --brand-lt: #cdedff;
    --ink: #0f172a;
    --ink-mid: #475569;
    --ink-soft: #94a3b8;
    --surface: #ffffff;
    --border: #adc4e1;
    --pill: 999px;
    --ff-b: 'DM Sans', sans-serif;
    --ff-d: 'Syne', sans-serif;
    font-family: var(--ff-b);
}

/* ── UTILITY BAR ── */
.hdr-util {
    background: var(--ink);
    height: 38px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    position: relative;
    overflow: hidden;
    transition: height .35s cubic-bezier(.4, 0, .2, 1), opacity .35s;
}

.hdr-util::after {
    content: '';
    position: absolute;
    top: 0;
    left: -60%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(7, 147, 166, .1), transparent);
    animation: hdrSweep 4.5s ease-in-out infinite;
    pointer-events: none;
}

@keyframes hdrSweep {
    0% {
        left: -60%
    }

    100% {
        left: 140%
    }
}

.hdr-util-center {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12.5px;
    font-weight: 500;
    letter-spacing: .02em;
    position: relative;
    z-index: 1;
}

.hdr-utility-check {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #e2e8f0;
}

.hdr-utility-check i {
    color: var(--brand);
    font-size: 13px;
}

.hdr-utility-sep {
    color: #334155;
    margin: 0 10px;
}

.hdr-utility-sep:last-child {
    display: none;
}

.hdr-util-right {
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    z-index: 1;
}

.hdr-utility-link {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #94a3b8;
    font-size: 12.5px;
    font-family: var(--ff-b);
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: color .2s;
    padding: 0;
}

.hdr-utility-link:hover {
    color: var(--brand);
}


.hdr-user-wrap {
  position: relative;
}

.hdr-user-dropdown{
    position:absolute;

    top:calc(100% + 14px);
    right:0;

    width:240px;

    background:
        rgba(255,255,255,.94);

    backdrop-filter:blur(15px);

    border:
        1px solid rgba(255,255,255,.45);

    border-radius:22px;

    box-shadow:
        0 18px 50px rgba(15,23,42,.12),
        0 4px 18px rgba(15,23,42,.06);

    padding:10px;

    display:flex;
    flex-direction:column;
    gap:4px;

    animation:dropdownFade .22s ease;

    overflow:hidden;
    z-index: 2000;
}

.hdr-user-dropdown button{
    width:100%;

    display:flex;
    align-items:center;
    gap:14px;

    padding:14px 16px;

    border:none;
    background:transparent;

    border-radius:14px;

    cursor:pointer;

    font-size:14px;
    font-weight:600;

    color:var(--ink);

    transition:
        background .2s,
        transform .2s;
}

.hdr-user-dropdown button:hover{
    background:
        rgba(7,147,166,.08);

    color:var(--brand);

    transform:translateX(4px);
}

.hdr-user-dropdown button.logout{
    color:#ef4444;
}

.hdr-user-dropdown button.logout:hover{
    background:rgba(239,68,68,.08);
}

@keyframes hdrDropdown {

  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hdr-user-dropdown button {

  width: 100%;

  border: none;
  background: none;

  padding: 14px 18px;

  text-align: left;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;

  transition: 0.2s;
}

.hdr-user-dropdown button:hover {

  background:
    rgba(6,182,212,.08);

  color: var(--brand);
}

.hdr-user-dropdown .logout:hover {

  background:
    rgba(239,68,68,.08);

  color: #ef4444;
}

/* ── STICKY WRAPPER ── */
.hdr-sticky {
    position: sticky;
    top: 0;
    z-index: 1100;
    transition: background .3s, box-shadow .3s, transform .4s cubic-bezier(.4, 0, .2, 1);
    /* ambient glow bottom */
    filter: drop-shadow(0 0 60px rgba(7, 147, 166, .06));
}

/* Hide on scroll down */
.hdr-sticky.hidden {
    transform: translateY(-100%);
}

/* Transparent on home (not scrolled) */
.hdr-sticky.home:not(.scrolled) {
    background: transparent;
    box-shadow: none;
}

.hdr-sticky.compact {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
}

.hdr-sticky.home:not(.scrolled) .hdr-main {
    border-bottom-color: rgba(255, 255, 255, .12);
}

.hdr-sticky.home:not(.scrolled) .hdr-nav {
    background: transparent;
}

.hdr-sticky.home:not(.scrolled) .hdr-nav::after {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .15), transparent);
}

.hdr-sticky.home:not(.scrolled) .hdr-nav-link {
    color: rgba(255, 255, 255, .8);
}

.hdr-sticky.home:not(.scrolled) .hdr-nav-link:hover {
    color: #fff;
}

.hdr-sticky.home:not(.scrolled) .hdr-action-btn {
    color: #fff;
}

.hdr-sticky.home:not(.scrolled) .hdr-action-btn:hover {
    background: rgba(255, 255, 255, .12);
    color: #fff;
}

.hdr-sticky.home:not(.scrolled) .hdr-divider {
    background: rgba(255, 255, 255, .2);
}

.hdr-sticky.home:not(.scrolled) .hdr-cat-btn {
    background: rgba(255, 255, 255, .14);
    box-shadow: none;
    border: 1px solid rgba(255, 255, 255, .25);
}

.hdr-sticky.home:not(.scrolled) .hdr-search {
    background: rgba(255, 255, 255, .14);
    border-color: rgba(255, 255, 255, .25);
}

.hdr-sticky.home:not(.scrolled) .hdr-search-input::placeholder {
    color: rgba(255, 255, 255, .7);
}

.hdr-sticky.home:not(.scrolled) .hdr-search-input {
    color: #fff;
}

.hdr-sticky.home:not(.scrolled) .hdr-search-cat {
    color: rgba(255, 255, 255, .8);
    border-right-color: rgba(255, 255, 255, .2);
}

.hdr-sticky.home:not(.scrolled) .hdr-action-label {
    color: rgba(255, 255, 255, .8);
}

/* Solid (non-home) */
.hdr-sticky.solid {
    background: #fff;
    box-shadow: 0 1px 0 var(--border);
}

/* Scrolled glass */
.hdr-sticky.scrolled {
    background: rgba(255, 255, 255, .92) !important;
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    box-shadow: 0 1px 0 var(--border), 0 6px 32px rgba(0, 0, 0, .1) !important;
}

/* Scroll progress */
.hdr-progress {
    position: fixed;
    bottom: 0;
    /* ← bottom of viewport instead of top of header */
    left: 0;
    height: 1px;
    background: linear-gradient(90deg, var(--brand), #2563eb, var(--brand));
    background-size: 200%;
    animation: hdrPShimmer 2.5s linear infinite;
    box-shadow: 0 0 10px rgba(7, 147, 166, .45);
    z-index: 9999;
    /* ← above everything */
    pointer-events: none;
    transition: width .1s linear;
}

@keyframes hdrPShimmer {
    0% {
        background-position: 0%
    }

    100% {
        background-position: 200%
    }
}

/* ── MAIN ROW ── */
.hdr-main {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 8px 40px;
    border-bottom: 1px solid var(--border);
    transition: padding .35s cubic-bezier(.4, 0, .2, 1);
}

.compact .hdr-main {
    padding: 2px 40px;
}

/* Logo */
.hdr-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
    transition: transform .35s cubic-bezier(.34, 1.56, .64, 1);
}

.hdr-logo:hover {
    transform: scale(1.05) rotate(-1deg);
}

.hdr-logo img {
    height: 58px;
    display: block;
    transition: height .35s cubic-bezier(.4, 0, .2, 1);
}

.compact .hdr-logo img {
    height: 44px !important;
}

/* Search */
.hdr-sw {
    flex: 1;
    max-width: 720px;
    margin: 0 auto;
    position: relative;
}

.hdr-search {
    display: flex;
    align-items: center;
    background: #f1f5f9;
    border-radius: var(--pill);
    border: 2px solid transparent;
    height: 46px;
    overflow: hidden;
    transition: border-color .25s, box-shadow .25s, background .25s, height .35s;
}

.compact .hdr-search {
    height: 40px;
}

.hdr-search.focused {
    background: #fff;
    border-color: var(--brand);
    box-shadow: 0 0 0 5px rgba(7, 147, 166, .12), 0 4px 18px rgba(7, 147, 166, .14);
}

.hdr-search-cat {
    appearance: none;
    background: none;
    border: none;
    border-right: 1px solid #cbd5e1;
    padding: 0 28px 0 18px;
    font-family: var(--ff-b);
    font-size: 13px;
    font-weight: 500;
    color: var(--ink-mid);
    cursor: pointer;
    height: 100%;
    min-width: 128px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2394a3b8'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
}

.hdr-search-cat:focus {
    outline: none
}

.hdr-search-input {
    flex: 1;
    border: none;
    background: none;
    padding: 0 16px;
    font-family: var(--ff-b);
    font-size: 14px;
    color: var(--ink);
    height: 100%;
}

.hdr-search-input::placeholder {
    color: var(--ink-soft)
}

.hdr-search-input:focus {
    outline: none
}

.hdr-search-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 100%;
    background: var(--brand);
    border: none;
    border-radius: 0 var(--pill) var(--pill) 0;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    position: relative;
    overflow: hidden;
    transition: background .25s, box-shadow .25s;
}

.hdr-search-btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 55%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .28), transparent);
    transform: skewX(-18deg);
    transition: left .4s;
}

.hdr-search-btn:hover {
    background: var(--brand-dk);
    box-shadow: 0 0 0 6px rgba(7, 147, 166, .14)
}

.hdr-search-btn:hover::after {
    left: 160%
}

/* Search suggestions dropdown */
.hdr-suggestions {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    z-index: 1300;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: 0 20px 52px rgba(15, 23, 42, .13);
    overflow: hidden;
    animation: hdrSugIn .2s cubic-bezier(.22, 1, .36, 1);
}

@keyframes hdrSugIn {
    from {
        opacity: 0;
        transform: translateY(-8px)
    }

    to {
        opacity: 1;
        transform: translateY(0)
    }
}

.hdr-sug-section {
    padding: 12px 16px 4px;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: .09em;
    text-transform: uppercase;
    color: var(--ink-soft);
}

.hdr-sug-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    cursor: pointer;
    transition: background .16s;
}

.hdr-sug-item:hover {
    background: #f8fafc;
}

.hdr-sug-item i {
    font-size: 15px;
    color: var(--ink-soft);
    flex-shrink: 0;
}

.hdr-sug-text {
    font-size: 13.5px;
    color: var(--ink);
    font-weight: 500;
}

.hdr-sug-kbd {
    margin-left: auto;
    font-size: 10.5px;
    color: var(--ink-soft);
    background: #f1f5f9;
    border: 1px solid var(--border);
    border-radius: 5px;
    padding: 2px 7px;
}

/* Actions */
.hdr-actions {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
}

.hdr-action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 8px 12px;
    border-radius: 14px;
    border: none;
    background: none;
    cursor: pointer;
    color: var(--ink);
    font-family: var(--ff-b);
    position: relative;
    overflow: hidden;
    transition: color .25s;
}

.hdr-action-btn::before {
    content: '';
    position: absolute;
    bottom: -100%;
    left: 0;
    right: 0;
    height: 200%;
    background: var(--brand-lt);
    border-radius: 50% 50% 0 0 / 30% 30% 0 0;
    transition: bottom .38s cubic-bezier(.34, 1.2, .64, 1), border-radius .38s;
}

.hdr-action-btn:hover::before {
    bottom: 0;
    border-radius: 14px;
}

.hdr-action-btn:hover {
    color: var(--brand);
}

.hdr-action-btn i {
    font-size: 22px;
    line-height: 1;
    position: relative;
    z-index: 1;
    transition: transform .3s cubic-bezier(.34, 1.56, .64, 1);
}

.hdr-action-btn:hover i {
    transform: scale(1.22) translateY(-2px);
}

.hdr-action-label {
    font-size: 11px;
    font-weight: 500;
    white-space: nowrap;
    position: relative;
    z-index: 1;
}

/* Cart badge */
.hdr-badge {
    position: absolute;
    top: 4px;
    right: 5px;
    background: #ef4444;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
}

.hdr-badge::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 2px solid #ef4444;
    animation: hdrBadgePulse 1.9s ease infinite;
}

@keyframes hdrBadgePulse {
    0% {
        transform: scale(1);
        opacity: .8
    }

    70% {
        transform: scale(1.9);
        opacity: 0
    }

    100% {
        transform: scale(1.9);
        opacity: 0
    }
}

.hdr-cart-item{
    position:relative;

    transition:
      transform .2s,
      box-shadow .2s,
      border-color .2s;
}

.hdr-cart-item:hover{
    transform:translateY(-2px);

    box-shadow:
      0 10px 24px rgba(15,23,42,.06);

    border-color:
      rgba(7,147,166,.18);
}

.hdr-cart-item-img{
    width:72px;
    height:72px;

    object-fit:cover;

    border-radius:14px;

    background:#fff;

    padding:6px;
}

/* Cart icon shake */
.hdr-cart-shake {
    animation: hdrShake .55s cubic-bezier(.36, .07, .19, .97) both;
}

@keyframes hdrShake {

    10%,
    90% {
        transform: translate(-1px, -1px)
    }

    20%,
    80% {
        transform: translate(2px, 1px)
    }

    30%,
    50%,
    70% {
        transform: translate(-2px, -2px)
    }

    40%,
    60% {
        transform: translate(2px, 2px)
    }
}

.hdr-divider {
    width: 1px;
    height: 36px;
    background: var(--border);
    margin: 0 4px;
}

/* ── NAVBAR ── */
.hdr-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: 0 40px;
    height: 43px;
    background: var(--surface);
    position: relative;
    overflow: visible;
    transition: height .35s cubic-bezier(.4, 0, .2, 1);
}

.compact .hdr-nav {
    height: 34px;
}

.hdr-nav::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.5px;
    background: linear-gradient(90deg, transparent, rgba(7, 147, 166, .35), transparent);
}

/* Cat button */
.hdr-cat-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    background: linear-gradient(135deg, var(--brand), var(--brand-dk));
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: var(--ff-b);
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 14px rgba(7, 147, 166, .26);
    transition: transform .28s cubic-bezier(.34, 1.56, .64, 1), box-shadow .25s;
}

.hdr-cat-btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .25), transparent);
    transform: skewX(-18deg);
    transition: left .42s;
}

.hdr-cat-btn:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 8px 24px rgba(7, 147, 166, .4)
}

.hdr-cat-btn:hover::after {
    left: 160%
}

.hdr-nav-center {
    display: flex;
    align-items: center;
    gap: 2px;
}

.hdr-nav-link {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 7px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: var(--ink-mid);
    text-decoration: none;
    border: none;
    background: none;
    cursor: pointer;
    font-family: var(--ff-b);
    position: relative;
    white-space: nowrap;
    transition: color .2s;
}

.hdr-nav-link::after {
    content: '';
    position: absolute;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: calc(100% - 28px);
    height: 2px;
    background: linear-gradient(90deg, var(--brand), #2563eb);
    border-radius: 2px;
    transition: transform .28s cubic-bezier(.4, 0, .2, 1);
}

.hdr-nav-link:hover::after,
.hdr-nav-link.active::after {
    transform: translateX(-50%) scaleX(1)
}

.hdr-nav-link:hover,
.hdr-nav-link.active {
    color: var(--ink)
}

.hdr-nav-link.active::before {
    content: '';
    position: absolute;
    bottom: 1px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--brand);
    box-shadow: 0 0 7px var(--brand);
}

.hdr-nav-link i {
    font-size: 16px;
    transition: transform .28s cubic-bezier(.34, 1.56, .64, 1)
}

.hdr-nav-link.mega-open i {
    transform: rotate(180deg)
}

/* ── MEGA MENU ── */
.hdr-mega {
    position: absolute;
    top: calc(100% + 14px);
    left: 50%;
    transform: translateX(-50%);
    width: 1100px;
    max-width: 95vw;
    background: rgba(255, 255, 255, .96);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid var(--border);
    border-radius: 24px;
    box-shadow: 0 28px 70px rgba(0, 0, 0, .13), 0 6px 18px rgba(0, 0, 0, .07);
    overflow: hidden;
    z-index: 1200;
    display: flex;
    animation: megaBounce .32s cubic-bezier(.34, 1.2, .64, 1) both;
    transform-origin: top center;
}

@keyframes megaBounce {
    0% {
        opacity: 0;
        transform: translateX(-50%) translateY(-18px) scaleY(.9)
    }

    65% {
        opacity: 1;
        transform: translateX(-50%) translateY(3px) scaleY(1.01)
    }

    100% {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scaleY(1)
    }
}

.hdr-mega-cols {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
    padding: 28px
}

/* Staggered columns */
.hdr-mega-col {
    animation: hdrColIn .3s cubic-bezier(.22, 1, .36, 1) both;
}

.hdr-mega-col:nth-child(1) {
    animation-delay: .04s
}

.hdr-mega-col:nth-child(2) {
    animation-delay: .09s
}

.hdr-mega-col:nth-child(3) {
    animation-delay: .14s
}

.hdr-mega-col:nth-child(4) {
    animation-delay: .19s
}

@keyframes hdrColIn {
    from {
        opacity: 0;
        transform: translateY(12px)
    }

    to {
        opacity: 1;
        transform: translateY(0)
    }
}

.hdr-mega-col-h {
    font-family: var(--ff-d);
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: .09em;
    text-transform: uppercase;
    color: var(--brand);
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--brand-lt);
}

.hdr-mega-col-link {
    display: block;
    padding: 7px 0;
    font-size: 13.5px;
    color: var(--ink-mid);
    text-decoration: none;
    border-radius: 6px;
    position: relative;
    transition: color .18s, padding-left .22s cubic-bezier(.4, 0, .2, 1);
}

.hdr-mega-col-link::before {
    content: '→';
    position: absolute;
    left: -14px;
    opacity: 0;
    color: var(--brand);
    font-size: 12px;
    transition: opacity .18s, left .22s
}

.hdr-mega-col-link:hover {
    color: var(--brand);
    padding-left: 18px;
}

.hdr-mega-col-link:hover::before {
    opacity: 1;
    left: 0
}

.hdr-mega-feat {
    width: 210px;
    flex-shrink: 0;
    background: linear-gradient(160deg, var(--brand), var(--brand-dk));
    padding: 28px 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 8px;
    position: relative;
    overflow: hidden;
}

.hdr-mega-feat::before {
    content: '';
    position: absolute;
    top: -70px;
    right: -70px;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: rgba(255, 255, 255, .07);
    animation: hdrFeatOrb 5s ease-in-out infinite alternate
}

@keyframes hdrFeatOrb {
    from {
        transform: scale(1)
    }

    to {
        transform: scale(1.25) translate(-12px, 12px)
    }
}

.hdr-mega-feat-tag {
    display: inline-block;
    background: rgba(255, 255, 255, .18);
    color: #fff;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: .09em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 20px;
    width: fit-content;
    position: relative;
    z-index: 1
}

.hdr-mega-feat-title {
    font-family: var(--ff-d);
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    position: relative;
    z-index: 1
}

.hdr-mega-feat-desc {
    font-size: 12.5px;
    color: rgba(255, 255, 255, .72);
    line-height: 1.5;
    position: relative;
    z-index: 1
}

.hdr-mega-feat-cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    background: #fff;
    color: var(--brand);
    font-size: 13px;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: var(--pill);
    text-decoration: none;
    width: fit-content;
    position: relative;
    z-index: 1;
    transition: transform .22s cubic-bezier(.34, 1.56, .64, 1), box-shadow .2s
}

.hdr-mega-feat-cta:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, .16)
}

/* ── CTRL+K SEARCH MODAL ── */
.hdr-search-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, .55);
    backdrop-filter: blur(8px);
    z-index: 2000;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 12vh;
    animation: hdrFadeIn .2s ease
}

@keyframes hdrFadeIn {
    from {
        opacity: 0
    }

    to {
        opacity: 1
    }
}

.hdr-search-modal {
    width: 100%;
    max-width: 580px;
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(15, 23, 42, .22);
    animation: hdrModalIn .25s cubic-bezier(.34, 1.1, .64, 1)
}

@keyframes hdrModalIn {
    from {
        opacity: 0;
        transform: scale(.94) translateY(-20px)
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0)
    }
}

.hdr-modal-input-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-bottom: 1px solid var(--border)
}

.hdr-modal-input-wrap i {
    font-size: 20px;
    color: var(--ink-soft);
    flex-shrink: 0
}

.hdr-modal-input {
    flex: 1;
    border: none;
    background: none;
    font-family: var(--ff-b);
    font-size: 16px;
    color: var(--ink);
    outline: none
}

.hdr-modal-input::placeholder {
    color: var(--ink-soft)
}

.hdr-modal-esc {
    font-size: 11.5px;
    color: var(--ink-soft);
    background: #f1f5f9;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 3px 9px;
    cursor: pointer;
    white-space: nowrap
}

.hdr-modal-body {
    padding: 12px 0 8px;
    max-height: 320px;
    overflow-y: auto
}

/* ── CART DRAWER ── */
.hdr-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, .45);
    backdrop-filter: blur(6px);
    z-index: 1300;
    animation: hdrFadeIn .22s ease
}

.hdr-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 390px;
    background: #fff;
    z-index: 1400;
    display: flex;
    flex-direction: column;
    box-shadow: -16px 0 60px rgba(0, 0, 0, .14);
    animation: hdrSlideIn .3s cubic-bezier(.34, 1.1, .64, 1)
}

@keyframes hdrSlideIn {
    from {
        transform: translateX(100%)
    }

    to {
        transform: translateX(0)
    }
}

.hdr-drawer-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(135deg, rgba(7, 147, 166, .04), transparent)
}

.hdr-drawer-title {
    font-family: var(--ff-d);
    font-size: 18px;
    font-weight: 700
}

.hdr-drawer-close {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: none;
    cursor: pointer;
    color: var(--ink-mid);
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background .2s, color .2s, transform .25s cubic-bezier(.34, 1.56, .64, 1)
}

.hdr-drawer-close:hover {
    background: #fee2e2;
    color: #ef4444;
    transform: rotate(90deg) scale(1.1)
}

.hdr-drawer-body {
    flex: 1;
    overflow-y: auto;
    padding: 16px 20px
}

/* Free shipping progress */
.hdr-ship-progress {
    padding: 12px 20px;
    border-bottom: 1px solid var(--border);
    background: #f8fafc
}

.hdr-ship-progress-label {
    font-size: 12.5px;
    color: var(--ink-mid);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px
}

.hdr-ship-progress-label i {
    color: var(--brand);
    font-size: 14px
}

.hdr-ship-bar-track {
    height: 5px;
    background: #e2e8f0;
    border-radius: var(--pill);
    overflow: hidden
}

.hdr-ship-bar-fill {

    height: 100%;

    background:
        linear-gradient(90deg,
            #06b6d4,
            #2563eb,
            #06b6d4);

    background-size: 200%;

    animation:
        hdrShipGlow 3s linear infinite;

    border-radius: var(--pill);

    transition:
        width .45s cubic-bezier(.34, 1.56, .64, 1);

    box-shadow:
        0 0 12px rgba(37, 99, 235, .35);
}

@keyframes hdrShipGlow {

    0% {
        background-position: 0%;
    }

    100% {
        background-position: 200%;
    }
}

.hdr-cart-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 12px;
    color: var(--ink-soft)
}

.hdr-cart-empty i {
    font-size: 60px;
    color: #cbd5e1;
    animation: hdrBounce 2s ease infinite
}

@keyframes hdrBounce {

    0%,
    100% {
        transform: translateY(0)
    }

    50% {
        transform: translateY(-10px)
    }
}

.hdr-cart-empty p {
    font-size: 15px
}

.hdr-cart-item {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 14px;
    margin-bottom: 12px;
    animation: hdrItemIn .3s cubic-bezier(.22, 1, .36, 1);
    transition: transform .22s cubic-bezier(.4, 0, .2, 1), box-shadow .22s, border-color .22s
}

@keyframes hdrItemIn {
    from {
        opacity: 0;
        transform: translateX(20px)
    }

    to {
        opacity: 1;
        transform: translateX(0)
    }
}

.hdr-cart-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(15, 23, 42, .09);
    border-color: rgba(7, 147, 166, .3)
}

.hdr-cart-item-img {
    width: 68px;
    height: 68px;
    border-radius: 10px;
    border: 1px solid var(--border);
    object-fit: contain;
    padding: 4px
}

.hdr-cart-item-info {
    flex: 1
}

.hdr-cart-item-title {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--ink);
    line-height: 1.3
}

.hdr-cart-item-price {
    font-size: 13px;
    color: var(--brand);
    font-weight: 700;
    margin-top: 3px
}

.hdr-qty-ctrl {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 25px;
    padding: 4px;
    margin-top: 9px
}

.hdr-qty-btn {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: none;
    background: #f8fafc;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ink);
    transition: background .18s, transform .22s cubic-bezier(.34, 1.56, .64, 1), color .18s
}

.hdr-qty-btn:hover {
    background: var(--brand);
    color: var(--ink);
    transform: scale(1.18)
}

.hdr-qty-val {
    font-size: 14px;
    font-weight: 700;
    min-width: 20px;
    text-align: center
}

.hdr-item-remove {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--ink-soft);
    font-size: 18px;
    padding: 4px;
    border-radius: 6px;
    transition: color .15s, transform .2s cubic-bezier(.34, 1.56, .64, 1)
}

.hdr-item-remove:hover {
    color: #ef4444;
    transform: scale(1.22) rotate(-8deg)
}

.hdr-drawer-foot {
    padding: 18px 24px;
    background: #fff;
    box-shadow: 0 -8px 30px rgba(15, 23, 42, .06);
    border-top: 1px solid rgba(226, 232, 240, .8);
    display: flex;
    flex-direction: column;
    gap: 10px
}

.hdr-drawer-total {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 2px
}

.hdr-btn-primary {

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    width: 100%;
    min-height: 52px;

    border: none;
    border-radius: 14px;

    background:
        linear-gradient(135deg,
            #06b6d4,
            #0891b2);

    color: #ffffff !important;

    font-family: var(--ff-b);
    font-size: 15px;
    font-weight: 700;

    cursor: pointer;
    text-decoration: none;

    position: relative;
    overflow: hidden;

    isolation: isolate;

    box-shadow:
        0 10px 26px rgba(6, 182, 212, .28);

    transition:
        transform .28s cubic-bezier(.34, 1.56, .64, 1),
        box-shadow .28s,
        filter .28s;
}

.hdr-btn-primary::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .2), transparent);
    transform: skewX(-18deg);
    transition: left .45s
}

.hdr-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 32px rgba(7, 147, 166, .42)
}


.hdr-user-divider{

    height:1px;

    background:var(--border);

    margin:3px 0;
}

.hdr-btn-primary:hover::after {
    left: 160%
}

.hdr-btn-ghost {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    width: 100%;
    height: 48px;

    background:
        linear-gradient(135deg,
            rgba(255, 255, 255, .88),
            rgba(248, 250, 252, .96));

    border:
        1.5px solid rgba(7, 147, 166, .12);

    border-radius: 14px;

    font-family: var(--ff-b);
    font-size: 14px;
    font-weight: 600;

    color: var(--ink);

    cursor: pointer;

    position: relative;
    overflow: hidden;

    backdrop-filter: blur(10px);

    transition:
        all .28s cubic-bezier(.34, 1.56, .64, 1);
}

.hdr-btn-ghost::before {
    content: '';

    position: absolute;
    inset: 0;

    background:
        linear-gradient(135deg,
            rgba(7, 147, 166, .08),
            rgba(37, 99, 235, .05));

    opacity: 0;

    transition: opacity .25s;
}

.hdr-btn-ghost:hover {

    transform:
        translateY(-2px) scale(1.01);

    border-color:
        rgba(7, 147, 166, .45);

    color: var(--brand);

    box-shadow:
        0 10px 28px rgba(7, 147, 166, .12);
}

.hdr-btn-ghost:hover::before {
    opacity: 1;
}

.hdr-btn-ghost i {
    transition: transform .25s;
}

.hdr-btn-ghost:hover i {
    transform: translateX(-3px);
}

/* ── TOAST ── */
.hdr-toast {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 3000;
    background: var(--ink);
    color: #fff;
    font-family: var(--ff-b);
    font-size: 14px;
    font-weight: 600;
    padding: 13px 20px;
    border-radius: 14px;
    box-shadow: 0 12px 40px rgba(15, 23, 42, .22);
    display: flex;
    align-items: center;
    gap: 10px;
    animation: hdrToastIn .35s cubic-bezier(.34, 1.2, .64, 1) both, hdrToastOut .3s 2.2s ease forwards;
}

@keyframes hdrToastIn {
    from {
        opacity: 0;
        transform: translateY(20px) scale(.94)
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1)
    }
}

@keyframes hdrToastOut {
    from {
        opacity: 1;
        transform: translateY(0)
    }

    to {
        opacity: 0;
        transform: translateY(10px)
    }
}

/* ═══════════════════════════════════════════════
   HEADER — RESPONSIVE CSS
   Drop-in replacement for all media queries
   inside the <style> block in Header.jsx
   ═══════════════════════════════════════════════ */

/* ── BASE FLUID TWEAKS (all widths) ────────────
   Smooth values that don't snap at breakpoints   */

.hdr-main {
  padding: clamp(6px, 1.2vw, 12px) clamp(16px, 3.5vw, 40px);
  gap: clamp(10px, 2vw, 24px);
}

.hdr-nav {
  padding: 0 clamp(10px, 3vw, 40px);
}

.hdr-util {
  padding: 0 clamp(14px, 3.5vw, 40px);
}

.hdr-logo img {
  height: clamp(40px, 5.5vw, 58px);
  transition: height .35s cubic-bezier(.4,0,.2,1);
}

.compact .hdr-logo img {
  height: clamp(36px, 4vw, 44px) !important;
}

.compact .hdr-main {
  padding: clamp(4px, .6vw, 6px) clamp(16px, 3.5vw, 40px);
}

/* ── LARGE LAPTOPS  ≤ 1400px ──────────────────── */
@media (max-width: 1400px) {
  .hdr-mega {
    width: 95vw;
  }
}

/* ── LAPTOPS  ≤ 1200px ───────────────────────── */
@media (max-width: 1200px) {
  .hdr-mega-cols {
    grid-template-columns: repeat(2, 1fr);
    gap: 22px;
  }

  /* Hide featured panel — not enough horizontal room */
  .hdr-mega-feat {
    display: none;
  }

  .hdr-search-cat {
    min-width: 100px;
    font-size: 12px;
  }

  .hdr-nav-link {
    padding: 7px 10px;
    font-size: 13px;
  }
}

/* ── TABLETS  ≤ 992px ────────────────────────── */
@media (max-width: 992px) {

  /* Utility bar: scroll horizontally instead of hiding */
  .hdr-util {
    overflow-x: auto;
    scrollbar-width: none;
    justify-content: flex-start;
    gap: 8px;
  }
  .hdr-util::-webkit-scrollbar { display: none; }

  .hdr-util-center {
    flex-shrink: 0;
    white-space: nowrap;
  }

  .hdr-util-right {
    flex-shrink: 0;
    margin-left: auto;
    padding-left: 16px;
  }

  /* Main row: search drops to its own full-width row */
  .hdr-main {
    flex-wrap: wrap;
    padding: 12px 18px;
    gap: 12px;
  }

  .hdr-sw {
    order: 3;
    width: 100%;
    max-width: 100%;
    flex: none;
  }

  .hdr-search {
    width: 100%;
  }

  .hdr-actions {
    margin-left: auto;
  }

  /* Navbar scrolls horizontally on tablet */
  .hdr-nav {
    justify-content: flex-start;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 0 12px;
  }
  .hdr-nav::-webkit-scrollbar { display: none; }

  .hdr-nav-center {
    gap: 2px;
  }

  .hdr-nav-link {
    flex-shrink: 0;
  }

  /* Mega menu: anchored below header as fixed panel */
  .hdr-mega {
    position: fixed;
    top: 130px; /* approximate header+nav height when search is on second row */
    left: 50%;
    width: 94vw;
    max-height: 70vh;
    overflow-y: auto;
    border-radius: 18px;
  }

  /* Compact mode: mega anchors a bit higher */
  .compact .hdr-mega {
    top: 100px;
  }

  /* Cart drawer slightly narrower */
  .hdr-drawer {
    width: min(360px, 100vw);
  }
}

/* ── MOBILE  ≤ 768px ─────────────────────────── */
@media (max-width: 768px) {

  /* Utility bar hidden — too cramped */
  .hdr-util {
    display: none;
  }
    .hdr-user-dropdown{

    position: fixed;

    top: 72px;
    right: 14px;

    width: 220px;

    z-index: 3000;
}

  .hdr-main {
    padding: 10px 14px;
    gap: 10px;
  }

  /* Search: hide category dropdown to save space */
  .hdr-search {
    height: 42px;
  }

  .hdr-search-cat {
    display: none;
  }

  .hdr-search-input {
    font-size: 13px;
  }

  .hdr-search-btn {
    width: 44px;
  }

  /* Action buttons: hide labels */
  .hdr-action-btn {
    padding: 6px 8px;
  }

  .hdr-action-btn i {
    font-size: 20px;
  }

  .hdr-action-label {
    display: none;
  }

  .hdr-divider {
    display: none;
  }

  /* Navbar */
  .hdr-nav {
    height: 42px;
  }

  .hdr-nav-link {
    font-size: 12.5px;
    padding: 6px 10px;
  }

  .hdr-cat-btn {
    padding: 7px 14px;
    font-size: 12px;
  }

  /* Mega */
  .hdr-mega {
    top: 110px;
    border-radius: 16px;
  }

  .compact .hdr-mega {
    top: 90px;
  }

  .hdr-mega-cols {
    grid-template-columns: 1fr;
    padding: 18px 16px;
    gap: 16px;
  }

  /* Full-width cart drawer */
  .hdr-drawer {
    width: 100%;
    /* Safe area for notched phones */
    padding-bottom: env(safe-area-inset-bottom, 0);
  }

  /* Ctrl+K modal: full width */
  .hdr-search-modal {
    max-width: calc(100vw - 24px);
    border-radius: 16px;
  }

  .hdr-search-modal-overlay {
    padding-top: 8vh;
    padding-left: 12px;
    padding-right: 12px;
  }

  /* Toast: full-width centered */
  .hdr-toast {
    right: 14px;
    left: 14px;
    bottom: calc(18px + env(safe-area-inset-bottom, 0));
    width: auto;
    justify-content: center;
    font-size: 13px;
  }

  /* Checkout/ghost buttons */
  .hdr-btn-primary,
  .hdr-btn-ghost {
    font-size: 13px;
    min-height: 48px;
  }
}

/* ── SMALL MOBILE  ≤ 480px ───────────────────── */
@media (max-width: 480px) {

  .hdr-main {
    gap: 8px;
    padding: 10px 12px;
  }

  /* Search */
  .hdr-search {
    height: 40px;
    border-radius: 14px;
  }

  .hdr-search-input {
    padding: 0 10px;
    font-size: 12.5px;
  }

  .hdr-search-btn {
    width: 40px;
    font-size: 16px;
  }

  /* Action icons */
  .hdr-action-btn {
    padding: 5px 6px;
  }

  .hdr-action-btn i {
    font-size: 18px;
  }

  .hdr-badge {
    width: 16px;
    height: 16px;
    font-size: 9px;
    top: 3px;
    right: 3px;
  }

  /* Navbar */
  .hdr-nav {
    padding: 0 6px;
    height: 40px;
  }

  .hdr-nav-link {
    padding: 5px 8px;
    font-size: 12px;
  }

  .hdr-cat-btn {
    padding: 6px 10px;
    font-size: 11px;
    gap: 5px;
  }

  /* Mega anchors correctly at small size */
  .hdr-mega {
    top: 106px;
  }

  .compact .hdr-mega {
    top: 86px;
  }

  .hdr-mega-cols {
    padding: 14px 12px;
    gap: 12px;
  }

  .hdr-mega-col-h {
    font-size: 10.5px;
    margin-bottom: 8px;
  }

  .hdr-mega-col-link {
    font-size: 13px;
    padding: 6px 0;
  }

  /* Cart drawer contents */
  .hdr-drawer-head {
    padding: 14px 16px;
  }

  .hdr-drawer-body {
    padding: 10px 12px;
  }

  .hdr-cart-item {
    padding: 10px 12px;
    gap: 10px;
    border-radius: 12px;
  }

  .hdr-cart-item-img {
    width: 56px;
    height: 56px;
    border-radius: 8px;
  }

  .hdr-cart-item-title {
    font-size: 13px;
  }

  .hdr-cart-item-price {
    font-size: 12.5px;
  }

  .hdr-qty-ctrl {
    gap: 8px;
    padding: 2px 6px;
    margin-top: 7px;
  }

  .hdr-qty-btn {
    width: 24px;
    height: 24px;
    font-size: 13px;
  }

  .hdr-qty-val {
    font-size: 13px;
  }

  .hdr-drawer-foot {
    padding: 14px 16px;
    gap: 8px;
    padding-bottom: calc(14px + env(safe-area-inset-bottom, 0));
  }

  .hdr-drawer-total {
    font-size: 14px;
  }

  /* Suggestions panel */
  .hdr-suggestions {
    border-radius: 12px;
  }

  .hdr-sug-item {
    padding: 9px 14px;
  }

  .hdr-sug-text {
    font-size: 13px;
  }
}

/* ── TINY  ≤ 360px ───────────────────────────── */
@media (max-width: 360px) {

  .hdr-main {
    padding: 8px 10px;
  }

  .hdr-search {
    height: 38px;
  }

  .hdr-action-btn i {
    font-size: 17px;
  }

  .hdr-nav {
    height: 38px;
  }

  .hdr-nav-link {
    font-size: 11.5px;
    padding: 4px 7px;
  }

  .hdr-cat-btn {
    font-size: 10.5px;
    padding: 5px 8px;
  }

  .hdr-mega {
    top: 100px;
    width: 98vw;
  }

  .compact .hdr-mega {
    top: 80px;
  }

  .hdr-cart-item-img {
    width: 48px;
    height: 48px;
  }

  .hdr-btn-primary,
  .hdr-btn-ghost {
    font-size: 12.5px;
    border-radius: 12px;
  }
}

      `}</style>

            <div className="hdr-root">

                {/* ── UTILITY BAR ── */}
                <div className="hdr-util">
                    <div className="hdr-util-center">
                        {["Free Shipping Above ₹1,000", "GST Invoice Available", "Trusted HVAC Supplier"].map((item) => (
                            <React.Fragment key={item}>
                                <span className="hdr-utility-check"><i className="ri-checkbox-circle-fill" />{item}</span>
                                <span className="hdr-utility-sep">·</span>
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="hdr-util-right">
                        <button className="hdr-utility-link"><i className="ri-customer-service-2-line" />Support</button>
                        <button className="hdr-utility-link"><i className="ri-mail-line" />Subscribe</button>
                    </div>
                </div>
                {/* <ScrollProgress /> */}

                {/* ── STICKY ── */}
                <div className={[
                    "hdr-sticky",
                    scrolled ? "scrolled" : "",
                    compact ? "compact" : "",
                    hidden ? "hidden" : "",
                ].filter(Boolean).join(" ")}>
                    <ScrollProgress />

                    {/* Main row */}
                    <div className="hdr-main">
                        <Link to="/" className="hdr-logo"><img src={Logo} alt="Logo" /></Link>

                        {/* Search with suggestions */}
                        <div className="hdr-sw" ref={searchRef}>
                            <div className={`hdr-search${searchFocused ? " focused" : ""}`}>
                                <select className="hdr-search-cat" value={category} onChange={e => setCategory(e.target.value)}>
                                    <option>All</option><option>Tools</option><option>Chemicals</option>
                                    <option>Gas Monitors</option><option>Energy</option>
                                </select>
                                <input
                                    className="hdr-search-input"
                                    placeholder="Search products… (Ctrl+K)"
                                    value={searchQuery}
                                    onFocus={() => setSearchFocused(true)}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    onKeyDown={e => { if (e.key === "Enter") commitSearch(searchQuery); }}
                                />
                                <button className="hdr-search-btn" onClick={() => commitSearch(searchQuery)}>
                                    <i className="ri-search-line" />
                                </button>
                            </div>

                            {/* Suggestions panel */}
                            {searchFocused && (
                                <div className="hdr-suggestions">
                                    {recentSearches.length > 0 && !searchQuery && (
                                        <>
                                            <div className="hdr-sug-section">Recent</div>
                                            {recentSearches.map(r => (
                                                <div key={r} className="hdr-sug-item" onMouseDown={() => commitSearch(r)}>
                                                    <i className="ri-history-line" /><span className="hdr-sug-text">{r}</span>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    {searchQuery && suggestions.length > 0 && suggestions.map(s => (
                                        <div key={s} className="hdr-sug-item" onMouseDown={() => commitSearch(s)}>
                                            <i className="ri-search-line" /><span className="hdr-sug-text">{s}</span>
                                        </div>
                                    ))}
                                    {!searchQuery && (
                                        <>
                                            <div className="hdr-sug-section">Trending</div>
                                            {TRENDING.slice(0, 4).map(t => (
                                                <div key={t} className="hdr-sug-item" onMouseDown={() => commitSearch(t)}>
                                                    <i className="ri-fire-line" /><span className="hdr-sug-text">{t}</span>
                                                    {t === TRENDING[0] && <span className="hdr-sug-kbd">Hot</span>}
                                                </div>
                                            ))}
                                            <div className="hdr-sug-item" style={{ borderTop: "1px solid var(--border)", marginTop: 4 }} onMouseDown={() => setSearchOpen(true)}>
                                                <i className="ri-command-line" /><span className="hdr-sug-text">Open command search</span>
                                                <span className="hdr-sug-kbd">Ctrl+K</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="hdr-actions">
                            <div className="hdr-user-wrap">

                                <button
                                    className="hdr-action-btn"

                                    onClick={() => {

                                        if (window.innerWidth <= 768) {

                                            setMobileUserMenu(
                                                !mobileUserMenu
                                            );

                                        }

                                    }}

                                    onMouseEnter={() => {

                                        if (window.innerWidth > 768) {

                                            setShowUserMenu(true);

                                        }

                                    }}
                                >

                                    <i className="ri-user-line" />

                                    <span className="hdr-action-label">

                                        {currentUser
                                            ? `Hi, ${currentUser.name}`
                                            : "Account"}

                                    </span>

                                </button>

                                {(showUserMenu || mobileUserMenu) && (

                                    <div
                                        className="hdr-user-dropdown"

                                        onMouseLeave={() => {

                                            if (window.innerWidth > 768) {

                                                setShowUserMenu(false);

                                            }

                                        }}
                                    >

                                        {!currentUser ? (

                                            <>

                                                <button
                                                    onClick={() => navigate("/login")}
                                                >
                                                    Login
                                                </button>

                                                <button
                                                    onClick={() => navigate("/register")}
                                                >
                                                    Register
                                                </button>

                                            </>

                                        ) : (

                                            <>

                                                <button
                                                    onClick={() => {

                                                        navigate("/user/dashboard?tab=dashboard");

                                                        setMobileUserMenu(false);
                                                        setShowUserMenu(false);

                                                    }}
                                                >

                                                    <i className="ri-user-line" />

                                                    <span>My Dashboard</span>

                                                </button>


                                                <button
                                                    onClick={() => {

                                                        navigate("/user/dashboard?tab=addresses");

                                                        setMobileUserMenu(false);
                                                        setShowUserMenu(false);

                                                    }}
                                                >

                                                    <i className="ri-map-pin-line" />

                                                    <span>Saved Address</span>

                                                </button>


                                                <button
                                                    onClick={() => {

                                                        navigate("/user/dashboard?tab=orders");

                                                        setMobileUserMenu(false);
                                                        setShowUserMenu(false);

                                                    }}
                                                >
                                                    <i className="ri-shopping-bag-line" />
                                                    <span>Orders</span>
                                                </button>

                                                <div className="hdr-user-divider" />

                                                <button
                                                    className="logout"

                                                    onClick={handleLogout}
                                                >

                                                    <i className="ri-logout-box-r-line" />

                                                    <span>Logout</span>

                                                </button>

                                            </>

                                        )}

                                    </div>

                                )}

                            </div>



                            <div className="hdr-divider" />

                            <button
                                className="hdr-action-btn"
                                style={{ position: "relative" }}
                                onClick={() => navigate("/wishlist")}
                            >
                                <i className="ri-heart-line" />

                                <span className="hdr-action-label">
                                    Wishlist
                                </span>

                                {wishlistCount > 0 && (
                                    <span className="hdr-badge">
                                        {wishlistCount}
                                    </span>
                                )}
                            </button>
                            <button className={`hdr-action-btn${cartShake ? " hdr-cart-shake" : ""}`} style={{ position: "relative" }} onClick={() => setCartOpen(true)}>
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
                                    const data = megaMenuData[link.mega];
                                    return (
                                        <div key={idx} style={{ position: "relative" }} onMouseEnter={() => openMega(link.mega)} onMouseLeave={closeMega}>
                                            <button className={`hdr-nav-link${isOpen ? " mega-open" : ""}`}>
                                                {link.label}<i className="ri-arrow-down-s-line" />
                                            </button>
                                            {isOpen && (
                                                <div className="hdr-mega" onMouseEnter={() => openMega(link.mega)} onMouseLeave={closeMega}>
                                                    <div className="hdr-mega-cols">
                                                        {data.columns.map((col) => (
                                                            <div key={col.heading} className="hdr-mega-col">
                                                                <div className="hdr-mega-col-h">{col.heading}</div>
                                                                {col.links.map(lnk => (
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
                                return <Link key={idx} to={link.to} className={`hdr-nav-link${isActive ? " active" : ""}`}>{link.label}</Link>;
                            })}
                        </div>
                        <div className="hdr-divider" style={{ height: 22, margin: "0 6px" }} />
                    </nav>
                </div>

                {/* ── Ctrl+K MODAL ── */}
                {searchOpen && createPortal(
                    <div className="hdr-search-modal-overlay" onClick={e => { if (e.target === e.currentTarget) setSearchOpen(false) }}>
                        <div className="hdr-search-modal">
                            <div className="hdr-modal-input-wrap">
                                <i className="ri-search-line" />
                                <input ref={searchInput} className="hdr-modal-input" placeholder="Search products, brands, categories…"
                                    onKeyDown={e => { if (e.key === "Enter" && e.target.value.trim()) { commitSearch(e.target.value); setSearchOpen(false); } if (e.key === "Escape") setSearchOpen(false); }} autoFocus />
                                <button className="hdr-modal-esc" onClick={() => setSearchOpen(false)}>Esc</button>
                            </div>
                            <div className="hdr-modal-body">
                                <div className="hdr-sug-section">Trending Searches</div>
                                {TRENDING.map(t => (
                                    <div key={t} className="hdr-sug-item" onClick={() => { commitSearch(t); setSearchOpen(false); }}>
                                        <i className="ri-fire-line" /><span className="hdr-sug-text">{t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

                {/* ── CART DRAWER ── */}
                {cartOpen && createPortal(
                    <>
                        <div className="hdr-overlay" onClick={() => setCartOpen(false)} />
                        <div className="hdr-drawer">
                            <div className="hdr-drawer-head">
                                <span className="hdr-drawer-title">Your Cart {cartCount > 0 && `(${cartCount})`}</span>
                                <button className="hdr-drawer-close" onClick={() => setCartOpen(false)}><i className="ri-close-line" /></button>
                            </div>

                            {/* Free shipping progress */}
                            <div className="hdr-ship-progress">
                                <div className="hdr-ship-progress-label">
                                    <i className="ri-truck-line" />
                                    {toFreeShip > 0
                                        ? <span>₹{toFreeShip.toLocaleString("en-IN")} away from <strong>free shipping</strong></span>
                                        : <span style={{ color: "#10b981" }}><strong>🎉 You've unlocked free shipping!</strong></span>
                                    }
                                </div>
                                <div className="hdr-ship-bar-track">
                                    <div className="hdr-ship-bar-fill" style={{ width: `${freeShipPct}%` }} />
                                </div>
                                <div className="hdr-ship-percent">
                                    {Math.round(freeShipPct)}% completed
                                </div>
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
                                                    <button className="hdr-qty-btn" onClick={() => { const nc = [...cart]; nc[i].qty = Math.max(1, (nc[i].qty || 1) - 1); updateCart(nc); }}>−</button>
                                                    <span className="hdr-qty-val">{item.qty || 1}</span>
                                                    <button className="hdr-qty-btn" onClick={() => { const nc = [...cart]; nc[i].qty = (nc[i].qty || 1) + 1; updateCart(nc); }}>+</button>
                                                </div>
                                            </div>
                                            <button className="hdr-item-remove" onClick={() => { const nc = [...cart]; nc.splice(i, 1); updateCart(nc); }}>
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
                                        <span>₹{subtotal.toLocaleString("en-IN")}</span>
                                    </div>
                                    <button className="hdr-btn-primary" onClick={() => { setCartOpen(false); navigate("/checkout"); }}>
                                        <i className="ri-secure-payment-line" />Proceed to Checkout
                                    </button>
                                    <button
                                        className="hdr-btn-ghost"
                                        onClick={() => setCartOpen(false)}
                                    >
                                        <i className="ri-arrow-left-line" />
                                        Continue Shopping
                                    </button>
                                </div>
                            )}
                        </div>
                    </>,
                    document.body
                )}

                {/* ── TOAST ── */}
                {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
            </div>
        </>
    );
}