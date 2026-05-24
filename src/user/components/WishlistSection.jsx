import React from "react";
import { useNavigate } from "react-router-dom";

export default function WishlistSection({

  wishlist,

  moveToCart,
  removeWish,

}) {

  const navigate = useNavigate();

  return (

    <div className="ud-section">

      {/* ───────────────────────── */}
      {/* HEADER */}
      {/* ───────────────────────── */}

      <div className="ud-sec-head">

        <div>

          <div className="ud-sec-eyebrow">
            Saved Products
          </div>

          <h2 className="ud-sec-title">
            My Wishlist
          </h2>

        </div>

        <div className="ud-wishlist-count">

          <i className="ri-heart-3-fill" />

          {wishlist.length}
          {" "}
          item
          {wishlist.length !== 1
            ? "s"
            : ""}

        </div>

      </div>

      {/* ───────────────────────── */}
      {/* EMPTY */}
      {/* ───────────────────────── */}

      {wishlist.length === 0 ? (

        <div className="ud-empty">

          <div className="ud-empty-icon">
            <i className="ri-heart-line" />
          </div>

          <h3>
            Wishlist is Empty
          </h3>

          <p>
            Save products you love and
            they’ll appear here for
            quick access later.
          </p>

          <button
            className="ud-primary-btn"
            onClick={() =>
              navigate("/")
            }
          >

            <i className="ri-store-2-line" />

            Continue Shopping

          </button>

        </div>

      ) : (

        <div className="ud-wishlist-grid">

          {wishlist.map((item) => (

            <div
              key={item.id}
              className="ud-wishlist-card"
            >

              {/* image */}

              <div className="ud-wishlist-img-wrap">

                <img
                  src={item.image}
                  alt={item.title}
                  className="ud-wishlist-img"
                />

                <button
                  className="ud-wishlist-remove"
                  onClick={() =>
                    removeWish(item)
                  }
                >

                  <i className="ri-close-line" />

                </button>

              </div>

              {/* content */}

              <div className="ud-wishlist-body">

                <h3 className="ud-wishlist-title">

                  {item.title}

                </h3>

                {/* category */}

                {item.category && (

                  <div className="ud-wishlist-cat">

                    {item.category}

                  </div>

                )}

                {/* rating */}

                {item.rating && (

                  <div className="ud-wishlist-rating">

                    <i className="ri-star-fill" />

                    {item.rating}

                  </div>

                )}

                {/* price */}

                <div className="ud-wishlist-price-wrap">

                  <div className="ud-wishlist-price">

                    {typeof item.price ===
                    "number"
                      ? `₹${item.price}`
                      : item.price}

                  </div>

                  {item.oldPrice && (

                    <div className="ud-wishlist-old-price">

                      {typeof item.oldPrice ===
                      "number"
                        ? `₹${item.oldPrice}`
                        : item.oldPrice}

                    </div>

                  )}

                </div>

                {/* actions */}

                <div className="ud-wishlist-actions">

                  <button
                    className="ud-outline-btn"
                    onClick={() =>
                      navigate(
                        `/product/${item.id}`
                      )
                    }
                  >

                    <i className="ri-eye-line" />

                    View

                  </button>

                  <button
                    className="ud-primary-btn"
                    onClick={() =>
                      moveToCart(item)
                    }
                  >

                    <i className="ri-shopping-cart-2-line" />

                    Add to Cart

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}