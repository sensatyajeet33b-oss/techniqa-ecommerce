import React from "react";

export default function DashboardHome({

  user,
  orders,
  wishlist,
  addresses,

  setSection,
  setSelectedOrder,

}) {

  const recentOrders = orders.slice(0, 3);

  return (

    <div className="ud-section">

      {/* ───────────────────────── */}
      {/* HERO */}
      {/* ───────────────────────── */}

      <div className="ud-home-hero">

        <div className="ud-home-hero-left">

          <div className="ud-home-eyebrow">
            Welcome Back
          </div>

          <h1 className="ud-home-title">
            Hi, {user?.name?.split(" ")[0]} 👋
          </h1>

          <p className="ud-home-sub">

            Manage your account, orders,
            wishlist and addresses from
            your personal dashboard.

          </p>

          <button
            className="ud-primary-btn"
            onClick={() =>
              setSection("orders")
            }
          >
            <i className="ri-shopping-bag-line" />
            View Orders
          </button>

        </div>

        <div className="ud-home-hero-right">

          <div className="ud-user-avatar">

            {user?.name?.charAt(0)}

          </div>

          <div className="ud-user-email">
            {user?.email}
          </div>

        </div>

      </div>

      {/* ───────────────────────── */}
      {/* STATS */}
      {/* ───────────────────────── */}

      <div className="ud-stats-grid">

        <div className="ud-stat-card">

          <div className="ud-stat-icon cyan">
            <i className="ri-shopping-bag-3-line" />
          </div>

          <div className="ud-stat-info">

            <span>
              Total Orders
            </span>

            <h3>
              {orders.length}
            </h3>

          </div>

        </div>

        <div className="ud-stat-card">

          <div className="ud-stat-icon pink">
            <i className="ri-heart-3-line" />
          </div>

          <div className="ud-stat-info">

            <span>
              Wishlist Items
            </span>

            <h3>
              {wishlist.length}
            </h3>

          </div>

        </div>

        <div className="ud-stat-card">

          <div className="ud-stat-icon blue">
            <i className="ri-map-pin-line" />
          </div>

          <div className="ud-stat-info">

            <span>
              Saved Addresses
            </span>

            <h3>
              {addresses.length}
            </h3>

          </div>

        </div>

        <div className="ud-stat-card">

          <div className="ud-stat-icon green">
            <i className="ri-coupon-3-line" />
          </div>

          <div className="ud-stat-info">

            <span>
              Active Coupons
            </span>

            <h3>
              4
            </h3>

          </div>

        </div>

      </div>

      {/* ───────────────────────── */}
      {/* QUICK ACTIONS */}
      {/* ───────────────────────── */}

      <div className="ud-home-block">

        <div className="ud-block-head">

          <div>

            <div className="ud-block-eyebrow">
              Fast Navigation
            </div>

            <h2 className="ud-block-title">
              Quick Actions
            </h2>

          </div>

        </div>

        <div className="ud-quick-grid">

          <button
            className="ud-quick-card"
            onClick={() =>
              setSection("orders")
            }
          >

            <div className="ud-quick-icon">
              <i className="ri-file-list-3-line" />
            </div>

            <div className="ud-quick-text">

              <h4>
                My Orders
              </h4>

              <p>
                Track and manage
                previous purchases
              </p>

            </div>

          </button>

          <button
            className="ud-quick-card"
            onClick={() =>
              setSection("wishlist")
            }
          >

            <div className="ud-quick-icon">
              <i className="ri-heart-3-line" />
            </div>

            <div className="ud-quick-text">

              <h4>
                Wishlist
              </h4>

              <p>
                View saved favorite
                products
              </p>

            </div>

          </button>

          <button
            className="ud-quick-card"
            onClick={() =>
              setSection("addresses")
            }
          >

            <div className="ud-quick-icon">
              <i className="ri-map-pin-user-line" />
            </div>

            <div className="ud-quick-text">

              <h4>
                Addresses
              </h4>

              <p>
                Manage shipping
                locations
              </p>

            </div>

          </button>

          <button
            className="ud-quick-card"
            onClick={() =>
              setSection("profile")
            }
          >

            <div className="ud-quick-icon">
              <i className="ri-user-settings-line" />
            </div>

            <div className="ud-quick-text">

              <h4>
                Profile
              </h4>

              <p>
                Edit account details
                and security
              </p>

            </div>

          </button>

        </div>

      </div>

      {/* ───────────────────────── */}
      {/* RECENT ORDERS */}
      {/* ───────────────────────── */}

      <div className="ud-home-block">

        <div className="ud-block-head">

          <div>

            <div className="ud-block-eyebrow">
              Purchase History
            </div>

            <h2 className="ud-block-title">
              Recent Orders
            </h2>

          </div>

          <button
            className="ud-link-btn"
            onClick={() =>
              setSection("orders")
            }
          >
            View All
          </button>

        </div>

        {recentOrders.length === 0 ? (

          <div className="ud-empty small">

            <div className="ud-empty-icon">
              <i className="ri-shopping-bag-line" />
            </div>

            <h3>
              No Orders Yet
            </h3>

            <p>
              Your recent orders will
              appear here.
            </p>

          </div>

        ) : (

          <div className="ud-recent-orders">

            {recentOrders.map((order) => (

              <div
                key={order.id}
                className="ud-recent-order"
              >

                <div className="ud-recent-left">

                  <div className="ud-recent-order-id">
                    #{order.id}
                  </div>

                  <div className="ud-recent-date">
                    {order.date}
                  </div>

                </div>

                <div className="ud-recent-mid">

                  <span>
                    {order.items.length}
                    {" "}
                    item(s)
                  </span>

                </div>

                <div className="ud-recent-right">

                  <div className="ud-recent-price">
                    ₹{order.total}
                  </div>

                  <button
                    className="ud-outline-btn small"
                    onClick={() => {

                      setSelectedOrder(order);

                      setSection(
                        "orderdetail"
                      );

                    }}
                  >
                    View
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ───────────────────────── */}
      {/* ACCOUNT STATUS */}
      {/* ───────────────────────── */}

      <div className="ud-home-block">

        <div className="ud-block-head">

          <div>

            <div className="ud-block-eyebrow">
              Account Overview
            </div>

            <h2 className="ud-block-title">
              Account Status
            </h2>

          </div>

        </div>

        <div className="ud-status-grid">

          <div className="ud-status-card success">

            <i className="ri-checkbox-circle-fill" />

            <div>

              <h4>
                Account Verified
              </h4>

              <p>
                Your email is verified
              </p>

            </div>

          </div>

          <div className="ud-status-card info">

            <i className="ri-shield-check-line" />

            <div>

              <h4>
                Secure Account
              </h4>

              <p>
                Password protection enabled
              </p>

            </div>

          </div>

          <div className="ud-status-card warning">

            <i className="ri-map-pin-time-line" />

            <div>

              <h4>
                Delivery Ready
              </h4>

              <p>
                {addresses.length}
                {" "}
                address(es) configured
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}