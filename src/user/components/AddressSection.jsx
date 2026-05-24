
import React from "react";

export default function AddressSection({

  addresses,
  STATES_IN,

  showAddrForm,
  setShowAddrForm,

  addrForm,
  setAddrForm,

  saveAddr,

  openAddAddr,
  openEditAddr,

  deleteAddr,
  setDefault,

  editAddrId,

}) {

  return (

    <div className="ud-section">

      {/* ───────────────────────── */}
      {/* HEADER */}
      {/* ───────────────────────── */}

      <div className="ud-sec-head">

        <div>

          <div className="ud-sec-eyebrow">
            Saved Locations
          </div>

          <h2 className="ud-sec-title">
            My Addresses
          </h2>

        </div>

        <button
          className="ud-primary-btn"
          onClick={openAddAddr}
        >
          <i className="ri-add-line" />
          Add Address
        </button>

      </div>

      {/* ───────────────────────── */}
      {/* EMPTY */}
      {/* ───────────────────────── */}

      {addresses.length === 0 && !showAddrForm && (

        <div className="ud-empty">

          <div className="ud-empty-icon">
            <i className="ri-map-pin-line" />
          </div>

          <h3>No Addresses Saved</h3>

          <p>
            Add a delivery address to make
            checkout faster and easier.
          </p>

          <button
            className="ud-primary-btn"
            onClick={openAddAddr}
          >
            Add First Address
          </button>

        </div>

      )}

      {/* ───────────────────────── */}
      {/* ADDRESS GRID */}
      {/* ───────────────────────── */}

      {addresses.length > 0 && (

        <div className="ud-address-grid">

          {addresses.map((addr) => (

            <div
              key={addr.id}
              className={`ud-address-card ${
                addr.id ===
                localStorage.getItem(
                  "selectedAddress"
                )
                  ? "active"
                  : ""
              }`}
            >

              {/* top */}

              <div className="ud-address-top">

                <div>

                  <div className="ud-address-name">

                    {addr.fullName}

                    {addr.id ===
                      localStorage.getItem(
                        "selectedAddress"
                      ) && (

                      <span className="ud-default-pill">
                        Default
                      </span>

                    )}

                  </div>

                  <div className="ud-address-phone">
                    {addr.phone}
                  </div>

                </div>

                <div className="ud-address-actions">

                  <button
                    onClick={() =>
                      openEditAddr(addr)
                    }
                  >
                    <i className="ri-edit-line" />
                  </button>

                  <button
                    onClick={() =>
                      deleteAddr(addr.id)
                    }
                  >
                    <i className="ri-delete-bin-6-line" />
                  </button>

                </div>

              </div>

              {/* body */}

              <div className="ud-address-body">

                <p>
                  {addr.addressLine}
                </p>

                <p>
                  {addr.city},{" "}
                  {addr.state} -{" "}
                  {addr.pincode}
                </p>

                {addr.email && (
                  <span>
                    {addr.email}
                  </span>
                )}

              </div>

              {/* footer */}

              <div className="ud-address-foot">

                {addr.id !==
                  localStorage.getItem(
                    "selectedAddress"
                  ) && (

                  <button
                    className="ud-outline-btn"
                    onClick={() =>
                      setDefault(addr.id)
                    }
                  >
                    Set Default
                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

      {/* ───────────────────────── */}
      {/* ADDRESS FORM */}
      {/* ───────────────────────── */}

      {showAddrForm && (

        <div className="ud-address-form-wrap">

          <div className="ud-form-head">

            <h3>

              {editAddrId
                ? "Edit Address"
                : "Add New Address"}

            </h3>

            <button
              className="ud-close-btn"
              onClick={() =>
                setShowAddrForm(false)
              }
            >
              <i className="ri-close-line" />
            </button>

          </div>

          <div className="ud-address-form">

            {/* full name */}

            <div className="ud-field">

              <label>
                Full Name
              </label>

              <input
                type="text"
                value={addrForm.fullName}
                onChange={(e) =>
                  setAddrForm({
                    ...addrForm,
                    fullName:
                      e.target.value,
                  })
                }
                placeholder="John Doe"
              />

            </div>

            {/* email */}

            <div className="ud-field">

              <label>
                Email
              </label>

              <input
                type="email"
                value={addrForm.email}
                onChange={(e) =>
                  setAddrForm({
                    ...addrForm,
                    email:
                      e.target.value,
                  })
                }
                placeholder="john@example.com"
              />

            </div>

            {/* phone */}

            <div className="ud-field">

              <label>
                Phone Number
              </label>

              <input
                type="tel"
                value={addrForm.phone}
                onChange={(e) =>
                  setAddrForm({
                    ...addrForm,
                    phone:
                      e.target.value,
                  })
                }
                placeholder="+91 9876543210"
              />

            </div>

            {/* state */}

            <div className="ud-field">

              <label>
                State
              </label>

              <select
                value={addrForm.state}
                onChange={(e) =>
                  setAddrForm({
                    ...addrForm,
                    state:
                      e.target.value,
                  })
                }
              >

                <option value="">
                  Select State
                </option>

                {STATES_IN.map((st) => (

                  <option
                    key={st}
                    value={st}
                  >
                    {st}
                  </option>

                ))}

              </select>

            </div>

            {/* city */}

            <div className="ud-field">

              <label>
                City
              </label>

              <input
                type="text"
                value={addrForm.city}
                onChange={(e) =>
                  setAddrForm({
                    ...addrForm,
                    city:
                      e.target.value,
                  })
                }
                placeholder="Bhubaneswar"
              />

            </div>

            {/* pincode */}

            <div className="ud-field">

              <label>
                Pincode
              </label>

              <input
                type="text"
                value={addrForm.pincode}
                onChange={(e) =>
                  setAddrForm({
                    ...addrForm,
                    pincode:
                      e.target.value,
                  })
                }
                placeholder="751024"
              />

            </div>

            {/* address */}

            <div className="ud-field full">

              <label>
                Address
              </label>

              <textarea
                rows="4"
                value={addrForm.addressLine}
                onChange={(e) =>
                  setAddrForm({
                    ...addrForm,
                    addressLine:
                      e.target.value,
                  })
                }
                placeholder="House no, street, locality..."
              />

            </div>

          </div>

          {/* actions */}

          <div className="ud-form-actions">

            <button
              className="ud-outline-btn"
              onClick={() =>
                setShowAddrForm(false)
              }
            >
              Cancel
            </button>

            <button
              className="ud-primary-btn"
              onClick={saveAddr}
            >

              <i className="ri-save-line" />

              {editAddrId
                ? "Update Address"
                : "Save Address"}

            </button>

          </div>

        </div>

      )}

    </div>

  );
}