import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  getCurrentUser,
  updateCurrentUser,
} from "../../utils/auth";

// import {
//   getCurrentUser,
// } from "../../utils/auth";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const STEPS = [
  { label: "Cart", icon: "ri-shopping-cart-line" },
  { label: "Shipping", icon: "ri-truck-line" },
  { label: "Payment", icon: "ri-bank-card-line" },
  { label: "Done", icon: "ri-checkbox-circle-line" },
];

const TRUST = [
  { icon: "ri-lock-line", label: "Secure Checkout" },
  { icon: "ri-truck-line", label: "Fast Delivery" },
  { icon: "ri-arrow-go-back-line", label: "Easy Returns" },
  { icon: "ri-shield-check-line", label: "Genuine Products" },
];

const PAY_METHODS = [
  { id: "upi", icon: "ri-qr-code-line", label: "UPI", sub: "Pay via any UPI app" },
  { id: "card", icon: "ri-bank-card-line", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay" },
  { id: "netbank", icon: "ri-building-line", label: "Net Banking", sub: "All major banks supported" },
  { id: "cod", icon: "ri-hand-coin-line", label: "Cash on Delivery", sub: "Pay when it arrives" },
];

const STATES_IN = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh",
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const CSS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&display=swap');
    @import url('https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css');

    :root {
  --cy: #06b6d4; --bl: #2563eb; --ink: #0f172a;
  --sl: #334155; --mu: #64748b; --bdr: rgba(226,232,240,.9);
  --sf: #f8fafc; --gr: #16a34a; --rd: #dc2626;
  --fb: 'Inter', sans-serif;
  --fh: 'Manrope', sans-serif;
}

/* ── Page ──────────────────────────────────── */
.co-page {
  margin-top: 70px;
  font-family: var(--fb);
  min-height: 100vh;
  background:
    radial-gradient(ellipse 55% 40% at 95% 0%, rgba(6,182,212,.08) 0%, transparent 55%),
    radial-gradient(ellipse 40% 30% at 5% 90%, rgba(37,99,235,.06) 0%, transparent 50%),
    linear-gradient(180deg,#f0f7ff 0%,#fff 40%,#f8fafc 100%);
  padding: clamp(40px,6vw,80px) 0 clamp(60px,8vw,100px);
  position: relative;
  overflow-x: hidden;
}
.co-page::before {
  content:''; position:absolute; inset:0; pointer-events:none; z-index:0;
  background-image:
    linear-gradient(rgba(6,182,212,.025) 1px,transparent 1px),
    linear-gradient(90deg,rgba(6,182,212,.025) 1px,transparent 1px);
  background-size: 52px 52px;
}

/* Orbs */
.co-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; z-index:0; }
.co-orb-1 { width:clamp(200px,30vw,380px); height:clamp(200px,30vw,380px); top:-100px; right:-80px; background:radial-gradient(circle,rgba(6,182,212,.11),transparent 70%); }
.co-orb-2 { width:clamp(140px,22vw,260px); height:clamp(140px,22vw,260px); bottom:60px; left:-60px;  background:radial-gradient(circle,rgba(37,99,235,.08),transparent 70%); }

/* ── Inner ─────────────────────────────────── */
.co-inner {
  position: relative; z-index: 1;
  max-width: 1300px; margin: 0 auto;
  padding: 0 clamp(14px,3.5vw,28px);
}

/* ── Header ────────────────────────────────── */
.co-hdr {
  display: flex; justify-content: space-between;
  align-items: center; flex-wrap: wrap;
  gap: 12px; margin-bottom: clamp(20px,3vw,32px);
}
.co-title {
  font-family: var(--fh);
  font-size: clamp(1.35rem,3vw,2.2rem);
  font-weight: 900; color: var(--ink); letter-spacing: -.03em;
}
.co-title span {
  background: linear-gradient(135deg,var(--cy),var(--bl));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.co-back {
  display: inline-flex; align-items: center; gap: 7px;
  padding: clamp(8px,1vw,10px) clamp(14px,2vw,18px);
  border: 1.5px solid var(--bdr); border-radius: 12px;
  background: #fff; font-family: var(--fb);
  font-size: clamp(12.5px,1.3vw,13.5px); font-weight: 600; color: var(--sl);
  cursor: pointer; transition: all .25s; min-height: 44px;
  box-shadow: 0 2px 8px rgba(15,23,42,.06);
}
.co-back:hover { border-color:var(--cy); color:var(--cy); transform:translateX(-3px); }

/* ── Progress steps ────────────────────────── */
.co-progress {
  display: flex; align-items: center; justify-content: center;
  gap: 0; margin-bottom: clamp(24px,4vw,40px);
  flex-wrap: nowrap; overflow-x: auto;
  scrollbar-width: none; padding-bottom: 2px;
}
.co-progress::-webkit-scrollbar { display:none; }
.co-step {
  display: flex; align-items: center; gap: 8px;
  font-size: clamp(11px,1.2vw,12.5px); font-weight: 600;
  color: var(--mu); white-space: nowrap; flex-shrink: 0;
}
.co-step.active { color:var(--cy); }
.co-step.done   { color:var(--gr); }
.co-step-dot {
  width: clamp(26px,3.5vw,30px); height: clamp(26px,3.5vw,30px);
  border-radius: 50%; border: 2px solid var(--bdr);
  background: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 13px; color: var(--mu); flex-shrink: 0; transition: all .3s;
}
.co-step.active .co-step-dot { border-color:var(--cy); background:var(--cy); color:#fff; box-shadow:0 4px 14px rgba(6,182,212,.35); }
.co-step.done   .co-step-dot { border-color:var(--gr); background:var(--gr); color:#fff; }
.co-step-line { width: clamp(28px,4vw,56px); height:2px; background:var(--bdr); margin:0 4px; flex-shrink:0; transition:background .4s; }
.co-step-line.done { background:var(--gr); }

.co-address-section {
  padding: 20px 24px;
  border-top: 1px solid var(--bdr);
}

.co-address-section h3 {
  font-family: var(--fh);
  font-size: 18px;
  margin-bottom: 16px;
  color: var(--ink);
}

.co-address-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;

  padding: 16px;
  border: 1.5px solid var(--bdr);
  border-radius: 14px;

  margin-bottom: 14px;

  cursor: pointer;
  transition: all 0.25s ease;

  background: #fff;
}

.co-address-card:hover {
  border-color: var(--cy);
  box-shadow: 0 4px 14px rgba(6,182,212,.12);
}

.co-address-card.selected {
  border-color: var(--cy);
  background: rgba(6,182,212,.05);
}

.co-address-card strong {
  font-size: 15px;
  color: var(--ink);
}

.co-address-card p {
  margin: 6px 0;
  color: var(--sl);
  line-height: 1.5;
  font-size: 14px;
}

.co-address-card span {
  font-size: 13px;
  color: var(--mu);
}

.co-address-section button {
  padding: 10px 16px;
  border: none;
  border-radius: 10px;

  background: linear-gradient(
    135deg,
    var(--cy),
    var(--bl)
  );

  color: white;
  font-weight: 600;
  cursor: pointer;

  transition: 0.25s;
}

.co-address-section button:hover {
  transform: translateY(-2px);
}

.co-address-form {
  padding: 20px 24px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  border-top: 1px solid var(--bdr);
}

.co-address-form input,
.co-address-form textarea {
  padding: 12px 14px;

  border: 1.5px solid var(--bdr);
  border-radius: 12px;

  background: var(--sf);

  font-size: 14px;
  outline: none;

  transition: 0.2s;
}

.co-address-form input:focus,
.co-address-form textarea:focus {
  border-color: var(--cy);
  background: white;
}

.co-address-form textarea {
  min-height: 90px;
  resize: vertical;

  grid-column: 1 / -1;
}

.co-address-form button {
  width: fit-content;

  padding: 12px 20px;

  border: none;
  border-radius: 12px;

  background: linear-gradient(
    135deg,
    var(--cy),
    var(--bl)
  );

  color: white;
  font-weight: 700;

  cursor: pointer;
}

/* ── Layout grid ───────────────────────────── */
.co-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: clamp(16px,2.5vw,28px);
  align-items: start;
}
.co-left  { display:flex; flex-direction:column; gap:clamp(14px,2vw,20px); }
.co-right { position:sticky; top:100px; }

/* ── Panel ─────────────────────────────────── */
.co-panel {
  background: #fff; border:1px solid var(--bdr);
  border-radius: clamp(14px,2vw,20px);
  box-shadow: 0 8px 28px rgba(15,23,42,.06); overflow:hidden;
}
.co-panel-head {
  padding: clamp(16px,2vw,20px) clamp(16px,2vw,24px) clamp(12px,1.5vw,16px);
  border-bottom: 1px solid var(--bdr);
  display: flex; align-items: center; gap:10px;
}
.co-panel-icon { width:36px;height:36px;border-radius:10px;background:rgba(6,182,212,.09);border:1px solid rgba(6,182,212,.18);display:flex;align-items:center;justify-content:center;font-size:17px;color:var(--cy);flex-shrink:0; }
.co-panel-title { font-family:var(--fh); font-size:1rem; font-weight:800; color:var(--ink); letter-spacing:-.02em; }
.co-panel-count { margin-left:auto; font-size:12px; font-weight:600; color:var(--mu); background:var(--sf); border:1px solid var(--bdr); padding:3px 10px; border-radius:100px; }

/* ── Cart items ────────────────────────────── */
.co-items-list { padding:8px 0; }
.co-item {
  display: flex; align-items: center; gap: clamp(10px,1.5vw,16px);
  padding: clamp(12px,1.8vw,18px) clamp(14px,2vw,24px);
  border-bottom: 1px solid var(--bdr); transition: background .2s;
}
.co-item:last-child { border-bottom:none; }
.co-item:hover { background:#fafcff; }
.co-item-img {
  width: clamp(56px,7vw,72px); height: clamp(56px,7vw,72px);
  border-radius: 14px; border:1px solid var(--bdr);
  background: radial-gradient(circle at center,rgba(6,182,212,.07),transparent 70%),#f8fafc;
  display:flex; align-items:center; justify-content:center;
  overflow:hidden; flex-shrink:0;
}
.co-item-img img { width:100%;height:100%;object-fit:contain;padding:6px; }
.co-item-info { flex:1; min-width:0; }
.co-item-title { font-size:clamp(13px,1.4vw,14px);font-weight:600;color:var(--ink);line-height:1.4;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.co-item-unit  { font-size:12.5px; color:var(--mu); }

/* Qty control */
.co-qty { display:flex;align-items:center;border:1.5px solid var(--bdr);border-radius:100px;background:#fff;box-shadow:0 2px 6px rgba(15,23,42,.05);overflow:hidden;flex-shrink:0; }
.co-qty-btn { width:34px;height:34px;border:none;background:transparent;cursor:pointer;font-size:15px;color:var(--sl);display:flex;align-items:center;justify-content:center;transition:all .2s; }
.co-qty-btn:hover:not(:disabled) { background:rgba(6,182,212,.1); color:var(--cy); }
.co-qty-btn:disabled { opacity:.35; cursor:not-allowed; }
.co-qty-num { min-width:36px;text-align:center;font-weight:700;font-size:13.5px;color:var(--ink);border-left:1.5px solid var(--bdr);border-right:1.5px solid var(--bdr);padding:0 4px;height:34px;display:flex;align-items:center;justify-content:center; }

.co-item-total { font-family:var(--fh);font-size:15px;font-weight:700;color:var(--ink);min-width:90px;text-align:right;flex-shrink:0; }
.co-del-btn { width:34px;height:34px;border-radius:50%;border:1px solid var(--bdr);background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--mu);transition:all .22s;flex-shrink:0; }
.co-del-btn:hover { background:#fee2e2; border-color:#fca5a5; color:var(--rd); }

/* ── Trust strip ───────────────────────────── */
.co-trust-strip { display:grid; grid-template-columns:repeat(4,1fr); }
.co-trust-item { display:flex;flex-direction:column;align-items:center;gap:6px;padding:clamp(12px,2vw,18px) 12px;text-align:center;border-right:1px solid var(--bdr); }
.co-trust-item:last-child { border-right:none; }
.co-trust-icon { width:38px;height:38px;border-radius:12px;background:rgba(6,182,212,.09);border:1px solid rgba(6,182,212,.16);display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--cy); }
.co-trust-label { font-size:clamp(10.5px,1.1vw,11.5px);font-weight:600;color:var(--sl);line-height:1.35; }

/* ── Shipping form ─────────────────────────── */
.co-form { padding:clamp(16px,2.5vw,24px); display:flex; flex-direction:column; gap:clamp(14px,2vw,20px); }
.co-form-section-title { font-family:var(--fh); font-size:13px; font-weight:800; letter-spacing:.07em; text-transform:uppercase; color:var(--cy); margin-bottom:14px; display:flex; align-items:center; gap:7px; }
.co-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.co-field { display:flex; flex-direction:column; gap:6px; }
.co-field.full { grid-column:1/-1; }
.co-label { font-size:12px; font-weight:700; color:var(--mu); letter-spacing:.05em; text-transform:uppercase; }
.co-input, .co-select {
  padding: clamp(10px,1.2vw,12px) clamp(12px,1.5vw,14px);
  border:1.5px solid var(--bdr); border-radius:12px;
  background:var(--sf); font-family:var(--fb);
  font-size:14px; color:var(--ink);
  outline:none; transition:border-color .2s, box-shadow .2s, background .2s;
  width:100%; min-height:44px;
}
.co-input::placeholder { color:var(--mu); }
.co-input:focus, .co-select:focus { border-color:var(--cy); background:#fff; box-shadow:0 0 0 4px rgba(6,182,212,.1); }
.co-input.err { border-color:var(--rd); }
.co-err-msg { font-size:12px; color:var(--rd); margin-top:3px; display:flex; align-items:center; gap:4px; }

/* Location button */
.co-location-btn {
  display:inline-flex; align-items:center; gap:8px;
  padding:11px 18px; border:1.5px solid var(--bdr);
  border-radius:12px; background:#fff; font-family:var(--fb);
  font-size:13.5px; font-weight:600; color:var(--sl);
  cursor:pointer; transition:all .25s; width:fit-content; min-height:44px;
}
.co-location-btn:hover { border-color:var(--cy); color:var(--cy); background:rgba(6,182,212,.05); }
.co-location-btn.loading { opacity:.65; pointer-events:none; }
.co-location-btn i { font-size:16px; }
@keyframes spin { to { transform:rotate(360deg); } }
.co-spin { animation:spin .8s linear infinite; display:inline-block; }

/* ── Payment ───────────────────────────────── */
.co-pay-wrap { padding:clamp(16px,2.5vw,24px); display:flex; flex-direction:column; gap:12px; }
.co-pay-card {
  display:flex; align-items:center; gap:clamp(10px,1.5vw,16px);
  padding:clamp(14px,1.8vw,18px) clamp(14px,2vw,20px);
  border:2px solid var(--bdr); border-radius:16px;
  cursor:pointer; transition:border-color .22s, background .22s, box-shadow .22s;
  background:#fff;
}
.co-pay-card.sel { border-color:var(--cy); background:rgba(6,182,212,.04); box-shadow:0 4px 18px rgba(6,182,212,.14); }
.co-pay-card:hover:not(.sel) { border-color:#94a3b8; }
.co-pay-radio { width:20px;height:20px;border-radius:50%;border:2px solid var(--bdr);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:border-color .2s; }
.co-pay-card.sel .co-pay-radio { border-color:var(--cy); }
.co-pay-radio-dot { width:10px;height:10px;border-radius:50%;background:var(--cy);transform:scale(0);transition:transform .2s cubic-bezier(.34,1.56,.64,1); }
.co-pay-card.sel .co-pay-radio-dot { transform:scale(1); }
.co-pay-icon { width:44px;height:44px;border-radius:12px;background:rgba(6,182,212,.09);border:1px solid rgba(6,182,212,.16);display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--cy);flex-shrink:0; }
.co-pay-label { font-size:clamp(13.5px,1.5vw,14.5px); font-weight:700; color:var(--ink); margin-bottom:2px; }
.co-pay-sub   { font-size:12.5px; color:var(--mu); }

/* Card fields */
.co-card-fields { padding:0 clamp(16px,2.5vw,24px) 20px; display:flex; flex-direction:column; gap:12px; }
.co-card-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

/* UPI field */
.co-upi-field { padding:0 clamp(16px,2.5vw,24px) 20px; }

/* Nav buttons */
.co-nav-row {
  display:flex; gap:12px;
  padding:clamp(14px,2vw,20px) clamp(16px,2.5vw,24px);
  border-top:1px solid var(--bdr);
}
.co-prev-btn {
  display:flex; align-items:center; gap:7px;
  padding:clamp(10px,1.2vw,12px) clamp(16px,2vw,22px);
  border:1.5px solid var(--bdr); border-radius:12px;
  background:#fff; font-family:var(--fb);
  font-size:14px; font-weight:600; color:var(--sl);
  cursor:pointer; transition:all .22s; min-height:44px;
}
.co-prev-btn:hover { border-color:var(--cy); color:var(--cy); }
.co-next-btn {
  flex:1; display:flex; align-items:center; justify-content:center; gap:9px;
  padding:14px; border:none; border-radius:12px;
  background:linear-gradient(135deg,var(--cy),var(--bl)); color:#fff;
  font-family:var(--fb); font-size:clamp(13.5px,1.5vw,14.5px); font-weight:700;
  cursor:pointer; min-height:44px;
  box-shadow:0 8px 24px rgba(6,182,212,.32);
  position:relative; overflow:hidden;
  transition:transform .25s, box-shadow .25s;
}
.co-next-btn::after { content:''; position:absolute; top:0; left:-100%; width:50%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent); transform:skewX(-18deg); transition:left .45s; }
.co-next-btn:hover { transform:translateY(-2px); box-shadow:0 14px 34px rgba(6,182,212,.48); }
.co-next-btn:hover::after { left:160%; }
.co-next-btn:disabled { opacity:.55; pointer-events:none; }

/* ── Summary panel ─────────────────────────── */
.co-sum-panel { background:#fff; border:1px solid var(--bdr); border-radius:clamp(14px,2vw,20px); box-shadow:0 8px 28px rgba(15,23,42,.07); overflow:hidden; }
.co-sum-head { padding:clamp(16px,2vw,20px) clamp(16px,2vw,24px) clamp(12px,1.5vw,16px); border-bottom:1px solid var(--bdr); font-family:var(--fh); font-size:1rem; font-weight:800; color:var(--ink); letter-spacing:-.02em; display:flex; align-items:center; gap:8px; }
.co-sum-head i { font-size:17px; color:var(--cy); }
.co-sum-body { padding:clamp(16px,2vw,20px) clamp(16px,2vw,24px); }
.co-price-row { display:flex; justify-content:space-between; align-items:center; padding:7px 0; font-size:14px; }
.co-price-label { color:var(--mu); }
.co-price-val { font-weight:600; color:var(--sl); }
.co-price-val.free { color:var(--gr); font-weight:700; }
.co-savings-row { display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:rgba(22,163,74,.06); border:1px solid rgba(22,163,74,.15); border-radius:10px; margin:10px 0; font-size:13px; }
.co-savings-row span:first-child { color:var(--gr); font-weight:600; display:flex; align-items:center; gap:6px; }
.co-savings-row span:last-child  { color:var(--gr); font-weight:700; }
.co-coupon-wrap {
  margin-top: 16px;
}

.co-coupon-input {
  display: flex;
  gap: 10px;
}

.co-coupon-input input {
  flex: 1;

  height: 44px;

  border: 1.5px solid var(--bdr);
  border-radius: 12px;

  padding: 0 14px;

  outline: none;

  background: var(--sf);
}

.co-coupon-input input:focus {
  border-color: var(--cy);
}

.co-coupon-input button {
  padding: 0 18px;

  border: none;
  border-radius: 12px;

  background: linear-gradient(
    135deg,
    var(--cy),
    var(--bl)
  );

  color: white;
  font-weight: 700;

  cursor: pointer;
}

.co-coupon-msg {
  margin-top: 10px;

  font-size: 13px;
  font-weight: 600;
}

.co-coupon-msg.success {
  color: #16a34a;
}

.co-coupon-msg.error {
  color: #dc2626;
}
.co-sum-div { height:1px; background:var(--bdr); margin:12px 0; }
.co-total-row { display:flex; justify-content:space-between; align-items:baseline; padding:8px 0 4px; }
.co-total-label { font-family:var(--fh); font-size:1rem; font-weight:800; color:var(--ink); }
.co-total-val   { font-family:var(--fh); font-size:clamp(1.25rem,2.5vw,1.5rem); font-weight:900; color:var(--ink); letter-spacing:-.03em; }
.co-total-tax   { font-size:11px; color:var(--mu); text-align:right; margin-bottom:16px; }
.co-del-est { display:flex; align-items:center; gap:9px; background:var(--sf); border:1px solid var(--bdr); border-radius:12px; padding:11px 14px; margin-bottom:16px; font-size:13px; color:var(--sl); }
.co-del-est i { color:var(--cy); font-size:17px; flex-shrink:0; }
.co-pay-strip { display:flex; align-items:center; gap:6px; flex-wrap:wrap; justify-content:center; padding-bottom:4px; }
.co-pay-strip-label { font-size:11px; color:var(--mu); letter-spacing:.06em; text-transform:uppercase; width:100%; text-align:center; margin-bottom:4px; }
.co-pay-pill { padding:3px 10px; border:1px solid var(--bdr); border-radius:7px; font-size:11px; font-weight:600; color:var(--mu); background:var(--sf); }

/* Shipping summary in right panel */
.co-ship-summary { padding:16px 20px; display:flex; flex-direction:column; gap:10px; margin-bottom:16px; background:var(--sf); border:1px solid var(--bdr); border-radius:14px; }
.co-ship-row { display:flex; align-items:flex-start; gap:10px; font-size:13px; }
.co-ship-icon { color:var(--cy); font-size:15px; margin-top:1px; flex-shrink:0; }
.co-ship-val  { color:var(--sl); font-weight:500; line-height:1.5; }

/* ── Empty state ───────────────────────────── */
.co-empty { display:flex;flex-direction:column;align-items:center;justify-content:center;padding:clamp(40px,6vw,64px) 24px;text-align:center;gap:16px; }
.co-empty-icon { width:80px;height:80px;border-radius:50%;background:rgba(6,182,212,.09);border:1px solid rgba(6,182,212,.18);display:flex;align-items:center;justify-content:center;font-size:36px;color:var(--cy);margin-bottom:4px; }
.co-empty-title { font-family:var(--fh);font-size:clamp(1.1rem,2.5vw,1.3rem);font-weight:800;color:var(--ink); }
.co-empty-sub { font-size:14px;color:var(--mu);max-width:280px;line-height:1.65; }
.co-empty-btn { margin-top:8px;padding:12px 28px;border:none;border-radius:12px;background:linear-gradient(135deg,var(--cy),var(--bl));color:#fff;font-family:var(--fb);font-size:14px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:7px;box-shadow:0 6px 18px rgba(6,182,212,.35);transition:all .25s;min-height:44px; }
.co-empty-btn:hover { transform:translateY(-2px); box-shadow:0 10px 26px rgba(6,182,212,.45); }

/* ── Success state ─────────────────────────── */
.co-success { display:flex;flex-direction:column;align-items:center;justify-content:center;padding:clamp(40px,7vw,72px) 24px;text-align:center;gap:16px; }
.co-success-icon { width:90px;height:90px;border-radius:50%;background:rgba(22,163,74,.1);border:1px solid rgba(22,163,74,.25);display:flex;align-items:center;justify-content:center;font-size:40px;color:var(--gr);animation:successPop .55s cubic-bezier(.34,1.56,.64,1) both; }
@keyframes successPop { from{transform:scale(.3);opacity:0} to{transform:scale(1);opacity:1} }
.co-success-title { font-family:var(--fh);font-size:clamp(1.3rem,3vw,1.6rem);font-weight:900;color:var(--ink); }
.co-success-sub   { font-size:14px;color:var(--mu);max-width:320px;line-height:1.7; }
.co-success-order { background:var(--sf); border:1px solid var(--bdr); border-radius:14px; padding:14px 24px; display:flex; flex-direction:column; gap:6px; }
.co-success-order-id  { font-family:var(--fh); font-size:1.1rem; font-weight:800; color:var(--cy); letter-spacing:.04em; }
.co-success-order-sub { font-size:12.5px; color:var(--mu); }
.co-success-del { display:flex; align-items:center; gap:8px; font-size:13.5px; color:var(--sl); font-weight:600; }
.co-success-del i { color:var(--cy); font-size:17px; }
.co-success-btns { display:flex; gap:12px; flex-wrap:wrap; justify-content:center; }
.co-success-btn { padding:12px 24px; border-radius:12px; font-family:var(--fb); font-size:14px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:7px; transition:all .25s; min-height:44px; }
.co-success-btn.primary { border:none; background:var(--ink); color:#fff; }
.co-success-btn.primary:hover { background:var(--sl); transform:translateY(-2px); }
.co-success-btn.ghost { border:1.5px solid var(--bdr); background:#fff; color:var(--sl); }
.co-success-btn.ghost:hover { border-color:var(--cy); color:var(--cy); }

/* ══════════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════════ */

/* ── Large laptops  ≤ 1200px ──────────────── */
@media (max-width: 1200px) {
  .co-grid {
    grid-template-columns: 1fr 340px;
  }
}

/* ── Tablets  ≤ 1024px ────────────────────── */
@media (max-width: 1024px) {
  .co-grid {
    grid-template-columns: 1fr 310px;
    gap: 18px;
  }

  .co-step-line {
    width: 32px;
  }
}

/* ── Tablets portrait  ≤ 900px ────────────── */
@media (max-width: 900px) {

  /* Stack layout: summary moves below form */
  .co-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  /* Move summary to top on mobile (feels more natural) */
  .co-right {
    position: static;
    order: -1;
  }

  /* Trust strip: 2×2 */
  .co-trust-strip {
    grid-template-columns: repeat(2, 1fr);
  }
  .co-trust-item:nth-child(2) { border-right: none; }
  .co-trust-item:nth-child(3) { border-top: 1px solid var(--bdr); }
  .co-trust-item:nth-child(4) { border-top: 1px solid var(--bdr); border-right: none; }

  /* Form: single column */
  .co-form-grid {
    grid-template-columns: 1fr;
  }

  /* Card row: single column */
  .co-card-row {
    grid-template-columns: 1fr;
  }

  /* Progress: allow horizontal scroll on narrow tablets */
  .co-progress {
    justify-content: flex-start;
  }
}

/* ── Mobile  ≤ 640px ──────────────────────── */
@media (max-width: 640px) {

  .co-page {
    margin-top: 56px;
  }

  /* Header: stack vertically */
  .co-hdr {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 18px;
  }

  /* Progress: compact label hidden, dots + lines only */
  .co-step span:not(.co-step-dot) {
    display: none;
  }

  .co-step-line {
    width: clamp(20px, 6vw, 40px);
  }

  /* Items: tighter padding */
  .co-item {
    gap: 10px;
    padding: 12px 14px;
  }

  /* Hide price on right — too cramped */
  .co-item-total {
    display: none;
  }

  /* Qty: slightly smaller */
  .co-qty-btn {
    width: 30px; height: 30px;
    font-size: 14px;
  }
  .co-qty-num {
    min-width: 30px; height: 30px;
    font-size: 13px;
  }

  /* Delete button */
  .co-del-btn {
    width: 30px; height: 30px;
    font-size: 15px;
  }

  /* Trust strip: 2×2, compact */
  .co-trust-item {
    padding: 12px 8px;
    gap: 5px;
  }
  .co-trust-icon {
    width: 32px; height: 32px;
    font-size: 15px;
    border-radius: 9px;
  }
  .co-trust-label {
    font-size: 10.5px;
  }

  /* Nav row: stack on very small */
  .co-nav-row {
    padding: 12px 14px;
  }

  /* Payment cards: tighter */
  .co-pay-card {
    gap: 10px;
    padding: 14px;
  }
  .co-pay-icon {
    width: 38px; height: 38px;
    font-size: 17px;
  }

  /* Success buttons: full-width */
  .co-success-btns {
    flex-direction: column;
    width: 100%;
  }
  .co-success-btn {
    width: 100%;
    justify-content: center;
  }
}

/* ── Small mobile  ≤ 480px ────────────────── */
@media (max-width: 480px) {

  .co-item-img {
    width: 52px; height: 52px;
    border-radius: 10px;
  }

  .co-item-title {
    font-size: 12.5px;
  }

  /* Form padding */
  .co-form {
    padding: 14px;
    gap: 12px;
  }

  .co-pay-wrap {
    padding: 14px;
  }

  .co-card-fields,
  .co-upi-field {
    padding-left: 14px;
    padding-right: 14px;
  }

  .co-sum-body {
    padding: 14px;
  }

  /* Stack prev/next buttons */
  .co-nav-row {
    flex-direction: column;
    gap: 8px;
    padding: 12px;
  }

  .co-prev-btn {
    width: 100%;
    justify-content: center;
  }

  /* Trust strip: single row with horizontal scroll */
  .co-trust-strip {
    grid-template-columns: repeat(4, minmax(80px, 1fr));
    overflow-x: auto;
    scrollbar-width: none;
  }
  .co-trust-strip::-webkit-scrollbar { display: none; }
  .co-trust-item {
    border-right: 1px solid var(--bdr);
    border-top: none !important;
  }
  .co-trust-item:last-child { border-right: none; }
}

/* ── Tiny  ≤ 360px ────────────────────────── */
@media (max-width: 360px) {

  .co-inner {
    padding: 0 10px;
  }

  .co-item {
    padding: 10px 10px;
    gap: 8px;
  }

  .co-item-img {
    width: 46px; height: 46px;
  }

  .co-panel-head {
    padding: 14px 12px;
  }

  .co-form {
    padding: 12px;
  }

  .co-next-btn {
    font-size: 13px;
  }

  .co-total-val {
    font-size: 1.2rem;
  }

  .co-success-icon {
    width: 72px; height: 72px;
    font-size: 32px;
  }

  .co-success-title {
    font-size: 1.15rem;
  }
}
  `}</style>
);

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const genOrderId = () => "TEC" + Math.random().toString(36).substr(2, 7).toUpperCase();

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] =
    useState(getCurrentUser());
  const [step, setStep] = useState(0);
  const [cart, setCart] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [locLoading, setLocLoading] = useState(false);
  const [payMethod, setPayMethod] = useState("upi");
  const [errors, setErrors] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [addressData, setAddressData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    addressLine: "",
  });

  const [ship, setShip] = useState(() => {
    try { return JSON.parse(localStorage.getItem("shippingData")) || emptyShip(); }
    catch { return emptyShip(); }
  });

  const [cardInfo, setCardInfo] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");

  function emptyShip() {
    return { fullName: "", phone: "", email: "", address: "", city: "", state: "", pincode: "" };
  }

  const saveAddress = () => {

    // ← CHECK LOGIN FIRST
    if (!currentUser) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    // ← THEN validate fields
    if (
      !addressData.fullName ||
      !addressData.phone ||
      !addressData.city ||
      !addressData.state ||
      !addressData.pincode ||
      !addressData.addressLine
    ) {
      alert("Please fill all fields");
      return;
    }

    const newAddress = {
      id: Date.now(),
      ...addressData,
    };

    const updatedUser = {
      ...currentUser,

      addresses: [
        ...(currentUser?.addresses || []),
        newAddress,
      ],
    };

    updateCurrentUser(updatedUser);
    setCurrentUser(updatedUser);        // ← ADD THIS LINE
    setSelectedAddress(newAddress.id);

    localStorage.setItem(
      "selectedAddress",
      newAddress.id
    );

    setSelectedAddress(newAddress.id);
    setShip((prev) => ({
      ...prev,
      fullName: newAddress.fullName,
      email: newAddress.email,
      phone: newAddress.phone,
      address: newAddress.addressLine,
      city: newAddress.city,
      state: newAddress.state,
      pincode: newAddress.pincode,
    }));

    setShowAddressForm(false);

    setAddressData({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      pincode: "",
      addressLine: "",
    });

  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  useEffect(() => {

    const savedAddress =
      localStorage.getItem(
        "selectedAddress"
      );

    if (
      savedAddress &&
      currentUser?.addresses
    ) {

      const found =
        currentUser.addresses.find(
          (a) =>
            String(a.id) ===
            String(savedAddress)
        );

      if (found) {

        setSelectedAddress(found.id);

        setShip((prev) => ({
          ...prev,

          fullName:
            found.fullName || "",

          phone:
            found.phone || "",

          address:
            found.addressLine || "",

          city:
            found.city || "",

          state:
            found.state || "",

          pincode:
            found.pincode || "",
        }));

      }

    }

  }, []);

  /* Cart mutations */
  const updateCart = (next) => { setCart(next); localStorage.setItem("cart", JSON.stringify(next)); };
  const increase = (i) => { const c = [...cart]; c[i].qty += 1; updateCart(c); };
  const decrease = (i) => { const c = [...cart]; if (c[i].qty > 1) { c[i].qty -= 1; updateCart(c); } };
  const remove = (i) => updateCart(cart.filter((_, idx) => idx !== i));

  /* Totals */
  const subtotal = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const deliveryFee = subtotal > 1000 ? 0 : 49;
  const total = subtotal + deliveryFee - discount;
  const savings = cart.reduce((s, x) => s + (x.oldPrice ? (x.oldPrice - x.price) * x.qty : 0), 0);

  /* Geolocation */
  const detectLocation = async () => {
    if (!navigator.geolocation) return;
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lon } }) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
          const data = await res.json();
          const a = data.address || {};
          const detectedAddress = [a.road, a.neighbourhood, a.suburb].filter(Boolean).join(", ");
          setShip(s => ({
            ...s,
            address: detectedAddress || s.address,
            city: a.city || a.town || a.village || s.city,
            state: a.state || s.state,
            pincode: a.postcode || s.pincode,
          }));
          // Also fill the add-new-address form if it's open
          setAddressData(d => ({
            ...d,
            addressLine: detectedAddress || d.addressLine,
            city: a.city || a.town || a.village || d.city,
            state: a.state || d.state,
            pincode: a.postcode || d.pincode,
          }));
        } catch (e) { console.error(e); }
        finally { setLocLoading(false); }
      },
      () => setLocLoading(false)
    );
  };

  /* Validation */
  const validateShipping = () => {
    const e = {};
    if (!ship.fullName.trim()) e.fullName = "Required";
    if (!/^\d{10}$/.test(ship.phone)) e.phone = "Enter valid 10-digit number";
    if (!/\S+@\S+\.\S+/.test(ship.email)) e.email = "Enter valid email";
    if (!ship.address.trim()) e.address = "Required";
    if (!ship.city.trim()) e.city = "Required";
    if (!ship.state) e.state = "Required";
    if (!/^\d{6}$/.test(ship.pincode)) e.pincode = "Enter valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* Step navigation */
  const goNext = () => {
    if (step === 0 && cart.length === 0) return;

    // ── Auth check: fires when leaving Cart (step 0) ──
    if (step === 0) {
      if (!currentUser) {
        // Save cart position so we can return after login
        localStorage.setItem("postLoginRedirect", "/checkout");
        navigate("/login");
        return;
      }
    }

    if (step === 1) { if (!validateShipping()) return; localStorage.setItem("shippingData", JSON.stringify(ship)); }
    if (step === 2) { handlePayment(); return; }
    setStep(s => s + 1);
  };
  const goPrev = () => { setErrors({}); setStep(s => s - 1); };

  const handlePayment = () => {
    setProcessing(true);
    const oid = genOrderId();
    setTimeout(() => {
      localStorage.removeItem("cart");
      setCart([]);
      setOrderId(oid);
      setProcessing(false);
      setStep(3);
    }, 2000);
  };

  const inputCls = (field) => `co-input${errors[field] ? " err" : ""}`;

  const applyCoupon = () => {

    const code =
      coupon.trim().toUpperCase();

    if (!code) {
      setCouponMessage(
        "Please enter a coupon code"
      );
      return;
    }

    if (code === "TECNIQA10") {

      const disc =
        subtotal * 0.10;

      setDiscount(disc);

      setAppliedCoupon(code);

      setCouponMessage(
        "10% discount applied!"
      );

    }

    else if (code === "SAVE500") {

      setDiscount(500);

      setAppliedCoupon(code);

      setCouponMessage(
        "₹500 discount applied!"
      );

    }

    else if (code === "FREESHIP") {

      setDiscount(deliveryFee);

      setAppliedCoupon(code);

      setCouponMessage(
        "Free shipping applied!"
      );

    }

    else {

      setDiscount(0);

      setAppliedCoupon(null);

      setCouponMessage(
        "Invalid coupon code"
      );

    }

  };

  /* ── STEP 0: Cart ── */
  const renderCart = () => (
    <>
      <div className="co-panel">
        <div className="co-panel-head">
          <div className="co-panel-icon"><i className="ri-shopping-bag-line" /></div>
          <span className="co-panel-title">Order Items</span>
          {cart.length > 0 && <span className="co-panel-count">{cart.length} item{cart.length !== 1 ? "s" : ""}</span>}
        </div>
        {cart.length === 0 ? (
          <div className="co-empty">
            <div className="co-empty-icon"><i className="ri-shopping-cart-line" /></div>
            <div className="co-empty-title">Your cart is empty</div>
            <div className="co-empty-sub">Explore our premium HVAC tools and industrial solutions.</div>
            <button className="co-empty-btn" onClick={() => navigate("/")}><i className="ri-store-line" />Browse Products</button>
          </div>
        ) : (
          <>
            <div className="co-items-list">
              {cart.map((item, idx) => (
                <div className="co-item" key={idx}>
                  <div className="co-item-img">
                    {item.image ? <img src={item.image} alt={item.title} /> : <i className="ri-image-line" style={{ fontSize: 28, color: "var(--cy)", opacity: .5 }} />}
                  </div>
                  <div className="co-item-info">
                    <div className="co-item-title">{item.title}</div>
                    <div className="co-item-unit">₹{item.price.toLocaleString("en-IN")} / unit</div>
                  </div>
                  <div className="co-qty">
                    <button className="co-qty-btn" onClick={() => decrease(idx)} disabled={item.qty === 1}><i className="ri-subtract-line" /></button>
                    <span className="co-qty-num">{item.qty}</span>
                    <button className="co-qty-btn" onClick={() => increase(idx)}><i className="ri-add-line" /></button>
                  </div>
                  <div className="co-item-total">₹{(item.price * item.qty).toLocaleString("en-IN")}</div>
                  <button className="co-del-btn" onClick={() => remove(idx)}><i className="ri-delete-bin-line" /></button>
                </div>
              ))}
            </div>
            <div className="co-nav-row">
              <button className="co-next-btn" onClick={goNext}>
                Continue to Shipping <i className="ri-arrow-right-line" />
              </button>
            </div>
          </>
        )}
      </div>

      <div className="co-panel">
        <div className="co-trust-strip">
          {TRUST.map(({ icon, label }) => (
            <div className="co-trust-item" key={label}>
              <div className="co-trust-icon"><i className={icon} /></div>
              <span className="co-trust-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  /* ── STEP 1: Shipping ── */
  const renderShipping = () => {
    const Field = ({ id, label, placeholder, half, type = "text", as }) => (
      <div className={`co-field${!half ? " full" : ""}`}>
        <label className="co-label">{label}</label>
        {as === "select" ? (
          <select className={`co-select${errors[id] ? " err" : ""}`} value={ship[id]} onChange={e => setShip(s => ({ ...s, [id]: e.target.value }))}>
            <option value="">Select state</option>
            {STATES_IN.map(st => <option key={st} value={st}>{st}</option>)}
          </select>
        ) : (
          <input type={type} className={inputCls(id)} placeholder={placeholder} value={ship[id]}
            onChange={e => { setShip(s => ({ ...s, [id]: e.target.value })); if (errors[id]) setErrors(v => ({ ...v, [id]: "" })); }} />
        )}
        {errors[id] && <span className="co-err-msg"><i className="ri-error-warning-line" />{errors[id]}</span>}
      </div>
    );

    const handleContinueShipping = () => {
      if (!selectedAddress) {
        alert("Please select or add a delivery address");
        return;
      }
      setStep(2);
    };



    return (
      <div className="co-panel">
        <div className="co-panel-head">
          <div className="co-panel-icon"><i className="ri-truck-line" /></div>
          <span className="co-panel-title">Shipping Details</span>
        </div>


        {/* ========================= */}
        {/* SAVED ADDRESSES */}
        {/* ========================= */}

        <div className="co-address-section">

          <h3>Select Address</h3>

          {(currentUser?.addresses || []).map((addr) => (

            <div
              key={addr.id}
              className={`co-address-card ${selectedAddress === addr.id
                ? "selected"
                : ""
                }`}
              onClick={() => {

                setSelectedAddress(addr.id);
                localStorage.setItem(
                  "selectedAddress",
                  addr.id
                );

                setShip((prev) => ({
                  ...prev,

                  fullName: addr.fullName || "",

                  phone: addr.phone || "",

                  address: addr.addressLine || "",

                  city: addr.city || "",

                  state: addr.state || "",

                  pincode: addr.pincode || "",
                }));

              }}
            >

              <input
                type="radio"
                checked={selectedAddress === addr.id}
                readOnly
              />

              <div>
                <strong>{addr.fullName}</strong>

                <p>
                  {addr.addressLine},
                  {addr.city},
                  {addr.state} - {addr.pincode}
                </p>

                <span>{addr.phone}</span>
              </div>

            </div>

          ))}

          <button
            type="button"
            onClick={() =>
              setShowAddressForm(!showAddressForm)
            }
          >
            + Add New Address
          </button>

        </div>


        {/* ========================= */}
        {/* ADDRESS FORM */}
        {/* ========================= */}

        {showAddressForm && (
          <div className="co-address-form">

            <input
              placeholder="Full Name"
              value={addressData.fullName}
              onChange={(e) => setAddressData({ ...addressData, fullName: e.target.value })}
            />

            <input
              placeholder="Email Address"
              type="email"
              value={addressData.email}
              onChange={(e) => setAddressData({ ...addressData, email: e.target.value })}
            />

            <input
              placeholder="Phone Number"
              type="tel"
              value={addressData.phone}
              onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}
            />

            <input
              placeholder="City"
              value={addressData.city}
              onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
            />

            <select
              value={addressData.state}
              onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
              style={{ padding: "12px 14px", border: "1.5px solid var(--bdr)", borderRadius: 12, background: "var(--sf)", fontSize: 14, outline: "none" }}
            >
              <option value="">Select State</option>
              {STATES_IN.map(st => <option key={st} value={st}>{st}</option>)}
            </select>

            <input
              placeholder="PIN Code"
              type="tel"
              maxLength={6}
              value={addressData.pincode}
              onChange={(e) => setAddressData({ ...addressData, pincode: e.target.value })}
            />

            {/* Auto-detect button — spans full width */}
            <div style={{ gridColumn: "1 / -1" }}>
              <button
                type="button"
                className={`co-location-btn${locLoading ? " loading" : ""}`}
                onClick={detectLocation}
                style={{ width: "100%", justifyContent: "center" }}
              >
                <i className={locLoading ? "ri-loader-4-line co-spin" : "ri-map-pin-2-line"} />
                {locLoading ? "Detecting location…" : "Auto-detect my location"}
              </button>
            </div>

            <textarea
              placeholder="Full Address (House no, Street, Area)"
              value={addressData.addressLine}
              onChange={(e) => setAddressData({ ...addressData, addressLine: e.target.value })}
              style={{ gridColumn: "1 / -1" }}
            />

            <button type="button" onClick={saveAddress}>
              Save Address
            </button>

            <button
              type="button"
              onClick={() => setShowAddressForm(false)}
              style={{ background: "none", border: "1.5px solid var(--bdr)", color: "var(--sl)", borderRadius: 12, padding: "12px 20px", fontWeight: 600, cursor: "pointer" }}
            >
              Cancel
            </button>

          </div>
        )}
        <div className="co-nav-row">
          <button className="co-prev-btn" onClick={goPrev}><i className="ri-arrow-left-line" />Back</button>

          <button className="co-next-btn" onClick={handleContinueShipping}>Continue to Payment <i className="ri-arrow-right-line" /></button>
        </div>
      </div>
    );
  };

  /* ── STEP 2: Payment ── */
  const renderPayment = () => (
    <div className="co-panel">
      <div className="co-panel-head">
        <div className="co-panel-icon"><i className="ri-bank-card-line" /></div>
        <span className="co-panel-title">Payment Method</span>
      </div>
      <div className="co-pay-wrap">
        {PAY_METHODS.map(pm => (
          <div key={pm.id} className={`co-pay-card${payMethod === pm.id ? " sel" : ""}`} onClick={() => setPayMethod(pm.id)}>
            <div className="co-pay-radio"><div className="co-pay-radio-dot" /></div>
            <div className="co-pay-icon"><i className={pm.icon} /></div>
            <div>
              <div className="co-pay-label">{pm.label}</div>
              <div className="co-pay-sub">{pm.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* UPI input */}
      {payMethod === "upi" && (
        <div className="co-upi-field">
          <div className="co-field">
            <label className="co-label">UPI ID</label>
            <input className="co-input" placeholder="yourname@upi" value={upiId} onChange={e => setUpiId(e.target.value)} />
          </div>
        </div>
      )}

      {/* Card inputs */}
      {payMethod === "card" && (
        <div className="co-card-fields">
          <div className="co-field">
            <label className="co-label">Card Number</label>
            <input className="co-input" placeholder="1234 5678 9012 3456" maxLength={19}
              value={cardInfo.number}
              onChange={e => setCardInfo(c => ({ ...c, number: e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim() }))} />
          </div>
          <div className="co-field">
            <label className="co-label">Name on Card</label>
            <input className="co-input" placeholder="ARJUN SHARMA" value={cardInfo.name} onChange={e => setCardInfo(c => ({ ...c, name: e.target.value }))} />
          </div>
          <div className="co-card-row">
            <div className="co-field">
              <label className="co-label">Expiry</label>
              <input className="co-input" placeholder="MM / YY" maxLength={7} value={cardInfo.expiry}
                onChange={e => setCardInfo(c => ({ ...c, expiry: e.target.value.replace(/[^\d/]/g, "") }))} />
            </div>
            <div className="co-field">
              <label className="co-label">CVV</label>
              <input className="co-input" placeholder="•••" maxLength={4} type="password" value={cardInfo.cvv} onChange={e => setCardInfo(c => ({ ...c, cvv: e.target.value.replace(/\D/g, "") }))} />
            </div>
          </div>
        </div>
      )}

      <div className="co-nav-row">
        <button className="co-prev-btn" onClick={goPrev}><i className="ri-arrow-left-line" />Back</button>
        <button className="co-next-btn" onClick={goNext} disabled={processing}>
          {processing ? <><i className="ri-loader-4-line co-spin" />Processing…</> : <><i className="ri-shield-check-line" />Pay Securely</>}
        </button>
      </div>
    </div>
  );

  /* ── STEP 3: Success ── */
  if (step === 3) {
    return (
      <>
        <CSS />
        <div className="co-page">
          <div className="co-orb co-orb-1" /><div className="co-orb co-orb-2" />
          <div className="co-inner">
            <div className="co-panel" style={{ maxWidth: 560, margin: "60px auto" }}>
              <div className="co-success">
                <div className="co-success-icon"><i className="ri-checkbox-circle-fill" /></div>
                <div className="co-success-title">Order Confirmed!</div>
                <div className="co-success-sub">Thank you! You'll receive a confirmation email at <strong>{ship.email || "your email"}</strong> with tracking details.</div>
                <div className="co-success-order">
                  <div className="co-success-order-id">{orderId}</div>
                  <div className="co-success-order-sub">Order ID · Keep this for reference</div>
                </div>
                <div className="co-success-del"><i className="ri-truck-line" />Estimated delivery in <strong>3–5 business days</strong></div>
                <div className="co-success-btns">
                  <button className="co-success-btn primary" onClick={() => navigate("/")}><i className="ri-home-line" />Back to Home</button>
                  <button className="co-success-btn ghost" onClick={() => navigate("/featured-products")}><i className="ri-store-line" />Shop More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ── Main render ── */
  return (
    <>
      <CSS />
      <div className="co-page">
        <div className="co-orb co-orb-1" /><div className="co-orb co-orb-2" />
        <div className="co-inner">

          <div className="co-hdr">
            <h1 className="co-title">Your <span>{["Cart", "Shipping", "Payment"][step]}</span></h1>
            <button className="co-back" onClick={() => navigate("/")}><i className="ri-arrow-left-line" />Back to Home</button>
          </div>

          {/* Progress */}
          <div className="co-progress">
            {STEPS.map((s, i) => {
              const isDone = i < step;
              const isActive = i === step;
              return (
                <React.Fragment key={s.label}>
                  <div className={`co-step${isActive ? " active" : isDone ? " done" : ""}`}>
                    <div className="co-step-dot">
                      {isDone ? <i className="ri-check-line" /> : isActive ? <i className={s.icon} /> : i + 1}
                    </div>
                    <span>{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className={`co-step-line${isDone ? " done" : ""}`} />}
                </React.Fragment>
              );
            })}
          </div>

          <div className="co-grid">
            <div className="co-left">
              {step === 0 && renderCart()}
              {step === 1 && renderShipping()}
              {step === 2 && renderPayment()}
            </div>

            {/* Sticky summary */}
            <div className="co-right">
              <div className="co-sum-panel">
                <div className="co-sum-head"><i className="ri-receipt-line" />Order Summary</div>
                <div className="co-sum-body">
                  {cart.length === 0 && step === 0 ? (
                    <p style={{ fontSize: 13.5, color: "var(--mu)", textAlign: "center", padding: "12px 0" }}>Add items to see your summary.</p>
                  ) : (
                    <>
                      {/* Shipping info on payment step */}
                      {step === 2 && ship.fullName && (
                        <div className="co-ship-summary">
                          <div className="co-ship-row"><i className="ri-user-line co-ship-icon" /><span className="co-ship-val">{ship.fullName}</span></div>
                          <div className="co-ship-row"><i className="ri-map-pin-line co-ship-icon" /><span className="co-ship-val">{ship.address}, {ship.city}, {ship.state} – {ship.pincode}</span></div>
                          <div className="co-ship-row"><i className="ri-phone-line co-ship-icon" /><span className="co-ship-val">{ship.phone}</span></div>
                        </div>
                      )}
                      <div className="co-price-row">
                        <span className="co-price-label">Subtotal ({cart.reduce((s, x) => s + x.qty, 0)} items)</span>
                        <span className="co-price-val">₹{subtotal.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="co-price-row">
                        <span className="co-price-label">Delivery</span>
                        <span className={`co-price-val${deliveryFee === 0 ? " free" : ""}`}>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
                      </div>
                      {deliveryFee === 0 && <div style={{ fontSize: 11.5, color: "var(--gr)", marginBottom: 6 }}><i className="ri-checkbox-circle-line" style={{ marginRight: 4 }} />Free delivery on orders above ₹1,000</div>}
                      {savings > 0 && (
                        <div className="co-savings-row">
                          <span><i className="ri-price-tag-3-line" />You saved</span>
                          <span>₹{savings.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      <div className="co-coupon-wrap">

                        <div className="co-coupon-input">

                          <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={coupon}
                            onChange={(e) =>
                              setCoupon(e.target.value)
                            }
                          />

                          <button
                            type="button"
                            onClick={applyCoupon}
                          >
                            Apply
                          </button>

                        </div>

                        {couponMessage && (

                          <div
                            className={`co-coupon-msg ${appliedCoupon
                              ? "success"
                              : "error"
                              }`}
                          >
                            {couponMessage}
                          </div>

                        )}

                      </div>


                      {/* DISCOUNT ROW */}

                      {discount > 0 && (

                        <div className="co-price-row">

                          <span className="co-price-label">
                            Discount
                          </span>

                          <span
                            style={{
                              color: "#16a34a",
                              fontWeight: "700",
                            }}
                          >
                            -₹{discount.toFixed(0)}
                          </span>

                        </div>

                      )}
                      <div className="co-sum-div" />
                      <div className="co-total-row">
                        <span className="co-total-label">Total</span>
                        <span className="co-total-val">₹{total.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="co-total-tax">Inclusive of all taxes</div>
                      <div className="co-del-est"><i className="ri-truck-line" /><span>Estimated delivery in <strong>3–5 business days</strong></span></div>
                      {step === 2 && (
                        <>

                          <div className="co-pay-strip">
                            <span className="co-pay-strip-label">Secure payments via</span>
                            {["Visa", "Mastercard", "UPI", "Razorpay"].map(m => <span key={m} className="co-pay-pill">{m}</span>)}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}