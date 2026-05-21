import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        

        .ct-root {
          --brand:     #06B6D4;
          --brand-dk:  #0e7490;
          --ink:       #0f172a;
          --ink-mid:   #475569;
          --ink-soft:  #94a3b8;
          --border:    rgba(226,232,240,0.85);
          --ff-d:      'Manrope', sans-serif;
          --ff-b:      'Inter', sans-serif;
          font-family: var(--ff-b);
          background: linear-gradient(180deg,#f0f7f9 0%,#f8fafc 60%,#eef6f9 100%);
          min-height: 100vh;
          color: var(--ink);
          position: relative;
        }
        .ct-root::before {
          content: '';
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(6,182,212,0.028) 1px,transparent 1px),
            linear-gradient(90deg,rgba(6,182,212,0.028) 1px,transparent 1px);
          background-size: 54px 54px;
          pointer-events: none; z-index: 0;
        }

        /* ── HERO ────────────────────────────────────── */
        .ct-hero {
          position: relative;
          padding: 130px 20px 80px;
          text-align: center;
          background: linear-gradient(145deg,#020c1b 0%,#051b2c 60%,#07293a 100%);
          overflow: hidden;
        }
        .ct-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(6,182,212,0.07) 1px,transparent 1px),
            linear-gradient(90deg,rgba(6,182,212,0.07) 1px,transparent 1px);
          background-size: 56px 56px; pointer-events: none;
        }
        .ct-hero-orb {
          position: absolute; border-radius: 50%;
          filter: blur(90px); pointer-events: none;
        }
        .ct-orb1 { width:380px;height:380px;top:-120px;left:-80px;background:rgba(6,182,212,0.18); }
        .ct-orb2 { width:280px;height:280px;bottom:-80px;right:-60px;background:rgba(37,99,235,0.15); }

        .ct-hero-content { position:relative;z-index:2; }
        .ct-hero-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(6,182,212,0.14); border: 1px solid rgba(6,182,212,0.3);
          border-radius: 100px; font-size: 11px; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--brand); padding: 5px 16px; margin-bottom: 20px;
          backdrop-filter: blur(8px);
        }
        .ct-hero-badge-dot {
          width:6px;height:6px;border-radius:50%;
          background:var(--brand);box-shadow:0 0 6px var(--brand);
          animation:ctPulse 1.6s ease infinite;
        }
        @keyframes ctPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.65)}}
        .ct-hero h1 {
          font-family: var(--ff-d);
          font-size: clamp(2.2rem,5vw,4rem);
          font-weight: 800; letter-spacing: -.02em; line-height: 1.06;
          color: #fff; margin-bottom: 16px;
        }
        .ct-hero h1 span { color: var(--brand); }
        .ct-hero p {
          font-size: clamp(.9rem,1.5vw,1.05rem);
          color: rgba(255,255,255,.6); line-height: 1.72;
          max-width: 540px; margin: 0 auto;
        }

        /* ── INNER WRAP ──────────────────────────────── */
        .ct-wrap {
          max-width: 1300px; margin: 0 auto;
          padding: 0 40px 100px; position: relative; z-index: 1;
        }

        /* ── QUICK-INFO CARDS ─────────────────────────── */
        .ct-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
          margin-top: -36px;
          margin-bottom: 64px;
        }
        .ct-info-card {
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 26px 20px;
          text-align: center;
          text-decoration: none; color: inherit;
          box-shadow: 0 6px 24px rgba(15,23,42,0.07);
          transition: transform .28s cubic-bezier(.4,0,.2,1), box-shadow .28s, border-color .22s;
          display: flex; flex-direction: column; align-items: center; gap: 14px;
        }
        .ct-info-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 48px rgba(6,182,212,0.14);
          border-color: rgba(6,182,212,0.4);
        }
        .ct-info-icon {
          width: 58px; height: 58px; border-radius: 18px;
          background: linear-gradient(135deg,rgba(6,182,212,0.14),rgba(37,99,235,0.10));
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; color: var(--brand);
          transition: transform .28s cubic-bezier(.4,0,.2,1);
          box-shadow: 0 4px 16px rgba(6,182,212,0.2);
        }
        .ct-info-card:hover .ct-info-icon { transform: scale(1.12) rotate(-6deg); }
        .ct-info-title {
          font-family: var(--ff-d); font-size: clamp(15px, 2vw, 18px);
          font-weight: 800; letter-spacing: -.01em; margin-bottom: 4px;
        }
        .ct-info-val { font-size: 13.5px; color: var(--ink-mid); line-height: 1.5; }

        /* ── SPLIT CONTACT CARD ──────────────────────── */
        .ct-card {
          display: grid;
          grid-template-columns: minmax(280px, 340px) 1fr;
          border-radius: 28px;
          overflow: hidden;
          box-shadow:
            0 24px 64px rgba(15,23,42,0.12),
            0 8px 24px rgba(15,23,42,0.06);
          border: 1px solid var(--border);
          margin-bottom: 64px;
        }

        /* Left panel */
        .ct-left {
          background: linear-gradient(160deg,#051b2c 0%,#07293a 60%,#062030 100%);
          padding: 44px 36px;
          display: flex; flex-direction: column; gap: 0;
          position: relative; overflow: hidden;
        }
        .ct-left-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(6,182,212,0.07) 1px,transparent 1px),
            linear-gradient(90deg,rgba(6,182,212,0.07) 1px,transparent 1px);
          background-size: 48px 48px; pointer-events: none;
        }
        .ct-left-orb {
          position: absolute; border-radius: 50%;
          filter: blur(70px); pointer-events: none;
        }
        .ct-left-orb1 { width:260px;height:260px;top:-80px;right:-80px;background:rgba(6,182,212,0.18); }
        .ct-left-orb2 { width:180px;height:180px;bottom:-60px;left:-50px;background:rgba(37,99,235,0.14); }
        .ct-left-content { position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column; }

        .ct-left-heading {
          font-family: var(--ff-d);
          font-size: clamp(1.7rem,2.5vw,2.3rem);
          font-weight: 800; letter-spacing: -.02em; line-height: 1.1;
          color: #fff; margin-bottom: 12px;
        }
        .ct-left-heading span { color: var(--brand); }
        .ct-left-sub { font-size: 13.5px; color: rgba(255,255,255,.55); line-height: 1.7; margin-bottom: 36px; }

        /* Contact rows */
        .ct-contact-rows { display: flex; flex-direction: column; gap: 16px; flex: 1; }
        .ct-contact-row {
          display: flex; align-items: flex-start; gap: 14px;
        }
        .ct-contact-ico {
          width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
          background: rgba(6,182,212,0.14); border: 1px solid rgba(6,182,212,0.25);
          display: flex; align-items: center; justify-content: center;
          color: var(--brand); font-size: 18px;
          transition: background .22s, transform .22s;
        }
        .ct-contact-row:hover .ct-contact-ico { background: rgba(6,182,212,0.28); transform: scale(1.08); }
        .ct-contact-lbl {
          font-size: 10px; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: var(--brand); margin-bottom: 3px;
        }
        .ct-contact-val { font-size: 14px; font-weight: 500; color: rgba(255,255,255,.82); line-height: 1.5; }

        /* Bottom stat strip */
        .ct-left-stats {
          display: flex; gap: 24px;
          border-top: 1px solid rgba(255,255,255,0.09);
          padding-top: 28px; margin-top: 36px;
        }
        .ct-ls-val {
          font-family: var(--ff-d); font-size: 24px;
          font-weight: 800; color: var(--brand); line-height: 1; margin-bottom: 3px;
        }
        .ct-ls-label { font-size: 10.5px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; color: rgba(255,255,255,.4); }

        /* Right panel */
        .ct-right {
          background: #fff;
          padding: 44px 40px;
          display: flex; flex-direction: column;
        }
        .ct-form-heading {
          font-family: var(--ff-d);  font-size: clamp(1.5rem, 4vw, 26px);
          font-weight: 800; letter-spacing: -.02em; margin-bottom: 6px;
        }
        .ct-form-sub { font-size: 14px; color: var(--ink-soft); margin-bottom: 32px; }

        /* Form grid */
        .ct-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ct-field { display: flex; flex-direction: column; gap: 6px; }
        .ct-field.full { grid-column: 1 / -1; }
        .ct-label { font-size: 12.5px; font-weight: 700; color: var(--ink-mid); letter-spacing: .04em; text-transform: uppercase; }
        .ct-input, .ct-textarea {
          width: 100%; padding: 12px 16px;
          border: 1.5px solid var(--border); border-radius: 12px;
          background: #f8fafc; font-family: var(--ff-b); font-size: 16px;
          color: var(--ink); outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .ct-input::placeholder, .ct-textarea::placeholder { color: var(--ink-soft); }
        .ct-input:focus, .ct-textarea:focus {
          border-color: var(--brand); background: #fff;
          box-shadow: 0 0 0 4px rgba(6,182,212,0.1);
        }
        .ct-textarea { resize: vertical; min-height: 130px; line-height: 1.6; }

        .ct-submit {
          margin-top: 20px;
          display: flex; align-items: center; justify-content: center; gap: 9px;
          padding: 14px 32px; width: 100%;
          background: linear-gradient(135deg,var(--brand),#2563EB);
          color: #fff; border: none; border-radius: 13px;
          font-family: var(--ff-b); font-size: 15px; font-weight: 700;
          cursor: pointer; letter-spacing: .03em;
          box-shadow: 0 6px 22px rgba(6,182,212,0.32);
          transition: transform .25s cubic-bezier(.4,0,.2,1), box-shadow .25s;
        }
        .ct-submit:hover { transform: translateY(-3px); box-shadow: 0 14px 34px rgba(6,182,212,0.5); }
        .ct-submit.sent { background: linear-gradient(135deg,#10b981,#059669); box-shadow: 0 6px 22px rgba(16,185,129,0.35); }

        /* ── MAP ─────────────────────────────────────── */
        .ct-map-wrap {
          border-radius: 24px; overflow: hidden;
          box-shadow: 0 12px 40px rgba(15,23,42,0.1);
          border: 1px solid var(--border);
        }
        .ct-map-wrap iframe { width:100%; height:440px; border:none; display:block; }

        /* ── Responsive ─────────────────────────────── */
       /* ───────── Responsive ───────── */

@media (max-width: 1024px) {

  .ct-card {
    grid-template-columns: 1fr;
  }

  .ct-left,
  .ct-right {
    padding: 32px;
  }

  .ct-left-stats {
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {

  .ct-info-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }

  .ct-form-grid {
    grid-template-columns: 1fr;
  }

  .ct-hero {
    padding: 100px 20px 60px;
  }

  .ct-hero-orb,
  .ct-left-orb {
    filter: blur(50px);
    opacity: .7;
  }
}

@media (max-width: 480px) {
  .ct-left-stats {
    gap: 18px;
    justify-content: space-between;
  }

  .ct-ls-val {
    font-size: 20px;
  }
}

@media (max-width: 640px) {

{
  .ct-hero {
    padding: 90px 16px 56px;
  }

  .ct-hero h1 {
    line-height: 1.15;
  }

  .ct-hero p {
    font-size: 0.95rem;
  }

  .ct-wrap {
  padding-inline: clamp(16px, 4vw, 40px);
  padding-bottom: clamp(60px, 8vw, 100px);
}

  .ct-right,
  .ct-left {
    padding: 24px 20px;
  }

  .ct-card {
    border-radius: 20px;
  }

  .ct-map-wrap iframe {
    height: 280px;
  }

  .ct-left-stats {
    justify-content: space-between;
    gap: 16px;
  }

  .ct-submit {
    padding: 14px 20px;
  }
}
      `}</style>

      <div className="ct-root">

        {/* ── HERO ── */}
        <div className="ct-hero">
          <div className="ct-hero-grid" />
          <div className="ct-hero-orb ct-orb1" />
          <div className="ct-hero-orb ct-orb2" />
          <div className="ct-hero-content">
            <div className="ct-hero-badge">
              <div className="ct-hero-badge-dot" />
              Contact Tecniqa
            </div>
            <h1>Get In Touch<br /><span>With Our Team</span></h1>
            <p>Need help with HVAC tools, cooling systems, product inquiries or bulk orders? Our certified team is available around the clock.</p>
          </div>
        </div>

        <div className="ct-wrap">

          {/* ── QUICK-INFO CARDS ── */}
          <div className="ct-info-grid">
            {[
              { icon: "ri-mail-line",              title: "Email Us",      val: "support@tecniqa.com",        href: "mailto:support@tecniqa.com" },
              { icon: "ri-phone-line",             title: "Call Us",       val: "+91 9668 246 683",           href: "tel:+919668246683" },
              { icon: "ri-map-pin-2-line",         title: "Visit Us",      val: "DLF Cyber City, Bhubaneswar", href: "https://www.google.com/maps?q=DLF+Cyber+City+Bhubaneswar" },
              { icon: "ri-customer-service-2-line",title: "24/7 Support",  val: "Always here for you",        href: "mailto:support@tecniqa.com" },
            ].map((c) => (
              <a key={c.title} href={c.href} target={c.href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="ct-info-card">
                <div className="ct-info-icon"><i className={c.icon} /></div>
                <div>
                  <div className="ct-info-title">{c.title}</div>
                  <div className="ct-info-val">{c.val}</div>
                </div>
              </a>
            ))}
          </div>

          {/* ── SPLIT CARD ── */}
          <div className="ct-card">

            {/* Left */}
            <div className="ct-left">
              <div className="ct-left-grid" />
              <div className="ct-left-orb ct-left-orb1" />
              <div className="ct-left-orb ct-left-orb2" />
              <div className="ct-left-content">
                <h2 className="ct-left-heading">Contact<br /><span>Information</span></h2>
                <p className="ct-left-sub">Fill in the form or reach us through any of the channels below.</p>

                <div className="ct-contact-rows">
                  {[
                    { icon: "ri-phone-line",       label: "Phone",   val: "+91 9668 246 683" },
                    { icon: "ri-mail-line",        label: "Email",   val: "support@tecniqa.com" },
                    { icon: "ri-map-pin-2-line",   label: "Address", val: "DLF Cyber City,\nBhubaneswar, Odisha" },
                    { icon: "ri-time-line",        label: "Hours",   val: "Mon–Sat: 9am – 7pm\n24/7 Email Support" },
                  ].map((r) => (
                    <div className="ct-contact-row" key={r.label}>
                      <div className="ct-contact-ico"><i className={r.icon} /></div>
                      <div>
                        <div className="ct-contact-lbl">{r.label}</div>
                        <div className="ct-contact-val" style={{ whiteSpace: "pre-line" }}>{r.val}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ct-left-stats">
                  {[{ val: "10k+", label: "Clients" }, { val: "24/7", label: "Support" }, { val: "15+", label: "Brands" }].map((s) => (
                    <div key={s.label}>
                      <div className="ct-ls-val">{s.val}</div>
                      <div className="ct-ls-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="ct-right">
              <h3 className="ct-form-heading">Send Us a Message</h3>
              <p className="ct-form-sub">We typically respond within 30 minutes during business hours.</p>

              <form onSubmit={submit}>
                <div className="ct-form-grid">
                  <div className="ct-field">
                    <label className="ct-label">Full Name</label>
                    <input className="ct-input" name="name" placeholder="e.g. Arjun Sharma" value={form.name} onChange={handle} required />
                  </div>
                  <div className="ct-field">
                    <label className="ct-label">Email Address</label>
                    <input className="ct-input" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handle} required />
                  </div>
                  <div className="ct-field">
                    <label className="ct-label">Phone Number</label>
                    <input className="ct-input" name="phone" placeholder="(+91)-XXXXXXXXXX" value={form.phone} onChange={handle} />
                  </div>
                  <div className="ct-field">
                    <label className="ct-label">Subject</label>
                    <input className="ct-input" name="subject" placeholder="Product Inquiry" value={form.subject} onChange={handle} />
                  </div>
                  <div className="ct-field full">
                    <label className="ct-label">Your Message</label>
                    <textarea className="ct-textarea" name="message" placeholder="Tell us how we can help you…" value={form.message} onChange={handle} required />
                  </div>
                </div>
                <button type="submit" className={`ct-submit${sent ? " sent" : ""}`}>
                  <i className={sent ? "ri-checkbox-circle-line" : "ri-send-plane-line"} />
                  {sent ? "Message Sent!" : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* ── MAP ── */}
          <div className="ct-map-wrap">
            <iframe
              src="https://www.google.com/maps?q=DLF+Cyber+City+Bhubaneswar&output=embed"
              loading="lazy" allowFullScreen title="Tecniqa Location"
            />
          </div>

        </div>
      </div>
    </>
  );
}