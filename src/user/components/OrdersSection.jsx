import React from "react";

import { STATUS_COLOR } from "../constants/statusColors";

export default function OrdersSection({

  orders,

  setSelectedOrder,
  setSection,

}) {

  return (

    <div className="ud-section">

      {/* ───────────────────────── */}
      {/* HEADER */}
      {/* ───────────────────────── */}

      <div className="ud-sec-head">

        <div>

          <div className="ud-sec-eyebrow">
            Purchase History
          </div>

          <h2 className="ud-sec-title">
            My Orders
          </h2>

        </div>

      </div>

      {/* ───────────────────────── */}
      {/* EMPTY */}
      {/* ───────────────────────── */}

      {orders.length === 0 ? (

        <div className="ud-empty">

          <div className="ud-empty-icon">
            <i className="ri-shopping-bag-line" />
          </div>

          <h3>
            No Orders Yet
          </h3>

          <p>
            Your completed orders will
            appear here after checkout.
          </p>

        </div>

      ) : (

        <div className="ud-orders-grid">

          {orders.map((order) => (

            <div
              key={order.id}
              className="ud-order-card"
            >

              {/* ───────────────── */}
              {/* TOP */}
              {/* ───────────────── */}

              <div className="ud-order-top">

                <div>

                  <div className="ud-order-id">

                    #{order.id}

                  </div>

                  <div className="ud-order-date">

                    {order.date}

                  </div>

                </div>

                <div
                  className="ud-order-status"
                  style={{
                    background:
                      STATUS_COLOR[
                        order.status
                      ] + "18",

                    color:
                      STATUS_COLOR[
                        order.status
                      ],
                  }}
                >

                  {order.status}

                </div>

              </div>

              {/* ───────────────── */}
              {/* ITEMS */}
              {/* ───────────────── */}

              <div className="ud-order-products">

                {order.items
                  .slice(0, 3)
                  .map((item, idx) => (

                  <div
                    key={idx}
                    className="ud-order-product"
                  >

                    <img
                      src={item.image}
                      alt={item.title}
                    />

                    <div>

                      <h4>
                        {item.title}
                      </h4>

                      <span>
                        Qty:
                        {" "}
                        {item.qty}
                      </span>

                    </div>

                  </div>

                ))}

                {order.items.length > 3 && (

                  <div className="ud-more-items">

                    +
                    {" "}
                    {order.items.length - 3}
                    {" "}
                    more items

                  </div>

                )}

              </div>

              {/* ───────────────── */}
              {/* META */}
              {/* ───────────────── */}

              <div className="ud-order-summaryary">

                <div className="ud-order-summary-box">

                  <span>
                    Total
                  </span>

                  <h4>
                    ₹{order.total}
                  </h4>

                </div>

                <div className="ud-order-summary-box">

                  <span>
                    Payment
                  </span>

                  <h4>
                    {order.payment}
                  </h4>

                </div>

                <div className="ud-order-summary-box">

                  <span>
                    Items
                  </span>

                  <h4>
                    {order.items.length}
                  </h4>

                </div>

              </div>

              {/* ───────────────── */}
              {/* FOOT */}
              {/* ───────────────── */}

              <div className="ud-order-foot">

                <button
                  className="ud-outline-btn"
                  onClick={() => {

                    setSelectedOrder(
                      order
                    );

                    setSection(
                      "orderdetail"
                    );

                  }}
                >

                  <i className="ri-eye-line" />

                  View Details

                </button>

                {order.status ===
                  "Delivered" && (

                  <button
                    className="ud-primary-btn"
                  >

                    <i className="ri-repeat-line" />

                    Buy Again

                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}