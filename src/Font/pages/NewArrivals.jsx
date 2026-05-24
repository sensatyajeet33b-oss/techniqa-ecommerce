import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NewArrivals.css";
import {
    toggleWishlistItem,
    isInWishlist,
} from "../../utils/wishlist";

import NewArrivalsImage1 from "../assets/NewArrivals Image1.png";
import NewArrivalsImage2 from "../assets/NewArrivals Image2.png";
import NewArrivalsImage3 from "../assets/NewArrivals Image3.png";
import NewArrivalsImage4 from "../assets/NewArrivals Image4.png";

/* ------------------------------------------------------------------ */
/*  DATA                                                                */
/* ------------------------------------------------------------------ */

const products = [
    {
        id: 1,
        title: "Vortex Refrigerant Recovery Machine",
        brand: "Inficon",
        category: "Recovery Machines",
        price: "₹1,71,600",
        oldPrice: "₹1,94,900",
        sale: "Save 12%",
        stock: "In Stock",
        rating: 4.8,
        reviews: 38,
        image: NewArrivalsImage1,
    },
    {
        id: 2,
        title: "MicroBluVac+ Digital Micron Gauge",
        brand: "Accutools",
        category: "Vacuum Tools",
        price: "₹23,750",
        oldPrice: "₹45,150",
        sale: "Save 47%",
        stock: "In Stock",
        rating: 4.9,
        reviews: 61,
        image: NewArrivalsImage2,
    },
    {
        id: 3,
        title: "Pilot+ Vacuum Gauge",
        brand: "Inficon",
        category: "Vacuum Tools",
        price: "₹48,600",
        oldPrice: "₹55,900",
        sale: "Save 13%",
        stock: "In Stock",
        rating: 4.7,
        reviews: 29,
        image: NewArrivalsImage3,
    },
    {
        id: 4,
        title: "TEK-Mate Leak Detector",
        brand: "Inficon",
        category: "Leak Detectors",
        price: "₹38,500",
        oldPrice: "₹43,778",
        sale: "Save 12%",
        stock: "In Stock",
        rating: 4.6,
        reviews: 44,
        image: NewArrivalsImage4,
    },
];

const filters = ["All", "Leak Detectors", "Vacuum Tools", "Chemicals", "Recovery Machines"];

/* ------------------------------------------------------------------ */
/*  STAR RENDERER                                                       */
/* ------------------------------------------------------------------ */

function Stars({ rating }) {
    const full = Math.floor(rating);
    const partial = rating % 1 >= 0.5;
    return (
        <span className="na-stars-icons" aria-label={`${rating} stars`}>
            {"★".repeat(full)}{partial ? "½" : ""}{"☆".repeat(5 - full - (partial ? 1 : 0))}
        </span>
    );
}

/* ------------------------------------------------------------------ */
/*  PRODUCT CARD                                                        */
/* ------------------------------------------------------------------ */

function ProductCard({ product, delay }) {
    const navigate = useNavigate();
    const cardRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [toast, setToast] = useState(false);

    const [toastMsg, setToastMsg] = useState("");
    const [wishlisted, setWishlisted] =
        useState(isInWishlist(product.id));

    const handleWishlist = (e) => {

        e.stopPropagation();

        const updated =
            toggleWishlistItem(product);

        const exists =
            updated.some((i) => i.id === product.id);

        setWishlisted(exists);

        window.dispatchEvent(
            new Event("wishlistUpdated")
        );

        showToast(
            exists
                ? "Added to wishlist ❤️"
                : "Removed from wishlist"
        );
    };

    const showToast = (text) => {

        setToastMsg(text);

        setToast(true);

        setTimeout(() => {
            setToast(false);
        }, 2500);
    };


    const addToCart = (e) => {

        e.stopPropagation();

        const cart =
            JSON.parse(
                localStorage.getItem("cart") || "[]"
            );

        const existing =
            cart.find((i) => i.id === product.id);

        if (existing) {

            existing.qty += 1;

        } else {

            cart.push({
                ...product,
                qty: 1
            });
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );

        showToast(
            `${product.title.slice(0, 26)}… added to cart`
        );
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setVisible(true), delay);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.12 }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <>
            {/* Toast */}
            <div className={`na-toast${toast ? " show" : ""}`}>
                <i className="ri-checkbox-circle-fill" />
                {toastMsg}
            </div>
            <div
                ref={cardRef}
                className={`na-card${visible ? " na-card-visible" : ""}`}
                style={{ transitionDelay: `${delay}ms` }}
                onClick={() => navigate(`/product/${product.id}`)}
            >
                {/* Sale badge */}
                <span className="na-badge">{product.sale}</span>

                {/* Hover action buttons */}
                <div className="na-card-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                        className={`na-action-btn ${wishlisted ? "active" : ""}`}
                        title="Wishlist"
                        onClick={handleWishlist}
                    >
                        <i
                            className={
                                wishlisted
                                    ? "ri-heart-fill"
                                    : "ri-heart-line"
                            }
                        />
                    </button>
                    <button className="na-action-btn" title="Quick View">
                        <i className="ri-eye-line" />
                    </button>
                    <button className="na-action-btn" title="Compare">
                        <i className="ri-scales-line" />
                    </button>
                </div>

                {/* Image */}
                <div className="na-card-img-wrap">
                    <img src={product.image} alt={product.title} />
                </div>

                {/* Body */}
                <div className="na-card-body">
                    <span className="na-brand">{product.brand}</span>

                    <p className="na-title">{product.title}</p>

                    {/* Ratings */}
                    <div className="na-stars">
                        <Stars rating={product.rating} />
                        <span>{product.rating} ({product.reviews} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="na-price-row">
                        <span className="na-price">{product.price}</span>
                        <span className="na-old-price">{product.oldPrice}</span>
                    </div>

                    {/* Stock */}
                    <span className="na-stock">
                        <span className="na-stock-dot" />
                        {product.stock}
                    </span>
                </div>

                {/* CTA */}
                <div
                    className="na-card-footer"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="na-cta"
                        onClick={addToCart}
                    >
                        <i className="ri-shopping-cart-line" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </>
    );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                           */
/* ------------------------------------------------------------------ */

export default function NewArrivals() {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState("All");
      useEffect(() => {
    
        document.title =
          "New Arrivals | Tecniqa";
    
      }, []);

    const filtered =
        activeFilter === "All"
            ? products
            : products.filter((p) => p.category === activeFilter);

    return (
        <div className="na-page">

            {/* Ambient orbs */}
            <div className="na-orb na-orb-1" />
            <div className="na-orb na-orb-2" />

            {/* ── HERO HEADER ── */}
            <div className="na-hero">
                <div className="na-hero-left">
                    <div className="na-eyebrow">
                        <span className="na-eyebrow-dot" />
                        Just Dropped
                    </div>

                    <h1>
                        New <span>Arrivals</span>
                    </h1>

                    <p>
                        Discover the latest HVAC tools and industrial-grade solutions
                        trusted by professionals across India.
                    </p>
                </div>

                <div className="na-hero-right">
                    <button className="na-btn-back" onClick={() => navigate(-1)}>
                        <i className="ri-arrow-left-line" />
                        Back
                    </button>

                    <Link
                        to="/product-group"
                        className="na-btn-primary"
                    >
                        Explore Products
                        <i className="ri-arrow-right-line" />
                    </Link>
                </div>
            </div>

            {/* ── FILTER TABS ── */}
            <div className="na-filters">
                {filters.map((f) => (
                    <button
                        key={f}
                        className={`na-filter-tab${activeFilter === f ? " active" : ""}`}
                        onClick={() => setActiveFilter(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* ── PRODUCT GRID ── */}
            <div className="na-grid">
                {filtered.map((product, i) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        delay={i * 90}
                    />
                ))}
            </div>
        </div>
    );
}