import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import featuredProducts from "../data/featuredProducts";
import {
  getWishlist,
  toggleWishlistItem
} from "../../utils/wishlist";

/* ── Enrich products with extra meta ─────────────────────────────────────── */
const BADGES = ["Best Seller", "Trending", "New Arrival", "Industrial Grade", "Editor's Choice"];
const CATS = ["All", "Tools", "Chemicals", "Monitors", "Energy", "Recovery"];
const SORTS = ["Default", "Price: Low to High", "Price: High to Low", "Rating", "Newest"];

const enriched = featuredProducts.map((p, i) => ({
  ...p,
  badge: BADGES[i % BADGES.length],
  rating: +(4.4 + Math.random() * 0.6).toFixed(1),
  reviews: Math.floor(40 + Math.random() * 200),
  inStock: i % 7 !== 0,
  stockLeft: Math.floor(3 + Math.random() * 12),
  category: CATS[1 + (i % (CATS.length - 1))],
  originalPrice: p.price ? `₹${Math.round(parseInt(p.price.replace(/[^\d]/g, "")) * 1.3).toLocaleString("en-IN")}` : null,
  discount: Math.floor(18 + Math.random() * 22),
}));

/* ── Magnetic hook ────────────────────────────────────────────────────────── */
function useMagnetic(s = 0.3) {
  const r = useRef(null);
  const move = useCallback((e) => {
    if (!r.current) return;
    const b = r.current.getBoundingClientRect();
    r.current.style.transform = `translate(${(e.clientX - (b.left + b.width / 2)) * s}px,${(e.clientY - (b.top + b.height / 2)) * s}px)`;
    r.current.style.transition = "";
  }, [s]);
  const leave = useCallback(() => {
    if (!r.current) return;
    r.current.style.transition = "transform .5s cubic-bezier(.23,1,.32,1)";
    r.current.style.transform = "translate(0,0)";
  }, []);
  return { ref: r, onMouseMove: move, onMouseLeave: leave };
}

/* ── Stars component ─────────────────────────────────────────────────────── */
const Stars = ({ n }) => (
  <span style={{ color: "#FBBF24", fontSize: 13, letterSpacing: .5 }}>
    {[1, 2, 3, 4, 5].map(s => <span key={s}>{s <= Math.round(n) ? "★" : "☆"}</span>)}
  </span>
);

export default function FeaturedProducts() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Default");
  const [cat, setCat] = useState("All");
  const [wishlist, setWishlist] = useState(
    getWishlist().map(item => item.id)
  );
  const [visible, setVisible] = useState(8);
  const [ripples, setRipples] = useState({});
  const [toast, setToast] = useState(false);

  const [toastMsg, setToastMsg] = useState("");

  /* Scroll reveal */
  const revealRef = useRef([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("fp-vis"); }),
      { threshold: 0.1 }
    );
    revealRef.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);


    useEffect(() => {
  
      document.title =
        "Featured Products | Tecniqa";
  
    }, []);

  /* Filter + sort */
  const filtered = enriched
    .filter(p => cat === "All" || p.category === cat)
    .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || (p.brand || "").toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {

      const priceA = Number(
        (a.price || "0").replace(/[^\d]/g, "")
      );

      const priceB = Number(
        (b.price || "0").replace(/[^\d]/g, "")
      );

      if (sort === "Price: Low to High") {
        return priceA - priceB;
      }

      if (sort === "Price: High to Low") {
        return priceB - priceA;
      }

      if (sort === "Rating") {
        return b.rating - a.rating;
      }

      if (sort === "Newest") {
        return b.id - a.id;
      }

      return 0;
    });

  const featured = filtered.find(p => p.badge === "Editor's Choice" || p.badge === "Best Seller") || filtered[0];
  const grid = filtered.filter(p => p !== featured);

  const toggleWish = (e, product) => {

    e.stopPropagation();

    const updated =
      toggleWishlistItem(product);

    setWishlist(
      updated.map(item => item.id)
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
    showToast(
      updated.some(item => item.id === product.id)
        ? "Added to wishlist ❤️"
        : "Removed from wishlist"
    );
  };


  const showToast = (text) => {

    setToastMsg(text);

    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 2600);
  };

  const addRipple = (e, id) => {

    e.stopPropagation();

    const b =
      e.currentTarget.getBoundingClientRect();

    const rp = {
      x: e.clientX - b.left,
      y: e.clientY - b.top,
      id: Date.now()
    };

    setRipples(r => ({
      ...r,
      [id]: rp
    }));

    const cart =
      JSON.parse(localStorage.getItem("cart") || "[]");

    const idx =
      cart.findIndex(
        i =>
          i.title ===
          enriched.find(p => p.id === id)?.title
      );

    const prod =
      enriched.find(p => p.id === id);

    if (prod) {

      if (idx > -1) {

        cart[idx].qty++;

      } else {

        cart.push({
          title: prod.title,
          image: prod.image,
          price: parseInt(
            prod.price?.replace(/[^\d]/g, "") || "0"
          ),
          qty: 1
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

      showToast(
        `${prod.title.slice(0, 28)}… added to cart`
      );
    }

    setTimeout(() => {

      setRipples(r => {

        const n = { ...r };

        delete n[id];

        return n;

      });

    }, 700);
  };

  const magLoad = useMagnetic(0.25);

  return (
    <>
      {/* Toast */}
      <div className={`fp-toast${toast ? " show" : ""}`}>
        <i className="ri-checkbox-circle-fill" />
        {toastMsg}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css');

        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        .fp-root {
          --brand:    #06B6D4;
          --brand-dk: #0e7490;
          --ink:      #0f172a;
          --ink-mid:  #475569;
          --ink-soft: #94a3b8;
          --border:   rgba(226,232,240,.85);
          --ff-d: 'Manrope', sans-serif;
          --ff-b: 'Inter', sans-serif;
          font-family: var(--ff-b);
          background:
            radial-gradient(ellipse 50% 35% at 95% 5%, rgba(6,182,212,.07) 0%,transparent 55%),
            radial-gradient(ellipse 40% 30% at 5% 90%, rgba(37,99,235,.05) 0%,transparent 50%),
            linear-gradient(180deg,#f8fafc 0%,#ffffff 50%,#f0f7f9 100%);
          min-height:100vh; color:var(--ink); padding-bottom:100px;
          position:relative; overflow-x:hidden;
        }
        .fp-root::before {
          content:''; position:fixed; inset:0;
          background-image:
            linear-gradient(rgba(6,182,212,.025) 1px,transparent 1px),
            linear-gradient(90deg,rgba(6,182,212,.025) 1px,transparent 1px);
          background-size:54px 54px; pointer-events:none; z-index:0;
        }

        /* ── HERO ── */
        .fp-hero {
          position:relative; padding:130px 40px 90px;
          background:linear-gradient(145deg,#020c1b 0%,#051b2c 60%,#07293a 100%);
          overflow:hidden; margin-bottom:0;
        }
        .fp-hero-grid {
          position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(6,182,212,.07) 1px,transparent 1px),
            linear-gradient(90deg,rgba(6,182,212,.07) 1px,transparent 1px);
          background-size:56px 56px; pointer-events:none;
        }
        .fp-hero-orb { position:absolute; border-radius:50%; filter:blur(90px); pointer-events:none; }
        .fp-orb1 { width:400px;height:400px;top:-120px;right:-60px; background:rgba(6,182,212,.17); }
        .fp-orb2 { width:280px;height:280px;bottom:-80px;left:-60px; background:rgba(37,99,235,.14); }

        .fp-hero-inner { position:relative; z-index:2; max-width:1180px; margin:0 auto; }
        .fp-hero-badge {
          display:inline-flex; align-items:center; gap:7px;
          background:rgba(6,182,212,.13); border:1px solid rgba(6,182,212,.3);
          border-radius:100px; font-size:11px; font-weight:700;
          letter-spacing:.1em; text-transform:uppercase;
          color:var(--brand); padding:5px 16px; margin-bottom:20px;
          backdrop-filter:blur(8px);
        }
        .fp-hero-badge-dot { width:6px;height:6px;border-radius:50%;background:var(--brand);box-shadow:0 0 6px var(--brand);animation:fpPulse 1.6s ease infinite; }
        @keyframes fpPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.65)}}
        .fp-hero h1 {
          font-family:var(--ff-d); font-size:clamp(2.4rem,5vw,4.2rem);
          font-weight:800; letter-spacing:-.02em; line-height:1.06; color:#fff;
          margin-bottom:16px;
        }
        .fp-hero h1 span { color:var(--brand); }
        .fp-hero p { font-size:clamp(.9rem,1.5vw,1.05rem); color:rgba(255,255,255,.6); line-height:1.72; max-width:520px; }

        /* ── TRUST STRIP ── */
        .fp-trust {
          display:flex; 
          justify-content:center;
          align-items:center;
          
          gap:0; background:#fff; border-bottom:1px solid var(--border);
          position:relative; z-index:1; overflow-x:auto;
        }
        .fp-trust::-webkit-scrollbar{display:none}
        .fp-trust-item {
          display:flex; align-items:center; gap:9px;
          padding:14px 28px; white-space:nowrap;
          font-size:13px; font-weight:600; color:var(--ink-mid);
          border-right:1px solid var(--border);
          border-left:1px solid var(--border);
          flex-shrink:0;
        }
        .fp-trust-item i { font-size:16px; color:var(--brand); }


        /* ── Toast ───────────────────────────── */

.fp-toast{

  position: fixed;

  bottom: 28px;
  right: 28px;

  display:flex;
  align-items:center;
  gap:10px;

  background:
    rgba(15,23,42,.94);

  color:#fff;

  padding:
    14px 18px;

  border-radius:16px;

  font-size:14px;
  font-weight:600;

  backdrop-filter:blur(12px);

  box-shadow:
    0 18px 40px rgba(15,23,42,.28);

  z-index:9999;

  opacity:0;

  transform:
    translateY(20px)
    scale(.96);

  pointer-events:none;

  transition:
    opacity .3s,
    transform .3s cubic-bezier(.34,1.56,.64,1);
}

.fp-toast.show{

  opacity:1;

  transform:
    translateY(0)
    scale(1);
}

.fp-toast i{

  color:#22c55e;

  font-size:18px;
}

        /* ── INNER ── */
        .fp-inner { max-width:1400px; margin:0 auto; padding:0 30px; position:relative; z-index:1; }

        /* ── SEARCH + FILTER ── */
        .fp-controls {
          display:flex; gap:12px; align-items:center; flex-wrap:wrap;
          padding:32px 0 24px;
        }
        .fp-search-wrap {
          flex:1; min-width:220px; position:relative;
        }
        .fp-search-wrap i { position:absolute; left:14px; top:50%; transform:translateY(-50%); font-size:17px; color:var(--ink-soft); pointer-events:none; }
        .fp-search {
          width:100%; padding:11px 16px 11px 42px;
          border:1.5px solid var(--border); border-radius:12px;
          background:#f8fafc; font-family:var(--ff-b); font-size:14px; color:var(--ink);
          outline:none; transition:border-color .2s,box-shadow .2s,background .2s;
        }
        .fp-search::placeholder { color:var(--ink-soft); }
        .fp-search:focus { border-color:var(--brand); background:#fff; box-shadow:0 0 0 4px rgba(6,182,212,.1); }
        .fp-select {
          padding:11px 36px 11px 14px; border:1.5px solid var(--border); border-radius:12px;
          background:#f8fafc; font-family:var(--ff-b); font-size:13.5px; color:var(--ink-mid);
          outline:none; cursor:pointer; appearance:none;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2394a3b8'/%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:right 12px center;
          transition:border-color .2s,background .2s;
        }
        .fp-select:focus { border-color:var(--brand); background:#fff; }

        /* Filter chips */
        .fp-chips { display:flex; gap:8px; flex-wrap:wrap; padding-bottom:28px; }
        .fp-chip {
          padding:7px 16px; border-radius:100px; font-size:13px; font-weight:600;
          border:1.5px solid var(--border); background:#fff; color:var(--ink-mid);
          cursor:pointer; transition:all .22s cubic-bezier(.4,0,.2,1);
        }
        .fp-chip:hover { border-color:var(--brand); color:var(--brand); }
        .fp-chip.on { background:linear-gradient(135deg,var(--brand),#2563EB); border-color:transparent; color:#fff; box-shadow:0 4px 14px rgba(6,182,212,.3); }

        /* Results count */
        .fp-results { font-size:13px; color:var(--ink-soft); margin-bottom:20px; }

        /* ── FEATURED HIGHLIGHT ── */
        .fp-highlight {
          display:grid; grid-template-columns:1fr 1fr;
          border-radius:24px; overflow:hidden; margin-bottom:40px;
          border:1px solid var(--border);
          box-shadow:0 12px 40px rgba(15,23,42,.09);
          position:relative;
        }
        .fp-highlight-left {
          background:radial-gradient(circle at 50% 40%,rgba(6,182,212,.12) 0%,rgba(241,245,249,.6) 65%,transparent 100%);
          padding:40px; display:flex; align-items:center; justify-content:center;
          position:relative; min-height:340px;
        }
        .fp-highlight-left img { max-height:260px; object-fit:contain; filter:drop-shadow(0 28px 40px rgba(0,0,0,.14)); transition:transform .4s cubic-bezier(.4,0,.2,1); }
        .fp-highlight:hover .fp-highlight-left img { transform:scale(1.06) translateY(-6px); }
        .fp-highlight-badge-wrap { position:absolute; top:18px; left:18px; }
        .fp-highlight-right {
          background:#fff; padding:44px 40px;
          display:flex; flex-direction:column; justify-content:center; gap:14px;
        }
        .fp-hl-eyebrow { font-size:11px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--brand); display:flex; align-items:center; gap:6px; }
        .fp-hl-title { font-family:var(--ff-d); font-size:clamp(1.6rem,2.5vw,2.4rem); font-weight:800; letter-spacing:-.02em; line-height:1.08; }
        .fp-hl-brand { font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--brand); background:rgba(6,182,212,.1); border-radius:100px; padding:3px 12px; width:fit-content; }
        .fp-hl-stars { display:flex; align-items:center; gap:6px; }
        .fp-hl-rev { font-size:12.5px; color:var(--ink-soft); }
        .fp-hl-price-row { display:flex; align-items:baseline; gap:10px; flex-wrap:wrap; }
        .fp-hl-price { font-family:var(--ff-d); font-size:2rem; font-weight:800; color:var(--ink); line-height:1; }
        .fp-hl-orig  { font-size:15px; color:var(--ink-soft); text-decoration:line-through; }
        .fp-hl-disc  { font-size:12px; font-weight:700; color:#10b981; background:rgba(16,185,129,.1); border-radius:7px; padding:3px 9px; }
        .fp-hl-btns  { display:flex; gap:12px; flex-wrap:wrap; }
        .fp-hl-btn-primary {
          display:flex; align-items:center; gap:8px; padding:13px 26px;
          background:linear-gradient(135deg,var(--brand),#2563EB);
          color:#fff; border:none; border-radius:12px; font-family:var(--ff-b);
          font-size:14px; font-weight:700; cursor:pointer;
          box-shadow:0 6px 22px rgba(6,182,212,.32);
          transition:transform .25s cubic-bezier(.4,0,.2,1),box-shadow .25s;
        }
        .fp-hl-btn-primary:hover { transform:translateY(-3px); box-shadow:0 14px 34px rgba(6,182,212,.48); }
        .fp-hl-btn-ghost {
          display:flex; align-items:center; gap:8px; padding:12px 22px;
          background:none; border:1.5px solid var(--border); border-radius:12px;
          font-family:var(--ff-b); font-size:14px; font-weight:600; color:var(--ink-mid);
          cursor:pointer; transition:border-color .22s,color .22s;
        }
        .fp-hl-btn-ghost:hover { border-color:var(--brand); color:var(--brand); }
        .fp-stock-dot { width:7px;height:7px;border-radius:50%;background:#10b981;box-shadow:0 0 7px rgba(16,185,129,.6);animation:fpPulse 1.8s ease infinite; }

        /* ── PRODUCT GRID ── */
        .fp-grid {
          display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
          gap:24px; margin-bottom:48px;
        }

        /* ── PRODUCT CARD ── */
        .fp-card {
          border-radius:20px; overflow:hidden;
          background:linear-gradient(180deg,#ffffff 0%,#f8fafc 100%);
          border:1px solid rgba(226,232,240,.9);
          box-shadow:0 4px 20px rgba(15,23,42,.06);
          display:flex; flex-direction:column;
          cursor:pointer; position:relative;
          transition:transform .32s cubic-bezier(.4,0,.2,1), box-shadow .32s, border-color .25s;
          opacity:0; transform:translateY(28px);
        }
        .fp-card.fp-vis { animation:fpCardIn .55s cubic-bezier(.22,1,.36,1) forwards; }
        @keyframes fpCardIn {
          from{opacity:0;transform:translateY(28px)}
          to  {opacity:1;transform:translateY(0)}
        }
        .fp-card:hover {
          transform:translateY(-10px) scale(1.015);
          box-shadow:0 28px 56px rgba(15,23,42,.13), 0 0 0 1.5px rgba(6,182,212,.4);
          border-color:rgba(6,182,212,.4);
        }

        /* Badge */
        .fp-badge {
          position:absolute; top:14px; left:14px; z-index:5;
          font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase;
          color:#fff; padding:4px 12px; border-radius:100px;
          background:linear-gradient(135deg,var(--brand),#2563EB);
          box-shadow:0 3px 10px rgba(6,182,212,.35);
        }

        /* Wishlist */
        .fp-wish {
          position:absolute; top:12px; right:12px; z-index:5;
          width:34px; height:34px; border-radius:50%;
          border:1.5px solid var(--border); background:rgba(255,255,255,.88);
          backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center;
          cursor:pointer; font-size:16px; color:var(--ink-soft);
          transition:border-color .2s,color .2s,transform .22s cubic-bezier(.34,1.56,.64,1);
          outline:none;
        }
        .fp-wish:hover,.fp-wish.on { border-color:#ef4444; color:#ef4444; transform:scale(1.12); }
        .fp-wish.on { background:#fef2f2; }

        /* Image */
        .fp-img-wrap {
          height:210px; display:flex; align-items:center; justify-content:center;
          padding:24px; position:relative; overflow:hidden;
          background:radial-gradient(circle at 50% 35%,rgba(6,182,212,.1) 0%,rgba(241,245,249,.6) 65%,transparent 100%);
        }
        .fp-img-wrap::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(6,182,212,.2),transparent);
        }
        .fp-img { max-height:100%; max-width:100%; object-fit:contain; filter:drop-shadow(0 14px 22px rgba(0,0,0,.1)); transition:transform .45s cubic-bezier(.4,0,.2,1),filter .45s; }
        .fp-card:hover .fp-img { transform:scale(1.1) rotate(-1deg); filter:drop-shadow(0 20px 32px rgba(6,182,212,.2)); }

        /* Quick actions */
        .fp-actions {
          position:absolute; bottom:14px; right:14px;
          display:flex; flex-direction:column; gap:6px;
          opacity:0; transform:translateX(10px);
          transition:opacity .25s,transform .25s cubic-bezier(.4,0,.2,1);
          z-index:4;
        }
        .fp-card:hover .fp-actions { opacity:1; transform:translateX(0); }
        .fp-action-btn {
          width:34px; height:34px; border-radius:10px;
          border:1.5px solid rgba(226,232,240,.9); background:rgba(255,255,255,.92);
          backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center;
          cursor:pointer; font-size:15px; color:var(--ink-mid); position:relative; overflow:hidden;
          transition:border-color .18s,color .18s,background .18s,transform .2s;
          outline:none;
        }
        .fp-action-btn:hover { border-color:var(--brand); color:var(--brand); background:rgba(6,182,212,.08); transform:scale(1.1); }
        /* Cart ripple */
        .fp-ripple {
          position:absolute; border-radius:50%;
          background:rgba(6,182,212,.25); pointer-events:none;
          animation:fpRipple .65s ease-out forwards;
          transform:translate(-50%,-50%);
        }
        @keyframes fpRipple { from{width:0;height:0;opacity:.8} to{width:100px;height:100px;opacity:0} }

        /* Card body */
        .fp-body { padding:18px 20px 0; flex:1; display:flex; flex-direction:column; }
        .fp-brand { font-size:10.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--brand); margin-bottom:5px; }
        .fp-title { font-size:15px; font-weight:600; color:var(--ink); line-height:1.45; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; margin-bottom:8px; flex:1; }
        .fp-stars-row { display:flex; align-items:center; gap:5px; margin-bottom:8px; }
        .fp-rev-ct { font-size:12px; color:var(--ink-soft); }
        .fp-stock-row { display:flex; align-items:center; gap:5px; font-size:12px; font-weight:600; color:#10b981; margin-bottom:8px; }
        .fp-price-row { display:flex; align-items:baseline; gap:8px; flex-wrap:wrap; margin-bottom:4px; }
        .fp-price { font-family:var(--ff-d); font-size:22px; font-weight:800; color:var(--ink); line-height:1; }
        .fp-orig  { font-size:13px; color:var(--ink-soft); text-decoration:line-through; }
        .fp-disc  { font-size:11px; font-weight:700; color:#10b981; background:rgba(16,185,129,.1); border-radius:6px; padding:2px 7px; }

        /* Add to cart */
        .fp-cart-wrap { padding:14px 20px 18px; }
        .fp-cart-btn {
          width:100%; display:flex; align-items:center; justify-content:center; gap:8px;
          padding:11px; background:var(--ink); color:#fff; border:none; border-radius:12px;
          font-family:var(--ff-b); font-size:13.5px; font-weight:700; cursor:pointer;
          position:relative; overflow:hidden;
          opacity:0; transform:translateY(8px);
          transition:opacity .28s cubic-bezier(.4,0,.2,1),transform .28s,background .2s;
        }
        .fp-card:hover .fp-cart-btn { opacity:1; transform:translateY(0); }
        .fp-cart-btn:hover { background:var(--brand); }
        .fp-cart-btn i { font-size:16px; }

        /* ── EMPTY STATE ── */
        .fp-empty {
          grid-column:1/-1; display:flex; flex-direction:column; align-items:center;
          justify-content:center; padding:80px 24px; text-align:center; gap:14px;
        }
        .fp-empty-icon { font-size:56px; color:#cbd5e1; }
        .fp-empty-title { font-family:var(--ff-d); font-size:26px; font-weight:800; color:var(--ink); }
        .fp-empty-sub { font-size:14px; color:var(--ink-soft); }
        .fp-empty-btn { padding:11px 24px; border:none; border-radius:12px; background:var(--brand); color:#fff; font-family:var(--ff-b); font-size:14px; font-weight:700; cursor:pointer; margin-top:4px; }

        /* ── LOAD MORE ── */
        .fp-load-wrap { display:flex; justify-content:center; margin-bottom:56px; }
        .fp-load-btn {
          display:flex; align-items:center; gap:10px;
          padding:14px 36px; border:1.5px solid var(--border);
          border-radius:100px; background:#fff; font-family:var(--ff-b);
          font-size:14px; font-weight:600; color:var(--ink-mid); cursor:pointer;
          transition:all .28s cubic-bezier(.4,0,.2,1);
          box-shadow:0 4px 14px rgba(15,23,42,.06);
        }
        .fp-load-btn:hover { border-color:var(--brand); color:var(--brand); transform:translateY(-3px); box-shadow:0 10px 28px rgba(6,182,212,.18); }
        .fp-load-btn i { font-size:17px; }

        /* ── BOTTOM TRUST ── */
        .fp-bottom-trust {
          display:grid; grid-template-columns:repeat(4,1fr);
          gap:0; border-radius:20px; overflow:hidden;
          border:1px solid var(--border); background:#fff;
          box-shadow:0 4px 20px rgba(15,23,42,.06);
        }
        .fp-bt-item {
          display:flex; align-items:center; gap:12px;
          padding:22px 20px; border-right:1px solid var(--border);
          transition:background .22s;
        }
        .fp-bt-item:last-child { border-right:none; }
        .fp-bt-item:hover { background:#f8fafc; }
        .fp-bt-icon { width:44px;height:44px;border-radius:12px;background:rgba(6,182,212,.1);display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--brand);flex-shrink:0; }
        .fp-bt-title { font-size:14px; font-weight:700; color:var(--ink); margin-bottom:2px; }
        .fp-bt-sub { font-size:12px; color:var(--ink-soft); }

        /* ── Responsive ── */
        @media(max-width:960px){
          .fp-inner{padding:0 24px}
          .fp-highlight{grid-template-columns:1fr}
          .fp-highlight-left{min-height:220px;padding:28px}
          .fp-bottom-trust{grid-template-columns:1fr 1fr}
          .fp-bt-item:nth-child(2){border-right:none}
        }
        @media(max-width:600px){
          .fp-inner{padding:0 16px}
          .fp-hero{padding:110px 20px 80px}
          .fp-grid{grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
          .fp-bottom-trust{grid-template-columns:1fr}
          .fp-bt-item{border-right:none;border-bottom:1px solid var(--border)}
          .fp-controls{gap:8px}
          .fp-cart-btn{opacity:1;transform:translateY(0)}
          .fp-actions{opacity:1;transform:translateX(0)}
        }
      `}</style>

      <div className="fp-root">

        {/* ── HERO ── */}
        <div className="fp-hero">
          <div className="fp-hero-grid" />
          <div className="fp-hero-orb fp-orb1" />
          <div className="fp-hero-orb fp-orb2" />
          <div className="fp-hero-inner">
            <div className="fp-hero-badge"><div className="fp-hero-badge-dot" />Featured Collection</div>
            <h1>Premium <span>HVACR</span> Tools &<br />Industrial Solutions</h1>
            <p>Certified tools, chemicals and refrigeration solutions trusted by professionals across India.</p>
          </div>
        </div>

        {/* ── TRUST STRIP ── */}
        <div className="fp-trust">
          {[
            { icon: "ri-shield-check-line", text: "Genuine Products" },
            { icon: "ri-truck-line", text: "Fast Delivery" },
            { icon: "ri-tools-line", text: "Expert HVAC Support" },
            { icon: "ri-lock-2-line", text: "Secure Checkout" },
            { icon: "ri-file-text-line", text: "GST Invoice" },
            { icon: "ri-refresh-line", text: "Easy Returns" },
          ].map(t => (
            <div className="fp-trust-item" key={t.text}><i className={t.icon} />{t.text}</div>
          ))}
        </div>

        <div className="fp-inner">

          {/* ── SEARCH + SORT ── */}
          <div className="fp-controls">
            <div className="fp-search-wrap">
              <i className="ri-search-line" />
              <input className="fp-search" placeholder="Search products, brands…" value={search} onChange={e => { setSearch(e.target.value); setVisible(8); }} />
            </div>
            <select className="fp-select" value={sort} onChange={e => setSort(e.target.value)}>
              {SORTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Category chips */}
          <div className="fp-chips">
            {CATS.map(c => (
              <button key={c} className={`fp-chip${cat === c ? " on" : ""}`} onClick={() => { setCat(c); setVisible(8); }}>{c}</button>
            ))}
          </div>

          <div className="fp-results">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</div>

          {/* ── FEATURED HIGHLIGHT ── */}
          {featured && cat === "All" && !search && (
            <div className="fp-highlight" onClick={() => navigate("/featured-product-details", { state: featured })}>
              <div className="fp-highlight-left">
                <div className="fp-highlight-badge-wrap">
                  <div className="fp-badge" style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)" }}>{featured.badge}</div>
                </div>
                {featured.image && <img src={featured.image} alt={featured.title} />}
              </div>
              <div className="fp-highlight-right">
                <div className="fp-hl-eyebrow"><i className="ri-star-fill" />Editor's Pick</div>
                <div className="fp-hl-brand">{featured.brand || "Premium HVACR"}</div>
                <div className="fp-hl-title">{featured.title}</div>
                <div className="fp-hl-stars">
                  <Stars n={featured.rating} />
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{featured.rating}</span>
                  <span className="fp-hl-rev">({featured.reviews} reviews)</span>
                </div>
                <div className="fp-hl-price-row">
                  <span className="fp-hl-price">{featured.price}</span>
                  {featured.originalPrice && <span className="fp-hl-orig">{featured.originalPrice}</span>}
                  <span className="fp-hl-disc">Save {featured.discount}%</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, color: "#10b981", marginBottom: 4 }}>
                  <div className="fp-stock-dot" />In Stock · Only {featured.stockLeft} left
                </div>
                <div className="fp-hl-btns">
                  <button className="fp-hl-btn-primary" onClick={e => { e.stopPropagation(); navigate("/featured-product-details", { state: featured }); }}>
                    <i className="ri-eye-line" />View Details
                  </button>
                  <button className="fp-hl-btn-ghost" onClick={e => addRipple(e, featured.id)}>
                    <i className="ri-shopping-cart-2-line" />Add to Cart
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── GRID ── */}
          <div className="fp-grid">
            {filtered.length === 0 ? (
              <div className="fp-empty">
                <i className="ri-search-line fp-empty-icon" />
                <div className="fp-empty-title">No products found</div>
                <div className="fp-empty-sub">Try a different search term or category</div>
                <button className="fp-empty-btn" onClick={() => { setSearch(""); setCat("All"); }}>Clear Filters</button>
              </div>
            ) : (
              (cat === "All" && !search ? grid : filtered).slice(0, visible).map((product, i) => (
                <div
                  key={product.id}
                  className="fp-card"
                  ref={el => revealRef.current[i] = el}
                  style={{ animationDelay: `${i * 60}ms` }}
                  onClick={() => navigate("/featured-product-details", { state: product })}
                >
                  <div className="fp-badge">{product.badge}</div>
                  <button className={`fp-wish${wishlist.includes(product.id) ? " on" : ""}`} onClick={e => toggleWish(e, product)}>
                    <i className={wishlist.includes(product.id) ? "ri-heart-3-fill" : "ri-heart-3-line"} />
                  </button>

                  <div className="fp-img-wrap">
                    {product.image && <img className="fp-img" src={product.image} alt={product.title} />}
                    <div className="fp-actions">
                      <button className="fp-action-btn" title="Quick view" onClick={e => { e.stopPropagation(); navigate("/featured-product-details", { state: product }); }}>
                        <i className="ri-eye-line" />
                      </button>
                      <button className="fp-action-btn" title="Add to cart" onClick={e => addRipple(e, product.id)}>
                        {ripples[product.id] && <span className="fp-ripple" style={{ left: ripples[product.id].x, top: ripples[product.id].y }} />}
                        <i className="ri-shopping-cart-2-line" />
                      </button>
                    </div>
                  </div>

                  <div className="fp-body">
                    <div className="fp-brand">{product.brand || "HVACR Pro"}</div>
                    <div className="fp-title">{product.title}</div>
                    <div className="fp-stars-row">
                      <Stars n={product.rating} />
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{product.rating}</span>
                      <span className="fp-rev-ct">({product.reviews})</span>
                    </div>
                    <div className="fp-stock-row">
                      <div className="fp-stock-dot" />
                      {product.inStock ? `In Stock · ${product.stockLeft} left` : "Out of Stock"}
                    </div>
                    <div className="fp-price-row">
                      <span className="fp-price">{product.price}</span>
                      {product.originalPrice && <span className="fp-orig">{product.originalPrice}</span>}
                      <span className="fp-disc">-{product.discount}%</span>
                    </div>
                  </div>

                  <div className="fp-cart-wrap">
                    <button className="fp-cart-btn" onClick={e => addRipple(e, product.id)}>
                      <i className="ri-shopping-cart-2-line" />Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load more */}
          {visible < (cat === "All" && !search ? grid.length : filtered.length) && (
            <div className="fp-load-wrap">
              <button
                className="fp-load-btn"
                ref={magLoad.ref}
                onMouseMove={magLoad.onMouseMove}
                onMouseLeave={magLoad.onMouseLeave}
                onClick={() => setVisible(v => v + 8)}
              >
                <i className="ri-arrow-down-line" />
                Load More Products
              </button>
            </div>
          )}

          {/* Bottom trust */}
          <div className="fp-bottom-trust">
            {[
              { icon: "ri-shield-check-line", title: "Genuine Products", sub: "100% certified & authentic" },
              { icon: "ri-truck-line", title: "Nationwide Delivery", sub: "3–5 business days" },
              { icon: "ri-tools-line", title: "Expert HVAC Support", sub: "Certified technicians" },
              { icon: "ri-lock-2-line", title: "Secure Checkout", sub: "256-bit SSL encryption" },
            ].map(t => (
              <div className="fp-bt-item" key={t.title}>
                <div className="fp-bt-icon"><i className={t.icon} /></div>
                <div><div className="fp-bt-title">{t.title}</div><div className="fp-bt-sub">{t.sub}</div></div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}