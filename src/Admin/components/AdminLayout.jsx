import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import PageLoader from "./PageLoader";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const AdminLayout = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const drawerWidth = isOpen ? 220 : 70;

  return (
    <Box sx={{ display: "flex", width: "100%" }}>

      {/* SIDEBAR */}
      <Sidebar isOpen={isOpen} />

      {/* MAIN AREA */}
      <Box
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "#f4f7fe",
        }}
      >
        {/* ✅ FIXED HEADER */}
        <Box
          sx={{
            height: "70px",
            flexShrink: 0,
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <Header toggleSidebar={() => setIsOpen(!isOpen)} />
        </Box>

        {/* ✅ SCROLLABLE CONTENT */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,

            /* scrollbar */
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": {
              background: "#bbb",
              borderRadius: "10px",
            },
          }}
        >
          {loading && <PageLoader />}
          <Outlet context={{ setLoading }} />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};

export default AdminLayout;