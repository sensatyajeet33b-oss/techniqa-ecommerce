import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import AdminRoutes from "./Routes/AdminRoutes";
import FontRoutes from "./Routes/FontRoutes";

import ScrollToTop from "./Font/components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>

      {/* AUTO SCROLL TO TOP */}
      <ScrollToTop />

      <Routes>

        {/* ADMIN ROUTES */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* FRONT WEBSITE ROUTES */}
        <Route path="/*" element={<FontRoutes />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;