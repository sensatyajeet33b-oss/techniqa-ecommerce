import React from "react";

export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          text-align: center;
          padding: 12px;
          border-top: 1px solid #ddd;
          background: white;
        }
      `}</style>

      <div className="footer">
        © {new Date().getFullYear()} Tecniqa. All Rights Reserved.
      </div>
    </>
  );
}