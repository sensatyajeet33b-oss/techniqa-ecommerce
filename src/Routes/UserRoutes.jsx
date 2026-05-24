import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import UserDashboard from "../user/pages/UserDashboard";
import { getCurrentUser } from "../utils/auth";

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

    </Routes>
  );
}