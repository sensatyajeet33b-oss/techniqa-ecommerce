import React from "react";
import { Routes, Route } from "react-router-dom";

/* LAYOUT */
import FontLayout from "../Font/components/FontLayout";

/* MAIN PAGES */
import Home from "../Font/pages/Home";
import AboutUs from "../Font/pages/AboutUs";
import Contact from "../Font/pages/Contact";
import LoginSignup from "../Font/pages/LoginSignup";
import Checkout from "../Font/pages/Checkout";

/* PRODUCT PAGES */
import NewArrivals from "../Font/pages/NewArrivals";
import ProductGroup from "../Font/pages/ProductGroup";
import ShopByBrand from "../Font/pages/ShopByBrand";
import CollectionDetails from "../Font/pages/CollectionDetails";
import ProductDetails from "../Font/pages/ProductDetails";

/* FEATURED PRODUCTS */
import FeaturedProducts from "../Font/pages/FeaturedProducts";
import FeaturedProductDetails from "../Font/pages/FeaturedProductDetails";

/* POLICY PAGES */
import PrivacyPolicy from "../Font/pages/PrivacyPolicy";
import TermsOfService from "../Font/pages/TermsOfService";
import WarrantyPolicy from "../Font/pages/WarrantyPolicy";
import ReturnPolicy from "../Font/pages/ReturnPolicy";

import Wishlist from "../Font/pages/Wishlist";

const FontRoutes = () => {
    return (
        <Routes>

            <Route element={<FontLayout />}>

                {/* =========================
                    HOME
                ========================= */}
                <Route
                    index
                    element={<Home />}
                />

                {/* =========================
                    NEW ARRIVALS
                ========================= */}
                <Route
                    path="new-arrivals"
                    element={<NewArrivals />}
                />

                {/* =========================
                    PRODUCT GROUP
                ========================= */}
                <Route
                    path="product-group"
                    element={<ProductGroup />}
                />

                <Route
                    path="product-group/:product"
                    element={<ProductGroup />}
                />

                {/* =========================
                    SHOP BY BRAND
                ========================= */}
                <Route
                    path="shop-by-brand"
                    element={<ShopByBrand />}
                />

                <Route
                    path="shop-by-brand/:brand"
                    element={<ShopByBrand />}
                />

                {/* =========================
                    COLLECTION DETAILS
                ========================= */}
                <Route
                    path="collection-details"
                    element={<CollectionDetails />}
                />

                {/* =========================
                    PRODUCT DETAILS
                ========================= */}
                <Route
                    path="product/:id"
                    element={<ProductDetails />}
                />

                {/* =========================
                    FEATURED PRODUCTS
                ========================= */}
                <Route
                    path="featured-products"
                    element={<FeaturedProducts />}
                />

                <Route
                    path="featured-product-details"
                    element={<FeaturedProductDetails />}
                />

                {/* =========================
                    CHECKOUT
                ========================= */}
                <Route
                    path="checkout"
                    element={<Checkout />}
                />

                {/* =========================
                    AUTH
                ========================= */}
                <Route
                    path="login"
                    element={<LoginSignup />}
                />

                {/* =========================
                    ABOUT & CONTACT
                ========================= */}
                <Route
                    path="about-us"
                    element={<AboutUs />}
                />

                <Route
                    path="contact"
                    element={<Contact />}
                />

                {/* =========================
                    LEGAL / POLICIES
                ========================= */}
                <Route
                    path="privacy-policy"
                    element={<PrivacyPolicy />}
                />

                <Route
                    path="terms"
                    element={<TermsOfService />}
                />

                <Route
                    path="warranty-policy"
                    element={<WarrantyPolicy />}
                />

                <Route
                    path="return-policy"
                    element={<ReturnPolicy />}
                />

                <Route
                    path="wishlist"
                    element={<Wishlist />}
                />

            </Route>

        </Routes>
    );
};

export default FontRoutes;