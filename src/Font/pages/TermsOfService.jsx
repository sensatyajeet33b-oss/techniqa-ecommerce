// TermsOfService.jsx

import React, { useEffect } from "react";

const sections = [
    {
        num: "01",
        icon: "ri-file-list-3-line",
        title: "Acceptance of Terms",
        text:
            "By accessing or using the Tecniqa platform, you confirm that you have read, understood, and agreed to be bound by these Terms of Service and our Privacy Policy.",
        highlight:
            "If you do not agree to these Terms, you must discontinue use of the platform immediately.",
    },
    {
        num: "02",
        icon: "ri-tools-line",
        title: "Use of Services",
        text:
            "Tecniqa grants users a limited, non-exclusive, and non-transferable right to access and use the platform for lawful purchasing and browsing purposes.",
        bullets: [
            "No unauthorized access attempts",
            "No automated scraping or misuse",
            "No redistribution of platform content",
            "No unlawful or fraudulent usage",
        ],
    },
    {
        num: "03",
        icon: "ri-user-lock-line",
        title: "Account Responsibility",
        text:
            "Users are responsible for maintaining the confidentiality of account credentials and all activities performed under their accounts.",
        bullets: [
            "Keep login credentials secure",
            "Report unauthorized access immediately",
            "Do not share accounts with third parties",
        ],
    },
    {
        num: "04",
        icon: "ri-copyright-line",
        title: "Intellectual Property",
        text:
            "All content, trademarks, product visuals, interface designs, and branding on the Tecniqa platform are protected by intellectual property laws.",
        highlight:
            "Unauthorized copying, reproduction, or commercial use of Tecniqa content is strictly prohibited.",
    },
    {
        num: "05",
        icon: "ri-shopping-cart-line",
        title: "Orders & Payments",
        text:
            "By placing an order, users agree that all information provided is accurate and that they are authorized to use the selected payment method.",
        bullets: [
            "Prices include applicable taxes",
            "Orders may be cancelled if suspicious activity is detected",
            "Refunds follow the Return Policy",
            "Payment gateways are managed securely",
        ],
    },
    {
        num: "06",
        icon: "ri-shield-line",
        title: "Limitation of Liability",
        text:
            "Tecniqa shall not be liable for indirect, incidental, or consequential damages arising from platform usage or inability to access services.",
        highlight:
            "Our maximum liability shall not exceed the amount paid for the product or service involved.",
    },
    {
        num: "07",
        icon: "ri-refresh-line",
        title: "Changes to Terms",
        text:
            "Tecniqa reserves the right to modify or update these Terms of Service at any time. Continued platform usage after modifications constitutes acceptance of revised terms.",
    },
    {
        num: "08",
        icon: "ri-mail-send-line",
        title: "Contact Us",
        text:
            "For any questions, disputes, or concerns regarding these Terms of Service, please contact our support team.",
        contact: true,
    },
];

const trustItems = [
    "Legally Protected",
    "Secure Transactions",
    "Trusted Infrastructure",
    "Transparent Policies",
];

export default function TermsOfService() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

      useEffect(() => {
    
        document.title =
          "Terms Of Service | Tecniqa";
    
      }, []);

    return (
        <>
            <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css');

        :root{
          --tos-brand:#06B6D4;
          --tos-text:#0F172A;
          --tos-muted:#64748B;
          --tos-border:#E2E8F0;
          --tos-bg:#F8FAFC;
          --tos-heading:'Manrope', sans-serif;
          --tos-body:'Inter', sans-serif;
        }

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{
          background:var(--tos-bg);
          font-family:var(--tos-body);
        }

        .tos-page{
          min-height:100vh;
          background:
            radial-gradient(circle at top right,
            rgba(6,182,212,0.08),
            transparent 35%),
            linear-gradient(180deg,#f8fafc 0%, #ffffff 100%);
        }

        /* HERO */

        .tos-hero{
          position:relative;
          overflow:hidden;
          padding:140px 8% 90px;
          background:
            linear-gradient(135deg,#082F49 0%, #0F172A 100%);
        }

        .tos-grid{
          position:absolute;
          inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size:50px 50px;
        }

        .tos-badge{
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

        .tos-title{
          position:relative;
          z-index:2;
          font-family:var(--tos-heading);
          font-size:clamp(3rem,6vw,5rem);
          font-weight:800;
          line-height:1;
          letter-spacing:-0.05em;
          color:white;
          margin-bottom:24px;
        }

        .tos-sub{
          position:relative;
          z-index:2;
          max-width:760px;
          color:rgba(255,255,255,0.72);
          font-size:1.05rem;
          line-height:1.8;
        }

        /* TRUST STRIP */

        .tos-trust{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          background:white;
          border-bottom:1px solid var(--tos-border);
        }

        .tos-trust-item{
          padding:22px;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:10px;
          font-size:14px;
          font-weight:600;
          color:var(--tos-text);
          border-right:1px solid var(--tos-border);
        }

        .tos-trust-item:last-child{
          border-right:none;
        }

        .tos-trust-item i{
          color:var(--tos-brand);
          font-size:18px;
        }

        /* CONTENT */

        .tos-container{
          max-width:1200px;
          margin:auto;
          padding:70px 24px 100px;
        }

        .tos-section{
          background:white;
          border:1px solid rgba(226,232,240,0.8);
          border-radius:24px;
          padding:38px;
          margin-bottom:28px;
          transition:all .3s ease;
          box-shadow:
            0 10px 30px rgba(15,23,42,0.04);
        }

        .tos-section:hover{
          transform:translateY(-4px);
          box-shadow:
            0 20px 40px rgba(15,23,42,0.08);
          border-color:rgba(6,182,212,0.25);
        }

        .tos-section-top{
          display:flex;
          align-items:center;
          gap:18px;
          margin-bottom:18px;
        }

        .tos-icon{
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

        .tos-icon i{
          color:var(--tos-brand);
          font-size:24px;
        }

        .tos-section-num{
          font-size:12px;
          font-weight:700;
          letter-spacing:.08em;
          text-transform:uppercase;
          color:var(--tos-brand);
          margin-bottom:6px;
        }

        .tos-section h2{
          font-family:var(--tos-heading);
          font-size:1.8rem;
          font-weight:800;
          letter-spacing:-0.03em;
          color:var(--tos-text);
        }

        .tos-section p{
          color:var(--tos-muted);
          line-height:1.9;
          font-size:1rem;
        }

        .tos-list{
          margin-top:18px;
          display:flex;
          flex-direction:column;
          gap:10px;
        }

        .tos-list-item{
          display:flex;
          align-items:flex-start;
          gap:10px;
          color:var(--tos-muted);
          line-height:1.7;
        }

        .tos-list-item i{
          color:var(--tos-brand);
          margin-top:3px;
        }

        .tos-highlight{
          margin-top:20px;
          padding:18px 20px;
          border-radius:16px;
          background:
            linear-gradient(135deg,
            rgba(6,182,212,0.08),
            rgba(37,99,235,0.05));
          border:1px solid rgba(6,182,212,0.2);
          display:flex;
          align-items:flex-start;
          gap:12px;
          color:var(--tos-text);
          line-height:1.7;
        }

        .tos-highlight i{
          color:var(--tos-brand);
          font-size:18px;
          margin-top:2px;
        }

        .tos-contact-card{
          margin-top:22px;
          display:flex;
          flex-wrap:wrap;
          gap:16px;
          padding:24px;
          background:#f8fafc;
          border-radius:18px;
          border:1px solid var(--tos-border);
        }

        .tos-contact-item{
          display:flex;
          align-items:center;
          gap:8px;
          color:var(--tos-text);
          text-decoration:none;
          font-weight:500;
          transition:.25s ease;
        }

        .tos-contact-item:hover{
          color:var(--tos-brand);
        }

        .tos-contact-item i{
          color:var(--tos-brand);
        }

        @media(max-width:900px){

          .tos-trust{
            grid-template-columns:1fr 1fr;
          }

          .tos-title{
            font-size:3rem;
          }
        }

        @media(max-width:600px){

          .tos-hero{
            padding:120px 24px 70px;
          }

          .tos-title{
            font-size:2.4rem;
          }

          .tos-trust{
            grid-template-columns:1fr;
          }

          .tos-trust-item{
            border-right:none;
            border-bottom:1px solid var(--tos-border);
          }

          .tos-section{
            padding:28px;
          }

          .tos-section-top{
            align-items:flex-start;
          }

          .tos-section h2{
            font-size:1.4rem;
          }
        }

      `}</style>

            <div className="tos-page">

                <section className="tos-hero">

                    <div className="tos-grid"></div>

                    <div className="tos-badge">
                        <i className="ri-file-text-line"></i>
                        Legal Agreement
                    </div>

                    <h1 className="tos-title">
                        Terms of Service
                    </h1>

                    <p className="tos-sub">
                        These Terms of Service govern your access and use of the
                        Tecniqa platform, products, and related services.
                    </p>

                </section>

                <div className="tos-trust">

                    {trustItems.map((item, index) => (
                        <div className="tos-trust-item" key={index}>
                            <i className="ri-checkbox-circle-line"></i>
                            {item}
                        </div>
                    ))}

                </div>

                <div className="tos-container">

                    {sections.map((section, index) => (

                        <div className="tos-section" key={index}>

                            <div className="tos-section-top">

                                <div className="tos-icon">
                                    <i className={section.icon}></i>
                                </div>

                                <div>
                                    <div className="tos-section-num">
                                        Section {section.num}
                                    </div>

                                    <h2>{section.title}</h2>
                                </div>

                            </div>

                            <p>{section.text}</p>

                            {section.bullets && (

                                <div className="tos-list">

                                    {section.bullets.map((bullet, idx) => (
                                        <div className="tos-list-item" key={idx}>
                                            <i className="ri-checkbox-circle-line"></i>
                                            <span>{bullet}</span>
                                        </div>
                                    ))}

                                </div>

                            )}

                            {section.highlight && (

                                <div className="tos-highlight">
                                    <i className="ri-alert-line"></i>
                                    <span>{section.highlight}</span>
                                </div>

                            )}

                            {section.contact && (

                                <div className="tos-contact-card">

                                    <a
                                        href="mailto:support@tecniqa.com"
                                        className="tos-contact-item"
                                    >
                                        <i className="ri-mail-line"></i>
                                        support@tecniqa.com
                                    </a>

                                    <a
                                        href="tel:+919668246683"
                                        className="tos-contact-item"
                                    >
                                        <i className="ri-phone-line"></i>
                                        +91 9668246683
                                    </a>

                                    <div className="tos-contact-item">
                                        <i className="ri-map-pin-line"></i>
                                        DLF Cyber City, Bhubaneswar
                                    </div>

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            </div>
        </>
    );
}