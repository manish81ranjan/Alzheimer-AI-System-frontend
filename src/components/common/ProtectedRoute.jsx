// frontend/src/components/common/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { tokenStorage } from "@/api/tokenStorage";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const token = tokenStorage.getToken();
  const user = tokenStorage.getUser();

  if (!token) return <Navigate to="/login" replace />;

  if (requireAdmin) {
    const isAdmin = (user?.role || "").toLowerCase() === "admin";
    if (!isAdmin) return <Navigate to="/dashboard" replace />;
  }

  return children;
}
