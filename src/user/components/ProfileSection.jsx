import React from "react";

export default function ProfileSection({

  user,

  profileEdit,
  setProfileEdit,

  profileForm,
  setProfileForm,

  saveProfile,
  profileMsg,

  pwForm,
  setPwForm,

  changePassword,
  pwMsg,

}) {

  return (

    <div className="ud-section">

      {/* ───────────────────────── */}
      {/* HEADER */}
      {/* ───────────────────────── */}

      <div className="ud-sec-head">

        <div>

          <div className="ud-sec-eyebrow">
            Account Settings
          </div>

          <h2 className="ud-sec-title">
            My Profile
          </h2>

        </div>

      </div>

      {/* ───────────────────────── */}
      {/* PROFILE CARD */}
      {/* ───────────────────────── */}

      <div className="ud-profile-wrap">

        <div className="ud-profile-card">

          {/* top */}

          <div className="ud-profile-top">

            <div className="ud-profile-avatar">

              {user?.name?.charAt(0)}

            </div>

            <div>

              <h3>
                {user?.name}
              </h3>

              <p>
                {user?.email}
              </p>

            </div>

          </div>

          {/* success msg */}

          {profileMsg && (

            <div className="ud-success-msg">

              <i className="ri-checkbox-circle-fill" />

              {profileMsg}

            </div>

          )}

          {/* fields */}

          <div className="ud-profile-fields">

            {/* name */}

            <div className="ud-field">

              <label>
                Full Name
              </label>

              <input
                type="text"
                disabled={!profileEdit}
                value={profileForm.name}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    name:
                      e.target.value,
                  })
                }
              />

            </div>

            {/* email */}

            <div className="ud-field">

              <label>
                Email Address
              </label>

              <input
                type="email"
                disabled={!profileEdit}
                value={profileForm.email}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    email:
                      e.target.value,
                  })
                }
              />

            </div>

            {/* phone */}

            <div className="ud-field">

              <label>
                Phone Number
              </label>

              <input
                type="tel"
                disabled={!profileEdit}
                value={profileForm.phone}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    phone:
                      e.target.value,
                  })
                }
              />

            </div>

          </div>

          {/* actions */}

          <div className="ud-profile-actions">

            {!profileEdit ? (

              <button
                className="ud-primary-btn"
                onClick={() =>
                  setProfileEdit(true)
                }
              >

                <i className="ri-edit-line" />

                Edit Profile

              </button>

            ) : (

              <>

                <button
                  className="ud-outline-btn"
                  onClick={() =>
                    setProfileEdit(false)
                  }
                >

                  Cancel

                </button>

                <button
                  className="ud-primary-btn"
                  onClick={saveProfile}
                >

                  <i className="ri-save-line" />

                  Save Changes

                </button>

              </>

            )}

          </div>

        </div>

        {/* ───────────────────── */}
        {/* PASSWORD CARD */}
        {/* ───────────────────── */}

        <div className="ud-password-card">

          <div className="ud-password-head">

            <div>

              <div className="ud-block-eyebrow">
                Security
              </div>

              <h3 className="ud-block-title">
                Change Password
              </h3>

            </div>

          </div>

          {/* password msg */}

          {pwMsg && (

            <div
              className={`${
                pwMsg.includes("✓")
                  ? "ud-success-msg"
                  : "ud-error-msg"
              }`}
            >

              <i
                className={
                  pwMsg.includes("✓")
                    ? "ri-checkbox-circle-fill"
                    : "ri-error-warning-fill"
                }
              />

              {pwMsg}

            </div>

          )}

          <div className="ud-profile-fields">

            {/* current */}

            <div className="ud-field">

              <label>
                Current Password
              </label>

              <input
                type="password"
                value={pwForm.current}
                onChange={(e) =>
                  setPwForm({
                    ...pwForm,
                    current:
                      e.target.value,
                  })
                }
                placeholder="Enter current password"
              />

            </div>

            {/* new */}

            <div className="ud-field">

              <label>
                New Password
              </label>

              <input
                type="password"
                value={pwForm.next}
                onChange={(e) =>
                  setPwForm({
                    ...pwForm,
                    next:
                      e.target.value,
                  })
                }
                placeholder="Enter new password"
              />

            </div>

            {/* confirm */}

            <div className="ud-field">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                value={pwForm.confirm}
                onChange={(e) =>
                  setPwForm({
                    ...pwForm,
                    confirm:
                      e.target.value,
                  })
                }
                placeholder="Confirm new password"
              />

            </div>

          </div>

          {/* actions */}

          <div className="ud-profile-actions">

            <button
              className="ud-primary-btn"
              onClick={changePassword}
            >

              <i className="ri-lock-password-line" />

              Update Password

            </button>

          </div>

        </div>

      </div>

    </div>

  );
}