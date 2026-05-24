import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";

import AdminRoutes from "./Routes/AdminRoutes";
import UserRoutes from "./Routes/UserRoutes";
import FontRoutes from "./Routes/FontRoutes";

import ScrollToTop from "./Font/components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>

      <Toaster
        position="bottom-right"

        toastOptions={{

          style: {
            background: "rgba(15,23,42,.92)",
            color: "#fff",
            borderRadius: "16px",
            padding: "14px 18px",
            backdropFilter: "blur(16px)",
            fontSize: "14px",
            fontWeight: "600",
          },

          success: {
            iconTheme: {
              primary: "#06b6d4",
              secondary: "#fff",
            },
          },

        }}
      />

      {/* AUTO SCROLL TO TOP */}
      <ScrollToTop />

      <Routes>

        {/* ADMIN ROUTES */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* USER ROUTES */}
        <Route path="/user/*" element={<UserRoutes />} />

        {/* FRONT WEBSITE ROUTES */}
        <Route path="/*" element={<FontRoutes />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;