import React, { useEffect, useRef, useState } from "react";
import "./FooterStyles.css";
import logo from "../assets/logo.png";
import SendIcon from "@mui/icons-material/Send"; // keep only for newsletter button or replace below

const navLinks = {
  Products: [
    { label: "HVACR Service Tools", href: "#" },
    { label: "Gas Leak Monitors", href: "#" },
    { label: "HVAC Chemicals", href: "#" },
    { label: "Energy Solutions", href: "#" },
  ],
  "Our Brands": [
    { label: "Appion", href: "#" },
    { label: "Yellow Jacket", href: "#" },
    { label: "Inficon", href: "#" },
    { label: "Errecom", href: "#" },
    { label: "BP Refcool", href: "#" },
    { label: "Ecoab", href: "#" },
  ],
  Policies: [
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },

    {
      label: "Terms & Conditions",
      href: "/terms",
    },

    {
      label: "Warranty Policy",
      href: "/warranty-policy",
    },

    {
      label: "Return Policy",
      href: "/return-policy",
    },
  ],
};

const contactDetails = [
  { icon: "ri-phone-line", label: "+91 9668246683", href: "tel:+919668246683" },
  { icon: "ri-mail-line", label: "support@tecniqa.com", href: "mailto:support@tecniqa.com" },
  { icon: "ri-map-pin-line", label: "DLF Cyber City, Bhubaneswar", href: "#" },
];

const socials = [
  { icon: "ri-facebook-fill", href: "https://www.facebook.com/people/Nano-Cloud-Technology/61579555775024/", label: "Facebook" },
  { icon: "ri-instagram-line", href: "https://www.instagram.com/nanocloudtechnology/", label: "Instagram" },
  { icon: "ri-linkedin-fill", href: "https://www.linkedin.com/company/nano-cloud-technology/", label: "LinkedIn" },
  { icon: "ri-youtube-fill", href: "#", label: "YouTube" },
];

const trustBadges = [
  { icon: "ri-shield-check-line", label: "Trusted HVAC Supplier" },
  { icon: "ri-medal-line", label: "ISO 9001 Certified" },
  { icon: "ri-user-star-line", label: "10K+ Professionals Served" },
];

const brandStrip = ["Appion", "Inficon", "Yellow Jacket", "Errecom", "BP Refcool", "Coendurol"];
const paymentMethods = ["Visa", "Mastercard", "UPI", "Razorpay", "Net Banking"];

function Footer() {
  const [showTop, setShowTop] = useState(false);
  const colRefs = useRef([]);

  /* Back-to-top visibility */
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Staggered column reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseFloat(el.dataset.delay || 0);
            setTimeout(() => el.classList.add("tq-visible"), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    colRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setColRef = (i) => (el) => { colRefs.current[i] = el; };

  return (
    <>
      {/* ===================== BACK TO TOP ===================== */}
      <button
        className={`tq-back-top${showTop ? " visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <i className="ri-arrow-up-line" />
      </button>

      <footer className="tq-footer">

        {/* ===================== NEWSLETTER ===================== */}
        <div className="tq-newsletter">
          <div className="tq-newsletter-copy">
            <h2>Stay Ahead with Tecniqa</h2>
            <p>
              Get the latest HVAC tools, exclusive offers and product launches
              delivered directly to your inbox.
            </p>
          </div>

          <div className="tq-newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button aria-label="Subscribe">
              <i className="ri-send-plane-fill" />
            </button>
          </div>
        </div>

        {/* ===================== MAIN GRID ===================== */}
        <div className="tq-footer-main">

          {/* Company */}
          <div className="tq-footer-col" ref={setColRef(0)} data-delay="0">
            <img src={logo} alt="Tecniqa" className="tq-footer-logo" />

            <p className="tq-company-desc">
              Tecniqa delivers premium refrigeration and HVAC solutions with
              cutting-edge technology, trusted global brands, and unmatched
              after-sales service across India.
            </p>

            {/* Trust badges */}
            <div className="tq-trust-badges">
              {trustBadges.map(({ icon, label }) => (
                <div className="tq-trust-badge" key={label}>
                  <i className={icon} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="tq-socials">
              {socials.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="tq-social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <i className={icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(navLinks).map(([title, links], colIdx) => (
            <div
              className="tq-footer-col"
              key={title}
              ref={setColRef(colIdx + 1)}
              data-delay={`${(colIdx + 1) * 90}`}
            >
              <h3 className="tq-footer-title">{title}</h3>
              <ul className="tq-footer-links">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href}>
                      <i className="ri-arrow-right-s-line" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div
            className="tq-footer-col"
            ref={setColRef(4)}
            data-delay="360"
          >
            <h3 className="tq-footer-title">Contact</h3>

            {contactDetails.map(({ icon, label, href }) => (
              <a className="tq-contact-item" href={href} key={label}>
                <span className="tq-contact-icon">
                  <i className={icon} />
                </span>
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ===================== BRAND STRIP ===================== */}
        <div className="tq-brand-strip">
          {brandStrip.map((brand, i) => (
            <React.Fragment key={brand}>
              <span>{brand}</span>
              {i < brandStrip.length - 1 && <span className="dot">•</span>}
            </React.Fragment>
          ))}
        </div>

        {/* ===================== PAYMENT STRIP ===================== */}
        <div className="tq-payment-strip">
          <span className="tq-payment-label">Secure Payments via</span>
          <div className="tq-payment-icons">
            {paymentMethods.map((m) => (
              <span className="tq-payment-pill" key={m}>{m}</span>
            ))}
          </div>
        </div>

        {/* ===================== BOTTOM BAR ===================== */}
        <div className="tq-footer-bottom">
          <p>© {new Date().getFullYear()} Tecniqa. All Rights Reserved.</p>
          <p>
            Engineered for the future of <span>cooling technology</span>.
          </p>
        </div>

      </footer>
    </>
  );
}

export default Footer;