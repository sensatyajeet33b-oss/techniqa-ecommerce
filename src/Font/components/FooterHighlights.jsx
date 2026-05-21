import React from "react";

const items = [
  {
    icon: "ri-truck-line",
    title: "Nationwide Delivery",
    sub: "Orders above ₹1,000",
    desc: "Fast & reliable shipping to all major cities across India.",
    color: "#06B6D4",
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.14), rgba(37,99,235,0.10))",
    glow: "rgba(6,182,212,0.18)",
  },
  {
    icon: "ri-arrow-go-back-line",
    title: "Satisfied or Refunded",
    sub: "Hassle-free returns",
    desc: "Easy 7-day return policy if you're not completely satisfied.",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.14), rgba(217,70,239,0.08))",
    glow: "rgba(139,92,246,0.15)",
  },
  {
    icon: "ri-customer-service-2-line",
    title: "HVAC Expert Support",
    sub: "Response within 30 mins",
    desc: "Dedicated technical support from certified HVAC professionals.",
    color: "#10B981",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.14), rgba(6,182,212,0.08))",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    icon: "ri-shield-check-line",
    title: "Secure Payments",
    sub: "256-bit SSL Encrypted",
    desc: "100% safe checkout with industry-standard encryption.",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.14), rgba(239,68,68,0.08))",
    glow: "rgba(245,158,11,0.15)",
  },
];

const FooterHighlights = () => {
  return (
    <>
      <style>{`
        .fh-section {
          padding: 72px 0 80px;
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* Ambient blobs */
        .fh-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
          opacity: 0.12;
        }
        .fh-blob-1 {
          width: 400px; height: 400px;
          top: -120px; left: -80px;
          background: #06B6D4;
        }
        .fh-blob-2 {
          width: 300px; height: 300px;
          bottom: -80px; right: -60px;
          background: #8B5CF6;
        }

        /* Grid texture */
        .fh-grid-tex {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none;
        }

        /* Inner wrapper */
        .fh-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        /* Grid */
        .fh-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          position: relative;
        }

        /* Subtle vertical dividers between cards (desktop) */
        .fh-grid::before {
          content: '';
          position: absolute;
          inset: 20px 0;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent calc(25% - 1px),
            rgba(226,232,240,0.5) calc(25% - 1px),
            rgba(226,232,240,0.5) 25%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* Card */
        .fh-card {
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(226,232,240,0.7);
          border-radius: 20px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s cubic-bezier(.4,0,.2,1), border-color .25s;
          cursor: default;
        }
        .fh-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(15,23,42,0.1);
          border-color: rgba(6,182,212,0.25);
        }

        /* Icon bubble */
        .fh-icon-wrap {
          width: 54px; height: 54px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          transition: transform .3s cubic-bezier(.4,0,.2,1);
          flex-shrink: 0;
          position: relative;
        }
        .fh-card:hover .fh-icon-wrap {
          transform: scale(1.1) rotate(-5deg);
        }
        /* inner glow pulse on hover */
        .fh-icon-wrap::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 20px;
          opacity: 0;
          transition: opacity .3s;
        }
        .fh-card:hover .fh-icon-wrap::after { opacity: 1; }

        /* Text block */
        .fh-text {}
        .fh-title {
          font-size: 15.5px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.2;
          margin: 0 0 3px;
        }
        .fh-sub {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .07em;
          text-transform: uppercase;
          margin: 0 0 8px;
        }
        .fh-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.65;
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 960px) {
          .fh-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .fh-grid::before { display: none; }
        }
        @media (max-width: 600px) {
          .fh-section { padding: 52px 0 60px; }
          .fh-inner { padding: 0 20px; }
          .fh-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .fh-card {
            flex-direction: row;
            align-items: flex-start;
            padding: 20px;
            gap: 18px;
            text-align: left;
          }
        }
      `}</style>

      <section className="fh-section">
        <div className="fh-blob fh-blob-1" />
        <div className="fh-blob fh-blob-2" />
        <div className="fh-grid-tex" />

        <div className="fh-inner">
          <div className="fh-grid">
            {items.map((item, i) => (
              <div className="fh-card" key={i}>
                {/* Icon bubble */}
                <div
                  className="fh-icon-wrap"
                  style={{
                    background: item.gradient,
                    color: item.color,
                    boxShadow: `0 4px 18px ${item.glow}`,
                  }}
                >
                  <i className={item.icon} />
                </div>

                {/* Text */}
                <div className="fh-text">
                  <p className="fh-title">{item.title}</p>
                  <p className="fh-sub" style={{ color: item.color }}>{item.sub}</p>
                  <p className="fh-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FooterHighlights;