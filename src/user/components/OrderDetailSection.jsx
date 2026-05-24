import React from "react";

import { STATUS_COLOR } from "../constants/statusColors";

export default function OrderDetailSection({

  selectedOrder,
  setSection,

}) {

  if (!selectedOrder) {

    return (

      <div className="ud-empty">

        <div className="ud-empty-icon">
          <i className="ri-file-list-3-line" />
        </div>

        <h3>
          No Order Selected
        </h3>

        <p>
          Please select an order to
          view details.
        </p>

        <button
          className="ud-primary-btn"
          onClick={() =>
            setSection("orders")
          }
        >
          Back to Orders
        </button>

      </div>

    );
  }

  const {

    id,
    date,
    total,
    payment,
    status,
    items,
    shipping,

  } = selectedOrder;

  return (

    <div className="ud-section">

      {/* ───────────────────────── */}
      {/* TOP */}
      {/* ───────────────────────── */}

      <div className="ud-sec-head">

        <div>

          <div className="ud-sec-eyebrow">
            Order Details
          </div>

          <h2 className="ud-sec-title">

            Order #{id}

          </h2>

        </div>

        <button
          className="ud-outline-btn"
          onClick={() =>
            setSection("orders")
          }
        >

          <i className="ri-arrow-left-line" />

          Back

        </button>

      </div>

      {/* ───────────────────────── */}
      {/* META */}
      {/* ───────────────────────── */}

      <div className="ud-order-meta-grid">

        {/* date */}

        <div className="ud-meta-card">

          <div className="ud-meta-icon cyan">
            <i className="ri-calendar-line" />
          </div>

          <div>

            <span>
              Order Date
            </span>

            <h4>
              {date}
            </h4>

          </div>

        </div>

        {/* total */}

        <div className="ud-meta-card">

          <div className="ud-meta-icon green">
            <i className="ri-money-rupee-circle-line" />
          </div>

          <div>

            <span>
              Total Amount
            </span>

            <h4>
              ₹{total}
            </h4>

          </div>

        </div>

        {/* payment */}

        <div className="ud-meta-card">

          <div className="ud-meta-icon blue">
            <i className="ri-bank-card-line" />
          </div>

          <div>

            <span>
              Payment Mode
            </span>

            <h4>
              {payment}
            </h4>

          </div>

        </div>

        {/* status */}

        <div className="ud-meta-card">

          <div className="ud-meta-icon pink">
            <i className="ri-truck-line" />
          </div>

          <div>

            <span>
              Delivery Status
            </span>

            <h4
              style={{
                color:
                  STATUS_COLOR[
                    status
                  ] || "#0f172a",
              }}
            >
              {status}
            </h4>

          </div>

        </div>

      </div>

      {/* ───────────────────────── */}
      {/* TIMELINE */}
      {/* ───────────────────────── */}

      <div className="ud-home-block">

        <div className="ud-block-head">

          <div>

            <div className="ud-block-eyebrow">
              Shipment Progress
            </div>

            <h2 className="ud-block-title">
              Order Timeline
            </h2>

          </div>

        </div>

        <div className="ud-timeline">

          <div className="ud-time-item active">

            <div className="ud-time-dot" />

            <div>

              <h4>
                Order Confirmed
              </h4>

              <p>
                Your order was successfully placed.
              </p>

            </div>

          </div>

          <div className="ud-time-item active">

            <div className="ud-time-dot" />

            <div>

              <h4>
                Payment Successful
              </h4>

              <p>
                Payment received securely.
              </p>

            </div>

          </div>

          <div
            className={`ud-time-item ${
              status !== "Processing"
                ? "active"
                : ""
            }`}
          >

            <div className="ud-time-dot" />

            <div>

              <h4>
                Shipped
              </h4>

              <p>
                Package dispatched from warehouse.
              </p>

            </div>

          </div>

          <div
            className={`ud-time-item ${
              status === "Delivered"
                ? "active"
                : ""
            }`}
          >

            <div className="ud-time-dot" />

            <div>

              <h4>
                Delivered
              </h4>

              <p>
                Package delivered successfully.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ───────────────────────── */}
      {/* PRODUCTS */}
      {/* ───────────────────────── */}

      <div className="ud-home-block">

        <div className="ud-block-head">

          <div>

            <div className="ud-block-eyebrow">
              Purchased Products
            </div>

            <h2 className="ud-block-title">
              Order Items
            </h2>

          </div>

        </div>

        <div className="ud-order-items">

          {items.map((item, idx) => (

            <div
              key={idx}
              className="ud-order-item"
            >

              <img
                src={item.image}
                alt={item.title}
                className="ud-order-item-img"
              />

              <div className="ud-order-item-info">

                <h4>
                  {item.title}
                </h4>

                <p>
                  Qty:
                  {" "}
                  {item.qty}
                </p>

              </div>

              <div className="ud-order-item-price">

                ₹{item.price}

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* ───────────────────────── */}
      {/* SHIPPING */}
      {/* ───────────────────────── */}

      <div className="ud-home-block">

        <div className="ud-block-head">

          <div>

            <div className="ud-block-eyebrow">
              Delivery Information
            </div>

            <h2 className="ud-block-title">
              Shipping Address
            </h2>

          </div>

        </div>

        <div className="ud-ship-card">

          <div className="ud-ship-top">

            <div className="ud-ship-avatar">
              <i className="ri-map-pin-user-line" />
            </div>

            <div>

              <h3>
                {shipping?.fullName}
              </h3>

              <span>
                {shipping?.phone}
              </span>

            </div>

          </div>

          <div className="ud-ship-body">

            <p>
              {shipping?.addressLine}
            </p>

            <p>

              {shipping?.city},
              {" "}
              {shipping?.state}
              {" "}
              -
              {" "}
              {shipping?.pincode}

            </p>

          </div>

        </div>

      </div>

      {/* ───────────────────────── */}
      {/* SUMMARY */}
      {/* ───────────────────────── */}

      <div className="ud-home-block">

        <div className="ud-block-head">

          <div>

            <div className="ud-block-eyebrow">
              Billing Information
            </div>

            <h2 className="ud-block-title">
              Payment Summary
            </h2>

          </div>

        </div>

        <div className="ud-bill-card">

          <div className="ud-bill-row">

            <span>
              Subtotal
            </span>

            <span>
              ₹{total}
            </span>

          </div>

          <div className="ud-bill-row">

            <span>
              Shipping
            </span>

            <span>
              Free
            </span>

          </div>

          <div className="ud-bill-row total">

            <span>
              Total Paid
            </span>

            <span>
              ₹{total}
            </span>

          </div>

        </div>

      </div>

    </div>

  );
}