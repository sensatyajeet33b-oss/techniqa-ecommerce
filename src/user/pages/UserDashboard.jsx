import React, { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import "../styles/userDashboard.css";


import Header from "../../Font/components/Header";
import Footer from "../../Font/components/Footer";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHome from "../components/DashboardHome";
import ProfileSection from "../components/ProfileSection";
import OrdersSection from "../components/OrdersSection";
import OrderDetailSection from "../components/OrderDetailSection";
import AddressSection from "../components/AddressSection";
import WishlistSection from "../components/WishlistSection";

import { MOCK_ORDERS } from "../constants/orders";
import { STATES_IN } from "../constants/states";

import {
  getCurrentUser,
  updateCurrentUser,
  logoutUser,
} from "../../utils/auth";

import {
  getWishlist,
  toggleWishlistItem,
} from "../../utils/wishlist";

export default function UserDashboard() {

  const navigate = useNavigate();
  const location = useLocation();

  /* ─────────────────────────────────────────
     STATES
  ───────────────────────────────────────── */

  const [user, setUser] = useState(getCurrentUser());
  const queryParams =
    new URLSearchParams(location.search);
  const section =
    queryParams.get("tab") ||
    "dashboard";
  const setSection = (tab) => {

    navigate(
      `/user/dashboard?tab=${tab}`
    );

  };

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [wishlist, setWishlist] = useState(getWishlist());

  /* profile */

  const [profileEdit, setProfileEdit] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [profileMsg, setProfileMsg] = useState("");

  /* password */

  const [pwForm, setPwForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [pwMsg, setPwMsg] = useState("");

  /* address */

  const [showAddrForm, setShowAddrForm] = useState(false);

  const [editAddrId, setEditAddrId] = useState(null);

  const [addrForm, setAddrForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  /* ─────────────────────────────────────────
     AUTH CHECK
  ───────────────────────────────────────── */

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  /* ─────────────────────────────────────────
     DATA
  ───────────────────────────────────────── */

  const orders = MOCK_ORDERS;

  const addresses = user?.addresses || [];

  /* ─────────────────────────────────────────
     PROFILE
  ───────────────────────────────────────── */

  const saveProfile = () => {

    if (!profileForm.name.trim()) return;

    const updated = {
      ...user,
      ...profileForm,
    };

    updateCurrentUser(updated);

    setUser(updated);

    setProfileEdit(false);

    setProfileMsg("Profile updated successfully!");

    setTimeout(() => {
      setProfileMsg("");
    }, 3000);
  };

  /* ─────────────────────────────────────────
     PASSWORD
  ───────────────────────────────────────── */

  const changePassword = () => {

    if (pwForm.current !== user.password) {
      setPwMsg("Current password incorrect.");
      return;
    }

    if (pwForm.next.length < 6) {
      setPwMsg("Password must be at least 6 characters.");
      return;
    }

    if (pwForm.next !== pwForm.confirm) {
      setPwMsg("Passwords don't match.");
      return;
    }

    const updated = {
      ...user,
      password: pwForm.next,
    };

    updateCurrentUser(updated);

    setUser(updated);

    setPwForm({
      current: "",
      next: "",
      confirm: "",
    });

    setPwMsg("✓ Password changed successfully!");

    setTimeout(() => {
      setPwMsg("");
    }, 3000);
  };

  /* ─────────────────────────────────────────
     ADDRESS
  ───────────────────────────────────────── */

  const openAddAddr = () => {

    setEditAddrId(null);

    setAddrForm({
      fullName: "",
      email: "",
      phone: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
    });

    setShowAddrForm(true);
  };

  const openEditAddr = (addr) => {

    setEditAddrId(addr.id);

    setAddrForm({
      ...addr,
    });

    setShowAddrForm(true);
  };

  const saveAddr = () => {

    if (
      !addrForm.fullName ||
      !addrForm.addressLine ||
      !addrForm.city ||
      !addrForm.state ||
      !addrForm.pincode
    ) {
      alert("Please fill all required fields");
      return;
    }

    let updated;

    if (editAddrId) {

      updated = {
        ...user,
        addresses: addresses.map((a) =>
          a.id === editAddrId
            ? { ...addrForm, id: editAddrId }
            : a
        ),
      };

    } else {

      updated = {
        ...user,
        addresses: [
          ...addresses,
          {
            ...addrForm,
            id: Date.now(),
          },
        ],
      };
    }

    updateCurrentUser(updated);

    setUser(updated);

    setShowAddrForm(false);

    setEditAddrId(null);
  };

  const deleteAddr = (id) => {

    if (!window.confirm("Delete this address?")) return;

    const updated = {
      ...user,
      addresses: addresses.filter((a) => a.id !== id),
    };

    updateCurrentUser(updated);

    setUser(updated);
  };

  const setDefault = (id) => {

    const updated = {
      ...user,
      defaultAddress: id,
    };

    updateCurrentUser(updated);

    setUser(updated);
  };

  /* ─────────────────────────────────────────
     WISHLIST
  ───────────────────────────────────────── */

  const removeWish = (product) => {

    const updated = toggleWishlistItem(product);

    setWishlist(updated);

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  const moveToCart = (product) => {

    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const idx = cart.findIndex(
      (i) => i.id === product.id
    );

    const price =
      parseInt(
        String(product.price).replace(/[^\d]/g, "")
      ) || 0;

    if (idx > -1) {
      cart[idx].qty++;
    } else {
      cart.push({
        ...product,
        price,
        qty: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    removeWish(product);
  };

  /* ─────────────────────────────────────────
     LOGOUT
  ───────────────────────────────────────── */

  const handleLogout = () => {

    logoutUser();

    navigate("/");
  };

  /* ─────────────────────────────────────────
     RENDER MAP
  ───────────────────────────────────────── */

  const renderContent = () => {

    switch (section) {

      case "dashboard":
        return (
          <DashboardHome
            user={user}
            orders={orders}
            wishlist={wishlist}
            addresses={addresses}
            setSection={setSection}
            setSelectedOrder={setSelectedOrder}
          />
        );

      case "profile":
        return (
          <ProfileSection
            user={user}
            profileEdit={profileEdit}
            setProfileEdit={setProfileEdit}
            profileForm={profileForm}
            setProfileForm={setProfileForm}
            saveProfile={saveProfile}
            profileMsg={profileMsg}
            pwForm={pwForm}
            setPwForm={setPwForm}
            changePassword={changePassword}
            pwMsg={pwMsg}
          />
        );

      case "orders":
        return (
          <OrdersSection
            orders={orders}
            setSelectedOrder={setSelectedOrder}
            setSection={setSection}
          />
        );

      case "orderdetail":
        return (
          <OrderDetailSection
            selectedOrder={selectedOrder}
            setSection={setSection}
          />
        );

      case "addresses":
        return (
          <AddressSection
            user={user}
            addresses={addresses}
            STATES_IN={STATES_IN}
            showAddrForm={showAddrForm}
            setShowAddrForm={setShowAddrForm}
            addrForm={addrForm}
            setAddrForm={setAddrForm}
            saveAddr={saveAddr}
            openAddAddr={openAddAddr}
            openEditAddr={openEditAddr}
            deleteAddr={deleteAddr}
            setDefault={setDefault}
            editAddrId={editAddrId}
          />
        );

      case "wishlist":
        return (
          <WishlistSection
            wishlist={wishlist}
            moveToCart={moveToCart}
            removeWish={removeWish}
          />
        );

      default:
        return (
          <DashboardHome
            user={user}
            orders={orders}
            wishlist={wishlist}
            addresses={addresses}
            setSection={setSection}
            setSelectedOrder={setSelectedOrder}
          />
        );
    }
  };

  /* ─────────────────────────────────────────
     JSX
  ───────────────────────────────────────── */

  return (

    <div className="ud-root">

      {/* HEADER */}
      <Header />

      {/* DASHBOARD AREA */}
      <div className="ud-dashboard-shell">

        {/* SIDEBAR */}
        <DashboardSidebar
          user={user}
          section={section}
          setSection={setSection}
          handleLogout={handleLogout}
          setSelectedOrder={setSelectedOrder}
        />

        {/* MAIN */}
        <main className="ud-content">
          {renderContent()}
        </main>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>

  );
}