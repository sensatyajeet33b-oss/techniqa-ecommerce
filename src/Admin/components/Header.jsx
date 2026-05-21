import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header({ toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <style>{`
    .header-bar {
  height: 70px;
  background: #0b1a4a;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  box-shadow: none;
}

        .left-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .toggle-btn {
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .right-section {
          position: relative;
        }

        .admin-box {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 5px;
          transition: 0.3s;
        }

        .admin-box:hover {
          background: rgba(255,255,255,0.1);
        }

        .dropdown {
          position: absolute;
          top: 50px;
          right: 0;
          background: #fff;
          color: #000;
          width: 180px;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .dropdown-item {
          padding: 12px 15px;
          cursor: pointer;
          transition: 0.3s;
        }

        .dropdown-item:hover {
          background: #f3f3f3;
        }
      `}</style>

      <div className="header-bar">

        {/* LEFT */}
        <div className="left-section">
          <div className="toggle-btn" onClick={toggleSidebar}>
            <MenuIcon sx={{ color: "#fff", fontSize: 30 }} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="right-section">
          <div
            className="admin-box"
            onClick={() => setOpen(!open)}
          >
            <AccountCircleIcon sx={{ fontSize: 30 }} />
            Admin ▾
          </div>

          {open && (
            <div className="dropdown">
              <div
                className="dropdown-item"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                <LogoutIcon sx={{ fontSize: 15 }} />
                Logout
              </div>

            </div>
          )}
        </div>

      </div>
    </>
  );
}