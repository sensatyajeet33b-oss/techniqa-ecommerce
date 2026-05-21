import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import FooterHighlights from "./FooterHighlights";

const HEADER_HEIGHT = 90;

const FontLayout = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <style>
        {`
          *{
            box-sizing:border-box;
          }

          body{
            margin:0;
            padding:0;
            overflow-x:hidden;
          }

          body{
  background:#f8fafc;
}

          .header-container{
            position:fixed;
            top:0;
            left:0;
            width:100%;
            z-index:1200;
            background: rgba(255,255,255,0.9);
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          }

          .container{
  width: min(1200px, 90%);
  margin-inline:auto;
}

          .main-content{
            min-height:100vh;
            padding-top:${isLoginPage ? "0px" : `${HEADER_HEIGHT}px`};
          }
        `}
      </style>

      {/* HEADER */}
      {!isLoginPage && (
        <div className="header-container">
          <Header />
        </div>
      )}

      {/* PAGE CONTENT */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* FOOTER */}
      {!isLoginPage && (
        <>
          <FooterHighlights />
          <Footer />
        </>
      )}
    </>
  );
};

export default FontLayout;