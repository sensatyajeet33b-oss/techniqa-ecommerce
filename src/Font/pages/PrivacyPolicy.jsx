// PrivacyPolicy.jsx

import React, { useEffect } from "react";

const sections = [
    {
        num: "01",
        icon: "ri-information-line",
        title: "Information We Collect",
        text:
            "We collect information you provide directly when creating an account, placing orders, or contacting support. This may include your name, email address, phone number, shipping address, and payment details.",
        bullets: [
            "Account registration details including name, email, and password",
            "Order history and transaction information",
            "Device and browser information for security monitoring",
            "Platform usage activity to improve user experience",
        ],
    },
    {
        num: "02",
        icon: "ri-settings-3-line",
        title: "How We Use Your Information",
        text:
            "Your information is used exclusively to provide, improve, and personalize the Tecniqa platform experience. We never sell your personal data to third parties.",
        bullets: [
            "Processing orders and managing deliveries",
            "Sending order confirmations and customer support updates",
            "Improving search, recommendations, and platform performance",
            "Fraud prevention and platform security monitoring",
        ],
    },
    {
        num: "03",
        icon: "ri-shield-keyhole-line",
        title: "Data Protection & Security",
        text:
            "Tecniqa implements industry-standard security practices including encrypted communication, protected servers, and access-controlled infrastructure to safeguard your information.",
        bullets: [
            "AES-256 encrypted data protection",
            "TLS-secured communication channels",
            "Access-controlled internal systems",
            "Regular security monitoring and audits",
        ],
    },
    {
        num: "04",
        icon: "ri-share-circle-line",
        title: "Data Sharing",
        text:
            "Your information is shared only with trusted service providers essential for operating our platform such as logistics partners, payment gateways, and technical infrastructure providers.",
    },
    {
        num: "05",
        icon: "ri-user-settings-line",
        title: "Your Rights",
        text:
            "You have the right to access, modify, or request deletion of your personal information at any time in accordance with applicable privacy regulations.",
        bullets: [
            "Right to access your personal information",
            "Right to update incorrect data",
            "Right to request account and data deletion",
            "Right to opt out of marketing communications",
        ],
    },
    {
        num: "06",
        icon: "ri-mail-send-line",
        title: "Contact Us",
        text:
            "If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, our support team is available to assist you.",
        contact: true,
    },
];

const trustItems = [
    "Secure Data Handling",
    "GDPR Compliant",
    "Encrypted Infrastructure",
    "Trusted Platform",
];

export default function PrivacyPolicy() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css');

        :root{
          --pp-brand:#06B6D4;
          --pp-brand-dark:#0E7490;
          --pp-text:#0F172A;
          --pp-muted:#64748B;
          --pp-border:#E2E8F0;
          --pp-bg:#F8FAFC;
          --pp-heading:'Manrope', sans-serif;
          --pp-body:'Inter', sans-serif;
        }

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{
          background:var(--pp-bg);
          font-family:var(--pp-body);
        }

        .pp-page{
          min-height:100vh;
          background:
            radial-gradient(circle at top right,
            rgba(6,182,212,0.08),
            transparent 35%),
            linear-gradient(180deg,#f8fafc 0%, #ffffff 100%);
        }

        /* HERO */

        .pp-hero{
          position:relative;
          overflow:hidden;
          padding:140px 8% 90px;
          background:
            linear-gradient(135deg,#082F49 0%, #0F172A 100%);
        }

        .pp-grid{
          position:absolute;
          inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size:50px 50px;
        }

        .pp-badge{
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

        .pp-title{
          position:relative;
          z-index:2;
          font-family:var(--pp-heading);
          font-size:clamp(3rem,6vw,5rem);
          font-weight:800;
          line-height:1;
          letter-spacing:-0.05em;
          color:white;
          margin-bottom:24px;
        }

        .pp-sub{
          position:relative;
          z-index:2;
          max-width:760px;
          color:rgba(255,255,255,0.72);
          font-size:1.05rem;
          line-height:1.8;
        }

        /* TRUST STRIP */

        .pp-trust{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          background:white;
          border-bottom:1px solid var(--pp-border);
        }

        .pp-trust-item{
          padding:22px;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:10px;
          font-size:14px;
          font-weight:600;
          color:var(--pp-text);
          border-right:1px solid var(--pp-border);
        }

        .pp-trust-item:last-child{
          border-right:none;
        }

        .pp-trust-item i{
          color:var(--pp-brand);
          font-size:18px;
        }

        /* CONTENT */

        .pp-container{
          max-width:1200px;
          margin:auto;
          padding:70px 24px 100px;
        }

        .pp-section{
          background:white;
          border:1px solid rgba(226,232,240,0.8);
          border-radius:24px;
          padding:38px;
          margin-bottom:28px;
          transition:all .3s ease;
          box-shadow:
            0 10px 30px rgba(15,23,42,0.04);
        }

        .pp-section:hover{
          transform:translateY(-4px);
          box-shadow:
            0 20px 40px rgba(15,23,42,0.08);
          border-color:rgba(6,182,212,0.25);
        }

        .pp-section-top{
          display:flex;
          align-items:center;
          gap:18px;
          margin-bottom:18px;
        }

        .pp-icon{
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

        .pp-icon i{
          color:var(--pp-brand);
          font-size:24px;
        }

        .pp-section-num{
          font-size:12px;
          font-weight:700;
          letter-spacing:.08em;
          text-transform:uppercase;
          color:var(--pp-brand);
          margin-bottom:6px;
        }

        .pp-section h2{
          font-family:var(--pp-heading);
          font-size:1.8rem;
          font-weight:800;
          letter-spacing:-0.03em;
          color:var(--pp-text);
        }

        .pp-section p{
          color:var(--pp-muted);
          line-height:1.9;
          font-size:1rem;
        }

        /* LIST */

        .pp-list{
          margin-top:18px;
          display:flex;
          flex-direction:column;
          gap:10px;
        }

        .pp-list-item{
          display:flex;
          align-items:flex-start;
          gap:10px;
          color:var(--pp-muted);
          line-height:1.7;
        }

        .pp-list-item i{
          color:var(--pp-brand);
          margin-top:3px;
        }

        /* CONTACT */

        .pp-contact-card{
          margin-top:22px;
          display:flex;
          flex-wrap:wrap;
          gap:16px;
          padding:24px;
          background:#f8fafc;
          border-radius:18px;
          border:1px solid var(--pp-border);
        }

        .pp-contact-item{
          display:flex;
          align-items:center;
          gap:8px;
          color:var(--pp-text);
          text-decoration:none;
          font-weight:500;
          transition:.25s ease;
        }

        .pp-contact-item:hover{
          color:var(--pp-brand);
        }

        .pp-contact-item i{
          color:var(--pp-brand);
        }

        @media(max-width:900px){

          .pp-trust{
            grid-template-columns:1fr 1fr;
          }

          .pp-title{
            font-size:3rem;
          }
        }

        @media(max-width:600px){

          .pp-hero{
            padding:120px 24px 70px;
          }

          .pp-title{
            font-size:2.4rem;
          }

          .pp-trust{
            grid-template-columns:1fr;
          }

          .pp-trust-item{
            border-right:none;
            border-bottom:1px solid var(--pp-border);
          }

          .pp-section{
            padding:28px;
          }

          .pp-section-top{
            align-items:flex-start;
          }

          .pp-section h2{
            font-size:1.4rem;
          }
        }

      `}</style>

            <div className="pp-page">

                {/* HERO */}

                <section className="pp-hero">

                    <div className="pp-grid"></div>

                    <div className="pp-badge">
                        <i className="ri-shield-check-line"></i>
                        Privacy & Data Protection
                    </div>

                    <h1 className="pp-title">
                        Privacy Policy
                    </h1>

                    <p className="pp-sub">
                        Tecniqa values your privacy and is committed to protecting
                        your personal information through secure, transparent,
                        and industry-standard data practices.
                    </p>

                </section>

                {/* TRUST STRIP */}

                <div className="pp-trust">

                    {trustItems.map((item, index) => (
                        <div className="pp-trust-item" key={index}>
                            <i className="ri-checkbox-circle-line"></i>
                            {item}
                        </div>
                    ))}

                </div>

                {/* CONTENT */}

                <div className="pp-container">

                    {sections.map((section, index) => (

                        <div className="pp-section" key={index}>

                            <div className="pp-section-top">

                                <div className="pp-icon">
                                    <i className={section.icon}></i>
                                </div>

                                <div>
                                    <div className="pp-section-num">
                                        Section {section.num}
                                    </div>

                                    <h2>{section.title}</h2>
                                </div>

                            </div>

                            <p>{section.text}</p>

                            {section.bullets && (

                                <div className="pp-list">

                                    {section.bullets.map((bullet, idx) => (
                                        <div className="pp-list-item" key={idx}>
                                            <i className="ri-checkbox-circle-line"></i>
                                            <span>{bullet}</span>
                                        </div>
                                    ))}

                                </div>

                            )}

                            {section.contact && (

                                <div className="pp-contact-card">

                                    <a
                                        href="mailto:support@tecniqa.com"
                                        className="pp-contact-item"
                                    >
                                        <i className="ri-mail-line"></i>
                                        support@tecniqa.com
                                    </a>

                                    <a
                                        href="tel:+919668246683"
                                        className="pp-contact-item"
                                    >
                                        <i className="ri-phone-line"></i>
                                        +91 9668246683
                                    </a>

                                    <div className="pp-contact-item">
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