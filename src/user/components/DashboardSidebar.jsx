import React from "react";

const NAV_ITEMS = [
  {
    group: "Main",
    items: [
      { key: "dashboard", label: "Dashboard",  icon: "ri-dashboard-line" },
      { key: "orders",    label: "My Orders",  icon: "ri-shopping-bag-3-line" },
      { key: "wishlist",  label: "Wishlist",   icon: "ri-heart-3-line" },
    ],
  },
  {
    group: "Account",
    items: [
      { key: "addresses", label: "Addresses",  icon: "ri-map-pin-user-line" },
      { key: "profile",   label: "Profile",    icon: "ri-user-settings-line" },
    ],
  },
];

export default function DashboardSidebar({
  user,
  section,
  setSection,
  handleLogout,
  setSelectedOrder,
  orderCount   = 0,
  wishlistCount = 0,
}) {

  const handleNav = (key) => {
    setSection(key);
    if (key !== "orderdetail") setSelectedOrder(null);
  };

  const badgeFor = (key) => {
    if (key === "orders"   && orderCount   > 0) return { count: orderCount,   variant: ""    };
    if (key === "wishlist" && wishlistCount > 0) return { count: wishlistCount, variant: "red" };
    return null;
  };

  return (
    <aside className="ud-sidebar">

      {/* ── USER CARD ── */}
      <div className="ud-side-user">
        <div className="ud-side-avatar-wrap">
          <div className="ud-side-avatar">
            {user?.name?.charAt(0)}
          </div>
          <span className="ud-online-dot" aria-label="Online" />
        </div>

        <div className="ud-side-user-info">
          <h3>{user?.name}</h3>
          <p title={user?.email}>{user?.email}</p>
        </div>
      </div>

      {/* ── MEMBER TIER ── */}
      <div className="ud-tier-row">
        <span className="ud-tier-pill">
          <i className="ri-vip-crown-2-line" aria-hidden="true" />
          Premium Member
        </span>
      </div>

      {/* ── NAV ── */}
      <nav className="ud-side-nav" aria-label="Dashboard navigation">
        {NAV_ITEMS.map(({ group, items }) => (
          <div key={group} className="ud-nav-group">

            <div className="ud-nav-group-label">
              {group}
            </div>

            {items.map((item) => {
              const badge = badgeFor(item.key);
              const isActive = section === item.key;

              return (
                <button
                  key={item.key}
                  className={`ud-side-link${isActive ? " active" : ""}`}
                  onClick={() => handleNav(item.key)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <i className={item.icon} aria-hidden="true" />
                  <span className="ud-side-link-label">
                    {item.label}
                  </span>
                  {badge && (
                    <span className={`ud-nav-badge${badge.variant ? ` ${badge.variant}` : ""}`}>
                      {badge.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="ud-nav-divider" aria-hidden="true" />
          </div>
        ))}
      </nav>

      {/* ── FOOTER ── */}
      <div className="ud-side-footer">
        <button className="ud-help-btn">
          <i className="ri-question-line" aria-hidden="true" />
          Help &amp; Support
        </button>

        <button className="ud-logout-btn" onClick={handleLogout}>
          <i className="ri-logout-box-r-line" aria-hidden="true" />
          Logout
        </button>
      </div>

    </aside>
  );
}