// ReturnPolicy.jsx

import React, { useEffect } from "react";

const sections = [
    {
        title: "Return Eligibility",
        content:
            "Customers may request a return within 7 days of delivery for eligible products purchased directly from Tecniqa or authorized sellers.",
    },
    {
        title: "Product Condition",
        content:
            "Returned products must be unused, undamaged, and in original packaging with all accessories, manuals, labels, and invoices intact.",
    },
    {
        title: "Non-returnable Items",
        content:
            "Installed products, chemicals, consumables, customized items, and products damaged after delivery are not eligible for return.",
    },
    {
        title: "Damaged or Incorrect Products",
        content:
            "Customers receiving damaged, defective, or incorrect products must notify Tecniqa within 48 hours of delivery along with supporting images or videos.",
    },
    {
        title: "Inspection & Approval",
        content:
            "All returned products are subject to technical inspection before approval of refunds, replacements, or exchanges.",
    },
    {
        title: "Refund Process",
        content:
            "Approved refunds are processed within 5–7 business days through the original payment method or store credit, depending on the order type.",
    },
    {
        title: "Shipping Responsibility",
        content:
            "Return shipping charges may apply unless the return is due to damaged, defective, or incorrectly delivered products.",
    },
    {
        title: "Order Cancellation",
        content:
            "Orders may be cancelled before dispatch. Cancellation requests after shipment may not be accepted.",
    },
];

const trustItems = [
    "Easy Return Process",
    "Secure Refund Handling",
    "Professional HVAC Support",
    "Trusted Industrial Products",
];

export default function ReturnPolicy() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <style>{`
        
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&display=swap');

        :root{
          --rp-brand:#06B6D4;
          --rp-brand-dark:#0E7490;
          --rp-text:#0F172A;
          --rp-muted:#64748B;
          --rp-border:#E2E8F0;
          --rp-bg:#F8FAFC;
          --rp-heading:'Manrope', sans-serif;
          --rp-body:'Inter', sans-serif;
        }

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{
          background:var(--rp-bg);
          font-family:var(--rp-body);
        }

        .rp-page{
          min-height:100vh;
          background:
            radial-gradient(circle at top right,
            rgba(6,182,212,0.08),
            transparent 35%),
            linear-gradient(180deg,#f8fafc 0%, #ffffff 100%);
        }

        /* HERO */

        .rp-hero{
          position:relative;
          overflow:hidden;
          padding:140px 8% 90px;
          background:
            linear-gradient(135deg,#082F49 0%, #0F172A 100%);
        }

        .rp-grid{
          position:absolute;
          inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size:50px 50px;
        }

        .rp-badge{
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

        .rp-title{
          position:relative;
          z-index:2;
          font-family:var(--rp-heading);
          font-size:clamp(3rem,6vw,5rem);
          font-weight:800;
          line-height:1;
          letter-spacing:-0.05em;
          color:white;
          margin-bottom:24px;
        }

        .rp-sub{
          position:relative;
          z-index:2;
          max-width:760px;
          color:rgba(255,255,255,0.72);
          font-size:1.05rem;
          line-height:1.8;
        }

        /* TRUST STRIP */

        .rp-trust{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          border-top:1px solid rgba(255,255,255,0.06);
          background:white;
          border-bottom:1px solid var(--rp-border);
        }

        .rp-trust-item{
          padding:22px;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:10px;
          font-size:14px;
          font-weight:600;
          color:var(--rp-text);
          border-right:1px solid var(--rp-border);
        }

        .rp-trust-item:last-child{
          border-right:none;
        }

        .rp-trust-item i{
          color:var(--rp-brand);
          font-size:18px;
        }

        /* CONTENT */

        .rp-container{
          max-width:1200px;
          margin:auto;
          padding:70px 24px 100px;
        }

        .rp-section{
          background:white;
          border:1px solid rgba(226,232,240,0.8);
          border-radius:24px;
          padding:38px;
          margin-bottom:28px;
          transition:all .3s ease;
          box-shadow:
            0 10px 30px rgba(15,23,42,0.04);
        }

        .rp-section:hover{
          transform:translateY(-4px);
          box-shadow:
            0 20px 40px rgba(15,23,42,0.08);
          border-color:rgba(6,182,212,0.25);
        }

        .rp-section-top{
          display:flex;
          align-items:center;
          gap:18px;
          margin-bottom:18px;
        }

        .rp-icon{
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

        .rp-icon i{
          color:var(--rp-brand);
          font-size:24px;
        }

        .rp-section h2{
          font-family:var(--rp-heading);
          font-size:1.8rem;
          font-weight:800;
          letter-spacing:-0.03em;
          color:var(--rp-text);
        }

        .rp-section p{
          color:var(--rp-muted);
          line-height:1.9;
          font-size:1rem;
        }

        /* CONTACT BOX */

        .rp-contact{
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

        .rp-contact h3{
          font-family:var(--rp-heading);
          font-size:2rem;
          margin-bottom:12px;
          letter-spacing:-0.03em;
        }

        .rp-contact p{
          color:rgba(255,255,255,0.88);
          margin-bottom:24px;
          line-height:1.7;
        }

        .rp-btn{
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

        .rp-btn:hover{
          transform:translateY(-3px);
        }

        @media(max-width:900px){

          .rp-trust{
            grid-template-columns:1fr 1fr;
          }

          .rp-title{
            font-size:3rem;
          }
        }

        @media(max-width:600px){

          .rp-hero{
            padding:120px 24px 70px;
          }

          .rp-title{
            font-size:2.4rem;
          }

          .rp-trust{
            grid-template-columns:1fr;
          }

          .rp-trust-item{
            border-right:none;
            border-bottom:1px solid var(--rp-border);
          }

          .rp-section{
            padding:28px;
          }

          .rp-section-top{
            align-items:flex-start;
          }

          .rp-section h2{
            font-size:1.4rem;
          }
        }

      `}</style>

            <div className="rp-page">

                {/* HERO */}
                <section className="rp-hero">

                    <div className="rp-grid"></div>

                    <div className="rp-badge">
                        <i className="ri-arrow-go-back-line"></i>
                        Returns & Refunds
                    </div>

                    <h1 className="rp-title">
                        Return Policy
                    </h1>

                    <p className="rp-sub">
                        Tecniqa strives to provide a smooth and transparent
                        return experience while ensuring quality standards for
                        industrial HVACR and refrigeration products.
                    </p>

                </section>

                {/* TRUST STRIP */}
                <div className="rp-trust">

                    {trustItems.map((item, index) => (
                        <div className="rp-trust-item" key={index}>
                            <i className="ri-checkbox-circle-line"></i>
                            {item}
                        </div>
                    ))}

                </div>

                {/* CONTENT */}
                <div className="rp-container">

                    {sections.map((section, index) => (

                        <div className="rp-section" key={index}>

                            <div className="rp-section-top">

                                <div className="rp-icon">
                                    <i className="ri-file-list-3-line"></i>
                                </div>

                                <h2>{section.title}</h2>

                            </div>

                            <p>{section.content}</p>

                        </div>

                    ))}

                    {/* CONTACT */}

                    <div className="rp-contact">

                        <h3>Need Return Assistance?</h3>

                        <p>
                            Our support team is available to assist you with
                            return requests, refunds, exchanges, and order-related queries.
                        </p>

                        <a
                            href="/contact"
                            className="rp-btn"
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