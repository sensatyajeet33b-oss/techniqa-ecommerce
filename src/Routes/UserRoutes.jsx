import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import UserDashboard from "../user/pages/UserDashboard";
import { getCurrentUser } from "../utils/auth";
import NotFound from "../Font/pages/NotFound";
export default function UserRoutes() {

  const user = getCurrentUser();

  return (
    <Routes>

      {/* AUTO REDIRECT */}
      <Route
        path="/"
        element={<Navigate to="dashboard" replace />}
      />

      {/* DASHBOARD */}
      <Route
        path="dashboard"
        element={
          user
            ? <UserDashboard />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}