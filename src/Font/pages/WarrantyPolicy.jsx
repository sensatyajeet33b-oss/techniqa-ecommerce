// WarrantyPolicy.jsx

import React, { useEffect } from "react";

const sections = [
    {
        title: "Warranty Coverage",
        content:
            "Tecniqa products are covered against manufacturing defects and workmanship issues under normal industrial and commercial usage conditions.",
    },
    {
        title: "Warranty Duration",
        content:
            "Warranty duration may vary depending on the brand and product category. Certain products may carry manufacturer-backed warranties.",
    },
    {
        title: "Eligible Products",
        content:
            "Only products purchased directly from Tecniqa or authorized sellers are eligible for warranty support.",
    },
    {
        title: "Exclusions",
        content:
            "The warranty does not cover damages caused by improper installation, misuse, accidental damage, electrical fluctuations, unauthorized repairs, modifications, or normal wear and tear.",
    },
    {
        title: "Warranty Claim Process",
        content:
            "Customers must provide proof of purchase, invoice details, and product information while requesting warranty support.",
    },
    {
        title: "Inspection & Approval",
        content:
            "All warranty claims are subject to technical inspection and approval by Tecniqa or the respective manufacturer.",
    },
    {
        title: "Repair or Replacement",
        content:
            "Products may be repaired, replaced, or serviced depending on inspection results and warranty eligibility.",
    },
    {
        title: "Limitation of Liability",
        content:
            "Tecniqa shall not be liable for indirect, incidental, or consequential damages arising from product usage.",
    },
];

const trustItems = [
    "Genuine Industrial Products",
    "Manufacturer Warranty Support",
    "Secure Transactions",
    "Professional HVAC Assistance",
];

export default function WarrantyPolicy() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&display=swap');

        :root{
          --wp-brand:#06B6D4;
          --wp-brand-dark:#0E7490;
          --wp-text:#0F172A;
          --wp-muted:#64748B;
          --wp-border:#E2E8F0;
          --wp-bg:#F8FAFC;
          --wp-heading:'Manrope', sans-serif;
          --wp-body:'Inter', sans-serif;
        }

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{
          background:var(--wp-bg);
          font-family:var(--wp-body);
        }

        .wp-page{
          min-height:100vh;
          background:
            radial-gradient(circle at top right,
            rgba(6,182,212,0.08),
            transparent 35%),
            linear-gradient(180deg,#f8fafc 0%, #ffffff 100%);
        }

        /* HERO */

        .wp-hero{
          position:relative;
          overflow:hidden;
          padding:140px 8% 90px;
          background:
            linear-gradient(135deg,#082F49 0%, #0F172A 100%);
        }

        .wp-grid{
          position:absolute;
          inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size:50px 50px;
        }

        .wp-badge{
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:8px 18px;
          border-radius:999px;
          background:rgba(6,182,212,0.12);
          border:1px solid rgba(6,182,212,0.3);
          color:#7DD3FC;
          font-size:12px;
          font-weight:700;
          letter-spacing:.08em;
          text-transform:uppercase;
          margin-bottom:22px;
          position:relative;
          z-index:2;
        }

        .wp-title{
          position:relative;
          z-index:2;
          font-family:var(--wp-heading);
          font-size:clamp(3rem,6vw,5rem);
          font-weight:800;
          line-height:1;
          letter-spacing:-0.05em;
          color:white;
          margin-bottom:24px;
        }

        .wp-sub{
          position:relative;
          z-index:2;
          max-width:760px;
          color:rgba(255,255,255,0.7);
          font-size:1.05rem;
          line-height:1.8;
        }

        /* TRUST STRIP */

        .wp-trust{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          border-top:1px solid rgba(255,255,255,0.06);
          background:white;
          border-bottom:1px solid var(--wp-border);
        }

        .wp-trust-item{
          padding:22px;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:10px;
          font-size:14px;
          font-weight:600;
          color:var(--wp-text);
          border-right:1px solid var(--wp-border);
        }

        .wp-trust-item:last-child{
          border-right:none;
        }

        .wp-trust-item i{
          color:var(--wp-brand);
          font-size:18px;
        }

        /* CONTENT */

        .wp-container{
          max-width:1200px;
          margin:auto;
          padding:70px 24px 100px;
        }

        .wp-section{
          background:white;
          border:1px solid rgba(226,232,240,0.8);
          border-radius:24px;
          padding:38px;
          margin-bottom:28px;
          transition:all .3s ease;
          box-shadow:
            0 10px 30px rgba(15,23,42,0.04);
        }

        .wp-section:hover{
          transform:translateY(-4px);
          box-shadow:
            0 20px 40px rgba(15,23,42,0.08);
          border-color:rgba(6,182,212,0.25);
        }

        .wp-section-top{
          display:flex;
          align-items:center;
          gap:18px;
          margin-bottom:18px;
        }

        .wp-icon{
          width:58px;
          height:58px;
          border-radius:18px;
          background:
            linear-gradient(135deg,
            rgba(6,182,212,0.12),
            rgba(37,99,235,0.12));
          display:flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
        }

        .wp-icon i{
          color:var(--wp-brand);
          font-size:24px;
        }

        .wp-section h2{
          font-family:var(--wp-heading);
          font-size:1.8rem;
          font-weight:800;
          letter-spacing:-0.03em;
          color:var(--wp-text);
        }

        .wp-section p{
          color:var(--wp-muted);
          line-height:1.9;
          font-size:1rem;
        }

        /* CONTACT BOX */

        .wp-contact{
          margin-top:40px;
          padding:40px;
          border-radius:28px;
          background:
            linear-gradient(135deg,#06B6D4,#2563EB);
          color:white;
          text-align:center;
          box-shadow:
            0 20px 40px rgba(6,182,212,0.25);
        }

        .wp-contact h3{
          font-family:var(--wp-heading);
          font-size:2rem;
          margin-bottom:12px;
          letter-spacing:-0.03em;
        }

        .wp-contact p{
          color:rgba(255,255,255,0.85);
          margin-bottom:24px;
          line-height:1.7;
        }

        .wp-btn{
          display:inline-flex;
          align-items:center;
          gap:10px;
          padding:14px 28px;
          border-radius:14px;
          background:white;
          color:#0F172A;
          text-decoration:none;
          font-weight:700;
          transition:.25s ease;
        }

        .wp-btn:hover{
          transform:translateY(-3px);
        }

        @media(max-width:900px){

          .wp-trust{
            grid-template-columns:1fr 1fr;
          }

          .wp-title{
            font-size:3rem;
          }
        }

        @media(max-width:600px){

          .wp-hero{
            padding:120px 24px 70px;
          }

          .wp-title{
            font-size:2.4rem;
          }

          .wp-trust{
            grid-template-columns:1fr;
          }

          .wp-trust-item{
            border-right:none;
            border-bottom:1px solid var(--wp-border);
          }

          .wp-section{
            padding:28px;
          }

          .wp-section-top{
            align-items:flex-start;
          }

          .wp-section h2{
            font-size:1.4rem;
          }
        }

      `}</style>

            <div className="wp-page">

                {/* HERO */}
                <section className="wp-hero">
                    <div className="wp-grid"></div>

                    <div className="wp-badge">
                        <i className="ri-shield-check-line"></i>
                        Warranty Protection
                    </div>

                    <h1 className="wp-title">
                        Warranty Policy
                    </h1>

                    <p className="wp-sub">
                        Tecniqa is committed to delivering reliable industrial-grade
                        HVACR products backed by professional warranty support and
                        trusted service standards.
                    </p>
                </section>

                {/* TRUST STRIP */}
                <div className="wp-trust">
                    {trustItems.map((item, index) => (
                        <div className="wp-trust-item" key={index}>
                            <i className="ri-checkbox-circle-line"></i>
                            {item}
                        </div>
                    ))}
                </div>

                {/* CONTENT */}
                <div className="wp-container">

                    {sections.map((section, index) => (
                        <div className="wp-section" key={index}>

                            <div className="wp-section-top">

                                <div className="wp-icon">
                                    <i className="ri-file-shield-line"></i>
                                </div>

                                <h2>{section.title}</h2>

                            </div>

                            <p>{section.content}</p>

                        </div>
                    ))}

                    {/* CONTACT */}
                    <div className="wp-contact">

                        <h3>Need Warranty Assistance?</h3>

                        <p>
                            Our support team is available to help you with warranty
                            claims, inspections, and technical assistance.
                        </p>

                        <a
                            href="/contact"
                            className="wp-btn"
                        >
                            <i className="ri-customer-service-2-line"></i>
                            Contact Support
                        </a>

                    </div>

                </div>

            </div>
        </>
    );
}