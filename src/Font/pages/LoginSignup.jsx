import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../assets/logo.png";

import {
  loginUser,
  registerUser,
} from "../../utils/auth";

const LoginSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [emailFocused, setEmailFocused] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {

    await new Promise((r) =>
      setTimeout(r, 800)
    );

    if (isSignup) {

      const result = registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (!result.success) {
        alert(result.message);
        return;
      }

      alert("Account created successfully!");

      setIsSignup(false);

      return;
    }

    const result = loginUser(
      data.email,
      data.password
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("Login successful!");

    const redirectTo =
      localStorage.getItem("postLoginRedirect") ||
      location.state?.from ||
      "/";

    localStorage.removeItem("postLoginRedirect");

    navigate(redirectTo);
  };

  const TRUST = [
    { icon: "ri-shield-check-line", text: "Certified HVAC Products" },
    { icon: "ri-truck-line", text: "Nationwide Fast Delivery" },
    { icon: "ri-lock-2-line", text: "Secure & Encrypted Orders" },
    { icon: "ri-customer-service-2-line", text: "Expert Technical Support" },
  ];

  const SOCIALS = [
    { icon: "ri-google-fill", label: "Continue with Google", color: "#ea4335" },
    { icon: "ri-linkedin-fill", label: "Continue with LinkedIn", color: "#0077b5" },
  ];

  const [isSignup, setIsSignup] = useState(false);
  const [passwordFocused, setPasswordFocused] =
    useState(false);

  const [nameFocused, setNameFocused] =
    useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ls-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          --brand: #06B6D4;
          --brand-dark: #0e7490;
          --ink: #0f172a;
          --ink-mid: #475569;
          --ink-soft: #94a3b8;
          --border: #e2e8f0;
          --radius: 16px;
        }

        /* ══ LEFT PANEL ═══════════════════════════════════════ */
        .ls-left {
          width: 48%;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          background: linear-gradient(145deg, #020c1b 0%, #051b2c 60%, #062030 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px 52px;
        }

        /* Grid overlay */
        .ls-left-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(6,182,212,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.07) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        /* Depth blobs */
        .ls-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }
        .ls-orb-1 { width: 420px; height: 420px; top: -140px; right: -100px; background: rgba(6,182,212,0.18); }
        .ls-orb-2 { width: 280px; height: 280px; bottom: -60px; left: -80px; background: rgba(37,99,235,0.14); }
        .ls-orb-3 { width: 180px; height: 180px; top: 40%; right: 14%; background: rgba(139,92,246,0.1); }

        /* Left content */
        .ls-left-top { position: relative; z-index: 1; }
        .ls-left-logo {
          height: 36px;
          object-fit: contain;
          filter: brightness(10) drop-shadow(0 0 16px rgba(6,182,212,0.35));
          margin-bottom: 56px;
          display: block;
        }
        .ls-left-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--brand);
          margin-bottom: 16px;
        }
        .ls-left-eyebrow-line { width: 24px; height: 2px; background: var(--brand); border-radius: 2px; }
        .ls-left-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(2.4rem, 3.5vw, 3.2rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.05;
          letter-spacing: -.02em;
          margin-bottom: 16px;
        }
        .ls-left-heading span { color: var(--brand); }
        .ls-left-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          max-width: 340px;
          margin-bottom: 44px;
        }

        /* Trust list */
        .ls-trust { display: flex; flex-direction: column; gap: 14px; }
        .ls-trust-item {
          display: flex;
          align-items: center;
          gap: 13px;
          color: rgba(255,255,255,0.82);
          font-size: 14px;
          font-weight: 500;
        }
        .ls-trust-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(6,182,212,0.12);
          border: 1px solid rgba(6,182,212,0.25);
          display: flex; align-items: center; justify-content: center;
          color: var(--brand);
          font-size: 17px;
          flex-shrink: 0;
        }

        /* Bottom stat strip */
        .ls-left-bottom {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 32px;
          padding-top: 36px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .ls-stat-val {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: var(--brand);
          line-height: 1;
        }
        .ls-stat-label {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          letter-spacing: .06em;
          text-transform: uppercase;
          margin-top: 3px;
        }

        /* ══ RIGHT PANEL ══════════════════════════════════════ */
        .ls-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px 12px;
          background:
            radial-gradient(circle at 80% 10%, rgba(6,182,212,0.09), transparent 35%),
            linear-gradient(180deg, #f8fafc 0%, #eef6f9 100%);
          position: relative;
          overflow: hidden;
        }
        .ls-right-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(6,182,212,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        .ls-right-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          background: rgba(6,182,212,0.1);
          width: 300px; height: 300px;
          bottom: -80px; left: -60px;
        }

        /* Card */
        .ls-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 500px;
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(226,232,240,0.7);
          border-radius: 28px;
          padding: 44px 40px 36px;
          box-shadow:
            0 24px 64px rgba(15,23,42,0.12),
            0 8px 24px rgba(15,23,42,0.06),
            inset 0 1px 0 rgba(255,255,255,0.9);
          animation: lsCardIn .5s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes lsCardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Back btn */
        .ls-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--ink-mid);
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 28px;
          padding: 0;
          transition: color .2s;
        }
        .ls-back:hover { color: var(--brand); }
        .ls-back i { font-size: 16px; }

        /* Logo in card */
        .ls-card-logo {
          display: block;
          height: 34px;
          object-fit: contain;
          margin: 0 auto 24px;
          filter: drop-shadow(0 8px 20px rgba(6,182,212,0.18));
          animation: lsLogoFloat 4s ease-in-out infinite;
        }
        @keyframes lsLogoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        /* Heading */
        .ls-card-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: var(--ink);
          text-align: center;
          letter-spacing: -.03em;
          line-height: 1.1;
          margin-bottom: 6px;
        }
        .ls-card-sub {
          font-size: 14px;
          color: var(--ink-soft);
          text-align: center;
          line-height: 1.6;
          margin-bottom: 28px;
        }

        /* Social buttons */
        .ls-socials { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
        .ls-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: 1.5px solid var(--border);
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
          cursor: pointer;
          transition: border-color .2s, box-shadow .2s, transform .2s cubic-bezier(.4,0,.2,1);
        }
        .ls-social-btn:hover {
          border-color: var(--brand);
          box-shadow: 0 4px 16px rgba(6,182,212,0.12);
          transform: translateY(-2px);
        }
        .ls-social-btn i { font-size: 18px; }

        /* Divider */
        .ls-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          color: var(--ink-soft);
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: .05em;
        }
        .ls-divider-line { flex: 1; height: 1px; background: var(--border); }

        /* Label */
        .ls-label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 7px;
          display: block;
        }

        /* Input wrapper */
        .ls-input-wrap {
          position: relative;
          margin-bottom: 20px;
        }
        .ls-input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
          color: var(--ink-soft);
          transition: color .2s, transform .2s;
          pointer-events: none;
        }
        .ls-input-wrap.focused .ls-input-icon {
          color: var(--brand);
          transform: translateY(-50%) scale(1.1);
        }
        .ls-input {
          width: 100%;
          height: 52px;
          padding: 0 16px 0 44px;
          border-radius: 12px;
          border: 1.5px solid var(--border);
          background: #f8fafc;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--ink);
          outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .ls-input:focus {
          border-color: var(--brand);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(6,182,212,0.1);
        }
        .ls-input.error { border-color: #ef4444; }
        .ls-input.error:focus { box-shadow: 0 0 0 4px rgba(239,68,68,0.1); }
        .ls-error-msg {
          font-size: 12px;
          color: #ef4444;
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Submit button */
        .ls-submit {
          width: 100%;
          padding: 14px;
          border-radius: 13px;
          border: none;
          background: linear-gradient(135deg, var(--brand) 0%, #2563EB 100%);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: .03em;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(6,182,212,0.3);
          transition: transform .25s cubic-bezier(.4,0,.2,1), box-shadow .25s;
          position: relative;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .ls-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity .2s;
        }
        .ls-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(6,182,212,0.45);
        }
        .ls-submit:hover::after { opacity: 1; }
        .ls-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Terms */
        .ls-terms {
          font-size: 12px;
          color: var(--ink-soft);
          text-align: center;
          line-height: 1.8;
          margin-top: 18px;
        }
        .ls-terms a {
          color: var(--brand);
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: color .18s;
        }
        .ls-terms a:hover { color: var(--brand-dark); text-decoration: underline; }

        /* ══ Responsive ══════════════════════════════════════ */
        @media (max-width: 900px) {
          .ls-left { display: none; }
          .ls-right { padding: 32px 20px; background: linear-gradient(180deg, #f0f7f9 0%, #e6f4f7 100%); }
          .ls-card { padding: 36px 24px 28px; }
        }
      `}</style>

      <div className="ls-root">

        {/* ══ LEFT PANEL ══ */}
        <div className="ls-left">
          <div className="ls-left-grid" />
          <div className="ls-orb ls-orb-1" />
          <div className="ls-orb ls-orb-2" />
          <div className="ls-orb ls-orb-3" />

          <div className="ls-left-top">
            {/* <img src={Logo} alt="Logo" className="ls-left-logo" /> */}

            <div className="ls-left-eyebrow">
              <div className="ls-left-eyebrow-line" />
              Industrial HVAC Solutions
            </div>

            <h1 className="ls-left-heading">
              Trusted by<br />
              <span>10,000+</span><br />
              Professionals
            </h1>

            <p className="ls-left-sub">
              Access India's most comprehensive catalogue of HVAC tools, refrigerant chemicals, and energy solutions.
            </p>

            <div className="ls-trust">
              {TRUST.map((t) => (
                <div className="ls-trust-item" key={t.text}>
                  <div className="ls-trust-icon"><i className={t.icon} /></div>
                  {t.text}
                </div>
              ))}
            </div>
          </div>

          <div className="ls-left-bottom">
            {[
              { val: "500+", label: "Products" },
              { val: "15+", label: "Years" },
              { val: "24/7", label: "Support" },
            ].map((s) => (
              <div key={s.label}>
                <div className="ls-stat-val">{s.val}</div>
                <div className="ls-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div className="ls-right">
          <div className="ls-right-grid" />
          <div className="ls-right-blob" />

          <div className="ls-card">
            {/* Back */}
            <button className="ls-back" onClick={() => navigate("/")}>
              <i className="ri-arrow-left-line" />
              Back to Home
            </button>

            {/* Logo */}
            <img src={Logo} alt="Logo" className="ls-card-logo" />

            {/* Heading */}
            <h2 className="ls-card-heading">
              {isSignup
                ? "Create Account"
                : "Welcome Back"}
            </h2>
            <p className="ls-card-sub">
              {isSignup
                ? "Create your Tecniqa account"
                : "Sign in to your Tecniqa account to continue"}
            </p>

            {/* Social logins */}
            <div className="ls-socials">
              {SOCIALS.map((s) => (
                <button className="ls-social-btn" key={s.label} type="button">
                  <i className={s.icon} style={{ color: s.color }} />
                  {s.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="ls-divider">
              <div className="ls-divider-line" />
              or continue with email
              <div className="ls-divider-line" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

              {isSignup && (
                <>
                  <label className="ls-label">
                    Full Name
                  </label>

                  <div className={`ls-input-wrap${nameFocused ? " focused" : ""}`}>
                    <i className="ri-user-3-line ls-input-icon" />

                    <input
                      type="text"
                      className={`ls-input${errors.name ? " error" : ""}`}
                      placeholder="Enter your full name"
                      onFocus={() => setNameFocused(true)}
                      onBlur={() => setNameFocused(false)}
                      {...register("name", {
                        required: isSignup
                          ? "Name is required"
                          : false,
                      })}
                    />
                  </div>

                  {errors.name && (
                    <div className="ls-error-msg">
                      <i className="ri-error-warning-line" />
                      {errors.name.message}
                    </div>
                  )}
                </>
              )}
              {/* EMAIL FIELD */}
              <label className="ls-label" htmlFor="email">Email Address</label>

              <div className={`ls-input-wrap${emailFocused ? " focused" : ""}`}>
                <i className="ri-mail-line ls-input-icon" />
                <input
                  id="email"
                  type="email"
                  className={`ls-input${errors.email ? " error" : ""}`}
                  placeholder="Enter your email"
                  autoComplete="off"
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <div className="ls-error-msg">
                  <i className="ri-error-warning-line" />
                  {errors.email.message}
                </div>
              )}

              <label className="ls-label">
                Password
              </label>

              <div className={`ls-input-wrap${passwordFocused ? " focused" : ""}`}>
                <i className="ri-lock-line ls-input-icon" />

                <input
                  type="password"
                  className={`ls-input${errors.password ? " error" : ""}`}
                  placeholder="Enter your password"
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message:
                        "Password must be at least 6 characters",
                    },
                  })}
                />
              </div>

              {errors.password && (
                <div className="ls-error-msg">
                  <i className="ri-error-warning-line" />
                  {errors.password.message}
                </div>
              )}

              <button
                type="submit"
                className="ls-submit"
                disabled={isSubmitting}
                style={{ marginTop: 20 }}
              >
                {isSubmitting
                  ? "Please wait…"
                  : isSignup
                    ? "Create Account →"
                    : "Login to Tecniqa →"}
              </button>
            </form>

            <div
              style={{
                textAlign: "center",
                marginTop: 16,
                fontSize: 14,
                color: "#64748b",
              }}
            >
              {isSignup
                ? "Already have an account?"
                : "Don't have an account?"}

              <button
                type="button"
                onClick={() =>
                  setIsSignup(!isSignup)
                }
                style={{
                  border: "none",
                  background: "none",
                  color: "#06b6d4",
                  fontWeight: 700,
                  cursor: "pointer",
                  marginLeft: 6,
                }}
              >
                {isSignup
                  ? "Login"
                  : "Create Account"}
              </button>
            </div>

            {/* Terms */}
            <p className="ls-terms">
              By continuing, you agree to Tecniqa's{" "}
              <a onClick={() => navigate("/terms")}>Terms of Service</a>
              {" "}and{" "}
              <a onClick={() => navigate("/privacy-policy")}>Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;